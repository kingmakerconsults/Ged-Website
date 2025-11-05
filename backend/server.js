// server.js (Updated Version)

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
// Load local environment variables for development before any other imports that use them
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const db = require('./db');
const { applyFractionPlainTextModeToItem, replaceLatexFractionsWithSlash } = require('./utils/fractionPlainText');
const ensureProfilePreferenceColumns = require('./db/initProfilePrefs');
const ensureQuizAttemptsTable = require('./db/initQuizAttempts');
const ensureEssayScoresTable = require('./db/initEssayScores');
const MODEL_HTTP_TIMEOUT_MS = Number(process.env.MODEL_HTTP_TIMEOUT_MS) || 90000;
const COMPREHENSIVE_TIMEOUT_MS = 480000;
const http = axios.create({ timeout: MODEL_HTTP_TIMEOUT_MS });

// --- in-memory image metadata structures used by image loader section ---
let IMAGE_DB = [];
const IMAGE_BY_PATH = new Map();

function rebuildImagePathIndex() {
    IMAGE_BY_PATH.clear();
    const list = Array.isArray(IMAGE_DB) ? IMAGE_DB : [];
    for (const im of list) {
        if (!im || typeof im !== 'object') continue;
        const rawPath = im.filePath || im.src || im.path;
        if (!rawPath) continue;
        const clean = String(rawPath).replace(/^\/frontend/i, '');
        const normalized = clean.startsWith('/') ? clean : `/${clean}`;
        IMAGE_BY_PATH.set(normalized, im);
        IMAGE_BY_PATH.set(normalized.slice(1), im);
        IMAGE_BY_PATH.set(rawPath, im);
    }
}

async function findUserIdByGoogleSub(sub) {
    return db.oneOrNone(
        `SELECT u.id AS user_id
           FROM auth_identities ai
           JOIN users u ON u.id = ai.user_id
          WHERE ai.provider = $1 AND ai.provider_user_id = $2`,
        ['google', sub]
    );
}

// Heuristic: determine whether a Science item requires scientific numeracy
function isScienceNumeracyItem(item) {
    try {
        const text = [item?.questionText || '', item?.passage || ''].join(' ').toLowerCase();
        if (!text.trim()) return false;

        // HTML table, chart, graph, or explicit data words
        if (/<table[\s\S]*?>/i.test(text)) return true;
        if (/(chart|graph|table|dataset|data|figure)/i.test(text)) return true;

        // Contains numbers plus measurement units or symbols
        const hasNumber = /\d/.test(text);
        const hasUnit = /(\bcm\b|\bmm\b|\bm\b|\bkm\b|\bg\b|\bkg\b|\bmg\b|\bl\b|\bml\b|\bn\b|\bj\b|\bw\b|\bpa\b|\batm\b|\bmol\b|\bs\b|\bsec\b|\bsecond(s)?\b|\bmin(ute)?(s)?\b|\bh(our)?(s)?\b|m\/s|km\/h|mph|°c|°f|\bkelvin\b|%)/i.test(text);
        const hasEquationLike = /(=|\+|-|\*|\/)/.test(text) && /[a-z]/i.test(text) && /\d/.test(text);
        if (hasNumber && (hasUnit || hasEquationLike)) return true;

        // Common numeracy keywords
        if (/(density|rate|speed|velocity|acceleration|force|work|power|energy|mass|volume|pressure|concentration|ohm|voltage|current|calculate|using the formula|use the formula|according to the formula)/i.test(text)) return true;

        return false;
    } catch (_) {
        return false;
    }
}

function countScienceNumeracy(items) {
    return Array.isArray(items) ? items.reduce((acc, it) => acc + (isScienceNumeracyItem(it) ? 1 : 0), 0) : 0;
}

function textWordCount(item) {
    const toCount = (s) => (typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0);
    return toCount(item?.questionText) + toCount(item?.passage);
}

async function generateScienceNumeracyQuestion(category, options = {}) {
    const prompt = `You are a GED Science exam creator. Generate a single numeracy-focused question in the category "${category}".
Requirements:
- Provide a short context using a small HTML <table> (2–4 columns, 3–5 rows) OR a concise calculation setup that uses measurement units (e.g., density, speed, rate, force, energy).
- The question MUST require interpreting the data or performing a short calculation with units.
- Use clear, plain language; keep the table small and directly relevant.
Return one JSON object with keys "questionText" and "answerOptions" (array of {text, isCorrect, rationale}).`;
    const schema = {
        type: 'OBJECT',
        properties: {
            questionText: { type: 'STRING' },
            answerOptions: { type: 'ARRAY', items: { type: 'OBJECT', properties: { text: { type: 'STRING' }, isCorrect: { type: 'BOOLEAN' }, rationale: { type: 'STRING' } }, required: ['text', 'isCorrect', 'rationale'] } }
        },
        required: ['questionText', 'answerOptions']
    };
    const q = await callAI(prompt, schema, options);
    return enforceWordCapsOnItem(q, 'Science');
}

async function ensureScienceNumeracy(items, { requiredFraction = 1/3, categories = ['Life Science', 'Physical Science', 'Earth & Space Science'], aiOptions = {} } = {}) {
    if (!Array.isArray(items) || !items.length) return items;
    const total = items.length;
    const required = Math.max(1, Math.ceil(total * requiredFraction));
    let count = countScienceNumeracy(items);
    if (count >= required) return items;

    const deficit = required - count;
    try { console.warn(`[Science][Numeracy] Found ${count}/${total} numeracy items; need ${required}. Attempting to add ${deficit}.`); } catch {}

    // Pick non-numeracy items with lowest text to replace
    const nonNumeric = items.map((it, idx) => ({ it, idx, wc: textWordCount(it) })).filter(x => !isScienceNumeracyItem(x.it));
    nonNumeric.sort((a, b) => a.wc - b.wc);

    const toReplace = nonNumeric.slice(0, deficit);
    if (!toReplace.length) return items;

    const replacements = [];
    for (let i = 0; i < toReplace.length; i++) {
        const cat = categories[i % categories.length];
        try {
            const q = await generateScienceNumeracyQuestion(cat, aiOptions);
            if (q && q.questionText && Array.isArray(q.answerOptions)) {
                replacements.push(q);
            }
        } catch (e) {
            // skip failed gen
        }
    }

    if (!replacements.length) {
        try { console.warn('[Science][Numeracy] Unable to generate replacements; proceeding without changes.'); } catch {}
        return items;
    }

    const cloned = items.slice();
    for (let i = 0; i < replacements.length && i < toReplace.length; i++) {
        cloned[toReplace[i].idx] = replacements[i];
    }
    const newCount = countScienceNumeracy(cloned);
    try { console.log(`[Science][Numeracy] After replacement: ${newCount}/${total} numeracy items.`); } catch {}
    return cloned;
}

async function findUserByEmail(email) {
    return db.oneOrNone(`SELECT id, email, name FROM users WHERE email = $1`, [email]);
}

async function createUser(email, name) {
    return db.oneOrNone(
        `INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name`,
        [email, name]
    );
}

async function bindGoogleIdentity(userId, sub) {
    await db.query(
        `INSERT INTO auth_identities (user_id, provider, provider_user_id)
         VALUES ($1, $2, $3)
         ON CONFLICT (provider, provider_user_id) DO NOTHING`,
        [userId, 'google', sub]
    );
}

const SUPER_ADMIN_EMAIL = 'kingmakerconsults@gmail.com';

async function loadUserWithRole(userId) {
    if (!userId) {
        return null;
    }
    return db.oneOrNone(
        `SELECT
            u.id,
            u.email,
            u.name,
            u.role,
            u.organization_id,
            u.picture_url,
            o.name AS organization_name
         FROM users u
         LEFT JOIN organizations o ON o.id = u.organization_id
         WHERE u.id = $1`,
        [userId]
    );
}

function normalizeRole(role) {
    switch (role) {
        case 'super_admin':
        case 'org_admin':
        case 'student':
            return role;
        default:
            return 'student';
    }
}

function buildAuthPayloadFromUserRow(row) {
    if (!row) {
        throw new Error('User row is required');
    }
    const role = normalizeRole(row.role);
    return {
        sub: row.id,
        userId: row.id,
        email: row.email,
        role,
        organization_id: row.organization_id ?? null,
        name: row.name || null,
    };
}

function buildUserResponse(row, fallbackPicture = null) {
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        email: row.email,
        name: row.name,
        role: normalizeRole(row.role),
        organization_id: row.organization_id ?? null,
        organization_name: row.organization_name || null,
        picture: row.picture_url || fallbackPicture || null,
    };
}

function selectModelTimeoutMs({ examType } = {}) {
    return examType === 'comprehensive' ? COMPREHENSIVE_TIMEOUT_MS : MODEL_HTTP_TIMEOUT_MS;
}

function nowNs() { return process.hrtime.bigint(); }
function toMs(nsDiff) { return Number(nsDiff) / 1e6; }

async function timed(label, fn) {
    const start = nowNs();
    try {
// --- coach advice helpers (top level) ---
function getCurrentWeekStartISO() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun,1=Mon,...
    const diffToMonday = (day === 0 ? -6 : 1) - day; // move to Monday
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString().slice(0, 10);
}

async function getUserEmailById(userId) {
    if (!userId) return null;
    try {
        const row = await db.oneOrNone(`SELECT email FROM users WHERE id = $1`, [userId]);
        return row?.email || null;
    } catch (_) {
        return null;
    }
}

// --- /api/coach/advice (top level) ---
// Ask Coach advice endpoint with weekly throttle (2/week) and challenge selection requirement
app.post('/api/coach/advice', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user.id;
        let email = (req.user && (req.user.email || req.user.userEmail)) || null;
        if (!email) {
            email = await getUserEmailById(userId);
        }

        const testerByEmail = (String(email || '')).toLowerCase() === 'zacharysmith527@gmail.com';

        // Build profile bundle to inspect selected challenges and test plan
        const bundle = await buildProfileBundle(userId);
        const challengeOptions = Array.isArray(bundle?.challengeOptions) ? bundle.challengeOptions : [];
        const selected = challengeOptions.filter((c) => c && c.selected);

        if (!Array.isArray(selected) || selected.length === 0) {
            return res.status(400).json({ error: 'Pick at least one challenge in your profile so Coach can tailor advice.' });
        }

        // Subject hint is optional; if provided, narrow the selected challenges
        const subjectHintRaw = (req.body && req.body.subject) ? String(req.body.subject) : '';
        const subjectHint = subjectHintRaw
            ? (subjectHintRaw.toLowerCase() === 'rla' ? 'RLA' : (subjectHintRaw.toLowerCase().startsWith('social') ? 'Social Studies' : subjectHintRaw.charAt(0).toUpperCase() + subjectHintRaw.slice(1)))
            : '';

        const bySubject = subjectHint
            ? selected.filter((s) => (s.subject || '').toString() === subjectHint)
            : selected;

        // Throttle: 2 per week per user, unless tester email
        const weekStartISO = getCurrentWeekStartISO();
        if (!testerByEmail) {
            const existing = await db.oneOrNone(
                `SELECT used_count FROM coach_advice_usage WHERE user_id = $1 AND week_start_date = $2`,
                [userId, weekStartISO]
            );
            const used = existing?.used_count || 0;
            if (used >= 2) {
                return res.status(429).json({ error: 'You\'ve reached your Ask Coach limit for this week (2/2). Try again next week.' });
            }
        }

        // Gather test date context for the hinted subject (or nearest upcoming)
        const testPlan = Array.isArray(bundle?.testPlan) ? bundle.testPlan : [];
        let subjectTestDate = '';
        if (subjectHint) {
            const match = testPlan.find((t) => t && t.subject === subjectHint && t.testDate);
            subjectTestDate = match?.testDate || '';
        } else {
            const upcoming = testPlan.find((t) => t && t.testDate);
            subjectTestDate = upcoming?.testDate || '';
        }

        // Compose prompt for AI
        const tagList = bySubject.map((c) => `${c.subject}: ${c.subtopic} — ${c.label}`).slice(0, 10).join('\n- ');
        const subjForPrompt = subjectHint || 'your GED subjects';
        const dateForPrompt = subjectTestDate ? `Target test date: ${subjectTestDate}.` : 'No test date saved yet.';
        const prompt = `You are Coach Smith, a concise GED study coach.
Provide 3-5 specific, encouraging tips tailored to ${subjForPrompt}.
Focus on 45-minute sessions and include one quick practice idea.
Ground your advice in these selected challenges (if present):
- ${tagList || 'No tags selected beyond basics.'}
${dateForPrompt}
Return JSON as { "advice": "<single paragraph or short bullets>" }.`;

        const SCHEMA = { type: 'OBJECT', properties: { advice: { type: 'STRING' } }, required: ['advice'] };

        let adviceText = '';
        try {
            const ai = await callAI(prompt, SCHEMA, { generationOverrides: { temperature: 0.7 } });
            adviceText = (ai && ai.advice) ? String(ai.advice) : '';
        } catch (e) {
            // Fallback to simple templated guidance
            const firstTag = bySubject[0] || selected[0];
            const tagStr = firstTag ? `${firstTag.subject}: ${firstTag.subtopic.toLowerCase()}` : 'your weakest areas';
            adviceText = `Spend 45 minutes today focused on ${tagStr}. Start with 10 minutes reviewing notes, then 25 minutes of practice (2-3 short passages or 8-10 problems), and finish with a 10-minute reflection to write down one mistake pattern and how you\\'ll fix it next time.`;
            if (subjectTestDate) {
                adviceText += ` You\\'ve saved a test date (${subjectTestDate}) — aim for 3 focused sessions this week.`;
            }
        }

        // Record usage (skip for tester email)
        if (!testerByEmail) {
            await db.query(
                `INSERT INTO coach_advice_usage (user_id, week_start_date, used_count, last_used_at)
                 VALUES ($1, $2, 1, now())
                 ON CONFLICT (user_id, week_start_date)
                 DO UPDATE SET used_count = coach_advice_usage.used_count + 1, last_used_at = now()`,
                [userId, weekStartISO]
            );
        }

        return res.json({ ok: true, advice: adviceText, weekStart: weekStartISO });
    } catch (e) {
        console.error('POST /api/coach/advice failed:', e?.message || e);
        return res.status(500).json({ error: 'Unable to fetch advice right now.' });
    }
});

        const data = await fn();
        const ms = toMs(nowNs() - start);
    
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
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

function sha1OfFile(filePath) {
    try {
        const hash = crypto.createHash('sha1');
        const data = fs.readFileSync(filePath);
        hash.update(data);
        return hash.digest('hex');
    } catch {
        return '';
    }
}

function getImageDimensions(filePath) {
    // Minimal PNG and JPEG dimension readers to avoid external deps
    try {
        const fd = fs.openSync(filePath, 'r');
        const header = Buffer.alloc(32);
        fs.readSync(fd, header, 0, 32, 0);
        // PNG signature
        if (header[0] === 0x89 && header.toString('ascii', 1, 4) === 'PNG') {
            // IHDR width/height at bytes 16..23 (big-endian)
            const buf = Buffer.alloc(24);
            fs.readSync(fd, buf, 0, 24, 0);
            const width = buf.readUInt32BE(16);
            const height = buf.readUInt32BE(20);
            fs.closeSync(fd);
            return { width, height };
        }
        // JPEG: scan markers for SOFn
        const stat = fs.fstatSync(fd);
        const buf = Buffer.alloc(stat.size);
        fs.readSync(fd, buf, 0, stat.size, 0);
        fs.closeSync(fd);
        let i = 2; // skip SOI 0xFFD8
        while (i < buf.length) {
            if (buf[i] !== 0xFF) { i++; continue; }
            const marker = buf[i+1];
            const size = buf.readUInt16BE(i+2);
            if (marker >= 0xC0 && marker <= 0xC3) {
                const height = buf.readUInt16BE(i+5);
                const width = buf.readUInt16BE(i+7);
                return { width, height };
            }
            i += 2 + size;
        }
    } catch {}
    return { width: 0, height: 0 };
}

function normalizePathForMetadata(absPath, subject) {
    // Build /frontend/Images/<Subject>/<relative...>
    const parts = absPath.split(path.sep);
    const idx = parts.lastIndexOf('Images');
    if (idx >= 0) {
        const rel = parts.slice(idx).join('/');
        return '/' + ['frontend', rel].join('/');
    }
    // fallback: prefix subject
    const fname = path.basename(absPath);
    return `/frontend/Images/${subject}/${fname}`;
}

function detectCategory(absPath, subject) {
    // Category = first folder under subject if present
    const parts = absPath.split(path.sep);
    const sIdx = parts.findIndex(p => p.toLowerCase() === subject.toLowerCase());
    if (sIdx >= 0 && parts.length > sIdx + 2) {
        return parts[sIdx + 1];
    }
    return '';
}

function randomId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return crypto.randomBytes(16).toString('hex');
}

// Safe JSON read utility used by image metadata loader
function readJsonSafe(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(raw);
        }
    } catch (err) {
        console.warn('readJsonSafe failed for', filePath, err?.message || err);
    }
    return null;
}

function loadAndAugmentImageMetadata() {
    const primaryFile = path.join(__dirname, 'image_metadata_final.json');
    const fallbackFile = path.join(__dirname, 'data', 'image_metadata_final.json');
    let db = readJsonSafe(primaryFile) || readJsonSafe(fallbackFile) || [];
    if (!Array.isArray(db)) db = [];

    // Build fast lookup
    const byPath = new Set();
    const bySha1 = new Set();
    for (const im of db) {
        const p = (im && (im.filePath || im.src || im.path)) || '';
        if (p) byPath.add(String(p).toLowerCase());
        if (im && im.sha1) bySha1.add(String(im.sha1).toLowerCase());
    }

    const repoRoot = path.resolve(__dirname, '..');
    const scienceRoot = path.join(repoRoot, 'frontend', 'Images', 'Science');
    const socialRoot = path.join(repoRoot, 'frontend', 'Images', 'SocialStudies');

    const candidates = [];
    for (const [root, subject] of [[scienceRoot, 'Science'], [socialRoot, 'Social Studies']]) {
        const files = walkDir(root, []);
        for (const f of files) {
            const ext = path.extname(f).toLowerCase();
            if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
            candidates.push({ abs: f, subject });
        }
    }

    let added = 0;
    const nowIso = new Date().toISOString();
    for (const c of candidates) {
        if (!fs.existsSync(c.abs)) continue;
        const filePathMeta = normalizePathForMetadata(c.abs, c.subject);
        const key = filePathMeta.toLowerCase();
        const sha1 = sha1OfFile(c.abs);
        const dup = byPath.has(key) || (sha1 && bySha1.has(sha1.toLowerCase()));
        if (dup) continue;
        const dims = getImageDimensions(c.abs);
        const fileName = path.basename(c.abs);
        const category = detectCategory(c.abs, c.subject);
        const entry = {
            id: randomId(),
            subject: c.subject,
            fileName,
            filePath: filePathMeta,
            width: dims.width || 0,
            height: dims.height || 0,
            dominantType: 'photo',
            altText: '',
            detailedDescription: '',
            keywords: [],
            sourceUrl: '',
            sourceTitle: '',
            sourcePublished: '',
            license: '',
            collectedAt: nowIso,
            category,
            usageDirectives: '',
            sha1
        };
        db.push(entry);
        byPath.add(key);
        if (sha1) bySha1.add(sha1.toLowerCase());
        added++;
    }

    // Sort by subject then by fileName
    db.sort((a, b) => {
        const sa = String(a.subject || '').toLowerCase();
        const sb = String(b.subject || '').toLowerCase();
        if (sa < sb) return -1; if (sa > sb) return 1;
        const fa = String(a.fileName || '');
        const fb = String(b.fileName || '');
        return fa.localeCompare(fb);
    });

    try {
        fs.writeFileSync(primaryFile, JSON.stringify(db, null, 2), 'utf8');
    } catch (e) {
        console.warn('[ImageDB] Failed to write image metadata file:', e.message);
    }

    IMAGE_DB = db;
}

loadAndAugmentImageMetadata();

rebuildImagePathIndex();
// Optional enhancement: log counts by subject
(function logImageCounts() {
    try {
        const total = Array.isArray(IMAGE_DB) ? IMAGE_DB.length : 0;
        const bySubject = IMAGE_DB.reduce((acc, im) => {
            const s = im && im.subject ? String(im.subject) : 'Other';
            acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});
        const parts = Object.entries(bySubject).map(([s, n]) => `${s}: ${n}`);
        console.info(`[ImageDB] Loaded ${total} total images (${parts.join(', ')})`);
    } catch {}
})();
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
const { requireAuth, setAuthCookie } = require('./src/middleware/auth');
const { requireSuperAdmin, requireOrgAdmin } = require('./middleware/adminRoles');
const { assertUserIsActive } = require('./utils/userPresence');
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

// Run primary model first, then start fallback after a short delay.
// Returns whichever succeeds first, along with the latency.
async function raceGeminiWithDelayedFallback({
    primaryFn,
    fallbackFn,
    primaryModelName = 'gemini',
    fallbackModelName = 'chatgpt',
    delayMs = 900
}) {
    if (typeof primaryFn !== 'function' || typeof fallbackFn !== 'function') {
        throw new Error('raceGeminiWithDelayedFallback requires primaryFn and fallbackFn');
    }

    const startTime = Date.now();

    let fallbackStarted = false;
    let fallbackPromise;

    // start primary immediately
    const primaryPromise = (async () => {
        try {
            const data = await primaryFn();
            const latencyMs = Date.now() - startTime;
            return {
                model: primaryModelName,
                data,
                latencyMs
            };
        } catch (err) {
            // if primary fails early, make sure fallback is running
            if (!fallbackStarted) {
                fallbackStarted = true;
                fallbackPromise = fallbackFn().then((data) => ({
                    model: fallbackModelName,
                    data,
                    latencyMs: Date.now() - startTime
                })).catch((fallbackErr) => ({
                    model: `${fallbackModelName}-error`,
                    error: fallbackErr,
                    latencyMs: Date.now() - startTime
                }));
            }
            return {
                model: `${primaryModelName}-error`,
                error: err,
                latencyMs: Date.now() - startTime
            };
        }
    })();

    // start fallback after a delay
    const delayPromise = new Promise((resolve) => setTimeout(resolve, delayMs));
    const delayedFallbackPromise = (async () => {
        await delayPromise;
        if (!fallbackStarted) {
            fallbackStarted = true;
            return fallbackFn().then((data) => ({
                model: fallbackModelName,
                data,
                latencyMs: Date.now() - startTime
            })).catch((err) => ({
                model: `${fallbackModelName}-error`,
                error: err,
                latencyMs: Date.now() - startTime
            }));
        }
    })();

    // whichever finishes first with a usable result wins
    const winner = await Promise.race([
        primaryPromise,
        delayedFallbackPromise
    ]);

    // if the thing that finished first was an error version, just return it;
    // the caller already has logic to throw if model is "...-error"
    return {
        winner,
        latencyMs: winner.latencyMs
    };
}

