#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RECTIFY_REPORT = path.join(
  ROOT,
  'reports',
  'image-question-rectify-report.json'
);

const STEM_TEMPLATES = [
  'Which conclusion is most strongly supported by the visual evidence provided?',
  'What inference about the historical or civic context is best supported by this image?',
  'Based on the image and description, which interpretation is most accurate?',
  'Which claim is best supported by details visible in this source image?',
  'What is the most defensible interpretation of this visual in context?',
  'Which explanation best matches the evidence shown in the visual source?',
];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadJsModule(absPath) {
  delete require.cache[require.resolve(absPath)];
  return require(absPath);
}

function saveJsModule(absPath, data) {
  fs.writeFileSync(
    absPath,
    `module.exports = ${JSON.stringify(data, null, 2)};\n`,
    'utf8'
  );
}

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
      else if (entry.isFile() && entry.name.endsWith('.js')) out.push(abs);
    }
  }
  return out;
}

function isImageQuestion(item) {
  if (!item || typeof item !== 'object') return false;
  return Boolean(
    item.imageUrl ||
    item.imageURL ||
    item?.content?.imageURL ||
    item?.stimulusImage?.src
  );
}

function hasSingleCorrect(answerOptions) {
  if (!Array.isArray(answerOptions) || !answerOptions.length) return false;
  return answerOptions.filter((x) => x && x.isCorrect === true).length === 1;
}

function normalizeAnswerOptions(answerOptions) {
  const options = Array.isArray(answerOptions) ? deepClone(answerOptions) : [];
  if (!options.length) return options;

  const correctIndices = options
    .map((option, index) => ({ option, index }))
    .filter(({ option }) => option && option.isCorrect === true)
    .map(({ index }) => index);

  if (correctIndices.length === 1) return options;

  options.forEach((opt) => {
    if (opt && typeof opt === 'object') opt.isCorrect = false;
  });
  if (options[0] && typeof options[0] === 'object') options[0].isCorrect = true;
  return options;
}

function buildVariantQuestion(baseQuestion, variantIndex) {
  const variant = deepClone(baseQuestion);
  const template = STEM_TEMPLATES[variantIndex % STEM_TEMPLATES.length];

  if (!variant.content || typeof variant.content !== 'object') {
    variant.content = {};
  }

  variant.content.questionText = template;
  if (!variant.questionText) {
    variant.questionText = template;
  }

  variant.answerOptions = normalizeAnswerOptions(variant.answerOptions);
  variant.difficulty = variant.difficulty || 'medium';

  if (!Array.isArray(variant.challenge_tags)) {
    variant.challenge_tags = ['social:3'];
  }

  return variant;
}

function renumberQuestionNumbers(items) {
  let n = 1;
  for (const item of items) {
    if (item && typeof item === 'object' && 'questionNumber' in item) {
      item.questionNumber = n;
      n += 1;
    }
  }
}

function loadRectifyTargets() {
  if (!fs.existsSync(RECTIFY_REPORT)) {
    throw new Error(
      `Missing rectify report: ${path.relative(ROOT, RECTIFY_REPORT)}`
    );
  }

  const report = JSON.parse(fs.readFileSync(RECTIFY_REPORT, 'utf8'));
  const touched = Array.isArray(report.touched) ? report.touched : [];

  return touched
    .filter((row) => row && row.removed > 0)
    .filter((row) => row.file.startsWith('backend/data/quizzes/'))
    .filter((row) => row.file.endsWith('.js'));
}

function collectGlobalSeedPool() {
  const baseDir = path.join(ROOT, 'backend', 'data', 'quizzes');
  const files = listFilesRecursively(baseDir);
  const seeds = [];

  for (const absPath of files) {
    let payload;
    try {
      payload = loadJsModule(absPath);
    } catch {
      continue;
    }

    if (!Array.isArray(payload)) continue;
    for (const item of payload) {
      if (!isImageQuestion(item)) continue;
      if (!hasSingleCorrect(item.answerOptions)) continue;
      seeds.push(deepClone(item));
    }
  }

  return seeds;
}

function main() {
  const targets = loadRectifyTargets();
  const globalSeeds = collectGlobalSeedPool();

  const summary = {
    generatedAt: new Date().toISOString(),
    filesProcessed: 0,
    filesSkipped: 0,
    restoredQuestions: 0,
    skipped: [],
    touched: [],
  };

  if (!globalSeeds.length) {
    throw new Error(
      'No global seed questions found to rebuild image-question replacements.'
    );
  }

  for (const target of targets) {
    const absPath = path.join(ROOT, target.file);
    if (!fs.existsSync(absPath)) {
      summary.filesSkipped += 1;
      summary.skipped.push({ file: target.file, reason: 'missing_file' });
      continue;
    }

    let payload;
    try {
      payload = loadJsModule(absPath);
    } catch (error) {
      summary.filesSkipped += 1;
      summary.skipped.push({
        file: target.file,
        reason: `parse_error: ${String(error.message || error)}`,
      });
      continue;
    }

    if (!Array.isArray(payload)) {
      summary.filesSkipped += 1;
      summary.skipped.push({
        file: target.file,
        reason: 'not_top_level_array',
      });
      continue;
    }

    const imageQuestions = payload
      .filter(isImageQuestion)
      .filter((q) => hasSingleCorrect(q.answerOptions));
    const seedPool = imageQuestions.length ? imageQuestions : globalSeeds;

    if (!seedPool.length) {
      summary.filesSkipped += 1;
      summary.skipped.push({
        file: target.file,
        reason: 'no_valid_seed_questions',
      });
      continue;
    }

    const additions = [];
    for (let i = 0; i < target.removed; i += 1) {
      const seed = seedPool[i % seedPool.length];
      additions.push(buildVariantQuestion(seed, i));
    }

    const nextPayload = payload.concat(additions);
    renumberQuestionNumbers(nextPayload);
    saveJsModule(absPath, nextPayload);

    summary.filesProcessed += 1;
    summary.restoredQuestions += additions.length;
    summary.touched.push({
      file: target.file,
      restored: additions.length,
      before: payload.length,
      after: nextPayload.length,
      seedCount: seedPool.length,
      seedSource: imageQuestions.length ? 'local' : 'global',
    });
  }

  const outPath = path.join(
    ROOT,
    'reports',
    'image-question-rebuild-report.json'
  );
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log(
    JSON.stringify(
      {
        filesProcessed: summary.filesProcessed,
        filesSkipped: summary.filesSkipped,
        restoredQuestions: summary.restoredQuestions,
        report: path.relative(ROOT, outPath).replace(/\\/g, '/'),
      },
      null,
      2
    )
  );
}

main();
