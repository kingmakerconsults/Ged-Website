// Build a JSON file with legacy Social Studies extras from the frontend ESM source
// Outputs: public/quizzes/social-studies.extras.json (an array of quiz objects)
const fs = require('fs');
const path = require('path');
const os = require('os');

const workspaceRoot = path.resolve(__dirname, '..');
const esmSource = path.join(workspaceRoot, 'frontend', 'Expanded', 'social_studies_quizzes.js');
const outDir = path.join(workspaceRoot, 'public', 'quizzes');
const outFile = path.join(outDir, 'social-studies.extras.json');

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function readAndTransformESMToCJS(srcPath) {
  const raw = fs.readFileSync(srcPath, 'utf8');
  // Very simple transform: replace the ESM export with CommonJS exports
  // export const socialStudiesQuizzes = [ ... ];
  const cjs = raw.replace(/export\s+const\s+socialStudiesQuizzes\s*=\s*/m, 'module.exports = ');
  return cjs;
}

function loadArrayFromTransformed(code) {
  const tmpDir = path.join(os.tmpdir(), 'ged-website-build');
  ensureDir(tmpDir);
  const tmpFile = path.join(tmpDir, 'ss_extras.tmp.cjs');
  fs.writeFileSync(tmpFile, code, 'utf8');
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const arr = require(tmpFile);
  if (!Array.isArray(arr)) throw new Error('Transformed module did not export an array');
  return arr;
}

function main() {
  if (!fs.existsSync(esmSource)) {
    console.error('[build-ss-extras] Source not found:', esmSource);
    process.exit(1);
  }
  const code = readAndTransformESMToCJS(esmSource);
  const extras = loadArrayFromTransformed(code);
  ensureDir(outDir);
  fs.writeFileSync(outFile, JSON.stringify(extras, null, 2));
  console.log(`[build-ss-extras] Wrote ${path.relative(workspaceRoot, outFile).replace(/\\\\/g, '/')}`);
}

main();
