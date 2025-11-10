#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const QUIZ_DIR = path.join(ROOT, 'public', 'quizzes');
const OUT_DIR = path.join(QUIZ_DIR, 'sanitized');

const INPUT_FILES = [
  'math.quizzes.part1.json',
  'math.quizzes.part2.json',
];

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

function splitByDollar(text) {
  // Split into [segment, $, segment, $, segment, ...]; odd indexes are math delimiters
  // Instead, return segments array with { math: boolean, text }
  const parts = [];
  let curr = '';
  let inMath = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '$') {
      parts.push({ math: inMath, text: curr });
      curr = '';
      inMath = !inMath;
      continue;
    }
    curr += ch;
  }
  parts.push({ math: inMath, text: curr });
  return parts;
}

function sanitizeInsideMath(mathStr) {
  let out = mathStr;
  // Convert plain a/b to \\frac{a}{b} when safe (avoid already-escaped \\frac)
  // Use context group to avoid decimals: require preceding char is not digit or '.', and following char not digit or '.'
  out = out.replace(/(^|[^0-9\.])(-?\d+)\s*\/\s*(\d+)(?![0-9\.])/g, (m, pre, a, b) => `${pre}\\frac{${a}}{${b}}`);

  // Normalize negative fraction forms like ($-\frac{1}{2}$)x -> $-\frac{1}{2}$x
  out = out.replace(/\(\$-\\frac\{(\d+)\}\{(\d+)\}\$\)x/g, (m, num, den) => `$-\\frac{${num}}{${den}}$x`);
  out = out.replace(/\(\$-\\frac\{(\d+)\}\{(\d+)\}\$\)/g, (m, num, den) => `$-\\frac{${num}}{${den}}$`);

  return out;

  // Replace literal ' div ' or 'div ' between tokens with \\div
  out = out.replace(/\bdiv\b/g, '\\div');

  return out;
}

function sanitizeOutsideMath(text) {
  let out = text;

  out = out.replace(/\b(\d+)\s+(\d+)\s*\/\s*(\d+)\b/g, (m, whole, num, den) => '$' + `${whole}\\tfrac{${num}}{${den}}` + '$');

  // Standalone simple fractions '3/4' -> '$\\frac{3}{4}$' (avoid decimals using context group)
  out = out.replace(/(^|[^0-9\.])(\d+)\s*\/\s*(\d+)(?![0-9\.])/g, (m, pre, a, b) => pre + '$' + `\\frac{${a}}{${b}}` + '$');

  // Ensure both sides of simple addition/subtraction fractions convert (second may have been skipped if directly adjacent to punctuation)
  out = out.replace(/\$\\frac\{(\d+)\}\{(\d+)\}\$\s*([+\-])\s*(\d+)\/(\d+)/g, (m, n1, d1, op, n2, d2) => `$\\frac{${n1}}{${d1}}$ ${op} $\\frac{${n2}}{${d2}}$`);

  // Fix pattern: 15.$\frac{6}{3}$ -> 15.6 / 3 (do not convert decimal split)
  out = out.replace(/(\d+)\.\$\\frac\{(\d)\}\{(\d)\}\$/g, (m, whole, num, den) => `${whole}.${num}/${den}`);

  // Repair malformed sequence: $1/2 - $\frac{1}{3}$$? -> $1/2 - \frac{1}{3}$?
  out = out.replace(/\$([01])\/([23])\s*([+\-])\s*\$\\frac\{(\d+)\}\{(\d+)\}\$\$\?/g,
    (m, a1, b1, op, a2, b2) => `$${a1}/${b1} ${op} \\frac{${a2}}{${b2}}$?`);

  // Remove parentheses wrapping negative fraction in math: y = (-$-?\frac{a}{b}$)x -> y = $-\frac{a}{b}$x
  out = out.replace(/\(\$-\\frac\{(\d+)\}\{(\d+)\}\$\)/g, (m, a, b) => `$-\\frac{${a}}{${b}}$`);
  out = out.replace(/\(-\$\\frac\{(\d+)\}\{(\d+)\}\$\)/g, (m, a, b) => `$-\\frac{${a}}{${b}}$`);

  return out;

  return out;
}

