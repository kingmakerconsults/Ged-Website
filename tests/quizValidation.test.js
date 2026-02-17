// Quiz validation and optional auto-fix harness
// Usage:
//   node tests/quizValidation.test.js           # validation only (exit 1 on issues)
//   FIX_QUIZZES=1 node tests/quizValidation.test.js  # attempt structural auto-fixes, write files, then validate

import fs from 'fs';
import path from 'path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

const FIX_MODE = String(process.env.FIX_QUIZZES || '').trim() === '1';

function log(...args) {
  console.log(...args);
}
function warn(...args) {
  console.warn(...args);
}

function safeRead(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

// --- Loaders ---
async function loadFrontendQuizData() {
  const filePath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  try {
    // Use ESM import for this file
    const mod = await import(pathToFileURL(filePath).href);
    const data = mod.expandedQuizData || mod.default || null;
    return data
      ? [{ filePath: 'frontend/data/quiz_data.js', kind: 'esm', data }]
      : [];
  } catch (err) {
    warn(`[WARN] Could not import ${filePath}: ${err.message}`);
    return [];
  }
}

// pathToFileURL is imported from 'url'

function loadPremadeQuestions() {
  const filePath = path.join(root, 'backend', 'data', 'premade-questions.js');
  try {
    const mod = requireCJS(filePath);
    return [
      {
        filePath: 'backend/data/premade-questions.js',
        kind: 'cjs',
        data: mod.ALL_QUIZZES,
      },
    ];
  } catch (err) {
    warn(`[WARN] Could not require ${filePath}: ${err.message}`);
    return [];
  }
}

function loadQuizzesTxt() {
  const filePath = path.join(root, 'quizzes.txt');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    return [{ filePath: 'quizzes.txt', kind: 'json', data }];
  } catch (err) {
    warn(`[WARN] Could not load quizzes.txt: ${err.message}`);
    return [];
  }
}

function loadExpandedBundle() {
  const filePath = path.join(
    root,
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
  } catch (err) {
    warn(`[WARN] Could not parse Expanded bundle: ${err.message}`);
    return [];
  }
}

function loadNewExams() {
  const dir = path.join(root, 'frontend', 'New Exams');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  const results = [];
  for (const f of files) {
    const abs = path.join(dir, f);
    try {
      const raw = fs.readFileSync(abs, 'utf8');
      // Attempt to eval in sandbox: ensure variables are var, export to sandbox
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
          kind: 'jsobj',
          data: obj,
        });
      }
    } catch (err) {
      warn(`[WARN] Could not evaluate ${abs}: ${err.message}`);
    }
  }
  return results;
}

// Normalize into iterable list of questions with a common shape
function enumerateQuestionsFromDataTag({ filePath, data }) {
  const items = [];
  // Support multiple data shapes
  if (Array.isArray(data)) {
    // quizzes.txt array of quizzes
    for (const quiz of data) {
      const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
      qArr.forEach((q, i) =>
        items.push({
          filePath,
          quizId: quiz.id || quiz.title || 'unknown',
          question: q,
          index: i + 1,
          style: 'txt',
        })
      );
    }
    return items;
  }
  // expandedQuizData or ALL_QUIZZES or Expanded bundle style
  const subjects = Object.entries(data || {});
  for (const [subjectName, subject] of subjects) {
    const categories = subject?.categories || {};
    for (const [catName, cat] of Object.entries(categories)) {
      const topics = cat?.topics || [];
      for (const topic of topics) {
        // Some structures embed quizzes with questions; some place questions directly
        if (Array.isArray(topic.quizzes)) {
          for (const quiz of topic.quizzes) {
            const qArr = Array.isArray(quiz.questions) ? quiz.questions : [];
            qArr.forEach((q, i) =>
              items.push({
                filePath,
                quizId:
                  quiz.quizId ||
                  quiz.id ||
                  `${topic.id || topic.title || 'topic'}`,
                question: q,
                index: i + 1,
                style: 'mc',
              })
            );
          }
        }
        if (Array.isArray(topic.questions)) {
          const quizId = topic.id || topic.title || `${subjectName}:${catName}`;
          topic.questions.forEach((q, i) =>
            items.push({
              filePath,
              quizId,
              question: q,
              index: i + 1,
              style: 'mc',
            })
          );
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
              quizId: quiz.id || quiz.title || `${topic.id || topic.title}`,
              question: quiz.questions[i],
              index: i + 1,
              style: 'new-exam',
            });
          }
        }
      }
    }
  }
  return items;
}

// Validation helpers
function isObjectOptionStyle(q) {
  return (
    Array.isArray(q?.answerOptions) &&
    q.answerOptions.length > 0 &&
    typeof q.answerOptions[0] === 'object'
  );
}
function isStringOptionStyle(q) {
  return (
    Array.isArray(q?.answerOptions) &&
    q.answerOptions.length > 0 &&
    typeof q.answerOptions[0] === 'string'
  );
}

