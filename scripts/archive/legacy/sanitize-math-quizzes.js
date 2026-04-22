import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sanitize Math Quiz Files to Professional Format
 * Converts all exponents and mathematical expressions to proper LaTeX format
 */

function sanitizeMathExpression(text) {
  if (typeof text !== 'string') return text;

  let sanitized = text;

  // Convert exponents: x^2 -> x^{2}, but preserve already formatted ones like x^{2}
  // Match: letter/number followed by ^ followed by a digit or simple expression
  sanitized = sanitized.replace(
    /([a-zA-Z0-9\)])(\^)([0-9]+)(?![}])/g,
    (match, base, caret, exp) => {
      return `${base}^{${exp}}`;
    }
  );

  // Handle more complex cases like (x+1)^2 -> (x+1)^{2}
  sanitized = sanitized.replace(
    /(\))(\^)([0-9]+)(?![}])/g,
    (match, paren, caret, exp) => {
      return `)^{${exp}}`;
    }
  );

  // Fix multiplication signs: use × instead of * or x when appropriate
  // But be careful not to replace variable x
  sanitized = sanitized.replace(/(\d)\s*\*\s*(\d)/g, '$1 × $2');
  sanitized = sanitized.replace(/(\d)\s*x\s*(\d)/g, '$1 × $2');

  // Ensure proper spacing around operators
  sanitized = sanitized.replace(/([+\-=])/g, ' $1 ');
  sanitized = sanitized.replace(/\s+/g, ' '); // Collapse multiple spaces
  sanitized = sanitized.trim();

  return sanitized;
}

function sanitizeQuestion(question) {
  if (!question) return question;

  const sanitized = { ...question };

  // Sanitize the main question text
  if (sanitized.question) {
    sanitized.question = sanitizeMathExpression(sanitized.question);
  }

  // Sanitize passage if exists
  if (sanitized.passage) {
    sanitized.passage = sanitizeMathExpression(sanitized.passage);
  }

  // Sanitize answer options
  if (Array.isArray(sanitized.answerOptions)) {
    sanitized.answerOptions = sanitized.answerOptions.map((option) => ({
      ...option,
      text: sanitizeMathExpression(option.text),
      rationale: option.rationale
        ? sanitizeMathExpression(option.rationale)
        : option.rationale,
    }));
  }

  return sanitized;
}

function sanitizeQuizFile(filePath) {
  console.log(`\nProcessing: ${filePath}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    let questionCount = 0;
    let changeCount = 0;

    // Process all categories and topics
    if (data.categories) {
      Object.keys(data.categories).forEach((categoryKey) => {
        const category = data.categories[categoryKey];

        if (category.topics) {
          category.topics.forEach((topic) => {
            if (topic.quizzes) {
              topic.quizzes.forEach((quiz) => {
                if (quiz.questions) {
                  quiz.questions = quiz.questions.map((question) => {
                    questionCount++;
                    const original = JSON.stringify(question);
                    const sanitized = sanitizeQuestion(question);
                    const modified = JSON.stringify(sanitized);

                    if (original !== modified) {
                      changeCount++;
                    }

                    return sanitized;
                  });
                }
              });
            }
          });
        }
      });
    }

    // Write back to file with proper formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    console.log(`✓ Processed ${questionCount} questions`);
    console.log(`✓ Modified ${changeCount} questions`);

    return { questionCount, changeCount };
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return { questionCount: 0, changeCount: 0 };
  }
}

// Main execution
const quizzesDir = path.join(__dirname, 'backend', 'quizzes');
const mathFiles = ['math.quizzes.part1.json', 'math.quizzes.part2.json'];

console.log('='.repeat(60));
console.log('SANITIZING MATH QUIZ FILES');
console.log('='.repeat(60));

let totalQuestions = 0;
let totalChanges = 0;

mathFiles.forEach((filename) => {
  const filePath = path.join(quizzesDir, filename);

  if (fs.existsSync(filePath)) {
    const stats = sanitizeQuizFile(filePath);
    totalQuestions += stats.questionCount;
    totalChanges += stats.changeCount;
  } else {
    console.log(`\n⚠ File not found: ${filename}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`Total questions processed: ${totalQuestions}`);
console.log(`Total questions modified: ${totalChanges}`);
console.log(
  `Success rate: ${
    totalQuestions > 0 ? ((totalChanges / totalQuestions) * 100).toFixed(1) : 0
  }%`
);
console.log('\n✓ Sanitization complete!');
