import fs from 'fs';
import path from 'path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

function warn(...args) {
  console.warn(...args);
}
function info(...args) {
  console.log(...args);
}
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function safeRead(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

const SUBJECT_CANON = new Map([
  ['math', 'Math'],
  ['science', 'Science'],
  ['social studies', 'Social Studies'],
  ['social-studies', 'Social Studies'],
  ['social_studies', 'Social Studies'],
  ['rla', 'Reasoning Through Language Arts (RLA)'],
  ['language arts', 'Reasoning Through Language Arts (RLA)'],
  [
    'reasoning through language arts (rla)',
    'Reasoning Through Language Arts (RLA)',
  ],
  ['simulations', 'Simulations'],
]);

function normalizeSubjectName(name) {
  if (!name) return null;
  const k = String(name).trim().toLowerCase();
  return (
    SUBJECT_CANON.get(k) ||
    (k.includes('social') && k.includes('stud')
      ? 'Social Studies'
      : k.includes('rla')
        ? 'Reasoning Through Language Arts (RLA)'
        : k.includes('math')
          ? 'Math'
          : k.includes('science')
            ? 'Science'
            : name)
  );
}

function deriveCategoryFor(subject, item) {
  const title = String(item?.title || item?.topic || '').toLowerCase();
  const id = String(item?.id || '').toLowerCase();

  // Image-based quizzes → special category
  if (/_img_/.test(id) || id.startsWith('img_')) return 'Image Based Practice';
  // Diagnostics
  if (id.startsWith('diag_')) return 'Diagnostic';
  // Tool demos
  if (/_tool_demo/.test(id)) return 'Interactive Demos';

  if (subject === 'Social Studies') {
    const civics = [
      'constitution',
      'bill-of-rights',
      'bill_of_rights',
      'elections',
      'federalism',
      'judicial',
      'executive',
      'legislative',
      'civics',
      'government',
      'separation',
      'lawmaking',
      'supreme_court',
      'reading_sources',
    ];
    if (civics.some((k) => title.includes(k) || id.includes(k)))
      return 'Civics & Government';
    if (/econ/.test(id) || /econom/.test(title)) return 'Economics';
    if (/geo/.test(id) && /ss_geo/.test(id)) return 'Geography & the World';
    if (/geography|map.skill/.test(title)) return 'Geography & the World';
    return 'U.S. History';
  }
  if (subject === 'Math') {
    if (
      /(algebra|equation|expression|polynomial|linear|quadratic)/.test(title) ||
      /math_alg|math_algebra|math_graphs/.test(id)
    )
      return 'Algebra & Functions';
    if (
      /(geometry|angle|triang|circle|perimeter|area|volume)/.test(title) ||
      /math_geom|math_geometry/.test(id)
    )
      return 'Geometry & Measurement';
    if (
      /(data|statistic|probability)/.test(title) ||
      /math_data|math_quant_stats|math_quant_bar/.test(id)
    )
      return 'Data Analysis & Probability';
    return 'Number Sense & Operations';
  }
  if (subject === 'Science') {
    if (
      /(cell|ecosystem|biology|life|genetics|heredity|evolution|ecology)/.test(
        title
      ) ||
      /sci_life|sci_ecosystem|sci_genetics/.test(id)
    )
      return 'Life Science';
    if (
      /(earth|space|planet|astronomy|geology|weather|climate|rock)/.test(
        title
      ) ||
      /sci_earth|sci_space/.test(id)
    )
      return 'Earth & Space Science';
    if (
      /(data|measurement|numeracy|graph|scientific.practice|experimental)/.test(
        title
      ) ||
      /sci_data|sci_scientific|sci_numeracy/.test(id)
    )
      return 'Scientific Practices';
    return 'Physical Science';
  }
  if (subject === 'Reasoning Through Language Arts (RLA)') {
    if (
      /(extended.response|essay|constructed.response|writing)/.test(title) ||
      /rla_extended|rla_writing/.test(id)
    )
      return 'Writing & Analysis';
    if (
      /(grammar|usage|conventions|punctuation|editing|language)/.test(title) ||
      /rla_grammar|rla_lang|rla_convention/.test(id)
    )
      return 'Language & Grammar';
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
  let tIdx = cat.topics.findIndex(
    (t) => t && (t.id === topicId || t.title === topicTitle)
  );
  if (tIdx === -1) {
    cat.topics.push({ id: topicId, title: topicTitle, quizzes: [] });
    tIdx = cat.topics.length - 1;
  }
  const topic = cat.topics[tIdx];
  const existing = new Set(
    (topic.quizzes || []).map((q) => q && (q.quizId || q.id))
  );
  const qid =
    quiz.quizId || quiz.id || `${topicId}_quiz_${topic.quizzes.length + 1}`;
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
      out.push({
        subject: subjectName,
        category: 'General',
        topicId: `${subjectName.toLowerCase()}__general`,
        topicTitle: 'General / Mixed',
        quiz: q,
      });
    }
  }
  const cats = subj.categories || {};
  for (const [catName, cat] of Object.entries(cats)) {
    const topics = Array.isArray(cat?.topics) ? cat.topics : [];
    for (const t of topics) {
      // if topic has nested quizzes
      if (Array.isArray(t?.quizzes) && t.quizzes.length) {
        for (const q of t.quizzes) {
          out.push({
            subject: subjectName,
            category: catName,
            topicId: t.id || t.title,
            topicTitle: t.title || t.id || 'Topic',
            quiz: q,
          });
        }
      } else if (Array.isArray(t?.questions) && t.questions.length) {
        // topic-only questions become a single quiz
        out.push({
          subject: subjectName,
          category: catName,
          topicId: t.id || t.title,
          topicTitle: t.title || t.id || 'Topic',
          quiz: {
            title: t.title || 'Quiz',
            questions: t.questions,
            quizId: t.id || undefined,
          },
        });
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
  const filePath = path.join(
    root,
    'frontend',
    'Expanded',
    'expanded.quizzes.bundle.js'
  );
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
      const mod = await import(
        pathToFileURL(path.join(root, 'frontend', 'Expanded', rel)).href
      );
      const arr = mod.default || mod[key] || null;
      if (Array.isArray(arr)) {
        const subj = normalizeSubjectName(
          key?.includes('social')
            ? 'Social Studies'
            : key?.includes('math')
              ? 'Math'
              : key?.includes('science')
                ? 'Science'
                : key?.includes('rla')
                  ? 'Reasoning Through Language Arts (RLA)'
                  : null
        );
        const name =
          subj ||
          (arr[0]?.subject && normalizeSubjectName(arr[0].subject)) ||
          null;
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

function loadSSExtrasJSON() {
  try {
    const p = path.join(
      root,
      'public',
      'quizzes',
      'social-studies.extras.json'
    );
    if (!fs.existsSync(p)) return [];
    const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function loadBackendPremade() {
  try {
    // Canonical premade catalog (includes supplemental topics + text normalization)
    const mod = requireCJS(
      path.join(root, 'backend', 'data', 'quizzes', 'index.js')
    );
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
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  const results = [];
  for (const f of files) {
    const abs = path.join(dir, f);
    try {
      const raw = fs.readFileSync(abs, 'utf8');
      const code = raw.replace(
        /\bconst\s+([A-Za-z0-9_]+)\s*=\s*\{/,
        'var $1 = {'
      );
      const sandbox = {};
      vm.createContext(sandbox);
      new vm.Script(
        code +
          '\n;globalThis.__EXPORTED__ = typeof newMathExams!=="undefined"?newMathExams:undefined;'
      ).runInContext(sandbox, { timeout: 2000 });
      const obj = sandbox.__EXPORTED__;
      if (obj && typeof obj === 'object') results.push({ file: f, data: obj });
    } catch {}
  }
  return results;
}

function subjectSlug(subject) {
  const map = {
    Math: 'math',
    Science: 'science',
    'Social Studies': 'social-studies',
    'Reasoning Through Language Arts (RLA)': 'rla',
    Simulations: 'simulations',
  };
  return map[subject] || subject.toLowerCase().replace(/\s+/g, '-');
}

function buildSubjectPayloads(allEntries) {
  const bySubject = new Map();
  const seenBySubject = new Map();

  for (const entry of allEntries) {
    const subj = normalizeSubjectName(entry.subject);
    if (!subj) continue;
    if (!bySubject.has(subj))
      bySubject.set(subj, createEmptySubjectPayload(subj));
    if (!seenBySubject.has(subj)) seenBySubject.set(subj, new Set());

    const payload = bySubject.get(subj);
    const seen = seenBySubject.get(subj);

    const category =
      entry.category ||
      deriveCategoryFor(subj, entry.quiz || { title: entry.topicTitle });
    const topicId =
      entry.topicId ||
      `${subjectSlug(subj)}__${(entry.topicTitle || 'topic')
        .toLowerCase()
        .replace(/\s+/g, '_')}`;
    const topicTitle = entry.topicTitle || 'Practice Set';

    const quiz = entry.quiz || {
      title: entry.title || 'Quiz',
      questions: entry.questions || [],
    };
    const qid =
      quiz.quizId ||
      quiz.id ||
      `${topicId}_quiz_${(quiz.title || '')
        .toLowerCase()
        .replace(/\s+/g, '_')}`;
    if (seen.has(qid)) continue; // de-dupe
    seen.add(qid);

    pushQuiz(payload, subj, category, topicId, topicTitle, {
      ...quiz,
      quizId: qid,
    });
  }

  return bySubject;
}

function splitSubjectPayload(subjectPayload, maxBytes = 400 * 1024) {
  // Greedy pack categories into chunks under maxBytes
  const cats = Object.entries(subjectPayload.categories);
  const chunks = [];
  let current = { subject: subjectPayload.subject, categories: {} };
  let currentSize = 0;

  function sizeOf(obj) {
    return Buffer.byteLength(JSON.stringify(obj), 'utf8');
  }

  for (const [catName, cat] of cats) {
    const add = { [catName]: cat };
    const tentative = {
      subject: subjectPayload.subject,
      categories: { ...current.categories, ...add },
    };
    const nextSize = sizeOf(tentative);
    if (nextSize > maxBytes && currentSize > 0) {
      chunks.push(current);
      current = {
        subject: subjectPayload.subject,
        categories: { [catName]: cat },
      };
      currentSize = sizeOf(current);
    } else {
      current = tentative;
      currentSize = nextSize;
    }
  }
  if (Object.keys(current.categories).length) chunks.push(current);
  return chunks;
}

function splitSubjectPayloadIntoTwo(subjectPayload) {
  const subject = subjectPayload.subject;
  const cats = Object.entries(subjectPayload.categories || {});
  const sizeOf = (obj) => Buffer.byteLength(JSON.stringify(obj), 'utf8');

  // Precompute approximate weight of each category when isolated
  const weighted = cats
    .map(([catName, cat]) => {
      const payload = { subject, categories: { [catName]: cat } };
      return { catName, cat, weight: sizeOf(payload) };
    })
    .sort((a, b) => b.weight - a.weight);

  const a = { subject, categories: {} };
  const b = { subject, categories: {} };
  let sizeA = sizeOf(a);
  let sizeB = sizeOf(b);

  for (const w of weighted) {
    if (sizeA <= sizeB) {
      a.categories[w.catName] = w.cat;
      sizeA += w.weight;
    } else {
      b.categories[w.catName] = w.cat;
      sizeB += w.weight;
    }
  }

  const out = [];
  if (Object.keys(a.categories).length) out.push(a);
  if (Object.keys(b.categories).length) out.push(b);
  return out;
}

function splitSubjectPayloadMaxParts(
  subjectPayload,
  { maxParts = 2, initialMaxBytes = 400 * 1024 } = {}
) {
  const sizeOf = (obj) => Buffer.byteLength(JSON.stringify(obj), 'utf8');
  const totalSize = sizeOf(subjectPayload);

  // First attempt: keep chunks relatively small.
  let parts = splitSubjectPayload(subjectPayload, initialMaxBytes);
  if (parts.length <= maxParts) return parts;

  // Second attempt: if the whole payload would fit into maxParts chunks,
  // increase the per-chunk max bytes so we don't accidentally create tiny part3 files.
  const target = Math.ceil(totalSize / maxParts);
  const biggerMaxBytes = Math.max(initialMaxBytes, target);
  parts = splitSubjectPayload(subjectPayload, biggerMaxBytes);
  if (parts.length <= maxParts) return parts;

  // Final fallback: enforce exactly 2 parts by bin-packing categories.
  if (maxParts === 2) {
    return splitSubjectPayloadIntoTwo(subjectPayload);
  }
  return parts;
}

async function collectAllSources() {
  const entries = [];

  // 0) Backend unified catalog FIRST so it wins during de-dupe.
  // This is the most complete/authoritative source (includes supplemental topics like Social Studies image questions).
  const premade = loadBackendPremade();
  if (premade) {
    for (const [subjectName, subject] of Object.entries(premade)) {
      const list = enumerateFromSubjectShape(
        normalizeSubjectName(subjectName),
        subject
      );
      entries.push(...list);
    }
  }

  // 1) Frontend ESM
  const esm = await loadFrontendQuizData();
  if (esm) {
    for (const [subjectName, subject] of Object.entries(esm)) {
      const list = enumerateFromSubjectShape(
        normalizeSubjectName(subjectName),
        subject
      );
      entries.push(...list);
    }
  }

  // 2) Expanded bundle
  const bundle = loadExpandedBundle();
  if (bundle) {
    for (const [subjectName, subject] of Object.entries(bundle)) {
      const list = enumerateFromSubjectShape(
        normalizeSubjectName(subjectName),
        subject
      );
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
      const topicId =
        item.id ||
        `${subjectSlug(subj)}_${topicTitle.toLowerCase().replace(/\s+/g, '_')}`;
      const quiz = {
        quizId: item.id || undefined,
        title: item.title || topicTitle,
        questions: Array.isArray(item.questions) ? item.questions : [],
      };
      entries.push({ subject: subj, category: cat, topicId, topicTitle, quiz });
    }
  }

  // 5) quizzes.txt → assume Social Studies
  const qtxt = loadQuizzesTxt();
  if (Array.isArray(qtxt)) {
    for (const q of qtxt) {
      const subj = 'Social Studies';
      const cat = 'U.S. History';
      const topicId =
        q.id ||
        `ss_txt_${(q.title || 'quiz').toLowerCase().replace(/\s+/g, '_')}`;
      const topicTitle = q.title || 'Topic';
      const quiz = {
        quizId: q.id || undefined,
        title: q.title || 'Quiz',
        questions: Array.isArray(q.questions) ? q.questions : [],
      };
      entries.push({ subject: subj, category: cat, topicId, topicTitle, quiz });
    }
  }

  // 6) Social Studies extras (built from ESM into JSON to avoid runtime transpile)
  const ssExtras = loadSSExtrasJSON();
  if (Array.isArray(ssExtras) && ssExtras.length) {
    for (let i = 0; i < ssExtras.length; i++) {
      const q = ssExtras[i];
      const subj = 'Social Studies';
      const cat = deriveCategoryFor(subj, q);
      const topicTitle = q.topic || q.title || 'Practice Set';
      const topicId = q.id || q.quizId || `ss_extra_${i + 1}`;
      const quiz = {
        quizId: q.quizId || q.id || `ss_extra_${i + 1}`,
        title: q.title || topicTitle,
        questions: Array.isArray(q.questions) ? q.questions : [],
      };
      entries.push({ subject: subj, category: cat, topicId, topicTitle, quiz });
    }
  }

  // 7) New Exams (optional, likely Math)
  const newExams = loadNewExams();
  for (const { data } of newExams) {
    for (const [subjectName, subject] of Object.entries(data || {})) {
      const list = enumerateFromSubjectShape(
        normalizeSubjectName(subjectName),
        subject
      );
      entries.push(...list);
    }
  }

  return entries;
}

function curateSocialStudies(payload, target = 66) {
  if (!payload || payload.subject !== 'Social Studies') return payload;
  const prefOrder = [
    'Civics & Government',
    'U.S. History',
    'Economics',
    'Economics / Geography',
    'Geography and the World',
  ];
  const categories = payload.categories || {};
  // Flatten
  const items = [];
  for (const [catName, cat] of Object.entries(categories)) {
    const topics = Array.isArray(cat?.topics) ? cat.topics : [];
    for (const t of topics) {
      const quizzes = Array.isArray(t?.quizzes) ? t.quizzes : [];
      for (const q of quizzes) {
        const key =
          (q.quizId || q.id || '').toLowerCase() ||
          (q.title || '').toLowerCase();
        items.push({
          catName,
          topicId: t.id || t.title || 'Topic',
          topicTitle: t.title || t.id || 'Topic',
          quiz: {
            ...q,
            quizId:
              q.quizId ||
              q.id ||
              `${t.id || 'topic'}_auto_${Math.random()
                .toString(36)
                .slice(2, 7)}`,
          },
          key,
        });
      }
    }
  }
  // De-dupe by id/title key preserving first occurrence
  const seen = new Set();
  const deduped = items.filter((it) => {
    if (!it.key) return true;
    if (seen.has(it.key)) return false;
    seen.add(it.key);
    return true;
  });
  // Sort by preferred category order; keep stable within categories
  const orderIndex = (name) => {
    const idx = prefOrder.findIndex((n) =>
      (name || '').toLowerCase().startsWith(n.toLowerCase())
    );
    return idx === -1 ? 999 : idx;
  };
  deduped.sort((a, b) => orderIndex(a.catName) - orderIndex(b.catName));
  const selected = deduped.slice(0, Math.min(target, deduped.length));
  // Rebuild structure
  const out = { subject: 'Social Studies', categories: {} };
  for (const it of selected) {
    if (!out.categories[it.catName])
      out.categories[it.catName] = { topics: [] };
    const cat = out.categories[it.catName];
    let tIdx = cat.topics.findIndex(
      (t) => t && (t.id === it.topicId || t.title === it.topicTitle)
    );
    if (tIdx === -1) {
      cat.topics.push({ id: it.topicId, title: it.topicTitle, quizzes: [] });
      tIdx = cat.topics.length - 1;
    }
    const topic = cat.topics[tIdx];
    const exists = new Set((topic.quizzes || []).map((q) => q && q.quizId));
    if (!exists.has(it.quiz.quizId)) topic.quizzes.push(it.quiz);
  }
  return out;
}

async function main() {
  const outDir = path.join(root, 'public', 'quizzes');
  ensureDir(outDir);

  const entries = await collectAllSources();
  const bySubject = buildSubjectPayloads(entries);

  for (const [subject, payload] of bySubject.entries()) {
    // Keep the full subject payload so the public snapshots contain all questions.
    const finalPayload = payload;
    const slug = subjectSlug(subject);

    // Remove stale outputs for this subject so old part files don't linger.
    try {
      const files = fs.readdirSync(outDir);
      for (const f of files) {
        if (
          f === `${slug}.quizzes.json` ||
          (/^.+\.quizzes\.part\d+\.json$/i.test(f) &&
            f.startsWith(`${slug}.quizzes.part`))
        ) {
          fs.unlinkSync(path.join(outDir, f));
        }
      }
    } catch {}

    const json = JSON.stringify(finalPayload);
    const size = Buffer.byteLength(json, 'utf8');
    if (size <= 480 * 1024) {
      fs.writeFileSync(path.join(outDir, `${slug}.quizzes.json`), json, 'utf8');
      info(`[WRITE] ${slug}.quizzes.json (${Math.round(size / 1024)} KB)`);
    } else {
      const parts = splitSubjectPayloadMaxParts(finalPayload, {
        maxParts: 2,
        initialMaxBytes: 400 * 1024,
      });
      parts.forEach((chunk, idx) => {
        const j = JSON.stringify(chunk);
        fs.writeFileSync(
          path.join(outDir, `${slug}.quizzes.part${idx + 1}.json`),
          j,
          'utf8'
        );
        info(
          `[WRITE] ${slug}.quizzes.part${idx + 1}.json (${Math.round(
            Buffer.byteLength(j, 'utf8') / 1024
          )} KB)`
        );
      });
    }
  }

  info('[DONE] Built per-subject quiz JSON bundles in public/quizzes');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
