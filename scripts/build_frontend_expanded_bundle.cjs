// Build a frontend-consumable bundle from backend supplemental topics
// Outputs: frontend/Expanded/expanded.quizzes.bundle.js defining window.ExpandedQuizData
const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const supplementalPath = path.join(workspaceRoot, 'backend', 'data', 'quizzes', 'supplemental.topics.json');
const quizzesRoot = path.join(workspaceRoot, 'backend', 'data', 'quizzes');
const outDir = path.join(workspaceRoot, 'frontend', 'Expanded');
const outFile = path.join(outDir, 'expanded.quizzes.bundle.js');

function loadQuestions(subjectFolder, topicId) {
  const p = path.join(quizzesRoot, subjectFolder, `${topicId}.js`);
  if (!fs.existsSync(p)) return [];
  try { return require(p); } catch (e) { return []; }
}

function setNested(obj, keys, init) {
  let cur = obj;
  for (const k of keys) {
    if (!cur[k]) cur[k] = typeof init === 'function' ? init() : (init || {});
    cur = cur[k];
  }
  return cur;
}

function main() {
  if (!fs.existsSync(supplementalPath)) {
    console.error('No supplemental topics found. Run npm run quizzes:import-expanded first.');
    process.exit(1);
  }

  const entries = JSON.parse(fs.readFileSync(supplementalPath, 'utf8'));
  const data = {};

  for (const entry of entries) {
    if (!entry || !entry.subjectKey || !entry.categoryName || !entry.topic) continue;
    const subjectKey = entry.subjectKey;
    const categoryName = entry.categoryName;
    const questions = loadQuestions(entry.subjectFolder || '', entry.topic.id);
    if (!Array.isArray(questions) || questions.length === 0) continue;

    // Create containers
    if (!data[subjectKey]) data[subjectKey] = { icon: null, categories: {} };
    const subj = data[subjectKey];
    if (!subj.categories[categoryName]) subj.categories[categoryName] = { description: '', topics: [] };
    const cat = subj.categories[categoryName];

    // Push topic
    cat.topics.push({
      id: entry.topic.id,
      title: entry.topic.title || entry.topic.id,
      description: entry.topic.description || '',
      questions,
    });
  }

  // Write bundle
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const banner = '// Generated from backend supplemental topics. Do not edit by hand.\n';
  const payload = `window.ExpandedQuizData = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(outFile, banner + payload);
  console.log(`Wrote ${path.relative(workspaceRoot, outFile).replace(/\\\\/g, '/')}`);
}

main();
