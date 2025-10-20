// server.js (Updated Version)

const path = require('path');
// Only use dotenv for local development. Render will provide environment variables in production.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
const MODEL_HTTP_TIMEOUT_MS = Number(process.env.MODEL_HTTP_TIMEOUT_MS) || 90000;
const COMPREHENSIVE_TIMEOUT_MS = 480000;
const http = axios.create({ timeout: MODEL_HTTP_TIMEOUT_MS });

function selectModelTimeoutMs({ examType } = {}) {
    return examType === 'comprehensive' ? COMPREHENSIVE_TIMEOUT_MS : MODEL_HTTP_TIMEOUT_MS;
}

function nowNs() { return process.hrtime.bigint(); }
function toMs(nsDiff) { return Number(nsDiff) / 1e6; }

async function timed(label, fn) {
    const start = nowNs();
    try {
        const data = await fn();
        const ms = toMs(nowNs() - start);
        console.log(`[AI][OK] ${label} in ${Math.round(ms)} ms`);
        return { data, ms };
    } catch (err) {
        const ms = toMs(nowNs() - start);
        console.warn(`[AI][FAIL] ${label} after ${Math.round(ms)} ms: ${err?.message}`);
        throw Object.assign(err, { elapsedMs: ms });
    }
}

function logGenerationDuration(examType, subject, startMs, status = 'completed') {
    if (!startMs) return;
    const elapsed = Date.now() - startMs;
    const label = `${examType || 'standard'}:${subject || 'unknown'}`;
    console.log(`[${label}] Generation ${status} in ${elapsed}ms`);
}

// Rolling latency (last 200)
const AI_LATENCY = {
    buf: [],
    push(ms) { this.buf.push(ms); if (this.buf.length > 200) this.buf.shift(); },
    stats() {
        const arr = [...this.buf].sort((a, b) => a - b);
        if (!arr.length) return { count: 0, p50: 0, p95: 0, p99: 0, avg: 0 };
        const q = (p) => arr[Math.min(arr.length - 1, Math.floor((p / 100) * (arr.length - 1)))];
        const sum = arr.reduce((s, v) => s + v, 0);
        return { count: arr.length, p50: q(50), p95: q(95), p99: q(99), avg: sum / arr.length };
    }
};

const GEMINI_SOFT_TIMEOUT_MS = Number(process.env.GEMINI_SOFT_TIMEOUT_MS) || 70000;
const FALLBACK_TIMEOUT_MS = Number(process.env.FALLBACK_TIMEOUT_MS) || 35000;

function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function raceGeminiWithDelayedFallback({ primaryFn, fallbackFn, primaryModelName = 'primary', fallbackModelName = 'fallback' }) {
    let resolved = false;
    let winner = null;
    let latencyMs = 0;
    const fallbackConfigured = fallbackModelName === 'chatgpt'
        ? Boolean(process.env.OPENAI_API_KEY)
        : true;

    const primaryPromise = timed(`${primaryModelName}:topic`, primaryFn)
        .then(({ data, ms }) => {
            if (!resolved) {
                resolved = true;
                winner = { model: primaryModelName, data, ms };
            }
        })
        .catch((err) => {
            if (!resolved) {
                console.warn(`[AI] ${primaryModelName} error:`, err?.message);
                if (!fallbackConfigured) {
                    resolved = true;
                    winner = { model: `${primaryModelName}-error`, error: err, ms: err?.elapsedMs ?? 0 };
                }
            }
        });

    const fallbackStarter = (async () => {
        await delay(GEMINI_SOFT_TIMEOUT_MS);
        if (resolved) return;
        if (!fallbackConfigured) return;
        try {
            const r = await timed(`${fallbackModelName}:fallback`, fallbackFn);
            if (!resolved) {
                resolved = true;
                winner = { model: fallbackModelName, data: r.data, ms: r.ms };
            }
        } catch (err) {
            if (!resolved) {
                console.warn(`[AI] ${fallbackModelName} fallback failed:`, err?.message);
            }
        }
    })();

    const hardCap = delay(MODEL_HTTP_TIMEOUT_MS).then(() => {
        if (!resolved) {
            resolved = true;
            winner = { model: 'timeout', data: null, ms: MODEL_HTTP_TIMEOUT_MS };
        }
    });

    while (!winner) {
        await delay(25);
    }

    try {
        await Promise.race([primaryPromise, fallbackStarter, hardCap]);
    } catch (err) {
        console.warn('[AI] race drain error:', err?.message);
    }

    latencyMs = winner.ms ?? 0;
    return { winner, latencyMs };
}
const fs = require('fs');

let IMAGE_DB = [];
const IMAGE_BY_PATH = new Map();

function rebuildImagePathIndex() {
    IMAGE_BY_PATH.clear();
    for (const im of Array.isArray(IMAGE_DB) ? IMAGE_DB : []) {
        if (!im || typeof im !== 'object') continue;
        const rawPath = im.filePath || im.src || im.path;
        if (typeof rawPath !== 'string' || !rawPath) continue;
        const clean = rawPath.replace(/^\/frontend/i, '');
        if (!clean) continue;
        const normalized = clean.startsWith('/') ? clean : `/${clean}`;
        IMAGE_BY_PATH.set(normalized, im);
        IMAGE_BY_PATH.set(normalized.slice(1), im);
        IMAGE_BY_PATH.set(rawPath, im);
    }
}

try {
    const raw = fs.readFileSync(path.join(__dirname, 'image_metadata_final.json'), 'utf8');
    IMAGE_DB = JSON.parse(raw);
} catch (e) {
    console.warn('Image metadata not loaded:', e.message);
    try {
        const fallbackRaw = fs.readFileSync(path.join(__dirname, 'data', 'image_metadata_final.json'), 'utf8');
        IMAGE_DB = JSON.parse(fallbackRaw);
    } catch (fallbackErr) {
        console.warn('Fallback image metadata not loaded:', fallbackErr.message);
    }
}

rebuildImagePathIndex();
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const OpenAI = require('openai');
const { buildGeometrySchema, SUPPORTED_SHAPES } = require('./schemas/geometrySchema');
const {
    GeometryJsonError,
    parseGeometryJson,
    SANITIZER_FEATURE_ENABLED,
    DEFAULT_MAX_DECIMALS
} = require('./utils/geometryJson');
const normalizeLatex = (text) => text;
const { fetchApproved } = require('./src/fetch/fetcher');
const { requireAuth, adminBypassLogin, setAuthCookie } = require('./src/middleware/auth');
const { adminPreviewBypass } = require('./src/middleware/adminBypass');
const { sanitizeExamObject, sanitizeField } = require('./src/lib/sanitizeExamText');
const {
    generateMathExamTwoPass,
    VALIDATOR_SYSTEM_PROMPT,
    VALIDATOR_USER_PROMPT
} = require('./src/services/mathTwoPass');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const openaiClient = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

function isTimeoutError(err) {
    if (!err) return false;
    if (err.name === 'AbortError') return true;
    if (err.code === 'ECONNABORTED') return true;
    if (err.code === 'ECONNRESET') return true;
    const message = String(err.message || err).toLowerCase();
    return message.includes('timeout') || message.includes('socket hang up');
}

// --- begin local retry helper ---
async function withRetry(fn, {
    retries = 3,
    factor = 2,
    minTimeout = 600,   // ms
    maxTimeout = 5000,  // ms
    onFailedAttempt = () => {}
} = {}) {
    let attempt = 0;
    let delay = minTimeout;
    while (true) {
        try {
            return await fn();
        } catch (err) {
            attempt++;
            await onFailedAttempt(err, attempt);
            if (attempt > retries) throw err;

            let adjustedDelay = delay;
            if (isTimeoutError(err)) {
                adjustedDelay = Math.min(delay * 1.5, maxTimeout);
            }

            const boundedDelay = Math.min(Math.max(adjustedDelay, minTimeout), maxTimeout);
            const jitterFactor = 0.8 + Math.random() * 0.4; // jitter between 80% and 120%
            const waitMs = Math.min(
                Math.max(Math.round(boundedDelay * jitterFactor), minTimeout),
                maxTimeout
            );

            await new Promise((r) => setTimeout(r, waitMs));
            delay = Math.min(Math.max(adjustedDelay * factor, minTimeout), maxTimeout);
        }
    }
}
// --- end local retry helper ---

const GEOMETRY_FIGURES_ENABLED = String(process.env.GEOMETRY_FIGURES_ENABLED || '').toLowerCase() === 'true';
const MATH_TWO_PASS_ENABLED = String(process.env.MATH_TWO_PASS_ENABLED || 'true').toLowerCase() === 'true';

if (!GEOMETRY_FIGURES_ENABLED) {
    console.info('Geometry figures disabled (GEOMETRY_FIGURES_ENABLED=false); using text-only diagram descriptions.');
}

function extractJSONArray(raw) {
    if (typeof raw !== 'string') return null;
    const bs = raw.indexOf('<BEGIN_JSON>');
    const es = raw.lastIndexOf('<END_JSON>');
    let body = (bs !== -1 && es !== -1) ? raw.slice(bs + 12, es) : raw;
    const first = body.indexOf('[');
    const last = body.lastIndexOf(']');
    if (first === -1 || last === -1 || last <= first) return null;
    try {
        return JSON.parse(body.slice(first, last + 1));
    } catch {
        return null;
    }
}

function parseGeminiResponse(data) {
    if (!data) return null;
    const parts = data?.candidates?.[0]?.content?.parts;
    let text = '';
    if (Array.isArray(parts)) {
        text = parts.map((part) => (typeof part?.text === 'string' ? part.text : '')).join('').trim();
    }
    if (!text && typeof data?.candidates?.[0]?.content?.parts?.[0]?.text === 'string') {
        text = data.candidates[0].content.parts[0].text;
    }
    if (typeof text !== 'string' || !text.trim()) return null;
    return extractJSONArray(text);
}

function parseOpenAIResponse(data) {
    if (!data) return null;
    let text = typeof data?.output_text === 'string' ? data.output_text : '';
    if (!text && Array.isArray(data?.output)) {
        const msg = data.output.find((entry) => Array.isArray(entry?.content));
        if (msg) {
            text = msg.content
                .map((chunk) => (typeof chunk?.text === 'string' ? chunk.text : ''))
                .join('')
                .trim();
        }
    }
    if (!text && Array.isArray(data?.choices)) {
        text = data.choices
            .map((choice) => choice?.message?.content)
            .filter((val) => typeof val === 'string')
            .join('')
            .trim();
    }
    if (typeof text !== 'string' || !text.trim()) return null;
    const json = extractJSONArray(text);
    if (json) return json;
    try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed;
        if (Array.isArray(parsed?.items)) return parsed.items;
        if (Array.isArray(parsed?.questions)) return parsed.questions;
        if (Array.isArray(parsed?.data)) return parsed.data;
    } catch (err) {
        return null;
    }
    return null;
}

// Count words and clamp politely at boundary (keeps punctuation)
function limitWords(text, max = 250) {
    if (typeof text !== 'string') return text;
    const words = text.trim().split(/\s+/);
    if (words.length <= max) return text.trim();
    const clipped = words.slice(0, max).join(' ');
    return /[.?!]$/.test(clipped) ? clipped : clipped + '…';
}

// Apply to any fields that can contain long prose (e.g., passage/stem)
function enforceWordCapsOnItem(item, subject) {
    const out = JSON.parse(JSON.stringify(item));

    if (subject === 'RLA') {
        if (out.passage) out.passage = limitWords(out.passage, 250);
    }

    if (out.passage) out.passage = limitWords(out.passage, 250);
    if (out.questionText) out.questionText = limitWords(out.questionText, 250);

    return out;
}

function humanizeSource(value) {
    if (typeof value !== 'string') {
        if (value == null) return '';
        value = String(value);
    }

    const trimmed = value.trim();
    if (!trimmed) return '';

    if (/^https?:\/\//i.test(trimmed)) {
        try {
            const url = new URL(trimmed);
            return url.hostname.replace(/^www\./i, '');
        } catch (err) {
            return trimmed;
        }
    }

    if (trimmed.length > 80) {
        return `${trimmed.slice(0, 77)}…`;
    }

    return trimmed;
}

function imageDisplayCredit(filePathOrKey) {
    if (!filePathOrKey) return '';
    const key = String(filePathOrKey).replace(/^\s+|\s+$/g, '').replace(/^\/frontend/i, '');
    if (!key) return '';

    const normalized = key.startsWith('/') ? key : `/${key}`;
    const meta = IMAGE_BY_PATH.get(normalized)
        || IMAGE_BY_PATH.get(normalized.slice(1))
        || IMAGE_BY_PATH.get(String(filePathOrKey))
        || null;

    if (!meta || typeof meta !== 'object') return '';

    const creditCandidate = meta.credit
        || meta.source
        || meta.attribution
        || meta.origin
        || meta.title
        || meta.altText
        || meta.license
        || meta.licenseUrl
        || '';

    return humanizeSource(creditCandidate);
}

function normalizeStimulusAndSource(item) {
    if (!item || typeof item !== 'object') return item;

    const out = {
        ...item,
        stimulusImage: item?.stimulusImage && typeof item.stimulusImage === 'object'
            ? { ...item.stimulusImage }
            : item?.stimulusImage
    };

    const rawSrc = (out?.stimulusImage?.src || out?.imageUrl || out?.imageURL || '').trim();

    if (rawSrc) {
        const cleanSrc = rawSrc.replace(/^\/frontend/i, '');
        const normalizedSrc = cleanSrc
            ? (cleanSrc.startsWith('/') ? cleanSrc : `/${cleanSrc}`)
            : '';
        out.imageUrl = normalizedSrc;
        out.stimulusImage = {
            ...(out.stimulusImage || {}),
            src: normalizedSrc
        };

        const assetBase = (out.asset && typeof out.asset === 'object') ? { ...out.asset } : {};
        assetBase.imagePath = normalizedSrc;

        const credit = imageDisplayCredit(rawSrc);
        if (credit) {
            assetBase.displaySource = credit;
            out.source = credit;
            out.displaySource = credit;
        }

        const currentSource = typeof out.source === 'string' ? out.source.trim() : '';
        const sourceLooksLikePath = currentSource && /^\/?(frontend\/)?images?/i.test(currentSource);
        if (!credit && sourceLooksLikePath) {
            delete out.source;
        }

        out.asset = assetBase;
    }

    if (!rawSrc && typeof out.source === 'string') {
        const sourceTrimmed = out.source.trim();
        const credit = imageDisplayCredit(sourceTrimmed);
        const looksLikePath = /^\/?(frontend\/)?images?/i.test(sourceTrimmed);
        if (credit) {
            out.source = credit;
            out.displaySource = credit;
            const assetBase = (out.asset && typeof out.asset === 'object') ? { ...out.asset } : {};
            assetBase.displaySource = credit;
            out.asset = assetBase;
        } else if (looksLikePath) {
            delete out.source;
        }
    }

    if (out.asset && out.displaySource && !out.asset.displaySource) {
        out.asset.displaySource = out.displaySource;
    }

    if (out.source) {
        const friendlyExisting = humanizeSource(out.source);
        if (friendlyExisting) {
            out.source = friendlyExisting;
        } else {
            delete out.source;
        }
    }

    return out;
}

const QuestionSchema = {
    type: 'object',
    required: ['id', 'questionType', 'questionText'],
    properties: {
        id: { type: ['string', 'number'] },
        questionType: { enum: ['standalone', 'freeResponse'] },
        questionText: { type: 'string' },
        answerOptions: {
            type: 'array',
            items: {
                type: 'object',
                required: ['text'],
                properties: {
                    text: { type: 'string' },
                    isCorrect: { type: ['boolean', 'null'] },
                    rationale: { type: ['string', 'null'] }
                }
            },
            default: []
        }
    },
    additionalProperties: true
};

const validateQuestion = ajv.compile(QuestionSchema);

const OPENAI_QUESTION_JSON_SCHEMA = {
    name: 'Question',
    schema: {
        type: 'object',
        required: ['id', 'questionType', 'questionText'],
        additionalProperties: true,
        properties: {
            id: { type: ['string', 'number'] },
            questionType: { type: 'string', enum: ['standalone', 'freeResponse'] },
            questionText: { type: 'string' },
            answerOptions: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['text'],
                    properties: {
                        text: { type: 'string' },
                        isCorrect: { type: ['boolean', 'null'] },
                        rationale: { type: ['string', 'null'] }
                    }
                },
                default: []
            }
        }
    }
};

const SCIENTIFIC_NUMERACY_SCHEMA = {
    type: 'object',
    properties: {
        questions: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    questionNumber: { type: 'integer' },
                    passage: {
                        type: 'string',
                        description: 'A passage containing scientific context. It can include HTML for tables (<table>) or text descriptions of charts and graphs. All math formulas should use LaTeX inside single dollar signs (e.g., $d = \\frac{m}{V}$).'
                    },
                    question: {
                        type: 'string',
                        description: 'The question based on the passage. Can use <strong> tags for emphasis.'
                    },
                    answerOptions: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                text: { type: 'string' },
                                rationale: { type: 'string', description: 'A clear explanation for why this option is correct or incorrect.' },
                                isCorrect: { type: 'boolean' }
                            },
                            required: ['text', 'rationale', 'isCorrect']
                        }
                    }
                },
                required: ['questionNumber', 'passage', 'question', 'answerOptions']
            }
        }
    },
    required: ['questions']
};

const SIMPLE_CHOICE_JSON_SCHEMA = {
    type: 'object',
    additionalProperties: true,
    required: ['text'],
    properties: {
        text: { type: 'string' },
        isCorrect: { type: ['boolean', 'null'] },
        rationale: { type: ['string', 'null'] }
    }
};

