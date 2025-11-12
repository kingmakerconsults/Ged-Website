#!/usr/bin/env node
// Heuristic computational audit for premade Math quiz questions.
// Attempts to recompute answers for straightforward numeric evaluation prompts
// ("Evaluate ...", simple arithmetic/fraction operations, exponents, sqrt, scientific notation)
// using sanitized math JSON files. Generates a report of mismatches.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const QUIZ_DIR = path.join(ROOT, 'public', 'quizzes');
const SANITIZED_DIR = path.join(QUIZ_DIR, 'sanitized');

const SOURCE_FILES = ['math.quizzes.part1.json', 'math.quizzes.part2.json'];

function readJsonPreferSanitized(fname) {
  const sanitized = path.join(
    SANITIZED_DIR,
    fname.replace(/\.json$/, '.sanitized.json')
  );
  const original = path.join(QUIZ_DIR, fname);
  const file = fs.existsSync(sanitized) ? sanitized : original;
  return { file, data: JSON.parse(fs.readFileSync(file, 'utf8')) };
}

function enumerateQuestions(dataset) {
  const out = [];
  if (dataset.subject !== 'Math') return out;
  const categories = dataset.categories || {};
  for (const [catName, cat] of Object.entries(categories)) {
    const topics = cat.topics || [];
    for (const topic of topics) {
      for (const quiz of topic.quizzes || []) {
        for (const q of quiz.questions || []) {
          out.push({
            question:
              q.question ||
              q.content?.questionText ||
              q.content?.question ||
              null,
            obj: q,
            quizId: quiz.quizId || quiz.id || topic.id || 'unknown',
            category: catName,
          });
        }
      }
    }
  }
  return out;
}

// Convert a LaTeX-ish inline math string into a JS-evaluable expression.
function latexToJs(expr) {
  if (!expr) return null;
  let s = expr;
  // Remove surrounding $ if present
  s = s.replace(/^\$/, '').replace(/\$/, '');
  // Fractions \frac{a}{b} -> (a/b)
  s = s.replace(/\\frac\{(-?\d+)\}\{(-?\d+)\}/g, '($1/$2)');
  // Mixed number \tfrac{a}{b} kept similar (not expected to appear alone for computation)
  s = s.replace(/\\tfrac\{(-?\d+)\}\{(-?\d+)\}/g, '($1/$2)');
  // Exponents a^{b}
  s = s.replace(
    /(-?\d+(?:\.\d+)?|[A-Za-z])\s*\^\{(-?\d+)\}/g,
    'Math.pow($1,$2)'
  );
  // sqrt: \sqrt{...}
  s = s.replace(
    /\\sqrt\{([^{}]+)\}/g,
    (m, inner) => `Math.sqrt(${latexToJs(inner)})`
  );
  // Scientific notation a \times 10^{b}
  s = s.replace(
    /(-?\d+(?:\.\d+)?)\s*\\times\s*10\^\{(-?\d+)\}/g,
    '($1 * Math.pow(10,$2))'
  );
  // pi
  s = s.replace(/\\pi/g, 'Math.PI');
  // Clean braces leftover
  s = s.replace(/[{}]/g, '');
  return s;
}

function extractComputableExpression(questionText) {
  if (!questionText) return null;
  // Target starts like "Evaluate ..." or contains math markers
  const lower = questionText.toLowerCase();
  if (!lower.startsWith('evaluate') && !/\$/.test(questionText)) return null;
  // Grab math segments inside $...$
  const mathSegments = [...questionText.matchAll(/\$([^$]+)\$/g)].map(
    (m) => m[1]
  );
  if (mathSegments.length === 1) return latexToJs(mathSegments[0]);
  // If no explicit $ but starts with Evaluate, attempt to take substring after 'Evaluate'
  if (lower.startsWith('evaluate')) {
    const raw = questionText
      .replace(/^evaluate\s*/i, '')
      .trim()
      .replace(/[.?]$/, '');
    return latexToJs(raw);
  }
  return null;
}

function safeEvalNumeric(jsExpr) {
  if (!jsExpr) return null;
  try {
    // Disallow letters except Math and pi references already expanded
    if (
      /[^0-9+*\-()\/\. MathpowqrtPI]/.test(
        jsExpr.replace(/Math\.pow|Math\.sqrt|Math\.PI/g, '')
      )
    ) {
      // Contains unsupported tokens
      return null;
    }
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${jsExpr});`);
    const val = fn();
    if (typeof val === 'number' && Number.isFinite(val)) return val;
  } catch (_) {}
  return null;
}

function normalizeNumericText(t) {
  if (typeof t !== 'string') return null;
  // Strip units (simple) and commas
  let s = t.replace(/[,]/g, '').trim();
  s = s
    .replace(/\b(cm|m|ft|in|units|square|sq|meters|feet|inches)\b/gi, '')
    .replace(/\$|\%/g, '')
    .trim();
  // Remove trailing ^2, ^3 still in some unsanitized answer choices
  s = s.replace(/\$\^\{?\d+\}?$/, '').replace(/\^\d+$/, '');
  // Evaluate simple fractions
  if (/^\d+\s*\/\s*\d+$/.test(s)) {
    const [a, b] = s.split(/\//).map(Number);
    return a / b;
  }
  const num = Number(s);
  return Number.isFinite(num) ? num : null;
}

function approximatelyEqual(a, b, eps = 1e-6) {
  return a !== null && b !== null && Math.abs(a - b) <= eps;
}

function auditComputations(allQuestions) {
  const findings = [];
  for (const q of allQuestions) {
    const expr = extractComputableExpression(q.question);
    if (!expr) continue;
    const computed = safeEvalNumeric(expr);
    if (computed === null) continue;
    // Find declared correct option
    const opts = q.obj.answerOptions || [];
    const correct = opts.find((o) => o.isCorrect);
    if (!correct) continue;
    const optionValue = normalizeNumericText(correct.text);
    if (optionValue === null) continue; // Skip non-numeric answer
    if (!approximatelyEqual(optionValue, computed, 1e-6)) {
      findings.push({
        quizId: q.quizId,
        category: q.category,
        question: q.question,
        expression: expr,
        computed,
        recorded: optionValue,
        correctText: correct.text,
        rationale: correct.rationale,
      });
    }
  }
  return findings;
}

function main() {
  const report = {
    generatedAt: new Date().toISOString(),
    files: [],
    mismatches: [],
  };
  for (const fname of SOURCE_FILES) {
    const { file, data } = readJsonPreferSanitized(fname);
    const questions = enumerateQuestions(data);
    const mismatches = auditComputations(questions);
    report.files.push({
      file: path.relative(ROOT, file),
      totalQuestions: questions.length,
      computable: questions.filter((q) =>
        extractComputableExpression(q.question)
      ).length,
      mismatches: mismatches.length,
    });
    report.mismatches.push(...mismatches);
    console.log(
      `[compute-audit] ${path.basename(file)} -> computable=${
        questions.filter((q) => extractComputableExpression(q.question)).length
      } mismatches=${mismatches.length}`
    );
  }
  const outPath = path.join(
    ROOT,
    'reports',
    `math_computation_audit_${Date.now()}.json`
  );
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('Saved computation audit report:', path.relative(ROOT, outPath));
  if (report.mismatches.length) {
    console.log('First mismatches sample:', report.mismatches.slice(0, 5));
  } else {
    console.log(
      'No computational mismatches detected in heuristically computable questions.'
    );
  }
}

main();
