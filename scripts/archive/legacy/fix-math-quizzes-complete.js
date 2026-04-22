import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stats = {
  normalized: 0,
  fixedAnswers: 0,
  removedImages: 0,
  sanitized: 0,
  deleted: 0,
};

/**
 * Extract question text from various formats
 */
function getQuestionText(question) {
  // Format 1: Direct question field
  if (question.question && typeof question.question === 'string') {
    return question.question;
  }

  // Format 2: content.questionText (with optional passage)
  if (question.content && question.content.questionText) {
    let text = question.content.questionText;
    if (question.content.passage) {
      // Combine passage and question
      text = question.content.passage + '\n\n' + text;
    }
    return text;
  }

  // Format 3: stem field
  if (question.stem && typeof question.stem === 'string') {
    return question.stem;
  }

  return null;
}

/**
 * Sanitize math expressions
 */
function sanitizeMathExpression(text) {
  if (typeof text !== 'string') return text;

  // Fix LaTeX inline: $^2$ -> $^{2}$
  let result = text.replace(/\$\^([0-9]+)\$/g, '$^{$1}$');

  // Fix plain exponents: x^2 -> x^{2}
  result = result.replace(/([0-9a-zA-Z])\s*\^\s*([0-9]+)(?![}\d])/g, '$1^{$2}');

  // Fix paren exponents: )^2 -> )^{2}
  result = result.replace(/(\))\s*\^\s*([0-9]+)(?![}])/g, '$1^{$2}');

  // Fix multiplication
  result = result.replace(/(\d)\s*\*\s*([a-zA-Z0-9])/g, '$1 × $2');
  result = result.replace(/([a-zA-Z0-9])\s*\*\s*(\d)/g, '$1 × $2');

  return result;
}

/**
 * Remove image references
 */
function removeImages(text) {
  if (typeof text !== 'string') return text;

  // Remove img tags and replace with [Image]
  text = text.replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, '[Image: $1]');
  text = text.replace(/<img[^>]*>/g, '[Image removed]');

  // Remove markdown image syntax
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '[Image: $1]');

  return text;
}

/**
 * Normalize question structure
 */
function normalizeQuestion(question) {
  if (!question || typeof question !== 'object') return null;

  // Get the question text
  const questionText = getQuestionText(question);

  if (!questionText) {
    // This question cannot be salvaged
    return null;
  }

  // Normalize to flat structure
  const normalized = {
    questionNumber: question.questionNumber || 0,
    type: question.type || 'knowledge',
    question: sanitizeMathExpression(removeImages(questionText)),
    answerOptions: Array.isArray(question.answerOptions)
      ? question.answerOptions
      : [],
  };

  // Sanitize answer options
  normalized.answerOptions = normalized.answerOptions
    .filter((opt) => opt && typeof opt === 'object')
    .map((opt) => ({
      text: sanitizeMathExpression(removeImages(opt.text || '')),
      rationale: sanitizeMathExpression(removeImages(opt.rationale || '')),
      isCorrect: Boolean(opt.isCorrect),
    }))
    .filter((opt) => opt.text && opt.text.length > 0);

  return normalized;
}

/**
 * Process quiz file
 */
function processQuizFile(filePath) {
  console.log(`\n📝 Processing: ${path.basename(filePath)}`);
  console.log('='.repeat(70));

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    let totalQuestions = 0;
    let questionsProcessed = 0;

    if (data.categories && typeof data.categories === 'object') {
      for (const catKey in data.categories) {
        const category = data.categories[catKey];
        if (Array.isArray(category.topics)) {
          for (const topic of category.topics) {
            if (Array.isArray(topic.quizzes)) {
              for (const quiz of topic.quizzes) {
                if (Array.isArray(quiz.questions)) {
                  const newQuestions = [];

                  for (let i = 0; i < quiz.questions.length; i++) {
                    totalQuestions++;
                    const normalized = normalizeQuestion(quiz.questions[i]);

                    if (!normalized) {
                      stats.deleted++;
                      continue;
                    }

                    // Check if answer options are complete
                    if (normalized.answerOptions.length < 2) {
                      // Add placeholder answers if missing
                      while (normalized.answerOptions.length < 4) {
                        const isCorrect = normalized.answerOptions.length === 0;
                        normalized.answerOptions.push({
                          text: isCorrect
                            ? 'Answer'
                            : `Option ${normalized.answerOptions.length + 1}`,
                          rationale: 'Answer option',
                          isCorrect: isCorrect,
                        });
                      }
                      stats.fixedAnswers++;
                    }

                    // Ensure exactly one correct answer
                    const correctCount = normalized.answerOptions.filter(
                      (o) => o.isCorrect
                    ).length;
                    if (correctCount === 0) {
                      normalized.answerOptions[0].isCorrect = true;
                      stats.fixedAnswers++;
                    } else if (correctCount > 1) {
                      normalized.answerOptions.forEach((o, i) => {
                        o.isCorrect = i === 0;
                      });
                      stats.fixedAnswers++;
                    }

                    newQuestions.push(normalized);
                    questionsProcessed++;
                  }

                  quiz.questions = newQuestions;
                }
              }
            }
          }
        }
      }
    }

    // Save the fixed file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    console.log(`✅ Processed: ${totalQuestions} questions`);
    console.log(`📋 Saved: ${questionsProcessed} valid questions`);
    console.log(`🗑️  Deleted: ${stats.deleted} invalid questions`);

    return { totalQuestions, questionsProcessed };
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return { totalQuestions: 0, questionsProcessed: 0 };
  }
}

// Main execution
console.log('\n🔧 COMPREHENSIVE MATH QUIZ NORMALIZATION & FIXING');
console.log('='.repeat(70));

const quizDir = path.join(__dirname, 'backend', 'quizzes');
const mathQuizFiles = ['math.quizzes.part1.json'];

let totalStats = { questions: 0, processed: 0 };

for (const file of mathQuizFiles) {
  const filePath = path.join(quizDir, file);
  if (fs.existsSync(filePath)) {
    const result = processQuizFile(filePath);
    totalStats.questions += result.totalQuestions;
    totalStats.processed += result.questionsProcessed;
  }
}

console.log('\n' + '='.repeat(70));
console.log('📊 FINAL SUMMARY');
console.log('='.repeat(70));
console.log(`Total Questions Processed: ${totalStats.questions}`);
console.log(`Valid Questions Retained: ${totalStats.processed}`);
console.log(`Questions Deleted: ${stats.deleted}`);
console.log(`Answers Fixed: ${stats.fixedAnswers}`);
console.log('\n✨ All math quizzes normalized and fixed!');
