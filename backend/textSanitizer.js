const PLACEHOLDER_PREFIX = '__MATH_SEGMENT_';

function createToken(index) {
    return `${PLACEHOLDER_PREFIX}${index}__`;
}

function tokenizeMathSegments(input) {
    if (typeof input !== 'string' || !input.length) {
        return { masked: input, segments: [] };
    }

    const segments = [];
    let masked = input;
    const patterns = [
        /\$\$[\s\S]+?\$\$/g,
        /\\\[[\s\S]+?\\\]/g,
        /\\\([\s\S]+?\\\)/g,
        /\$(?!\$)[\s\S]+?\$/g
    ];

    patterns.forEach((pattern) => {
        masked = masked.replace(pattern, (match) => {
            const token = createToken(segments.length);
            segments.push(match);
            return token;
        });
    });

    return { masked, segments };
}

function restoreMathSegments(masked, segments) {
    if (!Array.isArray(segments) || !segments.length || typeof masked !== 'string') {
        return typeof masked === 'string' ? masked : '';
    }

    let restored = masked;
    segments.forEach((value, index) => {
        const token = createToken(index);
        restored = restored.split(token).join(value);
    });
    return restored;
}

function normalizeCurrencyOutsideMath(text) {
    if (typeof text !== 'string' || !text.length) {
        return text;
    }
    let working = text;
    working = working.replace(/\$\$(?=\d)/g, '$');
    working = working.replace(/\$(\s*\d+(?:[.,]\d{1,2}))\$/g, (_, amount) => `$${amount.trim()}`);
    working = working.replace(/(\d+(?:[.,]\d{1,2}))\s*\$(?!\d)/g, (_, amount) => `$${amount}`);
    working = working.replace(/\$\s+(\d)/g, (_, digit) => `$${digit}`);
    return working;
}

function stripTextMacroInPlain(text) {
    if (typeof text !== 'string' || !text.length) {
        return text;
    }
    let working = text;
    let previous;
    const pattern = /\\text\{([^{}]*)\}/g;
    do {
        previous = working;
        working = working.replace(pattern, '$1');
    } while (working !== previous);
    return working;
}

function preserveCase(match, replacement) {
    if (!match) return replacement;
    if (match === match.toUpperCase()) {
        return replacement.toUpperCase();
    }
    if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
}

function applyPhraseSpacingRepairs(text) {
    if (typeof text !== 'string' || !text.length) {
        return text;
    }
    const replacements = [
        { regex: /\bwhatisthevalueof\b/gi, value: 'what is the value of' },
        { regex: /\bintheequation\b/gi, value: 'in the equation' }
    ];
    return replacements.reduce((current, { regex, value }) => (
        current.replace(regex, (match) => preserveCase(match, value))
    ), text);
}

function collapseUnderscoredLatexMacros(s) {
    if (typeof s !== 'string') return s;
    // Remove \_ placeholders between macro letters, e.g. \f\_\_\_\_r\_\_a\_\_c -> \frac
    const squeezed = s.replace(/\\_(?:\\_)+/g, '\\_')
        .replace(/\\_/g, '');
    // Now fix common macros that may still be split by stray backslashes
    return squeezed
        .replace(/\\f(?:\\)?r(?:\\)?a(?:\\)?c/gi, '\\frac')
        .replace(/\\s(?:\\)?q(?:\\)?r(?:\\)?t/gi, '\\sqrt')
        .replace(/\\t(?:\\)?i(?:\\)?m(?:\\)?e(?:\\)?s/gi, '\\times');
}

function normalizeLatexMacrosInMath(s) {
    if (typeof s !== 'string') return s;
    return s.replace(/\\\\([A-Za-z]+)/g, '\\$1');
}

function addMissingBackslashesInMath(mathStr) {
    if (typeof mathStr !== 'string') return mathStr;
    const MACROS = [
        'frac','sqrt','times','div','cdot','le','ge','lt','gt','pi',
        'sin','cos','tan','log','ln','pm','mp','neq','approx','theta','alpha','beta','gamma'
    ];
    const macroRegex = new RegExp(`(?<!\\\\)\\b(${MACROS.join('|')})\\b(?=\\s*[\\[{(])`, 'g');
    return mathStr.replace(macroRegex, (match) => `\\${match}`);
}

module.exports = {
    tokenizeMathSegments,
    restoreMathSegments,
    normalizeCurrencyOutsideMath,
    stripTextMacroInPlain,
    applyPhraseSpacingRepairs,
    collapseUnderscoredLatexMacros,
    normalizeLatexMacrosInMath,
    addMissingBackslashesInMath
};