function normalizeBooleans(q) {
  if (!Array.isArray(q?.answerOptions)) return;
  for (const opt of q.answerOptions) {
    if (opt && 'isCorrect' in opt) opt.isCorrect = opt.isCorrect === true;
  }
}

function autoPickCorrect(q) {
  if (!Array.isArray(q?.answerOptions)) return -1;
  // Heuristics: pick option whose rationale contains 'Correct' or 'correct'
  let idx = q.answerOptions.findIndex(
    (o) => typeof o?.rationale === 'string' && /\bcorrect\b/i.test(o.rationale)
  );
  if (idx >= 0) return idx;
  // else fallback to first
  return q.answerOptions.length ? 0 : -1;
}

function validateQuestion(q, idx, issues, filePath, quizId) {
  const hasOptions =
    Array.isArray(q.answerOptions) && q.answerOptions.length > 0;
  const context = `[${filePath}][${quizId} Q#${idx}]`;

  if (hasOptions && isObjectOptionStyle(q)) {
    normalizeBooleans(q);
    const correctOptions = q.answerOptions.filter(
      (opt) => opt.isCorrect === true
    );
    if (correctOptions.length !== 1) {
      issues.push(
        `${context} Expected exactly 1 correct option, found ${correctOptions.length}`
      );
    }
    q.answerOptions.forEach((opt, oi) => {
      if (typeof opt.isCorrect !== 'boolean') {
        issues.push(
          `${context} opt ${oi + 1} isCorrect must be boolean true/false`
        );
      }
      if (
        !opt.rationale ||
        typeof opt.rationale !== 'string' ||
        !opt.rationale.trim()
      ) {
        issues.push(`${context} opt ${oi + 1} Missing or empty rationale text`);
      }
    });
    if (correctOptions.length === 1) {
      const correctOpt = correctOptions[0];
      const rat = String(correctOpt.rationale || '');
      const multipleClaim =
        /(both\s+[A-D]\s+and\s+[A-D])|(also\s+(?:option\s+)?[A-D]\b)/.test(rat);
      if (multipleClaim) {
        issues.push(`${context} Rationale implies multiple correct answers`);
      }
    }
  } else if (hasOptions && isStringOptionStyle(q)) {
    // new-exams or quizzes.txt style multiple choice
    if (!('correctAnswer' in q)) {
      issues.push(
        `${context} Multiple-choice string options but no correctAnswer field`
      );
    } else {
      const ca = String(q.correctAnswer || '').trim();
      if (!ca) issues.push(`${context} correctAnswer is empty`);
      if (!q.answerOptions.some((s) => String(s).trim() === ca)) {
        issues.push(`${context} correctAnswer does not match any option`);
      }
    }
  } else {
    // fill-in / free response
    if (!('correctAnswer' in q)) {
      issues.push(
        `${context} No multiple choice and no correctAnswer provided`
      );
    } else if (
      q.correctAnswer === null ||
      (typeof q.correctAnswer === 'string' && q.correctAnswer.trim() === '')
    ) {
      issues.push(`${context} correctAnswer is empty`);
    }
  }
}

// --- Math checks (lightweight, safe patterns only) ---
let replaceLatexFractionsWithSlash;
try {
  const fracUtil = requireCJS(
    path.join(root, 'backend', 'utils', 'fractionPlainText.js')
  );
  replaceLatexFractionsWithSlash = fracUtil.replaceLatexFractionsWithSlash;
} catch {
  replaceLatexFractionsWithSlash = (v) => v; // noop fallback
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}
function simplifyFrac(n, d) {
  if (d === 0) return { n, d };
  const sign = (n < 0) ^ (d < 0) ? -1 : 1;
  n = Math.abs(n);
  d = Math.abs(d);
  const g = gcd(n, d);
  return { n: sign * (n / g), d: d / g };
}
function fracToNumber(n, d) {
  return d === 0 ? NaN : n / d;
}
function decimalToFraction(x, maxDen = 1000) {
  if (!isFinite(x)) return null;
  // Continued fraction approximation
  let h1 = 1,
    h0 = 0,
    k1 = 0,
    k0 = 1,
    b = x;
  do {
    const a = Math.floor(b);
    const h2 = a * h1 + h0;
    h0 = h1;
    h1 = h2;
    const k2 = a * k1 + k0;
    k0 = k1;
    k1 = k2;
    const frac = h1 / k1;
    if (Math.abs(frac - x) < 1e-9 || k1 > maxDen) break;
    b = 1 / (b - a);
  } while (true);
  return simplifyFrac(h1, k1);
}

