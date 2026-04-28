#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SUBJECT_DIRS = {
  Math: 'backend/data/quizzes/math',
  Science: 'backend/data/quizzes/science',
  'Social Studies': 'backend/data/quizzes/social-studies',
  'Reasoning Through Language Arts (RLA)': 'backend/data/quizzes/rla',
};

function findFile(subject, topicId) {
  const dir = SUBJECT_DIRS[subject];
  if (!dir) return null;
  const direct = path.join(dir, topicId + '.js');
  if (fs.existsSync(direct)) return direct;
  // Search subdirectories
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) {
        const r = walk(p);
        if (r) return r;
      } else if (entry.isFile() && entry.name === topicId + '.js') {
        return p;
      }
    }
    return null;
  }
  return walk(dir);
}

function printQuestion(file, qn) {
  const c = fs.readFileSync(file, 'utf8');
  // Try both "questionNumber: N" and ordinal
  const variants = [
    new RegExp('questionNumber\\s*[:=]\\s*' + qn + '\\b'),
    new RegExp('"questionNumber"\\s*:\\s*' + qn + '\\b'),
  ];
  let idx = -1;
  for (const re of variants) {
    const m = re.exec(c);
    if (m) {
      idx = m.index;
      break;
    }
  }
  if (idx === -1) {
    // Fallback: get Nth top-level object in array
    let depth = 0,
      count = 0,
      start = -1;
    for (let i = 0; i < c.length; i++) {
      const ch = c[i];
      if (ch === '[') depth++;
      else if (ch === ']') depth--;
      else if (ch === '{' && depth === 1) {
        if (start === -1) {
          count++;
          if (count === qn) {
            start = i;
            let d = 1,
              j = i + 1;
            while (d && j < c.length) {
              if (c[j] === '{') d++;
              else if (c[j] === '}') d--;
              j++;
            }
            console.log(c.slice(start, j));
            return;
          }
        }
        // skip nested
        let d = 1,
          j = i + 1;
        while (d && j < c.length) {
          if (c[j] === '{') d++;
          else if (c[j] === '}') d--;
          j++;
        }
        i = j - 1;
      }
    }
    console.log('  Q' + qn + ' not found');
    return;
  }
  let start = c.lastIndexOf('{', idx);
  let depth = 1,
    end = start + 1;
  while (depth && end < c.length) {
    if (c[end] === '{') depth++;
    else if (c[end] === '}') depth--;
    end++;
  }
  console.log(c.slice(start, end));
}

// CLI: node print_questions.cjs <subject> <topicId> <q1,q2,...>
// or batch mode: read JSON spec from stdin
if (process.argv.length >= 5) {
  const subject = process.argv[2];
  const topicId = process.argv[3];
  const qs = process.argv[4].split(',').map(Number);
  const file = findFile(subject, topicId);
  if (!file) {
    console.error('File not found for', subject, topicId);
    process.exit(1);
  }
  console.log('=== ' + file + ' ===');
  for (const qn of qs) {
    console.log('--- Q' + qn + ' ---');
    printQuestion(file, qn);
  }
} else {
  // batch from stdin: lines of "subject|topicId|qn"
  let buf = '';
  process.stdin.on('data', (d) => (buf += d));
  process.stdin.on('end', () => {
    const groups = {};
    for (const line of buf.split('\n')) {
      const parts = line.replace(/\r$/, '').split('|');
      if (parts.length < 3) continue;
      const [subject, topicId, qn] = parts.map((p) => p.trim());
      const key = subject + '||' + topicId;
      (groups[key] = groups[key] || []).push(Number(qn));
    }
    for (const [key, qs] of Object.entries(groups)) {
      const [subject, topicId] = key.split('||');
      const file = findFile(subject, topicId);
      if (!file) {
        console.log('!! ' + subject + ' / ' + topicId + ' file not found');
        continue;
      }
      console.log('=== ' + file + ' ===');
      for (const qn of [...new Set(qs)].sort((a, b) => a - b)) {
        console.log('--- Q' + qn + ' ---');
        printQuestion(file, qn);
      }
    }
  });
}
