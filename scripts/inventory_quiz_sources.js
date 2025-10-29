// Inventory quiz/question data sources across the repo and write reports.
// ESM script (root package.json has type: module)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const reportsDir = path.join(workspaceRoot, 'reports');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isTextFile(file) {
  return /\.(js|json|jsx|ts|tsx|html|txt)$/i.test(file);
}

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and .git and screenshots
      if (/node_modules|\.git|screenshots|dist|build/.test(entry.name)) continue;
      walk(full, results);
    } else if (entry.isFile()) {
      if (isTextFile(entry.name)) results.push(full);
    }
  }
  return results;
}

function detectSubjectFromPath(p) {
  const lower = p.toLowerCase();
  if (lower.includes('scientific') && lower.includes('numer')) return 'Scientific Numeracy';
  if (lower.includes('social') && lower.includes('stud')) return 'Social Studies';
  if (lower.includes('rla')) return 'RLA';
  if (lower.includes('math')) return 'Math';
  if (lower.includes('science')) return 'Science';
  return 'Unknown';
}

function countOccurrences(haystack, needles) {
  let total = 0;
  for (const n of needles) {
    const re = new RegExp(n, 'g');
    const matches = haystack.match(re);
    if (matches) total += matches.length;
  }
  return total;
}

function main() {
  const allFiles = walk(workspaceRoot);
  const interesting = allFiles.filter((p) => {
    return /quizz|exam|question|answeroptions|ALL_QUIZZES/i.test(p);
  });

  const entries = [];
  for (const file of interesting) {
    try {
      const text = fs.readFileSync(file, 'utf8');
      const questionLikeCount = countOccurrences(text, [
        '\\banswerOptions\\s*:',
        '"answerOptions"\\s*:',
        '\\bquestions\\s*:\\s*\\[',
      ]);
      if (questionLikeCount === 0) continue;
      entries.push({
        path: path.relative(workspaceRoot, file).replace(/\\/g, '/'),
        subject: detectSubjectFromPath(file),
        approxQuestionCount: questionLikeCount,
      });
    } catch {
      // skip unreadable files
    }
  }

  // Sort by subject then path
  entries.sort((a, b) => (a.subject || '').localeCompare(b.subject || '') || a.path.localeCompare(b.path));

  ensureDir(reportsDir);
  const jsonPath = path.join(reportsDir, 'quiz_inventory.json');
  fs.writeFileSync(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), entries }, null, 2));

  const mdLines = [
    '# Quiz data inventory',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Subject | Approx. Q count | File |',
    '|---|---:|---|',
    ...entries.map((e) => `| ${e.subject} | ${e.approxQuestionCount} | ${e.path} |`),
    '',
    '_Counts are approximate (pattern-based); final consolidation preserves content verbatim._',
  ];
  const mdPath = path.join(reportsDir, 'quiz_inventory.md');
  fs.writeFileSync(mdPath, mdLines.join('\n'));

  console.log(`Wrote ${entries.length} entries to reports/quiz_inventory.{json,md}`);
}

main();
