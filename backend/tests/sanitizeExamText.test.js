const test = require('node:test');
const assert = require('node:assert/strict');

const {
    sanitizeField,
    sanitizeExamObject,
    normalizeProse
} = require('../src/lib/sanitizeExamText');

test('normalizeProse collapses repeated spaces while preserving newlines', () => {
    const input = 'Line   one\n  Line   two  ';
    const expected = 'Line one\nLine two';
    assert.equal(normalizeProse(input), expected);
});

test('sanitizeField converts exponents to latex wrappers', () => {
    assert.equal(sanitizeField('3^2'), '\\(3^{2}\\)');
});

test('sanitizeExamObject sanitizes nested structures recursively', () => {
    const exam = {
        title: 'Sample  Exam',
        questions: [
            {
                stem: 'x^(n+1)',
                choices: [
                    { text: 'x^2' },
                    { text: 'Plain choice' }
                ],
                explanation: '\\frac{a}{b}'
            }
        ]
    };

    const sanitized = sanitizeExamObject(exam, 'latex');
    assert.equal(sanitized.title, 'Sample Exam');
    assert.equal(sanitized.questions[0].stem, '\\(x^{n+1}\\)');
    assert.equal(sanitized.questions[0].choices[0].text, '\\(x^{2}\\)');
    assert.equal(sanitized.questions[0].explanation, '\\(\\frac{a}{b}\\)');
});

test('sanitizeExamObject is idempotent', () => {
    const exam = {
        stem: '3^2',
        explanation: 'Area = s^2'
    };

    const once = sanitizeExamObject(exam, 'latex');
    const twice = sanitizeExamObject(once, 'latex');
    assert.deepEqual(twice, once);
});
