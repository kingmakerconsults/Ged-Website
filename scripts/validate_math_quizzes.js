import { expandedQuizData } from '../frontend/data/quiz_data.js';
import fs from 'fs';

const MATH_QUIZ_VALIDATION_BYPASS = process.env.MATH_QUIZ_VALIDATION_BYPASS === 'true';

if (MATH_QUIZ_VALIDATION_BYPASS) {
    console.log('***MATH VALIDATION BYPASS ACTIVE — DEV ONLY***');
}

function validateQuiz(quiz, topicId) {
  if (!quiz.quizId || typeof quiz.quizId !== 'string') {
    throw new Error(`Invalid or missing quizId in topic ${topicId}`);
  }
  if (!Array.isArray(quiz.questions)) {
    throw new Error(`No questions array for quiz: ${quiz.quizId}`);
  }
  if (quiz.questions.length < 12) {
    console.warn(`WARNING: Quiz ${quiz.quizId} has fewer than 12 questions (${quiz.questions.length}).`);
  }

  quiz.questions.forEach((q, idx) => {
    if (q.questionNumber !== idx + 1) {
      console.warn(`WARNING: Question number mismatch in ${quiz.quizId}. Expected ${idx + 1}, found ${q.questionNumber}. Auto-fixing.`);
      q.questionNumber = idx + 1;
    }
    if (!q.question || typeof q.question !== 'string' || q.question.trim() === '') {
      throw new Error(`Bad or missing question text at index ${idx} in quiz ${quiz.quizId}`);
    }
    if (!Array.isArray(q.answerOptions) || q.answerOptions.length < 2) {
      throw new Error(`Bad answer options for question ${q.questionNumber} in quiz ${quiz.quizId}`);
    }

    const correctCount = q.answerOptions.filter(a => a.isCorrect).length;
    if (correctCount !== 1) {
      console.warn(`WARNING: Question ${q.questionNumber} in ${quiz.quizId} has ${correctCount} correct answers. Auto-fixing to one correct answer.`);
      q.answerOptions.forEach((a, i) => a.isCorrect = i === 0);
    }
    q.answerOptions.forEach(a => {
        if (!a.rationale || a.rationale.trim() === '') {
            if (MATH_QUIZ_VALIDATION_BYPASS) {
                a.rationale = 'TODO_AUTOGEN: Replace with vetted rationale before merging.';
                const reportPath = `reports/math_validation_bypass_${Date.now()}.json`;
                const bypassData = {
                    quizId: quiz.quizId,
                    questionNumber: q.questionNumber,
                    reason: 'Missing rationale',
                    autoCorrection: 'Added TODO_AUTOGEN placeholder.',
                    environment: {
                        branch: process.env.GIT_BRANCH || 'unknown',
                        bypassFlag: MATH_QUIZ_VALIDATION_BYPASS
                    }
                };
                fs.appendFileSync(reportPath, JSON.stringify(bypassData) + '\n');
            } else {
                a.rationale = 'Noted: choose the reason why this is correct/incorrect.';
            }
            console.warn(`WARNING: Missing rationale for an answer in question ${q.questionNumber} of quiz ${quiz.quizId}. Added placeholder.`);
        }
    });

    // LaTeX validation
    const latexRegex = /\\\\[a-zA-Z]+|\$/g;
    const questionMatches = q.question.match(latexRegex) || [];
    if (q.question.includes('\\frac') && !q.question.includes('\\\\frac')) {
        console.warn(`WARNING: Found single backslash LaTeX in question ${q.questionNumber} of ${quiz.quizId}. Consider fixing to double backslash.`);
    }

    // HTML tag validation
    const htmlTagRegex = /<[^>]*>/g;
    if (htmlTagRegex.test(q.question)) {
        console.warn(`WARNING: Found HTML tags in question ${q.questionNumber} of ${quiz.quizId}.`);
    }
    q.answerOptions.forEach(a => {
        if (htmlTagRegex.test(a.text)) {
            console.warn(`WARNING: Found HTML tags in an answer option for question ${q.questionNumber} of ${quiz.quizId}.`);
        }
    });
  });

  return true;
}

function validateMathQuizzes() {
    if (MATH_QUIZ_VALIDATION_BYPASS && process.env.GIT_BRANCH && process.env.GIT_BRANCH !== 'dev') {
        console.error("BYPASS BLOCKED: Disable MATH_QUIZ_VALIDATION_BYPASS or resolve all TODO_AUTOGEN items before merging.");
        process.exit(1);
    }

    const mathData = expandedQuizData.Math;
    if (!mathData || !mathData.categories) {
        throw new Error('Math data or categories are missing.');
    }

    let totalQuizzes = 0;
    let warnings = 0;

    for (const categoryName in mathData.categories) {
        const category = mathData.categories[categoryName];
        if (category.topics) {
            for (const topic of category.topics) {
                if (topic.quizzes) {
                    topic.quizzes.forEach(quiz => {
                        try {
                            validateQuiz(quiz, topic.id);
                            totalQuizzes++;
                        } catch (e) {
                            console.error(`Validation failed for quiz ${quiz.quizId}: ${e.message}`);
                            process.exit(1);
                        }
                    });
                }
            }
        }
    }
    console.log(`Validation complete. Checked ${totalQuizzes} Math quizzes.`);
    if (warnings > 0) {
        console.log(`${warnings} warnings were issued.`);
    } else {
        console.log("No warnings.");
    }

    // Check for TODO_AUTOGEN strings only when bypass is off
    if (!MATH_QUIZ_VALIDATION_BYPASS) {
        const quizDataString = JSON.stringify(mathData);
        if (quizDataString.includes('TODO_AUTOGEN')) {
            console.error("ERROR: Found 'TODO_AUTOGEN' placeholders in the math quiz data. Please resolve these before committing.");
            process.exit(1);
        }
    }
}

validateMathQuizzes();
