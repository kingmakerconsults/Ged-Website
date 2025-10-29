// Import quizzes from frontend/Expanded into backend/data/quizzes and generate
// supplemental topic metadata so the dynamic loader can expose them.
// ESM script.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import vm from 'node:vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const frontendExpanded = path.join(workspaceRoot, 'frontend', 'Expanded');
const outRoot = path.join(workspaceRoot, 'backend', 'data', 'quizzes');
const reportsDir = path.join(workspaceRoot, 'reports');
const supplementalMetaPath = path.join(outRoot, 'supplemental.topics.json');
const requireCJS = createRequire(import.meta.url);
const legacy = requireCJS(path.join(workspaceRoot, 'backend', 'data', 'premade-questions.js'));

function mapSubjectKeyToFolder(key) {
  const m = String(key).toLowerCase();
  if (m.includes('scientific') && m.includes('numer')) return 'scientific-numeracy';
  if (m.includes('social') && m.includes('stud')) return 'social-studies';
  if (m.includes('rla') || m.includes('language')) return 'rla';
  if (m.includes('math')) return 'math';
  if (m.includes('science')) return 'science';
  return 'other';
}

function firstTopicConfigForSubject(subjectKey) {
  const subj = legacy.ALL_QUIZZES[subjectKey];
  if (!subj) return null;
  for (const cat of Object.values(subj.categories || {})) {
    const t = (cat.topics || [])[0];
    if (t && t.config) return t.config;
  }
  return null;
}

function sanitizeExpandedSource(src) {
  let s = String(src);
  // Fix known typos like keys written as is 'Correct' (quoted inside or unquoted)
  // 1) "is 'Correct": false -> "isCorrect": false
  s = s.replace(/"is\s*[‘’“”']Correct[‘’“”']"\s*:/g, '"isCorrect":');
  // 2) is 'Correct': false -> isCorrect: false (unquoted key form)
  s = s.replace(/\bis\s*[‘’“”']Correct[‘’“”']\s*:/g, 'isCorrect:');
  // Replace any `export const <name> = [...]` with `var quizzes = [...]`
  s = s.replace(/export\s+const\s+[A-Za-z0-9_]+\s*=\s*(?=\[)/, 'var quizzes = ');
  // Replace any `export const <name> = []` with `var quizzes = []` (for push-style files)
  s = s.replace(/export\s+const\s+[A-Za-z0-9_]+\s*=\s*\[\]/, 'var quizzes = []');
  // Handle non-exported scienceQuizzes style files: `const scienceQuizzes = [ ... ]`
  s = s.replace(/\bconst\s+scienceQuizzes\s*=\s*(?=\[)/, 'var quizzes = ');
  s = s.replace(/\blet\s+scienceQuizzes\s*=\s*(?=\[)/, 'var quizzes = ');
  s = s.replace(/\bvar\s+scienceQuizzes\s*=\s*(?=\[)/, 'var quizzes = ');
  // Remove any leftover export statements
  s = s.replace(/export\s+\{[^}]*\};?/g, '');
  s = s.replace(/export\s+default\s+quizzes;?/g, '');
  return s;
}

function evalExpandedFileToQuizzes(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const code = sanitizeExpandedSource(raw);
  // Debug dump for inspection when handling new files
  try {
    if (path.basename(filePath) === 'science_quizzes.js') {
      ensureDir(reportsDir);
      fs.writeFileSync(path.join(reportsDir, 'debug_science_sanitized.js'), code);
    }
  } catch {}
  const sandbox = { quizzes: [] };
  vm.createContext(sandbox);
  const script = new vm.Script(code, { filename: path.basename(filePath) });
  script.runInContext(sandbox, { timeout: 2000 });
  return sandbox.quizzes || [];
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeTopicQuestions(subjectFolder, topicId, questions) {
  const outFile = path.join(outRoot, subjectFolder, `${topicId}.js`);
  ensureDir(path.dirname(outFile));
  const header = `// Imported from frontend/Expanded\n`;
  const body = `module.exports = ${JSON.stringify(questions, null, 2)};\n`;
  fs.writeFileSync(outFile, header + body);
  return outFile;
}

function defaultConfigFrom(subjectKey, questionCount) {
  const base = firstTopicConfigForSubject(subjectKey);
  const cfg = base
    ? { ...base }
    : { totalTime: 20 * 60, calculator: subjectKey === 'Math', formulaSheet: subjectKey === 'Math', parts: [{ name: 'Quiz', questionCount }] };
  // Update question count in parts if present
  if (Array.isArray(cfg.parts) && cfg.parts.length > 0) {
    cfg.parts = cfg.parts.map((p, i) => (i === 0 ? { ...p, questionCount } : p));
  }
  return cfg;
}

function loadExpandedSets() {
  const files = [
    'combined_math_quizzes.js',
    'all_science_quizzes.js',
    'science_quizzes.js',
    'social_studies_quizzes.js',
    'rla_quizzes.js',
  ];
  return files
    .filter((f) => fs.existsSync(path.join(frontendExpanded, f)))
    .map((f) => path.join(frontendExpanded, f));
}

function subjectKeyFrom(value) {
  const v = String(value).trim();
  if (/^math$/i.test(v)) return 'Math';
  if (/^science$/i.test(v)) return 'Science';
  if (/^social\s*stud/i.test(v)) return 'Social Studies';
  if (/rla|language/i.test(v)) return 'Reasoning Through Language Arts (RLA)';
  return v; // fallback
}

async function main() {
  ensureDir(reportsDir);
  const expandedFiles = loadExpandedSets();
  const supplemental = [];
  let topicsWritten = 0;
  let questionsWritten = 0;

  for (const file of expandedFiles) {
    const arr = evalExpandedFileToQuizzes(file);
    for (const qz of arr) {
      const subjectKey = subjectKeyFrom(qz.subject);
      const subjectFolder = mapSubjectKeyToFolder(subjectKey);
      const topicId = qz.id || `${subjectFolder}_${(qz.title || qz.topic || 'topic').toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
      const topicTitle = qz.title || qz.topic || topicId;
      const categoryName = qz.topic || 'General';
      const questions = Array.isArray(qz.questions) ? qz.questions : [];
      const outFile = writeTopicQuestions(subjectFolder, topicId, questions);
      topicsWritten += 1;
      questionsWritten += questions.length;
      const config = defaultConfigFrom(subjectKey, questions.length);
      supplemental.push({
        subjectKey,
        subjectFolder,
        categoryName,
        topic: { id: topicId, title: topicTitle, description: qz.description || '', config, file: path.relative(workspaceRoot, outFile).replace(/\\/g, '/') },
      });
    }
  }

  // Merge with any existing supplemental topics
  let existing = [];
  if (fs.existsSync(supplementalMetaPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(supplementalMetaPath, 'utf8'));
    } catch {}
  }
  // De-duplicate by (subjectKey, topic.id)
  const byKey = new Map();
  for (const it of [...existing, ...supplemental]) {
    byKey.set(`${it.subjectKey}::${it.topic.id}`, it);
  }
  const merged = Array.from(byKey.values());
  fs.writeFileSync(supplementalMetaPath, JSON.stringify(merged, null, 2));

  fs.writeFileSync(path.join(reportsDir, 'import_expanded_quizzes.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    sources: expandedFiles.map((p) => path.relative(workspaceRoot, p).replace(/\\/g, '/')),
    topicsWritten,
    questionsWritten,
    supplementalCount: merged.length,
  }, null, 2));

  console.log(`Imported ${topicsWritten} topics with ${questionsWritten} questions from frontend/Expanded. Supplemental topics: ${merged.length}.`);
}

main();
