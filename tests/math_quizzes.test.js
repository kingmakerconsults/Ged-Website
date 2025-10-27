import { expandedQuizData } from '../frontend/data/quiz_data.js';
import { strict as assert } from 'assert';

function runMathQuizTests() {
  const mathData = expandedQuizData.Math;
  assert.ok(mathData, 'Math data should exist');
  assert.ok(mathData.categories, 'Math categories should exist');

  let totalQuizzesTested = 0;

  for (const categoryName in mathData.categories) {
    const category = mathData.categories[categoryName];
    if (category.topics) {
      for (const topic of category.topics) {
        if (topic.quizzes) {
          topic.quizzes.forEach(quiz => {
            console.log(`Testing quiz: ${quiz.quizId}`);

            // Unit test: each Math quiz returns questions.length >= 12.
            assert.ok(quiz.questions.length >= 12, `Quiz ${quiz.quizId} should have at least 12 questions.`);

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
  console.log(`\nSuccessfully tested ${totalQuizzesTested} Math quizzes.`);
  console.log('All Math quiz tests passed!');
}

try {
  runMathQuizTests();
} catch (error) {
  console.error('Math quiz tests failed:', error.message);
  process.exit(1);
}
