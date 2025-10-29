// Prune files in reports/ older than --days (default 45). ESM script.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const reportsDir = path.join(workspaceRoot, 'reports');

function parseDaysArg() {
  const idx = process.argv.indexOf('--days');
  if (idx !== -1 && process.argv[idx + 1]) {
    const n = Number(process.argv[idx + 1]);
    if (!Number.isNaN(n) && n > 0) return n;
  }
  return 45;
}

function main() {
  const days = parseDaysArg();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  if (!fs.existsSync(reportsDir)) {
    console.log('No reports directory found. Nothing to prune.');
    return;
  }
  let deleted = 0;
  for (const entry of fs.readdirSync(reportsDir, { withFileTypes: true })) {
    const full = path.join(reportsDir, entry.name);
    if (entry.isFile()) {
      const stat = fs.statSync(full);
      if (stat.mtimeMs < cutoff) {
        fs.unlinkSync(full);
        deleted += 1;
      }
    }
  }
  console.log(`Pruned ${deleted} file(s) older than ${days} days from reports/`);
}

main();
