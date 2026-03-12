#!/usr/bin/env node
// Builds a JSON manifest of all approved visual assets under frontend/public/images/.
// Output: scripts/asset-manifest.json
// Run:  node scripts/build-asset-manifest.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const IMAGE_ROOT = path.join(root, 'frontend', 'public', 'images');
const OUTPUT = path.join(root, 'scripts', 'asset-manifest.json');

const IMAGE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
]);

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

function buildManifest() {
  if (!fs.existsSync(IMAGE_ROOT)) {
    console.error(`Image root not found: ${IMAGE_ROOT}`);
    process.exit(1);
  }

  const files = walkDir(IMAGE_ROOT);
  const publicBase = path.join(root, 'frontend', 'public');

  const assets = files
    .map((f) => {
      const relativeToPub =
        '/' + path.relative(publicBase, f).replace(/\\/g, '/');
      const subject = relativeToPub.split('/')[2] || 'root'; // /images/{Subject}/file
      return {
        path: relativeToPub,
        subject,
        filename: path.basename(f),
        ext: path.extname(f).toLowerCase(),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));

  // Group by subject
  const bySubject = {};
  for (const a of assets) {
    if (!bySubject[a.subject]) bySubject[a.subject] = [];
    bySubject[a.subject].push(a.path);
  }

  const manifest = {
    _generated: new Date().toISOString(),
    _description:
      'Approved visual asset manifest. All exam image references MUST resolve to a path in this manifest.',
    totalAssets: assets.length,
    bySubject,
    allPaths: assets.map((a) => a.path),
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Asset manifest written to ${OUTPUT}`);
  console.log(`Total assets: ${assets.length}`);
  for (const [subj, paths] of Object.entries(bySubject)) {
    console.log(`  ${subj}: ${paths.length}`);
  }
}

buildManifest();