const MATH_CORRECTNESS_JSON_SCHEMA = {
    name: 'MathCorrectness',
    schema: {
        type: 'object',
        required: ['fixes'],
        additionalProperties: false,
        properties: {
            fixes: {
                type: 'array',
                default: [],
                items: {
                    type: 'object',
                    required: ['index', 'question'],
                    additionalProperties: true,
                    properties: {
                        index: { type: 'integer', minimum: 0 },
                        reason: { type: 'string' },
                        question: {
                            type: 'object',
                            additionalProperties: true,
                            required: ['questionText'],
                            properties: {
                                questionText: { type: 'string' },
                                answerOptions: {
                                    type: 'array',
                                    items: SIMPLE_CHOICE_JSON_SCHEMA,
                                    default: []
                                },
                                correctAnswer: { type: ['string', 'number', 'null'] },
                                calculator: { type: ['boolean', 'null'] },
                                questionNumber: { type: ['integer', 'string', 'null'] },
                                type: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    }
};

const MATH_CORRECTNESS_SYSTEM_PROMPT = `You are an expert GED math reviewer.
Carefully verify each question in the provided JSON array. For any question with an incorrect solution, invalid math, or unclear wording, rewrite ONLY that question with the fix applied.
Return a JSON object with a "fixes" array. Each element must include:
- "index": zero-based index of the question to replace.
- "question": the fully corrected question object.
- Optional "reason" explaining the change.
Do not include entries for questions that are already correct.`;

function createLimiter(limit) {
    const queue = [];
    let activeCount = 0;

    const next = () => {
        if (!queue.length || activeCount >= limit) {
            return;
        }
        const { task, resolve, reject } = queue.shift();
        activeCount += 1;
        Promise.resolve()
            .then(() => task())
            .then((value) => {
                resolve(value);
            })
            .catch((error) => {
                reject(error);
            })
            .finally(() => {
                activeCount -= 1;
                next();
            });
    };

    return (task) => new Promise((resolve, reject) => {
        queue.push({ task, resolve, reject });
        next();
    });
}

const generationLimit = createLimiter(12);
const repairLimit = createLimiter(12);

const SINGLE_ITEM_REPAIR_SYSTEM = `You will receive ONE question JSON object.
Fix only formatting issues (JSON/LaTeX/currency). Keep meaning the same.

Rules:
- LaTeX macros allowed (\\frac, \\sqrt, \\pi, ^, _) but NO math delimiters ($, $$, \\(, \\[).
- Replace currency symbols with words (e.g., "\\$50" → "50 dollars").
- No HTML or markdown in questionText/rationales.`;

function sanitizeTextKeepLatex(value) {
    if (typeof value !== 'string') {
        return value;
    }

    const normalized = normalizeLatex(value);
    return sanitizeField(normalized, 'latex');
}

function sanitizeQuestionKeepLatex(q) {
    if (!q || typeof q !== 'object') return q;

    const base = {
        ...q,
        answerOptions: Array.isArray(q.answerOptions) ? q.answerOptions.map((opt) => ({ ...opt })) : []
    };

    const sanitized = sanitizeExamObject(base, 'latex');

    if (!Array.isArray(sanitized.answerOptions)) {
        sanitized.answerOptions = [];
    }

    return sanitized;
}

function cloneQuestion(q) {
    if (!q || typeof q !== 'object') return q;
    return {
        ...q,
        answerOptions: Array.isArray(q.answerOptions)
            ? q.answerOptions.map((opt) => ({ ...opt }))
            : q.answerOptions
    };
}

async function repairOneWithOpenAI(original) {
    if (!openaiClient) throw new Error('OPENAI_API_KEY not configured.');

    const run = async () => {
        const resp = await openaiClient.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SINGLE_ITEM_REPAIR_SYSTEM },
                { role: 'user', content: JSON.stringify(original) }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1
        });

        const text = resp.choices[0].message.content;
        return JSON.parse(text);
    };

    return withRetry(run, {
        retries: 2,
        minTimeout: 500,
        maxTimeout: 1500,
        onFailedAttempt: (err, n) => console.warn(`[retry ${n}] OpenAI single-item repair failed: ${err?.message || err}`)
    });
}

function hasForbiddenContent(q) {
    const textBits = [q?.questionText || ''];
    if (Array.isArray(q?.answerOptions)) {
        for (const opt of q.answerOptions) {
            textBits.push(opt?.text || '');
        }
    }
    const s = textBits.join(' ');
    if (/[<](?:table|tr|td|th|thead|tbody|caption)\b/i.test(s)) return true;
    if (/\$\$|\\\[|\\\]|\$(?!\d)/.test(s)) return true;
    if (/\$\s*\d/.test(s)) return true;
    return false;
}

function needsRepairLegacy(q) {
    if (!validateQuestion(q)) return true;
    if (hasForbiddenContent(q)) return true;
    const sanitized = sanitizeQuestionKeepLatex(cloneQuestion(q));
    return JSON.stringify(sanitized) !== JSON.stringify(q);
}

async function repairSubset(questions = []) {
    const out = questions.map((q) => cloneQuestion(q));
    const badIdxs = [];

    questions.forEach((q, i) => {
        if (needsRepairLegacy(q)) badIdxs.push(i);
    });

    if (!badIdxs.length) {
        return { fixed: out, repaired: 0, failures: [] };
    }

    const failures = [];

    await Promise.all(
        badIdxs.map((i) =>
            repairLimit(async () => {
                const original = questions[i];
                try {
                    const payload = JSON.parse(JSON.stringify(original));
                    let fixed = await repairOneWithOpenAI(payload);

                    if (!validateQuestion(fixed)) {
                        throw new Error('Ajv validation failed after repair.');
                    }

                    fixed = sanitizeQuestionKeepLatex(cloneQuestion(fixed));
                    out[i] = fixed;
                } catch (err) {
                    console.error('Repair failed for index', i, err?.message || err);
                    failures.push({ index: i, id: original?.id });
                    out[i] = sanitizeQuestionKeepLatex(cloneQuestion(original));
                }
            })
        )
    );

    return { fixed: out, repaired: badIdxs.length - failures.length, failures };
}

const NON_CALC_COUNT = 12;
const GEOMETRY_COUNT = 12;
const ALGEBRA_COUNT = 12;

const STRICT_JSON_HEADER_MATH = `SYSTEM: Return ONLY JSON, no prose/markdown. Wrap between <BEGIN_JSON> and <END_JSON>.
Each item schema:
{
  "id": "<unique string>",
  "questionType": "standalone" | "freeResponse",
  "questionText": "Plain English with LaTeX commands allowed (e.g., \\frac{1}{2}, \\sqrt{9}, \\le, \\ge, \\pi). DO NOT use math delimiters ($, $$, \\(, \\[). DO NOT use HTML.",
  "answerOptions": [{"text":"...","isCorrect":true|false,"rationale":"..."}] // omit for freeResponse
}
Hard rules:
- LaTeX commands allowed (\\frac, \\sqrt, \\le, etc.), but NO math delimiters ($, $$, \\(, \\[).
- Currency: do NOT use $; write “USD 12.50” or “12.50 dollars”.
- No HTML or markdown tables. Describe any table verbally in questionText.
- Ensure braces balance in \\frac{...}{...} and \\sqrt{...}. No custom macros.
- If a passage/stimulus is used, it MUST be <= 250 words.
- Exactly N items; top-level is a JSON array only.`;

const STRICT_JSON_HEADER_SHARED = `SYSTEM: Return ONLY JSON, no prose/markdown. Wrap output between <BEGIN_JSON> and <END_JSON>.
Each item schema:
{
  "id": string | number,
  "questionType": "standalone" | "freeResponse",
  "passage"?: string,
  "questionText": string,
  "answerOptions": [{"text":string,"isCorrect":boolean,"rationale":string}],
  "itemType"?: "passage" | "image" | "standalone",
  "difficulty"?: "easy" | "medium" | "hard",
  "stimulusImage"?: {"src":string,"alt"?:string},
  "groupId"?: string
}
Hard rules:
- Exactly N items; JSON array only (no trailing text).
- Keep any passage <= 250 words and questionText <= 250 words.
- Ensure exactly one answer option has isCorrect=true when multiple-choice.`;

const TOPIC_STIMULUS_SUBJECTS = new Set(['Science', 'Social Studies', 'Reasoning Through Language Arts (RLA)', 'RLA']);

const STRICT_JSON_HEADER_RLA = `SYSTEM: Output ONLY a compact JSON array of N items (no extra text).
Item schema: {"id":string|number,"questionType":"standalone"|"freeResponse","passage":string?,"questionText":string,"answerOptions":[{"text":string,"isCorrect":boolean,"rationale":string}]}
Rules:
- For RLA comprehensive: each passage MUST be <= 250 words. Prefer 150–230 words.
- Keep questionText concise and targeted; avoid fluff.
- Exactly N items; top-level is JSON array only.`;

const norm = (s) => (s || '').toLowerCase();

function findImagesForSubjectTopic(subject, topic, limit = 5) {
    const s = norm(subject);
    const t = norm(topic);

    // First, try a strict match on both subject and category (topic)
    let pool = IMAGE_DB.filter(img => norm(img.subject).includes(s) && norm(img.category).includes(t));

    // If no strict matches, fall back to searching keywords within the correct subject
    if (pool.length < limit) {
        const subjectPool = IMAGE_DB.filter(img => norm(img.subject).includes(s));
        const keywordMatches = subjectPool.filter(img => {
            const bag = [
                norm(img.altText),
                norm((img.keywords || []).join(' ')),
                norm(img.detailedDescription),
                norm(img.category)
            ].join(' ');
            // Check if any part of the topic name is in the keyword bag
            return t.split(/[\s,&/|]+/g).some(tok => tok && bag.includes(tok));
        });
        // Combine strict matches with keyword matches, avoiding duplicates
        const existingIds = new Set(pool.map(p => p.id));
        keywordMatches.forEach(match => {
            if (!existingIds.has(match.id)) {
                pool.push(match);
            }
        });
    }
    
    // If still nothing, return empty to let the prompt handle it
    if (pool.length === 0) {
        console.warn(`No relevant images found for subject "${subject}" and topic "${topic}".`);
        return [];
    }

    const seen = new Set();
    const out = [];
    for (const img of pool) {
        const key = (img.fileName || '').split('.')[0];
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(img);
        if (out.length >= limit) break;
    }
    return out;
}

function buildImageContextBlock(images = []) {
    if (!images.length) return '';
    const payload = images.map((im, i) => ({
        id: `img${i + 1}`,
        src: im.filePath,
        alt: im.altText || '',
        description: im.detailedDescription || ''
    }));
    return `\nIMAGE_CONTEXT (local files you MUST reference): ${JSON.stringify(payload)}\n`;
}

const SHARED_IMAGE_RULES = `
Image rules:
- Use an image ONLY if it genuinely helps answer the question.
- When you use an image, set "stimulusImage":{"src":"<exact src from IMAGE_CONTEXT>","alt":"<alt from IMAGE_CONTEXT>"} in the JSON item.
- Write the question so the learner must look at the image (interpretation of data, trend, map, symbolism, etc.).
- Do NOT add external links or unknown images. Use only provided local paths.
`;

function buildTopicQuizPrompt(subject, topic, difficulty) {
    const baseHeader = STRICT_JSON_HEADER_SHARED;
    const typeHint = subject === 'Math'
        ? 'math problem-solving, algebra, geometry, word problems'
        : subject === 'RLA'
            ? 'reading comprehension, main idea, inference, tone, grammar'
            : subject === 'Science'
                ? 'data interpretation, experiments, cause and effect, life/earth/physical sciences'
                : 'history, civics, economics, geography, map or chart interpretation';

    const structure = subject === 'Math'
        ? 'a mix of numeric and text-based problems; describe any visuals in text'
        : 'include a 150-250 word passage for at least 4 of the 12 questions; the rest may reference short stimuli or stand-alone questions.';

    const difficultyLine = difficulty ? `\nAim overall difficulty toward a ${difficulty} level.` : '';

    return `${baseHeader}
Generate exactly 12 GED-level ${subject} questions on the topic "${topic}".
Focus on variety and balance:

* 4 passage-based (each <= 250 words)
* 3 image or data-based (describe visuals in text)
* 5 standalone conceptual questions.
Vary difficulty (easy, medium, hard mix).${difficultyLine}
Each question must match the subject focus: ${typeHint}.
${structure}
${SHARED_IMAGE_RULES}`;
}

const SUBJECT_PARAM_ALIASES = new Map([
    ['math', 'Math'],
    ['science', 'Science'],
    ['social studies', 'Social Studies'],
    ['social-studies', 'Social Studies'],
    ['socialstudies', 'Social Studies'],
    ['rla', 'RLA'],
    ['reasoning through language arts', 'RLA'],
    ['reasoning through language arts (rla)', 'RLA'],
    ['reasoning-through-language-arts', 'RLA'],
    ['reasoning-through-language-arts-(rla)', 'RLA']
]);

function normalizeSubjectParam(rawSubject) {
    if (!rawSubject) return null;
    const lower = String(rawSubject).trim().toLowerCase();
    const variants = [
        lower,
        lower.replace(/%20/g, ' '),
        lower.replace(/-/g, ' '),
        lower.replace(/_/g, ' ')
    ];

    for (const variant of variants) {
        const normalized = SUBJECT_PARAM_ALIASES.get(variant);
        if (normalized) return normalized;
    }

    return SUBJECT_PARAM_ALIASES.get(lower) || null;
}

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY;
const GEMINI_URL = GEMINI_API_KEY
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`
    : null;
const OPENAI_URL = 'https://api.openai.com/v1/responses';

async function callGemini(payload, { signal, timeoutMs } = {}) {
    if (!GEMINI_API_KEY || !GEMINI_URL) {
        throw new Error('GOOGLE_API_KEY is not configured.');
    }

    const config = { signal };
    if (timeoutMs) {
        config.timeout = timeoutMs;
    }
    const response = await http.post(GEMINI_URL, payload, config);
    return response.data;
}

async function callChatGPT(payload, { signal, timeoutMs } = {}) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('ChatGPT fallback unavailable: OPENAI_API_KEY not configured.');
    }

    const config = {
        signal,
        timeout: timeoutMs,
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    const response = await http.post(OPENAI_URL, payload, config);
    return response.data;
}

function buildCombinedPrompt_Math(totalCounts) {
    const { NON_CALC_COUNT, GEOMETRY_COUNT, ALGEBRA_COUNT } = totalCounts;
    return `${STRICT_JSON_HEADER_MATH}
Create ONE flat JSON array with ${NON_CALC_COUNT + GEOMETRY_COUNT + ALGEBRA_COUNT} math questions in random order:
- Non-calculator: ${NON_CALC_COUNT}
- Geometry/measurement (describe visuals in text; no images): ${GEOMETRY_COUNT}
- Algebra/functions/data (describe any graph/table in text): ${ALGEBRA_COUNT}
CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$.
For currency, use a single dollar sign like $10.50.
Do NOT include section labels or headings.`;
}

async function generateWithGemini_OneCall(subject, prompt) {
    return generationLimit(async () => {
        const payload = { contents: [{ parts: [{ text: prompt }] }] };
        const raw = await callGemini(payload);
        const arr = parseGeminiResponse(raw);
        if (!Array.isArray(arr)) throw new Error('Invalid JSON from Gemini');
        return arr;
    });
}

const CHATGPT_FALLBACK_SYSTEM_PROMPT = 'You generate GED-style quiz items. Always respond with ONLY a valid JSON array of question objects. Do not include commentary.';

async function generateWithChatGPT_Fallback(subject, prompt, { signal } = {}) {
    return generationLimit(async () => {
        const payload = {
            model: 'gpt-4o-mini',
            temperature: 0.4,
            input: [
                { role: 'system', content: CHATGPT_FALLBACK_SYSTEM_PROMPT },
                { role: 'user', content: prompt }
            ]
        };

        const raw = await callChatGPT(payload, { signal });
        const arr = parseOpenAIResponse(raw);
        if (!Array.isArray(arr)) {
            throw new Error('Invalid JSON from ChatGPT fallback');
        }
        return arr;
    });
}

async function generateQuizItemsWithFallback(subject, prompt, geminiRetryOptions = {}, fallbackRetryOptions = {}) {
    const geminiPayload = { contents: [{ parts: [{ text: prompt }] }] };
    const chatgptPayload = {
        model: 'gpt-4o-mini',
        temperature: 0.4,
        input: [
            { role: 'system', content: CHATGPT_FALLBACK_SYSTEM_PROMPT },
            { role: 'user', content: prompt }
        ]
    };

    const geminiOptions = {
        retries: geminiRetryOptions?.retries ?? 1,
        factor: geminiRetryOptions?.factor ?? 2,
        minTimeout: geminiRetryOptions?.minTimeout ?? 600,
        maxTimeout: geminiRetryOptions?.maxTimeout ?? 3000,
        onFailedAttempt: geminiRetryOptions?.onFailedAttempt
            || ((error, attempt) => console.warn(`[retry ${attempt}] Gemini topic generation failed: ${error?.message || error}`))
    };

    const fallbackOptions = {
        retries: fallbackRetryOptions?.retries ?? 1,
        factor: fallbackRetryOptions?.factor ?? 2,
        minTimeout: fallbackRetryOptions?.minTimeout ?? geminiOptions.minTimeout,
        maxTimeout: fallbackRetryOptions?.maxTimeout ?? geminiOptions.maxTimeout,
        onFailedAttempt: fallbackRetryOptions?.onFailedAttempt
            || ((error, attempt) => console.warn(`[retry ${attempt}] ChatGPT fallback failed: ${error?.message || error}`))
    };

    const runGeminiFn = async () => {
        return await withRetry(
            () => generationLimit(() => callGemini(geminiPayload)),
            geminiOptions
        );
    };

    const runChatGptFn = async () => {
        return await withRetry(
            () => {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort('fallback-timeout'), FALLBACK_TIMEOUT_MS);
                return generationLimit(() => callChatGPT(chatgptPayload, { signal: controller.signal }))
                    .finally(() => clearTimeout(timeout));
            },
            fallbackOptions
        );
    };

    let raceConfig;

    if (subject === 'Math') {
        console.log('[AI Strategy] Using OpenAI as primary for Math.');
        raceConfig = {
            primaryFn: runChatGptFn,
            fallbackFn: runGeminiFn,
            primaryModelName: 'chatgpt',
            fallbackModelName: 'gemini'
        };
    } else {
        console.log(`[AI Strategy] Using Gemini as primary for ${subject}.`);
        raceConfig = {
            primaryFn: runGeminiFn,
            fallbackFn: runChatGptFn,
            primaryModelName: 'gemini',
            fallbackModelName: 'chatgpt'
        };
    }

    const { winner, latencyMs } = await raceGeminiWithDelayedFallback(raceConfig);

    if (winner.model === 'timeout') {
        throw Object.assign(new Error('AI timed out'), { statusCode: 504, latencyMs: MODEL_HTTP_TIMEOUT_MS });
    }

    if (winner.model === `${raceConfig.primaryModelName}-error`) {
        throw winner.error || new Error(`${raceConfig.primaryModelName} failed before fallback could start.`);
    }

    let items = null;
    if (winner.model === 'gemini') {
        items = parseGeminiResponse(winner.data);
    } else if (winner.model === 'chatgpt') {
        items = parseOpenAIResponse(winner.data);
    }

    if (!Array.isArray(items)) {
        throw new Error('Model returned an invalid response format.');
    }

    if (subject === 'Math') {
        items = await applyMathCorrectnessPass(items);
    }

    const roundedLatency = Math.round(latencyMs || 0);
    AI_LATENCY.push(roundedLatency);

    return { items, model: winner.model, latencyMs: roundedLatency };
}

function hasSchemaIssues(item) {
    const hasOptions = Array.isArray(item?.answerOptions) && item.answerOptions.length >= 3;
    const oneCorrect = hasOptions && item.answerOptions.filter((o) => o && o.isCorrect === true).length === 1;
    return !(item && item.questionText && hasOptions && oneCorrect);
}

function needsRepair(item, subject) {
    if (hasSchemaIssues(item)) return true;

    const wordCount = (s) => (typeof s === 'string' ? s.trim().split(/\s+/).length : 0);
    if (subject === 'RLA' && wordCount(item?.passage) > 250) return true;
    if (item?.passage && wordCount(item.passage) > 250) return true;
    if (wordCount(item?.questionText) > 250) return true;

    return false;
}

const REPAIR_SYSTEM = `You receive an array of quiz items. Fix ONLY schema/format issues:
- Preserve meaning; do not change difficulty.
- Ensure exactly one isCorrect=true per item; keep rationales.
- Ensure any passage <= 250 words; keep questionText <= 250 words.
Return ONLY the fixed JSON array in the same order.`;

async function repairBatchWithChatGPT_once(itemsNeedingFix) {
    if (!openaiClient) {
        console.warn('OpenAI client not configured; skipping repair.');
        return itemsNeedingFix;
    }

    const input = JSON.stringify(itemsNeedingFix);
    const resp = await withRetry(
        () => openaiClient.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: REPAIR_SYSTEM },
                { role: 'user', content: input }
            ],
            response_format: { type: 'json_object' }
        }),
        {
            retries: 2,
            minTimeout: 800,
            onFailedAttempt: (err, n) => console.warn(`[retry ${n}] ChatGPT batch repair failed: ${err?.message || err}`)
        }
    );
    const text = resp.choices[0].message.content;
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : (parsed.items || parsed.data || parsed.questions || parsed.value || parsed);
}

async function chatgptCorrectnessCheck(questions, { timeoutMs } = {}) {
    if (!openaiClient) {
        console.warn('ChatGPT correctness check skipped: OPENAI_API_KEY not configured.');
        return questions;
    }

    if (!Array.isArray(questions) || !questions.length) {
        return questions;
    }

    const payload = JSON.stringify({ questions });

    try {
        const response = await openaiClient.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.1,
            messages: [
                { role: 'system', content: MATH_CORRECTNESS_SYSTEM_PROMPT },
                { role: 'user', content: payload }
            ],
            response_format: { type: 'json_object' }
        });

        const text = response.choices[0].message.content;
        const parsed = JSON.parse(text);
        if (!parsed || !Array.isArray(parsed.fixes) || !parsed.fixes.length) {
            return questions;
        }

        const updated = questions.map((q) => cloneQuestion(q));

        parsed.fixes.forEach((fix) => {
            const idx = Number.isInteger(fix?.index) ? fix.index : -1;
            if (idx < 0 || idx >= updated.length) {
                return;
            }

            const replacement = fix?.question;
            if (!replacement || typeof replacement !== 'object') {
                return;
            }

            if (typeof fix?.reason === 'string' && fix.reason.trim()) {
                console.log(`ChatGPT corrected math question ${idx}: ${fix.reason.trim()}`);
            }

            const base = cloneQuestion(updated[idx]);
            const merged = {
                ...base,
                ...replacement,
                answerOptions: Array.isArray(replacement.answerOptions)
                    ? replacement.answerOptions.map((opt) => ({ ...opt }))
                    : base.answerOptions
            };
            updated[idx] = merged;
        });

        return updated;
    } catch (error) {
        console.error('ChatGPT math correctness check failed:', error.message || error);
        return questions;
    }
}

async function applyMathCorrectnessPass(questions, options = {}) {
    if (!Array.isArray(questions) || questions.length <= 5) {
        return questions;
    }

    try {
        return await chatgptCorrectnessCheck(questions, options);
    } catch (error) {
        console.error('Math correctness pass failed:', error.message || error);
        return questions;
    }
}

async function generateExam(subject, promptBuilder, counts) {
    const prompt = promptBuilder(counts);

    const { items: generatedItems } = await generateQuizItemsWithFallback(
        subject,
        prompt,
        {
            retries: 2,
            minTimeout: 800,
            onFailedAttempt: (err, n) => console.warn(`[retry ${n}] Gemini exam generation failed: ${err?.message || err}`)
        }
    );
    let items = generatedItems.map((i) => enforceWordCapsOnItem(i, subject));

    const badIdxs = [];
    items.forEach((it, idx) => {
        if (needsRepair(it, subject)) badIdxs.push(idx);
    });

    if (badIdxs.length) {
        try {
            const toFix = badIdxs.map((i) => items[i]);
            const fixedSubset = await withRetry(
                () => repairBatchWithChatGPT_once(toFix),
                {
                    retries: 2,
                    minTimeout: 800,
                    onFailedAttempt: (err, n) => console.warn(`[retry ${n}] ChatGPT repair batch failed: ${err?.message || err}`)
                }
            );
            fixedSubset.forEach((fixed, j) => {
                items[badIdxs[j]] = enforceWordCapsOnItem(fixed, subject);
            });
        } catch (err) {
            console.warn('Repair batch failed; continuing with original items.', err?.message || err);
        }
    }

    return items.map((it) => enforceWordCapsOnItem(it, subject));
}

async function runExam() {
    const counts = { NON_CALC_COUNT, GEOMETRY_COUNT, ALGEBRA_COUNT };
    const generated = await generateExam('Math', buildCombinedPrompt_Math, counts);

    const cleaned = [];
    for (const q of generated) {
        const sanitized = enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(q)), 'Math');
        if (validateQuestion(sanitized)) {
            cleaned.push(sanitized);
        }
    }

    return cleaned;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

const QUESTION_BANK_SUBJECTS = new Set(['Science', 'Social Studies', 'RLA']);
const HYBRID_ELIGIBLE_SUBJECTS = new Set([
    'Science',
    'Social Studies',
    'RLA',
    'Reasoning Through Language Arts (RLA)'
]);
const QUESTION_BANK_TARGET_COUNT = 8;
const HYBRID_TOTAL_QUESTIONS = 12;

function isDatabaseConfigured() {
    return Boolean(process.env.DATABASE_URL);
}

function normalizeQuestionBankSubject(subject) {
    if (!subject) return null;
    const trimmed = subject.trim();
    if (trimmed === 'Reasoning Through Language Arts (RLA)' || trimmed === 'RLA') {
        return 'RLA';
    }
    return QUESTION_BANK_SUBJECTS.has(trimmed) ? trimmed : null;
}

function extractPassageFromQuestion(question) {
    if (!question || typeof question !== 'object') return null;
    const direct = typeof question.passage === 'string' ? question.passage.trim() : '';
    if (direct) return direct;
    const fromContent = question.content && typeof question.content.passage === 'string'
        ? question.content.passage.trim()
        : '';
    if (fromContent) return fromContent;
    const fromStimulus = question.stimulus && typeof question.stimulus.content === 'string'
        ? question.stimulus.content.trim()
        : '';
    if (fromStimulus) return fromStimulus;
    if (question.stimulus && typeof question.stimulus.text === 'string') {
        const text = question.stimulus.text.trim();
        if (text) return text;
    }
    return null;
}

function parseQuestionData(row) {
    if (!row) return null;
    const raw = row.question_data;
    if (!raw) return null;
    if (typeof raw === 'object') return raw;
    try {
        return JSON.parse(raw);
    } catch (error) {
        console.warn('Failed to parse question_data JSON from bank:', error?.message || error);
        return null;
    }
}

async function fetchQuestionsFromBank({ subject, category, userId, limit }) {
    if (!isDatabaseConfigured()) return [];
    if (!subject || !category || limit <= 0) return [];

    try {
        const { rows } = await pool.query(
            `SELECT q.id, q.question_data
             FROM questions q
             LEFT JOIN user_seen_questions usq
               ON usq.question_id = q.id AND usq.user_id = $3
             WHERE q.subject = $1
               AND q.category = $2
               AND usq.question_id IS NULL
             ORDER BY random()
             LIMIT $4;`,
            [subject, category, userId || null, limit]
        );

        return rows
            .map((row) => ({ id: row.id, question: parseQuestionData(row) }))
            .filter((entry) => entry.question && typeof entry.question === 'object');
    } catch (error) {
        console.error('Failed to fetch questions from bank:', error);
        return [];
    }
}

function buildUserSeenInsertQuery(count) {
    const placeholders = [];
    for (let i = 0; i < count; i++) {
        placeholders.push(`($1, $${i + 2})`);
    }
    return `INSERT INTO user_seen_questions (user_id, question_id)
            VALUES ${placeholders.join(', ')}
            ON CONFLICT (user_id, question_id) DO NOTHING;`;
}

async function markQuestionsAsSeen(userId, questionIds) {
    if (!isDatabaseConfigured()) return;
    if (!userId) return;
    if (!Array.isArray(questionIds) || !questionIds.length) return;

    try {
        const params = [userId, ...questionIds];
        const query = buildUserSeenInsertQuery(questionIds.length);
        await pool.query(query, params);
    } catch (error) {
        console.error('Failed to mark questions as seen:', error);
    }
}

async function saveGeneratedQuestionsToBank({ subject, category, questions, userId }) {
    const normalizedSubject = normalizeQuestionBankSubject(subject);
    if (!normalizedSubject) return;
    if (!Array.isArray(questions) || !questions.length) return;
    if (!isDatabaseConfigured()) return;

    const passageIdMap = new Map();
    const insertedQuestionIds = [];

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const question of questions) {
            if (!question || typeof question !== 'object') continue;

            let passageId = null;
            const passageContent = extractPassageFromQuestion(question);
            if (passageContent) {
                if (passageIdMap.has(passageContent)) {
                    passageId = passageIdMap.get(passageContent);
                } else {
                    const passageResult = await client.query(
                        `INSERT INTO passages (subject, category, content)
                         VALUES ($1, $2, $3)
                         RETURNING id;`,
                        [normalizedSubject, category || null, passageContent]
                    );
                    passageId = passageResult.rows[0]?.id ?? null;
                    passageIdMap.set(passageContent, passageId);
                }
            }

            const itemType = question.type || question.item_type || question.questionType || null;
            const serialized = JSON.stringify(question);
            const questionResult = await client.query(
                `INSERT INTO questions (subject, category, item_type, question_data, passage_id)
                 VALUES ($1, $2, $3, $4::jsonb, $5)
                 RETURNING id;`,
                [normalizedSubject, category || null, itemType, serialized, passageId]
            );

            const insertedId = questionResult.rows[0]?.id;
            if (insertedId) {
                insertedQuestionIds.push(insertedId);
            }
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }

    if (insertedQuestionIds.length && userId) {
        await markQuestionsAsSeen(userId, insertedQuestionIds);
    }
}

function scheduleGeneratedQuestionSave(payload) {
    if (!payload || !Array.isArray(payload.questions) || !payload.questions.length) {
        return;
    }

    setImmediate(async () => {
        try {
            await saveGeneratedQuestionsToBank(payload);
        } catch (error) {
            console.error('Failed to save AI-generated questions to bank:', error);
        }
    });
}

async function generateHybridQuestionsForSubject(subject, topic, count) {
    if (!count || count <= 0) {
        return [];
    }

    const generated = [];
    const plan = [
        () => generatePassageSet(topic, subject, 2),
        () => generatePassageSet(topic, subject, 2),
        () => generatePassageSet(topic, subject, 2),
        () => generateImageQuestion(topic, subject, curatedImages, 2),
        () => generateImageQuestion(topic, subject, curatedImages, 2)
    ];

    for (let i = 0; i < 6; i++) {
        plan.push(() => generateStandaloneQuestion(subject, topic));
    }

    for (const factory of plan) {
        if (generated.length >= count) break;
        try {
            const result = await factory();
            const items = Array.isArray(result) ? result : [result];
            for (const item of items) {
                if (item && typeof item === 'object') {
                    generated.push(item);
                    if (generated.length >= count) break;
                }
            }
        } catch (error) {
            console.error(`Hybrid generation task failed for ${subject}:`, error);
        }
    }

    let attempts = 0;
    while (generated.length < count && attempts < 6) {
        attempts += 1;
        try {
            const fallback = await generateStandaloneQuestion(subject, topic);
            if (fallback && typeof fallback === 'object') {
                generated.push(fallback);
            }
        } catch (error) {
            console.error(`Fallback standalone generation failed for ${subject}:`, error);
        }
    }

    return generated.slice(0, count);
}

const SALT_ROUNDS = 10;
const USER_TOKEN_TTL = '12h';

function formatUserRow(row) {
    if (!row) return null;
    const email = row.email || '';
    const fallbackName = email.includes('@') ? email.split('@')[0] : (email || 'Learner');
    const organizationId = row.organization_id ?? row.organizationId ?? null;
    const organizationName = row.organization_name ?? row.organizationName ?? null;
    const picture = row.picture || row.picture_url || null;
    const loginCount = row.login_count != null ? Number(row.login_count) : null;
    return {
        id: row.id,
        email,
        name: row.name || fallbackName,
        createdAt: row.created_at || null,
        picture,
        picture_url: picture,
        organization_id: organizationId,
        organizationId,
        organization_name: organizationName,
        organizationName,
        role: row.role || null,
        last_login: row.last_login || null,
        login_count: loginCount,
    };
}

function formatScoreRow(row) {
    if (!row) return null;
    return {
        id: row.id,
        userId: row.user_id,
        subject: row.subject,
        score: typeof row.score === 'number' ? row.score : Number(row.score),
        takenAt: row.taken_at,
    };
}

function authenticateBearerToken(req, res, next) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET is not configured; authentication endpoints are unavailable.');
        return res.status(500).json({ error: 'Authentication unavailable' });
    }

    const authorization = req.headers.authorization || '';
    const token = authorization.startsWith('Bearer ')
        ? authorization.slice('Bearer '.length).trim()
        : null;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, secret);
        const userId = payload.sub ?? payload.userId ?? payload.id ?? null;
        req.user = {
            ...(req.user || {}),
            ...payload,
            userId,
            sub: payload.sub ?? userId
        };
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

function createUserToken(userId, role = null) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not configured');
    }
    const payload = { sub: userId, userId };
    if (role) {
        payload.role = role;
    }
    return jwt.sign(payload, secret, { expiresIn: USER_TOKEN_TTL });
}

function getUserIdFromRequest(req) {
    if (!req || !req.user) {
        return null;
    }
    return req.user.sub ?? req.user.userId ?? req.user.id ?? null;
}

const app = express();
app.use(helmet());
// Apply rate limiting to AI generation routes to protect against abuse.
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/generate', apiLimiter);
// IMPROVEMENT: Use the port provided by Render's environment, falling back to 3001 for local use.
const port = process.env.PORT || 3001;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const whitelist = [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://ezged.netlify.app',
    'https://quiz.ez-ged.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }
        if (whitelist.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// handle preflight requests
app.options('*', cors(corsOptions)); // Use '*' to handle preflights for all routes
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Serve static image folders from the 'frontend' directory
app.use('/images/rla', express.static(path.join(__dirname, '../frontend/Images/RLA')));
app.use('/images/science', express.static(path.join(__dirname, '../frontend/Images/Science')));
app.use('/images/social-studies', express.static(path.join(__dirname, '../frontend/Images/Social Studies')));
app.use('/images/math', express.static(path.join(__dirname, '../frontend/Images/Math')));

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!process.env.JWT_SECRET) {
        console.error('Registration attempted without JWT_SECRET configured.');
        return res.status(500).json({ error: 'Registration unavailable' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
        return res.status(400).json({ error: 'A valid email address is required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const result = await pool.query(
            `INSERT INTO users (email, password_hash, login_count, last_login)
             VALUES ($1, $2, 1, NOW())
             RETURNING id, email, created_at, name, organization_id, role, last_login, login_count, picture_url;`,
            [normalizedEmail, passwordHash]
        );

        const user = formatUserRow(result.rows[0]);
        const token = createUserToken(user.id, user.role);
        setAuthCookie(res, token, 24 * 60 * 60 * 1000);
        return res.status(201).json({ message: 'Registration successful', user, token });
    } catch (error) {
        if (error?.code === '23505') {
            return res.status(409).json({ error: 'Email already in use' });
        }
        console.error('Registration failed:', error);
        return res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!process.env.JWT_SECRET) {
        console.error('Login attempted without JWT_SECRET configured.');
        return res.status(500).json({ error: 'Login unavailable' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
        return res.status(400).json({ error: 'A valid email address is required' });
    }

    try {
        const result = await pool.query(
            `SELECT id, email, password_hash, created_at, name, organization_id, role, last_login, login_count, picture_url
             FROM users
             WHERE email = $1`,
            [normalizedEmail]
        );

        if (result.rowCount === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userRow = result.rows[0];
        const valid = await bcrypt.compare(password, userRow.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const updateResult = await pool.query(
            `UPDATE users
             SET last_login = NOW(),
                 login_count = COALESCE(login_count, 0) + 1
             WHERE id = $1
             RETURNING id, email, created_at, name, organization_id, role, last_login, login_count, picture_url;`,
            [userRow.id]
        );

        const user = formatUserRow(updateResult.rows[0] || userRow);
        const token = createUserToken(user.id, user.role);
        setAuthCookie(res, token, 24 * 60 * 60 * 1000);
        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/instructor/login', async (req, res) => {
    const { email, password, organizationId, accessCode } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string' || typeof accessCode !== 'string') {
        return res.status(400).json({ error: 'Email, password, and access code are required' });
    }

    const numericOrganizationId = Number(organizationId);
    if (!Number.isInteger(numericOrganizationId)) {
        return res.status(400).json({ error: 'A valid organization is required' });
    }

    if (!process.env.JWT_SECRET) {
        console.error('Instructor login attempted without JWT_SECRET configured.');
        return res.status(500).json({ error: 'Login unavailable' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
        return res.status(400).json({ error: 'A valid email address is required' });
    }

    try {
        const organizationResult = await pool.query(
            `SELECT id, access_code
             FROM organizations
             WHERE id = $1`,
            [numericOrganizationId]
        );

        if (
            organizationResult.rowCount === 0 ||
            String(organizationResult.rows[0].access_code || '').trim() !== accessCode.trim()
        ) {
            return res.status(401).json({ error: 'Invalid organization or access code.' });
        }

        const userResult = await pool.query(
            `SELECT id, email, password_hash, created_at, name, organization_id, role, last_login, login_count, picture_url
             FROM users
             WHERE email = $1`,
            [normalizedEmail]
        );

        if (userResult.rowCount === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const userRow = userResult.rows[0];
        const validPassword = await bcrypt.compare(password, userRow.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const updateResult = await pool.query(
            `UPDATE users
             SET role = 'instructor',
                 organization_id = $1,
                 last_login = NOW(),
                 login_count = COALESCE(login_count, 0) + 1
             WHERE id = $2
             RETURNING id, email, created_at, name, organization_id, role, last_login, login_count, picture_url;`,
            [numericOrganizationId, userRow.id]
        );

        const updatedUser = formatUserRow(updateResult.rows[0] || userRow);
        const token = createUserToken(updatedUser.id, 'instructor');
        setAuthCookie(res, token, 24 * 60 * 60 * 1000);

        return res.status(200).json({ message: 'Login successful', user: updatedUser, token });
    } catch (error) {
        console.error('Instructor login failed:', error);
        return res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/instructor/google-login', async (req, res) => {
    const { credential, organizationId, accessCode } = req.body || {};

    if (!process.env.JWT_SECRET) {
        console.error('Instructor Google login attempted without JWT_SECRET configured.');
        return res.status(500).json({ error: 'Login unavailable' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
        console.error('Instructor Google login attempted without GOOGLE_CLIENT_ID configured.');
        return res.status(500).json({ error: 'Login unavailable' });
    }

    const idToken = typeof credential === 'string' ? credential.trim() : '';
    if (!idToken) {
        return res.status(400).json({ error: 'A Google credential is required' });
    }

    const numericOrganizationId = Number(organizationId);
    if (!Number.isInteger(numericOrganizationId)) {
        return res.status(400).json({ error: 'A valid organization is required' });
    }

    if (typeof accessCode !== 'string' || !accessCode.trim()) {
        return res.status(400).json({ error: 'An organization access code is required' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload?.email;
        if (!email) {
            return res.status(400).json({ error: 'Google login did not provide an email address' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail) {
            return res.status(400).json({ error: 'A valid email address is required' });
        }

        const organizationResult = await pool.query(
            `SELECT id, access_code
             FROM organizations
             WHERE id = $1`,
            [numericOrganizationId]
        );

        if (
            organizationResult.rowCount === 0 ||
            String(organizationResult.rows[0].access_code || '').trim() !== accessCode.trim()
        ) {
            return res.status(401).json({ error: 'Invalid organization or access code.' });
        }

        const displayName = typeof payload?.name === 'string' ? payload.name.trim() || null : null;
        const pictureUrl = typeof payload?.picture === 'string' ? payload.picture : null;

        const userResult = await pool.query(
            `SELECT id, email, name, organization_id, role, last_login, login_count, picture_url
             FROM users
             WHERE email = $1
             LIMIT 1;`,
            [normalizedEmail]
        );

        let userRow;
        if (userResult.rowCount > 0) {
            const existingUser = userResult.rows[0];
            const updateResult = await pool.query(
                `UPDATE users
                 SET name = COALESCE($1, name),
                     picture_url = COALESCE($2, picture_url),
                     role = 'instructor',
                     organization_id = $3,
                     last_login = NOW(),
                     login_count = COALESCE(login_count, 0) + 1
                 WHERE id = $4
                 RETURNING id, email, created_at, name, organization_id, role, last_login, login_count, picture_url;`,
                [displayName, pictureUrl, numericOrganizationId, existingUser.id]
            );
            userRow = updateResult.rows[0];
        } else {
            const insertResult = await pool.query(
                `INSERT INTO users (email, name, picture_url, password_hash, role, organization_id, last_login, login_count)
                 VALUES ($1, $2, $3, $4, 'instructor', $5, NOW(), 1)
                 RETURNING id, email, created_at, name, organization_id, role, last_login, login_count, picture_url;`,
                [normalizedEmail, displayName, pictureUrl, null, numericOrganizationId]
            );
            userRow = insertResult.rows[0];
        }

        if (!userRow) {
            throw new Error('Failed to persist instructor record after Google login.');
        }

        const user = formatUserRow(userRow);
        const token = createUserToken(user.id, 'instructor');
        setAuthCookie(res, token, 24 * 60 * 60 * 1000);

        return res.status(200).json({ message: 'Login successful', user: { ...user, role: 'instructor' }, token });
    } catch (error) {
        console.error('Instructor Google login failed:', error);
        return res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/scores', authenticateBearerToken, async (req, res) => {
    const { subject, score } = req.body || {};

    if (typeof subject !== 'string' || !subject.trim()) {
        return res.status(400).json({ error: 'Subject is required' });
    }

    const numericScore = Number(score);
    if (!Number.isFinite(numericScore)) {
        return res.status(400).json({ error: 'Score must be a number' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO scores (user_id, subject, score) VALUES ($1, $2, $3) RETURNING id, user_id, subject, score, taken_at',
            [req.user.userId, subject.trim(), Math.round(numericScore)]
        );

        return res.status(201).json(formatScoreRow(result.rows[0]));
    } catch (error) {
        console.error('Failed to save score:', error);
        return res.status(500).json({ error: 'Failed to save score' });
    }
});

app.get('/api/scores', authenticateBearerToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, user_id, subject, score, taken_at FROM scores WHERE user_id = $1 ORDER BY taken_at ASC',
            [req.user.userId]
        );

        return res.status(200).json(result.rows.map(formatScoreRow));
    } catch (error) {
        console.error('Failed to fetch scores:', error);
        return res.status(500).json({ error: 'Failed to fetch scores' });
    }
});

app.get('/api/organizations', async (_req, res) => {
    if (!isDatabaseConfigured()) {
        return res.status(503).json({ error: 'Database unavailable' });
    }

    try {
        const { rows } = await pool.query(
            'SELECT id, name FROM organizations ORDER BY name ASC;'
        );
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Failed to fetch organizations:', error);
        return res.status(500).json({ error: 'Failed to fetch organizations' });
    }
});

app.post('/api/student/join-organization', authenticateBearerToken, async (req, res) => {
    if (!isDatabaseConfigured()) {
        return res.status(503).json({ error: 'Database unavailable' });
    }

    try {
        const userId = getUserIdFromRequest(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const accessCode = typeof req.body?.accessCode === 'string'
            ? req.body.accessCode.trim()
            : typeof req.body?.access_code === 'string'
                ? req.body.access_code.trim()
                : '';

        if (!accessCode) {
            return res.status(400).json({ error: 'An access code is required' });
        }

        const organizationResult = await pool.query(
            'SELECT id, name FROM organizations WHERE access_code = $1;',
            [accessCode]
        );

        if (organizationResult.rowCount === 0) {
            return res.status(404).json({ error: 'Invalid Access Code' });
        }

        const organization = organizationResult.rows[0];

        await pool.query(
            `UPDATE users
             SET organization_id = $1
             WHERE id = $2;`,
            [organization.id, userId]
        );

        return res.status(200).json({
            message: 'Organization joined successfully',
            organization: {
                id: organization.id,
                name: organization.name,
            },
        });
    } catch (error) {
        console.error('Failed to join organization:', error);
        return res.status(500).json({ error: 'Failed to join organization' });
    }
});

app.get('/api/instructor/dashboard', authenticateBearerToken, async (req, res) => {
    if (!isDatabaseConfigured()) {
        return res.status(503).json({ error: 'Database unavailable' });
    }

    const userId = getUserIdFromRequest(req);
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const role = typeof req.user?.role === 'string' ? req.user.role.toLowerCase() : null;
    if (role !== 'instructor') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const instructorResult = await pool.query(
            'SELECT organization_id FROM users WHERE id = $1;',
            [userId]
        );

        if (instructorResult.rowCount === 0) {
            return res.status(404).json({ error: 'Instructor not found' });
        }

        const organizationId = instructorResult.rows[0]?.organization_id;
        if (!organizationId) {
            return res.status(200).json([]);
        }

        const studentsResult = await pool.query(
            `SELECT name, email, login_count, last_login
             FROM users
             WHERE organization_id = $1 AND role = 'student'
             ORDER BY name ASC NULLS LAST, email ASC;`,
            [organizationId]
        );

        const students = (studentsResult.rows || []).map((row) => ({
            name: row.name || (row.email ? row.email.split('@')[0] : null) || 'Student',
            email: row.email || null,
            login_count: row.login_count != null ? Number(row.login_count) : null,
            last_login: row.last_login || null,
        }));

        return res.status(200).json(students);
    } catch (error) {
        console.error('Failed to load instructor dashboard:', error);
        return res.status(500).json({ error: 'Failed to load instructor dashboard' });
    }
});

app.get('/client-config.js', (req, res) => {
    const payload = `window.__APP_CONFIG__ = window.__APP_CONFIG__ || {}; window.__APP_CONFIG__.geometryFiguresEnabled = ${GEOMETRY_FIGURES_ENABLED};`;
    res.type('application/javascript').send(payload);
});

let curatedImages = [];
// Load the new, structured image repository from the local file system.
const imageRepositoryPath = path.join(__dirname, 'data', 'image_metadata_final.json');

try {
    const imageData = fs.readFileSync(imageRepositoryPath, 'utf8');
    curatedImages = JSON.parse(imageData);
    console.log(`Successfully loaded and parsed ${curatedImages.length} images from the local repository.`);
} catch (error) {
    console.error('Failed to load or parse image_metadata.json:', error);
}

function pickCandidateUrls(subject, topic) {
    const encodedTopic = encodeURIComponent(topic);
    // Base sources that are always included
    const sources = [
        `https://www.google.com/search?q=${encodedTopic}+site%3A.gov`,
        `https://www.britannica.com/search?query=${encodedTopic}`
    ];

    if (subject === 'Social Studies') {
        sources.unshift(
            `https://www.loc.gov/search/?q=${encodedTopic}&all=true`,
            `https://www.archives.gov/search?query=${encodedTopic}`,
            `https://smithsonianmag.com/search/?q=${encodedTopic}`
        );
    }
    if (subject === 'Science') {
        sources.unshift(
            `https://www.nasa.gov/search/?q=${encodedTopic}`,
            `https://www.noaa.gov/search?s=${encodedTopic}`,
            `https://www.scientificamerican.com/search/?q=${encodedTopic}`
        );
    }
    if (subject === 'Reasoning Through Language Arts (RLA)' || subject === 'RLA') {
        sources.unshift(
            `https://www.gutenberg.org/ebooks/search/?query=${encodedTopic}`,
            `https://public-domain-poetry.com/search/${encodedTopic.replace(/%20/g, '-')}`
        );
    }
    return sources;
}

function compactText(s, maxWords = 300) {
    if (!s) return '';
    const words = s.trim().split(/\s+/);
    return words.slice(0, maxWords).join(' ');
}

async function retrieveSnippets(subject, topic) {
    const seeds = pickCandidateUrls(subject, topic);
    const out = [];
    for (const url of seeds) {
        try {
            const page = await fetchApproved(url);
            out.push({
                url: page.url,
                title: page.title,
                text: compactText(page.text, 320),
                table: page.tables?.[0] || null
            });
            if (out.length >= 3) break;
        } catch (e) {
            // ignore individual fetch failures
        }
    }
    return out;
}

// START: New Helper Functions for Variety Pack Generation

function buildTopicPrompt_VarietyPack(subject, topic, n = 12, ctx = [], imgs = []) {
    const contextJSON = JSON.stringify(ctx.map(c => ({
        url: c.url, title: c.title, text: c.text, table: c.table || null
    })));

    const imagesJSON = JSON.stringify((imgs || []).map((im, i) => ({
        id: im.id || `img${i+1}`, src: im.filePath, alt: im.altText || '', description: im.detailedDescription || ''
    })));

    let MIX_RULES;
    if (subject === 'Math') {
        MIX_RULES = `
Mix (exactly ${n} items):
- Generate exactly 12 standalone GED Math problems. Each item MUST be fully standalone and must not rely on any shared passages or images.
- Absolutely DO NOT create passages or request/use any images for these questions.
- Every item MUST include "itemType": "standalone".

Difficulty distribution (approximate): 4 easy, 5 medium, 3 hard. Include a "difficulty" field for each item.

Variety rules:
- Rotate sub-skills; avoid repeating the same wording template.
- Ensure each problem is independent and never references passages or images.

Citations:
- For standalone items, "source" can be omitted or set to a relevant CONTEXT URL if used.

Word caps:
- Keep questionText concise.
`;
    } else {
        MIX_RULES = `
Mix (exactly ${n} items):
- Create 2 passages. Generate 2 questions for each passage (total 4 passage questions).
- Use 2 images. Generate 2 questions for the first image and 1 question for the second image (total 3 image questions).
- Create 5 standalone questions.

Difficulty distribution (approximate): 4 easy, 5 medium, 3 hard. Include a "difficulty" field for each item.

Variety rules:
- Rotate sub-skills; avoid repeating the same wording template.
- If multiple items use the same PASSAGE or the same IMAGE (same src), assign the same groupId (e.g., "passage-1" or "img:img2").
- Write stems so the stimulus is actually needed (interpret the data/figure/text), not decorative.
- **IMPORTANT:** If the IMAGES list provided below is empty, DO NOT use any images. Instead, generate 3 additional standalone questions for a total of 8.

Citations:
- For passage/image items, include a "source" with a URL from CONTEXT (for passage) or the image "src" (for image).
- For standalone items, "source" can be omitted or set to a relevant CONTEXT URL if used.

Word caps:
- Any passage ≤ 250 words. Keep questionText concise.
`;
    }

    const SUBSKILLS = {
        "Science": `
Subskills to rotate (Science):
- data interpretation (tables, rates, units), variables & controls, cause/effect, model reading, basic calc (percent, ratio), experimental design, claims vs evidence.
Prefer plain text; use small <table> only when essential.`,
        "Social Studies": `
Subskills to rotate (Social Studies):
- civics processes, document interpretation (quotes), economic reasoning (supply/demand, inflation, unemployment), map/graph reading, chronology/timeline, main idea/inference, rights & responsibilities.`,
        "Math": `
Subskills to rotate (Math):
- number operations, fractions/decimals/percents, ratios/proportions, linear equations/inequalities, functions/graphs (described in text), geometry/measurement, data & probability. Use inline $...$ for expressions; no $$ display math. CRITICAL FORMATTING RULE: Do NOT wrap single variables or simple numbers in dollar signs. Write expressions like 5x + 3 = 10. Avoid incorrect forms like 5$x$ + 3 = 10.`,
        "Reasoning Through Language Arts (RLA)": `
Subskills to rotate (RLA):
- main idea, inference, text structure, tone/purpose, evidence selection, vocabulary-in-context, grammar/usage/clarity edits. Passages short and clear.`,
        "RLA": `
Subskills to rotate (RLA):
- main idea, inference, text structure, tone/purpose, evidence selection, vocabulary-in-context, grammar/usage/clarity edits. Passages short and clear.`
    };

    return `${STRICT_JSON_HEADER_SHARED}
SUBJECT STYLE: GED ${subject} — Topic Pack on "${topic}"
Use only the CONTEXT and IMAGES provided (if any) for factual details. Do not fabricate specific data.
${MIX_RULES}
${SUBSKILLS[subject] || ''}
CONTEXT:${contextJSON}
IMAGES:${imagesJSON}
Return ONE compact JSON array with exactly ${n} items.`;
}

// Add this new prompt library to server.js

const promptLibrary = {
    "Social Studies": {
        topic: (topic) => `Generate a 15-question GED-style Social Studies quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages AS CLOSELY AS POSSIBLE: 50% Civics & Government, 20% U.S. History, 15% Economics, 15% Geography & the World.
        STRICT STIMULUS REQUIREMENTS: A variety of stimuli MUST be used. Include at least 2 questions based on a chart/graph, 2 questions based on a historical quote, and 2 questions based on an image from the provided descriptions. The rest should be text passages.
        NO REDUNDANCY RULE: All 15 questions must feature distinct scenarios, time periods, data sets, and stimulus materials. Do not reuse wording, answer choices, or prompts across questions.`,
        comprehensive: `Generate a 35-question comprehensive GED Social Studies exam.
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 50% Civics & Government, 20% U.S. History, 15% Economics, and 15% Geography & the World.
        STRICT STIMULUS REQUIREMENTS: The quiz must include a diverse mix of stimuli, including text passages, historical quotes, charts, graphs, and images from the provided descriptions.`
    },
    "Science": {
        topic: (topic) => `Generate a 15-question GED-style Science quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages AS CLOSELY AS POSSIBLE: 40% Life Science, 40% Physical Science, 20% Earth and Space Science.
        STRICT STIMULUS REQUIREMENTS: Ensure a mix of stimuli, including text passages, data tables/graphs, and diagrams from the provided descriptions. Questions should test reading comprehension of scientific texts and scientific reasoning.
        NO REDUNDANCY RULE: All 15 questions must cover different experimental setups, phenomena, or data sets. Do not repeat question wording, contexts, or answer choices.
        IMAGE ALIGNMENT RULE: Any requested image must directly represent the scientific concept in the question (e.g., cell diagrams for biology, circuit diagrams for physical science, climate charts for Earth science). Avoid generic or tangential imagery and never request illustrations unrelated to the prompt.`,
        comprehensive: `Generate a 38-question comprehensive GED Science exam.
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 40% Life Science, 40% Physical Science, 20% Earth and Space Science.
        STRICT STIMULUS REQUIREMENTS: The quiz must include a diverse mix of stimuli, including text passages, data tables formatted as HTML, charts, and scientific diagrams from the provided descriptions.`
    },
"Reasoning Through Language Arts (RLA)": {
    topic: (topic) => `Generate a 15-question GED-style RLA quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: The quiz must be 75% Informational Text (non-fiction, workplace documents) and 25% Literary Text. It must include a mix of reading comprehension questions and language/grammar questions. DO NOT generate Social Studies questions; generate RLA questions using passages ABOUT "${topic}".
        CRITICAL RULE FOR CURRENCY: Always use a literal dollar sign before the number, like '$50.25'. NEVER wrap currency in math delimiters such as '$$50.25$'. Do not use '$...$' for currency; write $30 or 30 dollars, never place the dollar sign after the number, and never wrap currency in LaTeX.`,
    comprehensive: {
    part1: `Generate the Reading Comprehension section of a GED RLA exam. Create exactly 4 long passages, each 4-5 paragraphs long, and each passage MUST have a concise, engaging title wrapped in <strong> tags. The passages must be formatted with <p> tags for each paragraph. The passage breakdown must be 3 informational texts and 1 literary text. For EACH of the 4 passages, generate exactly 5 reading comprehension questions. The final output must be a total of 20 questions.`,
    part2: `Generate one GED-style Extended Response (essay) prompt. The prompt must be based on two short, opposing passages that you create. The passages should be 3-4 paragraphs each and formatted with <p> tags. Each of the two passages MUST have its own title. The output should be a JSON object with two keys: "passages" (an array of two objects, each with a "title" and "content") and "prompt" (the essay question).`,
    part3: `Generate the Language and Grammar section of a GED RLA exam. Create 7 short passages (1-2 paragraphs each) formatted with <p> tags. The passages should contain a mix of grammatical errors, awkward phrasing, and organizational issues. For EACH of the 7 passages, generate 3-4 questions focused on correcting sentences, improving word choice, and identifying errors. This should total 25 questions.`
}
},
    "Math": {
        topic: (topic) => `You are a GED Math exam creator. Your single most important task is to ensure all mathematical notation is perfectly formatted for KaTeX. This is a non-negotiable, critical requirement. Failure to format correctly will make the output unusable.

MANDATORY FORMATTING RULES:
1. **Fractions:** All fractions MUST be written as '$\\frac{numerator}{denominator}$'. For example, 'five eighths' must be '$\\frac{5}{8}$'.
2. **Delimiters:** Enclose every LaTeX math expression in single dollar signs '$'.
3. **Commands:** Always include the leading backslash on LaTeX commands (e.g., use '$\\frac{1}{2}$', not '$frac{1}{2}$').
4. **Currency:** Always use a literal dollar sign before the number, like '$50.25'. NEVER wrap currency in math delimiters such as '$$50.25$'. Do not use '$...$' for currency; write $30 or 30 dollars, never place the dollar sign after the number, and never wrap currency in LaTeX.
5. **Answer Options:** For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency answers, use a single dollar sign like $10.50.

Examples of CORRECT Formatting to IMITATE:
* '$\\frac{3}{4}$'
* '$x^2$'
* '$15.50'

Examples of INCORRECT Formatting to AVOID:
* '$1/2$' (Incorrect: Always use the \\frac{...} command for fractions).
* '$$x^2$$' (Incorrect: Never use double dollar signs.)
* '&#36;15.50$' (Incorrect: Do not wrap currency in math delimiters.)

With those rules in mind, generate a 15-question GED-style Math quiz focused on "${topic}".
STRICT CONTENT REQUIREMENTS: The questions must be approximately 45% Quantitative Problems and 55% Algebraic Problems.
CRITICAL FORMATTING RULE: Do NOT wrap single variables or simple numbers in dollar signs. Write expressions like 5x + 3 = 10. Avoid incorrect forms like 5$x$ + 3 = 10.`,
        comprehensive: `Generate a 46-question comprehensive GED Mathematical Reasoning exam.
        STRICT CONTENT REQUIREMENTS: The quiz must be EXACTLY 45% Quantitative Problems and 55% Algebraic Problems. Include word problems and questions based on data charts.
        IMPORTANT: For all mathematical expressions, including fractions, exponents, and symbols, you MUST format them using KaTeX-compatible LaTeX syntax enclosed in single dollar signs. For example, a fraction like 'five eighths' must be written as '$\\frac{5}{8}$', an exponent like 'x squared' must be '$x^2$', and a division symbol should be '$\\div$' where appropriate. This is a non-negotiable requirement.
        CRITICAL RULE FOR CURRENCY: Always use a literal dollar sign before the number, like '$50.25'. NEVER wrap currency in math delimiters such as '$$50.25$'. Do not use '$...$' for currency; write $30 or 30 dollars, never place the dollar sign after the number, and never wrap currency in LaTeX.
        CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
        CRITICAL FORMATTING RULE: Do NOT wrap single variables or simple numbers in dollar signs. Write expressions like 5x + 3 = 10. Avoid incorrect forms like 5$x$ + 3 = 10.`
    }
};

function existingTopicPrompt(subject, topic, count = 15) {
    const entry = promptLibrary?.[subject];
    if (entry && typeof entry.topic === 'function') {
        try {
            if (entry.topic.length >= 2) {
                return entry.topic(topic, count);
            }
            return entry.topic(topic);
        } catch (err) {
            console.warn('Error building legacy topic prompt, using fallback:', err?.message || err);
        }
    }
    return `Generate ${count} GED-style ${subject} questions focused on "${topic}".`;
}

app.get('/', (req, res) => {
  res.send('Learning Canvas Backend is running!');
});

// NEW FEATURE: Endpoint to define a word, as used in your index.html
app.post('/define-word', async (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).json({ error: 'A word is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
     if (!apiKey) {
        console.error('API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Provide a concise, GED-level definition for the word: "${word}".`;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await http.post(apiUrl, payload);
        const definition = response.data.candidates[0].content.parts[0].text;
        res.json({ definition });
    } catch (error) {
        console.error('Error calling Google AI API for definition:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get definition from AI service.' });
    }
});


// =================================================================
// REPLACED ROUTE: This now uses the "Variety Pack" logic.
// =================================================================
app.post('/api/topic-based/:subject', express.json(), async (req, res) => {
    const rawSubject = req.params.subject;
    const subject = normalizeSubjectParam(rawSubject);
    const { topic, difficulty } = req.body || {};
    const QUIZ_COUNT = 12;

    if (!subject) {
        return res.status(400).json({ success: false, error: 'Invalid subject' });
    }
    if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ success: false, error: 'Missing or invalid topic' });
    }

    try {
        console.log(`[Variety Pack] Starting generation for Subject: ${subject}, Topic: ${topic}`);

        // 1. Retrieve web context for relevant subjects
        const subjectNeedsRetrieval = ['Science', 'Social Studies', 'RLA', 'Reasoning Through Language Arts (RLA)'].includes(subject);
        const ctx = subjectNeedsRetrieval ? await retrieveSnippets(subject, topic) : [];
        console.log(`[Variety Pack] Retrieved ${ctx.length} context snippets.`);

        // 2. Find relevant images for Science, Social Studies, and Math
        const subjectNeedsImages = ['Science', 'Social Studies', 'Math'].includes(subject);
        const imgs = subjectNeedsImages ? findImagesForSubjectTopic(subject, topic, 6) : [];
        console.log(`[Variety Pack] Found ${imgs.length} candidate images.`);

        // 3. Build the "Variety Pack" prompt
        const prompt = buildTopicPrompt_VarietyPack(subject, topic, QUIZ_COUNT, ctx, imgs);

        // 4. Call the AI with fallback logic
        const { items: generatedItems, model: winnerModel, latencyMs } = await generateWithGemini_OneCall(subject, prompt)
            .then(items => ({ items, model: 'gemini', latencyMs: 0 })) // Simplified for clarity
            .catch(async (geminiErr) => {
                console.warn(`[Variety Pack] Gemini call failed: ${geminiErr.message}. Attempting ChatGPT fallback.`);
                const items = await generateWithChatGPT_Fallback(subject, prompt);
                return { items, model: 'chatgpt-fallback', latencyMs: 0 };
            });

        console.log(`[Variety Pack] Received ${generatedItems.length} items from AI model: ${winnerModel}.`);
        
        // 5. Post-processing and validation
        let items = generatedItems.map((it) => enforceWordCapsOnItem(it, subject));
        items = items.map(tagMissingItemType).map(tagMissingDifficulty);

        const bad = [];
        items.forEach((it, i) => { if (hasSchemaIssues(it)) bad.push(i); });

        if (bad.length) {
            console.log(`[Variety Pack] Repairing ${bad.length} items with schema issues...`);
            const toFix = bad.map(i => items[i]);
            const fixedSubset = await repairBatchWithChatGPT_once(toFix);
            if (Array.isArray(fixedSubset)) {
                fixedSubset.forEach((f, j) => {
                    const originalIndex = bad[j];
                    items[originalIndex] = enforceWordCapsOnItem(f, subject);
                });
                items = items.map(tagMissingItemType).map(tagMissingDifficulty); // Re-tag after repair
            }
        }

        // 6. Enforce mix, dedupe, and shuffle
        if (subject === 'Math') {
            items = enforceDifficultySpread(items, { easy: 4, medium: 5, hard: 3 });
            items = dedupeNearDuplicates(items, 0.85);
            items = shuffleArray(items);
        } else {
            items = enforceVarietyMix(items, { passage: 4, image: 3, standalone: 5 });
            items = enforceDifficultySpread(items, { easy: 4, medium: 5, hard: 3 });
            items = dedupeNearDuplicates(items, 0.85);
            items = groupedShuffle(items);
        }
        
        // 7. Final cleanup and response
        const finalItems = items.slice(0, QUIZ_COUNT).map((item, idx) => ({ ...normalizeStimulusAndSource(item), questionNumber: idx + 1 }));

        console.log(`[Variety Pack] Successfully generated and processed ${finalItems.length} questions.`);

        res.set('X-Model', winnerModel || 'unknown');
        res.set('X-Model-Latency-Ms', String(latencyMs ?? 0));
        res.json({
            success: true,
            subject,
            topic,
            items: finalItems,
            model: winnerModel || 'unknown',
            latencyMs: latencyMs ?? 0
        });

    } catch (err) {
        console.error('[Variety Pack] Generation failed:', err);
        const status = err?.statusCode || 500;
        res.status(status).json({ success: false, error: err.message || 'Failed to generate topic quiz.' });
    }
});


