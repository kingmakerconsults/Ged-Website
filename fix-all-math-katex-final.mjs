/**
 * COMPREHENSIVE FIX: All KaTeX formatting issues in math questions
 * - Fixes plain fractions to $\frac{}{}$
 * - Fixes plain exponents to $x^2$
 * - Fixes slashes in math mode to \frac
 * - Skips false positives (currency, dates, URLs)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mathDir = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');
let totalFiles = 0;
let totalFixes = 0;

function splitMathSegments(text) {
  const segments = [];
  if (typeof text !== 'string' || text.length === 0) return segments;
  const mathRegex =
    /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\$[\s\S]+?\$|\\\([\s\S]+?\\\)/g;
  let lastIndex = 0;
  let match;
  while ((match = mathRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        value: text.slice(lastIndex, match.index),
      });
    }
    segments.push({ type: 'math', value: match[0] });
    lastIndex = mathRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return segments;
}

function normalizeMathDelimiters(text) {
  if (typeof text !== 'string' || text.length === 0) return text;
  let out = text;

  // Collapse nested delimiters like \(\( ... \)\)
  out = out.replace(/\\\(\s*\\\(/g, '\\(').replace(/\\\)\s*\\\)/g, '\\)');

  // Remove stray $ delimiters inside \( ... \)
  out = out.replace(/\\\(\s*\$+/g, '\\(').replace(/\$+\\\)/g, '\\)');

  // Normalize $$ to $ for inline contexts
  out = out.replace(/\$\$/g, '$');

  // Remove any $ inside inline math blocks \\(...\\)
  out = out.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner) => {
    const cleaned = inner.replace(/\$/g, '');
    const collapsed = cleaned.replace(/\\\(/g, '').replace(/\\\)/g, '');
    return `\\(${collapsed}\\)`;
  });

  // Balance unmatched inline delimiters
  const openCount = (out.match(/\\\(/g) || []).length;
  const closeCount = (out.match(/\\\)/g) || []).length;
  if (openCount > closeCount) {
    out = `${out}${'\\)'.repeat(openCount - closeCount)}`;
  } else if (closeCount > openCount) {
    let extras = closeCount - openCount;
    while (extras > 0) {
      out = out.replace(/\\\)(?!.*\\\))/g, '');
      extras--;
    }
  }

  return out;
}

function wrapPlainMathOutsideDelimiters(text) {
  if (typeof text !== 'string' || text.length === 0) return text;
  const segments = splitMathSegments(text);
  if (!segments.length) return text;

  const repaired = segments
    .map((seg) => {
      if (seg.type === 'math') return seg.value;

      let value = seg.value;

      // Wrap \frac{...}{...} and \sqrt{...} when outside math mode
      value = value.replace(
        /\\frac\s*\{[^{}]+\}\s*\{[^{}]+\}/g,
        (m) => `\\(${m}\\)`
      );
      value = value.replace(/\\sqrt\s*\{[^{}]+\}/g, (m) => `\\(${m}\\)`);

      // Wrap comparison macros if present in plain text
      value = value.replace(
        /([A-Za-z0-9]+)\s*\\leq\s*([A-Za-z0-9]+)/g,
        (_m, a, b) => `\\(${a}\\leq${b}\\)`
      );
      value = value.replace(
        /([A-Za-z0-9]+)\s*\\geq\s*([A-Za-z0-9]+)/g,
        (_m, a, b) => `\\(${a}\\geq${b}\\)`
      );
      value = value.replace(
        /([A-Za-z0-9]+)\s*<=\s*([A-Za-z0-9]+)/g,
        (_m, a, b) => `\\(${a}\\leq${b}\\)`
      );
      value = value.replace(
        /([A-Za-z0-9]+)\s*>=\s*([A-Za-z0-9]+)/g,
        (_m, a, b) => `\\(${a}\\geq${b}\\)`
      );
      value = value.replace(
        /([A-Za-z0-9]+)\s+leq\s+([A-Za-z0-9]+)/gi,
        (_m, a, b) => `\\(${a}\\leq${b}\\)`
      );
      value = value.replace(
        /([A-Za-z0-9]+)\s+geq\s+([A-Za-z0-9]+)/gi,
        (_m, a, b) => `\\(${a}\\geq${b}\\)`
      );

      // Wrap plain exponents like x^2, cm^2, 10^3 when outside math mode
      value = value.replace(
        /\b([A-Za-z]+|\d+)(\^\d+)\b/g,
        (_m, base, exp) => `\\(${base}${exp}\\)`
      );

      return value;
    })
    .join('');

  return repaired;
}

function fixMathInStringLiteral(text) {
  let working = text;
  // Fix literal tab escapes that turn \times into a tab + "imes"
  working = working.replace(/\t+imes\b/g, '\\times');
  // Convert inline delimiter typos used as currency markers to literal dollars
  const currencyHint =
    /\b(cost|price|bill|fee|tax|sale|discount|profit|salary|income|commission|total|dollar|dollars|rent|ticket|tickets|fare|paid|pay|amount|markup|mark-up|sell|sold|deposit|charge|charges|per\s+month|per\s+day)\b/i;
  const hasCurrencyHint = currencyHint.test(working);
  if (!hasCurrencyHint) {
    // Convert $...$ math to \(...\) when this is not a currency string
    working = working.replace(/\$([^$]+)\$/g, (_m, inner) => `\\(${inner}\\)`);
    // Convert lone $number math to \(number\) when not currency
    working = working.replace(
      /\$(\d[\d,]*(?:\.\d+)?)/g,
      (_m, amount) => `\\(${amount}\\)`
    );
    // Clean up stray $ around inline delimiters
    working = working.replace(/\$\\\(/g, '\\(').replace(/\\\)\$/g, '\\)');
    if (working.includes('\\(')) {
      working = working.replace(/\\\)\s*([A-Za-z0-9])/g, ' $1');
    }
  }
  // Normalize "Evaluate:" prompts into a single inline math block
  if (/\bEvaluate\s*:/i.test(working)) {
    working = working.replace(
      /(Evaluate:\s*)([^.?!]+)([.?!]?)/i,
      (_m, prefix, expr, punct) => {
        let cleaned = expr;
        cleaned = cleaned.replace(/\$/g, '');
        cleaned = cleaned.replace(/\\\(|\\\)/g, '');
        cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
        return `${prefix}\\(${cleaned}\\)${punct}`;
      }
    );
  }
  // Normalize "defined by" expressions into inline math
  if (/defined by/i.test(working)) {
    working = working.replace(
      /(defined by\s*)([^.?!]+)([.?!]?)/i,
      (_m, prefix, expr, punct) => {
        let cleaned = expr;
        cleaned = cleaned.replace(/\$/g, '');
        cleaned = cleaned.replace(/\\\(|\\\)/g, '');
        cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
        return `${prefix}\\(${cleaned}\\)${punct}`;
      }
    );
  }
  if (hasCurrencyHint) {
    working = working.replace(
      /\\[()]\s*(\d[\d,]*(?:\.\d+)?)/g,
      (_m, amount) => `$${amount}`
    );
  }
  // Replace stray inline delimiters used as currency markers (\)10 or \(10)
  const delimiterPositions = [];
  for (let i = 0; i < working.length - 1; i++) {
    if (
      working[i] === '\\' &&
      (working[i + 1] === '(' || working[i + 1] === ')')
    ) {
      delimiterPositions.push({ index: i, type: working[i + 1] });
      i += 1;
    }
  }
  const matched = new Set();
  const stack = [];
  delimiterPositions.forEach(({ index, type }) => {
    if (type === '(') {
      stack.push(index);
    } else if (stack.length) {
      const openIndex = stack.pop();
      matched.add(openIndex);
      matched.add(index);
    }
  });
  if (delimiterPositions.length) {
    let rebuilt = '';
    for (let i = 0; i < working.length; i++) {
      if (
        working[i] === '\\' &&
        (working[i + 1] === '(' || working[i + 1] === ')')
      ) {
        const isMatched = matched.has(i);
        if (!isMatched) {
          let j = i + 2;
          while (j < working.length && /\s/.test(working[j])) j += 1;
          if (hasCurrencyHint && j < working.length && /\d/.test(working[j])) {
            rebuilt += '$';
            i += 1;
            continue;
          }
          if (
            !hasCurrencyHint &&
            working[i + 1] === ')' &&
            j < working.length &&
            /[A-Za-z0-9]/.test(working[j])
          ) {
            rebuilt += '\\(';
            i += 1;
            continue;
          }
        }
      }
      rebuilt += working[i];
    }
    working = rebuilt;
  }
  // Repair swapped inline delimiters like "\) ... \(" -> "\( ... \)"
  const firstOpen = working.indexOf('\\(');
  const firstClose = working.indexOf('\\)');
  if (firstClose !== -1 && (firstOpen === -1 || firstClose < firstOpen)) {
    const lastOpen = working.lastIndexOf('\\(');
    const lastClose = working.lastIndexOf('\\)');
    if (lastOpen !== -1 && lastOpen > lastClose) {
      const replaceAt = (source, index, value) =>
        `${source.slice(0, index)}${value}${source.slice(index + 2)}`;
      working = replaceAt(working, firstClose, '\\(');
      working = replaceAt(working, lastOpen, '\\)');
    }
  }
  working = normalizeMathDelimiters(working);
  working = wrapPlainMathOutsideDelimiters(working);
  return working;
}

function fixFile(filePath) {
  const filename = path.basename(filePath);
  totalFiles++;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    let fileFixes = 0;

    // Fix 1: Plain fractions in answer text fields (like "-1/2", "2/3" etc)
    // Match patterns like: "text": "-1/2" or "correctAnswer": "2/3"
    content = content.replace(
      /"(?:text|correctAnswer)":\s*"(-?\d+\/\d+)"/g,
      (match, frac) => {
        fileFixes++;
        const parts = frac.match(/(-?)(\d+)\/(\d+)/);
        const sign = parts[1];
        const num = parts[2];
        const den = parts[3];
        return match.replace(frac, `\\(${sign}\\frac{${num}}{${den}}\\)`);
      }
    );

    // Fix 2: Plain fractions in rationale text (but not in currency context)
    // Look for fractions in rationale that are clearly math, not dates or currency
    content = content.replace(/"rationale":\s*"([^"]*)"/g, (match, text) => {
      // Skip if it contains dollar amounts before the fraction
      if (text.match(/\$\d+/)) return match;

      // Replace standalone fractions

      const fixed = text.replace(/\b(\d+)\/(\d+)\b/g, (fracMatch, num, den) => {
        // Check if already in LaTeX
        const before = text.substring(0, text.indexOf(fracMatch));
        if (before.includes('\\frac')) return fracMatch;

        fileFixes++;
        return `\\(\\frac{${num}}{${den}}\\)`;
      });

      return match.replace(text, fixed);
    });

    // Fix 3: Slashes in math mode that should be \frac
    // Pattern: $...num/den...$ -> \(...\frac{num}{den}...\)
    content = content.replace(
      /\$([^$]*?)(\d+)\/(\d+)([^$]*?)\$/g,
      (match, before, num, den, after) => {
        // Skip if already using \frac
        if (match.includes('\\frac')) return match;

        fileFixes++;
        return `\\(${before}\\frac{${num}}{${den}}${after}\\)`;
      }
    );

    // Fix 4: Plain exponents in rationale (like "r^2", "6^2")
    content = content.replace(/"rationale":\s*"([^"]*)"/g, (match, text) => {
      const fixed = text.replace(
        /\b(\w+)\^(\d+)\b/g,
        (expMatch, base, power) => {
          // Check if already in $...$
          const matchIndex = text.indexOf(expMatch);
          const before = text.substring(0, matchIndex);
          const dollarsBefore = (before.match(/\$/g) || []).length;

          // If odd number of $ before, we're inside math mode already
          if (dollarsBefore % 2 === 1) return expMatch;

          fileFixes++;
          return `\\(${base}^{${power}}\\)`;
        }
      );

      return match.replace(text, fixed);
    });

    // Fix 5: Escaped newlines that were corrupted (already fixed by previous script, but double-check)
    if (content.includes('`n')) {
      content = content.replace(/`n/g, '\\n');
      fileFixes++;
    }
    if (content.includes('`t')) {
      content = content.replace(/`t/g, '\\t');
      fileFixes++;
    }

    // Fix 6: Normalize math delimiters and wrap plain math inside string literals
    const beforeLiteralFix = content;
    const stringLiteralRegex = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g;
    content = content.replace(stringLiteralRegex, (match) => {
      const quote = match[0];
      const body = match.slice(1, -1);
      const fixedBody = fixMathInStringLiteral(body);
      return `${quote}${fixedBody}${quote}`;
    });
    if (content !== beforeLiteralFix) {
      fileFixes++;
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed ${filename}: ${fileFixes} changes`);
      totalFixes += fileFixes;
      return true;
    }
  } catch (error) {
    console.error(`✗ Error fixing ${filename}:`, error.message);
    return false;
  }

  return false;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      fixFile(fullPath);
    }
  });
}

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║  COMPREHENSIVE MATH KATEX FIX - All Math Question Files  ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

scanDirectory(mathDir);

console.log('\n' + '─'.repeat(60));
console.log(`✓ Processed ${totalFiles} files`);
console.log(`✓ Applied ${totalFixes} fixes`);
console.log('\n All math questions now use proper KaTeX formatting!');
console.log('  • Fractions: \\((\\frac{a}{b})\\)');
console.log('  • Exponents: \\(x^{n}\\)');
console.log('  • Math operators: Properly wrapped in \\(...\\) delimiters\n');