function normalizeMathText(text) {
  let t = String(text || '');
  try {
    const result = replaceLatexFractionsWithSlash(t);
    t = typeof result === 'object' && result.value ? result.value : result;
  } catch {
    /* noop */
  }
  // Remove LaTeX delimiters: \( \), \[ \], and $
  t = t.replace(/\\\(|\\\)|\\\[|\\\]|\$/g, '');
  return t;
}

function parseFractionLike(str) {
  const s = String(str || '').trim();
  // Mixed number: 2 1/4
  let m = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)/);
  if (m) {
    const w = parseInt(m[1], 10),
      num = parseInt(m[2], 10),
      den = parseInt(m[3], 10);
    const sign = w < 0 ? -1 : 1;
    return simplifyFrac(sign * (Math.abs(w) * den + num), den);
  }
  // Simple fraction: -3/5
  m = s.match(/^(-?\d+)\s*\/\s*(\d+)/);
  if (m) {
    return simplifyFrac(parseInt(m[1], 10), parseInt(m[2], 10));
  }
  // Percentage: 75%
  m = s.match(/^(-?\d+(?:\.\d+)?)\s*%/);
  if (m) {
    const v = parseFloat(m[1]) / 100;
    return decimalToFraction(v);
  }
  // Decimal or integer
  m = s.match(/^(-?\d+(?:\.\d+)?)/);
  if (m) {
    const v = parseFloat(m[1]);
    const f = decimalToFraction(v);
    return f || { n: v, d: 1 };
  }
  return null;
}

function computeExpectedFromQuestion(text) {
  const raw = normalizeMathText(text);
  const t = raw.replace(/\s+/g, ' ').trim();

  // Convert fraction to decimal
  let m = t.match(
    /(?:decimal\s+equivalent\s+of\s+the\s+fraction|convert\s+(?:the\s+)?fraction)\s+(-?\d+)\s*\/\s*(\d+)/i
  );
  if (m) {
    const n = parseInt(m[1], 10),
      d = parseInt(m[2], 10);
    return { kind: 'number', value: n / d };
  }
  // Express ... as a decimal
  m = t.match(/express\s+.*?(-?\d+)\s*\/\s*(\d+)\s+as\s+a\s+decimal/i);
  if (m) {
    const n = parseInt(m[1], 10),
      d = parseInt(m[2], 10);
    return { kind: 'number', value: n / d };
  }
  // Convert decimal to fraction
  m = t.match(
    /(?:convert|express)\s+(-?\d+(?:\.\d+)?)\s+(?:to|as)\s+(?:a\s+)?fraction/i
  );
  if (m) {
    const v = parseFloat(m[1]);
    const f = decimalToFraction(v);
    if (f) return { kind: 'fraction', n: f.n, d: f.d };
  }
  // Add/Subtract/Multiply/Divide the fractions
  const opMap = {
    '+': (a, b, c, d) => ({ n: a * d + b * c, d: b * d }),
    '-': (a, b, c, d) => ({ n: a * d - b * c, d: b * d }),
    x: (a, b, c, d) => ({ n: a * c, d: b * d }),
    '*': (a, b, c, d) => ({ n: a * c, d: b * d }),
    '÷': (a, b, c, d) => ({ n: a * d, d: b * c }),
    '/': (a, b, c, d) => ({ n: a * d, d: b * c }),
  };
  m = t.match(
    /(add|subtract|multiply|divide)\s+the\s+fractions\s*:?\s*(-?\d+)\s*\/\s*(\d+)\s*([+\-x\*÷\/])\s*(-?\d+)\s*\/\s*(\d+)/i
  );
  if (m) {
    const op = m[4];
    const a = parseInt(m[2], 10),
      b = parseInt(m[3], 10),
      c = parseInt(m[5], 10),
      d = parseInt(m[6], 10);
    const res = opMap[op] ? opMap[op](a, b, c, d) : null;
    if (res) {
      const s = simplifyFrac(res.n, res.d);
      return { kind: 'fraction', n: s.n, d: s.d };
    }
  }
  // Divide the fractions: fraction symbol variant like '\frac{...}' should be normalized already
  return null;
}

function optionMatchesExpectedText(text, expected) {
  const t = normalizeMathText(text).replace(/[,\$]/g, '').trim();
  const parsed = parseFractionLike(t);
  if (!parsed) return false;
  if (expected.kind === 'number') {
    const v = fracToNumber(parsed.n, parsed.d);
    return isFinite(v) && Math.abs(v - expected.value) < 1e-3;
  }
  if (expected.kind === 'fraction') {
    const lhs = simplifyFrac(parsed.n, parsed.d);
    const rhs = simplifyFrac(expected.n, expected.d);
    return lhs.n === rhs.n && lhs.d === rhs.d;
  }
  return false;
}

