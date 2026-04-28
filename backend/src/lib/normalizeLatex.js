/**
 * Canonical normalizeLatex implementation.
 *
 * This is the SINGLE source of truth for `normalizeLatex` in the codebase.
 * Both backend (catalog + exam) and frontend imports must resolve here.
 *
 * Hard rule: this function NEVER strips `\(...\)` or `\[...\]` inline-math
 * delimiters. Stripping them historically lost LaTeX commands like `\times`,
 * `\leq`, and `\geq` because the downstream `upgradeToKatex` only re-wraps a
 * small set of patterns (fractions, sqrt, pi, comparison ops). Preserving the
 * delimiters keeps math intact end-to-end.
 */

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

    cleaned = cleaned.replace(/\$\s*\\\(([^$]*?\\frac[^$]*?)\\\)\s*\$/g, (_match, inner) => `\\(${inner.trim()}\\)`);

    cleaned = cleaned.replace(/\$+\s*(\\\([^$]*?\\frac[^$]*?\\\)|\\\[[^$]*?\\frac[^$]*?\\\]|\\frac[^$]*?)\s*\$+/g, (match, inner) => {
        if (typeof inner !== 'string' || !inner.includes('\\frac')) {
            return match;
        }
        let body = inner.trim();
        body = body.replace(/^\\\(/, '').replace(/\\\)$/, '');
        body = body.replace(/^\\\[/, '').replace(/\\\]$/, '');
        return `\\(${body.trim()}\\)`;
    });

    cleaned = cleaned.replace(/\\{2,}frac/g, '\\frac');

    cleaned = cleaned.replace(/\\frac\s*\{\s*([^{}]+?)\s*\}\s*\{\s*([^{}]+?)\s*\}/g, (_match, a, b) => `\\frac{${a.trim()}}{${b.trim()}}`);

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
        .replace(/(?<!\\)\$([^$]*?)(?<!\\)\$/g, '$1');
    // (See header comment: \(...\) and \[...\] delimiters are preserved.)

    normalized = normalized.replace(/\$(\s*\d+(?:[.,]\d{1,2}))\$/g, (_m, amount) => `$${amount.trim()}`);
    normalized = normalized.replace(/\$\s+(\d)/g, '$$1');

    normalized = normalized.replace(/\\dfrac/g, '\\frac');

    normalized = normalized
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

    return normalized
        .split('\n')
        .map((line) => line.replace(/[^\S\n]{2,}/g, ' '))
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

module.exports = {
    normalizeLatex,
    collapseSplitLatexCommands,
    normalizeFractionDelimiters,
};
