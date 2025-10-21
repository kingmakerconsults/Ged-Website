const fs = require('fs');
const path = require('path');

function readMetaFile(metaPath) {
    const resolved = path.resolve(metaPath || 'image_metadata_final.json');
    const raw = fs.readFileSync(resolved, 'utf8').trim();
    if (!raw) {
        throw new Error(`Image metadata at ${resolved} was empty.`);
    }
    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch (err) {
        throw new Error(`Failed to parse image metadata at ${resolved}: ${err.message}`);
    }
    if (!Array.isArray(parsed)) {
        throw new Error(`Image metadata at ${resolved} must be an array.`);
    }
    return { list: parsed, path: resolved };
}

function buildIndexes(list = []) {
    const byFile = new Map();
    const byId = new Map();
    for (const entry of list) {
        if (!entry || typeof entry !== 'object') continue;
        const file = typeof entry.file === 'string' ? entry.file.trim() : '';
        const id = typeof entry.id === 'string' ? entry.id.trim() : '';
        if (file) {
            byFile.set(file, entry);
            byFile.set(file.toLowerCase(), entry);
        }
        if (id) {
            byId.set(id, entry);
        }
    }
    return { byFile, byId };
}

function loadImageMeta(metaPath) {
    const { list, path: resolvedPath } = readMetaFile(metaPath);
    const indexes = buildIndexes(list);
    return { list, ...indexes, path: resolvedPath };
}

function resolveImageRef(ref, metaMaps) {
    if (!ref || !metaMaps) return null;
    const { byFile, byId } = metaMaps;
    let record = null;
    let fallbackFile = null;

    if (typeof ref === 'string') {
        const key = ref.trim();
        record = byFile.get(key) || byFile.get(key.toLowerCase()) || byId.get(key);
        if (!record) {
            const base = key.split('/').pop();
            if (base) {
                fallbackFile = base;
                record = byFile.get(base) || byFile.get(base.toLowerCase());
            }
        }
    } else if (typeof ref === 'object') {
        if (ref.file) {
            record = byFile.get(ref.file) || byFile.get(String(ref.file).toLowerCase());
            fallbackFile = ref.file;
        }
        if (!record && ref.id) {
            record = byId.get(ref.id);
        }
        if (!record && ref.path) {
            const base = String(ref.path).split('/').pop();
            if (base) {
                fallbackFile = base;
                record = byFile.get(base) || byFile.get(base.toLowerCase());
            }
        }
        if (!record && ref.imagePath) {
            const base = String(ref.imagePath).split('/').pop();
            if (base) {
                fallbackFile = base;
                record = byFile.get(base) || byFile.get(base.toLowerCase());
            }
        }
    }
    if (!record) {
        if (!fallbackFile) return null;
        let decoded = fallbackFile;
        try {
            decoded = decodeURIComponent(fallbackFile);
        } catch (err) {
            // ignore decode issues
        }
        const altCandidate = typeof ref === 'object'
            ? (ref.alt || ref.altText || ref.title || '')
            : '';
        const captionCandidate = typeof ref === 'object' ? (ref.caption || '') : '';
        const creditCandidate = typeof ref === 'object' ? (ref.credit || '') : '';
        return {
            imageUrl: `/img/${encodeURIComponent(decoded)}`,
            imageMeta: {
                title: (typeof ref === 'object' ? ref.title : '') || '',
                alt: altCandidate || 'Image',
                caption: captionCandidate,
                credit: creditCandidate
            }
        };
    }
    const fileName = record.file || fallbackFile;
    if (!fileName) return null;
    const imageMeta = {
        title: record.title || '',
        alt: record.alt || record.title || 'Image',
        caption: record.caption || '',
        credit: record.credit || ''
    };
    return {
        imageUrl: `/img/${encodeURIComponent(fileName)}`,
        imageMeta
    };
}

module.exports = {
    loadImageMeta,
    resolveImageRef
};
