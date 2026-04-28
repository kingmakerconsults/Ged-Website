// Find duplicate-rationale items and dump the duplicated rationale text + the
// containing question, so we can identify common patterns.
const fs = require('fs');
const path = require('path');
const reportsDir = path.join(__dirname, '..', 'reports');
const files = fs
  .readdirSync(reportsDir)
  .filter((f) => f.startsWith('backend_premade_quality_'))
  .sort();
const r = require(path.join(reportsDir, files[files.length - 1]));

const {
  loadBackendPremadeCatalog,
  enumeratePremadeQuestions,
} = require('../backend/src/lib/premadeQuestionAudit');
const cat = loadBackendPremadeCatalog();
const allEntries = enumeratePremadeQuestions(cat);

const counts = {};
const examples = {};

for (const q of r.questions) {
  if (!q.issues.some((i) => i.code === 'duplicate-rationales')) continue;
  // Find matching catalog entry
  const e = allEntries.find(
    (x) =>
      x.context.subject === q.subject &&
      x.context.topicId === q.topicId &&
      (x.question?.questionNumber || 0) === q.questionNumber
  );
  if (!e) continue;
  const opts = e.question?.answerOptions || e.question?.choices || [];
  // Detect dup pairs
  const byRat = {};
  for (const o of opts) {
    const key = String(o?.rationale || '').trim();
    if (!key) continue;
    (byRat[key] = byRat[key] || []).push(o);
  }
  for (const [text, group] of Object.entries(byRat)) {
    if (group.length < 2) continue;
    counts[text] = (counts[text] || 0) + 1;
    if (!examples[text]) {
      examples[text] = `${q.subject}/${q.topicId} #${q.questionNumber}`;
    }
  }
}

const top = Object.entries(counts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);
console.log('TOP DUPLICATE RATIONALE TEMPLATES:');
for (const [text, n] of top) {
  console.log(`\n[${n}x] ${examples[text]}`);
  console.log('  ' + text.substring(0, 200));
}
