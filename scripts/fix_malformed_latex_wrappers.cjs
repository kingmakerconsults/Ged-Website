#!/usr/bin/env node
/**
 * Fixes malformed `\(...\)` math wrappers that the detector flags.
 *
 * Strategy (safe & idempotent):
 *   1. Find each `\(INNER\)` where INNER looks like prose
 *      (uses the same heuristic as find_malformed_latex_wrappers.cjs).
 *   2. Strip the outer wrapper, leaving INNER as plain text.
 *   3. Inside the stripped INNER, repair common mojibake:
 *        - bare ` imes` -> ` \\times `
 *        - bare ` rac{` -> ` \\frac{`
 *   4. If file changed, write it back.
 *
 * This does NOT attempt to re-wrap the actual math substring (e.g.
 * `y = x^2`) — that requires per-case knowledge. Stripping is good
 * enough: the text becomes readable and KaTeX no longer tries to
 * render a paragraph as math.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'backend', 'data', 'quizzes');

const STOPWORD_RE =
  /\b(is|are|the|and|or|of|to|what|which|shifted|new|equation|find|solve|value|graph|line|when|where|how|why|than|that|this|these|those|cups|days|year|years|cost|paid|tip|left|over|with|tax|sugar|muffins|increase|percent|percentage|salary|company)\b/i;

function looksLikeProse(inner) {
  if (!inner) return false;
  const trimmed = inner.trim();
  if (!trimmed) return false;
  if (/[?!]$/.test(trimmed) || /[.?!]\s+\w/.test(trimmed)) return true;
  if (/\b[A-Za-z]{2,}\s+[A-Za-z]{2,}\s+[A-Za-z]{2,}\b/.test(trimmed))
    return true;
  if (/\s/.test(trimmed) && STOPWORD_RE.test(trimmed)) return true;
  // HTML inside a math wrapper is also wrong.
  if (/<\/?[a-z]+[^>]*>/i.test(trimmed)) return true;
  return false;
}

function repairInner(inner) {
  let s = inner;
  // Repair mojibake: ` imes` (lost \\times backslash) and ` rac{`.
  s = s.replace(/(^|[^A-Za-z\\])imes\b/g, '$1\\times');
  s = s.replace(/(^|[^A-Za-z\\])rac\{/g, '$1\\frac{');
  // Stray inner `\(` left over from cascading edits.
  s = s.replace(/\\\(\s*/g, '');
  s = s.replace(/\s*\\\)/g, '');
  // Collapse multiple spaces.
  s = s.replace(/[ \t]{2,}/g, ' ');
  return s;
}

function stripMalformedWrappers(s) {
  if (typeof s !== 'string') return { value: s, changed: false };
  let out = s;
  let changed = false;
  let prev;
  // Iterate until no more changes (some strings have multiple wrappers).
  do {
    prev = out;
    out = out.replace(/\\\(([\s\S]+?)\\\)/g, (full, inner) => {
      if (looksLikeProse(inner)) {
        changed = true;
        return repairInner(inner);
      }
      return full;
    });
  } while (out !== prev);
  return { value: out, changed };
}

function fixFile(fp) {
  const src = fs.readFileSync(fp, 'utf8');
  // Operate on the source text directly. Since these are .js modules with
  // single-quoted strings, modifying string literals via regex is safer
  // than parsing.  We match: '...content...' (single-quoted) or
  // "..." (double-quoted) and run the wrapper-strip on the literal body.
  let changed = false;
  const out = src.replace(/(['"])((?:\\.|(?!\1).)*?)\1/g, (m, quote, body) => {
    const r = stripMalformedWrappers(body);
    if (!r.changed) return m;
    changed = true;
    return quote + r.value + quote;
  });
  if (!changed) return false;
  fs.writeFileSync(fp, out, 'utf8');
  return true;
}

const subjects = ['math', 'rla', 'science', 'social-studies'];
let fixedCount = 0;
for (const subj of subjects) {
  const dir = path.join(ROOT, subj);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  for (const file of files) {
    const fp = path.join(dir, file);
    try {
      if (fixFile(fp)) {
        fixedCount += 1;
        console.log(`fixed: ${path.relative(process.cwd(), fp)}`);
      }
    } catch (e) {
      console.warn(`skip ${file}: ${e.message}`);
    }
  }
}
console.log(`\nFixed ${fixedCount} file(s).`);
