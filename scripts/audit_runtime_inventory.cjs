#!/usr/bin/env node
/*
 * PHASE 1-2: Runtime Dataset Inventory + Completeness Audit
 * Canonical dataset: backend/data/quizzes/index.js (ALL_QUIZZES)
 * Scope: premade/static only (AI bank excluded)
 * Outputs (deterministic):
 *  - reports/phase1_inventory.json
 *  - reports/phase2_completeness.json
 *  - reports/change_map_baseline.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'reports');
const DATASET_PATH = path.join(ROOT, 'backend', 'data', 'quizzes', 'index.js');

function readDataset() {
  // eslint-disable-next-line global-require
  const mod = require(DATASET_PATH);
  return mod && mod.ALL_QUIZZES ? mod.ALL_QUIZZES : null;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function normalizeText(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  return str.replace(/\s+/g, ' ').trim();
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

function getQuestionText(q) {
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
  return q.passage || q.passageText || q.passageHtml || '';
}

function getAnswerOptions(q) {
  if (Array.isArray(q.answerOptions)) return q.answerOptions;
  if (Array.isArray(q.choices)) return q.choices;
  if (Array.isArray(q.answers)) return q.answers;
  if (Array.isArray(q.options)) return q.options;
  return [];
}

function normalizeOption(opt) {
  if (opt && typeof opt === 'object') {
    const text = normalizeText(
      opt.text || opt.label || opt.value || opt.answer || ''
    );
    const value = normalizeText(opt.value || opt.id || '');
    const isCorrect = !!(opt.isCorrect || opt.correct || opt.isAnswer);
    return { text, value, isCorrect };
  }
  return { text: normalizeText(opt), value: '', isCorrect: false };
}

function getQuestionType(q) {
  return normalizeText(
    q.type || q.questionType || q.format || q.kind || ''
  ).toLowerCase();
}

function hasLatex(value) {
  if (!value) return false;
  const s = String(value);
  return /\\\(|\\\[|\$[^$]+\$|\\frac\{|\\sqrt\{|\\times|\\div/.test(s);
}

function hasTable(value) {
  if (!value) return false;
  const s = String(value);
  return /<table[\s>]/i.test(s) || /\n\|.+\|\n\|[-\s:|]+\|/m.test(s);
}

function hasImage(value) {
  if (!value) return false;
  const s = String(value);
  return /<img\s/i.test(s) || /\/images\//i.test(s);
}

function hasPassage(q) {
  return !!(
    q.passage ||
    q.passageText ||
    q.passageHtml ||
    q.passageId ||
    q.passageRef
  );
}

const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/i,
  /placeholder/i,
  /tbd/i,
  /tk/i,
  /coming soon/i,
  /replace me/i,
  /^\s*\.{3,}\s*$/,
];

function looksPlaceholder(s) {
  if (!s || typeof s !== 'string') return false;
  const trimmed = s.trim();
  if (!trimmed) return true;
  return PLACEHOLDER_PATTERNS.some((re) => re.test(trimmed));
}

function computeFingerprint(q, context) {
  const questionText = normalizeText(getQuestionText(q));
  const passage = normalizeText(getPassageText(q));
  const type = getQuestionType(q);
  const options = getAnswerOptions(q).map(normalizeOption);
  const correctAnswer = normalizeText(
    q.correctAnswer || q.answer || q.correct || ''
  );
  const image = normalizeText(
    q.image || q.imageUrl || q.imageSrc || q.diagram || ''
  );

  const payload = {
    subject: context.subject,
    category: context.category,
    topicId: context.topicId,
    topicTitle: context.topicTitle,
    type,
    questionText,
    passage,
    options,
    correctAnswer,
    image,
  };
  return hashObject(payload);
}

function summarizeOptions(q) {
  const options = getAnswerOptions(q).map(normalizeOption);
  let correctCount = options.filter((o) => o.isCorrect).length;
  const correctAnswer = q.correctAnswer || q.answer || q.correct || null;
  if (
    correctCount === 0 &&
    correctAnswer !== null &&
    correctAnswer !== undefined
  ) {
    if (typeof correctAnswer === 'number' && options[correctAnswer]) {
      correctCount = 1;
    } else if (typeof correctAnswer === 'string') {
      const target = normalizeText(correctAnswer);
      if (target) {
        const match = options.find(
          (o) =>
            normalizeText(o.text) === target ||
            normalizeText(o.value) === target
        );
        if (match) correctCount = 1;
      }
    }
  }
  return { options, correctCount };
}

function detectQuestionMode(q) {
  const type = getQuestionType(q);
  const options = getAnswerOptions(q);
  if (options.length > 0) return 'multiple_choice';
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
  if (!questionText || looksPlaceholder(questionText)) {
    issues.push('MISSING_OR_PLACEHOLDER_STEM');
  }

  const passageRef = !!(q.passageId || q.passageRef || q.passageTitle);
  if (passageRef && !getPassageText(q)) {
    issues.push('PASSAGE_REFERENCE_WITHOUT_PASSAGE');
  }

  const mode = detectQuestionMode(q);
  if (mode === 'multiple_choice') {
    const { options, correctCount } = summarizeOptions(q);
    if (options.length < 2) issues.push('INSUFFICIENT_ANSWER_OPTIONS');
    if (options.some((o) => !o.text || looksPlaceholder(o.text))) {
      issues.push('EMPTY_OR_PLACEHOLDER_OPTION');
    }
    if (correctCount !== 1) issues.push('INVALID_CORRECT_ANSWER_COUNT');
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

function walkDataset(dataset) {
  const subjects = Object.keys(dataset || {}).sort((a, b) =>
    a.localeCompare(b)
  );
  const inventory = [];
  const completeness = [];
  const changeMap = [];
  const counts = {};

  for (const subject of subjects) {
    const subj = dataset[subject] || {};
    const categories = subj.categories || {};
    const categoryNames = Object.keys(categories).sort((a, b) =>
      a.localeCompare(b)
    );
    counts[subject] = counts[subject] || { total: 0, categories: {} };

    for (const category of categoryNames) {
      const cat = categories[category] || {};
      const topics = Array.isArray(cat.topics) ? cat.topics : [];
      const sortedTopics = [...topics].sort((a, b) => {
        const aKey = `${a?.id || ''} ${a?.title || ''}`.toLowerCase();
        const bKey = `${b?.id || ''} ${b?.title || ''}`.toLowerCase();
        return aKey.localeCompare(bKey);
      });

      counts[subject].categories[category] = counts[subject].categories[
        category
      ] || { total: 0, topics: {} };

      for (const topic of sortedTopics) {
        const topicId = topic?.id || topic?.title || 'topic';
        const topicTitle = topic?.title || topic?.id || 'Topic';
        const questions = Array.isArray(topic?.questions)
          ? topic.questions
          : [];
        const topicKey = `${topicId}`;

        counts[subject].categories[category].topics[topicKey] = {
          title: topicTitle,
          total: questions.length,
        };

        questions.forEach((q, index) => {
          const context = { subject, category, topicId, topicTitle };
          const questionText = normalizeText(getQuestionText(q));
          const passage = getPassageText(q);
          const questionRef = `${slugify(subject)}|${slugify(category)}|${slugify(
            topicId
          )}|q${index + 1}`;
          const fingerprint = computeFingerprint(q, context);

          const usesLatex =
            hasLatex(questionText) ||
            hasLatex(passage) ||
            hasLatex(JSON.stringify(getAnswerOptions(q)) || '');
          const usesTable =
            hasTable(questionText) ||
            hasTable(passage) ||
            hasTable(q.table || '');
          const usesImage =
            hasImage(questionText) ||
            hasImage(passage) ||
            hasImage(q.image || q.imageUrl || q.imageSrc || q.diagram || '');
          const usesPassage = hasPassage(q);

          const { mode, issues } = checkCompleteness(q);

          inventory.push({
            questionRef,
            fingerprint,
            subject,
            category,
            topicId,
            topicTitle,
            questionIndex: index + 1,
            questionType: getQuestionType(q),
            uses: {
              latex: usesLatex,
              table: usesTable,
              image: usesImage,
              passage: usesPassage,
            },
          });

          completeness.push({
            questionRef,
            fingerprint,
            subject,
            category,
            topicId,
            topicTitle,
            questionIndex: index + 1,
            mode,
            status: issues.length === 0 ? 'PASSED' : 'INCOMPLETE',
            issues,
          });

          changeMap.push({
            questionRef,
            fingerprint,
            subject,
            category,
            topicId,
            topicTitle,
            questionIndex: index + 1,
          });
        });

        counts[subject].categories[category].total += questions.length;
        counts[subject].total += questions.length;
      }
    }
  }

  return { inventory, completeness, changeMap, counts };
}

function buildSummary(completeness) {
  const summary = { PASSED: 0, INCOMPLETE: 0 };
  completeness.forEach((item) => {
    summary[item.status] = (summary[item.status] || 0) + 1;
  });
  return summary;
}

function datasetHash(inventory) {
  const compact = inventory
    .map((i) => `${i.questionRef}:${i.fingerprint}`)
    .sort()
    .join('|');
  return crypto.createHash('sha256').update(compact).digest('hex');
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function main() {
  ensureDir(OUTPUT_DIR);
  const dataset = readDataset();
  if (!dataset) {
    console.error('Failed to load dataset:', DATASET_PATH);
    process.exit(1);
  }

  const { inventory, completeness, changeMap, counts } = walkDataset(dataset);
  const dataHash = datasetHash(inventory);
  const summary = buildSummary(completeness);

  const phase1 = {
    source: 'backend/data/quizzes/index.js',
    scope: 'premade/static runtime',
    datasetHash: dataHash,
    counts,
    inventory,
  };

  const phase2 = {
    source: 'backend/data/quizzes/index.js',
    scope: 'premade/static runtime',
    datasetHash: dataHash,
    summary,
    completeness,
  };

  const baselineMap = {
    source: 'backend/data/quizzes/index.js',
    scope: 'premade/static runtime',
    datasetHash: dataHash,
    changeMap,
  };

  writeJson(path.join(OUTPUT_DIR, 'phase1_inventory.json'), phase1);
  writeJson(path.join(OUTPUT_DIR, 'phase2_completeness.json'), phase2);
  writeJson(path.join(OUTPUT_DIR, 'change_map_baseline.json'), baselineMap);
  console.log('Phase 1/2 outputs written to reports/.');
}

main();
