const fs = require('fs');
const path = require('path');

const BANK_DIR = path.join(__dirname, 'ai-question-bank');

const SUBJECT_FILE_NAMES = {
  Math: 'math.accepted.json',
  Science: 'science.accepted.json',
  'Social Studies': 'social-studies.accepted.json',
};

const SUBJECT_ALIASES = new Map([
  ['Math', 'Math'],
  ['Science', 'Science'],
  ['Social Studies', 'Social Studies'],
  ['RLA', 'Reasoning Through Language Arts (RLA)'],
  [
    'Reasoning Through Language Arts (RLA)',
    'Reasoning Through Language Arts (RLA)',
  ],
]);

const cache = new Map();

function loadJsonFile(fileName) {
  if (cache.has(fileName)) {
    return cache.get(fileName);
  }

  const absolutePath = path.join(BANK_DIR, fileName);
  if (!fs.existsSync(absolutePath)) {
    cache.set(fileName, []);
    return [];
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    const value =
      Array.isArray(parsed) || (parsed && typeof parsed === 'object')
        ? parsed
        : [];
    cache.set(fileName, value);
    return value;
  } catch {
    cache.set(fileName, []);
    return [];
  }
}

function canonicalizeCuratedAiSubject(subject) {
  return (
    SUBJECT_ALIASES.get(String(subject || '').trim()) ||
    String(subject || '').trim()
  );
}

function getCuratedAiQuestionsForSubject(subject) {
  const canonicalSubject = canonicalizeCuratedAiSubject(subject);
  if (canonicalSubject === 'Reasoning Through Language Arts (RLA)') {
    return [
      ...getCuratedAiRlaQuestions('part1'),
      ...getCuratedAiRlaQuestions('part3'),
    ];
  }

  const fileName = SUBJECT_FILE_NAMES[canonicalSubject];
  if (!fileName) return [];
  const parsed = loadJsonFile(fileName);
  return Array.isArray(parsed) ? parsed : [];
}

function getCuratedAiRlaQuestions(part) {
  const fileName =
    part === 'part3'
      ? 'rla-language.accepted.json'
      : 'rla-reading.accepted.json';
  const parsed = loadJsonFile(fileName);
  return Array.isArray(parsed) ? parsed : [];
}

function getCuratedAiQuestionBankManifest() {
  const parsed = loadJsonFile('manifest.json');
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
    ? parsed
    : {};
}

module.exports = {
  canonicalizeCuratedAiSubject,
  getCuratedAiQuestionsForSubject,
  getCuratedAiRlaQuestions,
  getCuratedAiQuestionBankManifest,
};
