const INLINE_REGEX = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g;

function escapeHtml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderSegments(input) {
    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = INLINE_REGEX.exec(input)) !== null) {
        const [full] = match;
        const before = input.slice(lastIndex, match.index);
        if (before) {
            segments.push(`<span class="katex-text">${escapeHtml(before)}</span>`);
        }

        const display = full.startsWith('$$') || full.startsWith('\\[');
        const body = full.startsWith('$$')
            ? full.slice(2, -2)
            : full.startsWith('\\(')
                ? full.slice(2, -2)
                : full.startsWith('\\[')
                    ? full.slice(2, -2)
                    : full.slice(1, -1);

        const escaped = escapeHtml(body.trim());
        const modeClass = display ? 'katex-math display' : 'katex-math inline';
        segments.push(`<span class="${modeClass}"><span class="katex-math-content">${escaped}</span></span>`);

        lastIndex = match.index + full.length;
    }

    if (lastIndex < input.length) {
        const tail = input.slice(lastIndex);
        if (tail) {
            segments.push(`<span class="katex-text">${escapeHtml(tail)}</span>`);
        }
    }

    const joined = segments.join('').replace(/\n/g, '<br />');
    return `<span class="katex-wrapper">${joined}</span>`;
}

function renderToString(input, options = {}) {
    if (typeof input !== 'string') {
        if (options.throwOnError) {
            throw new Error('KaTeX input must be a string');
        }
        return '';
    }

    try {
        return renderSegments(input);
    } catch (err) {
        if (options.throwOnError) {
            throw err;
        }
        return '';
    }
}

module.exports = { renderToString };
