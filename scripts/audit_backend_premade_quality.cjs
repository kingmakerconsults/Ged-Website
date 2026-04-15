#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {
  auditPremadeCatalog,
} = require('../backend/src/lib/premadeQuestionAudit');

const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const STRICT_MODE = process.argv.includes('--strict');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function timestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
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

function main() {
  ensureDir(REPORTS_DIR);

  const report = auditPremadeCatalog({ rootDir: ROOT });
  const outputPath = path.join(
    REPORTS_DIR,
    `backend_premade_quality_${timestamp()}.json`
  );

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + '\n', 'utf8');

  console.log(
    JSON.stringify(
      {
        reportFile: path.relative(ROOT, outputPath).replace(/\\/g, '/'),
        totalQuestions: report.totalQuestions,
        affectedQuestions: report.affectedQuestions,
        cleanQuestions: report.cleanQuestions,
        issueCount: report.issueCount,
        autofixableIssueCount: report.autofixableIssueCount,
        severityCounts: report.severityCounts,
        bySubject: report.bySubject,
      },
      null,
      2
    )
  );

  if (STRICT_MODE && report.issueCount > 0) {
    process.exit(1);
  }
}

main();
