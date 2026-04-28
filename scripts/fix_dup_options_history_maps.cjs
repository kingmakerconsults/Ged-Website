/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Distractor pool for "Not enough information" duplicates in
// social_studies_img_history_maps.js / social_studies_img_historical_maps.js.
// Correct answer in every affected question is "1763"; existing distractor is
// "1762". Replace duplicate "Not enough information" entries with concrete
// alternative years tied to colonial / early-American context.
const ALT_DISTRACTORS = [
  {
    text: '1492',
    rationale:
      'Incorrect. 1492 is the year Columbus first reached the Americas, not a date marked on this map.',
  },
  {
    text: '1776',
    rationale:
      'Incorrect. 1776 is the year of the Declaration of Independence, more than a decade after the territorial changes shown here.',
  },
  {
    text: '1620',
    rationale:
      'Incorrect. 1620 is the year of the Mayflower landing at Plymouth, which predates this map.',
  },
  {
    text: '1812',
    rationale:
      'Incorrect. 1812 is the year the War of 1812 began, well after the events shown on this map.',
  },
];

const FILES = [
  'backend/data/quizzes/social-studies/social_studies_img_history_maps.js',
  'backend/data/quizzes/social-studies/social_studies_img_historical_maps.js',
];

for (const rel of FILES) {
  const file = path.resolve(rel);
  let txt = fs.readFileSync(file, 'utf8');
  const before = txt;

  // Pattern matches two consecutive identical "Not enough information" objects
  // in either JSON-quoted or single-quoted style.
  const dupBlock = new RegExp(
    [
      '(\\{[^{}]*?["\']text["\']\\s*:\\s*["\']Not enough information is shown to decide\\.[^{}]*?["\']isCorrect["\']\\s*:\\s*false[^{}]*?\\}\\s*,\\s*)',
      '\\{[^{}]*?["\']text["\']\\s*:\\s*["\']Not enough information is shown to decide\\.[^{}]*?["\']isCorrect["\']\\s*:\\s*false[^{}]*?\\}',
    ].join(''),
    'g'
  );

  let i = 0;
  txt = txt.replace(dupBlock, (match, first) => {
    const alt = ALT_DISTRACTORS[i % ALT_DISTRACTORS.length];
    i += 1;
    const replacement = `{
        "text": ${JSON.stringify(alt.text)},
        "rationale": ${JSON.stringify(alt.rationale)},
        "isCorrect": false
      }`;
    return first + replacement;
  });

  if (txt !== before) {
    fs.writeFileSync(file, txt, 'utf8');
    console.log(`${rel}: replaced ${i} duplicate block(s)`);
  } else {
    console.log(`${rel}: no changes`);
  }
}
