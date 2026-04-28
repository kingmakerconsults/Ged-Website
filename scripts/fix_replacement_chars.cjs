/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Walk every quiz source file; replace U+FFFD (REPLACEMENT CHARACTER) that
// appears between a digit and a temperature unit letter (F, C, K) with the
// proper degree sign U+00B0. This recovers temperatures like "102.5°F" that
// were corrupted to "102.5\uFFFDF".
const ROOT = path.resolve('backend/data/quizzes');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.isFile() && entry.name.endsWith('.js')) out.push(p);
  }
  return out;
}

let totalFiles = 0;
let totalRepl = 0;
for (const file of walk(ROOT)) {
  let t = fs.readFileSync(file, 'utf8');
  if (!t.includes('\uFFFD')) continue;
  const before = (t.match(/\uFFFD/g) || []).length;
  // Pair of replacement chars almost always = em-dash (—) in English prose.
  t = t.replace(/\uFFFD\uFFFD/g, '\u2014');
  // Degree sign before temperature unit letter
  t = t.replace(/(\d)\uFFFD([FCK])\b/g, '$1\u00B0$2');
  // Degree sign in coordinates like "36°30'"
  t = t.replace(/(\d)\uFFFD(\d{1,2}['\u2032])/g, '$1\u00B0$2');
  // Stray remaining U+FFFD adjacent to a digit and quote/period — likely degree
  t = t.replace(/\)\uFFFDF\b/g, ')\u00B0F');
  const after = (t.match(/\uFFFD/g) || []).length;
  const repl = before - after;
  if (repl > 0) {
    fs.writeFileSync(file, t, 'utf8');
    console.log(
      path.relative('.', file) +
        ': ' +
        repl +
        ' replacement(s); ' +
        after +
        ' U+FFFD remain'
    );
    totalFiles += 1;
    totalRepl += repl;
  } else if (after > 0) {
    console.log(
      path.relative('.', file) +
        ': ' +
        after +
        ' U+FFFD (no temperature pattern)'
    );
  }
}
console.log(
  'Total files updated: ' + totalFiles + '; total replacements: ' + totalRepl
);
