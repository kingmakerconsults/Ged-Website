/**
 * Math and LaTeX utility functions
 * Extracted from app.jsx for better organization
 */

export function applySafeMathFix(text) {
  if (typeof text !== 'string') {
    return text;
  }
  if (typeof fixAllMathInText === 'function') {
    return fixAllMathInText(text);
  }
  let working = text;
  if (typeof collapseUnderscoredLatexMacros === 'function') {
    working = collapseUnderscoredLatexMacros(working);
  }
  if (typeof addMissingBackslashesInMath === 'function') {
    return addMissingBackslashesInMath(working);
  }
  const legacy =
    typeof window !== 'undefined' &&
    window.TextSanitizer &&
    window.TextSanitizer.addMissingBackslashesInMath;
  if (typeof legacy === 'function') {
    return legacy(working);
  }
  return working;
}

export function collapseSplitLatexCommands(source) {
  if (typeof source !== 'string' || source.length === 0) {
    return source;
  }

  let normalized = source.replace(/\\{2}(?=[A-Za-z_])/g, '\\');

  let previous;
  do {
    previous = normalized;
    normalized = normalized.replace(/([A-Za-z])\\_/g, '$1');
  } while (normalized !== previous);

  return normalized.replace(
    /\\([A-Za-z])(?:\\([A-Za-z]))+/g,
    (match) => `\\${match.replace(/\\/g, '')}`
  );
}

export function normalizeLatex(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }

  let normalized = text;

  normalized = normalized.replace(
    /(?<!\\)\$([0-9]+(?:\.[0-9]{1,2})?)/g,
    (_match, amount) => `\\$${amount}`
  );

  normalized = normalized
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/(?<!\\)\$([^$]*?)(?<!\\)\$/g, '$1')
    .replace(/\\\(([^]*?)\\\)/g, '$1')
    .replace(/\\\[([^]*?)\\\]/g, '$1');

  normalized = normalized.replace(
    /\$(\s*\d+(?:[.,]\d{1,2}))\$/g,
    (_m, amount) => `$${amount.trim()}`
  );
  normalized = normalized.replace(/\$\s+(\d)/g, '$$1');

  normalized = normalized.replace(/\\dfrac/g, '\\frac');

  normalized = normalized
    .replace(/(?:\\|\/|[\u2191\^])\s*rac\s*\{/g, '\\frac{')
    .replace(/\\frac\s+([^\s{}]+)\s+([^\s{}]+)/g, '\\frac{$1}{$2}')
    .replace(
      /\\frac\s*\{\s*([^{}]+?)\s*\}\s*\{\s*([^{}]+?)\s*\}/g,
      (_match, a, b) => `\\frac{${a.trim()}}{${b.trim()}}`
    );

  normalized = collapseSplitLatexCommands(normalized);

  if (typeof collapseUnderscoredLatexMacros === 'function') {
    normalized = collapseUnderscoredLatexMacros(normalized);
  }

  normalized = normalized.replace(/(?<![A-Za-z])rac\s*\{/g, '\\frac{');

  normalized = normalized.replace(
    /<\/?(?:table|thead|tbody|tfoot|tr|th|td|caption|colgroup|col)[^>]*>/gi,
    ' '
  );
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

export function normalizeLatexForKaTeX(latex) {
  if (typeof latex !== 'string') return latex;
  return latex
    .replace(/\\\\([A-Za-z]+)/g, '\\$1')
    .replace(/\\left\s*/g, '')
    .replace(/\\right\s*/g, '');
}

export const KATEX_RENDER_OPTIONS = { throwOnError: false, strict: 'ignore' };

export function renderLatexToHtml(latexInput) {
  if (typeof latexInput !== 'string') {
    return '';
  }
  if (typeof katex === 'undefined') {
    throw new Error('KaTeX not available');
  }
  const latex = normalizeLatexForKaTeX(latexInput);
  if (
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof katex.render === 'function'
  ) {
    const container = document.createElement('span');
    katex.render(latex, container, KATEX_RENDER_OPTIONS);
    return container.innerHTML;
  }
  if (typeof katex.renderToString === 'function') {
    return katex.renderToString(latex, KATEX_RENDER_OPTIONS);
  }
  throw new Error('KaTeX render helpers missing');
}

export function normalizeFormulaLatex(latex) {
  if (typeof latex !== 'string') {
    return '';
  }

  let working = latex;

  try {
    working = applySafeMathFix(working);
  } catch (error) {
    console.warn('Failed to sanitize formula latex:', error?.message || error);
  }

  try {
    working = normalizeLatex(working);
  } catch (error) {
    console.warn('Failed to normalize formula latex:', error?.message || error);
  }

  return working;
}

export function smartWrapLatex(input) {
  if (typeof input !== 'string' || input.length === 0) {
    return input;
  }

  const slots = [];
  const masked = input.replace(/\\\([^\)]*\\\)|\$[^$]+\$/g, (match) => {
    slots.push(match);
    return `@@M${slots.length - 1}@@`;
  });

  const MACRO_PATTERN =
    /\\(?:frac|sqrt|text|pi|times|cdot|le|ge|lt|gt|neq|approx|sin|cos|tan|log|ln|pm|mp|theta|alpha|beta|gamma)\b/y;

  const grabBraces = (source, start) => {
    if (source[start] !== '{') {
      return 0;
    }
    let depth = 0;
    let index = start;
    while (index < source.length) {
      const ch = source[index++];
      if (ch === '{') {
        depth += 1;
      } else if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          return index - start;
        }
      }
    }
    return 0;
  };

  let result = '';
  let cursor = 0;

  while (cursor < masked.length) {
    const char = masked[cursor];
    if (char === '\\') {
      MACRO_PATTERN.lastIndex = cursor;
      const match = MACRO_PATTERN.exec(masked);
      if (match) {
        let end = MACRO_PATTERN.lastIndex;
        if (match[0] === '\\frac') {
          const first = grabBraces(masked, end);
          if (first) {
            end += first;
            const second = grabBraces(masked, end);
            if (second) {
              end += second;
            }
          }
        } else {
          const groupLen = grabBraces(masked, end);
          if (groupLen) {
            end += groupLen;
          }
        }
        const segment = masked.slice(cursor, end);
        result += `\\(${segment}\\)`;
        cursor = end;
        continue;
      }
    }
    result += char;
    cursor += 1;
  }

  return result.replace(/@@M(\d+)@@/g, (_match, index) => slots[Number(index)]);
}