const GEOMETRY_FIGURES_ENABLED = String(process.env.GEOMETRY_FIGURES_ENABLED || '').toLowerCase() === 'true';
const MATH_TWO_PASS_ENABLED = String(process.env.MATH_TWO_PASS_ENABLED || 'true').toLowerCase() === 'true';

if (!GEOMETRY_FIGURES_ENABLED) {
    console.info('Geometry figures disabled (GEOMETRY_FIGURES_ENABLED=false); using text-only diagram descriptions.');
}

function sanitizeAIJSONString(raw) {
    if (typeof raw !== 'string') return '';

    let s = raw.trim();

    s = s.replace(/\\n(\\t|\\n){2,}/g, ' ');
    s = s.replace(/(\\t){2,}/g, ' ');
    s = s.replace(/(\\n){2,}/g, '\\n');
    s = s.replace(/\\frac\s*\{\s*([^}]+)\s*\}\s*\{\s*([^}]+)\s*\}/g, '($1/$2)');

    const lastBracket = s.lastIndexOf(']');
    if (lastBracket !== -1) {
        s = s.slice(0, lastBracket + 1);
    }

    return s.trim();
}

function extractJSONArray(raw, { sanitize = false, logLabel } = {}) {
    if (typeof raw !== 'string') return null;
    const bs = raw.indexOf('<BEGIN_JSON>');
    const es = raw.lastIndexOf('<END_JSON>');
    let body = (bs !== -1 && es !== -1) ? raw.slice(bs + 12, es) : raw;
    const first = body.indexOf('[');
    const last = body.lastIndexOf(']');
    if (first === -1 || last === -1 || last <= first) return null;

    let jsonText = body.slice(first, last + 1);
    jsonText = sanitize ? sanitizeAIJSONString(jsonText) : jsonText.trim();

    if (!jsonText) return null;

    try {
        const parsed = JSON.parse(jsonText);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
        if (sanitize) {
            const snippet = jsonText.slice(0, 1000);
            console.error('Failed to parse sanitized AI JSON response.', {
                error: error.message,
                snippet,
                ...(logLabel ? { stage: logLabel } : {})
            });
        }
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
    return extractJSONArray(text, { sanitize: true, logLabel: 'gemini' });
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
    const json = extractJSONArray(text, { sanitize: true, logLabel: 'openai-extract' });
    if (json) return json;
    try {
        const sanitized = sanitizeAIJSONString(text);
        const parsed = JSON.parse(sanitized);
        const questionsArray = Array.isArray(parsed)
            ? parsed
            : Array.isArray(parsed?.items)
                ? parsed.items
                : Array.isArray(parsed?.questions)
                    ? parsed.questions
                    : Array.isArray(parsed?.data)
                        ? parsed.data
                        : parsed;
        return Array.isArray(questionsArray) ? questionsArray : [questionsArray];
    } catch (err) {
        const sanitized = sanitizeAIJSONString(text);
        console.error('Failed to parse sanitized OpenAI JSON response.', {
            error: err.message,
            snippet: sanitized.slice(0, 1000)
        });
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

    if (isRlaSubject(subject)) {
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
        questionType: { enum: ['standalone', 'freeResponse', 'multipleChoice'] },
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
            questionType: { type: 'string', enum: ['standalone', 'freeResponse', 'multipleChoice'] },
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

const FRACTION_PLAIN_TEXT_RULE = `IMPORTANT FRACTION RULE:
Any fraction MUST be written using plain text with a slash. Examples:

* one-half = 1/2
* three-fourths = 3/4
* (2x + 1)/3
* mixed number: 2 1/2

NEVER write a fraction using LaTeX or KaTeX syntax like \frac{1}{2}.
NEVER wrap a fraction in $, $$, \(:, or [.

Everything else (exponents, square roots, inequality symbols like ≤ and ≥, etc.) can be written normally the way you usually would for math class.`;



function buildStrictJsonHeaderMath({ fractionPlainTextMode } = {}) {
    const questionTextGuidance = fractionPlainTextMode
        ? '- questionText: Plain English with math notation allowed (e.g., exponents like x^2, roots like \\sqrt{9}, inequality symbols like \\le or \\ge). DO NOT use math delimiters ($, $$, \\(, \\[). DO NOT use HTML.'
        : '- questionText: Plain English with LaTeX commands allowed (e.g., \\sqrt{9}, \\le, \\ge, \\pi). DO NOT use math delimiters ($, $$, \\(, \\[). DO NOT use HTML.';

    const answerOptionsGuidance = '- answerOptions: Provide multiple choices; each must include "text", "isCorrect", and "rationale". Exactly one answerOption must have isCorrect=true.';

    const fractionRuleBlock = fractionPlainTextMode ? `\n${FRACTION_PLAIN_TEXT_RULE}\n` : '';

    const formattingRulesBlock = [
        '* "Return ONLY a JSON array of question objects between <BEGIN_JSON> and <END_JSON>. Do not wrap it in any other object. Do not include keys like \'questions\', \'metadata\', \'notes\', \'reasoning\', or anything else. Only the array."',
        '',
        '* "Each question object must use this shape exactly:',
        '  {',
        '  "id": "string",',
        '  "questionText": "string",',
        '  "answerOptions": [',
        '  {',
        '  "text": "string",',
        '  "isCorrect": true/false,',
        '  "rationale": "string"',
        '  }',
        '  ],',
        '  "questionType": "multipleChoice"',
        '  }"',
        '',
        '* "Do NOT include giant indentation blocks made of tab or newline spam. You may use normal short `\n` for formatting, but you MUST NOT repeat `\n` or `\t` more than two times in a row. Never output a huge run of `\\n\\t\\t\\t\\t...`."',
        '',
        '* "If you want to show a formula with a fraction, ALWAYS use plain text slash style like 3/4 or (2x+1)/3. NEVER use \\frac{...}{...}. NEVER use $...$, $$...$$, \\( ... \\), or \\[ ... \\] around a fraction."',
        '',
        '* "Other math formatting (exponents like x^2, √, ≤, ≥, tables, etc.) is allowed."',
        '',
        '* "Do NOT write any text after </END_JSON> and do not write any explanations before <BEGIN_JSON>."'
    ].join('\\n');

    const hardRuleLines = [
        '- LaTeX commands allowed (\\sqrt, \\le, etc.), but NO math delimiters ($, $$, \\(, \\[).',
        '- Fractions must use plain-text slash notation (e.g., 3/4, (2x+1)/3).',
        '- Currency: do NOT use $; write “USD 12.50” or “12.50 dollars”.',
        '- No HTML or markdown tables. Describe any table verbally in questionText.',
        '- Ensure braces balance in \\sqrt{...}. No custom macros.',
        '- If a passage/stimulus is used, it MUST be <= 250 words.',
        '- Exactly N items; top-level is a JSON array only.'
    ].join('\\n');

    return `SYSTEM: Return ONLY JSON, no prose/markdown. Wrap between <BEGIN_JSON> and <END_JSON>.
Each item schema:
{
  "id": "<unique string>",
  "questionType": "standalone" | "freeResponse",
${questionTextLine}
  "answerOptions": [{"text":"...","isCorrect":true|false,"rationale":"..."}] // omit for freeResponse
}
${fractionRuleBlock}
Hard rules:
${hardRuleLines}`;
}

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

const RLA_SUBJECT_LABEL = 'Reasoning Through Language Arts (RLA)';
const RLA_SUBJECT_ALIAS = 'RLA';

function isRlaSubject(subject) {
    return subject === RLA_SUBJECT_ALIAS || subject === RLA_SUBJECT_LABEL;
}

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

const SMITH_A_SKILL_ENTRIES = {
    Math: {
        "Quantitative Problem Solving": "Fractions, decimals, percentages, ratios, and data analysis."
    },
    Science: {
        "Life Science": "Cell structure, genetics, ecosystems, and human body systems.",
        "Physical Science": "Matter, energy, motion, chemistry, and basic physics principles.",
        "Earth & Space Science": "Earth systems, weather, geology, astronomy, and the solar system.",
        "Scientific Numeracy": "Unit conversions, rate/density calculations, interpreting tables and lab data."
    },
    "Social Studies": {
        "U.S. History": "Foundations of the United States, government, civics, and historical analysis."
    },
    [RLA_SUBJECT_LABEL]: {
        "Language & Grammar": "Standard English conventions, grammar, punctuation, and usage.",
        "Reading Comprehension: Informational Texts": "Determine main ideas, evaluate arguments, interpret charts, and understand structure.",
        "Poetry & Figurative Language": "Interpret poetry for theme, tone, figurative language, and structure."
    }
};

const SMITH_A_SKILL_MAP = {
    ...SMITH_A_SKILL_ENTRIES,
    [RLA_SUBJECT_ALIAS]: SMITH_A_SKILL_ENTRIES[RLA_SUBJECT_LABEL]
};

const SMITH_A_SUBTOPICS = Object.fromEntries(
    Object.entries(SMITH_A_SKILL_MAP).map(([subject, skills]) => [
        subject,
        Object.keys(skills || {})
    ])
);

const SMITH_A_ALLOWED_SUBJECTS = new Set(Object.keys(SMITH_A_SKILL_MAP));

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

function buildCombinedPrompt_Math(totalCounts, { fractionPlainTextMode } = {}) {
    const { NON_CALC_COUNT, GEOMETRY_COUNT, ALGEBRA_COUNT } = totalCounts;
    const header = buildStrictJsonHeaderMath({ fractionPlainTextMode });
    return `${header}
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

async function generateExam(subject, promptBuilder, counts, options = {}) {
    const prompt = promptBuilder(counts, options);

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

    const processed = items.map((it) => enforceWordCapsOnItem(it, subject));
    if (options?.fractionPlainTextMode) {
        return processed.map((it) => applyFractionPlainTextModeToItem(it));
    }
    return processed;
}

async function runExam() {
    const counts = { NON_CALC_COUNT, GEOMETRY_COUNT, ALGEBRA_COUNT };
    const generated = await generateExam('Math', buildCombinedPrompt_Math, counts, { fractionPlainTextMode: true });

    const cleaned = [];
    for (const q of generated) {
        const sanitized = enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(q)), 'Math');
        if (validateQuestion(sanitized)) {
            cleaned.push(applyFractionPlainTextModeToItem(sanitized));
        }
    }

    return cleaned;
}

const pool = db;

const SALT_ROUNDS = 10;
const USER_TOKEN_TTL = '12h';

function formatUserRow(row) {
    if (!row) return null;
    const email = row.email || '';
    const fallbackName = email.includes('@') ? email.split('@')[0] : (email || 'Learner');
    return {
        id: row.id,
        email,
        name: row.name || fallbackName,
        createdAt: row.created_at || null,
        picture: row.picture || null,
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

function formatQuizAttemptRow(row) {
    if (!row) return null;
    const scaledScore = row.scaled_score != null ? Number(row.scaled_score) : null;
    return {
        id: row.id,
        userId: row.user_id,
        subject: row.subject,
        quizCode: row.quiz_code,
        quizTitle: row.quiz_title,
        quizType: row.quiz_type,
        score: row.score != null ? Number(row.score) : null,
        totalQuestions: row.total_questions != null ? Number(row.total_questions) : null,
        scaledScore,
        passed: typeof row.passed === 'boolean' ? row.passed : (scaledScore != null ? scaledScore >= 145 : null),
        attemptedAt: row.attempted_at,
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
        const normalizedId = payload?.sub ?? payload?.userId ?? payload?.user_id ?? null;
        const normalizedRole = payload?.role || 'student';
        const normalizedOrg = payload?.organization_id ?? null;
        const normalizedEmail = payload?.email || null;

        req.user = {
            ...(req.user || {}),
            ...payload,
            id: normalizedId,
            userId: normalizedId,
            role: normalizedRole,
            organization_id: normalizedOrg,
            email: normalizedEmail,
        };
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

async function createUserToken(userId) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not configured');
    }
    const userRow = await loadUserWithRole(userId);
    if (!userRow) {
        throw new Error('User not found');
    }
    if (!userRow.role) {
        await pool.query(`UPDATE users SET role = 'student' WHERE id = $1`, [userId]);
        userRow.role = 'student';
    }
    const payload = buildAuthPayloadFromUserRow(userRow);
    return jwt.sign(payload, secret, { expiresIn: USER_TOKEN_TTL });
}

function requireAuthInProd(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.user && req.user.id) {
            return next();
        }

        // If a previous middleware already populated req.user, we can skip the
        // strict token check. This lets devAuth / ensureTestUserForNow provide a
        // fallback user so profile routes keep working while auth is sorted out.
        if (ensureRequestUser(req)) {
            return next();
        }

        return requireAuth(req, res, next);
    }
    return next();
}

let cachedTestPlanTableName = null;
let cachedChallengeTables = null;
let cachedProfileNameColumn = null;

// Expanded in-memory fallback list for profile challenges by subject/subtopic
// Used when the DB challenge catalog is unavailable or empty
const FALLBACK_PROFILE_CHALLENGES = [
    // MATH (algebra, geometry, data)
    { id: 'math-1', subject: 'Math', subject_alias: 'Math', subtopic: 'Number Sense & Fluency', label: 'Fractions, decimals, %' },
    { id: 'math-2', subject: 'Math', subject_alias: 'Math', subtopic: 'Algebra Foundations', label: 'Writing and solving 1-step equations' },
    { id: 'math-3', subject: 'Math', subject_alias: 'Math', subtopic: 'Algebra Foundations', label: '2-step equations & inequalities' },
    { id: 'math-4', subject: 'Math', subject_alias: 'Math', subtopic: 'Word Problems', label: 'Translating real situations to expressions' },
    { id: 'math-5', subject: 'Math', subject_alias: 'Math', subtopic: 'Geometry & Measurement', label: 'Perimeter, area, and volume' },
    { id: 'math-6', subject: 'Math', subject_alias: 'Math', subtopic: 'Data & Graphs', label: 'Reading tables, charts, and graphs' },
    { id: 'math-7', subject: 'Math', subject_alias: 'Math', subtopic: 'Scientific Calculator', label: 'Using the calculator efficiently' },
    { id: 'math-8', subject: 'Math', subject_alias: 'Math', subtopic: 'Test Skills', label: 'Multi-step GED-style math items' },

    // RLA (reading, grammar, extended response)
    { id: 'rla-1', subject: 'RLA', subject_alias: 'RLA', subtopic: 'Reading Comprehension', label: 'Main idea and supporting details' },
    { id: 'rla-2', subject: 'RLA', subject_alias: 'RLA', subtopic: 'Reading Comprehension', label: 'Author’s purpose & tone' },
    { id: 'rla-3', subject: 'RLA', subject_alias: 'RLA', subtopic: 'Informational Text', label: 'Reading charts / text together' },
    { id: 'rla-4', subject: 'RLA', subject_alias: 'RLA', subtopic: 'Language & Editing', label: 'Grammar, usage, and mechanics' },
    { id: 'rla-5', subject: 'RLA', subject_alias: 'RLA', subtopic: 'Language & Editing', label: 'Punctuation and sentence boundaries' },
    { id: 'rla-6', subject: 'RLA', subject_alias: 'RLA', subtopic: 'Writing', label: 'Organizing ideas for responses' },
    { id: 'rla-7', subject: 'RLA', subject_alias: 'RLA', subtopic: 'Writing', label: 'Citing evidence from the passage' },

    // SCIENCE (data, life, physical, reasoning)
    { id: 'science-1', subject: 'Science', subject_alias: 'Science', subtopic: 'Data Interpretation', label: 'Reading charts and graphs' },
    { id: 'science-2', subject: 'Science', subject_alias: 'Science', subtopic: 'Physical Science', label: 'Forces, motion, and energy' },
    { id: 'science-3', subject: 'Science', subject_alias: 'Science', subtopic: 'Life Science', label: 'Cells and human body systems' },
    { id: 'science-4', subject: 'Science', subject_alias: 'Science', subtopic: 'Earth & Space', label: 'Weather, climate, earth systems' },
    { id: 'science-5', subject: 'Science', subject_alias: 'Science', subtopic: 'Scientific Practice', label: 'Experimental design & variables' },
    { id: 'science-6', subject: 'Science', subject_alias: 'Science', subtopic: 'Reasoning in Science', label: 'Cause-and-effect in passages' },

    // SOCIAL STUDIES (civics, history, econ, reading graphs)
    { id: 'social-1', subject: 'Social Studies', subject_alias: 'Social Studies', subtopic: 'Civics', label: 'Government and civics concepts' },
    { id: 'social-2', subject: 'Social Studies', subject_alias: 'Social Studies', subtopic: 'Geography', label: 'Interpreting maps and data' },
    { id: 'social-3', subject: 'Social Studies', subject_alias: 'Social Studies', subtopic: 'History', label: 'Remembering historical events' },
    { id: 'social-4', subject: 'Social Studies', subject_alias: 'Social Studies', subtopic: 'US History', label: 'Colonial → Civil War sequence' },
    { id: 'social-5', subject: 'Social Studies', subject_alias: 'Social Studies', subtopic: 'Economics', label: 'Basic economics and graphs' },
    { id: 'social-6', subject: 'Social Studies', subject_alias: 'Social Studies', subtopic: 'Document Literacy', label: 'Reading primary/secondary sources' },
];

async function getTestPlanTableName() {
    if (cachedTestPlanTableName) {
        return cachedTestPlanTableName;
    }

    // Prefer the known real table name first
    const candidates = ['test_plans', 'test_plan'];
    for (const tableName of candidates) {
        try {
            await db.query(`SELECT 1 FROM ${tableName} LIMIT 1`);
            cachedTestPlanTableName = tableName;
            return cachedTestPlanTableName;
        } catch (err) {
            if (err && err.code === '42P01') {
                continue;
            }
            console.warn(`Failed to probe table ${tableName}`, err?.message || err);
        }
    }

    cachedTestPlanTableName = candidates[candidates.length - 1];
    return cachedTestPlanTableName;
}

async function getChallengeTables() {
    if (cachedChallengeTables) {
        return cachedChallengeTables;
    }

    const optionCandidates = ['challenge_options', 'challenge_catalog'];
    const selectionCandidates = [
        'user_selected_challenges',
        'user_challenge_tags',
        'profile_challenges'
    ];

    let optionTable = null;
    for (const tableName of optionCandidates) {
        try {
            await db.query(`SELECT 1 FROM ${tableName} LIMIT 1`);
            optionTable = tableName;
            break;
        } catch (err) {
            if (err && err.code === '42P01') {
                continue;
            }
            console.warn(`Failed to probe table ${tableName}`, err?.message || err);
        }
    }
    if (!optionTable) {
        optionTable = optionCandidates[optionCandidates.length - 1];
    }

    let selectionTable = null;
    for (const tableName of selectionCandidates) {
        try {
            await db.query(`SELECT 1 FROM ${tableName} LIMIT 1`);
            selectionTable = tableName;
            break;
        } catch (err) {
            if (err && err.code === '42P01') {
                continue;
            }
            console.warn(`Failed to probe table ${tableName}`, err?.message || err);
        }
    }
    if (!selectionTable) {
        selectionTable = selectionCandidates[selectionCandidates.length - 1];
    }

    cachedChallengeTables = { optionTable, selectionTable };
    return cachedChallengeTables;
}

async function profilesHasNameColumn() {
    if (cachedProfileNameColumn !== null) {
        return cachedProfileNameColumn;
    }

    try {
        const result = await db.query(
            `SELECT 1 FROM information_schema.columns WHERE table_name = $1 AND column_name = $2 LIMIT 1`,
            ['profiles', 'name']
        );
        cachedProfileNameColumn = result.rowCount > 0;
    } catch (err) {
        console.warn('Unable to determine if profiles.name exists', err?.message || err);
        cachedProfileNameColumn = false;
    }

    return cachedProfileNameColumn;
}

function ensureRequestUser(req) {
    if (!req.user) {
        req.user = {};
    }

    if (req.user.id) {
        return true;
    }

    const candidates = [
        req.user.userId,
        req.user.sub,
        req.user.user_id,
        req.userId,
        req.user.id
    ];

    for (const candidate of candidates) {
        if (candidate === undefined || candidate === null) continue;
        const normalized = typeof candidate === 'string' && /^[0-9]+$/.test(candidate)
            ? Number(candidate)
            : candidate;
        if (normalized !== undefined && normalized !== null && normalized !== '') {
            req.user.id = normalized;
            return true;
        }
    }

    return false;
}

function authRequired(req, res, next) {
    if (!ensureRequestUser(req)) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    return next();
}

// Allowlist for profile onboarding routes that should not enforce "active user/org" checks
const PROFILE_ALLOW = new Set([
    '/api/profile/me',
    '/api/profile/test',
    '/api/profile/tests', // alias some clients might use
    '/api/profile/name',
    '/api/profile/save',  // future unified save endpoint
    '/api/profile/challenges/tags',
    '/api/challenges/tags',
    '/api/whoami',
    // presence + quiz attempts should not be blocked by active-user gating
    '/presence/ping',
    '/api/quiz/attempts',
    '/api/quiz-attempts'
]);

function isProfileAllowlistedPath(pathname) {
    try {
        return PROFILE_ALLOW.has(pathname);
    } catch (e) {
        return false;
    }
}

async function buildScoreSummary(userId) {
    try {
        const { loadScoresSafe } = require('./services/profileData');
        if (typeof loadScoresSafe === 'function') {
            const scoreData = await loadScoresSafe(userId);
            const recentScoresDashboard =
                scoreData && typeof scoreData.recentScoresDashboard === 'object' && scoreData.recentScoresDashboard !== null
                    ? scoreData.recentScoresDashboard
                    : {};

            const legacyScores = {};
            if (Array.isArray(scoreData?.bySubject)) {
                legacyScores.bySubject = scoreData.bySubject;
            }
            if (Array.isArray(scoreData?.bySubtopic)) {
                legacyScores.bySubtopic = scoreData.bySubtopic;
            }

            return {
                recentScoresDashboard,
                legacyScores
            };
        }
    } catch (err) {
        console.warn('buildScoreSummary fallback', err?.message || err);
    }

    return {
        recentScoresDashboard: {},
        legacyScores: {}
    };
}

function normalizeTestDate(value) {
    if (!value) {
        return '';
    }
    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }
    if (typeof value === 'string') {
        return value;
    }
    try {
        const asDate = new Date(value);
        if (!Number.isNaN(asDate.getTime())) {
            return asDate.toISOString().slice(0, 10);
        }
    } catch (err) {
        // ignore
    }
    return String(value);
}

async function buildProfileBundle(userId) {
    if (!userId) {
        throw new Error('buildProfileBundle requires a userId');
    }

    const hasNameColumn = await profilesHasNameColumn();

    let profileRow = null;
    try {
        const columnList = hasNameColumn
            ? 'user_id, name, timezone, reminder_enabled, font_size, onboarding_complete'
            : 'user_id, timezone, reminder_enabled, font_size, onboarding_complete';
        const result = await db.query(
            `SELECT ${columnList} FROM profiles WHERE user_id = $1`,
            [userId]
        );
        profileRow = result.rows[0] || null;
    } catch (err) {
        console.error('Failed to load profile row', err?.message || err);
    }

    let displayName = null;
    if (hasNameColumn) {
        displayName = profileRow?.name ?? null;
    }

    if (!displayName) {
        try {
            const userRow = await db.oneOrNone(`SELECT name FROM users WHERE id = $1`, [userId]);
            displayName = userRow?.name ?? null;
        } catch (err) {
            console.warn('Failed to load user name', err?.message || err);
        }
    }

    const profileData = profileRow || {
        user_id: userId,
        timezone: 'America/New_York',
        reminder_enabled: true,
        font_size: null,
        onboarding_complete: false
    };

    const testPlanTable = await getTestPlanTableName();
    let planRows = [];
    try {
        const result = await db.query(
            `SELECT subject, test_date, test_location, passed, not_scheduled FROM ${testPlanTable} WHERE user_id = $1 ORDER BY subject`,
            [userId]
        );
        planRows = result.rows;
    } catch (err) {
        console.error('Failed to load test plan rows', err?.message || err);
    }

    const testPlan = planRows.map((r) => ({
        subject: r.subject,
        testDate: normalizeTestDate(r.test_date),
        testLocation: r.test_location || '',
        passed: !!r.passed,
        notScheduled: !!r.not_scheduled
    }));

    const { optionTable, selectionTable } = await getChallengeTables();

    let allChallenges = [];
    try {
        const result = await db.query(
            `SELECT id, subject, subtopic, label FROM ${optionTable} ORDER BY subject, subtopic, id`
        );
        allChallenges = result.rows;
    } catch (err) {
        console.error('Failed to load challenge options', err?.message || err);
    }

    // Determine whether to use DB catalog or fallback list
    // - Use env ALWAYS_USE_FALLBACK_CHALLENGES=true to force fallback
    // - Otherwise require a minimum catalog size (default 20) before trusting DB
    const alwaysUseFallback = String(process.env.ALWAYS_USE_FALLBACK_CHALLENGES || '').toLowerCase() === 'true';
    const minSize = (() => {
        const n = Number(process.env.MIN_CHALLENGE_CATALOG_SIZE || 20);
        return Number.isFinite(n) && n > 0 ? Math.floor(n) : 20;
    })();
    const hasSufficientCatalog = Array.isArray(allChallenges) && allChallenges.length >= minSize;
    const effectiveAllChallenges = alwaysUseFallback
        ? FALLBACK_PROFILE_CHALLENGES
        : (hasSufficientCatalog ? allChallenges : FALLBACK_PROFILE_CHALLENGES);

    let chosen = [];
    try {
        const result = await db.query(
            `SELECT challenge_id FROM ${selectionTable} WHERE user_id = $1`,
            [userId]
        );
        chosen = result.rows;
    } catch (err) {
        console.error('Failed to load selected challenges', err?.message || err);
    }

    const chosenSet = new Set(chosen.map((r) => String(r.challenge_id)));

    let challengeOptions = effectiveAllChallenges.map((opt) => ({
        id: String(opt.id),
        subject: opt.subject || opt.subject_alias || opt.subject,
        subtopic: opt.subtopic,
        label: opt.label,
        selected: chosenSet.has(String(opt.id))
    }));

    // Safety: if the query probes or mapping above produced an empty list,
    // always fall back to the in-memory catalog so the UI has options.
    if (!Array.isArray(challengeOptions) || challengeOptions.length === 0) {
        try {
            challengeOptions = FALLBACK_PROFILE_CHALLENGES.map((opt) => ({
                id: String(opt.id),
                subject: opt.subject || opt.subject_alias || opt.subject,
                subtopic: opt.subtopic,
                label: opt.label,
                selected: chosenSet.has(String(opt.id))
            }));
        } catch (_) {
            challengeOptions = [];
        }
    }

    const { recentScoresDashboard, legacyScores } = await buildScoreSummary(userId);

    return {
        profile: {
            id: userId,
            name: displayName,
            timezone: profileData.timezone || 'America/New_York',
            reminderEnabled: profileData.reminder_enabled !== undefined && profileData.reminder_enabled !== null
                ? !!profileData.reminder_enabled
                : true,
            fontSize: profileData.font_size,
            onboardingComplete: !!profileData.onboarding_complete
        },
        // Both testPlan (normalized for UI) and raw tests for debugging/compat
        testPlan,
        tests: planRows,
        challengeOptions,
        recentScoresDashboard: recentScoresDashboard || {},
        scores: legacyScores || {}
    };
}

const app = express();
// Use the configured port or default to 3002 locally
let port = Number(process.env.PORT || 3002);
const net = require('net');

// Serve static quiz bundles so the frontend JSON loader can fetch them reliably
// We expose both /public (full folder) and a convenience /quizzes path.
try {
    const repoRoot = path.resolve(__dirname, '..');
    const publicDir = path.join(repoRoot, 'public');
    const frontendDir = path.join(repoRoot, 'frontend');
    app.use('/public', express.static(publicDir, {
        maxAge: '1h',
        setHeaders(res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }));
    // Log quiz requests to verify the frontend is hitting this endpoint
    app.use('/quizzes', (req, _res, next) => {
        try { console.log('[QUIZZES] request:', req.method, req.url); } catch {}
        next();
    });
    // Prefer repository public/quizzes (canonical built files),
    // but allow backend-local overrides if needed.
    app.use('/quizzes', express.static(path.join(publicDir, 'quizzes'), {
        maxAge: '1h',
        setHeaders(res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }));
    app.use('/quizzes', express.static(path.join(__dirname, 'quizzes'), {
        maxAge: '1h',
        setHeaders(res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }));
    // Serve subject badge assets at a stable path
    app.use('/badges', express.static(path.join(publicDir, 'badges'), {
        maxAge: '1h',
        setHeaders(res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }));
    // Fallback to frontend/badges for local development
    app.use('/badges', express.static(path.join(frontendDir, 'badges'), {
        maxAge: '1h',
        setHeaders(res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }));
    // Serve interactive math tools for quiz runner at exact import paths
    app.get('/graphing/GraphCanvas.js', (req, res) => {
        try { res.set('Content-Type', 'application/javascript'); } catch {}
        res.sendFile(path.join(__dirname, 'GraphCanvas.js'));
    });
    app.get('/geometry/GeometryCanvas.js', (req, res) => {
        try { res.set('Content-Type', 'application/javascript'); } catch {}
        res.sendFile(path.join(__dirname, 'GeometryCanvas.js'));
    });
    // Serve frontend static assets at root (JS, images, etc.)
    app.use('/', express.static(frontendDir, {
        index: false,
        maxAge: '1h',
        setHeaders(res) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }));
    // SPA shell at '/' — send with no-store to avoid stale HTML caching during development
    app.get(['/', '/index.html'], (req, res) => {
        try {
            res.set('Cache-Control', 'no-store');
        } catch {}
        res.sendFile(path.join(frontendDir, 'index.html'));
    });
    console.log('[static] Serving /public and /quizzes from', publicDir);
    console.log('[static] Serving SPA and assets from', frontendDir);
} catch (e) {
    console.warn('[static] Failed to initialize static serving for /public:', e?.message || e);
}

async function isPortBusy(p) {
    return new Promise((resolve) => {
        const tester = net.createServer()
            .once('error', (err) => {
                if (err && err.code === 'EADDRINUSE') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .once('listening', () => {
                tester.close(() => resolve(false));
            })
            .listen(p, '0.0.0.0');
    });
}
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const devAuth = require('./middleware/devAuth');

function ensureTestUserForNow(req, res, next) {
    // If a prior middleware already populated the user, just normalise and move on.
    if (ensureRequestUser(req)) {
        if (req.user && req.user.id && !req.user.userId) {
            req.user.userId = req.user.id;
        }
        return next();
    }

    // TEMPORARY FALLBACK:
    // Force a known user ID so onboarding/profile can work while auth is fixed.
    const fallbackIdRaw = process.env.FALLBACK_USER_ID || process.env.TEST_USER_ID || '1';
    const fallbackId = /^[0-9]+$/.test(String(fallbackIdRaw)) ? Number(fallbackIdRaw) : fallbackIdRaw;

    req.user = { ...(req.user || {}), id: fallbackId, userId: fallbackId };

    console.log('[ensureTestUserForNow] Using fallback req.user.id =', req.user.id);

    return next();
}
const profileRouter = require('./routes/profile');

ensureProfilePreferenceColumns().catch((e) => console.error('Pref column init error:', e));
ensureQuizAttemptsTable().catch((e) => console.error('Quiz attempt table init error:', e));
ensureEssayScoresTable().catch((e) => console.error('Essay score table init error:', e));
ensureChallengeSystemTables().catch((e) => console.error('Challenge system init error:', e));
ensureStudyPlansTable().catch((e) => console.error('Study plans table init error:', e));
ensureCoachDailyTables().catch((e) => console.error('Coach daily tables init error:', e));
ensureCoachAdviceUsageTable().catch((e) => console.error('Coach advice usage table init error:', e));

const allowedOrigins = [
    'https://ezged.netlify.app',
    'https://quiz.ez-ged.com',
    'http://localhost:8000' // For local testing
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
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
app.use(express.json());
app.use(cookieParser());

app.post('/presence/ping', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await db.query(
            `UPDATE users
                SET last_seen_at = NOW()
              WHERE id = $1`,
            [userId]
        );

        return res.json({ ok: true });
    } catch (err) {
        console.error('presence/ping failed:', err?.message || err);
        return res.status(500).json({ error: 'presence_update_failed' });
    }
});

// Also support GET pings so callers that use fetch GET won't 404
app.get('/presence/ping', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            await db.query(
                `UPDATE users
                    SET last_seen_at = NOW()
                  WHERE id = $1`,
                [userId]
            );
        } catch (e) {
            console.warn('[presence/ping] failed to update last_seen_at', e?.message || e);
        }

        return res.json({ ok: true });
    } catch (err) {
        console.error('presence/ping (GET) failed:', err?.message || err);
        return res.status(500).json({ error: 'presence_update_failed' });
    }
});

// --- Challenge system table ensure (best-effort, complements migrations) ---
async function ensureChallengeSystemTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS challenge_tag_catalog (
              challenge_tag TEXT PRIMARY KEY,
              subject TEXT,
              label TEXT,
              created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
    } catch (e) { console.warn('[ensure] challenge_tag_catalog', e?.code || e?.message || e); }
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_challenge_stats (
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              challenge_tag TEXT NOT NULL,
              correct_count INTEGER NOT NULL DEFAULT 0,
              wrong_count INTEGER NOT NULL DEFAULT 0,
              last_seen TIMESTAMPTZ,
              last_wrong_at TIMESTAMPTZ,
              source TEXT,
              PRIMARY KEY (user_id, challenge_tag)
            );
        `);
    } catch (e) { console.warn('[ensure] user_challenge_stats', e?.code || e?.message || e); }
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_challenge_suggestions (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              challenge_tag TEXT NOT NULL,
              suggestion_type TEXT NOT NULL CHECK (suggestion_type IN ('add','remove')),
              source TEXT,
              reason TEXT,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              resolved_at TIMESTAMPTZ
            );
        `);
    } catch (e) { console.warn('[ensure] user_challenge_suggestions', e?.code || e?.message || e); }
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS essay_challenge_log (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              challenge_tag TEXT NOT NULL,
              essay_id TEXT,
              source TEXT DEFAULT 'essay',
              created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
    } catch (e) { console.warn('[ensure] essay_challenge_log', e?.code || e?.message || e); }
}

// --- Study plans table ensure ---
async function ensureStudyPlansTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS study_plans (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              subject TEXT NOT NULL,
              generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
              valid_from DATE NOT NULL,
              valid_to DATE NOT NULL,
              plan_json JSONB NOT NULL,
              notes TEXT
            );
        `);
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_study_plans_user_subject ON study_plans (user_id, subject);`);
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_study_plans_generated_at ON study_plans (generated_at DESC);`);
    } catch (e) {
        console.warn('[ensure] study_plans', e?.code || e?.message || e);
    }
}

