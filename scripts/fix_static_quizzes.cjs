#!/usr/bin/env node
/**
 * Fixes mechanical quality issues in backend/data/quizzes/{subject}/*.js by
 * patching string literals in-place using @babel/parser AST. Original file
 * formatting (whitespace, comments, key order) is preserved.
 *
 * Run: `node scripts/fix_static_quizzes.cjs [--dry-run] [--subject=math]`
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

const ROOT = path.resolve(__dirname, '..');
const QUIZ_ROOT = path.join(ROOT, 'backend', 'data', 'quizzes');
const ALL_SUBJECTS = ['math', 'rla', 'science', 'social-studies'];
const DRY_RUN = process.argv.includes('--dry-run');
const SUBJECT_ARG = process.argv.find((a) => a.startsWith('--subject='));
const SUBJECTS = SUBJECT_ARG ? [SUBJECT_ARG.split('=')[1]] : ALL_SUBJECTS;

const stats = {
  filesScanned: 0,
  filesChanged: 0,
  filesError: 0,
  fixesApplied: {},
};

function tally(name, by = 1) {
  stats.fixesApplied[name] = (stats.fixesApplied[name] || 0) + by;
}

const MOJIBAKE = [
  [/Â²/g, '²'],
  [/Â³/g, '³'],
  [/Â°/g, '°'],
  [/Â½/g, '½'],
  [/Â¼/g, '¼'],
  [/Â¾/g, '¾'],
  [/Ã·/g, '÷'],
  [/Ã—/g, '×'],
  [/â‰ˆ/g, '≈'],
  [/â‰¤/g, '≤'],
  [/â‰¥/g, '≥'],
  [/â‰ /g, '≠'],
  [/â€“/g, '–'],
  [/â€”/g, '—'],
  [/â€˜/g, '\u2018'],
  [/â€™/g, '\u2019'],
  [/â€œ/g, '\u201C'],
];

function fixMojibake(text) {
  let out = text;
  for (const [re, rep] of MOJIBAKE) {
    if (re.test(out)) {
      out = out.replace(re, rep);
      tally('mojibake');
    }
  }
  return out;
}

/**
 * Repair JS escape-sequence authoring bugs where authors wrote `\frac`,
 * `\beta`, `\v`-prefixed names etc. inside JS string literals without
 * escaping the backslash. Once parsed, these become literal control
 * characters (FF, BS, VT, etc.). We restore the missing `\\` so KaTeX gets
 * the intended LaTeX command.
 */
const ESCAPE_REPAIRS = [
  ['\f', '\\frac'],
  ['\b', '\\b'],
  ['\v', '\\v'],
];

function fixEscapeSequenceBugs(text) {
  if (typeof text !== 'string') return text;
  let out = text;
  // \f → \frac (most common: `\frac{...}{...}` written as `\frac` in source)
  if (out.includes('\f')) {
    out = out.replace(/\f(rac\{[^{}]+\}\{[^{}]+\})/g, (_m, rest) => {
      tally('repair-escape-frac');
      return '\\f' + rest;
    });
    // Lone form feeds left over (orphan or broken) → drop
    out = out.replace(/\f/g, () => {
      tally('strip-control-ff');
      return '';
    });
  }
  // Strip vertical tab and backspace silently
  if (out.includes('\v') || out.includes('\b')) {
    out = out.replace(/[\v\b]/g, () => {
      tally('strip-control-other');
      return '';
    });
  }
  return out;
}

function splitByMathSegments(text) {
  const segments = [];
  let buf = '';
  let i = 0;
  while (i < text.length) {
    if (text[i] === '\\' && (text[i + 1] === '(' || text[i + 1] === '[')) {
      const open = text[i + 1];
      const close = open === '(' ? ')' : ']';
      const closeIdx = text.indexOf('\\' + close, i + 2);
      if (closeIdx !== -1) {
        if (buf) {
          segments.push({ type: 'text', value: buf });
          buf = '';
        }
        segments.push({ type: 'math', raw: text.slice(i, closeIdx + 2) });
        i = closeIdx + 2;
        continue;
      }
    }
    buf += text[i];
    i += 1;
  }
  if (buf) segments.push({ type: 'text', value: buf });
  return segments;
}

/**
 * Convert `$...\)` author-error pairs to `\(...\)`, and `$math$` (non-currency)
 * pairs to `\(math\)`. Currency `$N`, `$N.NN` is preserved as-is.
 */
