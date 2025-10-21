const fs = require('fs');
const path = require('path');

let sanitizeHtmlLib = null;
try {
    sanitizeHtmlLib = require('sanitize-html');
} catch (err) {
    // dependency may not be installed in minimal environments
}

let DEFAULT_ALT = 'Social studies image';
let loadImageMetaFn = null;

try {
    const metaLoader = require('./metaLoader');
    if (metaLoader && typeof metaLoader.loadImageMeta === 'function') {
        loadImageMetaFn = metaLoader.loadImageMeta;
    }
    if (typeof metaLoader?.DEFAULT_ALT === 'string' && metaLoader.DEFAULT_ALT.trim()) {
        DEFAULT_ALT = metaLoader.DEFAULT_ALT.trim();
    }
} catch (err) {
    // metaLoader dependencies may not be available in minimal test environments
}

const { validateImageRef } = require('./validateImageRef');

const PLACEHOLDER_URL = '/img/placeholder.svg';
const DEFAULT_SUBJECT = 'social_studies';

const SUBJECT_ALIASES = new Map([
    ['social studies', 'social_studies'],
    ['social-studies', 'social_studies'],
    ['social_studies', 'social_studies'],
    ['social', 'social_studies'],
    ['socialstudies', 'social_studies'],
    ['science', 'science'],
    ['sci', 'science'],
    ['mathematics', 'math'],
    ['math', 'math'],
    ['maths', 'math'],
    ['rla', 'rla'],
    ['ela', 'language_arts'],
    ['language arts', 'language_arts'],
    ['language-arts', 'language_arts'],
    ['language_arts', 'language_arts'],
    ['general', 'general']
]);

const ALLOWED_SUBJECTS = new Set([
    'social_studies',
    'science',
    'math',
    'rla',
    'language_arts',
    'general'
]);

let BANK_CACHE = null;
let BANK_OVERRIDE = null;

function ensureArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
}

function stripHtml(value) {
    if (sanitizeHtmlLib) {
        return sanitizeHtmlLib(String(value), {
            allowedTags: [],
            allowedAttributes: {}
        });
    }
    return String(value).replace(/<[^>]*>/g, '');
}

function cleanString(value) {
    if (value == null) return '';
    const stripped = stripHtml(String(value))
        .replace(/\s+/g, ' ')
        .trim();
    return stripped;
}

