/**
 * Snapshot-style integration tests that pin the current behavior of both
 * sanitizer entry points. These tests are intentionally tied to the *current*
 * outputs so that any regex change is forced to be a deliberate decision with
 * an updated baseline.
 *
 * Two pipelines are exercised side-by-side to document their divergence
 * (the catalog path applies upgradeToKatex; the exam path does not):
 *   - sanitizeMathCatalog (full Math catalog pipeline)
 *   - sanitizeExamObject  (exam delivery pipeline)
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  sanitizeMathCatalog,
  sanitizeMathText,
} = require('../src/lib/mathQuestionBankSanitizer');
const { sanitizeExamObject } = require('../src/lib/sanitizeExamText');

// ── Catalog pipeline (Math only, full upgradeToKatex) ──────────────

test('catalog pipeline: malformed \\(...\\) wrapper bug is preserved as-is', () => {
  // The previous bulk fixer eliminated all wrappers that swallowed prose;
  // any remaining well-formed \(math\) blocks must round-trip unchanged.
  assert.equal(
    sanitizeMathText('Substitute -2 for x: f(-2) = \\((-2)^2 + 3 = 4 + 3 = 7\\).'),
    'Substitute -2 for x: f(-2) = \\((-2)^2 + 3 = 4 + 3 = 7\\).'
  );
});

test('catalog pipeline: currency $N.NN escapes to &#36;N.NN', () => {
  assert.equal(
    sanitizeMathText('Books cost $12.50 plus $7 shipping.'),
    'Books cost &#36;12.50 plus &#36;7 shipping.'
  );
});

test('catalog pipeline: sqrt(expr) → \\(\\sqrt{expr}\\)', () => {
  assert.equal(
    sanitizeMathText('d = sqrt((x2 - x1)^2 + (y2 - y1)^2)'),
    'd = \\(\\sqrt{(x2 - x1)^2 + (y2 - y1)^2}\\)'
  );
});

test('catalog pipeline: numeric and single-letter fractions wrap', () => {
  assert.equal(
    sanitizeMathText('What is 3/4 of 20?'),
    'What is \\(\\frac{3}{4}\\) of 20?'
  );
  assert.equal(sanitizeMathText('Solve a/b'), 'Solve \\(\\frac{a}{b}\\)');
});

test('catalog pipeline: inequalities >= and <=', () => {
  assert.equal(sanitizeMathText('x >= 5'), '\\(x \\geq 5\\)');
  assert.equal(sanitizeMathText('y <= 10'), '\\(y \\leq 10\\)');
});

test('catalog pipeline: exponents x^2', () => {
  assert.equal(sanitizeMathText('Area = s^2'), 'Area = \\(s^{2}\\)');
});

test('catalog pipeline: idempotent on already-sanitized input', () => {
  const input =
    'Solve \\(x^{2}\\) + \\(\\sqrt{9}\\) where \\(\\pi\\) = 3.14 and \\(\\frac{3}{4}\\) of x \\(\\geq\\) 5';
  assert.equal(sanitizeMathText(sanitizeMathText(input)), sanitizeMathText(input));
});

test('catalog pipeline: sanitizeMathCatalog only touches Math subject', () => {
  const catalog = {
    Math: {
      categories: {
        Algebra: {
          topics: [
            {
              id: 't1',
              quizzes: [{ questions: [{ questionText: '3/4 of 20' }] }],
            },
          ],
        },
      },
    },
    Science: {
      categories: {
        Bio: {
          topics: [{ id: 's1', questions: [{ questionText: '3/4 of 20' }] }],
        },
      },
    },
  };
  const out = sanitizeMathCatalog(catalog);
  assert.equal(
    out.Math.categories.Algebra.topics[0].quizzes[0].questions[0].questionText,
    '\\(\\frac{3}{4}\\) of 20'
  );
  // Science is left alone.
  assert.equal(
    out.Science.categories.Bio.topics[0].questions[0].questionText,
    '3/4 of 20'
  );
});

// ── Exam pipeline (now unified with the catalog pipeline) ─────────

test('exam pipeline: exponents wrap', () => {
  const out = sanitizeExamObject({ stem: 'Area = s^2' }, 'latex');
  assert.equal(out.stem, 'Area = \\(s^{2}\\)');
});

test('exam pipeline (UNIFIED): sqrt(...) is converted (matches catalog)', () => {
  const out = sanitizeExamObject({ stem: 'Find sqrt(49)' }, 'latex');
  assert.equal(out.stem, 'Find \\(\\sqrt{49}\\)');
});

test('exam pipeline (UNIFIED): 3/4 is converted to a fraction (matches catalog)', () => {
  const out = sanitizeExamObject({ stem: 'What is 3/4 of 20?' }, 'latex');
  assert.equal(out.stem, 'What is \\(\\frac{3}{4}\\) of 20?');
});

test('exam pipeline (UNIFIED): currency $ is escaped (matches catalog)', () => {
  const out = sanitizeExamObject({ stem: 'Costs $12.50 each.' }, 'latex');
  assert.equal(out.stem, 'Costs &#36;12.50 each.');
});

test('exam pipeline: nested objects are sanitized recursively', () => {
  const exam = {
    title: 'Sample  Exam',
    questions: [
      {
        stem: 'x^(n+1)',
        choices: [{ text: 'x^2' }, { text: 'plain' }],
        explanation: '\\frac{a}{b}',
      },
    ],
  };
  const out = sanitizeExamObject(exam, 'latex');
  assert.equal(out.title, 'Sample Exam');
  assert.equal(out.questions[0].stem, '\\(x^{n+1}\\)');
  assert.equal(out.questions[0].choices[0].text, '\\(x^{2}\\)');
  assert.equal(out.questions[0].explanation, '\\(\\frac{a}{b}\\)');
});

test('exam pipeline === catalog pipeline for the same input', () => {
  const inputs = [
    'Find sqrt(49)',
    'What is 3/4 of 20?',
    'Solve a/b',
    'x >= 5',
    'Costs $12.50 each.',
    'Area = s^2',
  ];
  for (const text of inputs) {
    const catalog = sanitizeMathText(text);
    const exam = sanitizeExamObject({ stem: text }, 'latex').stem;
    assert.equal(exam, catalog, `divergence on input: ${text}`);
  }
});
