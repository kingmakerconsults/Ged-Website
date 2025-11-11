#!/usr/bin/env node
/**
 * ADD MISSING RATIONALES
 *
 * Adds placeholder rationales to answer options that are missing them.
 * Uses AI-friendly templates that explain why answers are incorrect.
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

function generateRationale(question, answerText, isCorrect) {
  if (isCorrect) {
    return answerText; // Correct answers can have their text as rationale
  }

  // Generate a basic rationale for wrong answers
  const templates = [
    `This answer is incorrect. Review the passage carefully to find the correct information.`,
    `This is not the correct answer based on the information provided.`,
    `This option does not accurately reflect the passage or question context.`,
    `While this might seem plausible, it is not supported by the information given.`,
    `This answer is incorrect. Consider the key details in the question.`,
  ];

  // Pick a template based on answer text length (for variety)
  const idx = answerText.length % templates.length;
  return templates[idx];
}

function addRationalesToFile(filepath) {
  try {
    const questions = require(filepath);
    if (!Array.isArray(questions) || questions.length === 0) return null;

    let questionsFixed = 0;
    let rationalesAdded = 0;

    const updated = questions.map((q) => {
      if (!q.answerOptions || !Array.isArray(q.answerOptions)) return q;

      let hadMissing = false;
      const fixedOptions = q.answerOptions.map((opt) => {
        if (!opt.rationale || opt.rationale.trim() === '') {
          hadMissing = true;
          rationalesAdded++;
          return {
            ...opt,
            rationale: generateRationale(q.question, opt.text, opt.isCorrect),
          };
        }
        return opt;
      });

      if (hadMissing) questionsFixed++;

      return {
        ...q,
        answerOptions: fixedOptions,
      };
    });

    if (rationalesAdded === 0) return { skipped: true };

    // Write back to file
    const content = fs.readFileSync(filepath, 'utf8');
    const header = content.split('module.exports')[0];
    const newContent = `${header}module.exports = ${JSON.stringify(
      updated,
      null,
      2
    )};\n`;

    fs.writeFileSync(filepath, newContent, 'utf8');

    return { added: true, questionsFixed, rationalesAdded };
  } catch (err) {
    return { error: err.message };
  }
}

function main() {
  log('📝 Adding missing rationales to answer options...\n');

  const results = {
    filesUpdated: 0,
    filesSkipped: 0,
    questionsFixed: 0,
    rationalesAdded: 0,
    errors: 0,
  };

  const details = [];

  FOLDERS.forEach((folder) => {
    const dir = path.join(BACKEND_QUIZZES, folder);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));

    log(`Processing ${folder}/ (${files.length} files)...`);

    files.forEach((file) => {
      const filepath = path.join(dir, file);
      const result = addRationalesToFile(filepath);

      if (!result) return;

      if (result.error) {
        results.errors++;
        details.push({ file, error: result.error });
      } else if (result.skipped) {
        results.filesSkipped++;
      } else if (result.added) {
        results.filesUpdated++;
        results.questionsFixed += result.questionsFixed;
        results.rationalesAdded += result.rationalesAdded;
        details.push({
          file,
          questionsFixed: result.questionsFixed,
          rationalesAdded: result.rationalesAdded,
        });
      }
    });
  });

  log(`\n📊 Results:`);
  log(`Files updated: ${results.filesUpdated}`, 1);
  log(`Files skipped: ${results.filesSkipped}`, 1);
  log(`Questions fixed: ${results.questionsFixed}`, 1);
  log(`Rationales added: ${results.rationalesAdded}`, 1);
  log(`Errors: ${results.errors}`, 1);

  if (details.length > 0 && details[0].rationalesAdded) {
    log(`\n📋 Files with most fixes (top 10):`, 1);
    details
      .filter((d) => d.rationalesAdded)
      .sort((a, b) => b.rationalesAdded - a.rationalesAdded)
      .slice(0, 10)
      .forEach((d) => {
        log(
          `${d.file}: ${d.questionsFixed}Q, ${d.rationalesAdded} rationales`,
          2
        );
      });
  }

  if (results.errors > 0) {
    log(`\n⚠️  Errors (${results.errors}):`, 1);
    details
      .filter((d) => d.error)
      .forEach((d) => {
        log(`${d.file}: ${d.error}`, 2);
      });
  }

  log(`\n✅ Rationales added!`);
  log(
    `\n💡 Note: These are placeholder rationales. Consider enhancing them with specific explanations.`,
    1
  );
}

main();
