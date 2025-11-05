// Audits Science and Social Studies quizzes for placeholder/autogen content
// Output: reports/audit_science_social_detailed_YYYY-MM-DD.json

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const today = new Date();
const ymd = today.toISOString().slice(0,10);
const outPath = path.join(outDir, `audit_science_social_detailed_${ymd}.json`);

const SUBJECTS = [
  { key: 'science', dir: path.join(root, 'backend', 'data', 'quizzes', 'science') },
  { key: 'social-studies', dir: path.join(root, 'backend', 'data', 'quizzes', 'social-studies') },
];

const PLACEHOLDER_PATTERNS = [
  /__autogen/i,
  /\bCase Study\b/i,
  /\bpractice question\b/i,
  /placeholder/i,
  /\bautogen\b/i,
  /\bdemo\b/i, // avoid matching 'democracy' or 'demonstrates'
  /\btemplate\b/i,
  /Which option best demonstrates/i,
  /Learners explore/i,
  /scenario that highlights/i,
  /does not address the key skill emphasized/i,
];

function isPlaceholderText(str) {
  const s = String(str || '');
  return PLACEHOLDER_PATTERNS.some((re) => re.test(s));
}

function scanQuestion(q) {
  const fields = [];
  if (q && typeof q === 'object') {
    if ('question' in q) fields.push(q.question);
    if ('passage' in q) fields.push(q.passage);
    if (Array.isArray(q.answerOptions)) {
      for (const opt of q.answerOptions) {
        if (opt && typeof opt === 'object') {
          if ('text' in opt) fields.push(opt.text);
          if ('rationale' in opt) fields.push(opt.rationale);
        } else if (typeof opt === 'string') {
          fields.push(opt);
        }
      }
    }
  }
  const hits = [];
  for (const f of fields) {
    if (isPlaceholderText(f)) {
      hits.push(f);
    }
  }
  return hits;
}

function scanFile(absPath) {
  let arr = null;
  try {
    arr = require(absPath);
  } catch (e) {
    return { ok: false, error: e.message, questions: 0, hits: [] };
  }
  if (!Array.isArray(arr)) return { ok: true, questions: 0, hits: [] };
  const hits = [];
  for (const q of arr) {
    const qn = q && typeof q === 'object' ? q.questionNumber : null;
    const qHits = scanQuestion(q);
    if (qHits.length) hits.push({ questionNumber: qn, examples: qHits.slice(0, 2) });
  }
  return { ok: true, questions: arr.length, hits };
}

function main() {
  const report = { date: ymd, summary: {}, files: {} };
  let totalQuestions = 0;
  let totalFiles = 0;
  let totalHits = 0;

  for (const subj of SUBJECTS) {
    const files = fs.readdirSync(subj.dir).filter(f => f.endsWith('.js'));
    report.summary[subj.key] = { files: files.length, questions: 0, hitFiles: 0, hitCount: 0 };
    for (const f of files) {
      const abs = path.join(subj.dir, f);
      const res = scanFile(abs);
      totalFiles += 1;
      if (!report.files[subj.key]) report.files[subj.key] = {};
      report.files[subj.key][f] = res;
      totalQuestions += res.questions;
      report.summary[subj.key].questions += res.questions;
      if (res.hits.length) {
        report.summary[subj.key].hitFiles += 1;
        report.summary[subj.key].hitCount += res.hits.length;
        totalHits += res.hits.length;
      }
    }
  }
  report.total = { files: totalFiles, questions: totalQuestions, hits: totalHits };
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Wrote audit report to ${path.relative(root, outPath)}`);
  if (totalHits === 0) {
    console.log('No placeholder patterns found.');
  } else {
    console.log(`Found ${totalHits} potential placeholder hits.`);
  }
}

main();
