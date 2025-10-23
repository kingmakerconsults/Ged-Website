const fs = require('fs/promises');
const path = require('path');

const BLURBS_FILE = path.join(__dirname, '..', '..', 'data', 'social_blurbs_cache.json');

function sentenceTrim(text, min = 80, max = 180) {
    if (!text || text.length <= max) return text;
    const slice = text.slice(0, max + 1);
    const lastPunct = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
    const end = lastPunct > min ? lastPunct + 1 : max;
    return slice.slice(0, end).trim();
}

async function loadBlurbs() {
    const raw = await fs.readFile(BLURBS_FILE, 'utf8');
    const obj = JSON.parse(raw || '{}');
    const keys = Object.keys(obj);
    return keys
        .map((k) => ({ key: k, ...obj[k] }))
        .filter((entry) => entry && entry.text);
}

async function getRandomPassage() {
    const all = await loadBlurbs();
    if (!all.length) return null;
    const pick = all[Math.floor(Math.random() * all.length)];
    return {
        title: pick.title || pick.key || 'Passage',
        text: sentenceTrim(String(pick.text || '').trim()),
        citation: String(pick.citation || '').trim(),
        url: String(pick.url || '').trim(),
        domain: String(pick.domain || '').trim()
    };
}

module.exports = { getRandomPassage, sentenceTrim, loadBlurbs };
