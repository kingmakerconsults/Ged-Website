const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const sanitizeHtml = require('sanitize-html');

const schema = require('../../schemas/imageRef.schema.json');

const ajv = new Ajv({
    allErrors: true,
    strict: false,
    removeAdditional: 'failing',
    useDefaults: false
});
addFormats(ajv);

const validate = ajv.compile(schema);

const MAX_ALT_LENGTH = 250;
const MAX_CAPTION_LENGTH = 800;
const MAX_TEXT_LENGTH = 500;

function clampLength(value, maxLength) {
    if (typeof value !== 'string') return value;
    return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function cleanString(value, maxLength = MAX_TEXT_LENGTH) {
    if (value == null) return undefined;
    const stripped = sanitizeHtml(String(value), {
        allowedTags: [],
        allowedAttributes: {}
    })
        .replace(/\s+/g, ' ')
        .trim();
    if (!stripped) return undefined;
    return maxLength ? clampLength(stripped, maxLength) : stripped;
}

function normalizeTags(tags) {
    if (!Array.isArray(tags)) return undefined;
    const cleaned = tags
        .map((tag) => cleanString(tag, 120))
        .filter((tag) => typeof tag === 'string' && tag.length > 0);
    if (!cleaned.length) return undefined;
    const unique = Array.from(new Set(cleaned.map((tag) => tag.toLowerCase())));
    const deduped = unique.map((lower) => cleaned.find((tag) => tag.toLowerCase() === lower)).filter(Boolean);
    return deduped.slice(0, 50);
}

function toPositiveInteger(value) {
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return undefined;
    const rounded = Math.round(num);
    return rounded > 0 ? rounded : undefined;
}

function buildPayload(imageRef = {}) {
    if (!imageRef || typeof imageRef !== 'object') {
        return null;
    }

    const sanitizedUrl = cleanString(imageRef.imageUrl, 2048);
    const sanitizedAlt = cleanString(imageRef.alt ?? imageRef.altText, MAX_ALT_LENGTH);
    const sanitizedSubject = cleanString(imageRef.subject, MAX_TEXT_LENGTH);

    const payload = {
        imageUrl: sanitizedUrl,
        alt: sanitizedAlt,
        subject: sanitizedSubject
    };

    const captionSource = imageRef.caption ?? imageRef.imageMeta?.caption;
    const creditSource = imageRef.credit ?? imageRef.imageMeta?.credit;
    const licenseSource = imageRef.license ?? imageRef.imageMeta?.license;
    const widthSource = imageRef.width ?? imageRef.imageMeta?.width;
    const heightSource = imageRef.height ?? imageRef.imageMeta?.height;
    const tagsSource = imageRef.tags ?? imageRef.imageMeta?.keywords ?? imageRef.keywords;

    const caption = cleanString(captionSource, MAX_CAPTION_LENGTH);
    if (caption) {
        payload.caption = caption;
    }

    const credit = cleanString(creditSource);
    if (credit) {
        payload.credit = credit;
    }

    const license = cleanString(licenseSource);
    if (license) {
        payload.license = license;
    }

    const width = toPositiveInteger(widthSource);
    if (width) {
        payload.width = width;
    }

    const height = toPositiveInteger(heightSource);
    if (height) {
        payload.height = height;
    }

    const tags = normalizeTags(tagsSource);
    if (tags) {
        payload.tags = tags;
    }

    return payload;
}

function validateImageRef(imageRef) {
    const payload = buildPayload(imageRef);
    if (!payload) {
        throw new Error('Invalid imageRef payload: expected an object.');
    }

    const valid = validate(payload);
    if (!valid) {
        const errors = (validate.errors || []).map((error) => ({
            path: error.instancePath || '',
            keyword: error.keyword,
            message: error.message,
            params: error.params
        }));
        console.error('[images] imageRef validation failed', {
            errors,
            imageUrl: payload.imageUrl,
            subject: payload.subject
        });
        throw new Error('Image reference failed validation.');
    }

    return payload;
}

module.exports = {
    validateImageRef
};
