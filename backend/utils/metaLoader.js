function toArray(candidate) {
    if (Array.isArray(candidate)) {
        return candidate;
    }
    if (candidate && typeof candidate === 'object') {
        return [candidate];
    }
    return [];
}

function normalizeRaw(raw) {
    if (typeof raw !== 'string') {
        return '';
    }
    return raw.trim();
}

function loadImageMeta(raw) {
    const normalized = normalizeRaw(raw);
    if (!normalized) {
        return [];
    }

    try {
        const parsed = JSON.parse(normalized);
        return toArray(parsed);
    } catch (err) {
        // fall through to NDJSON parsing
    }

    const parts = normalized
        .replace(/}\s*{/g, '}\n{')
        .split(/\n+/)
        .map((chunk) => chunk.trim())
        .filter(Boolean)
        .map((chunk) => JSON.parse(chunk));

    return Array.isArray(parts) ? parts : toArray(parts);
}

function byFileName(metaList = []) {
    const map = new Map();
    for (const entry of metaList) {
        if (!entry || typeof entry !== 'object') continue;
        const fileField = entry.file || entry.path || entry.image_url || entry.filePath || entry.src || '';
        const key = String(fileField).split('/').pop();
        if (key) {
            map.set(key, entry);
        }
    }
    return map;
}

module.exports = {
    loadImageMeta,
    byFileName
};

