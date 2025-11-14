const fs = require('fs');
const path = require('path');

// List of quiz source files (avoid public duplicates to prevent double counting)
const files = [
  'backend/quizzes/math.quizzes.part1.json',
  'backend/quizzes/math.quizzes.part2.json',
  'backend/quizzes/rla.quizzes.part1.json',
  'backend/quizzes/rla.quizzes.part2.json',
  'backend/quizzes/science.quizzes.part1.json',
  'backend/quizzes/science.quizzes.part2.json',
  'backend/quizzes/social-studies.quizzes.json',
  'backend/quizzes/social-studies.extras.json',
  'backend/quizzes/workforce.quizzes.json',
  'data/quizzes/us_history_revolution_causes_quiz.json',
];

function safeReadJSON(fullPath) {
  try {
    const txt = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    return { __error: e.message };
  }
}

function countFromStructured(json) {
  let count = 0;
  if (!json || typeof json !== 'object') return 0;
  if (Array.isArray(json)) {
    // If the file is an array of quiz objects
    for (const item of json) {
      if (item && item.questions) count += 1;
    }
    return count;
  }
  // Single quiz object format
  if (json.questions && Array.isArray(json.questions)) {
    return 1;
  }
  // Category/topic/quiz hierarchical format
  const categories = json.categories;
  if (categories && typeof categories === 'object') {
    for (const category of Object.values(categories)) {
      if (!category || !Array.isArray(category.topics)) continue;
      for (const topic of category.topics) {
        if (topic && Array.isArray(topic.quizzes)) {
          count += topic.quizzes.length;
        }
      }
    }
  }
  return count;
}

const aggregate = {};
const details = [];

for (const rel of files) {
  const full = path.join(process.cwd(), rel);
  const data = safeReadJSON(full);
  if (data.__error) {
    details.push({ file: rel, error: data.__error });
    continue;
  }
  let subject = data.subject || 'Unknown';
  const count = countFromStructured(data);
  aggregate[subject] = (aggregate[subject] || 0) + count;
  details.push({ file: rel, subject, count });
}

// Sort subjects for stable output
const sortedSubjects = Object.keys(aggregate).sort();

const summary = {
  generatedAt: new Date().toISOString(),
  subjects: sortedSubjects.map((s) => ({
    subject: s,
    quizCount: aggregate[s],
  })),
  totalQuizzes: sortedSubjects.reduce((a, s) => a + aggregate[s], 0),
  fileBreakdown: details,
};

console.log(JSON.stringify(summary, null, 2));