// --- Daily Coach tables ensure ---
async function ensureCoachDailyTables() {
    // Per-day progress per subject
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS coach_daily_progress (
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              subject TEXT NOT NULL,
              plan_date DATE NOT NULL,
              expected_minutes INTEGER NOT NULL DEFAULT 45,
              completed_minutes INTEGER NOT NULL DEFAULT 0,
              coach_quiz_id TEXT,
              coach_quiz_source_id TEXT,
              coach_quiz_completed BOOLEAN NOT NULL DEFAULT false,
              notes TEXT,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              updated_at TIMESTAMPTZ DEFAULT NOW(),
              PRIMARY KEY (user_id, subject, plan_date)
            );
        `);
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_coach_daily_user_date ON coach_daily_progress (user_id, plan_date DESC);`);
    } catch (e) { console.warn('[ensure] coach_daily_progress', e?.code || e?.message || e); }

    // Per-subject status (passed)
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_subject_status (
              user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              subject TEXT NOT NULL,
              passed BOOLEAN NOT NULL DEFAULT false,
              passed_at TIMESTAMPTZ,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              updated_at TIMESTAMPTZ DEFAULT NOW(),
              PRIMARY KEY (user_id, subject)
            );
        `);
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_subject_status_user ON user_subject_status (user_id);`);
    } catch (e) { console.warn('[ensure] user_subject_status', e?.code || e?.message || e); }
}

// Track per-user Ask Coach advice usage by week
async function ensureCoachAdviceUsageTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS coach_advice_usage (
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              week_start_date DATE NOT NULL,
              used_count INTEGER NOT NULL DEFAULT 0,
              last_used_at TIMESTAMPTZ NOT NULL DEFAULT now(),
              UNIQUE (user_id, week_start_date)
            );
        `);
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_coach_advice_usage_user_week ON coach_advice_usage (user_id, week_start_date);`);
    } catch (e) { console.warn('[ensure] coach_advice_usage', e?.code || e?.message || e); }
}

// --- Challenge system helpers ---
async function upsertChallengeStat(userId, challengeTag, gotCorrect, source) {
    if (!userId || !challengeTag) return;
    const now = new Date();
    const incCorrect = gotCorrect ? 1 : 0;
    const incWrong = gotCorrect ? 0 : 1;
    const lastWrong = gotCorrect ? null : now;
    await pool.query(`
        INSERT INTO user_challenge_stats
          (user_id, challenge_tag, correct_count, wrong_count, last_seen, last_wrong_at, source)
        VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, 'quiz'))
        ON CONFLICT (user_id, challenge_tag)
        DO UPDATE SET
          correct_count = user_challenge_stats.correct_count + EXCLUDED.correct_count,
          wrong_count = user_challenge_stats.wrong_count + EXCLUDED.wrong_count,
          last_seen = EXCLUDED.last_seen,
          last_wrong_at = CASE WHEN EXCLUDED.last_wrong_at IS NOT NULL THEN EXCLUDED.last_wrong_at ELSE user_challenge_stats.last_wrong_at END,
          source = COALESCE(user_challenge_stats.source, EXCLUDED.source);
    `, [userId, challengeTag, incCorrect, incWrong, now, lastWrong, source || null]);
}

async function userHasActiveChallenge(userId, challengeTag) {
    const { selectionTable } = await getChallengeTables();
    try {
        const r = await db.oneOrNone(`SELECT 1 FROM ${selectionTable} WHERE user_id = $1 AND challenge_id = $2 LIMIT 1`, [userId, challengeTag]);
        return !!r;
    } catch (_) { return false; }
}

async function createSuggestion(userId, challengeTag, type, source, reason) {
    try {
        await pool.query(
            `INSERT INTO user_challenge_suggestions (user_id, challenge_tag, suggestion_type, source, reason)
             VALUES ($1, $2, $3, $4, $5)`,
            [userId, challengeTag, type, source || null, reason || null]
        );
    } catch (e) {
        console.warn('[suggestion] insert failed', e?.message || e);
    }
}

async function runPromotionDemotionRules(userId, tag) {
    // Load stats
    const { rows } = await pool.query(`SELECT correct_count, wrong_count, last_seen, last_wrong_at FROM user_challenge_stats WHERE user_id = $1 AND challenge_tag = $2`, [userId, tag]);
    if (!rows || rows.length === 0) return;
    const s = rows[0];
    const correct = Number(s.correct_count) || 0;
    const wrong = Number(s.wrong_count) || 0;
    const lastSeen = s.last_seen ? new Date(s.last_seen) : null;
    const lastWrongAt = s.last_wrong_at ? new Date(s.last_wrong_at) : null;

    // PROMOTE (suggest add)
    if (wrong >= 3 && wrong >= correct + 2) {
        const active = await userHasActiveChallenge(userId, tag);
        if (!active) {
            await createSuggestion(userId, tag, 'add', 'quiz', 'Missed several questions tied to this challenge');
        }
    }

    // DEMOTE (suggest remove)
    const active = await userHasActiveChallenge(userId, tag);
    if (active && correct >= 4) {
        // "no new wrongs since last_seen" approximation: last_wrong_at older than last_seen or null
        const noNewWrongs = !lastWrongAt || (lastSeen && lastWrongAt < lastSeen);
        if (noNewWrongs) {
            await createSuggestion(userId, tag, 'remove', 'quiz', 'You are consistently answering this challenge correctly');
        }
    }
}

// Minimal quiz attempts endpoints to satisfy frontend calls
app.get('/api/quiz/attempts', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    // later: SELECT * FROM quiz_attempts WHERE user_id = $1 ORDER BY created_at DESC
    return res.json({ ok: true, attempts: [] });
});

app.post('/api/quiz/attempts', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    // for now just ACK
    return res.json({ ok: true });
});

// Simple endpoint to debug the resolved identity and profile presence
app.get('/api/whoami', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            return res.status(401).json({ ok: false, error: 'unauthorized' });
        }

        let userRow = null;
        try {
            userRow = await loadUserWithRole(userId);
        } catch (e) {
            // ignore
        }

        let profileRow = null;
        let profileExists = false;
        try {
            const result = await db.query(`SELECT user_id, timezone, onboarding_complete, font_size FROM profiles WHERE user_id = $1`, [userId]);
            profileRow = result.rows[0] || null;
            profileExists = !!profileRow;
        } catch (_) {
            // profiles table/columns may vary; fall back to existence check only
            try {
                const result = await db.query(`SELECT 1 FROM profiles WHERE user_id = $1 LIMIT 1`, [userId]);
                profileExists = result.rowCount > 0;
            } catch (__) {}
        }

        const minimalReqUser = req.user ? {
            id: req.user.id,
            email: req.user.email || null,
            role: req.user.role || null,
            organization_id: req.user.organization_id ?? null
        } : null;

        return res.json({
            ok: true,
            user: userRow ? buildUserResponse(userRow) : minimalReqUser,
            profile: {
                exists: profileExists,
                row: profileRow || null
            }
        });
    } catch (err) {
        return res.status(500).json({ ok: false, error: 'whoami_failed', details: err?.message || String(err) });
    }
});

app.get('/api/profile/me', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    console.log('[/api/profile/me] req.user =', req.user);
    try {
        const bundle = await buildProfileBundle(req.user.id);
        return res.json(bundle);
    } catch (err) {
        console.error('[/api/profile/me] ERROR:', err);
        return res.status(500).json({ error: 'Unable to load profile' });
    }
});

// Read-only endpoint to inspect the default challenge catalog (useful for QA)
app.get('/api/challenges/defaults', devAuth, requireAuthInProd, authRequired, async (_req, res) => {
    res.json({ items: FALLBACK_PROFILE_CHALLENGES });
});

// Return unresolved challenge suggestions for the current user
app.get('/api/challenges/suggestions', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const { rows } = await pool.query(`
            SELECT s.id, s.challenge_tag, s.suggestion_type, s.source, s.reason, s.created_at,
                   c.subject, c.label
              FROM user_challenge_suggestions s
              LEFT JOIN challenge_tag_catalog c ON c.challenge_tag = s.challenge_tag
             WHERE s.user_id = $1 AND s.resolved_at IS NULL
             ORDER BY s.created_at DESC, s.id DESC
        `, [userId]);
        return res.json({ items: rows.map(r => ({
            id: r.id,
            challenge_tag: r.challenge_tag,
            suggestion_type: r.suggestion_type,
            source: r.source,
            reason: r.reason,
            created_at: r.created_at,
            subject: r.subject || null,
            label: r.label || null,
        }))});
    } catch (e) {
        console.error('GET /api/challenges/suggestions failed:', e);
        return res.status(500).json({ error: 'failed_to_load_suggestions' });
    }
});

// Ingest per-question responses (no quiz_attempt row). Intended for Practice Sessions / Pop Quiz.
app.post('/api/challenges/ingest-responses', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const { responses = [], source = 'practice' } = req.body || {};
        if (!Array.isArray(responses) || responses.length === 0) {
            return res.status(400).json({ error: 'responses_required' });
        }
        let processed = 0;
        for (const item of responses) {
            if (!item || !Array.isArray(item.challenge_tags)) continue;
            const gotCorrect = !!item.correct;
            for (const tag of item.challenge_tags) {
                if (!tag || typeof tag !== 'string') continue;
                const clean = tag.trim().toLowerCase();
                if (!clean) continue;
                try {
                    const exists = await db.oneOrNone('SELECT 1 FROM challenge_tag_catalog WHERE challenge_tag = $1 LIMIT 1', [clean]);
                    if (!exists) {
                        console.warn('[challenge-tag] Missing in catalog:', clean);
                    }
                } catch (_) {}
                await upsertChallengeStat(userId, clean, gotCorrect, source === 'pop_quiz' ? 'pop_quiz' : 'practice');
                await runPromotionDemotionRules(userId, clean);
                processed++;
            }
        }
        return res.json({ ok: true, processed });
    } catch (e) {
        console.error('POST /api/challenges/ingest-responses failed:', e);
        return res.status(500).json({ error: 'failed_to_ingest' });
    }
});

// --- Weekly Study Coach ---
function normalizeSubjectLabel(subj) {
    const s = String(subj || '').trim();
    if (!s) return '';
    // Accept a variety of labels from UI
    if (/^math$/i.test(s)) return 'Math';
    if (/^science$/i.test(s)) return 'Science';
    if (/^(rla|language|reasoning\s+through)/i.test(s)) return 'RLA';
    if (/^social(\s*studies)?$/i.test(s)) return 'Social Studies';
    if (/^social\-studies$/i.test(s)) return 'Social Studies';
    return s;
}
function subjectTagPrefixes(label) {
    const l = normalizeSubjectLabel(label);
    switch (l) {
        case 'Math': return ['math:'];
        case 'Science': return ['science:'];
        case 'RLA': return ['rla:'];
        case 'Social Studies': return ['social:', 'social-studies:'];
        default: return [];
    }
}

