const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  'public/quizzes/social-studies.utf8.json'
);
let raw = fs.readFileSync(filePath, 'utf8');
// Strip BOM if present
if (raw.charCodeAt(0) === 0xfeff) {
  raw = raw.slice(1);
}
const data = JSON.parse(raw);

const category = data.categories['U.S. History'];
let allQuizzes = [];

if (category.topics) {
  category.topics.forEach((t) => {
    if (t.quizzes) allQuizzes.push(...t.quizzes);
  });
}
if (category.quizzes) {
  allQuizzes.push(...category.quizzes);
}

console.log(`Total U.S. History Quizzes: ${allQuizzes.length}`);

const targetQuizIndex = 25;
if (allQuizzes[targetQuizIndex]) {
  const quiz = allQuizzes[targetQuizIndex];
  console.log(`Quiz ${targetQuizIndex} Title: ${quiz.title}`);
  console.log(`Quiz ${targetQuizIndex} ID: ${quiz.quizId}`);
  const question = quiz.questions[0];
  console.log('Question 0:', JSON.stringify(question, null, 2));
} else {
  console.log(`Quiz index ${targetQuizIndex} not found.`);
}
