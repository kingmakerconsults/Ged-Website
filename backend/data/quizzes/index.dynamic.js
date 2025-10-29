// Dynamic loader that preserves the legacy ALL_QUIZZES shape while
// replacing topic.questions from per-topic files when available.
// This keeps categories/config/id/title unchanged and only swaps question arrays.

const path = require('path');
const fs = require('fs');

// Load legacy source of truth for structure (ids, titles, descriptions, configs)
const { ALL_QUIZZES: LEGACY_ALL_QUIZZES } = require('../premade-questions.js');

function mapSubjectKeyToFolder(key) {
  const m = String(key).toLowerCase();
  if (m.includes('scientific') && m.includes('numer')) return 'scientific-numeracy';
  if (m.includes('social') && m.includes('stud')) return 'social-studies';
  if (m.includes('rla')) return 'rla';
  if (m.includes('math')) return 'math';
  if (m.includes('science')) return 'science';
  return 'other';
}

function tryLoadQuestions(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const arr = require(filePath);
      if (Array.isArray(arr)) return arr;
    }
  } catch (_) { /* ignore */ }
  return null;
}

function buildAllQuizzes() {
  // Deep-ish copy to avoid mutating the legacy object by reference
  const out = {};
  const quizzesRoot = __dirname; // backend/data/quizzes

  for (const [subjectKey, subjectVal] of Object.entries(LEGACY_ALL_QUIZZES)) {
    const subjectFolder = mapSubjectKeyToFolder(subjectKey);
    const subjectOut = { icon: subjectVal.icon, categories: {} };

    for (const [categoryName, categoryVal] of Object.entries(subjectVal.categories || {})) {
      const catOut = { description: categoryVal.description, topics: [] };
      for (const topic of categoryVal.topics || []) {
        const topicId = topic.id;
        const topicFile = path.join(quizzesRoot, subjectFolder, `${topicId}.js`);
        const replacement = tryLoadQuestions(topicFile);
        const mergedTopic = {
          ...topic,
          questions: Array.isArray(replacement) ? replacement : (topic.questions || []),
        };
        catOut.topics.push(mergedTopic);
      }
      subjectOut.categories[categoryName] = catOut;
    }
    out[subjectKey] = subjectOut;
  }

  return out;
}

const ALL_QUIZZES = buildAllQuizzes();

module.exports = { ALL_QUIZZES };
