const fs = require('fs');
const path = require('path');
const { loadImageMeta, deriveIsScreenshot } = require('../utils/metaLoader');
const { deriveVisualFeatures, buildFeatureSignature } = require('../utils/visualFeatures');

const METADATA_PATH = path.join(__dirname, '../../data/image_metadata_final.json');
const RECENT_BUFFER_SIZE = 200;
const KEYWORD_WINDOW = 60;

let METADATA_CACHE = null;

function loadMetadata() {
    if (METADATA_CACHE) return METADATA_CACHE;
    const raw = fs.readFileSync(METADATA_PATH, 'utf8');
    const parsed = loadImageMeta(raw);
    const social = parsed.filter((entry) => {
        const subject = (entry.subject || '').toLowerCase();
        return subject.includes('social');
    });

    METADATA_CACHE = social.map((entry) => {
        const filePath = entry.filePath || entry.src || entry.path || '';
        const fileName = String(filePath).split('/').pop() || '';
        const normalizedKeywords = Array.isArray(entry.keywords)
            ? entry.keywords.map((k) => String(k).toLowerCase().trim()).filter(Boolean)
            : [];
        const normalizedTags = Array.isArray(entry.tags)
            ? entry.tags.map((tag) => String(tag).trim())
            : [];

        const isScreenshot = deriveIsScreenshot(fileName, entry);
        if (isScreenshot && !normalizedTags.some((tag) => tag.toLowerCase() === 'screenshot')) {
            normalizedTags.push('screenshot');
        }

        const enriched = {
            ...entry,
            filePath,
            fileName,
            tags: normalizedTags,
            keywords: normalizedKeywords
        };

        const features = deriveVisualFeatures(enriched);

        return {
            ...enriched,
            isScreenshot,
            features,
            featureSignature: buildFeatureSignature(features)
        };
    });

    preloadTopImages(METADATA_CACHE.slice(0, 10));

    return METADATA_CACHE;
}

function preloadTopImages(entries = []) {
    for (const meta of entries) {
        if (!meta || !meta.filePath) continue;
        try {
            const diskPath = path.join(__dirname, '../../..', meta.filePath);
            fs.accessSync(diskPath);
        } catch (err) {
            console.warn('[socialStudies] Missing image asset:', meta.filePath);
        }
    }
}

const recentIdQueue = [];
const recentIdSet = new Set();
const recentKeywordQueue = [];
const recentKeywordCounts = new Map();
const recentTypeHistory = [];
const recentMetaHistory = [];

function markImageUsed(meta, questionType) {
    if (meta?.id && !recentIdSet.has(meta.id)) {
        recentIdQueue.push(meta.id);
        recentIdSet.add(meta.id);
        while (recentIdQueue.length > RECENT_BUFFER_SIZE) {
            const removed = recentIdQueue.shift();
            recentIdSet.delete(removed);
        }
    }

    const keywords = Array.from(new Set((meta?.keywords || []).map((k) => k.toLowerCase())));
    for (const keyword of keywords) {
        recentKeywordQueue.push(keyword);
        recentKeywordCounts.set(keyword, (recentKeywordCounts.get(keyword) || 0) + 1);
    }
    while (recentKeywordQueue.length > KEYWORD_WINDOW) {
        const removed = recentKeywordQueue.shift();
        const count = recentKeywordCounts.get(removed) || 0;
        if (count <= 1) {
            recentKeywordCounts.delete(removed);
        } else {
            recentKeywordCounts.set(removed, count - 1);
        }
    }

    if (questionType) {
        recentTypeHistory.push(questionType);
        if (recentTypeHistory.length > 12) {
            recentTypeHistory.shift();
        }
    }

    if (meta) {
        recentMetaHistory.push({
            id: meta.id,
            groupId: meta.groupId || null,
            category: meta.category || null,
            keywords,
            timestamp: Date.now()
        });
        if (recentMetaHistory.length > 15) {
            recentMetaHistory.shift();
        }
    }
}

function getRecentTypes() {
    return [...recentTypeHistory];
}

function hasRequiredFields(meta, requireFields = []) {
    return requireFields.every((field) => {
        const value = meta?.[field];
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        return true;
    });
}

function overlapsRecentKeywords(keywords = []) {
    let overlap = 0;
    for (const keyword of keywords) {
        if (recentKeywordCounts.has(keyword)) {
            overlap += 1;
        }
    }
    return overlap;
}

function violatesDiversity(meta) {
    if (!meta) return false;
    const recent = recentMetaHistory.slice(-6);
    const sameGroup = meta.groupId && recent.some((item) => item.groupId && item.groupId === meta.groupId);
    const sameCategory = meta.category && recent.filter((item) => item.category === meta.category).length >= 2;
    const keywordOverlap = overlapsRecentKeywords(meta.keywords || []);
    return sameGroup || sameCategory || keywordOverlap >= 6;
}

const ECON_TAGS = new Set([
    'economy', 'economic', 'economics', 'trade', 'gdp', 'gross', 'domestic', 'product', 'income', 'employment',
    'unemployment', 'labor', 'labour', 'wage', 'population', 'demographic', 'demographics', 'industrial', 'industry',
    'production', 'consumption', 'inflation', 'price', 'exports', 'imports', 'market', 'finance', 'budget', 'fiscal',
    'monetary', 'tax', 'tariff', 'growth', 'agriculture', 'housing', 'census', 'statistics'
]);

