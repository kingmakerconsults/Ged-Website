const { deriveIsScreenshot } = require('../utils/metaLoader');
const { deriveVisualFeatures } = require('../utils/visualFeatures');
const { pickTemplate } = require('./dispatch');
const { validateSS } = require('./validators');

function generateItemForMeta(meta = {}, imageUrl) {
    const fileName = (meta.file || meta.path || meta.image_url || imageUrl || meta.fileName || meta.filePath || '')
        .toString()
        .split('/')
        .pop() || '';
    const isScreenshot = deriveIsScreenshot(fileName, meta);
    const features = deriveVisualFeatures(meta);

    const draft = pickTemplate(meta, features);

    const item = {
        domain: 'social_studies',
        difficulty: 'medium',
        skill: 'identify',
        imageRef: {
            path: imageUrl || `/static/images/${fileName}`,
            altText: meta?.altText || meta?.title || fileName,
            caption: isScreenshot ? `Screenshot — ${meta?.title || fileName}` : (meta?.title || '')
        },
        imageMeta: meta,
        questionType: features.hasTable ? 'table' : features.hasChart ? 'chart' : features.hasMap ? 'map' : 'photo',
        ...draft
    };

    if (!validateSS(item, meta, features, isScreenshot)) {
        console.error('SS_FAIL', {
            file: fileName,
            reason: 'validation',
            flags: { hasTable: features.hasTable, hasChart: features.hasChart, hasMap: features.hasMap },
            title: meta?.title
        });
        throw new Error(`SS_VALIDATION_FAIL:${fileName}`);
    }

    return item;
}

module.exports = {
    generateItemForMeta
};
