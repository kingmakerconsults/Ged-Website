#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const PRIMARY_PATH = path.join(ROOT, 'image_metadata_final.json');
const BACKEND_PATH = path.join(ROOT, 'backend', 'data', 'image_metadata_final.json');
const REQUIRED_FIELDS = ['id', 'file', 'type', 'credit'];
const OPTIONAL_STRING_FIELDS = ['title', 'alt', 'caption', 'sourceUrl', 'ocrText'];
const ARRAY_STRING_FIELDS = ['tags'];
const FILE_RX = /\.(png|jpe?g|gif|webp|svg)$/i;

async function readJsonFile(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    error.message = `${path.relative(ROOT, filePath)}: ${error.message}`;
    throw error;
  }
}

function collectErrors(records) {
  const errors = [];
  const seenIds = new Map();
  const seenFiles = new Map();

  records.forEach((record, index) => {
    if (!record || typeof record !== 'object') {
      errors.push({ index, message: 'Entry is not an object.' });
      return;
    }

    for (const field of REQUIRED_FIELDS) {
      const value = record[field];
      if (typeof value !== 'string' || !value.trim()) {
        errors.push({ index, message: `Missing required string field: ${field}` });
      }
    }

    if (typeof record.file === 'string' && !FILE_RX.test(record.file)) {
      errors.push({ index, message: `File does not look like a supported image: ${record.file}` });
    }

    OPTIONAL_STRING_FIELDS.forEach((field) => {
      if (record[field] != null && typeof record[field] !== 'string') {
        errors.push({ index, message: `Field ${field} must be a string when present.` });
      }
    });

    ARRAY_STRING_FIELDS.forEach((field) => {
      const value = record[field];
      if (value == null) return;
      if (!Array.isArray(value)) {
        errors.push({ index, message: `Field ${field} must be an array of strings.` });
        return;
      }
      value.forEach((entry, entryIndex) => {
        if (typeof entry !== 'string' || !entry.trim()) {
          errors.push({ index, message: `Field ${field}[${entryIndex}] must be a non-empty string.` });
        }
      });
    });

    if (record.year != null && !Number.isInteger(record.year)) {
      errors.push({ index, message: 'Field year must be an integer or null.' });
    }

    const idKey = typeof record.id === 'string' ? record.id.trim() : '';
    if (idKey) {
      if (seenIds.has(idKey.toLowerCase())) {
        errors.push({ index, message: `Duplicate id detected: ${idKey}` });
      } else {
        seenIds.set(idKey.toLowerCase(), index);
      }
    }

    const fileKey = typeof record.file === 'string' ? record.file.trim() : '';
    if (fileKey) {
      if (seenFiles.has(fileKey.toLowerCase())) {
        errors.push({ index, message: `Duplicate file detected: ${fileKey}` });
      } else {
        seenFiles.set(fileKey.toLowerCase(), index);
      }
    }

    if (record.sourceUrl != null && record.sourceUrl.trim()) {
      const url = record.sourceUrl.trim();
      if (!/^https?:\/\//i.test(url)) {
        errors.push({ index, message: 'sourceUrl must be an absolute http(s) URL.' });
      }
    }
  });

  return errors;
}

function canonicalize(records) {
  return JSON.stringify(records.slice().sort((a, b) => {
    return String(a.id || '').localeCompare(String(b.id || ''));
  }));
}

async function loadMetadata() {
  const primary = await readJsonFile(PRIMARY_PATH);
  if (!Array.isArray(primary)) {
    throw new Error('Primary metadata file must contain an array.');
  }
  let backend = null;
  let backendError = null;
  try {
    backend = await readJsonFile(BACKEND_PATH);
  } catch (err) {
    if (err?.code !== 'ENOENT') {
      backendError = err;
    }
  }
  return { primary, backend, backendError };
}

export async function main() {
  try {
    const { primary, backend, backendError } = await loadMetadata();
    const errors = collectErrors(primary);
    if (backend && !Array.isArray(backend)) {
      errors.push({ index: 'backend', message: 'Backend metadata file must contain an array.' });
    }
    if (backendError) {
      errors.push({ index: 'backend', message: backendError.message || 'Failed to load backend metadata.' });
    }

    if (backend && !backendError) {
      const primaryCanon = canonicalize(primary);
      const backendCanon = canonicalize(backend);
      if (primaryCanon !== backendCanon) {
        errors.push({ index: 'sync', message: 'Root and backend metadata files are out of sync.' });
      }
    }

    if (errors.length) {
      console.error('Metadata issues found:');
      errors.slice(0, 25).forEach(({ index, message }) => {
        console.error(` - [${index}] ${message}`);
      });
      if (errors.length > 25) {
        console.error(` ...and ${errors.length - 25} more.`);
      }
      process.exitCode = 1;
      return;
    }

    console.log(`Metadata OK: ${primary.length} records validated.`);
  } catch (err) {
    console.error('Failed to validate metadata:', err?.message || err);
    process.exitCode = 1;
  }
}

const entryPointUrl = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;

if (entryPointUrl && import.meta.url === entryPointUrl) {
  main();
}
