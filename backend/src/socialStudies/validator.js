const { deriveVisualFeatures, deriveIsScreenshot } = require('../utils/visualFeatures');

const STEM_FORBIDDEN = /(\b(best|most likely) strategy\b|\bhow should (a|the) student\b|\bread the title\b)/i;
const STEM_STRATEGY_FORBIDDEN = /(\bstrategy\b|\bfirst step\b|\bon-screen directions\b|\bpractice set\b)/i;
const VISUAL_ANCHORS = /(legend|key|scale|axis|label|shaded|color|colour|symbol|direction|compass|date|caption|source|track|route|boundary|state|river|percentage|median|rate|timeline|event|period|latitude|longitude|grid|trend|bar|line|slice|sector|population|percent|index|figure|table|column|row)/gi;

const TABLE_TERMS = ['table', 'row', 'column', 'header', 'definition', 'example', 'type'];
const CHART_TERMS = ['axis', 'x-axis', 'y-axis', 'legend', 'series', 'units', 'year'];
const MAP_TERMS = ['legend', 'scale', 'compass', 'shaded', 'state', 'region', 'river'];

function wordCount(text = '') {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function extractAnchors(text = '') {
    const matches = text.match(VISUAL_ANCHORS);
    if (!matches) return [];
    return Array.from(new Set(matches.map((m) => m.toLowerCase())));
}

function keywordOverlap(stem = '', imageMeta = {}) {
    const stemWords = new Set(stem.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean));
    const haystackPieces = [
        imageMeta.altText,
        imageMeta.detailedDescription,
        imageMeta.usageDirectives,
        ...(Array.isArray(imageMeta.keywords) ? imageMeta.keywords : [])
    ].filter(Boolean);
    const haystackWords = new Set(
        haystackPieces
            .join(' ')
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter(Boolean)
    );
    let overlap = 0;
    stemWords.forEach((word) => {
        if (haystackWords.has(word)) {
            overlap += 1;
        }
    });
    return overlap;
}

function hasExactlyOneCorrectOption(options = []) {
    if (!Array.isArray(options) || options.length !== 4) return false;
    const seenTexts = new Set();
    let correctCount = 0;
    for (const option of options) {
        if (!option || typeof option.text !== 'string') return false;
        const normalized = option.text.trim().toLowerCase();
        if (seenTexts.has(normalized)) return false;
        seenTexts.add(normalized);
        if (option.isCorrect === true) {
            correctCount += 1;
        }
    }
    return correctCount === 1;
}

function validateSolution(solution = '') {
    if (typeof solution !== 'string' || !solution.trim()) return false;
    const sentences = solution
        .trim()
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.trim().length);
    if (sentences.length < 2 || sentences.length > 4) return false;
    const anchors = extractAnchors(solution);
    return anchors.length >= 1;
}

function validateSocialStudiesItem(item = {}, imageMeta = {}) {
    const errors = [];

    const stem = item.questionText || item.stem || '';
    const choices = item.answerOptions || item.choices || [];
    const solution = item.solution || item.explanation || '';
    const passage = item.passage || '';

    const features = imageMeta?.features || deriveVisualFeatures(imageMeta);
    const fileName = imageMeta?.fileName || (imageMeta?.filePath || '').split('/').pop() || '';
    const isScreenshot = imageMeta?.isScreenshot != null
        ? imageMeta.isScreenshot
        : deriveIsScreenshot(fileName, imageMeta);

    if (typeof stem !== 'string' || !stem.trim()) {
        errors.push('Missing or invalid stem.');
    } else {
        if (STEM_FORBIDDEN.test(stem)) {
            errors.push('Stem contains forbidden meta-language.');
        }
        const anchors = extractAnchors(stem);
        if (anchors.length < 2) {
            errors.push('Stem must reference at least two visual anchors.');
        }
        if (wordCount(stem) > 35) {
            errors.push('Stem exceeds 35-word cap.');
        }
        const overlap = keywordOverlap(stem, imageMeta);
        if (overlap < 2) {
            errors.push('Stem must share at least two keywords with image metadata.');
        }
    }

    if (!hasExactlyOneCorrectOption(choices)) {
        errors.push('Choices must include four unique options with exactly one correct.');
    }

    if (!validateSolution(solution)) {
        errors.push('Solution must include 2-4 sentences referencing visual evidence.');
    }

    if (passage && typeof passage === 'string') {
        const count = wordCount(passage);
        if (count < 60 || count > 200) {
            errors.push('Passage must be between 60 and 200 words.');
        }
    }

    let screenshotValidation = { valid: true, errors: [] };
    if (isScreenshot) {
        screenshotValidation = validateSocialStudiesScreenshotItem(item, imageMeta, features);
    }

    const combinedErrors = errors.concat(screenshotValidation.errors || []);
    const valid = combinedErrors.length === 0;
    return { valid, errors: combinedErrors };
}

