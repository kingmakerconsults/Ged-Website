#!/usr/bin/env node
/**
 * VERIFICATION TEST - After extraction
 * Verify backend loads all quizzes including newly extracted ones
 */

const path = require('path');
const { ALL_QUIZZES } = require(path.join(
  __dirname,
  '..',
  'backend',
  'data',
  'quizzes',
  'index.js'
));

console.log('🔍 Verifying backend quiz loading after extraction...\n');

let totalQuestions = 0;
const subjectCounts = {};

Object.entries(ALL_QUIZZES).forEach(([subject, data]) => {
  let subjectTotal = 0;

  if (data.categories) {
    Object.values(data.categories).forEach((cat) => {
      if (cat.topics) {
        cat.topics.forEach((topic) => {
          const count = topic.questions?.length || 0;
          subjectTotal += count;
        });
      }
    });
  }

  subjectCounts[subject] = subjectTotal;
  totalQuestions += subjectTotal;
});

console.log('📊 Results:');
Object.entries(subjectCounts).forEach(([subj, count]) => {
  console.log(`  ${subj}: ${count} questions`);
});

console.log(`\n✅ Total: ${totalQuestions} questions loaded`);
console.log(`\n📈 Change from before extraction:`);
console.log(`  Previous total: 2,293 questions`);
console.log(`  New total: ${totalQuestions} questions`);
console.log(`  Difference: +${totalQuestions - 2293} questions`);
