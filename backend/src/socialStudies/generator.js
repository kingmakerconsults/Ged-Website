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

const TYPE_RATIOS = {
    map: 0.3,
    civics: 0.25,
    charts: 0.25,
    economics: 0.2
};

const CIVICS_TYPES = ['photo', 'political-cartoon', 'document-excerpt'];
const CHART_TYPES = ['chart', 'timeline'];
const ECON_TYPES = ['chart', 'table'];

const SOCIAL_JSON_HEADER = `SYSTEM: Return ONLY JSON, no prose or markdown. Wrap the response between <BEGIN_JSON> and <END_JSON>.
Each item must follow this schema:
{
  "id": string | number,
  "questionText": string,
  "answerOptions": [{"text": string, "isCorrect": boolean, "rationale": string}],
  "solution": string,
  "difficulty": "easy" | "medium" | "hard",
  "passage"?: string
}
Rules:
- Exactly 1 item in the array.
- Provide exactly 4 answerOptions; mark only one option with isCorrect=true.
- The solution must be 2-4 sentences citing visual evidence.
- Avoid any markdown, HTML, or commentary.`;

const SYSTEM_MESSAGE = `Create a Social Studies question that centers on the attached image. The stem must reference concrete features visible in that image (legend, axes, symbols, dates, labels, etc.) or integrate a short sourced passage directly tied to it. Begin every stem with "Screenshot:" or "According to the screenshot..." and do not include strategy language about how to read the image.`;

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
    const anchorGuidance = 'Ensure the stem mentions at least two explicit visual elements such as legend, key, scale, axis labels, shading, colors, symbols, compass directions, dates, captions, or numeric values shown on the image.';
    const stemRule = 'Begin the stem with "Screenshot:" or "According to the screenshot..." and keep it focused on the visual evidence (no test-taking strategies).';
    const economicHint = blurb ? 'Incorporate the passage only if it clarifies the visual evidence; keep it between 60 and 200 words.' : 'Focus on the visual evidence unless a very short contextual sentence is necessary.';
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
- Provide exactly 4 answer options with rationales; avoid duplicate text.
- Solution must cite specific features (legend, labels, axes, colors, dates, etc.) and be 2-4 sentences long.
- Maintain neutral, evidence-based tone aligned with GED expectations.`;
}

function sanitizeFileName(name = '') {
    if (!name) return '';
    return name.replace(/\.[^.]+$/, '').replace(/[\-_]+/g, ' ').trim();
}

function buildCaption(imageMeta = {}, source = null) {
    if (!imageMeta) return undefined;
    if (imageMeta.isScreenshot) {
        const base = imageMeta.title || imageMeta.sourceTitle || sanitizeFileName(imageMeta.fileName || imageMeta.filePath || '');
        const display = base ? base : 'Screenshot';
        return `Screenshot — ${display}`;
    }
    return source?.title || imageMeta.sourceTitle || imageMeta.title || undefined;
}

function formatAnswerOptions(options = []) {
    if (!Array.isArray(options)) return [];
    return options.slice(0, 4).map((opt) => ({
        text: typeof opt?.text === 'string' ? opt.text.trim() : '',
        isCorrect: opt?.isCorrect === true,
        rationale: typeof opt?.rationale === 'string' ? opt.rationale.trim() : ''
    }));
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
    const answerOptions = formatAnswerOptions(raw.answerOptions);
    const rawPassage = typeof raw.passage === 'string' && raw.passage.trim().length
        ? raw.passage.trim()
        : (blurb ? blurb.text : undefined);
    const passage = rawPassage ? clampPassage(rawPassage) : undefined;

    const source = buildSource(blurb, imageMeta);
    const baseId = raw.id != null ? String(raw.id) : crypto.randomUUID();
    const captionSource = buildCaption(imageMeta, source);

    return {
        id: baseId,
        domain: 'social_studies',
        questionType,
        difficulty: raw.difficulty || difficulty,
        questionText: typeof raw.questionText === 'string' ? raw.questionText.trim() : '',
        answerOptions,
        solution: typeof raw.solution === 'string' ? raw.solution.trim() : '',
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
        imageFileName: imageMeta?.fileName || undefined,
        imageFingerprint: imageMeta?.fingerprint || imageMeta?.sha256 || undefined
    };
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
