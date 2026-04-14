#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const SUBJECT_DRIFT_FALSE_POSITIVES = new Set([
  'bd4bbdd6a338325353291f934f5811e06122e0a4',
  '250ff74f779b1d3f6bc43c752090e55d3bbf9104',
  'a53f0107783c80c05eba51cae0d18a4600ef7d9c',
  'f22efd06e182230507fa842d68e0e61c27398184',
  'c61f00b54ffe4d1b64bc36ab89a278e3d25f70af',
  '7005b13b9abd2bcdecdef6215e5e0e5090e678fa',
]);

function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');
}

function findLatestReport(prefix) {
  const files = fs
    .readdirSync(REPORTS_DIR)
    .filter((name) => new RegExp(`^${prefix}_\\d{8}-\\d{6}\\.json$`).test(name))
    .sort();

  if (!files.length) {
    throw new Error(`No ${prefix} reports found in reports/.`);
  }

  return path.join(REPORTS_DIR, files[files.length - 1]);
}

function getIssueCodes(entry) {
  return [...new Set((entry?.issues || []).map((issue) => issue.code))].sort();
}

function main() {
  const acceptedPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : findLatestReport('question_bank_vetting_accepted');
  const reviewPath = process.argv[3]
    ? path.resolve(process.argv[3])
    : findLatestReport('question_bank_vetting_review');

  const accepted = JSON.parse(fs.readFileSync(acceptedPath, 'utf8'));
  const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));

  if (!Array.isArray(accepted) || !Array.isArray(review)) {
    throw new Error('Accepted and review reports must both be arrays.');
  }

  const promoted = [];
  const skipped = [];
  const bySubject = {};

  for (const entry of review) {
    const codes = getIssueCodes(entry);
    const isGenericOnly =
      codes.length === 1 && codes[0] === 'generic-rationales';
    const isManualScienceFalsePositive =
      codes.length === 1 &&
      codes[0] === 'subject-drift' &&
      SUBJECT_DRIFT_FALSE_POSITIVES.has(entry.fingerprint);

    if (isGenericOnly || isManualScienceFalsePositive) {
      promoted.push(entry);
      const subject = entry.subject || 'Unknown';
      bySubject[subject] = (bySubject[subject] || 0) + 1;
      continue;
    }

    skipped.push({
      fingerprint: entry.fingerprint,
      subject: entry.subject || 'Unknown',
      topic: entry.topic || null,
      issueCodes: codes,
      questionText: entry?.sanitizedQuestion?.questionText || '',
    });
  }

  const stamp = timestamp();
  const promotedPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_promoted_${stamp}.json`
  );
  const mergedPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_accepted_with_promotions_${stamp}.json`
  );
  const summaryPath = path.join(
    REPORTS_DIR,
    `question_bank_vetting_promotion_summary_${stamp}.json`
  );

  const merged = [...accepted, ...promoted];
  const summary = {
    generatedAt: new Date().toISOString(),
    acceptedSource: path.relative(ROOT, acceptedPath).replace(/\\/g, '/'),
    reviewSource: path.relative(ROOT, reviewPath).replace(/\\/g, '/'),
    promotedCount: promoted.length,
    skippedCount: skipped.length,
    mergedCount: merged.length,
    rules: [
      'Promote only review items whose sole issue is generic-rationales.',
      'Promote a small allowlist of verified false-positive subject-drift Science items.',
      'Do not promote other subject-drift items.',
    ],
    bySubject,
    skippedIssueCombos: skipped.reduce((acc, item) => {
      const key = item.issueCodes.join('|') || '(none)';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}),
  };

  fs.writeFileSync(promotedPath, JSON.stringify(promoted, null, 2) + '\n');
  fs.writeFileSync(mergedPath, JSON.stringify(merged, null, 2) + '\n');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n');

  console.log(
    JSON.stringify(
      {
        promotedPath: path.relative(ROOT, promotedPath).replace(/\\/g, '/'),
        mergedPath: path.relative(ROOT, mergedPath).replace(/\\/g, '/'),
        summaryPath: path.relative(ROOT, summaryPath).replace(/\\/g, '/'),
        ...summary,
      },
      null,
      2
    )
  );
}

main();
