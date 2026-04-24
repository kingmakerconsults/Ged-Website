import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Don't crash the long-running batch on a stray rejection (e.g. a stale timeout
// that fires after Promise.race already settled).
process.on('unhandledRejection', (reason) => {
  console.error(
    'Unhandled rejection (continuing):',
    reason && reason.message ? reason.message : reason
  );
});

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
Your job is to make the image easy for other AIs to retrieve, understand, and turn into grounded questions.

Important grounding rules:
- Describe only what is visibly supported by the image.
- Do NOT invent symbolic meaning, hidden causes, unlabeled regions, unlabeled values, or context that is not shown.
- Do NOT quote long passages of text from the image.
- For extractedText: include only short visible labels, titles, headers, legends, or captions. Keep the total around 200 characters or less.
- If the image contains a paragraph, article, worksheet, or anything copyright-sensitive, summarize it in detailedDescription and set extractedText to "".
- If you are uncertain about transcription, set extractedText to "".

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
- altText: 1 sentence, <= 125 characters, literal and concrete.
- detailedDescription: 2 to 4 sentences. Sentence 1 should identify the image type and main topic. Sentence 2 should describe the layout or major sections. Remaining sentences should mention visible labels, values, arrows, legends, headers, regions, speakers, or other concrete evidence that question generation can rely on.
- extractedText: visible labels only, in reading order, never a long passage.
- visualElements: 4 to 12 concrete nouns or short noun phrases.
- keywords: 6 to 15 terms mixing subject concepts, visual type, and important labels.
- questionSeeds: 2 to 5 short instructions for other AIs. Each one must depend on visible evidence in the image, such as a labeled part, bar, row, region, caption, or date.
- usageDirectives: 1 or 2 sentences naming allowed question moves and any important limits. Example: "Use for comparing labeled bar values and identifying the highest category. Do not ask about causes or trends that are not explicitly shown."

Image-type guidance:
- Charts and graphs: name the chart type, axes or units, legend or series, and the compared categories or values.
- Tables: mention headers, rows, columns, units, and any notable labeled cells.
- Maps: mention the region, labeled or shaded areas, boundaries, routes, and legend or key if present.
- Diagrams: mention labeled parts, arrows, stages, layers, inputs, or outputs.
- Documents, posters, and cartoons: mention the document type, headline or caption, visible speakers or symbols, and any short labels or dates that can be safely referenced.
- Photos: mention the subject, setting, visible objects or actions, and any signage if present.

If something is missing in the image, leave "" or [].
Return only the JSON object.`;

const SAFE_PROMPT = `You are labeling images for a GED learning platform.
You will receive one image at a time.
Return only valid JSON. No markdown, no backticks.

Important grounding rules:
- Describe only what is visibly supported by the image.
- Do NOT quote or transcribe text from the image.
- Always set extractedText to "".
- If the image appears to contain a passage, article, worksheet, letter, or document, describe it generally without copying text.

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
- altText: 1 sentence, <= 125 characters, literal and concrete.
- detailedDescription: 2 to 4 sentences naming the image type, layout, and the concrete evidence a question writer can rely on without quoting the source.
- extractedText: must be "".
- visualElements: 4 to 12 concrete nouns or short noun phrases.
- keywords: 6 to 15 terms mixing subject concepts, visual type, and important visible features.
- questionSeeds: 2 to 5 short instructions for other AIs that stay tightly tied to visible evidence.
- usageDirectives: 1 or 2 sentences naming allowed question moves and explicit limits.

If something is missing in the image, leave "" or [].
Return only the JSON object.`;

const STRONG_PROMPT = `You are labeling images for a GED learning platform.
You will receive one image at a time.
The metadata you produce is the ONLY context another AI will see when it writes a quiz question about this image. If your description is vague, the resulting questions will be vague or wrong. Be concrete, specific, and image-grounded.

Return only valid JSON. No markdown, no backticks.

Grounding rules:
- Describe only what is visibly supported by the image. Never invent dates, names, values, or context that is not shown.
- Prefer specific named entities, dated events, axis labels, legend categories, region names, and visible numbers over generic words like "chart" or "document".
- For extractedText: include short visible labels, titles, headers, legend entries, axis labels, captions, speech bubbles, and signage in reading order. Aim for ~250 characters; never quote a full passage or paragraph.
- If the image contains a passage, article, worksheet, or copyright-sensitive paragraph, summarize it in detailedDescription and set extractedText to "".
- If you are uncertain about a transcription, omit it rather than guess.

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
  "allowedActions": [],
  "forbiddenActions": [],
  "usageDirectives": ""
}

