#!/usr/bin/env node
/*
 * FULL-SOURCE AUDIT (Phase 1/2 expansion + Duplicate flagging)
 * Includes: runtime dataset, legacy premade, frontend quiz_data, expanded bundle,
 * expanded per-subject arrays, New Exams, quizzes.txt, public runtime snapshots.
 * Outputs (deterministic):
 *  - reports/phase1_inventory_all_sources.json
 *  - reports/phase2_completeness_all_sources.json
 *  - reports/duplicates_all_sources.json
 *  - reports/change_map_all_sources_baseline.json
 */

const fs = require('fs');
const path = require('path');
const vm = require('node:vm');
const crypto = require('crypto');
const { pathToFileURL } = require('url');
const { createRequire } = require('module');

const ROOT = path.resolve(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');
const requireCJS = createRequire(__filename);

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
  const json = JSON.stringify(stable);
  return crypto.createHash('sha256').update(json).digest('hex');
}

function slugify(str) {
  return normalizeText(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function loadRuntimeDataset() {
  const filePath = path.join(ROOT, 'backend', 'data', 'quizzes', 'index.js');
  try {
    const mod = requireCJS(filePath);
    return [
      {
        filePath: 'backend/data/quizzes/index.js',
        kind: 'runtime',
        data: mod.ALL_QUIZZES,
      },
    ];
  } catch {
    return [];
  }
}

function loadPremadeQuestions() {
  const filePath = path.join(ROOT, 'backend', 'data', 'premade-questions.js');
  try {
    const mod = requireCJS(filePath);
    return [
      {
        filePath: 'backend/data/premade-questions.js',
        kind: 'legacy',
        data: mod.ALL_QUIZZES,
      },
    ];
  } catch {
    return [];
  }
}

async function loadFrontendQuizData() {
  const filePath = path.join(ROOT, 'frontend', 'data', 'quiz_data.js');
  try {
    const mod = await import(pathToFileURL(filePath).href);
    const data = mod.expandedQuizData || mod.default || null;
    return data
      ? [{ filePath: 'frontend/data/quiz_data.js', kind: 'esm', data }]
      : [];
  } catch {
    return [];
  }
}

function loadExpandedBundle() {
  const filePath = path.join(
    ROOT,
    'frontend',
    'Expanded',
    'expanded.quizzes.bundle.js'
  );
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const marker = 'window.ExpandedQuizData = ';
    const idx = raw.indexOf(marker);
    if (idx === -1) throw new Error('marker not found');
    const jsonStart = raw.indexOf('{', idx);
    const jsonEnd = raw.lastIndexOf('}');
    const jsonStr = raw.slice(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);
    return [
      {
        filePath: 'frontend/Expanded/expanded.quizzes.bundle.js',
        kind: 'bundle',
        data,
      },
    ];
  } catch {
    return [];
  }
}

async function loadExpandedArrays() {
  const dir = path.join(ROOT, 'frontend', 'Expanded');
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter(
      (f) => f.endsWith('_quizzes.js') || f === 'combined_math_quizzes.js'
    );
  const results = [];
  for (const f of files) {
    const abs = path.join(dir, f);
    try {
      const mod = await import(pathToFileURL(abs).href);
      const arrays = Object.values(mod).filter(
        (value) =>
          Array.isArray(value) &&
          value.some((q) => q && Array.isArray(q.questions))
      );
      const data = arrays.length === 1 ? arrays[0] : arrays;
      if (data && (Array.isArray(data) || Array.isArray(data[0]))) {
        results.push({
          filePath: `frontend/Expanded/${f}`,
          kind: 'expanded-array',
          data,
        });
      }
    } catch {}
  }
  return results;
}

function loadNewExams() {
  const dir = path.join(ROOT, 'frontend', 'New Exams');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  const results = [];
  for (const f of files) {
    const abs = path.join(dir, f);
    try {
      const raw = fs.readFileSync(abs, 'utf8');
      const code = raw.replace(
        /\bconst\s+([A-Za-z0-9_]+)\s*=\s*\{/,
        'var $1 = {'
      );
      const sandbox = {};
      vm.createContext(sandbox);
      new vm.Script(
        code +
          '\n;globalThis.__EXPORTED__ = typeof newMathExams!=="undefined"?newMathExams:undefined;'
      ).runInContext(sandbox, { timeout: 2000 });
      const obj = sandbox.__EXPORTED__;
      if (obj && typeof obj === 'object') {
        results.push({
          filePath: `frontend/New Exams/${f}`,
          kind: 'new-exams',
          data: obj,
        });
      }
    } catch {}
  }
  return results;
}

function loadQuizzesTxt() {
  const filePath = path.join(ROOT, 'quizzes.txt');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    return [{ filePath: 'quizzes.txt', kind: 'json-array', data }];
  } catch {
    return [];
  }
}

function loadQuizExpansions() {
  const filePath = path.join(ROOT, 'QUIZ_EXPANSIONS.js');
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const names = Array.from(
      raw.matchAll(/\b(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=/g)
    )
      .map((m) => m[1])
      .filter(Boolean);
    const exportBlock = `\n;globalThis.__QUIZ_EXPANSIONS__ = { ${names.join(', ')} };\n`;
    const sandbox = { module: { exports: {} }, exports: {} };
    vm.createContext(sandbox);
    new vm.Script(raw + exportBlock).runInContext(sandbox, { timeout: 2000 });
    const candidates = [];
    const exported = sandbox.__QUIZ_EXPANSIONS__ || {};
    for (const value of Object.values(exported)) {
      if (!value || typeof value !== 'object') continue;
      candidates.push(value);
    }
    const quizzes = [];
    const queue = [...candidates];
    while (queue.length) {
      const item = queue.shift();
      if (!item || typeof item !== 'object') continue;
      if (Array.isArray(item)) {
        item.forEach((entry) => queue.push(entry));
        continue;
      }
      if (Array.isArray(item.questions)) {
        quizzes.push(item);
      }
      for (const val of Object.values(item)) {
        if (val && typeof val === 'object') queue.push(val);
      }
    }
    if (quizzes.length) {
      return [
        { filePath: 'QUIZ_EXPANSIONS.js', kind: 'expansions', data: quizzes },
      ];
    }
    return [];
  } catch {
    return [];
  }
}

function loadPublicSnapshots() {
  const dir = path.join(ROOT, 'public', 'quizzes');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const results = [];
  for (const f of files) {
    const abs = path.join(dir, f);
    try {
      let raw = fs.readFileSync(abs, 'utf8');
      if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
      const data = JSON.parse(raw);
      results.push({
        filePath: `public/quizzes/${f}`,
        kind: 'public-json',
        data,
      });
    } catch {}
  }
  return results;
}

function enumerateQuestionsFromDataTag({ filePath, data }) {
  const items = [];
  if (Array.isArray(data)) {
    for (const quiz of data) {
      if (Array.isArray(quiz)) {
        quiz.forEach((qz) => {
          const qArr = Array.isArray(qz.questions) ? qz.questions : [];
          qArr.forEach((q, i) => {
            items.push({
              filePath,
              subject: qz.subject || qz.subjectName || 'unknown',
              category: qz.topic || qz.category || 'unknown',
              topicId: qz.id || qz.topic || qz.title || 'topic',
              topicTitle: qz.title || qz.topic || 'topic',
              quizId: qz.id || qz.title || 'unknown',
              question: q,
              index: i + 1,
            });
          });
        });
        continue;
      }
      const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
      qArr.forEach((q, i) => {
        items.push({
          filePath,
          subject: quiz.subject || quiz.subjectName || 'unknown',
          category: quiz.topic || quiz.category || 'unknown',
          topicId: quiz.id || quiz.topic || quiz.title || 'topic',
          topicTitle: quiz.title || quiz.topic || 'topic',
          quizId: quiz.id || quiz.title || 'unknown',
          question: q,
          index: i + 1,
        });
      });
    }
    return items;
  }

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
                filePath,
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
          const quizId = topic.id || topic.title || `${subjectName}:${catName}`;
          topic.questions.forEach((q, i) => {
            items.push({
              filePath,
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
              filePath,
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
  return items;
}

function enumerateQuestionsFromNewExams({ filePath, data }) {
  const items = [];
  for (const [subjectName, subject] of Object.entries(data || {})) {
    const categories = subject?.categories || {};
    for (const [catName, cat] of Object.entries(categories)) {
      for (const topic of cat.topics || []) {
        for (const quiz of topic.quizzes || []) {
          for (let i = 0; i < (quiz.questions || []).length; i++) {
            items.push({
              filePath,
              subject: subjectName,
              category: catName,
              topicId: topic.id || topic.title || 'topic',
              topicTitle: topic.title || topic.id || 'topic',
              quizId: quiz.id || quiz.title || topic.id || 'quiz',
              question: quiz.questions[i],
              index: i + 1,
            });
          }
        }
      }
    }
  }
  return items;
}

function getQuestionText(q) {
  if (!q || typeof q !== 'object') return '';
  const direct =
    typeof q.questionText === 'string'
      ? q.questionText
      : typeof q.text === 'string'
        ? q.text
        : typeof q.question === 'string'
          ? q.question
          : '';
  if (direct && direct.trim()) return direct;
  const content = q.content && typeof q.content === 'object' ? q.content : null;
  if (content) {
    const nested =
      typeof content.questionText === 'string'
        ? content.questionText
        : typeof content.text === 'string'
          ? content.text
          : typeof content.question === 'string'
            ? content.question
            : '';
    if (nested && nested.trim()) return nested;
  }
  return '';
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

function computeContextFingerprint(item) {
  const q = item.question || {};
  const payload = {
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

function detectQuestionMode(q) {
  const options = getAnswerOptions(q);
  if (options.length > 0) return 'multiple_choice';
  const type = normalizeText(
    q.type || q.questionType || q.format || q.kind || ''
  ).toLowerCase();
  if (/numeric|number|fill|short|response/.test(type)) return 'numeric';
  if (
    q.correctAnswer !== undefined ||
    q.answer !== undefined ||
    q.correct !== undefined
  )
    return 'numeric';
  return 'unknown';
}

function checkCompleteness(q) {
  const issues = [];
  const questionText = normalizeText(getQuestionText(q));
  if (!questionText) issues.push('MISSING_STEM');

  const passageRef = !!(q.passageId || q.passageRef || q.passageTitle);
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
    const answer = q.correctAnswer || q.answer || q.correct;
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

function buildCounts(items) {
  const counts = {};
  items.forEach((item) => {
    const source = item.filePath;
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

async function main() {
  ensureDir(REPORTS);
  const sources = [
    ...loadRuntimeDataset(),
    ...loadPremadeQuestions(),
    ...(await loadFrontendQuizData()),
    ...loadExpandedBundle(),
    ...(await loadExpandedArrays()),
    ...loadNewExams(),
    ...loadQuizzesTxt(),
    ...loadQuizExpansions(),
    ...loadPublicSnapshots(),
  ];

  const allItems = [];
  for (const source of sources) {
    if (source.kind === 'new-exams') {
      allItems.push(...enumerateQuestionsFromNewExams(source));
    } else {
      allItems.push(...enumerateQuestionsFromDataTag(source));
    }
  }

  const inventory = [];
  const completeness = [];
  const changeMap = [];
  const contentMap = new Map();

  allItems.forEach((item) => {
    const question = item.question || {};
    const questionRef = [
      slugify(item.filePath),
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
      source: item.filePath,
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
      source: item.filePath,
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
      source: item.filePath,
      fingerprint: contextFingerprint,
    });

    if (!contentMap.has(contentFingerprint))
      contentMap.set(contentFingerprint, []);
    contentMap.get(contentFingerprint).push({
      questionRef,
      source: item.filePath,
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
    scope: 'all sources (premade/static only; AI bank excluded)',
    datasetHash,
    totalQuestions: inventory.length,
    counts,
    inventory,
  };

  const phase2 = {
    scope: 'all sources (premade/static only; AI bank excluded)',
    datasetHash,
    summary: completenessSummary,
    completeness,
  };

  const duplicateReport = {
    scope: 'all sources (premade/static only; AI bank excluded)',
    datasetHash,
    duplicateGroups: duplicates.length,
    duplicateQuestions: duplicates.reduce((sum, d) => sum + d.count, 0),
    duplicates: duplicates.sort((a, b) => b.count - a.count),
  };

  const baselineMap = {
    scope: 'all sources (premade/static only; AI bank excluded)',
    datasetHash,
    changeMap,
  };

  fs.writeFileSync(
    path.join(REPORTS, 'phase1_inventory_all_sources.json'),
    JSON.stringify(phase1, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(REPORTS, 'phase2_completeness_all_sources.json'),
    JSON.stringify(phase2, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(REPORTS, 'duplicates_all_sources.json'),
    JSON.stringify(duplicateReport, null, 2) + '\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(REPORTS, 'change_map_all_sources_baseline.json'),
    JSON.stringify(baselineMap, null, 2) + '\n',
    'utf8'
  );

  console.log(
    'All-sources Phase 1/2 + duplicates outputs written to reports/.'
  );
}

main();
