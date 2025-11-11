// Debug why ss_reading_sources_9 isn't loading
const path = require('path');

console.log('=== TESTING DIRECT LOAD ===');
const filePath = path.join(
  __dirname,
  'data',
  'quizzes',
  'social-studies',
  'ss_reading_sources_9.js'
);
console.log('Path:', filePath);

try {
  const questions = require(filePath);
  console.log('Loaded successfully');
  console.log('Type:', typeof questions);
  console.log('Is Array:', Array.isArray(questions));
  console.log('Length:', questions ? questions.length : 'N/A');
  if (Array.isArray(questions) && questions.length > 0) {
    console.log('First question:', questions[0].questionNumber);
  }
} catch (e) {
  console.log('Error:', e.message);
}

console.log('\n=== CHECKING SUPPLEMENTAL ENTRY ===');
const fs = require('fs');
const suppPath = path.join(
  __dirname,
  'data',
  'quizzes',
  'supplemental.topics.json'
);
const supplemental = JSON.parse(fs.readFileSync(suppPath, 'utf8'));

const entry = supplemental.find(
  (e) => e.topic && e.topic.id === 'ss_reading_sources_9'
);
if (entry) {
  console.log('Found in supplemental.topics.json:');
  console.log('  Subject:', entry.subjectKey);
  console.log('  Category:', entry.categoryName);
  console.log('  Topic ID:', entry.topic.id);
  console.log('  Folder:', entry.subjectFolder);
} else {
  console.log('NOT found in supplemental.topics.json');
}

console.log('\n=== CHECKING ALL_QUIZZES ===');
const { ALL_QUIZZES } = require('./data/quizzes/index.js');
const ss = ALL_QUIZZES['Social Studies'];
if (ss && ss.categories) {
  const readingCat = ss.categories['Reading Primary / Secondary Sources'];
  if (readingCat) {
    console.log('Category exists');
    console.log(
      'Topics count:',
      readingCat.topics ? readingCat.topics.length : 0
    );
    if (readingCat.topics) {
      readingCat.topics.forEach((t) => {
        console.log(
          `  - ${t.id}: ${t.questions ? t.questions.length : 0} questions`
        );
      });
    }
  } else {
    console.log('Category "Reading Primary / Secondary Sources" NOT FOUND');
    console.log('Available categories:', Object.keys(ss.categories));
  }
}
