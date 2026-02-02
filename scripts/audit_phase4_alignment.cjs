#!/usr/bin/env node
/*
 * PHASE 4: Subject & Category Alignment (Heuristic Flags)
 * Canonical dataset: backend/data/quizzes/index.js (ALL_QUIZZES)
 * Scope: premade/static runtime only (AI bank excluded)
 * Output (deterministic): reports/phase4_alignment.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(ROOT, 'backend', 'data', 'quizzes', 'index.js');
const OUTPUT_PATH = path.join(ROOT, 'reports', 'phase4_alignment.json');

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

function computeFingerprint(q, context) {
  const payload = {
    subject: context.subject,
    category: context.category,
    topicId: context.topicId,
    topicTitle: context.topicTitle,
    type: normalizeText(q.type || q.questionType || q.format || q.kind || ''),
    questionText: normalizeText(getQuestionText(q)),
    passage: normalizeText(getPassageText(q)),
    options: Array.isArray(q.answerOptions)
      ? q.answerOptions
      : Array.isArray(q.choices)
        ? q.choices
        : [],
    correctAnswer: normalizeText(
      q.correctAnswer || q.answer || q.correct || ''
    ),
  };
  return hashObject(payload);
}

const SUBJECT_KEYWORDS = {
  Math: [
    'equation',
    'solve for',
    'fraction',
    'decimal',
    'percent',
    'ratio',
    'slope',
    'quadratic',
    'linear',
    'function',
    'geometry',
    'area',
    'perimeter',
    'volume',
    'triangle',
    'probability',
  ],
  Science: [
    'hypothesis',
    'experiment',
    'variable',
    'physics',
    'chemistry',
    'biology',
    'cell',
    'ecosystem',
    'energy',
    'force',
    'atom',
    'element',
  ],
  'Social Studies': [
    'constitution',
    'government',
    'economics',
    'geography',
    'history',
    'civics',
    'election',
    'supply and demand',
  ],
  'Reasoning Through Language Arts (RLA)': [
    'author',
    'tone',
    'purpose',
    'main idea',
    'inference',
    'passage',
    'grammar',
    'sentence',
    'conventions',
  ],
};

function scoreSubjectFit(subject, text) {
  const keywords = SUBJECT_KEYWORDS[subject] || [];
  const lower = text.toLowerCase();
  let score = 0;
  keywords.forEach((kw) => {
    if (lower.includes(kw)) score += 1;
  });
  return score;
}

function datasetHash(entries) {
  const compact = entries
    .map((i) => `${i.questionRef}:${i.fingerprint}`)
    .sort()
    .join('|');
  return crypto.createHash('sha256').update(compact).digest('hex');
}

function main() {
  const dataset = readDataset();
  if (!dataset) {
    console.error('Failed to load dataset:', DATASET_PATH);
    process.exit(1);
  }

  const entries = [];
  const flags = [];

  const subjects = Object.keys(dataset || {}).sort((a, b) =>
    a.localeCompare(b)
  );
  for (const subject of subjects) {
    const subj = dataset[subject] || {};
    const categories = subj.categories || {};
    const categoryNames = Object.keys(categories).sort((a, b) =>
      a.localeCompare(b)
    );
    for (const category of categoryNames) {
      const cat = categories[category] || {};
      const topics = Array.isArray(cat.topics) ? cat.topics : [];
      const sortedTopics = [...topics].sort((a, b) => {
        const aKey = `${a?.id || ''} ${a?.title || ''}`.toLowerCase();
        const bKey = `${b?.id || ''} ${b?.title || ''}`.toLowerCase();
        return aKey.localeCompare(bKey);
      });

      for (const topic of sortedTopics) {
        const topicId = topic?.id || topic?.title || 'topic';
        const topicTitle = topic?.title || topic?.id || 'Topic';
        const questions = Array.isArray(topic?.questions)
          ? topic.questions
          : [];
        questions.forEach((q, index) => {
          const context = { subject, category, topicId, topicTitle };
          const questionRef = `${slugify(subject)}|${slugify(category)}|${slugify(
            topicId
          )}|q${index + 1}`;
          const text = normalizeText(getQuestionText(q));
          const passage = normalizeText(getPassageText(q));
          const combined = `${text} ${passage}`.trim();
          const fingerprint = computeFingerprint(q, context);
          entries.push({ questionRef, fingerprint });

          const subjectScore = scoreSubjectFit(subject, combined);
          const otherScores = subjects
            .filter((s) => s !== subject)
            .map((s) => ({ subject: s, score: scoreSubjectFit(s, combined) }))
            .sort((a, b) => b.score - a.score);

          const bestOther = otherScores[0] || { subject: null, score: 0 };
          if (bestOther.score >= Math.max(2, subjectScore + 2)) {
            flags.push({
              questionRef,
              fingerprint,
              subject,
              category,
              topicId,
              topicTitle,
              questionIndex: index + 1,
              reason: 'SUBJECT_KEYWORD_MISMATCH',
              currentScore: subjectScore,
              suggestedSubject: bestOther.subject,
              suggestedScore: bestOther.score,
            });
          }
        });
      }
    }
  }

  const output = {
    source: 'backend/data/quizzes/index.js',
    scope: 'premade/static runtime',
    datasetHash: datasetHash(entries),
    summary: {
      totalQuestions: entries.length,
      flagged: flags.length,
    },
    flags: flags.sort((a, b) => a.questionRef.localeCompare(b.questionRef)),
  };

  ensureDir(path.dirname(OUTPUT_PATH));
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log('Phase 4 alignment output written to reports/.');
}

main();
