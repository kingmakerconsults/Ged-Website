'use strict';

// Renames ALL images under frontend/public/images/{Science,Math,Social Studies,RLA} to:
//   <topic>_<####>.<ext>
// where <topic> is inferred from:
//   1) quiz topic context (from image-audit-all-refs-v2.json), else
//   2) the current filename (stripping hash-like suffixes, trailing numbers, etc)
//
// Also rewrites ALL repo references to the old image URLs.
//
// Output mapping: reports/public_image_topic_rename_map.json

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AUDIT_ALL_REFS = path.join(ROOT, 'image-audit-all-refs-v2.json');
const PUBLIC_IMAGES_ROOT = path.join(ROOT, 'frontend', 'public', 'images');
const OUT_DIR = path.join(ROOT, 'reports');
const OUT_MAP = path.join(OUT_DIR, 'public_image_topic_rename_map.json');

const SUBJECTS = new Set(['Science', 'Math', 'Social Studies', 'RLA']);
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']);

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.cache',
  'reports',
]);

const INCLUDE_EXT = new Set([
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.md',
  '.txt',
]);

function die(msg) {
  console.error(msg);
  process.exit(1);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function normalizeUrl(u) {
  let url = String(u || '').trim();
  if (!url) return '';
  if (/^\/\/images\//i.test(url)) url = '/' + url.replace(/^\/+/g, '');
  return url;
}

function parseContext(context) {
  const parts = String(context || '')
    .split(' - ')
    .map((p) => p.trim());
  const subject = parts[0] || '';
  const topic = parts[2] || '';
  return { subject, topic };
}

function slugifyTopic(topic) {
  const raw = String(topic || '').trim();
  if (!raw) return 'topic';

  let s = raw.toLowerCase();
  s = s.replace(/\([^)]*\)/g, '');
  s = s.replace(/&/g, ' and ');
  s = s.replace(/[^a-z0-9]+/g, '_');
  s = s.replace(/^_+|_+$/g, '');
  s = s.replace(/_+/g, '_');

  if (!s) s = 'topic';
  if (s.length > 48) s = s.slice(0, 48).replace(/_+$/g, '');
  return s || 'topic';
}

function inferTopicFromFilename(fileName) {
  const ext = path.extname(fileName);
  let base = path.basename(fileName, ext);

  // Common cleanup
  base = base.replace(/\([^)]*\)\s*$/g, ''); // trailing (13)
  base = base.replace(/\s+\d+$/g, ''); // trailing number
  base = base.replace(/[-\s]+/g, '_');

  // Strip hash-like suffix: foo_87ff460e, foo_87ff460ed017..., foo-87ff...
  const mHash = base.match(/^(.*?)[_\-]([0-9a-f]{8,40})$/i);
  if (mHash && mHash[1]) base = mHash[1];

  // Strip common suffix variants like _final, _v2, etc (keep if it would empty)
  base = base.replace(/_(final|v\d+|copy)$/i, '');

  base = base.replace(/^_+|_+$/g, '');
  base = base.replace(/_+/g, '_');

  // If filename is super generic, bucket it
  if (!base || base.length < 3) base = 'uncategorized';

  // Special-case screenshots
  if (/^screenshot/i.test(fileName)) base = 'screenshot';

  return slugifyTopic(base);
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walkFiles(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

function collectPublicImages() {
  const images = [];
  for (const subj of SUBJECTS) {
    const dir = path.join(PUBLIC_IMAGES_ROOT, subj);
    if (!fs.existsSync(dir)) continue;
    for (const abs of walkFiles(dir, [])) {
      const ext = path.extname(abs).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;
      images.push({ abs, subjectFolder: subj, fileName: path.basename(abs) });
    }
  }
  return images;
}

function buildQuizTopicByAbsPath(auditAll) {
  // Choose a primary topic per absolute path based on most frequent context.
  const byAbs = new Map();

  for (const item of auditAll) {
    if (!item || !item.exists) continue;
    if (!item.path) continue;

    const url = normalizeUrl(item.url);
    if (!url.startsWith('/images/')) continue;

    const { subject, topic } = parseContext(item.context);
    const subjectFolder = SUBJECTS.has(subject) ? subject : null;
    if (!subjectFolder) continue;

    const topicSlug = slugifyTopic(topic);

    if (!byAbs.has(item.path)) {
      byAbs.set(item.path, new Map([[topicSlug, 1]]));
    } else {
      const m = byAbs.get(item.path);
      m.set(topicSlug, (m.get(topicSlug) || 0) + 1);
    }
  }

  const out = new Map();
  for (const [abs, counts] of byAbs.entries()) {
    const keys = Array.from(counts.keys()).sort((a, b) => {
      const ca = counts.get(a) || 0;
      const cb = counts.get(b) || 0;
      if (cb !== ca) return cb - ca;
      return a.localeCompare(b);
    });
    out.set(abs, keys[0]);
  }
  return out;
}

function computeOldUrlVariants(subjectFolder, fileName) {
  const baseUrl = `/images/${subjectFolder}/${fileName}`;
  const encSubject = encodeURIComponent(subjectFolder);
  const encFile = encodeURIComponent(fileName);
  const encUrl = `/images/${encSubject}/${encFile}`;

  const suffix = `${subjectFolder}/${fileName}`;
  const suffixEnc = `${encSubject}/${encFile}`;

  return Array.from(
    new Set([
      baseUrl,
      encUrl,
      `Images/${suffix}`,
      `images/${suffix}`,
      `//images/${suffix}`,
      `Images/${suffixEnc}`,
      `images/${suffixEnc}`,
      `//images/${suffixEnc}`,
    ])
  );
}

function planRenames(images, quizTopicByAbs) {
  // Group by subject + topicSlug
  const groups = new Map();

  for (const img of images) {
    const topicSlug =
      quizTopicByAbs.get(img.abs) || inferTopicFromFilename(img.fileName);
    const groupKey = `${img.subjectFolder}::${topicSlug}`;
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push({ ...img, topicSlug });
  }

  const planned = [];
  for (const [key, items] of groups.entries()) {
    const [subjectFolder, topicSlug] = key.split('::');

    items.sort((a, b) =>
      a.fileName.localeCompare(b.fileName, undefined, { sensitivity: 'base' })
    );

    let counter = 1;
    for (const item of items) {
      const ext = path.extname(item.fileName).toLowerCase();
      const newFileName = `${topicSlug}_${String(counter).padStart(
        4,
        '0'
      )}${ext}`;
      counter++;

      const newAbs = path.join(PUBLIC_IMAGES_ROOT, subjectFolder, newFileName);
      const newUrl = `/images/${subjectFolder}/${newFileName}`;

      planned.push({
        subjectFolder,
        topicSlug,
        oldAbs: item.abs,
        oldFileName: item.fileName,
        newAbs,
        newFileName,
        newUrl,
        oldUrlVariants: computeOldUrlVariants(subjectFolder, item.fileName),
      });
    }
  }

  // Detect destination collisions
  const destSet = new Set();
  for (const p of planned) {
    const k = p.newAbs.toLowerCase();
    if (destSet.has(k)) die(`Planned destination collision: ${p.newAbs}`);
    destSet.add(k);
  }

  return planned;
}

function renameWithTemp(planned) {
  // Two-phase rename to avoid collisions.
  const need = planned.filter(
    (p) => path.resolve(p.oldAbs) !== path.resolve(p.newAbs)
  );
  if (need.length === 0) return;

  const tmpMoves = [];
  let i = 0;
  for (const p of need) {
    if (!fs.existsSync(p.oldAbs)) die(`Missing source file: ${p.oldAbs}`);
    ensureDir(path.dirname(p.newAbs));

    const ext = path.extname(p.oldAbs);
    const tmpAbs = p.oldAbs + `.__tmp_rename_${Date.now()}_${i++}${ext}`;
    fs.renameSync(p.oldAbs, tmpAbs);
    tmpMoves.push({ tmpAbs, finalAbs: p.newAbs });
  }

  for (const m of tmpMoves) {
    if (fs.existsSync(m.finalAbs)) {
      die(`Destination already exists during finalize: ${m.finalAbs}`);
    }
    fs.renameSync(m.tmpAbs, m.finalAbs);
  }
}

function rewriteReferences(planned) {
  const pairs = [];
  for (const p of planned) {
    for (const from of p.oldUrlVariants) {
      pairs.push({ from, to: p.newUrl });
    }
  }
  pairs.sort((a, b) => b.from.length - a.from.length);

  const files = walkFiles(ROOT, []).filter((f) =>
    INCLUDE_EXT.has(path.extname(f).toLowerCase())
  );
  const changed = [];

  for (const filePath of files) {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    if (rel === 'image-audit-all-refs-v2.json') continue;
    if (rel === 'image-audit-detailed-report-v2.json') continue;

    let text;
    try {
      text = fs.readFileSync(filePath, 'utf8');
    } catch {
      continue;
    }

    let next = text;
    for (const r of pairs) {
      if (next.includes(r.from)) next = next.split(r.from).join(r.to);
    }

    if (next !== text) {
      fs.writeFileSync(filePath, next, 'utf8');
      changed.push(filePath);
    }
  }

  return changed;
}

function main() {
  if (!fs.existsSync(AUDIT_ALL_REFS)) {
    die(
      `Missing ${path.basename(AUDIT_ALL_REFS)}. Run: node audit-images-v2.cjs`
    );
  }

  ensureDir(OUT_DIR);

  const auditAll = readJson(AUDIT_ALL_REFS);
  if (!Array.isArray(auditAll))
    die('image-audit-all-refs-v2.json is not an array');

  const images = collectPublicImages();
  console.log(
    `[all-public-rename] Found ${images.length} images under frontend/public/images subjects.`
  );

  const quizTopicByAbs = buildQuizTopicByAbsPath(auditAll);
  const planned = planRenames(images, quizTopicByAbs);

  console.log(`[all-public-rename] Planned renames: ${planned.length}`);

  renameWithTemp(planned);

  const changedFiles = rewriteReferences(planned);

  const report = {
    generatedAt: new Date().toISOString(),
    planned: planned.map((p) => ({
      subjectFolder: p.subjectFolder,
      topicSlug: p.topicSlug,
      oldAbs: p.oldAbs,
      newAbs: p.newAbs,
      oldFileName: p.oldFileName,
      newFileName: p.newFileName,
      newUrl: p.newUrl,
    })),
    changedFiles,
  };

  fs.writeFileSync(OUT_MAP, JSON.stringify(report, null, 2));
  console.log(
    `[all-public-rename] Rewrote references in ${changedFiles.length} files.`
  );
  console.log(
    `[all-public-rename] Mapping report: ${path.relative(ROOT, OUT_MAP)}`
  );
}

main();
