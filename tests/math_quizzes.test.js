import fs from 'fs';
import { strict as assert } from 'assert';
import { JSDOM } from 'jsdom';

// We need to simulate a browser environment for the script to run
const dom = new JSDOM(`<!DOCTYPE html><html><body><script></script></body></html>`, {
    runScripts: "dangerously",
    beforeParse(window) {
        // Define a dummy AppData object. The script will populate window.AppData.Math
        window.AppData = { Math: {} };
    }
});

const window = dom.window;

// Load the new math exams script into the JSDOM environment
const quiz_data_content = fs.readFileSync('frontend/data/quiz_data.js', 'utf8');
const scriptEl = window.document.createElement('script');
scriptEl.textContent = quiz_data_content;
window.document.body.appendChild(scriptEl);


function getAppData() {
    window.AppData.Math = window.ExpandedQuizData.Math;
    return window.AppData;
}


function runMathQuizTests() {
  const AppData = getAppData();
  const mathData = AppData.Math;
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

            // Unit test: each Math quiz has exactly 12 questions.
            assert.strictEqual(quiz.questions.length, 12, `Quiz ${quiz.quizId} should have exactly 12 questions.`);

            // Unit test: check difficulty distribution (3 easy, 6 medium, 3 hard)
            const easyCount = quiz.questions.filter(q => q.difficulty === 'easy').length;
            const mediumCount = quiz.questions.filter(q => q.difficulty === 'medium').length;
            const hardCount = quiz.questions.filter(q => q.difficulty === 'hard').length;
            assert.strictEqual(easyCount, 3, `Quiz ${quiz.quizId} should have 3 easy questions. Found ${easyCount}`);
            assert.strictEqual(mediumCount, 6, `Quiz ${quiz.quizId} should have 6 medium questions. Found ${mediumCount}`);
            assert.strictEqual(hardCount, 3, `Quiz ${quiz.quizId} should have 3 hard questions. Found ${hardCount}`);


            quiz.questions.forEach((q, idx) => {
              // Unit test: each question has questionNumber matching index.
              assert.strictEqual(q.questionNumber, idx + 1, `Question number should match index in ${quiz.quizId}`);

              // Unit test: each multiple choice question has answerOptions with exactly 1 correct.
              if (q.type === 'knowledge') {
                assert.ok(q.answerOptions && Array.isArray(q.answerOptions), `Question ${q.questionNumber} in ${quiz.quizId} should have answerOptions array.`);
                const correctCount = q.answerOptions.filter(a => a.isCorrect).length;
                assert.strictEqual(correctCount, 1, `Question ${q.questionNumber} in ${quiz.quizId} should have exactly one correct answer.`);
              }

              // Unit test: each fill-in-the-blank question has a correctAnswer string.
              if (q.type === 'fill-in-the-blank') {
                  assert.ok(typeof q.correctAnswer === 'string', `Fill-in-the-blank question ${q.questionNumber} in ${quiz.quizId} should have a correctAnswer string.`);
              }
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
