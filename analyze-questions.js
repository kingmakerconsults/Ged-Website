import fs from 'fs';

// Read the app.jsx file
const content = fs.readFileSync('frontend/app.jsx', 'utf-8');

// Try to evaluate it as JSON-like structure (with some preprocessing)
// This is a rough approach - we'll use regex to find issues instead

const lines = content.split('\n');
const issues = [];

// Track question numbers by topic to find duplicates
const questionNumbersByTopic = new Map();
let currentSubject = '';
let currentCategory = '';
let currentTopic = '';
let currentTopicId = '';

// Parse through the file line by line
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;

  // Track current subject
  const subjectMatch = line.match(/^  (\w+):\s*{/);
  if (subjectMatch && lineNum > 720) {
    currentSubject = subjectMatch[1];
  }

  // Track current topic ID
  const topicIdMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (topicIdMatch) {
    currentTopicId = topicIdMatch[1];
    if (!questionNumbersByTopic.has(currentTopicId)) {
      questionNumbersByTopic.set(currentTopicId, []);
    }
  }

  // Track question numbers
  const questionNumMatch = line.match(/questionNumber:\s*(\d+)/);
  if (questionNumMatch) {
    const qNum = parseInt(questionNumMatch[1]);
    const topicQuestions = questionNumbersByTopic.get(currentTopicId) || [];

    // Check for duplicate question numbers
    if (topicQuestions.includes(qNum)) {
      issues.push({
        line: lineNum,
        type: 'DUPLICATE_QUESTION_NUMBER',
        description: `Topic "${currentTopicId}" has duplicate questionNumber: ${qNum}`,
        severity: 'HIGH',
      });
    }
    topicQuestions.push(qNum);
    questionNumbersByTopic.set(currentTopicId, topicQuestions);
  }

  // Check for answerOptions with too few options
  if (line.includes('answerOptions: [')) {
    const startLine = lineNum;
    let bracketCount = 1;
    let optionCount = 0;
    let endLine = startLine;

    // Count the answer options
    for (let j = i + 1; j < lines.length && bracketCount > 0; j++) {
      const checkLine = lines[j];

      // Count opening brackets for nested structures
      const openBrackets = (checkLine.match(/\[/g) || []).length;
      const closeBrackets = (checkLine.match(/\]/g) || []).length;
      bracketCount += openBrackets - closeBrackets;

      // Count answer options (looking for { at the start of an option object)
      if (checkLine.trim().startsWith('{') && !checkLine.includes('text:')) {
        optionCount++;
      }

      endLine = j + 1;
      if (bracketCount === 0) break;
    }

    if (optionCount < 3) {
      issues.push({
        line: startLine,
        type: 'TOO_FEW_OPTIONS',
        description: `Question has only ${optionCount} answer options (expected at least 3, typically 4)`,
        severity: 'HIGH',
        context: currentTopicId,
      });
    }
  }

  // Check for truncated LaTeX formulas (unclosed $ or $$ or \[)
  if (line.includes('$') || line.includes('\\[')) {
    const dollarCount = (line.match(/\$/g) || []).length;
    const doubleDollarCount = (line.match(/\$\$/g) || []).length;
    const openLatexBracket = (line.match(/\\\[/g) || []).length;
    const closeLatexBracket = (line.match(/\\\]/g) || []).length;

    // Check for unpaired delimiters
    if ((dollarCount - doubleDollarCount * 2) % 2 !== 0) {
      issues.push({
        line: lineNum,
        type: 'UNPAIRED_LATEX_DELIMITER',
        description: 'Possible unpaired $ delimiter in LaTeX formula',
        severity: 'MEDIUM',
        preview: line.trim().substring(0, 100),
      });
    }

    if (openLatexBracket !== closeLatexBracket) {
      issues.push({
        line: lineNum,
        type: 'UNPAIRED_LATEX_BRACKET',
        description: 'Unbalanced \\[ or \\] in LaTeX formula',
        severity: 'MEDIUM',
        preview: line.trim().substring(0, 100),
      });
    }
  }

  // Check for questions/passages that end abruptly
  if (line.includes('question:') || line.includes('passage:')) {
    const textMatch = line.match(/(?:question|passage):\s*['"]([^'"]*)/);
    if (textMatch) {
      const text = textMatch[1];

      // Check for text ending mid-sentence or mid-formula
      if (text.length > 20) {
        const lastChars = text.slice(-5);
        if (lastChars.match(/[\\$]\s*$/) || lastChars.match(/\w{3,}$/)) {
          // Might be continued on next line - check
          const nextLine = lines[i + 1] || '';
          if (
            !nextLine.trim().startsWith("'") &&
            !nextLine.trim().startsWith('"')
          ) {
            issues.push({
              line: lineNum,
              type: 'POSSIBLY_TRUNCATED_TEXT',
              description:
                'Question/passage text may be incomplete or truncated',
              severity: 'MEDIUM',
              preview: text.slice(-50),
            });
          }
        }
      }
    }
  }

  // Check for missing commas between question objects
  if (line.trim() === '},' || line.trim() === '},') {
    // This is an object closing - check if next non-empty line starts a new object
    let nextContentLine = '';
    let nextLineNum = 0;
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      if (lines[j].trim()) {
        nextContentLine = lines[j].trim();
        nextLineNum = j + 1;
        break;
      }
    }

    // If next line starts with { and previous line was }, good
    // If next line starts with { but current line is just }, might be missing comma
    if (line.trim() === '}' && nextContentLine.startsWith('{')) {
      issues.push({
        line: lineNum,
        type: 'MISSING_COMMA',
        description:
          'Missing comma after closing brace (next object starts without comma)',
        severity: 'HIGH',
      });
    }
  }
}

// Report findings
console.log('\n=== QUESTION INTEGRITY ANALYSIS ===\n');
console.log(`Total issues found: ${issues.length}\n`);

// Group by severity
const high = issues.filter((i) => i.severity === 'HIGH');
const medium = issues.filter((i) => i.severity === 'MEDIUM');

if (high.length > 0) {
  console.log(`\n🔴 HIGH SEVERITY ISSUES (${high.length}):\n`);
  high.forEach((issue) => {
    console.log(`Line ${issue.line}: [${issue.type}]`);
    console.log(`  ${issue.description}`);
    if (issue.context) console.log(`  Context: ${issue.context}`);
    if (issue.preview) console.log(`  Preview: ${issue.preview}`);
    console.log('');
  });
}

if (medium.length > 0) {
  console.log(`\n🟡 MEDIUM SEVERITY ISSUES (${medium.length}):\n`);
  medium.forEach((issue) => {
    console.log(`Line ${issue.line}: [${issue.type}]`);
    console.log(`  ${issue.description}`);
    if (issue.context) console.log(`  Context: ${issue.context}`);
    if (issue.preview) console.log(`  Preview: ${issue.preview}`);
    console.log('');
  });
}

if (issues.length === 0) {
  console.log('✅ No obvious issues detected!');
}

// Export detailed results to JSON
fs.writeFileSync(
  'question-analysis-results.json',
  JSON.stringify(issues, null, 2)
);
console.log('\n📝 Detailed results saved to: question-analysis-results.json');
