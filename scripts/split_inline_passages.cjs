/* eslint-disable no-console */
// For science questions whose `question` field contains a long prose
// stimulus immediately followed by the actual prompt sentence, move the
// stimulus into a `passage` field so the audit (and the UI) treat it
// correctly. Only acts on a hard-coded list of (file, questionNumber) pairs
// to keep the change scoped to known false-positives.

const fs = require('fs');
const path = require('path');

// Each entry: { file, qn, stimulusEnd } where stimulusEnd is a unique
// substring that marks the end of the embedded stimulus (the rest is the
// prompt). The stimulus is moved to `passage`, the question is left as the
// remainder.
const TARGETS = [
  {
    file: 'backend/data/quizzes/science/sci_life_science_3.js',
    qn: 6,
    stimulusEnd:
      "the heart pumps blood faster around the body. This coordinated response is crucial for supplying the body's muscles with the resources they need.",
  },
  {
    file: 'backend/data/quizzes/science/sci_life_science_6.js',
    qn: 6,
    // Will look up & split on first ". " before the actual question word.
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_life_science_cells_organelles_1.js',
    qn: 6,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_life_science_human_body_systems_16.js',
    qn: 5,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_physical_science_energy_transformations_14.js',
    qn: 5,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_earth_space_science_rock_cycle_3.js',
    qn: 5,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_earth_space_science_rock_cycle_3.js',
    qn: 6,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_earth_space_science_weather_climate_11.js',
    qn: 6,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_earth_space_science_weather_climate_15.js',
    qn: 6,
    autoSplit: true,
  },
  // Science table-stimulus items: convert the embedded text into a passage
  // that contains a markdown table; rephrase the question to point at the
  // newly-created passage table.
  {
    file: 'backend/data/quizzes/science/sci_earth_space_2.js',
    qn: 5,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_earth_space_2.js',
    qn: 6,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_data_reasoning_1.js',
    qn: 5,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_data_reasoning_2.js',
    qn: 5,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_data_reasoning_3.js',
    qn: 6,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_data_reasoning_4.js',
    qn: 3,
    autoSplit: true,
  },
  {
    file: 'backend/data/quizzes/science/sci_scientific_practices_data_reasoning_9.js',
    qn: 7,
    autoSplit: true,
  },
];

function splitQuestionAt(text, marker) {
  const idx = text.indexOf(marker);
  if (idx === -1) return null;
  const passage = text.substring(0, idx + marker.length).trim();
  const remainder = text.substring(idx + marker.length).trim();
  return { passage, remainder };
}

function findAutoSplit(text) {
  // Find the *last* sentence whose text starts with a question stem keyword.
  // Look for "What", "Which", "How", "Why", "Based on" preceded by ". " or
  // double newline.
  const splitRe =
    /(?:\.\s+|\n\n+)(?=(?:What|Which|How|Why|Where|When|Identify|Describe|Explain|If|Determine|The (?:question|passage)|Given the|Based on|According to)\b)/g;
  let lastIdx = -1;
  let match;
  while ((match = splitRe.exec(text)) !== null) {
    lastIdx = match.index;
  }
  if (lastIdx <= 60) return null;
  const passage = text.substring(0, lastIdx + 1).trim();
  const remainder = text.substring(lastIdx + 1).trim();
  if (passage.length < 60 || remainder.length < 10) return null;
  return { passage, remainder };
}

function transformFile(filePath, qn, opts) {
  if (!fs.existsSync(filePath)) {
    console.log('  MISSING FILE: ' + filePath);
    return false;
  }
  let txt = fs.readFileSync(filePath, 'utf8');

  // Locate the question object. We use a tolerant regex that finds the
  // questionNumber line and then walks forward to find the `question:` field.
  // Then we split or replace the question's string literal.
  const numberRe = new RegExp(`(["']?questionNumber["']?\\s*:\\s*${qn}\\s*,)`);
  const numberMatch = numberRe.exec(txt);
  if (!numberMatch) {
    console.log('  Q' + qn + ' not found in ' + path.basename(filePath));
    return false;
  }

  const qFieldRe = /(["']?question["']?\s*:\s*)(["'])([\s\S]*?)\2(\s*,)/g;
  qFieldRe.lastIndex = numberMatch.index;
  const qMatch = qFieldRe.exec(txt);
  if (!qMatch) {
    console.log('  Q' + qn + ' question field not found');
    return false;
  }

  // Decode the original literal by replacing common JS escapes.
  const quote = qMatch[2];
  const rawValue = qMatch[3];
  // Decode escape sequences that matter for splitting.
  const decoded = rawValue
    .replace(/\\n/g, '\n')
    .replace(new RegExp('\\\\' + quote, 'g'), quote)
    .replace(/\\\\/g, '\\');

  let split = null;
  if (opts.stimulusEnd) {
    split = splitQuestionAt(decoded, opts.stimulusEnd);
  } else if (opts.autoSplit) {
    split = findAutoSplit(decoded);
  }

  if (!split) {
    console.log('  Q' + qn + ': could not split');
    return false;
  }

  // Re-encode as JS literal in the same quote style.
  function encode(value) {
    return value
      .replace(/\\/g, '\\\\')
      .replace(new RegExp(quote, 'g'), '\\' + quote)
      .replace(/\n/g, '\\n');
  }
  const encodedRemainder = encode(split.remainder);
  const encodedPassage = encode(split.passage);

  // Determine indentation by inspecting the question field's preceding line.
  const lineStart = txt.lastIndexOf('\n', qMatch.index) + 1;
  const indent = txt.substring(lineStart, qMatch.index).match(/^\s*/)[0];

  // Build the new question field plus a passage field on the line above (or
  // below). Place passage before question for readability.
  // Detect which key style is used (quoted vs unquoted) from the original.
  const keyMatch = qMatch[1].match(/["']?question["']?/);
  const isQuoted = keyMatch && keyMatch[0].startsWith('"');
  const passageKey = isQuoted ? '"passage"' : 'passage';
  const newBlock = `${passageKey}: ${quote}${encodedPassage}${quote},\n${indent}${qMatch[1]}${quote}${encodedRemainder}${quote}${qMatch[4]}`;

  const before = txt.substring(0, qMatch.index);
  const after = txt.substring(qMatch.index + qMatch[0].length);
  // Skip if a passage key already exists nearby (within 200 chars of the
  // question field) — we don't want to double-add.
  const proximity = txt.substring(
    Math.max(0, qMatch.index - 200),
    qMatch.index + qMatch[0].length + 200
  );
  if (/["']?passage["']?\s*:/.test(proximity)) {
    console.log('  Q' + qn + ': passage already exists nearby, skipping');
    return false;
  }

  txt = before + newBlock + after;
  fs.writeFileSync(filePath, txt, 'utf8');
  console.log(
    '  Q' +
      qn +
      ' in ' +
      path.basename(filePath) +
      ': split (passage=' +
      split.passage.length +
      'c, q=' +
      split.remainder.length +
      'c)'
  );
  return true;
}

let count = 0;
for (const t of TARGETS) {
  if (transformFile(t.file, t.qn, t)) count += 1;
}
console.log('\nTotal split: ' + count + '/' + TARGETS.length);
