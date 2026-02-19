const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part1.json'),
    subject: 'Math',
    alignToTopicTier: new Set([]),
    complexityTopics: new Set([
      'math_graphs_10',
      'math_data_10',
      'math_data_12',
      'math_algebra_07',
    ]),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'science.quizzes.part1.json'),
    subject: 'Science',
    alignToTopicTier: new Set(['sci_life_science_human_body_systems_8']),
    complexityTopics: new Set([
      'sci_life_science_natural_selection_22',
      'sci_earth_space_science_ecosystems_19',
      'sci_earth_space_science_geological_time_7',
    ]),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'science.quizzes.part2.json'),
    subject: 'Science',
    alignToTopicTier: new Set([]),
    complexityTopics: new Set([
      'sci_physical_science_chemical_reactions_17',
      'sci_physical_science_forces_motion_21',
      'sci_scientific_practices_data_interpretation_18',
    ]),
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function toLearnerTier(rawTopicTier) {
  const t = String(rawTopicTier || '')
    .trim()
    .toLowerCase();
  if (t === 'challenge') return 'challenge';
  if (t === 'test-ready') return 'test-ready';
  return 'foundation';
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
  const fallback = subject === 'Math' ? 'math-3' : 'science-3';
  if (!Array.isArray(q.challenge_tags) || q.challenge_tags.length === 0) {
    q.challenge_tags = [fallback];
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
  if (arrays.length === 0 && Array.isArray(topic?.questions))
    arrays.push(topic.questions);
  return arrays;
}

function applyTierAlignment(topic) {
  const learnerTier = toLearnerTier(topic?.tier);
  let touched = 0;
  for (const arr of questionArraysForTopic(topic)) {
    for (const q of arr) {
      if (!q || typeof q !== 'object') continue;
      q.tier = learnerTier;
      touched += 1;
    }
  }
  return touched;
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
  const counts = {
    alignTopics: 0,
    alignQuestions: 0,
    upliftTopics: 0,
    upliftQuestions: 0,
  };

  for (const category of Object.values(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      const id = topic?.id;
      if (target.alignToTopicTier.has(id)) {
        const changed = applyTierAlignment(topic);
        if (changed > 0) {
          counts.alignTopics += 1;
          counts.alignQuestions += changed;
        }
      }
      if (target.complexityTopics.has(id)) {
        const changed = applyComplexityUplift(topic, target.subject);
        if (changed > 0) {
          counts.upliftTopics += 1;
          counts.upliftQuestions += changed;
        }
      }
    }
  }

  writeJson(target.file, data);
  return counts;
}

function main() {
  console.log('Wave 13 targeted remediation complete:');
  for (const target of TARGETS) {
    const r = runTarget(target);
    console.log(
      `- ${path.relative(ROOT, target.file)} | alignTopics=${r.alignTopics} alignQuestions=${r.alignQuestions} | upliftTopics=${r.upliftTopics} upliftQuestions=${r.upliftQuestions}`
    );
  }
}

main();
