#!/usr/bin/env node
// ============================================================================
// Visual-Asset Integrity Validator
// ============================================================================
// Validates that every image/chart/graph/table/map/diagram reference in quiz
// data points to a real, approved asset in frontend/public/images/.
//
// Usage:
//   node tests/validateVisualAssets.js              # audit only (exit 1 on issues)
//   node tests/validateVisualAssets.js --fix        # fix double-slash paths + strip non-existent refs
//   node tests/validateVisualAssets.js --summary    # print per-file summary only
//
// ASSET SOURCE RULE:
//   All comprehensive exam visual stimuli must come from the existing asset
//   library. No placeholder charts, fake diagrams, or generic AI-created
//   visuals. Every visual question must reference a real stored asset.
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const requireCJS = createRequire(import.meta.url);

const FIX_MODE = process.argv.includes('--fix');
const SUMMARY_MODE = process.argv.includes('--summary');

// ── Asset Catalog ──────────────────────────────────────────────────────────────

const IMAGE_ROOT = path.join(root, 'frontend', 'public', 'images');
const IMAGE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
]);

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkDir(full));
    else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

function buildAssetSet() {
  const publicBase = path.join(root, 'frontend', 'public');
  const files = walkDir(IMAGE_ROOT);
  const assetPaths = new Set();
  for (const f of files) {
    const rel = '/' + path.relative(publicBase, f).replace(/\\/g, '/');
    assetPaths.add(rel);
  }
  return assetPaths;
}

const approvedAssets = buildAssetSet();

/**
 * Resolves a URL from quiz data against the approved asset set.
 * Handles: double-slash prefixes, %20 encoding, case differences.
 * Returns { valid, resolvedPath, issue? }
 */
function resolveAssetUrl(url) {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return { valid: true, resolvedPath: null, issue: null }; // empty is fine
  }

  const trimmed = url.trim();

  // Reject external URLs
  if (/^https?:\/\//i.test(trimmed)) {
    return { valid: false, resolvedPath: null, issue: 'external-url' };
  }

  // Normalize double-slash to single-slash
  let normalized = trimmed;
  if (normalized.startsWith('//images/')) {
    normalized = normalized.slice(1); // //images -> /images
  }

  // Try exact match first
  if (approvedAssets.has(normalized)) {
    return {
      valid: true,
      resolvedPath: normalized,
      issue: trimmed !== normalized ? 'double-slash' : null,
    };
  }

  // Try URL-decoded version
  const decoded = decodeURIComponent(normalized);
  if (approvedAssets.has(decoded)) {
    return {
      valid: true,
      resolvedPath: decoded,
      issue: trimmed !== decoded ? 'url-encoded' : null,
    };
  }

  // Try case-insensitive match
  for (const asset of approvedAssets) {
    if (asset.toLowerCase() === decoded.toLowerCase()) {
      return { valid: true, resolvedPath: asset, issue: 'case-mismatch' };
    }
  }

  return { valid: false, resolvedPath: null, issue: 'missing-asset' };
}

// ── Data Loaders ───────────────────────────────────────────────────────────────

function loadBackendQuizFiles() {
  const quizDir = path.join(root, 'backend', 'data', 'quizzes');
  const results = [];
  if (!fs.existsSync(quizDir)) return results;

  const subjects = fs.readdirSync(quizDir).filter((f) => {
    try {
      return fs.statSync(path.join(quizDir, f)).isDirectory();
    } catch {
      return false;
    }
  });

  for (const sub of subjects) {
    const dir = path.join(quizDir, sub);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
    for (const file of files) {
      const abs = path.join(dir, file);
      try {
        const questions = requireCJS(abs);
        if (!Array.isArray(questions)) continue;
        results.push({
          filePath: `backend/data/quizzes/${sub}/${file}`,
          absPath: abs,
          questions,
          format: 'backend-js',
        });
      } catch (e) {
        // skip non-loadable files
      }
    }
  }
  return results;
}

function loadPublicQuizJsonFiles() {
  const jsonDir = path.join(root, 'public', 'quizzes');
  const results = [];
  if (!fs.existsSync(jsonDir)) return results;

  for (const file of fs
    .readdirSync(jsonDir)
    .filter((f) => f.endsWith('.json'))) {
    const abs = path.join(jsonDir, file);
    try {
      const raw = fs.readFileSync(abs, 'utf8').replace(/^\uFEFF/, '');
      const data = JSON.parse(raw);
      results.push({
        filePath: `public/quizzes/${file}`,
        absPath: abs,
        data,
        format: 'public-json',
      });
    } catch (e) {
      console.warn(`[WARN] Could not parse ${abs}: ${e.message}`);
    }
  }
  return results;
}