Field rules (REQUIRED minimums — outputs that fall short will be rejected):
- fileName: actual image filename.
- subject: one of "Math", "Science", "Social Studies", "RLA".
- category: lowercase hyphenated tag like "political-cartoons", "historical-maps", "bar-graphs", "biology-diagrams", "civics-tables". Use only ONE category.
- altText: 1 sentence, 60-125 characters, literal and concrete (mention the image type and main subject by name).
- detailedDescription: 4 to 7 sentences, total length 280-700 characters. Sentence 1 names the image type and primary subject (with date, region, or named entity if visible). Sentence 2 describes the layout or major sections. Remaining sentences must reference concrete visible evidence: labeled parts, legend entries, axis units, specific values or rows, named figures, captions, dates, arrows, or symbols. A reader who has not seen the image must be able to picture what is on it.
- extractedText: short visible labels in reading order, never a full passage. May be "" only if the image truly has no readable text.
- visualElements: 8 to 14 concrete noun phrases naming distinct things in the image (e.g., "x-axis labeled 'Year'", "red curve", "caption: 'Join, or Die.'", "Mississippi River", "Uncle Sam figure"). Avoid duplicates.
- keywords: 10 to 18 terms mixing subject concepts, the visual type, named entities, dates, and important labels. Lowercase preferred.
- questionSeeds: 5 to 7 short instructions for another AI. EACH seed must reference a specific visible element by name ("Compare the 1860 and 1900 bars for cotton exports", not "Compare the bars"). Avoid generic prompts like "Discuss the topic".
- allowedActions: 2 to 5 short tags from this set when applicable: "data-interpretation", "label-identification", "trend-analysis", "comparison", "calculation", "primary-source-analysis", "symbolism-analysis", "cause-effect-from-image", "map-region-identification", "diagram-part-identification", "caption-quote-analysis".
- forbiddenActions: 1 to 3 short tags naming question moves the image cannot support, e.g. "causes-not-shown", "events-after-depicted-date", "unlabeled-region-comparison".
- usageDirectives: 1 to 2 sentences naming what the image is good for and the most important limit. Reference visible features.

Image-type guidance:
- Charts/graphs: name chart type, axes with units, legend categories, time range, and at least one specific value or comparison visible.
- Tables: name headers, row count, units, and at least one notable cell or row.
- Maps: name the region, year/era, shaded categories, key boundaries or routes, and labeled cities or countries.
- Diagrams: name labeled parts, arrows, stages, layers, inputs/outputs.
- Political cartoons / posters / documents: name the publication, date or era if visible, depicted figures by name, captions and speech, and the symbolic devices actually drawn.
- Photos: name the depicted people/objects, setting, era cues, signage, and any visible captions.

