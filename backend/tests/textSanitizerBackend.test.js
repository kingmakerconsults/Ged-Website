const test = require('node:test');
const assert = require('node:assert/strict');

const { fixStr, cleanupQuizData } = require('../utils/textSanitizer');

test('fixStr collapses stray currency markers without touching other content', () => {
    const input = 'Please pay $$5 at the door.';
    const expected = 'Please pay $5 at the door.';
    assert.equal(fixStr(input), expected);
});

test('fixStr keeps display math that starts with digits intact', () => {
    const input = 'Solve $$2x+3=5$$ before moving on.';
    assert.equal(fixStr(input), input);
});

test('cleanupQuizData preserves valid display math across the quiz payload', () => {
    const quiz = {
        questions: [
            {
                questionNumber: 1,
                questionText: 'Evaluate $$2x+3=5$$.',
                rationale: 'Because $$2+3=5$$ is true.',
                answerOptions: [
                    { text: '$$x=1$$', rationale: 'Plugging in $$1$$ works.', isCorrect: true },
                    { text: '$$x=2$$', rationale: 'Plugging in $$2$$ fails.', isCorrect: false },
                ],
            },
        ],
    };

    const cleaned = cleanupQuizData(quiz);

    assert.equal(cleaned.questions[0].questionText, 'Evaluate $$2x+3=5$$.');
    assert.equal(cleaned.questions[0].rationale, 'Because $$2+3=5$$ is true.');
    assert.equal(cleaned.questions[0].answerOptions[0].text, '$$x=1$$');
    assert.equal(cleaned.questions[0].answerOptions[0].rationale, 'Plugging in $$1$$ works.');
});
