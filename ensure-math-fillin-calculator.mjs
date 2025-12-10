/**
 * Ensure all math fill-in questions allow calculator input
 * - Adds inputCalculator: true and calculator: true for fill-in items
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mathDir = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');

let filesProcessed = 0;
let filesUpdated = 0;
let fillInsUpdated = 0;
let errors = 0;

const writeQuestions = (filePath, questions) => {
  const serialized = JSON.stringify(questions, null, 2);
  fs.writeFileSync(filePath, `module.exports = ${serialized};\n`);
};

const loadQuestions = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');

    // Normalize stray literal \n tokens that were injected between properties
    const normalized = raw.replace(
      /,\\n\s+"inputCalculator"/g,
      ',\n    "inputCalculator"'
    );

    // Strip leading comment and module export wrapper
    const withoutHeader = normalized
      .replace(/^\uFEFF?\/\/.*\r?\n/, '')
      .replace(/^\/\*[\s\S]*?\*\/\s*/m, '')
      .replace(/module\.exports\s*=\s*/, '')
      .replace(/;\s*$/, '');

    // Remove stray escape tokens introduced by legacy scripts
    const cleaned = withoutHeader
      .replace(/`n/g, '\\n')
      .replace(/`t/g, '\\t')
      .replace(/\\n\s*/g, '\n')
      .replace(/\\t/g, ' ');

    // Evaluate as JS (handles trailing commas) in a safe Function context
    const questions = Function('"use strict"; return ' + cleaned)();
    if (!Array.isArray(questions)) {
      console.warn(
        `Non-array export in ${path.basename(
          filePath
        )} (type: ${typeof questions})`
      );
      return null;
    }
    return questions;
  } catch (err) {
    console.error(
      `✗ Failed to load ${path.basename(filePath)}: ${err.message}`
    );
    errors++;
    return null;
  }
};

const processFile = async (filePath) => {
  const questions = await loadQuestions(filePath);
  if (!questions) {
    console.warn(`Skipped ${path.basename(filePath)} (not an array)`);
    return;
  }

  filesProcessed++;
  let changed = false;

  questions.forEach((q) => {
    if (!q || typeof q !== 'object') return;
    const type = q.type;
    const isFillIn = type === 'fillIn' || type === 'fill-in-the-blank';
    if (!isFillIn) return;

    if (q.inputCalculator !== true) {
      q.inputCalculator = true;
      changed = true;
      fillInsUpdated++;
    }
    if (q.calculator !== true) {
      q.calculator = true;
      changed = true;
      fillInsUpdated++;
    }
  });

  if (changed) {
    writeQuestions(filePath, questions);
    filesUpdated++;
    console.log(`✓ Updated ${path.basename(filePath)}`);
  }
};

const scanDirectory = async (dir) => {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      await scanDirectory(full);
    } else if (entry.endsWith('.js')) {
      await processFile(full);
    }
  }
};

console.log('Ensuring calculator availability on math fill-in items...');
await scanDirectory(mathDir);

console.log('\nSummary:');
console.log(`  Files processed: ${filesProcessed}`);
console.log(`  Files updated:   ${filesUpdated}`);
console.log(`  Fill-ins updated: ${fillInsUpdated}`);
console.log(`  Errors:          ${errors}`);

process.exit(errors > 0 ? 1 : 0);