function sanitizeText(input) {
  if (!input || typeof input !== 'string') return input;

  // Shield currency amounts like $35 or $0.25 so $ is not treated as math delimiter
  const C_OPEN = '\u00A7CUR\u00A7';
  const C_CLOSE = '\u00A7/\u00A7';
  const shielded = input.replace(/\$(\d+(?:\.\d+)?)/g, (m, amt) => `${C_OPEN}${amt}${C_CLOSE}`);

  const segments = splitByDollar(shielded);
  let changed = false;
  const rebuilt = segments.map(seg => {
    if (seg.math) {
      const newText = sanitizeInsideMath(seg.text);
      if (newText !== seg.text) changed = true;
      return `$${newText}$`;
    } else {
      const newText = sanitizeOutsideMath(seg.text);
      if (newText !== seg.text) changed = true;
      return newText;
    }
  }).join('');

  // Fix-up: "(-$\frac{a}{b}$)" -> "($-\frac{a}{b}$)"
  let fixed = rebuilt;

  // Unshield currency
  fixed = fixed.replace(new RegExp(C_OPEN + '(\\d+(?:\\.\\d+)?)' + C_CLOSE, 'g'), (m, amt) => `$${amt}`);

  return { text: fixed, changed };
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function* iterateQuestionNodes(content) {
  // Yield { node, path, key } for text-bearing fields we want to sanitize
  // Supports various shapes seen in dataset
  const queue = [{ node: content, path: [] }];
  while (queue.length) {
    const { node, path } = queue.shift();
    if (node && typeof node === 'object') {
      if (Array.isArray(node)) {
        node.forEach((child, idx) => queue.push({ node: child, path: path.concat([`[${idx}]`]) }));
      } else {
        for (const [k, v] of Object.entries(node)) {
          const p = path.concat([k]);
          // Candidate text fields
          const isTextField = (
            k === 'question' ||
            k === 'questionText' ||
            k === 'title' ||
            k === 'text' ||
            k === 'correctAnswer' ||
            k === 'passage'
          );
          if (isTextField && typeof v === 'string') {
            yield { node, key: k, path: p.join('.') };
          } else if (typeof v === 'object' && v !== null) {
            queue.push({ node: v, path: p });
          }
        }
      }
    }
  }
}

async function sanitizeFile(inPath, outPath, report) {
  const raw = await fs.readFile(inPath, 'utf8');
  const json = JSON.parse(raw);
  const original = clone(json);

  let fileChanges = 0;
  const changes = [];

  for (const item of iterateQuestionNodes(json)) {
    const before = item.node[item.key];
    const { text: after, changed } = sanitizeText(before);
    if (changed && before !== after) {
      item.node[item.key] = after;
      fileChanges++;
      changes.push({ path: item.path, before, after });
    }
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(json, null, 2), 'utf8');

  report.files.push({
    input: inPath,
    output: outPath,
    changesCount: fileChanges,
    changes,
  });
}

async function main() {
  const stamp = nowStamp();
  const report = { startedAt: new Date().toISOString(), files: [] };

  for (const fname of INPUT_FILES) {
    const inPath = path.join(QUIZ_DIR, fname);
    const outPath = path.join(OUT_DIR, fname.replace(/\.json$/, `.sanitized.json`));
    await sanitizeFile(inPath, outPath, report);
  }

  report.finishedAt = new Date().toISOString();

  const reportsDir = path.join(ROOT, 'reports');
  await fs.mkdir(reportsDir, { recursive: true });
  const jsonReportPath = path.join(reportsDir, `math_katex_sanitation_${stamp}.json`);
  const mdReportPath = path.join(reportsDir, `math_katex_sanitation_${stamp}.md`);

  await fs.writeFile(jsonReportPath, JSON.stringify(report, null, 2), 'utf8');

  const mdParts = [];
  mdParts.push(`# Math KaTeX Sanitation Report (${stamp})`);
  for (const f of report.files) {
    mdParts.push(`\n## ${path.basename(f.input)} -> ${path.basename(f.output)} `);
    mdParts.push(`- Changes: ${f.changesCount}`);
    const sample = f.changes.slice(0, 50); // cap to keep file reasonable
    for (const ch of sample) {
      mdParts.push(`\n- Path: \`${ch.path}\`\n  - Before: ${ch.before.replace(/\n/g, ' ')}\n  - After: ${ch.after.replace(/\n/g, ' ')}`);
    }
    if (f.changes.length > sample.length) {
      mdParts.push(`\n...and ${f.changes.length - sample.length} more changes.`);
    }
  }
  await fs.writeFile(mdReportPath, mdParts.join('\n'), 'utf8');

  console.log('Sanitation complete.');
  console.log('Report JSON:', path.relative(ROOT, jsonReportPath));
  console.log('Report MD:', path.relative(ROOT, mdReportPath));
  console.log('Outputs in:', path.relative(ROOT, OUT_DIR));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