async function loadFrontendQuizData() {
  const filePath = path.join(root, 'frontend', 'data', 'quiz_data.js');
  try {
    const mod = await import(pathToFileURL(filePath).href);
    const data = mod.expandedQuizData || mod.default || null;
    if (data) {
      return [
        {
          filePath: 'frontend/data/quiz_data.js',
          absPath: filePath,
          data,
          format: 'frontend-esm',
        },
      ];
    }
  } catch (e) {
    console.warn(`[WARN] Could not import quiz_data.js: ${e.message}`);
  }
  return [];
}

// ── Question Extractors ────────────────────────────────────────────────────────

function extractImageUrls(question) {
  const urls = [];
  if (question.imageUrl)
    urls.push({ field: 'imageUrl', value: question.imageUrl });
  if (question.imageURL)
    urls.push({ field: 'imageURL', value: question.imageURL });
  if (question.content?.imageURL)
    urls.push({ field: 'content.imageURL', value: question.content.imageURL });
  if (question.content?.imageUrl)
    urls.push({ field: 'content.imageUrl', value: question.content.imageUrl });
  // Deduplicate by value
  const seen = new Set();
  return urls.filter((u) => {
    if (!u.value || !u.value.trim() || seen.has(u.value)) return false;
    seen.add(u.value);
    return true;
  });
}

function extractQuestionsFromNestedData(data) {
  const questions = [];

  function walk(obj, context) {
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => walk(item, context));
      return;
    }
    if (!obj || typeof obj !== 'object') return;

    // If it has answerOptions, it's a question
    if (obj.answerOptions) {
      questions.push({ question: obj, context });
      return;
    }

    // Navigate nested structures
    if (obj.categories) {
      for (const [catName, cat] of Object.entries(obj.categories)) {
        walk(cat, `${context}>${catName}`);
      }
    }
    if (obj.topics) walk(obj.topics, context);
    if (obj.quizzes) walk(obj.quizzes, context);
    if (obj.questions) walk(obj.questions, context);

    // Subject-level in expandedQuizData
    for (const [key, val] of Object.entries(obj)) {
      if (
        key === 'categories' ||
        key === 'topics' ||
        key === 'quizzes' ||
        key === 'questions'
      )
        continue;
      if (
        val &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        val.categories
      ) {
        walk(val, key);
      }
    }
  }

  walk(data, '');
  return questions;
}

// ── Validation ─────────────────────────────────────────────────────────────────

function validateSource(source) {
  const issues = [];
  const stats = {
    totalQuestions: 0,
    withImages: 0,
    validRefs: 0,
    invalidRefs: 0,
    fixable: 0,
  };

  let allQuestions = [];

  if (source.format === 'backend-js') {
    allQuestions = source.questions.map((q, i) => ({
      question: q,
      context: `Q${i + 1}`,
    }));
  } else {
    allQuestions = extractQuestionsFromNestedData(source.data);
  }

  stats.totalQuestions = allQuestions.length;

  for (const { question, context } of allQuestions) {
    const imageUrls = extractImageUrls(question);
    if (imageUrls.length === 0) continue;
    stats.withImages++;

    for (const { field, value } of imageUrls) {
      const result = resolveAssetUrl(value);

      if (!result.valid) {
        stats.invalidRefs++;
        issues.push({
          file: source.filePath,
          context,
          field,
          url: value,
          issue: result.issue,
          severity: 'error',
          message:
            result.issue === 'external-url'
              ? `External URL not allowed: ${value}`
              : `Image asset not found: ${value}`,
        });
      } else if (result.resolvedPath) {
        stats.validRefs++;

        // Report fixable issues
        if (result.issue === 'double-slash') {
          stats.fixable++;
          issues.push({
            file: source.filePath,
            context,
            field,
            url: value,
            resolved: result.resolvedPath,
            issue: 'double-slash',
            severity: 'warn',
            message: `Double-slash prefix: ${value} → ${result.resolvedPath}`,
          });
        }
      }
    }
  }

  return { issues, stats };
}

// ── Fix Mode ───────────────────────────────────────────────────────────────────

function fixBackendJsFile(source, issues) {
  const fixableIssues = issues.filter(
    (i) =>
      i.file === source.filePath &&
      (i.issue === 'double-slash' || i.issue === 'missing-asset')
  );
  if (fixableIssues.length === 0) return 0;

  let content = fs.readFileSync(source.absPath, 'utf8');
  let fixes = 0;

  for (const issue of fixableIssues) {
    if (issue.issue === 'double-slash' && issue.resolved) {
      // Fix double-slash: replace //images/ with /images/
      const oldVal = issue.url;
      const newVal = issue.resolved;
      if (content.includes(JSON.stringify(oldVal))) {
        content = content
          .split(JSON.stringify(oldVal))
          .join(JSON.stringify(newVal));
        fixes++;
      }
    } else if (issue.issue === 'missing-asset') {
      // Strip the broken reference to empty string
      const oldVal = issue.url;
      if (content.includes(JSON.stringify(oldVal))) {
        content = content.split(JSON.stringify(oldVal)).join('""');
        fixes++;
      }
    }
  }

  if (fixes > 0) {
    fs.writeFileSync(source.absPath, content, 'utf8');
  }
  return fixes;
}

