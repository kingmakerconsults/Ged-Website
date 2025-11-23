/**
 * Text processing and sanitization utilities
 * Extracted from app.jsx for better organization
 */

const ALLOWED_HTML_TAGS = [
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

const ALLOWED_HTML_ATTR = [
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

function normalizeLineBreaks(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/([^\n])\n(?!\n)/g, '$1 ')
    .replace(/\n{3,}/g, '\n\n');
}

function surroundOperatorWithSpaces(source, match, offset) {
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

function normalizePunctuationSpacing(value) {
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

function escapeLatexControlCharacters(input) {
  return input.replace(/[\f\n\t\r\b\v]/g, (char) => {
    const replacement = LATEX_CONTROL_CHAR_ESCAPE[char];
    return replacement ? `\\${replacement}` : char;
  });
}

function repairLatexCorruption(value) {
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

function decodeHtmlEntities(value) {
  if (typeof value !== 'string') return '';
  if (!ENTITY_DECODER) return value;
  ENTITY_DECODER.innerHTML = value;
  return ENTITY_DECODER.value;
}

function neutralizeUnpairedDollarSigns(text) {
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

function escapeCurrencyDollarsMathSafe(input) {
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

function stripBackslashesOutsideMath(input) {
  if (typeof input !== 'string') return input;

  if (!(tokenizeMathSegments && restoreMathSegments)) {
    return input.replace(/\\(?=\d|\$)/g, '');
  }

  const { masked, segments } = tokenizeMathSegments(input);
  const cleaned = masked.replace(/\\(?=\d|\$)/g, '');
  return restoreMathSegments(cleaned, segments);
}

function deglueCommonBigrams(s) {
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

function addSpacesAroundInlineMath(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/([A-Za-z])\$(?!\$)/g, '$1 $')
    .replace(/\$(?!\$)([A-Za-z])/g, ' $1');
}

function repairSpacedTags(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/<\s*\/\s*([a-z]+)\s*>/gi, '</$1>')
    .replace(/<\s*([a-z]+)(\s[^>]*)?>/gi, (_, tagName, attrs = '') => {
      const normalizedAttrs = attrs ? attrs.replace(/\s+$/, '') : '';
      return `<${tagName}${normalizedAttrs}>`;
    });
}

function protectTables(text) {
  if (typeof text !== 'string' || text.toLowerCase().indexOf('<table') === -1) {
    return text;
  }

  return text.replace(/<table[\s\S]*?<\/table>/gi, (tableContent) =>
    tableContent.replace(/\$/g, '&#36;')
  );
}

function stripLeakedMathPlaceholders(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/@@MATH_\d+@@/g, '');
}

// Replaced with trusted implementation from app.jsx (wrap plain-text math fractions in span.frac)
function formatFractions(text) {
  if (!text || typeof text !== 'string') return text;
  const complexPattern = /\(([^(]+)\)\s*\/\s*\(([^(]+)\)/g;
  const parenOverNumberPattern = /\(([^(]+)\)\s*\/\s*([0-9]+(\.[0-9]+)?)/g;
  const simpleNumericPattern =
    /\b([0-9]+(\.[0-9]+)?)\s*\/\s*([0-9]+(\.[0-9]+)?)\b/g;
  let out = text;
  out = out.replace(complexPattern, (m) => `<span class="frac">${m}</span>`);
  out = out.replace(
    parenOverNumberPattern,
    (m) => `<span class="frac">${m}</span>`
  );
  out = out.replace(
    simpleNumericPattern,
    (m) => `<span class="frac">${m}</span>`
  );
  return out;
}

// Replaced with trusted implementation from app.jsx (remove duplicated halves of entire string)
function cleanRepeatedText(text) {
  if (!text || typeof text !== 'string') return text;
  const half = Math.floor(text.length / 2);
  if (text.length % 2 === 0) {
    const firstHalf = text.substring(0, half);
    const secondHalf = text.substring(half);
    if (firstHalf === secondHalf) {
      return firstHalf;
    }
  }
  return text;
}

// Extracted from app.jsx: normalizeInlineTablesFront
function normalizeInlineTablesFront(html) {
  if (typeof html !== 'string' || !html.trim()) return html;
  if (/<table/i.test(html)) return html;
  if (!html.includes('|')) return html;
  let rows;
  if (html.includes('||')) {
    rows = html
      .split('||')
      .map((r) => r.trim())
      .filter(Boolean);
  } else {
    rows = html
      .split(/\r?\n/)
      .filter((l) => l.includes('|'))
      .map((r) => r.trim())
      .filter(Boolean);
  }
  if (!rows.length) return html;
  const trs = [];
  for (const r of rows) {
    if (/^\|?\s*-{3,}/.test(r)) continue;
    const cells = r
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
    const tds = cells.map((c) => `<td>${c}</td>`).join('');
    trs.push(`<tr>${tds}</tr>`);
  }
  if (!trs.length) return html;
  return `<table class="data-table"><tbody>${trs.join('')}</tbody></table>`;
}

// Extracted from app.jsx: sanitizeHtmlContent
function sanitizeHtmlContent(
  content,
  { normalizeSpacing = false, skipPreprocess = false } = {}
) {
  if (typeof content !== 'string') return '';
  let working = content;
  if (!skipPreprocess) {
    working = preprocessRawContent(working, { normalizeSpacing });
  }
  working = normalizeInlineTablesFront(working);
  const sanitizer =
    typeof window !== 'undefined' &&
    window.DOMPurify &&
    window.DOMPurify.sanitize
      ? window.DOMPurify.sanitize
      : null;
  if (sanitizer) {
    return formatFractions(
      sanitizer(working, {
        ALLOWED_TAGS: ALLOWED_HTML_TAGS,
        ALLOWED_ATTR: ALLOWED_HTML_ATTR,
      })
    );
  }
  return formatFractions(
    working.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  );
}

function preprocessRawContent(value, { normalizeSpacing = false } = {}) {
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

function sanitizeCodeSegment(value, fallback = '') {
  if (typeof value !== 'string') {
    return fallback;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return fallback;
  }
  const normalized = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || fallback;
}

function normalizeImagePath(path) {
  if (!path) return '';
  let p = String(path).trim().replace(/\\+/g, '/').replace(/\/+/g, '/');
  p = p.replace(/\/+/g, '/');
  // Remove leading/trailing whitespace and slashes
  p = p.replace(/^\s+|\s+$/g, '').replace(/^\/+|\/+$/g, '');
  // Lowercase /frontend/images and /frontend/images/subject segments only
  p = p.replace(/^frontend\//i, 'frontend/');
  p = p.replace(/^frontend\/images\//i, 'frontend/Images/');
  // If path starts with /frontend/images (any case), normalize to /frontend/Images
  p = p.replace(/^frontend\/images/i, 'frontend/Images');
  // Always ensure /frontend/Images/Subject/FileName.png format
  const parts = p.split('/');
  if (
    parts[0].toLowerCase() === 'frontend' &&
    parts[1] &&
    parts[1].toLowerCase() === 'images'
  ) {
    // Capitalize subject if present
    if (parts[2]) {
      parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
    }
    p = '/frontend/Images/' + parts.slice(2).join('/');
  } else if (p.toLowerCase().startsWith('images/')) {
    // If path starts with images/subject/file, normalize
    const subparts = p.split('/');
    if (subparts[1]) {
      subparts[1] = subparts[1].charAt(0).toUpperCase() + subparts[1].slice(1);
    }
    p = '/frontend/Images/' + subparts.slice(1).join('/');
  } else if (!p.startsWith('/frontend/Images/')) {
    // Fallback: just ensure it starts with /frontend/Images/
    p = '/frontend/Images/' + p.replace(/^\/+/, '');
  } else {
    p = '/' + p.replace(/^\/+/, '');
  }
  // Remove duplicate slashes
  p = p.replace(/\/+/g, '/');
  return p;
}

function resolveAssetUrl(src) {
  if (!src) return '';
  let s = String(src).trim();

  // If it's one of our legacy quiz hosts, strip the host and treat it as an internal asset path
  // Examples:
  //   https://quiz.ez-ged.com/Images/Math/foo.png
  //   http://quiz.ez-ged.net/Images/Science/bar.jpg
  //   https://something.quiz.ez-ged.com/path/to/image.png
  const legacyMatch = s.match(/^https?:\/\/([^\/]*quiz\.ez-ged[^\/]*)\/(.*)$/i);
  if (legacyMatch) {
    const pathAndRest = legacyMatch[2] || '';
    s = pathAndRest;
  }

  // Already absolute and NOT one of our legacy hosts? keep it as-is
  if (
    /^https?:\/\//i.test(s) ||
    s.startsWith('data:') ||
    s.startsWith('blob:')
  ) {
    return s;
  }

  // normalize to our internal pattern first
  const normalized = normalizeImagePath(s); // e.g. /frontend/Images/Social Studies/foo.png

  // our working CDN / static host
  const NETLIFY_ROOT = 'https://ezged.netlify.app';

  // if it's one of our quiz images, serve it from Netlify, but Netlify doesn't use /frontend
  if (normalized.startsWith('/frontend/Images/')) {
    // turn /frontend/Images/... -> /Images/...
    const netlifyPath = normalized.replace('/frontend/Images', '/Images');
    return `${NETLIFY_ROOT}${netlifyPath}`;
  }

  // fallback: current origin
  const origin =
    (typeof window !== 'undefined' &&
      window.location &&
      window.location.origin) ||
    '';
  return origin + normalized;
}

function getOptionText(opt) {
  if (typeof opt === 'string') return opt;
  if (opt && typeof opt === 'object' && typeof opt.text === 'string')
    return opt.text;
  return '';
}

function getOptionIsCorrect(opt) {
  if (typeof opt === 'string') return false;
  if (opt && typeof opt === 'object') return opt.isCorrect || false;
  return false;
}

function findCorrectOption(answerOptions) {
  if (!Array.isArray(answerOptions)) return null;
  const correctOpt = answerOptions.find((opt) => getOptionIsCorrect(opt));
  return correctOpt
    ? { text: getOptionText(correctOpt), raw: correctOpt }
    : null;
}

function isShortResponseQuestion(question) {
  if (!question || typeof question !== 'object') return false;
  const responseType =
    typeof question.responseType === 'string'
      ? question.responseType.toLowerCase()
      : '';
  if (responseType === 'short') return true;
  if (
    responseType === 'constructed-response' ||
    responseType === 'constructed' ||
    responseType === 'free-response'
  ) {
    return true;
  }
  const questionType =
    typeof question.questionType === 'string'
      ? question.questionType.toLowerCase()
      : typeof question.type === 'string'
      ? question.type.toLowerCase()
      : '';
  if (questionType.includes('short') || questionType.includes('constructed')) {
    return true;
  }
  if (!Array.isArray(question.answerOptions)) {
    return true;
  }
  return false;
}

// Attach to window for Babel Standalone (no modules)
if (typeof window !== 'undefined') {
  window.TextUtils = Object.assign(window.TextUtils || {}, {
    ALLOWED_HTML_TAGS,
    ALLOWED_HTML_ATTR,
    normalizeLineBreaks,
    surroundOperatorWithSpaces,
    normalizePunctuationSpacing,
    escapeLatexControlCharacters,
    repairLatexCorruption,
    decodeHtmlEntities,
    neutralizeUnpairedDollarSigns,
    escapeCurrencyDollarsMathSafe,
    stripBackslashesOutsideMath,
    deglueCommonBigrams,
    addSpacesAroundInlineMath,
    repairSpacedTags,
    protectTables,
    stripLeakedMathPlaceholders,
    formatFractions,
    cleanRepeatedText,
    normalizeInlineTablesFront,
    sanitizeHtmlContent,
    preprocessRawContent,
    sanitizeCodeSegment,
    normalizeImagePath,
    resolveAssetUrl,
    getOptionText,
    getOptionIsCorrect,
    findCorrectOption,
    isShortResponseQuestion,
  });
}
