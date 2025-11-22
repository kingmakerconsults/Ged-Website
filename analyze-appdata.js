import fs from 'fs';

const content = fs.readFileSync('frontend/app.jsx', 'utf-8');
const lines = content.split('\n');

// Find the start and approximate end of AppData
let appDataStart = -1;
let appDataEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'const AppData = {') {
    appDataStart = i;
  }
  // Look for the next major const declaration or function
  if (
    appDataStart > 0 &&
    i > appDataStart + 100 &&
    lines[i].match(/^(const|function|class)\s+\w+/)
  ) {
    appDataEnd = i - 1;
    break;
  }
}

if (appDataStart === -1) {
  console.log('Could not find AppData start');
  process.exit(1);
}

// If we didn't find an end, scan for major section
if (appDataEnd === -1) {
  appDataEnd = Math.min(lines.length - 1, appDataStart + 30000);
}

console.log(
  `Analyzing AppData from line ${appDataStart + 1} to ${appDataEnd + 1}`
);
console.log(`Total lines to analyze: ${appDataEnd - appDataStart + 1}\n`);

const issues = [];

// State tracking
let inAppData = false;
let currentSubject = '';
let currentCategory = '';
let currentTopicId = '';
let currentTopicLine = -1;
let braceDepth = 0;
let inQuestions = false;
let inQuestion = false;
let inAnswerOptions = false;
let currentQuestionLine = -1;
let currentQuestionNumber = -1;
let answerOptionsStartLine = -1;
let answerOptionCount = 0;
let questionsByTopic = new Map();

