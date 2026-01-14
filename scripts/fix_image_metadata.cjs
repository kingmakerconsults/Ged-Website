/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IMAGE_ROOT = path.join(ROOT, 'frontend', 'public', 'images');
const META_PATH = path.join(ROOT, 'backend', 'image_metadata_final.json');
const META_FALLBACK_PATH = path.join(ROOT, 'backend', 'data', 'image_metadata_final.json');
const REPORTS_DIR = path.join(ROOT, 'reports');

function isImageFile(name) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(name);
}

function normSubject(s) {
  s = String(s || '').trim();
  if (!s) return '';
  const map = {
    rla: 'RLA',
    'reasoning through language arts (rla)': 'RLA',
    'social studies': 'Social Studies',
    science: 'Science',
    math: 'Math',
  };
  const key = s.toLowerCase();
  return map[key] || s;
}

function makeKey(subject, fileName) {
  return `${normSubject(subject).toLowerCase()}|${String(fileName || '').toLowerCase()}`;
}

function listSubjectImages() {
  const out = [];
  const subjects = fs.readdirSync(IMAGE_ROOT, { withFileTypes: true });
  for (const ent of subjects) {
    if (!ent.isDirectory()) continue;
    const subject = normSubject(ent.name);
    const dir = path.join(IMAGE_ROOT, ent.name);
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const f of files) {
      if (!f.isFile()) continue;
      if (!isImageFile(f.name)) continue;
      out.push({ subject, fileName: f.name, abs: path.join(dir, f.name) });
    }
  }
  return out;
}

function canonicalFilePath(subject, fileName) {
  // Encode but keep slashes clean
  const s = encodeURIComponent(normSubject(subject));
  const f = encodeURIComponent(String(fileName)).replace(/%2F/g, '/');
  return `/images/${s}/${f}`;
}

function baseEntry(subject, fileName) {
  const cleanSubject = normSubject(subject);
  const cleanFile = String(fileName);
  const tokens = cleanFile
    .replace(/\.[^.]+$/, '')
    .replace(/_\d{4,}$/, '')
    .replace(/[_-]+/g, ' ')
    .trim();

  const keywords = Array.from(
    new Set(
      tokens
        .split(/\s+/)
        .map((t) => t.toLowerCase())
        .filter(Boolean)
        .slice(0, 12)
    )
  );

  // Ensure a minimally useful keyword set even for generic filenames like "unclassified_0001.png".
  if (keywords.length < 3) {
    const subjectWords = String(cleanSubject)
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    for (const w of subjectWords) {
      if (keywords.length >= 3) break;
      if (!keywords.includes(w)) keywords.push(w);
    }
  }
  if (keywords.length < 3) {
    for (const w of ['ged', 'practice', 'education']) {
      if (keywords.length >= 3) break;
      if (!keywords.includes(w)) keywords.push(w);
    }
  }

  return {
    fileName: cleanFile,
    subject: cleanSubject,
    filePath: canonicalFilePath(cleanSubject, cleanFile),
    category: '',
    altText: tokens ? `Image: ${tokens}` : `Image: ${cleanFile}`,
    detailedDescription: tokens
      ? `An educational image related to ${tokens}. Use it as a visual prompt for GED practice questions.`
      : 'An educational image used as a visual prompt for GED practice questions.',
    extractedText: '',
    visualElements: [],
    keywords,
    questionSeeds: [],
    usageDirectives: '',
  };
}

function ensureShape(entry) {
  const out = { ...entry };
  out.fileName = String(out.fileName || '');
  out.subject = normSubject(out.subject || '');
  out.filePath = canonicalFilePath(out.subject, out.fileName);
  if (typeof out.category !== 'string') out.category = '';
  if (typeof out.altText !== 'string') out.altText = '';
  if (typeof out.detailedDescription !== 'string') out.detailedDescription = '';
  if (typeof out.extractedText !== 'string') out.extractedText = '';
  if (!Array.isArray(out.visualElements)) out.visualElements = [];
  if (!Array.isArray(out.keywords)) out.keywords = [];
  if (!Array.isArray(out.questionSeeds)) out.questionSeeds = [];
  if (typeof out.usageDirectives !== 'string') out.usageDirectives = '';
  return out;
}

