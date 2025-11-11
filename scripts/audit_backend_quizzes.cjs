#!/usr/bin/env node
/**
 * AUDIT BACKEND QUIZZES DIRECTLY
 * Check the backend/data/quizzes/ structure for quality issues
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

console.log('🔍 Auditing backend quiz quality...\n');

let totalQuestions = 0;
let totalQuizzes = 0;
let issuesFound = [];

const issues = {
  missingChallengeTags: 0,
  noRationales: 0,
  tooFewQuestions: 0,
  noQuestionMark: 0,
  placeholderText: 0,
};

Object.entries(ALL_QUIZZES).forEach(([subject, data]) => {
  if (!data.categories) return;

  Object.entries(data.categories).forEach(([catName, category]) => {
    if (!category.topics) return;

    category.topics.forEach((topic) => {
      if (!topic.questions || !Array.isArray(topic.questions)) return;

      totalQuizzes++;
      const questionCount = topic.questions.length;
      totalQuestions += questionCount;

      // Check: Minimum questions per quiz
      if (questionCount < 12) {
        issues.tooFewQuestions++;
        issuesFound.push(
          `[${subject}][${topic.id}] Only ${questionCount} questions (need 12+)`
        );
      }

      // Check each question
      topic.questions.forEach((q, idx) => {
        // Check: challenge_tags
        if (
          !q.challenge_tags ||
          !Array.isArray(q.challenge_tags) ||
          q.challenge_tags.length === 0
        ) {
          issues.missingChallengeTags++;
        }

        // Check: question text has '?'
        if (
          q.question &&
          !q.question.includes('?') &&
          !q.question
            .toLowerCase()
            .match(
              /\b(which|what|how|where|when|who|why|determine|calculate|identify|select)\b/
            )
        ) {
          issues.noQuestionMark++;
        }

        // Check: rationales for wrong answers
        if (q.answerOptions && Array.isArray(q.answerOptions)) {
          const wrongAnswers = q.answerOptions.filter((a) => !a.isCorrect);
          const missingRationale = wrongAnswers.some(
            (a) => !a.rationale || a.rationale.trim() === ''
          );
          if (missingRationale) {
            issues.noRationales++;
          }
        }

        // Check: placeholder text
        const fullText = JSON.stringify(q).toLowerCase();
        if (
          fullText.includes('placeholder') ||
          fullText.includes('todo') ||
          fullText.includes('xxx') ||
          fullText.includes('fixme')
        ) {
          issues.placeholderText++;
        }
      });
    });
  });
});

console.log('📊 Audit Results:');
console.log(`  Total quizzes: ${totalQuizzes}`);
console.log(`  Total questions: ${totalQuestions}`);
console.log(`\n🔍 Issues Found:`);
console.log(
  `  Missing challenge_tags: ${issues.missingChallengeTags} questions`
);
console.log(`  Missing rationales: ${issues.noRationales} questions`);
console.log(`  Too few questions (<12): ${issues.tooFewQuestions} quizzes`);
console.log(`  No question mark: ${issues.noQuestionMark} questions`);
console.log(`  Placeholder text: ${issues.placeholderText} questions`);

const totalIssues = Object.values(issues).reduce((a, b) => a + b, 0);
console.log(`\n  Total issues: ${totalIssues}`);

if (issues.tooFewQuestions > 0) {
  console.log(`\n📋 Quizzes with <12 questions (showing first 10):`);
  issuesFound.slice(0, 10).forEach((issue) => console.log(`  ${issue}`));
  if (issuesFound.length > 10) {
    console.log(`  ... and ${issuesFound.length - 10} more`);
  }
}

if (totalIssues === 0) {
  console.log(`\n✅ All backend quizzes pass quality checks!`);
} else {
  console.log(
    `\n⚠️  ${totalIssues} issues found across ${totalQuestions} questions (${(
      (totalIssues / totalQuestions) *
      100
    ).toFixed(2)}%)`
  );
}
