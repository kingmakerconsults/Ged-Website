import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const REASON_WEIGHTS = {
  'missing question tier metadata': 1,
  'question tier does not match topic tier': 3,
  'question complexity appears below topic tier': 4,
  'invalid question tier value': 3,
  'invalid topic tier value': 2,
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function findLatestAuditReport(explicitPath = '') {
  if (explicitPath) {
    const abs = path.isAbsolute(explicitPath)
      ? explicitPath
      : path.join(root, explicitPath);
    if (!fs.existsSync(abs)) {
      throw new Error(`Audit report not found: ${explicitPath}`);
    }
    return abs;
  }

  const reportsDir = path.join(root, 'reports');
  if (!fs.existsSync(reportsDir)) {
    throw new Error('reports directory not found');
  }

  const candidates = fs
    .readdirSync(reportsDir)
    .filter((name) => /^tier_progression_audit_\d+\.json$/i.test(name))
    .map((name) => ({
      name,
      abs: path.join(reportsDir, name),
      ts: Number(name.match(/(\d+)\.json$/)?.[1] || 0),
    }))
    .sort((a, b) => b.ts - a.ts);

  if (candidates.length === 0) {
    throw new Error('No tier_progression_audit_*.json reports found');
  }

  return candidates[0].abs;
}

function normalizeSubject(filePath) {
  const name = String(filePath || '').toLowerCase();
  if (name.includes('math')) return 'Math';
  if (name.includes('rla')) return 'RLA';
  if (name.includes('science')) return 'Science';
  if (name.includes('social')) return 'Social Studies';
  if (name.includes('workforce')) return 'Workforce';
  return 'Unknown';
}

function reasonWeight(reason) {
  return REASON_WEIGHTS[reason] || 2;
}

function buildQueue(audit) {
  const queue = [];
  const bySubject = {};
  const bySubjectTier = {};

  for (const fileReport of audit.fileReports || []) {
    const warnings = Array.isArray(fileReport?.warnings)
      ? fileReport.warnings
      : [];
    const structural = Array.isArray(fileReport?.structuralProblems)
      ? fileReport.structuralProblems
      : [];

    const reasonCounts = {};
    for (const warning of warnings) {
      const reason = String(warning?.reason || 'unknown warning');
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
    }

    const weightedWarningScore = Object.entries(reasonCounts).reduce(
      (sum, [reason, count]) => sum + reasonWeight(reason) * count,
      0
    );

    const structuralScore = structural.length * 6;
    const score = weightedWarningScore + structuralScore;

    const subject = normalizeSubject(fileReport?.file);
    const learnerTier = inferDominantTier(reasonCounts);
    const key = `${subject}::${learnerTier}`;

    if (!bySubject[subject]) {
      bySubject[subject] = {
        subject,
        files: 0,
        questions: 0,
        warnings: 0,
        structuralProblems: 0,
        weightedScore: 0,
      };
    }

    if (!bySubjectTier[key]) {
      bySubjectTier[key] = {
        subject,
        learnerTier,
        files: 0,
        questions: 0,
        warnings: 0,
        structuralProblems: 0,
        weightedScore: 0,
      };
    }

    bySubject[subject].files += 1;
    bySubject[subject].questions += Number(fileReport?.questionCount || 0);
    bySubject[subject].warnings += warnings.length;
    bySubject[subject].structuralProblems += structural.length;
    bySubject[subject].weightedScore += score;

    bySubjectTier[key].files += 1;
    bySubjectTier[key].questions += Number(fileReport?.questionCount || 0);
    bySubjectTier[key].warnings += warnings.length;
    bySubjectTier[key].structuralProblems += structural.length;
    bySubjectTier[key].weightedScore += score;

    queue.push({
      file: fileReport?.file,
      subject,
      learnerTier,
      questionCount: Number(fileReport?.questionCount || 0),
      warningCount: warnings.length,
      structuralProblemCount: structural.length,
      weightedScore: score,
      reasonCounts,
      recommendations: buildRecommendations(reasonCounts, structural.length),
    });
  }

  queue.sort((a, b) => b.weightedScore - a.weightedScore);

  const quickWins = queue
    .filter((item) =>
      isMostlyMetadata(item.reasonCounts, item.structuralProblemCount)
    )
    .slice(0, 20)
    .map((item) => ({
      file: item.file,
      subject: item.subject,
      warnings: item.warningCount,
      structuralProblems: item.structuralProblemCount,
      dominantReason: dominantReason(item.reasonCounts),
      suggestedAction:
        'Auto-populate question tier from topic tier, then re-run audit.',
    }));

  const deepRewrite = queue
    .filter(
      (item) =>
        (item.reasonCounts['question complexity appears below topic tier'] ||
          0) > 0
    )
    .slice(0, 20)
    .map((item) => ({
      file: item.file,
      subject: item.subject,
      learnerTier: item.learnerTier,
      complexityFlags:
        item.reasonCounts['question complexity appears below topic tier'] || 0,
      suggestedAction:
        'Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.',
    }));

  return {
    generatedAt: new Date().toISOString(),
    sourceAuditGeneratedAt: audit?.generatedAt || null,
    sourceAuditMode: audit?.mode || null,
    learnerFacingTiers: audit?.learnerFacingTiers || [
      'foundation',
      'test-ready',
      'challenge',
    ],
    summary: {
      files: queue.length,
      totalQuestions: queue.reduce((sum, x) => sum + x.questionCount, 0),
      totalWarnings: queue.reduce((sum, x) => sum + x.warningCount, 0),
      totalStructuralProblems: queue.reduce(
        (sum, x) => sum + x.structuralProblemCount,
        0
      ),
    },
    subjectRollup: Object.values(bySubject).sort(
      (a, b) => b.weightedScore - a.weightedScore
    ),
    subjectTierRollup: Object.values(bySubjectTier).sort(
      (a, b) => b.weightedScore - a.weightedScore
    ),
    queue,
    quickWins,
    deepRewrite,
    nextBatch: buildNextBatch(queue),
  };
}

function dominantReason(reasonCounts) {
  const entries = Object.entries(reasonCounts || {});
  if (entries.length === 0) return 'none';
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function isMostlyMetadata(reasonCounts, structuralCount) {
  const missingTier = reasonCounts['missing question tier metadata'] || 0;
  const totalWarnings = Object.values(reasonCounts).reduce((a, b) => a + b, 0);
  if (totalWarnings === 0) return structuralCount === 0;
  return missingTier / totalWarnings >= 0.8 && structuralCount === 0;
}

function inferDominantTier(reasonCounts) {
  const complexityFlags =
    reasonCounts['question complexity appears below topic tier'] || 0;
  if (complexityFlags > 0) return 'test-ready/challenge';
  return 'foundation';
}

function buildRecommendations(reasonCounts, structuralCount) {
  const items = [];
  if ((reasonCounts['missing question tier metadata'] || 0) > 0) {
    items.push('Add question tier metadata based on topic tier map.');
  }
  if ((reasonCounts['question tier does not match topic tier'] || 0) > 0) {
    items.push('Fix mismatched tier labels between topic and question.');
  }
  if ((reasonCounts['question complexity appears below topic tier'] || 0) > 0) {
    items.push(
      'Rewrite flagged questions to increase complexity and remove filler.'
    );
  }
  if (structuralCount > 0) {
    items.push('Fix structural validation issues before complexity tuning.');
  }
  if (items.length === 0) {
    items.push('No action required.');
  }
  return items;
}

function buildNextBatch(queue) {
  const batch = [];
  for (const item of queue) {
    if (batch.length >= 12) break;
    if (item.structuralProblemCount > 0 || item.weightedScore > 150) {
      batch.push({
        file: item.file,
        subject: item.subject,
        weightedScore: item.weightedScore,
        warningCount: item.warningCount,
        structuralProblemCount: item.structuralProblemCount,
        dominantReason: dominantReason(item.reasonCounts),
      });
    }
  }
  return batch;
}

function toMarkdown(report, sourceAuditFile) {
  const lines = [];
  lines.push('# Tier Remediation Queue');
  lines.push('');
  lines.push(`- Generated: ${report.generatedAt}`);
  lines.push(`- Source audit: ${sourceAuditFile}`);
  lines.push(`- Mode: ${report.sourceAuditMode || 'unknown'}`);
  lines.push(
    `- Totals: files=${report.summary.files}, questions=${report.summary.totalQuestions}, warnings=${report.summary.totalWarnings}, structural=${report.summary.totalStructuralProblems}`
  );
  lines.push('');

  lines.push('## Subject Priority');
  for (const row of report.subjectRollup) {
    lines.push(
      `- ${row.subject}: score=${row.weightedScore}, warnings=${row.warnings}, structural=${row.structuralProblems}, files=${row.files}`
    );
  }
  lines.push('');

  lines.push('## Next Batch (Top Priority Files)');
  for (const item of report.nextBatch) {
    lines.push(
      `- ${item.file} (${item.subject}) — score=${item.weightedScore}, warnings=${item.warningCount}, structural=${item.structuralProblemCount}, reason=${item.dominantReason}`
    );
  }
  lines.push('');

  lines.push('## Quick Wins');
  for (const item of report.quickWins.slice(0, 12)) {
    lines.push(
      `- ${item.file} (${item.subject}) — reason=${item.dominantReason}, warnings=${item.warnings}, action=${item.suggestedAction}`
    );
  }
  lines.push('');

  lines.push('## Deep Rewrite Targets');
  for (const item of report.deepRewrite.slice(0, 12)) {
    lines.push(
      `- ${item.file} (${item.subject}) — complexityFlags=${item.complexityFlags}, action=${item.suggestedAction}`
    );
  }
  lines.push('');

  return lines.join('\n');
}

function main() {
  const explicit = process.argv[2] || '';
  const auditFile = findLatestAuditReport(explicit);
  const audit = readJson(auditFile);

  const remediation = buildQueue(audit);

  const reportsDir = path.join(root, 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });

  const ts = Date.now();
  const jsonPath = path.join(reportsDir, `tier_remediation_queue_${ts}.json`);
  const mdPath = path.join(reportsDir, `tier_remediation_queue_${ts}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify(remediation, null, 2), 'utf8');
  fs.writeFileSync(
    mdPath,
    toMarkdown(remediation, path.basename(auditFile)),
    'utf8'
  );

  console.log(`Source audit: ${path.relative(root, auditFile)}`);
  console.log(`Saved remediation JSON: ${path.relative(root, jsonPath)}`);
  console.log(`Saved remediation MD: ${path.relative(root, mdPath)}`);

  if (remediation.nextBatch.length > 0) {
    const first = remediation.nextBatch[0];
    console.log(
      `Top target: ${first.file} (${first.subject}) reason=${first.dominantReason} score=${first.weightedScore}`
    );
  }
}

main();
