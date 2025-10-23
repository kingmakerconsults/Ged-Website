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

function isImageEligible(img) {
  if (!img) return false;
  const required = ['visualType', 'subtopics', 'questionHooks'];
  for (const key of required) {
    const value = img[key];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return false;
    }
  }
  return Array.isArray(img.questionHooks) && img.questionHooks.length >= 2;
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