app.post('/api/math-autogen', async (_req, res) => {
    try {
        const items = await runExam();
        res.json({ items });
    } catch (error) {
        console.error('Failed to generate math autogen batch:', error.message || error);
        res.status(500).json({ error: 'Failed to generate math autogen batch.' });
    }
});

app.post('/api/exam/repair', express.json(), async (req, res) => {
    try {
        const items = Array.isArray(req.body?.items) ? req.body.items : [];
        const { fixed, repaired, failures } = await repairSubset(items);
        res.json({ items: fixed, repaired, failures });
    } catch (e) {
        res.status(500).json({ error: e?.message || 'repair failed' });
    }
});


function fixStr(value) {
    if (typeof value !== 'string') {
        return value;
    }
    let cleaned = value
        .replace(/\\\$/g, '$')
        .replace(new RegExp('\\\\`', 'g'), '`')
        .replace(/\$\$(?=\d)/g, '$');

    if (/\\+frac/.test(cleaned)) {
        cleaned = cleaned
            .replace(/\$\\\(/g, '\\(')
            .replace(/\\\)\$/g, '\\)')
            .replace(/\\{2,}frac/g, '\\frac');
    }

    return cleaned;
}

function cleanupQuizData(quiz) {
    return quiz;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function deriveStimulusGroupKey(x, idx = 0) {
    if (!x || typeof x !== 'object') return `solo:${idx}`;
    if (x.groupId && typeof x.groupId === 'string') return `gid:${x.groupId}`;
    if (x.stimulusImage?.src) return `img:${x.stimulusImage.src}`;
    if (x.passage && typeof x.passage === 'string') {
        const text = x.passage.trim();
        if (text.length) {
            const len = text.length;
            const first = text.charCodeAt(0);
            const last = text.charCodeAt(text.length - 1);
            const h = (len ^ (first << 5) ^ (last << 2)) >>> 0;
            return `p:${h}`;
        }
    }
    return `solo:${idx}`;
}

function groupedShuffle(items) {
    const groups = new Map();

    items.forEach((it, idx) => {
        const k = deriveStimulusGroupKey(it, idx);
        if (!groups.has(k)) groups.set(k, []);
        groups.get(k).push(it);
    });

    const groupKeys = Array.from(groups.keys());
    for (let i = groupKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
    }

    const out = [];
    for (const k of groupKeys) {
        const g = groups.get(k);
        for (let i = g.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [g[i], g[j]] = [g[j], g[i]];
        }
        out.push(...g);
    }
    return out;
}

function tagMissingItemType(x){
    const it = { ...x };
    if (!it.itemType) {
        if (it.passage) it.itemType = 'passage';
        else if (it.stimulusImage?.src) it.itemType = 'image';
        else it.itemType = 'standalone';
    }
    return it;
}

function tagMissingDifficulty(x){
    const it = { ...x };
    const level = typeof it.difficulty === 'string' ? it.difficulty.toLowerCase() : '';
    if (level === 'easy' || level === 'medium' || level === 'hard') {
        it.difficulty = level;
    } else {
        it.difficulty = 'medium';
    }
    return it;
}

function enforceVarietyMix(items, wanted){
    const out = [];
    const byType = { passage: [], image: [], standalone: [] };
    for (const it of items) (byType[it.itemType] ? byType[it.itemType] : byType.standalone).push(it);

    const take = (arr, n) => arr.slice(0, Math.max(0, n));
    out.push(...take(byType.passage, wanted.passage));
    out.push(...take(byType.image, wanted.image));
    out.push(...take(byType.standalone, wanted.standalone));

    const need = 12 - out.length;
    if (need > 0) {
        const pool = items.filter(it => !out.includes(it));
        out.push(...pool.slice(0, need));
    }
    return out.slice(0, 12);
}

function enforceDifficultySpread(items, target){
    const buckets = { easy:[], medium:[], hard:[], other:[] };
    for (const it of items) (buckets[it.difficulty] || buckets.other).push(it);

    const pick = [];
    const take = (arr, n) => arr.splice(0, Math.max(0, n));
    pick.push(...take(buckets.easy, target.easy));
    pick.push(...take(buckets.medium, target.medium));
    pick.push(...take(buckets.hard, target.hard));

    const rest = [...buckets.easy, ...buckets.medium, ...buckets.hard, ...buckets.other];
    while (pick.length < 12 && rest.length) pick.push(rest.shift());
    return pick.slice(0, 12);
}

function stemText(it){
    return (it.questionText || it.stem || '').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
}
function jaccard(a,b){
    const A = new Set(a.split(' ').filter(Boolean));
    const B = new Set(b.split(' ').filter(Boolean));
    const inter = [...A].filter(x=>B.has(x)).length;
    const uni = new Set([...A,...B]).size || 1;
    return inter/uni;
}
function dedupeNearDuplicates(items, threshold=0.85){
    const kept = [];
    for (const it of items) {
        const t = stemText(it);
        const dup = kept.some(k => jaccard(t, stemText(k)) >= threshold);
        if (!dup) kept.push(it);
    }
    const need = 12 - kept.length;
    if (need>0){
        const pool = items.filter(x => !kept.includes(x));
        kept.push(...pool.slice(0, need));
    }
    return kept.slice(0, 12);
}
// END: New Helper Functions

const singleQuestionSchema = {
    type: "OBJECT",
    properties: {
        type: { type: "STRING" },
        passage: { type: "STRING" },
        chartDescription: { type: "STRING" },
        questionText: { type: "STRING" },
        imageDescriptionForMatch: { type: "STRING" }, // For matching URLs
        answerOptions: {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    text: { type: "STRING" },
                    isCorrect: { type: "BOOLEAN" },
                    rationale: { type: "STRING" }
                },
                required: ["text", "isCorrect", "rationale"]
            }
        }
    },
    required: ["questionText", "answerOptions"]
};

