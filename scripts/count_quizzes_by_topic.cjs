const fs = require('fs');
const path = require('path');

// Source files (same set used previously)
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

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return { __error: e.message };
  }
}

function accumulate(struct, subjectName, fileTag) {
  const subject = subjectName || 'Unknown';
  if (!struct || struct.__error) {
    return {
      subject,
      categories: {},
      errors: struct ? struct.__error : 'Invalid JSON',
    };
  }
  // Single quiz object: treat as one topic in a Misc category
  if (
    struct.questions &&
    Array.isArray(struct.questions) &&
    !struct.categories
  ) {
    return {
      subject,
      categories: {
        Misc: {
          topics: {
            [struct.title || path.basename(fileTag, '.json')]: {
              quizCount: 1,
              questionCount: struct.questions.length,
            },
          },
        },
      },
    };
  }
  const categories = struct.categories || {};
  const out = { subject, categories: {} };
  for (const [catName, catObj] of Object.entries(categories)) {
    if (!catObj || !Array.isArray(catObj.topics)) continue;
    const topicMap = {};
    for (const topic of catObj.topics) {
      if (!topic) continue;
      const tName = topic.title || topic.id || 'Unnamed Topic';
      const quizzes = Array.isArray(topic.quizzes) ? topic.quizzes : [];
      let questionTotal = 0;
      for (const qz of quizzes) {
        if (qz && Array.isArray(qz.questions))
          questionTotal += qz.questions.length;
      }
      topicMap[tName] = {
        quizCount: quizzes.length,
        questionCount: questionTotal,
      };
    }
    out.categories[catName] = { topics: topicMap };
  }
  return out;
}

const subjectsAggregate = {}; // subject -> category -> topic counts
const fileDetails = [];

for (const rel of files) {
  const full = path.join(process.cwd(), rel);
  const data = readJSON(full);
  const subjectName = data.subject;
  const summary = accumulate(data, subjectName, rel);
  fileDetails.push({
    file: rel,
    subject: summary.subject,
    error: summary.errors,
  });
  // Merge into aggregate
  const subjKey = summary.subject;
  subjectsAggregate[subjKey] = subjectsAggregate[subjKey] || {};
  for (const [cat, catData] of Object.entries(summary.categories)) {
    subjectsAggregate[subjKey][cat] = subjectsAggregate[subjKey][cat] || {};
    for (const [topic, tData] of Object.entries(catData.topics)) {
      if (!subjectsAggregate[subjKey][cat][topic]) {
        subjectsAggregate[subjKey][cat][topic] = {
          quizCount: 0,
          questionCount: 0,
        };
      }
      subjectsAggregate[subjKey][cat][topic].quizCount += tData.quizCount;
      subjectsAggregate[subjKey][cat][topic].questionCount +=
        tData.questionCount;
    }
  }
}

// Prepare final structured output
function subjectTotals(subjData) {
  let quizTotal = 0;
  let questionTotal = 0;
  for (const cat of Object.values(subjData)) {
    for (const topic of Object.values(cat)) {
      quizTotal += topic.quizCount;
      questionTotal += topic.questionCount;
    }
  }
  return { quizTotal, questionTotal };
}

const subjects = Object.keys(subjectsAggregate)
  .sort()
  .map((s) => ({
    subject: s,
    ...subjectTotals(subjectsAggregate[s]),
    categories: Object.keys(subjectsAggregate[s])
      .sort()
      .map((c) => ({
        category: c,
        topics: Object.keys(subjectsAggregate[s][c])
          .sort()
          .map((t) => ({
            topic: t,
            quizCount: subjectsAggregate[s][c][t].quizCount,
            questionCount: subjectsAggregate[s][c][t].questionCount,
          })),
      })),
  }));

const grandQuizTotal = subjects.reduce((a, s) => a + s.quizTotal, 0);
const grandQuestionTotal = subjects.reduce((a, s) => a + s.questionTotal, 0);

console.log(
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      grandQuizTotal,
      grandQuestionTotal,
      subjects,
      fileDetails,
    },
    null,
    2
  )
);