export function escapeHtml(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return '';
  }
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function formatExponents(input) {
  if (typeof input !== 'string') return input;
  // Added data-source attribute to verify centralization wiring visually.
  return input.replace(/\^(\d+)/g, '<sup data-source="mathUtils">$1</sup>');
}

export function normalizeMathText(text) {
  if (typeof text !== 'string') return text;
  let t = text;
  // Strip surrounding $...$ or $$...$$ once
  t = t.replace(/^\$(.*)\$$/, '$1');
  t = t.replace(/^\$\$(.*)\$\$$/, '$1');
  // Safe macro fixes inside math
  if (
    typeof window !== 'undefined' &&
    window.TextSanitizer &&
    window.TextSanitizer.fixAllMathInText
  ) {
    t = window.TextSanitizer.fixAllMathInText(t);
  }
  // Replace \frac{a}{b} with (a/b)
  t = t.replace(/\\frac\s*\{\s*([^}]+)\s*\}\s*\{\s*([^}]+)\s*\}/g, '($1/$2)');
  return t.trim();
}

export function stripLeakedMathPlaceholders(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }
  return text
    .replace(/(?:\f|\\f)\\?_?MATH_SEGMENT_[A-Z0-9]+/gi, '')
    .replace(/MATH_SEGMENT_[A-Z0-9]+/gi, '');
}

// Extracted from app.jsx: upgradePlainMathForDisplay
export function upgradePlainMathForDisplay(text) {
  if (!text || typeof text !== 'string') return text;
  let upgraded = text;
  upgraded = upgraded.replace(
    /\\frac\s*{\s*([^}]+)\s*}\s*{\s*([^}]+)\s*}/g,
    (_m, num, den) => `${num}/${den}`
  );
  upgraded = upgraded.replace(
    /\\sqrt\s*{\s*([^}]+)\s*}/g,
    (_m, inner) => `sqrt(${inner})`
  );
  upgraded = upgraded.replace(
    /(\S)\s*\^\s*{\s*([0-9]+)\s*}/g,
    (_m, base, exp) => `${base}^${exp}`
  );
  upgraded = upgraded.replace(/([\w)\]])\s*\/\s*([\w(])/g, '$1/$2');
  upgraded = upgraded.replace(/([\w)\]])\s*\^\s*([\d(])/g, '$1^$2');
  return upgraded;
}

// Extracted: formatMathText (depends on formatFractions which is in textUtils; caller should import it separately)
export function formatMathText(html) {
  if (typeof html !== 'string' || html.length === 0) return html;
  // Fractions formatting delegated to textUtils.formatFractions at call site
  let out = html;
  out = out.replace(
    /([A-Za-z0-9\)])\^(\d+)/g,
    (_m, base, exp) => `${base}<sup data-source="mathUtils">${exp}</sup>`
  );
  return out;
}

