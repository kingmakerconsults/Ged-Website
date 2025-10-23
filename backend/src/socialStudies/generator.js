const crypto = require('crypto');
const {
    selectVisualCombo,
    inferQuestionType,
    ECON_TAGS,
    resetState: resetImageState
} = require('./imageBank');
const { fetchExternalBlurb } = require('./blurbs');
const { validateSocialStudiesItem } = require('./validator');
const { planDifficulty, expandDifficultyCounts } = require('./difficulty');
const { deriveVisualFeatures } = require('../utils/visualFeatures');
const { deriveIsScreenshot, probeImageHead, DEFAULT_ALT } = require('../utils/metaLoader');
const { validateImageRef } = require('../images/validateImageRef');
const { recordProbeFailure, recordImageStripped } = require('../images/imageDiagnostics');
const { validateSS } = require('./validators');
const { clampPassage } = require('./passage');
const {
    resolveImage,
    resolveImageMeta: resolveCuratedImage,
    isImageEligible
} = require('../../imageResolver');

const TYPE_RATIOS = {
    map: 0.3,
    civics: 0.25,
    charts: 0.25,
    economics: 0.2
};

const SOURCE_FILENAME_RX = /Source:\s*[^\n]+?\.(?:png|jpe?g|gif|webp|svg)\s*$/gmi;
const SCREENSHOT_WORD_RX = /\b[Ss]creenshot(s)?\b/g;

