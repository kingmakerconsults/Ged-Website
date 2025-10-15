import { fetch } from 'undici';
import sharp from 'sharp';
import { fileTypeFromBuffer } from 'file-type';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const MIN_WIDTH = 640;
const MIN_HEIGHT = 480;
const VALID_MIMES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/tiff',
  'image/svg+xml'
]);

async function detectMime(buffer, headerMime) {
  if (headerMime && VALID_MIMES.has(headerMime)) {
    return headerMime;
  }
  const detected = await fileTypeFromBuffer(buffer);
  if (detected?.mime && VALID_MIMES.has(detected.mime)) {
    return detected.mime;
  }
  const sample = buffer.slice(0, 1024).toString('utf8');
  if (/\<svg[\s>]/i.test(sample)) {
    return 'image/svg+xml';
  }
  if (headerMime && VALID_MIMES.has(headerMime)) {
    return headerMime;
  }
  return null;
}

function ensureDir(dirPath) {
  return fs.mkdir(dirPath, { recursive: true });
}

async function readBodyLimited(response) {
  const chunks = [];
  let total = 0;
  for await (const chunk of response.body) {
    total += chunk.length;
    if (total > MAX_BYTES) {
      throw new Error(`Image exceeds max size (${total} bytes)`);
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function normalizeBuffer(buffer, mime) {
  const baseOptions = { failOnError: true, pages: 1 };
  if (mime === 'image/svg+xml') {
    baseOptions.density = 300;
  }
  const base = sharp(buffer, baseOptions);
  const metadata = await base.metadata();
  if (metadata.pages && metadata.pages > 1) {
    throw new Error('Animated image not supported');
  }
  let pipeline = base.clone().rotate();
  if (mime === 'image/png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else {
    pipeline = pipeline.png({ compressionLevel: 9 });
  }
  const output = await pipeline.toBuffer();
  const finalMeta = await sharp(output).metadata();
  return { buffer: output, metadata: finalMeta };
}

function guessDominantType(stats, metadata) {
  const totalEntropy = stats.channels.reduce((sum, channel) => sum + (channel.entropy ?? 0), 0);
  const avgEntropy = stats.channels.length ? totalEntropy / stats.channels.length : 0;
  const ratio = metadata.width && metadata.height ? metadata.width / metadata.height : 1;

  if (avgEntropy < 2.2) {
    if (ratio >= 0.9 && ratio <= 1.4) {
      return 'table';
    }
    return 'chart';
  }
  if (avgEntropy < 3) {
    if (ratio >= 0.8 && ratio <= 1.25) {
      return 'diagram';
    }
    return 'chart';
  }
  if (avgEntropy < 3.6) {
    return 'map';
  }
  return 'photo';
}

export function createSha1(buffer) {
  return crypto.createHash('sha1').update(buffer).digest('hex');
}

export async function downloadAndNormalize(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'GedGovHarvester/1.0 (+https://example.com)' },
    redirect: 'follow'
  });
  if (!response.ok) {
    throw new Error(`Failed to download image: HTTP ${response.status}`);
  }
  const contentTypeHeader = response.headers.get('content-type');
  const headerMime = contentTypeHeader ? contentTypeHeader.split(';')[0].trim().toLowerCase() : undefined;
  if (headerMime === 'image/gif') {
    throw new Error('GIF images are not supported');
  }
  const buffer = await readBodyLimited(response);
  const mime = await detectMime(buffer, headerMime);
  if (!mime || !VALID_MIMES.has(mime)) {
    throw new Error(`Unable to determine allowed MIME type (${mime || headerMime || 'unknown'})`);
  }
  const { buffer: normalized, metadata } = await normalizeBuffer(buffer, mime);
  if (!metadata.width || !metadata.height) {
    throw new Error('Unable to detect image dimensions');
  }
  if (metadata.width < MIN_WIDTH || metadata.height < MIN_HEIGHT) {
    throw new Error(`Image below minimum dimensions: ${metadata.width}x${metadata.height}`);
  }
  const ratio = metadata.width / metadata.height;
  if (!Number.isFinite(ratio) || ratio < 0.5 || ratio > 2) {
    throw new Error(`Image outside allowed aspect ratio (${metadata.width}x${metadata.height})`);
  }
  const stats = await sharp(normalized).stats();
  const dominantType = guessDominantType(stats, metadata);
  return {
    buffer: normalized,
    width: metadata.width,
    height: metadata.height,
    dominantType
  };
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80) || 'image';
}

function shortSha(sha1) {
  return sha1.slice(0, 8);
}

export async function decideFileName(meta, targetDir) {
  const base = slugify(meta.sourceTitle || meta.alt || meta.pageTitle || 'image');
  const candidate = `${base}_${shortSha(meta.sha1)}.png`;
  const filePath = path.join(targetDir, candidate);
  try {
    await fs.access(filePath);
    return `${base}_${shortSha(meta.sha1)}_${Date.now()}.png`;
  } catch (err) {
    return candidate;
  }
}

export async function writeImage(buffer, filePath, dryRun = false) {
  if (dryRun) return filePath;
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, buffer);
  return filePath;
}
