#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import PQueue from 'p-queue';
import { fetch as undiciFetch } from 'undici';

const ROOT = process.cwd();
const PRIMARY_PATH = path.join(ROOT, 'image_metadata_final.json');
const BACKEND_PATH = path.join(ROOT, 'backend', 'data', 'image_metadata_final.json');
const ALT_PLACEHOLDER_PREFIX = 'TODO: Describe';
const CAPTION_PLACEHOLDER_PREFIX = 'Placeholder caption:';
const DEAD_LINK_PREFIX = 'Source unavailable:';

const DEFAULT_CONCURRENCY = 6;
const DEFAULT_TIMEOUT_MS = 8000;

function parseArgs(argv) {
  const options = {
    write: false,
    skipLinkCheck: false,
    concurrency: DEFAULT_CONCURRENCY,
    timeout: DEFAULT_TIMEOUT_MS,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case '--write':
        options.write = true;
        break;
      case '--skip-link-check':
        options.skipLinkCheck = true;
        break;
      case '--concurrency': {
        const value = Number.parseInt(argv[i + 1] ?? '', 10);
        if (Number.isFinite(value) && value > 0) {
          options.concurrency = value;
          i += 1;
        } else {
          throw new Error('Invalid value for --concurrency.');
        }
        break;
      }
      case '--timeout': {
        const value = Number.parseInt(argv[i + 1] ?? '', 10);
        if (Number.isFinite(value) && value >= 1000) {
          options.timeout = value;
          i += 1;
        } else {
          throw new Error('Invalid value for --timeout (minimum 1000ms).');
        }
        break;
      }
      case '--help':
        printHelp();
        process.exit(0);
        break;
      default:
        if (arg.startsWith('-')) {
          throw new Error(`Unknown option: ${arg}`);
        }
    }
  }

  return options;
}

function printHelp() {
  console.log(`Usage: node scripts/migrate-image-bank.js [options]\n\n` +
    `Backfills alt/caption fields, sanitizes strings, and flags dead source URLs.\n` +
    `This is a manual migration utility – run it intentionally.\n\n` +
    `Options:\n` +
    `  --write               Persist sanitized metadata back to disk.\n` +
    `  --skip-link-check     Skip remote validation of sourceUrl fields.\n` +
    `  --concurrency <n>     Parallel link probes (default: ${DEFAULT_CONCURRENCY}).\n` +
    `  --timeout <ms>        Timeout per link probe (default: ${DEFAULT_TIMEOUT_MS}).\n` +
    `  --help                Show this message.\n`);
}

async function loadMetadata(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error(`${path.relative(ROOT, filePath)} is not an array.`);
  }
  return data;
}

function collapseWhitespace(value) {
  return value.replace(/\s+/g, ' ').replace(/\s+([,.;!?])/g, '$1').trim();
}

function sanitizeSimple(value) {
  if (typeof value !== 'string') return '';
  const cleaned = collapseWhitespace(value);
  return cleaned;
}

function sanitizeMultiline(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n?/g, '\n').replace(/[\t\u00A0]+/g, ' ').replace(/ +/g, ' ').trim();
}

