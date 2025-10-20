function loadImageMeta(raw) {
    if (raw == null) return [];
    const text = String(raw);
    try {
        const parsed = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch (err) {
        // fall back to NDJSON style payloads
    }
    const normalized = text.trim().replace(/}\s*{/g, '}\n{');
    if (!normalized) return [];
    const parts = normalized
        .split(/\n+/)
        .map((chunk) => chunk.trim())
        .filter(Boolean)
        .map((chunk) => JSON.parse(chunk));
    return Array.isArray(parts) ? parts : [parts];
}

function mapByFileName(list = []) {
    const map = new Map();
    for (const entry of list) {
        if (!entry || typeof entry !== 'object') continue;
        const fileField = entry.file || entry.path || entry.image_url || entry.filePath || entry.src || '';
        const key = String(fileField || '').split('/').pop();
        if (key) {
            map.set(key, entry);
        }
    }
    return map;
}

function deriveIsScreenshot(fileName = '', meta = {}) {
    const fromFile = typeof fileName === 'string' && /^screenshot/i.test(fileName);
    const tags = meta?.tags;
    const fromTags = Array.isArray(tags) && tags.some((tag) => String(tag).toLowerCase() === 'screenshot');
    const fromType = typeof meta?.type === 'string' && meta.type.toLowerCase() === 'screenshot';
    return Boolean(fromFile || fromTags || fromType);
}

module.exports = {
    loadImageMeta,
    mapByFileName,
    deriveIsScreenshot
};
