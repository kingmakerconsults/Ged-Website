/**
 * Comprehensive Math Question KaTeX Audit
 * Checks all math questions for proper LaTeX formatting
 */

const fs = require('fs');
const path = require('path');

const mathDir = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');
const issues = [];
let totalQuestions = 0;
let totalFiles = 0;

// Patterns to check
const patterns = {
  // Good patterns (should be present)
  goodFractions: /\$\\frac\{[^}]+\}\{[^}]+\}\$/g,
  goodExponents: /\$[^$]*\^[^$]*\$/g,
  goodInlineMath: /\$[^$]+\$/g,
  
  // Bad patterns (should NOT be present)
  badFractions: /\b\d+\/\d+\b(?![^$]*\$)/g,  // Plain fractions outside math mode
  badExponents: /\b\w+\^\d+\b(?![^$]*\$)/g,  // Plain exponents outside math mode
  unescapedDollar: /(?<!\$)\$(?!\$)(?![^$]*\$)/g,  // Single $ not in math mode
  
  // Table patterns
  hasTable: /<table|<\/table>/gi,
};

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
      fieldsToCheck.push({ name: `answer[${idx}].rationale`, value: opt.rationale });
    });
  }
  
  fieldsToCheck.forEach(field => {
    if (!field.value || typeof field.value !== 'string') return;
    
    const text = field.value;
    
    // Check for plain fractions that should be in LaTeX
    const plainFractions = text.match(/\b\d+\/\d+\b/g);
    if (plainFractions) {
      // Check if they're outside $ delimiters
      plainFractions.forEach(frac => {
        const fracIndex = text.indexOf(frac);
        const beforeText = text.substring(0, fracIndex);
        const afterText = text.substring(fracIndex + frac.length);
        
        // Count $ before and after
        const dollarsBefore = (beforeText.match(/\$/g) || []).length;
        const dollarsAfter = (afterText.match(/\$/g) || []).length;
        
        // If odd number of $ before, we're inside math mode - OK
        // If even number, we're outside math mode - ISSUE
        if (dollarsBefore % 2 === 0) {
          issues.push({
            file: fileIndex,
            question: questionIndex,
            field: field.name,
            type: 'plain_fraction',
            value: frac,
            suggestion: `$\\frac{${frac.split('/')[0]}}{${frac.split('/')[1]}}$`
          });
        }
      });
    }
    
    // Check for plain exponents
    const plainExponents = text.match(/\b\w+\^\d+\b/g);
    if (plainExponents) {
      plainExponents.forEach(exp => {
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
            suggestion: `$${exp}$`
          });
        }
      });
    }
    
    // Check for proper fraction usage in math mode
    const mathSegments = text.match(/\$[^$]+\$/g);
    if (mathSegments) {
      mathSegments.forEach(seg => {
        // Check for / in math mode that should be \frac
        if (seg.includes('/') && !seg.includes('\\frac')) {
          const match = seg.match(/(\d+)\/(\d+)/);
          if (match) {
            issues.push({
              file: fileIndex,
              question: questionIndex,
              field: field.name,
              type: 'slash_in_math',
              value: seg,
              suggestion: seg.replace(match[0], `\\frac{${match[1]}}{${match[2]}}`)
            });
          }
        }
      });
    }
    
    // Check tables
    if (patterns.hasTable.test(text)) {
      // Tables should have proper HTML structure
      if (!text.includes('</table>') || !text.includes('<td') || !text.includes('<tr')) {
        issues.push({
          file: fileIndex,
          question: questionIndex,
          field: field.name,
          type: 'incomplete_table',
          value: 'Table markup incomplete'
        });
      }
    }
  });
  
  return issues;
}

function auditFile(filePath) {
  try {
    const fileName = path.basename(filePath);
    totalFiles++;
    
    // Read and parse the file
    delete require.cache[require.resolve(filePath)];
    const questions = require(filePath);
    
    if (!Array.isArray(questions)) {
      issues.push({
        file: fileName,
        type: 'file_format',
        message: 'File does not export an array of questions'
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
    console.error(`✗ Error auditing ${path.basename(filePath)}:`, error.message);
    issues.push({
      file: path.basename(filePath),
      type: 'file_error',
      message: error.message
    });
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      auditFile(fullPath);
    }
  });
}

// Run the audit
console.log('Starting Math Question KaTeX Audit...\n');
console.log('Scanning directory:', mathDir);
console.log('─'.repeat(60));

scanDirectory(mathDir);

console.log('\n' + '─'.repeat(60));
console.log(`\nAudit Complete!`);
console.log(`Files audited: ${totalFiles}`);
console.log(`Questions audited: ${totalQuestions}`);
console.log(`Issues found: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('ISSUES FOUND:\n');
  
  // Group by type
  const grouped = {};
  issues.forEach(issue => {
    const type = issue.type || 'other';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(issue);
  });
  
  Object.keys(grouped).forEach(type => {
    console.log(`\n${type.toUpperCase()} (${grouped[type].length} issues):`);
    console.log('─'.repeat(60));
    
    grouped[type].slice(0, 10).forEach(issue => {
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
    path.join(__dirname, 'math-katex-audit-report.json'),
    JSON.stringify(issues, null, 2)
  );
  console.log('\nDetailed report written to: math-katex-audit-report.json');
} else {
  console.log('✓ All math questions are properly formatted!');
  console.log('✓ All fractions use proper LaTeX: $\\frac{a}{b}$');
  console.log('✓ All exponents are in math mode: $x^2$');
  console.log('✓ All tables have proper HTML structure');
}

process.exit(issues.length > 0 ? 1 : 0);
