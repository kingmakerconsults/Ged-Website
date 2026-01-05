// Option B: remove any question that references a missing *local* image asset.
// This script scans backend topic question files under backend/data/quizzes/**
// that export arrays (module.exports = [ ... ]) and removes offending questions.
// It also renumbers questionNumber sequentially.

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const imageRoot = path.join(repoRoot, 'frontend', 'public');
const quizzesRoot = path.join(repoRoot, 'backend', 'data', 'quizzes');

function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value.trim());
}

function normalizeImageUrlToRelativePath(imgUrl) {
  if (!imgUrl || typeof imgUrl !== 'string') return null;
  const raw = imgUrl.trim();
  if (!raw) return null;
  if (isHttpUrl(raw)) return null; // ignore external

  // strip query/hash
  const noQuery = raw.split('?')[0].split('#')[0];
  let rel = noQuery;

  // legacy sometimes uses "Images/..." instead of "/images/...".
  if (rel.startsWith('Images/')) rel = rel.replace(/^Images\//, 'images/');

  if (rel.startsWith('/')) rel = rel.slice(1);
  try {
    rel = decodeURIComponent(rel);
  } catch (_) {}
  return rel || null;
}

function extractImageUrlsFromText(text) {
  if (typeof text !== 'string' || !text) return [];
  const out = [];
  const regex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(text)) !== null) out.push(match[1]);
  return out;
}

function collectQuestionImageUrls(q) {
  if (!q || typeof q !== 'object') return [];
  const urls = [];
  const content = q.content && typeof q.content === 'object' ? q.content : null;

  const direct = [
    q.imageUrl,
    q.imageURL,
    q.image,
    q.graphic,
    q.stimulusImage && q.stimulusImage.src,
    q.stimulusImage,
    content && (content.imageUrl || content.imageURL || content.image),
  ];
  direct.forEach((u) => {
    if (typeof u === 'string' && u.trim()) urls.push(u.trim());
  });

  const textFields = [
    q.question,
    q.questionText,
    q.passage,
    q.stimulus,
    content && (content.questionText || content.question),
    content && content.passage,
  ];
  textFields.forEach((t) => {
    extractImageUrlsFromText(t).forEach((u) => urls.push(u));
  });

  return urls;
}

function questionHasMissingLocalImage(q) {
  const urls = collectQuestionImageUrls(q);
  if (!urls.length) return false;
  for (const u of urls) {
    const rel = normalizeImageUrlToRelativePath(u);
    if (!rel) continue;
    const full = path.join(imageRoot, rel);
    if (!fs.existsSync(full)) return true;
  }
  return false;
}

function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function readHeaderPrefix(originalText) {
  const idx = originalText.indexOf('module.exports');
  if (idx < 0) return '';
  return originalText.slice(0, idx).trimEnd() + '\n\n';
}

function formatModuleExportArray(arr) {
  return `module.exports = ${JSON.stringify(arr, null, 2)};\n`;
}

function main() {
  const files = walk(quizzesRoot)
    .filter((p) => p.endsWith('.js'))
    .filter((p) => !p.endsWith(path.join('data', 'quizzes', 'index.js')));

  let totalFilesChanged = 0;
  let totalQuestionsRemoved = 0;

  for (const filePath of files) {
    let exported;
    try {
      delete require.cache[require.resolve(filePath)];
      exported = require(filePath);
    } catch {
      continue;
    }

    if (!Array.isArray(exported)) continue;

    const original = exported;
    const kept = [];
    let removedHere = 0;

    for (const q of original) {
      if (questionHasMissingLocalImage(q)) {
        removedHere += 1;
        continue;
      }
      kept.push(q);
    }

    if (removedHere === 0) continue;

    // Renumber questionNumber sequentially when present
    kept.forEach((q, i) => {
      if (q && typeof q === 'object' && 'questionNumber' in q) {
        q.questionNumber = i + 1;
      }
    });

    const src = fs.readFileSync(filePath, 'utf8');
    const header = readHeaderPrefix(src);
    const out = header + formatModuleExportArray(kept);

    fs.writeFileSync(filePath, out, 'utf8');
    totalFilesChanged += 1;
    totalQuestionsRemoved += removedHere;

    console.log(
      `[OptionB] ${path.relative(
        repoRoot,
        filePath
      )}: removed ${removedHere} questions`
    );
  }

  console.log(
    `[OptionB] Done. Files changed: ${totalFilesChanged}. Questions removed: ${totalQuestionsRemoved}.`
  );
}

main();
