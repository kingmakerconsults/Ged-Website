const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part2.json'),
    topics: new Set(['math_alg_expressions']),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part1.json'),
    topics: new Set(['math_quant_basics']),
  },
  {
    file: path.join(
      ROOT,
      'public',
      'quizzes',
      'social-studies.quizzes.part2.json'
    ),
    topics: new Set(['ss_us_hist_new_nation']),
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function toLearnerTier(topicTier) {
  const t = String(topicTier || '')
    .trim()
    .toLowerCase();
  if (t === 'challenge') return 'challenge';
  if (t === 'test-ready') return 'test-ready';
  return 'foundation';
}

function alignTopicQuestions(topic) {
  const learnerTier = toLearnerTier(topic?.tier);
  const questionArrays = [];

  if (Array.isArray(topic?.quizzes) && topic.quizzes.length > 0) {
    for (const quiz of topic.quizzes) {
      if (Array.isArray(quiz?.questions)) questionArrays.push(quiz.questions);
    }
  }
  if (questionArrays.length === 0 && Array.isArray(topic?.questions)) {
    questionArrays.push(topic.questions);
  }

  let touched = 0;
  for (const arr of questionArrays) {
    for (const q of arr) {
      if (!q || typeof q !== 'object') continue;
      q.tier = learnerTier;
      touched += 1;
    }
  }

  return touched;
}

function runTarget(target) {
  const data = readJson(target.file);
  const categories = data?.categories || {};
  let topicsTouched = 0;
  let questionsTouched = 0;

  for (const category of Object.values(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      if (!target.topics.has(topic?.id)) continue;
      const changed = alignTopicQuestions(topic);
      if (changed > 0) {
        topicsTouched += 1;
        questionsTouched += changed;
      }
    }
  }

  writeJson(target.file, data);
  return { topicsTouched, questionsTouched };
}

function main() {
  const summary = [];
  for (const target of TARGETS) {
    const result = runTarget(target);
    summary.push({ file: path.relative(ROOT, target.file), ...result });
  }

  console.log('Wave 8 tier-alignment repair complete:');
  for (const row of summary) {
    console.log(
      `- ${row.file} | topics=${row.topicsTouched} | questions=${row.questionsTouched}`
    );
  }
}

main();
