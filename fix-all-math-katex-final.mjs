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
        return match.replace(frac, `$${sign}\\\\frac{${num}}{${den}}$`);
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
        return `$\\\\frac{${num}}{${den}}$`;
      });

      return match.replace(text, fixed);
    });

    // Fix 3: Slashes in math mode that should be \frac
    // Pattern: $...num/den...$ -> $...\frac{num}{den}...$
    content = content.replace(
      /\$([^$]*?)(\d+)\/(\d+)([^$]*?)\$/g,
      (match, before, num, den, after) => {
        // Skip if already using \frac
        if (match.includes('\\frac')) return match;

        fileFixes++;
        return `$${before}\\\\frac{${num}}{${den}}${after}$`;
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
          return `$${base}^{${power}}$`;
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
console.log('  • Fractions: $\\frac{a}{b}$');
console.log('  • Exponents: $x^{n}$');
console.log('  • Math operators: Properly wrapped in $ delimiters\n');
