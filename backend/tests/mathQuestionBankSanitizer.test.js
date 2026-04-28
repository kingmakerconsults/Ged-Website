const test = require('node:test');
const assert = require('node:assert/strict');

const {
  sanitizeMathCatalog,
  sanitizeMathText,
  sanitizeMathQuestion,
  sanitizeMathQuestionList,
  sanitizeSubjectQuestion,
} = require('../src/lib/mathQuestionBankSanitizer');

test('sanitizeMathQuestion upgrades plain-text math in question fields', () => {
  const sanitized = sanitizeMathQuestion({
    questionText: 'Solve x^2',
    answerOptions: [{ text: '3/4', isCorrect: true, rationale: 'sqrt(9)' }],
    correctAnswer: '3/4',
  });

  assert.equal(sanitized.questionText, 'Solve \\(x^{2}\\)');
  assert.equal(sanitized.answerOptions[0].text, '\\(\\frac{3}{4}\\)');
  assert.equal(sanitized.answerOptions[0].rationale, '\\(\\sqrt{9}\\)');
  assert.equal(sanitized.correctAnswer, '\\(\\frac{3}{4}\\)');
});

test('sanitizeMathText repairs malformed premade math wrappers before upgrading', () => {
  assert.equal(
    sanitizeMathText(
      'Substitute -2 for x: f(-2) = \\((-2)^2 + 3 = 4 + 3 = 7\\).'
    ),
    'Substitute -2 for x: f(-2) = \\((-2)^2 + 3 = 4 + 3 = 7\\).'
  );
  assert.equal(
    sanitizeMathText(
      'The vertex form of a parabola is y = a\\((x - h)^2\\) + k.'
    ),
    'The vertex form of a parabola is y = a\\((x - h)^2\\) + k.'
  );
  assert.equal(
    sanitizeMathText(
      'Use the distance formula: d = sqrt((x2 - x1)^2 + (y2 - y1)^2).'
    ),
    'Use the distance formula: d = \\(\\sqrt{(x2 - x1)^2 + (y2 - y1)^2}\\).'
  );
});

test('sanitizeSubjectQuestion only changes Math questions', () => {
  const mathQuestion = sanitizeSubjectQuestion(
    { questionText: 'Find sqrt(49)' },
    'Math'
  );
  const scienceQuestion = sanitizeSubjectQuestion(
    { questionText: 'Find sqrt(49)' },
    'Science'
  );

  assert.equal(mathQuestion.questionText, 'Find \\(\\sqrt{49}\\)');
  assert.equal(scienceQuestion.questionText, 'Find sqrt(49)');
});

test('sanitizeMathQuestionList upgrades every question in a Math bank array', () => {
  const sanitized = sanitizeMathQuestionList([
    { questionText: 'What is 3/4 of 20?' },
    { questionText: 'Graph y <= 10' },
  ]);

  assert.equal(sanitized[0].questionText, 'What is \\(\\frac{3}{4}\\) of 20?');
  assert.equal(sanitized[1].questionText, 'Graph \\(y \\leq 10\\)');
});

test('sanitizeMathQuestion repairs premade rationale content recursively', () => {
  const sanitized = sanitizeMathQuestion({
    questionText: 'A line passes through (-2, 5) with slope 3/2.',
    rationale:
      'Use y = mx + b. Plug in the point: 5 = (3/2)(-2) + b -> b = 8. Equation: y = (3/2)x + 8.',
    answerOptions: [
      {
        text: 'y = (3/2)x + 8',
        isCorrect: true,
        rationale: '5 = (3/2)(-2) + b -> b = 8.',
      },
    ],
  });

  assert.equal(
    sanitized.rationale,
    'Use y = mx + b. Plug in the point: 5 = \\(\\frac{3}{2}\\)(-2) + b -> b = 8. Equation: y = \\(\\frac{3}{2}\\)x + 8.'
  );
  assert.equal(sanitized.answerOptions[0].text, 'y = \\(\\frac{3}{2}\\)x + 8');
  assert.equal(
    sanitized.answerOptions[0].rationale,
    '5 = \\(\\frac{3}{2}\\)(-2) + b -> b = 8.'
  );
});

test('sanitizeMathCatalog upgrades nested Math topics and quizzes only', () => {
  const catalog = {
    Math: {
      categories: {
        Algebra: {
          topics: [
            {
              id: 'math-topic',
              questions: [{ questionText: 'Solve x^2' }],
              quizzes: [
                {
                  title: 'Quiz A',
                  questions: [{ questionText: 'What is 3/4 of 12?' }],
                },
              ],
            },
          ],
        },
      },
    },
    Science: {
      categories: {
        Biology: {
          topics: [
            { id: 'science-topic', questions: [{ questionText: 'Solve x^2' }] },
          ],
        },
      },
    },
  };

  const sanitized = sanitizeMathCatalog(catalog);

  assert.equal(
    sanitized.Math.categories.Algebra.topics[0].questions[0].questionText,
    'Solve \\(x^{2}\\)'
  );
  assert.equal(
    sanitized.Math.categories.Algebra.topics[0].quizzes[0].questions[0]
      .questionText,
    'What is \\(\\frac{3}{4}\\) of 12?'
  );
  assert.equal(
    sanitized.Science.categories.Biology.topics[0].questions[0].questionText,
    'Solve x^2'
  );
});