const QUESTION_TYPE_PREDICATES = {
    map: (meta) => meta?.dominantType === 'map',
    chart: (meta) => meta?.dominantType === 'chart' && !isTimelineMeta(meta),
    photo: (meta) => meta?.dominantType === 'photo' || (meta?.dominantType === 'illustration' && !looksLikeCartoon(meta)),
    'political-cartoon': (meta) => meta?.dominantType === 'cartoon' || looksLikeCartoon(meta),
    'document-excerpt': (meta) => meta?.dominantType === 'screenshot' || meta?.dominantType === 'illustration',
    table: (meta) => meta?.dominantType === 'table',
    timeline: (meta) => isTimelineMeta(meta)
};

function isTimelineMeta(meta = {}) {
    const haystack = [meta.fileName, meta.altText, meta.detailedDescription]
        .concat(meta.keywords || [])
        .join(' ')
        .toLowerCase();
    return haystack.includes('timeline') || haystack.includes('chronology') || haystack.includes('timeline:');
}

function looksLikeCartoon(meta = {}) {
    const haystack = [meta.fileName, meta.altText, meta.detailedDescription]
        .concat(meta.keywords || [])
        .join(' ')
        .toLowerCase();
    return haystack.includes('cartoon') || haystack.includes('satire') || haystack.includes('caricature');
}

function filterByTags(meta, allowTags = []) {
    if (!allowTags.length) return true;
    const keywords = meta?.keywords || [];
    return allowTags.some((tag) => keywords.includes(tag.toLowerCase()));
}

function prefersEconomic(meta) {
    const keywords = meta?.keywords || [];
    return keywords.some((kw) => ECON_TAGS.has(kw));
}

function rankCandidates(candidates, { requireEconomic = false } = {}) {
    const scored = candidates.map((meta) => {
        const overlap = overlapsRecentKeywords(meta.keywords || []);
        const economicBonus = requireEconomic && prefersEconomic(meta) ? -2 : 0;
        const diversityPenalty = violatesDiversity(meta) ? 5 : 0;
        return { meta, score: overlap + diversityPenalty + economicBonus + Math.random() * 0.5 };
    });
    scored.sort((a, b) => a.score - b.score);
    return scored.map((s) => s.meta);
}

function pickImage({ allowTags = [], avoidRecent = true, requireFields = ['altText', 'detailedDescription'], questionType, requireEconomic = false } = {}) {
    const metadata = loadMetadata();
    const predicate = questionType ? QUESTION_TYPE_PREDICATES[questionType] : null;
    let candidates = metadata.filter((meta) => {
        if (predicate && !predicate(meta)) return false;
        if (!hasRequiredFields(meta, requireFields)) return false;
        if (allowTags.length && !filterByTags(meta, allowTags)) return false;
        if (requireEconomic && !prefersEconomic(meta)) return false;
        return true;
    });

    if (!candidates.length) return null;

    if (avoidRecent) {
        candidates = candidates.filter((meta) => !recentIdSet.has(meta.id));
    }

    if (!candidates.length) {
        candidates = metadata.filter((meta) => {
            if (predicate && !predicate(meta)) return false;
            if (!hasRequiredFields(meta, requireFields)) return false;
            if (allowTags.length && !filterByTags(meta, allowTags)) return false;
            if (requireEconomic && !prefersEconomic(meta)) return false;
            return true;
        });
    }

    if (!candidates.length) return null;

    const ranked = rankCandidates(candidates, { requireEconomic });
    const chosen = ranked[0];
    if (chosen) {
        markImageUsed(chosen, questionType || null);
    }
    return chosen || null;
}

function selectVisualCombo({ desiredType, allowTags = [], requireFields = ['altText', 'detailedDescription'], requireEconomic = false } = {}) {
    const typesToConsider = desiredType ? [desiredType] : Object.keys(QUESTION_TYPE_PREDICATES);
    const history = getRecentTypes();

    for (const type of typesToConsider) {
        if (history.length >= 2 && history.slice(-2).every((t) => t === type)) {
            continue;
        }
        const candidate = pickImage({
            allowTags,
            requireFields,
            questionType: type,
            requireEconomic
        });
        if (candidate) {
            return { questionType: type, imageMeta: candidate };
        }
    }

    for (const type of typesToConsider) {
        const candidate = pickImage({
            allowTags,
            requireFields,
            questionType: type,
            requireEconomic,
            avoidRecent: false
        });
        if (candidate) {
            return { questionType: type, imageMeta: candidate };
        }
    }

    // Fallback to any type if strict constraints fail
    const fallbackCandidate = pickImage({ allowTags, requireFields, questionType: null, requireEconomic });
    if (fallbackCandidate) {
        const resolvedType = desiredType || inferQuestionType(fallbackCandidate) || 'photo';
        return { questionType: resolvedType, imageMeta: fallbackCandidate };
    }

    return null;
}

function inferQuestionType(meta = {}) {
    const entries = Object.entries(QUESTION_TYPE_PREDICATES);
    for (const [type, predicate] of entries) {
        if (predicate(meta)) return type;
    }
    return null;
}

function resetState() {
    METADATA_CACHE = null;
    recentIdQueue.length = 0;
    recentIdSet.clear();
    recentKeywordQueue.length = 0;
    recentKeywordCounts.clear();
    recentTypeHistory.length = 0;
    recentMetaHistory.length = 0;
}

module.exports = {
    pickImage,
    selectVisualCombo,
    inferQuestionType,
    loadMetadata,
    markImageUsed,
    getRecentTypes,
    resetState,
    ECON_TAGS
};
