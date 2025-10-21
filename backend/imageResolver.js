const metadataList = require('./data/image_metadata_final.json');

const IMAGE_INDEX = new Map();

function addKey(key, value) {
    if (!key) return;
    const str = String(key).trim();
    if (!str) return;
    IMAGE_INDEX.set(str, value);
    IMAGE_INDEX.set(str.toLowerCase(), value);
}

for (const entry of Array.isArray(metadataList) ? metadataList : []) {
    if (!entry || typeof entry !== 'object') continue;
    const keys = new Set([
        entry.id,
        entry.key,
        entry.file,
        entry.fileName,
        entry.filePath,
        entry.imagePath,
        entry.slug,
        entry.title
    ].filter(Boolean));
    keys.forEach((key) => addKey(key, entry));
}

function encodePath(value) {
    if (!value) return '';
    const normalized = String(value)
        .replace(/^\/+/, '')
        .replace(/\\+/g, '/');
    if (!normalized) return '';
    return normalized
        .split('/')
        .filter(Boolean)
        .map((segment) => encodeURIComponent(segment))
        .join('/');
}

function cleanText(value, fallback = '') {
    if (typeof value !== 'string') return fallback;
    return value
        .replace(/Source:\s*[^\n]+?\.(?:png|jpe?g|gif|webp|svg)\s*$/gmi, '')
        .replace(/\b[Ss]creenshot(s)?\b/g, 'image')
        .trim();
}

function pickMeta(ref) {
    const candidates = [
        ref?.key,
        ref?.id,
        ref?.name,
        ref?.file,
        ref?.path,
        ref?.imagePath,
        ref?.fileName
    ];
    for (const candidate of candidates) {
        if (!candidate) continue;
        const entry = IMAGE_INDEX.get(String(candidate)) || IMAGE_INDEX.get(String(candidate).toLowerCase());
        if (entry) return entry;
    }
    return null;
}

function resolveImage(ref) {
    if (!ref) return null;
    const refObject = typeof ref === 'object' ? ref : { key: ref };
    const meta = pickMeta(refObject) || null;
    const fileCandidate = refObject.file || refObject.path || refObject.imagePath || meta?.filePath || meta?.fileName;
    const encodedPath = encodePath(fileCandidate || refObject.key || refObject.id || '');
    if (!encodedPath) {
        return null;
    }
    const imageMeta = {
        title: cleanText(refObject.title || meta?.title || ''),
        alt: cleanText(refObject.alt || refObject.altText || meta?.altText || meta?.alt || 'Image', 'Image'),
        caption: cleanText(refObject.caption || meta?.caption || '')
    };
    const filteredMeta = Object.fromEntries(
        Object.entries(imageMeta)
            .filter(([, value]) => typeof value === 'string' && value.trim())
            .map(([key, value]) => [key, value.trim()])
    );
    return {
        imageUrl: `/img/${encodedPath}`,
        imageMeta: filteredMeta
    };
}

module.exports = { resolveImage };
