let Ajv = null;
let addFormats = null;
try {
    Ajv = require('ajv');
    addFormats = require('ajv-formats');
} catch (err) {
    Ajv = null;
    addFormats = null;
}

let sanitizeHtmlLib = null;
try {
    sanitizeHtmlLib = require('sanitize-html');
} catch (err) {
    sanitizeHtmlLib = null;
}

const diagnostics = require('./imageDiagnostics');
const schema = require('../../schemas/imageRef.schema.json');

let validate;
const ajv = Ajv ? new Ajv({
    allErrors: true,
    strict: false,
    removeAdditional: 'failing',
    useDefaults: false
}) : null;
if (ajv && typeof addFormats === 'function') {
    addFormats(ajv);
}
if (ajv) {
    validate = ajv.compile(schema);
}

const MAX_ALT_LENGTH = 250;
const MAX_CAPTION_LENGTH = 800;
const MAX_TEXT_LENGTH = 500;

function clampLength(value, maxLength) {
    if (typeof value !== 'string') return value;
    return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function stripHtml(value) {
    if (sanitizeHtmlLib) {
        return sanitizeHtmlLib(String(value), {
            allowedTags: [],
            allowedAttributes: {}
        });
    }
    return String(value).replace(/<[^>]*>/g, '');
}

function cleanString(value, maxLength = MAX_TEXT_LENGTH) {
    if (value == null) return undefined;
    const stripped = stripHtml(String(value))
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

function fallbackValidatePayload(payload) {
    const errors = [];

    const checkString = (value, path, { required = false, min = 0, max = Infinity, pattern = null } = {}) => {
        if (value == null) {
            if (required) {
                errors.push({ path, keyword: 'required', message: 'is required' });
            }
            return;
        }
        if (typeof value !== 'string') {
            errors.push({ path, keyword: 'type', message: 'must be string' });
            return;
        }
        if (value.length < min) {
            errors.push({ path, keyword: 'minLength', message: `must NOT have fewer than ${min} characters` });
        }
        if (value.length > max) {
            errors.push({ path, keyword: 'maxLength', message: `must NOT have more than ${max} characters` });
        }
        if (pattern && !pattern.test(value)) {
            errors.push({ path, keyword: 'pattern', message: 'must match pattern' });
        }
    };

    const checkPositiveInteger = (value, path) => {
        if (value == null) return;
        const num = Number(value);
        if (!Number.isFinite(num) || num <= 0 || Math.round(num) !== num) {
            errors.push({ path, keyword: 'type', message: 'must be a positive integer' });
        }
    };

    checkString(payload.imageUrl, '/imageUrl', { required: true, min: 1, max: 2048, pattern: /^(https?:\/\/|\/).+/ });
    checkString(payload.alt, '/alt', { required: true, min: 1, max: 500 });
    checkString(payload.subject, '/subject', { required: true, min: 1, max: 120 });
    checkString(payload.caption, '/caption', { min: 1, max: 1000 });
    checkString(payload.credit, '/credit', { min: 1, max: 500 });
    checkString(payload.license, '/license', { min: 1, max: 500 });
    checkPositiveInteger(payload.width, '/width');
    checkPositiveInteger(payload.height, '/height');

    if (payload.tags != null) {
        if (!Array.isArray(payload.tags)) {
            errors.push({ path: '/tags', keyword: 'type', message: 'must be an array' });
        } else {
            if (payload.tags.length > 50) {
                errors.push({ path: '/tags', keyword: 'maxItems', message: 'must NOT have more than 50 items' });
            }
            const seen = new Set();
            payload.tags.forEach((tag, index) => {
                if (typeof tag !== 'string') {
                    errors.push({ path: `/tags/${index}`, keyword: 'type', message: 'must be string' });
                    return;
                }
                if (!tag.length) {
                    errors.push({ path: `/tags/${index}`, keyword: 'minLength', message: 'must NOT have fewer than 1 characters' });
                }
                if (tag.length > 120) {
                    errors.push({ path: `/tags/${index}`, keyword: 'maxLength', message: 'must NOT have more than 120 characters' });
                }
                const lower = tag.toLowerCase();
                if (seen.has(lower)) {
                    errors.push({ path: '/tags', keyword: 'uniqueItems', message: 'must NOT contain duplicate items' });
                } else {
                    seen.add(lower);
                }
            });
        }
    }

    return { valid: errors.length === 0, errors };
}

if (!validate) {
    validate = (payload) => {
        const result = fallbackValidatePayload(payload);
        validate.errors = result.errors;
        return result.valid;
    };
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
        console.error('[images] imageRef validation failed: invalid payload.');
        return { error: 'invalid-payload' };
    }

    let cleanedUrl = payload.imageUrl || '';
    if (!cleanedUrl) {
        console.error('[images] imageRef validation failed: missing imageUrl.');
        return { error: 'unresolvable', imageUrl: null, subject: payload.subject };
    }

    for (let i = 0; i < 3; i += 1) {
        try {
            const decoded = decodeURIComponent(cleanedUrl);
            if (decoded === cleanedUrl) break;
            cleanedUrl = decoded;
        } catch (err) {
            break;
        }
    }

    cleanedUrl = cleanedUrl.replace(/^\.?\/+/, '/');
    if (!cleanedUrl.startsWith('/')) {
        cleanedUrl = '/' + cleanedUrl.replace(/^\.?\/+/, '');
    }

    if (/^https?:\/\//i.test(cleanedUrl)) {
        console.warn('[images] rejecting external image URL:', cleanedUrl);
        return { error: 'external', imageUrl: cleanedUrl, subject: payload.subject };
    }

    payload.imageUrl = encodeURI(cleanedUrl);

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
        return { error: 'unresolvable', errors, imageUrl: payload.imageUrl, subject: payload.subject };
    }

    return payload;
}