function sanitizeUrl(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function describeFromFilename(fileName) {
  if (typeof fileName !== 'string') return '';
  const withoutExt = fileName.replace(/\.[^.]+$/, '');
  const cleaned = withoutExt.replace(/[\-_]+/g, ' ');
  return collapseWhitespace(cleaned);
}

function primarySubject(record) {
  const title = sanitizeSimple(record.title ?? '');
  if (title) return title;
  const alt = sanitizeSimple(record.alt ?? '');
  if (alt && !alt.startsWith(ALT_PLACEHOLDER_PREFIX)) return alt;
  if (Array.isArray(record.tags)) {
    for (const tag of record.tags) {
      if (typeof tag === 'string' && tag.trim()) {
        return collapseWhitespace(tag);
      }
    }
  }
  const fileLabel = describeFromFilename(record.file ?? '');
  if (fileLabel) return fileLabel;
  if (record.type && typeof record.type === 'string') {
    return collapseWhitespace(record.type);
  }
  return 'this image';
}

function buildAltPlaceholder(record) {
  const subject = primarySubject(record);
  return `${ALT_PLACEHOLDER_PREFIX} ${subject}.`;
}

function buildCaptionPlaceholder(record) {
  const subject = primarySubject(record);
  return `${CAPTION_PLACEHOLDER_PREFIX} Provide context for ${subject}.`;
}

function buildDeadLinkNote(record, url) {
  const subject = primarySubject(record);
  const sanitizedUrl = url.length > 120 ? `${url.slice(0, 117)}...` : url;
  return `${DEAD_LINK_PREFIX} verify context for ${subject}. Last known URL: ${sanitizedUrl}`;
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  const seen = new Set();
  const result = [];
  for (const tag of tags) {
    if (typeof tag !== 'string') continue;
    const trimmed = collapseWhitespace(tag);
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
  }
  return result;
}

function backfillAlt(record, stats) {
  const original = typeof record.alt === 'string' ? record.alt : '';
  const sanitized = sanitizeSimple(original);
  if (sanitized) {
    if (sanitized !== original) {
      record.alt = sanitized;
      stats.altSanitized += 1;
      return true;
    }
    record.alt = sanitized;
    return false;
  }

  const candidates = [record.caption, record.title, record.ocrText, describeFromFilename(record.file ?? '')];
  for (const candidate of candidates) {
    const cleaned = sanitizeSimple(candidate ?? '');
    if (cleaned) {
      record.alt = cleaned;
      stats.altBackfilled += 1;
      return true;
    }
  }

  const placeholder = buildAltPlaceholder(record);
  record.alt = placeholder;
  stats.altPlaceholders += 1;
  return true;
}

function backfillCaption(record, stats) {
  const original = typeof record.caption === 'string' ? record.caption : '';
  const sanitized = sanitizeSimple(original);
  if (sanitized) {
    if (sanitized !== original) {
      record.caption = sanitized;
      stats.captionSanitized += 1;
      return true;
    }
    record.caption = sanitized;
    return false;
  }

  const candidates = [record.alt, record.title, record.ocrText, describeFromFilename(record.file ?? '')];
  for (const candidate of candidates) {
    const cleaned = sanitizeSimple(candidate ?? '');
    if (cleaned && !cleaned.startsWith(ALT_PLACEHOLDER_PREFIX)) {
      record.caption = cleaned;
      stats.captionBackfilled += 1;
      return true;
    }
  }

  const placeholder = buildCaptionPlaceholder(record);
  record.caption = placeholder;
  stats.captionPlaceholders += 1;
  return true;
}

function sanitizeStrings(record, stats) {
  let changed = false;
  const fields = ['title', 'credit', 'type'];
  for (const field of fields) {
    const original = record[field];
    if (typeof original === 'string') {
      const sanitized = sanitizeSimple(original);
      if (sanitized !== original) {
        record[field] = sanitized;
        stats.fieldSanitized += 1;
        changed = true;
      }
    }
  }

  if (typeof record.sourceUrl === 'string') {
    const sanitized = sanitizeUrl(record.sourceUrl);
    if (sanitized !== record.sourceUrl) {
      record.sourceUrl = sanitized;
      stats.fieldSanitized += 1;
      changed = true;
    }
  }

  if (typeof record.ocrText === 'string') {
    const sanitized = sanitizeMultiline(record.ocrText);
    if (sanitized !== record.ocrText) {
      record.ocrText = sanitized;
      stats.fieldSanitized += 1;
      changed = true;
    }
  }

  if (typeof record.file === 'string') {
    const sanitized = record.file.trim();
    if (sanitized !== record.file) {
      record.file = sanitized;
      stats.fieldSanitized += 1;
      changed = true;
    }
  }

  return changed;
}

function sanitizeTags(record, stats) {
  const normalized = normalizeTags(record.tags);
  const originalJson = JSON.stringify(record.tags ?? []);
  const normalizedJson = JSON.stringify(normalized);
  if (normalizedJson !== originalJson) {
    record.tags = normalized;
    stats.tagsNormalized += 1;
    return true;
  }
  return false;
}

async function probeUrl(url, timeoutMs) {
  const fetcher = typeof fetch === 'function' ? fetch : undiciFetch;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetcher(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (response.status === 405 || response.status === 501) {
      if (response.body) {
        try { await response.body.cancel(); } catch (_) { /* ignore */ }
      }
      response = await fetcher(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { Range: 'bytes=0-0' },
      });
    }
    if (response.body) {
      try { await response.body.cancel(); } catch (_) { /* ignore */ }
    }
    return { ok: response.ok, status: response.status, statusText: response.statusText };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  } finally {
    clearTimeout(timeout);
  }
}

