const { loadImageMeta, resolveImageRef } = require('../images/metaLoader');

function deriveIsScreenshot(fileName = '', meta = {}) {
    const normalized = String(fileName || meta.file || '').toLowerCase();
    if (normalized.startsWith('screenshot')) {
        return true;
    }
    const tags = Array.isArray(meta?.tags)
        ? meta.tags.map((tag) => String(tag).toLowerCase())
        : [];
    if (tags.includes('screenshot')) {
        return true;
    }
    const type = typeof meta?.type === 'string' ? meta.type.toLowerCase() : '';
    return type === 'screenshot';
}

module.exports = {
    loadImageMeta,
    resolveImageRef,
    deriveIsScreenshot
};
