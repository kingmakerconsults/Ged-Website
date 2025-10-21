#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const IMAGE_ROOT = path.join(ROOT_DIR, 'frontend', 'Images');
const METADATA_PATH = path.join(ROOT_DIR, 'image_metadata_final.json');
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

async function loadMetadata() {
  const raw = await fs.promises.readFile(METADATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  const map = new Map();
  data.forEach((entry, index) => {
    if (entry.sha1) {
      map.set(entry.sha1.toLowerCase(), { entry, index });
    }
  });
  return { data, map };
}

async function walkDirectory(dir) {
  const results = [];
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fs.promises.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.has(ext)) {
          results.push(fullPath);
        }
      }
    }
  }
  return results;
}

function createSha1(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('error', (error) => reject(error));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

function sanitizeSentence(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function summarizeText(text) {
  const cleaned = sanitizeSentence(text);
  const sentences = cleaned.split(/(?<=[.!?])\s+/);
  if (sentences.length > 0) {
    return sentences[0];
  }
  return cleaned;
}

function createAltText(meta) {
  let source = '';
  if (meta.altText && typeof meta.altText === 'string' && meta.altText.trim()) {
    source = meta.altText;
  } else if (meta.detailedDescription && typeof meta.detailedDescription === 'string') {
    source = meta.detailedDescription;
  } else {
    const baseName = path.basename(meta.fileName || meta.filePath || '', path.extname(meta.fileName || meta.filePath || ''));
    source = baseName.replace(/[\-_]+/g, ' ');
  }
  let candidate = summarizeText(source);
  candidate = candidate.replace(/^image of\s+/i, '').replace(/^photo of\s+/i, '');
  if (candidate.length > 125) {
    candidate = candidate.slice(0, 122);
    const lastSpace = candidate.lastIndexOf(' ');
    if (lastSpace > 80) {
      candidate = candidate.slice(0, lastSpace);
    }
    candidate = `${candidate}…`;
  }
  return candidate;
}

function buildContextSentence(meta, keywordList) {
  const type = meta.dominantType ? meta.dominantType.toLowerCase() : 'image';
  const subject = meta.subject ? meta.subject.toLowerCase() : 'general studies';
  const highlight = keywordList.slice(0, 4).join(', ');
  if (highlight) {
    return `This ${type} supports ${subject} lessons by illustrating concepts such as ${highlight}.`;
  }
  return `This ${type} supports ${subject} lessons with a focused visual reference for students.`;
}

function buildUsageSentence(meta) {
  const location = meta.filePath ? path.dirname(meta.filePath).split(path.sep).filter(Boolean).pop() : meta.subject;
  if (location) {
    return `Educators can reference the ${meta.dominantType || 'image'} when discussing materials in the ${location} module.`;
  }
  return 'Educators can reference this visual to reinforce discussion topics.';
}

function createDetailedDescription(meta, altText, keywordList) {
  const segments = [];
  if (meta.detailedDescription && typeof meta.detailedDescription === 'string') {
    segments.push(sanitizeSentence(meta.detailedDescription));
  } else if (meta.altText) {
    segments.push(sanitizeSentence(meta.altText));
  } else {
    segments.push(`An educational ${meta.dominantType || 'image'} related to ${meta.subject || 'the curriculum'}.`);
  }

  if (!segments.some((segment) => segment.toLowerCase().includes(altText.toLowerCase()))) {
    segments.push(`Alt summary: ${altText}`);
  }
  segments.push(buildContextSentence(meta, keywordList));
  segments.push(buildUsageSentence(meta));

  return segments.join(' ');
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'over', 'under', 'above', 'below', 'their', 'about', 'into',
  'near', 'through', 'image', 'photo', 'graphic', 'chart', 'diagram', 'map', 'illustration', 'scene', 'view', 'shows', 'showing',
  'students', 'educators', 'lesson', 'lessons', 'module', 'section', 'topic', 'topics', 'class', 'classroom', 'learning', 'educational',
  'support', 'materials', 'visual', 'reference'
]);

function expandKeywords(meta, altText, detailedDescription) {
  const existing = Array.isArray(meta.keywords) ? meta.keywords.slice() : [];
  const existingLower = new Set(existing.map((word) => (typeof word === 'string' ? word.toLowerCase() : '')));
  const source = [altText, detailedDescription, meta.subject || '', meta.dominantType || '', meta.fileName || '']
    .join(' ')
    .toLowerCase();
  const words = source.match(/[a-z0-9]+/g) || [];
  const additions = [];
  for (const word of words) {
    if (word.length < 3) {
      continue;
    }
    if (STOP_WORDS.has(word)) {
      continue;
    }
    if (existingLower.has(word)) {
      continue;
    }
    additions.push(word);
    existingLower.add(word);
    if (additions.length >= 10) {
      break;
    }
  }
  return existing.concat(additions);
}

async function processImages() {
  const { data, map } = await loadMetadata();
  const images = await walkDirectory(IMAGE_ROOT);
  let processed = 0;
  let updated = 0;
  let newImages = 0;

  for (const imagePath of images) {
    processed += 1;
    const sha1 = await createSha1(imagePath);
    const metaRecord = map.get(sha1);
    if (!metaRecord) {
      newImages += 1;
      console.log(`New image found, needs metadata: ${path.relative(ROOT_DIR, imagePath)}`);
      continue;
    }

    const { entry } = metaRecord;
    const altText = createAltText(entry);
    const keywords = expandKeywords(entry, altText, entry.detailedDescription || '');
    const detailedDescription = createDetailedDescription(entry, altText, keywords);

    let changed = false;
    if (entry.altText !== altText) {
      entry.altText = altText;
      changed = true;
    }
    if (entry.detailedDescription !== detailedDescription) {
      entry.detailedDescription = detailedDescription;
      changed = true;
    }
    const keywordsChanged = JSON.stringify(entry.keywords) !== JSON.stringify(keywords);
    if (keywordsChanged) {
      entry.keywords = keywords;
      changed = true;
    }

    if (changed) {
      updated += 1;
    }
  }

  await fs.promises.writeFile(METADATA_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

  console.log('Processing complete.');
  console.log(`Images scanned: ${processed}`);
  console.log(`Metadata updated: ${updated}`);
  console.log(`New images without metadata: ${newImages}`);
}

processImages().catch((error) => {
  console.error('Failed to update image metadata.');
  console.error(error);
  process.exitCode = 1;
});
