#!/usr/bin/env node
/*
 * ADMIN AUDIT SOURCE INVENTORY (Phase 1/2 + Duplicates)
 * Sources: backend/data/quizzes/**, frontend/app.jsx AppData, public/quizzes/*.json
 * Outputs:
 *  - reports/phase1_inventory_admin_sources.json
 *  - reports/phase2_completeness_admin_sources.json
 *  - reports/duplicates_admin_sources.json
 *  - reports/change_map_admin_sources_baseline.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');
const APP_JSX = path.join(ROOT, 'frontend', 'app.jsx');
const BACKEND_QUIZZES = path.join(ROOT, 'backend', 'data', 'quizzes');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function normalizeText(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\s+/g, ' ').trim();
}

function stableKeySort(value) {
  if (Array.isArray(value)) return value.map(stableKeySort);
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = stableKeySort(value[key]);
    }
    return out;
  }
  return value;
}

function hashObject(obj) {
  const stable = stableKeySort(obj);
  return require('crypto')
    .createHash('sha256')
    .update(JSON.stringify(stable))
    .digest('hex');
}

function slugify(str) {
  return normalizeText(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function getQuestionText(q) {
  if (!q || typeof q !== 'object') return '';
  return (
    q.questionText ||
    q.prompt ||
    q.stem ||
    q.question ||
    q.text ||
    (q.content &&
      (q.content.questionText || q.content.prompt || q.content.stem)) ||
    ''
  );
}

function getPassageText(q) {
  return q?.passage || q?.passageText || q?.passageHtml || '';
}

function getAnswerOptions(q) {
  if (Array.isArray(q?.answerOptions)) return q.answerOptions;
  if (Array.isArray(q?.choices)) return q.choices;
  if (Array.isArray(q?.answers)) return q.answers;
  if (Array.isArray(q?.options)) return q.options;
  return [];
}

function normalizeOption(opt) {
  if (opt && typeof opt === 'object') {
    return {
      text: normalizeText(
        opt.text || opt.label || opt.value || opt.answer || ''
      ),
      value: normalizeText(opt.value || opt.id || ''),
      isCorrect: !!(opt.isCorrect || opt.correct || opt.isAnswer),
    };
  }
  return { text: normalizeText(opt), value: '', isCorrect: false };
}

function detectQuestionMode(q) {
  const options = getAnswerOptions(q);
  if (options.length > 0) return 'multiple_choice';
  const type = normalizeText(
    q?.type || q?.questionType || q?.format || q?.kind || ''
  ).toLowerCase();
  if (/numeric|number|fill|short|response/.test(type)) return 'numeric';
  if (
    q?.correctAnswer !== undefined ||
    q?.answer !== undefined ||
    q?.correct !== undefined
  )
    return 'numeric';
  return 'unknown';
}

function checkCompleteness(q) {
  const issues = [];
  const questionText = normalizeText(getQuestionText(q));
  if (!questionText) issues.push('MISSING_STEM');

  const passageRef = !!(q?.passageId || q?.passageRef || q?.passageTitle);
  if (passageRef && !getPassageText(q))
    issues.push('PASSAGE_REFERENCE_WITHOUT_PASSAGE');

  const mode = detectQuestionMode(q);
  if (mode === 'multiple_choice') {
    const options = getAnswerOptions(q).map(normalizeOption);
    if (options.length < 2) issues.push('INSUFFICIENT_OPTIONS');
    if (options.some((o) => !o.text)) issues.push('EMPTY_OPTION_TEXT');
    const correctCount = options.filter((o) => o.isCorrect).length;
    if (correctCount !== 1) issues.push('INVALID_CORRECT_COUNT');
  } else if (mode === 'numeric') {
    const answer = q?.correctAnswer || q?.answer || q?.correct;
    if (
      answer === null ||
      answer === undefined ||
      normalizeText(answer) === ''
    ) {
      issues.push('MISSING_NUMERIC_ANSWER');
    }
  }

  return { mode, issues };
}

function computeContextFingerprint(item) {
  const q = item.question || {};
  const payload = {
    source: item.source,
    subject: item.subject,
    category: item.category,
    topicId: item.topicId,
    topicTitle: item.topicTitle,
    quizId: item.quizId,
    type: normalizeText(q.type || q.questionType || q.format || q.kind || ''),
    questionText: normalizeText(getQuestionText(q)),
    passage: normalizeText(getPassageText(q)),
    options: getAnswerOptions(q).map(normalizeOption),
    correctAnswer: normalizeText(
      q.correctAnswer || q.answer || q.correct || ''
    ),
    image: normalizeText(
      q.image || q.imageUrl || q.imageSrc || q.diagram || ''
    ),
  };
  return hashObject(payload);
}

function computeContentFingerprint(item) {
  const q = item.question || {};
  const options = getAnswerOptions(q).map(normalizeOption);
  const correctOptionTexts = options
    .filter((o) => o.isCorrect)
    .map((o) => o.text)
    .filter(Boolean);
  const payload = {
    type: normalizeText(q.type || q.questionType || q.format || q.kind || ''),
    questionText: normalizeText(getQuestionText(q)),
    passage: normalizeText(getPassageText(q)),
    options: options.map((o) => o.text),
    correctText: correctOptionTexts.length ? correctOptionTexts : undefined,
    correctAnswer: normalizeText(
      q.correctAnswer || q.answer || q.correct || ''
    ),
  };
  return hashObject(payload);
}

function enumerateBackendQuizzes(loadErrors) {
  const subjects = ['math', 'science', 'social-studies', 'rla'];
  const items = [];
  subjects.forEach((subjectFolder) => {
    const dir = path.join(BACKEND_QUIZZES, subjectFolder);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
    files.forEach((file) => {
      const abs = path.join(dir, file);
      try {
        delete require.cache[require.resolve(abs)];
        const questions = require(abs);
        const qArr = Array.isArray(questions)
          ? questions
          : questions?.questions || [];
        qArr.forEach((q, i) => {
          items.push({
            source: `backend/data/quizzes/${subjectFolder}`,
            subject: subjectFolder,
            category: 'backend',
            topicId: path.basename(file, '.js'),
            topicTitle: path.basename(file, '.js'),
            quizId: path.basename(file, '.js'),
            question: q,
            index: i + 1,
          });
        });
      } catch (err) {
        loadErrors.push({
          source: `backend/data/quizzes/${subjectFolder}`,
          file: `backend/data/quizzes/${subjectFolder}/${file}`,
          message: err?.message || 'Failed to load quiz file',
        });
      }
    });
  });
  return items;
}

function extractFullTopicObject(content, topicId) {
  const idPattern = new RegExp(`\\{\\s*id:\\s*['"]${topicId}['"]`, 'g');
  const match = idPattern.exec(content);
  if (!match) return null;
  let start = match.index;
  let braceCount = 0;
  let inString = false;
  let stringChar = null;
  let end = start;

  for (let i = start; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
    }
    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          end = i + 1;
          break;
        }
      }
    }
  }

  const objectStr = content.substring(start, end);
  try {
    return eval('(' + objectStr + ')');
  } catch {
    return null;
  }
}

function enumerateFrontendAppData() {
  if (!fs.existsSync(APP_JSX)) return [];
  const content = fs.readFileSync(APP_JSX, 'utf8');
  const appDataStart = content.indexOf('const AppData = {');
  if (appDataStart === -1) return [];
  const appDataSection = content.substring(appDataStart);
  const idPattern = /id:\s*['"]([a-z_0-9]+(?:_quiz\d+)?)['"]/gi;
  const matches = appDataSection.matchAll(idPattern);

  const items = [];
  const seen = new Set();
  for (const match of matches) {
    const id = match[1];
    if (seen.has(id)) continue;
    if (!/^(math_|sci_|ss_|rla_)/i.test(id)) continue;
    seen.add(id);
    const topicObj = extractFullTopicObject(content, id);
    if (!topicObj || !Array.isArray(topicObj.questions)) continue;
    const subject = id.startsWith('math_')
      ? 'Math'
      : id.startsWith('sci_')
        ? 'Science'
        : id.startsWith('ss_')
          ? 'Social Studies'
          : 'Reasoning Through Language Arts (RLA)';
    topicObj.questions.forEach((q, i) => {
      items.push({
        source: 'frontend/app.jsx',
        subject,
        category: 'AppData',
        topicId: topicObj.id || id,
        topicTitle: topicObj.title || topicObj.id || id,
        quizId: topicObj.id || id,
        question: q,
        index: i + 1,
      });
    });
  }
  return items;
}

function enumeratePublicQuizzes() {
  const dir = path.join(ROOT, 'public', 'quizzes');
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && !f.includes('.bak'));
  const items = [];
  files.forEach((file) => {
    const abs = path.join(dir, file);
    let raw = fs.readFileSync(abs, 'utf8');
    if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
    const data = JSON.parse(raw);
    const subjects = Object.entries(data || {});
    for (const [subjectName, subject] of subjects) {
      const categories = subject?.categories || {};
      for (const [catName, cat] of Object.entries(categories)) {
        const topics = cat?.topics || [];
        for (const topic of topics) {
          if (Array.isArray(topic.quizzes)) {
            for (const quiz of topic.quizzes) {
              const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
              qArr.forEach((q, i) => {
                items.push({
                  source: `public/quizzes/${file}`,
                  subject: subjectName,
                  category: catName,
                  topicId: topic.id || topic.title || 'topic',
                  topicTitle: topic.title || topic.id || 'topic',
                  quizId:
                    quiz.quizId || quiz.id || topic.id || topic.title || 'quiz',
                  question: q,
                  index: i + 1,
                });
              });
            }
          }
          if (Array.isArray(topic.questions)) {
            const quizId =
              topic.id || topic.title || `${subjectName}:${catName}`;
            topic.questions.forEach((q, i) => {
              items.push({
                source: `public/quizzes/${file}`,
                subject: subjectName,
                category: catName,
                topicId: topic.id || topic.title || 'topic',
                topicTitle: topic.title || topic.id || 'topic',
                quizId,
                question: q,
                index: i + 1,
              });
            });
          }
        }
        if (Array.isArray(cat.quizzes)) {
          for (const quiz of cat.quizzes) {
            const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
            qArr.forEach((q, i) => {
              items.push({
                source: `public/quizzes/${file}`,
                subject: subjectName,
                category: catName,
                topicId: 'general',
                topicTitle: 'general',
                quizId: quiz.quizId || quiz.id || quiz.title || 'quiz',
                question: q,
                index: i + 1,
              });
            });
          }
        }
      }
    }
  });
  return items;
}

function buildCounts(items) {
  const counts = {};
  items.forEach((item) => {
    const source = item.source;
    if (!counts[source]) counts[source] = { total: 0, subjects: {} };
    counts[source].total += 1;
    const subject = item.subject || 'unknown';
    const category = item.category || 'unknown';
    const topicId = item.topicId || 'topic';
    if (!counts[source].subjects[subject])
      counts[source].subjects[subject] = { total: 0, categories: {} };
    counts[source].subjects[subject].total += 1;
    if (!counts[source].subjects[subject].categories[category]) {
      counts[source].subjects[subject].categories[category] = {
        total: 0,
        topics: {},
      };
    }
    counts[source].subjects[subject].categories[category].total += 1;
    if (
      !counts[source].subjects[subject].categories[category].topics[topicId]
    ) {
      counts[source].subjects[subject].categories[category].topics[topicId] = 0;
    }
    counts[source].subjects[subject].categories[category].topics[topicId] += 1;
  });
  return counts;
}

function main() {
  ensureDir(REPORTS);
  const loadErrors = [];

  const allItems = [
    ...enumerateBackendQuizzes(loadErrors),
    ...enumerateFrontendAppData(),
    ...enumeratePublicQuizzes(),
  ];

  const inventory = [];
  const completeness = [];
  const changeMap = [];
  const contentMap = new Map();

  allItems.forEach((item) => {
    const question = item.question || {};
    const questionRef = [
      slugify(item.source),
      slugify(item.subject),
      slugify(item.category),
      slugify(item.topicId),
      slugify(item.quizId),
      `q${item.index}`,
    ].join('|');

    const contextFingerprint = computeContextFingerprint(item);
    const contentFingerprint = computeContentFingerprint(item);
    const { mode, issues } = checkCompleteness(question);

    inventory.push({
      questionRef,
      source: item.source,
      subject: item.subject,
      category: item.category,
      topicId: item.topicId,
      topicTitle: item.topicTitle,
      quizId: item.quizId,
      questionIndex: item.index,
      questionType: normalizeText(
        question.type ||
          question.questionType ||
          question.format ||
          question.kind ||
          ''
      ),
      fingerprint: contextFingerprint,
      contentFingerprint,
    });

    completeness.push({
      questionRef,
      source: item.source,
      subject: item.subject,
      category: item.category,
      topicId: item.topicId,
      topicTitle: item.topicTitle,
      quizId: item.quizId,
      questionIndex: item.index,
      mode,
      status: issues.length === 0 ? 'PASSED' : 'INCOMPLETE',
      issues,
    });

    changeMap.push({
      questionRef,
      source: item.source,
      fingerprint: contextFingerprint,
    });

    if (!contentMap.has(contentFingerprint))
      contentMap.set(contentFingerprint, []);
    contentMap.get(contentFingerprint).push({
      questionRef,
      source: item.source,
      subject: item.subject,
      category: item.category,
      topicId: item.topicId,
      quizId: item.quizId,
      questionIndex: item.index,
    });
  });

  const duplicates = [];
  for (const [hash, entries] of contentMap.entries()) {
    if (entries.length > 1) {
      duplicates.push({
        contentFingerprint: hash,
        count: entries.length,
        entries,
      });
    }
  }

  const counts = buildCounts(allItems);
  const datasetHash = hashObject(
    inventory
      .map((i) => `${i.questionRef}:${i.fingerprint}`)
      .sort()
      .join('|')
  );

  const completenessSummary = completeness.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { PASSED: 0, INCOMPLETE: 0 }
  );

  const phase1 = {
    scope: 'admin audit sources only',
    datasetHash,
    totalQuestions: inventory.length,
    counts,
    inventory,
    loadErrors,
  };

  const phase2 = {
    scope: 'admin audit sources only',
    datasetHash,
    summary: completenessSummary,
    completeness,
    loadErrors,
  };

  const duplicateReport = {
    scope: 'admin audit sources only',
    datasetHash,
    duplicateGroups: duplicates.length,
    duplicateQuestions: duplicates.reduce((sum, d) => sum + d.count, 0),
    duplicates: duplicates.sort((a, b) => b.count - a.count),
    loadErrors,
  };

  const baselineMap = {
    scope: 'admin audit sources only',
    datasetHash,
    changeMap,
  };

  fs.writeFileSync(
    path.join(REPORTS, 'phase1_inventory_admin_sources.json'),
    JSON.stringify(phase1, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(REPORTS, 'phase2_completeness_admin_sources.json'),
    JSON.stringify(phase2, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(REPORTS, 'duplicates_admin_sources.json'),
    JSON.stringify(duplicateReport, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(REPORTS, 'change_map_admin_sources_baseline.json'),
    JSON.stringify(baselineMap, null, 2) + '\n',
    'utf8'
  );

  console.log(
    'Admin-source Phase 1/2 + duplicates outputs written to reports/.'
  );
}

main();
