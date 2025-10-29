// Verify counts between legacy ALL_QUIZZES and new per-topic files
// ESM script; uses createRequire to import CJS modules.
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const legacyPath = path.join(workspaceRoot, 'backend', 'data', 'premade-questions.js');
const quizzesRoot = path.join(workspaceRoot, 'backend', 'data', 'quizzes');
const reportsDir = path.join(workspaceRoot, 'reports');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function listTopicFiles() {
  const subjects = fs.readdirSync(quizzesRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
  const files = [];
  for (const subj of subjects) {
    const dir = path.join(quizzesRoot, subj.name);
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.js')) {
        files.push(path.join(dir, entry.name));
      }
    }
  }
  return files;
}

function countLegacy() {
  const { ALL_QUIZZES } = require(legacyPath);
  let topics = 0;
  let questions = 0;
  for (const subject of Object.values(ALL_QUIZZES)) {
    const categories = subject?.categories || {};
    for (const cat of Object.values(categories)) {
      const t = cat?.topics || [];
      topics += t.length;
      for (const topic of t) {
        if (Array.isArray(topic.questions)) questions += topic.questions.length;
      }
    }
  }
  return { topics, questions };
}

function countDynamic(files) {
  let topics = 0;
  let questions = 0;
  for (const f of files) {
    try {
      const arr = require(f);
      if (Array.isArray(arr)) {
        topics += 1;
        questions += arr.length;
      }
    } catch {
      // ignore bad file
    }
  }
  return { topics, questions };
}

function main() {
  const legacy = countLegacy();
  const topicFiles = listTopicFiles();
  const dynamic = countDynamic(topicFiles);

  const status = {
    generatedAt: new Date().toISOString(),
    legacy,
    dynamic,
    topicFiles: topicFiles.map((p) => path.relative(workspaceRoot, p).replace(/\\/g, '/')),
    notes:
      dynamic.topics === 0 && legacy.topics > 0
        ? 'Dynamic content is not active or not generated; keep using legacy export.'
        : 'Dynamic content present. Validate shapes before switching the loader.',
  };

  ensureDir(reportsDir);
  fs.writeFileSync(path.join(reportsDir, 'quiz_loader_status.json'), JSON.stringify(status, null, 2));

  const md = [
    '# Quiz loader status',
    '',
    `Generated: ${status.generatedAt}`,
    '',
    `- Legacy topics: ${legacy.topics}, questions: ${legacy.questions}`,
    `- Dynamic topics: ${dynamic.topics}, questions: ${dynamic.questions}`,
    '',
    status.notes,
    '',
    '## Topic files',
    ...status.topicFiles.map((p) => `- ${p}`),
  ].join('\n');
  fs.writeFileSync(path.join(reportsDir, 'quiz_loader_status.md'), md);

  console.log('Wrote reports/quiz_loader_status.{json,md}');
}

main();
