#!/usr/bin/env node
/*
  Image library vs metadata audit
  Usage: node tools/auditImages.js

  - Loads backend/image_metadata_final.json (same file server.js prefers)
  - Walks frontend/Images/{Science,SocialStudies,Social_Studies,Social}
  - Compares both directions
  - Emits a JSON report to tools/image_audit_report.json
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO_ROOT = path.resolve(__dirname, '..');
const BACKEND_DIR = path.join(REPO_ROOT, 'backend');
const FRONTEND_DIR = path.join(REPO_ROOT, 'frontend');
const METADATA_PRIMARY = path.join(BACKEND_DIR, 'image_metadata_final.json');
const METADATA_FALLBACK = path.join(BACKEND_DIR, 'data', 'image_metadata_final.json');
const REPORT_FILE = path.join(REPO_ROOT, 'tools', 'image_audit_report.json');

const VALID_SUBJECTS = new Set(['Science', 'Social Studies', 'Math', 'RLA', 'Simulations']);
const IMG_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function readJsonSafe(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function walkDir(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walkDir(full, files);
      } else {
        files.push(full);
      }
    }
  } catch {}
  return files;
}

function existsFile(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isFile(); } catch { return false; }
}

function normalizeForServer(rawPath) {
  if (!rawPath) return { normalized: '', variants: [] };
  const clean = String(rawPath).replace(/^\/frontend/i, '');
  const normalized = clean.startsWith('/') ? clean : `/${clean}`;
  // server indexes these three forms
  const variants = [normalized, normalized.slice(1), String(rawPath)];
  return { normalized, variants };
}

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return crypto.randomBytes(16).toString('hex');
}

function inferSubjectFromPath(p) {
  const pLower = String(p).toLowerCase().replace(/\\/g, '/');
  if (pLower.includes('/science/')) return 'Science';
  if (pLower.includes('/socialstudies/') || pLower.includes('/social_studies/') || pLower.includes('/social/')) return 'Social Studies';
  return '';
}

function lastSegment(p) {
  const clean = String(p).replace(/\\/g, '/');
  const idx = clean.lastIndexOf('/');
  return idx >= 0 ? clean.slice(idx + 1) : clean;
}

function buildExpectedFilePath(absPath, subjectRootAbs, subjectName) {
  // Return /frontend/Images/<Subject>/<relativePathUnderSubject>
  const rel = path.relative(subjectRootAbs, absPath).split(path.sep).join('/');
  return `/frontend/Images/${subjectName}/${rel}`;
}

function main() {
  const db = readJsonSafe(METADATA_PRIMARY) || readJsonSafe(METADATA_FALLBACK) || [];
  if (!Array.isArray(db)) {
    console.error('Metadata file is not an array. Aborting.');
    process.exit(2);
  }

  // Indexes
  const byFilePath = new Map(); // exact filePath -> entries[]
  const byFileName = new Map(); // fileName -> entries[]
  const byNormalizedKey = new Map(); // normalized variants -> entries[]
  const idsBySha1 = new Map(); // sha1 -> ids[]

  for (const im of db) {
    if (!im || typeof im !== 'object') continue;
    const filePathStr = im.filePath || im.src || im.path || '';
    if (filePathStr) {
      const k = String(filePathStr);
      byFilePath.set(k, (byFilePath.get(k) || []).concat(im));
      const { variants } = normalizeForServer(k);
      for (const v of variants) {
        byNormalizedKey.set(v, (byNormalizedKey.get(v) || []).concat(im));
      }
    }
    const fn = im.fileName || lastSegment(filePathStr);
    if (fn) byFileName.set(fn, (byFileName.get(fn) || []).concat(im));
    if (im.sha1) idsBySha1.set(im.sha1.toLowerCase(), (idsBySha1.get(im.sha1.toLowerCase()) || []).concat(im.id || '(no-id)'));
  }

  // Directories to walk
  const sciRoot = path.join(FRONTEND_DIR, 'Images', 'Science');
  const socRootA = path.join(FRONTEND_DIR, 'Images', 'SocialStudies');
  const socRootB = path.join(FRONTEND_DIR, 'Images', 'Social_Studies');
  const socRootC = path.join(FRONTEND_DIR, 'Images', 'Social');

  const roots = [
    { root: sciRoot, subject: 'Science' },
    { root: socRootA, subject: 'Social Studies' },
    { root: socRootB, subject: 'Social Studies' },
    { root: socRootC, subject: 'Social Studies' },
  ].filter(r => fs.existsSync(r.root));

  const diskFiles = [];
  for (const r of roots) {
    const files = walkDir(r.root, [])
      .filter(f => IMG_EXTS.has(path.extname(f).toLowerCase()));
    for (const abs of files) {
      diskFiles.push({ abs, subject: r.subject, root: r.root });
    }
  }

  // (a) Metadata -> Disk
  const missingFiles = [];
  for (const im of db) {
    const filePathStr = im.filePath || im.src || im.path || '';
    if (!filePathStr) continue;
    const abs = path.join(REPO_ROOT, filePathStr.replace(/^\//, ''));
    if (!existsFile(abs)) {
      missingFiles.push({ filePath: filePathStr, id: im.id || '', subject: im.subject || '' });
    }
  }

  // (b) Disk -> Metadata
  const unlistedImages = [];
  for (const rec of diskFiles) {
    const expectedPath = buildExpectedFilePath(rec.abs, rec.root, rec.subject);
    const { variants } = normalizeForServer(expectedPath);
    const found = variants.some(v => byNormalizedKey.has(v));
    if (!found) {
      const stub = {
        id: uuid(),
        subject: rec.subject,
        fileName: lastSegment(rec.abs),
        filePath: expectedPath,
        width: 0,
        height: 0,
        dominantType: 'photo',
        altText: '',
        detailedDescription: '',
        keywords: [],
        sourceUrl: '',
        sourceTitle: '',
        sourcePublished: '',
        license: '',
        collectedAt: new Date().toISOString(),
        category: '',
        usageDirectives: ''
      };
      unlistedImages.push({ path: rec.abs, expectedFilePath: expectedPath, subject: rec.subject, stub });
    }
  }

  // Metadata hygiene checks
  const weakMetadata = [];
  const duplicates = [];

  // subject validity, filePath prefix, fileName matches tail, weak fields
  for (const im of db) {
    const issues = [];
    const subject = im.subject || '';
    if (!VALID_SUBJECTS.has(subject)) {
      issues.push(`Unexpected subject: ${subject}`);
    }
    const filePathStr = im.filePath || im.src || im.path || '';
    if (!filePathStr.startsWith('/frontend/')) {
      issues.push('filePath should start with /frontend/');
    }
    const fn = im.fileName || lastSegment(filePathStr);
    const tail = lastSegment(filePathStr);
    if (fn !== tail) {
      issues.push(`fileName (${fn}) does not match filePath tail (${tail})`);
    }
    if (!im.altText) issues.push('altText missing');
    if (!im.detailedDescription) issues.push('detailedDescription missing');
    if (!im.license) issues.push('license missing');
    if (!im.sourceUrl) issues.push('sourceUrl missing');

    if (issues.length > 0) {
      weakMetadata.push({ id: im.id || '', filePath: filePathStr, issues });
    }
  }

  // duplicates by filePath
  for (const [fp, arr] of byFilePath.entries()) {
    if (arr.length > 1) {
      duplicates.push({ type: 'filePath', filePath: fp, ids: arr.map(e => e.id || '') });
    }
  }
  // duplicates by sha1
  for (const [sha, ids] of idsBySha1.entries()) {
    if (ids.length > 1) {
      duplicates.push({ type: 'sha1', sha1: sha, ids });
    }
  }

  // Summary
  const summary = {
    totalMetadata: db.length,
    totalDiskImages: diskFiles.length,
    missingFiles: missingFiles.length,
    unlistedImages: unlistedImages.length,
    duplicates: duplicates.length,
    weakMetadata: weakMetadata.length,
  };

  // Console report
  console.log('--- Image Audit Report ---');
  console.log(`Total metadata entries: ${summary.totalMetadata}`);
  console.log(`Total image files on disk (Science + Social Studies): ${summary.totalDiskImages}`);
  console.log(`Missing files (in metadata but not on disk): ${summary.missingFiles}`);
  console.log(`Unlisted images (on disk but not in metadata): ${summary.unlistedImages}`);
  console.log(`Duplicate metadata entries: ${summary.duplicates}`);
  console.log(`Entries with weak metadata (missing alt/description/license/source): ${summary.weakMetadata}`);

  // Save JSON report
  const report = { missingFiles, unlistedImages, duplicates, weakMetadata };
  try {
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf8');
    console.log(`Saved detailed report to ${path.relative(REPO_ROOT, REPORT_FILE)}`);
  } catch (e) {
    console.warn('Failed to write report file:', e.message);
  }
}

main();
