#!/usr/bin/env node
// Normalize colon-terminated prompts into explicit questions ending with '?'
// Targets common patterns like "is called:", "is called a:", "is known as:", etc.

const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'frontend', 'Expanded', 'expanded.quizzes.bundle.js'),
  path.join(__dirname, '..', 'frontend', 'New Exams', 'new_math_exams2.js'),
];

const patterns = [
  { re: /is called a:/g, sub: 'is called what?' },
  { re: /is called:/g, sub: 'is called what?' },
  { re: /is known as the:/g, sub: 'is known as the what?' },
  { re: /is known as:/g, sub: 'is known as what?' },
  { re: /is known as the\s*\":/g, sub: 'is known as the what?"' },
  { re: /refers to:/g, sub: 'refers to what?' },
  { re: /means that[^\n\r]* will:/g, sub: (m) => m.replace(/will:$/, 'will do what?') },
  { re: / will:/g, sub: ' will do what?' },
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.warn(`[fix] Skipping missing file: ${file}`);
    continue;
  }
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;
  for (const { re, sub } of patterns) {
    updated = updated.replace(re, sub);
  }
  if (updated !== original) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`[fix] Updated: ${path.relative(path.join(__dirname, '..'), file)}`);
  } else {
    console.log(`[fix] No changes needed: ${path.relative(path.join(__dirname, '..'), file)}`);
  }
}
