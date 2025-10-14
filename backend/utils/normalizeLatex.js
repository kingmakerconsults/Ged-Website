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

    return normalized.replace(/\s{2,}/g, ' ').trim();
}

module.exports = {
    normalizeLatex
};
