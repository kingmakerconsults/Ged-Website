const fs = require('fs');
const path = require('path');
const { fetchApproved } = require('../fetch/fetcher');

const OFFLINE_CACHE_PATH = path.join(__dirname, '../../data/social_blurbs_cache.json');
let offlineCache = {};
try {
    if (fs.existsSync(OFFLINE_CACHE_PATH)) {
        const raw = fs.readFileSync(OFFLINE_CACHE_PATH, 'utf8');
        offlineCache = raw ? JSON.parse(raw) : {};
    }
} catch (err) {
    console.warn('[socialStudies] Unable to load blurb cache:', err.message || err);
    offlineCache = {};
}

const memoryCache = new Map();

function normalizeTopic(topic = '') {
    return topic.trim().toLowerCase();
}

function slugify(topic = '') {
    return topic
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        || null;
}

function clampWords(text = '', { min = 60, max = 200 } = {}) {
    const tokens = text.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return '';
    if (tokens.length < min) {
        return tokens.join(' ');
    }
    return tokens.slice(0, max).join(' ');
}

function isWithinRange(text = '', { min = 60, max = 200 } = {}) {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    return wordCount >= min && wordCount <= max;
}

function buildCitation(title = '', domain = 'Britannica') {
    const cleanTitle = title && title.trim().length ? title.trim() : 'Referenced article';
    return `Source: ${cleanTitle} (${domain}).`;
}

async function tryFetchFrom(url, topic, { maxWords }) {
    try {
        const result = await fetchApproved(url);
        if (!result || !result.text) return null;
        const combined = [result.title, result.text].filter(Boolean).join('\n');
        const normalized = combined.replace(/\s+/g, ' ').trim();
        if (!normalized) return null;
        const clamped = clampWords(normalized, { min: 60, max: maxWords });
        const withinRange = isWithinRange(clamped, { min: 60, max: maxWords });
        if (!withinRange) return null;
        return {
            text: clamped,
            title: result.title || topic,
            url,
            citation: buildCitation(result.title || topic)
        };
    } catch (err) {
        return null;
    }
}

async function fetchExternalBlurb({ topic, maxWords = 200 } = {}) {
    if (!topic || !topic.trim()) return null;
    const normalizedTopic = normalizeTopic(topic);
    if (memoryCache.has(normalizedTopic)) {
        return memoryCache.get(normalizedTopic);
    }

    if (offlineCache[normalizedTopic]) {
        const cached = offlineCache[normalizedTopic];
        const text = clampWords(cached.text || '', { min: 60, max: maxWords });
        if (isWithinRange(text, { min: 60, max: maxWords })) {
            const payload = {
                text,
                title: cached.title || topic,
                url: cached.url || null,
                citation: cached.citation || buildCitation(cached.title || topic, cached.domain || 'Britannica')
            };
            memoryCache.set(normalizedTopic, payload);
            return payload;
        }
    }

    const slug = slugify(topic);
    const candidates = [];
    if (slug) {
        candidates.push(`https://www.britannica.com/topic/${slug}`);
        candidates.push(`https://www.britannica.com/place/${slug}`);
        candidates.push(`https://www.britannica.com/event/${slug}`);
        candidates.push(`https://www.britannica.com/biography/${slug}`);
        candidates.push(`https://www.britannica.com/money/topic/${slug}`);
    }

    if (slug) {
        candidates.push(`https://www.loc.gov/search/?in=&q=${encodeURIComponent(topic)}&all=true`);
        candidates.push(`https://www.archives.gov/search?query=${encodeURIComponent(topic)}`);
        candidates.push(`https://www.census.gov/search-results.html?q=${encodeURIComponent(topic)}`);
    }

    for (const url of candidates) {
        if (!url) continue;
        const domain = new URL(url).hostname;
        if (!['www.britannica.com', 'britannica.com', 'www.loc.gov', 'loc.gov', 'www.archives.gov', 'archives.gov', 'www.census.gov', 'census.gov'].includes(domain)) {
            continue;
        }
        const result = await tryFetchFrom(url, topic, { maxWords });
        if (result) {
            memoryCache.set(normalizedTopic, result);
            return result;
        }
    }

    return null;
}

module.exports = {
    fetchExternalBlurb,
    clampWords,
    isWithinRange,
    normalizeTopic,
    buildCitation
};