function main() {
  const args = new Set(process.argv.slice(2));
  const write = args.has('--write');

  if (!fs.existsSync(META_PATH)) {
    console.error('Metadata file not found:', META_PATH);
    process.exit(1);
  }

  const raw = fs.readFileSync(META_PATH, 'utf8');
  const meta = JSON.parse(raw);
  if (!Array.isArray(meta)) {
    console.error('Metadata is not an array.');
    process.exit(1);
  }

  const files = listSubjectImages();
  const fileMap = new Map(files.map((f) => [makeKey(f.subject, f.fileName), f]));

  // Index by filename to help relocate mis-subjected entries
  const byName = new Map();
  for (const f of files) {
    const nameKey = f.fileName.toLowerCase();
    const arr = byName.get(nameKey) || [];
    arr.push(f);
    byName.set(nameKey, arr);
  }

  const fixed = [];
  const seen = new Set();

  let kept = 0;
  let pruned = 0;
  let moved = 0;
  let filled = 0;

  for (const entry of meta) {
    if (!entry || typeof entry !== 'object') continue;
    const subj = normSubject(entry.subject || '');
    const fileName = String(entry.fileName || '');
    if (!subj || !fileName) continue;

    const k = makeKey(subj, fileName);

    if (fileMap.has(k)) {
      const normalized = ensureShape(entry);
      const outKey = makeKey(normalized.subject, normalized.fileName);
      if (!seen.has(outKey)) {
        fixed.push(normalized);
        seen.add(outKey);
        kept++;
      }
      continue;
    }

    // Try relocate by filename if unique
    const candidates = byName.get(fileName.toLowerCase()) || [];
    if (candidates.length === 1) {
      const correct = candidates[0];
      const normalized = ensureShape({ ...entry, subject: correct.subject });
      const outKey = makeKey(normalized.subject, normalized.fileName);
      if (!seen.has(outKey)) {
        fixed.push(normalized);
        seen.add(outKey);
        moved++;
      }
      continue;
    }

    // Ambiguous or missing on disk: prune
    pruned++;
  }

  // Add base entries for any missing files
  for (const f of files) {
    const k = makeKey(f.subject, f.fileName);
    if (seen.has(k)) continue;
    fixed.push(baseEntry(f.subject, f.fileName));
    seen.add(k);
    filled++;
  }

  // Ensure the 3 known incomplete entries (or any incomplete) have minimally useful fields
  for (let i = 0; i < fixed.length; i++) {
    const e = fixed[i];
    const needs =
      !e.altText ||
      !e.detailedDescription ||
      !Array.isArray(e.keywords) ||
      e.keywords.length < 3;
    if (!needs) continue;
    const b = baseEntry(e.subject, e.fileName);
    fixed[i] = {
      ...e,
      altText: e.altText || b.altText,
      detailedDescription: e.detailedDescription || b.detailedDescription,
      keywords: Array.isArray(e.keywords) && e.keywords.length >= 3 ? e.keywords : b.keywords,
      filePath: canonicalFilePath(e.subject, e.fileName),
    };
  }

  // Sort stable
  fixed.sort((a, b) => {
    const sa = String(a.subject || '').toLowerCase();
    const sb = String(b.subject || '').toLowerCase();
    if (sa < sb) return -1;
    if (sa > sb) return 1;
    const fa = String(a.fileName || '').toLowerCase();
    const fb = String(b.fileName || '').toLowerCase();
    return fa.localeCompare(fb);
  });

  const summary = {
    imageFilesOnDisk: files.length,
    inputMetadataEntries: meta.length,
    outputMetadataEntries: fixed.length,
    kept,
    moved,
    pruned,
    addedMissing: filled,
  };

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(REPORTS_DIR, `image_metadata_final.backup.${stamp}.json`);
  fs.writeFileSync(backupPath, raw);

  if (write) {
    fs.writeFileSync(META_PATH, JSON.stringify(fixed, null, 2));
    if (fs.existsSync(path.dirname(META_FALLBACK_PATH))) {
      fs.writeFileSync(META_FALLBACK_PATH, JSON.stringify(fixed, null, 2));
    }
  }

  fs.writeFileSync(
    path.join(REPORTS_DIR, 'image_metadata_fix_summary.json'),
    JSON.stringify({ summary, backupPath, wrote: write }, null, 2)
  );

  console.log(JSON.stringify({ summary, backupPath, wrote: write }, null, 2));
  if (!write) {
    console.log('\nDry-run only. Re-run with --write to apply changes.');
  }
}

main();
