import fs from 'fs';
import path from 'path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

function safeRead(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return null; } }
function log(...args) { console.log(...args); }
function warn(...args) { console.warn(...args); }

// Count helpers for subject-shaped datasets
function countSubjectQuizzes(subjectData) {
  if (!subjectData) return { count: 0, ids: new Set() };
  let total = 0;
  const ids = new Set();
  // subject-level quizzes
  if (Array.isArray(subjectData.quizzes)) {
    for (const q of subjectData.quizzes) {
      const key = q?.quizId || q?.id || q?.title || JSON.stringify(q)?.slice(0, 64);
      if (!ids.has(key)) { ids.add(key); total += 1; }
    }
  }
  const cats = subjectData.categories || {};
  for (const [catName, cat] of Object.entries(cats)) {
    const topics = Array.isArray(cat?.topics) ? cat.topics : [];
    for (const t of topics) {
      // topic.quizzes
      if (Array.isArray(t?.quizzes)) {
        for (const q of t.quizzes) {
          const key = q?.quizId || q?.id || `${t?.id || t?.title || 'topic'}:${q?.title || ''}`;
          if (!ids.has(key)) { ids.add(key); total += 1; }
        }
      }
      // topic.questions only → count topic as one quiz
      if (!Array.isArray(t?.quizzes) && Array.isArray(t?.questions)) {
        const key = t?.id || t?.title || `${catName}::${(t?.description || '').slice(0,32)}`;
        if (!ids.has(key)) { ids.add(key); total += 1; }
      }
    }
  }
  return { count: total, ids };
}

// Loaders similar to tests/quizValidation.test.js
async function loadFrontendQuizData() {
  const filePath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  try {
    const mod = await import(pathToFileURL(filePath).href);
    const data = mod.expandedQuizData || mod.default || null;
    return data;
  } catch (err) {
    warn(`[WARN] Could not import ${filePath}: ${err.message}`);
    return null;
  }
}

function loadExpandedBundle() {
  const filePath = path.join(root, 'frontend', 'Expanded', 'expanded.quizzes.bundle.js');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const marker = 'window.ExpandedQuizData = ';
    const idx = raw.indexOf(marker);
    if (idx === -1) throw new Error('marker not found');
    const jsonStart = raw.indexOf('{', idx);
    const jsonEnd = raw.lastIndexOf('}');
    const jsonStr = raw.slice(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);
    return data;
  } catch (err) {
    warn(`[WARN] Could not parse Expanded bundle: ${err.message}`);
    return null;
  }
}

async function loadExpandedSSFile() {
  const filePath = path.join(root, 'frontend', 'Expanded', 'social_studies_quizzes.js');
  if (!fs.existsSync(filePath)) return null;
  try {
    const mod = await import(pathToFileURL(filePath).href);
    const arr = mod.socialStudiesQuizzes || mod.default || null;
    return Array.isArray(arr) ? arr : null;
  } catch (err) {
    warn(`[WARN] Could not import ${filePath}: ${err.message}`);
    return null;
  }
}

function loadQuizzesTxt() {
  const filePath = path.join(root, 'quizzes.txt');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch { return null; }
}

function loadNewExams() {
  const dir = path.join(root, 'frontend', 'New Exams');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  const results = [];
  for (const f of files) {
    const abs = path.join(dir, f);
    try {
      const raw = fs.readFileSync(abs, 'utf8');
      const code = raw.replace(/\bconst\s+([A-Za-z0-9_]+)\s*=\s*\{/, 'var $1 = {');
      const sandbox = {};
      vm.createContext(sandbox);
      new vm.Script(code + '\n;globalThis.__EXPORTED__ = typeof newMathExams!=="undefined"?newMathExams:undefined;').runInContext(sandbox, { timeout: 2000 });
      const obj = sandbox.__EXPORTED__;
      if (obj && typeof obj === 'object') results.push({ file: f, data: obj });
    } catch (err) {
      warn(`[WARN] Could not evaluate ${abs}: ${err.message}`);
    }
  }
  return results;
}

function countSSInNewExams(entries) {
  let total = 0; const ids = new Set();
  for (const { data } of entries) {
    const subj = data['Social Studies'];
    if (!subj) continue;
    const { count, ids: idset } = countSubjectQuizzes(subj);
    total += count; idset.forEach(id => ids.add(id));
  }
  return { count: total, ids };
}

function countSSInQuizzesArray(arr) {
  // Treat each element as a single quiz
  if (!Array.isArray(arr)) return { count: 0, ids: new Set() };
  const ids = new Set();
  for (const q of arr) {
    const key = q?.id || q?.title || JSON.stringify(q)?.slice(0,64);
    ids.add(key);
  }
  return { count: ids.size, ids };
}

async function main() {
  const report = {};
  const unionIds = new Set();

  // Expanded bundle
  const expanded = loadExpandedBundle();
  if (expanded?.['Social Studies']) {
    const { count, ids } = countSubjectQuizzes(expanded['Social Studies']);
    report['Expanded Bundle'] = count;
    ids.forEach(id => unionIds.add(id));
  } else {
    report['Expanded Bundle'] = 0;
  }

  // Frontend ESM data
  const esm = await loadFrontendQuizData();
  if (esm?.['Social Studies']) {
    const { count, ids } = countSubjectQuizzes(esm['Social Studies']);
    report['Frontend ESM'] = count;
    ids.forEach(id => unionIds.add(id));
  } else {
    report['Frontend ESM'] = 0;
  }

  // Expanded Social Studies file (standalone list)
  const ssList = await loadExpandedSSFile();
  if (ssList) {
    const { count, ids } = countSSInQuizzesArray(ssList);
    report['Expanded/social_studies_quizzes.js'] = count;
    ids.forEach(id => unionIds.add(id));
  } else {
    report['Expanded/social_studies_quizzes.js'] = 0;
  }

  // quizzes.txt (assumed SS content)
  const txt = loadQuizzesTxt();
  if (txt) {
    const { count, ids } = countSSInQuizzesArray(txt);
    report['quizzes.txt'] = count;
    ids.forEach(id => unionIds.add(id));
  } else {
    report['quizzes.txt'] = 0;
  }

  // New Exams
  const newExams = loadNewExams();
  if (newExams.length) {
    const { count, ids } = countSSInNewExams(newExams);
    report['frontend/New Exams'] = count;
    ids.forEach(id => unionIds.add(id));
  } else {
    report['frontend/New Exams'] = 0;
  }

  // Backend premade-questions (CJS): may not have SS
  try {
    const pm = requireCJS(path.join(root, 'backend', 'data', 'premade-questions.js'));
    const all = pm.ALL_QUIZZES || {};
    if (all['Social Studies']) {
      const { count, ids } = countSubjectQuizzes(all['Social Studies']);
      report['backend/premade-questions.js'] = count;
      ids.forEach(id => unionIds.add(id));
    } else {
      report['backend/premade-questions.js'] = 0;
    }
  } catch {
    report['backend/premade-questions.js'] = 0;
  }

  log('[Social Studies counts by source]');
  Object.entries(report).forEach(([k, v]) => log(`- ${k}: ${v}`));
  log(`Union (approx unique across sources): ${unionIds.size}`);
}

main().catch(err => { console.error(err); process.exit(1); });
