import fs from 'fs';
const data = JSON.parse(
  fs.readFileSync('backend/quizzes/math.quizzes.part1.json', 'utf8')
);

// Find questions with issues
console.log('\n=== FIRST QUESTION WITH NO TEXT ===');
for (const catKey in data.categories) {
  const topics = data.categories[catKey].topics;
  if (topics) {
    for (const t of topics) {
      if (t.quizzes) {
        for (const q of t.quizzes) {
          if (q.questions && q.questions[0]) {
            const qu = q.questions[0];
            if (!qu.question || typeof qu.question !== 'string') {
              console.log('Quiz ID:', q.quizId);
              console.log('First question missing text structure:');
              console.log(JSON.stringify(qu, null, 2).substring(0, 600));
              process.exit(0);
            }
          }
        }
      }
    }
  }
}

console.log('\n=== FIRST QUESTION WITH NO ANSWER OPTIONS ===');
for (const catKey in data.categories) {
  const topics = data.categories[catKey].topics;
  if (topics) {
    for (const t of topics) {
      if (t.quizzes) {
        for (const q of t.quizzes) {
          if (q.questions) {
            for (const qu of q.questions) {
              if (
                qu.question &&
                (!qu.answerOptions || qu.answerOptions.length === 0)
              ) {
                console.log('Quiz ID:', q.quizId);
                console.log('Question:', qu.question.substring(0, 100));
                console.log('Answer options:', qu.answerOptions);
                process.exit(0);
              }
            }
          }
        }
      }
    }
  }
}
