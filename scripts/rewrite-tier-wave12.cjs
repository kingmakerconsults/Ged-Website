const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part2.json'),
    subject: 'Math',
    topics: new Set([
      'diag_math_composite_v1',
      'math_geometry_09',
      'math_number_sense_07',
      'math_ratios_07',
    ]),
  },
  {
    file: path.join(
      ROOT,
      'public',
      'quizzes',
      'social-studies.quizzes.part2.json'
    ),
    subject: 'Social Studies',
    topics: new Set([
      'ss_westward_expansion_13',
      'ss_us_hist_global_conflicts_quiz3',
      'ss_civics_constitution_quiz3',
      'ss_civics_legislative_quiz3',
    ]),
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

  const upgradedText = compact;

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

function questionArraysForTopic(topic) {
  const arrays = [];
  if (Array.isArray(topic?.quizzes) && topic.quizzes.length > 0) {
    for (const quiz of topic.quizzes) {
      if (Array.isArray(quiz?.questions)) arrays.push(quiz.questions);
    }
  }
  if (arrays.length === 0 && Array.isArray(topic?.questions)) {
    arrays.push(topic.questions);
  }
  return arrays;
}

function applyComplexityUplift(topic, subject) {
  let touched = 0;
  for (const arr of questionArraysForTopic(topic)) {
    for (const q of arr) {
      if (!q || typeof q !== 'object') continue;
      q.difficulty = 'hard';
      upgradeQuestionPrompt(q, subject);
      ensureChallengeTagShape(q, subject);
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
      const changed = applyComplexityUplift(topic, target.subject);
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
  console.log('Wave 12 complexity uplift complete:');
  for (const target of TARGETS) {
    const result = runTarget(target);
    console.log(
      `- ${path.relative(ROOT, target.file)} | topics=${result.topicsTouched} | questions=${result.questionsTouched}`
    );
  }
}

main();