const finalQuestionSchema = {
    type: "OBJECT",
    properties: {
        questionNumber: { type: "NUMBER" },
        type: { type: "STRING" },
        passage: { type: "STRING" },
        imageUrl: { type: "STRING" },
        questionText: { type: "STRING" },
        answerOptions: {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    text: { type: "STRING" },
                    isCorrect: { type: "BOOLEAN" },
                    rationale: { type: "STRING" }
                },
                required: ["text", "isCorrect", "rationale"]
            }
        }
    },
    required: ["questionNumber", "type", "questionText", "answerOptions"]
};

const quizSchema = {
    type: "OBJECT",
    properties: {
        id: { type: "STRING" },
        title: { type: "STRING" },
        subject: { type: "STRING" },
        questions: {
            type: "ARRAY",
            items: finalQuestionSchema
        }
    },
    required: ["id", "title", "subject", "questions"]
};

const MATH_VALIDATOR_SCHEMA = {
    type: "ARRAY",
    items: {
        type: "OBJECT",
        properties: {
            qid: { type: "STRING" },
            field: { type: "STRING" },
            corrected: { type: "STRING" },
            notes: { type: "STRING" }
        },
        required: ["qid", "field", "corrected"],
        additionalProperties: true
    }
};

function repairIllegalJsonEscapes(s) {
    if (typeof s !== 'string') return s;
    return s.replace(/\\(?!["\\\/bfnrtu])/g, '\\\\');
}

const callAI = async (prompt, schema, options = {}) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        throw new Error('Server configuration error: GOOGLE_AI_API_KEY is not set.');
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const { parser, onParserMetadata, generationOverrides, timeoutMs, signal } = options;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
            ...(generationOverrides || {})
        }
    };
    try {
        const requestConfig = {};
        if (timeoutMs) {
            requestConfig.timeout = timeoutMs;
        }
        if (signal) {
            requestConfig.signal = signal;
        }

        const response = await http.post(apiUrl, payload, requestConfig);
        const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (typeof rawText !== 'string') {
            throw new Error('AI response did not include text content.');
        }

        const cleanedText = rawText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        if (typeof parser === 'function') {
            const parsedResult = parser(cleanedText);
            if (parsedResult && typeof parsedResult === 'object' && Object.prototype.hasOwnProperty.call(parsedResult, 'value')) {
                onParserMetadata?.(parsedResult);
                return parsedResult.value;
            }
            onParserMetadata?.({ stage: 'custom-parser' });
            return parsedResult;
        }

        try {
            return JSON.parse(cleanedText);
        } catch (initialParseError) {
            const repairedText = repairIllegalJsonEscapes(cleanedText);
            try {
                const parsed = JSON.parse(repairedText);
                console.warn('Successfully repaired AI JSON response after initial parse failure.');
                return parsed;
            } catch (reparseError) {
                const snippet = repairedText.slice(0, 5000);
                console.error('Failed to parse AI JSON response after repair attempt.', {
                    initialError: initialParseError.message,
                    repairError: reparseError.message,
                    snippet,
                });
                throw reparseError;
            }
        }
    } catch (error) {
        console.error('Error calling Google AI API in callAI:', error.response ? error.response.data : error.message);
        throw error;
    }
};

