#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { applyRulesToFile } = require('./propagate_rationale_rewrites.cjs');

const REPO = path.resolve(__dirname, '..');
const RULES = require('./phase_d_rules_sci_thin.cjs');

// Apply across every science quiz file + diagnostics + science image dirs.
function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && p.endsWith('.js')) yield p;
  }
}

const dirs = [
  path.join(REPO, 'backend/data/quizzes/science'),
  path.join(REPO, 'backend/data/quizzes/diagnostics'),
];

let grand = 0;
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of walk(d)) {
    try {
      const n = applyRulesToFile(f, RULES);
      if (n > 0) {
        const rel = path.relative(REPO, f).replace(/\\/g, '/');
        console.log(`${n.toString().padStart(3)}  ${rel}`);
        grand += n;
      }
    } catch (e) {
      console.error('FAIL', f, e.message);
    }
  }
}
console.log(`Total replacements: ${grand}`);
