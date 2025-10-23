#!/usr/bin/env node
/**
 * Quick post-deploy checker for curated images.
 * - Reads image_metadata_final.json directly
 * - Applies the same normalization + eligibility rules
 * - Prints counts by visualType and subtopic, and the first few warnings
 *
 * Usage:
 *   node scripts/check-images.js
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const METADATA_PATHS = [
  path.join(__dirname, '..', 'image_metadata_final.json'),
  path.join(__dirname, '..', 'data', 'image_metadata_final.json'),
  path.join(__dirname, '..', 'backend', 'image_metadata_final.json'),
  path.join(__dirname, '..', 'backend', 'data', 'image_metadata_final.json')
];

function sha1(text) {
  return crypto.createHash('sha1').update(text).digest('hex').slice(0, 16);
}

function normalizeImagePath(raw) {
  if (!raw) return null;
  let p = String(raw).replace(/^\.?\/+/, '');
  if (/^https?:\/\//i.test(p) || p.startsWith('data:')) {
    return p;
  }
  if (!p.toLowerCase().startsWith('images/')) p = 'Images/' + p;
  return '/' + encodeURI(p);
}

const SKIP_REASONS = new Set();

function logOnce(message) {
  if (!SKIP_REASONS.has(message)) {
    SKIP_REASONS.add(message);
    console.warn(message);
  }
}

function isImageEligible(img) {
  if (!img || typeof img !== 'object') {
    logOnce('[images][check] skip: invalid record.');
    return false;
  }
  if (!img.type || typeof img.type !== 'string' || !img.type.trim()) {
    logOnce('[images][check] skip: missing type.');
    return false;
  }
  if (!Array.isArray(img.tags) || !img.tags.filter((tag) => typeof tag === 'string' && tag.trim().length).length) {
    logOnce('[images][check] skip: missing tags.');
    return false;
  }
  if (!img.alt && !img.title) {
    logOnce('[images][check] soft: missing alt/title.');
  }
  if (!img.file && !img.src && !img.filePath) {
    logOnce('[images][check] soft: missing file reference.');
  }
  return true;
}

function loadMeta() {
  for (const p of METADATA_PATHS) {
    try {
      const raw = fs.readFileSync(p, 'utf8');
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    } catch (_) {}
  }
  return [];
}

function main() {
  const db = loadMeta();
  const ids = new Set();
  let missingPath = 0;
  let eligible = 0;

  const byVisual = new Map();
  const bySubtopic = new Map();
  const warnings = [];

  for (const rec of db) {
    let id = rec.id;
    if (!id || ids.has(id)) id = sha1(rec.file || JSON.stringify(rec));
    ids.add(id);

    const baseFrom = rec.file || rec.filePath || rec.src || rec.path;
    rec.filePath = normalizeImagePath(baseFrom);
    rec.src = rec.filePath;

    if (!rec.src) {
      missingPath++;
      if (warnings.length < 10) warnings.push(`Missing src for file='${rec.file}'`);
    }

    if (isImageEligible(rec)) eligible++;

    const vt = (rec.visualType || 'unknown').toLowerCase();
    byVisual.set(vt, (byVisual.get(vt) || 0) + 1);

    for (const st of Array.isArray(rec.subtopics) ? rec.subtopics : []) {
      const key = st.toLowerCase();
      bySubtopic.set(key, (bySubtopic.get(key) || 0) + 1);
    }
  }

  console.log(`\n[CHECK] Curated images total: ${db.length}`);
  console.log(`[CHECK] Eligible under guard: ${eligible}`);
  console.log(`[CHECK] Missing src: ${missingPath}`);
  console.log(`\n[CHECK] Counts by visualType:`);
  for (const [k, v] of byVisual) console.log(`  - ${k}: ${v}`);
  console.log(`\n[CHECK] Top subtopics:`);
  const subs = [...bySubtopic.entries()].sort((a,b)=>b[1]-a[1]).slice(0, 10);
  for (const [k, v] of subs) console.log(`  - ${k}: ${v}`);

  if (warnings.length) {
    console.log(`\n[CHECK] First warnings:`);
    for (const w of warnings) console.log(`  ! ${w}`);
  }
  console.log('\nDone.\n');
}

main();