function stripSourceLines(text = '') {
    if (typeof text !== 'string') return '';
    return text
        .replace(SOURCE_FILENAME_RX, '')
        .replace(SCREENSHOT_WORD_RX, 'image')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function sanitizeImageMeta(meta = {}, resolvedMeta = {}, record = {}) {
    if (!meta || typeof meta !== 'object') return undefined;
    const cleaned = {};
    const title = stripSourceLines(meta.title || meta.sourceTitle || '');
    if (title) cleaned.title = title;
    const altText = stripSourceLines(meta.altText || meta.alt || '');
    if (altText) cleaned.altText = altText;
    const caption = stripSourceLines(meta.caption || '');
    if (caption) cleaned.caption = caption;
    const credit = stripSourceLines(meta.credit || '');
    if (credit) cleaned.credit = credit;
    const attribution = stripSourceLines(meta.attribution || '');
    if (attribution) cleaned.attribution = attribution;
    if (meta.id) cleaned.id = meta.id;
    const sourceTitle = stripSourceLines(meta?.source?.title || meta.sourceTitle || '');
    const sourceUrl = meta?.source?.url || meta.sourceUrl || null;
    if (sourceTitle || sourceUrl) {
        cleaned.source = {};
        if (sourceTitle) cleaned.source.title = sourceTitle;
        if (sourceUrl) cleaned.source.url = sourceUrl;
    }
    ['width', 'height', 'dominantType', 'keywords', 'usageDirectives', 'detailedDescription', 'featureSignature', 'isScreenshot', 'subject', 'category', 'license']
        .forEach((key) => {
            if (meta[key] != null) {
                cleaned[key] = Array.isArray(meta[key]) ? [...meta[key]] : meta[key];
            }
        });
    const recordFields = record && typeof record === 'object' ? record : {};
    const resolvedFields = resolvedMeta && typeof resolvedMeta === 'object' ? resolvedMeta : {};
    const pickArray = (value) => {
        if (Array.isArray(value)) {
            return value.filter((entry) => typeof entry === 'string' ? entry.trim() : entry).map((entry) => {
                return typeof entry === 'string' ? entry.trim() : entry;
            }).filter(Boolean);
        }
        return [];
    };

    const subject = recordFields.subject || resolvedFields.subject || meta.subject;
    if (subject) cleaned.subject = subject;
    const visualType = recordFields.visualType || resolvedFields.visualType || meta.visualType;
    if (visualType) cleaned.visualType = visualType;
    const timePeriod = recordFields.timePeriod || resolvedFields.timePeriod || meta.timePeriod;
    if (timePeriod) cleaned.timePeriod = timePeriod;
    const region = recordFields.region || resolvedFields.region || meta.region;
    if (region) cleaned.region = region;
    const concepts = pickArray(recordFields.concepts).length
        ? pickArray(recordFields.concepts)
        : pickArray(resolvedFields.concepts).length
            ? pickArray(resolvedFields.concepts)
            : pickArray(meta.concepts);
    if (concepts.length) cleaned.concepts = concepts;
    const subtopics = pickArray(recordFields.subtopics).length
        ? pickArray(recordFields.subtopics)
        : pickArray(resolvedFields.subtopics).length
            ? pickArray(resolvedFields.subtopics)
            : pickArray(meta.subtopics);
    if (subtopics.length) cleaned.subtopics = subtopics;
    const questionHooks = pickArray(recordFields.questionHooks).length
        ? pickArray(recordFields.questionHooks)
        : pickArray(resolvedFields.questionHooks).length
            ? pickArray(resolvedFields.questionHooks)
            : pickArray(meta.questionHooks);
    if (questionHooks.length) cleaned.questionHooks = questionHooks;
    if (typeof recordFields.answerableFromImage === 'boolean') {
        cleaned.answerableFromImage = recordFields.answerableFromImage;
    } else if (typeof meta.answerableFromImage === 'boolean') {
        cleaned.answerableFromImage = meta.answerableFromImage;
    }
    return Object.keys(cleaned).length ? cleaned : undefined;
}

function _normalizeImagePathForTest(raw) {
    if (!raw) return null;
    let value = String(raw).trim();
    if (!value) return null;
    if (/^https?:\/\//i.test(value) || value.startsWith('data:')) {
        return value;
    }
    try {
        value = decodeURIComponent(value);
    } catch (_) {
        // ignore decode errors
    }
    value = value.replace(/\\+/g, '/').replace(/^\.?\/+/, '');
    if (!value) return null;
    if (value.toLowerCase().startsWith('frontend/images/')) {
        value = value.substring('frontend/images/'.length);
    } else if (value.toLowerCase().startsWith('images/')) {
        value = value.substring('images/'.length);
    }
    return `/img/${encodeURI(value)}`;
}
function attachImageIfPresent(item = {}) {
    const existingUrl = typeof item?.imageRef?.imageUrl === 'string' ? item.imageRef.imageUrl : null;
    if (existingUrl) {
        const mergedMeta = {
            ...(item.imageMeta || {}),
            ...(item.imageRef.imageMeta || {})
        };
        const record = resolveCuratedImage(item.imageRef.id || existingUrl);
        if (record && !isImageEligible(record)) {
            console.warn(`[IMG-GUARD] Skipped weak metadata for ${record.id || existingUrl}`);
            delete item.imageRef;
            delete item.imageUrl;
            delete item.imageAlt;
            if (item.imageMeta) {
                const cleaned = sanitizeImageMeta(item.imageMeta);
                if (cleaned) {
                    item.imageMeta = cleaned;
                } else {
                    delete item.imageMeta;
                }
            }
            return item;
        }
        const cleanedMeta = sanitizeImageMeta(mergedMeta, item.imageRef.imageMeta || {}, record || {});
        const imageRef = { imageUrl: existingUrl };
        if (record?.id) imageRef.id = record.id;
        if (record?.caption) imageRef.caption = record.caption;
        if (record?.credit) imageRef.credit = record.credit;
        if (cleanedMeta) {
            const inlineMeta = {};
            if (cleanedMeta.title) inlineMeta.title = cleanedMeta.title;
            if (cleanedMeta.altText) {
                inlineMeta.alt = cleanedMeta.altText;
                inlineMeta.altText = cleanedMeta.altText;
            }
            if (cleanedMeta.caption) inlineMeta.caption = cleanedMeta.caption;
            if (Object.keys(inlineMeta).length) {
                imageRef.imageMeta = inlineMeta;
            }
            item.imageMeta = cleanedMeta;
        } else {
            delete item.imageMeta;
        }
        item.imageRef = imageRef;
        item.imageUrl = existingUrl;
        item.imageAlt = cleanedMeta?.altText || record?.alt || record?.altText || item.imageRef.altText || DEFAULT_ALT;
        return item;
    }

    const ref = item.imageRef || item.image || item.figure || item.asset;
    const resolved = resolveImage(ref || item.imageMeta || null);
    if (!resolved && item.imageMeta && (item.imageMeta.filePath || item.imageMeta.imageUrl)) {
        const imageUrl = item.imageMeta.imageUrl || _normalizeImagePathForTest(item.imageMeta.filePath);
        if (imageUrl) {
            item.imageUrl = imageUrl;
            item.imageAlt = item.imageMeta.altText || item.imageMeta.alt || DEFAULT_ALT;
            item.imageRef = {
                imageUrl,
                altText: item.imageAlt,
                id: item.imageMeta.id,
                caption: item.imageMeta.caption || item.imageMeta.title,
                credit: item.imageMeta.credit
            };
            return item;
        }
    }
    const record = resolved?.record || resolveCuratedImage(ref || item.imageMeta || null);
    const refLabel = typeof ref === 'string'
        ? ref
        : record?.id || ref?.id || ref?.file || ref?.filePath || '';

    if (!record || !record.src || !isImageEligible(record)) {
        if (refLabel) {
            console.warn(`[IMG-GUARD] Skipped weak metadata for ${refLabel}`);
        }
        delete item.imageRef;
        delete item.imageUrl;
        delete item.imageAlt;
        if (item.imageMeta) {
            const cleaned = sanitizeImageMeta(item.imageMeta);
            if (cleaned) {
                item.imageMeta = cleaned;
            } else {
                delete item.imageMeta;
            }
        }
        return item;
    }

    const mergedMeta = {
        ...(item.imageMeta || {}),
        ...(resolved?.imageMeta || {}),
        id: record.id,
        alt: record.alt || record.altText,
        caption: record.caption,
        credit: record.credit,
        subject: record.subject,
        subtopics: record.subtopics,
        concepts: record.concepts,
        visualType: record.visualType,
        timePeriod: record.timePeriod,
        region: record.region,
        questionHooks: record.questionHooks,
        answerableFromImage: record.answerableFromImage
    };
    const cleanedMeta = sanitizeImageMeta(mergedMeta, resolved?.imageMeta || {}, record);
    const imageUrl = record.src || resolved?.imageUrl || null;
    const altText = (cleanedMeta && cleanedMeta.altText)
        || record.alt
        || record.altText
        || resolved?.imageMeta?.alt
        || DEFAULT_ALT;
    const imageRef = imageUrl
        ? {
            imageUrl,
            altText,
            id: record.id,
            caption: cleanedMeta?.caption || record.caption || undefined,
            imageMeta: undefined
        }
        : {};

    if (cleanedMeta) {
        const inlineMeta = {};
        if (cleanedMeta.title) inlineMeta.title = cleanedMeta.title;
        if (cleanedMeta.altText) {
            inlineMeta.alt = cleanedMeta.altText;
            inlineMeta.altText = cleanedMeta.altText;
        }
        if (cleanedMeta.caption) inlineMeta.caption = cleanedMeta.caption;
        if (Object.keys(inlineMeta).length) {
            imageRef.imageMeta = inlineMeta;
        }
        item.imageMeta = cleanedMeta;
    } else {
        delete item.imageMeta;
    }

    if (imageUrl) {
        item.imageRef = imageRef;
        item.imageUrl = imageUrl;
        item.imageAlt = altText;
    } else {
        delete item.imageRef;
        delete item.imageUrl;
        delete item.imageAlt;
    }
    return item;
}

function sanitizeAnswerOptions(options = []) {
    if (!Array.isArray(options)) return [];
    return options.slice(0, 4).map((opt) => {
        const text = stripSourceLines(opt?.text || opt || '');
        const rationale = stripSourceLines(opt?.rationale || '');
        return {
            text,
            isCorrect: opt?.isCorrect === true,
            rationale
        };
    });
}

function sanitizeItem(item = {}) {
    if (!item || typeof item !== 'object') return item;
    item.questionText = stripSourceLines(item.questionText || item.stem || '');
    if (item.questionText) {
        item.stem = item.questionText;
    }
    if (item.passage) {
        const cleanedPassage = stripSourceLines(item.passage);
        item.passage = cleanedPassage ? clampPassage(cleanedPassage) : undefined;
    }
    if (item.solution) {
        item.solution = stripSourceLines(item.solution);
    }
    if (Array.isArray(item.answerOptions)) {
        item.answerOptions = sanitizeAnswerOptions(item.answerOptions);
    }
    const choices = Array.isArray(item.choices) ? item.choices : item.answerOptions?.map((opt) => opt.text) || [];
    if (Array.isArray(choices)) {
        item.choices = choices.map((choice) => stripSourceLines(typeof choice === 'string' ? choice : String(choice || '')));
    }
    return attachImageIfPresent(item);
}

const CIVICS_TYPES = ['photo', 'political-cartoon', 'document-excerpt'];
const CHART_TYPES = ['chart', 'timeline'];
const ECON_TYPES = ['chart', 'table'];

const SOCIAL_JSON_HEADER = `SYSTEM: Output only valid JSON. No markdown, no code fences, no trailing commas, no comments.
Return a JSON object that matches this structure:
{
  "id": string,
  "title": string,
  "subject": string,
  "items": [
    {
      "questionNumber": integer,
      "visualType": "map" | "chart" | "table" | "photo",
      "difficulty": "easy" | "medium" | "hard",
      "stem": string,
      "choices": [string, string, string, string],
      "correctIndex": integer,
      "rationale": string,
      "passage"?: string,
      "source"?: string
    }
  ]
}
Rules:
- Exactly 1 item in the "items" array.
- Each stem must begin with "According to the image" or "According to the <visual type>" and reference at least two concrete visual features (legend, axis labels, headers, dates, symbols, etc.).
- Provide exactly four distinct answer choices in "choices" and set "correctIndex" to the zero-based index of the correct choice.
- Use "rationale" for a 2-3 sentence explanation citing the visible evidence.
- If a brief context is essential, place it in "passage" (≤200 words). Omit the field otherwise.
- Never use the word "Screenshot" or include filenames anywhere.
- Every question must be answerable using only information visible in the provided image.`;

const SYSTEM_MESSAGE = `You are a GED Social Studies item writer. Create image-based multiple-choice questions that rely solely on the provided visual evidence. Each stem must start with "According to the image..." or "According to the map/chart/table/photo..." and cite at least two concrete visual anchors. When a passage is necessary, keep it under 200 words and ensure the question still depends on the image. Do not mention filenames, do not tell the student how to view an image, and never use the word "Screenshot". Always respond with valid JSON only.`;

const MAX_ATTEMPTS_PER_ITEM = 6;

const HEAD_PROBE_CACHE = new Map();

async function fetchHeadProbe(url) {
    if (!HEAD_PROBE_CACHE.has(url)) {
        const probePromise = probeImageHead(url).then((result) => {
            HEAD_PROBE_CACHE.set(url, result);
            return result;
        });
        HEAD_PROBE_CACHE.set(url, probePromise);
    }
    const cached = HEAD_PROBE_CACHE.get(url);
    return typeof cached?.then === 'function' ? cached : Promise.resolve(cached);
}

async function ensureImageAvailability(item, stats) {
    if (!item || typeof item !== 'object') {
        return item;
    }
    const imageUrl = item?.imageRef?.imageUrl || item?.image_url || item?.imageUrl || null;
    if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) {
        if (imageUrl) {
            item.image_url = imageUrl;
        }
        return item;
    }

    if (stats) {
        stats.attempted = (stats.attempted || 0) + 1;
    }

    const result = await fetchHeadProbe(imageUrl);
    if (result?.ok) {
        item.image_url = imageUrl;
        return item;
    }

    if (stats) {
        stats.failed = (stats.failed || 0) + 1;
        if (stats.failedUrls && typeof stats.failedUrls.add === 'function') {
            stats.failedUrls.add(imageUrl);
        }
    }

    recordProbeFailure({
        url: imageUrl,
        error: result?.error || 'head_probe_failed',
        subject: 'Social Studies',
        source: 'socialStudies.ensureImageAvailability'
    });

    recordImageStripped('Social Studies', {
        reason: 'head_probe_failed',
        id: item?.id || item?.questionNumber || null,
        source: 'socialStudies.ensureImageAvailability'
    });

    delete item.imageRef;
    delete item.imageMeta;
    item.image_url = undefined;
    item.alt_text = undefined;
    return item;
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function allocateByRatio(total, ratios) {
    const entries = Object.entries(ratios);
    const base = {};
    const remainder = [];
    let allocated = 0;

    entries.forEach(([key, ratio]) => {
        const raw = total * ratio;
        const count = Math.floor(raw);
        base[key] = count;
        allocated += count;
        remainder.push({ key, fractional: raw - count });
    });

    let remaining = total - allocated;
    remainder
        .sort((a, b) => b.fractional - a.fractional)
        .forEach(({ key }) => {
            if (remaining <= 0) return;
            base[key] += 1;
            remaining -= 1;
        });

    const keys = entries.map(([key]) => key);
    let idx = 0;
    while (remaining > 0) {
        const key = keys[idx % keys.length];
        base[key] += 1;
        remaining -= 1;
        idx += 1;
    }

    return base;
}

function planQuestionTypes(total) {
    const counts = allocateByRatio(total, TYPE_RATIOS);
    const plan = [];

    for (let i = 0; i < (counts.map || 0); i += 1) {
        plan.push({ questionType: 'map', requireEconomic: false });
    }

    for (let i = 0; i < (counts.civics || 0); i += 1) {
        const type = CIVICS_TYPES[i % CIVICS_TYPES.length];
        plan.push({ questionType: type, requireEconomic: false });
    }

    for (let i = 0; i < (counts.charts || 0); i += 1) {
        const type = CHART_TYPES[i % CHART_TYPES.length];
        plan.push({ questionType: type, requireEconomic: false });
    }

    for (let i = 0; i < (counts.economics || 0); i += 1) {
        const type = ECON_TYPES[i % ECON_TYPES.length];
        plan.push({ questionType: type, requireEconomic: true });
    }

    if (plan.length > total) {
        return shuffle(plan).slice(0, total);
    }

    while (plan.length < total) {
        plan.push({ questionType: 'photo', requireEconomic: false });
    }

    return shuffle(plan);
}

function deriveTopic(meta = {}) {
    if (meta.category) return meta.category;
    if (Array.isArray(meta.keywords) && meta.keywords.length) {
        return meta.keywords.slice(0, 3).join(' ');
    }
    if (meta.sourceTitle) return meta.sourceTitle;
    if (meta.altText) return meta.altText.split('.')[0];
    return 'social studies';
}

function renderImageContext(meta = {}) {
    const lines = [];
    lines.push(`Image type: ${meta.dominantType || inferQuestionType(meta) || 'unknown'}`);
    if (meta.altText) lines.push(`Alt text: ${meta.altText}`);
    if (meta.detailedDescription) lines.push(`Description: ${meta.detailedDescription}`);
    if (Array.isArray(meta.keywords) && meta.keywords.length) {
        lines.push(`Keywords: ${meta.keywords.slice(0, 12).join(', ')}`);
    }
    if (meta.usageDirectives) {
        lines.push(`Usage directives: ${meta.usageDirectives}`);
    }
    return lines.join('\n');
}

function buildUserPrompt({ imageMeta, questionType, difficulty, blurb }) {
    const context = renderImageContext(imageMeta);
    const anchorGuidance = 'Ensure the stem explicitly references at least two concrete visual features such as the legend, key, scale, axis labels, shading, colors, compass directions, dates, captions, or numeric values shown on the image.';
    const stemRule = 'Begin the stem with "According to the image..." or "According to the map/chart/table/photo..." and keep it focused solely on the visual evidence (no test-taking strategies, filenames, or viewing instructions). Never use the word "Screenshot".';
    const economicHint = blurb
        ? 'Integrate the passage only if it clarifies the visual evidence; keep it between 60 and 200 words and place it in the "passage" field.'
        : 'Favor image-only analysis unless a brief contextual passage (60-200 words) is essential.';
    const blurbSection = blurb
        ? `Passage source (use verbatim as the "passage" field; do not exceed 200 words):\n"""\n${blurb.text}\n"""\nCite in the solution as ${blurb.citation}`
        : 'Do not include a passage unless essential; prefer image-only analysis.';

    return `${SOCIAL_JSON_HEADER}
You must create exactly 1 GED Social Studies multiple-choice question.
Difficulty: ${difficulty}.
Question type focus: ${questionType}.
${anchorGuidance}
${stemRule}
${economicHint}

Image briefing:
${context}

${blurbSection}

Hard rules:
- Stem <= 35 words and free of test-taking advice.
- Provide exactly four distinct answer choices that align with the image evidence and set only one correct index.
- Rationale must cite specific visual anchors (legend, labels, axes, colors, dates, etc.) and be 2-3 sentences long.
- Maintain neutral, evidence-based tone aligned with GED expectations.`;
}

function buildCaption(imageMeta = {}, source = null) {
    if (!imageMeta) return undefined;
    const candidates = [
        imageMeta.caption,
        imageMeta.title,
        imageMeta.sourceTitle,
        source?.citation,
        source?.title
    ].map((value) => stripSourceLines(value || ''));
    return candidates.find((value) => value) || undefined;
}

function formatAnswerOptions(options = []) {
    return sanitizeAnswerOptions(options);
}

function buildSource(blurb, imageMeta) {
    if (blurb) {
        return {
            title: blurb.title || null,
            url: blurb.url || null,
            citation: blurb.citation
        };
    }
    if (imageMeta?.sourceTitle || imageMeta?.sourceUrl) {
        return {
            title: imageMeta.sourceTitle || null,
            url: imageMeta.sourceUrl || null,
            citation: imageMeta.sourceTitle ? `Source: ${imageMeta.sourceTitle}.` : null
        };
    }
    return null;
}

function normalizeItem(raw = {}, { imageMeta, questionType, difficulty, blurb }) {
    let answerOptions = formatAnswerOptions(raw.answerOptions);
    if ((!answerOptions.length || !Array.isArray(raw.answerOptions)) && Array.isArray(raw.choices)) {
        const rationale = typeof raw.rationale === 'string' ? raw.rationale.trim() : '';
        answerOptions = sanitizeAnswerOptions(raw.choices.slice(0, 4).map((choice, idx) => ({
            text: typeof choice === 'string' ? choice.trim() : '',
            isCorrect: idx === raw.correctIndex,
            rationale: idx === raw.correctIndex ? rationale : ''
        })));
    }
    const rawPassage = typeof raw.passage === 'string' && raw.passage.trim().length
        ? raw.passage.trim()
        : (blurb ? blurb.text : undefined);
    const passage = rawPassage ? clampPassage(rawPassage) : undefined;

    const source = buildSource(blurb, imageMeta);
    const baseId = raw.id != null ? String(raw.id) : crypto.randomUUID();
    const captionSource = buildCaption(imageMeta, source);
    const stemSource = typeof raw.stem === 'string' ? raw.stem.trim() : '';
    const fallbackStem = typeof raw.questionText === 'string' ? raw.questionText.trim() : '';
    const stem = stripSourceLines(stemSource || fallbackStem || '');
    const solution = typeof raw.solution === 'string'
        ? raw.solution.trim()
        : (typeof raw.rationale === 'string' ? raw.rationale.trim() : '');

    const normalized = {
        id: baseId,
        domain: 'social_studies',
        questionType: raw.questionType || raw.visualType || questionType,
        difficulty: raw.difficulty || difficulty,
        questionText: stem,
        answerOptions,
        solution,
        passage: passage && passage.trim().length ? passage : undefined,
        source: source || undefined,
        imageRef: {
            path: imageMeta?.filePath,
            imageUrl: imageMeta?.imageUrl,
            altText: imageMeta?.altText || '',
            caption: captionSource || undefined,
            credit: imageMeta?.credit || undefined,
            license: imageMeta?.license || undefined,
            width: imageMeta?.width || undefined,
            height: imageMeta?.height || undefined,
            tags: Array.isArray(imageMeta?.keywords) ? [...imageMeta.keywords] : undefined
        },
        imageMeta: imageMeta ? { ...imageMeta } : undefined,
        isScreenshot: Boolean(imageMeta?.isScreenshot),
        featureSignature: Array.isArray(imageMeta?.featureSignature) && imageMeta.featureSignature.length
            ? [...imageMeta.featureSignature]
            : undefined,
        imageFingerprint: imageMeta?.fingerprint || imageMeta?.sha256 || undefined
    };

    const cleaned = sanitizeItem(normalized);

    const stemValue = cleaned.questionText || cleaned.stem || stem || '';
    const formattedChoices = Array.isArray(cleaned.answerOptions)
        ? cleaned.answerOptions.map((opt) => stripSourceLines(opt?.text || ''))
        : (Array.isArray(cleaned.choices) ? cleaned.choices.map((choice) => stripSourceLines(choice || '')) : []);
    const correctIndex = Array.isArray(cleaned.answerOptions)
        ? cleaned.answerOptions.findIndex((opt) => opt?.isCorrect)
        : cleaned.correctIndex;

    cleaned.stem = stemValue;
    cleaned.choices = formattedChoices;
    cleaned.correctIndex = Number.isInteger(correctIndex) && correctIndex >= 0 ? correctIndex : 0;
    cleaned.topic = imageMeta?.category || (Array.isArray(imageMeta?.topics) ? imageMeta.topics[0] : questionType) || 'social_studies';

    const inlineRef = cleaned?.imageRef || {};
    const resolvedUrl = inlineRef.imageUrl
        || cleaned?.image?.imageUrl
        || cleaned?.image_url
        || null;

    if (resolvedUrl) {
        const altCandidate = inlineRef.alt
            || inlineRef.altText
            || inlineRef.imageMeta?.alt
            || cleaned?.imageMeta?.altText
            || cleaned?.imageMeta?.alt
            || DEFAULT_ALT;
        const captionCandidate = inlineRef.caption
            || inlineRef.imageMeta?.caption
            || cleaned?.imageMeta?.caption
            || undefined;
        const creditCandidate = inlineRef.credit
            || inlineRef.imageMeta?.credit
            || cleaned?.imageMeta?.credit
            || undefined;
        const licenseCandidate = inlineRef.license
            || inlineRef.imageMeta?.license
            || cleaned?.imageMeta?.license
            || undefined;
        const widthCandidate = inlineRef.width
            || inlineRef.imageMeta?.width
            || cleaned?.imageMeta?.width
            || undefined;
        const heightCandidate = inlineRef.height
            || inlineRef.imageMeta?.height
            || cleaned?.imageMeta?.height
            || undefined;
        const tagsCandidate = inlineRef.tags
            || inlineRef.imageMeta?.keywords
            || cleaned?.imageMeta?.keywords
            || undefined;

        const canonicalRef = validateImageRef({
            imageUrl: resolvedUrl,
            alt: altCandidate || DEFAULT_ALT,
            subject: cleaned.domain || 'social_studies',
            caption: captionCandidate,
            credit: creditCandidate,
            license: licenseCandidate,
            width: widthCandidate,
            height: heightCandidate,
            tags: tagsCandidate
        });

        if (canonicalRef && !canonicalRef.error) {
            cleaned.imageRef = canonicalRef;
            cleaned.image_url = canonicalRef.imageUrl;
            cleaned.alt_text = canonicalRef.alt;
            if (cleaned.imageMeta && canonicalRef.alt && !cleaned.imageMeta.altText) {
                cleaned.imageMeta.altText = canonicalRef.alt;
            }
            if (cleaned.imageMeta && canonicalRef.caption && !cleaned.imageMeta.caption) {
                cleaned.imageMeta.caption = canonicalRef.caption;
            }
            if (cleaned.imageMeta && canonicalRef.credit && !cleaned.imageMeta.credit) {
                cleaned.imageMeta.credit = canonicalRef.credit;
            }
        } else {
            delete cleaned.imageRef;
            delete cleaned.image_url;
            delete cleaned.alt_text;
        }
    } else {
        delete cleaned.imageRef;
        delete cleaned.image_url;
        delete cleaned.alt_text;
    }

    return cleaned;
}

async function maybeFetchBlurb({ imageMeta, allowExternalBlurbs, maxWords = 200 }) {
    if (!allowExternalBlurbs) return null;
    const topic = deriveTopic(imageMeta);
    try {
        return await fetchExternalBlurb({ topic, maxWords });
    } catch (err) {
        console.warn('[socialStudies] Blurb fetch failed:', err?.message || err);
        return null;
    }
}

async function generateSingleItem({ planEntry, difficulty, allowExternalBlurbs, generateWithFallback }) {
    let combo = selectVisualCombo({
        desiredType: planEntry.questionType,
        requireEconomic: planEntry.requireEconomic
    });
    if (!combo) {
        throw new Error('Unable to select an image for the requested type.');
    }

    let attempts = 0;
    let attemptsWithCurrentImage = 0;
    let lastErrors = [];

    while (attempts < MAX_ATTEMPTS_PER_ITEM) {
        attempts += 1;
        attemptsWithCurrentImage += 1;

        const blurb = await maybeFetchBlurb({ imageMeta: combo.imageMeta, allowExternalBlurbs });
        const prompt = buildUserPrompt({
            imageMeta: combo.imageMeta,
            questionType: combo.questionType,
            difficulty,
            blurb
        });

        const { items } = await generateWithFallback(
            'Social Studies',
            {
                system: SYSTEM_MESSAGE,
                user: prompt
            },
            {
                retries: 2,
                minTimeout: 800,
                onFailedAttempt: (err, n) => console.warn(`[retry ${n}] Gemini social studies generation failed: ${err?.message || err}`)
            },
            {
                retries: 1,
                minTimeout: 800,
                onFailedAttempt: (err, n) => console.warn(`[retry ${n}] ChatGPT social studies fallback failed: ${err?.message || err}`)
            }
        );

        const candidate = Array.isArray(items) ? items[0] : null;
        if (!candidate) {
            lastErrors = ['Model returned no items.'];
        } else {
            const normalized = normalizeItem(candidate, {
                imageMeta: combo.imageMeta,
                questionType: combo.questionType,
                difficulty,
                blurb
            });
            const features = combo.imageMeta?.features || deriveVisualFeatures(combo.imageMeta || {});
            if (combo.imageMeta && !combo.imageMeta.features) {
                combo.imageMeta.features = features;
            }
            const fileName = combo.imageMeta?.fileName || (combo.imageMeta?.filePath || '').split('/').pop() || '';
            const isScreenshot = combo.imageMeta?.isScreenshot != null
                ? combo.imageMeta.isScreenshot
                : deriveIsScreenshot(fileName, combo.imageMeta);

            const validation = validateSocialStudiesItem(normalized, combo.imageMeta);
            let screenshotValid = true;
            if (validation.valid && isScreenshot) {
                const ssCandidate = {
                    stem: normalized.questionText || '',
                    choices: normalized.answerOptions.map((opt) => opt?.text || ''),
                    correctIndex: normalized.answerOptions.findIndex((opt) => opt?.isCorrect),
                    imageRef: normalized.imageRef,
                    passage: normalized.passage ? { text: normalized.passage } : undefined
                };
                screenshotValid = validateSS(ssCandidate, combo.imageMeta, features, true);
                if (!screenshotValid) {
                    console.error('SS_FAIL', {
                        file: fileName,
                        reason: 'validation',
                        flags: { hasTable: features.hasTable, hasChart: features.hasChart, hasMap: features.hasMap },
                        title: combo.imageMeta?.title
                    });
                }
            }

            if (validation.valid && screenshotValid) {
                return normalized;
            }
            lastErrors = screenshotValid ? validation.errors : ['Screenshot validation failed.'];
        }

        if (attemptsWithCurrentImage < 2) {
            continue;
        }

        combo = selectVisualCombo({
            desiredType: planEntry.questionType,
            requireEconomic: planEntry.requireEconomic
        });
        attemptsWithCurrentImage = 0;
        if (!combo) {
            break;
        }
    }

    throw new Error(`Failed to generate valid item after ${attempts} attempts: ${lastErrors.join('; ')}`);
}

async function generateSocialStudiesItems({ count, allowExternalBlurbs = true, generateWithFallback }) {
    const total = Number(count);
    if (!Number.isInteger(total) || total <= 0) {
        throw new Error('count must be a positive integer');
    }
    if (typeof generateWithFallback !== 'function') {
        throw new Error('generateWithFallback function is required');
    }

    const difficultyPlan = planDifficulty(total, 'social_studies');
    const difficulties = shuffle(expandDifficultyCounts(difficultyPlan));
    const typePlan = planQuestionTypes(total);

    const items = [];
    const probeStats = { attempted: 0, failed: 0, failedUrls: new Set() };
    for (let i = 0; i < total; i += 1) {
        const difficulty = difficulties[i % difficulties.length];
        const planEntry = typePlan[i];
        const item = await generateSingleItem({
            planEntry,
            difficulty,
            allowExternalBlurbs,
            generateWithFallback
        });
        const sanitized = sanitizeItem(item);
        await ensureImageAvailability(sanitized, probeStats);
        items.push(sanitized);
    }

    if (probeStats.failed > 0 && probeStats.attempted > 0) {
        console.warn(`[socialStudies] ${probeStats.failed}/${probeStats.attempted} images failed HEAD probe.`);
    }

    return items;
}

module.exports = {
    generateSocialStudiesItems,
    planQuestionTypes,
    buildUserPrompt,
    normalizeItem,
    generateSingleItem,
    allocateByRatio,
    deriveTopic,
    shuffle,
    TYPE_RATIOS,
    SYSTEM_MESSAGE,
    SOCIAL_JSON_HEADER,
    resetImageState
};
