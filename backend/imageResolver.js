const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const METADATA_PATHS = [
  path.join(__dirname, 'image_metadata_final.json'),
  path.join(__dirname, 'data', 'image_metadata_final.json')
];

let metadataPathUsed = null;
let IMAGE_DB = [];
const IMAGE_BY_PATH = new Map();
const IMAGE_BY_BASENAME = new Map();
const IMAGE_BY_ID = new Map();

function sha1(text) {
  return crypto.createHash('sha1').update(text).digest('hex').slice(0, 16);
}

function normalizeImagePath(raw) {
  if (!raw) return null;
  let value = String(raw).trim();
  if (!value) return null;

  if (/^https?:\/\//i.test(value) || value.startsWith('data:')) {
    return value;
  }

  try {
    value = decodeURIComponent(value);
  } catch (_) {
    // ignore decode errors
  }

  value = value.replace(/\\+/g, '/').replace(/^\.?\/+/, '');
  if (!value) return null;
  if (!value.toLowerCase().startsWith('images/')) {
    value = `Images/${value}`;
  }

  return `/${encodeURI(value)}`;
}

function resetIndexes() {
  IMAGE_BY_PATH.clear();
  IMAGE_BY_BASENAME.clear();
  IMAGE_BY_ID.clear();
}

function indexRecord(record) {
  if (!record || typeof record !== 'object') return;

  if (record.filePath) {
    IMAGE_BY_PATH.set(record.filePath, record);
    if (record.filePath.startsWith('/')) {
      IMAGE_BY_PATH.set(record.filePath.slice(1), record);
    }
    IMAGE_BY_PATH.set(record.filePath.toLowerCase(), record);
    if (record.filePath.startsWith('/')) {
      IMAGE_BY_PATH.set(record.filePath.slice(1).toLowerCase(), record);
    }
  }

  if (record.basename) {
    IMAGE_BY_BASENAME.set(record.basename, record);
    IMAGE_BY_BASENAME.set(record.basename.toLowerCase(), record);
  }

  if (record.id) {
    IMAGE_BY_ID.set(record.id, record);
    IMAGE_BY_ID.set(record.id.toLowerCase(), record);
  }
}

function loadImages() {
  IMAGE_DB = [];
  metadataPathUsed = null;
  resetIndexes();

  for (const candidate of METADATA_PATHS) {
    try {
      const raw = fs.readFileSync(candidate, 'utf8');
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) continue;
      IMAGE_DB = parsed;
      metadataPathUsed = candidate;
      break;
    } catch (_) {
      // keep trying
    }
  }

  if (!Array.isArray(IMAGE_DB)) {
    IMAGE_DB = [];
  }

  const ids = new Set();
  IMAGE_DB.forEach((rec) => {
    if (!rec || typeof rec !== 'object') return;

    if (!rec.id || ids.has(rec.id)) {
      rec.id = sha1(rec.file || JSON.stringify(rec));
    }
    ids.add(rec.id);

    const baseFrom = rec.file || rec.filePath || rec.src || rec.path || '';
    rec.filePath = normalizeImagePath(baseFrom);
    rec.src = rec.filePath;
    rec.basename = path.basename(baseFrom || '');
    rec.ext = path.extname(baseFrom || '').toLowerCase();
    rec.alt = typeof rec.alt === 'string' ? rec.alt : '';
    rec.altText = typeof rec.altText === 'string' ? rec.altText : rec.alt;
    rec.caption = typeof rec.caption === 'string' ? rec.caption : '';
    rec.credit = typeof rec.credit === 'string' ? rec.credit : '';
    rec.subject = rec.subject || 'social-studies';
    if (!Array.isArray(rec.subtopics)) {
      rec.subtopics = rec.subtopics ? [String(rec.subtopics)] : [];
    }
    if (!Array.isArray(rec.questionHooks)) {
      rec.questionHooks = Array.isArray(rec.questionHooks) ? rec.questionHooks : [];
    }

    indexRecord(rec);
  });

  console.log(`[IMG-LOAD] Loaded ${IMAGE_DB.length} curated images`);
  global.curatedImages = IMAGE_DB;

  return IMAGE_DB;
}

function resolveImageMeta(ref) {
  if (!ref) return null;

  const attempt = (key) => {
    if (!key) return null;
    const trimmed = String(key).trim();
    if (!trimmed) return null;
    if (IMAGE_BY_ID.has(trimmed)) return IMAGE_BY_ID.get(trimmed);
    if (IMAGE_BY_ID.has(trimmed.toLowerCase())) return IMAGE_BY_ID.get(trimmed.toLowerCase());
    const normalized = trimmed.startsWith('/') ? trimmed : normalizeImagePath(trimmed);
    if (normalized && IMAGE_BY_PATH.has(normalized)) return IMAGE_BY_PATH.get(normalized);
    if (normalized && IMAGE_BY_PATH.has(normalized.toLowerCase())) {
      return IMAGE_BY_PATH.get(normalized.toLowerCase());
    }
    if (normalized && normalized.startsWith('/') && IMAGE_BY_PATH.has(normalized.slice(1))) {
      return IMAGE_BY_PATH.get(normalized.slice(1));
    }
    if (normalized && normalized.startsWith('/') && IMAGE_BY_PATH.has(normalized.slice(1).toLowerCase())) {
      return IMAGE_BY_PATH.get(normalized.slice(1).toLowerCase());
    }
    const base = path.basename(trimmed);
    if (base && IMAGE_BY_BASENAME.has(base)) return IMAGE_BY_BASENAME.get(base);
    if (base) {
      const lower = base.toLowerCase();
      for (const [name, record] of IMAGE_BY_BASENAME) {
        if (String(name).toLowerCase() === lower) return record;
      }
    }
    return null;
  };

  if (typeof ref === 'string') {
    return attempt(ref);
  }

  if (typeof ref === 'object') {
    const candidates = [
      ref.id,
      ref.imageId,
      ref.image_id,
      ref.src,
      ref.path,
      ref.filePath,
      ref.file,
      ref.imageUrl,
      ref.url,
      ref.basename
    ];
    for (const candidate of candidates) {
      const found = attempt(candidate);
      if (found) return found;
    }
  }

  return null;
}

