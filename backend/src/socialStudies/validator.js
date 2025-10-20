const STEM_FORBIDDEN = /(\b(best|most likely) strategy\b|\bhow should (a|the) student\b|\bread the title\b)/i;
const VISUAL_ANCHORS = /(legend|key|scale|axis|label|shaded|color|colour|symbol|direction|compass|date|caption|source|track|route|boundary|state|river|percentage|median|rate|timeline|event|period|latitude|longitude|grid|trend|bar|line|slice|sector|population|percent|index|figure|table|column|row)/gi;

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

    const valid = errors.length === 0;
    return { valid, errors };
}

module.exports = {
    validateSocialStudiesItem,
    extractAnchors,
    keywordOverlap,
    hasExactlyOneCorrectOption,
    validateSolution,
    VISUAL_ANCHORS,
    STEM_FORBIDDEN
};