// --- Daily Coach constants & helpers ---
const COACH_DAILY_QUIZZES = {
    'Math': ['math.fractions.01', 'math.mixed.02', 'math.algebra.01'],
    'Science': ['science.reading.01', 'science.data.01'],
    'RLA': ['rla.reading.01', 'rla.grammar.01'],
    'Social Studies': ['social.civics.01', 'social.history.01']
};
const COACH_ASSIGNED_BY = 'coach-smith';
const COACH_QUIZ_MINUTES = 15; // minutes credited when coach quiz is completed

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

async function isSubjectPassed(userId, subject) {
    try {
        // Check explicit status table first
        const r = await pool.query(`SELECT passed FROM user_subject_status WHERE user_id = $1 AND subject = $2 LIMIT 1`, [userId, subject]);
        if (r.rowCount && r.rows[0] && r.rows[0].passed === true) return true;
    } catch (_) {}
    // Fallback: also respect test plan 'passed' if present
    try {
        const testPlanTable = await getTestPlanTableName();
        const r2 = await pool.query(`SELECT passed FROM ${testPlanTable} WHERE user_id = $1 AND subject = $2 LIMIT 1`, [userId, subject]);
        if (r2.rowCount && r2.rows[0] && r2.rows[0].passed === true) return true;
    } catch (_) {}
    return false;
}

async function latestWeeklyPlan(userId, subject) {
    const { rows } = await pool.query(
        `SELECT id, subject, valid_from, valid_to, plan_json, notes
           FROM study_plans
          WHERE user_id = $1 AND subject = $2
          ORDER BY generated_at DESC, id DESC
          LIMIT 1`,
        [userId, subject]
    );
    return rows && rows[0] ? rows[0] : null;
}

// Helper to get the start of the current ISO week (Monday) as a date string YYYY-MM-DD
function getCurrentWeekStartISO() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun,1=Mon,...
    const diffToMonday = (day === 0 ? -6 : 1) - day; // move to Monday
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString().slice(0, 10);
}

async function getUserEmailById(userId) {
    if (!userId) return null;
    try {
        const row = await db.oneOrNone(`SELECT email FROM users WHERE id = $1`, [userId]);
        return row?.email || null;
    } catch (_) {
        return null;
    }
}

function dateDiffDays(aISO, bISO) {
    try {
        const a = new Date(aISO);
        const b = new Date(bISO);
        return Math.floor((a - b) / (1000 * 60 * 60 * 24));
    } catch {
        return 0;
    }
}

function pickCoachQuizSourceId(subject, dayIndex = 0) {
    const list = COACH_DAILY_QUIZZES[subject] || [];
    if (!list.length) return null;
    const idx = Math.abs(dayIndex) % list.length;
    return list[idx];
}

async function findOrCreateDailyRow(userId, subject, planDateISO) {
    // Try existing row
    const sel = await pool.query(
        `SELECT user_id, subject, plan_date, expected_minutes, completed_minutes, coach_quiz_id, coach_quiz_source_id, coach_quiz_completed, notes
           FROM coach_daily_progress
          WHERE user_id = $1 AND subject = $2 AND plan_date = $3
          LIMIT 1`,
        [userId, subject, planDateISO]
    );
    if (sel.rowCount) return sel.rows[0];

    // Seed from weekly plan if available
    const weekly = await latestWeeklyPlan(userId, subject);
    let notes = '';
    let dayIdx = 0;
    let needsRefresh = false;
    let planSource = null; // quizCode from weekly plan day if any
    if (weekly) {
        const vf = weekly.valid_from instanceof Date ? weekly.valid_from.toISOString().slice(0, 10) : String(weekly.valid_from).slice(0, 10);
        const vt = weekly.valid_to instanceof Date ? weekly.valid_to.toISOString().slice(0, 10) : String(weekly.valid_to).slice(0, 10);
        const dFrom = dateDiffDays(planDateISO, vf);
        const dTo = dateDiffDays(planDateISO, vt);
        if (dFrom >= 0 && dTo <= 0) {
            dayIdx = dFrom;
            const day = Array.isArray(weekly.plan_json?.days) ? weekly.plan_json.days.find((d) => Number(d.day) === (dayIdx + 1)) : null;
            if (day) {
                const focus = Array.isArray(day.focus) ? day.focus.join(', ') : '';
                const taskText = day.label || day.task || day.type || '';
                notes = `Focus: ${focus}\nTask: ${taskText}\nPlanned: ${day.minutes || 0} min`;
                // Prefer premade quiz assignment from weekly plan day
                if (day.quizId) planSource = String(day.quizId);
            }
        } else {
            needsRefresh = true;
            notes = 'Outside weekly plan window. Please refresh your Weekly Coach plan.';
        }
    } else {
        notes = 'No weekly plan found. Tap "Weekly Coach" to generate one.';
    }

    const expected = 45;
    const coachQuizSource = planSource || pickCoachQuizSourceId(subject, dayIdx);
    const coachQuizId = coachQuizSource ? `${COACH_ASSIGNED_BY}:${subject}:${planDateISO}` : null;

    await pool.query(
        `INSERT INTO coach_daily_progress (user_id, subject, plan_date, expected_minutes, completed_minutes, coach_quiz_id, coach_quiz_source_id, coach_quiz_completed, notes, updated_at)
         VALUES ($1, $2, $3, $4, 0, $5, $6, false, $7, NOW())
         ON CONFLICT (user_id, subject, plan_date) DO NOTHING`,
        [userId, subject, planDateISO, expected, coachQuizId, coachQuizSource, notes]
    );

    const sel2 = await pool.query(
        `SELECT user_id, subject, plan_date, expected_minutes, completed_minutes, coach_quiz_id, coach_quiz_source_id, coach_quiz_completed, notes
           FROM coach_daily_progress
          WHERE user_id = $1 AND subject = $2 AND plan_date = $3
          LIMIT 1`,
        [userId, subject, planDateISO]
    );
    return sel2.rowCount ? sel2.rows[0] : null;
}

app.get('/api/coach/:subject', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const subject = normalizeSubjectLabel(req.params.subject);
        const { rows } = await pool.query(
            `SELECT id, user_id, subject, generated_at, valid_from, valid_to, plan_json, notes
               FROM study_plans
              WHERE user_id = $1 AND subject = $2
              ORDER BY generated_at DESC, id DESC
              LIMIT 1`,
            [userId, subject]
        );
        if (!rows || rows.length === 0) {
            return res.json({ ok: false, reason: 'no_plan' });
        }
        return res.json({ ok: true, plan: rows[0] });
    } catch (e) {
        console.error('GET /api/coach/:subject failed:', e);
        return res.status(500).json({ ok: false, error: 'coach_fetch_failed' });
    }
});

// Build a premade quiz inventory for a subject from ALL_QUIZZES
function loadPremadeQuizzesForSubjectSync(subject) {
    const out = [];
    const subj = ALL_QUIZZES?.[subject];
    if (!subj || !subj.categories) return out;
    for (const [catName, cat] of Object.entries(subj.categories)) {
        const topics = Array.isArray(cat?.topics) ? cat.topics : [];
        for (const t of topics) {
            const quizzes = Array.isArray(t?.quizzes) ? t.quizzes : [];
            for (const q of quizzes) {
                if (!q) continue;
                // Aggregate tags from attached questions if present
                let tags = [];
                if (Array.isArray(q.questions)) {
                    q.questions.forEach((qq, i) => {
                        const norm = ensureQuestionTags(subject, catName, t, qq, i);
                        if (Array.isArray(norm?.challenge_tags)) tags.push(...norm.challenge_tags);
                    });
                }
                const id = q.quizCode || q.quizId || `${subject}:${(q.title || q.name || 'quiz').toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;
                out.push({ id, title: q.title || q.name || 'Quiz', challenge_tags: Array.from(new Set(tags)) });
            }
            // If a topic has questions but no quiz objects, treat topic as one premade
            if (!Array.isArray(t?.quizzes) && Array.isArray(t?.questions) && t.questions.length > 0) {
                let tags = [];
                t.questions.forEach((qq, i) => {
                    const norm = ensureQuestionTags(subject, catName, t, qq, i);
                    if (Array.isArray(norm?.challenge_tags)) tags.push(...norm.challenge_tags);
                });
                const id = `${subject}:${(t.title || 'topic').toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;
                out.push({ id, title: t.title || 'Topic Quiz', challenge_tags: Array.from(new Set(tags)) });
            }
        }
    }
    return out;
}

function prioritizeQuizzesByChallenges(quizzes, challengeTags) {
    const wanted = new Set((challengeTags || []).map(t => String(t).toLowerCase()));
    return quizzes
        .map(q => {
            const tags = (q.challenge_tags || []).map(t => String(t).toLowerCase());
            const overlap = tags.filter(t => wanted.has(t)).length;
            return { ...q, _score: overlap };
        })
        .sort((a,b) => (b._score - a._score) || (a.title || '').localeCompare(b.title || ''))
        .map(({ _score, ...rest }) => rest);
}

// Normalize a weekly-day object so frontends can reliably render
function normalizeCoachDay(day) {
    const out = { ...day };
    out.focus = Array.isArray(out.focus) ? out.focus : (out.focus ? [out.focus] : []);
    out.task = out.task || out.label || out.type || 'Practice';
    out.label = out.label || out.task;
    out.minutes = out.minutes || 20;
    return out;
}

app.post('/api/coach/:subject/generate-week', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const subject = normalizeSubjectLabel(req.params.subject);
        const userEmail = String(req.user?.email || '').toLowerCase();
        const isTester = userEmail === 'zacharysmith527@gmail.com';

        // Respect subject passed flag, but allow tester and RLA to generate
        const subjectIsPassed = await isSubjectPassed(userId, subject);
        if (subjectIsPassed && !isTester && subject !== 'RLA') {
            return res.status(400).json({ ok: false, error: 'subject_passed', message: 'This subject has been marked as passed.' });
        }

        // 1) enforce once per calendar week
        let latest = null;
        try {
            const r = await pool.query(
                `SELECT id, generated_at, valid_from, valid_to FROM study_plans WHERE user_id = $1 AND subject = $2 ORDER BY generated_at DESC, id DESC LIMIT 1`,
                [userId, subject]
            );
            latest = r.rows && r.rows[0] ? r.rows[0] : null;
        } catch (_) {}
        const weekStartISO = getCurrentWeekStartISO();
        let upsertPlanId = null;
        if (latest && latest.valid_from) {
            const latestStart = (latest.valid_from instanceof Date) ? latest.valid_from.toISOString().slice(0,10) : String(latest.valid_from).slice(0,10);
            if (latestStart === weekStartISO) {
                if (isTester) {
                    upsertPlanId = latest.id; // tester can regenerate freely
                } else if (subject === 'RLA') {
                    upsertPlanId = latest.id; // allow regeneration for RLA by updating existing plan for the week
                } else {
                    return res.status(429).json({ ok: false, message: 'You already generated the weekly plan for this subject this week.' });
                }
            }
        }

    // 2) inputs: test date
        const testPlanTable = await getTestPlanTableName();
        let testDate = null;
        try {
            const r = await db.query(`SELECT test_date, not_scheduled, passed FROM ${testPlanTable} WHERE user_id = $1 AND subject = $2 LIMIT 1`, [userId, subject]);
            if (r.rows && r.rows[0]) {
                testDate = normalizeTestDate(r.rows[0].test_date || null);
            }
        } catch (_) {}

        // 3) recent attempts (last 5)
        let recentAttempts = [];
        try {
            const r = await pool.query(
                `SELECT quiz_title, score, total_questions, scaled_score, attempted_at
                   FROM quiz_attempts
                  WHERE user_id = $1 AND subject = $2
                  ORDER BY attempted_at DESC, id DESC
                  LIMIT 5`,
                [userId, subject]
            );
            recentAttempts = (r.rows || []).map(row => ({
                quiz: row.quiz_title || 'Practice Quiz',
                score: (Number(row.score) && Number(row.total_questions)) ? Math.round((Number(row.score)/Number(row.total_questions))*100) : (Number(row.scaled_score) || null),
                attempted_at: row.attempted_at
            }));
        } catch (_) {}

        // 4) selected/self-declared challenges
        const { optionTable, selectionTable } = await getChallengeTables();
        let declaredTags = new Set();
        try {
            const sel = await db.query(`SELECT challenge_id FROM ${selectionTable} WHERE user_id = $1`, [userId]);
            const ids = sel.rows.map(r => String(r.challenge_id));
            if (ids.length) {
                // try to map ids to tags using heuristics and options table
                const optRows = await db.query(`SELECT id, subject, subtopic, label FROM ${optionTable}`);
                const byId = new Map(optRows.rows.map(o => [String(o.id), o]));
                const subjPrefixes = subjectTagPrefixes(subject);
                for (const id of ids) {
                    if (/:/.test(id)) {
                        // already a tag-like id
                        if (!subjPrefixes.length || subjPrefixes.some(p => id.startsWith(p))) declaredTags.add(id.toLowerCase());
                        continue;
                    }
                    const opt = byId.get(id);
                    if (opt && (!subject || opt.subject === subject)) {
                        const subjKey = (subject === 'Social Studies') ? 'social' : subject.toLowerCase();
                        const slug = (opt.subtopic || opt.label || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        if (slug) {
                            declaredTags.add(`${subjKey}:${slug}`);
                        }
                    }
                }
            }
        } catch (_) {}

    // 5) stats: compute priority per tag
        const prefixes = subjectTagPrefixes(subject);
        let topStats = [];
        try {
            const r = await pool.query(
                `SELECT challenge_tag, correct_count, wrong_count
                   FROM user_challenge_stats
                  WHERE user_id = $1`,
                [userId]
            );
            for (const row of r.rows || []) {
                const tag = String(row.challenge_tag || '').toLowerCase();
                if (prefixes.length && !prefixes.some(p => tag.startsWith(p))) continue;
                const correct = Number(row.correct_count) || 0;
                const wrong = Number(row.wrong_count) || 0;
                const priority = wrong * 3 - correct;
                if (priority > 0) {
                    topStats.push({ tag, correct, wrong, priority });
                }
            }
            topStats.sort((a,b) => b.priority - a.priority);
        } catch (_) {}

    const topFromStats = topStats.slice(0, 6).map(s => ({ tag: s.tag, reason: `Missed ${s.wrong}× recently` }));
    const declaredList = Array.from(declaredTags).slice(0, 6).map(t => ({ tag: t, reason: 'Student declared this as a challenge' }));

        // Merge, de-dup, keep 3–4
        const merged = [];
        const seen = new Set();
        for (const item of [...topFromStats, ...declaredList]) {
            const k = item.tag;
            if (seen.has(k)) continue;
            seen.add(k);
            merged.push(item);
            if (merged.length >= 4) break;
        }
        if (merged.length === 0 && declaredList.length) {
            merged.push(declaredList[0]);
        }

        // Build a deterministic 7-day plan with premade quizzes prioritized by challenges
        const challengeTags = merged.map(m => m.tag);
        const inventory = loadPremadeQuizzesForSubjectSync(subject);
        const prioritized = prioritizeQuizzesByChallenges(inventory, challengeTags);
        const pick = (i) => prioritized.length ? prioritized[i % prioritized.length] : null;
        const days = [];
        for (let i = 0; i < 7; i++) {
            const quiz = pick(i);
            const label = quiz ? (quiz.title || 'Premade Quiz') : `Practice ${subject}`;
            const day = normalizeCoachDay({
                day: i + 1,
                type: 'premade-quiz',
                quizId: quiz ? quiz.id : null,
                label,
                minutes: 20,
                focus: challengeTags.slice(0, 3)
            });
            days.push(day);
        }
        const aiPlan = {
            days,
            notes: testDate
                ? `Work through these daily items before your ${subject} test on ${testDate}.`
                : `Work through one item per day to make steady progress in ${subject}.`
        };

        // Persist plan
    const validFrom = weekStartISO;
    const d0 = new Date(`${weekStartISO}T00:00:00Z`);
        const d6 = new Date(d0.getTime() + 6*24*60*60*1000);
        const validTo = `${d6.getFullYear()}-${String(d6.getMonth()+1).padStart(2,'0')}-${String(d6.getDate()).padStart(2,'0')}`;

        let saved;
        if (upsertPlanId) {
            const update = await pool.query(
                `UPDATE study_plans
                    SET generated_at = NOW(),
                        valid_from = $3,
                        valid_to = $4,
                        plan_json = $5,
                        notes = $6
                  WHERE id = $1 AND user_id = $2 AND subject = $7
                RETURNING id, user_id, subject, generated_at, valid_from, valid_to, plan_json, notes`,
                [upsertPlanId, userId, validFrom, validTo, aiPlan, aiPlan?.notes || (testDate ? 'Generated weekly plan.' : 'Generated; no test date set.'), subject]
            );
            saved = update.rows[0];
        } else {
            const insert = await pool.query(
                `INSERT INTO study_plans (user_id, subject, valid_from, valid_to, plan_json, notes)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id, user_id, subject, generated_at, valid_from, valid_to, plan_json, notes`,
                [userId, subject, validFrom, validTo, aiPlan, aiPlan?.notes || (testDate ? 'Generated weekly plan.' : 'Generated; no test date set.')]
            );
            saved = insert.rows[0];
        }

        // Sync today's daily row so the daily panel can immediately show the quiz
        try {
            const today = todayISO();
            // Remove any stale daily row created earlier today before the weekly plan existed
            await pool.query(
                `DELETE FROM coach_daily_progress WHERE user_id = $1 AND subject = $2 AND plan_date = $3`,
                [userId, subject, today]
            );
            // Recreate it so it pulls from the just-created weekly plan
            const refreshed = await findOrCreateDailyRow(userId, subject, today);
            console.log('[coach-sync] refreshed daily row', { userId, subject, today, hasRow: !!refreshed });
        } catch (syncErr) {
            console.error('Could not sync weekly -> daily coach quiz', syncErr);
        }

        return res.json({ ok: true, plan: saved });
    } catch (e) {
        console.error('POST /api/coach/:subject/generate-week failed:', e);
        return res.status(500).json({ ok: false, error: 'coach_generate_failed' });
    }
});

// --- Daily Coach API ---
// 1) GET /api/coach/daily — return or create today's plan per active subject
app.get('/api/coach/daily', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const today = todayISO();

        const SUBJECTS = ['Math', 'Science', 'RLA', 'Social Studies'];
        const subjects = [];

        for (const subj of SUBJECTS) {
            if (await isSubjectPassed(userId, subj)) continue; // skip passed subjects
            const row = await findOrCreateDailyRow(userId, subj, today);
            if (!row) continue;
            // Build structured task list
            const tasks = [];
            let focusTag = null;
            if (row.notes) {
                const lines = row.notes.split(/\n+/).map(s => s.trim()).filter(Boolean);
                // Try to parse Focus: a, b from first line
                const focusLine = lines.find(ln => /^focus\s*:/i.test(ln));
                if (focusLine) {
                    const tags = focusLine.split(':').slice(1).join(':').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
                    focusTag = tags[0] || null;
                }
                lines.forEach((ln) => tasks.push({ type: 'note', label: ln }));
            }
            if (row.coach_quiz_id && !row.coach_quiz_completed && row.coach_quiz_source_id) {
                tasks.push({ type: 'premade-quiz', label: 'Today\'s premade', quizId: row.coach_quiz_source_id, focusTag: focusTag || null });
            } else if (row.coach_quiz_id && !row.coach_quiz_completed) {
                tasks.push({ type: 'coach-quiz', label: 'Do coach quiz', quizId: null, focusTag: focusTag || null });
            }
            subjects.push({
                subject: subj,
                expected_minutes: Number(row.expected_minutes) || 45,
                completed_minutes: Math.max(0, Number(row.completed_minutes) || 0),
                coach_quiz_id: row.coach_quiz_id || null,
                coach_quiz_completed: !!row.coach_quiz_completed,
                coach_quiz_source_id: row.coach_quiz_source_id || null,
                tasks
            });
        }

        return res.json({ ok: true, today, subjects });
    } catch (e) {
        console.error('GET /api/coach/daily failed:', e);
        return res.status(500).json({ ok: false, error: 'coach_daily_failed' });
    }
});
// Ask Coach (subject) — ad-hoc 12Q mixed quiz filtered by user challenge tags
app.post('/api/coach/:subject/ask', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const subject = normalizeSubjectLabel(req.params.subject);

        // Gather challenge tags for this subject
        const { optionTable, selectionTable } = await getChallengeTables();
        const prefixes = subjectTagPrefixes(subject);
        let userTags = new Set();
        try {
            const sel = await db.query(`SELECT challenge_id FROM ${selectionTable} WHERE user_id = $1`, [userId]);
            const ids = sel.rows.map(r => String(r.challenge_id));
            if (ids.length) {
                const optRows = await db.query(`SELECT id, subject, subtopic, label FROM ${optionTable}`);
                const byId = new Map(optRows.rows.map(o => [String(o.id), o]));
                for (const id of ids) {
                    if (/:/.test(id)) {
                        const tag = String(id).toLowerCase();
                        if (!prefixes.length || prefixes.some(p => tag.startsWith(p))) userTags.add(tag);
                        continue;
                    }
                    const opt = byId.get(id);
                    if (opt && (!subject || opt.subject === subject)) {
                        const subjKey = (subject === 'Social Studies') ? 'social' : subject.toLowerCase();
                        const slug = (opt.subtopic || opt.label || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        if (slug) userTags.add(`${subjKey}:${slug}`);
                    }
                }
            }
        } catch (_) {}

        // Build pool of questions for subject
        let pool = getPremadeQuestions(subject, 200);
        const wanted = Array.from(userTags);
        let filtered = pool.filter(q => Array.isArray(q?.challenge_tags) && q.challenge_tags.some(t => wanted.includes(String(t).toLowerCase())));
        if (filtered.length < 10) filtered = pool;

        // Shuffle and take 12
        for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        const questions = filtered.slice(0, 12).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
        return res.json({ ok: true, subject, quiz: { id: `coach-${subject.toLowerCase()}-${Date.now()}`, title: `Coach Smith — ${subject} Check`, questions } });
    } catch (e) {
        console.error('POST /api/coach/:subject/ask failed:', e);
        return res.status(500).json({ ok: false, error: 'ask_failed' });
    }
});

