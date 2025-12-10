import fs from 'fs';

const filePath = 'backend/data/quizzes/math/math_algebra_02.js';
let raw = fs.readFileSync(filePath, 'utf8');
raw = raw.replace(/,\n\s+"inputCalculator"/g, ',\n    "inputCalculator"');
const withoutHeader = raw
  .replace(/^\uFEFF?\/\/.*\r?\n/, '')
  .replace(/module\.exports\s*=\s*/, '')
  .replace(/;\s*$/, '');
const cleaned = withoutHeader
  .replace(/`n/g, '\\n')
  .replace(/`t/g, '\\t')
  .replace(/\\n\s*/g, '\n')
  .replace(/\\t/g, ' ');
console.log('CLEANED START:\n', cleaned.slice(0, 200));
try {
  const q = Function('"use strict"; return ' + cleaned)();
  console.log('Result type', typeof q, 'isArray', Array.isArray(q));
} catch (err) {
  console.error('Eval error', err.message);
}
