import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const issues = {
  noQuestion: [],
  noAnswerOptions: [],
  malformedTables: [],
  missingCorrectAnswer: [],
  incompleteAnswers: [],
  imageReferences: [],
  htmlErrors: [],
  unformattedExponents: [],
};

function checkQuestion(question, quizId, qNum) {
  const qId = `${quizId}:Q${qNum}`;

  // Check 1: Question text exists and is valid
  if (!question.question || typeof question.question !== 'string') {
    issues.noQuestion.push({
      id: qId,
      reason: 'Missing or invalid question text',
    });
    return;
  }

  const q = question.question;

  // Check 2: Look for HTML table errors/malformations
  if (q.includes('<table') || q.includes('<tr') || q.includes('<td')) {
    // Check for unclosed tags
    const tableOpen = (q.match(/<table/g) || []).length;
    const tableClose = (q.match(/<\/table>/g) || []).length;
    const trOpen = (q.match(/<tr/g) || []).length;
    const trClose = (q.match(/<\/tr>/g) || []).length;

    if (tableOpen !== tableClose || trOpen !== trClose) {
      issues.malformedTables.push({ id: qId, question: q.substring(0, 100) });
    }
  }

  // Check 3: Look for image references
  if (
    q.includes('img') ||
    q.includes('.png') ||
    q.includes('.jpg') ||
    q.includes('.jpeg') ||
    q.includes('.gif')
  ) {
    issues.imageReferences.push({ id: qId, question: q.substring(0, 100) });
  }

  // Check 4: Look for unformatted exponents
  if (q.match(/[0-9a-zA-Z]\^[0-9](?![}])/)) {
    issues.unformattedExponents.push({
      id: qId,
      question: q.substring(0, 100),
    });
  }

  // Check 5: Answer options exist and are complete
  if (
    !Array.isArray(question.answerOptions) ||
    question.answerOptions.length === 0
  ) {
    issues.noAnswerOptions.push({ id: qId, question: q.substring(0, 80) });
    return;
  }

  // Check 6: Each answer has required fields
  let hasCorrect = false;
  for (let i = 0; i < question.answerOptions.length; i++) {
    const opt = question.answerOptions[i];

    if (!opt.text || typeof opt.text !== 'string') {
      issues.incompleteAnswers.push({
        id: qId,
        issue: `Option ${i} missing text`,
        question: q.substring(0, 60),
      });
    }

    if (typeof opt.isCorrect !== 'boolean') {
      issues.incompleteAnswers.push({
        id: qId,
        issue: `Option ${i} missing isCorrect flag`,
        question: q.substring(0, 60),
      });
    }

    if (opt.isCorrect) {
      hasCorrect = true;
    }

    // Check for images in answer text
    if (opt.text && (opt.text.includes('img') || opt.text.includes('.png'))) {
      issues.imageReferences.push({
        id: qId,
        where: `Answer option ${i}`,
        text: opt.text.substring(0, 100),
      });
    }
  }

  if (!hasCorrect) {
    issues.missingCorrectAnswer.push({ id: qId, question: q.substring(0, 80) });
  }

  // Check 7: HTML validity
  if (q.includes('<') && q.includes('>')) {
    // Basic HTML check
    const openTags = (q.match(/<[a-z]+/gi) || []).length;
    const closeTags = (q.match(/<\/[a-z]+>/gi) || []).length;
    if (openTags !== closeTags) {
      issues.htmlErrors.push({ id: qId, question: q.substring(0, 100) });
    }
  }
}