// 1b) GET /api/coach/weekly — consolidated subject summaries for the current week
app.get('/api/coach/weekly', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const weekStart = getCurrentWeekStartISO();
        const d0 = new Date(`${weekStart}T00:00:00Z`);
        const d6 = new Date(d0.getTime() + 6*24*60*60*1000);
        const weekEnd = `${d6.getFullYear()}-${String(d6.getMonth()+1).padStart(2,'0')}-${String(d6.getDate()).padStart(2,'0')}`;

        const SUBJECTS = ['Math', 'Science', 'RLA', 'Social Studies'];
        const subjects = [];

        // Build a consolidated 7-day plan with subject-tagged tasks
        const consolidatedDays = Array.from({ length: 7 }).map((_, i) => ({
            day: i + 1,
            label: `Day ${i + 1}`,
            date: new Date(d0.getTime() + i*24*60*60*1000).toISOString().slice(0,10),
            tasks: []
        }));

        for (const subj of SUBJECTS) {
            const latest = await latestWeeklyPlan(userId, subj);
            const passed = await isSubjectPassed(userId, subj);
            let expectedWeek = 0;
            let summary = '';
            let daysOut = [];
            if (latest && latest.plan_json && Array.isArray(latest.plan_json.days)) {
                expectedWeek = latest.plan_json.days.reduce((acc, d) => acc + (Number(d.minutes) || 0), 0);
                daysOut = latest.plan_json.days || [];
                // Build a short focus summary using top tags from first 3 days
                const f = [];
                latest.plan_json.days.slice(0,3).forEach(d => {
                    (Array.isArray(d.focus) ? d.focus : []).forEach(tag => { const t = String(tag||'').toLowerCase(); if (t && !f.includes(t) && f.length < 4) f.push(t); });
                });
                if (f.length) summary = `Focus: ${f.join(', ')}`;
            }

            // Completed minutes across week in coach_daily_progress
            let completedWeek = 0;
            try {
                const r = await pool.query(
                    `SELECT SUM(completed_minutes) AS total
                       FROM coach_daily_progress
                      WHERE user_id = $1 AND subject = $2 AND plan_date BETWEEN $3 AND $4`,
                    [userId, subj, weekStart, weekEnd]
                );
                completedWeek = Number(r?.rows?.[0]?.total) || 0;
            } catch (_) {}

            // If subject is passed, set maintenance summary and expected minutes modestly
            if (passed) {
                summary = summary || 'Maintenance: Keep skills fresh with brief weekly practice.';
                if (!expectedWeek) expectedWeek = 60; // 15min x 4
            }

            subjects.push({ subject: subj, expected_minutes_week: expectedWeek || 140, completed_minutes_week: completedWeek, summary, days: daysOut });

            // Consolidate tasks per day with subject metadata
            for (let i = 0; i < 7; i++) {
                const dayObj = consolidatedDays[i];
                const srcDay = Array.isArray(daysOut) ? daysOut.find(d => Number(d.day) === (i + 1)) : null;
                if (passed) {
                    // Maintenance guidance task
                    dayObj.tasks.push({
                        id: `${subj.toLowerCase().replace(/\s+/g,'_')}-maint-${i+1}`,
                        subject: subj,
                        subjectLabel: subj,
                        title: 'Maintenance: Light review',
                        type: 'maintenance',
                        minutes: 15,
                        quizId: null,
                        quizPath: null,
                        focus: [],
                        message: 'You\'ve passed this subject. Do a short review to keep skills fresh.'
                    });
                } else if (srcDay) {
                    const focus = Array.isArray(srcDay.focus) ? srcDay.focus : (srcDay.focus ? [srcDay.focus] : []);
                    dayObj.tasks.push({
                        id: `${subj.toLowerCase().replace(/\s+/g,'_')}-${i+1}`,
                        subject: subj,
                        subjectLabel: subj,
                        title: srcDay.label || srcDay.task || srcDay.type || 'Practice',
                        type: srcDay.type || 'practice',
                        minutes: Number(srcDay.minutes) || 20,
                        quizId: srcDay.quizId || null,
                        quizPath: srcDay.quizPath || null,
                        focus,
                        message: srcDay.message || null
                    });
                }
            }
        }

        return res.json({ ok: true, weekStart, weekEnd, subjects, plan: { weekStart, weekEnd, days: consolidatedDays } });
    } catch (e) {
        console.error('GET /api/coach/weekly failed:', e);
        return res.status(500).json({ ok: false, error: 'coach_weekly_failed' });
    }
});

// 1c) POST /api/coach/:subject/daily-composite — build a single-subject composite from premades (optionally filtered by focusTag)
app.post('/api/coach/:subject/daily-composite', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const subject = normalizeSubjectLabel(req.params.subject);
        const { focusTag } = req.body || {};
        const today = todayISO();

        // Throttle to 2/week unless tester email
        let email = (req.user && (req.user.email || req.user.userEmail)) || null;
        if (!email) email = await getUserEmailById(userId);
        const testerByEmail = (String(email || '')).toLowerCase() === 'zacharysmith527@gmail.com';
        const weekStartISO = getCurrentWeekStartISO();
        if (!testerByEmail) {
            const existing = await db.oneOrNone(
                `SELECT used_count FROM coach_advice_usage WHERE user_id = $1 AND week_start_date = $2`,
                [userId, weekStartISO]
            );
            const used = existing?.used_count || 0;
            if (used >= 2) {
                return res.status(429).json({ error: 'You\'ve reached your Ask Coach limit for this week (2/2). Try again next week.' });
            }
        }

        // Build pool and filter by focus tag if present
        let questionPool = getPremadeQuestions(subject, 60);
        if (focusTag) {
            const needle = String(focusTag).toLowerCase();
            questionPool = questionPool.filter(q => Array.isArray(q?.challenge_tags) && q.challenge_tags.map(t => String(t).toLowerCase()).includes(needle));
            if (questionPool.length < 12) {
                // backfill with general pool if too few
                const backfill = getPremadeQuestions(subject, 60).filter(q => !questionPool.includes(q));
                questionPool = questionPool.concat(backfill);
            }
        }

        if (!questionPool.length) return res.status(400).json({ ok: false, error: 'no_questions' });
        // Shuffle
        for (let i = questionPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionPool[i], questionPool[j]] = [questionPool[j], questionPool[i]];
        }
        const questions = questionPool.slice(0, 12).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
        const quizCode = `${COACH_ASSIGNED_BY}:${subject}:${today}:composite`;
        const quiz = { id: quizCode, quizCode, title: 'Coach Daily Composite', type: 'premade-composite', questions, assignedBy: COACH_ASSIGNED_BY };

        // Save to today's daily row
        await findOrCreateDailyRow(userId, subject, today);
        await pool.query(`UPDATE coach_daily_progress SET coach_quiz_id = $4, coach_quiz_completed = FALSE, updated_at = NOW() WHERE user_id = $1 AND subject = $2 AND plan_date = $3`, [userId, subject, today, quizCode]);

        // Record usage (skip for tester email)
        if (!testerByEmail) {
            await db.query(
                `INSERT INTO coach_advice_usage (user_id, week_start_date, used_count, last_used_at)
                 VALUES ($1, $2, 1, now())
                 ON CONFLICT (user_id, week_start_date)
                 DO UPDATE SET used_count = coach_advice_usage.used_count + 1, last_used_at = now()`,
                [userId, weekStartISO]
            );
        }

        return res.json({ ok: true, quiz });
    } catch (e) {
        console.error('POST /api/coach/:subject/daily-composite failed:', e);
        return res.status(500).json({ ok: false, error: 'daily_composite_failed' });
    }
});

// 2) POST /api/coach/complete — add minutes and optionally mark coach quiz done
app.post('/api/coach/complete', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        let { subject, plan_date, activity, minutes } = req.body || {};
        subject = normalizeSubjectLabel(subject);
        const dateISO = (typeof plan_date === 'string' && plan_date.trim()) ? plan_date.trim().slice(0,10) : todayISO();
        const inc = Number(minutes);
        const add = Number.isFinite(inc) ? inc : 0;

        // Ensure row exists
        const row = await findOrCreateDailyRow(userId, subject, dateISO);
        if (!row) return res.status(500).json({ ok: false, error: 'create_daily_failed' });

        const markQuiz = (activity || '').toString().toLowerCase() === 'coach-quiz';
        await pool.query(
            `UPDATE coach_daily_progress
                SET completed_minutes = GREATEST(0, completed_minutes + $4),
                    coach_quiz_completed = CASE WHEN $5 THEN TRUE ELSE coach_quiz_completed END,
                    updated_at = NOW()
              WHERE user_id = $1 AND subject = $2 AND plan_date = $3`,
            [userId, subject, dateISO, add, markQuiz]
        );

        const { rows } = await pool.query(
            `SELECT user_id, subject, plan_date, expected_minutes, completed_minutes, coach_quiz_id, coach_quiz_source_id, coach_quiz_completed, notes
               FROM coach_daily_progress
              WHERE user_id = $1 AND subject = $2 AND plan_date = $3
              LIMIT 1`,
            [userId, subject, dateISO]
        );
        const out = rows && rows[0] ? rows[0] : null;
        return res.json({ ok: true, day: out });
    } catch (e) {
        console.error('POST /api/coach/complete failed:', e);
        return res.status(500).json({ ok: false, error: 'coach_complete_failed' });
    }
});

// 3) POST /api/coach/subject-passed — mark/unmark subject as passed
app.post('/api/coach/subject-passed', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const { subject, passed } = req.body || {};
        const subj = normalizeSubjectLabel(subject);
        if (!subj) return res.status(400).json({ ok: false, error: 'subject_required' });
        const flag = !!passed;
        await pool.query(
            `INSERT INTO user_subject_status (user_id, subject, passed, passed_at, updated_at)
             VALUES ($1, $2, $3, CASE WHEN $3 THEN NOW() ELSE NULL END, NOW())
             ON CONFLICT (user_id, subject)
             DO UPDATE SET passed = EXCLUDED.passed,
                           passed_at = CASE WHEN EXCLUDED.passed THEN NOW() ELSE NULL END,
                           updated_at = NOW()`,
            [userId, subj, flag]
        );
        return res.json({ ok: true, subject: subj, passed: flag });
    } catch (e) {
        console.error('POST /api/coach/subject-passed failed:', e);
        return res.status(500).json({ ok: false, error: 'subject_pass_update_failed' });
    }
});

// Ask Coach advice endpoint with weekly throttle (2/week) and challenge selection requirement
app.post('/api/coach/advice', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user.id;
        let email = (req.user && (req.user.email || req.user.userEmail)) || null;
        if (!email) {
            email = await getUserEmailById(userId);
        }

        const testerByEmail = (String(email || '')).toLowerCase() === 'zacharysmith527@gmail.com';

        // Build profile bundle to inspect selected challenges and test plan
        const bundle = await buildProfileBundle(userId);
        const challengeOptions = Array.isArray(bundle?.challengeOptions) ? bundle.challengeOptions : [];
        const selected = challengeOptions.filter((c) => c && c.selected);

        if (!Array.isArray(selected) || selected.length === 0) {
            return res.status(400).json({ error: 'Pick at least one challenge in your profile so Coach can tailor advice.' });
        }

        // Subject hint is optional; if provided, narrow the selected challenges
        const subjectHintRaw = (req.body && req.body.subject) ? String(req.body.subject) : '';
        const subjectHint = subjectHintRaw
            ? (subjectHintRaw.toLowerCase() === 'rla' ? 'RLA' : (subjectHintRaw.toLowerCase().startsWith('social') ? 'Social Studies' : subjectHintRaw.charAt(0).toUpperCase() + subjectHintRaw.slice(1)))
            : '';

        const bySubject = subjectHint
            ? selected.filter((s) => (s.subject || '').toString() === subjectHint)
            : selected;

        // Throttle: 2 per week per user, unless tester email
        const weekStartISO = getCurrentWeekStartISO();
        if (!testerByEmail) {
            const existing = await db.oneOrNone(
                `SELECT used_count FROM coach_advice_usage WHERE user_id = $1 AND week_start_date = $2`,
                [userId, weekStartISO]
            );
            const used = existing?.used_count || 0;
            if (used >= 2) {
                return res.status(429).json({ error: 'You\'ve reached your Ask Coach limit for this week (2/2). Try again next week.' });
            }
        }

        // Gather test date context for the hinted subject (or nearest upcoming)
        const testPlan = Array.isArray(bundle?.testPlan) ? bundle.testPlan : [];
        let subjectTestDate = '';
        if (subjectHint) {
            const match = testPlan.find((t) => t && t.subject === subjectHint && t.testDate);
            subjectTestDate = match?.testDate || '';
        } else {
            const upcoming = testPlan.find((t) => t && t.testDate);
            subjectTestDate = upcoming?.testDate || '';
        }

        // Compose prompt for AI
        const tagList = bySubject.map((c) => `${c.subject}: ${c.subtopic} — ${c.label}`).slice(0, 10).join('\n- ');
        const subjForPrompt = subjectHint || 'your GED subjects';
        const dateForPrompt = subjectTestDate ? `Target test date: ${subjectTestDate}.` : 'No test date saved yet.';
        const prompt = `You are Coach Smith, a concise GED study coach.
Provide 3-5 specific, encouraging tips tailored to ${subjForPrompt}.
Focus on 45-minute sessions and include one quick practice idea.
Ground your advice in these selected challenges (if present):
- ${tagList || 'No tags selected beyond basics.'}
${dateForPrompt}
Return JSON as { "advice": "<single paragraph or short bullets>" }.`;

        const SCHEMA = { type: 'OBJECT', properties: { advice: { type: 'STRING' } }, required: ['advice'] };

        let adviceText = '';
        try {
            const ai = await callAI(prompt, SCHEMA, { generationOverrides: { temperature: 0.7 } });
            adviceText = (ai && ai.advice) ? String(ai.advice) : '';
        } catch (e) {
            // Fallback to simple templated guidance
            const firstTag = bySubject[0] || selected[0];
            const tagStr = firstTag ? `${firstTag.subject}: ${firstTag.subtopic.toLowerCase()}` : 'your weakest areas';
            adviceText = `Spend 45 minutes today focused on ${tagStr}. Start with 10 minutes reviewing notes, then 25 minutes of practice (2-3 short passages or 8-10 problems), and finish with a 10-minute reflection to write down one mistake pattern and how you\'ll fix it next time.`;
            if (subjectTestDate) {
                adviceText += ` You\'ve saved a test date (${subjectTestDate}) — aim for 3 focused sessions this week.`;
            }
        }

        // Record usage (skip for tester email)
        if (!testerByEmail) {
            await db.query(
                `INSERT INTO coach_advice_usage (user_id, week_start_date, used_count, last_used_at)
                 VALUES ($1, $2, 1, now())
                 ON CONFLICT (user_id, week_start_date)
                 DO UPDATE SET used_count = coach_advice_usage.used_count + 1, last_used_at = now()`,
                [userId, weekStartISO]
            );
        }

        return res.json({ ok: true, advice: adviceText, weekStart: weekStartISO });
    } catch (e) {
        console.error('POST /api/coach/advice failed:', e?.message || e);
        return res.status(500).json({ error: 'Unable to fetch advice right now.' });
    }
});

