const { test } = require('node:test');
const assert = require('assert');
const path = require('path');
const fs = require('fs');

function mapSubjectKeyToFolder(key) {
  const m = String(key).toLowerCase();
  if (m.includes('scientific') && m.includes('numer')) return 'scientific-numeracy';
  if (m.includes('social') && m.includes('stud')) return 'social-studies';
  if (m.includes('rla')) return 'rla';
  if (m.includes('math')) return 'math';
  if (m.includes('science')) return 'science';
  return 'other';
}

function listTopicTriples(ALL_QUIZZES) {
  const triples = [];
  for (const [subjectKey, subjectVal] of Object.entries(ALL_QUIZZES)) {
    for (const [categoryName, categoryVal] of Object.entries(subjectVal.categories || {})) {
      for (const topic of categoryVal.topics || []) {
        triples.push([subjectKey, categoryName, topic.id]);
      }
    }
  }
  return triples;
}

function totalQuestions(ALL_QUIZZES) {
  let count = 0;
  for (const subject of Object.values(ALL_QUIZZES)) {
    for (const cat of Object.values(subject.categories || {})) {
      for (const topic of cat.topics || []) {
        if (Array.isArray(topic.questions)) count += topic.questions.length;
      }
    }
  }
  return count;
}

test('dynamic quizzes loader preserves structure and counts vs legacy', () => {
  const { ALL_QUIZZES: LEGACY } = require('../data/premade-questions.js');
  const { ALL_QUIZZES: DYNAMIC } = require('../data/quizzes');

  // Structure parity: same set of (subject, category, topic.id)
  const lTriples = listTopicTriples(LEGACY).map((t) => t.join('::')).sort();
  const dTriples = listTopicTriples(DYNAMIC).map((t) => t.join('::')).sort();
  assert.deepStrictEqual(dTriples, lTriples, 'Dynamic loader must expose same subjects/categories/topics');

  // Count parity: total questions equal
  assert.strictEqual(totalQuestions(DYNAMIC), totalQuestions(LEGACY), 'Total question counts should match');
});

test('dynamic quizzes loader uses per-topic files when present', () => {
  const { ALL_QUIZZES: DYNAMIC } = require('../data/quizzes');
  const quizzesRoot = path.resolve(__dirname, '..', 'data', 'quizzes');

  // For any topic that has a corresponding per-topic file, the question lengths should match that file
  for (const [subjectKey, subjectVal] of Object.entries(DYNAMIC)) {
    const subjectFolder = mapSubjectKeyToFolder(subjectKey);
    for (const [_, categoryVal] of Object.entries(subjectVal.categories || {})) {
      for (const topic of categoryVal.topics || []) {
        const topicFile = path.join(quizzesRoot, subjectFolder, `${topic.id}.js`);
        if (fs.existsSync(topicFile)) {
          const arr = require(topicFile);
          if (Array.isArray(arr)) {
            assert.strictEqual(
              topic.questions?.length || 0,
              arr.length,
              `Topic ${topic.id} should reflect per-topic file length`
            );
          }
        }
      }
    }
  }
});
