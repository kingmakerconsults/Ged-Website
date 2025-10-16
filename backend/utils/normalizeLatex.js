function collapseSplitLatexCommands(source) {
    if (typeof source !== 'string' || !source.length) {
        return source;
    }

    let normalized = source.replace(/\\{2}(?=[A-Za-z_])/g, '\\');

    let previous;
    do {
        previous = normalized;
        normalized = normalized.replace(/([A-Za-z])\\_/g, '$1');
    } while (normalized !== previous);

    return normalized.replace(/\\([A-Za-z])(?:\\([A-Za-z]))+/g, (match) => `\\${match.replace(/\\/g, '')}`);
}

function normalizeFractionDelimiters(source) {
    if (typeof source !== 'string' || !/\\+frac/.test(source)) {
        return source;
    }

    let cleaned = source;

    // Remove redundant dollar-sign wrapped inline math like $\( ... \)$
    cleaned = cleaned.replace(/\$\s*\\\(([^$]*?\\frac[^$]*?)\\\)\s*\$/g, (_match, inner) => `\\(${inner.trim()}\\)`);

    // Replace any $...$ segment that only contains a fraction with \(...\)
    cleaned = cleaned.replace(/\$+\s*(\\\([^$]*?\\frac[^$]*?\\\)|\\\[[^$]*?\\frac[^$]*?\\\]|\\frac[^$]*?)\s*\$+/g, (match, inner) => {
        if (typeof inner !== 'string' || !inner.includes('\\frac')) {
            return match;
        }
        let body = inner.trim();
        body = body.replace(/^\\\(/, '').replace(/\\\)$/, '');
        body = body.replace(/^\\\[/, '').replace(/\\\]$/, '');
        return `\\(${body.trim()}\\)`;
    });

    // Normalize excessive escaping before frac
    cleaned = cleaned.replace(/\\{2,}frac/g, '\\frac');

    // Tighten braces around numerators and denominators
    cleaned = cleaned.replace(/\\frac\s*\{\s*([^{}]+?)\s*\}\s*\{\s*([^{}]+?)\s*\}/g, (_match, a, b) => `\\frac{${a.trim()}}{${b.trim()}}`);

    // Collapse whitespace inside inline math delimiters
    cleaned = cleaned.replace(/\\\(\s+/g, '\\(').replace(/\s+\\\)/g, '\\)');

    return cleaned;
}

function normalizeLatex(text) {
    if (typeof text !== 'string' || !text.length) {
        return text;
    }

    let normalized = text;

    normalized = normalized.replace(/(?<!\\)\$([0-9]+(?:\.[0-9]{1,2})?)/g, (_match, amount) => `\\$${amount}`);

    normalized = normalized
        .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
        .replace(/(?<!\\)\$([^$]*?)(?<!\\)\$/g, '$1')
        .replace(/\\\(([^]*?)\\\)/g, '$1')
        .replace(/\\\[([^]*?)\\\]/g, '$1');

    // unwrap accidentally math-wrapped currency, e.g. "$12.50$" -> "$12.50"
    normalized = normalized.replace(/\$(\s*\d+(?:[.,]\d{1,2}))\$/g, (_m, amount) => `$${amount.trim()}`);
    // close-up whitespace after literal $, e.g. "$   12" -> "$12"
    normalized = normalized.replace(/\$\s+(\d)/g, '$$1');

    normalized = normalized.replace(/\\dfrac/g, '\\frac');

    normalized = normalized
        // repair /frac, ^rac, ↑rac, stray spaces before 'rac'
        .replace(/(?:\\|\/|[\u2191\^])\s*rac\s*\{/g, '\\frac{')
        .replace(/\\frac\s+([^\s{}]+)\s+([^\s{}]+)/g, '\\frac{$1}{$2}')
        .replace(/\\frac\s*\{\s*([^{}]+?)\s*\}\s*\{\s*([^{}]+?)\s*\}/g, (_match, a, b) => `\\frac{${a.trim()}}{${b.trim()}}`);

    normalized = collapseSplitLatexCommands(normalized);

    normalized = normalized.replace(/(?<![A-Za-z])rac\s*\{/g, '\\frac{');

    normalized = normalized.replace(/<\/?(?:table|thead|tbody|tfoot|tr|th|td|caption|colgroup|col)[^>]*>/gi, ' ');
    normalized = normalized.replace(/<[^>]+>/g, ' ');

    normalized = normalized.replace(/(?<!\\)\*/g, '\\*');

    normalized = normalized.replace(/(?<!\\)_/g, (match, offset, source) => {
        const prev = offset > 0 ? source[offset - 1] : '';
        if (/^[A-Za-z0-9)]$/.test(prev)) {
            return match;
        }
        return '\\_';
    });

    if (/\\+frac/.test(normalized)) {
        normalized = normalizeFractionDelimiters(normalized);
    }

    return normalized.replace(/\s{2,}/g, ' ').trim();
}

module.exports = {
    normalizeLatex
};
