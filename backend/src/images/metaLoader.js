const fs = require('fs');
const path = require('path');
const { jsonrepair } = require('jsonrepair');

const META_FILENAMES = ['image_metadata_final.json', 'image_metadata.json'];
const DEFAULT_ALT = 'Social studies image';
const DEFAULT_SUBJECT = 'social_studies';
const HEAD_TIMEOUT_MS = 5000;
const ACCEPT_IMAGE = /^image\//i;

function uniqueStrings(values = []) {
    const seen = new Set();
    const out = [];
    values.forEach((value) => {
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        const lower = trimmed.toLowerCase();
        if (seen.has(lower)) return;
        seen.add(lower);
        out.push(trimmed);
    });
    return out;
}

function ensureArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return [];
}

function pickFirstString(candidates = []) {
    for (const value of candidates) {
        if (typeof value === 'string' && value.trim()) {
            return value.trim();
        }
    }
    return '';
}

function encodePathSegments(input = '') {
    if (!input || typeof input !== 'string') return '';
    const normalized = input
        .replace(/\\+/g, '/')
        .replace(/^\.\//, '')
        .replace(/^\.\.\//, '')
        .replace(/^frontend\//i, '')
        .replace(/^public\//i, '')
        .replace(/^images?\//i, '')
        .replace(/^img\//i, '')
        .replace(/^\/+/, '')
        .trim();
    if (!normalized) return '';
    const segments = normalized.split('/').filter(Boolean);
    if (!segments.length) return '';
    const encoded = segments.map((segment) => {
        let working = segment.trim();
        if (!working) return '';
        try {
            working = decodeURIComponent(working);
        } catch (err) {
            // ignore decode issues
        }
        return encodeURIComponent(working);
    }).filter(Boolean);
    if (!encoded.length) return '';
    return `/img/${encoded.join('/')}`;
}

function deriveUrl(record = {}) {
    const candidates = [
        record.url,
        record.image_url,
        record.imageUrl,
        record.image,
        record.path,
        record.src,
        record.filePath,
        record.file,
        record.fileName
    ];

    for (const value of candidates) {
        if (typeof value !== 'string') continue;
        const trimmed = value.trim();
        if (!trimmed) continue;
        if (/^https?:\/\//i.test(trimmed)) {
            return { url: trimmed.replace(/\s+/g, ''), fileName: trimmed.split(/[/?#]/).pop() || '' };
        }
        if (/^\/img\//i.test(trimmed)) {
            const fileName = trimmed.split('/').pop() || '';
            return { url: trimmed, fileName };
        }
        const encoded = encodePathSegments(trimmed);
        if (encoded) {
            return { url: encoded, fileName: encoded.split('/').pop() || '' };
        }
    }

    return { url: '', fileName: '' };
}

function deriveId(record = {}, fallbackUrl = '') {
    const candidates = [record.id, record.image_id, record.imageId, record.slug, record.uid, record.key];
    for (const value of candidates) {
        if (value == null) continue;
        const id = String(value).trim();
        if (id) return id;
    }

    const title = pickFirstString([record.title, record.caption, record.alt, record.alt_text, record.name]);
    if (title) {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 64);
        if (slug) return slug;
    }

    if (fallbackUrl) {
        return fallbackUrl
            .replace(/^https?:\/\//i, '')
            .replace(/[^a-z0-9]+/gi, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 64) || fallbackUrl;
    }

    return `img-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeRecord(record = {}) {
    if (!record || typeof record !== 'object') return null;

    const { url, fileName } = deriveUrl(record);
    if (!url) {
        return null;
    }

    const title = pickFirstString([record.title, record.caption, record.name, record.description]);
    const caption = pickFirstString([record.caption, record.summary, record.description]);
    const alt = pickFirstString([record.alt, record.alt_text, record.altText, title, caption]) || DEFAULT_ALT;
    const credit = pickFirstString([record.credit, record.source, record.attribution, record.license, record.creator]);
    const subject = pickFirstString([record.subject, record.domain]) || DEFAULT_SUBJECT;
    const topics = uniqueStrings([
        ...ensureArray(record.topics),
        ...ensureArray(record.topic),
        ...ensureArray(record.categories),
        record.category
    ].flatMap((value) => ensureArray(value)));
    const tags = uniqueStrings([
        ...ensureArray(record.tags),
        ...ensureArray(record.labels),
        ...ensureArray(record.keywords)
    ]);

    const id = deriveId(record, url);

    return {
        id,
        url,
        title,
        caption,
        alt,
        credit,
        subject,
        topics,
        tags,
        file: fileName,
        fileName,
        original: record
    };
}

function indexRecords(list = []) {
    const byId = new Map();
    const byUrl = new Map();
    const byFile = new Map();

    const setKey = (map, key, value) => {
        if (!key || typeof key !== 'string') return;
        const trimmed = key.trim();
        if (!trimmed) return;
        map.set(trimmed, value);
        map.set(trimmed.toLowerCase(), value);
    };

    list.forEach((record) => {
        if (!record || typeof record !== 'object') return;
        setKey(byId, record.id, record);
        setKey(byUrl, record.url, record);
        if (record.url && /^https?:\/\//i.test(record.url)) {
            try {
                const parsed = new URL(record.url);
                setKey(byUrl, parsed.pathname, record);
            } catch (err) {
                // ignore URL parse failures
            }
        }
        if (record.fileName) {
            setKey(byFile, record.fileName, record);
        }
        if (record.file) {
            setKey(byFile, record.file, record);
        }
    });

    return { byId, byUrl, byFile };
}

function parseWithRepair(raw, filePath) {
    if (typeof raw !== 'string') return { data: null, repaired: false };
    const trimmed = raw.trim();
    if (!trimmed) return { data: null, repaired: false };

    try {
        return { data: JSON.parse(trimmed), repaired: false };
    } catch (err) {
        try {
            const repaired = jsonrepair(trimmed);
            return { data: JSON.parse(repaired), repaired: true };
        } catch (repairErr) {
            console.warn(`[images] unable to parse ${path.basename(filePath)}: ${repairErr?.message || repairErr}`);
            return { data: null, repaired: false };
        }
    }
}

function coerceList(parsed) {
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.images)) {
        return parsed.images;
    }
    return [];
}

function loadImageMeta(preferredPath = null) {
    const result = { list: [], byId: new Map(), byUrl: new Map(), byFile: new Map(), path: null, repaired: false };

    const candidates = [];
    if (preferredPath) {
        candidates.push(preferredPath);
    }
    const defaultRoot = path.join(__dirname, '..', 'data');
    META_FILENAMES.forEach((name) => {
        candidates.push(path.join(defaultRoot, name));
        candidates.push(path.join(process.cwd(), name));
    });

    const seen = new Set();
    for (const candidate of candidates) {
        const resolved = path.resolve(candidate);
        if (seen.has(resolved)) continue;
        seen.add(resolved);
        try {
            if (!fs.existsSync(resolved)) continue;
            const raw = fs.readFileSync(resolved, 'utf8');
            const { data, repaired } = parseWithRepair(raw, resolved);
            if (!data) continue;
            const arr = coerceList(data);
            const normalized = [];
            let dropped = 0;
            for (const entry of arr) {
                const record = normalizeRecord(entry);
                if (record) {
                    normalized.push(record);
                } else {
                    dropped += 1;
                }
            }
            const indexes = indexRecords(normalized);
            result.list = normalized;
            result.byId = indexes.byId;
            result.byUrl = indexes.byUrl;
            result.byFile = indexes.byFile;
            result.path = resolved;
            result.repaired = repaired;
            const label = path.basename(resolved);
            const droppedLabel = dropped ? `, dropped ${dropped}` : '';
            const repairLabel = repaired ? ' (repaired JSON)' : '';
            console.log(`[images] loaded ${normalized.length}${droppedLabel} from ${label}${repairLabel}`);
            return result;
        } catch (err) {
            console.warn(`[images] failed to load ${path.basename(candidate)}: ${err?.message || err}`);
        }
    }

    console.warn('[images] no metadata file found; returning empty list');
    return result;
}

function resolveImageRef(ref, metaMaps) {
    if (!metaMaps) return null;
    const { byId = new Map(), byUrl = new Map(), byFile = new Map() } = metaMaps;

    const lookup = (key) => {
        if (!key || typeof key !== 'string') return null;
        const trimmed = key.trim();
        if (!trimmed) return null;
        return byId.get(trimmed)
            || byId.get(trimmed.toLowerCase())
            || byUrl.get(trimmed)
            || byUrl.get(trimmed.toLowerCase())
            || byFile.get(trimmed)
            || byFile.get(trimmed.toLowerCase())
            || null;
    };

    let record = null;

    if (typeof ref === 'string') {
        record = lookup(ref);
        if (!record) {
            const base = ref.split('/').pop();
            record = lookup(base || '');
        }
    } else if (ref && typeof ref === 'object') {
        const keys = [
            ref.id,
            ref.image_id,
            ref.imageId,
            ref.url,
            ref.image_url,
            ref.imageUrl,
            ref.path,
            ref.src,
            ref.file,
            ref.fileName
        ];
        for (const key of keys) {
            record = lookup(typeof key === 'number' ? String(key) : key);
            if (record) break;
        }
        if (!record) {
            const fallbackCandidates = keys
                .map((value) => (typeof value === 'string' ? value.split('/').pop() : ''))
                .filter(Boolean);
            for (const candidate of fallbackCandidates) {
                record = lookup(candidate);
                if (record) break;
            }
        }
    }

    if (!record) {
        return null;
    }

    const meta = {
        title: record.title || '',
        alt: record.alt || record.title || DEFAULT_ALT,
        caption: record.caption || '',
        credit: record.credit || ''
    };

    return {
        imageUrl: record.url,
        imageMeta: meta,
        record
    };
}

async function probeImageHead(url, { timeoutMs = HEAD_TIMEOUT_MS } = {}) {
    if (!url || typeof url !== 'string') {
        return { ok: false, error: 'invalid-url' };
    }
    if (!/^https?:\/\//i.test(url)) {
        // Local assets are served by the app; assume OK.
        return { ok: true, contentType: 'local' };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const contentType = String(response.headers.get('content-type') || '');
        if (!ACCEPT_IMAGE.test(contentType)) {
            throw new Error(`Not an image: ${contentType}`);
        }
        return { ok: true, contentType };
    } catch (err) {
        const message = err?.message || String(err);
        return { ok: false, error: message };
    } finally {
        clearTimeout(timer);
    }
}

module.exports = {
    loadImageMeta,
    resolveImageRef,
    probeImageHead,
    DEFAULT_ALT
};
