import fs from 'fs';

const content = fs.readFileSync('frontend/app.jsx', 'utf-8');
const lines = content.split('\n');

// Find AppData section
let appDataStart = lines.findIndex((l) => l.trim() === 'const AppData = {');
let appDataEnd = appDataStart + 25000; // Generous range

console.log(`Scanning lines ${appDataStart + 1} to ${appDataEnd + 1}\n`);

const issues = [];
let currentTopicId = '';
let inQuestions = false;
let currentQuestionStart = -1;
let foundQuestionNumber = false;

for (let i = appDataStart; i <= Math.min(appDataEnd, lines.length - 1); i++) {
  const line = lines[i];
  const lineNum = i + 1;
  const trimmed = line.trim();

  // Track topic ID
  const topicMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (topicMatch) {
    currentTopicId = topicMatch[1];
  }

  // Track questions array
  if (trimmed === 'questions: [') {
    inQuestions = true;
  }

  if (trimmed === '],') {
    inQuestions = false;
  }

  // Detect start of question object
  if (inQuestions && trimmed === '{') {
    currentQuestionStart = lineNum;
    foundQuestionNumber = false;
  }

  // Check if question has questionNumber
  if (currentQuestionStart > 0 && line.includes('questionNumber:')) {
    foundQuestionNumber = true;
  }

  // Check when we hit the question field without finding questionNumber
  if (
    currentQuestionStart > 0 &&
    !foundQuestionNumber &&
    line.includes('question:')
  ) {
    issues.push({
      line: currentQuestionStart,
      type: 'MISSING_QUESTION_NUMBER',
      topicId: currentTopicId,
      severity: 'HIGH',
      description: `Question object starting at line ${currentQuestionStart} is missing questionNumber field`,
    });
    currentQuestionStart = -1; // Reset to avoid duplicate reports
  }

  // Reset when question closes
  if (currentQuestionStart > 0 && (trimmed === '},' || trimmed === '}')) {
    currentQuestionStart = -1;
    foundQuestionNumber = false;
  }
}

console.log(`\n=== MISSING QUESTION NUMBERS ===\n`);
console.log(`Total missing questionNumber fields: ${issues.length}\n`);

if (issues.length > 0) {
  issues.forEach((issue) => {
    console.log(`Line ${issue.line}: ${issue.description}`);
    console.log(`  Topic ID: ${issue.topicId}`);
    console.log('');
  });
}

// Save results
fs.writeFileSync(
  'missing-question-numbers.json',
  JSON.stringify(issues, null, 2)
);
console.log(`\n📝 Results saved to: missing-question-numbers.json`);
