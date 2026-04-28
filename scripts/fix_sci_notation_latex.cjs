const fs = require('fs');
const file =
  'backend/data/quizzes/science/sci_physical_science_scientific_notation_1.js';
let t = fs.readFileSync(file, 'utf8');
const re = /\$([^$\n]*?\\\\\([^$\n]*?\\\\\)[^$\n]*?)\$/g;
let n = 0;
t = t.replace(re, (m, inner) => {
  n += 1;
  const cleaned = inner.replace(/\\\\\(\\\\times\\\\\)/g, '\\\\times');
  return '\\\\(' + cleaned + '\\\\)';
});
fs.writeFileSync(file, t, 'utf8');
console.log('Replacements:', n);