async function callMathValidator(payload) {
    if (!MATH_TWO_PASS_ENABLED) {
        return [];
    }

    const system = payload?.system || VALIDATOR_SYSTEM_PROMPT;
    const user = payload?.user || VALIDATOR_USER_PROMPT;
    const prompt = `SYSTEM:\n${system}\n\nUSER:\n${user}`;

    try {
        return await callAI(prompt, MATH_VALIDATOR_SCHEMA, {
            generationOverrides: { temperature: 0.2 }
        });
    } catch (error) {
        console.error('Math validator call failed; continuing with auto-fixed text.', error.message || error);
        return [];
    }
}

async function runMathTwoPassOnQuestions(questions, subject) {
    if (!MATH_TWO_PASS_ENABLED) {
        return;
    }

    if (!Array.isArray(questions) || !questions.length) {
        return;
    }

    const exam = {
        subject: subject || '',
        questions: []
    };

    const questionMap = new Map();

    questions.forEach((question, index) => {
        if (!question || typeof question !== 'object') {
            return;
        }

        const qid = String(
            question.id != null
                ? question.id
                : question.questionNumber != null
                    ? question.questionNumber
                    : `math-${index}`
        );

        const choiceMap = new Map();
        const choices = Array.isArray(question.answerOptions)
            ? question.answerOptions.map((opt, idx) => {
                const choiceId = String(opt && opt.id != null ? opt.id : idx);
                if (opt) {
                    choiceMap.set(choiceId, opt);
                }
                return {
                    id: choiceId,
                    text: typeof (opt && opt.text) === 'string' ? opt.text : ''
                };
            })
            : [];

        questionMap.set(qid, {
            original: question,
            choices: choiceMap
        });

        exam.questions.push({
            id: qid,
            stem: typeof question.questionText === 'string' ? question.questionText : '',
            choices,
            explanation: typeof question.rationale === 'string' ? question.rationale : undefined
        });
    });

    if (!exam.questions.length) {
        return;
    }

    const processed = await generateMathExamTwoPass(() => Promise.resolve(exam), callMathValidator);

    if (!processed || !Array.isArray(processed.questions)) {
        return;
    }

    processed.questions.forEach((processedQuestion) => {
        const entry = questionMap.get(String(processedQuestion.id));
        if (!entry) {
            return;
        }

        const { original, choices } = entry;

        if (typeof processedQuestion.stem === 'string') {
            original.questionText = processedQuestion.stem;
        }

        if (Array.isArray(processedQuestion.choices)) {
            processedQuestion.choices.forEach((choice) => {
                const target = choices.get(String(choice.id));
                if (target && typeof choice.text === 'string') {
                    target.text = choice.text;
                }
            });
        }

        if (typeof processedQuestion.explanation === 'string') {
            if (original.rationale !== undefined) {
                original.rationale = processedQuestion.explanation;
            } else if (processedQuestion.explanation.length) {
                original.rationale = processedQuestion.explanation;
            }
        }
    });
}

