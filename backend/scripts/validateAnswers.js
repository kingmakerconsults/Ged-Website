#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const COLORS = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

function createFallbackMathModule() {
  const allowedWords = ['pi', 'sqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'abs', 'log', 'ln', 'exp', 'min', 'max'];

  function ensureSupportedTokens(expression) {
    const lower = expression.toLowerCase();
    let residual = lower.replace(/[0-9+\-*/().,%π÷×\s]/g, '');
    allowedWords.forEach((word) => {
      residual = residual.split(word).join('');
    });
    if (residual.trim().length > 0) {
      throw new Error('Expression contains unsupported tokens');
    }
  }

  function fallbackEvaluate(input) {
    if (typeof input === 'number') {
      return Number.isFinite(input) ? input : NaN;
    }
    if (typeof input !== 'string') {
      throw new TypeError('Expression must be a string');
    }
    const expr = input.trim();
    if (!expr) {
      throw new Error('Empty expression');
    }
    if (/[^0-9a-zA-Z+\-*/^().,%π÷×\s]/.test(expr)) {
      throw new Error('Expression contains unsupported characters');
    }
    ensureSupportedTokens(expr);

    let transformed = expr
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/\^/g, '**')
      .replace(/π/g, 'Math.PI')
      .replace(/\bpi\b/gi, 'Math.PI');

    const fnMap = {
      sqrt: 'Math.sqrt',
      sin: 'Math.sin',
      cos: 'Math.cos',
      tan: 'Math.tan',
      asin: 'Math.asin',
      acos: 'Math.acos',
      atan: 'Math.atan',
      abs: 'Math.abs',
      log: 'Math.log10',
      ln: 'Math.log',
      exp: 'Math.exp',
      min: 'Math.min',
      max: 'Math.max',
    };

    Object.entries(fnMap).forEach(([name, target]) => {
      const regex = new RegExp(`\\b${name}\\s*\\(`, 'gi');
      transformed = transformed.replace(regex, `${target}(`);
    });

    transformed = transformed.replace(/%/g, '*0.01');

    const fn = new Function('"use strict"; return (' + transformed + ');');
    const result = fn();
    if (typeof result !== 'number' || !Number.isFinite(result)) {
      throw new Error('Expression did not evaluate to a finite number');
    }
    return result;
  }

  return { evaluate: fallbackEvaluate };
}

let math;
try {
  const { create, all } = require('mathjs');
  math = create(all, {});
} catch (err) {
  console.warn(`${COLORS.yellow}mathjs not available (${err.message}). Falling back to built-in evaluator; numeric checks may be less precise.${COLORS.reset}`);
  math = createFallbackMathModule();
}

const SUBJECT_ORDER = ['Math', 'Science', 'RLA', 'Social Studies', 'Unknown'];

const quizzesDir = path.join(__dirname, '..', 'quizzes');

const subjectTotals = new Map();
const issues = [];

function canonicalSubjectName(input) {
  if (!input) return null;
  const value = String(input).toLowerCase();
  if (value.includes('math')) return 'Math';
  if (value.includes('science')) return 'Science';
  if (value.includes('social')) return 'Social Studies';
  if (value.includes('language') || value.includes('rla')) return 'RLA';
  return 'Unknown';
}

function looksNumeric(value) {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /[0-9]/.test(trimmed) || /(pi|π|sqrt|√|tan|sin|cos|log|ln|exp)/i.test(trimmed);
}

function evaluateNumeric(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) return null;
  const sanitized = trimmed.replace(/÷/g, '/').replace(/×/g, '*');
  try {
    const result = math.evaluate(sanitized);
    if (typeof result === 'number' && Number.isFinite(result)) {
      return result;
    }
    if (Array.isArray(result) && result.length === 1 && typeof result[0] === 'number') {
      return result[0];
    }
  } catch (err) {
    return null;
  }
  return null;
}

function normalizeOptions(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'object') {
    return Object.entries(raw).map(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return { ...value, originalKey: key };
      }
      return { value, originalKey: key };
    });
  }
  return [];
}

