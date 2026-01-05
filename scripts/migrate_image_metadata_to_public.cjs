#!/usr/bin/env node
/*
  Migrate image metadata to use the canonical public image library:
  - Canonical URLs: /images/<Subject>/<fileName>
  - Canonical disk: frontend/public/images/<Subject>/<fileName>

  Also normalizes legacy variants:
  - /frontend/Images/... -> /images/...
  - /frontend//images/... -> /images/...

  Optionally uses the public rename map (reports/public_image_topic_rename_map.json)
  to rewrite legacy filenames to renamed filenames.

  Usage:
    node scripts/migrate_image_metadata_to_public.cjs
    node scripts/migrate_image_metadata_to_public.cjs --verify
*/

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const FRONTEND_PUBLIC_IMAGES = path.join(
  REPO_ROOT,
  'frontend',
  'public',
  'images'
);

const META_PRIMARY = path.join(
  REPO_ROOT,
  'backend',
  'image_metadata_final.json'
);
const META_FALLBACK = path.join(
  REPO_ROOT,
  'backend',
  'data',
  'image_metadata_final.json'
);

const RENAME_MAP_PATH = path.join(
  REPO_ROOT,
  'reports',
  'public_image_topic_rename_map.json'
);
const SCREENSHOT_RENAME_MAP_PATH = path.join(
  REPO_ROOT,
  'reports',
  'public_screenshot_rename_map.json'
);

const VERIFY_REPORT_PATH = path.join(
  REPO_ROOT,
  'reports',
  'image_metadata_missing_public.json'
);

const VALID_SUBJECTS = new Set(['Math', 'Science', 'Social Studies', 'RLA']);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function normalizeSlashes(p) {
  return String(p || '').replace(/\\/g, '/');
}

function getTail(p) {
  const clean = normalizeSlashes(p);
  const idx = clean.lastIndexOf('/');
  return idx >= 0 ? clean.slice(idx + 1) : clean;
}

function coerceSubject(raw) {
  if (!raw) return '';
  const s = String(raw).replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  // common variants
  if (/^social\s*studies$/i.test(s) || /^socialstudies$/i.test(s))
    return 'Social Studies';
  if (/^rla$/i.test(s)) return 'RLA';
  if (/^math$/i.test(s)) return 'Math';
  if (/^science$/i.test(s)) return 'Science';
  return s;
}

function inferSubjectFromPath(filePath) {
  const p = normalizeSlashes(filePath).toLowerCase();
  if (p.includes('/science/')) return 'Science';
  if (p.includes('/math/')) return 'Math';
  if (p.includes('/rla/')) return 'RLA';
  if (
    p.includes('/social studies/') ||
    p.includes('/social_studies/') ||
    p.includes('/socialstudies/')
  ) {
    return 'Social Studies';
  }
  return '';
}

function buildRenameIndex(renameMap) {
  // index by old file name -> new file name (subject-agnostic)
  const idx = new Map();
  const rows = Array.isArray(renameMap)
    ? renameMap
    : Array.isArray(renameMap?.planned)
    ? renameMap.planned
    : [];

  for (const rec of rows) {
    if (!rec || typeof rec !== 'object') continue;
    const oldName = rec.oldFileName || getTail(rec.oldAbs || '');
    const newName = rec.newFileName || getTail(rec.newAbs || '');
    if (oldName && newName) idx.set(oldName, newName);
  }
  return idx;
}

function existsInPublic(subject, fileName) {
  if (!subject || !fileName) return false;
  const abs = path.join(FRONTEND_PUBLIC_IMAGES, subject, fileName);
  try {
    return fs.existsSync(abs) && fs.statSync(abs).isFile();
  } catch {
    return false;
  }
}

