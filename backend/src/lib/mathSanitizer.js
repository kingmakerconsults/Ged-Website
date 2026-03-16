function normalizeMathToLatex(input) {
  if (!input) return input;

  let s = input;

  s = s.replace(
    /([A-Za-z0-9)\]\}])\^(\d+)(?![A-Za-z{])/g,
    (_m, base, exp) => `${base}^{${exp}}`
  );

  s = s.replace(
    /([A-Za-z0-9)\]\}])\^([A-Za-z])(?![A-Za-z{])/g,
    (_m, base, exp) => `${base}^{${exp}}`
  );

  s = s.replace(
    /(\S)\^\(([^)]+)\)/g,
    (_m, base, inner) => `${base}^{${inner}}`
  );

  s = s.replace(
    /(?<!\\\(|\\\[)(\\frac\{[^}]+\}\{[^}]+\}|[A-Za-z0-9)\]\}]+\^\{[^}]+\})(?!\\\)|\\\])/g,
    (m) => `\\(${m}\\)`
  );

  return s;
}

function normalizeMathToHTML(input) {
  if (!input) return input;
  let s = input;

  s = s.replace(
    /(\([^)]+\)|\[[^\]]+\]|[A-Za-z0-9]+)\^(\d+|[A-Za-z])/g,
    (_m, base, exp) => `${base}<sup>${exp}</sup>`
  );

  s = s.replace(
    /(\S)\^\(([^)]+)\)/g,
    (_m, base, inner) => `${base}<sup>${inner}</sup>`
  );

  return s;
}

function repairInlineMathDecimalFragments(input) {
  if (!input || typeof input !== 'string') return input;

  let s = input;

  s = s.replace(
    /\\\((\\frac\{[^{}]+\}\{[^{}]*\d)\}\\\)\.(\d+)/g,
    (_m, prefix, digits) => `\\(${prefix}.${digits}}\\)`
  );

  s = s.replace(
    /(\d+)\.\\\(([^]*?)\\\)/g,
    (_m, whole, inner) => `\\(${whole}.${inner.trim()}\\)`
  );

  s = s.replace(
    /\\\(([^]*?\d)\\\)\.(\d+)/g,
    (_m, inner, digits) => `\\(${inner.trim()}.${digits}\\)`
  );

  return s;
}

/**
 * Comprehensive KaTeX upgrade: converts plain-text math tokens to
 * KaTeX-ready delimited form. Designed for post-processing AI-generated
 * content that uses plain-text math per FRACTION_PLAIN_TEXT_RULE.
 *
 * Conversions:
 *  - sqrt(expr)      → \(\sqrt{expr}\)
 *  - standalone pi   → \(\pi\)
 *  - x^2             → \(x^{2}\)       (via normalizeMathToLatex)
 *  - \frac{a}{b}     → \(\frac{a}{b}\) (via normalizeMathToLatex)
 *  - 3/4 (numeric)   → \(\frac{3}{4}\)
 *  - a/b (single-letter) → \(\frac{a}{b}\)
 *  - >= / <=         → \(\geq\) / \(\leq\) in math-like contexts
 *
 * All conversions are idempotent (already-delimited math is preserved).
 */