function fixPublicJsonFile(source, issues) {
  const fixableIssues = issues.filter(
    (i) =>
      i.file === source.filePath &&
      (i.issue === 'double-slash' || i.issue === 'missing-asset')
  );
  if (fixableIssues.length === 0) return 0;

  let raw = fs.readFileSync(source.absPath, 'utf8');
  let fixes = 0;

  for (const issue of fixableIssues) {
    if (issue.issue === 'double-slash' && issue.resolved) {
      const oldVal = issue.url;
      const newVal = issue.resolved;
      if (raw.includes(JSON.stringify(oldVal))) {
        raw = raw.split(JSON.stringify(oldVal)).join(JSON.stringify(newVal));
        fixes++;
      }
    } else if (issue.issue === 'missing-asset') {
      const oldVal = issue.url;
      if (raw.includes(JSON.stringify(oldVal))) {
        raw = raw.split(JSON.stringify(oldVal)).join('""');
        fixes++;
      }
    }
  }

  if (fixes > 0) {
    fs.writeFileSync(source.absPath, raw, 'utf8');
  }
  return fixes;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Visual-Asset Integrity Validator ===');
  console.log(`Approved assets in library: ${approvedAssets.size}`);
  console.log();

  // Load all quiz data sources
  const backendSources = loadBackendQuizFiles();
  const jsonSources = loadPublicQuizJsonFiles();
  const frontendSources = await loadFrontendQuizData();

  const allSources = [...backendSources, ...jsonSources, ...frontendSources];
  console.log(`Loaded ${allSources.length} quiz data sources`);

  const allIssues = [];
  const totals = {
    totalQuestions: 0,
    withImages: 0,
    validRefs: 0,
    invalidRefs: 0,
    fixable: 0,
  };

  for (const source of allSources) {
    const { issues, stats } = validateSource(source);
    allIssues.push(...issues);
    totals.totalQuestions += stats.totalQuestions;
    totals.withImages += stats.withImages;
    totals.validRefs += stats.validRefs;
    totals.invalidRefs += stats.invalidRefs;
    totals.fixable += stats.fixable;

    if (SUMMARY_MODE && stats.withImages > 0) {
      console.log(
        `  ${source.filePath}: ${stats.withImages} image questions, ${stats.invalidRefs} broken`
      );
    }
  }

  console.log();
  console.log('=== Summary ===');
  console.log(`Total questions scanned:   ${totals.totalQuestions}`);
  console.log(`Questions with images:     ${totals.withImages}`);
  console.log(`Valid image references:     ${totals.validRefs}`);
  console.log(`Invalid/missing references: ${totals.invalidRefs}`);
  console.log(`Fixable path issues:       ${totals.fixable}`);

  // Categorize issues
  const errors = allIssues.filter((i) => i.severity === 'error');
  const warnings = allIssues.filter((i) => i.severity === 'warn');

  if (errors.length > 0) {
    console.log();
    console.log('=== ERRORS (missing/invalid assets) ===');
    for (const e of errors) {
      console.log(`  [${e.file}] ${e.context} ${e.field}: ${e.message}`);
    }
  }

  if (warnings.length > 0 && !SUMMARY_MODE) {
    console.log();
    console.log('=== WARNINGS (fixable path issues) ===');
    for (const w of warnings) {
      console.log(`  [${w.file}] ${w.context} ${w.field}: ${w.message}`);
    }
  }

  // Fix mode
  if (FIX_MODE && (totals.fixable > 0 || totals.invalidRefs > 0)) {
    console.log();
    console.log('=== Applying fixes ===');
    let totalFixes = 0;

    for (const source of backendSources) {
      const fixes = fixBackendJsFile(source, allIssues);
      if (fixes > 0) {
        console.log(`  Fixed ${fixes} issues in ${source.filePath}`);
        totalFixes += fixes;
      }
    }
    for (const source of jsonSources) {
      const fixes = fixPublicJsonFile(source, allIssues);
      if (fixes > 0) {
        console.log(`  Fixed ${fixes} issues in ${source.filePath}`);
        totalFixes += fixes;
      }
    }

    console.log(`Total fixes applied: ${totalFixes}`);
  }

  // Exit code
  if (errors.length > 0) {
    console.log();
    console.log(`FAILED: ${errors.length} broken asset references found.`);
    process.exitCode = 1;
  } else {
    console.log();
    console.log(`PASSED: All image references resolve to approved assets.`);
    process.exitCode = 0;
  }
}

main();
