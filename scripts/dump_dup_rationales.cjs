// List remaining duplicate-rationale items: full per-question dump so we can
// hand-edit each one with a unique rationale.
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

const out = [];
for (const q of r.questions) {
  if (!q.issues.some((i) => i.code === 'duplicate-rationales')) continue;
  const e = allEntries.find(
    (x) =>
      x.context.subject === q.subject &&
      x.context.topicId === q.topicId &&
      (x.question?.questionNumber || 0) === q.questionNumber
  );
  if (!e) continue;
  const opts = e.question?.answerOptions || e.question?.choices || [];
  const dups = {};
  for (const o of opts) {
    const k = String(o?.rationale || '').trim();
    if (!k) continue;
    (dups[k] = dups[k] || []).push(o);
  }
  const dupGroups = Object.entries(dups).filter(([, g]) => g.length > 1);
  if (!dupGroups.length) continue;

  const fp = e.context.filePath || e.context.filepath || e.context.file || '';
  out.push({
    file: fp ? path.relative(path.join(__dirname, '..'), fp) : '(unknown)',
    subject: q.subject,
    topicId: q.topicId,
    questionNumber: q.questionNumber,
    questionText: e.question?.question || e.question?.questionText || '',
    options: opts.map((o) => ({
      text: o?.text || o?.label || '',
      rationale: o?.rationale || '',
      isCorrect: !!o?.isCorrect,
    })),
    duplicateRationales: dupGroups.map(([t, g]) => ({
      rationale: t,
      count: g.length,
    })),
  });
}

const outPath = path.join(reportsDir, 'dup_rationales_remaining.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} items to ${outPath}`);

// Group by file
const byFile = {};
for (const item of out) {
  (byFile[item.file] = byFile[item.file] || []).push(item.questionNumber);
}
console.log('\nBy file:');
for (const [f, qs] of Object.entries(byFile).sort()) {
  console.log(`  ${f}: ${qs.join(', ')}`);
}
