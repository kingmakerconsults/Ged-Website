/**
 * Fix KaTeX formatting issues in math question files
 * Processes audit report and applies corrections
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the audit report
const auditReport = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'math-katex-audit-report.json'), 'utf8')
);

// Filter for actual content issues (not file errors)
const contentIssues = auditReport.filter(
  (issue) => issue.type !== 'file_error' && issue.type !== 'file_format'
);

console.log(`Found ${contentIssues.length} content issues to fix\n`);

// Group issues by file
const issuesByFile = {};
contentIssues.forEach((issue) => {
  if (!issuesByFile[issue.file]) {
    issuesByFile[issue.file] = [];
  }
  issuesByFile[issue.file].push(issue);
});

console.log(`Affected files: ${Object.keys(issuesByFile).length}\n`);

// Process each file
for (const [filename, issues] of Object.entries(issuesByFile)) {
  const filePath = path.join(
    __dirname,
    'backend',
    'data',
    'quizzes',
    'math',
    filename
  );

  console.log(`\nProcessing ${filename}...`);
  console.log(`  Issues to fix: ${issues.length}`);

  let content = fs.readFileSync(filePath, 'utf8');
  let fixCount = 0;

  // Apply fixes for each issue
  issues.forEach((issue) => {
    let searchValue, replaceValue;

    switch (issue.type) {
      case 'plain_fraction':
        // Replace plain fractions like "1/2" with "$\frac{1}{2}$"
        searchValue = issue.value;
        replaceValue = issue.suggestion;
        break;

      case 'plain_exponent':
        // Replace plain exponents like "r^2" with "$r^2$"
        searchValue = issue.value;
        replaceValue = issue.suggestion;
        break;

      case 'slash_in_math':
        // Replace slash fractions in math mode with \frac
        searchValue = issue.value;
        replaceValue = issue.suggestion;
        break;

      default:
        console.log(`  Skipping unknown issue type: ${issue.type}`);
        return;
    }

    // Replace all occurrences
    const before = content;
    content = content.replaceAll(searchValue, replaceValue);

    if (content !== before) {
      fixCount++;
    }
  });

  // Write the fixed content back
  if (fixCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed ${fixCount} issues`);
  } else {
    console.log(`  ⚠ No changes made (issues may be duplicates)`);
  }
}

console.log('\n' + '─'.repeat(60));
console.log('Fix process complete!');
console.log('\nRun the audit script again to verify all issues are resolved.');
