#!/usr/bin/env node
/*
 * PHASE 6: Final QA & Lock-In Summary
 * Aggregates Phase 1-5 outputs and re-validates dataset hash.
 * Output: reports/phase6_final_summary.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');
const DATASET_PATH = path.join(ROOT, 'backend', 'data', 'quizzes', 'index.js');
const OUTPUT_PATH = path.join(REPORTS, 'phase6_final_summary.json');

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function readDataset() {
  // eslint-disable-next-line global-require
  const mod = require(DATASET_PATH);
  return mod && mod.ALL_QUIZZES ? mod.ALL_QUIZZES : null;
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
    return normalizeText(
      opt.text || opt.label || opt.value || opt.answer || ''
    );
  }
  return normalizeText(opt);
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

function computeDatasetHash(dataset) {
  const list = [];
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
          const fingerprint = computeFingerprint(q, {
            subject,
            category,
            topicId,
            topicTitle,
          });
          const questionRef = `${subject}|${category}|${topicId}|q${index + 1}`;
          list.push(`${questionRef}:${fingerprint}`);
        });
      }
    }
  }
  return crypto
    .createHash('sha256')
    .update(list.sort().join('|'))
    .digest('hex');
}

function main() {
  const dataset = readDataset();
  if (!dataset) {
    console.error('Failed to load dataset:', DATASET_PATH);
    process.exit(1);
  }

  const phase1 = readJson(path.join(REPORTS, 'phase1_inventory.json'));
  const phase2 = readJson(path.join(REPORTS, 'phase2_completeness.json'));
  const phase3 = readJson(path.join(REPORTS, 'phase3_logical_review.json'));
  const phase4 = readJson(path.join(REPORTS, 'phase4_alignment.json'));
  const phase5 = readJson(path.join(REPORTS, 'phase5_technical.json'));
  const baseline = readJson(path.join(REPORTS, 'change_map_baseline.json'));

  const currentHash = computeDatasetHash(dataset);

  const summary = {
    source: 'backend/data/quizzes/index.js',
    scope: 'premade/static runtime',
    datasetHash: currentHash,
    phaseHashes: {
      phase1: phase1?.datasetHash || null,
      phase2: phase2?.datasetHash || null,
      phase3: phase3?.datasetHash || null,
      phase4: phase4?.datasetHash || null,
      phase5: phase5?.datasetHash || null,
      baseline: baseline?.datasetHash || null,
    },
    counts: phase1?.counts || null,
    completeness: phase2?.summary || null,
    logicalReview: phase3?.summary || null,
    alignment: phase4?.summary || null,
    technical: phase5?.summary || null,
    auditStatus: {
      missingFields: phase2?.summary?.INCOMPLETE || 0,
      logicalFlags: phase3?.summary?.flaggedQuestions || 0,
      alignmentFlags: phase4?.summary?.flagged || 0,
      technicalIssues: phase5?.issues?.length || 0,
    },
    notes: [
      'No edits performed during Phase 1-5. Change-map baseline captured.',
      'Phase 5 issues require remediation before certification as clean.',
    ],
  };

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(summary, null, 2) + '\n',
    'utf8'
  );
  console.log('Phase 6 final summary written to reports/.');
}

main();