function clampString(value, maxLength) {
    if (!value || !maxLength) return value;
    return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function uniqueStrings(values = []) {
    const seen = new Set();
    const out = [];
    for (const value of values) {
        if (typeof value !== 'string') continue;
        const cleaned = cleanString(value);
        if (!cleaned) continue;
        const lower = cleaned.toLowerCase();
        if (seen.has(lower)) continue;
        seen.add(lower);
        out.push(cleaned);
    }
    return out;
}

function enforceSubject(value, fallback = DEFAULT_SUBJECT) {
    const cleaned = cleanString(value);
    if (!cleaned) return fallback;
    const slug = cleaned
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    if (!slug) return fallback;
    if (SUBJECT_ALIASES.has(slug)) {
        return SUBJECT_ALIASES.get(slug);
    }
    if (ALLOWED_SUBJECTS.has(slug)) {
        return slug;
    }
    return fallback;
}

function encodeFilePath(input = '') {
    const cleaned = cleanString(input);
    if (!cleaned) return '';
    const segments = cleaned
        .split(/[\\/]+/)
        .map((segment) => segment.trim())
        .filter(Boolean);
    if (!segments.length) return '';
    return `/img/${segments.map((segment) => encodeURIComponent(segment)).join('/')}`;
}

function deriveImageUrl(source = {}) {
    const candidates = [
        source.imageUrl,
        source.url,
        source.src,
        source.path,
        source.filePath
    ];
    for (const candidate of candidates) {
        if (typeof candidate !== 'string') continue;
        const cleaned = cleanString(candidate);
        if (!cleaned) continue;
        if (/^https?:\/\//i.test(cleaned)) {
            return cleaned.replace(/\s+/g, '');
        }
        if (cleaned.startsWith('/')) {
            return cleaned.replace(/\s+/g, '');
        }
    }
    const fileCandidates = [source.file, source.fileName];
    for (const candidate of fileCandidates) {
        if (typeof candidate !== 'string') continue;
        const encoded = encodeFilePath(candidate);
        if (encoded) {
            return encoded;
        }
    }
    return '';
}

function sanitizeMeta(source = {}, { subject: subjectHint, tags: tagHint = [] } = {}) {
    const resolvedUrl = deriveImageUrl(source);
    const resolvedSubject = enforceSubject(
        subjectHint ?? source.subject ?? source.domain ?? source.metaSubject,
        DEFAULT_SUBJECT
    );

    const altCandidate = source.alt ?? source.altText ?? source.title ?? DEFAULT_ALT;
    const captionCandidate = source.caption ?? source.description ?? source.summary;
    const creditCandidate = source.credit ?? source.attribution ?? source.source;
    const licenseCandidate = source.license ?? source.metaLicense;

    const alt = clampString(cleanString(altCandidate) || DEFAULT_ALT, 500);
    const caption = clampString(cleanString(captionCandidate), 1000);
    const credit = clampString(cleanString(creditCandidate), 500);
    const license = clampString(cleanString(licenseCandidate), 500);

    const tagValues = uniqueStrings([
        ...ensureArray(source.tags),
        ...ensureArray(source.keywords),
        ...ensureArray(source.topics),
        ...ensureArray(tagHint)
    ]).slice(0, 50);

    const payload = {
        imageUrl: resolvedUrl,
        alt,
        subject: resolvedSubject
    };

    if (caption) {
        payload.caption = caption;
    }
    if (credit) {
        payload.credit = credit;
    }
    if (license) {
        payload.license = license;
    }
    if (tagValues.length) {
        payload.tags = tagValues;
    }

    return payload;
}

function buildBankFromList(list = []) {
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

    for (const entry of list) {
        if (!entry || typeof entry !== 'object') continue;
        const record = { ...entry };
        if (!record.imageUrl) {
            record.imageUrl = deriveImageUrl(record);
        }
        if (!record.file && record.fileName) {
            record.file = record.fileName;
        }
        if (record.id) {
            setKey(byId, String(record.id), record);
        }
        if (record.imageUrl) {
            setKey(byUrl, record.imageUrl, record);
            try {
                const parsed = new URL(record.imageUrl);
                setKey(byUrl, parsed.pathname, record);
            } catch (err) {
                // ignore parse issues
            }
        }
        if (record.file) {
            setKey(byFile, String(record.file), record);
        }
    }

    return { list, byId, byUrl, byFile };
}

function loadBankFromDisk() {
    const candidates = [
        path.join(__dirname, '../../data/image_metadata_final.json'),
        path.join(process.cwd(), 'backend/data/image_metadata_final.json'),
        path.join(process.cwd(), 'image_metadata_final.json')
    ];

    for (const candidate of candidates) {
        try {
            if (!fs.existsSync(candidate)) continue;
            const raw = fs.readFileSync(candidate, 'utf8');
            const parsed = JSON.parse(raw);
            const list = Array.isArray(parsed)
                ? parsed
                : (Array.isArray(parsed?.images) ? parsed.images : []);
            if (!Array.isArray(list)) continue;
            return buildBankFromList(list);
        } catch (err) {
            console.warn(`[images] Failed to load bank from ${path.basename(candidate)}: ${err?.message || err}`);
        }
    }

    return buildBankFromList([]);
}

function getBank() {
    if (BANK_OVERRIDE) {
        return BANK_OVERRIDE;
    }
    if (!BANK_CACHE) {
        if (loadImageMetaFn) {
            BANK_CACHE = loadImageMetaFn(path.join(__dirname, '../../data/image_metadata_final.json'));
        }
        if (!BANK_CACHE || typeof BANK_CACHE !== 'object') {
            BANK_CACHE = loadBankFromDisk();
        }
    }
    return BANK_CACHE;
}

async function headOk(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }
    if (!/^https?:\/\//i.test(url)) {
        return true;
    }
    try {
        const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
        if (!response.ok) {
            return false;
        }
        const contentType = String(response.headers.get('content-type') || '');
        return /^image\//i.test(contentType);
    } catch (err) {
        return false;
    }
}