function auditQuizFile(filePath) {
  console.log(`\n📋 Auditing: ${path.basename(filePath)}`);
  console.log('='.repeat(70));

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    let totalQuestions = 0;

    if (data.categories && typeof data.categories === 'object') {
      for (const catKey in data.categories) {
        const category = data.categories[catKey];
        if (Array.isArray(category.topics)) {
          for (const topic of category.topics) {
            if (Array.isArray(topic.quizzes)) {
              for (const quiz of topic.quizzes) {
                if (Array.isArray(quiz.questions)) {
                  for (let i = 0; i < quiz.questions.length; i++) {
                    checkQuestion(
                      quiz.questions[i],
                      quiz.quizId || catKey,
                      i + 1
                    );
                    totalQuestions++;
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log(`✅ Total questions audited: ${totalQuestions}`);
    return totalQuestions;
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return 0;
  }
}

// Main execution
console.log('\n🔍 COMPREHENSIVE MATH QUIZ AUDIT');
console.log('='.repeat(70));

const quizDir = path.join(__dirname, 'backend', 'quizzes');
const mathQuizFiles = ['math.quizzes.part1.json'];

let totalQuestionsAudited = 0;

for (const file of mathQuizFiles) {
  const filePath = path.join(quizDir, file);
  if (fs.existsSync(filePath)) {
    totalQuestionsAudited += auditQuizFile(filePath);
  }
}

// Print audit results
console.log('\n' + '='.repeat(70));
console.log('📊 AUDIT RESULTS');
console.log('='.repeat(70));

console.log(`\n❌ Missing Question Text: ${issues.noQuestion.length}`);
if (issues.noQuestion.length > 0) {
  issues.noQuestion
    .slice(0, 5)
    .forEach((i) => console.log(`   ${i.id}: ${i.reason}`));
  if (issues.noQuestion.length > 5)
    console.log(`   ... and ${issues.noQuestion.length - 5} more`);
}

console.log(`\n❌ Missing Answer Options: ${issues.noAnswerOptions.length}`);
if (issues.noAnswerOptions.length > 0) {
  issues.noAnswerOptions
    .slice(0, 5)
    .forEach((i) => console.log(`   ${i.id}: "${i.question}..."`));
  if (issues.noAnswerOptions.length > 5)
    console.log(`   ... and ${issues.noAnswerOptions.length - 5} more`);
}

console.log(
  `\n❌ Incomplete Answer Options: ${issues.incompleteAnswers.length}`
);
if (issues.incompleteAnswers.length > 0) {
  issues.incompleteAnswers
    .slice(0, 5)
    .forEach((i) => console.log(`   ${i.id}: ${i.issue} ("${i.question}...")`));
  if (issues.incompleteAnswers.length > 5)
    console.log(`   ... and ${issues.incompleteAnswers.length - 5} more`);
}

console.log(
  `\n❌ Missing Correct Answer: ${issues.missingCorrectAnswer.length}`
);
if (issues.missingCorrectAnswer.length > 0) {
  issues.missingCorrectAnswer
    .slice(0, 5)
    .forEach((i) => console.log(`   ${i.id}: "${i.question}..."`));
  if (issues.missingCorrectAnswer.length > 5)
    console.log(`   ... and ${issues.missingCorrectAnswer.length - 5} more`);
}

console.log(`\n⚠️  Malformed Tables: ${issues.malformedTables.length}`);
if (issues.malformedTables.length > 0) {
  issues.malformedTables
    .slice(0, 3)
    .forEach((i) => console.log(`   ${i.id}: "${i.question}..."`));
  if (issues.malformedTables.length > 3)
    console.log(`   ... and ${issues.malformedTables.length - 3} more`);
}

console.log(`\n⚠️  HTML/Tag Errors: ${issues.htmlErrors.length}`);
if (issues.htmlErrors.length > 0) {
  issues.htmlErrors
    .slice(0, 3)
    .forEach((i) => console.log(`   ${i.id}: "${i.question}..."`));
  if (issues.htmlErrors.length > 3)
    console.log(`   ... and ${issues.htmlErrors.length - 3} more`);
}

console.log(`\n🖼️  Image References: ${issues.imageReferences.length}`);
if (issues.imageReferences.length > 0) {
  issues.imageReferences.slice(0, 5).forEach((i) => {
    if (i.where) {
      console.log(`   ${i.id} (${i.where}): "${i.text.substring(0, 60)}..."`);
    } else {
      console.log(`   ${i.id}: "${i.question}..."`);
    }
  });
  if (issues.imageReferences.length > 5)
    console.log(`   ... and ${issues.imageReferences.length - 5} more`);
}

console.log(
  `\n📐 Unformatted Exponents: ${issues.unformattedExponents.length}`
);
if (issues.unformattedExponents.length > 0) {
  issues.unformattedExponents
    .slice(0, 5)
    .forEach((i) => console.log(`   ${i.id}: "${i.question}..."`));
  if (issues.unformattedExponents.length > 5)
    console.log(`   ... and ${issues.unformattedExponents.length - 5} more`);
}

console.log('\n' + '='.repeat(70));
console.log(`📈 SUMMARY`);
console.log('='.repeat(70));
const totalIssues = Object.values(issues).reduce(
  (sum, arr) => sum + arr.length,
  0
);
console.log(`Total Questions: ${totalQuestionsAudited}`);
console.log(`Total Issues Found: ${totalIssues}`);
console.log(
  `Quality Score: ${(
    ((totalQuestionsAudited - totalIssues) / totalQuestionsAudited) *
    100
  ).toFixed(1)}%`
);

// Save detailed report
const reportPath = path.join(__dirname, 'audit-report-math.json');
fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));
console.log(`\n📄 Detailed report saved to: audit-report-math.json`);