for (let i = appDataStart; i <= appDataEnd; i++) {
  const line = lines[i];
  const lineNum = i + 1;
  const trimmed = line.trim();

  // Track brace depth
  const openBraces = (line.match(/{/g) || []).length;
  const closeBraces = (line.match(/}/g) || []).length;
  braceDepth += openBraces - closeBraces;

  // Track if we're in AppData
  if (lineNum === appDataStart + 1) {
    inAppData = true;
  }

  // Track subjects (Science, Math, RLA, etc.)
  const subjectMatch = line.match(/^  (\w+):\s*{/);
  if (subjectMatch && inAppData) {
    currentSubject = subjectMatch[1];
    console.log(`Found subject: ${currentSubject} at line ${lineNum}`);
  }

  // Track topic IDs
  const topicIdMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (topicIdMatch) {
    currentTopicId = topicIdMatch[1];
    currentTopicLine = lineNum;
    if (!questionsByTopic.has(currentTopicId)) {
      questionsByTopic.set(currentTopicId, []);
    }
  }

  // Track questions array
  if (trimmed === 'questions: [') {
    inQuestions = true;
  }

  // Track individual question objects
  if (inQuestions && trimmed === '{' && !inQuestion && !inAnswerOptions) {
    inQuestion = true;
    currentQuestionLine = lineNum;
    currentQuestionNumber = -1;
  }

  // Track question number
  const qNumMatch = line.match(/questionNumber:\s*(\d+)/);
  if (qNumMatch && inQuestion) {
    currentQuestionNumber = parseInt(qNumMatch[1]);
    const topicQuestions = questionsByTopic.get(currentTopicId) || [];

    // Check for duplicates
    const existing = topicQuestions.find(
      (q) => q.num === currentQuestionNumber
    );
    if (existing) {
      issues.push({
        line: lineNum,
        type: 'DUPLICATE_QUESTION_NUMBER',
        severity: 'HIGH',
        subject: currentSubject,
        topicId: currentTopicId,
        description: `Duplicate questionNumber ${currentQuestionNumber} (first at line ${existing.line})`,
      });
    }

    topicQuestions.push({ num: currentQuestionNumber, line: lineNum });
    questionsByTopic.set(currentTopicId, topicQuestions);
  }

  // Track answerOptions
  if (trimmed.startsWith('answerOptions: [')) {
    inAnswerOptions = true;
    answerOptionsStartLine = lineNum;
    answerOptionCount = 0;
  }

  // Count answer options (look for opening braces that start an option object)
  if (inAnswerOptions && trimmed === '{') {
    answerOptionCount++;
  }

  // Check when answerOptions closes
  if (inAnswerOptions && trimmed === '],') {
    inAnswerOptions = false;

    // Check if too few options
    if (answerOptionCount < 3) {
      issues.push({
        line: answerOptionsStartLine,
        type: 'TOO_FEW_ANSWER_OPTIONS',
        severity: 'HIGH',
        subject: currentSubject,
        topicId: currentTopicId,
        questionNumber: currentQuestionNumber,
        optionCount: answerOptionCount,
        description: `Question ${currentQuestionNumber} has only ${answerOptionCount} answer options (expected 4)`,
      });
    }
  }

  // Check for unbalanced LaTeX in question/passage text (only in AppData section)
  if ((line.includes('question:') || line.includes('passage:')) && inQuestion) {
    // Extract the text content
    const textMatch = line.match(/(?:question|passage):\s*['"](.*)/);
    if (textMatch) {
      let text = textMatch[1];

      // For multiline strings, we'd need to look ahead, but check current line
      const dollars = (text.match(/(?<!\\)\$/g) || []).length;
      const doubleDollars = (text.match(/\$\$/g) || []).length;

      // Count after excluding $$
      const singleDollars = dollars - doubleDollars * 2;

      if (singleDollars % 2 !== 0) {
        issues.push({
          line: lineNum,
          type: 'UNPAIRED_LATEX_DELIMITER',
          severity: 'MEDIUM',
          subject: currentSubject,
          topicId: currentTopicId,
          questionNumber: currentQuestionNumber,
          description: `Possible unclosed $ in LaTeX formula`,
          preview: text.substring(0, 100),
        });
      }

      const openBrackets = (text.match(/\\\[/g) || []).length;
      const closeBrackets = (text.match(/\\\]/g) || []).length;
      if (openBrackets !== closeBrackets) {
        issues.push({
          line: lineNum,
          type: 'UNPAIRED_LATEX_BRACKET',
          severity: 'MEDIUM',
          subject: currentSubject,
          topicId: currentTopicId,
          questionNumber: currentQuestionNumber,
          description: `Unbalanced \\[ or \\] in LaTeX`,
          preview: text.substring(0, 100),
        });
      }
    }
  }

  // Detect possible missing comma between question objects
  if (inQuestions && trimmed === '}' && !inAnswerOptions) {
    // Look ahead to see if next non-empty line starts with {
    for (let j = i + 1; j <= Math.min(i + 3, appDataEnd); j++) {
      const nextTrim = lines[j].trim();
      if (nextTrim === '') continue;

      if (nextTrim === '{') {
        issues.push({
          line: lineNum,
          type: 'MISSING_COMMA',
          severity: 'HIGH',
          subject: currentSubject,
          topicId: currentTopicId,
          description: `Missing comma after question object (next question starts at line ${
            j + 1
          })`,
        });
      }
      break;
    }
  }

  // Track when question closes
  if (inQuestion && trimmed === '},' && !inAnswerOptions) {
    inQuestion = false;
    currentQuestionLine = -1;
    currentQuestionNumber = -1;
  }

  // Track when questions array closes
  if (inQuestions && trimmed === '],') {
    inQuestions = false;
  }
}

// Report
console.log('\n=== QUESTION INTEGRITY ANALYSIS ===\n');
console.log(`Total issues found: ${issues.length}\n`);

const byType = {};
issues.forEach((iss) => {
  if (!byType[iss.type]) byType[iss.type] = [];
  byType[iss.type].push(iss);
});

Object.keys(byType).forEach((type) => {
  const typeIssues = byType[type];
  console.log(`\n${type} (${typeIssues.length} issues):`);
  console.log('='.repeat(60));

  typeIssues.forEach((iss) => {
    console.log(`\nLine ${iss.line}: [${iss.severity}]`);
    console.log(`  Subject: ${iss.subject || 'N/A'}`);
    console.log(`  Topic: ${iss.topicId || 'N/A'}`);
    if (iss.questionNumber >= 0)
      console.log(`  Question #: ${iss.questionNumber}`);
    if (iss.optionCount >= 0) console.log(`  Option Count: ${iss.optionCount}`);
    console.log(`  ${iss.description}`);
    if (iss.preview) console.log(`  Preview: ${iss.preview}`);
  });
});

// Summary by subject
console.log('\n\n=== SUMMARY BY SUBJECT ===\n');
const bySubject = {};
issues.forEach((iss) => {
  const subj = iss.subject || 'Unknown';
  if (!bySubject[subj]) bySubject[subj] = { total: 0, high: 0, medium: 0 };
  bySubject[subj].total++;
  if (iss.severity === 'HIGH') bySubject[subj].high++;
  if (iss.severity === 'MEDIUM') bySubject[subj].medium++;
});

Object.keys(bySubject)
  .sort()
  .forEach((subj) => {
    const stats = bySubject[subj];
    console.log(
      `${subj}: ${stats.total} issues (${stats.high} high, ${stats.medium} medium)`
    );
  });

// Save detailed JSON
fs.writeFileSync(
  'question-issues-detailed.json',
  JSON.stringify(issues, null, 2)
);
console.log('\n\n📝 Detailed results saved to: question-issues-detailed.json');
