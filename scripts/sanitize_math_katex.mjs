#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const QUIZ_DIR = path.join(ROOT, 'public', 'quizzes');
const OUT_DIR = path.join(QUIZ_DIR, 'sanitized');

const INPUT_FILES = ['math.quizzes.part1.json', 'math.quizzes.part2.json'];

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(
    d.getHours()
  )}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
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
  // Fractions: plain a/b -> \frac{a}{b} (avoid decimals)
  out = out.replace(
    /(^|[^0-9\.])(-?\d+)\s*\/\s*(\d+)(?![0-9\.])/g,
    (m, pre, a, b) => `${pre}\\frac{${a}}{${b}}`
  );

  // sqrt( ... ) -> \sqrt{...}
  let prev;
  do {
    prev = out;
    out = out.replace(
      /sqrt\s*\(\s*([^()]+?)\s*\)/g,
      (m, inner) => `\\sqrt{${inner}}`
    );
  } while (out !== prev);

  // Exponents: ensure braces for numeric or parenthesized exponents
  out = out.replace(/\^\s*(-?\d+)/g, (m, exp) => `^{${exp}}`);
  out = out.replace(/\^\s*\(([^)]+)\)/g, (m, inner) => `^{${inner}}`);

  // Scientific notation inside math: a * 10^n or a x 10^n -> a \times 10^{n}
  out = out.replace(
    /(\d+(?:\.\d+)?)\s*[x\*]\s*10\s*\^\s*(-?\d+)/g,
    (m, a, e) => `${a} \\times 10^{${e}}`
  );

  // Plus/minus and pi normalization
  out = out.replace(/\+\/-/g, '\\pm');
  out = out.replace(/\bpi\b/g, '\\pi');

  // Normalize negative fraction wrapper patterns
  out = out.replace(
    /\(\$-\\frac\{(\d+)\}\{(\d+)\}\$\)x/g,
    (m, num, den) => `$-\\frac{${num}}{${den}}$x`
  );
  out = out.replace(
    /\(\$-\\frac\{(\d+)\}\{(\d+)\}\$\)/g,
    (m, num, den) => `$-\\frac{${num}}{${den}}$`
  );

  return out;
}

function sanitizeOutsideMath(text) {
  let out = text;

  // Mixed numbers like 2 3/5 -> $2\tfrac{3}{5}$
  out = out.replace(
    /\b(\d+)\s+(\d+)\s*\/\s*(\d+)\b/g,
    (m, whole, num, den) => '$' + `${whole}\\tfrac{${num}}{${den}}` + '$'
  );

  // Simple fractions a/b -> $\frac{a}{b}$
  out = out.replace(
    /(^|[^0-9\.])(\d+)\s*\/\s*(\d+)(?![0-9\.])/g,
    (m, pre, a, b) => pre + '$' + `\\frac{${a}}{${b}}` + '$'
  );

  // Ensure both sides convert in a/b + c/d
  out = out.replace(
    /\$\\frac\{(\d+)\}\{(\d+)\}\$\s*([+\-])\s*(\d+)\/(\d+)/g,
    (m, n1, d1, op, n2, d2) =>
      `$\\frac{${n1}}{${d1}}$ ${op} $\\frac{${n2}}{${d2}}$`
  );

  // Cleanup negative fraction parentheses
  out = out.replace(
    /\(\$-\\frac\{(\d+)\}\{(\d+)\}\$\)/g,
    (m, a, b) => `$-\\frac{${a}}{${b}}$`
  );
  out = out.replace(
    /\(-\$\\frac\{(\d+)\}\{(\d+)\}\$\)/g,
    (m, a, b) => `$-\\frac{${a}}{${b}}$`
  );

  // sqrt(...) -> $\sqrt{...}$
  out = out.replace(
    /sqrt\s*\(\s*([^()]+?)\s*\)/g,
    (m, inner) => `$\\sqrt{${inner}}$`
  );

  // Exponents outside: base^exp -> $base^{exp}$ and base^(expr) -> $base^{expr}$
  out = out.replace(
    /\b([A-Za-z]|\d+)\s*\^\s*(-?\d+)\b/g,
    (m, base, exp) => `$${base}^{${exp}}$`
  );
  out = out.replace(
    /\b([A-Za-z]|\d+)\s*\^\s*\(([^)]+)\)/g,
    (m, base, inner) => `$${base}^{${inner}}$`
  );

  // Scientific notation outside: a * 10^n or a x 10^n -> $a \\times 10^{n}$
  out = out.replace(
    /(\d+(?:\.\d+)?)\s*[x\*]\s*10\s*\^\s*(-?\d+)/g,
    (m, a, e) => `$${a} \\times 10^{${e}}$`
  );

  // +/- outside -> $\pm$
  out = out.replace(/\+\/-/g, '$\\pm$');

  // Quadratic formula common pattern -> $x = \frac{-b \pm \sqrt{b^{2} - 4ac}}{2a}$
  out = out.replace(
    /x\s*=\s*\(-b\s*\+\/\-\s*sqrt\(b\^2\s*-\s*4ac\)\)\s*\/\s*2a/g,
    () => `$x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}$`
  );

  return out;
}

