#!/usr/bin/env node
/*
 * PHASE 5: Technical Enforcement (KaTeX/Tables/Images)
 * Canonical dataset: backend/data/quizzes/index.js (ALL_QUIZZES)
 * Scope: premade/static runtime only (AI bank excluded)
 * Output (deterministic): reports/phase5_technical.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(ROOT, 'backend', 'data', 'quizzes', 'index.js');
const OUTPUT_PATH = path.join(ROOT, 'reports', 'phase5_technical.json');
const IMAGES_ROOT = path.join(ROOT, 'frontend', 'public', 'images');

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
  return String(value);
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
  return String(str || '')
    .trim()
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

function datasetHash(entries) {
  const compact = entries
    .map((i) => `${i.questionRef}:${i.fingerprint}`)
    .sort()
    .join('|');
  return crypto.createHash('sha256').update(compact).digest('hex');
}

function extractImagePaths(text) {
  const paths = new Set();
  const html = normalizeText(text);
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match = imgRegex.exec(html);
  while (match) {
    paths.add(match[1]);
    match = imgRegex.exec(html);
  }
  const inlineRegex = /(\/images\/[^\s"')]+)/gi;
  let m2 = inlineRegex.exec(html);
  while (m2) {
    paths.add(m2[1]);
    m2 = inlineRegex.exec(html);
  }
  return Array.from(paths);
}

function checkLatexWrapping(text) {
  const issues = [];
  const s = normalizeText(text);
  const inlineMath = s.match(/\$[^$]+\$/g) || [];
  if (inlineMath.length > 0) issues.push('INLINE_DOLLAR_MATH');
  if (
    /\\\(|\\\)/.test(s) === false &&
    /\\frac\{|\\sqrt\{|\\times|\\div/.test(s)
  ) {
    issues.push('MATH_NOT_WRAPPED');
  }
  if (/\$\s*\d+(?:\.\d+)?\s*\$/.test(s)) {
    issues.push('CURRENCY_IN_LATEX');
  }
  return issues;
}

function checkTables(text) {
  const s = normalizeText(text);
  if (!s) return [];
  const issues = [];
  if (/<table[\s>]/i.test(s)) {
    if (!/<\/table>/i.test(s)) issues.push('BROKEN_HTML_TABLE');
  }
  if (/\n\|.+\|\n\|[-\s:|]+\|/m.test(s)) {
    const rows = s
      .split(/\n/)
      .filter((line) => /^\s*\|/.test(line) && /\|\s*$/.test(line));
    if (rows.length > 2) {
      const colCounts = rows.map((r) => r.split('|').length);
      const base = colCounts[0];
      if (colCounts.some((c) => c !== base))
        issues.push('PIPE_TABLE_UNEVEN_COLUMNS');
    }
  }
  return issues;
}

function fileExistsFromWebPath(webPath) {
  if (!webPath || typeof webPath !== 'string') return false;
  const normalized = webPath.replace(/^\/+/, '/');
  if (!normalized.startsWith('/images/')) return false;
  let rel = normalized.replace(/^\/+/, '').replace(/\//g, path.sep);
  try {
    rel = decodeURIComponent(rel);
  } catch (err) {
    // keep original rel if decode fails
  }
  const roots = [
    ROOT,
    path.join(ROOT, 'frontend', 'public'),
    path.join(ROOT, 'public'),
  ];
  return roots.some((base) => fs.existsSync(path.join(base, rel)));
}

function main() {
  const dataset = readDataset();
  if (!dataset) {
    console.error('Failed to load dataset:', DATASET_PATH);
    process.exit(1);
  }

  const entries = [];
  const issues = [];
  const summary = {
    latexIssues: 0,
    tableIssues: 0,
    imageIssues: 0,
    totalQuestions: 0,
  };

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
          const options = getAnswerOptions(q).map(normalizeOption);
          const fingerprint = computeFingerprint(q, context);
          entries.push({ questionRef, fingerprint });
          summary.totalQuestions += 1;

          const latexIssues = [
            ...checkLatexWrapping(questionText),
            ...checkLatexWrapping(passage),
            ...options.flatMap(checkLatexWrapping),
          ];

          const tableIssues = [
            ...checkTables(questionText),
            ...checkTables(passage),
          ];

          const imagePaths = [
            ...extractImagePaths(questionText),
            ...extractImagePaths(passage),
          ];
          const explicitImage =
            q.image || q.imageUrl || q.imageSrc || q.diagram;
          if (explicitImage) imagePaths.push(explicitImage);

          const missingImages = imagePaths.filter(
            (p) => !fileExistsFromWebPath(p)
          );

          const itemIssues = [];
          if (latexIssues.length) {
            summary.latexIssues += 1;
            itemIssues.push(...latexIssues);
          }
          if (tableIssues.length) {
            summary.tableIssues += 1;
            itemIssues.push(...tableIssues);
          }
          if (missingImages.length) {
            summary.imageIssues += 1;
            itemIssues.push('MISSING_IMAGE');
          }

          if (itemIssues.length) {
            issues.push({
              questionRef,
              fingerprint,
              subject,
              category,
              topicId,
              topicTitle,
              questionIndex: index + 1,
              issues: Array.from(new Set(itemIssues)),
              missingImages: missingImages.length ? missingImages : undefined,
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
    summary,
    issues: issues.sort((a, b) => a.questionRef.localeCompare(b.questionRef)),
  };

  ensureDir(path.dirname(OUTPUT_PATH));
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log('Phase 5 technical report written to reports/.');
}

main();