function maybeCheckMath(q, issues, filePath, quizId, idx) {
  const context = `[${filePath}][${quizId} Q#${idx}]`;
  const text = q?.question || q?.text || '';
  const expected = computeExpectedFromQuestion(text);
  if (!expected) return; // not a recognized math pattern

  // Pull correct option text depending on style
  let correctText = null;
  if (isObjectOptionStyle(q)) {
    const correct = (q.answerOptions || []).find(
      (o) => o && o.isCorrect === true
    );
    correctText = correct?.text || null;
  } else if (isStringOptionStyle(q)) {
    correctText = String(q.correctAnswer || '');
  }
  if (!correctText) return;

  if (!optionMatchesExpectedText(correctText, expected)) {
    const expectedStr =
      expected.kind === 'number'
        ? `${expected.value}`
        : `${expected.n}/${expected.d}`;
    issues.push(
      `${context} Math check: marked correct answer does not match computed result (expected ${expectedStr})`
    );
  }
}

function applyStructuralFixes(datasetTag, fixesSummary) {
  let changes = 0;
  const items = enumerateQuestionsFromDataTag(datasetTag);
  for (const { question: q, index, quizId } of items) {
    const hasOptions =
      Array.isArray(q.answerOptions) && q.answerOptions.length > 0;
    if (!hasOptions || !isObjectOptionStyle(q)) continue;
    // Ensure booleans
    const before = JSON.stringify(q);
    normalizeBooleans(q);
    const correctCount = q.answerOptions.filter(
      (o) => o.isCorrect === true
    ).length;
    if (correctCount !== 1) {
      const pick = autoPickCorrect(q);
      if (pick >= 0) {
        q.answerOptions.forEach((o, i) => {
          o.isCorrect = i === pick;
        });
      }
    }
    // Ensure rationale strings exist
    q.answerOptions.forEach((o) => {
      if (
        !o.rationale ||
        typeof o.rationale !== 'string' ||
        !o.rationale.trim()
      ) {
        o.rationale = o.isCorrect
          ? 'Correct. This option best satisfies the question.'
          : 'This option does not satisfy the requirements of the question.';
      }
    });
    const after = JSON.stringify(q);
    if (before !== after) {
      changes += 1;
      fixesSummary.fixes.push({
        questionId: `${quizId}#${index}`,
        issue:
          'Structural normalization (isCorrect count/booleans and rationale placeholders)',
        before: JSON.parse(before),
        after: JSON.parse(after),
      });
    }
  }
  return changes;
}

function writeFrontendQuizData(datasetTag) {
  const outPath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  const banner = 'export const expandedQuizData = ';
  const trailer = `\n\n(function(global) {\n    if (!global) {\n        return;\n    }\n    global.ExpandedQuizData = expandedQuizData;\n})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));\n\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = expandedQuizData;\n}\n`;
  const content =
    banner + JSON.stringify(datasetTag.data, null, 4) + ';\n' + trailer;
  fs.writeFileSync(outPath, content, 'utf8');
}

async function main() {
  const datasets = [
    ...(await loadFrontendQuizData()),
    ...loadPremadeQuestions(),
    ...loadQuizzesTxt(),
    ...loadExpandedBundle(),
    ...loadNewExams(),
  ];

  // Track fixes per file
  const fixLogs = [];
  if (FIX_MODE) {
    for (const tag of datasets) {
      // Only attempt to auto-fix object-style MC sources; skip generated bundle and CJS premade
      if (tag.filePath === 'frontend/data/quiz_data.js') {
        const summary = { filePath: tag.filePath, fixes: [] };
        const count = applyStructuralFixes(tag, summary);
        if (count > 0) {
          writeFrontendQuizData(tag);
          fixLogs.push(summary);
        }
      }
    }
  }

  const issues = [];
  let totalQuestions = 0;
  for (const tag of datasets) {
    let questions = [];
    if (tag.kind === 'jsobj' && tag.filePath.startsWith('frontend/New Exams')) {
      questions = enumerateQuestionsFromNewExams(tag);
    } else {
      questions = enumerateQuestionsFromDataTag(tag);
    }

    totalQuestions += questions.length;
    for (const it of questions) {
      validateQuestion(it.question, it.index, issues, it.filePath, it.quizId);
      // Only run math check for recognizable patterns to avoid false positives
      try {
        maybeCheckMath(it.question, issues, it.filePath, it.quizId, it.index);
      } catch {
        /* noop */
      }
    }
    log(`[REPORT] ${tag.filePath}: totalQuestions=${questions.length}`);
  }

  if (fixLogs.length) {
    log('--- FIX SUMMARY ---');
    log(JSON.stringify(fixLogs, null, 2));
  }

  if (issues.length) {
    log('--- ISSUES FOUND ---');
    issues.forEach((msg) => log(msg));
    process.exitCode = 1;
  } else {
    log(
      `All quizzes passed validation ✅ (checked ${totalQuestions} questions)`
    );
    process.exitCode = 0;
  }
}

main();
