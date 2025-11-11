#!/usr/bin/env node
/**
 * FIX IMAGE LINKS IN QUIZZES
 *
 * Scans backend quiz files for imageUrl entries and ensures the path matches
 * an existing file under frontend/Images/**. If a different subfolder is found,
 * rewrites the imageUrl to Images/<subdir>/<filename>.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUIZ_ROOT = path.join(ROOT, 'backend', 'data', 'quizzes');
const IMG_ROOT = path.join(ROOT, 'frontend', 'Images');

function log(msg, indent = 0) {
  console.log('  '.repeat(indent) + msg);
}

function listFilesRecursive(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    const items = fs.readdirSync(d, { withFileTypes: true });
    for (const it of items) {
      const p = path.join(d, it.name);
      if (it.isDirectory()) stack.push(p);
      else out.push(p);
    }
  }
  return out;
}

function buildImageIndex() {
  const files = listFilesRecursive(IMG_ROOT);
  const idx = new Map(); // filename -> [absPaths]
  for (const f of files) {
    const name = path.basename(f);
    if (!idx.has(name)) idx.set(name, []);
    idx.get(name).push(f);
  }
  return idx;
}

function fixFile(filePath, imgIndex) {
  const src = fs.readFileSync(filePath, 'utf8');
  const regex = /imageUrl"?\s*:\s*"([^"]+)"/g;
  let m;
  let replaced = 0;
  let newSrc = src;

  while ((m = regex.exec(src)) !== null) {
    const original = m[1]; // e.g., Images/Bosses-of-the-Senate.jpg
    const filename = path.basename(original);
    const hits = imgIndex.get(filename) || [];
    if (hits.length === 0) continue; // nothing to fix

    // Pick the first hit; compute relative URL from /Images
    const hit = hits[0];
    const relFromImages = hit
      .split(/\\|\//)
      .slice(hit.split(/\\|\//).indexOf('Images'))
      .join('/');
    const desired = relFromImages; // already starts with Images/

    if (original !== desired) {
      // Replace this occurrence
      const quotedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const reOne = new RegExp(`(imageUrl"?\s*:\s*")${quotedOriginal}(\")`);
      newSrc = newSrc.replace(reOne, `$1${desired}$2`);
      replaced++;
    }
  }

  if (replaced > 0) {
    fs.writeFileSync(filePath, newSrc, 'utf8');
  }
  return replaced;
}

function main() {
  log('🖼️  Fixing image links in quiz files...');
  const imgIndex = buildImageIndex();

  const subjects = fs
    .readdirSync(QUIZ_ROOT)
    .filter((d) => fs.statSync(path.join(QUIZ_ROOT, d)).isDirectory());
  let totalFixed = 0;
  let filesTouched = 0;

  for (const subj of subjects) {
    const dir = path.join(QUIZ_ROOT, subj);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
    for (const f of files) {
      const p = path.join(dir, f);
      const fixed = fixFile(p, imgIndex);
      if (fixed > 0) {
        totalFixed += fixed;
        filesTouched++;
      }
    }
  }

  log(`\n📊 Results:`);
  log(`Files updated: ${filesTouched}`, 1);
  log(`Links fixed: ${totalFixed}`, 1);
  log(`\n✅ Image link fixing complete.`);
}

main();