// Resolve a suggestion: accept or reject
app.post('/api/challenges/resolve', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Not authenticated' });
        const { suggestion_id, action } = req.body || {};
        if (!suggestion_id) return res.status(400).json({ error: 'suggestion_id_required' });
        const srow = await db.oneOrNone(`SELECT id, user_id, challenge_tag, suggestion_type FROM user_challenge_suggestions WHERE id = $1 AND user_id = $2`, [suggestion_id, userId]);
        if (!srow) return res.status(404).json({ error: 'not_found' });

        const act = (action || '').toString().toLowerCase();
        const now = new Date();

        if (act === 'accept') {
            if (srow.suggestion_type === 'add') {
                // Ensure tag present in catalog with basic label if missing
                try {
                    const tag = srow.challenge_tag;
                    const subjKey = tag.split(':')[0] || '';
                    const subjectMap = { math: 'Math', science: 'Science', rla: 'RLA', 'social': 'Social Studies', 'social-studies': 'Social Studies' };
                    const subject = subjectMap[subjKey] || null;
                    const pretty = tag.replace(/[:_-]/g, ' ');
                    await pool.query(`INSERT INTO challenge_tag_catalog (challenge_tag, subject, label) VALUES ($1, $2, $3) ON CONFLICT (challenge_tag) DO NOTHING`, [tag, subject, pretty]);
                } catch (_) {}
                // Add to user's active list via selectionTable, using tag as challenge_id
                try {
                    const { selectionTable } = await getChallengeTables();
                    await db.query(`INSERT INTO ${selectionTable} (user_id, challenge_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [userId, srow.challenge_tag]);
                } catch (e) { console.warn('[resolve] add selection failed', e?.message || e); }
            } else if (srow.suggestion_type === 'remove') {
                try {
                    const { selectionTable } = await getChallengeTables();
                    await db.query(`DELETE FROM ${selectionTable} WHERE user_id = $1 AND challenge_id = $2`, [userId, srow.challenge_tag]);
                } catch (e) { console.warn('[resolve] remove selection failed', e?.message || e); }
            }
            await pool.query(`UPDATE user_challenge_suggestions SET resolved_at = $2 WHERE id = $1`, [srow.id, now]);
            return res.json({ ok: true, resolved: true });
        } else if (act === 'reject') {
            await pool.query(`UPDATE user_challenge_suggestions SET resolved_at = $2 WHERE id = $1`, [srow.id, now]);
            return res.json({ ok: true, resolved: true });
        }
        return res.status(400).json({ error: 'invalid_action' });
    } catch (e) {
        console.error('POST /api/challenges/resolve failed:', e);
        return res.status(500).json({ error: 'failed_to_resolve' });
    }
});

// Admin seed endpoint: create/populate the challenge catalog table from the fallback list
app.post('/api/admin/challenges/seed', devAuth, requireAuthInProd, requireSuperAdmin, async (_req, res) => {
    try {
        const { optionTable } = await getChallengeTables();
        // Ensure table exists with a minimal schema compatible with our reads
        try {
            await db.query(`
                CREATE TABLE IF NOT EXISTS ${optionTable} (
                    id TEXT PRIMARY KEY,
                    subject TEXT NOT NULL,
                    subtopic TEXT NOT NULL,
                    label TEXT NOT NULL
                )`);
        } catch (e) {
            console.warn(`[seed] create table ${optionTable} skipped/failed:`, e?.message || e);
        }

        let inserted = 0;
        for (const item of FALLBACK_PROFILE_CHALLENGES) {
            try {
                await db.query(
                    `INSERT INTO ${optionTable} (id, subject, subtopic, label)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (id) DO NOTHING`,
                    [String(item.id), item.subject || item.subject_alias || 'Unknown', item.subtopic, item.label]
                );
                inserted++;
            } catch (e) {
                console.warn('[seed] insert failed for', item.id, e?.message || e);
            }
        }
        return res.json({ ok: true, table: optionTable, attempted: FALLBACK_PROFILE_CHALLENGES.length, inserted });
    } catch (err) {
        console.error('[/api/admin/challenges/seed] ERROR:', err);
        return res.status(500).json({ ok: false, error: 'seed_failed', details: err?.message || String(err) });
    }
});

app.patch('/api/profile/name', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    console.log('[/api/profile/name] req.user =', req.user);
    console.log('[/api/profile/name] req.body =', req.body);

    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!isProfileAllowlistedPath(req.path) && !(await assertUserIsActive(userId))) {
        return res.status(403).json({ error: 'user_not_active' });
    }
    const { name } = req.body || {};
    const trimmed = typeof name === 'string' ? name.trim() : String(name || '').trim();

    if (!trimmed) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        await db.query(
            'INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
            [userId]
        );

        const hasNameColumn = await profilesHasNameColumn();
        if (hasNameColumn) {
            try {
                await db.query(
                    `INSERT INTO profiles (user_id, name)
                     VALUES ($1, $2)
                     ON CONFLICT (user_id)
                     DO UPDATE SET name = EXCLUDED.name`,
                    [userId, trimmed]
                );
            } catch (err) {
                if (err?.code !== '42703' && err?.code !== '42P01') {
                    throw err;
                }
            }
        }

        try {
            await db.query('UPDATE users SET name = $2 WHERE id = $1', [userId, trimmed]);
        } catch (err) {
            console.warn('Unable to sync name into users table', err?.message || err);
        }

        return res.json({ name: trimmed });
    } catch (err) {
        console.error('[/api/profile/name] ERROR:', err);
        return res.status(500).json({ error: 'Unable to save name' });
    }
});

// Shared handler for saving a single subject test plan row
async function handleSaveTestPlan(req, res) {
    console.log('[/api/profile/test] req.user =', req.user);
    console.log('[/api/profile/test] req.body =', req.body);
    console.log('[/api/profile/test] HIT');

    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
        return res.status(401).json({ ok: false, error: 'Not authenticated' });
    }

    if (!isProfileAllowlistedPath(req.path) && !(await assertUserIsActive(userId))) {
        return res.status(403).json({ ok: false, error: 'user_not_active' });
    }
    const { subject, testDate, testLocation, passed, notScheduled } = req.body || {};
    const subj = typeof subject === 'string' ? subject.trim() : '';

    console.log('[/api/profile/test] parsed payload:', {
        subject: subj,
        testDate,
        testLocation,
        passed,
    });

    if (!subj) {
        return res.status(400).json({ ok: false, error: 'Subject is required' });
    }

    let normalizedDate = null;
    if (typeof testDate === 'string') {
        const trimmedDate = testDate.trim();
        // Prefer ISO with dashes; normalize any slashes to dashes
        const dashed = trimmedDate.replace(/\//g, '-');
        normalizedDate = dashed || null;
    } else if (testDate instanceof Date) {
        normalizedDate = testDate.toISOString().slice(0, 10);
    } else if (testDate !== undefined && testDate !== null) {
        const coerced = String(testDate).trim();
        normalizedDate = coerced ? coerced : null;
    }

    const normalizedNotScheduled = !!notScheduled;
    if (normalizedNotScheduled) {
        // If the user marks not scheduled, clear date and passed
        normalizedDate = null;
    }

    let normalizedLocation = null;
    if (typeof testLocation === 'string') {
        const trimmedLocation = testLocation.trim();
        normalizedLocation = trimmedLocation ? trimmedLocation : null;
    } else if (testLocation !== undefined && testLocation !== null) {
        const coerced = String(testLocation).trim();
        normalizedLocation = coerced ? coerced : null;
    }

    try {
        // Ensure a profile row exists for this user (onboarding-safe)
        await db.query(
            'INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
            [userId]
        );
        const tableName = await getTestPlanTableName();
        const saved = await db.query(
            `INSERT INTO ${tableName} (user_id, subject, test_date, test_location, passed, not_scheduled, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             ON CONFLICT (user_id, subject)
             DO UPDATE SET
               test_date = EXCLUDED.test_date,
               test_location = EXCLUDED.test_location,
               passed = EXCLUDED.passed,
               not_scheduled = EXCLUDED.not_scheduled,
               updated_at = NOW()
             RETURNING user_id, subject, test_date, test_location, passed, not_scheduled`,
            [
                userId,
                subj,
                normalizedDate,
                normalizedLocation,
                !!passed && !normalizedNotScheduled,
                normalizedNotScheduled
            ]
        );

        const savedRow = saved?.rows?.[0] || null;
        if (savedRow) {
            const savedShape = {
                subject: savedRow.subject,
                testDate: normalizeTestDate(savedRow.test_date),
                testLocation: savedRow.test_location || '',
                passed: !!savedRow.passed,
                notScheduled: !!savedRow.not_scheduled
            };
            console.log('[profile/test] saved =>', savedShape);
        }

        const bundle = await buildProfileBundle(userId);
        console.log('[/api/profile/test] SUCCESS for subject:', subj);

        return res.json({
            ok: true,
            success: true,
            message: 'Saved test info.',
            test: (saved?.rows?.[0]
                ? {
                    subject: saved.rows[0].subject,
                    testDate: normalizeTestDate(saved.rows[0].test_date),
                    testLocation: saved.rows[0].test_location || '',
                    passed: !!saved.rows[0].passed,
                    notScheduled: !!saved.rows[0].not_scheduled
                  }
                : null),
            // Spread the bundle at top-level to preserve FE expectations
            ...bundle,
        });
    } catch (err) {
        console.error('[/api/profile/test] ERROR:', err);

        return res.status(500).json({
            ok: false,
            error: 'Server failed to save test info.',
            details: err?.message || String(err),
        });
    }
}

app.patch('/api/profile/test', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), handleSaveTestPlan);
// Accept legacy/alternate route as POST
app.post('/api/profile/tests', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), handleSaveTestPlan);

app.patch('/api/profile/challenges/tags', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, express.json(), async (req, res) => {
    console.log('[/api/profile/challenges/tags] req.user =', req.user);
    console.log('[/api/profile/challenges/tags] req.body =', req.body);

    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!isProfileAllowlistedPath(req.path) && !(await assertUserIsActive(userId))) {
        return res.status(403).json({ error: 'user_not_active' });
    }
    const { selectedIds } = req.body || {};
    const ids = Array.isArray(selectedIds) ? selectedIds.map((id) => String(id)) : [];

    try {
        const { selectionTable } = await getChallengeTables();

        await db.query(`DELETE FROM ${selectionTable} WHERE user_id = $1`, [userId]);

        for (const id of ids) {
            await db.query(
                `INSERT INTO ${selectionTable} (user_id, challenge_id)
                 VALUES ($1, $2)
                 ON CONFLICT DO NOTHING`,
                [userId, id]
            );
        }

        const bundle = await buildProfileBundle(userId);
        return res.json(bundle);
    } catch (err) {
        console.error('[/api/profile/challenges/tags] ERROR:', err);
        return res.status(500).json({
            ok: false,
            error: 'Unable to save challenges',
            details: err?.message || err,
        });
    }
});

app.post('/api/profile/complete-onboarding', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, async (req, res) => {
    console.log('[/api/profile/complete-onboarding] req.user =', req.user);

    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
        return res.status(401).json({ ok: false, error: 'Not authenticated' });
    }

    if (!(await assertUserIsActive(userId))) {
        return res.status(403).json({ ok: false, error: 'user_not_active' });
    }

    try {
        const bundle = await buildProfileBundle(userId);

        const hasName = typeof bundle?.profile?.name === 'string'
            ? bundle.profile.name.trim() !== ''
            : false;

        const hasAnyTestProgress = Array.isArray(bundle?.testPlan)
            ? bundle.testPlan.some((row) => row && (row.passed || (row.testDate && String(row.testDate).trim() !== '')))
            : false;

        const hasChallenges = Array.isArray(bundle?.challengeOptions)
            ? bundle.challengeOptions.some((opt) => opt && opt.selected)
            : false;

        const ok = hasName && hasAnyTestProgress && hasChallenges;

        if (ok) {
            await db.query(
                `INSERT INTO profiles (user_id, onboarding_complete)
                 VALUES ($1, TRUE)
                 ON CONFLICT (user_id)
                 DO UPDATE SET onboarding_complete = TRUE`,
                [userId]
            );
        }

        return res.json({ ok });
    } catch (err) {
        console.error('[/api/profile/complete-onboarding] ERROR:', err);
        return res.status(500).json({
            ok: false,
            error: 'Unable to complete onboarding',
            details: err?.message || err,
        });
    }
});

app.use('/api/profile', devAuth, ensureTestUserForNow, requireAuthInProd, authRequired, profileRouter);

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
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
            [normalizedEmail, passwordHash]
        );

        const user = formatUserRow(result.rows[0]);
        const token = await createUserToken(user.id);
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
            'SELECT id, email, password_hash, created_at FROM users WHERE email = $1',
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

        const user = formatUserRow(userRow);
        const token = await createUserToken(user.id);
        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Login failed:', error);
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

app.get('/client-config.js', (req, res) => {
    // Compute external origin (Render forwards proto)
    const xfProto = (req.headers['x-forwarded-proto'] || '').toString().split(',')[0].trim();
    const proto = xfProto || req.protocol || 'https';
    const host = req.get('host');
    const origin = `${proto}://${host}`;

    const js = `
        // Merge app config flags
        (function(){
            try {
                window.__APP_CONFIG__ = window.__APP_CONFIG__ || {};
                window.__APP_CONFIG__.geometryFiguresEnabled = ${GEOMETRY_FIGURES_ENABLED};
            } catch (e) {}
            try {
                var cfg = (typeof window.__CLIENT_CONFIG__ === 'object' && window.__CLIENT_CONFIG__) ? window.__CLIENT_CONFIG__ : {};
                cfg.API_BASE_URL = cfg.API_BASE_URL || ${JSON.stringify(origin)};
                window.__CLIENT_CONFIG__ = cfg;
            } catch (e) {}
        })();
    `;
    res.type('application/javascript').send(js);
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
    if (subject === 'Social Studies') {
        return [
            `https://www.britannica.com/search?query=${encodeURIComponent(topic)}`,
            `https://www.loc.gov/search/?q=${encodeURIComponent(topic)}&all=true`,
            `https://www.archives.gov/search?query=${encodeURIComponent(topic)}`,
            `https://www.presidency.ucsb.edu/documents?field-keywords=${encodeURIComponent(topic)}`
        ];
    }
    if (subject === 'Science') {
        const seeds = [
            `https://www.nasa.gov/search/?q=${encodeURIComponent(topic)}`,
            `https://www.noaa.gov/search?s=${encodeURIComponent(topic)}`,
            `https://oceanservice.noaa.gov/search.html?q=${encodeURIComponent(topic)}`
        ];
        if (/climate|weather|atmosphere|carbon|warming/i.test(topic)) {
            seeds.splice(1, 0, 'https://climate.nasa.gov/');
        }
        return seeds;
    }
    if (subject === 'Reasoning Through Language Arts (RLA)' || subject === 'RLA') {
        return [
            `https://www.britannica.com/search?query=${encodeURIComponent(topic)}`,
            `https://www.loc.gov/search/?q=${encodeURIComponent(topic)}&all=true`
        ];
    }
    return [];
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

// Build an APPROVED PASSAGES section by fetching a few allowlisted sources for the subject/topic
async function buildApprovedPassagesSection(subject, topic) {
    try {
        const seeds = pickCandidateUrls(subject, topic);
        const results = [];
        for (const url of seeds) {
            try {
                const page = await fetchApproved(url);
                results.push({
                    url: page.url,
                    title: page.title,
                    text: compactText(page.text, 320),
                    table: Array.isArray(page.tables) && page.tables.length ? page.tables[0] : null
                });
                if (results.length >= 3) break;
            } catch (_) {
                // skip failed URL
            }
        }

        if (!results.length) return '';
        return `APPROVED PASSAGES (use these first, do not fabricate sources):\n${JSON.stringify(results, null, 2)}\n`;
    } catch (e) {
        return '';
    }
}

// Allowed question types across subjects (non-Math)
const ALLOWED_QUESTION_TYPES = new Set([
    'multiple_choice_single',
    'multiple_select',
    'drag_drop_ordering',
    'short_constructed_response'
]);

// Unified prompt builder per subject and exam type
function buildSubjectPrompt({ subject, topic, examType, context = [], images = [], questionCount = 12, approvedPassagesSection = '' }) {
    const isComprehensive = examType === 'comprehensive';

    const contextJSON = JSON.stringify(context.map(c => ({ url: c.url, title: c.title, text: c.text, table: c.table || null })));
    const imagesJSON = JSON.stringify((images || []).map((im, i) => ({ id: im.id || `img${i+1}`, src: im.filePath, alt: im.altText || '', description: im.detailedDescription || '' })));

    const sharedSafety = [
        'When constructing a passage or stimulus, FIRST try to use / adapt from the APPROVED PASSAGES section above. If no approved passage matches, write an original passage and label it clearly.',
        'Do not attribute passages to real news outlets or paywalled sites unless they are listed above in APPROVED PASSAGES.'
    ].join('\n');

    const questionTypesBlock = `QUESTION TYPES ALLOWED (choose appropriately):\n- multiple_choice_single\n- multiple_select (2 correct; MUST specify number of correct choices)\n- drag_drop_ordering (only if clearly described)\n- short_constructed_response (1–2 sentences, only when the stimulus clearly requires it)`;

    const majorityStimulusRule = 'A majority (at least 60%) of questions must use a proper stimulus (passage, chart, table, quote, diagram, or image reference). A question with no stimulus is allowed only when the skill being tested is simple (e.g., grammar fix, vocabulary in context, or a straightforward recall from the topic).';

    const schemaReminder = `Return ONE compact JSON array. Each item MUST have:\n- "questionText"\n- "options" (array) for choice questions\n- "correctAnswer" OR "correctAnswers"\n- "questionType" (must be one of the allowed types above)\n- "stimulus" or "passage" or "asset" when the question uses a stimulus\n- "subject": ${JSON.stringify(subject)}\n- "topic": ${JSON.stringify(topic)}`;

    let header = `${STRICT_JSON_HEADER_SHARED}\n`;
    if (approvedPassagesSection) {
        header += `${approvedPassagesSection}\n`;
    }

    const base = [
        header,
        `SUBJECT STYLE: GED ${subject} — ${isComprehensive ? 'Comprehensive Exam' : `Topic Quiz on "${topic}"`}`,
        `Use only the CONTEXT and IMAGES provided (if any) for factual details. Do not fabricate specific data.`,
        questionTypesBlock,
        majorityStimulusRule,
        sharedSafety
    ];

    if (isComprehensive) {
        if (subject === 'Social Studies') {
            base.push(
                `STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 50% Civics & Government, 20% U.S. History, 15% Economics, 15% Geography & the World.`,
                `Ensure variety of stimuli: passages, historical quotes, charts/graphs, and images when appropriate.`
            );
        } else if (subject === 'Science') {
            base.push(
                `STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 40% Life Science, 40% Physical Science, 20% Earth & Space.`,
                `Ensure variety of stimuli: passages, data tables/graphs, and diagrams.`,
                `Ensure that at least one-third (1/3) of all questions require scientific numeracy — interpreting data tables, reading charts, working with units/measurements, using or reading formulas, or doing a short calculation.`
            );
        } else if (isRlaSubject(subject)) {
            base.push(`RLA comprehensive: keep the existing 3-part flow as-is (reading comprehension, extended response prompt, and language/grammar).`);
        }
    } else {
        if (subject === 'Social Studies') {
            base.push(
                `This is a TOPIC-FOCUSED quiz. Stay strictly on "${topic}" or its immediate historical/civic context. Do NOT apply or rebalance to comprehensive percentages (e.g., 50/20/15/15).`,
                `Generate ${questionCount} GED-style Social Studies questions focused entirely on the topic "${topic}" (e.g., Constitution, founding documents, branches of government, key amendments). Do not introduce unrelated economics or geography content unless it is clearly and explicitly tied to the topic.`,
                `Prefer primary-source style stimuli: speeches, letters, founding-era documents, short legal excerpts, and historically grounded encyclopedia entries (use approved sources when possible).`,
                `Keep the variety of stimuli, but tie all stimuli directly to the topic.`
            );
        } else if (subject === 'Science') {
            base.push(
                `Generate ${questionCount} GED-style Science questions focused entirely on the topic "${topic}". Do not mix in Life/Earth/Space strands that are unrelated to the topic. Prefer data-driven science questions (tables, charts, labeled diagrams) that match this topic.`,
                `Keep the variety of stimuli, and prefer data tables/graphs and short experiment setups tied to the topic.`
            );
        } else if (isRlaSubject(subject)) {
            base.push(
                `Generate ${questionCount} GED-style RLA questions focused on the skill area "${topic}" (for example, Grammar, Usage, Conventions, Reading Comprehension, or Vocabulary). Do not enforce the 75% informational / 25% literary split here unless the topic explicitly asks for it.`,
                `Keep a variety of stimuli appropriate for the skill, and prefer short passages for reading items.`
            );
        }
        base.push(
            `Prioritize attaching a stimulus to the question. For Social Studies, prefer historical quotes, short excerpts from founding documents, charts on population/voting, or image descriptions from the approved list. For Science, prefer data tables, experiment setups, labeled diagrams. For RLA, prefer short passages.`
        );
    }

    base.push(
        `CONTEXT:${contextJSON}`,
        `IMAGES:${imagesJSON}`,
        `Return ONE compact JSON array with exactly ${questionCount} items.`,
        schemaReminder
    );

    return base.join('\n');
}

function hasStimulus(item) {
    return Boolean(
        (typeof item?.stimulus === 'string' && item.stimulus.trim()) ||
        (typeof item?.passage === 'string' && item.passage.trim()) ||
        (item && typeof item.asset === 'object' && item.asset !== null) ||
        (item && item.stimulusImage && typeof item.stimulusImage.src === 'string')
    );
}

// Drop items without allowed questionType; warn if insufficient stimulus usage
function validateAndFilterAiItems(items, subject, topic) {
    if (!Array.isArray(items)) return [];
    const filtered = items.filter((it) => {
        const qt = typeof it?.questionType === 'string' ? it.questionType : '';
        return ALLOWED_QUESTION_TYPES.has(qt);
    }).map((it) => ({
        ...it,
        subject: subject,
        topic: topic
    }));

    const withStim = filtered.filter((it) => hasStimulus(it)).length;
    const ratio = filtered.length ? (withStim / filtered.length) : 0;
    if (ratio < 0.6) {
        try { console.warn('[AI][QUIZ] insufficient stimulus-bearing questions for topic', subject, topic); } catch {}
    }
    return filtered;
}

// START: New Helper Functions for Variety Pack Generation

function buildTopicPrompt_VarietyPack(subject, topic, n = 12, ctx = [], imgs = []) {
    const contextJSON = JSON.stringify(ctx.map(c => ({
        url: c.url, title: c.title, text: c.text, table: c.table || null
    })));

    const imagesJSON = JSON.stringify((imgs || []).map((im, i) => ({
        id: im.id || `img${i+1}`, src: im.filePath, alt: im.altText || '', description: im.detailedDescription || ''
    })));

    const canonicalSubject = isRlaSubject(subject) ? RLA_SUBJECT_LABEL : subject;
    const skillDescription = (SMITH_A_SKILL_MAP[subject] || SMITH_A_SKILL_MAP[canonicalSubject])?.[topic];
    const skillFocusLine = skillDescription ? `Skill focus: ${skillDescription}\n` : '';
    const isScientificNumeracy = subject === 'Science' && /scientific\s+numeracy/i.test(topic);

    let MIX_RULES;
    if (isScientificNumeracy) {
        MIX_RULES = `
${skillFocusLine}Mix (exactly ${n} items):
- Generate exactly ${n} standalone GED Science numeracy questions grounded in short lab-style setups, tables, or simple graphs.
- Keep each context concise (no more than 2–3 sentences) or provide a small HTML <table>. Avoid long reading passages or argumentative analysis.
- Focus on calculations like density = mass ÷ volume, average speed = distance ÷ time, unit rate/proportion, force = mass × acceleration, work = force × distance, or interpreting conservation of mass data.
- Every item MUST include "qaProfileKey": "numeracy", provide exactly four answer choices, and clearly mark the correct option.
- Encourage use of the Science Formula Sheet when relevant.
- Absolutely do NOT request or rely on external images beyond the data you embed.

Difficulty distribution (approximate): 4 easy, 5 medium, 3 hard. Include a "difficulty" field for each item.

Variety rules:
- Rotate scenarios (rates, density, lab measurements, household budgets, etc.).
- When using tables, keep them small (≤4 rows) and directly tied to the required computation.
`;
    } else if (subject === 'Math') {
        MIX_RULES = `
${skillFocusLine}Mix (exactly ${n} items):
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

${FRACTION_PLAIN_TEXT_RULE}

Formatting notes:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- Use clear inline notation for exponents, radicals, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge).
`;
    } else {
        MIX_RULES = `
${skillFocusLine}Mix (exactly ${n} items):
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
- number operations, fractions/decimals/percents, ratios/proportions, linear equations/inequalities, functions/graphs (described in text), geometry/measurement, data & probability. Fractions must use slash notation (e.g., 3/4, (2x+1)/3). Keep notation inline and avoid $$ display math. CRITICAL FORMATTING RULE: Do NOT wrap single variables or simple numbers in dollar signs. Write expressions like 5x + 3 = 10. Avoid incorrect forms like 5$x$ + 3 = 10.`,
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
        topic: (topic) => `You are a GED Math exam creator. Maintain precise, readable notation for every problem.

${FRACTION_PLAIN_TEXT_RULE}

Additional formatting rules:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- You may use KaTeX-friendly commands for exponents, roots, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge) but keep them inline and readable.
- Currency: Always use a literal dollar sign before the number, like '$50.25'. NEVER wrap currency in math delimiters such as '$$50.25$'. Do not use '$...$' for currency; write $30 or 30 dollars, never place the dollar sign after the number, and never wrap currency in LaTeX.
- Answer options: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency answers, use a single dollar sign like $10.50.
- CRITICAL FORMATTING RULE: Do NOT wrap single variables or simple numbers in dollar signs. Write expressions like 5x + 3 = 10. Avoid incorrect forms like 5$x$ + 3 = 10.

With those rules in mind, generate a 15-question GED-style Math quiz focused on "${topic}".
STRICT CONTENT REQUIREMENTS: The questions must be approximately 45% Quantitative Problems and 55% Algebraic Problems.`,
        comprehensive: `Generate a 46-question comprehensive GED Mathematical Reasoning exam.
${FRACTION_PLAIN_TEXT_RULE}

Additional formatting rules:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- You may use KaTeX-friendly commands for exponents, roots, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge) but keep them inline and readable.
- CRITICAL RULE FOR CURRENCY: Always use a literal dollar sign before the number, like '$50.25'. NEVER wrap currency in math delimiters such as '$$50.25$'. Do not use '$...$' for currency; write $30 or 30 dollars, never place the dollar sign after the number, and never wrap currency in LaTeX.
- CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
- CRITICAL FORMATTING RULE: Do NOT wrap single variables or simple numbers in dollar signs. Write expressions like 5x + 3 = 10. Avoid incorrect forms like 5$x$ + 3 = 10.
- Include word problems and questions based on data charts.

STRICT CONTENT REQUIREMENTS: The quiz must be EXACTLY 45% Quantitative Problems and 55% Algebraic Problems.`
    }
};

promptLibrary[RLA_SUBJECT_ALIAS] = promptLibrary[RLA_SUBJECT_LABEL];

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

    if (!subject || !SMITH_A_ALLOWED_SUBJECTS.has(subject)) {
        return res.status(400).json({ success: false, error: 'Invalid subject' });
    }
    if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ success: false, error: 'Missing or invalid topic' });
    }

    const isScientificNumeracy = subject === 'Science' && /scientific\s+numeracy/i.test(topic);

    try {
        console.log(`[Variety Pack] Starting generation for Subject: ${subject}, Topic: ${topic}`);

        // 1. Retrieve web context for relevant subjects
        let subjectNeedsRetrieval = ['Science', 'Social Studies', 'RLA', 'Reasoning Through Language Arts (RLA)'].includes(subject);
        if (isScientificNumeracy) {
            subjectNeedsRetrieval = false;
        }
        const ctx = subjectNeedsRetrieval ? await retrieveSnippets(subject, topic) : [];
        console.log(`[Variety Pack] Retrieved ${ctx.length} context snippets.`);

        // 2. Find relevant images for Science and Social Studies only
        let subjectNeedsImages = ['Science', 'Social Studies'].includes(subject);
        if (isScientificNumeracy) {
            subjectNeedsImages = false;
        }
        const imgs = subjectNeedsImages ? findImagesForSubjectTopic(subject, topic, 6) : [];
        console.log(`[Variety Pack] Found ${imgs.length} candidate images.`);

        // 3. Build the topic prompt (new behavior for non-Math) with approved passages section
        let winnerModel = 'unknown';
        let latencyMs = 0;
        let generatedItems = [];

        if (subject === 'Math' || isScientificNumeracy) {
            // Preserve existing Math and scientific numeracy flow
            const prompt = buildTopicPrompt_VarietyPack(subject, topic, QUIZ_COUNT, ctx, imgs);
            const result = await generateWithGemini_OneCall(subject, prompt)
                .then(items => ({ items, model: 'gemini', latencyMs: 0 }))
                .catch(async (geminiErr) => {
                    console.warn(`[Variety Pack] Gemini call failed: ${geminiErr.message}. Attempting ChatGPT fallback.`);
                    const items = await generateWithChatGPT_Fallback(subject, prompt);
                    return { items, model: 'chatgpt-fallback', latencyMs: 0 };
                });
            generatedItems = result.items;
            winnerModel = result.model;
            latencyMs = result.latencyMs || 0;
        } else {
            const approvedSection = await buildApprovedPassagesSection(subject, topic);
            const prompt = buildSubjectPrompt({
                subject,
                topic,
                examType: 'topic',
                context: ctx,
                images: imgs,
                questionCount: QUIZ_COUNT,
                approvedPassagesSection: approvedSection
            });

            const result = await generateQuizItemsWithFallback(
                subject,
                prompt,
                { retries: 1 },
                { retries: 1 }
            );
            generatedItems = Array.isArray(result.items) ? result.items : [];
            winnerModel = result.model || 'unknown';
            latencyMs = result.latencyMs || 0;
        }

        console.log(`[TopicGen] Received ${generatedItems.length} items from AI model: ${winnerModel}.`);

        // 4. Post-processing and validation
        let items = generatedItems.map((it) => enforceWordCapsOnItem(it, subject));
        items = items.map(tagMissingItemType).map(tagMissingDifficulty);

        const bad = [];
        items.forEach((it, i) => { if (hasSchemaIssues(it)) bad.push(i); });
        if (bad.length) {
            console.log(`[TopicGen] Repairing ${bad.length} items with schema issues...`);
            const toFix = bad.map(i => items[i]);
            const fixedSubset = await repairBatchWithChatGPT_once(toFix);
            if (Array.isArray(fixedSubset)) {
                fixedSubset.forEach((f, j) => {
                    const originalIndex = bad[j];
                    items[originalIndex] = enforceWordCapsOnItem(f, subject);
                });
                items = items.map(tagMissingItemType).map(tagMissingDifficulty);
            }
        }

        // 5. If non-Math, enforce new validator rules (questionType + stimulus ratio)
        if (subject !== 'Math' && !isScientificNumeracy) {
            items = validateAndFilterAiItems(items, subject, topic);
        }

        // 6. Final cleanup and response
        items = dedupeNearDuplicates(items, 0.85);
        items = groupedShuffle(items);

        let finalItems = items.slice(0, QUIZ_COUNT).map((item, idx) => ({ ...normalizeStimulusAndSource(item), questionNumber: idx + 1 }));
        const fractionPlainTextMode = subject === 'Math';
        if (fractionPlainTextMode) {
            finalItems = finalItems.map(applyFractionPlainTextModeToItem);
        }

        console.log(`[TopicGen] Successfully generated and processed ${finalItems.length} questions.`);

        res.set('X-Model', winnerModel || 'unknown');
        res.set('X-Model-Latency-Ms', String(latencyMs ?? 0));
        res.json({
            success: true,
            subject,
            topic,
            items: finalItems,
            model: winnerModel || 'unknown',
            latencyMs: latencyMs ?? 0,
            source: 'aiGenerated',
            fraction_plain_text_mode: fractionPlainTextMode
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
        const fractionPlainTextMode = true;
        res.json({
            items,
            source: 'aiGenerated',
            fraction_plain_text_mode: fractionPlainTextMode
        });
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
${FRACTION_PLAIN_TEXT_RULE}

Formatting notes:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- Use clear inline notation for exponents, radicals, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge).
- CRITICAL RULE FOR CURRENCY: Always use a literal dollar sign before the number, like '$50.25'. NEVER wrap currency in math delimiters such as '$$50.25$'. Do not use '$...$' for currency; write $30 or 30 dollars, never place the dollar sign after the number, and never wrap currency in LaTeX.
- CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
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
    if (subject === 'Math') {
        applyFractionPlainTextModeToItem(question);
    }
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

${FRACTION_PLAIN_TEXT_RULE}

Formatting notes:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- Use clear inline notation for exponents, radicals, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge).

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
    IMPORTANT: Keep mathematical expressions clear and inline.
${FRACTION_PLAIN_TEXT_RULE}
    Use KaTeX-friendly notation for exponents, roots, and symbols (e.g., x^2, \sqrt{9}, \le, \ge) when needed, but do not wrap expressions in $, $$, \(, or \[.
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

        // Attach geometrySpec explicitly (null when absent) and a clear flag
        questionPayload.geometrySpec = GEOMETRY_FIGURES_ENABLED && geometrySpec ? geometrySpec : null;
        questionPayload.useGeometryTool = Boolean(questionPayload.geometrySpec);

        applyFractionPlainTextModeToItem(questionPayload);
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
${FRACTION_PLAIN_TEXT_RULE}

Formatting notes:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- Use clear inline notation for exponents, radicals, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge).
- CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
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
    applyFractionPlainTextModeToItem(question);
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
${FRACTION_PLAIN_TEXT_RULE}

Formatting notes:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- Use clear inline notation for exponents, radicals, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge).
- CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
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
    applyFractionPlainTextModeToItem(question);
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
${FRACTION_PLAIN_TEXT_RULE}

Formatting notes:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- Use clear inline notation for exponents, radicals, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge).
- CRITICAL RULE FOR ANSWERS: For all answer options, provide ONLY the numerical value or expression. Do NOT prefix answers with $$. For currency, use a single dollar sign like $10.50.
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
    applyFractionPlainTextModeToItem(question);
    question.type = 'standalone';
    question.calculator = true;
    // Provide a minimal graph spec so the canvas has data to draw
    if (!question.graphSpec) {
        question.graphSpec = {
            type: 'line',
            points: [
                { x: 0, y: 10 },
                { x: 10, y: 5 }
            ],
            xLabel: 'x',
            yLabel: 'y'
        };
    }
    // Flag for the tool panel
    question.useGraphTool = Boolean(question.graphSpec);
    return enforceWordCapsOnItem(question, 'Math');
}

// Extra helper to auto-flag obvious graph items if used elsewhere
function autoMarkGraph(questionText, item) {
    try {
        const t = String(questionText || '').toLowerCase();
        if (t.includes('the graph below') || t.includes('coordinate plane') || t.includes('linearly ')) {
            item.useGraphTool = true;
        }
    } catch {}
}

async function generateMath_FillInTheBlank(options = {}) {
    const prompt = `You are a GED Math exam creator. Your single most important task is to ensure all mathematical notation is precise and readable.
${FRACTION_PLAIN_TEXT_RULE}

With those rules in mind, generate a single, high-quality, GED-style math question (from any topic area) that requires a single numerical or simple fractional answer (e.g., 25, -10, 5/8).
CRITICAL: The question MUST NOT have multiple-choice options. The answer should be a number that the user would type into a box.
Formatting notes:
- Do not wrap mathematical expressions in $, $$, \(:, or \[.
- Use clear inline notation for exponents, radicals, and symbols (e.g., x^2, \\sqrt{9}, \\le, \\ge).
- CRITICAL RULE FOR ANSWERS: Provide the exact numerical or fractional answer using plain text slash notation when needed. For currency, use a single dollar sign like $10.50.
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
    applyFractionPlainTextModeToItem(question);
    question.calculator = true; // Most fill-in-the-blank will be calculator-permitted
    return enforceWordCapsOnItem(question, 'Math');
}

async function generateRlaPart1(options = {}) {
    const prompt = `${STRICT_JSON_HEADER_RLA}
Create the Reading Comprehension section of a GED RLA exam.
Produce exactly 4 passages:
- 3 informational / nonfiction passages (science/society/history topics are fine),
- 1 literary passage that may be EITHER narrative fiction OR a short poem, but keep it 150–230 words.
Use concise titles in <strong> tags and <p> tags for paragraphs. Each passage must be 150-230 words and NEVER above 250 words.
For EACH passage, generate exactly 5 reading comprehension questions (total 20).
Return the JSON array of question objects only.`;
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
    const prompt = `Generate one GED-style Extended Response (essay) prompt. The prompt must be based on two opposing passages that you create (exactly 3 substantial paragraphs each, 150-230 words and never above 250 words). Each passage MUST have: "title", "author" (a plausible human name), and "content". Output a JSON object with keys "passages" (an array of two objects, each with "title", "author", and "content") and "prompt" (the essay question, <= 250 words).`;
    const schema = {
        type: "OBJECT",
        properties: {
            passages: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, author: { type: "STRING" }, content: { type: "STRING" } } } },
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
1.  **FIX FRACTIONS:** Convert any LaTeX-style fractions (e.g., \`$\frac{1}{2}$\`) into plain-text slash notation (e.g., \`1/2\` or \`(2x+1)/3\`). Remove dollar-sign delimiters around fractions.
2.  **FIX DELIMITERS:** Ensure math expressions are not wrapped in double dollar signs and avoid using $, $$, \(:, or \[ for fractions.
3.  **FIX LATEX:** Keep any remaining LaTeX commands well-formed with leading backslashes (e.g., \`sqrt\` becomes \`\sqrt\`).
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
    const { subject = 'Science', topic = 'Ecosystems' } = req.body || {};
    const QUIZ_COUNT = 12;
    try {
        const subjectNeedsRetrieval = TOPIC_STIMULUS_SUBJECTS.has(subject);
        const subjectNeedsImages = TOPIC_STIMULUS_SUBJECTS.has(subject);

        const ctx = subjectNeedsRetrieval ? await retrieveSnippets(subject, topic) : [];
        const imgs = subjectNeedsImages ? findImagesForSubjectTopic(subject, topic, 6) : [];

        let prompt;
        let winnerModel = 'unknown';
        let latencyMs = 0;

        if (subject === 'Math') {
            // Keep legacy variety pack for Math
            prompt = buildTopicPrompt_VarietyPack(subject, topic, QUIZ_COUNT, ctx, imgs);
        } else {
            const approvedSection = await buildApprovedPassagesSection(subject, topic);
            prompt = buildSubjectPrompt({ subject, topic, examType: 'topic', context: ctx, images: imgs, questionCount: QUIZ_COUNT, approvedPassagesSection: approvedSection });
        }

        const result = await generateQuizItemsWithFallback(
            subject,
            prompt,
            {
                retries: 2,
                minTimeout: 800,
                onFailedAttempt: (err, n) => console.warn(`[retry ${n}] topic generation failed: ${err?.message || err}`)
            }
        );
        winnerModel = result.model || 'unknown';
        latencyMs = result.latencyMs || 0;

        let items = (Array.isArray(result.items) ? result.items : []).map((it) => enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(it)), subject));
        items = items.map(tagMissingItemType).map(tagMissingDifficulty);

        const bad = [];
        items.forEach((it, i) => { if (!validateQuestion(it)) bad.push(i); });
        if (bad.length) {
            const fixed = await withRetry(
                () => repairBatchWithChatGPT_once(bad.map(i => items[i])),
                {
                    retries: 2,
                    minTimeout: 800,
                    onFailedAttempt: (err, n) => console.warn(`[retry ${n}] ChatGPT topic repair failed: ${err?.message || err}`)
                }
            );
            fixed.forEach((f, j) => {
                items[bad[j]] = enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(f)), subject);
            });
            items = items.map(tagMissingItemType).map(tagMissingDifficulty);
        }

        if (subject !== 'Math') {
            items = validateAndFilterAiItems(items, subject, topic);
        }

        items = dedupeNearDuplicates(items, 0.85);
        items = groupedShuffle(items);
        items = items.map(tagMissingItemType).map(tagMissingDifficulty);
        items = items.slice(0, QUIZ_COUNT).map((item, idx) => ({ ...item, questionNumber: idx + 1 }));

        const fractionPlainTextMode = subject === 'Math';
        if (fractionPlainTextMode) {
            items = items.map(applyFractionPlainTextModeToItem);
        }

        res.set('X-Model', winnerModel || 'unknown');
        res.set('X-Model-Latency-Ms', String(latencyMs ?? 0));
        res.json({
            subject,
            topic,
            items,
            model: winnerModel || 'unknown',
            latencyMs: latencyMs ?? 0,
            source: 'aiGenerated',
            fraction_plain_text_mode: fractionPlainTextMode
        });
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
                    source: 'aiGenerated',
                    fraction_plain_text_mode: false,
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
                let draftQuestionSet = allQuestions.slice(0, TOTAL_QUESTIONS);

                // Enforce >= 1/3 numeracy post-processing
                const categoryList = Object.keys(blueprint);
                draftQuestionSet = await ensureScienceNumeracy(draftQuestionSet, { requiredFraction: 1/3, categories: categoryList, aiOptions });

                draftQuestionSet.forEach((q, index) => { q.questionNumber = index + 1; });

                const draftQuiz = {
                    id: `ai_comp_sci_draft_${new Date().getTime()}`,
                    title: `Comprehensive Science Exam`,
                    subject: subject,
                    source: 'aiGenerated',
                    fraction_plain_text_mode: false,
                    // Enable formula sheet in frontend header
                    config: { formulaSheet: true },
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
        } else if (isRlaSubject(subject)) {
    try {
        console.log("Generating comprehensive RLA exam...");

        const timeoutMs = selectModelTimeoutMs({ examType });
        const aiOptions = { timeoutMs };

        const [part1Questions, part2Essay, part3Questions] = await Promise.all([
            generateRlaPart1(aiOptions),
            generateRlaPart2(aiOptions),
            generateRlaPart3(aiOptions)
        ]);

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
            questions: allQuestions, // Keep this for compatibility with results screen
            source: 'aiGenerated',
            fraction_plain_text_mode: false
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
            source: 'aiGenerated',
            fraction_plain_text_mode: true,
            // Enable formula sheet in frontend header
            config: { formulaSheet: true },
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
            const { subject, topic } = req.body;
            if (!topic) {
                return res.status(400).json({ error: 'Topic is required for non-comprehensive quizzes.' });
            }
            console.log(`Generating topic-specific quiz for Subject: ${subject}, Topic: ${topic}`);

            const TOTAL_QUESTIONS = 15;
            let promises = []; // Single promises array for all logic paths.

            if (subject === 'Math') {
                // --- MATH-SPECIFIC LOGIC ---
                console.log("Generating Math quiz without passages.");
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
            } else {
                // --- LOGIC FOR OTHER SUBJECTS (Social Studies, Science, RLA) ---
                console.log(`Generating ${subject} quiz with passages and other stimuli.`);
                const numPassageSets = 3; // e.g., 3 passages with 2 questions each = 6 questions
                const numImageSets = 2;   // e.g., 2 images with 2 questions each = 4 questions

                for (let i = 0; i < numPassageSets; i++) {
                    promises.push(generatePassageSet(topic, subject, 2));
                }
                for (let i = 0; i < numImageSets; i++) {
                    promises.push(generateImageQuestion(topic, subject, curatedImages, 2));
                }
                 // Fill the rest with standalone questions to ensure we reach the total.
                 const questionsSoFar = (numPassageSets * 2) + (numImageSets * 2);
                 const remainingQuestions = TOTAL_QUESTIONS - questionsSoFar;
                 for (let i = 0; i < remainingQuestions; i++) {
                     promises.push(generateStandaloneQuestion(subject, topic));
                 }
            }

            // --- Execute all promises, assemble, shuffle, and finalize the quiz ---
            const results = await Promise.all(promises);
            let allQuestions = results.flat().filter(q => q); // Filter out any nulls from failed generations

            // Shuffle the collected questions for variety
            const shuffledQuestions = shuffleArray(allQuestions);

            let finalQuestions = shuffledQuestions.slice(0, TOTAL_QUESTIONS);

            // Assign question numbers
            finalQuestions.forEach((q, index) => {
                q.questionNumber = index + 1;
            });

            if (subject === 'Math' && MATH_TWO_PASS_ENABLED) {
                console.log('Applying math two-pass linting pipeline to topic quiz...');
                await runMathTwoPassOnQuestions(finalQuestions, subject);
                finalQuestions = await applyMathCorrectnessPass(finalQuestions);
            }

            if (subject === 'Math') {
                finalQuestions = finalQuestions.map(applyFractionPlainTextModeToItem);
            }

            let draftQuiz = {
                id: `ai_topic_${new Date().getTime()}`,
                title: `${subject}: ${topic}`,
                subject: subject,
                source: 'aiGenerated',
                fraction_plain_text_mode: subject === 'Math',
                // Enable formula sheet for Math & Science topic quizzes
                config: { formulaSheet: subject === 'Math' || subject === 'Science' },
                questions: finalQuestions,
            };

            const finalQuiz = draftQuiz;

            console.log("Quiz generation and post-processing complete.");
            logGenerationDuration(examType, subject, generationStart);
            res.json(finalQuiz); // Send the cleaned quiz directly to the user

        } catch (error) {
            // Use topic and subject in the error log if they are available
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

// New, auth-protected essay scoring endpoint used by the SPA
// Persists ONLY the total (0-6) score for the authenticated user.
app.post('/api/essay/score', authenticateBearerToken, async (req, res) => {
    const userId = req.user?.userId || req.user?.sub;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { essayText, completion, promptId } = req.body || {};
    if (!essayText || typeof essayText !== 'string' || !essayText.trim()) {
        return res.status(400).json({ error: 'Essay text is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('[ESSAY-SCORE] API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Act as a GED RLA essay evaluator. The student was asked to write a 5-paragraph essay.\n\n` +
        `IMPORTANT CONTEXT: The student's level of completion for this draft was ${completion ?? 'unknown'} sections. ` +
        `Factor this completion level into your feedback and scores, especially for Trait 3. An incomplete essay cannot score a 2 on Trait 3.\n\n` +
        `Here is the student's essay:\n---\n${essayText}\n---\n\n` +
        `Please provide your evaluation in a valid JSON object format with keys "trait1", "trait2", "trait3", "overallScore", and "overallFeedback". ` +
        `For each trait, provide a "score" from 0 to 2 and "feedback" explaining the score. The "overallScore" is the sum of the trait scores (0..6). ` +
        `"overallFeedback" should be a short summary. ` +
        `After scoring the essay, also output a field \"challenge_tags\" which is an array of zero or more of the following strings: ` +
        `\"writing:thesis\", \"writing:evidence\", \"writing:organization\", \"writing:grammar-mechanics\", \"writing:addressing-prompt\". ` +
        `Only include a tag if the essay showed that specific weakness. Return JSON.`;

    const schema = {
        type: 'OBJECT',
        properties: {
            trait1: { type: 'OBJECT', properties: { score: { type: 'NUMBER' }, feedback: { type: 'STRING' } } },
            trait2: { type: 'OBJECT', properties: { score: { type: 'NUMBER' }, feedback: { type: 'STRING' } } },
            trait3: { type: 'OBJECT', properties: { score: { type: 'NUMBER' }, feedback: { type: 'STRING' } } },
            overallScore: { type: 'NUMBER' },
            overallFeedback: { type: 'STRING' },
            challenge_tags: { type: 'ARRAY', items: { type: 'STRING' } },
        },
        required: ['trait1', 'trait2', 'trait3', 'overallScore', 'overallFeedback'],
    };

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: schema,
        },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const normalizeResponse = (raw) => {
        try {
            // If the model returned the structured object, prefer it
            if (raw && typeof raw === 'object' && raw.trait1 && raw.trait2 && raw.trait3) {
                return raw;
            }
            // Otherwise, attempt to peel the Google response format
            const txt = raw?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (typeof txt === 'string') {
                const parsed = JSON.parse(txt);
                return parsed;
            }
        } catch (e) {
            // fall through to fallback
        }
        return null;
    };

    console.log('[ESSAY-SCORE] Scoring request received', {
        userId,
        completion: completion ?? null,
        hasText: !!essayText,
        promptId: promptId || null,
    });

    try {
        const response = await http.post(apiUrl, payload);
        const normalized = normalizeResponse(response.data);
        if (!normalized) {
            throw new Error('AI response was not parseable');
        }

        // Clamp and normalize the total score to 0..6, integer
        const total = Math.max(0, Math.min(6, Math.round(Number(normalized.overallScore))));

        try {
            await pool.query(
                `INSERT INTO essay_scores (user_id, total_score, prompt_id) VALUES ($1, $2, $3)`,
                [userId, total, promptId || null]
            );
            console.log('[ESSAY-SCORE] Saved total score', { userId, total, promptId: promptId || null });
        } catch (dbErr) {
            console.warn('[ESSAY-SCORE] Failed to persist total score:', dbErr?.message || dbErr);
        }

        // Challenge tags integration
        try {
            const tags = Array.isArray(normalized.challenge_tags) ? normalized.challenge_tags : [];
            for (const rawTag of tags) {
                if (!rawTag || typeof rawTag !== 'string') continue;
                const t = rawTag.trim().toLowerCase();
                if (!t) continue;
                // Audit log
                try { await pool.query(`INSERT INTO essay_challenge_log (user_id, challenge_tag, essay_id, source) VALUES ($1, $2, $3, 'essay')`, [userId, t, promptId || null]); } catch (_e) {}
                // Upsert stats: essays count as "wrong" to trigger practice
                await upsertChallengeStat(userId, t, false, 'essay');
                // Suggest add if not active
                const active = await userHasActiveChallenge(userId, t);
                if (!active) {
                    await createSuggestion(userId, t, 'add', 'essay', 'AI grader found this in your writing');
                }
            }
        } catch (e) {
            console.warn('[ESSAY-SCORE] challenge tag processing failed:', e?.message || e);
        }

        // Return normalized structure directly to the client
        return res.json({
            trait1: normalized.trait1,
            trait2: normalized.trait2,
            trait3: normalized.trait3,
            overallScore: total,
            overallFeedback: normalized.overallFeedback || '',
            challenge_tags: Array.isArray(normalized.challenge_tags) ? normalized.challenge_tags : [],
        });
    } catch (error) {
        const errMsg = error?.response ? JSON.stringify(error.response.data) : (error?.message || String(error));
        console.error('[ESSAY-SCORE] AI scoring failed:', errMsg);
        // Safe fallback response: do not persist, but return a neutral evaluation
        return res.status(200).json({
            trait1: { score: 0, feedback: 'We could not evaluate this draft right now. Try again shortly.' },
            trait2: { score: 0, feedback: 'We could not evaluate this draft right now. Try again shortly.' },
            trait3: { score: 0, feedback: 'We could not evaluate this draft right now. Try again shortly.' },
            overallScore: 0,
            overallFeedback: 'Temporary scoring outage. Your draft was not saved for scoring; please rescore later.',
        });
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
        if (!payload || !payload.sub) {
            console.error('Google payload missing subject identifier.');
            return res.status(400).json({ error: 'Invalid Google credential.' });
        }

        const sub = String(payload.sub);
        const email = String(payload.email || '').toLowerCase();
        if (!email) {
            console.error('Google payload missing email.');
            return res.status(400).json({ error: 'Unable to determine Google account email.' });
        }

        const name = payload.name || null;
        const picture = payload.picture || null;

        let userId;
        const identityRow = await findUserIdByGoogleSub(sub);
        if (identityRow && identityRow.user_id) {
            userId = identityRow.user_id;
        } else {
            let user = await findUserByEmail(email);
            if (!user) {
                user = await createUser(email, name);
            }
            if (!user || !user.id) {
                console.error('Failed to create or locate user for Google login.');
                return res.status(500).json({ error: 'Authentication or database error.' });
            }
            userId = user.id;
            await bindGoogleIdentity(userId, sub);
        }

        const now = new Date();
        const updateParams = [userId, name, email, picture, now];
        if (email === SUPER_ADMIN_EMAIL) {
            await pool.query(
                `UPDATE users
                    SET name = $2,
                        email = $3,
                        picture_url = $4,
                        last_login = $5,
                        role = 'super_admin',
                        organization_id = NULL
                  WHERE id = $1`,
                updateParams
            );
        } else {
            await pool.query(
                `UPDATE users
                    SET name = $2,
                        email = $3,
                        picture_url = $4,
                        last_login = $5,
                        role = COALESCE(role, 'student')
                  WHERE id = $1`,
                updateParams
            );
        }

        const userRow = await loadUserWithRole(userId);
        if (!userRow) {
            console.error('User record missing after Google login.');
            return res.status(500).json({ error: 'Authentication or database error.' });
        }

        if (!userRow.role) {
            await pool.query(`UPDATE users SET role = 'student' WHERE id = $1`, [userId]);
            userRow.role = 'student';
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not configured for Google authentication.');
            return res.status(500).json({ error: 'Authentication unavailable.' });
        }

        const authPayload = buildAuthPayloadFromUserRow(userRow);
        const token = jwt.sign(authPayload, process.env.JWT_SECRET, { expiresIn: '1d' });
        setAuthCookie(res, token, 24 * 60 * 60 * 1000);

        const responseUser = buildUserResponse(userRow, picture);
        console.log(`User ${responseUser?.name || name || email} (${email}) logged in as ${authPayload.role}.`);

        res.status(200).json({
            user: responseUser,
            token,
        });
    } catch (error) {
        console.error('Google Auth or DB Error:', error);
        res.status(500).json({ error: 'Authentication or database error.' });
    }
});

