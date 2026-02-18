const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'public', 'quizzes', 'social-studies.extras.json');

function normalizeQuestionTier(value) {
  const t = String(value || '')
    .trim()
    .toLowerCase();
  if (t === 'foundation' || t === 'test-ready' || t === 'challenge') return t;
  if (t === 'foundations' || t === 'core') return 'foundation';
  return null;
}

function inferFromDifficulty(question) {
  const diff = String(question?.difficulty || '')
    .trim()
    .toLowerCase();
  if (diff === 'hard') return 'challenge';
  if (diff === 'medium') return 'test-ready';
  return 'foundation';
}

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  if (!Array.isArray(data)) {
    throw new Error('Expected top-level array in social-studies.extras.json');
  }

  let topicTouched = 0;
  let questionTouched = 0;

  for (const topic of data) {
    if (!topic || typeof topic !== 'object') continue;

    const currentTopicTier = normalizeQuestionTier(topic.tier);
    if (!currentTopicTier) {
      topic.tier = 'foundation';
      topicTouched += 1;
    }

    const questions = Array.isArray(topic.questions) ? topic.questions : [];
    for (const question of questions) {
      if (!question || typeof question !== 'object') continue;
      const current = normalizeQuestionTier(
        question.tier || question.questionTier || question.level
      );
      if (!current) {
        question.tier = inferFromDifficulty(question);
        questionTouched += 1;
      }
    }
  }

  fs.writeFileSync(FILE, JSON.stringify(data), 'utf8');
  console.log(
    `social-studies.extras tier fix complete: topics=${topicTouched}, questions=${questionTouched}`
  );
}

main();
