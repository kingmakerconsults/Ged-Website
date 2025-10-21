const { generateItemForMeta } = require('./generateScreenshotItem');

function planDifficulty(total = 12) {
    return { easy: 4, medium: 5, hard: 3 };
}

function enforceUnique(items = []) {
    const seen = new Set();
    const out = [];
    for (const item of items) {
        const key = `${item.imageMeta?.id || item.imageRef?.imageUrl}::${item.skill}::${item.difficulty}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(item);
    }
    return out;
}

function buildBatch(metas = [], resolver = () => null) {
    const items = [];
    for (const meta of metas) {
        const url = resolver(meta);
        try {
            items.push(generateItemForMeta(meta, url));
        } catch (err) {
            console.warn(String(err));
        }
    }
    return enforceUnique(items);
}

module.exports = {
    planDifficulty,
    enforceUnique,
    buildBatch
};
