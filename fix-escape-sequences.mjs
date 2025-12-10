/**
 * Fix corrupted escape sequences in math question files
 * Replaces `n with \n, `t with \t, etc.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mathDir = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');

function fixFile(filePath) {
  const filename = path.basename(filePath);

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Fix corrupted escape sequences
    content = content.replace(/`n/g, '\\n');
    content = content.replace(/`t/g, '\\t');
    content = content.replace(/`r/g, '\\r');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed escape sequences in ${filename}`);
      return true;
    }
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
    return false;
  }

  return false;
}

function scanDirectory(dir) {
  let fixCount = 0;
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixCount += scanDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      if (fixFile(fullPath)) {
        fixCount++;
      }
    }
  });

  return fixCount;
}

console.log('Fixing corrupted escape sequences in math files...\n');

const fixedCount = scanDirectory(mathDir);

console.log(`\n✓ Fixed ${fixedCount} files`);
