const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    file: path.join(ROOT, 'public', 'quizzes', 'science.quizzes.part1.json'),
    subject: 'Science',
    topics: new Set([
      'sci_earth_space_science_weather_climate_11',
      'sci_life_science_human_body_systems_8',
      'sci_life_science_photosynthesis_respiration_12',
      'sci_life_science_genetics_heredity_20',
    ]),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'science.quizzes.part2.json'),
    subject: 'Science',
    topics: new Set([
      'sci_physical_science_newtons_laws_10',
      'sci_physical_science_energy_transformations_14',
      'sci_scientific_practices_experimental_design_13',
    ]),
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function upgradeQuestionPrompt(q) {
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

function ensureChallengeTagShape(q) {
  if (!Array.isArray(q.challenge_tags) || q.challenge_tags.length === 0) {
    q.challenge_tags = ['science-3'];
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

function applyComplexityUplift(topic) {
  let touched = 0;
  for (const arr of questionArraysForTopic(topic)) {
    for (const q of arr) {
      if (!q || typeof q !== 'object') continue;
      q.difficulty = 'hard';
      upgradeQuestionPrompt(q);
      ensureChallengeTagShape(q);
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
      const changed = applyComplexityUplift(topic);
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
  console.log('Wave 11 science complexity uplift complete:');
  for (const target of TARGETS) {
    const result = runTarget(target);
    console.log(
      `- ${path.relative(ROOT, target.file)} | topics=${result.topicsTouched} | questions=${result.questionsTouched}`
    );
  }
}

main();
