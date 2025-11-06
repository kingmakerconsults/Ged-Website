#!/usr/bin/env node
// Report total number of Social Studies questions in backend/data/quizzes/social-studies

const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(__filename);
const SOCIAL_DIR = path.join(root, 'backend', 'data', 'quizzes', 'social-studies');

function loadQuestions(absPath) {
  try {
    const mod = requireCJS(absPath);
    if (Array.isArray(mod)) return mod;
    if (mod && Array.isArray(mod.questions)) return mod.questions;
  } catch (e) {
    return null;
  }
  return null;
}

function main() {
  const files = fs.readdirSync(SOCIAL_DIR).filter(f => f.endsWith('.js'));
  let total = 0;
  const perFile = [];
  for (const f of files) {
    const abs = path.join(SOCIAL_DIR, f);
    const arr = loadQuestions(abs);
    if (!arr) {
      perFile.push({ file: f, questions: 0, note: 'failed to load or not an array' });
      continue;
    }
    perFile.push({ file: f, questions: arr.length });
    total += arr.length;
  }
  console.log(`[SOCIAL REPORT] Files: ${files.length}, Total Questions: ${total}`);
  for (const row of perFile.sort((a,b)=>a.file.localeCompare(b.file))) {
    console.log(`- ${row.file}: ${row.questions}`);
  }
}

main();
