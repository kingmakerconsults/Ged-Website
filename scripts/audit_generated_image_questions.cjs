const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.join(__dirname, '..');
const QUIZ_DATA_DIR = path.join(WORKSPACE_ROOT, 'backend', 'data', 'quizzes');
const SUPPLEMENTAL_PATH = path.join(QUIZ_DATA_DIR, 'supplemental.topics.json');
const METADATA_PATH = path.join(
  WORKSPACE_ROOT,
  'backend',
  'data',
  'image_metadata_final.json'
);

const GENERATED_BY = 'image-metadata-generator-v2';

function parseSubjectsArg(argv) {
  const arg = (argv || []).find((a) => String(a).startsWith('--subjects='));
  if (!arg) return null;
  const raw = String(arg).slice('--subjects='.length);
  const parts = raw
    .split(',')
    .map((s) => String(s).trim())
    .filter(Boolean);
  if (!parts.length) return null;
  return new Set(parts);
}

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function safeRequire(absPath) {
  delete require.cache[require.resolve(absPath)];
  // eslint-disable-next-line import/no-dynamic-require
  return require(absPath);
}

function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function containsAny(text, patterns) {
  const t = normalize(text);
  return patterns.some((p) => t.includes(p));
}

function main() {
  const subjectFilter = parseSubjectsArg(process.argv.slice(2));
  if (subjectFilter) {
    console.log(
      `[audit] Subject filter enabled: ${Array.from(subjectFilter).join(', ')}`
    );
  }

  const supplemental = loadJSON(SUPPLEMENTAL_PATH);
  const metadata = loadJSON(METADATA_PATH);
  const byPath = new Map(
    metadata.map((m) => [String(m.filePath || '').trim(), m])
  );

  const topics = supplemental.filter((t) => {
    if (!(t && t.generatedBy === GENERATED_BY && t.topic && t.topic.file))
      return false;
    if (!subjectFilter) return true;
    const subj = String(t.subjectKey || '').trim();
    return subjectFilter.has(subj);
  });

  const genericPatterns = [
    'not enough information is shown',
    'this choice is not supported',
    'that purpose is not supported',
    'the visual’s description/labels indicate',
    'the visual is primarily about',
    'the visual includes',
    'audio transcript',
    'decorative art',
  ];

  let totalQuestions = 0;
  let flagged = 0;
  const flaggedItems = [];
  const perSubject = {};

  for (const t of topics) {
    const rel = String(t.topic.file).replace(/^[\\/]+/, '');
    const abs = path.join(WORKSPACE_ROOT, rel);
    if (!fs.existsSync(abs)) continue;

    const questions = safeRequire(abs);
    if (!Array.isArray(questions)) continue;

    for (const q of questions) {
      totalQuestions++;
      const subjKey = String(t.subjectKey || t.subject || 'Unknown').trim();
      if (!perSubject[subjKey]) perSubject[subjKey] = { total: 0, flagged: 0 };
      perSubject[subjKey].total++;

      const imageUrl =
        q.imageUrl ||
        q.imageURL ||
        (q.content && (q.content.imageUrl || q.content.imageURL));
      const m = byPath.get(String(imageUrl || '').trim());
      const metaTerms = [
        m && m.category,
        m && m.altText,
        m && m.detailedDescription,
        m && m.extractedText,
        ...(m && Array.isArray(m.keywords) ? m.keywords.slice(0, 10) : []),
        m && m.subject,
      ]
        .map((x) => String(x || '').trim())
        .filter(Boolean);

      const qt =
        q.content && q.content.questionText
          ? q.content.questionText
          : q.question || '';
      const opts = Array.isArray(q.answerOptions) ? q.answerOptions : [];

      const fullText = [
        qt,
        ...opts.map((o) => o.text),
        q.passage,
        q.content && q.content.passage,
      ]
        .filter(Boolean)
        .join(' ');

      // Anchor to *any* meaningful substring from metadata.
      // For long fields (description/extractedText), check token overlap instead of whole-string includes.
      const fullNorm = normalize(fullText);
      const metaTokenSet = new Set(
        metaTerms
          .flatMap((term) =>
            String(term)
              .split(/[^a-z0-9]+/i)
              .map((t) => t.trim())
          )
          .map((t) => normalize(t))
          .filter((t) => t.length >= 4)
      );
      let overlap = 0;
      for (const tok of metaTokenSet) {
        if (fullNorm.includes(tok)) overlap++;
        if (overlap >= 2) break;
      }
      const hasMetaSpecificTerm = overlap >= 2;
      const looksGeneric = containsAny(fullText, genericPatterns);

      // Flag only when it's both (a) generic-looking and (b) not anchored to metadata.
      // This avoids false positives for legitimate, image-specific prompts that use common phrasing.
      if (looksGeneric && !hasMetaSpecificTerm) {
        flagged++;
        perSubject[subjKey].flagged++;
        flaggedItems.push({
          topicId: t.topic.id,
          subject: t.subjectKey,
          categoryName: t.categoryName,
          imageUrl: imageUrl || '',
          questionNumber: q.questionNumber,
          difficulty: q.difficulty,
          reason: {
            looksGeneric,
            hasMetaSpecificTerm,
          },
          questionText: qt,
          correctAnswer: (opts.find((o) => o.isCorrect) || {}).text || '',
        });
      }
    }
  }

  const report = {
    generatedBy: GENERATED_BY,
    topicsChecked: topics.length,
    totalQuestions,
    flagged,
    flaggedPercent: totalQuestions
      ? Math.round((flagged / totalQuestions) * 1000) / 10
      : 0,
    perSubject,
    sampleFlagged: flaggedItems.slice(0, 50),
  };

  fs.mkdirSync(path.join(WORKSPACE_ROOT, 'reports'), { recursive: true });
  fs.writeFileSync(
    path.join(
      WORKSPACE_ROOT,
      'reports',
      'generated-image-question-quality.json'
    ),
    JSON.stringify(report, null, 2),
    'utf8'
  );

  console.log(
    `[audit] topicsChecked=${report.topicsChecked} totalQuestions=${totalQuestions} flagged=${flagged} (${report.flaggedPercent}%)`
  );
  console.log('[audit] wrote reports/generated-image-question-quality.json');
}

main();
