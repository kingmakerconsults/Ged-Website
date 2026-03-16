const test = require('node:test');
const assert = require('node:assert/strict');

const {
  normalizeMathToLatex,
  repairInlineMathDecimalFragments,
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

test('upgradeToKatex escapes currency $ to HTML entity', () => {
  const input =
    'Each book costs $12.50, and shipping for the entire order is a flat fee of $7.00.';
  const result = upgradeToKatex(input);
  // Currency $ signs should be escaped to &#36; so they are not parsed as math delimiters
  assert.ok(!result.includes('$12.50'), 'Should have escaped $12.50');
  assert.ok(!result.includes('$7.00'), 'Should have escaped $7.00');
  assert.ok(result.includes('&#36;12.50'), 'Should contain &#36;12.50');
  assert.ok(result.includes('&#36;7.00'), 'Should contain &#36;7.00');
  // The prose between the amounts should NOT be italicized/math-rendered
  assert.ok(
    result.includes('and shipping for the entire order'),
    'Prose should be preserved as-is'
  );
});

test('upgradeToKatex escapes $100 and $5,000.50', () => {
  assert.equal(
    upgradeToKatex('She has $100 to spend'),
    'She has &#36;100 to spend'
  );
  assert.equal(
    upgradeToKatex('The total was $5,000.50'),
    'The total was &#36;5,000.50'
  );
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

test('upgradeToKatex preserves decimal coefficients in inequalities', () => {
  assert.equal(upgradeToKatex('2.25m <= 20'), '\\(2.25m \\leq 20\\)');
  assert.equal(upgradeToKatex('m <= 7.33'), '\\(m \\leq 7.33\\)');
});

test('upgradeToKatex does not split decimal division into a fake fraction', () => {
  assert.equal(upgradeToKatex('65/0.15'), '65/0.15');
  assert.equal(upgradeToKatex('16.50/2.25'), '16.50/2.25');
});

test('repairInlineMathDecimalFragments merges decimal prefixes and suffixes', () => {
  assert.equal(
    repairInlineMathDecimalFragments('0.\\(15m \\leq 50\\)'),
    '\\(0.15m \\leq 50\\)'
  );
  assert.equal(
    repairInlineMathDecimalFragments('\\(x \\leq 8\\).33'),
    '\\(x \\leq 8.33\\)'
  );
  assert.equal(
    repairInlineMathDecimalFragments('\\(\\frac{65}{0}\\).15'),
    '\\(\\frac{65}{0.15}\\)'
  );
});

test('upgradeToKatex repairs malformed decimal-adjacent inline math', () => {
  assert.equal(
    upgradeToKatex('35 + 0.\\(15m \\leq 50\\)'),
    '35 + \\(0.15m \\leq 50\\)'
  );
  assert.equal(
    upgradeToKatex('x <= \\(\\frac{25}{3}\\) or \\(x \\leq 8\\).33'),
    'x <= \\(\\frac{25}{3}\\) or \\(x \\leq 8.33\\)'
  );
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