function countOverlap(stem = '', choices = [], keywords = []) {
    const bag = new Set(
        (stem + ' ' + choices.map((choice) => choice?.text || '').join(' '))
            .toLowerCase()
            .match(/[a-z][a-z\-]+/g) || []
    );
    return keywords
        .map((k) => (typeof k === 'string' ? k.toLowerCase() : ''))
        .filter((k) => k && bag.has(k)).length;
}

function countAnchorMatches(text = '', terms = []) {
    const lower = text.toLowerCase();
    const seen = new Set();
    for (const term of terms) {
        const normalized = term.toLowerCase();
        if (lower.includes(normalized)) {
            seen.add(normalized);
        }
    }
    return seen.size;
}

function validateSocialStudiesScreenshotItem(item = {}, imageMeta = {}, features = {}) {
    const errors = [];
    const stem = item.questionText || item.stem || '';
    const choices = item.answerOptions || item.choices || [];
    const keywords = Array.isArray(features.keywords) ? features.keywords : [];

    if (typeof stem !== 'string' || !stem.trim()) {
        errors.push('Screenshot stem missing.');
    } else if (STEM_STRATEGY_FORBIDDEN.test(stem)) {
        errors.push('Screenshot stem cannot mention strategies or directions.');
    }

    if (features.hasTable && countAnchorMatches(stem, TABLE_TERMS) < 2) {
        errors.push('Screenshot table items must cite at least two table anchors.');
    }
    if (features.hasChart && countAnchorMatches(stem, CHART_TERMS) < 2) {
        errors.push('Screenshot chart items must cite axes or legend anchors.');
    }
    if (features.hasMap && countAnchorMatches(stem, MAP_TERMS) < 2) {
        errors.push('Screenshot map items must cite map-specific anchors.');
    }

    if (keywords.length && countOverlap(stem, choices, keywords) < 2) {
        errors.push('Screenshot items must reuse at least two metadata keywords.');
    }

    const correct = Array.isArray(choices) ? choices.find((opt) => opt && opt.isCorrect) : null;
    if (!correct || extractAnchors(correct.rationale || '').length === 0) {
        errors.push('Correct rationale must reference a visible element from the screenshot.');
    }

    const isScreenshot = item.isScreenshot || imageMeta?.isScreenshot || deriveIsScreenshot(imageMeta?.fileName || '', imageMeta);
    if (isScreenshot) {
        const caption = item.imageRef?.caption || '';
        if (!/^Screenshot —/.test(caption)) {
            errors.push('Screenshot captions must begin with "Screenshot —".');
        }
    }

    return { valid: errors.length === 0, errors };
}

module.exports = {
    validateSocialStudiesItem,
    validateSocialStudiesScreenshotItem,
    extractAnchors,
    keywordOverlap,
    hasExactlyOneCorrectOption,
    validateSolution,
    VISUAL_ANCHORS,
    STEM_FORBIDDEN
};