const ELIGIBILITY_SKIP_LOG = new Set();
const ELIGIBILITY_SOFT_LOG = new Set();

function oncePerReason(set, message) {
  if (!set.has(message)) {
    set.add(message);
    console.warn(message);
  }
}

function softCheck(message) {
  oncePerReason(ELIGIBILITY_SOFT_LOG, message);
}

function hardCheck(message) {
  oncePerReason(ELIGIBILITY_SKIP_LOG, message);
}

function isImageEligible(img) {
  if (!img || typeof img !== 'object') {
    hardCheck('[images] skipping image: invalid record.');
    return false;
  }

  const type = typeof img.type === 'string' ? img.type.trim() : '';
  if (!type) {
    hardCheck('[images] skipping image: missing type.');
    return false;
  }

  const tags = Array.isArray(img.tags) ? img.tags.filter((tag) => typeof tag === 'string' && tag.trim().length) : [];
  if (!tags.length) {
    hardCheck('[images] skipping image: missing tags.');
    return false;
  }

  if (!img.alt && !img.title) {
    softCheck('[images] soft check: image missing alt/title.');
  }

  const hasFile = typeof img.file === 'string' && img.file.trim().length;
  const hasSrc = typeof img.src === 'string' && img.src.trim().length;
  const hasFilePath = typeof img.filePath === 'string' && img.filePath.trim().length;
  if (!hasFile && !hasSrc && !hasFilePath) {
    softCheck('[images] soft check: image missing file reference.');
  }

  return true;
}

function toImageRef(img = {}) {
  if (!img || typeof img !== 'object') {
    return { imageUrl: null, caption: '', alt: 'Image', altText: 'Image', meta: { id: null, type: null, tags: [] } };
  }

  const rawFile = typeof img.file === 'string' && img.file.trim().length
    ? img.file.trim()
    : (typeof img.fileName === 'string' && img.fileName.trim().length ? img.fileName.trim() : '');

  const normalizedFile = rawFile.replace(/^\/+/, '');

  const rawSrc = typeof img.src === 'string' && img.src.trim().length
    ? img.src.trim()
    : (typeof img.filePath === 'string' && img.filePath.trim().length ? img.filePath.trim() : '');

  const resolvedSrc = normalizedFile
    ? `/img/${normalizedFile}`
    : rawSrc || '';

  const caption = typeof img.caption === 'string' && img.caption.trim().length
    ? img.caption.trim()
    : (typeof img.title === 'string' && img.title.trim().length ? img.title.trim() : '');

  const title = typeof img.title === 'string' && img.title.trim().length ? img.title.trim() : '';
  const alt = typeof img.alt === 'string' && img.alt.trim().length
    ? img.alt.trim()
    : (title || 'Image');

  const meta = {
    id: img.id || null,
    type: img.type || null,
    tags: Array.isArray(img.tags) ? img.tags : [],
    year: img.year ?? null,
    sourceUrl: img.sourceUrl || img.source || null,
    ocrText: img.ocrText || null
  };

  return {
    id: img.id || null,
    imageUrl: resolvedSrc || null,
    path: resolvedSrc || null,
    src: resolvedSrc || null,
    file: normalizedFile || rawSrc || null,
    caption,
    alt,
    altText: alt,
    meta
  };
}

function resolveImage(ref) {
  const record = resolveImageMeta(ref);
  if (!record || !record.src) {
    return null;
  }

  const alt = record.alt || record.altText || '';
  const caption = record.caption || '';
  const credit = record.credit || '';

  const imageMeta = {
    id: record.id,
    alt,
    altText: alt,
    caption,
    credit,
    subject: record.subject,
    subtopics: record.subtopics,
    concepts: record.concepts,
    visualType: record.visualType,
    timePeriod: record.timePeriod,
    region: record.region,
    questionHooks: record.questionHooks,
    answerableFromImage: record.answerableFromImage
  };

  return {
    imageUrl: record.src,
    imageMeta,
    record
  };
}

const api = {
  loadImages,
  normalizeImagePath,
  resolveImageMeta,
  isImageEligible,
  resolveImage,
  toImageRef,
  getImageDb: () => IMAGE_DB,
  getMetadataPath: () => metadataPathUsed,
  indexes: { IMAGE_BY_PATH, IMAGE_BY_BASENAME, IMAGE_BY_ID }
};

Object.defineProperty(api, 'IMAGE_DB', {
  enumerable: true,
  get() {
    return IMAGE_DB;
  }
});

Object.defineProperty(api, 'metadataPath', {
  enumerable: true,
  get() {
    return metadataPathUsed;
  }
});

loadImages();

module.exports = api;
