#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGE_ROOT = path.join(ROOT, 'frontend', 'public');

const SOURCE_DIRS = [
  path.join(ROOT, 'backend', 'data', 'quizzes'),
  path.join(ROOT, 'backend', 'quizzes'),
  path.join(ROOT, 'public', 'quizzes'),
];

const EXCLUDED_FILES = new Set(['backend/data/quizzes/index.js']);

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
      if (entry.isDirectory()) stack.push(abs);
      else if (/\.(json|js|cjs)$/i.test(entry.name)) out.push(abs);
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
  const text = String(s || '').trim();
  return text ? text.split(/\s+/).length : 0;
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

function hasPattern(text, patterns) {
  return patterns.some((rx) => rx.test(String(text || '')));
}

function resolveImagePath(imageUrl) {
  if (!imageUrl) return { localPath: null, localExpected: false };
  const decoded = decodeURIComponent(String(imageUrl).trim());
  if (/^https?:\/\//i.test(decoded))
    return { localPath: null, localExpected: false };

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
  if (localExpected && localPath && !fs.existsSync(localPath))
    issues.push('missing_image_asset');

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

  return issues;
}

function parseFile(absPath) {
  if (absPath.endsWith('.json')) {
    try {
      const raw = fs.readFileSync(absPath, 'utf8').replace(/^\uFEFF/, '');
      return { ok: true, data: JSON.parse(raw), kind: 'json' };
    } catch (error) {
      return { ok: false, error: String(error.message || error) };
    }
  }

  try {
    delete require.cache[require.resolve(absPath)];
    return { ok: true, data: require(absPath), kind: 'js' };
  } catch (error) {
    return { ok: false, error: String(error.message || error) };
  }
}

function renumberQuestionsInArray(arr) {
  const questionLikeItems = arr.filter(
    (item) =>
      item &&
      typeof item === 'object' &&
      (item.answerOptions || item.content?.questionText || item.questionText)
  );
  if (!questionLikeItems.length) return;

  let next = 1;
  for (const item of arr) {
    if (
      item &&
      typeof item === 'object' &&
      typeof item.questionNumber !== 'undefined'
    ) {
      item.questionNumber = next;
      next += 1;
    }
  }
}

function pruneNode(node, counters) {
  if (Array.isArray(node)) {
    const processed = [];
    for (const item of node) {
      const next = pruneNode(item, counters);
      if (next && next.__dropQuestion === true) {
        counters.removed += 1;
        continue;
      }
      processed.push(next);
    }
    renumberQuestionsInArray(processed);
    return processed;
  }

  if (!node || typeof node !== 'object') return node;

  const out = {};
  for (const [key, value] of Object.entries(node)) {
    out[key] = pruneNode(value, counters);
  }

  const imageUrl = getImageUrl(out);
  if (imageUrl) {
    counters.imageQuestions += 1;
    const issues = scoreQuestion(out);
    if (issues.length > 0) {
      counters.flagged += 1;
      return { __dropQuestion: true };
    }
  }

  return out;
}

function writeFile(absPath, kind, data) {
  if (kind === 'json') {
    fs.writeFileSync(absPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    return;
  }

  fs.writeFileSync(
    absPath,
    `module.exports = ${JSON.stringify(data, null, 2)};\n`,
    'utf8'
  );
}

function main() {
  const files = SOURCE_DIRS.flatMap((dir) => listFilesRecursively(dir));
  const parseErrors = [];
  const touched = [];

  let totalImageQuestions = 0;
  let totalFlagged = 0;
  let totalRemoved = 0;

  for (const absPath of files) {
    const rel = path.relative(ROOT, absPath).replace(/\\/g, '/');
    if (EXCLUDED_FILES.has(rel)) continue;

    const parsed = parseFile(absPath);
    if (!parsed.ok) {
      parseErrors.push({ file: rel, error: parsed.error });
      continue;
    }

    const counters = { imageQuestions: 0, flagged: 0, removed: 0 };
    const nextData = pruneNode(parsed.data, counters);

    totalImageQuestions += counters.imageQuestions;
    totalFlagged += counters.flagged;
    totalRemoved += counters.removed;

    if (counters.removed > 0) {
      writeFile(absPath, parsed.kind, nextData);
      touched.push({
        file: rel,
        removed: counters.removed,
        imageQuestions: counters.imageQuestions,
      });
    }
  }

  const out = {
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    filesModified: touched.length,
    totalImageQuestions,
    totalFlagged,
    totalRemoved,
    parseErrors,
    touched: touched.sort((a, b) => b.removed - a.removed),
  };

  const reportsDir = path.join(ROOT, 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const outPath = path.join(reportsDir, 'image-question-rectify-report.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');

  console.log(
    JSON.stringify(
      {
        filesScanned: out.filesScanned,
        filesModified: out.filesModified,
        totalImageQuestions: out.totalImageQuestions,
        totalFlagged: out.totalFlagged,
        totalRemoved: out.totalRemoved,
        parseErrors: out.parseErrors.length,
        report: path.relative(ROOT, outPath).replace(/\\/g, '/'),
      },
      null,
      2
    )
  );
}

main();
