// Quick test after fixing merge conflicts
const {ALL_QUIZZES} = require('./backend/data/quizzes/index.js');

console.log('=== QUIZ COUNTS AFTER MERGE CONFLICT FIXES ===\n');

Object.entries(ALL_QUIZZES).forEach(([subj, data]) => {
  let qCount = 0;
  let tCount = 0;
  if (data.categories) {
    Object.values(data.categories).forEach(cat => {
      if (cat.topics) {
        cat.topics.forEach(topic => {
          tCount++;
          if (topic.questions) qCount += topic.questions.length;
        });
      }
    });
  }
  console.log(`${subj}: ${tCount} topics, ${qCount} questions`);
});

console.log('\n✅ All files load successfully with merge conflicts resolved!');
