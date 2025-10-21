const { deriveIsScreenshot, DEFAULT_ALT } = require('../utils/metaLoader');
const { deriveVisualFeatures } = require('../utils/visualFeatures');
const { pickTemplate } = require('./dispatch');
const { validateSS } = require('./validators');
const { resolveImage } = require('../../imageResolver');
const { validateImageRef } = require('../images/validateImageRef');

const FILENAME_RX = /\.(?:png|jpe?g|gif|webp|svg)\b/i;
const SCREENSHOT_RX = /\b[Ss]creenshot(s)?\b/g;

function stripSourceLines(text = '') {
    if (typeof text !== 'string') return '';
    return text
        .replace(/Source:\s*[^\n]+?\.(?:png|jpe?g|gif|webp|svg)\s*$/gmi, '')
        .replace(SCREENSHOT_RX, 'image')
        .trim();
}

function sanitizeMeta(meta = {}, resolvedMeta = {}) {
    const output = { ...meta };
    delete output.fileName;
    delete output.filePath;
    delete output.file;
    delete output.path;
    if (meta.id) output.id = meta.id;
    if (resolvedMeta.title) output.title = stripSourceLines(resolvedMeta.title);
    if (resolvedMeta.alt || resolvedMeta.altText) {
        output.altText = stripSourceLines(resolvedMeta.altText || resolvedMeta.alt);
    }
    if (resolvedMeta.caption) output.caption = stripSourceLines(resolvedMeta.caption);
    if (output.caption && (FILENAME_RX.test(output.caption) || SCREENSHOT_RX.test(output.caption))) {
        output.caption = stripSourceLines(output.caption.replace(FILENAME_RX, ''));
    }
    if (output.title) output.title = stripSourceLines(output.title);
    if (output.caption) output.caption = stripSourceLines(output.caption);
    if (output.altText) output.altText = stripSourceLines(output.altText);
    if (meta.subject) output.subject = meta.subject;
    if (meta.category) output.category = meta.category;
    return output;
}

function generateItemForMeta(meta = {}, imageUrl) {
    const fileName = (meta.file || meta.path || meta.image_url || imageUrl || meta.fileName || meta.filePath || '')
        .toString()
        .split('/')
        .pop() || '';
    const isScreenshot = deriveIsScreenshot(fileName, meta);
    const features = deriveVisualFeatures(meta);

    const draft = pickTemplate(meta, features);

    const resolved = resolveImage({
        file: meta?.fileName || fileName,
        path: meta?.filePath || meta?.path,
        title: meta?.title,
        caption: meta?.caption,
        alt: meta?.altText
    });
    const fallbackUrl = typeof imageUrl === 'string' && imageUrl.trim() ? imageUrl.trim() : null;
    const resolvedUrl = resolved?.imageUrl || fallbackUrl;
    const imageRef = resolvedUrl
        ? validateImageRef({
            imageUrl: resolvedUrl,
            alt: resolved?.imageMeta?.altText || resolved?.imageMeta?.alt || meta?.altText || DEFAULT_ALT,
            subject: meta?.subject || 'social_studies',
            caption: resolved?.imageMeta?.caption || meta?.caption,
            credit: resolved?.imageMeta?.credit || meta?.credit,
            license: resolved?.imageMeta?.license || meta?.license,
            width: resolved?.imageMeta?.width || meta?.width,
            height: resolved?.imageMeta?.height || meta?.height,
            tags: resolved?.imageMeta?.keywords || meta?.keywords || meta?.tags
        })
        : null;

    const item = {
        domain: 'social_studies',
        difficulty: 'medium',
        skill: 'identify',
        imageRef: imageRef || undefined,
        imageMeta: sanitizeMeta(meta, resolved?.imageMeta || {}),
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