Return only the JSON object.`;

function parseArgs(argv) {
  const out = {
    refresh: argv.includes('--refresh'),
    limit: null,
    subjects: null,
    fromAudit: null,
    only: null,
    safe: argv.includes('--safe'),
    strong: argv.includes('--strong'),
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

function normalizeTextField(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateText(value, maxLength) {
  const normalized = normalizeTextField(value);
  if (!maxLength || normalized.length <= maxLength) return normalized;
  return normalized.slice(0, maxLength).trim();
}

function normalizeStringArray(values, maxItems) {
  if (!Array.isArray(values)) return [];
  const seen = new Set();
  const out = [];
  for (const value of values) {
    const normalized = normalizeTextField(value);
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalized);
    if (maxItems && out.length >= maxItems) break;
  }
  return out;
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

  const unique = new Set();
  const files = [];

  function addImagePathFromRecord(record) {
    if (!record || typeof record !== 'object') return;

    const rawUrl = String(
      record.filePath || record.url || record.imageUrl || ''
    ).trim();
    if (rawUrl) {
      const cleaned = rawUrl
        .replace(/^https?:\/\/[^/]+/i, '')
        .replace(/^\/\//, '/')
        .replace(/^\/frontend\/\/images\//i, '/images/')
        .replace(/^\/frontend\/(?:Images|images)\//i, '/images/')
        .replace(/^\/?(?:Images|images)\//i, '/images/');

      if (cleaned.toLowerCase().startsWith('/images/')) {
        const parts = cleaned.split('/').filter(Boolean);
        if (parts.length >= 3) {
          const subject = normalizeSubjectName(decodeURIComponent(parts[1]));
          const fileName = decodeURIComponent(parts.slice(2).join('/'));
          const abs = path.join(IMAGE_DIR, subject, fileName);
          const key = makeKey(subject, path.basename(fileName));
          if (!unique.has(key)) {
            unique.add(key);
            files.push(abs);
          }
        }
        return;
      }
    }

    const subject = normalizeSubjectName(record.subject || '');
    const fileName = normalizeTextField(record.fileName);
    if (!subject || !fileName) return;
    const abs = path.join(IMAGE_DIR, subject, fileName);
    const key = makeKey(subject, path.basename(fileName));
    if (unique.has(key)) return;
    unique.add(key);
    files.push(abs);
  }

  const refs = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.refs)
      ? parsed.refs
      : Array.isArray(parsed?.priorityQueue)
        ? parsed.priorityQueue
        : Array.isArray(parsed?.entries)
          ? parsed.entries
          : [];

  for (const r of refs) {
    addImagePathFromRecord(r);
  }

  return files;
}

async function generateMetadataForImage(imagePath) {
  let timeoutId;
  try {
    const timeoutPromise = new Promise(
      (_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Request timed out')), 60000);
      }
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
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

async function generateMetadataForImageWithPrompt(imagePath, prompt) {
  let timeoutId;
  try {
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('Request timed out')), 60000);
    });

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
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function normalizeCategoryTag(value) {
  return normalizeTextField(value)
    .toLowerCase()
    .replace(/\s*,\s*/g, ' ')
    .replace(/[^a-z0-9\- ]+/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeMetadata(metadata, imagePath, opts = {}) {
  const strong = !!opts.strong;
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
    category: normalizeCategoryTag(metadata.category || ''),
    altText: truncateText(metadata.altText || '', 160),
    detailedDescription: truncateText(
      metadata.detailedDescription || '',
      strong ? 1200 : 700
    ),
    extractedText: truncateText(
      metadata.extractedText || '',
      strong ? 400 : 240
    ),
    visualElements: normalizeStringArray(
      metadata.visualElements || [],
      strong ? 16 : 12
    ),
    keywords: normalizeStringArray(metadata.keywords || [], strong ? 20 : 15),
    questionSeeds: normalizeStringArray(
      metadata.questionSeeds || [],
      strong ? 7 : 5
    ),
    usageDirectives: truncateText(metadata.usageDirectives || '', 320),
  };

  if (strong) {
    normalized.allowedActions = normalizeStringArray(
      metadata.allowedActions || [],
      6
    ).map((s) => s.toLowerCase());
    normalized.forbiddenActions = normalizeStringArray(
      metadata.forbiddenActions || [],
      4
    ).map((s) => s.toLowerCase());
  }

  return normalized;
}

// Strong-tier acceptance floors. Used to decide whether to retry the model with
// a corrective follow-up prompt and to flag entries that should be re-run.
function strongTierIssues(entry) {
  const issues = [];
  const desc = String(entry.detailedDescription || '').trim();
  const alt = String(entry.altText || '').trim();
  const ve = Array.isArray(entry.visualElements) ? entry.visualElements : [];
  const kw = Array.isArray(entry.keywords) ? entry.keywords : [];
  const qs = Array.isArray(entry.questionSeeds) ? entry.questionSeeds : [];
  const aa = Array.isArray(entry.allowedActions) ? entry.allowedActions : [];
  const ud = String(entry.usageDirectives || '').trim();

  if (alt.length < 40)
    issues.push(`altText too short (${alt.length} chars; need >=40)`);
  if (desc.length < 280)
    issues.push(
      `detailedDescription too short (${desc.length} chars; need >=280)`
    );
  if (ve.length < 8)
    issues.push(`visualElements too few (${ve.length}; need >=8)`);
  if (kw.length < 10) issues.push(`keywords too few (${kw.length}; need >=10)`);
  if (qs.length < 5)
    issues.push(`questionSeeds too few (${qs.length}; need >=5)`);
  if (aa.length < 2)
    issues.push(`allowedActions too few (${aa.length}; need >=2)`);
  if (!ud) issues.push('usageDirectives missing');
  // Each seed must reference a specific visible element. We approximate that by
  // requiring more than just a verb + topic word.
  const vagueSeeds = qs.filter((s) => String(s).trim().split(/\s+/).length < 6);
  if (vagueSeeds.length > 0)
    issues.push(`${vagueSeeds.length} questionSeed(s) too short/vague`);
  // Description should mention at least one specific anchor: a digit, a Proper
  // Noun phrase, or a quoted label.
  const hasAnchor =
    /\d/.test(desc) ||
    /[A-Z][a-z]+(?:\s+[A-Z][a-z]+)/.test(desc) ||
    /"[^"]+"|'[^']+'/.test(desc);
  if (!hasAnchor)
    issues.push(
      'detailedDescription lacks a concrete anchor (date, named entity, or quoted label)'
    );
  return issues;
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

    // In --strong mode, skip entries that already meet the strong-tier floors
    // even when --refresh is set. This makes the long batch resumable: if it
    // crashes mid-run, we can re-invoke and only the still-non-strong entries
    // will be re-processed.
    if (args.strong && metadata[key] && strongTierIssues(metadata[key]).length === 0) {
      skippedCount++;
      continue;
    }

    console.log(`Processing ${fileName}...`);
    const prompt = args.safe
      ? SAFE_PROMPT
      : args.strong
        ? STRONG_PROMPT
        : PROMPT;
    let generatedMetadata = await generateMetadataForImageWithPrompt(
      imagePath,
      prompt
    );

    if (generatedMetadata && args.strong) {
      const tentative = normalizeMetadata(generatedMetadata, imagePath, {
        strong: true,
      });
      const issues = strongTierIssues(tentative);
      if (issues.length > 0) {
        console.log(
          `  Retry: strong-tier floors not met (${issues.join('; ')})`
        );
        const retryPrompt = `${STRONG_PROMPT}\n\nYour previous attempt for this image fell short of the strong-tier requirements. Specific problems:\n- ${issues.join('\n- ')}\n\nRegenerate the JSON for THIS image. Add more specific visible evidence (named entities, dates, axis labels, legend categories, quoted captions, specific values). Do not invent details that are not in the image. Return only the JSON object.`;
        const retry = await generateMetadataForImageWithPrompt(
          imagePath,
          retryPrompt
        );
        if (retry) generatedMetadata = retry;
      }
    }

    if (generatedMetadata) {
      const normalized = normalizeMetadata(generatedMetadata, imagePath, {
        strong: !!args.strong,
      });
      const inputKey = key;
      const outKey = makeKey(normalized.subject, normalized.fileName);
      // If the model reclassified the subject, force the saved entry to the
      // folder-derived subject so we don't orphan the original metadata under a
      // mismatched key. The folder is the source of truth for where the image
      // actually lives on disk.
      if (outKey !== inputKey) {
        console.log(
          `  Note: model returned subject "${normalized.subject}" but image lives under "${subject}"; keeping folder-derived subject.`
        );
        normalized.subject = subject;
        normalized.filePath = `/images/${encodeURIComponent(
          subject
        )}/${encodeURIComponent(normalized.fileName)}`.replace(/%2F/g, '/');
      }
      const finalKey = makeKey(normalized.subject, normalized.fileName);
      const prev = metadata[finalKey];
      // preserve stable fields if present
      if (prev && prev.id) normalized.id = prev.id;
      if (prev && prev.sha1) normalized.sha1 = prev.sha1;
      if (prev && prev.width !== undefined) normalized.width = prev.width;
      if (prev && prev.height !== undefined) normalized.height = prev.height;
      metadata[finalKey] = { ...(prev || {}), ...normalized };
      if (args.strong) {
        const finalIssues = strongTierIssues(metadata[finalKey]);
        if (finalIssues.length > 0) {
          console.log(
            `  Note: still short of strong floors after retry: ${finalIssues.join('; ')}`
          );
        }
      }
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

    // Incremental save every 5 processed images so a mid-batch crash doesn't
    // discard hours of work.
    if ((updatedCount + failedCount) % 5 === 0) {
      try {
        const arr = Object.values(metadata).sort((a, b) => {
          const sa = String(a.subject || '').toLowerCase();
          const sb = String(b.subject || '').toLowerCase();
          if (sa < sb) return -1;
          if (sa > sb) return 1;
          return String(a.fileName || '')
            .toLowerCase()
            .localeCompare(String(b.fileName || '').toLowerCase());
        });
        await fs.writeFile(METADATA_FILE, JSON.stringify(arr, null, 2));
      } catch (e) {
        console.error('  (incremental save failed:', e.message, ')');
      }
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