function collectOptions(question) {
  if (!question || typeof question !== 'object') return [];
  if (question.options) return normalizeOptions(question.options);
  if (question.choices) return normalizeOptions(question.choices);
  if (question.answerOptions) return normalizeOptions(question.answerOptions);
  if (question.answers) return normalizeOptions(question.answers);
  return [];
}

function buildOptionMetadata(options) {
  const tokens = new Set();
  const numericValues = [];
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function addToken(value) {
    if (value === undefined || value === null) return;
    const str = String(value).trim();
    if (!str) return;
    tokens.add(str);
    tokens.add(str.toLowerCase());
    tokens.add(str.toUpperCase());
  }

  options.forEach((option, index) => {
    const letter = LETTERS[index];
    if (letter) addToken(letter);
    addToken(index + 1);

    const maybeRegisterNumeric = (candidate) => {
      if (!looksNumeric(candidate)) return;
      const numeric = evaluateNumeric(candidate);
      if (numeric === null) return;
      numericValues.push({ value: numeric, source: candidate, index });
    };

    const processValue = (val) => {
      if (val === undefined || val === null) return;
      if (typeof val === 'string' || typeof val === 'number') {
        addToken(val);
        maybeRegisterNumeric(val);
      } else if (typeof val === 'object') {
        ['letter', 'label', 'value', 'text', 'option', 'answer', 'id', 'key', 'name'].forEach((prop) => {
          if (val[prop] !== undefined) {
            processValue(val[prop]);
          }
        });
      }
    };

    if (option && typeof option === 'object' && !Array.isArray(option)) {
      if (option.originalKey !== undefined) {
        addToken(option.originalKey);
        maybeRegisterNumeric(option.originalKey);
      }
      processValue(option);
    } else {
      processValue(option);
    }
  });

  return { tokens, numericValues };
}

function recordIssue(context, questionNumber, reason) {
  const subjectName = canonicalSubjectName(context.subject) || context.fileSubject || 'Unknown';
  const parts = [];
  if (context.quizId) {
    parts.push(context.quizId);
  } else if (context.quizTitle) {
    parts.push(context.quizTitle);
  } else if (context.topicTitle) {
    parts.push(context.topicTitle);
  } else if (context.topicId) {
    parts.push(context.topicId);
  }
  const base = parts.length ? parts.join(' / ') : context.fileName || 'Unknown quiz';
  const label = questionNumber !== undefined && questionNumber !== null ? `${base} Q#${questionNumber}` : base;
  issues.push({ subject: subjectName, label, reason });
}

function processQuestions(questions, context) {
  if (!Array.isArray(questions) || questions.length === 0) return;

  const subjectName = canonicalSubjectName(context.subject) || context.fileSubject || 'Unknown';

  questions.forEach((question, index) => {
    const questionNumber = question?.questionNumber ?? question?.number ?? question?.id ?? index + 1;
    const answerValue = question?.answer;
    const options = collectOptions(question);

    subjectTotals.set(subjectName, (subjectTotals.get(subjectName) || 0) + 1);

    if (!options || options.length === 0) {
      recordIssue(context, questionNumber, 'no options provided');
      return;
    }

    if (answerValue === undefined || answerValue === null || (typeof answerValue === 'string' && !answerValue.trim())) {
      recordIssue(context, questionNumber, 'missing answer field');
      return;
    }

    const normalizedAnswer = typeof answerValue === 'string' ? answerValue.trim() : String(answerValue);

    const { tokens, numericValues } = buildOptionMetadata(options);
    const answerMatchesToken = tokens.has(normalizedAnswer) || tokens.has(normalizedAnswer.toLowerCase()) || tokens.has(normalizedAnswer.toUpperCase());

    let numericMatch = false;
    if (subjectName === 'Math' && looksNumeric(answerValue)) {
      const numeric = evaluateNumeric(answerValue);
      if (numeric !== null && numericValues.length > 0) {
        numericMatch = numericValues.some((entry) => Math.abs(entry.value - numeric) <= 0.01);
      }
    }

    if (!answerMatchesToken && !numericMatch) {
      let reason = `stored answer “${normalizedAnswer}” not found in options`;
      if (subjectName === 'Math' && looksNumeric(answerValue)) {
        const numeric = evaluateNumeric(answerValue);
        if (numeric !== null) {
          if (numericValues.length === 0) {
            reason = `numeric answer “${normalizedAnswer}” but options contain no numeric values to compare`;
          } else {
            reason = `numeric answer “${normalizedAnswer}” does not match any option within tolerance`;
          }
        }
      }
      recordIssue(context, questionNumber, reason);
    }
  });
}

