// Build ALL_QUIZZES by starting from legacy premade-questions and
// appending any supplemental topics defined by scripts/import_expanded_quizzes.js
// CommonJS module to match server.js require style.
const fs = require('fs');
const path = require('path');
const legacy = require('../premade-questions.js');

function deepClone(obj) {
  try { return JSON.parse(JSON.stringify(obj)); } catch { return obj; }
}

function loadSupplemental() {
  const p = path.join(__dirname, 'supplemental.topics.json');
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return []; }
}

function ensureSubject(target, subjectKey) {
  if (!target[subjectKey]) {
    // Try to copy icon from similarly named legacy subject
    const legacySubj = legacy.ALL_QUIZZES[subjectKey];
    target[subjectKey] = {
      icon: legacySubj && legacySubj.icon ? legacySubj.icon : null,
      categories: {}
    };
  }
}

function ensureCategory(targetSubj, categoryName) {
  if (!targetSubj.categories[categoryName]) {
    targetSubj.categories[categoryName] = { description: '', topics: [] };
  }
}

function loadQuestions(subjectFolder, topicId) {
  const p = path.join(__dirname, subjectFolder, `${topicId}.js`);
  if (!fs.existsSync(p)) return null;
  try { return require(p); } catch (e) { return null; }
}

function buildAllQuizzes() {
  const target = deepClone(legacy.ALL_QUIZZES);
  const supplemental = loadSupplemental();
  for (const entry of supplemental) {
    if (!entry || !entry.subjectKey || !entry.categoryName || !entry.topic) continue;
    const subjectKey = entry.subjectKey;
    ensureSubject(target, subjectKey);
    const subj = target[subjectKey];
    const categoryName = entry.categoryName;
    ensureCategory(subj, categoryName);
    const cat = subj.categories[categoryName];
    const q = loadQuestions(entry.subjectFolder || '', entry.topic.id);
    if (!Array.isArray(q) || q.length === 0) continue;
    const config = entry.topic.config || null;
    const topic = {
      id: entry.topic.id,
      title: entry.topic.title || entry.topic.id,
      description: entry.topic.description || '',
      type: entry.topic.type || (config && config.type) || null,
      config: config ? { ...config } : null,
      questions: q,
    };
    // If config has parts, align first part questionCount to actual length
    if (topic.config && Array.isArray(topic.config.parts) && topic.config.parts.length > 0) {
      topic.config.parts = topic.config.parts.map((p, i) => (i === 0 ? { ...p, questionCount: q.length } : p));
    }
    cat.topics.push(topic);
  }
  return target;
}

const ALL_QUIZZES = buildAllQuizzes();

module.exports = { ALL_QUIZZES };
