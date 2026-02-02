#!/usr/bin/env node
/*
 * Phase 5 Remediation: Wrap bare LaTeX macros and fix currency in math
 * - Wraps \frac{..}{..} and \sqrt{..} with \( ... \) when not already wrapped
 * - Converts $5$ -> $5 (plain currency) to avoid KaTeX currency-in-math
 * Output: reports/phase5_math_wrap_fixes.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUIZ_DIR = path.join(ROOT, 'backend', 'data', 'quizzes');
const REPORT_PATH = path.join(ROOT, 'reports', 'phase5_math_wrap_fixes.json');

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

function wrapBareLatex(line) {
  let wrapped = 0;
  let next = line;

  next = next.replace(/(?<!\\\\\()\\frac\{[^}]*\}\{[^}]*\}/g, (m) => {
    wrapped += 1;
    return `\\(${m}\\)`;
  });

  next = next.replace(/(?<!\\\\\()\\sqrt\{[^}]*\}/g, (m) => {
    wrapped += 1;
    return `\\(${m}\\)`;
  });

  next = next.replace(/(?<!\\\\\()\\times/g, (m) => {
    wrapped += 1;
    return `\\(${m}\\)`;
  });

  next = next.replace(/(?<!\\\\\()\\div/g, (m) => {
    wrapped += 1;
    return `\\(${m}\\)`;
  });

  return { line: next, wrapped };
}

function fixCurrencyMath(line) {
  // Convert $5$ -> $5 (plain currency)
  const next = line.replace(/\$(\s*\d+(?:\.\d+)?)(?!\w)\$/g, '$$$1');
  return next;
}

function processFile(content) {
  let replaced = 0;
  let currencyFixes = 0;
  const lines = content.split(/\r?\n/);
  const updated = lines.map((line) => {
    const before = line;
    const currencyFixed = fixCurrencyMath(before);
    if (currencyFixed !== before) currencyFixes += 1;

    const { line: wrappedLine, wrapped } = wrapBareLatex(currencyFixed);
    replaced += wrapped;
    return wrappedLine;
  });
  return { text: updated.join('\n'), replaced, currencyFixes };
}

function main() {
  const files = listQuizFiles(QUIZ_DIR);
  const report = {
    generatedAt: new Date().toISOString(),
    root: 'backend/data/quizzes',
    filesScanned: files.length,
    filesChanged: 0,
    totalWrapped: 0,
    totalCurrencyFixes: 0,
    changes: [],
  };

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { text, replaced, currencyFixes } = processFile(raw);
    if ((replaced > 0 || currencyFixes > 0) && text !== raw) {
      fs.writeFileSync(file, text, 'utf8');
      report.filesChanged += 1;
      report.totalWrapped += replaced;
      report.totalCurrencyFixes += currencyFixes;
      report.changes.push({
        file: path.relative(ROOT, file).replace(/\\/g, '/'),
        wrapped: replaced,
        currencyFixes,
      });
    }
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(
    'Math wrap remediation complete:',
    report.totalWrapped,
    'wrapped,',
    report.totalCurrencyFixes,
    'currency fixes.'
  );
}

main();
