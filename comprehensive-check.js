import fs from 'fs';

const content = fs.readFileSync('frontend/app.jsx', 'utf-8');
const lines = content.split('\n');

const appDataStart = lines.findIndex((l) => l.trim() === 'const AppData = {');
const appDataEnd = appDataStart + 25000;

console.log(`═══════════════════════════════════════════════════════════`);
console.log(`          COMPREHENSIVE APPDATA INTEGRITY REPORT`);
console.log(`═══════════════════════════════════════════════════════════\n`);

const issues = [];
let currentTopicId = '';
let currentTopicLine = -1;
let inQuestions = false;
let currentQuestionStart = -1;
let foundQuestionNumber = false;
let currentQuestionNumber = -1;
const questionNumbersByTopic = new Map();

for (let i = appDataStart; i <= Math.min(appDataEnd, lines.length - 1); i++) {
  const line = lines[i];
  const lineNum = i + 1;
  const trimmed = line.trim();

  // Track topic ID
  const topicMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (topicMatch) {
    currentTopicId = topicMatch[1];
    currentTopicLine = lineNum;
    if (!questionNumbersByTopic.has(currentTopicId)) {
      questionNumbersByTopic.set(currentTopicId, []);
    }
  }

  // Track questions array
  if (trimmed === 'questions: [') {
    inQuestions = true;
  }

  if (inQuestions && trimmed === '],') {
    inQuestions = false;
  }

  // Detect start of question object
  if (inQuestions && trimmed === '{' && currentQuestionStart === -1) {
    currentQuestionStart = lineNum;
    foundQuestionNumber = false;
    currentQuestionNumber = -1;
  }

  // Check if question has questionNumber
  const qNumMatch = line.match(/^\s*questionNumber:\s*(\d+)/);
  if (qNumMatch && currentQuestionStart > 0) {
    foundQuestionNumber = true;
    currentQuestionNumber = parseInt(qNumMatch[1]);

    // Check for duplicates within the same topic
    const topicQuestions = questionNumbersByTopic.get(currentTopicId) || [];
    const existing = topicQuestions.find(
      (q) => q.num === currentQuestionNumber
    );

    if (existing) {
      issues.push({
        line: lineNum,
        type: 'DUPLICATE_QUESTION_NUMBER',
        topicId: currentTopicId,
        topicLine: currentTopicLine,
        questionNumber: currentQuestionNumber,
        firstOccurrence: existing.line,
        severity: 'HIGH',
        description: `Duplicate questionNumber ${currentQuestionNumber} in topic '${currentTopicId}' (first at line ${existing.line})`,
      });
    } else {
      topicQuestions.push({ num: currentQuestionNumber, line: lineNum });
      questionNumbersByTopic.set(currentTopicId, topicQuestions);
    }
  }

  // Check when we hit the question field without finding questionNumber
  if (
    currentQuestionStart > 0 &&
    !foundQuestionNumber &&
    line.match(/^\s*question:/)
  ) {
    issues.push({
      line: currentQuestionStart,
      type: 'MISSING_QUESTION_NUMBER',
      topicId: currentTopicId,
      topicLine: currentTopicLine,
      severity: 'HIGH',
      description: `Question object starting at line ${currentQuestionStart} is missing questionNumber field`,
    });
  }

  // Check for potentially truncated question/passage text
  if (
    inQuestions &&
    (line.includes('question:') || line.includes('passage:'))
  ) {
    const textMatch = line.match(/(?:question|passage):\s*['"](.*)/);
    if (textMatch) {
      const text = textMatch[1];
      // Check if text ends with a backslash (incomplete LaTeX) or appears cut off
      if (text.length > 10 && (text.endsWith('\\') || text.match(/\$[^$]*$/))) {
        // Check next line to see if it continues
        const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
        if (
          !nextLine.startsWith("'") &&
          !nextLine.startsWith('"') &&
          !nextLine.startsWith('+')
        ) {
          issues.push({
            line: lineNum,
            type: 'POSSIBLY_TRUNCATED_TEXT',
            topicId: currentTopicId,
            questionNumber:
              currentQuestionNumber >= 0 ? currentQuestionNumber : 'unknown',
            severity: 'MEDIUM',
            description: 'Question/passage text may be incomplete or truncated',
            preview: text.substring(Math.max(0, text.length - 60)),
          });
        }
      }
    }
  }

  // Check for unpaired LaTeX delimiters in question/passage
  if (inQuestions && line.match(/(?:question|passage):/)) {
    const fullText = line;
    const dollars = (fullText.match(/(?<!\\)\$/g) || []).length;
    const doubleDollars = (fullText.match(/\$\$/g) || []).length;
    const singleDollars = dollars - doubleDollars * 2;

    if (singleDollars % 2 !== 0 && !fullText.includes('${')) {
      // Exclude template literals
      issues.push({
        line: lineNum,
        type: 'UNPAIRED_LATEX_DELIMITER',
        topicId: currentTopicId,
        questionNumber:
          currentQuestionNumber >= 0 ? currentQuestionNumber : 'unknown',
        severity: 'MEDIUM',
        description: 'Possible unpaired $ delimiter in LaTeX formula',
        preview: fullText.trim().substring(0, 100),
      });
    }
  }

  // Reset when question closes
  if (currentQuestionStart > 0 && trimmed.match(/^},?\s*$/)) {
    currentQuestionStart = -1;
    foundQuestionNumber = false;
    currentQuestionNumber = -1;
  }
}

// REPORT GENERATION
console.log(`\n🔍 ANALYSIS SUMMARY:\n`);
console.log(
  `  Lines analyzed: ${appDataStart + 1} to ${Math.min(
    appDataEnd + 1,
    lines.length
  )}`
);
console.log(`  Topics found: ${questionNumbersByTopic.size}`);
console.log(`  Total issues: ${issues.length}\n`);

// Group by severity
const high = issues.filter((i) => i.severity === 'HIGH');
const medium = issues.filter((i) => i.severity === 'MEDIUM');

console.log(`  ⚠️  HIGH severity: ${high.length}`);
console.log(`  ⚡ MEDIUM severity: ${medium.length}\n`);

// Group by type
const byType = {};
issues.forEach((iss) => {
  if (!byType[iss.type]) byType[iss.type] = [];
  byType[iss.type].push(iss);
});

console.log(`═══════════════════════════════════════════════════════════\n`);
console.log(`📋 DETAILED FINDINGS:\n`);

Object.keys(byType)
  .sort()
  .forEach((type) => {
    const typeIssues = byType[type];
    console.log(`\n▶ ${type} (${typeIssues.length} occurrences)\n`);
    console.log(`${'─'.repeat(59)}\n`);

    typeIssues.forEach((iss, idx) => {
      console.log(`${idx + 1}. Line ${iss.line}:`);
      console.log(`   ${iss.description}`);
      console.log(
        `   Topic: ${iss.topicId} (defined at line ${
          iss.topicLine || 'unknown'
        })`
      );
      if (iss.questionNumber >= 0 || iss.questionNumber === 'unknown') {
        console.log(`   Question #: ${iss.questionNumber}`);
      }
      if (iss.firstOccurrence) {
        console.log(`   First occurrence: line ${iss.firstOccurrence}`);
      }
      if (iss.preview) {
        console.log(`   Preview: ${iss.preview}`);
      }
      console.log('');
    });
  });

// Check for gaps in question numbering
console.log(`\n═══════════════════════════════════════════════════════════\n`);
console.log(`🔢 QUESTION NUMBERING ANALYSIS:\n`);

let gapsFound = 0;
questionNumbersByTopic.forEach((questions, topicId) => {
  const nums = questions.map((q) => q.num).sort((a, b) => a - b);
  const gaps = [];

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] - nums[i] > 1) {
      gaps.push(`${nums[i]} -> ${nums[i + 1]}`);
    }
  }

  if (gaps.length > 0) {
    gapsFound++;
    console.log(`⚠️  ${topicId}:`);
    console.log(`   Question numbers: ${nums.join(', ')}`);
    console.log(`   Gaps detected: ${gaps.join(', ')}\n`);
  }
});

if (gapsFound === 0) {
  console.log(`✅ No gaps in question numbering detected\n`);
}

// Save results
fs.writeFileSync('comprehensive-issues.json', JSON.stringify(issues, null, 2));
console.log(`\n═══════════════════════════════════════════════════════════`);
console.log(`\n📝 Detailed JSON report saved to: comprehensive-issues.json\n`);
