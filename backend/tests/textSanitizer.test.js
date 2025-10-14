const test = require('node:test');
const assert = require('node:assert/strict');

const sanitizer = require('../../frontend/textSanitizer.js');

const {
    tokenizeMathSegments,
    restoreMathSegments,
    normalizeCurrencyOutsideMath,
    normalizeLatexMacrosInMath,
    stripTextMacroInPlain,
    applyPhraseSpacingRepairs
} = sanitizer;

test('normalizeCurrencyOutsideMath fixes common currency defects', () => {
    const input = 'Pay $$5 and $0.65$ before it becomes 12.50$.';
    const expected = 'Pay $5 and $0.65 before it becomes $12.50.';
    assert.equal(normalizeCurrencyOutsideMath(input), expected);
});

test('normalizeCurrencyOutsideMath removes escaped dollar signs for currency', () => {
    const input = 'The tickets cost \\$15, \\$20, and even \\$35.50 each.';
    const expected = 'The tickets cost $15, $20, and even $35.50 each.';
    assert.equal(normalizeCurrencyOutsideMath(input), expected);
});

test('normalizeLatexMacrosInMath collapses duplicated macro prefixes', () => {
    const input = String.raw`\\frac{1}{2} + \\sqrt{x} + \\sin(\\theta)`;
    const expected = String.raw`\frac{1}{2} + \sqrt{x} + \sin(\theta)`;
    assert.equal(normalizeLatexMacrosInMath(input), expected);
});

test('stripTextMacroInPlain removes LaTeX text wrappers in plain strings', () => {
    const input = 'State the value of \\text{population} in the chart.';
    const expected = 'State the value of population in the chart.';
    assert.equal(stripTextMacroInPlain(input), expected);
});

test('applyPhraseSpacingRepairs restores readability for glued phrases', () => {
    const input = 'Whatisthevalueof x intheequation y?';
    const expected = 'What is the value of x in the equation y?';
    assert.equal(applyPhraseSpacingRepairs(input), expected);
});

test('tokenize and restore math segments preserves original text', () => {
    const original = 'Solve for x in $$3x + 2 = 8$$ and interpret the table in the text.';
    const { masked, segments } = tokenizeMathSegments(original);
    assert(masked.includes('__MATH_SEGMENT_0__'));
    assert.equal(restoreMathSegments(masked, segments), original);
});