// Pre-escape currency dollar signs so they aren't treated as LaTeX delimiters.
// Matches $NN, $NN.NN, $NN,NNN etc. that represent money amounts and replaces
// the leading $ with the escaped form ＄ (fullwidth dollar) as a safe placeholder,
// then after segment extraction we restore them.
function escapeCurrencyDollars(text) {
  if (typeof text !== 'string') return text;
  // Match $ followed by digits (with optional commas, decimals) that look like currency,
  // but NOT already-escaped \$ and NOT inside \(...\) or $..$ math blocks.
  // We use a two-pass approach: first protect existing \$, then escape bare currency $.
  let result = text;
  // Temporarily protect already-escaped \$
  result = result.replace(/\\\$/g, '\x00ESC_DOLLAR\x00');
  // Escape bare currency: $NNN or $N,NNN or $NNN.NN
  // Only match $ followed by digit (not $ followed by letter which is likely LaTeX)
  result = result.replace(
    /\$(\d[\d,]*(?:\.\d{0,2})?)/g,
    '\\$$$1'
  );
  // Restore previously-escaped \$
  result = result.replace(/\x00ESC_DOLLAR\x00/g, '\\$');
  return result;
}

// Extracted: extractMathSegments
export function extractMathSegments(input) {
  const segments = [];
  if (typeof input !== 'string' || !input.length) {
    return segments;
  }
  // Pre-escape currency dollar signs before parsing math delimiters
  const safeInput = escapeCurrencyDollars(input);
  const mathRegex =
    /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$([\s\S]+?)\$|\\\(([\s\S]+?)\\\)/g;
  let lastIndex = 0;
  let match;
  while ((match = mathRegex.exec(safeInput)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        value: safeInput.slice(lastIndex, match.index),
      });
    }
    if (typeof match[1] !== 'undefined') {
      segments.push({
        type: 'math',
        value: match[1],
        displayMode: true,
        raw: match[0],
      });
    } else if (typeof match[2] !== 'undefined') {
      segments.push({
        type: 'math',
        value: match[2],
        displayMode: true,
        raw: match[0],
      });
    } else if (typeof match[3] !== 'undefined') {
      segments.push({
        type: 'math',
        value: match[3],
        displayMode: false,
        raw: match[0],
      });
    } else {
      segments.push({
        type: 'math',
        value: match[4],
        displayMode: false,
        raw: match[0],
      });
    }
    lastIndex = mathRegex.lastIndex;
  }
  if (lastIndex < safeInput.length) {
    segments.push({ type: 'text', value: safeInput.slice(lastIndex) });
  }
  return segments;
}

// Extracted: renderStem (processes text with math segments for dynamic content)
export function renderStem(text) {
  if (typeof text !== 'string') {
    return '';
  }

  // Import preprocessRawContent from textUtils if needed, or use global
  const preprocessFn =
    typeof preprocessRawContent === 'function'
      ? preprocessRawContent
      : (t) => t;
  const cleanedText = preprocessFn(text, { normalizeSpacing: true });
  const segments = extractMathSegments(cleanedText);
  const renderedParts = [];

  for (const segment of segments) {
    if (segment.type === 'math') {
      const pretty = formatExponents(segment.value);
      renderedParts.push(`<span class="math-inline">${pretty}</span>`);
    } else {
      renderedParts.push(segment.value);
    }
  }

  const combinedHtml = renderedParts.join('');
  const sanitizer =
    typeof window !== 'undefined' &&
    window.DOMPurify &&
    window.DOMPurify.sanitize
      ? window.DOMPurify.sanitize
      : (v) => v;
  const allowedTags =
    typeof ALLOWED_HTML_TAGS !== 'undefined'
      ? [...ALLOWED_HTML_TAGS, 'span', 'sup', 'path', 'svg']
      : ['span', 'sup', 'path', 'svg'];
  const allowedAttr =
    typeof ALLOWED_HTML_ATTR !== 'undefined'
      ? [...ALLOWED_HTML_ATTR, 'style', 'd', 'viewBox', 'xmlns']
      : ['style', 'd', 'viewBox', 'xmlns'];
  return sanitizer(combinedHtml, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttr,
  });
}