function walkForQuestions(node, context) {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach((item) => walkForQuestions(item, context));
    return;
  }
  if (typeof node !== 'object') return;

  const nextContext = { ...context };

  if (typeof node.subject === 'string') {
    nextContext.subject = canonicalSubjectName(node.subject) || nextContext.subject;
  }
  if (typeof node.category === 'string') {
    nextContext.categoryName = node.category;
  }
  if (typeof node.topicId === 'string') {
    nextContext.topicId = node.topicId;
  }
  if (typeof node.topic === 'string' && !nextContext.topicTitle) {
    nextContext.topicTitle = node.topic;
  }
  if (typeof node.id === 'string') {
    if (!nextContext.quizId && Array.isArray(node.questions)) {
      nextContext.quizId = node.id;
    }
    if (!nextContext.topicId) {
      nextContext.topicId = node.id;
    }
  }
  if (typeof node.title === 'string') {
    if (Array.isArray(node.questions) && !nextContext.quizTitle) {
      nextContext.quizTitle = node.title;
    } else if (!nextContext.topicTitle) {
      nextContext.topicTitle = node.title;
    }
  }
  if (typeof node.label === 'string' && Array.isArray(node.questions) && !nextContext.quizTitle) {
    nextContext.quizTitle = node.label;
  }
  if (typeof node.quizId === 'string') {
    nextContext.quizId = node.quizId;
  }
  if (typeof node.quizTitle === 'string') {
    nextContext.quizTitle = node.quizTitle;
  }

  if (Array.isArray(node.questions)) {
    processQuestions(node.questions, nextContext);
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === 'questions') continue;
    if (!value || typeof value !== 'object') continue;
    walkForQuestions(value, nextContext);
  }
}

function main() {
  let files;
  try {
    files = fs.readdirSync(quizzesDir).filter((name) => name.endsWith('.json'));
  } catch (err) {
    console.error(`${COLORS.red}Failed to read quizzes directory: ${err.message}${COLORS.reset}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn(`${COLORS.yellow}No quiz JSON files found in ${quizzesDir}.${COLORS.reset}`);
    return;
  }

  files.sort();

  files.forEach((file) => {
    const filePath = path.join(quizzesDir, file);
    let data;
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(raw);
    } catch (err) {
      console.error(`${COLORS.red}Failed to parse ${file}: ${err.message}${COLORS.reset}`);
      issues.push({ subject: 'Unknown', label: `${file}`, reason: 'invalid JSON structure' });
      return;
    }

    const fileSubject = canonicalSubjectName(data?.subject) || canonicalSubjectName(file);
    const context = {
      fileName: file,
      fileSubject,
      subject: canonicalSubjectName(data?.subject) || fileSubject,
    };
    walkForQuestions(data, context);
  });

  SUBJECT_ORDER.forEach((subject) => {
    const count = subjectTotals.get(subject) || 0;
    if (subject === 'Unknown') {
      if (count > 0) {
        console.log(`${COLORS.green}✅ ${subject}: ${count} questions verified${COLORS.reset}`);
      }
    } else {
      console.log(`${COLORS.green}✅ ${subject}: ${count} questions verified${COLORS.reset}`);
    }
  });

  if (issues.length > 0) {
    const totalIssues = issues.length;
    console.log(`${COLORS.yellow}⚠️  ${totalIssues} questions with mismatched or missing answers${COLORS.reset}`);
    issues.forEach((issue) => {
      console.log(`${COLORS.red}❌ ${issue.label} → ${issue.reason}${COLORS.reset}`);
    });
    process.exitCode = 1;
  } else {
    if (subjectTotals.size === 0) {
      console.log(`${COLORS.yellow}No questions found to validate.${COLORS.reset}`);
    } else {
      console.log(`${COLORS.green}All quiz answers validated successfully.${COLORS.reset}`);
    }
  }
}

main();
