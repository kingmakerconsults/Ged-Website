/**
 * Clean literal \n tokens between properties in math question files
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mathDir = path.join(__dirname, 'backend', 'data', 'quizzes', 'math');

let filesTouched = 0;

const fixContent = (text) => {
  return text.replace(/,\\n\s+"/g, ',\n    "');
};

const processFile = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fixed = fixContent(raw);
  if (fixed !== raw) {
    fs.writeFileSync(filePath, fixed);
    filesTouched++;
    console.log(`✓ Cleaned ${path.basename(filePath)}`);
  }
};

const scan = (dir) => {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scan(full);
    } else if (entry.endsWith('.js')) {
      processFile(full);
    }
  }
};

console.log('Cleaning literal \\n tokens in math files...');
scan(mathDir);
console.log(`\nFiles cleaned: ${filesTouched}`);