function buildContextLabel(subject, context = {}) {
    const parts = [];
    if (subject) {
        parts.push(`subject=${subject}`);
    }
    if (context.source) {
        parts.push(`source=${context.source}`);
    }
    if (context.id != null) {
        parts.push(`id=${context.id}`);
    }
    if (context.index != null) {
        parts.push(`index=${context.index}`);
    }
    return parts.length ? parts.join(' ') : 'unknown-context';
}

function extractTags(imageRef) {
    if (!imageRef || typeof imageRef !== 'object') {
        return undefined;
    }
    if (Array.isArray(imageRef.tags) && imageRef.tags.length) {
        return imageRef.tags;
    }
    if (Array.isArray(imageRef?.imageMeta?.keywords) && imageRef.imageMeta.keywords.length) {
        return imageRef.imageMeta.keywords;
    }
    return undefined;
}

async function assertValidImageRef(imageRef, options = {}) {
    const { subject, context = {}, attemptPlaceholder = true } = options;
    diagnostics.recordValidationCheck();
    const label = buildContextLabel(subject, context);

    try {
        const payload = validateImageRef(imageRef);
        if (payload?.error) {
            throw new Error(payload.error === 'external' ? 'External image URL blocked.' : 'Image reference failed validation.');
        }
        diagnostics.recordValidationSuccess();
        const sanitized = { ...payload };
        if (imageRef && typeof imageRef.imageMeta === 'object' && imageRef.imageMeta) {
            sanitized.imageMeta = { ...imageRef.imageMeta };
        }
        return { ok: true, imageRef: sanitized, placeholder: false };
    } catch (err) {
        diagnostics.recordValidationFailure();
        const errorMessage = err?.message || String(err);

        if (attemptPlaceholder) {
            diagnostics.recordPlaceholderAttempt();
            try {
                // Lazily require to avoid circular dependency issues during module initialization.
                const { resolveImageRef } = require('./resolveImageRef');
                const fallbackSubject = subject || imageRef?.subject || null;
                const resolved = await resolveImageRef(imageRef || {}, {
                    subject: fallbackSubject || undefined,
                    tags: extractTags(imageRef)
                });
                diagnostics.recordPlaceholderSuccess();
                console.warn(`[IMAGING] Validation failed for ${label}; substituting placeholder image.`);
                return { ok: true, imageRef: resolved, placeholder: true };
            } catch (placeholderErr) {
                diagnostics.recordPlaceholderFailure();
                const placeholderMessage = placeholderErr?.message || String(placeholderErr);
                console.warn(`[IMAGING] Placeholder resolution failed for ${label}: ${placeholderMessage}`);
            }
        }

        diagnostics.recordImageStripped(subject, {
            reason: 'validation_failed',
            id: context.id,
            index: context.index,
            source: context.source
        });
        console.warn(`[IMAGING] Stripping image for ${label}: ${errorMessage}`);
        return { ok: false, error: err instanceof Error ? err : new Error(errorMessage) };
    }
}

module.exports = {
    validateImageRef,
    assertValidImageRef
};