// Helper functions for generating different types of quiz content

const generatePassageSet = async (topic, subject, numQuestions, options = {}) => {
    const prompt = `You are a GED exam creator. Generate a short, GED-style reading passage (150-250 words) on the topic of '${topic}'. The content MUST be strictly related to the subject of '${subject}'.
    Then, based ONLY on the passage, generate ${numQuestions} unique multiple-choice questions. VARY THE QUESTION TYPE: ask about main idea, details, vocabulary, or inferences. The question text MUST NOT repeat the passage.
    Output a single valid JSON object with keys "passage" and "questions".`;

    const questionSchema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };

    const schema = {
        type: "OBJECT",
        properties: {
            passage: { type: "STRING" },
            questions: { type: "ARRAY", items: questionSchema }
        },
        required: ["passage", "questions"]
    };

    const result = await callAI(prompt, schema, options);
    return result.questions.map(q => enforceWordCapsOnItem({
        ...q,
        passage: result.passage,
        type: 'passage'
    }, subject));
};


const generateImageQuestion = async (topic, subject, imagePool, numQuestions, options = {}) => {
    // Filter by subject AND the specific topic (category)
    let relevantImages = imagePool.filter(img => img.subject === subject && img.category === topic);
    let selectedImage;

    if (relevantImages.length > 0) {
        selectedImage = relevantImages[Math.floor(Math.random() * relevantImages.length)];
    } else {
        // Fallback to just subject if no images match the specific topic
        const subjectImages = imagePool.filter(img => img.subject === subject);
        if (subjectImages.length === 0) return null; // No images for this subject at all
        selectedImage = subjectImages[Math.floor(Math.random() * subjectImages.length)];
    }

    if (!selectedImage) return null;

    const imagePrompt = `You are a GED exam creator. This stimulus is for an IMAGE from the topic '${topic}'.
Based on the following image context, generate a set of ${numQuestions} unique questions that require visual interpretation, asking about the main idea, symbolism, or specific details.

**Image Context:**
- **Description:** ${selectedImage.detailedDescription}
- **Usage Directives:** ${selectedImage.usageDirectives || 'N/A'}

Output a JSON array of the question objects, each including an 'imagePath' key with the value '${selectedImage.filePath}'.`;

    const imageQuestionSchema = {
        type: "ARRAY",
        items: {
            type: "OBJECT",
            properties: {
                questionText: { type: "STRING" },
                answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } },
                imagePath: { type: "STRING" }
            },
            required: ["questionText", "answerOptions", "imagePath"]
        }
    };

    try {
        const questions = await callAI(imagePrompt, imageQuestionSchema, options);
        // Map imagePath to imageUrl and add type
        return questions.map(q => enforceWordCapsOnItem({
            ...q,
            imageUrl: q.imagePath.replace(/^\/frontend/, ''), // Keep this transformation
            type: 'image'
        }, subject));
    } catch (error) {
        console.error(`Error generating image question for topic ${topic}:`, error);
        return null; // Return null or empty array on error to not break Promise.all
    }
};

const generateStandaloneQuestion = async (subject, topic, options = {}) => {
    let prompt;
    // Conditional prompt based on the subject
    if (subject === 'Math') {
        prompt = `Generate a single, standalone, GED-style math word problem or calculation problem for the topic "${topic}".
        STRICT REQUIREMENT: The question MUST be a math problem that requires mathematical reasoning to solve.
        DO NOT generate a reading passage or a reading comprehension question (e.g., "What is the main idea...").
        IMPORTANT: For all mathematical expressions, including fractions, exponents, and symbols, you MUST format them using KaTeX-compatible LaTeX syntax enclosed in single dollar signs. For example, a fraction like 'five eighths' must be written as '$\\frac{5}{8}$', an exponent like 'x squared' must be '$x^2$', and a division symbol should be '$\\div$' where appropriate.
        CRITICAL RULE FOR CURRENCY: Always use a literal dollar sign before the number, like '$50.25'. NEVER wrap currency in math delimiters such as '$$50.25$'. Do not use '$...$' for currency; write $30 or 30 dollars, never place the dollar sign after the number, and never wrap currency in LaTeX.
        CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
        Output a single valid JSON object for the question, including "questionText", and "answerOptions" (an array of objects with "text", "isCorrect", and "rationale").`;
    } else {
        prompt = `Generate a single, standalone, GED-style multiple-choice question for the subject "${subject}" on the topic of "${topic}".
        The question should not require any external passage, chart, or image.
        Output a single valid JSON object for the question, including "questionText", and "answerOptions" (an array of objects with "text", "isCorrect", and "rationale").`;
    }

    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };

    const question = await callAI(prompt, schema, options);
    question.type = 'standalone';
    return enforceWordCapsOnItem(question, subject);
};

const buildGeometryPrompt = (topic, attempt) => {
    const decimalLimit = DEFAULT_MAX_DECIMALS;
    const sharedConstraints = `Return a single JSON object only.\nAll numeric values must be JSON numbers with at most ${decimalLimit} decimal places (no strings).\nDo not use scientific notation.\nValidate that your JSON is syntactically correct before returning it.`;

    if (!GEOMETRY_FIGURES_ENABLED) {
        const basePrompt = `You are a GED exam creator. Generate a single, unique, GED-style multiple-choice geometry word problem related to "${topic}".
    The problem should clearly rely on a diagram that would normally accompany the question.
    IMPORTANT: Do NOT return any images, SVG markup, or geometry specifications. Instead, append a concise, human-readable description of the required diagram (1–3 sentences) at the end of the question stem. Use plain text or simple Markdown only.
    ${sharedConstraints}

    Output JSON with the exact structure:
    {
      "question": string,
      "choices": [string, string, string, string],
      "answerIndex": number
    }

    • Set "answerIndex" to the zero-based index of the correct choice.
    • Ensure "choices" are unique and relevant to the problem context.
    • Keep all numeric entries as JSON numbers with at most ${decimalLimit} decimal places.
    • Keep the language consistent with GED Geometry expectations.
    • Focus on standard GED geometry figures such as ${SUPPORTED_SHAPES.join(', ')} when relevant to the problem.

    Respond with JSON only—no commentary before or after the object.`;

        if (attempt > 1) {
            return `${basePrompt}\nDouble-check that the diagram description is appended and that no SVG or geometry specification is returned.`;
        }

        return basePrompt;
    }

    const shapesList = SUPPORTED_SHAPES.join(', ');
    const basePrompt = `You are a GED exam creator. Generate a single, unique, GED-style multiple-choice geometry word problem related to "${topic}".
    The problem MUST require a visual diagram to be solved and should stay aligned with GED Geometry expectations.
    IMPORTANT: Format mathematical expressions for the question and choices using KaTeX-compatible LaTeX enclosed in single dollar signs when appropriate (fractions, exponents, radicals, etc.).
    ${sharedConstraints}\nKeep all coordinate values between 0 and 100.

    Output JSON with the exact structure:
    {
      "question": string,
      "choices": [string, string, string, string],
      "choiceRationales": [string, string, string, string],
      "answerIndex": number,
      "geometrySpec": {
        "shape": string,
        "params": object,
        "view": object (optional),
        "style": object (optional)
      }
    }

    • Set "answerIndex" to the zero-based index of the correct choice.
    • Ensure "choices" and "choiceRationales" have the same length and ordering.
    • Use one of the supported shapes: ${shapesList}.
    • Keep all numeric entries as JSON numbers with at most ${decimalLimit} decimal places.

    Geometry spec requirements:
    • For triangle / right_triangle / polygon: provide "points" as an array of objects {"label": "A", "x": 10, "y": 20}.  Include any side length labels with "sideLabels": [{"between": ["A","B"], "text": "12 cm"}].  For right triangles include "rightAngle": {"vertex": "B", "size": 12} referencing one of the labeled points.
    • For rectangle: provide "origin" (top-left point), "width", "height", and optional "labels" [{"text": "5 cm", "x": 50, "y": 10}].
    • For circle: include "center" {"x": 50, "y": 50}, "radius", and optional labeled points in "points".
    • For regular_polygon: specify "center", "radius", "sides", and optional starting angle "startAngle" (degrees).
    • For line_angle: include "vertex", "ray1", and "ray2" points plus optional "angleLabel" and "angleDegrees".
    • For cylinder_net: include numeric "radius" and "height" plus any labels needed for the net.
    • For rect_prism_net: include numeric "length", "width", and "height" and describe labels for key faces.
    • Optional helper data such as "segments", "labels", or "view" may be included for clarity.  Keep the structure deterministic.

    Respond with JSON only—no commentary before or after the object.`;

    if (attempt > 1) {
        return `${basePrompt}\nDouble-check every number for the decimal rule before returning the JSON.`;
    }

    return basePrompt;
};

async function generateGeometryQuestion(topic, subject, attempt = 1, options = {}) {
    const MAX_ATTEMPTS = 2;
    const prompt = buildGeometryPrompt(topic, attempt);
    const schema = buildGeometrySchema(GEOMETRY_FIGURES_ENABLED);
    const parseMeta = { stage: null, hash: null };
    const recordStage = (stage, details = {}) => {
        parseMeta.stage = stage;
        if (details.hash) {
            parseMeta.hash = details.hash;
        }
    };

    try {
        const callOptions = GEOMETRY_FIGURES_ENABLED
            ? {
                  parser: raw => parseGeometryJson(raw, {
                      maxDecimals: DEFAULT_MAX_DECIMALS,
                      featureEnabled: SANITIZER_FEATURE_ENABLED,
                      onStage: recordStage
                  }),
                  onParserMetadata: meta => {
                      if (meta.stage) {
                          parseMeta.stage = meta.stage;
                      }
                      if (meta.hash) {
                          parseMeta.hash = meta.hash;
                      }
                  },
                  generationOverrides: attempt > 1 ? { temperature: 0.1 } : undefined
              }
            : attempt > 1
                ? { generationOverrides: { temperature: 0.1 } }
                : {};

        const mergedOptions = {
            ...callOptions,
            ...options
        };
        if (callOptions?.generationOverrides || options?.generationOverrides) {
            mergedOptions.generationOverrides = {
                ...(callOptions?.generationOverrides || {}),
                ...(options?.generationOverrides || {})
            };
        }

        const aiResponse = await callAI(prompt, schema, mergedOptions);

        if (GEOMETRY_FIGURES_ENABLED && parseMeta.stage) {
            console.info(`Geometry JSON parsed via ${parseMeta.stage}. hash=${parseMeta.hash || 'n/a'}`);
        }

        const { question, choices, answerIndex } = aiResponse;
        const choiceRationales = Array.isArray(aiResponse.choiceRationales)
            ? aiResponse.choiceRationales
            : [];
        const geometrySpec = GEOMETRY_FIGURES_ENABLED ? aiResponse.geometrySpec : undefined;

        const answerOptions = (choices || []).map((text, index) => ({
            text,
            isCorrect: index === answerIndex,
            rationale: (choiceRationales && choiceRationales[index]) || ''
        }));

        const questionPayload = {
            type: 'geometry',
            questionText: question,
            answerOptions
        };

        if (GEOMETRY_FIGURES_ENABLED && geometrySpec) {
            questionPayload.geometrySpec = geometrySpec;
        }

        return questionPayload;
    } catch (error) {
        if (error instanceof GeometryJsonError && error.needRegen) {
            console.warn(`Geometry JSON parsing failed at stage ${error.stage}. hash=${error.hash || 'n/a'}`);
            if (attempt < MAX_ATTEMPTS) {
                console.log(`Retrying geometry question generation with strict prompt (attempt ${attempt + 1})...`);
                return generateGeometryQuestion(topic, subject, attempt + 1, options);
            }
        }

        console.error(`Error generating geometry question on attempt ${attempt}.`, error.message);
        if (error.response && error.response.data) {
            console.error('Geometry generation API error payload (redacted).');
        }

        if (attempt >= MAX_ATTEMPTS) {
            console.error('Max retries reached for geometry question generation. Returning null.');
        }

        return null;
    }
}

async function generateNonCalculatorQuestion(options = {}) {
    const prompt = `You are a GED Math exam creator specializing in non-calculator questions.
    Generate a single, high-quality question from the "Number Sense & Operations" domain (GED Indicator Q.1 or Q.2).
    The question must be solvable without a calculator, focusing on concepts like number properties, estimation, or basic arithmetic with integers, fractions, and decimals.
    CRITICAL: Do NOT generate a question that requires complex calculations.
    IMPORTANT: For all mathematical expressions, including fractions and exponents, you MUST use KaTeX-compatible LaTeX syntax enclosed in single dollar signs (e.g., '$\\frac{5}{8}$', '$x^2$').
    CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
    Output a single valid JSON object for the question.`;
    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };
    const question = await callAI(prompt, schema, options);
    question.type = 'standalone';
    question.calculator = false; // Explicitly mark as non-calculator
    return enforceWordCapsOnItem(question, 'Math');
}

async function generateDataQuestion(options = {}) {
    const prompt = `You are a GED Math exam creator.
    Generate a single, high-quality, data-based question.
    FIRST, create a simple HTML table with a caption, 2-4 columns, and 3-5 rows of numerical data.
    SECOND, write a question that requires interpreting that table to find the mean, median, mode, or range.
    The question text MUST reference the HTML table.
    IMPORTANT: For all mathematical expressions, use KaTeX-compatible LaTeX syntax enclosed in single dollar signs.
    CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
    Output a single valid JSON object containing the 'questionText' (which INCLUDES the HTML table) and 'answerOptions'.`;

    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };
    const question = await callAI(prompt, schema, options);
    question.type = 'standalone'; // The table is part of the question text
    question.calculator = true;
    return enforceWordCapsOnItem(question, 'Math');
}

async function generateGraphingQuestion(options = {}) {
    const prompt = `You are a GED Math exam creator.
    Generate a single, high-quality, GED-style question about functions or interpreting graphs (GED Indicators A.5, A.6, A.7).
    The question should focus on one of these concepts:
    - Determining the slope of a line from a graph or equation.
    - Understanding and using function notation (e.g., f(x) = 2x + 1, find f(3)).
    - Interpreting a graph to identify relationships between variables, find specific points, or determine intercepts.
    You can optionally reference one of the curated graph images if the context fits.
    IMPORTANT: Use KaTeX-compatible LaTeX for all mathematical notation (e.g., '$f(x)$', '$x^2$').
    CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
    Output a single valid JSON object for the question.`;
    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };
    const question = await callAI(prompt, schema, options);
    question.type = 'standalone';
    question.calculator = true;
    return enforceWordCapsOnItem(question, 'Math');
}

async function generateMath_FillInTheBlank(options = {}) {
    const prompt = `You are a GED Math exam creator. Your single most important task is to ensure all mathematical notation is perfectly formatted for KaTeX.
- All fractions MUST be in the format '$\\frac{numerator}{denominator}$'.
- All LaTeX expressions MUST be enclosed in single dollar signs '$'.

With those rules in mind, generate a single, high-quality, GED-style math question (from any topic area) that requires a single numerical or simple fractional answer (e.g., 25, -10, 5/8).
CRITICAL: The question MUST NOT have multiple-choice options. The answer should be a number that the user would type into a box.
CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
Output a single valid JSON object with three keys:
1. "type": a string with the value "fill-in-the-blank".
2. "questionText": a string containing the full question.
3. "correctAnswer": a NUMBER or STRING containing the exact correct answer.`;

    const schema = {
        type: "OBJECT",
        properties: {
            type: { type: "STRING", enum: ["fill-in-the-blank"] },
            questionText: { type: "STRING" },
            correctAnswer: { type: 'STRING' }
        },
        required: ["type", "questionText", "correctAnswer"]
    };
    const question = await callAI(prompt, schema, options);
    question.calculator = true; // Most fill-in-the-blank will be calculator-permitted
    return enforceWordCapsOnItem(question, 'Math');
}

