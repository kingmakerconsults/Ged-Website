const test = require('node:test');
const assert = require('node:assert/strict');

const { applyFractionPlainTextModeToItem } = require('../utils/fractionPlainText');

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

test('applyFractionPlainTextModeToItem converts LaTeX fraction variants to slash notation', () => {
    const item = {
        questionText: 'Simplify \\tfrac{3x + 6}{9}.',
        passage: 'Consider the ratio \\cfrac{5}{10}.',
        answerOptions: [
            { text: '\\dfrac{1}{3}', isCorrect: true, rationale: 'Reduced from \\tfrac{3}{9}.' },
            { text: '2', isCorrect: false, rationale: 'Incorrect estimation.' }
        ]
    };

    const result = applyFractionPlainTextModeToItem(clone(item));

    assert.equal(result.questionText, 'Simplify (3x + 6)/9.');
    assert.equal(result.passage, 'Consider the ratio 5/10.');
    assert.equal(result.answerOptions[0].text, '1/3');
    assert.equal(result.answerOptions[0].rationale, 'Reduced from 3/9.');
    assert.equal(result.answerOptions[1].text, '2');
    assert.equal(result.answerOptions[1].rationale, 'Incorrect estimation.');

    const textFields = [
        result.questionText,
        result.passage,
        result.answerOptions[0].text,
        result.answerOptions[0].rationale,
        result.answerOptions[1].text,
        result.answerOptions[1].rationale
    ];

    for (const field of textFields) {
        if (typeof field === 'string') {
            assert.ok(!/\\[a-z]*frac/.test(field), `Expected no LaTeX fractions in: ${field}`);
        }
    }
});
