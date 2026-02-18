const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part2.json'),
    subject: 'Math',
    alignFoundationTopics: new Set(['math_geom_basics']),
    complexityTopics: new Set([
      'math_geometry_07',
      'math_number_sense_09',
      'math_ratios_11',
    ]),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part1.json'),
    subject: 'Math',
    alignFoundationTopics: new Set([]),
    complexityTopics: new Set(['math_graphs_07', 'math_data_11']),
  },
  {
    file: path.join(
      ROOT,
      'public',
      'quizzes',
      'social-studies.quizzes.part2.json'
    ),
    subject: 'Social Studies',
    alignFoundationTopics: new Set(['ss_civics_citizen_rights_7']),
    complexityTopics: new Set([
      'ss_us_hist_contemporary_america_quiz3',
      'ss_civil_war_11',
      'ss_civics_lawmaking_10',
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

function applyFoundationAlignment(topic) {
  let touched = 0;
  for (const arr of questionArraysForTopic(topic)) {
    for (const q of arr) {
      if (!q || typeof q !== 'object') continue;
      q.tier = 'foundation';
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
    alignedTopics: 0,
    alignedQuestions: 0,
    upliftTopics: 0,
    upliftQuestions: 0,
  };

  for (const category of Object.values(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      const id = topic?.id;
      if (target.alignFoundationTopics.has(id)) {
        const changed = applyFoundationAlignment(topic);
        if (changed > 0) {
          counts.alignedTopics += 1;
          counts.alignedQuestions += changed;
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
  console.log('Wave 10 targeted remediation complete:');
  for (const target of TARGETS) {
    const result = runTarget(target);
    console.log(
      `- ${path.relative(ROOT, target.file)} | alignTopics=${result.alignedTopics} alignQuestions=${result.alignedQuestions} | upliftTopics=${result.upliftTopics} upliftQuestions=${result.upliftQuestions}`
    );
  }
}

main();