async function generateRlaPart1(options = {}) {
    const prompt = `${STRICT_JSON_HEADER_RLA}
Create the Reading Comprehension section of a GED RLA exam. Produce exactly 4 passages: 2 informational texts, 1 literary prose text (like a short story excerpt), and 1 public domain poem. Each passage should be an appropriate length for a GED test, have a title in <strong> tags, and use <p> tags for paragraphs. For EACH of the 4 passages, generate exactly 5 reading comprehension questions (total 20). Return the JSON array of question objects only.`;
    const schema = { type: "ARRAY", items: singleQuestionSchema };
    const questions = await callAI(prompt, schema, options);
    const cappedQuestions = Array.isArray(questions)
        ? questions.map((q) => enforceWordCapsOnItem(q, 'RLA'))
        : [];
    // Group questions by passage
    const passages = {};
    let passageCounter = 0;
    let currentPassageTitle = '';
    cappedQuestions.forEach(q => {
        if (q.passage && q.passage !== currentPassageTitle) {
            currentPassageTitle = q.passage;
            passageCounter++;
        }
        const passageKey = `Passage ${passageCounter}`;
        if (!passages[passageKey]) passages[passageKey] = { passage: q.passage, questions: [] };
        passages[passageKey].questions.push(q);
    });

    let groupedQuestions = [];
    Object.values(passages).forEach(p => {
        p.questions.forEach(q => groupedQuestions.push(enforceWordCapsOnItem({ ...q, passage: p.passage, type: 'passage' }, 'RLA')));
    });
    return groupedQuestions;
}

async function generateRlaPart2(options = {}) {
    const prompt = `
You are an expert GED exam content creator. Your task is to generate the "Extended Response" (essay) portion of the Reasoning Through Language Arts (RLA) test.

The output MUST be a single JSON object with three specific keys: "passage1", "passage2", and "prompt".

**Content and Formatting Rules:**

1.  **Generate Two Passages:**
    * Create two source texts, \`passage1\` and \`passage2\`.
    * The two passages MUST present opposing or conflicting arguments on the same non-controversial, accessible topic (e.g., the benefits of year-round schooling, the impact of technology on communication, the value of mandatory community service).
    * Each passage MUST be between **250 and 350 words**. This word count is a strict requirement.
    * Each passage must start with a title enclosed in \`<strong>\` tags.
    * The content should be written at a level appropriate for a high school equivalency test-taker.

2.  **Generate the Essay Prompt:**
    * The \`prompt\` key must contain the specific instructions for the test-taker. It should follow this exact template:
        "The following two passages present opposing arguments on the topic of [Your Topic Here]. Analyze both passages to determine which position is better supported by evidence. Write an essay in which you explain your conclusion. Use specific details and examples from both texts to support your analysis. Your essay should be approximately 4-5 paragraphs long."

**Example of the Required JSON Output Structure:**

\`\`\`json
{
  "passage1": "<strong>Title for Passage One</strong><p>Text of the first passage, presenting one side of the argument, strictly between 250 and 350 words...</p>",
  "passage2": "<strong>Title for Passage Two</strong><p>Text of the second passage, presenting the opposing side of the argument, strictly between 250 and 350 words...</p>",
  "prompt": "The following two passages present opposing arguments on the topic of [Your Topic Here]. Analyze both passages to determine which position is better supported by evidence. Write an essay in which you explain your conclusion. Use specific details and examples from both texts to support your analysis. Your essay should be approximately 4-5 paragraphs long."
}
\`\`\`

Now, generate the content.
`;
    const schema = {
        type: "OBJECT",
        properties: {
            passages: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, content: { type: "STRING" } } } },
            prompt: { type: "STRING" }
        },
        required: ["passages", "prompt"]
    };
    const result = await callAI(prompt, schema, options);
    if (Array.isArray(result?.passages)) {
        result.passages = result.passages.map((p) => ({
            ...p,
            content: limitWords(p?.content || '', 250)
        }));
    }
    if (typeof result?.prompt === 'string') {
        result.prompt = limitWords(result.prompt, 250);
    }
    return result;
}

async function generateRlaPart3(options = {}) {
    const prompt = `${STRICT_JSON_HEADER_RLA}
Generate the Language and Grammar section of a GED RLA exam. Create 7 short passages (1-2 paragraphs each, keep each passage <= 250 words). The passages should contain a mix of grammatical errors and/or awkward phrasing. For EACH of the 7 passages, generate 3-4 questions focused on correcting sentences and improving word choice. This should total 25 questions. Return only the JSON array of the 25 question objects.`;
    const schema = { type: "ARRAY", items: singleQuestionSchema };
    const questions = await callAI(prompt, schema, options);
    const cappedQuestions = Array.isArray(questions)
        ? questions.map((q) => enforceWordCapsOnItem(q, 'RLA'))
        : [];
    // Group questions by passage
    const passages = {};
    let passageCounter = 0;
    let currentPassageTitle = '';
    cappedQuestions.forEach(q => {
        if (q.passage && q.passage !== currentPassageTitle) {
            currentPassageTitle = q.passage;
            passageCounter++;
        }
        const passageKey = `Passage ${passageCounter}`;
        if (!passages[passageKey]) passages[passageKey] = { passage: q.passage, questions: [] };
        passages[passageKey].questions.push(q);
    });
     let groupedQuestions = [];
    Object.values(passages).forEach(p => {
        p.questions.forEach(q => groupedQuestions.push(enforceWordCapsOnItem({ ...q, passage: p.passage, type: 'passage' }, 'RLA')));
    });
    return groupedQuestions;
}

async function reviewAndCorrectQuiz(draftQuiz, options = {}) {
    const prompt = `You are a meticulous GED exam editor. Review the provided JSON for a ${draftQuiz.questions.length}-question ${draftQuiz.subject} exam. Your task is to review and improve it based on these rules:
    1.  **IMPROVE QUESTION VARIETY:** The top priority. If you see repetitive question phrasing, rewrite some questions to ask about specific details, inferences, or data points.
    2.  **ENSURE CLARITY:** Fix any grammatical errors or awkward phrasing.
    3.  **MAINTAIN JSON STRUCTURE:** The final output MUST be a perfectly valid JSON object that strictly adheres to the original schema. Do not change any field names.

    Here is the draft quiz JSON:
    ---
    ${JSON.stringify(draftQuiz, null, 2)}
    ---
    Return the corrected and improved quiz as a single, valid JSON object.`;
        const correctedQuiz = await callAI(prompt, quizSchema, options);
        return correctedQuiz;
    }

async function reviewAndCorrectMathQuestion(questionObject, options = {}) {
    const prompt = `You are an expert GED math editor. Your ONLY job is to fix formatting in the following JSON object. **Aggressively correct all syntax errors.**
**CRITICAL RULES:**
1.  **FIX FRACTIONS:** Convert all slash fractions (e.g., \`$1/2$\`) to use the \`\\frac\` command (e.g., \`$\\frac{1}{2}$\`).
2.  **FIX LATEX:** Ensure all LaTeX commands have a leading backslash (e.g., \`frac\` becomes \`\\frac\`).
3.  **FIX DELIMITERS:** Ensure all math expressions are properly enclosed in single dollar signs '$'.
4.  **FIX ANSWERS:** Remove any \`$$\` prefixes from the 'text' field in 'answerOptions'. Currency in answers should be a single '$', like '$15.50'.
5.  **FIX HTML:** Simplify any HTML tables by removing ALL inline CSS (e.g., \`style="..."\`).

Return only the corrected, valid JSON object, preserving all other fields and values.

Faulty JSON:
${JSON.stringify(questionObject)}
`;

    // CORRECTED SCHEMA
    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        text: { type: "STRING" },
                        isCorrect: { type: "BOOLEAN" },
                        rationale: { type: "STRING" }
                    },
                    required: ["text", "isCorrect", "rationale"]
                }
            },
            questionType: { type: "STRING" }, // Renamed from "type"
            calculator: { type: "BOOLEAN" },
            questionNumber: { type: "NUMBER" },
            imageUrl: { type: "STRING" },
            correctAnswer: { type: "STRING" } // Changed from list to single type
        },
        required: ["questionText"]
    };

    try {
        const correctedQuestion = await callAI(prompt, schema, options);
        // Preserve original properties that might not be in the schema
        return { ...questionObject, ...correctedQuestion };
    } catch (error) {
        console.error("Error correcting math question, returning original:", error);
        return questionObject; // Return original on failure
    }
}


app.post('/api/generate/topic', express.json(), async (req, res) => {
    let { subject, topic } = req.body || {};

    if (!subject || typeof subject !== 'string' || !topic || typeof topic !== 'string') {
        return res.status(400).json({ error: 'Invalid subject or topic provided.' });
    }

    subject = subject.trim();
    topic = topic.trim();

    if (!subject || !topic) {
        return res.status(400).json({ error: 'Invalid subject or topic provided.' });
    }

    const QUIZ_COUNT = 12;
    try {
        const subjectNeedsRetrieval = TOPIC_STIMULUS_SUBJECTS.has(subject);
        const subjectNeedsImages = TOPIC_STIMULUS_SUBJECTS.has(subject);

        let prompt;
        if (subject === 'RLA' && topic === 'Poetry Analysis') {
            prompt = `${STRICT_JSON_HEADER_RLA}
Generate a 12-question quiz based on a single, well-known, public-domain poem suitable for a GED-level audience.
First, select a complete poem (e.g., by Robert Frost, Emily Dickinson, Langston Hughes, or from public-domain-poetry.com).
The 'passage' for ALL 12 questions MUST be the full text of this single poem.
The questions should analyze the poem's theme, tone, structure, figurative language (metaphors, similes), and word choice.
All 12 items must share the same 'passage' field. Assign the same 'groupId' to all 12 items.`;
        } else {
            // This is the existing logic
            const ctx = subjectNeedsRetrieval
                ? await retrieveSnippets(subject, topic)
                : [];

            const imgs = subjectNeedsImages
                ? findImagesForSubjectTopic(subject, topic, 6)
                : [];

            prompt = buildTopicPrompt_VarietyPack(subject, topic, QUIZ_COUNT, ctx, imgs);
        }

        const { items: generatedItems, model: winnerModel, latencyMs } = await generateQuizItemsWithFallback(
            subject,
            prompt,
            {
                retries: 2,
                minTimeout: 800,
                onFailedAttempt: (err, n) => console.warn(`[retry ${n}] Gemini topic pack generation failed: ${err?.message || err}`)
            }
        );

        let items = generatedItems.map((it) => enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(it)), subject));
        items = items.map(tagMissingItemType).map(tagMissingDifficulty);

        const bad = [];
        items.forEach((it, i) => { if (!validateQuestion(it)) bad.push(i); });

        if (bad.length) {
            const fixed = await withRetry(
                () => repairBatchWithChatGPT_once(bad.map(i => items[i])),
                {
                    retries: 2,
                    minTimeout: 800,
                    onFailedAttempt: (err, n) => console.warn(`[retry ${n}] ChatGPT topic pack repair failed: ${err?.message || err}`)
                }
            );
            fixed.forEach((f, j) => {
                items[bad[j]] = enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(f)), subject);
            });
            items = items.map(tagMissingItemType).map(tagMissingDifficulty);
        }

        items = enforceVarietyMix(items, { passage: 4, image: 3, standalone: 5 });
        items = enforceDifficultySpread(items, { easy: 4, medium: 5, hard: 3 });
        items = dedupeNearDuplicates(items, 0.85);
        items = groupedShuffle(items);
        items = items.map(tagMissingItemType).map(tagMissingDifficulty);
        items = items.slice(0, QUIZ_COUNT).map((item, idx) => ({ ...item, questionNumber: idx + 1 }));

        res.set('X-Model', winnerModel || 'unknown');
        res.set('X-Model-Latency-Ms', String(latencyMs ?? 0));
        res.json({ subject, topic, items, model: winnerModel || 'unknown', latencyMs: latencyMs ?? 0 });
    } catch (err) {
        console.error('topic generation failed', err);
        const status = err?.statusCode === 504 ? 504 : 500;
        const body = err?.statusCode === 504
            ? { error: 'AI timed out', model: 'timeout', latencyMs: err?.latencyMs ?? MODEL_HTTP_TIMEOUT_MS }
            : { error: 'Failed to generate topic quiz.' };
        if (status === 504) {
            res.set('X-Model', 'timeout');
            res.set('X-Model-Latency-Ms', String(err?.latencyMs ?? MODEL_HTTP_TIMEOUT_MS));
        }
        res.status(status).json(body);
    }
});

app.get('/metrics/ai', (_req, res) => {
    const stats = AI_LATENCY.stats();
    const toSec = (value) => Math.round((value || 0) / 1000);
    res.json({
        model: 'gemini+chatgpt-fallback',
        count: stats.count,
        p50s: toSec(stats.p50),
        p95s: toSec(stats.p95),
        p99s: toSec(stats.p99),
        avgs: toSec(stats.avg)
    });
});