// --- API ENDPOINT TO SAVE A QUIZ ATTEMPT ---
app.get('/api/admin/organizations', requireAuth, requireSuperAdmin, async (req, res) => {
    try {
        const rows = await db.many(
            `SELECT
                o.id,
                o.name,
                COUNT(u.id) AS user_count,
                MAX(qa.attempted_at) AS recent_activity
             FROM organizations o
             LEFT JOIN users u ON u.organization_id = o.id
             LEFT JOIN quiz_attempts qa ON qa.user_id = u.id
             GROUP BY o.id, o.name
             ORDER BY o.name ASC`
        );

        const organizations = rows.map((row) => ({
            id: row.id,
            name: row.name,
            userCount: Number(row.user_count) || 0,
            recentActivity: row.recent_activity || null,
        }));

        return res.json({ organizations });
    } catch (error) {
        console.error('Failed to load organizations:', error);
        return res.status(500).json({ error: 'Unable to load organizations' });
    }
});

app.get('/api/admin/org-summary', requireAuth, requireOrgAdmin, async (req, res) => {
    try {
        let targetOrgId;
        if (req.user.role === 'super_admin' && req.query.organization_id) {
            const parsed = Number.parseInt(String(req.query.organization_id), 10);
            if (!Number.isInteger(parsed) || parsed <= 0) {
                return res.status(400).json({ error: 'Invalid organization_id' });
            }
            targetOrgId = parsed;
        } else {
            targetOrgId = req.user.organization_id;
        }

        if (!targetOrgId) {
            return res.status(400).json({ error: 'No organization scope' });
        }

        const organization = await db.oneOrNone(
            `SELECT id, name FROM organizations WHERE id = $1`,
            [targetOrgId]
        );

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        const userRows = await db.many(
            `SELECT id, name, email, last_login
               FROM users
              WHERE organization_id = $1
              ORDER BY name NULLS LAST, email ASC`,
            [targetOrgId]
        );

        const attemptRows = await db.many(
            `SELECT
                ranked.user_id,
                ranked.subject,
                ranked.quiz_type,
                ranked.scaled_score,
                ranked.attempted_at
             FROM (
                SELECT
                    qa.user_id,
                    qa.subject,
                    qa.quiz_type,
                    qa.scaled_score,
                    qa.attempted_at,
                    qa.id,
                    ROW_NUMBER() OVER (PARTITION BY qa.user_id ORDER BY qa.attempted_at DESC, qa.id DESC) AS rn
                FROM quiz_attempts qa
                JOIN users u ON u.id = qa.user_id
                WHERE u.organization_id = $1
             ) ranked
             WHERE ranked.rn <= 5
             ORDER BY ranked.user_id, ranked.attempted_at DESC, ranked.id DESC`,
            [targetOrgId]
        );

        const attemptsByUser = new Map();
        for (const row of attemptRows) {
            const entry = attemptsByUser.get(row.user_id) || [];
            entry.push({
                subject: row.subject,
                quiz_type: row.quiz_type,
                scaled_score: row.scaled_score != null ? Number(row.scaled_score) : null,
                attempted_at: row.attempted_at,
            });
            attemptsByUser.set(row.user_id, entry);
        }

        const users = userRows.map((row) => ({
            id: row.id,
            name: row.name,
            email: row.email,
            last_login: row.last_login || null,
            quizAttempts: attemptsByUser.get(row.id) || [],
        }));

        return res.json({
            organization,
            users,
        });
    } catch (error) {
        console.error('Failed to load organization summary:', error);
        return res.status(500).json({ error: 'Unable to load organization summary' });
    }
});

