const path = require('path');
const { loadImageMeta, resolveImageRef } = require('./src/images/metaLoader');

function createEmptyMeta() {
    return { list: [], byFile: new Map(), byId: new Map(), byUrl: new Map(), path: null };
}

let IMAGE_META = createEmptyMeta();

(() => {
    const candidate = path.join(__dirname, 'data', 'image_metadata_final.json');
    const loaded = loadImageMeta(candidate);
    if (loaded && Array.isArray(loaded.list) && loaded.list.length) {
        IMAGE_META = loaded;
    } else {
        console.warn('[imageResolver] No image metadata available; resolver will operate with empty cache.');
    }
})();

function resolveImage(ref) {
    const resolved = resolveImageRef(ref, IMAGE_META);
    return resolved || null;
}

module.exports = {
    resolveImage
};
