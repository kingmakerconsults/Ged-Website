#!/usr/bin/env node
/**
 * Audit Social Studies quiz image references in backend/data/quizzes/social-studies
 * and report missing files in frontend/public/images/Social Studies.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'backend', 'data', 'quizzes', 'social-studies');
const imagesDir = path.join(
  root,
  'frontend',
  'public',
  'images',
  'Social Studies'
);

if (!fs.existsSync(dataDir)) {
  console.error('Data directory not found:', dataDir);
  process.exit(1);
}
if (!fs.existsSync(imagesDir)) {
  console.error('Images directory not found:', imagesDir);
  process.exit(1);
}

const imageFiles = new Set(
  fs
    .readdirSync(imagesDir)
    .filter((f) => fs.statSync(path.join(imagesDir, f)).isFile())
    .map((f) => f.toLowerCase())
);

const urlRegex =
  /(imageUrl|imageURL|stimulusImage\s*:\s*\{[^}]*src)\s*[:=]\s*['"]([^'"]+)['"]/g;

const report = [];
const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    const rawUrl = match[2];
    const url = rawUrl.trim();
    if (!url) continue;

    const filename = path.basename(url).toLowerCase();
    const exists = imageFiles.has(filename);

    report.push({
      file,
      url,
      filename,
      exists,
    });
  }
}

const missing = report.filter((r) => !r.exists);

console.log(`Found ${report.length} image references.`);
console.log(`Missing images: ${missing.length}`);

missing.forEach((m, idx) => {
  console.log(`\n${idx + 1}. ${m.filename}`);
  console.log(`   File: ${m.file}`);
  console.log(`   URL: ${m.url}`);
});

const outPath = path.join(root, 'social-studies-image-audit.json');
fs.writeFileSync(outPath, JSON.stringify({ report, missing }, null, 2));
console.log(`\nSaved report to ${outPath}`);
