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
    working = working.replace(/\\+\$/g, '$');
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

    // First, reduce double-escaped backslashes that sit directly in front of
    // macro letters or the underscore placeholders that separate them. This
    // allows a single code path to clean up both "\f\_r" and
    // "\\f\\_r" style glitches.
    let normalized = s.replace(/\\{2}(?=[A-Za-z_])/g, '\\');

    // Next, repeatedly strip "\_" runs that appear immediately after a
    // macro letter. Some generated strings contain long stretches like
    // "\f\_\_\_\_r" where each pair has to be removed one at a time.
    let previous;
    do {
        previous = normalized;
        normalized = normalized.replace(/([A-Za-z])\\_/g, '$1');
    } while (normalized !== previous);

    // Finally, collapse residual sequences such as "\s\q\r\t" into
    // "\sqrt" by removing stray backslashes between adjacent letters.
    return normalized.replace(/\\([A-Za-z])(?:\\([A-Za-z]))+/g, (match) => `\\${match.replace(/\\/g, '')}`);
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
