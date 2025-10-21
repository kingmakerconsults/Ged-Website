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
const { deriveIsScreenshot } = require('../utils/metaLoader');
const { validateSS } = require('./validators');
const { clampPassage } = require('./passage');
const { resolveImage } = require('../../imageResolver');

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

function sanitizeImageMeta(meta = {}) {
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
    ['width', 'height', 'dominantType', 'keywords', 'usageDirectives', 'detailedDescription', 'featureSignature', 'isScreenshot', 'subject', 'category']
        .forEach((key) => {
            if (meta[key] != null) {
                cleaned[key] = Array.isArray(meta[key]) ? [...meta[key]] : meta[key];
            }
        });
    return Object.keys(cleaned).length ? cleaned : undefined;
}

function attachImageIfPresent(item = {}) {
    const existingUrl = typeof item?.imageRef?.imageUrl === 'string' ? item.imageRef.imageUrl : null;
    if (existingUrl) {
        const mergedMeta = {
            ...(item.imageMeta || {}),
            ...(item.imageRef.imageMeta || {})
        };
        const cleanedMeta = sanitizeImageMeta(mergedMeta);
        const imageRef = { imageUrl: existingUrl };
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
        return item;
    }

    const ref = item.imageRef || item.image || item.figure || item.asset;
    const resolved = resolveImage(ref || item.imageMeta || null);
    if (!resolved || !resolved.imageUrl) {
        delete item.imageRef;
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
        ...(resolved.imageMeta || {})
    };
    const cleanedMeta = sanitizeImageMeta(mergedMeta);
    const imageRef = { imageUrl: resolved.imageUrl };
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
            altText: imageMeta?.altText || '',
            caption: captionSource || undefined,
            width: imageMeta?.width || undefined,
            height: imageMeta?.height || undefined
        },
        imageMeta: imageMeta ? { ...imageMeta } : undefined,
        isScreenshot: Boolean(imageMeta?.isScreenshot),
        featureSignature: Array.isArray(imageMeta?.featureSignature) && imageMeta.featureSignature.length
            ? [...imageMeta.featureSignature]
            : undefined,
        imageFingerprint: imageMeta?.fingerprint || imageMeta?.sha256 || undefined
    };

    return sanitizeItem(normalized);
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
    for (let i = 0; i < total; i += 1) {
        const difficulty = difficulties[i % difficulties.length];
        const planEntry = typePlan[i];
        const item = await generateSingleItem({
            planEntry,
            difficulty,
            allowExternalBlurbs,
            generateWithFallback
        });
        items.push(item);
    }

    return items.map((item) => sanitizeItem(item));
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
