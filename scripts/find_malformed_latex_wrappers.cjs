#!/usr/bin/env node
/**
 * Detects question/answer/rationale/passage strings where `\(...\)` (or
 * `\[...\]` / `$...$`) wrappers are malformed — typically by containing
 * stretches of English prose, indicating a sanitizer mishap that wrapped
 * non-math text in math delimiters (or left an unclosed delimiter at end
 * of string).
 *
 * Heuristics for "looks like prose, not math":
 *   - Inner segment contains 3+ consecutive ASCII words separated by spaces
 *     where each word is purely alphabetic and length >= 2
 *   - OR inner segment ends with `?` `.` `!` (question-style punctuation)
 *   - OR inner segment contains common english stop-words like
 *     " is ", " are ", " the ", " and ", " or ", " of ", " to ", " what "
 *
 * Output: prints `file:line  field  excerpt` for each suspect.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'backend', 'data', 'quizzes');

const STOPWORD_RE =
  /\b(is|are|the|and|or|of|to|what|which|shifted|new|equation|find|solve|value|graph|line|when|where|how|why|than|that|this|these|those)\b/i;

function looksLikeProse(inner) {
  if (!inner) return false;
  const trimmed = inner.trim();
  if (!trimmed) return false;
  // Has a question / sentence terminator inside (very suspicious for math).
  if (/[?!]$/.test(trimmed) || /[.?!]\s+\w/.test(trimmed)) return true;
  // 3+ consecutive whitespace-separated alphabetic words.
  if (/\b[A-Za-z]{2,}\s+[A-Za-z]{2,}\s+[A-Za-z]{2,}\b/.test(trimmed))
    return true;
  // English stopwords surrounded by spaces.
  if (/\s/.test(trimmed) && STOPWORD_RE.test(trimmed)) return true;
  return false;
}

function scanString(s) {
  if (typeof s !== 'string') return [];
  const findings = [];
  // Match \(...\) — non-greedy, tolerate newlines.
  const reParen = /\\\(([\s\S]+?)\\\)/g;
  let m;
  while ((m = reParen.exec(s)) !== null) {
    if (looksLikeProse(m[1])) {
      findings.push({
        kind: 'paren',
        inner: m[1].slice(0, 120),
        full: m[0].slice(0, 200),
      });
    }
  }
  // Detect unbalanced \( with no closing \) — using a simple counter.
  const opens = (s.match(/\\\(/g) || []).length;
  const closes = (s.match(/\\\)/g) || []).length;
  if (opens !== closes) {
    findings.push({
      kind: 'unbalanced',
      inner: `opens=${opens} closes=${closes}`,
      full: s.slice(0, 200),
    });
  }
  return findings;
}

function walkValue(v, ctxPath, hits) {
  if (v == null) return;
  if (typeof v === 'string') {
    const f = scanString(v);
    for (const x of f) hits.push({ field: ctxPath, ...x });
    return;
  }
  if (Array.isArray(v)) {
    v.forEach((x, i) => walkValue(x, `${ctxPath}[${i}]`, hits));
    return;
  }
  if (typeof v === 'object') {
    for (const k of Object.keys(v))
      walkValue(v[k], ctxPath ? `${ctxPath}.${k}` : k, hits);
  }
}

function loadModule(p) {
  delete require.cache[require.resolve(p)];
  return require(p);
}

const subjects = ['math', 'rla', 'science', 'social-studies'];
const allHits = [];
for (const subj of subjects) {
  const dir = path.join(ROOT, subj);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  for (const file of files) {
    const fp = path.join(dir, file);
    let mod;
    try {
      mod = loadModule(fp);
    } catch (e) {
      continue;
    }
    const hits = [];
    walkValue(mod, '', hits);
    if (hits.length) {
      for (const h of hits) {
        allHits.push({ file: path.relative(process.cwd(), fp), ...h });
      }
    }
  }
}

if (!allHits.length) {
  console.log('No malformed LaTeX wrappers detected.');
  process.exit(0);
}

console.log(`Found ${allHits.length} suspect wrappers across the catalog:\n`);
for (const h of allHits) {
  console.log(`[${h.kind}] ${h.file}`);
  console.log(`  field: ${h.field}`);
  console.log(`  inner: ${h.inner}`);
  console.log(`  full : ${h.full}`);
  console.log('');
}
process.exit(1);
