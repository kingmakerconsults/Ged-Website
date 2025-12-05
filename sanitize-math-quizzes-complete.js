import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * COMPREHENSIVE Math Quiz Sanitization
 * Handles ALL exponents formats:
 * - Plain exponents: 3^2 -> 3^{2}
 * - Variable exponents: x^2 -> x^{2}, 4x^2 -> 4x^{2}
 * - Complex exponents: (x+1)^2 -> (x+1)^{2}
 * - LaTeX inline: $^2$ -> $^{2}$
 * - Scientific notation: 10^2 -> 10^{2}
 */

function sanitizeMathExpression(text) {
  if (typeof text !== 'string') return text;

  let sanitized = text;

  // PASS 1: Fix LaTeX inline math exponents: $^2$ -> $^{2}$
  sanitized = sanitized.replace(/\$\^([0-9]+)\$/g, '$^{$1}$');

  // PASS 2: Main fix - match anything ending with digit/letter/), possibly with space, then ^, then digits
  // Use a broader pattern that works backwards from the exponent
  // This matches: NUMBER/LETTER/), optional whitespace, ^, digits (not in braces)
  sanitized = sanitized.replace(
    /([0-9a-zA-Z])\s*\^\s*([0-9]+)(?![}\d])/g,
    '$1^{$2}'
  );

  // Also handle closing parenthesis: )\^n
  sanitized = sanitized.replace(/(\))\s*\^\s*([0-9]+)(?![}])/g, '$1^{$2}');

  // PASS 3: Fix multiplication signs
  sanitized = sanitized.replace(/(\d)\s*\*\s*([a-zA-Z0-9])/g, '$1 × $2');
  sanitized = sanitized.replace(/([a-zA-Z0-9])\s*\*\s*(\d)/g, '$1 × $2');

  return sanitized;
}

function sanitizeQuestion(question) {
  if (!question) return question;

  // Apply sanitization to all string fields
  if (typeof question === 'string') {
    const result = sanitizeMathExpression(question);
    if (result !== question) {
      // console.log(`  Fixed: ${question.substring(0, 50)} -> ${result.substring(0, 50)}`);
    }
    return result;
  }

  if (typeof question === 'object' && question !== null) {
    const sanitized = {};
    let hasChanges = false;

    for (const [key, value] of Object.entries(question)) {
      if (typeof value === 'string') {
        const newVal = sanitizeMathExpression(value);
        sanitized[key] = newVal;
        if (newVal !== value) hasChanges = true;
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map((item) => {
          if (typeof item === 'string') {
            const newVal = sanitizeMathExpression(item);
            if (newVal !== item) hasChanges = true;
            return newVal;
          } else {
            const newItem = sanitizeQuestion(item);
            if (JSON.stringify(newItem) !== JSON.stringify(item))
              hasChanges = true;
            return newItem;
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        const newVal = sanitizeQuestion(value);
        sanitized[key] = newVal;
        if (JSON.stringify(newVal) !== JSON.stringify(value)) hasChanges = true;
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  return question;
}

function processQuizFile(filePath) {
  console.log(`\n📚 Processing: ${path.basename(filePath)}`);
  console.log('='.repeat(60));

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    let totalQuestions = 0;
    let modifiedQuestions = 0;

    // Navigate nested structure: categories > topics > quizzes > questions
    if (data.categories && typeof data.categories === 'object') {
      for (const categoryKey in data.categories) {
        const category = data.categories[categoryKey];

        if (Array.isArray(category.topics)) {
          for (const topic of category.topics) {
            if (Array.isArray(topic.quizzes)) {
              for (const quiz of topic.quizzes) {
                if (Array.isArray(quiz.questions)) {
                  for (let i = 0; i < quiz.questions.length; i++) {
                    const original = JSON.stringify(quiz.questions[i]);
                    quiz.questions[i] = sanitizeQuestion(quiz.questions[i]);
                    const modified = JSON.stringify(quiz.questions[i]);

                    if (original !== modified) {
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

    // Write back to file with formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    const modifyPercent =
      totalQuestions > 0
        ? ((modifiedQuestions / totalQuestions) * 100).toFixed(1)
        : '0.0';
    console.log(`✅ Processed: ${totalQuestions} questions`);
    console.log(`✏️  Modified: ${modifiedQuestions} (${modifyPercent}%)`);
    console.log(`📁 Saved: ${filePath}`);

    return { totalQuestions, modifiedQuestions };
  } catch (error) {
    console.error(
      `❌ Error processing ${path.basename(filePath)}:`,
      error.message
    );
    return { totalQuestions: 0, modifiedQuestions: 0, error: true };
  }
}

// Main execution
async function main() {
  console.log('\n🔧 COMPREHENSIVE MATH QUIZ SANITIZATION');
  console.log('='.repeat(60));

  const quizDir = path.join(__dirname, 'backend', 'quizzes');
  const mathQuizFiles = [
    'math.quizzes.part1.json',
    'math.quizzes.part2.json',
    'math.quizzes.part3.json',
  ];

  let totalStats = { questions: 0, modified: 0, errors: 0 };

  for (const file of mathQuizFiles) {
    const filePath = path.join(quizDir, file);
    if (fs.existsSync(filePath)) {
      const stats = processQuizFile(filePath);
      if (!stats.error) {
        totalStats.questions += stats.totalQuestions;
        totalStats.modified += stats.modifiedQuestions;
      } else {
        totalStats.errors++;
      }
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 TOTAL SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Questions: ${totalStats.questions}`);
  console.log(`Total Modified: ${totalStats.modified}`);
  console.log(
    `Modification Rate: ${(
      (totalStats.modified / totalStats.questions) *
      100
    ).toFixed(1)}%`
  );
  console.log(`Processing Errors: ${totalStats.errors}`);
  console.log('\n✨ Sanitization complete!\n');
}

main().catch(console.error);