function upgradeToKatex(input) {
  if (!input || typeof input !== 'string') return input;

  let s = input;

  // ── Step 0: Escape currency $ signs before any math processing ────
  // Matches $N, $N.NN, $N,NNN.NN patterns (US currency) and replaces the
  // leading $ with the HTML entity &#36; so the frontend parser will never
  // mistake two currency amounts for LaTeX delimiters.
  // Must run BEFORE normalizeMathToLatex which doesn't touch $ at all.
  s = s.replace(/\$(\d[\d,]*(?:\.\d{0,2})?)/g, '&#36;$1');

  // Start with the existing exponent/frac wrapping
  s = normalizeMathToLatex(s);
  s = repairInlineMathDecimalFragments(s);

  // Convert sqrt(...) to \(\sqrt{...}\) — handle simple balanced parens
  s = s.replace(
    /(?<![A-Za-z\\])sqrt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g,
    (_m, inner) => `\\(\\sqrt{${inner.trim()}}\\)`
  );

  // Convert standalone pi (word boundary) to \(\pi\) — only when not inside
  // an existing \(...\) block and not part of a larger word
  s = s.replace(/(?<![A-Za-z\\(])(?<!\\)\bpi\b(?![A-Za-z)])/g, '\\(\\pi\\)');

  // Convert >= and <= in math-like contexts, including decimal coefficients
  // such as 2.25m <= 20 or m <= 7.33.
  s = s.replace(
    /(?<![A-Za-z0-9.\\])([A-Za-z0-9.(){}\[\]]+(?:\s*[+\-*/]\s*[A-Za-z0-9.(){}\[\]]+)*)\s*(>=|<=)\s*([A-Za-z0-9.(){}\[\]]+(?:\s*[+\-*/]\s*[A-Za-z0-9.(){}\[\]]+)*)/g,
    (_m, left, op, right) =>
      `\\(${left} ${op === '>=' ? '\\geq' : '\\leq'} ${right}\\)`
  );

  // Convert numeric fractions a/b → \(\frac{a}{b}\) when not already delimited
  // Only convert when surrounded by non-alpha boundaries to avoid corrupting prose
  s = s.replace(
    /(?<![A-Za-z0-9.\\(])(\d+)\s*\/\s*(\d+)(?![A-Za-z0-9.])/g,
    (_m, num, den) => {
      // Don't convert dates that look like fractions (e.g., "2/3" is fine but "12/25" in date context)
      // For GED math, numeric fractions are overwhelmingly math
      return `\\(\\frac{${num}}{${den}}\\)`;
    }
  );

  // Convert single-letter fractions a/b → \(\frac{a}{b}\) at word boundaries
  s = s.replace(
    /(?<![A-Za-z0-9\\(])([A-Za-z])\s*\/\s*([A-Za-z])(?![A-Za-z0-9])/g,
    (_m, num, den) => `\\(\\frac{${num}}{${den}}\\)`
  );

  // Convert mixed fractions like n/d trailing a letter: 3/4x → \(\frac{3}{4}x\)
  s = s.replace(
    /(?<![A-Za-z0-9.\\(])(\d+)\s*\/\s*(\d+)([A-Za-z])/g,
    (_m, num, den, trail) => `\\(\\frac{${num}}{${den}}${trail}\\)`
  );

  // Clean up double-wrapped delimiters that may result from chained conversions
  // e.g., \(\(x^{2}\)\) → \(x^{2}\)
  s = s.replace(/\\\(\s*\\\(/g, '\\(');
  s = s.replace(/\\\)\s*\\\)/g, '\\)');

  return s;
}

/**
 * Apply upgradeToKatex to all text fields of a question object.
 * Operates on questionText, passage, answerOptions[].text,
 * answerOptions[].rationale, correctAnswer.
 */
function upgradeQuestionToKatex(item) {
  if (!item || typeof item !== 'object') return item;

  if (typeof item.questionText === 'string') {
    item.questionText = upgradeToKatex(item.questionText);
  }
  if (typeof item.passage === 'string') {
    item.passage = upgradeToKatex(item.passage);
  }
  if (typeof item.rationale === 'string') {
    item.rationale = upgradeToKatex(item.rationale);
  }
  if (typeof item.correctAnswer === 'string') {
    item.correctAnswer = upgradeToKatex(item.correctAnswer);
  }
  if (Array.isArray(item.answerOptions)) {
    item.answerOptions = item.answerOptions.map((opt) => {
      if (!opt || typeof opt !== 'object') return opt;
      const next = { ...opt };
      if (typeof next.text === 'string') {
        next.text = upgradeToKatex(next.text);
      }
      if (typeof next.rationale === 'string') {
        next.rationale = upgradeToKatex(next.rationale);
      }
      return next;
    });
  }
  return item;
}

module.exports = {
  normalizeMathToLatex,
  normalizeMathToHTML,
  repairInlineMathDecimalFragments,
  upgradeToKatex,
  upgradeQuestionToKatex,
};
