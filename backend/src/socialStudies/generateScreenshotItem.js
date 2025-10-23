const { deriveIsScreenshot, DEFAULT_ALT } = require('../utils/metaLoader');
const { deriveVisualFeatures } = require('../utils/visualFeatures');
const { pickTemplate } = require('./dispatch');
const { validateSS } = require('./validators');
const {
    resolveImage,
    resolveImageMeta: resolveCuratedImage,
    isImageEligible
} = require('../../imageResolver');
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

function sanitizeMeta(meta = {}, resolvedMeta = {}, record = {}) {
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
    const recordSubject = record.subject || resolvedMeta.subject;
    if (recordSubject) output.subject = recordSubject;
    if (record.visualType || resolvedMeta.visualType) {
        output.visualType = record.visualType || resolvedMeta.visualType;
    }
    if (record.timePeriod || resolvedMeta.timePeriod) {
        output.timePeriod = record.timePeriod || resolvedMeta.timePeriod;
    }
    if (record.region || resolvedMeta.region) {
        output.region = record.region || resolvedMeta.region;
    }
    const ensureArray = (value) => {
        if (Array.isArray(value)) {
            return value.filter((entry) => {
                if (typeof entry === 'string') {
                    return entry.trim().length > 0;
                }
                return entry != null;
            }).map((entry) => (typeof entry === 'string' ? entry.trim() : entry));
        }
        return [];
    };
    const concepts = ensureArray(record.concepts).length
        ? ensureArray(record.concepts)
        : ensureArray(resolvedMeta.concepts).length
            ? ensureArray(resolvedMeta.concepts)
            : ensureArray(meta.concepts);
    if (concepts.length) output.concepts = concepts;
    const subtopics = ensureArray(record.subtopics).length
        ? ensureArray(record.subtopics)
        : ensureArray(resolvedMeta.subtopics).length
            ? ensureArray(resolvedMeta.subtopics)
            : ensureArray(meta.subtopics);
    if (subtopics.length) output.subtopics = subtopics;
    const questionHooks = ensureArray(record.questionHooks).length
        ? ensureArray(record.questionHooks)
        : ensureArray(resolvedMeta.questionHooks).length
            ? ensureArray(resolvedMeta.questionHooks)
            : ensureArray(meta.questionHooks);
    if (questionHooks.length) output.questionHooks = questionHooks;
    if (typeof record.answerableFromImage === 'boolean') {
        output.answerableFromImage = record.answerableFromImage;
    } else if (typeof meta.answerableFromImage === 'boolean') {
        output.answerableFromImage = meta.answerableFromImage;
    }
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
    const record = resolved?.record
        || resolveCuratedImage(meta?.id || meta?.filePath || meta?.file || fileName || imageUrl);
    if (!record || !record.src || !isImageEligible(record)) {
        throw new Error(`[IMG-GUARD] Skipped weak metadata for ${meta?.id || fileName}`);
    }
    const fallbackUrl = typeof imageUrl === 'string' && imageUrl.trim() ? imageUrl.trim() : null;
    const resolvedUrl = record.src || resolved?.imageUrl || fallbackUrl;
    const imageRef = resolvedUrl
        ? validateImageRef({
            imageUrl: resolvedUrl,
            alt: record.alt || record.altText || resolved?.imageMeta?.altText || resolved?.imageMeta?.alt || meta?.altText || DEFAULT_ALT,
            subject: record.subject || meta?.subject || 'social_studies',
            caption: record.caption || resolved?.imageMeta?.caption || meta?.caption,
            credit: record.credit || resolved?.imageMeta?.credit || meta?.credit,
            license: meta?.license,
            width: record.width || resolved?.imageMeta?.width || meta?.width,
            height: record.height || resolved?.imageMeta?.height || meta?.height,
            tags: record.keywords || resolved?.imageMeta?.keywords || meta?.keywords || meta?.tags
        })
        : null;

    const item = {
        domain: 'social_studies',
        difficulty: 'medium',
        skill: 'identify',
        imageRef: imageRef || undefined,
        imageMeta: sanitizeMeta(meta, resolved?.imageMeta || {}, record),
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
