#!/usr/bin/env node
// Audit backend/data/quizzes/science for missing questions and placeholders

const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(__filename);

const SCIENCE_DIR = path.join(root, 'backend', 'data', 'quizzes', 'science');

const PLACEHOLDER_PATTERNS = [
  /\bplaceholder\b/i,
  /\blorem\b/i,
  /\bipsum\b/i,
  /\btbd\b/i,
  /\bto\s*be\s*determined\b/i,
  /\bcoming\s*soon\b/i,
  /\bwrite\s+question\b/i,
  /\binsert\s+question\b/i,
  /\bsample\s+question\b/i,
  /\bdemo\b(?!cracy)/i,
  /\bfill\s+in\s+later\b/i,
  /\bautogen(erated)?\b/i,
  /\btemplate\b/i,
  /_{3,}/, // obvious blank lines like ______
];

function looksPlaceholder(s) {
  if (!s || typeof s !== 'string') return true; // treat missing/empty as placeholder-like here
  const trimmed = s.trim();
  if (!trimmed) return true;
  return PLACEHOLDER_PATTERNS.some((re) => re.test(trimmed));
}

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

function auditFile(absPath, relPath, issues) {
  let data;
  try {
    data = requireCJS(absPath);
  } catch (e) {
    issues.push(`[${relPath}] Failed to require: ${e.message}`);
    return;
  }
  const arr = Array.isArray(data) ? data : (Array.isArray(data?.questions) ? data.questions : []);
  if (!Array.isArray(arr)) {
    issues.push(`[${relPath}] Not an array of questions`);
    return;
  }
  arr.forEach((q, idx) => {
    const ctx = `[${relPath} Q#${q?.questionNumber || idx + 1}]`;
    const qText = getQuestionText(q);
    if (!qText || !qText.trim()) {
      issues.push(`${ctx} Missing question text`);
    }
    if (looksPlaceholder(qText)) {
      issues.push(`${ctx} Placeholder-like question text: ${JSON.stringify(qText)}`);
    }
    if (Array.isArray(q?.answerOptions)) {
      q.answerOptions.forEach((opt, i) => {
        const t = typeof opt?.text === 'string' ? opt.text : '';
        if (looksPlaceholder(t)) {
          issues.push(`${ctx} Option ${i + 1} looks placeholder-like: ${JSON.stringify(t)}`);
        }
      });
    }
  });
}

function main() {
  const files = fs.readdirSync(SCIENCE_DIR).filter(f => f.endsWith('.js'));
  const issues = [];
  for (const f of files) {
    const abs = path.join(SCIENCE_DIR, f);
    const rel = path.relative(root, abs).replace(/\\/g, '/');
    auditFile(abs, rel, issues);
  }
  if (issues.length) {
    console.log(`[SCIENCE AUDIT] Issues found: ${issues.length}`);
    for (const line of issues) console.log('- ' + line);
    process.exitCode = 1;
  } else {
    console.log('[SCIENCE AUDIT] No issues found in backend/data/quizzes/science');
    process.exitCode = 0;
  }
}

main();
