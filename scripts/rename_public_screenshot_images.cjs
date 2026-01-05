#!/usr/bin/env node
'use strict';

/*
  Rename all public images whose filenames contain "screenshot".

  Goal:
    - No files in frontend/public/images/** may contain "screenshot" in their name.
    - Rename into a uniform scheme: unclassified_####.<ext> (per subject)
    - Emit mapping to reports/public_screenshot_rename_map.json

  Usage:
    node scripts/rename_public_screenshot_images.cjs

  Notes:
    - This script only renames screenshot* files to avoid churn.
    - After running it, run:
        node scripts/rewrite_quiz_image_urls_from_map.cjs --map reports/public_screenshot_rename_map.json
        node scripts/migrate_image_metadata_to_public.cjs --verify --prune-missing
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_IMAGES = path.join(ROOT, 'frontend', 'public', 'images');
const REPORTS = path.join(ROOT, 'reports');
const OUT_MAP = path.join(REPORTS, 'public_screenshot_rename_map.json');

const IMG_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function uuid() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : crypto.randomBytes(16).toString('hex');
}

function isImageFile(name) {
  return IMG_EXTS.has(path.extname(name).toLowerCase());
}

function listSubjectDirs() {
  if (!fs.existsSync(PUBLIC_IMAGES)) return [];
  return fs
    .readdirSync(PUBLIC_IMAGES, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function pad4(n) {
  return String(n).padStart(4, '0');
}

function nextAvailableName(dirAbs, base, ext) {
  // finds unclassified_0001.png etc, skipping existing
  const used = new Set();
  for (const f of fs.readdirSync(dirAbs)) {
    used.add(f);
  }
  let i = 1;
  while (i < 100000) {
    const candidate = `${base}_${pad4(i)}${ext}`;
    if (!used.has(candidate)) return candidate;
    i += 1;
  }
  throw new Error(`Could not allocate name in ${dirAbs} for ${base}${ext}`);
}

function main() {
  if (!fs.existsSync(PUBLIC_IMAGES)) {
    console.error('Missing public images folder:', PUBLIC_IMAGES);
    process.exit(2);
  }

  ensureDir(REPORTS);

  const planned = [];
  const subjectDirs = listSubjectDirs();

  for (const subjectFolder of subjectDirs) {
    const subjectDirAbs = path.join(PUBLIC_IMAGES, subjectFolder);

    const screenshotFiles = fs
      .readdirSync(subjectDirAbs)
      .filter((f) => isImageFile(f))
      .filter((f) => f.toLowerCase().includes('screenshot'))
      .sort((a, b) => a.localeCompare(b));

    if (screenshotFiles.length === 0) continue;

    // Phase 1: temp rename to avoid collisions
    const tempNames = new Map();
    for (const oldFileName of screenshotFiles) {
      const ext = path.extname(oldFileName);
      const tempName = `__tmp__${uuid()}${ext}`;
      fs.renameSync(
        path.join(subjectDirAbs, oldFileName),
        path.join(subjectDirAbs, tempName)
      );
      tempNames.set(oldFileName, tempName);
    }

    // Phase 2: final rename to uniform naming
    for (const oldFileName of screenshotFiles) {
      const ext = path.extname(oldFileName);
      const newFileName = nextAvailableName(subjectDirAbs, 'unclassified', ext);
      const tempName = tempNames.get(oldFileName);

      const oldAbs = path.join(subjectDirAbs, oldFileName);
      const newAbs = path.join(subjectDirAbs, newFileName);

      fs.renameSync(path.join(subjectDirAbs, tempName), newAbs);

      planned.push({
        subjectFolder,
        oldAbs,
        newAbs,
        oldFileName,
        newFileName,
        oldUrl: `/images/${subjectFolder}/${oldFileName}`,
        newUrl: `/images/${subjectFolder}/${newFileName}`,
      });
    }
  }

  const out = {
    generatedAt: new Date().toISOString(),
    planned,
  };

  fs.writeFileSync(OUT_MAP, JSON.stringify(out, null, 2) + '\n', 'utf8');

  console.log(`[rename-screenshots] Renamed ${planned.length} files.`);
  console.log(
    `[rename-screenshots] Mapping written: ${path.relative(ROOT, OUT_MAP)}`
  );
}

main();
