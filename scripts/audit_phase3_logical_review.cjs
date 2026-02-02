#!/usr/bin/env node
/*
 * PHASE 3: Logical & Pedagogical Review (Automated Candidate Flags)
 * Canonical dataset: backend/data/quizzes/index.js (ALL_QUIZZES)
 * Scope: premade/static runtime only (AI bank excluded)
 * Output (deterministic): reports/phase3_logical_review.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(ROOT, 'backend', 'data', 'quizzes', 'index.js');
const OUTPUT_PATH = path.join(ROOT, 'reports', 'phase3_logical_review.json');

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

function computeFingerprint(q, context) {
  const payload = {
    subject: context.subject,
    category: context.category,
    topicId: context.topicId,
    topicTitle: context.topicTitle,
    type: getQuestionType(q),
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

function datasetHash(entries) {
  const compact = entries
    .map((i) => `${i.questionRef}:${i.fingerprint}`)
    .sort()
    .join('|');
  return crypto.createHash('sha256').update(compact).digest('hex');
}

function detectIssues(q, options) {
  const issues = [];
  const optionTexts = options.map((o) => normalizeText(o.text));
  const unique = new Set(optionTexts.filter(Boolean));
  if (
    options.length > 0 &&
    unique.size !== optionTexts.filter(Boolean).length
  ) {
    issues.push('DUPLICATE_OPTIONS');
  }

  const shortStem = normalizeText(getQuestionText(q));
  if (shortStem.split(' ').filter(Boolean).length < 3) {
    issues.push('SHORT_STEM');
  }

  const correctFlags = options.filter((o) => o.isCorrect).length;
  if (options.length > 0 && correctFlags > 1)
    issues.push('MULTIPLE_CORRECT_FLAGS');

  const correctAnswer = q.correctAnswer || q.answer || q.correct;
  if (
    options.length > 0 &&
    correctFlags === 0 &&
    typeof correctAnswer === 'string'
  ) {
    const target = normalizeText(correctAnswer);
    if (target) {
      const match = options.find(
        (o) =>
          normalizeText(o.text) === target || normalizeText(o.value) === target
      );
      if (!match) issues.push('CORRECT_NOT_IN_OPTIONS');
    }
  }

  return issues;
}

function loadLatestRlaFillerReport() {
  const reportsDir = path.join(ROOT, 'reports');
  if (!fs.existsSync(reportsDir)) return null;
  const files = fs
    .readdirSync(reportsDir)
    .filter((f) => /^rla_filler_mismatch_review_\d+\.json$/i.test(f));
  if (files.length === 0) return null;
  const latest = files
    .map((f) => ({ f, ts: Number(f.match(/(\d+)\.json$/i)?.[1] || 0) }))
    .sort((a, b) => b.ts - a.ts)[0]?.f;
  if (!latest) return null;
  const abs = path.join(reportsDir, latest);
  try {
    const data = JSON.parse(fs.readFileSync(abs, 'utf8'));
    return { path: `reports/${latest}`, data };
  } catch {
    return null;
  }
}

function indexQuestions(dataset) {
  const entries = [];
  const byText = new Map();
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
          const questionText = normalizeText(getQuestionText(q));
          const passage = normalizeText(getPassageText(q));
          const fingerprint = computeFingerprint(q, context);
          const key = `${questionText}||${passage}`;

          const entry = {
            questionRef,
            fingerprint,
            subject,
            category,
            topicId,
            topicTitle,
            questionIndex: index + 1,
            questionText,
            passage,
            questionType: getQuestionType(q),
            raw: q,
          };
          entries.push(entry);
          if (questionText) {
            if (!byText.has(key)) byText.set(key, []);
            byText.get(key).push(entry);
          }
        });
      }
    }
  }

  return { entries, byText };
}

function main() {
  const dataset = readDataset();
  if (!dataset) {
    console.error('Failed to load dataset:', DATASET_PATH);
    process.exit(1);
  }

  const { entries, byText } = indexQuestions(dataset);
  const rlaReport = loadLatestRlaFillerReport();
  const externalFlags = [];

  if (rlaReport && Array.isArray(rlaReport.data?.items)) {
    for (const item of rlaReport.data.items) {
      const qText = normalizeText(item.questionText);
      const passage = normalizeText(item.passage);
      const key = `${qText}||${passage}`;
      const matches = byText.get(key) || [];
      matches.forEach((entry) => {
        externalFlags.push({
          questionRef: entry.questionRef,
          fingerprint: entry.fingerprint,
          sourceReport: rlaReport.path,
          reason: 'RLA_FILLER_MISMATCH_REVIEW',
        });
      });
    }
  }

  const reviewItems = [];
  const issueCounts = {};

  for (const entry of entries) {
    const options = getAnswerOptions(entry.raw).map(normalizeOption);
    const issues = detectIssues(entry.raw, options);
    if (issues.length > 0) {
      reviewItems.push({
        questionRef: entry.questionRef,
        fingerprint: entry.fingerprint,
        subject: entry.subject,
        category: entry.category,
        topicId: entry.topicId,
        topicTitle: entry.topicTitle,
        questionIndex: entry.questionIndex,
        issues,
      });
      issues.forEach((issue) => {
        issueCounts[issue] = (issueCounts[issue] || 0) + 1;
      });
    }
  }

  const output = {
    source: 'backend/data/quizzes/index.js',
    scope: 'premade/static runtime',
    datasetHash: datasetHash(entries),
    summary: {
      totalQuestions: entries.length,
      flaggedQuestions: reviewItems.length,
      issueCounts,
      externalFlags: externalFlags.length,
    },
    externalFlags,
    reviewItems: reviewItems.sort((a, b) =>
      a.questionRef.localeCompare(b.questionRef)
    ),
  };

  ensureDir(path.dirname(OUTPUT_PATH));
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log('Phase 3 logical review output written to reports/.');
}

main();
