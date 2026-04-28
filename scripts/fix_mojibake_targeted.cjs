/* eslint-disable no-console */
const fs = require('fs');

const files = [
  'backend/data/quizzes/science/sci_data_reasoning_2.js',
  'backend/data/quizzes/science/sci_data_reasoning_3.js',
  'backend/data/quizzes/math/math_data_03.js',
  'backend/data/quizzes/math/math_quant_basics.js',
  'backend/data/quizzes/social-studies/ss_civil_rights_4.js',
];

const subs = [
  ['\u00C2\u00B0', '\u00B0'], // ┬° → °
  ['\u2229\u251C\u255D', '\u00B0'], // ∩┐╜ → ° (UTF-8 replacement char interpreted as cp437)
  ['\u0393\u00C7\u00F6', '\u2014'], // ΓÇö → —
  ['\u0393\u00C7\u00F4', '\u2013'], // ΓÇô → –
  ['\u0393\u00C7\u00A3', '\u201C'], // ΓÇ£ → "
  ['\u0393\u00C7\u00A5', '\u201D'], // ΓÇ¥ → "
  ['\u0393\u00C7\u00D6', '\u2019'], // ΓÇÖ → '
  ['\u0393\u00C7\u00BF', '\u2018'], // ΓÇÿ → '
  ['\u0393\u00C7\u00AA', '\u2026'], // ΓÇª → …
];

for (const f of files) {
  let t;
  try {
    t = fs.readFileSync(f, 'utf8');
  } catch (e) {
    console.warn('skip', f, e.message);
    continue;
  }
  let n = 0;
  for (const [from, to] of subs) {
    const parts = t.split(from);
    if (parts.length > 1) {
      n += parts.length - 1;
      t = parts.join(to);
    }
  }
  if (n) {
    fs.writeFileSync(f, t, 'utf8');
    console.log(f + ': ' + n + ' replacements');
  } else {
    console.log(f + ': no mojibake found');
  }
}
