#!/usr/bin/env node
/*
 * Phase 5 Remediation: KaTeX inline math normalization
 * Converts inline $...$ math to \( ... \) in backend quiz sources.
 * Skips likely currency-only cases.
 * Output: reports/phase5_katex_fixes.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUIZ_DIR = path.join(ROOT, 'backend', 'data', 'quizzes');
const REPORT_PATH = path.join(ROOT, 'reports', 'phase5_katex_fixes.json');

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

  // Skip likely currency-only cases like "$5" or "$5.00"
  if (/^\d+(?:[.,]\d+)?$/.test(trimmed)) return false;

  // Must contain some math-like tokens
  return /[a-zA-Z\\^_+=×÷*/<>()]/.test(trimmed);
}

function replaceInlineMath(text) {
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

    // Ignore escaped dollar
    if (i > 0 && text[i - 1] === '\\') {
      out += ch;
      i += 1;
      continue;
    }

    // Find matching $ (not escaped)
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
      i = j + 1;
      continue;
    }

    // Leave as-is if not math
    out += text.slice(i, j + 1);
    i = j + 1;
  }

  return { text: out, replaced };
}

function main() {
  const files = listQuizFiles(QUIZ_DIR);
  const report = {
    generatedAt: new Date().toISOString(),
    root: 'backend/data/quizzes',
    filesScanned: files.length,
    filesChanged: 0,
    totalReplacements: 0,
    changes: [],
  };

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { text, replaced } = replaceInlineMath(raw);
    if (replaced > 0 && text !== raw) {
      fs.writeFileSync(file, text, 'utf8');
      report.filesChanged += 1;
      report.totalReplacements += replaced;
      report.changes.push({
        file: path.relative(ROOT, file).replace(/\\/g, '/'),
        replacements: replaced,
      });
    }
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(
    'KaTeX remediation complete:',
    report.totalReplacements,
    'replacements.'
  );
}

main();