async function flagDeadLinks(records, options, stats) {
  const queue = new PQueue({ concurrency: options.concurrency });
  const flagged = [];
  let checked = 0;
  for (const record of records) {
    const url = typeof record.sourceUrl === 'string' ? record.sourceUrl : '';
    if (!url) continue;
    if (!/^https?:\/\//i.test(url)) {
      const note = buildDeadLinkNote(record, url);
      flagged.push({
        id: record.id,
        file: record.file,
        sourceUrl: url,
        reason: 'invalid_protocol',
        placeholderCaption: note,
      });
      if (!record.caption || record.caption.startsWith(CAPTION_PLACEHOLDER_PREFIX)) {
        record.caption = note;
        stats.deadLinkCaptionApplied += 1;
      }
      stats.deadLinks += 1;
      continue;
    }

    checked += 1;
    queue.add(async () => {
      const result = await probeUrl(url, options.timeout);
      if (!result.ok) {
        const note = buildDeadLinkNote(record, url);
        const entry = {
          id: record.id,
          file: record.file,
          sourceUrl: url,
          status: result.status,
          statusText: result.statusText,
          error: result.error,
          placeholderCaption: note,
          placeholderAlt: buildAltPlaceholder(record),
        };
        flagged.push(entry);
        if (!record.caption || record.caption.startsWith(CAPTION_PLACEHOLDER_PREFIX) || record.caption.startsWith(DEAD_LINK_PREFIX)) {
          record.caption = note;
          stats.deadLinkCaptionApplied += 1;
        }
        if (record.alt && record.alt.startsWith(ALT_PLACEHOLDER_PREFIX)) {
          record.alt = buildAltPlaceholder(record);
        }
        stats.deadLinks += 1;
      }
    });
  }

  await queue.onIdle();
  return { flagged, checked };
}

async function writeMetadata(records) {
  const payload = `${JSON.stringify(records, null, 2)}\n`;
  await fs.writeFile(PRIMARY_PATH, payload, 'utf8');
  try {
    await fs.access(BACKEND_PATH);
    await fs.writeFile(BACKEND_PATH, payload, 'utf8');
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      throw err;
    }
  }
}

function summarizeFlagged(flagged) {
  if (!flagged.length) return;
  console.log('\nDead link report:');
  flagged.slice().sort((a, b) => String(a.id).localeCompare(String(b.id))).forEach((entry) => {
    const parts = [
      ` - ${entry.id || '<no-id>'}`,
      entry.file ? `(${entry.file})` : '',
      entry.sourceUrl ? ` => ${entry.sourceUrl}` : '',
    ].filter(Boolean);
    console.log(parts.join(' '));
    if (entry.status || entry.error || entry.reason) {
      const status = entry.reason || [entry.status, entry.statusText].filter(Boolean).join(' ');
      if (status) {
        console.log(`   status: ${status}`);
      }
    }
    console.log(`   caption suggestion: ${entry.placeholderCaption}`);
    if (entry.placeholderAlt) {
      console.log(`   alt suggestion: ${entry.placeholderAlt}`);
    }
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const stats = {
    altSanitized: 0,
    altBackfilled: 0,
    altPlaceholders: 0,
    captionSanitized: 0,
    captionBackfilled: 0,
    captionPlaceholders: 0,
    fieldSanitized: 0,
    tagsNormalized: 0,
    recordsUpdated: 0,
    deadLinks: 0,
    deadLinkCaptionApplied: 0,
  };

  const records = await loadMetadata(PRIMARY_PATH);
  console.log(`Loaded ${records.length} metadata records.`);

  for (const record of records) {
    let changed = false;
    changed = sanitizeStrings(record, stats) || changed;
    changed = sanitizeTags(record, stats) || changed;
    changed = backfillAlt(record, stats) || changed;
    changed = backfillCaption(record, stats) || changed;
    if (changed) {
      stats.recordsUpdated += 1;
    }
  }

  let flagged = [];
  if (options.skipLinkCheck) {
    console.log('Skipping sourceUrl checks (per --skip-link-check).');
  } else {
    console.log('Probing sourceUrl entries for dead links...');
    const { flagged: dead, checked } = await flagDeadLinks(records, options, stats);
    flagged = dead;
    console.log(`Checked ${checked} links; flagged ${dead.length}.`);
  }

  console.log('\nSummary:');
  console.log(` - Records updated: ${stats.recordsUpdated}`);
  console.log(` - Alt sanitized: ${stats.altSanitized}`);
  console.log(` - Alt backfilled: ${stats.altBackfilled}`);
  console.log(` - Alt placeholders: ${stats.altPlaceholders}`);
  console.log(` - Caption sanitized: ${stats.captionSanitized}`);
  console.log(` - Caption backfilled: ${stats.captionBackfilled}`);
  console.log(` - Caption placeholders: ${stats.captionPlaceholders}`);
  console.log(` - Dead links flagged: ${stats.deadLinks}`);
  if (stats.deadLinkCaptionApplied) {
    console.log(` - Dead link captions applied: ${stats.deadLinkCaptionApplied}`);
  }

  if (flagged.length) {
    summarizeFlagged(flagged);
  }

  if (options.write) {
    await writeMetadata(records);
    console.log('\nMetadata updated.');
  } else {
    console.log('\nDry run complete (no files written). Pass --write to persist changes.');
  }
}

main().catch((err) => {
  console.error('Migration failed:', err?.message || err);
  process.exitCode = 1;
});
