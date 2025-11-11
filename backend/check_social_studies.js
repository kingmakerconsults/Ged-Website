// Check Social Studies question distribution
const { ALL_QUIZZES } = require('./data/quizzes/index.js');

console.log('=== SOCIAL STUDIES BREAKDOWN ===\n');

const ss = ALL_QUIZZES['Social Studies'];
if (!ss || !ss.categories) {
  console.log('No Social Studies data found');
  process.exit(0);
}

let totalQuestions = 0;
let totalTopics = 0;

Object.entries(ss.categories).forEach(([catName, cat]) => {
  console.log(`\n${catName}:`);
  if (!cat.topics || cat.topics.length === 0) {
    console.log('  No topics');
    return;
  }

  let catQuestions = 0;
  cat.topics.forEach((topic) => {
    const qCount = topic.questions ? topic.questions.length : 0;
    catQuestions += qCount;
    totalQuestions += qCount;
    totalTopics++;
    console.log(`  ${topic.title}: ${qCount} questions`);
  });
  console.log(`  Category total: ${catQuestions} questions`);
});

console.log(`\n=== TOTAL ===`);
console.log(`Topics: ${totalTopics}`);
console.log(`Questions: ${totalQuestions}`);

// Compare with other subjects
console.log('\n=== COMPARISON ===');
[
  'Math',
  'Science',
  'Reasoning Through Language Arts (RLA)',
  'Social Studies',
].forEach((subj) => {
  const subjData = ALL_QUIZZES[subj];
  let qCount = 0;
  let tCount = 0;
  if (subjData && subjData.categories) {
    Object.values(subjData.categories).forEach((cat) => {
      if (cat.topics) {
        cat.topics.forEach((topic) => {
          tCount++;
          if (topic.questions) qCount += topic.questions.length;
        });
      }
    });
  }
  console.log(
    `${subj}: ${tCount} topics, ${qCount} questions (avg ${(
      qCount / tCount
    ).toFixed(1)} per topic)`
  );
});
