/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IMAGE_ROOT = path.join(ROOT, 'frontend', 'public', 'images');
const META_PATH = path.join(ROOT, 'backend', 'image_metadata_final.json');
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
  return map[s.toLowerCase()] || s;
}

function makeKey(subject, fileName) {
  return `${normSubject(subject).toLowerCase()}|${String(fileName || '').toLowerCase()}`;
}

function listDiskImages() {
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

function isIncomplete(entry) {
  return (
    !entry ||
    typeof entry !== 'object' ||
    !entry.altText ||
    !entry.detailedDescription ||
    !Array.isArray(entry.keywords) ||
    entry.keywords.length < 3
  );
}

function main() {
  if (!fs.existsSync(META_PATH)) {
    console.error('Metadata file not found:', META_PATH);
    process.exit(1);
  }

  const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
  if (!Array.isArray(meta)) {
    console.error('Metadata is not an array.');
    process.exit(1);
  }

  const disk = listDiskImages();

  const diskKeys = new Set(disk.map((f) => makeKey(f.subject, f.fileName)));
  const metaKeys = new Set(meta.map((m) => makeKey(m.subject, m.fileName)));

  const missingMetadataForFiles = disk
    .filter((f) => !metaKeys.has(makeKey(f.subject, f.fileName)))
    .map((f) => ({ subject: f.subject, fileName: f.fileName }));

  const metadataEntriesMissingFiles = meta
    .filter((m) => !diskKeys.has(makeKey(m.subject, m.fileName)))
    .map((m) => ({ subject: normSubject(m.subject), fileName: String(m.fileName || '') }));

  const incompleteMetadataEntries = meta
    .filter((m) => isIncomplete(m))
    .map((m) => ({ subject: normSubject(m.subject), fileName: String(m.fileName || '') }));

  const summary = {
    imageFilesOnDisk: disk.length,
    metadataEntries: meta.length,
    missingMetadataForFiles: missingMetadataForFiles.length,
    metadataEntriesMissingFiles: metadataEntriesMissingFiles.length,
    incompleteMetadataEntries: incompleteMetadataEntries.length,
  };

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(REPORTS_DIR, 'image_metadata_audit.json'),
    JSON.stringify(
      {
        summary,
        missingMetadataForFiles,
        metadataEntriesMissingFiles,
        incompleteMetadataEntries,
      },
      null,
      2
    )
  );

  console.log(JSON.stringify(summary, null, 2));
}

main();