function fixDollarMathDelimiters(text) {
  if (typeof text !== 'string' || !text.includes('$')) return text;
  let out = '';
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\\' && '$()[]'.includes(text[i + 1])) {
      out += ch + text[i + 1];
      i += 2;
      continue;
    }
    if (ch !== '$') {
      out += ch;
      i += 1;
      continue;
    }
    const currencyMatch = text.slice(i).match(/^\$\d[\d,]*(?:\.\d{1,2})?/);
    const lookahead = text.slice(i, i + 80);
    const looksMathLike = currencyMatch
      ? /^\$\d[\d,]*(?:\.\d{1,2})?\s*[\+\-\*\/=^<>]/.test(lookahead) ||
        /^\$\d[\d,]*\s*[A-Za-z]/.test(lookahead)
      : false;
    const looksLikeCurrency = currencyMatch && !looksMathLike;
    let closeDollar = -1;
    for (let j = i + 1; j < text.length; j++) {
      if (
        text[j] === '\\' &&
        (text[j + 1] === '$' || '()[]'.includes(text[j + 1]))
      ) {
        j += 1;
        continue;
      }
      if (text[j] === '\n' && j - i > 200) break;
      if (text[j] === '$') {
        closeDollar = j;
        break;
      }
    }
    const closeParen = text.indexOf('\\)', i + 1);
    if (
      closeParen !== -1 &&
      closeParen - i < 240 &&
      (closeDollar === -1 || closeParen < closeDollar)
    ) {
      const inner = text.slice(i + 1, closeParen);
      if (
        /[+\-*\/=^<>]|\\[A-Za-z]+|\b[a-z]\b/i.test(inner) &&
        !/[\r\n]/.test(inner)
      ) {
        out += '\\(' + inner + '\\)';
        i = closeParen + 2;
        tally('dollar-paren-mismatch');
        continue;
      }
    }
    if (closeDollar !== -1) {
      const inner = text.slice(i + 1, closeDollar);
      if (
        inner.length > 0 &&
        inner.length < 200 &&
        !/[\r\n]/.test(inner) &&
        (/[+\-*\/=^<>{}]|\\[A-Za-z]+/.test(inner) ||
          /\b[a-z]\b/i.test(inner)) &&
        !looksLikeCurrency
      ) {
        out += '\\(' + inner + '\\)';
        i = closeDollar + 1;
        tally('dollar-math-pair');
        continue;
      }
    }
    out += ch;
    i += 1;
  }
  return out;
}

function fixOrphanLatexDelimiters(text) {
  if (typeof text !== 'string') return text;
  // Collapse doubled openers/closers: `\(\(` → `\(`, `\)\)` → `\)`
  let collapsed = text;
  if (/\\\(\s*\\\(/.test(collapsed)) {
    collapsed = collapsed.replace(/\\\(\s*\\\(/g, () => {
      tally('collapse-double-open');
      return '\\(';
    });
  }
  if (/\\\)\s*\\\)/.test(collapsed)) {
    collapsed = collapsed.replace(/\\\)\s*\\\)/g, () => {
      tally('collapse-double-close');
      return '\\)';
    });
  }
  let opens = [];
  let drops = [];
  for (let i = 0; i < collapsed.length; i++) {
    if (collapsed[i] === '\\' && collapsed[i + 1] === '(') {
      opens.push(i);
      i += 1;
      continue;
    }
    if (collapsed[i] === '\\' && collapsed[i + 1] === ')') {
      if (opens.length > 0) {
        opens.pop();
      } else {
        drops.push(i);
      }
      i += 1;
      continue;
    }
  }
  drops.push(...opens);
  if (drops.length === 0) return collapsed;
  drops.sort((a, b) => b - a);
  let out = collapsed;
  for (const idx of drops) {
    out = out.slice(0, idx) + out.slice(idx + 2);
    tally('orphan-paren');
  }
  return out;
}

function wrapStrayLatexCommands(text) {
  if (typeof text !== 'string') return text;
  if (
    !/\\(?:frac|sqrt|times|cdot|pi|theta|sum|int|approx|neq|leq|geq)/.test(text)
  ) {
    return text;
  }
  const segments = splitByMathSegments(text);
  let changed = false;
  for (const seg of segments) {
    if (seg.type !== 'text') continue;
    const cmdRe =
      /(\\(?:frac\{[^{}]+\}\{[^{}]+\}|sqrt\{[^{}]+\}|times|cdot|pi|theta|approx|neq|leq|geq))/g;
    seg.value = seg.value.replace(cmdRe, (m) => {
      changed = true;
      return `\\(${m}\\)`;
    });
  }
  if (changed) tally('wrap-stray-latex');
  return segments.map((s) => (s.type === 'text' ? s.value : s.raw)).join('');
}

