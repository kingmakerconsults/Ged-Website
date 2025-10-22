import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, '..');
const distDir = path.join(frontendRoot, 'dist');
const EXCLUDED = new Set([
  'dist',
  'scripts',
  'node_modules',
  'Images',
  'tests',
  '__tests__',
  'package.json',
  'package-lock.json'
]);

function ensureCleanDist() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
}

function copyEntry(entry) {
  const sourcePath = path.join(frontendRoot, entry.name);
  const targetPath = path.join(distDir, entry.name);
  if (entry.isDirectory()) {
    fs.cpSync(sourcePath, targetPath, { recursive: true });
  } else if (entry.isFile()) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
  }
}

try {
  ensureCleanDist();
  const entries = fs.readdirSync(frontendRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDED.has(entry.name)) continue;
    copyEntry(entry);
  }
  console.log('[build] Frontend assets copied to dist at', distDir);
} catch (error) {
  console.error('[build][error]', error?.message || error);
  process.exitCode = 1;
}
