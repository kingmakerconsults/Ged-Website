const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeMathToLatex } = require('../src/lib/mathSanitizer');

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