app.post('/api/quiz-attempts', authenticateBearerToken, async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.sub;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const {
            subject,
            quizCode,
            quizTitle,
            quizType = null,
            score,
            totalQuestions,
            scaledScore,
            passed,
        } = req.body || {};

        const normalizedSubject = typeof subject === 'string' ? subject.trim() : '';
        const normalizedQuizCode = typeof quizCode === 'string' ? quizCode.trim() : '';
        const normalizedQuizTitle = typeof quizTitle === 'string' ? quizTitle.trim() : '';

        if (!normalizedSubject) {
            return res.status(400).json({ error: 'Subject is required' });
        }
        if (!normalizedQuizCode) {
            return res.status(400).json({ error: 'quizCode is required' });
        }
        if (!normalizedQuizTitle) {
            return res.status(400).json({ error: 'quizTitle is required' });
        }

        const toRoundedNumber = (value) => {
            const num = Number(value);
            return Number.isFinite(num) ? Math.round(num) : null;
        };

        const numericScore = toRoundedNumber(score);
        const numericTotal = toRoundedNumber(totalQuestions);
        const numericScaled = toRoundedNumber(scaledScore);
        const normalizedPassed = typeof passed === 'boolean'
            ? passed
            : (numericScaled != null ? numericScaled >= 145 : null);

        const insertQuery = `
            INSERT INTO quiz_attempts (user_id, subject, quiz_code, quiz_title, quiz_type, score, total_questions, scaled_score, passed)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, user_id, subject, quiz_code, quiz_title, quiz_type, score, total_questions, scaled_score, passed, attempted_at;
        `;

        const params = [
            userId,
            normalizedSubject,
            normalizedQuizCode,
            normalizedQuizTitle,
            quizType || null,
            numericScore,
            numericTotal,
            numericScaled,
            normalizedPassed,
        ];

    const result = await pool.query(insertQuery, params);

        console.log(`Saved quiz attempt ${normalizedQuizCode} for user ${userId} in subject ${normalizedSubject}`);
        // Process optional per-question responses for challenge tags
        try {
            const { responses } = req.body || {};
            if (Array.isArray(responses)) {
                for (const item of responses) {
                    if (!item || !Array.isArray(item.challenge_tags)) continue;
                    const gotCorrect = !!item.correct;
                    for (const tag of item.challenge_tags) {
                        if (!tag || typeof tag !== 'string') continue;
                        const clean = tag.trim().toLowerCase();
                        if (!clean) continue;
                        // Warn if tag not present in catalog
                        try {
                            const exists = await db.oneOrNone('SELECT 1 FROM challenge_tag_catalog WHERE challenge_tag = $1 LIMIT 1', [clean]);
                            if (!exists) {
                                console.warn('[challenge-tag] Missing in catalog:', clean);
                            }
                        } catch (_) {}
                        await upsertChallengeStat(userId, clean, gotCorrect, 'quiz');
                        await runPromotionDemotionRules(userId, clean);
                    }
                }
            }
        } catch (e) {
            console.warn('[quiz-attempts] response processing failed:', e?.message || e);
        }

        // If this was a coach-assigned quiz, mark daily completion and credit minutes
        try {
            const { assigned_by } = req.body || {};
            const by = (assigned_by || '').toString().toLowerCase().replace(/_/g, '-');
            if (by === COACH_ASSIGNED_BY) {
                const subj = normalizeSubjectLabel(normalizedSubject);
                const dateISO = todayISO();
                await findOrCreateDailyRow(userId, subj, dateISO);
                await pool.query(
                    `UPDATE coach_daily_progress
                        SET completed_minutes = GREATEST(0, completed_minutes + $4),
                            coach_quiz_completed = TRUE,
                            updated_at = NOW()
                      WHERE user_id = $1 AND subject = $2 AND plan_date = $3`,
                    [userId, subj, dateISO, COACH_QUIZ_MINUTES]
                );
            }
        } catch (e) {
            console.warn('[quiz-attempts] coach completion credit failed:', e?.message || e);
        }

        res.status(201).json(formatQuizAttemptRow(result.rows[0]));

    } catch (error) {
        console.error('Error saving quiz attempt:', error);
        res.status(500).json({ error: 'Failed to save quiz attempt.' });
    }
});


// --- API ENDPOINT TO GET ALL QUIZ ATTEMPTS FOR A USER ---
app.get('/api/quiz-attempts', authenticateBearerToken, async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.sub;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const selectQuery = `
            SELECT id, user_id, subject, quiz_code, quiz_title, quiz_type, score, total_questions, scaled_score, passed, attempted_at
            FROM quiz_attempts
            WHERE user_id = $1
            ORDER BY attempted_at DESC, id DESC;
        `;

        const { rows } = await pool.query(selectQuery, [userId]);

        res.status(200).json(rows.map(formatQuizAttemptRow));

    } catch (error) {
        console.error('Error fetching quiz attempts:', error);
        res.status(500).json({ error: 'Failed to fetch quiz attempts.' });
    }
});


// Load quizzes from dynamic index which merges legacy and supplemental topics
const { ALL_QUIZZES } = require('./data/quizzes');

// Subtopic → challenge tag mapping for auto-derivation when questions lack explicit tags
const SUBTOPIC_TO_CHALLENGE = {
    'Fractions': ['math:fraction'],
    'Decimals': ['math:decimals'],
    'Ratios, Proportions & Percents': ['math:ratio-percent'],
    'Scientific Numeracy': ['science:numeracy'],
    'Reading for Meaning': ['rla:inference'],
    'Main Idea': ['rla:main-idea'],
};

function deriveTagsFromContext(subjectKey, categoryName, topic) {
    // Prefer topic title mapping first
    const tTitle = (topic && (topic.title || topic.id)) ? String(topic.title || topic.id) : '';
    if (tTitle && SUBTOPIC_TO_CHALLENGE[tTitle]) return SUBTOPIC_TO_CHALLENGE[tTitle];
    // Fallback to category mapping
    const cName = categoryName ? String(categoryName) : '';
    if (cName && SUBTOPIC_TO_CHALLENGE[cName]) return SUBTOPIC_TO_CHALLENGE[cName];
    return [];
}

function ensureQuestionTags(subjectKey, categoryName, topic, question, idxForLog = null) {
    try {
        const hasExplicit = Array.isArray(question?.challenge_tags) && question.challenge_tags.length > 0;
        if (hasExplicit) {
            // Respect explicit tags
            return question;
        }
        const derived = deriveTagsFromContext(subjectKey, categoryName, topic);
        if (Array.isArray(derived) && derived.length > 0) {
            question.challenge_tags = derived.slice();
            return question;
        }
        // Log missing tag for later hand-tagging
        const topicId = topic?.id || topic?.title || 'topic';
        const qIndex = (idxForLog != null) ? `#${idxForLog + 1}` : '';
        console.warn(`[challenge-tags] question ${subjectKey}/${topicId}${qIndex} has no challenge_tags and no subtopic mapping`);
        return question;
    } catch (e) {
        return question;
    }
}

// Expose ALL_QUIZZES for the frontend to build a unified catalog, including supplemental topics
function buildAllQuizzesWithTags() {
    // Deep-ish clone with tag normalization; keep structure intact
    const out = {};
    for (const [subjectKey, subj] of Object.entries(ALL_QUIZZES || {})) {
        const subjCopy = { icon: subj.icon || null, categories: {} };
        for (const [catName, cat] of Object.entries(subj.categories || {})) {
            const catCopy = { description: cat.description || '', topics: [] };
            const topics = Array.isArray(cat.topics) ? cat.topics : [];
            topics.forEach((topic) => {
                const tCopy = { ...topic };
                if (Array.isArray(topic.questions)) {
                    tCopy.questions = topic.questions.map((q, i) => {
                        const cloned = q && typeof q === 'object' ? { ...q } : q;
                        return ensureQuestionTags(subjectKey, catName, topic, cloned, i);
                    });
                }
                catCopy.topics.push(tCopy);
            });
            subjCopy.categories[catName] = catCopy;
        }
        out[subjectKey] = subjCopy;
    }
    return out;
}

app.get('/api/all-quizzes', (req, res) => {
    try {
        res.set('Cache-Control', 'no-store');
        return res.json(buildAllQuizzesWithTags());
    } catch (e) {
        return res.json(ALL_QUIZZES);
    }
});

// Helper function to get random questions from the premade data,
// normalizing challenge_tags using subtopic/category mapping when absent.
const getPremadeQuestions = (subject, count) => {
    const allQuestions = [];
    if (ALL_QUIZZES[subject] && ALL_QUIZZES[subject].categories) {
        Object.entries(ALL_QUIZZES[subject].categories).forEach(([categoryName, category]) => {
            if (category && Array.isArray(category.topics)) {
                category.topics.forEach((topic) => {
                    if (Array.isArray(topic?.questions)) {
                        topic.questions.forEach((q, i) => {
                            const cloned = q && typeof q === 'object' ? { ...q } : q;
                            const normalized = ensureQuestionTags(subject, categoryName, topic, cloned, i);
                            allQuestions.push(normalized);
                        });
                    }
                });
            }
        });
    }
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Validate challenge tags present in premade catalog at startup (warn only)
function validatePremadeChallengeTags() {
    try {
        const subjects = Object.keys(ALL_QUIZZES || {});
        subjects.forEach((subj) => {
            const categories = ALL_QUIZZES[subj]?.categories || {};
            Object.values(categories).forEach((cat) => {
                const topics = Array.isArray(cat?.topics) ? cat.topics : [];
                topics.forEach((topic) => {
                    const questions = Array.isArray(topic?.questions) ? topic.questions : [];
                    questions.forEach((q) => {
                        const tags = Array.isArray(q?.challenge_tags) ? q.challenge_tags : [];
                        tags.forEach(async (t) => {
                            const tag = (t || '').toString().trim().toLowerCase();
                            if (!tag) return;
                            try {
                                const exists = await pool.query('SELECT 1 FROM challenge_tag_catalog WHERE challenge_tag = $1 LIMIT 1', [tag]);
                                if (!exists || !exists.rowCount) {
                                    console.warn('[challenge-tag] Not found in catalog:', tag);
                                }
                            } catch (_) {}
                        });
                    });
                });
            });
        });
    } catch (e) {
        console.warn('validatePremadeChallengeTags failed:', e?.message || e);
    }
}
validatePremadeChallengeTags();

// Lightweight catalog endpoint for frontend to ingest merged legacy + supplemental topics
app.get('/api/all-quizzes', (req, res) => {
    try {
        res.set('Cache-Control', 'no-store');
        return res.json(buildAllQuizzesWithTags());
    } catch (e) {
        console.warn('[api] /api/all-quizzes failed:', e?.message || e);
        return res.status(500).json({ error: 'Failed to load quiz catalog' });
    }
});

// Practice Session helpers and endpoint
const PRACTICE_SUBJECTS = ['Math', 'Science', 'RLA', 'Social Studies'];
const VALID_DURATIONS = [10, 20, 30, 40, 50, 60];

function clampDuration(mins) {
    const n = Number(mins);
    if (VALID_DURATIONS.includes(n)) return n;
    // find nearest valid duration; default to 10 if invalid
    const sorted = [...VALID_DURATIONS].sort((a, b) => Math.abs(a - n) - Math.abs(b - n));
    return sorted[0] || 10;
}

function shuffleArray(arr) {
    const a = Array.isArray(arr) ? arr.slice() : [];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function isValidMC(question) {
    if (!question || typeof question !== 'object') return false;
    const opts = Array.isArray(question.answerOptions) ? question.answerOptions : [];
    if (opts.length < 2) return false;
    return opts.some(o => o && o.isCorrect === true);
}

function cloneQuestion(q) {
    if (!q || typeof q !== 'object') return null;
    const cloned = { ...q };
    if (Array.isArray(q.answerOptions)) {
        cloned.answerOptions = q.answerOptions.map(opt => ({ ...opt }));
    }
    return cloned;
}

function flattenSubjectQuestions(subjectKey) {
    const out = [];
    const subj = ALL_QUIZZES[subjectKey];
    if (!subj || !subj.categories) return out;
    Object.values(subj.categories).forEach(cat => {
        const topics = Array.isArray(cat?.topics) ? cat.topics : [];
        topics.forEach(topic => {
            const questions = Array.isArray(topic?.questions) ? topic.questions : [];
            questions.forEach(raw => {
                const q = cloneQuestion(raw);
                if (!isValidMC(q)) return;
                // Ensure subject property present
                if (!q.subject) q.subject = subjectKey;
                out.push(q);
            });
        });
    });
    return out;
}

function assembleBalancedPool(requiredCount) {
    // Collect per-subject pools
    const bySubject = PRACTICE_SUBJECTS.map(s => ({ subject: s, pool: shuffleArray(flattenSubjectQuestions(s)) }));
    const totalAvailable = bySubject.reduce((acc, s) => acc + s.pool.length, 0);
    const take = Math.min(requiredCount, totalAvailable);
    if (take <= 0) return [];

    // Base quota per subject
    const base = Math.floor(take / PRACTICE_SUBJECTS.length);
    let remainder = take % PRACTICE_SUBJECTS.length;
    const selections = [];

    bySubject.forEach(({ subject, pool }) => {
        const extra = remainder > 0 ? 1 : 0;
        const need = base + extra;
        if (remainder > 0) remainder -= 1;
        selections.push(...pool.slice(0, need).map(q => ({ ...q, subject })));
    });

    // If still short (because some pools were smaller), top up from any remaining
    if (selections.length < take) {
        const leftovers = shuffleArray(bySubject.flatMap(({ subject, pool }) => pool.slice(0))).filter(q => !selections.includes(q));
        selections.push(...leftovers.slice(0, take - selections.length));
    }
    return shuffleArray(selections).slice(0, take);
}

function assembleSingleSubject(subjectKey, requiredCount) {
    const pool = shuffleArray(flattenSubjectQuestions(subjectKey));
    return pool.slice(0, Math.min(pool.length, requiredCount));
}

// Practice Session builder (placed after getPremadeQuestions)
app.post(
    '/api/practice-session',
    devAuth,
    ensureTestUserForNow,
    requireAuthInProd,
    authRequired,
    express.json(),
    (req, res) => {
        try {
            let { durationMinutes, mode, subject } = req.body || {};

            // Normalize inputs
            const VALID_MINUTES = [10, 20, 30, 40, 50, 60];
            durationMinutes = Number(durationMinutes);
            if (!VALID_MINUTES.includes(durationMinutes)) {
                durationMinutes = 10;
            }

            const questionsNeeded = Math.max(1, Math.round((durationMinutes / 10) * 5));

            const SUBJECT_LABELS = {
                math: 'Math',
                science: 'Science',
                rla: 'Reasoning Through Language Arts (RLA)',
                social: 'Social Studies',
                'social-studies': 'Social Studies',
                ss: 'Social Studies',
            };

            // Accept both the new spec and legacy simplified modes for compatibility
            const m = (mode || '').toString().toLowerCase();
            let subjectList = [];
            switch (m) {
                case 'single-subject': {
                    const subjKey = (subject || '').toString().toLowerCase();
                    const key = SUBJECT_LABELS[subjKey] || SUBJECT_LABELS[(SUBJECT_LABELS[(subject || '').toString()]) ? (subject || '').toString() : ''] || null;
                    if (!key) {
                        return res.status(400).json({ error: 'subject_required' });
                    }
                    subjectList = [key];
                    break;
                }
                case 'math-rla':
                    subjectList = [SUBJECT_LABELS.math, SUBJECT_LABELS.rla];
                    break;
                case 'science-social':
                    subjectList = [SUBJECT_LABELS.science, SUBJECT_LABELS.social];
                    break;
                case 'full-random':
                case 'balanced-4':
                    subjectList = [SUBJECT_LABELS.math, SUBJECT_LABELS.science, SUBJECT_LABELS.rla, SUBJECT_LABELS.social];
                    mode = 'balanced-4';
                    break;
                // Legacy/simple modes: map to single-subject or balanced
                case 'math':
                    subjectList = [SUBJECT_LABELS.math];
                    mode = 'single-subject';
                    subject = 'math';
                    break;
                case 'rla':
                    subjectList = [SUBJECT_LABELS.rla];
                    mode = 'single-subject';
                    subject = 'rla';
                    break;
                case 'science':
                    subjectList = [SUBJECT_LABELS.science];
                    mode = 'single-subject';
                    subject = 'science';
                    break;
                case 'social-studies':
                case 'social_studies':
                case 'socialstudies':
                case 'ss':
                    subjectList = [SUBJECT_LABELS['social-studies']];
                    mode = 'single-subject';
                    subject = 'social';
                    break;
                case 'balanced':
                default:
                    subjectList = [SUBJECT_LABELS.math, SUBJECT_LABELS.science, SUBJECT_LABELS.rla, SUBJECT_LABELS.social];
                    mode = 'balanced-4';
                    break;
            }

            // Pull questions from selected subjects
            let pool = [];
            subjectList.forEach((subj) => {
                const pulled = getPremadeQuestions(subj, questionsNeeded * 2); // pull extra to allow shuffle
                if (Array.isArray(pulled)) {
                    pulled.forEach((q) => {
                        pool.push({
                            ...q,
                            subject: q.subject || subj,
                        });
                    });
                }
            });

            if (!pool.length) {
                return res.json({
                    title: 'Practice Session',
                    durationMinutes,
                    mode,
                    questionCount: 0,
                    questions: [],
                });
            }

            // shuffle
            for (let i = pool.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pool[i], pool[j]] = [pool[j], pool[i]];
            }

            const questions = pool.slice(0, questionsNeeded).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
            return res.json({
                title: 'Practice Session',
                durationMinutes,
                mode,
                questionCount: questions.length,
                questions,
            });
        } catch (e) {
            console.error('practice-session error:', e);
            return res.status(500).json({ error: 'Failed to build practice session' });
        }
    }
);

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



// The '0.0.0.0' is important for containerized environments like Render.
if (require.main === module) {
    (async () => {
        const desiredPort = port;
        if (await isPortBusy(desiredPort)) {
            if (!process.env.PORT && desiredPort === 3002) {
                const fallback = 3003;
                if (await isPortBusy(fallback)) {
                    console.log(`Port ${desiredPort} and fallback ${fallback} are already in use. If another backend is running, stop it or set PORT to a free port.`);
                    process.exit(0);
                } else {
                    console.log(`Port ${desiredPort} is in use. Starting backend on ${fallback} instead.`);
                    port = fallback;
                }
            } else {
                console.log(`Port ${desiredPort} is already in use. If another backend is running on this port, stop it or choose a different PORT.`);
                process.exit(0);
            }
        }

        const server = app.listen(port, '0.0.0.0', () => {
            console.log(`Your service is live 🚀`);
            console.log(`Server listening on port ${port}`);
        });

        server.on('error', (err) => {
            if (err && err.code === 'EADDRINUSE') {
                if (!process.env.PORT && port === 3002) {
                    const fallback = 3003;
                    console.log(`EADDRINUSE on ${port}. Attempting fallback port ${fallback}...`);
                    server.close(() => {
                        app.listen(fallback, '0.0.0.0', () => {
                            port = fallback;
                            console.log(`Server listening on fallback port ${port}`);
                        });
                    });
                } else {
                    console.log(`EADDRINUSE: address already in use 0.0.0.0:${port}. Not restarting task. Stop the other process or set PORT to a different value.`);
                    process.exit(0);
                }
            } else {
                console.error('Server error:', err);
                process.exit(1);
            }
        });
    })();
}

module.exports = {
    normalizeLatex,
    applyFractionPlainTextModeToItem,
    replaceLatexFractionsWithSlash
};
