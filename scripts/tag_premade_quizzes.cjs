#!/usr/bin/env node
/**
 * TAG REMAINING QUIZZES IN PREMADE-QUESTIONS.JS
 * Add challenge_tags to the 6 quizzes stored in premade-questions.js
 */

const fs = require('fs');
const path = require('path');

const PREMADE_PATH = path.join(
  __dirname,
  '..',
  'backend',
  'data',
  'premade-questions.js'
);

// Map quiz IDs to their appropriate challenge tags
const QUIZ_TAG_MAP = {
  sci_life_science_basics: ['science-3'], // Life science
  sci_ecosystems_environment: ['science-3'], // Life science/ecosystems
  sci_chem_fundamentals: ['science-2'], // Chemistry
  sci_scientific_numeracy_core: ['science-5', 'science-6'], // Scientific practices & data
  rla_grammar_usage: ['rla-6'], // Grammar and conventions
  rla_info_main_idea: ['rla-1'], // Reading comprehension & main ideas
};

function main() {
  console.log('🏷️  Tagging quizzes in premade-questions.js...\n');

  // Load the file
  const { ALL_QUIZZES } = require(PREMADE_PATH);

  let totalUpdated = 0;
  let totalQuestions = 0;

  // Iterate through subjects and categories to find matching quizzes
  Object.entries(ALL_QUIZZES).forEach(([subject, data]) => {
    if (!data.categories) return;

    Object.entries(data.categories).forEach(([catName, category]) => {
      if (!category.topics) return;

      category.topics.forEach((topic) => {
        if (!QUIZ_TAG_MAP[topic.id]) return; // Not one of our target quizzes

        const tags = QUIZ_TAG_MAP[topic.id];
        if (!topic.questions || !Array.isArray(topic.questions)) return;

        let updated = 0;
        topic.questions.forEach((q) => {
          // Skip if already has tags
          if (
            q.challenge_tags &&
            Array.isArray(q.challenge_tags) &&
            q.challenge_tags.length > 0
          ) {
            return;
          }
          q.challenge_tags = tags;
          updated++;
        });

        if (updated > 0) {
          console.log(
            `✅ ${topic.id}: Tagged ${updated}/${
              topic.questions.length
            } questions → [${tags.join(', ')}]`
          );
          totalUpdated += updated;
          totalQuestions += topic.questions.length;
        } else {
          console.log(`✓ ${topic.id}: Already tagged`);
        }
      });
    });
  });

  // Write back to file
  const content = `// Backend premade quiz questions\n// This file contains quiz content loaded into the backend\n\nconst ALL_QUIZZES = ${JSON.stringify(
    ALL_QUIZZES,
    null,
    2
  )};\n\nmodule.exports = { ALL_QUIZZES };\n`;

  fs.writeFileSync(PREMADE_PATH, content, 'utf8');

  console.log(
    `\n📊 Results: Tagged ${totalUpdated}/${totalQuestions} questions across 6 quizzes`
  );
  console.log('✅ File updated: backend/data/premade-questions.js\n');
}

main();
