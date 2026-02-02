#!/usr/bin/env node
/*
 * Phase 5 Remediation: remaining inline $...$ and \times/\div wrapping
 * - Converts remaining inline $...$ math to \( ... \) when content is math-like
 * - Wraps simple a \times b / a \div b expressions in \( ... \)
 * Output: reports/phase5_math_symbol_fixes.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUIZ_DIR = path.join(ROOT, 'backend', 'data', 'quizzes');
const REPORT_PATH = path.join(ROOT, 'reports', 'phase5_math_symbol_fixes.json');

function listQuizFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listQuizFiles(abs));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      results.push(abs);
    }
  }
  return results;
}

function isMathContent(content) {
  if (!content) return false;
  const trimmed = content.trim();
  if (!trimmed) return false;
  // Skip currency-only cases
  if (/^\d+(?:[.,]\d+)?$/.test(trimmed)) return false;
  return /[a-zA-Z\\^_+=×÷*/<>()]/.test(trimmed);
}

function convertInlineDollarMath(text) {
  let out = '';
  let i = 0;
  let replaced = 0;

  while (i < text.length) {
    const ch = text[i];
    if (ch !== '$') {
      out += ch;
      i += 1;
      continue;
    }
    if (i > 0 && text[i - 1] === '\\') {
      out += ch;
      i += 1;
      continue;
    }
    let j = i + 1;
    let found = false;
    while (j < text.length) {
      if (text[j] === '$' && text[j - 1] !== '\\') {
        found = true;
        break;
      }
      j += 1;
    }
    if (!found) {
      out += ch;
      i += 1;
      continue;
    }
    const content = text.slice(i + 1, j);
    if (isMathContent(content)) {
      out += `\\(${content}\\)`;
      replaced += 1;
    } else {
      out += text.slice(i, j + 1);
    }
    i = j + 1;
  }

  return { text: out, replaced };
}

function wrapTimesDiv(line) {
  if (line.includes('\\(') || line.includes('\\)')) return { line, wrapped: 0 };
  let wrapped = 0;
  let next = line;

  next = next.replace(
    /([A-Za-z0-9)]+)\s*\\times\s*([A-Za-z0-9(]+)/g,
    (m, a, b) => {
      wrapped += 1;
      return `\\(${a} \\times ${b}\\)`;
    }
  );

  next = next.replace(
    /([A-Za-z0-9)]+)\s*\\div\s*([A-Za-z0-9(]+)/g,
    (m, a, b) => {
      wrapped += 1;
      return `\\(${a} \\div ${b}\\)`;
    }
  );

  return { line: next, wrapped };
}

function processFile(content) {
  let replaced = 0;
  let wrapped = 0;

  const dollar = convertInlineDollarMath(content);
  replaced += dollar.replaced;

  const lines = dollar.text.split(/\r?\n/);
  const updated = lines.map((line) => {
    const { line: wrappedLine, wrapped: w } = wrapTimesDiv(line);
    wrapped += w;
    return wrappedLine;
  });

  return { text: updated.join('\n'), replaced, wrapped };
}

function main() {
  const files = listQuizFiles(QUIZ_DIR);
  const report = {
    generatedAt: new Date().toISOString(),
    root: 'backend/data/quizzes',
    filesScanned: files.length,
    filesChanged: 0,
    totalDollarConversions: 0,
    totalTimesDivWrapped: 0,
    changes: [],
  };

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { text, replaced, wrapped } = processFile(raw);
    if ((replaced > 0 || wrapped > 0) && text !== raw) {
      fs.writeFileSync(file, text, 'utf8');
      report.filesChanged += 1;
      report.totalDollarConversions += replaced;
      report.totalTimesDivWrapped += wrapped;
      report.changes.push({
        file: path.relative(ROOT, file).replace(/\\/g, '/'),
        dollarConversions: replaced,
        timesDivWrapped: wrapped,
      });
    }
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(
    'Math symbol remediation complete:',
    report.totalDollarConversions,
    'inline conversions,',
    report.totalTimesDivWrapped,
    'times/div wraps.'
  );
}

main();
