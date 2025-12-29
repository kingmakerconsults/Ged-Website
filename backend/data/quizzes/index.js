// Build ALL_QUIZZES by starting from legacy premade-questions and
// appending any supplemental topics defined by scripts/import_expanded_quizzes.js
// CommonJS module to match server.js require style.
const fs = require('fs');
const path = require('path');
const legacy = require('../premade-questions.js');

function normalizeQuizText(str) {
  if (typeof str !== 'string' || !str) return str;
  return str
    .replace(/\u00C2\u00B2|Â²/g, '²')
    .replace(/\u00C2\u00B3|Â³/g, '³')
    .replace(/\u00C2\u00B0|Â°/g, '°')
    .replace(/Ã·/g, '÷')
    .replace(/Ã—/g, '×')
    .replace(/â‰ˆ/g, '≈')
    .replace(/â‰¤/g, '≤')
    .replace(/â‰¥/g, '≥')
    .replace(/â‰ /g, '≠');
}

function normalizeDeep(value) {
  if (typeof value === 'string') return normalizeQuizText(value);
  if (Array.isArray(value)) return value.map(normalizeDeep);
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      value[key] = normalizeDeep(value[key]);
    }
  }
  return value;
}

function deepClone(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch {
    return obj;
  }
}

function loadSupplemental() {
  const p = path.join(__dirname, 'supplemental.topics.json');
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return [];
  }
}

function ensureSubject(target, subjectKey) {
  if (!target[subjectKey]) {
    // Try to copy icon from similarly named legacy subject
    const legacySubj = legacy.ALL_QUIZZES[subjectKey];
    target[subjectKey] = {
      icon: legacySubj && legacySubj.icon ? legacySubj.icon : null,
      categories: {},
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
  try {
    const loaded = require(p);
    // Many legacy topic files contain mojibake sequences like "Â³".
    // Normalize them here so the frontend renders clean units/symbols.
    return normalizeDeep(loaded);
  } catch (e) {
    return null;
  }
}

function buildAllQuizzes() {
  const target = deepClone(legacy.ALL_QUIZZES);
  const supplemental = loadSupplemental();
  for (const entry of supplemental) {
    if (!entry || !entry.subjectKey || !entry.categoryName || !entry.topic)
      continue;
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
    if (
      topic.config &&
      Array.isArray(topic.config.parts) &&
      topic.config.parts.length > 0
    ) {
      topic.config.parts = topic.config.parts.map((p, i) =>
        i === 0 ? { ...p, questionCount: q.length } : p
      );
    }
    // If a legacy topic with the same id already exists in this category,
    // replace it to avoid duplicate topics and to allow curated/supplemental
    // data to override single-question stubs.
    const existingIdx = Array.isArray(cat.topics)
      ? cat.topics.findIndex((t) => t && t.id === topic.id)
      : -1;
    if (existingIdx >= 0) {
      cat.topics[existingIdx] = topic;
    } else {
      cat.topics.push(topic);
    }
  }
  return target;
}

const ALL_QUIZZES = buildAllQuizzes();

module.exports = { ALL_QUIZZES };