function sanitizeText(input) {
  if (!input || typeof input !== 'string') return input;

  // Shield currency amounts like $35 or $0.25 so $ is not treated as math delimiter
  const C_OPEN = '\u00A7CUR\u00A7';
  const C_CLOSE = '\u00A7/\u00A7';
  const shielded = input.replace(
    /\$(\d+(?:\.\d+)?)/g,
    (m, amt) => `${C_OPEN}${amt}${C_CLOSE}`
  );

  const segments = splitByDollar(shielded);
  let changed = false;
  const rebuilt = segments
    .map((seg) => {
      if (seg.math) {
        const newText = sanitizeInsideMath(seg.text);
        if (newText !== seg.text) changed = true;
        return `$${newText}$`;
      } else {
        const newText = sanitizeOutsideMath(seg.text);
        if (newText !== seg.text) changed = true;
        return newText;
      }
    })
    .join('');

  // Fix-up: "(-$\frac{a}{b}$)" -> "($-\frac{a}{b}$)"
  let fixed = rebuilt;

  // Unshield currency
  fixed = fixed.replace(
    new RegExp(C_OPEN + '(\\d+(?:\\.\\d+)?)' + C_CLOSE, 'g'),
    (m, amt) => `$${amt}`
  );

  // Second pass over newly created math segments for sqrt/exponent normalization
  const segs2 = splitByDollar(fixed);
  let changed2 = false;
  const rebuilt2 = segs2
    .map((seg) => {
      if (seg.math) {
        const upd = sanitizeInsideMath(seg.text);
        if (upd !== seg.text) changed2 = true;
        return `$${upd}$`;
      }
      return seg.text;
    })
    .join('');

  return { text: rebuilt2, changed: changed || changed2 };
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
        node.forEach((child, idx) =>
          queue.push({ node: child, path: path.concat([`[${idx}]`]) })
        );
      } else {
        for (const [k, v] of Object.entries(node)) {
          const p = path.concat([k]);
          // Candidate text fields
          const isTextField =
            k === 'question' ||
            k === 'questionText' ||
            k === 'title' ||
            k === 'text' ||
            k === 'correctAnswer' ||
            k === 'passage';
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
    const outPath = path.join(
      OUT_DIR,
      fname.replace(/\.json$/, `.sanitized.json`)
    );
    await sanitizeFile(inPath, outPath, report);
  }

  report.finishedAt = new Date().toISOString();

  const reportsDir = path.join(ROOT, 'reports');
  await fs.mkdir(reportsDir, { recursive: true });
  const jsonReportPath = path.join(
    reportsDir,
    `math_katex_sanitation_${stamp}.json`
  );
  const mdReportPath = path.join(
    reportsDir,
    `math_katex_sanitation_${stamp}.md`
  );

  await fs.writeFile(jsonReportPath, JSON.stringify(report, null, 2), 'utf8');

  const mdParts = [];
  mdParts.push(`# Math KaTeX Sanitation Report (${stamp})`);
  for (const f of report.files) {
    mdParts.push(
      `\n## ${path.basename(f.input)} -> ${path.basename(f.output)} `
    );
    mdParts.push(`- Changes: ${f.changesCount}`);
    const sample = f.changes.slice(0, 50); // cap to keep file reasonable
    for (const ch of sample) {
      mdParts.push(
        `\n- Path: \`${ch.path}\`\n  - Before: ${ch.before.replace(
          /\n/g,
          ' '
        )}\n  - After: ${ch.after.replace(/\n/g, ' ')}`
      );
    }
    if (f.changes.length > sample.length) {
      mdParts.push(
        `\n...and ${f.changes.length - sample.length} more changes.`
      );
    }
  }
  await fs.writeFile(mdReportPath, mdParts.join('\n'), 'utf8');

  console.log('Sanitation complete.');
  console.log('Report JSON:', path.relative(ROOT, jsonReportPath));
  console.log('Report MD:', path.relative(ROOT, mdReportPath));
  console.log('Outputs in:', path.relative(ROOT, OUT_DIR));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
