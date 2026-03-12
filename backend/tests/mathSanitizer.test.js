const test = require('node:test');
const assert = require('node:assert/strict');

const {
  normalizeMathToLatex,
  upgradeToKatex,
  upgradeQuestionToKatex,
} = require('../src/lib/mathSanitizer');

const cases = [
  ['3^2', '\\(3^{2}\\)'],
  ['x^n', '\\(x^{n}\\)'],
  ['x^(n+1)', '\\(x^{n+1}\\)'],
  ['Area = s^2', 'Area = \\(s^{2}\\)'],
];

for (const [input, expected] of cases) {
  test(`normalizeMathToLatex handles ${input}`, () => {
    assert.equal(normalizeMathToLatex(input), expected);
  });
}

test('normalizeMathToLatex keeps existing fraction structure without duplication', () => {
  const result = normalizeMathToLatex('The ratio is \\frac{a}{b}.');
  assert.equal(result, 'The ratio is \\(\\frac{a}{b}\\).');
});

test('normalizeMathToLatex is idempotent', () => {
  const initial = 'y^3 + \\frac{a}{b}';
  const once = normalizeMathToLatex(initial);
  const twice = normalizeMathToLatex(once);
  assert.equal(twice, once);
});

// ── upgradeToKatex tests ──────────────────────────────────────────

test('upgradeToKatex converts sqrt(expr) to \\(\\sqrt{expr}\\)', () => {
  assert.equal(upgradeToKatex('Find sqrt(49)'), 'Find \\(\\sqrt{49}\\)');
  assert.equal(upgradeToKatex('sqrt(x+4) = 3'), '\\(\\sqrt{x+4}\\) = 3');
});

test('upgradeToKatex converts standalone pi to \\(\\pi\\)', () => {
  const result = upgradeToKatex('Area = pi r^2');
  assert.ok(result.includes('\\(\\pi\\)'), `Expected \\(\\pi\\) in: ${result}`);
  assert.ok(
    result.includes('\\(r^{2}\\)'),
    `Expected \\(r^{2}\\) in: ${result}`
  );
});

test('upgradeToKatex does not convert pi inside words', () => {
  assert.equal(upgradeToKatex('pizza'), 'pizza');
  assert.equal(upgradeToKatex('pint'), 'pint');
});

test('upgradeToKatex converts numeric fractions', () => {
  assert.equal(
    upgradeToKatex('What is 3/4 of 20?'),
    'What is \\(\\frac{3}{4}\\) of 20?'
  );
});

test('upgradeToKatex converts single-letter fractions', () => {
  assert.equal(upgradeToKatex('Solve for a/b'), 'Solve for \\(\\frac{a}{b}\\)');
});

test('upgradeToKatex converts >= and <=', () => {
  assert.equal(upgradeToKatex('x >= 5'), '\\(x \\geq 5\\)');
  assert.equal(upgradeToKatex('y <= 10'), '\\(y \\leq 10\\)');
});

test('upgradeToKatex is idempotent', () => {
  const input = 'Solve x^2 + sqrt(9) where pi = 3.14 and 3/4 of x >= 5';
  const once = upgradeToKatex(input);
  const twice = upgradeToKatex(once);
  assert.equal(twice, once, 'upgradeToKatex must be idempotent');
});

test('upgradeToKatex preserves already-delimited math', () => {
  const input = '\\(x^{2}\\) + \\(\\frac{3}{4}\\)';
  assert.equal(upgradeToKatex(input), input);
});

test('upgradeToKatex handles exponents via normalizeMathToLatex', () => {
  assert.equal(upgradeToKatex('x^2 + y^3'), '\\(x^{2}\\) + \\(y^{3}\\)');
});

test('upgradeQuestionToKatex processes all text fields', () => {
  const q = {
    questionText: 'What is x^2?',
    answerOptions: [
      { text: '3/4', isCorrect: true, rationale: 'Because sqrt(9) = 3' },
      { text: '1/2', isCorrect: false, rationale: 'No' },
    ],
    correctAnswer: '3/4',
  };
  const result = upgradeQuestionToKatex(q);
  assert.ok(result.questionText.includes('\\(x^{2}\\)'));
  assert.ok(result.answerOptions[0].text.includes('\\(\\frac{3}{4}\\)'));
  assert.ok(result.answerOptions[0].rationale.includes('\\(\\sqrt{9}\\)'));
  assert.ok(result.correctAnswer.includes('\\(\\frac{3}{4}\\)'));
});
