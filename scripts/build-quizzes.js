import fs from 'fs';
import path from 'path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

function warn(...args) { console.warn(...args); }
function info(...args) { console.log(...args); }
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function safeRead(p) { try { return fs.readFileSync(p, 'utf8'); } catch { return null; } }

const SUBJECT_CANON = new Map([
  ['math','Math'],
  ['science','Science'],
  ['social studies','Social Studies'],
  ['social-studies','Social Studies'],
  ['social_studies','Social Studies'],
  ['rla','Reasoning Through Language Arts (RLA)'],
  ['language arts','Reasoning Through Language Arts (RLA)'],
  ['reasoning through language arts (rla)','Reasoning Through Language Arts (RLA)'],
  ['simulations','Simulations'],
]);

function normalizeSubjectName(name) {
  if (!name) return null;
  const k = String(name).trim().toLowerCase();
  return SUBJECT_CANON.get(k) || (k.includes('social') && k.includes('stud') ? 'Social Studies' : (k.includes('rla') ? 'Reasoning Through Language Arts (RLA)' : (k.includes('math') ? 'Math' : (k.includes('science') ? 'Science' : name))));
}

function deriveCategoryFor(subject, item) {
  const title = String(item?.title || item?.topic || '').toLowerCase();
  const id = String(item?.id || '').toLowerCase();
  if (subject === 'Social Studies') {
    const civics = ['constitution','bill-of-rights','elections','federalism','judicial','executive','legislative','civics','government'];
    if (civics.some(k => title.includes(k) || id.includes(k))) return 'Civics & Government';
    return 'U.S. History';
  }
  if (subject === 'Math') {
    if (/(algebra|equation|expression|polynomial|linear|quadratic)/.test(title)) return 'Algebraic Problem Solving';
    if (/(geometry|angle|triang|circle|perimeter|area|volume)/.test(title)) return 'Geometry';
    return 'Quantitative Problem Solving';
  }
  if (subject === 'Science') {
    if (/(cell|ecosystem|biology|life)/.test(title)) return 'Life Science';
    if (/(earth|space|planet|astronomy)/.test(title)) return 'Earth & Space Science';
    if (/(data|measurement|numeracy|graph)/.test(title)) return 'Scientific Numeracy';
    return 'Physical Science';
  }
  if (subject === 'Reasoning Through Language Arts (RLA)') {
    if (/(grammar|usage|conventions|punctuation|writing)/.test(title)) return 'Language & Writing';
    return 'Reading Comprehension';
  }
  return 'General';
}

function createEmptySubjectPayload(subject) {
  return { subject, categories: {} };
}

function pushQuiz(payload, subject, categoryName, topicId, topicTitle, quiz) {
  if (!payload.categories[categoryName]) {
    payload.categories[categoryName] = { topics: [] };
  }
  const cat = payload.categories[categoryName];
  let tIdx = cat.topics.findIndex(t => t && (t.id === topicId || t.title === topicTitle));
  if (tIdx === -1) { cat.topics.push({ id: topicId, title: topicTitle, quizzes: [] }); tIdx = cat.topics.length - 1; }
  const topic = cat.topics[tIdx];
  const existing = new Set((topic.quizzes || []).map(q => q && (q.quizId || q.id)));
  const qid = quiz.quizId || quiz.id || `${topicId}_quiz_${topic.quizzes.length+1}`;
  if (!existing.has(qid)) {
    topic.quizzes.push({ ...quiz, quizId: qid });
  }
}

function enumerateFromSubjectShape(subjectName, data) {
  const out = [];
  if (!data) return out;
  const subj = data;
  // subject-level quizzes
  if (Array.isArray(subj.quizzes)) {
    for (const q of subj.quizzes) {
      out.push({ subject: subjectName, category: 'General', topicId: `${subjectName.toLowerCase()}__general`, topicTitle: 'General / Mixed', quiz: q });
    }
  }
  const cats = subj.categories || {};
  for (const [catName, cat] of Object.entries(cats)) {
    const topics = Array.isArray(cat?.topics) ? cat.topics : [];
    for (const t of topics) {
      // if topic has nested quizzes
      if (Array.isArray(t?.quizzes) && t.quizzes.length) {
        for (const q of t.quizzes) {
          out.push({ subject: subjectName, category: catName, topicId: t.id || t.title, topicTitle: t.title || t.id || 'Topic', quiz: q });
        }
      } else if (Array.isArray(t?.questions) && t.questions.length) {
        // topic-only questions become a single quiz
        out.push({ subject: subjectName, category: catName, topicId: t.id || t.title, topicTitle: t.title || t.id || 'Topic', quiz: { title: t.title || 'Quiz', questions: t.questions, quizId: t.id || undefined } });
      }
    }
  }
  return out;
}

