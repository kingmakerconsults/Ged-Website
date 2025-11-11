#!/usr/bin/env node
/**
 * IDENTIFY QUESTIONS WITHOUT CHALLENGE TAGS
 * Find which specific quizzes still need tags
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

const missing = [];

Object.entries(ALL_QUIZZES).forEach(([subject, data]) => {
  if (!data.categories) return;

  Object.entries(data.categories).forEach(([catName, category]) => {
    if (!category.topics) return;

    category.topics.forEach((topic) => {
      if (!topic.questions || !Array.isArray(topic.questions)) return;

      let questionsMissingTags = 0;
      topic.questions.forEach((q) => {
        if (
          !q.challenge_tags ||
          !Array.isArray(q.challenge_tags) ||
          q.challenge_tags.length === 0
        ) {
          questionsMissingTags++;
        }
      });

      if (questionsMissingTags > 0) {
        missing.push({
          subject,
          category: catName,
          id: topic.id,
          title: topic.title,
          totalQuestions: topic.questions.length,
          missingTags: questionsMissingTags,
        });
      }
    });
  });
});

console.log(`Found ${missing.length} quizzes with missing challenge_tags:\n`);

const bySubject = {};
missing.forEach((q) => {
  if (!bySubject[q.subject]) bySubject[q.subject] = [];
  bySubject[q.subject].push(q);
});

Object.entries(bySubject).forEach(([subject, quizzes]) => {
  const totalMissing = quizzes.reduce((sum, q) => sum + q.missingTags, 0);
  console.log(
    `${subject}: ${quizzes.length} quizzes, ${totalMissing} questions`
  );
  quizzes.slice(0, 5).forEach((q) => {
    console.log(
      `  ${q.id}: ${q.missingTags}/${q.totalQuestions}Q missing tags`
    );
  });
  if (quizzes.length > 5) {
    console.log(`  ... and ${quizzes.length - 5} more`);
  }
  console.log('');
});
