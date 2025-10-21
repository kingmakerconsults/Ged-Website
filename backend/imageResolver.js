const path = require('path');
const { loadImageMeta, resolveImageRef } = require('./src/images/metaLoader');

function createEmptyMeta() {
    return { list: [], byFile: new Map(), byId: new Map() };
}

let IMAGE_META = createEmptyMeta();

try {
    IMAGE_META = loadImageMeta(path.join(__dirname, 'data', 'image_metadata_final.json'));
} catch (err) {
    console.warn(`[imageResolver] Failed to load metadata: ${err?.message || err}`);
}

function resolveImage(ref) {
    const resolved = resolveImageRef(ref, IMAGE_META);
    return resolved || null;
}

module.exports = {
    resolveImage
};
