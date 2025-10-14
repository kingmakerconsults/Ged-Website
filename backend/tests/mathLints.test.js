const test = require('node:test');
const assert = require('node:assert/strict');

const { autoFixMathText, needsGptCorrection } = require('../src/lib/mathLints');

test('fixes missing backslash in frac', () => {
    const s = 'A. rac{1}{6}';
    const { text } = autoFixMathText(s);
    assert.ok(text.includes('\\frac{1}{6}'));
    assert.equal(needsGptCorrection(text).length, 0);
});

test('exponent normalization', () => {
    const { text } = autoFixMathText('area = s^2 and volume = s^(3)');
    assert.ok(text.includes('s^{2}'));
    assert.ok(text.includes('s^{3}'));
});
