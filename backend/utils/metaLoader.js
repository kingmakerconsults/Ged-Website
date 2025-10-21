const fs = require('fs');
const path = require('path');

const META_CANDIDATES = [
  path.join(__dirname, '..', 'data', 'image_metadata_final.json'),
  path.join(__dirname, '..', 'data', 'image_metadata.json'),
];

// CHANGE THIS if your public image path is different:
const IMAGE_BASE = '/images/social/';

function normalizeRecord(rec = {}) {
  const file = rec.file || rec.path || rec.src || '';
  const url = rec.url || rec.image_url || rec.imageUrl || (file ? (IMAGE_BASE + encodeURIComponent(file)) : '');
  if (!url) return null;

  const title = rec.title || path.basename(file, path.extname(file)) || 'Historical image';
  const caption = (rec.caption && rec.caption.trim()) || title;
  const alt = (rec.alt && rec.alt.trim()) || caption;

  const id = rec.id || (title.toLowerCase().replace(/\s+/g,'_') + '_' + path.basename(file));
  const subject = rec.subject || 'social_studies';
  const topics = Array.isArray(rec.topics) ? rec.topics : (rec.topic ? [rec.topic] : []);
  const tags = Array.isArray(rec.tags) ? rec.tags : [];

  return { id, url, title, caption, alt, subject, topics, tags };
}

function loadImageMeta() {
  for (const p of META_CANDIDATES) {
    try {
      if (!fs.existsSync(p)) continue;
      const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.images) ? parsed.images : []);
      const normalized = arr.map(normalizeRecord).filter(Boolean);

      const seen = new Set();
      const deduped = normalized.filter(r => (seen.has(r.id) ? false : (seen.add(r.id), true)));

      console.log('[images] loaded ' + deduped.length + ' from ' + path.basename(p));
      return deduped; // IMPORTANT
    } catch (e) {
      console.warn('[images] failed to load ' + p + ': ' + (e && e.message ? e.message : e));
    }
  }
  console.warn('[images] no metadata file found; returning empty list');
  return []; // IMPORTANT
}

module.exports = { loadImageMeta };
