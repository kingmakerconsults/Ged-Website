/**
 * Sanitizer pipeline — single entry point.
 *
 * The sanitizer system is organized into 4 layers, applied in order:
 *
 *   1. Prose normalization        — `normalizeProse` (whitespace/newlines)
 *   2. Currency protection        — `protectCurrency` / `restoreCurrency`
 *                                    (private to mathQuestionBankSanitizer)
 *   3. LaTeX normalization        — `normalizeLatex` (fraction repair, mojibake,
 *                                    `*`/`_` escape, HTML strip)
 *   4. KaTeX upgrade              — `upgradeToKatex` (sqrt/pi/fractions/
 *                                    inequalities/exponents → delimited LaTeX,
 *                                    currency `$` → `&#36;`)
 *
 * Two public pipelines compose those layers:
 *
 *   • Catalog pipeline (`sanitizeQuestionField`, `sanitizeQuestion`,
 *     `sanitizeQuestionList`, `sanitizeCatalog`) — runs ALL four layers and is
 *     applied to the static Math question catalog at load time. Field-aware:
 *     image paths and other non-prose keys are skipped.
 *
 *   • Exam pipeline (`sanitizeExamObject`, `sanitizeExamField`) — also runs
 *     the full catalog pipeline in `latex` mode (the two pipelines are
 *     UNIFIED as of the Phase 4 refactor; see /memories/session/plan.md).
 *     `html` mode swaps the final KaTeX upgrade for `normalizeMathToHTML`.
 *
 * Hard contracts:
 *   - Currency `$N.NN` → `&#36;N.NN` (catalog only). The frontend MathText
 *     component decodes `&#36;` back to `$` before display.
 *   - `\(...\)` and `\[...\]` inline-math delimiters are NEVER stripped by any
 *     layer. Stripping them historically lost LaTeX commands like `\times`,
 *     `\leq`, `\geq` because downstream renderers only re-wrap a small set of
 *     patterns. See `normalizeLatex.js` header for details.
 *   - All public functions are idempotent: `f(f(x))` === `f(x)`.
 *
 * New code should import from this module rather than the underlying files.
 */

const {
  sanitizeMathCatalog,
  sanitizeMathContent,
  sanitizeMathQuestion,
  sanitizeMathQuestionList,
  sanitizeMathQuiz,
  sanitizeMathSubjectCatalog,
  sanitizeSubjectQuestion,
  sanitizeMathText,
} = require('../mathQuestionBankSanitizer');

const {
  sanitizeField,
  sanitizeExamObject,
} = require('../sanitizeExamText');

const {
  normalizeMathToLatex,
  normalizeMathToHTML,
  upgradeToKatex,
  upgradeQuestionToKatex,
  repairInlineMathDecimalFragments,
} = require('../mathSanitizer');

const { normalizeLatex } = require('../normalizeLatex');
const { normalizeProse } = require('../normalizeProse');

module.exports = {
  // ── Catalog pipeline (preferred for static question banks) ──────
  sanitizeQuestionField: sanitizeMathText,
  sanitizeQuestion: sanitizeMathQuestion,
  sanitizeQuestionList: sanitizeMathQuestionList,
  sanitizeQuestionBySubject: sanitizeSubjectQuestion,
  sanitizeQuiz: sanitizeMathQuiz,
  sanitizeSubjectCatalog: sanitizeMathSubjectCatalog,
  sanitizeCatalog: sanitizeMathCatalog,
  sanitizeContent: sanitizeMathContent,

  // ── Exam pipeline (no upgradeToKatex; documents divergence) ──────
  sanitizeExamField: sanitizeField,
  sanitizeExamObject,

  // ── Layer-level building blocks (advanced use) ──────────────────
  normalizeProse,
  normalizeLatex,
  normalizeMathToLatex,
  normalizeMathToHTML,
  upgradeToKatex,
  upgradeQuestionToKatex,
  repairInlineMathDecimalFragments,

  // ── Legacy aliases (back-compat for existing call sites) ────────
  sanitizeMathText,
  sanitizeMathQuestion,
  sanitizeMathQuestionList,
  sanitizeMathQuiz,
  sanitizeMathSubjectCatalog,
  sanitizeMathCatalog,
  sanitizeMathContent,
  sanitizeSubjectQuestion,
};
