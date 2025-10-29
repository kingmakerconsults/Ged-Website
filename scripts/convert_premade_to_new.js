// Convert legacy backend/data/premade-questions.js (ALL_QUIZZES) into per-topic files
// under backend/data/quizzes/<subject>/<topicId>.js without changing content.
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
const outRoot = path.join(workspaceRoot, 'backend', 'data', 'quizzes');
const reportsDir = path.join(workspaceRoot, 'reports');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapSubjectKeyToFolder(key) {
  const m = String(key).toLowerCase();
  if (m.includes('scientific') && m.includes('numer')) return 'scientific-numeracy';
  if (m.includes('social') && m.includes('stud')) return 'social-studies';
  if (m.includes('rla')) return 'rla';
  if (m.includes('math')) return 'math';
  if (m.includes('science')) return 'science';
  return 'other';
}

function safeWriteFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function main() {
  const { ALL_QUIZZES } = require(legacyPath);
  const report = {
    generatedAt: new Date().toISOString(),
    subjects: [],
    totalTopics: 0,
    totalQuestions: 0,
    outputRoot: path.relative(workspaceRoot, outRoot).replace(/\\/g, '/'),
  };

  for (const [subjectKey, subjectVal] of Object.entries(ALL_QUIZZES)) {
    const subjectFolder = mapSubjectKeyToFolder(subjectKey);
    const subjectOutDir = path.join(outRoot, subjectFolder);

    let subjectTopicCount = 0;
    let subjectQuestionCount = 0;
    const subjectEntry = { subjectKey, subjectFolder, categories: [] };

    const categories = subjectVal?.categories || {};
    for (const [categoryName, categoryVal] of Object.entries(categories)) {
      const catEntry = { categoryName, topics: [] };
      const topics = categoryVal?.topics || [];
      for (const topic of topics) {
        const topicId = topic.id || slugify(topic.title || 'topic');
        const outFile = path.join(subjectOutDir, `${topicId}.js`);
        const questions = topic.questions || [];
        const header = `// Auto-generated from backend/data/premade-questions.js\n// Subject: ${subjectKey} | Category: ${categoryName} | Topic: ${topic.title || topicId}\n`;
        const exportLine = `module.exports = ${JSON.stringify(questions, null, 2)};\n`;
        safeWriteFile(outFile, header + exportLine);

        const qCount = Array.isArray(questions) ? questions.length : 0;
        subjectTopicCount += 1;
        subjectQuestionCount += qCount;
        report.totalTopics += 1;
        report.totalQuestions += qCount;
        catEntry.topics.push({ topicId, file: path.relative(workspaceRoot, outFile).replace(/\\/g, '/'), qCount });
      }
      subjectEntry.categories.push(catEntry);
    }

    report.subjects.push({
      subjectKey,
      subjectFolder,
      topicCount: subjectTopicCount,
      questionCount: subjectQuestionCount,
    });
  }

  ensureDir(reportsDir);
  fs.writeFileSync(path.join(reportsDir, 'quiz_consolidation_report.json'), JSON.stringify(report, null, 2));
  console.log(`Wrote per-topic files under ${path.relative(workspaceRoot, outRoot)} and quiz_consolidation_report.json`);
}

main();
