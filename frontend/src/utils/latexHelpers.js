/**
 * LaTeX Helper Utilities
 * Extracted from LegacyRootApp for modular tool components
 */

// KaTeX render options
const KATEX_RENDER_OPTIONS = {
  throwOnError: false,
  strict: false,
  trust: false,
  displayMode: false,
};

/**
 * Render LaTeX to HTML using KaTeX
 * @param {string} latexInput - LaTeX string to render
 * @returns {string} HTML string
 */
export function renderLatexToHtml(latexInput) {
  if (typeof latexInput !== 'string') {
    return '';
  }
  if (typeof katex === 'undefined') {
    console.warn('KaTeX not loaded');
    return latexInput;
  }

  try {
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
  } catch (error) {
    console.warn('KaTeX render error:', error?.message || error);
  }

  return latexInput;
}

/**
 * Normalize LaTeX for KaTeX rendering
 * @param {string} latex - Raw LaTeX string
 * @returns {string} Normalized LaTeX
 */
function normalizeLatexForKaTeX(latex) {
  if (typeof latex !== 'string') {
    return '';
  }

  let working = latex;

  // Replace common text-mode constructs
  working = working.replace(/\\text\{([^}]+)\}/g, '\\mathrm{$1}');
  
  // Normalize spacing
  working = working.replace(/\s+/g, ' ').trim();

  return working;
}

/**
 * Apply safe math fixes to text content
 * @param {string} text - Text with potential LaTeX
 * @returns {string} Fixed text
 */
export function applySafeMathFix(text) {
  if (typeof text !== 'string') {
    return text;
  }

  let working = text;

  // Fix common LaTeX macro issues
  working = working.replace(/\\frac([^{])/g, '\\frac{$1}');
  working = working.replace(/\\sqrt([^{])/g, '\\sqrt{$1}');
  
  // Normalize underscored macros (e.g., \\bar_x -> \\bar{x})
  working = working.replace(/\\(bar|hat|tilde|vec|dot)_([a-zA-Z])/g, '\\$1{$2}');

  return working;
}

/**
 * Sanitize Unicode replacement characters and fix common encoding issues
 * @param {string} s - String with potential encoding issues
 * @returns {string} Sanitized string
 */
export function sanitizeUnicode(s) {
  if (typeof s !== 'string' || s.length === 0) return s;
  
  try {
    let t = s;
    
    // Chemical formulas and units
    t = t.replace(/H\uFFFD\uFFFDO/g, 'H₂O');
    t = t.replace(/g\/cm\uFFFD/g, 'g/cm³');
    t = t.replace(/cm\uFFFD/g, 'cm³');
    
    // Degree symbol
    t = t.replace(/\uFFFDC/g, '°C');
    t = t.replace(/\uFFFDF/g, '°F');
    
    // Common math superscripts
    t = t.replace(/([abc])\uFFFD/g, '$1²');
    t = t.replace(/x\uFFFD/g, 'x²');
    
    // Ranges (e.g., 35–22)
    t = t.replace(/(\d)\s?\uFFFD\s?(\d)/g, '$1–$2');
    
    // Not-equal patterns
    t = t.replace(/\uFFFD\uFFFD 0/g, '≠ 0');
    
    // Topic labels and ellipsis
    t = t.replace(/Topic A\uFFFDZ/g, 'Topic A–Z');
    t = t.replace(/More in this topic\uFFFD/g, 'More in this topic…');
    
    // Arrow in genetics
    t = t.replace(/pp \uFFFD/g, 'pp →');
    
    // Strip stray replacement characters
    t = t.replace(/\uFFFD\uFFFD️?/g, '');
    t = t.replace(/\uFFFD/g, '');
    
    return t;
  } catch (error) {
    console.warn('Unicode sanitization error:', error);
    return s;
  }
}

/**
 * Escape HTML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') {
    return '';
  }
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  
  return str.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Check if KaTeX is available
 * @returns {boolean}
 */
export function isKatexAvailable() {
  return typeof katex !== 'undefined' && typeof katex.renderToString === 'function';
}
