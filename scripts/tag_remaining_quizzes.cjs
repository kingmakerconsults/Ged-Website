#!/usr/bin/env node
/**
 * TAG REMAINING 6 QUIZZES
 * Specifically target the 6 quizzes still missing challenge_tags
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

// Map specific quiz IDs to their appropriate challenge tags
const QUIZ_TAG_MAP = {
  // Science quizzes
  sci_life_science_basics: ['science-3'], // Life science
  sci_ecosystems_environment: ['science-3'], // Life science/ecosystems
  sci_chem_fundamentals: ['science-2'], // Chemistry
  sci_scientific_numeracy_core: ['science-5', 'science-6'], // Scientific practices & data

  // RLA quizzes
  rla_grammar_usage: ['rla-6'], // Grammar and conventions
  rla_info_main_idea: ['rla-1'], // Reading comprehension & main ideas
};

function tagQuiz(quizId, folder) {
  const filepath = path.join(BACKEND_QUIZZES, folder, `${quizId}.js`);

  if (!fs.existsSync(filepath)) {
    console.log(`❌ File not found: ${filepath}`);
    return null;
  }

  try {
    const questions = require(filepath);
    if (!Array.isArray(questions) || questions.length === 0) {
      console.log(`⚠️  No questions found in ${quizId}`);
      return null;
    }

    const tags = QUIZ_TAG_MAP[quizId];
    if (!tags) {
      console.log(`⚠️  No tag mapping for ${quizId}`);
      return null;
    }

    let updated = 0;
    const modifiedQuestions = questions.map((q) => {
      // Skip if already has tags
      if (
        q.challenge_tags &&
        Array.isArray(q.challenge_tags) &&
        q.challenge_tags.length > 0
      ) {
        return q;
      }
      updated++;
      return { ...q, challenge_tags: tags };
    });

    if (updated === 0) {
      console.log(`✓ ${quizId}: Already tagged`);
      return { skipped: true };
    }

    // Write back to file
    const content = fs.readFileSync(filepath, 'utf8');
    const header = content.split('module.exports')[0];
    const newContent = `${header}module.exports = ${JSON.stringify(
      modifiedQuestions,
      null,
      2
    )};\n`;

    fs.writeFileSync(filepath, newContent, 'utf8');

    console.log(
      `✅ ${quizId}: Tagged ${updated}/${
        questions.length
      } questions → [${tags.join(', ')}]`
    );
    return { updated, total: questions.length, tags };
  } catch (err) {
    console.log(`❌ Error processing ${quizId}: ${err.message}`);
    return null;
  }
}

function main() {
  console.log('🏷️  Tagging remaining 6 quizzes...\n');

  let totalUpdated = 0;
  let totalQuestions = 0;

  // Science quizzes
  console.log('Science:');
  [
    'sci_life_science_basics',
    'sci_ecosystems_environment',
    'sci_chem_fundamentals',
    'sci_scientific_numeracy_core',
  ].forEach((id) => {
    const result = tagQuiz(id, 'science');
    if (result && result.updated) {
      totalUpdated += result.updated;
      totalQuestions += result.total;
    }
  });

  console.log('\nRLA:');
  ['rla_grammar_usage', 'rla_info_main_idea'].forEach((id) => {
    const result = tagQuiz(id, 'rla');
    if (result && result.updated) {
      totalUpdated += result.updated;
      totalQuestions += result.total;
    }
  });

  console.log(
    `\n📊 Results: Tagged ${totalUpdated}/${totalQuestions} questions across 6 quizzes`
  );
  console.log('✅ Complete!\n');
}

main();
