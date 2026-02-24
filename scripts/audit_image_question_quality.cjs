#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGE_ROOT = path.join(ROOT, 'frontend', 'public');

const SOURCE_GLOBS = [
  path.join(ROOT, 'backend', 'data', 'quizzes'),
  path.join(ROOT, 'backend', 'quizzes'),
  path.join(ROOT, 'public', 'quizzes'),
];

const GENERIC_STEM_PATTERNS = [
  /which term or label appears/i,
  /which pair of labels both appears/i,
  /which year appears/i,
  /what is shown in the (image|visual)/i,
  /analyze the image and answer/i,
  /which .* is listed/i,
  /which .* appears in the visual/i,
];

const PLACEHOLDER_PATTERNS = [
  /placeholder/i,
  /correct answer placeholder/i,
  /incorrect answer placeholder/i,
  /^option\s+[a-d]/i,
];

const LOW_RATIONALE_PATTERNS = [
  /not shown in the visual/i,
  /not shown in the image/i,
  /one or both labels are not shown/i,
  /this term\/label is not shown/i,
];

function listFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
      } else {
        out.push(abs);
      }
    }
  }
  return out;
}

function normalizeText(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(s) {
  const t = String(s || '').trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

function getQuestionText(q) {
  return q?.questionText || q?.question || q?.content?.questionText || '';
}

function getPassageText(q) {
  return q?.passage || q?.content?.passage || '';
}

function getImageUrl(q) {
  return (
    q?.imageUrl ||
    q?.imageURL ||
    q?.content?.imageURL ||
    q?.stimulusImage?.src ||
    ''
  );
}

function getAnswerOptions(q) {
  return Array.isArray(q?.answerOptions) ? q.answerOptions : [];
}

function parseJsonFile(absPath) {
  try {
    const raw = fs.readFileSync(absPath, 'utf8').replace(/^\uFEFF/, '');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function parseJsModule(absPath) {
  try {
    delete require.cache[require.resolve(absPath)];
    return require(absPath);
  } catch (error) {
    return { __loadError: String(error.message || error) };
  }
}

function collectQuestionsFromAny(node, out = []) {
  if (!node) return out;
  if (Array.isArray(node)) {
    for (const item of node) collectQuestionsFromAny(item, out);
    return out;
  }
  if (typeof node !== 'object') return out;

  const imageUrl = getImageUrl(node);
  const hasAnswers = Array.isArray(node.answerOptions);
  const hasQuestionText = !!getQuestionText(node);
  if (imageUrl || hasAnswers || hasQuestionText) {
    out.push(node);
  }

  for (const value of Object.values(node)) {
    if (value && typeof value === 'object') collectQuestionsFromAny(value, out);
  }
  return out;
}

function resolveImagePath(imageUrl) {
  if (!imageUrl) return { localPath: null, localExpected: false };
  const decoded = decodeURIComponent(String(imageUrl).trim());
  if (/^https?:\/\//i.test(decoded)) {
    return { localPath: null, localExpected: false };
  }

  let normalized = decoded.replace(/\\/g, '/');
  normalized = normalized.replace(/^\/\/+/, '/');
  normalized = normalized.replace(/^\/frontend\/Images\//i, '/images/');
  normalized = normalized.replace(/^\/frontend\/images\//i, '/images/');

  if (normalized.startsWith('/images/')) {
    const rel = normalized.slice('/images/'.length);
    return {
      localPath: path.join(IMAGE_ROOT, 'images', rel),
      localExpected: true,
    };
  }

  if (normalized.startsWith('/')) {
    return {
      localPath: path.join(IMAGE_ROOT, normalized.slice(1)),
      localExpected: true,
    };
  }

  return { localPath: null, localExpected: false };
}

function hasPattern(text, patterns) {
  return patterns.some((rx) => rx.test(String(text || '')));
}

function scoreQuestion(q) {
  const issues = [];
  const questionText = getQuestionText(q);
  const passage = getPassageText(q);
  const imageUrl = getImageUrl(q);
  const options = getAnswerOptions(q);

  if (!questionText) issues.push('missing_question_text');
  if (wordCount(questionText) > 0 && wordCount(questionText) < 7)
    issues.push('very_short_question');
  if (hasPattern(questionText, GENERIC_STEM_PATTERNS))
    issues.push('generic_surface_stem');
  if (hasPattern(questionText, PLACEHOLDER_PATTERNS))
    issues.push('placeholder_text');

  const combinedOptions = options
    .map((o) => `${o?.text || ''} ${o?.rationale || ''}`)
    .join(' || ');
  if (hasPattern(combinedOptions, PLACEHOLDER_PATTERNS))
    issues.push('placeholder_options_or_rationales');

  const lowRationaleCount = options.filter((o) =>
    hasPattern(o?.rationale || '', LOW_RATIONALE_PATTERNS)
  ).length;
  if (lowRationaleCount >= 2) issues.push('weak_distractor_rationales');

  const correctCount = options.filter((o) => o?.isCorrect === true).length;
  if (options.length > 0 && correctCount !== 1)
    issues.push('invalid_correct_answer_count');

  const { localPath, localExpected } = resolveImagePath(imageUrl);
  if (localExpected && localPath && !fs.existsSync(localPath)) {
    issues.push('missing_image_asset');
  }

  const passageNorm = normalizeText(passage);
  const questionNorm = normalizeText(questionText);
  if (
    passageNorm &&
    questionNorm &&
    hasPattern(questionText, GENERIC_STEM_PATTERNS)
  ) {
    const anchorTokens = passageNorm
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 5)
      .slice(0, 80);
    const overlap = anchorTokens.filter((t) => questionNorm.includes(t)).length;
    if (overlap === 0) issues.push('question_not_anchored_to_passage_context');
  }

  return {
    issues,
    questionText,
    imageUrl,
    passage,
    optionsCount: options.length,
    correctCount,
  };
}

function severityForIssues(issues) {
  let score = 0;
  for (const issue of issues) {
    if (issue === 'missing_image_asset') score += 5;
    else if (issue === 'placeholder_options_or_rationales') score += 5;
    else if (issue === 'placeholder_text') score += 5;
    else if (issue === 'missing_question_text') score += 4;
    else if (issue === 'generic_surface_stem') score += 3;
    else if (issue === 'question_not_anchored_to_passage_context') score += 3;
    else if (issue === 'weak_distractor_rationales') score += 2;
    else if (issue === 'very_short_question') score += 1;
    else if (issue === 'invalid_correct_answer_count') score += 2;
  }
  return score;
}

function main() {
  const candidateFiles = SOURCE_GLOBS.flatMap((dir) =>
    listFilesRecursively(dir).filter((abs) => /\.(json|js|cjs)$/i.test(abs))
  );

  const reportItems = [];
  const parseErrors = [];

  for (const absPath of candidateFiles) {
    const relPath = path.relative(ROOT, absPath).replace(/\\/g, '/');
    let payload = null;

    if (absPath.endsWith('.json')) payload = parseJsonFile(absPath);
    else payload = parseJsModule(absPath);

    if (!payload || payload.__loadError) {
      parseErrors.push({
        file: relPath,
        error:
          payload && payload.__loadError ? payload.__loadError : 'parse_failed',
      });
      continue;
    }

    const questions = collectQuestionsFromAny(payload, []);
    const imageQuestions = questions.filter((q) => !!getImageUrl(q));
    if (!imageQuestions.length) continue;

    imageQuestions.forEach((q, idx) => {
      const result = scoreQuestion(q);
      const issues = result.issues;
      reportItems.push({
        file: relPath,
        questionNumber: q.questionNumber || null,
        indexInFile: idx + 1,
        imageUrl: result.imageUrl,
        questionText: result.questionText,
        issues,
        severity: severityForIssues(issues),
      });
    });
  }

  const totalImageQuestions = reportItems.length;
  const flagged = reportItems.filter((x) => x.issues.length > 0);

  const byIssue = {};
  for (const item of flagged) {
    for (const issue of item.issues) byIssue[issue] = (byIssue[issue] || 0) + 1;
  }

  const byFile = {};
  for (const item of flagged) {
    byFile[item.file] = (byFile[item.file] || 0) + 1;
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    totalFilesScanned: candidateFiles.length,
    parseErrors: parseErrors.length,
    totalImageQuestions,
    flaggedCount: flagged.length,
    flaggedPercent: totalImageQuestions
      ? Number(((flagged.length / totalImageQuestions) * 100).toFixed(1))
      : 0,
    issueCounts: Object.entries(byIssue)
      .sort((a, b) => b[1] - a[1])
      .map(([issue, count]) => ({ issue, count })),
    topFiles: Object.entries(byFile)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([file, count]) => ({ file, count })),
  };

  const detailed = {
    summary,
    parseErrors,
    flagged: flagged.sort((a, b) => b.severity - a.severity).slice(0, 2000),
  };

  const reportsDir = path.join(ROOT, 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const outJson = path.join(reportsDir, 'image-question-quality-audit.json');
  fs.writeFileSync(outJson, JSON.stringify(detailed, null, 2), 'utf8');

  const lines = [];
  lines.push('# Image Question Quality Audit');
  lines.push('');
  lines.push(`Generated: ${summary.generatedAt}`);
  lines.push(`Total files scanned: ${summary.totalFilesScanned}`);
  lines.push(`Parse errors: ${summary.parseErrors}`);
  lines.push(`Total image questions: ${summary.totalImageQuestions}`);
  lines.push(`Flagged: ${summary.flaggedCount} (${summary.flaggedPercent}%)`);
  lines.push('');
  lines.push('## Top Issues');
  summary.issueCounts.slice(0, 15).forEach((x) => {
    lines.push(`- ${x.issue}: ${x.count}`);
  });
  lines.push('');
  lines.push('## Top Files');
  summary.topFiles.slice(0, 20).forEach((x) => {
    lines.push(`- ${x.file}: ${x.count}`);
  });

  const outMd = path.join(reportsDir, 'image-question-quality-audit.md');
  fs.writeFileSync(outMd, lines.join('\n'), 'utf8');

  console.log(`[audit:image] wrote ${path.relative(ROOT, outJson)}`);
  console.log(`[audit:image] wrote ${path.relative(ROOT, outMd)}`);
  console.log(
    `[audit:image] imageQuestions=${summary.totalImageQuestions} flagged=${summary.flaggedCount} (${summary.flaggedPercent}%) parseErrors=${summary.parseErrors}`
  );
}

main();
