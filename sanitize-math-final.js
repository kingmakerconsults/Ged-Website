import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * COMPREHENSIVE Math Quiz Sanitization v2
 */

function sanitizeMathExpression(text) {
  if (typeof text !== 'string') return text;

  // PASS 1: Fix LaTeX inline: $^2$ -> $^{2}$
  let result = text.replace(/\$\^([0-9]+)\$/g, '$^{$1}$');

  // PASS 2: Fix plain exponents: x^2 -> x^{2}, 3^2 -> 3^{2}, etc.
  result = result.replace(/([0-9a-zA-Z])\s*\^\s*([0-9]+)(?![}\d])/g, '$1^{$2}');

  // PASS 3: Fix paren exponents: )^2 -> )^{2}
  result = result.replace(/(\))\s*\^\s*([0-9]+)(?![}])/g, '$1^{$2}');

  // PASS 4: Fix multiplication
  result = result.replace(/(\d)\s*\*\s*([a-zA-Z0-9])/g, '$1 × $2');
  result = result.replace(/([a-zA-Z0-9])\s*\*\s*(\d)/g, '$1 × $2');

  return result;
}

function sanitizeQuestion(question) {
  if (!question) return question;

  if (typeof question === 'string') {
    return sanitizeMathExpression(question);
  }

  if (typeof question === 'object' && question !== null) {
    if (Array.isArray(question)) {
      return question.map((item) => sanitizeQuestion(item));
    }

    const result = {};
    for (const [key, value] of Object.entries(question)) {
      if (typeof value === 'string') {
        result[key] = sanitizeMathExpression(value);
      } else if (Array.isArray(value)) {
        result[key] = value.map((item) => sanitizeQuestion(item));
      } else if (value !== null && typeof value === 'object') {
        result[key] = sanitizeQuestion(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  return question;
}

function processQuizFile(filePath) {
  console.log(`\n📚 Processing: ${path.basename(filePath)}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    let totalQuestions = 0;
    let modifiedQuestions = 0;

    // Navigate: categories > topics > quizzes > questions
    if (data.categories && typeof data.categories === 'object') {
      for (const categoryKey in data.categories) {
        const category = data.categories[categoryKey];
        if (Array.isArray(category.topics)) {
          for (const topic of category.topics) {
            if (Array.isArray(topic.quizzes)) {
              for (const quiz of topic.quizzes) {
                if (Array.isArray(quiz.questions)) {
                  for (let i = 0; i < quiz.questions.length; i++) {
                    const before = JSON.stringify(quiz.questions[i]);
                    quiz.questions[i] = sanitizeQuestion(quiz.questions[i]);
                    const after = JSON.stringify(quiz.questions[i]);

                    if (before !== after) {
                      modifiedQuestions++;
                    }
                    totalQuestions++;
                  }
                }
              }
            }
          }
        }
      }
    }

    // Save
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    console.log(`✅ Processed: ${totalQuestions} questions`);
    console.log(
      `✏️  Modified: ${modifiedQuestions} (${(
        (modifiedQuestions / totalQuestions) *
        100
      ).toFixed(1)}%)`
    );

    return { totalQuestions, modifiedQuestions };
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return { totalQuestions: 0, modifiedQuestions: 0 };
  }
}

// Main
console.log('\n🔧 COMPREHENSIVE MATH QUIZ SANITIZATION');
console.log('='.repeat(60));

const quizDir = path.join(__dirname, 'backend', 'quizzes');
const mathQuizFiles = ['math.quizzes.part1.json', 'math.quizzes.part2.json'];

let totalStats = { questions: 0, modified: 0 };

for (const file of mathQuizFiles) {
  const filePath = path.join(quizDir, file);
  if (fs.existsSync(filePath)) {
    const stats = processQuizFile(filePath);
    totalStats.questions += stats.totalQuestions;
    totalStats.modified += stats.modifiedQuestions;
  }
}

console.log('\n' + '='.repeat(60));
console.log(
  `📊 TOTAL: ${totalStats.modified}/${totalStats.questions} modified`
);
console.log('✨ Complete!\n');
