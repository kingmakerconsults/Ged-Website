import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mathDir = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');
const issues = [];
let totalQuestions = 0;
let totalFiles = 0;

function checkQuestion(question, fileIndex, questionIndex) {
  const issues = [];

  // Check all text fields
  const fieldsToCheck = [
    { name: 'question', value: question.question },
    { name: 'passage', value: question.passage },
  ];

  // Check answer options
  if (Array.isArray(question.answerOptions)) {
    question.answerOptions.forEach((opt, idx) => {
      fieldsToCheck.push({ name: `answer[${idx}].text`, value: opt.text });
      fieldsToCheck.push({
        name: `answer[${idx}].rationale`,
        value: opt.rationale,
      });
    });
  }

  fieldsToCheck.forEach((field) => {
    if (!field.value || typeof field.value !== 'string') return;

    const text = field.value;

    // Check for plain fractions that should be in LaTeX
    const plainFractions = text.match(/\b\d+\/\d+\b/g);
    if (plainFractions) {
      plainFractions.forEach((frac) => {
        const fracIndex = text.indexOf(frac);
        const beforeText = text.substring(0, fracIndex);
        const afterText = text.substring(fracIndex + frac.length);

        const dollarsBefore = (beforeText.match(/\$/g) || []).length;

        if (dollarsBefore % 2 === 0) {
          issues.push({
            file: fileIndex,
            question: questionIndex,
            field: field.name,
            type: 'plain_fraction',
            value: frac,
            suggestion: `$\\frac{${frac.split('/')[0]}}{${
              frac.split('/')[1]
            }}$`,
          });
        }
      });
    }

    // Check for plain exponents
    const plainExponents = text.match(/\b\w+\^\d+\b/g);
    if (plainExponents) {
      plainExponents.forEach((exp) => {
        const expIndex = text.indexOf(exp);
        const beforeText = text.substring(0, expIndex);
        const dollarsBefore = (beforeText.match(/\$/g) || []).length;

        if (dollarsBefore % 2 === 0) {
          issues.push({
            file: fileIndex,
            question: questionIndex,
            field: field.name,
            type: 'plain_exponent',
            value: exp,
            suggestion: `$${exp}$`,
          });
        }
      });
    }

    // Check for / in math mode that should be \frac
    const mathSegments = text.match(/\$[^$]+\$/g);
    if (mathSegments) {
      mathSegments.forEach((seg) => {
        if (seg.includes('/') && !seg.includes('\\frac')) {
          const match = seg.match(/(\d+)\/(\d+)/);
          if (match) {
            issues.push({
              file: fileIndex,
              question: questionIndex,
              field: field.name,
              type: 'slash_in_math',
              value: seg,
              suggestion: seg.replace(
                match[0],
                `\\frac{${match[1]}}{${match[2]}}`
              ),
            });
          }
        }
      });
    }

    // Check tables
    const hasTable = /<table|<\/table>/gi;
    if (hasTable.test(text)) {
      if (
        !text.includes('</table>') ||
        !text.includes('<td') ||
        !text.includes('<tr')
      ) {
        issues.push({
          file: fileIndex,
          question: questionIndex,
          field: field.name,
          type: 'incomplete_table',
          value: 'Table markup incomplete',
        });
      }
    }
  });

  return issues;
}

async function auditFile(filePath) {
  try {
    const fileName = path.basename(filePath);
    totalFiles++;

    // Import the file dynamically
    const fileUrl = new URL(`file:///${filePath.replace(/\\/g, '/')}`);
    const module = await import(fileUrl.href + `?cacheBust=${Date.now()}`);
    const questions = module.default;

    if (!Array.isArray(questions)) {
      issues.push({
        file: fileName,
        type: 'file_format',
        message: 'File does not export an array of questions',
      });
      return;
    }

    questions.forEach((q, idx) => {
      totalQuestions++;
      const questionIssues = checkQuestion(q, fileName, idx + 1);
      issues.push(...questionIssues);
    });

    console.log(`✓ Audited ${fileName}: ${questions.length} questions`);
  } catch (error) {
    console.error(
      `✗ Error auditing ${path.basename(filePath)}:`,
      error.message
    );
    issues.push({
      file: path.basename(filePath),
      type: 'file_error',
      message: error.message,
    });
  }
}

async function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      await auditFile(fullPath);
    }
  }
}

// Run the audit
console.log('Starting Math Question KaTeX Audit...\n');
console.log('Scanning directory:', mathDir);
console.log('─'.repeat(60));

await scanDirectory(mathDir);

console.log('\n' + '─'.repeat(60));
console.log(`\nAudit Complete!`);
console.log(`Files audited: ${totalFiles}`);
console.log(`Questions audited: ${totalQuestions}`);
console.log(`Issues found: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('ISSUES FOUND:\n');

  // Group by type
  const grouped = {};
  issues.forEach((issue) => {
    const type = issue.type || 'other';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(issue);
  });

  Object.keys(grouped).forEach((type) => {
    console.log(`\n${type.toUpperCase()} (${grouped[type].length} issues):`);
    console.log('─'.repeat(60));

    grouped[type].slice(0, 10).forEach((issue) => {
      console.log(`  File: ${issue.file}, Question: ${issue.question}`);
      console.log(`  Field: ${issue.field}`);
      if (issue.value) console.log(`  Found: ${issue.value}`);
      if (issue.suggestion) console.log(`  Suggest: ${issue.suggestion}`);
      console.log();
    });

    if (grouped[type].length > 10) {
      console.log(`  ... and ${grouped[type].length - 10} more`);
    }
  });

  // Write detailed report to file
  fs.writeFileSync(
    path.join(__dirname, 'math-katex-audit-report-full.json'),
    JSON.stringify(issues, null, 2)
  );
  console.log(
    '\nDetailed report written to: math-katex-audit-report-full.json'
  );
} else {
  console.log('✓ All math questions are properly formatted!');
  console.log('✓ All fractions use proper LaTeX: $\\frac{a}{b}$');
  console.log('✓ All exponents are in math mode: $x^2$');
  console.log('✓ All tables have proper HTML structure');
}

process.exit(issues.length > 0 ? 1 : 0);
