#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { applyRulesToFile } = require('./propagate_rationale_rewrites.cjs');
const REPO = path.resolve(__dirname, '..');
const RULES = require('./phase_e_rules_short_correct.cjs');

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && p.endsWith('.js')) yield p;
  }
}

const files = [
  path.join(REPO, 'backend/data/premade-questions.js'),
  ...['math', 'social-studies', 'rla', 'science', 'diagnostics']
    .map((s) => path.join(REPO, 'backend/data/quizzes', s))
    .filter((d) => fs.existsSync(d))
    .flatMap((d) => [...walk(d)]),
];

let grand = 0;
for (const f of files) {
  const n = applyRulesToFile(f, RULES);
  if (n > 0) {
    console.log(
      n.toString().padStart(3),
      path.relative(REPO, f).replace(/\\/g, '/')
    );
    grand += n;
  }
}
console.log('Total:', grand);
