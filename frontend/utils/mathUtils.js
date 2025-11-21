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
  return input.replace(/\^(\d+)/g, '<sup>$1</sup>');
}

export function normalizeMathText(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/×/g, '\\times')
    .replace(/÷/g, '\\div')
    .replace(/≤/g, '\\le')
    .replace(/≥/g, '\\ge')
    .replace(/≠/g, '\\neq')
    .replace(/≈/g, '\\approx')
    .replace(/π/g, '\\pi')
    .replace(/°/g, '^\\circ');
}
