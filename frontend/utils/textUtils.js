/**
 * Text processing and sanitization utilities
 * Extracted from app.jsx for better organization
 */

export const ALLOWED_HTML_TAGS = [
  'a',
  'b',
  'strong',
  'i',
  'em',
  'u',
  's',
  'span',
  'p',
  'br',
  'ul',
  'ol',
  'li',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'colgroup',
  'col',
  'code',
  'pre',
  'sup',
  'sub',
  'div',
  'img',
];

export const ALLOWED_HTML_ATTR = [
  'href',
  'title',
  'target',
  'rel',
  'colspan',
  'rowspan',
  'align',
  'scope',
  'src',
  'alt',
  'class',
];

const ENTITY_DECODER =
  typeof document !== 'undefined' ? document.createElement('textarea') : null;

export function normalizeLineBreaks(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/([^\n])\n(?!\n)/g, '$1 ')
    .replace(/\n{3,}/g, '\n\n');
}

export function surroundOperatorWithSpaces(source, match, offset) {
  const before = offset > 0 ? source[offset - 1] : '';
  const after =
    offset + match.length < source.length ? source[offset + match.length] : '';
  const isAlphaBefore = before && /[A-Za-z]/.test(before);
  const isAlphaAfter = after && /[A-Za-z]/.test(after);
  if (isAlphaBefore || isAlphaAfter) {
    return match;
  }
  const trimmed = match.replace(/\s+/g, ' ').trim();
  const leading = before && !/[\s\n]/.test(before) ? ' ' : '';
  const trailing = after && !/[\s\n]/.test(after) ? ' ' : '';
  return `${leading}${trimmed}${trailing}`;
}

export function normalizePunctuationSpacing(value) {
  if (typeof value !== 'string') return value;
  let result = value.replace(
    /([.,;:!?])(?=\S)/g,
    (match, punct, offset, string) => {
      const nextChar = string[offset + match.length];
      if (!nextChar) return match;
      if (/\s/.test(nextChar)) return match;
      if (
        (punct === ':' || punct === ',' || punct === '.') &&
        /[0-9]/.test(nextChar)
      ) {
        return match;
      }
      if ((punct === ':' || punct === '.') && nextChar === '/') {
        return match;
      }
      return `${punct} `;
    }
  );
  const wordOperators = ['plus', 'minus', 'times'];
  wordOperators.forEach((op) => {
    const regex = new RegExp(op, 'gi');
    result = result.replace(regex, (match, offset, string) =>
      surroundOperatorWithSpaces(string, match, offset)
    );
  });
  const dividedRegex = /divided\s+by/gi;
  result = result.replace(dividedRegex, (match, offset, string) =>
    surroundOperatorWithSpaces(string, match, offset)
  );
  result = result.replace(/[^\S\r\n]+([.,;:!?])/g, '$1');
  result = result.replace(/[^\S\r\n]{2,}/g, ' ');
  return result;
}

const LATEX_CONTROL_CHAR_ESCAPE = {
  '\f': 'f',
  '\n': 'n',
  '\t': 't',
  '\r': 'r',
  '\b': 'b',
  '\v': 'v',
};

export function escapeLatexControlCharacters(input) {
  return input.replace(/[\f\n\t\r\b\v]/g, (char) => {
    const replacement = LATEX_CONTROL_CHAR_ESCAPE[char];
    return replacement ? `\\${replacement}` : char;
  });
}

export function repairLatexCorruption(value) {
  if (typeof value !== 'string') return value;
  let working = value.replace(/(?:\^|\f)rac\{/gi, '\\frac{');
  working = working.replace(
    /\$\$([\s\S]+?)\$\$/g,
    (_, inner) => `$$${escapeLatexControlCharacters(inner)}$$`
  );
  working = working.replace(
    /\$([\s\S]+?)\$/g,
    (_, inner) => `$${escapeLatexControlCharacters(inner)}$`
  );
  working = working.replace(
    /\\\(([\s\S]+?)\\\)/g,
    (_, inner) => `\\(${escapeLatexControlCharacters(inner)}\\)`
  );
  return working;
}

export function decodeHtmlEntities(value) {
  if (typeof value !== 'string') return '';
  if (!ENTITY_DECODER) return value;
  ENTITY_DECODER.innerHTML = value;
  return ENTITY_DECODER.value;
}

export function neutralizeUnpairedDollarSigns(text) {
  if (typeof text !== 'string' || text.indexOf('$') === -1) {
    return text;
  }

  if (!(tokenizeMathSegments && restoreMathSegments)) {
    return text.replace(/(^|[^\\])\$(?!\d)/g, (_, prefix) => `${prefix}&#36;`);
  }

  const { masked, segments } = tokenizeMathSegments(text);
  const working = masked.replace(
    /(^|[^\\])\$(?!\d)/g,
    (_, prefix) => `${prefix}&#36;`
  );
  return restoreMathSegments(working, segments);
}

export function escapeCurrencyDollarsMathSafe(input) {
  if (typeof input !== 'string') return input;

  if (!(tokenizeMathSegments && restoreMathSegments)) {
    let fallback = input.replace(/\\$(\s*\d[\d.,]*)/g, '&#36;$1');
    fallback = fallback.replace(/(\d[\d.,]*)(\s*)\$(?!\d)/g, '&#36;$1');
    return fallback.replace(
      /(^|[^&])\$(?!\d)/g,
      (_, prefix) => `${prefix}&#36;`
    );
  }

  const { masked, segments } = tokenizeMathSegments(input);
  let working = masked.replace(/\\$(\s*\d[\d.,]*)/g, '&#36;$1');
  working = working.replace(/(\d[\d.,]*)(\s*)\$(?!\d)/g, '&#36;$1');
  working = working.replace(
    /(^|[^&])\$(?!\d)/g,
    (_, prefix) => `${prefix}&#36;`
  );
  return restoreMathSegments(working, segments);
}

export function stripBackslashesOutsideMath(input) {
  if (typeof input !== 'string') return input;

  if (!(tokenizeMathSegments && restoreMathSegments)) {
    return input.replace(/\\(?=\d|\$)/g, '');
  }

  const { masked, segments } = tokenizeMathSegments(input);
  const cleaned = masked.replace(/\\(?=\d|\$)/g, '');
  return restoreMathSegments(cleaned, segments);
}

export function deglueCommonBigrams(s) {
  if (typeof s !== 'string') return s;
  const replacements = {
    inthe: 'in the',
    ofthe: 'of the',
    forthe: 'for the',
    tothe: 'to the',
    theof: 'the of',
  };

  return s.replace(/\b(inthe|ofthe|forthe|tothe|theof)\b/gi, (match) => {
    const replacement = replacements[match.toLowerCase()];
    if (!replacement) {
      return match;
    }
    if (match === match.toUpperCase()) {
      return replacement.toUpperCase();
    }
    if (match[0] === match[0].toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
  });
}

export function addSpacesAroundInlineMath(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/([A-Za-z])\$(?!\$)/g, '$1 $')
    .replace(/\$(?!\$)([A-Za-z])/g, ' $1');
}

export function repairSpacedTags(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/<\s*\/\s*([a-z]+)\s*>/gi, '</$1>')
    .replace(/<\s*([a-z]+)(\s[^>]*)?>/gi, (_, tagName, attrs = '') => {
      const normalizedAttrs = attrs ? attrs.replace(/\s+$/, '') : '';
      return `<${tagName}${normalizedAttrs}>`;
    });
}

