const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const TARGETS = [
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part1.json'),
    subject: 'Math',
    topics: new Set(['math_data_09', 'math_algebra_10']),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'math.quizzes.part2.json'),
    subject: 'Math',
    topics: new Set(['math_geometry_11', 'math_ratios_10', 'math_geometry_12']),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'rla.quizzes.part1.json'),
    subject: 'RLA',
    topics: new Set(['rla_evidence_10']),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'rla.quizzes.part2.json'),
    subject: 'RLA',
    topics: new Set(['diag_rla_composite_v1']),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'science.quizzes.part1.json'),
    subject: 'Science',
    topics: new Set(['diag_science_composite_v1']),
  },
  {
    file: path.join(ROOT, 'public', 'quizzes', 'science.quizzes.part2.json'),
    subject: 'Science',
    topics: new Set(['sci_scientific_practices_data_reasoning_9']),
  },
  {
    file: path.join(
      ROOT,
      'public',
      'quizzes',
      'social-studies.quizzes.part1.json'
    ),
    subject: 'Social Studies',
    topics: new Set(['ss_economics_geography_8', 'diag_ss_composite_v1']),
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
      'ss_civics_judicial_quiz3',
      'ss_civics_federalism_elections_quiz3',
      'ss_civil_rights_14',
      'ss_colonial_era_12',
      'ss_civics_bill_of_rights_15',
      'ss_civics_elections_17',
      'ss_reading_sources_9',
    ]),
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function promptLeadForSubject(subject) {
  if (subject === 'RLA') return 'GED Reading Challenge:';
  if (subject === 'Social Studies' || subject === 'Science')
    return 'GED Evidence Challenge:';
  return 'GED Challenge Scenario:';
}

function challengeTagFallback(subject) {
  if (subject === 'RLA') return 'rla-3';
  if (subject === 'Science') return 'science-3';
  if (subject === 'Social Studies') return 'social-3';
  return 'math-3';
}

function upgradeQuestionPrompt(q, subject) {
  const original =
    q?.question || q?.prompt || q?.stem || q?.content?.questionText || '';
  const compact = String(original).replace(/\s+/g, ' ').trim();
  if (!compact) return;

  const lead = promptLeadForSubject(subject);
  const upgraded = compact.startsWith(lead) ? compact : `${lead} ${compact}`;

  if (typeof q.question === 'string') {
    q.question = upgraded;
  } else if (q.content && typeof q.content === 'object') {
    q.content.questionText = upgraded;
    if (!q.question && typeof q.content.questionText === 'string') {
      q.question = q.content.questionText;
    }
  } else {
    q.question = upgraded;
  }
}

function ensureChallengeTagShape(q, subject) {
  const fallback = challengeTagFallback(subject);
  if (!Array.isArray(q.challenge_tags) || q.challenge_tags.length === 0) {
    q.challenge_tags = [fallback];
    return;
  }

  q.challenge_tags = q.challenge_tags.map((tag) =>
    String(tag || '')
      .trim()
      .toLowerCase()
      .replace('-', ':')
  );
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
  let topicsTouched = 0;
  let questionsTouched = 0;

  for (const category of Object.values(data?.categories || {})) {
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
  console.log('Wave 16 complexity uplift complete:');
  for (const target of TARGETS) {
    const result = runTarget(target);
    console.log(
      `- ${path.relative(ROOT, target.file)} | topics=${result.topicsTouched} | questions=${result.questionsTouched}`
    );
  }
}

main();