function listPublicSubjects() {
  try {
    return fs
      .readdirSync(FRONTEND_PUBLIC_IMAGES, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((s) => VALID_SUBJECTS.has(coerceSubject(s)));
  } catch {
    return [];
  }
}

function buildPublicFileIndex(subjects) {
  // Map: filename -> subject (only when unique)
  const hits = new Map();
  for (const subject of subjects) {
    const subj = coerceSubject(subject);
    const dir = path.join(FRONTEND_PUBLIC_IMAGES, subj);
    let files = [];
    try {
      files = fs.readdirSync(dir);
    } catch {
      continue;
    }
    for (const f of files) {
      const key = f;
      const prev = hits.get(key);
      if (!prev) {
        hits.set(key, subj);
      } else if (prev !== subj) {
        // mark ambiguous
        hits.set(key, null);
      }
    }
  }
  return hits;
}

function normalizeToImagesUrl(subject, fileName) {
  const subj = coerceSubject(subject);
  return `/images/${subj}/${fileName}`;
}

function normalizeEntry(im, renameIdx, publicIndex) {
  const original = { ...im };

  const rawFilePath = safeDecode(im.filePath || im.src || im.path || '');
  const rawFileName = safeDecode(im.fileName || '');

  let subject = coerceSubject(
    im.subject ||
      inferSubjectFromPath(rawFilePath) ||
      inferSubjectFromPath(rawFileName)
  );

  let fileName = rawFileName || getTail(rawFilePath);

  // Normalize legacy filePath prefixes
  let filePath = normalizeSlashes(rawFilePath);
  if (filePath.startsWith('/frontend//images/'))
    filePath = filePath.replace(/^\/frontend\/\/images\//, '/images/');
  if (filePath.startsWith('/frontend/images/'))
    filePath = filePath.replace(/^\/frontend\/images\//, '/images/');
  if (filePath.startsWith('/frontend/Images/'))
    filePath = filePath.replace(/^\/frontend\/Images\//, '/images/');

  // If filePath already points to /images, use its tail as preferred filename
  if (filePath.startsWith('/images/')) {
    const tail = getTail(filePath);
    if (tail) fileName = tail;
  }

  // If we still have a legacy filename, apply rename map
  if (renameIdx && renameIdx.has(fileName)) {
    fileName = renameIdx.get(fileName);
  }

  // Canonicalize fileName to match on-disk file
  const subjectCandidateFromIndex = publicIndex?.get(fileName) || '';
  if (subjectCandidateFromIndex && subjectCandidateFromIndex !== subject) {
    subject = subjectCandidateFromIndex;
  }
  if (subject && fileName) {
    filePath = normalizeToImagesUrl(subject, fileName);
  }

  const out = { ...im };
  out.subject = subject || im.subject || '';
  out.fileName = fileName || out.fileName || '';
  out.filePath = filePath || out.filePath || '';

  // Minimal hygiene: ensure fileName matches filePath tail when possible
  const tail = getTail(out.filePath);
  if (tail) out.fileName = tail;

  // Remove any accidental empty double slashes in /images path
  out.filePath = normalizeSlashes(out.filePath).replace(
    /\/images\/+/,
    '/images/'
  );

  // If we somehow broke structure, fall back
  if (!out.filePath || !out.fileName) {
    return original;
  }

  return out;
}

function migrateFile(filePath, renameIdx, publicIndex, verify, verifyReport) {
  if (!fs.existsSync(filePath)) {
    console.log(`- Skipping (missing): ${path.relative(REPO_ROOT, filePath)}`);
    return { changed: 0, total: 0, missing: 0 };
  }

  const data = readJson(filePath);
  if (!Array.isArray(data)) {
    throw new Error(`Metadata file is not an array: ${filePath}`);
  }

  const originalCount = data.length;

  let changed = 0;
  let missingDuringMigration = 0;

  const pruneMissing = process.argv.includes('--prune-missing');

  const migrated = data
    .map((im) => {
      const before = JSON.stringify(im);
      const afterObj = normalizeEntry(im, renameIdx, publicIndex);
      const after = JSON.stringify(afterObj);
      if (before !== after) changed++;

      if (verify) {
        const subject = coerceSubject(
          afterObj.subject || inferSubjectFromPath(afterObj.filePath)
        );
        const fn = afterObj.fileName || getTail(afterObj.filePath);
        const ok = existsInPublic(subject, fn);
        if (!ok) {
          missingDuringMigration++;
          if (Array.isArray(verifyReport)) {
            verifyReport.push({
              metadataFile: path.relative(REPO_ROOT, filePath),
              subject,
              fileName: fn,
              filePath: afterObj.filePath,
              id: afterObj.id || '',
            });
          }

          if (pruneMissing) {
            return null;
          }
        }
      }

      return afterObj;
    })
    .filter(Boolean);

  // stable-ish ordering by subject then fileName
  migrated.sort((a, b) => {
    const sa = String(a.subject || '').toLowerCase();
    const sb = String(b.subject || '').toLowerCase();
    if (sa < sb) return -1;
    if (sa > sb) return 1;
    const fa = String(a.fileName || '').toLowerCase();
    const fb = String(b.fileName || '').toLowerCase();
    return fa.localeCompare(fb);
  });

  writeJson(filePath, migrated);

  let missingAfterWrite = 0;
  if (verify) {
    for (const im of migrated) {
      const subject = coerceSubject(
        im.subject || inferSubjectFromPath(im.filePath)
      );
      const fn = im.fileName || getTail(im.filePath);
      if (!existsInPublic(subject, fn)) missingAfterWrite++;
    }
  }

  const removed = originalCount - migrated.length;

  console.log(
    `- Migrated: ${path.relative(REPO_ROOT, filePath)} (changed ${changed}/${
      migrated.length
    }` +
      `${removed > 0 ? `, removed ${removed}` : ''}` +
      `${verify ? `, missing ${missingAfterWrite}` : ''})`
  );
  return {
    changed,
    total: migrated.length,
    removed,
    missingDuringMigration,
    missingAfterWrite,
  };
}

function main() {
  const verify = process.argv.includes('--verify');
  const verifyReport = [];
  const pruneMissing = process.argv.includes('--prune-missing');

  let renameIdx = new Map();
  const renameMapsToLoad = [
    { label: 'topic', path: RENAME_MAP_PATH },
    { label: 'screenshot', path: SCREENSHOT_RENAME_MAP_PATH },
  ];
  let loadedAny = false;
  for (const r of renameMapsToLoad) {
    if (!fs.existsSync(r.path)) continue;
    try {
      const renameMap = readJson(r.path);
      const idx = buildRenameIndex(renameMap);
      for (const [k, v] of idx.entries()) renameIdx.set(k, v);
      console.log(
        `Loaded rename map (${r.label}): ${path.relative(REPO_ROOT, r.path)} (${
          idx.size
        } entries)`
      );
      loadedAny = true;
    } catch (e) {
      console.warn('Failed to read rename map:', r.path, e.message);
    }
  }
  if (!loadedAny) {
    console.warn(
      'No rename maps found; proceeding without filename rewrite indexes.'
    );
  }

  // Ensure public images root exists
  if (!fs.existsSync(FRONTEND_PUBLIC_IMAGES)) {
    throw new Error(
      `Public images folder not found: ${FRONTEND_PUBLIC_IMAGES}`
    );
  }

  const publicSubjects = listPublicSubjects();
  const publicIndex = buildPublicFileIndex(publicSubjects);

  console.log(
    `Migrating metadata to /images/...${
      pruneMissing ? ' (prune-missing ON)' : ''
    }`
  );

  const a = migrateFile(
    META_FALLBACK,
    renameIdx,
    publicIndex,
    verify,
    verifyReport
  );
  const b = migrateFile(
    META_PRIMARY,
    renameIdx,
    publicIndex,
    verify,
    verifyReport
  );

  if (verify) {
    const totalMissing =
      (a.missingAfterWrite || 0) + (b.missingAfterWrite || 0);
    try {
      writeJson(VERIFY_REPORT_PATH, verifyReport);
      console.log(
        `Wrote missing report: ${path.relative(
          REPO_ROOT,
          VERIFY_REPORT_PATH
        )} (${verifyReport.length} entries)`
      );
    } catch (e) {
      console.warn('Failed to write missing report:', e.message);
    }
    if (totalMissing > 0) {
      console.warn(
        `Verification: ${totalMissing} metadata entries did not resolve to a file under frontend/public/images.`
      );
      process.exitCode = 2;
    } else {
      console.log('Verification: all checked entries resolve to disk ✅');
    }
  }
}

main();
