'use strict';

// Rewrites image URLs across the repo using reports/quiz_image_rename_map.json.
// This is intended to be run after scripts/rename_quiz_images_subject_number.cjs moved/renamed files.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_MAP_PATH = path.join(
  ROOT,
  'reports',
  'quiz_image_rename_map.json'
);

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return null;
}

const MAP_PATH = (() => {
  const raw = getArgValue('--map');
  if (!raw) return DEFAULT_MAP_PATH;
  return path.isAbsolute(raw) ? raw : path.join(ROOT, raw);
})();

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'reports',
  'dist',
  'build',
  '.next',
  '.cache',
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

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
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
      const ext = path.extname(e.name).toLowerCase();
      if (INCLUDE_EXT.has(ext)) out.push(full);
    }
  }
  return out;
}

function main() {
  if (!fs.existsSync(MAP_PATH)) {
    die(`Missing mapping file: ${path.relative(ROOT, MAP_PATH)}`);
  }

  const map = readJson(MAP_PATH);
  const planned = Array.isArray(map.planned) ? map.planned : [];
  if (planned.length === 0) {
    console.log('[rewrite] No mappings found; nothing to rewrite.');
    return;
  }

  const replacementsRaw = [];
  for (const p of planned) {
    if (!p || !p.oldUrl || !p.newUrl) continue;
    replacementsRaw.push({ from: p.oldUrl, to: p.newUrl });

    // Protocol-relative variant used in some quiz JSON (//images/...)
    if (typeof p.oldUrl === 'string' && p.oldUrl.startsWith('/images/')) {
      replacementsRaw.push({
        from: `//images/${p.oldUrl.slice('/images/'.length)}`,
        to: `//images/${p.newUrl.slice('/images/'.length)}`,
      });
    }

    // Also rewrite legacy/relative variants that get normalized to /images/... at load time.
    // Example: oldUrl '/images/Social Studies/foo.png' might appear as:
    // - 'Images/Social Studies/foo.png'
    // - 'images/Social Studies/foo.png'
    if (typeof p.oldUrl === 'string' && p.oldUrl.startsWith('/images/')) {
      const suffix = p.oldUrl.slice('/images/'.length);
      replacementsRaw.push({ from: `Images/${suffix}`, to: p.newUrl });
      replacementsRaw.push({ from: `images/${suffix}`, to: p.newUrl });
    }
  }

  const replacements = replacementsRaw
    // longer first to avoid partial overlaps
    .sort((a, b) => b.from.length - a.from.length);

  const files = walkFiles(ROOT);
  const changed = [];

  for (const filePath of files) {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');

    // Don't rewrite generated reports / audit outputs.
    if (path.resolve(filePath) === path.resolve(MAP_PATH)) continue;
    if (
      rel === 'image-audit-all-refs-v2.json' ||
      rel === 'image-audit-detailed-report-v2.json'
    ) {
      continue;
    }

    let text;
    try {
      text = fs.readFileSync(filePath, 'utf8');
    } catch {
      continue;
    }

    let next = text;
    for (const r of replacements) {
      if (next.includes(r.from)) next = next.split(r.from).join(r.to);
    }

    if (next !== text) {
      fs.writeFileSync(filePath, next, 'utf8');
      changed.push(filePath);
    }
  }

  console.log(`[rewrite] Updated ${changed.length} files.`);
}

main();