export function protectTables(text) {
  if (typeof text !== 'string' || text.toLowerCase().indexOf('<table') === -1) {
    return text;
  }

  return text.replace(/<table[\s\S]*?<\/table>/gi, (tableContent) =>
    tableContent.replace(/\$/g, '&#36;')
  );
}

export function stripLeakedMathPlaceholders(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/@@MATH_\d+@@/g, '');
}

export function formatFractions(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/(\d+)\/(\d+)/g, '<sup>$1</sup>⁄<sub>$2</sub>');
}

export function cleanRepeatedText(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/\b(\w+)\s+\1\b/gi, '$1');
}

export function preprocessRawContent(value, { normalizeSpacing = false } = {}) {
  if (typeof value !== 'string') return '';
  let working = normalizeLineBreaks(value);
  if (normalizeSpacing) {
    working = normalizePunctuationSpacing(working);
  }
  working = repairLatexCorruption(working);
  working = decodeHtmlEntities(working);

  if (tokenizeMathSegments && restoreMathSegments) {
    const { masked, segments } = tokenizeMathSegments(working);
    let plain = masked;
    if (stripTextMacroInPlain) {
      plain = stripTextMacroInPlain(plain);
    }
    if (applyPhraseSpacingRepairs) {
      plain = applyPhraseSpacingRepairs(plain);
    }
    if (normalizeCurrencyOutsideMath) {
      plain = normalizeCurrencyOutsideMath(plain);
    }
    working = restoreMathSegments(plain, segments);
  } else {
    if (stripTextMacroInPlain) {
      working = stripTextMacroInPlain(working);
    }
    if (applyPhraseSpacingRepairs) {
      working = applyPhraseSpacingRepairs(working);
    }
    if (normalizeCurrencyOutsideMath) {
      working = normalizeCurrencyOutsideMath(working);
    }
  }

  working = stripBackslashesOutsideMath(working);
  working = neutralizeUnpairedDollarSigns(working);
  working = escapeCurrencyDollarsMathSafe(working);
  working = working.replace(/(\d[\d.,]*)(\s*)&\#36;/g, '&#36;$1');
  working = addSpacesAroundInlineMath(working);
  working = repairSpacedTags(working);
  working = protectTables(working);
  working = deglueCommonBigrams(working);
  working = working.replace(/\$\s*([A-Za-z])\s*\$/g, '$1');
  return working;
}

export function sanitizeCodeSegment(value, fallback = '') {
  if (typeof value !== 'string') return fallback;
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/javascript:/gi, '');
}

export function normalizeImagePath(path) {
  if (typeof path !== 'string') return path;
  return path.replace(/\\/g, '/').replace(/\/+/g, '/');
}

export function resolveAssetUrl(src) {
  if (!src || typeof src !== 'string') return '';
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  if (src.startsWith('/')) {
    return src;
  }
  return `/${normalizeImagePath(src)}`;
}

export function getOptionText(opt) {
  if (!opt) return '';
  if (typeof opt === 'string') return opt;
  return opt.text || opt.option || opt.label || '';
}

export function getOptionIsCorrect(opt) {
  if (!opt) return false;
  if (typeof opt === 'object')
    return opt.isCorrect === true || opt.correct === true;
  return false;
}

export function findCorrectOption(answerOptions) {
  if (!Array.isArray(answerOptions)) return null;
  return answerOptions.find(getOptionIsCorrect);
}

export function isShortResponseQuestion(question) {
  if (!question) return false;
  return (
    question.type === 'short-response' ||
    question.type === 'short_response' ||
    question.type === 'fillInTheBlank' ||
    question.type === 'fill-in-the-blank' ||
    (question.answerType && question.answerType.toLowerCase().includes('short'))
  );
}
