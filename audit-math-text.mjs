/**
 * Text-based KaTeX audit for CommonJS module files
 * Reads files as text and checks for formatting issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mathDir = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');
const issues = [];
let totalFiles = 0;

function auditFileText(filePath) {
  const filename = path.basename(filePath);
  totalFiles++;

  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check for plain fractions outside math mode
    // Look for patterns like: "text": "1/2" where it's not inside $...$
    const plainFractionPattern = /"(?:[^"$]*?)(\d+\/\d+)(?:[^"$]*?)"/g;
    let match;

    while ((match = plainFractionPattern.exec(content)) !== null) {
      const fullMatch = match[0];
      const fraction = match[1];

      // Check if the fraction is inside $ delimiters
      const dollarsInMatch = (fullMatch.match(/\$/g) || []).length;

      // If odd number of $, then one $ is before and one after (it's in math mode)
      // If even number (including 0), it's outside math mode
      if (dollarsInMatch === 0 || dollarsInMatch % 2 === 0) {
        issues.push({
          file: filename,
          type: 'plain_fraction',
          value: fraction,
          context: fullMatch.substring(0, 60),
          suggestion: fraction.replace(/(\d+)\/(\d+)/, '$\\\\frac{$1}{$2}$'),
        });
      }
    }

    // Check for plain exponents outside math mode
    const plainExponentPattern = /"(?:[^"$]*?)(\w+\^\d+)(?:[^"$]*?)"/g;

    while ((match = plainExponentPattern.exec(content)) !== null) {
      const fullMatch = match[0];
      const exponent = match[1];

      const dollarsInMatch = (fullMatch.match(/\$/g) || []).length;

      if (dollarsInMatch === 0 || dollarsInMatch % 2 === 0) {
        issues.push({
          file: filename,
          type: 'plain_exponent',
          value: exponent,
          context: fullMatch.substring(0, 60),
          suggestion: `$${exponent}$`,
        });
      }
    }

    // Check for slashes in math mode that should be \frac
    const mathSlashPattern = /\$([^$]*?(\d+)\/(\d+)[^$]*?)\$/g;

    while ((match = mathSlashPattern.exec(content)) !== null) {
      const mathContent = match[1];
      const numerator = match[2];
      const denominator = match[3];

      // Skip if already using \frac
      if (!mathContent.includes('\\frac')) {
        issues.push({
          file: filename,
          type: 'slash_in_math',
          value: `$${mathContent}$`,
          suggestion: `$${mathContent.replace(
            `${numerator}/${denominator}`,
            `\\frac{${numerator}}{${denominator}}`
          )}$`,
        });
      }
    }
  } catch (error) {
    console.error(`✗ Error auditing ${filename}:`, error.message);
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      auditFileText(fullPath);
    }
  });
}

console.log('Running text-based KaTeX audit on all math files...\n');
console.log('─'.repeat(60));

scanDirectory(mathDir);

console.log('\n' + '─'.repeat(60));
console.log(`\nFiles audited: ${totalFiles}`);
console.log(`Issues found: ${issues.length}\n`);

if (issues.length > 0) {
  // Group by type
  const grouped = {};
  issues.forEach((issue) => {
    if (!grouped[issue.type]) grouped[issue.type] = [];
    grouped[issue.type].push(issue);
  });

  Object.keys(grouped).forEach((type) => {
    console.log(`\n${type.toUpperCase()} (${grouped[type].length} issues):`);
    console.log('─'.repeat(60));

    // Group by file
    const byFile = {};
    grouped[type].forEach((issue) => {
      if (!byFile[issue.file]) byFile[issue.file] = [];
      byFile[issue.file].push(issue);
    });

    Object.entries(byFile).forEach(([file, fileIssues]) => {
      console.log(`\n  ${file}: ${fileIssues.length} issues`);
      fileIssues.slice(0, 3).forEach((issue) => {
        console.log(`    Found: ${issue.value}`);
        console.log(`    Suggest: ${issue.suggestion}`);
      });
      if (fileIssues.length > 3) {
        console.log(`    ... and ${fileIssues.length - 3} more`);
      }
    });
  });

  fs.writeFileSync(
    path.join(__dirname, 'math-text-audit-report.json'),
    JSON.stringify(issues, null, 2)
  );
  console.log('\n\nDetailed report written to: math-text-audit-report.json');

  process.exit(1);
} else {
  console.log('✓ All math questions use proper KaTeX formatting!');
  console.log('✓ All fractions use proper LaTeX: $\\frac{a}{b}$');
  console.log('✓ All exponents are in math mode: $x^2$');
  console.log('✓ All division operators are properly formatted');

  process.exit(0);
}
