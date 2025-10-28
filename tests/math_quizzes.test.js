import { expandedQuizData } from '../frontend/data/quiz_data.js';
import { strict as assert } from 'assert';

const DEFAULT_MIN_QUESTIONS = 12;
const SPECIAL_MIN_COUNTS = {
  math_quant_basics_set1: 8,
  math_quant_basics_set2: 7,
};

function runMathQuizTests() {
  const mathData = expandedQuizData.Math;
  assert.ok(mathData, 'Math data should exist');
  assert.ok(mathData.categories, 'Math categories should exist');

  let totalQuizzesTested = 0;
  let quantitativeQuestionTotal = 0;
  const quantitativeQuizzesSeen = new Set();

  for (const categoryName in mathData.categories) {
    const category = mathData.categories[categoryName];
    if (category.topics) {
      for (const topic of category.topics) {
        if (topic.quizzes) {
          topic.quizzes.forEach(quiz => {
            console.log(`Testing quiz: ${quiz.quizId}`);

            const minQuestions = SPECIAL_MIN_COUNTS[quiz.quizId] ?? DEFAULT_MIN_QUESTIONS;
            assert.ok(
              quiz.questions.length >= minQuestions,
              `Quiz ${quiz.quizId} should have at least ${minQuestions} questions.`
            );

            if (quiz.quizId in SPECIAL_MIN_COUNTS) {
              quantitativeQuestionTotal += quiz.questions.length;
              quantitativeQuizzesSeen.add(quiz.quizId);
            }

            quiz.questions.forEach((q, idx) => {
              // Unit test: each question has questionNumber matching index.
              assert.strictEqual(q.questionNumber, idx + 1, `Question number should match index in ${quiz.quizId}`);

              // Unit test: each question has answerOptions with exactly 1 correct.
              const correctCount = q.answerOptions.filter(a => a.isCorrect).length;
              assert.strictEqual(correctCount, 1, `Question ${q.questionNumber} in ${quiz.quizId} should have exactly one correct answer.`);
            });
            totalQuizzesTested++;
          });
        }
      }
    }
  }

  if (quantitativeQuizzesSeen.size > 0) {
    assert.strictEqual(
      quantitativeQuestionTotal,
      15,
      'Quantitative Problem Solving quizzes should total 15 questions across all sets.'
    );
  }

  console.log(`\nSuccessfully tested ${totalQuizzesTested} Math quizzes.`);
  console.log('All Math quiz tests passed!');
}

try {
  runMathQuizTests();
} catch (error) {
  console.error('Math quiz tests failed:', error.message);
  process.exit(1);
}
