const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part1.json'),
    topics: new Set(['math_algebra_11', 'math_algebra_12']),
    subject: 'Math',
  },
  {
    file: path.join(
      ROOT,
      'public',
      'quizzes',
      'social-studies.quizzes.part2.json'
    ),
    topics: new Set(['ss_civics_gov_structure_16']),
    subject: 'Social Studies',
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function upgradeQuestionPrompt(q, subject) {
  const original =
    q?.question || q?.prompt || q?.stem || q?.content?.questionText || '';
  const compact = String(original).replace(/\s+/g, ' ').trim();
  if (!compact) return q;

  const lead =
    subject === 'Math' ? 'GED Challenge Scenario:' : 'GED Evidence Challenge:';

  const upgradedText = compact.startsWith(lead)
    ? compact
    : `${lead} ${compact}`;

  if (typeof q.question === 'string') {
    q.question = upgradedText;
  } else if (q.content && typeof q.content === 'object') {
    q.content.questionText = upgradedText;
    if (!q.question && typeof q.content.questionText === 'string') {
      q.question = q.content.questionText;
    }
  } else {
    q.question = upgradedText;
  }

  return q;
}

function ensureChallengeTagShape(q, subject) {
  if (!Array.isArray(q.challenge_tags) || q.challenge_tags.length === 0) {
    q.challenge_tags = [subject === 'Math' ? 'math-3' : 'social-3'];
    return q;
  }
  q.challenge_tags = q.challenge_tags.map((t) =>
    String(t || '')
      .trim()
      .toLowerCase()
      .replace('-', ':')
  );
  return q;
}

function upgradeTopicQuestions(topic, subject) {
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
      q.tier = 'challenge';
      q.difficulty = 'hard';
      upgradeQuestionPrompt(q, subject);
      ensureChallengeTagShape(q, subject);
      touched += 1;
    }
  }

  return touched;
}

function runFileTarget(target) {
  const data = readJson(target.file);
  const categories = data?.categories || {};
  let questionsTouched = 0;
  let topicsTouched = 0;

  for (const category of Object.values(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      if (!target.topics.has(topic?.id)) continue;
      const count = upgradeTopicQuestions(topic, target.subject);
      if (count > 0) {
        topicsTouched += 1;
        questionsTouched += count;
      }
    }
  }

  writeJson(target.file, data);
  return { topicsTouched, questionsTouched };
}

function main() {
  const summary = [];
  for (const target of TARGETS) {
    const result = runFileTarget(target);
    summary.push({
      file: path.relative(ROOT, target.file),
      ...result,
    });
  }

  console.log('Wave 5 tier/complexity uplift complete:');
  for (const row of summary) {
    console.log(
      `- ${row.file} | topics=${row.topicsTouched} | questions=${row.questionsTouched}`
    );
  }
}

main();
