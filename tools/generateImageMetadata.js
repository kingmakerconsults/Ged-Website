import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const IMAGE_DIR = path.resolve(__dirname, '../frontend/public/images');
const METADATA_FILE = path.resolve(
  __dirname,
  '../backend/image_metadata_final.json'
);

const PROMPT = `You are labeling images for a GED learning platform.
You will receive one image at a time.
Return only valid JSON. No markdown, no backticks.
Your job is to make the image easy for other AIs to find and turn into questions.

Important safety rules:
- Do NOT quote long passages of text from the image.
- For extractedText: only include short labels (max ~200 characters total). If the image contains a paragraph/article, summarize it instead and set extractedText to "".
- If you are uncertain about transcription or it might be copyrighted, set extractedText to "".

Output exactly this JSON shape:
{
  "fileName": "",
  "subject": "",
  "category": "",
  "altText": "",
  "detailedDescription": "",
  "extractedText": "",
  "visualElements": [],
  "keywords": [],
  "questionSeeds": [],
  "usageDirectives": ""
}

Field rules:
- fileName: set to the actual image filename.
- subject: one of "Math", "Science", "Social Studies", "RLA", or "" if unknown.
- category: short folder-style label like "graphs", "tables", "biology-diagrams", "civics-documents", or "".
- altText: <= 125 characters, literal description of the image.
- detailedDescription: 2–4 sentences explaining the layout and purpose.
- extractedText: transcribe any visible text in order.
- visualElements: array naming important parts you see.
- keywords: 6–15 search terms mixing subject and visual terms.
- questionSeeds: 2–5 short instructions other AIs can turn into questions; make them depend on the image.
- usageDirectives: short note like "Use for data-interpretation questions at easy/medium level."

If something is missing in the image, leave "" or [].
Return only the JSON object.`;

const SAFE_PROMPT = `You are labeling images for a GED learning platform.
You will receive one image at a time.
Return only valid JSON. No markdown, no backticks.

Important safety rules:
- Do NOT quote or transcribe text from the image.
- Always set extractedText to "".
- If the image appears to contain a passage/article/document, describe it generally without copying.

Output exactly this JSON shape:
{
  "fileName": "",
  "subject": "",
  "category": "",
  "altText": "",
  "detailedDescription": "",
  "extractedText": "",
  "visualElements": [],
  "keywords": [],
  "questionSeeds": [],
  "usageDirectives": ""
}

Field rules:
- fileName: set to the actual image filename.
- subject: one of "Math", "Science", "Social Studies", "RLA", or "" if unknown.
- category: short folder-style label like "graphs", "tables", "biology-diagrams", "civics-documents", or "".
- altText: <= 125 characters, literal description of the image.
- detailedDescription: 2–4 sentences explaining the layout and purpose.
- extractedText: must be "".
- visualElements: array naming important parts you see.
- keywords: 6–15 search terms mixing subject and visual terms.
- questionSeeds: 2–5 short instructions other AIs can turn into questions; make them depend on the image.
- usageDirectives: short note like "Use for data-interpretation questions at easy/medium level."

If something is missing in the image, leave "" or [].
Return only the JSON object.`;

