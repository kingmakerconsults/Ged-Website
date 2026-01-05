'use strict';

// Rebuilds the rename mapping (oldUrl -> newUrl) from the current audit refs,
// using the same deterministic numbering scheme as scripts/rename_quiz_images_subject_number.cjs.
//
// This is useful if the mapping file was accidentally rewritten.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AUDIT_ALL_REFS = path.join(ROOT, 'image-audit-all-refs-v2.json');
const OUT_DIR = path.join(ROOT, 'reports');
const OUT_MAP = path.join(OUT_DIR, 'quiz_image_rename_map.json');

const SUBJECT_FOLDER = {
  science: 'Science',
  math: 'Math',
  'social studies': 'Social Studies',
  'reasoning through language arts (rla)': 'RLA',
  rla: 'RLA',
};

const SUBJECT_CODE = {
  Science: 'SCI',
  Math: 'MATH',
  'Social Studies': 'SS',
  RLA: 'RLA',
  Misc: 'MISC',
};

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

function normalizeSubjectFromContext(context) {
  const first = String(context || '')
    .split(' - ')[0]
    .trim();
  const key = first.toLowerCase();
  return SUBJECT_FOLDER[key] || 'Misc';
}

function pad4(n) {
  return String(n).padStart(4, '0');
}

function main() {
  if (!fs.existsSync(AUDIT_ALL_REFS)) {
    die(
      `Missing ${path.relative(
        ROOT,
        AUDIT_ALL_REFS
      )}. Run: node audit-images-v2.cjs`
    );
  }

  const all = readJson(AUDIT_ALL_REFS);
  if (!Array.isArray(all)) die('image-audit-all-refs-v2.json is not an array');

  // Collect unique /images URLs and a representative context for subject grouping.
  const byUrl = new Map();
  for (const item of all) {
    const url = item && item.url;
    const ctx = item && item.context;
    if (!url || typeof url !== 'string') continue;
    if (!url.startsWith('/images/')) continue;

    // Prefer missing refs (these are the ones likely needing rewrite), but keep all unique.
    const existing = byUrl.get(url);
    const subject = normalizeSubjectFromContext(ctx);
    const entry = {
      url,
      subject,
      context: ctx || existing?.context || '',
    };

    if (!existing) {
      byUrl.set(url, entry);
    } else {
      // Keep the first non-empty context
      if (!existing.context && entry.context) existing.context = entry.context;
      // Prefer a non-Misc subject if we have it
      if (existing.subject === 'Misc' && subject !== 'Misc')
        existing.subject = subject;
    }
  }

  const urls = Array.from(byUrl.values());
  if (urls.length === 0) {
    console.log('[rebuild-map] No /images URLs found in audit refs.');
    return;
  }

  // Group by subject and apply deterministic ordering + numbering.
  const grouped = new Map();
  for (const u of urls) {
    if (!grouped.has(u.subject)) grouped.set(u.subject, []);
    grouped.get(u.subject).push(u);
  }

  const planned = [];
  for (const [subjectFolder, items] of grouped.entries()) {
    items.sort((a, b) => {
      const an = path.basename(a.url);
      const bn = path.basename(b.url);
      return an.localeCompare(bn);
    });

    const code = SUBJECT_CODE[subjectFolder] || 'MISC';
    let counter = 1;
    for (const item of items) {
      const ext = path.extname(item.url) || '.png';
      const newFileName = `${code}_${pad4(counter)}${ext.toLowerCase()}`;
      counter++;

      const newUrl = `/images/${encodeURIComponent(
        subjectFolder
      )}/${newFileName}`.replace(/%20/g, ' ');
      planned.push({
        oldUrl: item.url,
        subject: subjectFolder,
        newUrl,
      });
    }
  }

  // Write mapping
  ensureDir(OUT_DIR);
  fs.writeFileSync(
    OUT_MAP,
    JSON.stringify({ generatedAt: new Date().toISOString(), planned }, null, 2)
  );

  console.log(
    `[rebuild-map] Wrote ${planned.length} mappings to ${path.relative(
      ROOT,
      OUT_MAP
    )}`
  );
}

main();
