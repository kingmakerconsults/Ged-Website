#!/usr/bin/env node
// Report per-file and total number of Science questions and verify each has question text

const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(__filename);
const SCIENCE_DIR = path.join(root, 'backend', 'data', 'quizzes', 'science');

function getQuestionText(q) {
  if (!q || typeof q !== 'object') return '';
  const direct = (
    typeof q.questionText === 'string' ? q.questionText :
    typeof q.text === 'string' ? q.text :
    typeof q.question === 'string' ? q.question :
    ''
  );
  if (direct && direct.trim()) return direct;
  const content = q.content && typeof q.content === 'object' ? q.content : null;
  if (content) {
    const nested = (
      typeof content.questionText === 'string' ? content.questionText :
      typeof content.text === 'string' ? content.text :
      typeof content.question === 'string' ? content.question :
      ''
    );
    if (nested && nested.trim()) return nested;
  }
  return '';
}

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
  const files = fs.readdirSync(SCIENCE_DIR).filter(f => f.endsWith('.js'));
  let total = 0;
  let totalMissing = 0;
  const perFile = [];
  for (const f of files) {
    const abs = path.join(SCIENCE_DIR, f);
    const arr = loadQuestions(abs);
    if (!arr) {
      perFile.push({ file: f, questions: 0, missing: 0, note: 'failed to load or not an array' });
      continue;
    }
    let missing = 0;
    for (let i = 0; i < arr.length; i++) {
      const qText = getQuestionText(arr[i]);
      if (!qText || !qText.trim()) missing++;
    }
    perFile.push({ file: f, questions: arr.length, missing });
    total += arr.length;
    totalMissing += missing;
  }
  console.log(`[SCIENCE REPORT] Files: ${files.length}, Total Questions: ${total}, Missing question text: ${totalMissing}`);
  for (const row of perFile.sort((a,b)=>a.file.localeCompare(b.file))) {
    const status = row.missing === 0 ? 'OK' : `MISSING ${row.missing}`;
    console.log(`- ${row.file}: ${row.questions} (${status})`);
  }
}

main();
