const fs = require('fs');
const path = require('path');

function loadJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function main() {
  const basePath = path.join(__dirname, '..', 'public', 'quizzes', 'social-studies.quizzes.json');
  const extrasPath = path.join(__dirname, '..', 'public', 'quizzes', 'social-studies.extras.json');
  const base = loadJSON(basePath);
  const extras = fs.existsSync(extrasPath) ? loadJSON(extrasPath) : [];

  // Build topic -> set of quizIds, and count
  const topics = new Map();
  const categories = base.categories || {};
  for (const [catName, cat] of Object.entries(categories)) {
    const tList = Array.isArray(cat.topics) ? cat.topics : [];
    for (const t of tList) {
      const key = t.id || t.title || `${catName}:${topics.size+1}`;
      const set = new Set((Array.isArray(t.quizzes) ? t.quizzes : []).map(q => q && (q.quizId || q.id)));
      topics.set(key, set);
    }
  }

  // Merge extras: topic id is q.topic or q.topicId or fallback
  let added = 0;
  extras.forEach((q, i) => {
    const topicId = q.topicId || q.topic || `ss_extra_${i+1}`;
    const qid = q.quizId || q.id || `extra_${i+1}`;
    if (!topics.has(topicId)) topics.set(topicId, new Set());
    const set = topics.get(topicId);
    if (!set.has(qid)) { set.add(qid); added++; }
  });

  let total = 0; for (const s of topics.values()) total += s.size;
  console.log(JSON.stringify({ baseTotal: undefined, mergedTotal: total, extrasAdded: added }, null, 2));
}

main();
