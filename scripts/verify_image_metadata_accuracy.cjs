#!/usr/bin/env node
/*
 * Image-vs-metadata accuracy verifier.
 *
 * For each entry in the merged image metadata file, send the actual image AND
 * its current metadata to Gemini and ask it to flag anything in the metadata
 * that is NOT supported by the image (invented dates, wrong topic, made-up
 * labels, etc.).
 *
 * Writes:
 *   reports/image_metadata_accuracy.json
 *
 * Usage:
 *   node scripts/verify_image_metadata_accuracy.cjs                # all
 *   node scripts/verify_image_metadata_accuracy.cjs --limit=5
 *   node scripts/verify_image_metadata_accuracy.cjs --subjects="Social Studies"
 *   node scripts/verify_image_metadata_accuracy.cjs --from-audit reports/image_metadata_non_strong.json
 *
 * Requires GOOGLE_API_KEY in .env (same key used by tools/generateImageMetadata.js).
 */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { GoogleGenerativeAI } = require('@google/generative-ai');

const ROOT = path.resolve(__dirname, '..');
const META_PATH = path.join(
  ROOT,
  'backend',
  'data',
  'image_metadata_final.json'
);
const IMAGE_DIR = path.join(ROOT, 'frontend', 'public', 'images');
const OUT_DIR = path.join(ROOT, 'reports');
const OUT_PATH = path.join(OUT_DIR, 'image_metadata_accuracy.json');

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_API_KEY missing from environment.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const args = process.argv.slice(2);
function flag(name, def) {
  const m = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!m) return def;
  if (m.includes('=')) return m.split('=').slice(1).join('=');
  // --limit 5 form
  const idx = args.indexOf(`--${name}`);
  if (idx >= 0 && args[idx + 1] && !args[idx + 1].startsWith('--')) {
    return args[idx + 1];
  }
  return true;
}

const limit = Number(flag('limit', '0')) || 0;
const subjectsRaw = String(flag('subjects', ''));
const subjects = subjectsRaw
  ? subjectsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  : null;
const fromAudit = flag('from-audit', '');

function detectMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  return 'image/jpeg';
}

function fileToPart(filePath) {
  const data = fs.readFileSync(filePath);
  return {
    inlineData: {
      data: data.toString('base64'),
      mimeType: detectMimeType(filePath),
    },
  };
}

const PROMPT = `You are auditing the metadata that another AI wrote for the attached image.

I will give you the image and a JSON metadata block. Your job is to identify anything in the metadata that is NOT visibly supported by the image. Be strict but fair.

Look for:
- "topic-mismatch": the metadata is about a different image / different subject than what is actually shown.
- "invented-detail": specific dates, names, numbers, captions, regions, or values that appear in the metadata but are NOT visible in the image.
- "wrong-detail": a detail that is in the image but described incorrectly (e.g., wrong year, wrong country, wrong axis label).
- "missing-key-element": a prominent visible element (title, axis label, legend category, named figure, caption, large region) that is missing from visualElements/extractedText/detailedDescription.
- "vague-seed": questionSeeds that don't reference a specific visible element by name.
- "ungrounded-directive": usageDirectives that allow question moves the image cannot actually support.

Return ONLY this JSON shape, no prose, no markdown:
{
  "verdict": "matches" | "minor-issues" | "major-issues" | "topic-mismatch",
  "confidence": 0.0,
  "issues": [
    { "type": "...", "field": "altText|detailedDescription|extractedText|visualElements|keywords|questionSeeds|usageDirectives|category", "detail": "short explanation of the specific problem" }
  ],
  "missingElements": ["short noun phrases for prominent visible items the metadata omits"],
  "summary": "one short sentence overall judgement"
}

Verdict guidance:
- "matches": metadata is fully supported by the image; minor wording quibbles only.
- "minor-issues": a few small inaccuracies or omissions but the metadata is on-topic.
- "major-issues": multiple invented or wrong details, or a critical omission that would lead to bad questions.
- "topic-mismatch": the metadata describes a different image entirely.`;

async function verifyOne(entry) {
  const fileName = entry.fileName;
  const subject = entry.subject;
  const subjectFolder = subject;
  const abs = path.join(IMAGE_DIR, subjectFolder, fileName);
  if (!fs.existsSync(abs)) {
    return {
      subject,
      fileName,
      verdict: 'missing-file',
      issues: [],
      summary: 'image file not found on disk',
    };
  }

  const blob = {
    fileName: entry.fileName,
    subject: entry.subject,
    category: entry.category,
    altText: entry.altText,
    detailedDescription: entry.detailedDescription,
    extractedText: entry.extractedText,
    visualElements: entry.visualElements,
    keywords: entry.keywords,
    questionSeeds: entry.questionSeeds,
    usageDirectives: entry.usageDirectives,
  };

  const promptParts = [
    PROMPT,
    `Metadata to verify:\n${JSON.stringify(blob, null, 2)}`,
    fileToPart(abs),
  ];

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), 60000)
  );
  let result;
  try {
    result = await Promise.race([model.generateContent(promptParts), timeout]);
  } catch (e) {
    return {
      subject,
      fileName,
      verdict: 'error',
      issues: [],
      summary: `request failed: ${e.message}`,
    };
  }
  const text = (await result.response)
    .text()
    .replace(/```json|```/g, '')
    .trim();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      subject,
      fileName,
      verdict: 'parse-error',
      raw: text.slice(0, 400),
      summary: 'model did not return valid JSON',
    };
  }
  return { subject, fileName, ...parsed };
}

function loadFromAudit(p) {
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  const list = Array.isArray(raw)
    ? raw
    : raw.priorityQueue || raw.entries || raw.refs || [];
  const set = new Set();
  for (const r of list) {
    if (!r) continue;
    const subject = r.subject;
    const fileName = r.fileName;
    if (subject && fileName) set.add(`${subject}/${fileName}`);
  }
  return set;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
  let entries = Array.isArray(data) ? data : Object.values(data);

  if (subjects) {
    const sset = new Set(subjects.map((s) => s.toLowerCase()));
    entries = entries.filter((e) =>
      sset.has(String(e.subject || '').toLowerCase())
    );
  }
  if (fromAudit) {
    const allowed = loadFromAudit(
      path.resolve(process.cwd(), String(fromAudit))
    );
    entries = entries.filter((e) => allowed.has(`${e.subject}/${e.fileName}`));
  }
  if (limit > 0) entries = entries.slice(0, limit);

  console.log(`Verifying ${entries.length} image(s)...`);

  const results = [];
  let i = 0;
  for (const e of entries) {
    i += 1;
    process.stdout.write(
      `[${i}/${entries.length}] ${e.subject}/${e.fileName} ... `
    );
    const r = await verifyOne(e);
    results.push(r);
    console.log(r.verdict || 'unknown');
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const summary = {
    total: results.length,
    matches: results.filter((r) => r.verdict === 'matches').length,
    minor: results.filter((r) => r.verdict === 'minor-issues').length,
    major: results.filter((r) => r.verdict === 'major-issues').length,
    topicMismatch: results.filter((r) => r.verdict === 'topic-mismatch').length,
    errors: results.filter((r) =>
      ['error', 'parse-error', 'missing-file'].includes(r.verdict)
    ).length,
  };
  fs.writeFileSync(
    OUT_PATH,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), summary, results },
      null,
      2
    )
  );
  console.log('\nSummary:', summary);
  console.log('Wrote', path.relative(ROOT, OUT_PATH).replace(/\\/g, '/'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