function lookupRecord(ref, bank) {
    if (!bank) return null;
    const { byId = new Map(), byUrl = new Map(), byFile = new Map() } = bank;

    const attempt = (value) => {
        if (value == null) return null;
        const str = String(value).trim();
        if (!str) return null;
        return (
            byId.get(str)
            || byId.get(str.toLowerCase())
            || byUrl.get(str)
            || byUrl.get(str.toLowerCase())
            || byFile.get(str)
            || byFile.get(str.toLowerCase())
            || null
        );
    };

    if (typeof ref === 'string') {
        const record = attempt(ref);
        if (record) return record;
        const base = ref.split('/').pop();
        if (base && base !== ref) {
            return attempt(base);
        }
        return null;
    }

    if (!ref || typeof ref !== 'object') {
        return null;
    }

    const keys = [
        ref.id,
        ref.image_id,
        ref.imageId,
        ref.key,
        ref.url,
        ref.imageUrl,
        ref.src,
        ref.path,
        ref.file,
        ref.fileName
    ];

    for (const key of keys) {
        const record = attempt(key);
        if (record) return record;
    }

    for (const key of keys) {
        if (typeof key !== 'string') continue;
        const base = key.split('/').pop();
        if (!base || base === key) continue;
        const record = attempt(base);
        if (record) return record;
    }

    return null;
}

function buildPlaceholder(subjectHint, tagHint = []) {
    return sanitizeMeta(
        {
            imageUrl: PLACEHOLDER_URL,
            alt: DEFAULT_ALT,
            tags: tagHint
        },
        { subject: subjectHint, tags: tagHint }
    );
}

function finalizeResult(meta, record = null) {
    const payload = validateImageRef(meta);
    if (record?.id) {
        return { ...payload, recordId: record.id };
    }
    return payload;
}

async function resolveImageRef(ref, options = {}) {
    const { probeHead = false, subject: subjectHint, tags: tagHint = [] } = options || {};
    const directMeta = (ref && typeof ref === 'object' && !Array.isArray(ref)) ? ref : {};

    const combinedTags = uniqueStrings([
        ...ensureArray(tagHint),
        ...ensureArray(directMeta.tags),
        ...ensureArray(directMeta.keywords)
    ]);

    const candidateUrl = typeof ref === 'string'
        ? ref
        : (directMeta.imageUrl || directMeta.url || directMeta.src || directMeta.path);

    if (typeof candidateUrl === 'string') {
        const trimmed = candidateUrl.trim();
        if (trimmed && (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('/'))) {
            const sanitized = sanitizeMeta({ ...directMeta, imageUrl: trimmed }, {
                subject: directMeta.subject ?? subjectHint,
                tags: combinedTags
            });
            const verified = sanitized.imageUrl ? sanitized : buildPlaceholder(subjectHint, combinedTags);
            if (probeHead) {
                const ok = await headOk(verified.imageUrl);
                if (!ok) {
                    return finalizeResult(buildPlaceholder(subjectHint, combinedTags));
                }
            }
            return finalizeResult(verified);
        }
    }

    const bank = getBank();
    const record = lookupRecord(ref, bank);
    if (record) {
        const recordTags = uniqueStrings([
            ...ensureArray(record.tags),
            ...ensureArray(record.keywords),
            ...ensureArray(record.topics)
        ]);
        const mergedTags = uniqueStrings([...recordTags, ...combinedTags]);
        const sourceMeta = { ...record, ...directMeta };
        if (recordTags.length) {
            sourceMeta.tags = recordTags;
        }
        const sanitized = sanitizeMeta(
            sourceMeta,
            { subject: directMeta.subject ?? subjectHint ?? record.subject, tags: mergedTags }
        );
        const finalMeta = sanitized.imageUrl ? sanitized : buildPlaceholder(subjectHint ?? record.subject, mergedTags);
        if (probeHead) {
            const ok = await headOk(finalMeta.imageUrl);
            if (!ok) {
                return finalizeResult(buildPlaceholder(subjectHint ?? record.subject, mergedTags));
            }
        }
        return finalizeResult(finalMeta, record);
    }

    return finalizeResult(buildPlaceholder(subjectHint, combinedTags));
}

function __setBank(bank) {
    BANK_OVERRIDE = bank;
}

function __clearBank() {
    BANK_OVERRIDE = null;
    BANK_CACHE = null;
}

module.exports = {
    getBank,
    sanitizeMeta,
    headOk,
    resolveImageRef,
    __setBank,
    __clearBank,
    PLACEHOLDER_URL,
    DEFAULT_SUBJECT
};