function parseArgs(argv) {
  const out = {
    refresh: argv.includes('--refresh'),
    limit: null,
    subjects: null,
    fromAudit: null,
    only: null,
    safe: argv.includes('--safe'),
  };

  const limitIdx = argv.indexOf('--limit');
  if (limitIdx >= 0) {
    const raw = argv[limitIdx + 1];
    const n = Number(raw);
    if (Number.isFinite(n) && n > 0) out.limit = Math.floor(n);
  }

  const subjIdx = argv.indexOf('--subjects');
  if (subjIdx >= 0) {
    const raw = String(argv[subjIdx + 1] || '').trim();
    if (raw) {
      out.subjects = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  const auditIdx = argv.indexOf('--from-audit');
  if (auditIdx >= 0) {
    const raw = String(argv[auditIdx + 1] || '').trim();
    if (raw) out.fromAudit = raw;
  }

  const onlyIdx = argv.indexOf('--only');
  if (onlyIdx >= 0) {
    const raw = String(argv[onlyIdx + 1] || '').trim();
    if (raw) {
      out.only = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return out;
}

function normalizeOnlyToken(token) {
  const cleaned = String(token || '')
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
  if (!cleaned) return null;
  const parts = cleaned.split('/').filter(Boolean);
  if (parts.length >= 2) {
    const subject = normalizeSubjectName(parts[0]);
    const fileName = parts.slice(1).join('/');
    return { subject, fileName };
  }
  return { subject: null, fileName: cleaned };
}

function detectMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  return null;
}

async function fileToGenerativePart(filePath) {
  const data = await fs.readFile(filePath);
  const mimeType = detectMimeType(filePath) || 'image/jpeg';
  return {
    inlineData: {
      data: data.toString('base64'),
      mimeType,
    },
  };
}

function stripMarkdown(text) {
  return text.replace(/```json/g, '').replace(/```/g, '');
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function normalizeSubjectName(raw) {
  const s = String(raw || '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!s) return '';
  if (/^social\s*studies$/i.test(s) || /^socialstudies$/i.test(s))
    return 'Social Studies';
  if (/^rla$/i.test(s)) return 'RLA';
  if (/^math$/i.test(s)) return 'Math';
  if (/^science$/i.test(s)) return 'Science';
  return s;
}

function inferSubjectFromPath(p) {
  const clean = String(p || '')
    .replace(/\\/g, '/')
    .toLowerCase();
  if (clean.includes('/science/')) return 'Science';
  if (clean.includes('/math/')) return 'Math';
  if (clean.includes('/rla/')) return 'RLA';
  if (clean.includes('/social studies/') || clean.includes('/social_studies/'))
    return 'Social Studies';
  return '';
}

function makeKey(subject, fileName) {
  return `${normalizeSubjectName(subject)}/${String(fileName || '').trim()}`;
}

function makeBaseEntryFromImagePath(imagePath) {
  const fileName = path.basename(imagePath);
  const subjectMatch = imagePath.match(
    /[\\/](Math|Science|Social Studies|RLA)[\\/]/
  );
  const subject = normalizeSubjectName(
    subjectMatch ? subjectMatch[1] : inferSubjectFromPath(imagePath)
  );
  return {
    fileName,
    subject,
    filePath: `/images/${encodeURIComponent(subject)}/${encodeURIComponent(
      fileName
    )}`.replace(/%2F/g, '/'),
    category: '',
    altText: '',
    detailedDescription: '',
    extractedText: '',
    visualElements: [],
    keywords: [],
    questionSeeds: [],
    usageDirectives: '',
  };
}

async function buildImageListFromAudit(auditPath) {
  const raw = await fs.readFile(auditPath, 'utf8');
  const parsed = safeJsonParse(raw);
  const refs = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.refs)
    ? parsed.refs
    : [];

  const unique = new Set();
  const files = [];

  for (const r of refs) {
    const url = String(r?.url || r?.imageUrl || '').trim();
    if (!url) continue;

    // Normalize protocol-relative and legacy forms
    const cleaned = url
      .replace(/^https?:\/\/[^/]+/i, '')
      .replace(/^\/\//, '/')
      .replace(/^\/frontend\/\/images\//i, '/images/')
      .replace(/^\/frontend\/(?:Images|images)\//i, '/images/')
      .replace(/^\/?(?:Images|images)\//i, '/images/');

    if (!cleaned.toLowerCase().startsWith('/images/')) continue;

    const parts = cleaned.split('/').filter(Boolean);
    // [images, Subject, filename]
    if (parts.length < 3) continue;
    const subject = normalizeSubjectName(decodeURIComponent(parts[1]));
    const fileName = decodeURIComponent(parts.slice(2).join('/'));
    const abs = path.join(IMAGE_DIR, subject, fileName);
    const key = makeKey(subject, path.basename(fileName));
    if (unique.has(key)) continue;
    unique.add(key);
    files.push(abs);
  }

  return files;
}

async function generateMetadataForImage(imagePath) {
  try {
    const timeoutPromise = new Promise(
      (_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 60000) // 60 second timeout
    );

    const imageParts = [await fileToGenerativePart(imagePath)];
    const generationPromise = model.generateContent([PROMPT, ...imageParts]);

    const result = await Promise.race([generationPromise, timeoutPromise]);

    const response = await result.response;
    const text = response.text();
    return JSON.parse(stripMarkdown(text));
  } catch (error) {
    console.error(
      `Failed to process ${path.basename(imagePath)}: ${error.message}`
    );
    return null;
  }
}

async function generateMetadataForImageWithPrompt(imagePath, prompt) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 60000)
    );

    const imageParts = [await fileToGenerativePart(imagePath)];
    const generationPromise = model.generateContent([prompt, ...imageParts]);
    const result = await Promise.race([generationPromise, timeoutPromise]);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(stripMarkdown(text));
  } catch (error) {
    console.error(
      `Failed to process ${path.basename(imagePath)}: ${error.message}`
    );
    return null;
  }
}

function normalizeMetadata(metadata, imagePath) {
  const fileName = path.basename(imagePath);
  const subjectMatch = imagePath.match(
    /[\\/](Math|Science|Social Studies|RLA)[\\/]/
  );
  const subject = subjectMatch
    ? subjectMatch[1]
    : inferSubjectFromPath(imagePath);
  const normalizedSubject = normalizeSubjectName(metadata.subject || subject);

  const normalized = {
    fileName: fileName,
    subject: normalizedSubject,
    filePath: `/images/${encodeURIComponent(
      normalizedSubject
    )}/${encodeURIComponent(fileName)}`.replace(/%2F/g, '/'),
    category: metadata.category || '',
    altText: metadata.altText || '',
    detailedDescription: metadata.detailedDescription || '',
    extractedText: metadata.extractedText || '',
    visualElements: metadata.visualElements || [],
    keywords: metadata.keywords || [],
    questionSeeds: metadata.questionSeeds || [],
    usageDirectives: metadata.usageDirectives || '',
  };

  return normalized;
}

async function main() {
  const args = parseArgs(process.argv);
  const refresh = args.refresh;
  let metadata = {};

  try {
    const data = await fs.readFile(METADATA_FILE, 'utf-8');
    const existingMetadata = safeJsonParse(data);
    if (Array.isArray(existingMetadata)) {
      existingMetadata.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        const fileName = item.fileName || '';
        const subject = normalizeSubjectName(
          item.subject || inferSubjectFromPath(item.filePath)
        );
        if (!fileName || !subject) return;
        metadata[makeKey(subject, fileName)] = item;
      });
    } else {
      metadata = existingMetadata;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error reading metadata file:', error);
      return;
    }
    // File doesn't exist, will create a new one
  }

  const imageFiles = [];
  if (args.fromAudit) {
    const from = path.resolve(process.cwd(), args.fromAudit);
    const fromList = await buildImageListFromAudit(from);
    for (const p of fromList) imageFiles.push(p);
  } else {
    const subjectFolders = await fs.readdir(IMAGE_DIR);
    for (const subject of subjectFolders) {
      const subjectPath = path.join(IMAGE_DIR, subject);
      if ((await fs.stat(subjectPath)).isDirectory()) {
        if (Array.isArray(args.subjects) && args.subjects.length > 0) {
          const normalized = String(subject).toLowerCase();
          const allowed = args.subjects.some(
            (s) => String(s).toLowerCase() === normalized
          );
          if (!allowed) continue;
        }
        const files = await fs.readdir(subjectPath);
        for (const file of files) {
          imageFiles.push(path.join(subjectPath, file));
        }
      }
    }
  }

  if (args.limit) {
    imageFiles.splice(args.limit);
  }

  if (Array.isArray(args.only) && args.only.length > 0) {
    const tokens = args.only.map(normalizeOnlyToken).filter(Boolean);

    const byFile = new Set(
      tokens
        .filter((t) => !t.subject)
        .map((t) => String(t.fileName).toLowerCase())
    );
    const bySubjectFile = new Set(
      tokens
        .filter((t) => t.subject)
        .map(
          (t) =>
            `${String(t.subject).toLowerCase()}/${String(
              t.fileName
            ).toLowerCase()}`
        )
    );

    const filtered = imageFiles.filter((p) => {
      const fileName = path.basename(p).toLowerCase();
      const subjectMatch = p.match(
        /[\\/](Math|Science|Social Studies|RLA)[\\/]/
      );
      const subject = subjectMatch ? subjectMatch[1] : inferSubjectFromPath(p);
      const key = `${String(subject).toLowerCase()}/${fileName}`;
      return byFile.has(fileName) || bySubjectFile.has(key);
    });

    imageFiles.splice(0, imageFiles.length, ...filtered);
  }

  let updatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const failedImages = [];

  for (const imagePath of imageFiles) {
    const fileName = path.basename(imagePath);
    const subjectMatch = imagePath.match(
      /[\\/](Math|Science|Social Studies|RLA)[\\/]/
    );
    const subject = subjectMatch
      ? subjectMatch[1]
      : inferSubjectFromPath(imagePath);
    const key = makeKey(subject, fileName);

    if (metadata[key] && !refresh) {
      skippedCount++;
      continue;
    }

    console.log(`Processing ${fileName}...`);
    const prompt = args.safe ? SAFE_PROMPT : PROMPT;
    const generatedMetadata = await generateMetadataForImageWithPrompt(
      imagePath,
      prompt
    );

    if (generatedMetadata) {
      const normalized = normalizeMetadata(generatedMetadata, imagePath);
      const outKey = makeKey(normalized.subject, normalized.fileName);
      const prev = metadata[outKey];
      // preserve stable fields if present
      if (prev && prev.id) normalized.id = prev.id;
      if (prev && prev.sha1) normalized.sha1 = prev.sha1;
      if (prev && prev.width !== undefined) normalized.width = prev.width;
      if (prev && prev.height !== undefined) normalized.height = prev.height;
      metadata[outKey] = { ...(prev || {}), ...normalized };
      updatedCount++;
    } else {
      failedCount++;
      failedImages.push(`${subject}/${fileName}`);

      // Always ensure we have at least a base entry for this image
      const base = makeBaseEntryFromImagePath(imagePath);
      const outKey = makeKey(base.subject, base.fileName);
      const prev = metadata[outKey];
      metadata[outKey] = { ...(prev || {}), ...base };
    }
  }

  const metadataArray = Object.values(metadata).sort((a, b) => {
    const sa = String(a.subject || '').toLowerCase();
    const sb = String(b.subject || '').toLowerCase();
    if (sa < sb) return -1;
    if (sa > sb) return 1;
    const fa = String(a.fileName || '').toLowerCase();
    const fb = String(b.fileName || '').toLowerCase();
    return fa.localeCompare(fb);
  });
  await fs.writeFile(METADATA_FILE, JSON.stringify(metadataArray, null, 2));

  console.log('\n--- Metadata Generation Summary ---');
  console.log(`Total images found: ${imageFiles.length}`);
  console.log(`Successfully processed: ${updatedCount}`);
  console.log(`Skipped (existing): ${skippedCount}`);
  console.log(`Failed to process: ${failedCount}`);
  if (failedCount > 0) {
    console.log('Failed images:', failedImages);
  }
  console.log('-----------------------------------');
  console.log(
    "\nNote: The root-level 'image_metadata_final.json' is a duplicate and is not used by the server. The canonical file is in the 'backend' directory."
  );
}

main();
