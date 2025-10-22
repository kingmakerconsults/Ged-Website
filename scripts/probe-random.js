#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const META_PATH = path.join(ROOT, 'image_metadata_final.json');
const IMAGE_ROOTS = [
  path.join(ROOT, 'backend', 'public', 'img'),
  path.join(ROOT, 'public', 'img'),
  path.join(ROOT, 'assets', 'social'),
  path.join(ROOT, 'frontend', 'Images'),
  path.join(ROOT, 'frontend', 'Images', 'Social Studies'),
  path.join(ROOT, 'frontend', 'Images', 'Science'),
  path.join(ROOT, 'frontend', 'Images', 'Math'),
  path.join(ROOT, 'frontend', 'Images', 'RLA')
];
const DEFAULT_COUNT = 20;
const HTTP_TIMEOUT_MS = 6000;

function parseArgs(argv) {
  const options = { count: DEFAULT_COUNT, http: false };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--count=')) {
      const value = Number(arg.split('=')[1]);
      if (Number.isFinite(value) && value > 0) {
        options.count = Math.floor(value);
      }
    } else if (arg === '--http') {
      options.http = true;
    } else if (arg === '--no-http') {
      options.http = false;
    }
  }
  if (process.env.IMG_PROBE_HTTP === '1') {
    options.http = true;
  }
  return options;
}

async function loadMetadata() {
  const raw = await fs.readFile(META_PATH, 'utf8');
  const records = JSON.parse(raw);
  if (!Array.isArray(records)) {
    throw new Error('Metadata file must contain an array.');
  }
  return records;
}

async function walkDir(dir, map) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkDir(fullPath, map);
      } else if (entry.isFile()) {
        map.set(entry.name, fullPath);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn(`Unable to read ${dir}: ${err?.message || err}`);
    }
  }
}

async function buildLocalIndex() {
  const map = new Map();
  for (const root of IMAGE_ROOTS) {
    await walkDir(root, map);
  }
  return map;
}

function pickRandom(records, count) {
  const copy = records.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

async function probeHttp(file) {
  const base = process.env.IMG_BASE_URL || 'http://localhost:3000';
  const url = new URL(`/img/${encodeURIComponent(file)}`, base).toString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HTTP_TIMEOUT_MS);
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const contentType = String(response.headers.get('content-type') || '');
    if (!/^image\//i.test(contentType) && contentType !== '') {
      throw new Error(`Unexpected content-type: ${contentType}`);
    }
    return { ok: true, status: response.status, url };
  } catch (err) {
    return { ok: false, error: err?.message || String(err), url };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const options = parseArgs(process.argv);
  try {
    const records = await loadMetadata();
    const sample = pickRandom(records, options.count);
    const localIndex = await buildLocalIndex();
    const results = [];

    for (const record of sample) {
      const file = typeof record.file === 'string' ? record.file : '';
      const localPath = file ? localIndex.get(file) || null : null;
      const result = { id: record.id, file, localPath, http: null };
      if (options.http && file) {
        result.http = await probeHttp(file);
      }
      results.push(result);
    }

    const missingLocal = results.filter((r) => !r.localPath);
    const failedHttp = results.filter((r) => r.http && !r.http.ok);

    console.log(`Probed ${results.length} metadata entries.`);
    console.log(` - Local assets found: ${results.length - missingLocal.length}/${results.length}`);
    if (options.http) {
      console.log(` - HTTP probes succeeded: ${results.length - failedHttp.length}/${results.length}`);
    }

    if (missingLocal.length) {
      console.warn('Missing local assets (showing up to 5):');
      missingLocal.slice(0, 5).forEach((entry) => {
        console.warn(` - ${entry.file || '<unknown>'} (id: ${entry.id})`);
      });
    }

    if (failedHttp.length) {
      console.warn('HTTP probe failures (showing up to 5):');
      failedHttp.slice(0, 5).forEach((entry) => {
        console.warn(` - ${entry.file} :: ${entry.http?.error || 'unknown error'}`);
      });
    }

    if (missingLocal.length || failedHttp.length) {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error('Failed to probe metadata:', err?.message || err);
    process.exitCode = 1;
  }
}

main();
