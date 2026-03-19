const { upgradeToKatex } = require('./mathSanitizer');
const { normalizeProse } = require('./normalizeProse');
const { normalizeLatex } = require('../../utils/normalizeLatex');

const CONTENT_TEXT_KEYS = new Set([
  'questionText',
  'question',
  'prompt',
  'stem',
  'passage',
  'rationale',
  'explanation',
  'correctAnswer',
  'text',
  'content',
  'instruction',
  'instructions',
]);

const SKIP_TEXT_KEYS = new Set([
  'src',
  'image',
  'imageUrl',
  'imageURL',
  'path',
  'filePath',
  'url',
  'fingerprint',
  'createdAt',
  'sourceModel',
]);

function protectCurrency(text) {
  const tokens = [];
  const protectedText = text.replace(
    /(?<!\\)\$\d[\d,]*(?:\.\d{1,2})?/g,
    (match) => {
      const token = `__MATH_CURRENCY_${tokens.length}__`;
      tokens.push(match);
      return token;
    }
  );

  return { protectedText, tokens };
}

function restoreCurrency(text, tokens) {
  let restored = text;
  tokens.forEach((value, index) => {
    restored = restored.replace(`__MATH_CURRENCY_${index}__`, value);
  });
  return restored;
}

function sanitizeMathText(text) {
  if (typeof text !== 'string') return text;

  const prose = normalizeProse(text);
  const { protectedText, tokens } = protectCurrency(prose);

  let cleaned = normalizeLatex(protectedText);
  cleaned = cleaned
    .replace(/[−–]/g, '-')
    .replace(/\\\*/g, '*')
    .replace(/√\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, 'sqrt($1)')
    .replace(/√\s*([A-Za-z0-9]+)/g, 'sqrt($1)')
    .replace(/\\sqrt\s*\{([^{}]+)\}/g, 'sqrt($1)')
    .replace(/(?<!\\)sqrt\s*\{([^{}]+)\}/g, 'sqrt($1)')
    .replace(/\\[()\[\]]/g, '');

  cleaned = restoreCurrency(cleaned, tokens);
  return upgradeToKatex(cleaned);
}

function sanitizeMathContent(value, keyName = '') {
  if (typeof value === 'string') {
    if (SKIP_TEXT_KEYS.has(keyName)) return value;
    return CONTENT_TEXT_KEYS.has(keyName) ? sanitizeMathText(value) : value;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => sanitizeMathContent(entry, keyName));
  }

  if (value && typeof value === 'object') {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = sanitizeMathContent(entry, key);
    }
    return next;
  }

  return value;
}

function sanitizeMathQuestion(question) {
  if (!question || typeof question !== 'object') return question;
  return sanitizeMathContent(question);
}

function sanitizeMathQuestionList(questions) {
  if (!Array.isArray(questions)) return questions;
  return questions.map((question) => sanitizeMathQuestion(question));
}

function sanitizeSubjectQuestion(question, subject) {
  return String(subject || '').trim() === 'Math'
    ? sanitizeMathQuestion(question)
    : question;
}

function sanitizeMathQuiz(topicOrQuiz) {
  if (!topicOrQuiz || typeof topicOrQuiz !== 'object') return topicOrQuiz;

  const sanitized = { ...topicOrQuiz };

  if (Array.isArray(topicOrQuiz.questions)) {
    sanitized.questions = sanitizeMathQuestionList(topicOrQuiz.questions);
  }

  if (Array.isArray(topicOrQuiz.quizzes)) {
    sanitized.quizzes = topicOrQuiz.quizzes.map((quiz) => {
      if (!quiz || typeof quiz !== 'object') return quiz;
      const nextQuiz = { ...quiz };
      if (Array.isArray(quiz.questions)) {
        nextQuiz.questions = sanitizeMathQuestionList(quiz.questions);
      }
      return nextQuiz;
    });
  }

  return sanitized;
}

function sanitizeMathSubjectCatalog(subjectData) {
  if (!subjectData || typeof subjectData !== 'object') return subjectData;
  if (!subjectData.categories || typeof subjectData.categories !== 'object') {
    return subjectData;
  }

  const categories = {};
  for (const [categoryName, category] of Object.entries(
    subjectData.categories
  )) {
    if (!category || typeof category !== 'object') {
      categories[categoryName] = category;
      continue;
    }

    categories[categoryName] = {
      ...category,
      topics: Array.isArray(category.topics)
        ? category.topics.map((topic) => sanitizeMathQuiz(topic))
        : category.topics,
    };
  }

  return {
    ...subjectData,
    categories,
  };
}

function sanitizeMathCatalog(allQuizzes) {
  if (!allQuizzes || typeof allQuizzes !== 'object' || !allQuizzes.Math) {
    return allQuizzes;
  }

  return {
    ...allQuizzes,
    Math: sanitizeMathSubjectCatalog(allQuizzes.Math),
  };
}

module.exports = {
  sanitizeMathCatalog,
  sanitizeMathContent,
  sanitizeMathQuestion,
  sanitizeMathQuestionList,
  sanitizeMathQuiz,
  sanitizeMathSubjectCatalog,
  sanitizeSubjectQuestion,
  sanitizeMathText,
};