function wrapPlainMath(text, subjectIsMath) {
  if (typeof text !== 'string' || !subjectIsMath) return text;
  const segments = splitByMathSegments(text);
  let changed = false;
  for (const seg of segments) {
    if (seg.type !== 'text') continue;
    let v = seg.value;
    v = v.replace(
      /(?<![\/\dA-Za-z\$])(\d{1,3})\s*\/\s*(\d{1,3})(?![\/\dA-Za-z])/g,
      (m, a, b) => {
        if (b.length === 4) return m;
        changed = true;
        return `\\(\\frac{${a}}{${b}}\\)`;
      }
    );
    v = v.replace(
      /(?<![\\{0-9A-Za-z])([A-Za-z])\s*\^\s*([A-Za-z0-9]{1,3})\b(?!\})/g,
      (m, base, exp) => {
        changed = true;
        return `\\(${base}^{${exp}}\\)`;
      }
    );
    seg.value = v;
  }
  if (changed) tally('wrap-plain-math');
  return segments.map((s) => (s.type === 'text' ? s.value : s.raw)).join('');
}

const TARGET_KEY_NAMES = new Set([
  'question',
  'questionText',
  'prompt',
  'stem',
  'passage',
  'rationale',
  'explanation',
  'correctAnswer',
  'text',
  'instruction',
  'instructions',
]);

function transformString(value, ctx) {
  let v = fixMojibake(value);
  v = fixEscapeSequenceBugs(v);
  v = fixDollarMathDelimiters(v);
  v = fixOrphanLatexDelimiters(v);
  v = wrapStrayLatexCommands(v);
  v = wrapPlainMath(v, ctx.subjectIsMath);
  return v;
}

function encodeString(newValue, originalRaw) {
  const quote = originalRaw[0];
  if (quote !== '"' && quote !== "'") {
    return JSON.stringify(newValue);
  }
  let out = quote;
  for (const ch of newValue) {
    if (ch === '\\') out += '\\\\';
    else if (ch === quote) out += '\\' + quote;
    else if (ch === '\n') out += '\\n';
    else if (ch === '\r') out += '\\r';
    else if (ch === '\t') out += '\\t';
    else out += ch;
  }
  out += quote;
  return out;
}

function processFile(filePath, subject) {
  stats.filesScanned += 1;
  const before = fs.readFileSync(filePath, 'utf8');
  let ast;
  try {
    ast = parser.parse(before, {
      sourceType: 'unambiguous',
      allowReturnOutsideFunction: true,
    });
  } catch (e) {
    stats.filesError += 1;
    console.warn(`PARSE ERROR ${path.relative(ROOT, filePath)}: ${e.message}`);
    return;
  }

  const ctx = { subjectIsMath: subject === 'math' };
  const edits = [];

  function walk(node, parentKeyName) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child, parentKeyName);
      return;
    }
    if (typeof node.type !== 'string') return;

    if (
      node.type === 'StringLiteral' &&
      parentKeyName &&
      TARGET_KEY_NAMES.has(parentKeyName)
    ) {
      const original = node.value;
      const transformed = transformString(original, ctx);
      if (transformed !== original) {
        const raw = before.slice(node.start, node.end);
        edits.push({
          start: node.start,
          end: node.end,
          replacement: encodeString(transformed, raw),
        });
      }
      return;
    }

    if (
      node.type === 'TemplateLiteral' &&
      parentKeyName &&
      TARGET_KEY_NAMES.has(parentKeyName)
    ) {
      if (
        Array.isArray(node.expressions) &&
        node.expressions.length === 0 &&
        node.quasis.length === 1
      ) {
        const original = node.quasis[0].value.cooked;
        const transformed = transformString(original, ctx);
        if (transformed !== original) {
          edits.push({
            start: node.start,
            end: node.end,
            replacement:
              '`' + transformed.replace(/[\\`$]/g, (m) => '\\' + m) + '`',
          });
        }
      }
      return;
    }

    if (node.type === 'ObjectProperty' || node.type === 'Property') {
      const keyName = (node.key && (node.key.name || node.key.value)) || null;
      walk(node.value, keyName);
      return;
    }

    for (const k of Object.keys(node)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'extra')
        continue;
      walk(node[k], parentKeyName);
    }
  }
  walk(ast, null);

  if (edits.length === 0) return;
  stats.filesChanged += 1;
  if (DRY_RUN) return;

  edits.sort((a, b) => b.start - a.start);
  let out = before;
  for (const e of edits) {
    out = out.slice(0, e.start) + e.replacement + out.slice(e.end);
  }
  fs.writeFileSync(filePath, out, 'utf8');
}

function run() {
  for (const subject of SUBJECTS) {
    const dir = path.join(QUIZ_ROOT, subject);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
    for (const f of files) {
      processFile(path.join(dir, f), subject);
    }
  }
  console.log(
    JSON.stringify({ ...stats, mode: DRY_RUN ? 'dry-run' : 'apply' }, null, 2)
  );
}

run();