async function loadFrontendQuizData() {
  const filePath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  try {
    const mod = await import(pathToFileURL(filePath).href);
    const data = mod.expandedQuizData || mod.default || null;
    return data || null;
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

async function loadPerSubjectArrays() {
  const map = {};
  async function tryImport(rel, key) {
    try {
      const mod = await import(pathToFileURL(path.join(root, 'frontend', 'Expanded', rel)).href);
      const arr = mod.default || mod[key] || null;
      if (Array.isArray(arr)) {
        const subj = normalizeSubjectName(key?.includes('social') ? 'Social Studies' : key?.includes('math') ? 'Math' : key?.includes('science') ? 'Science' : key?.includes('rla') ? 'Reasoning Through Language Arts (RLA)' : null);
        const name = subj || (arr[0]?.subject && normalizeSubjectName(arr[0].subject)) || null;
        if (name) map[name] = (map[name] || []).concat(arr);
      }
    } catch {}
  }
  await tryImport('social_studies_quizzes.js', 'socialStudiesQuizzes');
  await tryImport('combined_math_quizzes.js', 'combinedMathQuizzes');
  await tryImport('all_science_quizzes.js', 'allScienceQuizzes');
  await tryImport('science_quizzes.js', 'scienceQuizzes');
  await tryImport('rla_quizzes.js', 'rlaQuizzes');
  return map;
}

function loadBackendPremade() {
  try {
    const mod = requireCJS(path.join(root, 'backend', 'data', 'premade-questions.js'));
    return mod.ALL_QUIZZES || null;
  } catch {
    return null;
  }
}

function loadQuizzesTxt() {
  try {
    const raw = fs.readFileSync(path.join(root, 'quizzes.txt'), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
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
    } catch {}
  }
  return results;
}

function subjectSlug(subject) {
  const map = {
    'Math': 'math',
    'Science': 'science',
    'Social Studies': 'social-studies',
    'Reasoning Through Language Arts (RLA)': 'rla',
    'Simulations': 'simulations',
  };
  return map[subject] || subject.toLowerCase().replace(/\s+/g, '-');
}

function buildSubjectPayloads(allEntries) {
  const bySubject = new Map();
  const seenBySubject = new Map();

  for (const entry of allEntries) {
    const subj = normalizeSubjectName(entry.subject);
    if (!subj) continue;
    if (!bySubject.has(subj)) bySubject.set(subj, createEmptySubjectPayload(subj));
    if (!seenBySubject.has(subj)) seenBySubject.set(subj, new Set());

    const payload = bySubject.get(subj);
    const seen = seenBySubject.get(subj);

    const category = entry.category || deriveCategoryFor(subj, entry.quiz || { title: entry.topicTitle });
    const topicId = entry.topicId || `${subjectSlug(subj)}__${(entry.topicTitle || 'topic').toLowerCase().replace(/\s+/g, '_')}`;
    const topicTitle = entry.topicTitle || 'Practice Set';

    const quiz = entry.quiz || { title: entry.title || 'Quiz', questions: entry.questions || [] };
    const qid = quiz.quizId || quiz.id || `${topicId}_quiz_${(quiz.title||'').toLowerCase().replace(/\s+/g,'_')}`;
    if (seen.has(qid)) continue; // de-dupe
    seen.add(qid);

    pushQuiz(payload, subj, category, topicId, topicTitle, { ...quiz, quizId: qid });
  }

  return bySubject;
}

function splitSubjectPayload(subjectPayload, maxBytes = 400 * 1024) {
  // Greedy pack categories into chunks under maxBytes
  const cats = Object.entries(subjectPayload.categories);
  const chunks = [];
  let current = { subject: subjectPayload.subject, categories: {} };
  let currentSize = 0;

  function sizeOf(obj) { return Buffer.byteLength(JSON.stringify(obj), 'utf8'); }

  for (const [catName, cat] of cats) {
    const add = { [catName]: cat };
    const tentative = { subject: subjectPayload.subject, categories: { ...current.categories, ...add } };
    const nextSize = sizeOf(tentative);
    if (nextSize > maxBytes && currentSize > 0) {
      chunks.push(current);
      current = { subject: subjectPayload.subject, categories: { [catName]: cat } };
      currentSize = sizeOf(current);
    } else {
      current = tentative;
      currentSize = nextSize;
    }
  }
  if (Object.keys(current.categories).length) chunks.push(current);
  return chunks;
}

async function collectAllSources() {
  const entries = [];

  // 1) Frontend ESM
  const esm = await loadFrontendQuizData();
  if (esm) {
    for (const [subjectName, subject] of Object.entries(esm)) {
      const list = enumerateFromSubjectShape(normalizeSubjectName(subjectName), subject);
      entries.push(...list);
    }
  }

  // 2) Expanded bundle
  const bundle = loadExpandedBundle();
  if (bundle) {
    for (const [subjectName, subject] of Object.entries(bundle)) {
      const list = enumerateFromSubjectShape(normalizeSubjectName(subjectName), subject);
      entries.push(...list);
    }
  }

  // 3) Per-subject arrays
  const arrays = await loadPerSubjectArrays();
  for (const [subjectName, arr] of Object.entries(arrays)) {
    const subj = normalizeSubjectName(subjectName);
    for (const item of arr) {
      const cat = deriveCategoryFor(subj, item);
      const topicTitle = item.topic || item.title || 'Practice Set';
      const topicId = item.id || `${subjectSlug(subj)}_${topicTitle.toLowerCase().replace(/\s+/g,'_')}`;
      const quiz = { quizId: item.id || undefined, title: item.title || topicTitle, questions: Array.isArray(item.questions) ? item.questions : [] };
      entries.push({ subject: subj, category: cat, topicId, topicTitle, quiz });
    }
  }

  // 4) Backend premade
  const premade = loadBackendPremade();
  if (premade) {
    for (const [subjectName, subject] of Object.entries(premade)) {
      const list = enumerateFromSubjectShape(normalizeSubjectName(subjectName), subject);
      entries.push(...list);
    }
  }

  // 5) quizzes.txt → assume Social Studies
  const qtxt = loadQuizzesTxt();
  if (Array.isArray(qtxt)) {
    for (const q of qtxt) {
      const subj = 'Social Studies';
      const cat = 'U.S. History';
      const topicId = q.id || `ss_txt_${(q.title||'quiz').toLowerCase().replace(/\s+/g,'_')}`;
      const topicTitle = q.title || 'Topic';
      const quiz = { quizId: q.id || undefined, title: q.title || 'Quiz', questions: Array.isArray(q.questions) ? q.questions : [] };
      entries.push({ subject: subj, category: cat, topicId, topicTitle, quiz });
    }
  }

  // 6) New Exams (optional, likely Math)
  const newExams = loadNewExams();
  for (const { data } of newExams) {
    for (const [subjectName, subject] of Object.entries(data || {})) {
      const list = enumerateFromSubjectShape(normalizeSubjectName(subjectName), subject);
      entries.push(...list);
    }
  }

  return entries;
}

async function main() {
  const outDir = path.join(root, 'public', 'quizzes');
  ensureDir(outDir);

  const entries = await collectAllSources();
  const bySubject = buildSubjectPayloads(entries);

  for (const [subject, payload] of bySubject.entries()) {
    const slug = subjectSlug(subject);
    const json = JSON.stringify(payload);
    const size = Buffer.byteLength(json, 'utf8');
    if (size <= 480 * 1024) {
      fs.writeFileSync(path.join(outDir, `${slug}.quizzes.json`), json, 'utf8');
      info(`[WRITE] ${slug}.quizzes.json (${Math.round(size/1024)} KB)`);
    } else {
      const parts = splitSubjectPayload(payload, 400 * 1024);
      parts.forEach((chunk, idx) => {
        const j = JSON.stringify(chunk);
        fs.writeFileSync(path.join(outDir, `${slug}.quizzes.part${idx+1}.json`), j, 'utf8');
        info(`[WRITE] ${slug}.quizzes.part${idx+1}.json (${Math.round(Buffer.byteLength(j,'utf8')/1024)} KB)`);
      });
    }
  }

  info('[DONE] Built per-subject quiz JSON bundles in public/quizzes');
}

main().catch(err => { console.error(err); process.exit(1); });
