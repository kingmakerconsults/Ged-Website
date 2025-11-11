#!/usr/bin/env node
/**
 * FIX EXTRACTED FILES - Convert to backend format
 *
 * Backend expects: module.exports = [questions array]
 * Extracted files have: module.exports = {id, title, questions: [...]}
 *
 * This script fixes the format.
 */

const fs = require('fs');
const path = require('path');

const BACKEND_QUIZZES = path.join(
  __dirname,
  '..',
  'backend',
  'data',
  'quizzes'
);
const FOLDERS = ['math', 'science', 'social-studies', 'rla'];

function log(msg, indent = 0) {
  console.log('  '.repeat(indent) + msg);
}

function fixFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');

  // Check if it needs fixing (exports an object instead of array)
  if (!content.includes('module.exports = {')) {
    return null; // Already correct format or different structure
  }

  try {
    const exported = require(filepath);

    // Case 1: Has questions array directly
    if (exported.questions && Array.isArray(exported.questions)) {
      const questions = exported.questions;
      const newContent = `/**
 * ${exported.title || exported.id}
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = ${JSON.stringify(questions, null, 2)};
`;
      fs.writeFileSync(filepath, newContent, 'utf8');
      return { type: 'questions', count: questions.length };
    }

    // Case 2: Has quizzes array with sub-quizzes
    if (exported.quizzes && Array.isArray(exported.quizzes)) {
      // Flatten all questions from all sub-quizzes
      const allQuestions = [];
      exported.quizzes.forEach((quiz) => {
        if (quiz.questions && Array.isArray(quiz.questions)) {
          allQuestions.push(...quiz.questions);
        }
      });

      if (allQuestions.length > 0) {
        const newContent = `/**
 * ${exported.title || exported.id}
 * Extracted from frontend app.jsx
 * Fixed to backend format: flattened from ${
   exported.quizzes.length
 } sub-quizzes
 */

module.exports = ${JSON.stringify(allQuestions, null, 2)};
`;
        fs.writeFileSync(filepath, newContent, 'utf8');
        return {
          type: 'quizzes-flattened',
          count: allQuestions.length,
          subQuizzes: exported.quizzes.length,
        };
      }

      return { type: 'quizzes-empty', count: 0 };
    }

    return null;
  } catch (err) {
    return { error: err.message };
  }
}

function main() {
  log('🔧 Fixing extracted quiz files to match backend format...\n');

  const results = {
    fixed: 0,
    flattened: 0,
    empty: 0,
    errors: 0,
    totalQuestions: 0,
  };

  const details = [];

  FOLDERS.forEach((folder) => {
    const dir = path.join(BACKEND_QUIZZES, folder);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));

    files.forEach((file) => {
      const filepath = path.join(dir, file);
      const result = fixFile(filepath);

      if (!result) return; // Already correct format

      if (result.error) {
        results.errors++;
        details.push({ file, error: result.error });
      } else if (result.type === 'questions') {
        results.fixed++;
        results.totalQuestions += result.count;
        details.push({ file, type: 'fixed', count: result.count });
      } else if (result.type === 'quizzes-flattened') {
        results.flattened++;
        results.totalQuestions += result.count;
        details.push({
          file,
          type: 'flattened',
          count: result.count,
          subQuizzes: result.subQuizzes,
        });
      } else if (result.type === 'quizzes-empty') {
        results.empty++;
        details.push({ file, type: 'empty' });
      }
    });
  });

  log('📊 Results:');
  log(`Fixed (direct questions): ${results.fixed} files`, 1);
  log(`Flattened (from sub-quizzes): ${results.flattened} files`, 1);
  log(`Empty (no questions): ${results.empty} files`, 1);
  log(`Errors: ${results.errors} files`, 1);
  log(`Total questions added: ${results.totalQuestions}`, 1);

  if (details.length > 0) {
    log(`\n📋 Details:`, 1);
    const byType = {
      fixed: [],
      flattened: [],
      empty: [],
      error: [],
    };

    details.forEach((d) => {
      if (d.type === 'fixed') byType.fixed.push(d);
      else if (d.type === 'flattened') byType.flattened.push(d);
      else if (d.type === 'empty') byType.empty.push(d);
      else if (d.error) byType.error.push(d);
    });

    if (byType.fixed.length > 0) {
      log(`\nFixed (${byType.fixed.length}):`, 1);
      byType.fixed.slice(0, 5).forEach((d) => log(`${d.file}: ${d.count}Q`, 2));
      if (byType.fixed.length > 5)
        log(`... and ${byType.fixed.length - 5} more`, 2);
    }

    if (byType.flattened.length > 0) {
      log(`\nFlattened (${byType.flattened.length}):`, 1);
      byType.flattened
        .slice(0, 5)
        .forEach((d) =>
          log(`${d.file}: ${d.count}Q from ${d.subQuizzes} sub-quizzes`, 2)
        );
      if (byType.flattened.length > 5)
        log(`... and ${byType.flattened.length - 5} more`, 2);
    }

    if (byType.empty.length > 0) {
      log(`\nEmpty (${byType.empty.length}) - should delete:`, 1);
      byType.empty.forEach((d) => log(d.file, 2));
    }

    if (byType.error.length > 0) {
      log(`\nErrors (${byType.error.length}):`, 1);
      byType.error.forEach((d) => log(`${d.file}: ${d.error}`, 2));
    }
  }

  log(`\n✅ Format conversion complete!`);
  log(`\n🔄 Next: Restart backend and verify question counts`, 1);
}

main();
