/* Quick sanity report of dynamic ALL_QUIZZES */
// CommonJS for easy node execution
const quizzes = require('../backend/data/quizzes');

for (const subj of Object.keys(quizzes.ALL_QUIZZES)) {
  let topics = 0, qs = 0;
  const cats = quizzes.ALL_QUIZZES[subj].categories || {};
  for (const catName of Object.keys(cats)) {
    const cat = cats[catName];
    for (const t of (cat.topics || [])) {
      topics++;
      qs += (t.questions || []).length;
    }
  }
  console.log(`${subj.padEnd(32)} topics ${String(topics).padStart(4)}  questions ${String(qs).padStart(5)}`);
}