// Extracted: renderStemWithKatex (premade/static content only)
export function renderStemWithKatex(text) {
  if (typeof text !== 'string') return '';
  const segments = extractMathSegments(text);
  const parts = [];
  const moneyRegex = /^\$\d+(?:\.\d{1,2})?$/;
  const pureNumber = /^\d+(?:\.\d{1,2})?$/;
  const effectiveSegments = segments.length
    ? segments
    : [{ type: 'text', value: text }];

  for (const seg of effectiveSegments) {
    if (seg.type !== 'math') {
      const sanitizer =
        typeof window !== 'undefined' &&
        window.DOMPurify &&
        window.DOMPurify.sanitize
          ? window.DOMPurify.sanitize
          : null;
      const cleaned = sanitizer
        ? sanitizer(seg.value, {
            ALLOWED_TAGS:
              typeof ALLOWED_HTML_TAGS !== 'undefined' ? ALLOWED_HTML_TAGS : [],
            ALLOWED_ATTR:
              typeof ALLOWED_HTML_ATTR !== 'undefined' ? ALLOWED_HTML_ATTR : [],
          })
        : escapeHtml(seg.value);
      parts.push(cleaned);
      continue;
    }
    const raw = seg.raw || '';
    const body = (seg.value || '').trim();
    const isSingleDollarWrapped =
      /^\$[^$][\s\S]*\$$/.test(raw) && !/^\$\$[\s\S]*\$\$/.test(raw);
    const isPlainMoney = isSingleDollarWrapped && pureNumber.test(body);
    if (isPlainMoney) {
      const escaped = `\\$${body}`;
      parts.push(`<span class="math-inline">${escaped}</span>`);
      continue;
    }
    if (moneyRegex.test(body)) {
      const escaped = body.replace(/^\$/, '\\$');
      parts.push(`<span class="math-inline">${escaped}</span>`);
      continue;
    }
    try {
      const html = katex.renderToString(body, {
        throwOnError: false,
        displayMode: Boolean(seg.displayMode),
      });
      parts.push(html);
    } catch (e) {
      const _san =
        typeof window !== 'undefined' &&
        window.DOMPurify &&
        window.DOMPurify.sanitize
          ? window.DOMPurify.sanitize
          : null;
      const safe = _san
        ? _san(body, {
            ALLOWED_TAGS:
              typeof ALLOWED_HTML_TAGS !== 'undefined' ? ALLOWED_HTML_TAGS : [],
            ALLOWED_ATTR:
              typeof ALLOWED_HTML_ATTR !== 'undefined' ? ALLOWED_HTML_ATTR : [],
          })
        : escapeHtml(body);
      parts.push(`<span class="math-inline">${safe}</span>`);
    }
  }
  const combined = parts.join('');
  const maybeFormatted =
    effectiveSegments.length === 1 && effectiveSegments[0].type === 'text'
      ? formatMathText(combined)
      : combined;
  const finalSan =
    typeof window !== 'undefined' &&
    window.DOMPurify &&
    window.DOMPurify.sanitize
      ? window.DOMPurify.sanitize
      : null;
  return finalSan
    ? finalSan(maybeFormatted, {
        ALLOWED_TAGS:
          typeof ALLOWED_HTML_TAGS !== 'undefined'
            ? [...ALLOWED_HTML_TAGS, 'span', 'sup', 'svg', 'path']
            : [],
        ALLOWED_ATTR:
          typeof ALLOWED_HTML_ATTR !== 'undefined'
            ? [...ALLOWED_HTML_ATTR, 'style', 'd', 'viewBox', 'xmlns']
            : [],
      })
    : maybeFormatted;
}

// Extracted: renderQuestionTextForDisplay
export function renderQuestionTextForDisplay(
  text,
  isPremade,
  questionCtx = null
) {
  const useKatex = Boolean(
    typeof window !== 'undefined' &&
      window.__APP_CONFIG__ &&
      window.__APP_CONFIG__.premadeUsesKatex === true &&
      isPremade === true
  );
  if (useKatex) {
    return { __html: renderStemWithKatex(text) };
  }
  const isMath =
    questionCtx && typeof questionCtx.subject === 'string'
      ? String(questionCtx.subject).toLowerCase() === 'math'
      : false;
  const isGenerated = !isPremade && !(questionCtx && questionCtx.isStatic);
  const prepped =
    isMath && isGenerated ? upgradePlainMathForDisplay(text) : text;
  const html = renderStem(prepped);
  const finalHtml = formatMathText(html);
  return { __html: finalHtml };
}

// Attach to window for Babel Standalone (no modules)
if (typeof window !== 'undefined') {
  window.MathUtils = Object.assign(window.MathUtils || {}, {
    applySafeMathFix,
    collapseSplitLatexCommands,
    normalizeLatex,
    normalizeLatexForKaTeX,
    KATEX_RENDER_OPTIONS,
    renderLatexToHtml,
    normalizeFormulaLatex,
    smartWrapLatex,
    escapeHtml,
    formatExponents,
    normalizeMathText,
    stripLeakedMathPlaceholders,
    upgradePlainMathForDisplay,
    formatMathText,
    extractMathSegments,
    renderStem,
    renderStemWithKatex,
    renderQuestionTextForDisplay,
  });
}