app.post('/generate-quiz', async (req, res) => {
    const { subject, topic, comprehensive } = req.body;

    if (subject === undefined || comprehensive === undefined) {
        return res.status(400).json({ error: 'Subject and comprehensive flag are required.' });
    }

    const examType = comprehensive ? 'comprehensive' : 'standard';
    const generationStart = Date.now();

    if (comprehensive) {
        // --- COMPREHENSIVE EXAM LOGIC ---
        if (subject === 'Social Studies') {
            try {
                const timeoutMs = selectModelTimeoutMs({ examType });
                const aiOptions = { timeoutMs };
                const blueprint = {
                    'Civics & Government':    { passages: 3, images: 2, standalone: 3 },
                    'U.S. History':           { passages: 3, images: 2, standalone: 1 },
                    'Economics':              { passages: 3, images: 1, standalone: 0 },
                    'Geography & the World':  { passages: 3, images: 1, standalone: 0 }
                };
                const TOTAL_QUESTIONS = 35;
                let promises = [];

                for (const [category, counts] of Object.entries(blueprint)) {
                    for (let i = 0; i < counts.passages; i++) promises.push(generatePassageSet(category, subject, Math.random() > 0.5 ? 2 : 1, aiOptions));
                    for (let i = 0; i < counts.images; i++) promises.push(generateImageQuestion(category, subject, curatedImages, Math.random() > 0.5 ? 2 : 1, aiOptions));
                    for (let i = 0; i < counts.standalone; i++) promises.push(generateStandaloneQuestion(subject, category, aiOptions));
                }

                const results = await Promise.all(promises);
                let allQuestions = results.flat().filter(q => q);
                // The user wants to remove the shuffle to keep question sets grouped.
                const draftQuestionSet = allQuestions.slice(0, TOTAL_QUESTIONS);
                draftQuestionSet.forEach((q, index) => { q.questionNumber = index + 1; });

                const draftQuiz = {
                    id: `ai_comp_ss_draft_${new Date().getTime()}`,
                    title: `Comprehensive Social Studies Exam`,
                    subject: subject,
                    questions: draftQuestionSet,
                };

                console.log("Social Studies draft complete. Sending for second pass review...");
                const finalQuiz = await reviewAndCorrectQuiz(draftQuiz, aiOptions);
                logGenerationDuration(examType, subject, generationStart);
                res.json(finalQuiz);

            } catch (error) {
                console.error('Error generating Social Studies exam:', error);
                logGenerationDuration(examType, subject, generationStart, 'failed');
                res.status(500).json({ error: 'Failed to generate Social Studies exam.' });
            }
        } else if (subject === 'Science') {
            try {
                const timeoutMs = selectModelTimeoutMs({ examType });
                const aiOptions = { timeoutMs };
                const blueprint = {
                    'Life Science': { passages: 3, images: 3, standalone: 6 },
                    'Physical Science': { passages: 3, images: 2, standalone: 6 },
                    'Earth & Space Science': { passages: 2, images: 1, standalone: 2 }
                };
                const TOTAL_QUESTIONS = 38;
                let promises = [];

                for (const [category, counts] of Object.entries(blueprint)) {
                    for (let i = 0; i < counts.passages; i++) promises.push(generatePassageSet(category, subject, Math.random() > 0.5 ? 2 : 1, aiOptions));
                    for (let i = 0; i < counts.images; i++) promises.push(generateImageQuestion(category, subject, curatedImages, Math.random() > 0.5 ? 2 : 1, aiOptions));
                    for (let i = 0; i < counts.standalone; i++) promises.push(generateStandaloneQuestion(subject, category, aiOptions));
                }

                const results = await Promise.all(promises);
                let allQuestions = results.flat().filter(q => q);
                const draftQuestionSet = allQuestions.slice(0, TOTAL_QUESTIONS);
                draftQuestionSet.forEach((q, index) => { q.questionNumber = index + 1; });

                const draftQuiz = {
                    id: `ai_comp_sci_draft_${new Date().getTime()}`,
                    title: `Comprehensive Science Exam`,
                    subject: subject,
                    questions: draftQuestionSet,
                };

                console.log("Science draft complete. Sending for second pass review...");
                const finalQuiz = await reviewAndCorrectQuiz(draftQuiz, aiOptions);
                logGenerationDuration(examType, subject, generationStart);
                res.json(finalQuiz);

            } catch (error) {
                console.error('Error generating Science exam:', error);
                logGenerationDuration(examType, subject, generationStart, 'failed');
                res.status(500).json({ error: 'Failed to generate Science exam.' });
            }
        } else if (subject === 'Reasoning Through Language Arts (RLA)') {
    try {
        console.log("Generating comprehensive RLA exam...");

        const timeoutMs = selectModelTimeoutMs({ examType });
        const aiOptions = { timeoutMs };

        const [part1Questions, part2Essay, part3Questions] = await Promise.all([
            generateRlaPart1(aiOptions),
            generateRlaPart2(aiOptions),
            generateRlaPart3(aiOptions)
        ]);

        const isNonEmptyArray = (value) => Array.isArray(value) && value.length > 0;
        const hasContent = (text) => typeof text === 'string' && text.trim().length > 0;
        const isValidEssay = (essay) => {
            if (!essay || typeof essay !== 'object') return false;
            if (!hasContent(essay.prompt)) return false;
            if (!Array.isArray(essay.passages) || essay.passages.length === 0) return false;
            return essay.passages.every((passage) => {
                if (!passage || typeof passage !== 'object') return false;
                if ('content' in passage) {
                    return hasContent(passage.content);
                }
                // Support potential legacy formats where the passage text is under a generic key
                const values = Object.values(passage).filter((v) => typeof v === 'string');
                return values.some((v) => hasContent(v));
            });
        };

        if (!isNonEmptyArray(part1Questions) || !isNonEmptyArray(part3Questions) || !isValidEssay(part2Essay)) {
            throw new Error('AI failed to generate a valid RLA exam part.');
        }

        const allQuestions = [...part1Questions, ...part3Questions];
        allQuestions.forEach((q, index) => {
            q.questionNumber = index + 1;
        });

        const finalQuiz = {
            id: `ai_comp_rla_${new Date().getTime()}`,
            title: `Comprehensive RLA Exam`,
            subject: subject,
            type: 'multi-part-rla', // Special type for the frontend
            totalTime: 150 * 60, // 150 minutes
            part1_reading: part1Questions,
            part2_essay: part2Essay,
            part3_language: part3Questions,
            questions: allQuestions // Keep this for compatibility with results screen
        };

        // RLA does not need a second review pass due to its complex, multi-part nature
        logGenerationDuration(examType, subject, generationStart);
        res.json(finalQuiz);

    } catch (error) {
        console.error('Error generating comprehensive RLA exam:', error);
        logGenerationDuration(examType, subject, generationStart, 'failed');
        res.status(500).json({ error: 'Failed to generate RLA exam.' });
    }
} else if (subject === 'Math' && comprehensive) {
    try {
        console.log("Generating comprehensive Math exam with two-part structure...");
        console.log("Request received for comprehensive Math exam."); // Added for debugging

        const timeoutMs = selectModelTimeoutMs({ examType });
        const aiOptions = { timeoutMs };

        // Part 1: Non-Calculator (5 questions)
        const part1Promises = Array(5).fill().map(() => generateNonCalculatorQuestion(aiOptions));
        const part1Questions = await Promise.all(part1Promises.map(p => p.catch(e => {
            console.error("A promise in the non-calculator math section failed:", e);
            return null;
        })));

        // Part 2: Calculator-Permitted (41 questions)
        const part2Promises = [];
        // Add 8 Geometry questions
        for (let i = 0; i < 8; i++) part2Promises.push(generateGeometryQuestion('Geometry', 'Math', 1, aiOptions));
        // Add 4 Fill-in-the-Blank questions
        for (let i = 0; i < 4; i++) part2Promises.push(generateMath_FillInTheBlank(aiOptions));
        // Add 10 Data/Graphing questions
        for (let i = 0; i < 5; i++) part2Promises.push(generateDataQuestion(aiOptions));
        for (let i = 0; i < 5; i++) part2Promises.push(generateGraphingQuestion(aiOptions));
        // Add 15 Standalone Algebra/Quantitative questions
        for (let i = 0; i < 10; i++) part2Promises.push(generateStandaloneQuestion('Math', 'Expressions, Equations, and Inequalities', aiOptions));
        for (let i = 0; i < 5; i++) part2Promises.push(generateStandaloneQuestion('Math', 'Ratios, Proportions, and Percents', aiOptions));
        for (let i = 0; i < 4; i++) part2Promises.push(generateMath_FillInTheBlank(aiOptions));

        const part2Results = await Promise.all(part2Promises.map(p => p.catch(e => {
            console.error("A promise in the calculator math section failed:", e);
            return null;
        })));

        let part2Questions = part2Results.flat().filter(q => q);
        // Ensure we have exactly 41 questions for Part 2, even if some promises failed
        while (part2Questions.length < 41) {
            console.log("A question generation failed, adding a fallback question.");
            part2Questions.push(await generateStandaloneQuestion('Math', 'General Problem Solving', aiOptions));
        }
        part2Questions = part2Questions.slice(0, 41);


        const allQuestions = [...part1Questions, ...part2Questions].filter(q => q);
        allQuestions.forEach((q, index) => {
            q.questionNumber = index + 1;
        });

        // --- NEW: Second Pass Correction for Math ---
        let correctedPart1;
        let correctedPart2;
        let correctedAllQuestions;

        if (MATH_TWO_PASS_ENABLED) {
            console.log("Applying math two-pass linting pipeline...");
            correctedPart1 = part1Questions.filter(q => q);
            correctedPart2 = part2Questions.filter(q => q);
            correctedAllQuestions = [...correctedPart1, ...correctedPart2];
            await runMathTwoPassOnQuestions(correctedAllQuestions, subject);
        } else {
            console.log("Applying legacy math correction pipeline...");
            correctedPart1 = await Promise.all(part1Questions.filter(q => q).map(q => reviewAndCorrectMathQuestion(q, aiOptions)));
            correctedPart2 = await Promise.all(part2Questions.map(q => reviewAndCorrectMathQuestion(q, aiOptions)));
            correctedAllQuestions = [...correctedPart1, ...correctedPart2];
        }

        correctedAllQuestions = await applyMathCorrectnessPass(correctedAllQuestions, aiOptions);
        if (Array.isArray(correctedAllQuestions)) {
            const part1Count = correctedPart1.length;
            correctedPart1 = correctedAllQuestions.slice(0, part1Count);
            correctedPart2 = correctedAllQuestions.slice(part1Count);
        }

        // --- NEW: Final Server-Side Sanitization ---
        correctedAllQuestions.forEach(q => {
            if (q.questionText) {
                // Fix the most common LaTeX error
                q.questionText = q.questionText.replace(/\\rac/g, '\\frac');
                // Remove any inline CSS from tables to help the frontend
                q.questionText = q.questionText.replace(/style="[^"]*"/g, '');
            }
            if (q.answerOptions) {
                q.answerOptions.forEach(opt => {
                    if (opt.text) {
                        opt.text = opt.text.replace(/\\rac/g, '\\frac');
                    }
                });
            }
        });
        // --- End of Sanitization ---

        correctedAllQuestions.forEach((q, index) => {
            q.questionNumber = index + 1;
        });
        // --- End of Second Pass Correction ---

        const draftQuiz = {
            id: `ai_comp_math_${new Date().getTime()}`,
            title: `Comprehensive Mathematical Reasoning Exam`,
            subject: subject,
            type: 'multi-part-math',
            part1_non_calculator: correctedPart1,
            part2_calculator: correctedPart2,
            questions: correctedAllQuestions
        };

        const finalQuiz = draftQuiz;

        logGenerationDuration(examType, subject, generationStart);
        res.json(finalQuiz);

    } catch (error) {
        console.error('Error generating comprehensive Math exam:', error);
        logGenerationDuration(examType, subject, generationStart, 'failed');
        res.status(500).json({ error: 'Failed to generate Math exam.' });
    }
} else {
            // This handles comprehensive requests for subjects without that logic yet.
            logGenerationDuration(examType, subject, generationStart, 'failed');
            res.status(400).json({ error: `Comprehensive exams for ${subject} are not yet available.` });
        }
} else {
        // --- CORRECTED TOPIC-SPECIFIC "SMITH A QUIZ" LOGIC ---
        try {
            if (!topic || typeof topic !== 'string') {
                return res.status(400).json({ error: 'Topic is required for non-comprehensive quizzes.' });
            }
            console.log(`Generating topic-specific quiz for Subject: ${subject}, Topic: ${topic}`);

            const userId = req.user?.userId || req.user?.sub || req.body?.userId || req.body?.user_id || null;

            if (subject === 'Math') {
                const TOTAL_QUESTIONS = 12;
                console.log("Generating Math quiz without passages.");
                let promises = [];
                let visualQuestionCount = 0;
                if (topic.toLowerCase().includes('geometry')) {
                    console.log('Geometry topic detected. Generating 5 visual questions.');
                    visualQuestionCount = 5;
                }
                for (let i = 0; i < visualQuestionCount; i++) {
                    promises.push(generateGeometryQuestion(topic, subject));
                }
                const remainingQuestions = TOTAL_QUESTIONS - visualQuestionCount;
                for (let i = 0; i < remainingQuestions; i++) {
                    promises.push(generateStandaloneQuestion(subject, topic));
                }

                const results = await Promise.all(promises);
                let allQuestions = results.flat().filter(q => q);
                const shuffledQuestions = shuffleArray(allQuestions);
                let finalQuestions = shuffledQuestions.slice(0, TOTAL_QUESTIONS);

                finalQuestions.forEach((q, index) => {
                    q.questionNumber = index + 1;
                });

                if (MATH_TWO_PASS_ENABLED) {
                    console.log('Applying math two-pass linting pipeline to topic quiz...');
                    await runMathTwoPassOnQuestions(finalQuestions, subject);
                    finalQuestions = await applyMathCorrectnessPass(finalQuestions);
                }

                const finalQuiz = {
                    id: `ai_topic_${new Date().getTime()}`,
                    title: `${subject}: ${topic}`,
                    subject,
                    questions: finalQuestions,
                };

                logGenerationDuration(examType, subject, generationStart);
                res.json(finalQuiz);
                return;
            }

            const normalizedSubjectForBank = normalizeQuestionBankSubject(subject);
            const isHybridSubject = HYBRID_ELIGIBLE_SUBJECTS.has(subject) || Boolean(normalizedSubjectForBank);

            if (isHybridSubject) {
                const bankSubject = normalizedSubjectForBank || normalizeQuestionBankSubject(subject);
                let bankQuestionIds = [];
                let bankQuestions = [];

                if (bankSubject) {
                    const bankEntries = await fetchQuestionsFromBank({
                        subject: bankSubject,
                        category: topic,
                        userId,
                        limit: QUESTION_BANK_TARGET_COUNT
                    });
                    bankQuestionIds = bankEntries.map((entry) => entry.id);
                    bankQuestions = bankEntries.map((entry) => cloneQuestion(entry.question));
                }

                const questionsNeededFromAI = Math.max(HYBRID_TOTAL_QUESTIONS - bankQuestions.length, 0);
                let generatedQuestions = [];
                if (questionsNeededFromAI > 0) {
                    generatedQuestions = await generateHybridQuestionsForSubject(subject, topic, questionsNeededFromAI);
                }

                let combinedQuestions = [...bankQuestions, ...generatedQuestions];
                if (combinedQuestions.length < HYBRID_TOTAL_QUESTIONS) {
                    const deficit = HYBRID_TOTAL_QUESTIONS - combinedQuestions.length;
                    if (deficit > 0) {
                        const filler = await generateHybridQuestionsForSubject(subject, topic, deficit);
                        generatedQuestions.push(...filler);
                        combinedQuestions = [...combinedQuestions, ...filler];
                    }
                }

                const generatedClonesForBank = generatedQuestions.map((question) => cloneQuestion(question));
                const shuffledQuestions = shuffleArray(combinedQuestions.map((question) => cloneQuestion(question)));
                const finalQuestions = shuffledQuestions.slice(0, HYBRID_TOTAL_QUESTIONS);

                finalQuestions.forEach((q, index) => {
                    q.questionNumber = index + 1;
                });

                await markQuestionsAsSeen(userId, bankQuestionIds);

                const finalQuiz = {
                    id: `ai_topic_${new Date().getTime()}`,
                    title: `${subject}: ${topic}`,
                    subject,
                    questions: finalQuestions,
                };

                logGenerationDuration(examType, subject, generationStart);
                res.json(finalQuiz);

                if (generatedClonesForBank.length) {
                    scheduleGeneratedQuestionSave({
                        subject,
                        category: topic,
                        questions: generatedClonesForBank,
                        userId
                    });
                }

                return;
            }

            const TOTAL_QUESTIONS = 15;
            let promises = [];
            console.log(`Generating ${subject} quiz with passages and other stimuli (legacy path).`);
            const numPassageSets = 3;
            const numImageSets = 2;

            for (let i = 0; i < numPassageSets; i++) {
                promises.push(generatePassageSet(topic, subject, 2));
            }
            for (let i = 0; i < numImageSets; i++) {
                promises.push(generateImageQuestion(topic, subject, curatedImages, 2));
            }

            const questionsSoFar = (numPassageSets * 2) + (numImageSets * 2);
            const remainingQuestions = TOTAL_QUESTIONS - questionsSoFar;
            for (let i = 0; i < remainingQuestions; i++) {
                promises.push(generateStandaloneQuestion(subject, topic));
            }

            const results = await Promise.all(promises);
            let allQuestions = results.flat().filter(q => q);
            const shuffledQuestions = shuffleArray(allQuestions);
            const finalQuestions = shuffledQuestions.slice(0, TOTAL_QUESTIONS);

            finalQuestions.forEach((q, index) => {
                q.questionNumber = index + 1;
            });

            const finalQuiz = {
                id: `ai_topic_${new Date().getTime()}`,
                title: `${subject}: ${topic}`,
                subject,
                questions: finalQuestions,
            };

            logGenerationDuration(examType, subject, generationStart);
            res.json(finalQuiz);

        } catch (error) {
            const errorMessage = req.body.topic ? `Error generating topic-specific quiz for ${req.body.subject}: ${req.body.topic}` : 'Error generating topic-specific quiz';
            console.error(errorMessage, error);
            logGenerationDuration(examType, subject, generationStart, 'failed');
            res.status(500).json({ error: 'Failed to generate topic-specific quiz.' });
        }
    }
});

app.post('/score-essay', async (req, res) => {
    const { essayText, completion } = req.body; // Get completion data
    if (!essayText) {
        return res.status(400).json({ error: 'Essay text is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Act as a GED RLA essay evaluator. The student was asked to write a 5-paragraph essay.

        IMPORTANT CONTEXT: The student's level of completion for this draft was ${completion} sections. Factor this completion level into your feedback and scores, especially for Trait 3. An incomplete essay cannot score a 2 on Trait 3.

        Here is the student's essay:
        ---
        ${essayText}
        ---

        Please provide your evaluation in a valid JSON object format with keys "trait1", "trait2", "trait3", "overallScore", and "overallFeedback". For each trait, provide a "score" from 0 to 2 and "feedback" explaining the score. The "overallScore" is the sum of the trait scores. "overallFeedback" should be a summary.`;

    const schema = {
        type: "OBJECT",
        properties: {
            trait1: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            trait2: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            trait3: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            overallScore: { type: "NUMBER" },
            overallFeedback: { type: "STRING" }
        },
        required: ["trait1", "trait2", "trait3", "overallScore", "overallFeedback"]
    };

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await http.post(apiUrl, payload);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Google AI API for essay scoring:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to score essay from AI service.' });
    }
});

app.post('/api/auth/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { name, email, picture } = payload;
        const googleId = payload?.sub || payload?.['sub'] || null;

        if (!email) {
            throw new Error('Google login did not provide an email address.');
        }

        const normalizedEmail = email.trim().toLowerCase();
        const displayName = name?.trim() || null;
        const pictureUrl = picture || null;
        const now = new Date();

        const existingUserResult = await pool.query(
            'SELECT * FROM users WHERE email = $1 LIMIT 1;',
            [normalizedEmail]
        );

        let userRow;
        if (existingUserResult.rowCount > 0) {
            const existingUser = existingUserResult.rows[0];

            const updateResult = await pool.query(
                `UPDATE users
                 SET name = $1,
                     picture_url = $2,
                     last_login = $3,
                     login_count = COALESCE(login_count, 0) + 1
                 WHERE id = $4
                 RETURNING *;`,
                [displayName ?? existingUser.name, pictureUrl ?? existingUser.picture_url, now, existingUser.id]
            );

            userRow = updateResult.rows[0];
        } else {
            const insertResult = await pool.query(
                `INSERT INTO users (email, name, picture_url, password_hash, last_login, login_count)
                 VALUES ($1, $2, $3, $4, $5, 1)
                 RETURNING *;`,
                [normalizedEmail, displayName, pictureUrl, null, now]
            );
            userRow = insertResult.rows[0];
        }

        if (!userRow) {
            throw new Error('Failed to retrieve user from database after Google login.');
        }

        console.log(`User ${userRow.name} (${userRow.email}) logged in and data was saved to the database.`);

        console.log(`[SECURITY] Successful login for user ID: ${googleId || 'unknown'}, email: ${normalizedEmail}`);

        const tokenPayload = { sub: userRow.id, name: userRow.name };
        if (userRow.role) {
            tokenPayload.role = userRow.role;
        }
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });
        setAuthCookie(res, token, 24 * 60 * 60 * 1000);

        res.status(200).json({
            user: {
                id: userRow.id,
                name: userRow.name,
                email: userRow.email,
                picture: userRow.picture_url,
                pictureUrl: userRow.picture_url,
                last_login: userRow.last_login,
                login_count: userRow.login_count,
                organization_id: userRow.organization_id,
                role: userRow.role,
                organization_name: userRow.organization_name,
            },
            token,
        });
    } catch (error) {
        console.warn(`[SECURITY] Failed login attempt. Error: ${error.message}`);
        console.error('Google Auth or DB Error:', error);
        res.status(500).json({ error: 'Authentication or database error.' });
    }
});

app.post('/admin/bypass-login', adminPreviewBypass);

app.post('/api/admin/login', adminBypassLogin);

// --- API ENDPOINT TO SAVE A QUIZ ATTEMPT ---
app.post('/api/quiz-attempts', requireAuth, async (req, res) => {
    try {
        const userId = req.user.sub; // Get user ID from the verified token
        const { subject, quizType, score, totalQuestions, scaledScore } = req.body;

        const insertQuery = `
            INSERT INTO quiz_attempts (user_id, subject, quiz_type, score, total_questions, scaled_score)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        
        const result = await pool.query(insertQuery, [userId, subject, quizType, score, totalQuestions, scaledScore]);
        
        console.log(`Saved quiz attempt for user ${userId} in subject ${subject}`);
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Error saving quiz attempt:', error);
        res.status(500).json({ error: 'Failed to save quiz attempt.' });
    }
});


// --- API ENDPOINT TO GET ALL QUIZ ATTEMPTS FOR A USER ---
app.get('/api/quiz-attempts', requireAuth, async (req, res) => {
    try {
        const userId = req.user.sub; // Get user ID from the verified token

        const selectQuery = `
            SELECT subject, quiz_type, score, total_questions, scaled_score, attempted_at 
            FROM quiz_attempts 
            WHERE user_id = $1 
            ORDER BY attempted_at DESC;
        `;

        const { rows } = await pool.query(selectQuery, [userId]);
        
        res.status(200).json(rows);

    } catch (error) {
        console.error('Error fetching quiz attempts:', error);
        res.status(500).json({ error: 'Failed to fetch quiz attempts.' });
    }
});


const { ALL_QUIZZES } = require('./data/premade-questions.js');

// Helper function to get random questions from the premade data
const getPremadeQuestions = (subject, count) => {
    const allQuestions = [];
    if (ALL_QUIZZES[subject] && ALL_QUIZZES[subject].categories) {
        Object.values(ALL_QUIZZES[subject].categories).forEach(category => {
            if (category.topics) {
                category.topics.forEach(topic => {
                    if (topic.questions) {
                        allQuestions.push(...topic.questions);
                    }
                });
            }
        });
    }
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Helper function to generate AI questions
const generateAIContent = async (prompt, schema) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    };
    const response = await http.post(apiUrl, payload);
    const jsonText = response.data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonText);
};



app.use((err, req, res, next) => {
    console.error(err?.stack || err);
    res.status(500).json({
        error: 'Something went wrong on our end. Please try again later.'
    });
});

// The '0.0.0.0' is important for containerized environments like Render.
if (require.main === module) {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Your service is live 🚀`);
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = {
    normalizeLatex
};
