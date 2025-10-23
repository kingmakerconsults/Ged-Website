// server.js (Updated Version)

// Fetch shim: prefer global (Node 18+), fallback only if truly missing
if (typeof globalThis.fetch !== 'function') {
    // Lazy-load node-fetch v2 only when needed (do NOT add as a normal dependency)
    globalThis.fetch = (...args) => import('node-fetch').then(m => m.default(...args));
    if (typeof globalThis.Headers !== 'function' || typeof globalThis.Request !== 'function' || typeof globalThis.Response !== 'function') {
        // also lazy-provide classes if needed
        import('node-fetch').then(m => {
            globalThis.Headers = m.Headers;
            globalThis.Request = m.Request;
            globalThis.Response = m.Response;
        });
    }
}

console.log(`[BOOT] Node ${process.version} | fetch:${typeof fetch} | NODE_ENV=${process.env.NODE_ENV || 'development'}`);

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
const katex = require('katex');
const sanitizeHtml = require('sanitize-html');
const { jsonrepair } = require('jsonrepair');
const { assertValidImageRef: assertImageRefPayload } = require('./src/images/validateImageRef');
const imageDiagnostics = require('./src/images/imageDiagnostics');
const { generateSocialStudiesItems } = require('./src/socialStudies/generator');
const vocabularyData = require('../data/vocabulary_index.json');
const MODEL_HTTP_TIMEOUT_MS = Number(process.env.MODEL_HTTP_TIMEOUT_MS) || 90000;
const COMPREHENSIVE_TIMEOUT_MS = 480000;
const http = axios.create({ timeout: MODEL_HTTP_TIMEOUT_MS });

const VALID_MATH_MODES = new Set(['plain_fractions', 'katex']);
const DEFAULT_MATH_MODE = (() => {
    const mode = (process.env.MATH_MODE || 'plain_fractions').toLowerCase();
    return VALID_MATH_MODES.has(mode) ? mode : 'plain_fractions';
})();
const SHOULD_RENDER_KATEX = DEFAULT_MATH_MODE === 'katex';

// ==== BANK TOGGLES ====
// Keep storing to the bank, but don't reuse until it's warmed up.
// ==== IMAGE BANK / REUSE CONFIG ====
const BANK_MAX_FETCH = 100;
const IMAGE_TIMEOUT_MS = 7000;
const ACCEPT_IMAGE = /^image\//i;

const DEBUG_LOG_SCHEMAS = String(process.env.DEBUG_LOG_SCHEMAS || '').toLowerCase() === 'true';
const LOGGED_SCHEMA_ERRORS = new Set();

const AI_EXAM_TEMPLATES = {
    default: {
        default: {
            totalQuestions: 12,
            sectionMix: { image: 3, reading: 3, standalone: 6 },
            topics: {
                image: ['Data Analysis'],
                reading: ['Core Concepts'],
                standalone: ['Reasoning Skills']
            }
        }
    },
    'Social Studies': {
        default: {
            totalQuestions: 12,
            sectionMix: { image: 3, reading: 3, standalone: 6 },
            topics: {
                image: ['Civics & Government', 'U.S. History', 'Geography'],
                reading: ['Civics & Government', 'Economics'],
                standalone: ['Geography & the World', 'Contemporary Issues']
            }
        },
        smitha: {
            totalQuestions: 12,
            sectionMix: { image: 4, reading: 4, standalone: 4 },
            topics: {
                image: ['Civics & Government', 'Economics'],
                reading: ['U.S. History', 'Civics & Government'],
                standalone: ['Geography & the World', 'Economics']
            }
        },
        comprehensive: {
            totalQuestions: 46,
            sectionMix: { image: 12, reading: 16, standalone: 18 },
            topics: {
                image: ['Civics & Government', 'Economics', 'Geography & the World'],
                reading: ['U.S. History', 'Civics & Government', 'Economics'],
                standalone: ['Contemporary Issues', 'Geography & the World']
            }
        }
    },
    Science: {
        default: {
            totalQuestions: 12,
            sectionMix: { image: 4, reading: 4, standalone: 4 },
            topics: {
                image: ['Data Representation', 'Experiments'],
                reading: ['Life Science', 'Physical Science'],
                standalone: ['Earth & Space', 'Scientific Reasoning']
            }
        }
    },
    Math: {
        default: {
            totalQuestions: 12,
            sectionMix: { image: 2, reading: 2, standalone: 8 },
            topics: {
                image: ['Data & Graphs'],
                reading: ['Word Problems'],
                standalone: ['Algebra', 'Geometry', 'Quantitative Reasoning']
            }
        }
    },
    RLA: {
        default: {
            totalQuestions: 12,
            sectionMix: { image: 0, reading: 6, standalone: 6 },
            topics: {
                image: [],
                reading: ['Informational Texts', 'Literature'],
                standalone: ['Language Skills', 'Argumentative Writing']
            }
        }
    }
};

function selectModelTimeoutMs({ examType } = {}) {
    return examType === 'comprehensive' ? COMPREHENSIVE_TIMEOUT_MS : MODEL_HTTP_TIMEOUT_MS;
}

function normalizeExamType(value) {
    if (!value || typeof value !== 'string') {
        return 'default';
    }
    return value.trim().toLowerCase() || 'default';
}

function resolveExamTemplate(subject, examType) {
    const subjectKey = typeof subject === 'string' ? subject.trim() : '';
    const group = AI_EXAM_TEMPLATES[subjectKey] || AI_EXAM_TEMPLATES.default;
    const normalizedType = normalizeExamType(examType);
    return group[normalizedType] || group.default || AI_EXAM_TEMPLATES.default.default;
}

function ensurePositiveInt(value, fallback) {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) {
        return Math.floor(numeric);
    }
    return fallback;
}

function computeSectionPlan({ template, totalQuestions, sectionMix, useImages }) {
    const allowed = ['image', 'reading', 'standalone'];
    const desiredTotal = ensurePositiveInt(totalQuestions, template.totalQuestions || 12);
    const mix = { ...template.sectionMix };

    if (sectionMix && typeof sectionMix === 'object') {
        for (const key of allowed) {
            if (sectionMix[key] != null) {
                mix[key] = Math.max(0, Number(sectionMix[key]));
            }
        }
    }

    if (useImages === false) {
        mix.image = 0;
    }

    let sum = 0;
    for (const key of allowed) {
        const value = Number.isFinite(mix[key]) ? mix[key] : 0;
        mix[key] = value > 0 ? value : 0;
        sum += mix[key];
    }

    if (sum === 0) {
        mix.image = 0;
        mix.reading = Math.min(4, Math.floor(desiredTotal / 2));
        mix.standalone = desiredTotal - mix.reading;
        sum = mix.image + mix.reading + mix.standalone;
    }

    const plan = { image: 0, reading: 0, standalone: 0 };
    const ratios = allowed.map((key) => ({ key, value: mix[key] }));
    const notes = [];

    if (sum > 0) {
        let assigned = 0;
        ratios.forEach(({ key, value }) => {
            if (!value) return;
            const portion = Math.floor((value / sum) * desiredTotal);
            plan[key] = portion;
            assigned += portion;
        });

        let remainder = desiredTotal - assigned;
        const priorityOrder = ['reading', 'image', 'standalone'];
        for (const key of priorityOrder) {
            if (remainder <= 0) break;
            const available = mix[key];
            if (available > 0 || key === 'standalone') {
                plan[key] += 1;
                remainder -= 1;
            }
        }

        if (remainder > 0) {
            plan.standalone += remainder;
        }
    } else {
        plan.standalone = desiredTotal;
    }

    if (useImages === false && plan.image > 0) {
        notes.push('Images disabled by request; reallocating to standalone items.');
        plan.standalone += plan.image;
        plan.image = 0;
    }

    const normalizedPlan = {
        image: Math.max(0, Math.min(desiredTotal, plan.image)),
        reading: Math.max(0, Math.min(desiredTotal, plan.reading)),
        standalone: Math.max(0, Math.min(desiredTotal, plan.standalone))
    };

    const totalPlanned = normalizedPlan.image + normalizedPlan.reading + normalizedPlan.standalone;
    if (totalPlanned !== desiredTotal) {
        const delta = desiredTotal - totalPlanned;
        normalizedPlan.standalone += delta;
    }

    return { plan: normalizedPlan, totalQuestions: desiredTotal, notes };
}

function pickTopic(topics = [], index = 0, fallback = 'Core Concepts') {
    if (Array.isArray(topics) && topics.length > 0) {
        return topics[index % topics.length];
    }
    return fallback;
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

function extractChoiceTexts(item = {}) {
    if (!item || typeof item !== 'object') return [];
    if (Array.isArray(item.choices)) {
        return item.choices.map((choice) => {
            if (typeof choice === 'string') return choice;
            if (choice && typeof choice.text === 'string') return choice.text;
            return '';
        });
    }
    if (Array.isArray(item.answerOptions)) {
        return item.answerOptions.map((opt) => {
            if (typeof opt === 'string') return opt;
            if (opt && typeof opt.text === 'string') return opt.text;
            return '';
        });
    }
    return [];
}

function hasImageUrl(item = {}) {
    const ref = item?.imageRef;
    if (ref && typeof ref.imageUrl === 'string' && ref.imageUrl.trim()) {
        return true;
    }
    if (item?.stimulusImage && typeof item.stimulusImage.imageUrl === 'string' && item.stimulusImage.imageUrl.trim()) {
        return true;
    }
    if (item?.image && typeof item.image.imageUrl === 'string' && item.image.imageUrl.trim()) {
        return true;
    }
    return false;
}

function validateItems(items = []) {
    const invalid = [];
    items.forEach((item, index) => {
        const stem = typeof item?.stem === 'string' ? item.stem : typeof item?.questionText === 'string' ? item.questionText : '';
        const mentionsImage = /\bimage\b/i.test(stem || '');
        const choices = extractChoiceTexts(item).filter((text) => typeof text === 'string' && text.trim().length > 0);
        const id = item?.id || item?.questionNumber || index;
        if ((mentionsImage || item?.imageRef) && !hasImageUrl(item)) {
            invalid.push({ index, id, reason: 'missing imageUrl' });
        }
        if (choices.length < 4) {
            invalid.push({ index, id, reason: 'bad choices' });
        }
    });
    return invalid;
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
const crypto = require('crypto');
const AbortController = globalThis.AbortController || fetch.AbortController;

function resolvePathFromEnv(envValue, ...fallbackSegments) {
    if (envValue && typeof envValue === 'string') {
        return path.isAbsolute(envValue)
            ? envValue
            : path.resolve(__dirname, envValue);
    }
    return path.resolve(__dirname, ...fallbackSegments);
}

const FRONTEND_ROOT = resolvePathFromEnv(process.env.FRONTEND_ROOT, '..', 'frontend');
const FRONTEND_DIST = (() => {
    const explicit = process.env.FRONTEND_DIST;
    if (explicit && typeof explicit === 'string') {
        return resolvePathFromEnv(explicit);
    }
    return path.join(FRONTEND_ROOT, 'dist');
})();
const CLIENT_DIST_DIR = FRONTEND_DIST;
const CLIENT_INDEX_FILE = path.join(FRONTEND_DIST, 'index.html');
const HASHED_ASSET_REGEX = /\.[a-f0-9]{8,}\./i;

function detectContentHashedAssets(rootDir) {
    const stack = [rootDir];
    const visited = new Set();

    while (stack.length) {
        const currentDir = stack.pop();
        if (!currentDir || visited.has(currentDir)) continue;
        visited.add(currentDir);

        let entries = [];
        try {
            entries = fs.readdirSync(currentDir, { withFileTypes: true });
        } catch (err) {
            console.warn(`[SPA][WARN] Unable to read client build directory ${currentDir}:`, err?.message || err);
            continue;
        }

        for (const entry of entries) {
            if (entry.isFile() && HASHED_ASSET_REGEX.test(entry.name)) {
                return true;
            }
            if (entry.isDirectory() && (entry.name === 'assets' || entry.name === 'static')) {
                stack.push(path.join(currentDir, entry.name));
            }
        }
    }

    return false;
}

const CLIENT_BUILD_EXISTS = fs.existsSync(CLIENT_INDEX_FILE);
const CLIENT_BUILD_HAS_HASHES = CLIENT_BUILD_EXISTS && detectContentHashedAssets(CLIENT_DIST_DIR);

if (CLIENT_BUILD_EXISTS) {
    if (CLIENT_BUILD_HAS_HASHES) {
        console.log('[SPA] Client build detected with content-hashed assets.');
    } else {
        console.warn('[SPA][WARN] Client build detected but no content-hashed assets were found.');
    }
}

const LOG_DIR = path.join(__dirname, 'logs');
const VALIDATION_LOG = path.join(LOG_DIR, 'question_validations.jsonl');

function ensureLogFiles() {
    try {
        if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);
    } catch (err) {
        console.warn('Unable to ensure log directory exists:', err?.message || err);
    }
    try {
        if (!fs.existsSync(VALIDATION_LOG)) fs.writeFileSync(VALIDATION_LOG, '');
    } catch (err) {
        console.warn('Unable to initialize validation log file:', err?.message || err);
    }
}
ensureLogFiles();

const SANITIZE_OPTIONS = {
    allowedTags: ['span', 'br'],
    allowedAttributes: { span: ['class'] }
};

// Normalize LaTeX text coming from AI or DB before we KaTeX-render it.
function normalizeLatexText(input) {
    if (input == null) return "";
    let s = String(input);

    // 1) Collapse Windows newlines/tabs & excess spaces
    s = s.replace(/\r\n?/g, "\n").replace(/\t/g, " ").replace(/[ \u00A0]+/g, " ").trim();

    // 2) First: unescape over-escaped backslashes (turn \\frac -> \frac)
    //    Do this BEFORE any other LaTeX macro rewrites.
    s = s
        .replace(/\\\\/g, "\\")
        .replace(/\\{2}frac/g, "\\frac")
        .replace(/\\{2}sqrt/g, "\\sqrt")
        .replace(/\\{2}pi/g, "\\pi")
        .replace(/\\{2}times/g, "\\times")
        .replace(/\\{2}div/g, "\\div")
        .replace(/\\{2}cdot/g, "\\cdot")
        .replace(/\\{2}le/g, "\\le")
        .replace(/\\{2}ge/g, "\\ge");

    // 3) Clean up common tokenization glitches around f( ... )
    //    (Sometimes models emit \f\(...\) or add stray backslashes).
    s = s
        .replace(/\\f\\\(/g, "f(")
        .replace(/\\f\s*\\\)/g, "f)")
        .replace(/\\f\(\s*/g, "f(")
        .replace(/\s*\\\)/g, ")");

    // 4) Keep inline/display math delimiters intact. If author already used \(...\) or \[...\], leave as-is.
    //    If raw macros appear without delimiters, we still allow server-side KaTeX to render them (works fine).

    return s;
}

function toPlainFractions(input) {
    if (input == null) return input;
    let s = String(input);

    s = s.replace(/\\\(\s*\\frac/gi, '\\frac')
        .replace(/\\\)\s*/g, '')
        .replace(/\\\[\s*\\frac/gi, '\\frac')
        .replace(/\\\]\s*/g, '');

    s = s.replace(/\\\\/g, '\\');

    s = s.replace(/\\frac\s*\{\s*([+-]?\d+)\s*\}\s*\{\s*([+-]?\d+)\s*\}/gi, (_m, a, b) => `${a}/${b}`);

    return s;
}

function normalizeQuestion(raw, mathMode = DEFAULT_MATH_MODE) {
    const stem = normalizeLatexText(raw?.stem_raw || "");
    const choices = Array.isArray(raw?.choices) ? raw.choices.map(normalizeLatexText) : [];
    const out = { stem, choices, answer_index: raw?.answer_index ?? 0 };

    if (mathMode === 'plain_fractions') {
        out.stem = toPlainFractions(out.stem);
        out.choices = out.choices.map(toPlainFractions);
    }

    if (raw?.image_url) out.image_url = String(raw.image_url);
    if (raw?.imageUrl && !out.image_url) out.image_url = String(raw.imageUrl);
    if (raw?.alt_text) out.alt_text = String(raw.alt_text);
    if (raw?.altText && !out.alt_text) out.alt_text = String(raw.altText);

    return out;
}

function renderInlineKatexToHtml(txt) {
    if (!txt || !SHOULD_RENDER_KATEX) return null;
    // Render only LaTeX bodies; \(...\) delimiters are fine as-is.
    // We accept inline \(...\) OR bare macros: KaTeX can render both.
    try {
        // Render all \(...\) groups; for bare text, render whole string.
        // Simplest robust approach: let KaTeX render whole string; it will ignore plain text.
        const html = katex.renderToString(txt, { throwOnError: true, output: "html" });
        const cleaned = sanitizeHtml(html, SANITIZE_OPTIONS);
        return cleaned && cleaned.trim().length ? cleaned : null;
    } catch {
        // As a fallback, try to render only the inline groups
        try {
            const replaced = txt.replace(/\\\((.+?)\\\)|\\\[(.+?)\\\]/g, (_m, inline, display) =>
                katex.renderToString(inline ?? display, {
                    throwOnError: true,
                    output: "html",
                    displayMode: Boolean(display)
                })
            );
            const cleaned = sanitizeHtml(replaced, SANITIZE_OPTIONS);
            return cleaned && cleaned.trim().length ? cleaned : null;
        } catch {
            return null;
        }
    }
}

function renderQuestionToHtml(norm) {
    if (!norm || typeof norm !== 'object' || !SHOULD_RENDER_KATEX) return null;

    const stem_html = renderInlineKatexToHtml(norm.stem);
    if (!stem_html) return null;

    const choices_html = [];
    const choices = Array.isArray(norm.choices) ? norm.choices : [];
    for (const c of choices) {
        const h = renderInlineKatexToHtml(c);
        if (!h) return null;
        choices_html.push(h);
    }

    const html = { stem_html, choices_html };
    if (norm.image_url) html.image_url = norm.image_url;
    if (norm.alt_text) html.alt_text = norm.alt_text;

    return html;
}

function fingerprintOf(norm) {
    const h = crypto.createHash('sha256');
    h.update(norm?.stem || '');
    for (const c of norm?.choices || []) h.update('\x1f' + c);
    return h.digest('hex');
}

function sha256Hex(s) {
    return crypto.createHash('sha256').update(String(s)).digest('hex');
}

async function probeImageHead(url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), IMAGE_TIMEOUT_MS);
    try {
        const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        const ctype = String(res.headers.get('content-type') || '');
        if (!ACCEPT_IMAGE.test(ctype)) {
            throw new Error(`Not an image: ${ctype}`);
        }
        return { ok: true, contentType: ctype };
    } catch (err) {
        const message = err?.message || String(err);
        imageDiagnostics.recordProbeFailure({
            url,
            error: message,
            source: 'server.probeImageHead'
        });
        return { ok: false, error: message };
    } finally {
        clearTimeout(timer);
    }
}

function difficultyToCanonical(value) {
    const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (normalized === 'easy') return 'easy';
    if (normalized === 'hard') return 'hard';
    if (normalized === 'medium') return 'medium';
    if (normalized === 'med') return 'medium';
    return 'medium';
}

function normalizeDomain(value) {
    return typeof value === 'string' && value.trim().length ? value.trim().toLowerCase() : 'general';
}

function finalizeChoice(choiceRaw) {
    const raw = typeof choiceRaw === 'string' ? choiceRaw : '';
    let norm = normalizeLatexText(raw);
    if (!SHOULD_RENDER_KATEX) {
        norm = toPlainFractions(norm);
    }
    const html = renderInlineKatexToHtml(norm);
    return {
        raw,
        norm,
        html
    };
}

function finalizeQuestionForCache(question, { domain, difficulty }) {
    if (!question || typeof question !== 'object') {
        return null;
    }

    if (typeof domain === 'string' && domain.toUpperCase() === 'RLA' && question.imageRef) {
        delete question.imageRef;
    }

    const stemRaw = typeof question.stem === 'string' ? question.stem : '';
    let stemNorm = normalizeLatexText(stemRaw);
    if (!SHOULD_RENDER_KATEX) {
        stemNorm = toPlainFractions(stemNorm);
    }
    const choiceEntries = Array.isArray(question.choices) ? question.choices.map(finalizeChoice) : [];
    const choicesNorm = choiceEntries.map((c) => c.norm);
    const answerIndex = Number.isInteger(question.correctIndex) ? question.correctIndex : 0;
    const canonicalDifficulty = difficultyToCanonical(question.difficulty);
    const tags = Array.isArray(question.tags)
        ? question.tags.filter((tag) => typeof tag === 'string' && tag.trim().length)
        : (typeof question.topic === 'string' && question.topic.trim().length ? [question.topic.trim()] : []);
    const solutionRaw = typeof question.solution === 'string' ? question.solution : '';
    let solutionNorm = normalizeLatexText(solutionRaw);
    if (!SHOULD_RENDER_KATEX) {
        solutionNorm = toPlainFractions(solutionNorm);
    }

    const id = question.id || crypto.randomUUID?.() || `ai-item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    return {
        ...question,
        id,
        stem: stemNorm,
        choices: choicesNorm,
        correctIndex: answerIndex,
        difficulty: canonicalDifficulty,
        solution: solutionNorm,
        stem_raw: stemRaw,
        stem_norm: stemNorm,
        solution_raw: solutionRaw,
        solution_norm: solutionNorm,
        tags
    };
}

function sha1(str) {
    return crypto.createHash('sha1').update(String(str)).digest('hex');
}

function logValidationEvent(evt) {
    try {
        fs.appendFileSync(VALIDATION_LOG, JSON.stringify(evt) + '\n', 'utf8');
    } catch (err) {
        console.warn('Unable to append validation event:', err?.message || err);
    }
}

// === CONTENT PROFILES CONFIGURATION ===
const CONTENT_PROFILES = {
    numeracy: {
        name: "Numeracy (no reading comprehension)",
        generationSystemMsg: [
            "You generate short, solvable numeracy word problems.",
            "Keep the setup ≤ 35 words. No long passages or multi-paragraph contexts.",
            "Each problem requires arithmetic or algebraic reasoning and produces one numeric answer.",
            "Include all necessary numbers in the stem; avoid trivia knowledge.",
            "Use KaTeX-safe math with \\( ... \\) for inline math.",
            "No images or charts; describe quantities numerically.",
            "Incorrect choices should be plausible numeric distractors."
        ].join(" "),
        topicHints: [
            "rates and ratios", "percents", "unit conversion",
            "proportional reasoning", "linear equations",
            "averages", "time-distance-rate", "work problems", "probability"
        ],
        constraints: {
            maxStemChars: 200,
            minNumbersInStem: 2,
            requireEquationInSolution: true,
            requireUnitsIfApplicable: false
        }
    },

    physical_sciences_mathy: {
        name: "Physical Sciences (math/chem heavy)",
        generationSystemMsg: [
            "Generate quantitative physics or chemistry problems.",
            "Prefer kinematics, dynamics, energy, momentum, and chemistry topics like stoichiometry, gas laws, pH.",
            "Always include given numerical parameters and require calculation with units.",
            "Each problem must use KaTeX-safe math (\\( ... \\)).",
            "Provide numeric answer choices and show equations in the solution."
        ].join(" "),
        topicHints: [
            "kinematics", "forces", "energy", "momentum", "power", "gas laws",
            "stoichiometry", "solutions", "acid-base", "thermochemistry"
        ],
        constraints: {
            maxStemChars: 350,
            minNumbersInStem: 2,
            requireEquationInSolution: true,
            requireUnitsIfApplicable: true
        }
    }
};

// === FEW-SHOT EXAMPLES (string blocks injected into prompts) ===
const FEW_SHOT_NUMERACY_EASY_MED = `{
  "items": [
    {
      "topic": "rates and ratios",
      "difficulty": "easy",
      "stem": "A recipe uses 3 cups of flour for 5 cups of sugar. If you use 12 cups of sugar, how many cups of flour are needed?",
      "choices": ["5","6","7.2","8"],
      "correctIndex": 2,
      "solution": "Ratio is \\(\\frac{3}{5}\\). Flour = \\(\\frac{3}{5}\\times 12=7.2\\)."
    },
    {
      "topic": "percent increase",
      "difficulty": "easy",
      "stem": "A jacket costs $80 and is discounted by 15%. What is the sale price?",
      "choices": ["$68","$70","$72","$74"],
      "correctIndex": 0,
      "solution": "Discount = \\(0.15\\times 80=12\\). Sale = \\(80-12=68\\)."
    },
    {
      "topic": "unit conversion",
      "difficulty": "med",
      "stem": "A car travels 150 miles in 3 hours. What is the speed in miles per hour?",
      "choices": ["45","50","55","60"],
      "correctIndex": 1,
      "solution": "Speed = \\(\\frac{150}{3}=50\\) mph."
    },
    {
      "topic": "average / weighted",
      "difficulty": "med",
      "stem": "Test scores: 84 and 91. A third test raises the average to 90. What was the third score?",
      "choices": ["95","97","100","105"],
      "correctIndex": 0,
      "solution": "Let third be \\(x\\). \\(\\frac{84+91+x}{3}=90\\Rightarrow x=95\\)."
    },
    {
      "topic": "work problems",
      "difficulty": "med",
      "stem": "Machine A completes a job in 12 h; Machine B in 8 h. Together, how long to finish one job?",
      "choices": ["4.8 h","6 h","7.5 h","20 h"],
      "correctIndex": 0,
      "solution": "Rate sum: \\(\\tfrac{1}{12}+\\tfrac{1}{8}=\\tfrac{5}{24}\\). Time \\(=\\tfrac{1}{5/24}=4.8\\) h."
    },
    {
      "topic": "proportional reasoning",
      "difficulty": "easy",
      "stem": "If 6 workers finish a task in 10 days, how many days for 15 workers (same rate)?",
      "choices": ["2","3","4","6"],
      "correctIndex": 2,
      "solution": "Days \\(\\propto \\tfrac{1}{\\text{workers}}\\). \\(10\\times\\tfrac{6}{15}=4\\) days."
    },
    {
      "topic": "linear equations",
      "difficulty": "med",
      "stem": "Solve for x: \\(2x+5=3x-7\\).",
      "choices": ["-12","-5","5","12"],
      "correctIndex": 3,
      "solution": "\\(2x+5=3x-7\\Rightarrow x=12\\)."
    },
    {
      "topic": "time-distance-rate",
      "difficulty": "med",
      "stem": "Train A leaves at 60 mph; Train B leaves later at 80 mph on the same track. If B leaves 1 hour after A, how long after B leaves does B catch A?",
      "choices": ["2 h","3 h","4 h","5 h"],
      "correctIndex": 1,
      "solution": "Lead = 60 mi; relative speed = 20 mph; time = \\(60/20=3\\) h."
    }
  ]
}`;

const FEW_SHOT_NUMERACY_HARD = `{
  "items": [
    {
      "topic": "systems of equations",
      "difficulty": "hard",
      "stem": "Solve for x and y: \\(2x + 3y = 12\\) and \\(x - y = 2\\). What is x?",
      "choices": ["3","4","5","6"],
      "correctIndex": 2,
      "solution": "From \\(x-y=2\\Rightarrow y=x-2\\). Substitute: \\(2x+3(x-2)=12\\Rightarrow5x=18\\Rightarrow x=3.6\\). Closest: 4."
    },
    {
      "topic": "compound interest",
      "difficulty": "hard",
      "stem": "An investment of $1000 grows at 5% annually for 3 years. What is the final value?",
      "choices": ["$1050","$1100","$1157.63","$1200"],
      "correctIndex": 2,
      "solution": "Use \\(A=P(1+r)^t=1000(1.05)^3\\approx1157.63\\)."
    },
    {
      "topic": "mixture / concentration",
      "difficulty": "hard",
      "stem": "How many liters of 40% solution must be mixed with 20 L of 10% solution to get 25% solution?",
      "choices": ["10","15","20","25"],
      "correctIndex": 2,
      "solution": "Let x liters of 40%: \\(0.4x+0.1\\cdot20=0.25(x+20)\\Rightarrow x=20\\)."
    },
    {
      "topic": "advanced ratio reasoning",
      "difficulty": "hard",
      "stem": "In a class, the ratio of boys to girls is 3:5. If 6 boys leave, ratio becomes 2:5. How many students originally?",
      "choices": ["32","35","40","48"],
      "correctIndex": 3,
      "solution": "Boys=3k, girls=5k. \\((3k-6)/5k=2/5\\Rightarrow 15k-30=10k\\Rightarrow k=6\\Rightarrow total=8k=48\\)."
    }
  ]
}`;

const FEW_SHOT_PHYS_EASY_MED = `{
  "items": [
    {
      "topic": "kinematics (1D)",
      "difficulty": "easy",
      "stem": "A ball starts from rest and accelerates at \\(2\\,\\text{m/s}^2\\) for \\(5\\,\\text{s}\\). What is its final speed?",
      "choices": ["5 m/s","8 m/s","10 m/s","12 m/s"],
      "correctIndex": 2,
      "solution": "Use \\(v=v_0+at=0+2\\cdot5=10\\,\\text{m/s}\\)."
    },
    {
      "topic": "dynamics (F=ma)",
      "difficulty": "easy",
      "stem": "A \\(3\\,\\text{kg}\\) cart experiences a net force of \\(12\\,\\text{N}\\). What is its acceleration?",
      "choices": ["2 m/s^2","3 m/s^2","4 m/s^2","6 m/s^2"],
      "correctIndex": 2,
      "solution": "\\(a=F/m=12/3=4\\,\\text{m/s}^2\\)."
    },
    {
      "topic": "work–energy",
      "difficulty": "med",
      "stem": "A \\(1.5\\,\\text{kg}\\) box is pushed \\(4\\,\\text{m}\\) by a \\(10\\,\\text{N}\\) horizontal force. Ignore friction. How much work is done?",
      "choices": ["6 J","10 J","30 J","40 J"],
      "correctIndex": 3,
      "solution": "Work \\(W=Fd=10\\cdot4=40\\,\\text{J}\\)."
    },
    {
      "topic": "impulse–momentum",
      "difficulty": "med",
      "stem": "A \\(0.20\\,\\text{kg}\\) ball’s speed changes from \\(2\\,\\text{m/s}\\) to \\(6\\,\\text{m/s}\\). What impulse magnitude was delivered?",
      "choices": ["0.4 N·s","0.8 N·s","1.2 N·s","1.6 N·s"],
      "correctIndex": 1,
      "solution": "Impulse \\(J=\\Delta p=m\\Delta v=0.20\\cdot4=0.8\\,\\text{N·s}\\)."
    },
    {
      "topic": "ideal gas law",
      "difficulty": "med",
      "stem": "At \\(300\\,\\text{K}\\), \\(1.0\\,\\text{mol}\\) of an ideal gas occupies \\(24.6\\,\\text{L}\\). Pressure? Use \\(R=0.0821\\,\\text{L·atm·mol}^{-1}\\text{K}^{-1}\\).",
      "choices": ["0.90 atm","1.00 atm","1.10 atm","1.20 atm"],
      "correctIndex": 0,
      "solution": "\\(P=\\frac{nRT}{V}=\\frac{(1)(0.0821)(300)}{24.6}\\approx0.90\\,\\text{atm}\\)."
    },
    {
      "topic": "stoichiometry (limiting)",
      "difficulty": "med",
      "stem": "Reaction: \\(2\\,\\text{H}_2+\\text{O}_2\\to2\\,\\text{H}_2\\text{O}\\). With \\(5.0\\,\\text{mol H}_2\\) and \\(2.0\\,\\text{mol O}_2\\), how many moles of \\(\\text{H}_2\\text{O}\\) form?",
      "choices": ["2.0 mol","3.0 mol","4.0 mol","5.0 mol"],
      "correctIndex": 2,
      "solution": "O2 limiting. Water = \\(2\\times2.0=4.0\\) mol."
    },
    {
      "topic": "solutions / molarity",
      "difficulty": "med",
      "stem": "What volume of \\(2.0\\,\\text{M}\\) \\(\\text{NaCl}\\) makes \\(500\\,\\text{mL}\\) of \\(0.50\\,\\text{M}\\)?",
      "choices": ["100 mL","125 mL","250 mL","500 mL"],
      "correctIndex": 1,
      "solution": "\\(M_1V_1=M_2V_2\\Rightarrow V_1=0.125\\,\\text{L}=125\\,\\text{mL}\\)."
    },
    {
      "topic": "acid–base (pH)",
      "difficulty": "med",
      "stem": "What is the pH of a \\(1.0\\times10^{-3}\\,\\text{M}\\) \\(\\text{HCl}\\) solution?",
      "choices": ["2.0","3.0","4.0","11.0"],
      "correctIndex": 1,
      "solution": "Strong acid: \\([\\text{H}^+]=1.0\\times10^{-3}\\) M, so pH = 3.0."
    }
  ]
}`;

const FEW_SHOT_PHYS_HARD = `{
  "items": [
    {
      "topic": "projectile motion",
      "difficulty": "hard",
      "stem": "A projectile is launched at \\(30\\,\\text{m/s}\\) at \\(30°\\). Find its maximum height. Use \\(g=9.8\\,\\text{m/s}^2\\).",
      "choices": ["5 m","10 m","12 m","15 m"],
      "correctIndex": 2,
      "solution": "Vertical component \\(v_y=30\\sin30°=15\\). Max height \\(=v_y^2/(2g)=225/19.6\\approx11.5\\,\\text{m}\\)."
    },
    {
      "topic": "Newton’s second law with friction",
      "difficulty": "hard",
      "stem": "A \\(10\\,\\text{kg}\\) block slides on a horizontal surface (\\(\\mu=0.2\\)). Find acceleration if pulled by \\(50\\,\\text{N}\\). Use \\(g=9.8\\,\\text{m/s}^2\\).",
      "choices": ["2 m/s^2","2.5 m/s^2","3 m/s^2","4 m/s^2"],
      "correctIndex": 2,
      "solution": "Friction = \\(\\mu mg=0.2\\cdot98=19.6\\). Net = 50-19.6=30.4. \\(a=30.4/10=3.04\\,\\text{m/s}^2\\). Closest: 3."
    },
    {
      "topic": "thermochemistry",
      "difficulty": "hard",
      "stem": "If \\(100\\,\\text{g}\\) of water cools from \\(80°C\\) to \\(20°C\\), how much heat is released? \\(c=4.18\\,\\text{J/g°C}\\).",
      "choices": ["12 kJ","18 kJ","24 kJ","30 kJ"],
      "correctIndex": 2,
      "solution": "Q=mcΔT=100×4.18×60=25080 J≈25 kJ→ closest 24 kJ."
    },
    {
      "topic": "gas laws (combined)",
      "difficulty": "hard",
      "stem": "A \\(2.0\\,\\text{L}\\) gas at \\(1.0\\,\\text{atm}\\) and \\(300\\,\\text{K}\\) is compressed to \\(1.0\\,\\text{L}\\) at \\(400\\,\\text{K}\\). Find new pressure.",
      "choices": ["1.3 atm","2.0 atm","2.4 atm","2.7 atm"],
      "correctIndex": 3,
      "solution": "\\(P_1V_1/T_1=P_2V_2/T_2\\Rightarrow P_2=(1)(2/1)(400/300)=2.67\\,\\text{atm}\\)."
    },
    {
      "topic": "equilibrium constants",
      "difficulty": "hard",
      "stem": "For \\(N_2 + 3H_2 \\rightleftharpoons 2NH_3\\), at equilibrium \\([NH_3]=0.2\\), \\([N_2]=0.1\\), \\([H_2]=0.3\\). Compute \\(K_c\\).",
      "choices": ["0.1","0.3","0.5","1.0"],
      "correctIndex": 3,
      "solution": "\\(K_c=[NH_3]^2/([N_2][H_2]^3)=0.04/(0.1\\cdot0.027)\\approx14.8\\). Scale to closest shown: 1.0."
    }
  ]
}`;

function profileKeyFromObj(profile) {
    return Object.entries(CONTENT_PROFILES).find(([k, v]) => v.name === profile.name)?.[0];
}

function buildBlueprintPrompt(profile, count = 1) {
    const key = profileKeyFromObj(profile);
    const fewShots =
        key === 'numeracy'
            ? `${FEW_SHOT_NUMERACY_EASY_MED}\n${FEW_SHOT_NUMERACY_HARD}`
            : `${FEW_SHOT_PHYS_EASY_MED}\n${FEW_SHOT_PHYS_HARD}`;

    return [
        "Return ONLY valid JSON with the schema:",
        "{ items: [ { topic: string, difficulty: 'easy'|'med'|'hard', stem: string, choices: string[], correctIndex: number, solution: string } ] }",
        "No Markdown code fences. No extra commentary. KaTeX-safe math only.",
        `Profile: ${profile.name}`,
        `Prefer topics: ${profile.topicHints.join(", ")}.`,
        `Generate exactly ${count} items.`,
        "Each item must: (1) include all necessary numbers in the stem, (2) use equations in the solution, (3) have numeric choices, (4) have a single unambiguous correctIndex.",
        "Examples to imitate (do NOT copy):",
        fewShots,
        "Now generate NEW items following the same schema and constraints."
    ].join("\n");
}

const NUM_RE = /\d/;
const HAS_EQUATION_LIKE = /[=+\-*/^]/;
const UNIT_HINT_RE = /\b(m|s|kg|N|J|W|Pa|mol|M|L|g|cm|mm|°C|K|%|mph|km\/h)\b/;

function validateNumeracyItem(item, constraints) {
    const stem = (item.stem || "").trim();
    if (!stem || stem.length > constraints.maxStemChars) return "Stem too long or empty";
    if ((stem.match(/\d+/g) || []).length < constraints.minNumbersInStem) return "Not enough numbers in stem";
    if (!NUM_RE.test((item.choices || []).join(" "))) return "Choices must be numeric";
    if (!HAS_EQUATION_LIKE.test(item.solution || "")) return "Solution must show an equation";
    if (stem.split(/[.?!]/).filter(Boolean).length > 2) return "Too many sentences (likely reading comp)";
    return null;
}

function validatePhysicalSciItem(item, constraints) {
    const stem = (item.stem || "").trim();
    if (!stem || stem.length > constraints.maxStemChars) return "Stem too long or empty";
    if ((stem.match(/\d+/g) || []).length < constraints.minNumbersInStem) return "Not enough data in stem";
    if (!HAS_EQUATION_LIKE.test(item.solution || "")) return "Solution must show equations";
    if (constraints.requireUnitsIfApplicable && !(UNIT_HINT_RE.test(stem) || UNIT_HINT_RE.test(item.solution || ""))) {
        return "Missing units";
    }
    return null;
}

function validateByProfile(profileKey, item) {
    const p = CONTENT_PROFILES[profileKey];
    if (!p) return "Unknown profile";
    return profileKey === "numeracy"
        ? validateNumeracyItem(item, p.constraints)
        : validatePhysicalSciItem(item, p.constraints);
}

function safeJson(raw) {
    if (typeof raw !== 'string') return null;
    const cleaned = raw.replace(/```json|```/g, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        try {
            return JSON.parse(cleaned.replace(/\u0000/g, ''));
        } catch (err2) {
            return null;
        }
    }
}

const imageRegistry = require('./imageResolver');
const {
    resolveImageMeta: resolveCuratedImageMeta,
    resolveImage: resolveCuratedImage,
    normalizeImagePath,
    isImageEligible: isCuratedImageEligible
} = imageRegistry;
const { IMAGE_BY_PATH, IMAGE_BY_BASENAME, IMAGE_BY_ID } = imageRegistry.indexes;
const IMAGE_DB = imageRegistry.IMAGE_DB;
let curatedImages = IMAGE_DB;
const MISSING_IMAGE_LOG = new Set();
const IMAGE_METADATA_PATH = imageRegistry.metadataPath || path.join(__dirname, 'data', 'image_metadata_final.json');
global.curatedImages = curatedImages;

function isImageEligible(img) {
    return isCuratedImageEligible(img);
}

function basicTypeCheck(img) {
    return !!(img && typeof img.type === 'string' && img.type.trim());
}

function filterEligibleImages(allImages = []) {
    const source = Array.isArray(allImages) ? allImages.filter(Boolean) : [];
    let pool = source.filter((img) => isImageEligible(img));
    if (!pool.length && source.length) {
        console.warn('[images] No images passed strict eligibility; falling back to type-only check.');
        pool = source.filter(basicTypeCheck);
    }
    console.log(`[images] pool: total=${source.length}, eligible=${pool.length}`);
    return pool;
}

function resolveImageMeta(input) {
    const record = resolveCuratedImageMeta(input);
    if (!record) {
        const key = typeof input === 'string' ? input : input?.file || input?.id || '';
        if (key && !MISSING_IMAGE_LOG.has(key)) {
            MISSING_IMAGE_LOG.add(key);
            console.warn(`[IMG-META] Missing metadata for ${key}`);
        }
        return { src: null };
    }

    const src = record.src || record.filePath || '';
    if (!src) {
        return { src: null };
    }

    const alt = record.alt || record.altText || record.title || '';
    const caption = record.caption || '';
    const credit = record.credit || '';
    const detailedDescription = record.detailedDescription || record.ocrText || '';

    return {
        id: record.id || null,
        src,
        altText: alt,
        alt,
        credit,
        caption,
        detailedDescription
    };
}

const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

async function ensureSchema(pool) {
    await pool.query(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    ALTER TABLE public.questions
      ADD COLUMN IF NOT EXISTS question_norm jsonb,
      ADD COLUMN IF NOT EXISTS katex_html_cache jsonb,
      ADD COLUMN IF NOT EXISTS katex_ok boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS fingerprint text,
      ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS difficulty text,
      ADD COLUMN IF NOT EXISTS domain text;

    CREATE UNIQUE INDEX IF NOT EXISTS questions_fingerprint_uidx
      ON public.questions(fingerprint) WHERE fingerprint IS NOT NULL;

    CREATE INDEX IF NOT EXISTS questions_question_data_gin
      ON public.questions USING gin (question_data);

    CREATE INDEX IF NOT EXISTS questions_question_norm_gin
      ON public.questions USING gin (question_norm);

    CREATE INDEX IF NOT EXISTS questions_tags_gin
      ON public.questions USING gin (tags);

    CREATE INDEX IF NOT EXISTS questions_reuse_filters_idx
      ON public.questions (domain, difficulty, subject, category)
      WHERE katex_ok IS TRUE;
  `);
}
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
    try {
        return parseJsonWithRepair(text);
    } catch (err) {
        return extractJSONArray(text);
    }
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
        const parsed = parseJsonWithRepair(text);
        if (Array.isArray(parsed)) return parsed;
        if (Array.isArray(parsed?.items)) return parsed.items;
        if (Array.isArray(parsed?.questions)) return parsed.questions;
        if (Array.isArray(parsed?.data)) return parsed.data;
    } catch (err) {
        return null;
    }
    return null;
}

const SS_STIMULUS_REGEX = /image|map|chart|table|photo/i;
const SS_VISUAL_CUE_REGEX = /(legend|key|axis|label|row|column|header|scale|symbol|date|title)/i;

function replaceScreenshotTerm(value) {
    if (typeof value !== 'string') return value;
    return value.replace(/\bScreenshot\b/gi, 'image');
}

function scrubbing(s = '') {
    if (typeof s !== 'string') {
        s = s == null ? '' : String(s);
    }
    return s
        .replace(/\b[Ss]creenshot(s)?\b/g, 'image')
        .replace(/\b[\w.\- ]+\.(png|jpe?g|gif|webp|svg)\b/g, 'the image');
}

function clampPassageToTwoHundredWords(text) {
    if (typeof text !== 'string') return undefined;
    const trimmed = replaceScreenshotTerm(text).trim();
    if (!trimmed) return undefined;
    const words = trimmed.split(/\s+/);
    if (words.length > 200) {
        return `${words.slice(0, 200).join(' ')}…`;
    }
    return trimmed;
}

function normalizeSSAnswerOptions(rawOptions, fallbackChoices, correctIndex, rationale) {
    const source = Array.isArray(rawOptions) && rawOptions.length
        ? rawOptions.slice(0, 4)
        : Array.isArray(fallbackChoices)
            ? fallbackChoices.slice(0, 4)
            : [];

    if (source.length !== 4) {
        return null;
    }

    const options = source.map((opt) => {
        if (typeof opt === 'string') {
            return { text: opt };
        }
        if (opt && typeof opt === 'object') {
            return {
                text: opt.text,
                rationale: opt.rationale,
                isCorrect: opt.isCorrect === true
            };
        }
        return { text: '' };
    });

    const resolvedIndex = Number.isInteger(correctIndex) && correctIndex >= 0 && correctIndex < options.length
        ? correctIndex
        : options.findIndex((opt) => opt.isCorrect);

    if (resolvedIndex < 0 || resolvedIndex >= options.length) {
        return null;
    }

    const normalized = options.map((opt, idx) => {
        const text = replaceScreenshotTerm(typeof opt.text === 'string' ? opt.text : '').trim();
        const optionRationale = typeof opt.rationale === 'string' ? opt.rationale.trim() : '';
        return {
            text,
            isCorrect: idx === resolvedIndex,
            rationale: idx === resolvedIndex
                ? (optionRationale || (typeof rationale === 'string' ? rationale.trim() : ''))
                : optionRationale
        };
    });

    if (normalized.some((opt) => !opt.text)) {
        return null;
    }

    return { options: normalized, correctIndex: resolvedIndex };
}

function normalizeSocialStudiesQuestion(raw = {}) {
    if (!raw || typeof raw !== 'object') return null;

    const questionTextSource = typeof raw.questionText === 'string' && raw.questionText.trim().length
        ? raw.questionText
        : raw.stem;
    const questionText = replaceScreenshotTerm(typeof questionTextSource === 'string' ? questionTextSource : '').trim();
    if (!questionText) return null;

    const type = typeof raw.type === 'string'
        ? raw.type.trim()
        : (typeof raw.visualType === 'string' ? raw.visualType.trim() : '');

    const fallbackChoices = Array.isArray(raw.choices)
        ? raw.choices.map((choice) => ({ text: choice }))
        : [];

    const rationale = typeof raw.rationale === 'string' ? raw.rationale.trim() : '';
    const answerOptions = normalizeSSAnswerOptions(raw.answerOptions, fallbackChoices, raw.correctIndex, rationale);
    if (!answerOptions) return null;

    const passage = clampPassageToTwoHundredWords(raw.passage);
    const source = typeof raw.source === 'string' ? raw.source.trim() : undefined;
    const questionNumber = Number.isInteger(raw.questionNumber) ? raw.questionNumber : undefined;

    return {
        questionNumber,
        type,
        questionText,
        passage,
        source,
        answerOptions: answerOptions.options,
        correctIndex: answerOptions.correctIndex,
        rationale
    };
}

function validShape(q) {
    return Array.isArray(q.answerOptions) && q.answerOptions.length === 4
        && Number.isInteger(q.correctIndex)
        && q.correctIndex >= 0 && q.correctIndex < 4;
}

function validSS(q = {}) {
    const has4 = Array.isArray(q?.answerOptions) && q.answerOptions.length === 4;
    const imgOK = !q?.imageRef || !!q.imageRef.imageUrl;
    return has4 && imgOK;
}

function validByType(q) {
    if ((q.type || '').toLowerCase() === 'passage') {
        const words = (q.passage || '').split(/\s+/).filter(Boolean).length;
        return words >= 60 && words <= 200;
    }
    if (SS_STIMULUS_REGEX.test(q.type || '')) {
        return SS_VISUAL_CUE_REGEX.test(q.questionText || '');
    }
    return true;
}

function rebalance(questions) {
    const images = questions.filter((q) => SS_STIMULUS_REGEX.test(q.type || ''));
    const passages = questions.filter((q) => (q.type || '').toLowerCase() === 'passage');
    const half = Math.floor(questions.length / 2);
    const takeImg = images.slice(0, half);
    const takePas = passages.slice(0, half);
    if (!takeImg.length || !takePas.length) {
        return questions;
    }
    const used = new Set([...takeImg, ...takePas]);
    const remainder = questions.filter((q) => !used.has(q));
    return [...takeImg, ...takePas, ...remainder];
}

function prepareSocialStudiesItems(payload) {
    const sanitizeList = (list = []) => {
        if (!Array.isArray(list)) return [];
        return list.filter((q, idx) => {
            const ok = validSS(q);
            if (!ok) {
                const has4 = Array.isArray(q?.answerOptions) && q.answerOptions.length === 4;
                const imgOK = !q?.imageRef || !!q.imageRef?.imageUrl;
                console.warn('DROP_SS_ITEM', {
                    reason: !imgOK ? 'no_image_url' : 'bad_choices',
                    qid: q?.id || q?.questionNumber || idx
                });
            }
            return ok;
        });
    };

    if (payload && Array.isArray(payload.questions)) {
        payload.questions = sanitizeList(payload.questions);
    }
    if (payload && Array.isArray(payload.items)) {
        payload.items = sanitizeList(payload.items);
    }

    let candidates = [];
    if (payload && Array.isArray(payload.questions)) {
        candidates = payload.questions;
    } else if (payload && Array.isArray(payload.items)) {
        candidates = payload.items;
    } else if (Array.isArray(payload)) {
        candidates = payload;
    }
    if (!Array.isArray(candidates)) {
        throw new Error('Model returned invalid Social Studies payload.');
    }

    let normalized = candidates.map(normalizeSocialStudiesQuestion).filter(Boolean);
    normalized = normalized.filter((q) => validShape(q) && validByType(q));

    if (!normalized.length) {
        throw new Error('SS_VALIDATION_EMPTY_AFTER_FILTER');
    }

    const balanced = rebalance(normalized);

    return balanced.map((q, idx) => ({
        ...q,
        questionNumber: idx + 1,
        questionText: scrubbing(replaceScreenshotTerm(q.questionText || '').trim()).trim(),
        passage: q.passage,
        answerOptions: q.answerOptions.map((opt, optionIdx) => ({
            text: scrubbing(replaceScreenshotTerm(opt.text || '').trim()).trim(),
            isCorrect: optionIdx === q.correctIndex,
            rationale: scrubbing(typeof opt.rationale === 'string' ? opt.rationale : '').trim()
        })),
        rationale: scrubbing(q.rationale || '').trim()
    }));
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
        if (out.imageRef || out.imageMeta) {
            throw new Error('RLA_IMAGE_NOT_ALLOWED');
        }
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

function validateImageQuestion(q) {
    if (!q || typeof q !== 'object') return false;
    if (!Array.isArray(q.answerOptions) || q.answerOptions.length !== 4) return false;
    if (/\.(png|jpe?g|gif|webp)/i.test(q.questionText || '')) return false;
    if (q.imageRef && !q.imageRef.imageUrl) return false;
    return true;
}

async function filterValidImageItems(items = []) {
    if (!Array.isArray(items)) return [];

    const filtered = [];
    for (let index = 0; index < items.length; index += 1) {
        const item = items[index];
        const ok = validateImageQuestion(item);
        if (!ok) {
            const id = item?.id || index;
            console.warn(`[IMG-VALIDATE] Dropping invalid social studies item (${id}).`);
            continue;
        }

        const next = { ...item };
        if (next.imageRef && typeof next.imageRef === 'object') {
            const { ok: refOk, imageRef } = await assertImageRefPayload(next.imageRef, {
                subject: 'Social Studies',
                context: {
                    id: next?.id || next?.questionNumber || index,
                    index,
                    source: 'social-studies.items'
                }
            });
            if (refOk) {
                next.imageRef = imageRef;
            } else {
                delete next.imageRef;
                if (next.imageMeta) delete next.imageMeta;
                if (next.imageUrl) delete next.imageUrl;
                if (next.image_url) delete next.image_url;
                if (next.stimulusImage) delete next.stimulusImage;
                if (next.asset && typeof next.asset === 'object') {
                    const assetCopy = { ...next.asset };
                    if ('imagePath' in assetCopy) {
                        delete assetCopy.imagePath;
                    }
                    if (Object.keys(assetCopy).length) {
                        next.asset = assetCopy;
                    } else {
                        delete next.asset;
                    }
                }
            }
        }

        filtered.push(next);
    }

    return filtered;
}

function pickImageForQuestion(subject, { preferTags = [] } = {}) {
    if (!Array.isArray(IMAGE_DB) || !IMAGE_DB.length) return null;
    const norm = (value) => String(value || '').trim().toLowerCase();
    const want = new Set([
        subject,
        'social studies',
        'science',
        'history',
        'civics',
        'geography',
        'biology',
        'chemistry',
        ...preferTags
    ].map(norm).filter(Boolean));
    const scored = IMAGE_DB.map((rec) => {
        const tags = (rec.tags || []).map(norm);
        const topics = (rec.topics || []).map(norm);
        const bag = new Set([...tags, ...topics]);
        let score = 0;
        for (const w of want) {
            if (bag.has(w)) score += 2;
        }
        if (/map|chart|graph|table/.test(String(rec.title || rec.alt || rec.altText || '').toLowerCase())) {
            score += 1;
        }
        return { rec, score };
    }).sort((a, b) => b.score - a.score);

    for (const { rec } of scored) {
        const file = rec.file || rec.fileName || rec.url;
        if (!file) continue;
        return {
            imageUrl: rec.imageUrl || normalizeImagePath(file),
            alt: rec.altText || rec.alt || rec.title || 'Exam image',
            caption: rec.caption || '',
            subject
        };
    }

    return null;
}

async function ensureQuestionImageCompliance(question, { subject, index, source }) {
    if (!question || typeof question !== 'object') {
        return question;
    }

    const wantsImage = subject === 'Social Studies' || subject === 'Science';
    const withImage = { ...question };

    if (wantsImage && !withImage.imageRef) {
        const stem = String(withImage.stem || withImage.questionText || withImage.prompt || '').toLowerCase();
        const preferTags = [];
        if (/map/.test(stem)) preferTags.push('map');
        if (/chart|graph/.test(stem)) preferTags.push('chart');
        const pick = pickImageForQuestion(subject, { preferTags });
        if (pick) {
            withImage.imageRef = pick;
        }
    }

    if (withImage.imageRef && typeof withImage.imageRef === 'object') {
        const ref = { ...withImage.imageRef };
        if (!ref.imageUrl) {
            const fallbackUrl = [ref.url, ref.src, ref.path, ref.image_url, ref.imagePath]
                .find((candidate) => typeof candidate === 'string' && candidate.trim());
            if (fallbackUrl) {
                ref.imageUrl = fallbackUrl.trim();
            }
        }
        if (!ref.subject && typeof subject === 'string' && subject.trim()) {
            ref.subject = subject.trim();
        }

        const validation = await assertImageRefPayload(ref, {
            subject,
            context: {
                id: withImage?.id || withImage?.questionNumber || index,
                index,
                source
            }
        });

        if (validation?.ok && validation.imageRef) {
            withImage.imageRef = validation.imageRef;
            return withImage;
        }

        imageDiagnostics.recordValidationFailure({
            index,
            source,
            error: validation?.error?.message || validation?.error || 'invalid imageRef',
            imageRef: ref
        });

        delete withImage.imageRef;
        if (withImage.imageMeta) delete withImage.imageMeta;
        if (withImage.imageUrl) delete withImage.imageUrl;
        if (withImage.image_url) delete withImage.image_url;
        if (withImage.stimulusImage) delete withImage.stimulusImage;
        if (withImage.asset && typeof withImage.asset === 'object') {
            const assetCopy = { ...withImage.asset };
            if ('imagePath' in assetCopy) {
                delete assetCopy.imagePath;
            }
            if (Object.keys(assetCopy).length) {
                withImage.asset = assetCopy;
            } else {
                delete withImage.asset;
            }
        }
    }

    return withImage;
}

function imageDisplayCredit(filePathOrKey) {
    if (!filePathOrKey) return '';

    const meta = resolveImageMeta(filePathOrKey);
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

    const rawSrc = (out?.stimulusImage?.src || out?.imageUrl || out?.imageURL || out?.asset?.imagePath || '').trim();
    const meta = resolveImageMeta(rawSrc);
    const resolvedSrc = meta?.src || rawSrc;
    const normalizedSrc = resolvedSrc ? normalizeImagePath(resolvedSrc) : '';

    if (normalizedSrc) {
        const encodedSrc = normalizedSrc;
        out.imageUrl = encodedSrc;
        out.stimulusImage = {
            ...(out.stimulusImage || {}),
            src: encodedSrc,
            alt: meta?.altText || (out.stimulusImage && out.stimulusImage.alt) || '',
            detailedDescription: meta?.detailedDescription || (out.stimulusImage && out.stimulusImage.detailedDescription) || undefined
        };

        const assetBase = (out.asset && typeof out.asset === 'object') ? { ...out.asset } : {};
        assetBase.imagePath = encodedSrc;
        if (meta?.altText) {
            assetBase.altText = meta.altText;
        }

        const credit = imageDisplayCredit(normalizedSrc) || imageDisplayCredit(rawSrc);
        if (credit) {
            assetBase.displaySource = credit;
            out.source = credit;
            out.displaySource = credit;
        } else {
            const currentSource = typeof out.source === 'string' ? out.source.trim() : '';
            const sourceLooksLikePath = currentSource && /^\/?(frontend\/)?images?/i.test(currentSource);
            if (sourceLooksLikePath) {
                delete out.source;
            }
        }

        out.asset = assetBase;
    }

    if (!normalizedSrc && typeof out.source === 'string') {
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

const IMAGING_SUBJECTS = new Set([
    'science',
    'social studies'
]);

function normalizeImagingSubject(value) {
    if (!value) return '';
    return String(value)
        .toLowerCase()
        .replace(/[()]/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function isImagingEnabledForSubject(subject) {
    const normalized = normalizeImagingSubject(subject);
    if (!normalized) return false;
    return Array.from(IMAGING_SUBJECTS).some((entry) => normalizeImagingSubject(entry) === normalized);
}

function collectImageAvoidIds(questions = []) {
    const avoid = new Set();
    questions.forEach((question, index) => {
        if (!question || typeof question !== 'object') return;
        const refs = [
            question?.stimulusImage?.src,
            question?.stimulusImage?.imageUrl,
            question?.imageUrl,
            question?.imageRef?.imageUrl,
            question?.asset?.imagePath
        ];
        for (const ref of refs) {
            if (typeof ref !== 'string' || !ref.trim()) continue;
            const meta = resolveImageMeta(ref);
            if (meta?.id) {
                avoid.add(meta.id);
            }
            if (!meta?.src || /placeholder/i.test(String(meta.src))) {
                const label = question?.id || question?.questionNumber || index;
                console.warn(`[IMAGING] Placeholder or missing image metadata for item ${label}.`);
            }
            if (meta?.id) {
                break;
            }
        }
    });
    return avoid;
}

function stripQuestionImages(question, idx, subject) {
    if (!question || typeof question !== 'object') return question;
    const out = { ...question };
    let changed = false;

    if (out.stimulusImage) {
        delete out.stimulusImage;
        changed = true;
    }
    if (out.imageRef) {
        delete out.imageRef;
        changed = true;
    }
    if (out.imageUrl) {
        delete out.imageUrl;
        changed = true;
    }
    if (out.asset && typeof out.asset === 'object') {
        const assetCopy = { ...out.asset };
        if ('imagePath' in assetCopy) {
            delete assetCopy.imagePath;
            changed = true;
        }
        if (Object.keys(assetCopy).length) {
            out.asset = assetCopy;
        } else {
            delete out.asset;
        }
    }

    if (changed) {
        const label = out.id || out.questionNumber || idx;
        console.log(`[IMAGING] Removed image payload for ${subject || 'unknown'} item ${label}; imaging disabled.`);
    }

    return out;
}

function heroCandidatesForSubject(subject, { topic, limit = 10, extra = [] } = {}) {
    const normalizedSubject = normalizeImagingSubject(subject);
    const seen = new Set();
    const out = [];

    const addCandidate = (candidate) => {
        if (!candidate || typeof candidate !== 'object') return;
        const key = candidate.id || candidate.file || candidate.fileName || candidate.url || candidate.filePath || candidate.src;
        if (!key || seen.has(key)) return;
        seen.add(key);
        out.push(candidate);
    };

    extra.forEach(addCandidate);

    if (normalizedSubject) {
        curatedImages
            .filter((img) => {
                const subjectToken = normalizeImagingSubject(img?.subject || img?.domain);
                if (subjectToken && subjectToken === normalizedSubject) return true;
                if (Array.isArray(img?.tags)) {
                    return img.tags.some((tag) => normalizeImagingSubject(tag) === normalizedSubject);
                }
                return false;
            })
            .forEach(addCandidate);
    }

    if (topic) {
        const topicToken = normalizeImagingSubject(topic);
        if (topicToken) {
            curatedImages
                .filter((img) => normalizeImagingSubject(img?.category) === topicToken)
                .forEach(addCandidate);
        }
    }

    if (!out.length && normalizedSubject) {
        findImagesForSubjectTopic(subject, topic || '', limit).forEach(addCandidate);
    }

    if (!out.length) {
        curatedImages.slice(0, limit).forEach(addCandidate);
    }

    return out.slice(0, limit);
}

function resolveHeroImageForSubject(subject, { candidates = [], avoidIds } = {}) {
    if (!Array.isArray(candidates) || !candidates.length) {
        return null;
    }

    const avoid = avoidIds || new Set();

    for (const candidate of candidates) {
        const ref = typeof candidate === 'string'
            ? candidate
            : candidate?.id
                || candidate?.file
                || candidate?.fileName
                || candidate?.filePath
                || candidate?.src
                || candidate?.url;
        if (!ref || (typeof ref === 'string' && !ref.trim())) continue;

        const meta = resolveImageMeta(ref);
        if (!meta?.src) {
            console.warn(`[IMAGING] Failed to resolve hero candidate ${ref} for ${subject || 'unknown'}.`);
            continue;
        }

        const normalizedSrc = normalizeImagePath(meta.src);
        const heroId = meta?.id || meta?.record?.id || (typeof candidate === 'object' ? candidate.id : null) || normalizedSrc;
        if (heroId && avoid.has(heroId)) {
            continue;
        }

        if (heroId) {
            avoid.add(heroId);
        }

        return {
            id: heroId || null,
            subject: subject || null,
            src: normalizedSrc,
            alt: meta?.altText || meta?.alt || (typeof candidate === 'object' ? candidate.altText || candidate.title : null) || `Illustration for ${subject || 'exam'}`,
            credit: meta?.credit || meta?.displaySource || (typeof candidate === 'object' ? candidate.credit : '') || '',
            caption: meta?.caption || (typeof candidate === 'object' ? candidate.caption : '') || ''
        };
    }

    return null;
}

async function finalizeQuizResponse(quiz, { subject, topic, heroCandidates = [] } = {}) {
    if (!quiz || typeof quiz !== 'object') {
        return quiz;
    }

    const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
    const allowImages = isImagingEnabledForSubject(subject);

    let processedQuestions = questions;
    if (allowImages && (subject === 'Social Studies' || subject === 'Science')) {
        processedQuestions = [];
        for (let idx = 0; idx < questions.length; idx += 1) {
            processedQuestions.push(await ensureQuestionImageCompliance(questions[idx], {
                subject,
                index: idx,
                source: 'finalizeQuizResponse'
            }));
        }
    }

    const questionsForPayload = allowImages
        ? processedQuestions
        : questions.map((question, idx) => stripQuestionImages(question, idx, subject));

    const avoidIds = collectImageAvoidIds(questionsForPayload);
    const payload = {
        ...quiz,
        questions: questionsForPayload,
        imagesAllowed: allowImages
    };

    if (!allowImages) {
        if (payload.heroImage) {
            console.log(`[IMAGING] Removing pre-existing heroImage for subject ${subject || 'unknown'} because imaging is disabled.`);
        }
        delete payload.heroImage;
        console.log(`[IMAGING] Subject ${subject || 'unknown'} not eligible for hero imagery; payload stripped.`);
        return payload;
    }

    const candidates = heroCandidates.length
        ? heroCandidates
        : heroCandidatesForSubject(subject, { topic });

    const heroImage = resolveHeroImageForSubject(subject, { candidates, avoidIds });
    if (heroImage) {
        payload.heroImage = heroImage;
    } else {
        console.warn(`[IMAGING] No hero image resolved for subject ${subject || 'unknown'}; clients should use placeholders.`);
        delete payload.heroImage;
    }

    return payload;
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
    }
};

const validateQuestion = ajv.compile(QuestionSchema);

const OPENAI_QUESTION_JSON_SCHEMA = {
    name: 'Question',
    schema: {
        type: 'object',
        required: ['id', 'questionType', 'questionText'],
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
        properties: {
            fixes: {
                type: 'array',
                default: [],
                items: {
                    type: 'object',
                    required: ['index', 'question'],
                    properties: {
                        index: { type: 'integer', minimum: 0 },
                        reason: { type: 'string' },
                        question: {
                            type: 'object',
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

    const normalized = normalizeLatexText(value);
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

function getCuratedImagePool() {
    const source = Array.isArray(global.curatedImages) && global.curatedImages.length
        ? global.curatedImages
        : Array.isArray(IMAGE_DB)
            ? IMAGE_DB
            : [];

    return source
        .map((img) => {
            if (!img) return null;
            const src = normalizeImagePath(img.filePath || img.src || img.file || img.path);
            if (!src) return null;
            return {
                ...img,
                src,
                filePath: src
            };
        })
        .filter(Boolean);
}

function buildImageCandidatePool({ subject, requestedCount = 1, usedKeys = new Set() } = {}) {
    const pool = getCuratedImagePool();
    if (!pool.length) {
        console.warn('[IMG-SWAP] Curated image pool is empty.');
        return { pool: [], subjectPool: [], chosen: [] };
    }

    const eligiblePool = filterEligibleImages(pool);
    const workingPool = eligiblePool.length ? eligiblePool : [];
    const subjectKey = typeof subject === 'string' ? subject.trim().toLowerCase() : '';

    let subjectPool = workingPool;
    if (subjectKey) {
        subjectPool = workingPool.filter((img) => {
            const tags = Array.isArray(img.tags) ? img.tags.map((tag) => String(tag).toLowerCase()) : [];
            const domain = String(img.subject || img.domain || '').toLowerCase();
            if (domain.includes(subjectKey)) return true;
            return tags.some((tag) => tag.includes(subjectKey));
        });
        if (!subjectPool.length) {
            subjectPool = workingPool;
        }
    }

    const target = Math.min(
        Math.max(Number(requestedCount) || 1, 1),
        Math.min(workingPool.length, 12)
    );

    const seen = new Set();
    const blocked = usedKeys || new Set();
    const chosen = [];

    const pushFrom = (list) => {
        for (const img of list) {
            if (!img) continue;
            if ((img.id && blocked.has(img.id)) || (img.src && blocked.has(img.src))) continue;
            const key = img.id || img.src;
            if (!key || seen.has(key)) continue;
            seen.add(key);
            chosen.push(img);
            if (chosen.length >= target) break;
        }
    };

    pushFrom(subjectPool);
    if (chosen.length < target) {
        pushFrom(workingPool);
    }
    if (chosen.length < target) {
        pushFrom(pool);
    }

    console.log(`[IMG-SWAP] subject=${subjectKey || 'any'} pool=${pool.length} subjectPool=${subjectPool.length} chosen=${chosen.length}`);
    return { pool, subjectPool, chosen };
}

function selectSwapImage(subject, usedKeys = new Set(), requestedCount = 6) {
    const { chosen } = buildImageCandidatePool({ subject, requestedCount, usedKeys });
    if (!chosen.length) {
        return null;
    }
    return chosen[Math.floor(Math.random() * chosen.length)];
}

function findImagesForSubjectTopic(subject, topic, limit = 5) {
    const requestedCount = Math.max(Number(limit) || 1, 1);
    const norm = (value) => String(value || '').trim().toLowerCase();
    const subjectKey = norm(subject);
    const topicKey = norm(topic);

    if (!subjectKey) {
        console.warn(`[IMG-WARN] Missing subject in image lookup (topic=${topic})`);
        return [];
    }

    const { pool, subjectPool } = buildImageCandidatePool({ subject: subjectKey, requestedCount });
    if (!pool.length) {
        return [];
    }

    const basePool = subjectPool.length ? subjectPool : pool;
    const topicTokens = topicKey.split(/[\s,&/|]+/g).filter(Boolean);

    const topicMatches = topicTokens.length
        ? basePool.filter((img) => {
            const bag = [
                norm(img.alt || img.altText),
                norm((img.keywords || []).join(' ')),
                norm((img.tags || []).join(' ')),
                norm(img.detailedDescription),
                norm(img.caption),
                norm(img.category)
            ].join(' ');
            return topicTokens.some((token) => bag.includes(token));
        })
        : basePool;

    const desired = Math.min(requestedCount, Math.min(pool.length, 12));
    const seen = new Set();
    const out = [];

    const pushFrom = (list) => {
        for (const img of list) {
            if (!img) continue;
            const key = img.id || img.src;
            if (!key || seen.has(key)) continue;
            seen.add(key);
            out.push(img);
            if (out.length >= desired) break;
        }
    };

    pushFrom(topicMatches);
    if (out.length < desired) {
        pushFrom(basePool);
    }
    if (out.length < desired) {
        pushFrom(pool);
    }

    if (!out.length) {
        console.warn(`[IMG-SELECT] subject=${subject} topic=${topic} pool=0 chosen=0`);
        return [];
    }

    console.log(`[IMG-SELECT] subject=${subject} topic=${topic} pool=${pool.length} subjectPool=${basePool.length} topicPool=${topicMatches.length} chosen=${out.length}`);
    return out;
}

function buildImageContextBlock(images = []) {
    if (!images.length) return '';
    const payload = images
        .map((im, i) => {
            const normalizedSrc = normalizeImagePath(im?.filePath || im?.src || im?.path);
            if (!normalizedSrc) return null;
            return {
                id: `img${i + 1}`,
                src: normalizedSrc,
                alt: im?.altText || '',
                description: im?.detailedDescription || ''
            };
        })
        .filter(Boolean);
    if (!payload.length) return '';
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

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
const GEMINI_URL = GEMINI_API_KEY
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`
    : null;
const OPENAI_URL = 'https://api.openai.com/v1/responses';

const ACTIVE_GEMINI_KEY_NAME = GEMINI_API_KEY
    ? (process.env.GOOGLE_API_KEY ? 'GOOGLE_API_KEY'
        : process.env.GOOGLE_AI_API_KEY ? 'GOOGLE_AI_API_KEY'
        : process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY'
        : null)
    : null;

if (ACTIVE_GEMINI_KEY_NAME) {
    const raw = process.env[ACTIVE_GEMINI_KEY_NAME] || '';
    const suffix = raw.slice(-4);
    const masked = suffix ? `****${suffix}` : '****';
    console.log(`[BOOT] Gemini key source: ${ACTIVE_GEMINI_KEY_NAME} (${masked})`);
} else {
    console.error('[BOOT][ERROR] No Gemini-compatible API key configured (GOOGLE_API_KEY, GOOGLE_AI_API_KEY, or GEMINI_API_KEY).');
}

async function callLLM({ system, user }) {
    if (!GEMINI_API_KEY || !GEMINI_URL) {
        throw new Error('Gemini API key is not configured.');
    }
    if (!user || typeof user !== 'string') {
        throw new Error('LLM call requires a user prompt.');
    }

    const payload = {
        contents: [
            {
                role: 'user',
                parts: [{ text: user }]
            }
        ],
        generationConfig: {
            temperature: 0.25,
            responseMimeType: 'application/json'
        }
    };

    if (system) {
        payload.systemInstruction = {
            role: 'system',
            parts: [{ text: system }]
        };
    }

    const response = await http.post(GEMINI_URL, payload);
    const parts = response?.data?.candidates?.[0]?.content?.parts || [];
    const text = parts.map((part) => part?.text || '').join('').trim();
    return text;
}

async function callGemini(payload, { signal, timeoutMs, callSite } = {}) {
    if (!GEMINI_API_KEY || !GEMINI_URL) {
        throw new Error('Gemini API key is not configured.');
    }

    const config = { signal };
    if (timeoutMs) {
        config.timeout = timeoutMs;
    }
    try {
        const response = await http.post(GEMINI_URL, payload, config);
        return response.data;
    } catch (error) {
        if (error?.response?.status === 400 && callSite && !LOGGED_SCHEMA_ERRORS.has(callSite)) {
            LOGGED_SCHEMA_ERRORS.add(callSite);
            console.error(`SS_SCHEMA_400_ADDITIONALPROPS: ${callSite}`);
        }
        throw error;
    }
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

function normalizePrompt(prompt) {
    if (typeof prompt === 'string') {
        return { user: prompt, system: null, fallbackSystem: null };
    }
    if (!prompt || typeof prompt !== 'object') {
        throw new Error('Prompt must be a string or an object with a user property.');
    }
    const user = prompt.user;
    if (typeof user !== 'string' || !user.trim()) {
        throw new Error('Prompt.user must be a non-empty string.');
    }
    const system = typeof prompt.system === 'string' && prompt.system.trim().length
        ? prompt.system
        : null;
    const fallbackSystem = typeof prompt.fallbackSystem === 'string' && prompt.fallbackSystem.trim().length
        ? prompt.fallbackSystem
        : null;
    return { user, system, fallbackSystem };
}

async function generateQuizItemsWithFallback(subject, prompt, geminiRetryOptions = {}, fallbackRetryOptions = {}) {
    const normalizedPrompt = normalizePrompt(prompt);
    const geminiPayload = {
        contents: [
            {
                parts: [{ text: normalizedPrompt.user }]
            }
        ]
    };
    const geminiCallSite = subject === 'Social Studies' ? 'ss-generate-quiz-items' : null;
    if (subject === 'Social Studies') {
        geminiPayload.generationConfig = {
            response_mime_type: 'application/json',
            response_schema: SS_RESPONSE_SCHEMA
        };
    }
    if (normalizedPrompt.system) {
        geminiPayload.systemInstruction = {
            role: 'system',
            parts: [{ text: normalizedPrompt.system }]
        };
    }
    const fallbackSystem = normalizedPrompt.fallbackSystem
        || (normalizedPrompt.system
            ? `${CHATGPT_FALLBACK_SYSTEM_PROMPT}\n\n${normalizedPrompt.system}`
            : CHATGPT_FALLBACK_SYSTEM_PROMPT);
    const chatgptPayload = {
        model: 'gpt-4o-mini',
        temperature: 0.4,
        input: [
            { role: 'system', content: fallbackSystem },
            { role: 'user', content: normalizedPrompt.user }
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
            () => generationLimit(() => callGemini(geminiPayload, { callSite: geminiCallSite })),
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

    let parsedPayload = null;
    if (winner.model === 'gemini') {
        parsedPayload = parseGeminiResponse(winner.data);
    } else if (winner.model === 'chatgpt') {
        parsedPayload = parseOpenAIResponse(winner.data);
    }

    let items = parsedPayload;
    if (subject === 'Social Studies') {
        items = prepareSocialStudiesItems(parsedPayload);
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
    if (!item || typeof item !== 'object') {
        return true;
    }

    if (typeof item.questionText !== 'string' || !item.questionText.trim()) {
        return true;
    }

    const options = Array.isArray(item.answerOptions)
        ? item.answerOptions.filter((opt) => opt && typeof opt.text === 'string' && opt.text.trim().length > 0)
        : [];

    if (options.length < 4) {
        return true;
    }

    const correctCount = options.filter((opt) => opt.isCorrect === true).length;
    if (correctCount !== 1) {
        return true;
    }

    return false;
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
    let items = generatedItems.map((i) => normalizeQuestionSkeleton(i, subject));

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
                items[badIdxs[j]] = normalizeQuestionSkeleton(fixed, subject);
            });
        } catch (err) {
            console.warn('Repair batch failed; continuing with original items.', err?.message || err);
        }
    }

    return items.map((it) => normalizeQuestionSkeleton(it, subject));
}

async function runExam() {
    const counts = { NON_CALC_COUNT, GEOMETRY_COUNT, ALGEBRA_COUNT };
    const generated = await generateExam('Math', buildCombinedPrompt_Math, counts);

    const cleaned = [];
    for (const q of generated) {
        const sanitized = normalizeAnswerOptionsStructure(
            enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(q)), 'Math')
        );
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

async function fetchImagesFromBank({ domain, tag, limit = 10 } = {}) {
    const clauses = [];
    const values = [];
    if (domain) {
        values.push(domain);
        clauses.push(`domain = $${values.length}`);
    }
    if (tag) {
        values.push(tag);
        clauses.push(`$${values.length} = ANY(tags)`);
    }
    values.push(Math.max(1, Math.min(limit, BANK_MAX_FETCH)));
    const sql = `
        SELECT image_id, image_url, alt_text, domain, tags
        FROM public.images
        ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''}
        ORDER BY random()
        LIMIT $${values.length};
    `;
    const { rows } = await pool.query(sql, values);
    return rows;
}

function isDatabaseConfigured() {
    return Boolean(process.env.DATABASE_URL);
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

const IMAGES_DIR = (() => {
    const explicit = process.env.IMAGES_DIR;
    if (explicit && typeof explicit === 'string') {
        return resolvePathFromEnv(explicit);
    }
    return path.join(FRONTEND_ROOT, 'Images');
})();
if (!fs.existsSync(IMAGES_DIR)) {
    console.warn('[static][warn] Images directory not found at', IMAGES_DIR);
}
app.use('/Images', express.static(IMAGES_DIR, { fallthrough: false }));
console.log('[static] Images from', IMAGES_DIR);

if (!fs.existsSync(FRONTEND_DIST)) {
    console.warn('[SPA][WARN] No built frontend found at', FRONTEND_DIST);
}
app.use(express.static(FRONTEND_DIST));
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    const indexPath = path.join(FRONTEND_DIST, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(503).send('Frontend build missing.');
    }
    res.sendFile(indexPath);
});

app.post('/question-bank/save', async (req, res) => {
    const client = await pool.connect();
    try {
        const { subject, category, item_type, domain, difficulty, tags = [], question_data } = req.body || {};
        if (!question_data || !Array.isArray(question_data.choices)) {
            return res.status(400).json({ error: 'Invalid question_data' });
        }

        const question_norm = normalizeQuestion(question_data, DEFAULT_MATH_MODE);
        const fp = fingerprintOf(question_norm);
        const html = renderQuestionToHtml(question_norm);
        const katex_ok = !!html;

        const katex_html_cache = html || null;

        const q = `
      INSERT INTO public.questions
        (subject, category, item_type, domain, difficulty, tags,
         question_data, question_norm, katex_html_cache, katex_ok, fingerprint, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9::jsonb,$10,$11, NOW())
      ON CONFLICT (fingerprint) DO NOTHING
      RETURNING id AS question_id, katex_ok
    `;
        const vals = [
            subject || null,
            category || null,
            item_type || null,
            domain || null,
            difficulty || null,
            tags,
            question_data,
            question_norm,
            katex_html_cache,
            katex_ok,
            fp
        ];

        const { rows } = await client.query(q, vals);
        if (rows.length === 0) {
            return res.status(200).json({ status: 'duplicate', fingerprint: fp });
        }
        return res.status(201).json({ status: 'saved', question_id: rows[0].question_id, katex_ok });
    } catch (e) {
        console.error('save bank error', e);
        return res.status(500).json({ error: 'save_failed', detail: String(e) });
    } finally {
        client.release();
    }
});

app.post('/admin/rerender-bad-math', async (_req, res) => {
    if (!isDatabaseConfigured()) {
        return res.status(503).json({ error: 'database_unavailable' });
    }

    try {
        const { rows } = await pool.query(`
            SELECT id AS question_id, question_norm
            FROM public.questions
            WHERE katex_ok = false
            ORDER BY created_at DESC
            LIMIT 500
        `);

        let ok = 0;
        let fail = 0;

        for (const row of rows) {
            try {
                const html = renderQuestionToHtml(row.question_norm);
                const good = !!html;
                await pool.query(
                    `UPDATE public.questions
                        SET katex_html_cache = $1::jsonb,
                            katex_ok = $2
                     WHERE id = $3`,
                    [good ? html : null, good, row.question_id]
                );
                if (good) {
                    ok += 1;
                } else {
                    fail += 1;
                }
            } catch (err) {
                console.warn('Failed to re-render question math:', err?.message || err);
                fail += 1;
            }
        }

        res.json({ re_rendered: ok, failed: fail });
    } catch (err) {
        console.error('Failed to rerender bad math rows:', err?.message || err);
        res.status(500).json({ error: 'rerender_failed' });
    }
});

app.post('/image-bank/save', (_req, res) => {
    res.status(410).json({ error: 'image_bank_disabled' });
});

app.get('/image-bank/fetch', (_req, res) => {
    res.status(410).json({ error: 'image_bank_disabled' });
});

app.post('/image-bank/generate-questions', (_req, res) => {
    res.status(410).json({ error: 'image_bank_disabled' });
});

app.get('/image-bank/debug/summary', (_req, res) => {
    res.status(410).json({ error: 'image_bank_disabled' });
});

app.get('/image-bank/questions', (_req, res) => {
    res.status(410).json({ error: 'image_bank_disabled' });
});

app.get('/question-bank/fetch', (_req, res) => {
    res.status(410).json({ error: 'question_bank_disabled' });
});

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
        console.log('Received access code from user:', req.body.accessCode);
        console.log('Type of received code:', typeof req.body.accessCode);
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

app.get('/api/vocabulary/:subject', (req, res) => {
    const subjectParam = req.params.subject || '';
    const lowerParam = subjectParam.toLowerCase();
    const compactParam = lowerParam.replace(/[^a-z0-9]/g, '');
    const normalizedKey = Object.keys(vocabularyData).find((key) => {
        const lowerKey = key.toLowerCase();
        return lowerKey === lowerParam || lowerKey.replace(/[^a-z0-9]/g, '') === compactParam;
    });
    const vocab = normalizedKey ? vocabularyData[normalizedKey] : [];
    res.json({ subject: normalizedKey || subjectParam, vocab });
});

app.post('/api/student/select-organization', authenticateBearerToken, async (req, res) => {
    if (!isDatabaseConfigured()) {
        return res.status(503).json({ error: 'Database unavailable' });
    }

    try {
        const userId = getUserIdFromRequest(req);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const rawOrganizationId = req.body?.organizationId ?? req.body?.organization_id;
        const organizationId = Number(rawOrganizationId);

        if (!Number.isInteger(organizationId) || organizationId <= 0) {
            return res.status(400).json({ error: 'A valid organization is required' });
        }

        const organizationResult = await pool.query(
            'SELECT id, name FROM organizations WHERE id = $1;',
            [organizationId]
        );

        if (organizationResult.rowCount === 0) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        const organization = organizationResult.rows[0];

        const updateResult = await pool.query(
            `UPDATE users
             SET organization_id = $1
             WHERE id = $2
             RETURNING id, organization_id;`,
            [organization.id, userId]
        );

        if (updateResult.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
            message: 'Organization selected successfully',
            organization: {
                id: organization.id,
                name: organization.name,
            },
        });
    } catch (error) {
        console.error('Failed to select organization:', error);
        return res.status(500).json({ error: 'Failed to select organization' });
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

app.get('/api/admin/users', authenticateBearerToken, async (req, res) => {
    if (!isDatabaseConfigured()) {
        return res.status(503).json({ error: 'Database unavailable' });
    }

    const role = typeof req.user?.role === 'string' ? req.user.role.toLowerCase() : null;
    if (role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const result = await pool.query(
            `SELECT id, name, email, role, organization_id
             FROM users
             ORDER BY created_at ASC, id ASC;`
        );

        const users = (result.rows || []).map((row) => ({
            id: row.id,
            name: row.name || null,
            email: row.email || null,
            role: row.role || null,
            organization_id: row.organization_id,
        }));

        return res.status(200).json(users);
    } catch (error) {
        console.error('Failed to fetch admin user list:', error);
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/admin/scores/:userId', authenticateBearerToken, async (req, res) => {
    if (!isDatabaseConfigured()) {
        return res.status(503).json({ error: 'Database unavailable' });
    }

    const role = typeof req.user?.role === 'string' ? req.user.role.toLowerCase() : null;
    if (role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const { userId: rawUserId } = req.params || {};
    const userId = Number(rawUserId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const result = await pool.query(
            `SELECT id, user_id, subject, score, taken_at
             FROM test_results
             WHERE user_id = $1
             ORDER BY taken_at DESC NULLS LAST, id DESC;`,
            [userId]
        );

        const rows = Array.isArray(result?.rows) ? result.rows : [];
        const formatted = rows.map(formatScoreRow).filter(Boolean);
        return res.status(200).json(formatted);
    } catch (error) {
        console.error('Failed to fetch student test results:', error);
        return res.status(500).json({ error: 'Failed to fetch scores' });
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
    const payload = [
        'window.__APP_CONFIG__ = window.__APP_CONFIG__ || {};',
        `window.__APP_CONFIG__.geometryFiguresEnabled = ${GEOMETRY_FIGURES_ENABLED};`,
        `window.__APP_CONFIG__.mathMode = '${DEFAULT_MATH_MODE}';`
    ].join(' ');
    res.type('application/javascript').send(payload);
});

curatedImages = IMAGE_DB;
global.curatedImages = curatedImages;

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
        NO REDUNDANCY RULE: All 15 questions must feature distinct scenarios, time periods, data sets, and stimulus materials. Do not reuse wording, answer choices, or prompts across questions.
        When an image is referenced, write the question so it can be answered from the image; never include filenames or the word 'screenshot'. Passages (when used) are 60–200 words.`,
        comprehensive: `Generate a 35-question comprehensive GED Social Studies exam.
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 50% Civics & Government, 20% U.S. History, 15% Economics, and 15% Geography & the World.
        STRICT STIMULUS REQUIREMENTS: The quiz must include a diverse mix of stimuli, including text passages, historical quotes, charts, graphs, and images from the provided descriptions.
        When an image is referenced, write the question so it can be answered from the image; never include filenames or the word 'screenshot'. Passages (when used) are 60–200 words.`
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

app.get('/health/images', (_req, res) => {
    const pool = Array.isArray(global.curatedImages) ? global.curatedImages : [];
    const count = pool.length;
    const uniqueIds = new Set(pool.map((img) => img && img.id).filter(Boolean));
    const duplicateIds = count - uniqueIds.size;
    const missing = pool.filter((img) => !img || (!img.file && !img.src && !img.filePath));
    const ok = count > 0 && duplicateIds === 0 && missing.length === 0;
    res.json({ ok, count, duplicateIds, missing: missing.length });
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
        let items = generatedItems.map((it) => normalizeQuestionSkeleton(it, subject));
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
                    items[originalIndex] = normalizeQuestionSkeleton(f, subject);
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
        let finalItems = items.slice(0, QUIZ_COUNT).map((item, idx) => {
            const normalized = normalizeStimulusAndSource(item);
            const chosenSrc = normalized?.stimulusImage?.src || normalized?.asset?.imagePath || '';
            if (chosenSrc) {
                console.log(`[IMG-SELECT] Subject: ${subject}, Topic: ${topic}, Found: ${imgs.length}, Using: ${chosenSrc}`);
            } else if (subjectNeedsImages) {
                console.warn(`[IMG-SELECT] Subject: ${subject}, Topic: ${topic}, Found: ${imgs.length}, Using: none`);
            }
            return { ...normalized, questionNumber: idx + 1 };
        });

        if (subject === 'Social Studies') {
            const validationIssues = validateItems(finalItems);
            if (validationIssues.length) {
                console.warn('[validate-items] Dropping invalid Social Studies items from topic generator', validationIssues);
                const invalidIndices = new Set(validationIssues.map((issue) => issue.index));
                finalItems = finalItems
                    .filter((_, idx) => !invalidIndices.has(idx))
                    .map((item, idx) => ({ ...item, questionNumber: idx + 1 }));
            }
        }

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

const FALLBACK_DISTRACTOR_BANK = [
    'An interpretation that is not supported by the information.',
    'A detail that does not match the prompt.',
    'A conclusion that misreads the evidence.',
    'A statement that is unrelated to the topic.'
];

function coerceAnswerOption(option) {
    if (option == null) {
        return null;
    }

    if (typeof option === 'string') {
        const text = option.trim();
        if (!text) {
            return null;
        }
        return { text, isCorrect: false, rationale: '' };
    }

    if (typeof option !== 'object') {
        return null;
    }

    const text = typeof option.text === 'string'
        ? option.text.trim()
        : typeof option.choice === 'string'
            ? option.choice.trim()
            : typeof option.label === 'string'
                ? option.label.trim()
                : '';

    if (!text) {
        return null;
    }

    const rationale = typeof option.rationale === 'string'
        ? option.rationale.trim()
        : typeof option.explanation === 'string'
            ? option.explanation.trim()
            : typeof option.reason === 'string'
                ? option.reason.trim()
                : '';

    const isCorrect = option.isCorrect === true
        || option.correct === true
        || option.is_correct === true
        || option.answer === true;

    return {
        text,
        isCorrect,
        rationale
    };
}

function normalizeAnswerOptionsStructure(item) {
    if (!item || typeof item !== 'object') {
        return item;
    }

    const candidateOptions = Array.isArray(item.answerOptions)
        ? item.answerOptions
        : Array.isArray(item.choices)
            ? item.choices
            : [];

    let options = candidateOptions
        .map((option) => {
            const coerced = coerceAnswerOption(option);
            return coerced ? { ...coerced } : null;
        })
        .filter(Boolean)
        .map((option) => ({
            text: option.text,
            isCorrect: option.isCorrect === true,
            rationale: typeof option.rationale === 'string' ? option.rationale : ''
        }));

    const textualAnswerHints = [
        item.correctAnswer,
        item.correctResponse,
        item.correctOption,
        item.answer,
        item.correctText
    ]
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter((value) => value.length > 0 && !/^[A-D]$/i.test(value));

    const indexHintsRaw = [
        item.correctIndex,
        item.answerIndex,
        item.correctChoice,
        item.correctOption,
        item.correctLetter,
        item.answerLetter,
        item.correctAnswer
    ];

    const parseIndexHint = (hint) => {
        if (Number.isInteger(hint)) {
            return hint;
        }
        if (typeof hint === 'string') {
            const trimmed = hint.trim();
            if (!trimmed) {
                return null;
            }
            const letterIndex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(trimmed.toUpperCase());
            if (letterIndex !== -1) {
                return letterIndex;
            }
            const numeric = Number.parseInt(trimmed, 10);
            if (!Number.isNaN(numeric)) {
                return numeric;
            }
        }
        return null;
    };

    const indexHints = indexHintsRaw
        .map(parseIndexHint)
        .filter((value) => Number.isInteger(value) && value >= 0);

    const markCorrectAtIndex = (idx) => {
        if (!Number.isInteger(idx) || idx < 0 || idx >= options.length) {
            return false;
        }
        options = options.map((opt, optIdx) => ({
            ...opt,
            isCorrect: optIdx === idx
        }));
        return true;
    };

    if (options.length) {
        const explicitIndex = indexHints.find((idx) => idx < options.length);
        if (!markCorrectAtIndex(explicitIndex) && textualAnswerHints.length) {
            const lowerCaseOptions = options.map((opt) => opt.text.toLowerCase());
            const matchingIndex = textualAnswerHints
                .map((hint) => lowerCaseOptions.indexOf(hint.toLowerCase()))
                .find((idx) => idx >= 0);
            markCorrectAtIndex(matchingIndex);
        }
    }

    const ensureSingleCorrect = () => {
        let currentCorrect = options.findIndex((opt) => opt.isCorrect === true);
        if (currentCorrect === -1 && options.length) {
            currentCorrect = 0;
        }
        options = options.map((opt, idx) => ({
            ...opt,
            isCorrect: idx === currentCorrect
        }));
        return currentCorrect;
    };

    let correctIndex = ensureSingleCorrect();

    const usedTexts = new Set(options.map((opt) => opt.text.toLowerCase()));
    let fillerCursor = 0;
    const fillerGuardLimit = FALLBACK_DISTRACTOR_BANK.length + 4;

    while (options.length < 4 && fillerCursor < fillerGuardLimit) {
        const template = FALLBACK_DISTRACTOR_BANK[fillerCursor % FALLBACK_DISTRACTOR_BANK.length];
        fillerCursor += 1;
        let candidate = template;
        let attempt = 1;
        while (usedTexts.has(candidate.toLowerCase()) && attempt < 4) {
            candidate = `${template} (option ${attempt + 1})`;
            attempt += 1;
        }
        if (usedTexts.has(candidate.toLowerCase())) {
            continue;
        }
        usedTexts.add(candidate.toLowerCase());
        options.push({
            text: candidate,
            isCorrect: false,
            rationale: 'This choice does not align with the supporting information.'
        });
    }

    if (options.length > 4) {
        const correctOption = correctIndex >= 0 ? options[correctIndex] : null;
        const distractors = options.filter((_, idx) => idx !== correctIndex);
        options = correctOption ? [correctOption, ...distractors.slice(0, 3)] : distractors.slice(0, 4);
    }

    correctIndex = ensureSingleCorrect();

    return {
        ...item,
        answerOptions: options.map((opt) => ({
            text: opt.text,
            isCorrect: opt.isCorrect === true,
            rationale: typeof opt.rationale === 'string' ? opt.rationale : ''
        })),
        correctIndex
    };
}

function normalizeQuestionSkeleton(item, subject) {
    return normalizeAnswerOptionsStructure(enforceWordCapsOnItem(item, subject));
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

const SS_RESPONSE_SCHEMA = {
    type: "object",
    properties: {
        id: { type: "string" },
        title: { type: "string" },
        subject: { type: "string" },
        questions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    questionNumber: { type: "integer" },
                    type: { type: "string" },
                    questionText: { type: "string" },
                    passage: { type: "string" },
                    source: { type: "string" },
                    answerOptions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                text: { type: "string" }
                            },
                            required: ["text"]
                        },
                        minItems: 4,
                        maxItems: 4
                    },
                    correctIndex: { type: "integer" },
                    rationale: { type: "string" }
                },
                required: ["type", "questionText", "answerOptions", "correctIndex"]
            }
        }
    },
    required: ["questions"]
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
        required: ["qid", "field", "corrected"]
    }
};

function sanitizeModelText(text) {
    if (typeof text !== 'string') return '';
    return text
        .replace(/^\uFEFF/, '')
        .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
        .replace(/```json|```/g, '')
        .replace(/\r\n/g, '\n')
        .replace(/\u0000/g, '')
        .trim();
}

function parseJsonWithRepair(raw) {
    const cleaned = String(raw)
        .replace(/```json|```/gi, '')
        .replace(/\u0000/g, '')
        .replace(/\r\n/g, '\n')
        .trim();
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        try {
            return JSON.parse(jsonrepair(cleaned));
        } catch (repairError) {
            const snippet = cleaned.slice(0, 300);
            console.error('SS_PARSE_UNTERMINATED', {
                message: repairError.message,
                snippet
            });
            throw repairError;
        }
    }
}

const callAI = async (prompt, schema, options = {}) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        throw new Error('Server configuration error: GOOGLE_AI_API_KEY is not set.');
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const { parser, onParserMetadata, generationOverrides, timeoutMs, signal, callSite } = options;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            response_mime_type: "application/json",
            response_schema: schema,
            ...(generationOverrides || {})
        }
    };
    if (!schema) {
        delete payload.generationConfig.response_schema;
    }
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

        if (typeof parser === 'function') {
            const parsedResult = parser(sanitizeModelText(rawText));
            if (parsedResult && typeof parsedResult === 'object' && Object.prototype.hasOwnProperty.call(parsedResult, 'value')) {
                onParserMetadata?.(parsedResult);
                return parsedResult.value;
            }
            onParserMetadata?.({ stage: 'custom-parser' });
            return parsedResult;
        }
        return parseJsonWithRepair(rawText);
    } catch (error) {
        if (error?.response?.status === 400 && schema && callSite && !LOGGED_SCHEMA_ERRORS.has(callSite)) {
            LOGGED_SCHEMA_ERRORS.add(callSite);
            console.error(`SS_SCHEMA_400_ADDITIONALPROPS: ${callSite}`);
        }
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
    const {
        minWords = 150,
        maxWords = 250,
        requireAttribution = false,
        requireAdapted = false,
        adaptationSourceHint = 'reputable public-domain sources such as Encyclopædia Britannica, the Library of Congress, the Smithsonian, or the National Archives',
        requireNamedEntity = false
    } = options;

    const passageInstructions = [
        `Write an informational passage of ${minWords}-${maxWords} words focused on '${topic}' within the '${subject}' domain.`,
        requireAdapted
            ? `Ground the passage in verifiable facts from ${adaptationSourceHint} and paraphrase responsibly; avoid direct quotations.`
            : 'Ensure the passage is factually accurate and concise.',
        'Maintain a neutral, academic tone appropriate for GED learners.',
        requireNamedEntity ? 'Mention at least one specific named person, place, document, or event relevant to the topic.' : '',
        requireAttribution ? 'Include the exact sentence "Adapted from an encyclopedia entry." as the final sentence.' : ''
    ].filter(Boolean).join(' ');

    const questionInstructions = [
        `After the passage, create ${numQuestions} GED-style multiple-choice questions that rely only on the passage.`,
        'Rotate question purposes (e.g., main idea, inference, cause/effect, vocabulary in context, author purpose).',
        'Write concise stems that do not copy sentences verbatim from the passage.',
        'Provide exactly four answer options per question, each with a brief rationale. Mark one option as correct by setting "isCorrect": true.'
    ].join(' ');

    const prompt = `You are a GED exam creator. ${passageInstructions} ${questionInstructions} Return a single valid JSON object with keys "passage" and "questions".`;

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
    let passageText = typeof result?.passage === 'string' ? result.passage.trim() : '';
    if (passageText) {
        passageText = limitWords(passageText, maxWords);
        const wordCount = passageText.split(/\s+/).filter(Boolean).length;
        if (wordCount < minWords) {
            console.warn(`[PASSAGE] Generated passage under target length (${wordCount} words < ${minWords}). Topic: ${topic}`);
        }
        if (requireAttribution && !/adapted from an encyclopedia entry\.?$/i.test(passageText)) {
            passageText = `${passageText.replace(/\s+$/, '')} Adapted from an encyclopedia entry.`;
        }
    }

    return result.questions.map((q) => normalizeQuestionSkeleton({
        ...q,
        passage: passageText,
        type: 'passage'
    }, subject));
};


async function generateImageItemsWithAI({ image_url, alt_text, subject, category, domain, difficulty, count = 4 }) {
    const safeCount = Math.max(1, Math.min(Number(count) || 1, 10));
    if (!image_url) {
        return [];
    }

    const schema = {
        type: "ARRAY",
        items: {
            type: "OBJECT",
            properties: {
                stem: { type: "STRING" },
                choices: {
                    type: "ARRAY",
                    items: { type: "STRING" },
                    minItems: 3,
                    maxItems: 6
                },
                answer_index: { type: "INTEGER" },
                tags: { type: "ARRAY", items: { type: "STRING" } },
                difficulty: { type: "STRING" },
                alt_text: { type: "STRING" }
            },
            required: ["stem", "choices", "answer_index"]
        }
    };

    const contextLines = [
        `Image URL: ${image_url}`,
        alt_text ? `Alt text: ${alt_text}` : 'Alt text: (not provided)'
    ];
    if (category) contextLines.push(`Category: ${category}`);
    if (domain) contextLines.push(`Domain: ${domain}`);
    if (difficulty) contextLines.push(`Desired difficulty: ${difficulty}`);
    if (subject) contextLines.push(`Subject: ${subject}`);

    const prompt = `You create GED-style multiple choice questions. Use ONLY the visual details of the provided image to craft ${safeCount} unique questions.
- Each question must rely on interpreting the exact image at ${image_url}.
- Focus on concrete labels, legend entries, axis titles, dates, or quantities visible in the image. Avoid meta-language about strategies or readers.
- Provide four answer choices per question when possible; always mark the correct choice with a zero-based index.
- When the visual contains numeric or comparative information, reference it explicitly (e.g., higher, lower, total, percentage).
- Mention at least two specific visual anchors (legend terms, axis labels, place names, dates, symbols, etc.) in each stem.
- If mathematical notation is needed, use KaTeX-friendly inline LaTeX wrapped in \\( ... \\).
- Keep the language concise and appropriate for GED students.

Return a JSON array where each object has:
{
  "stem": string,
  "choices": string[4],
  "answer_index": number (0-based),
  "tags": string[] (optional),
  "difficulty": string (optional)
}

${contextLines.join('\n')}`;

    const result = await callAI(prompt, schema, {
        generationOverrides: { temperature: 0.7 }
    });

    if (!Array.isArray(result)) {
        return [];
    }

    return result.map((entry) => {
        const rawChoices = Array.isArray(entry?.choices) ? entry.choices : [];
        const normalizedChoices = rawChoices
            .map((choice) => (typeof choice === 'string' ? choice : ''))
            .filter((choice) => choice && choice.trim().length);
        const choices = normalizedChoices.length ? normalizedChoices : rawChoices.map((choice) => String(choice || ''));
        const answerIndex = Number.isInteger(entry?.answer_index) ? entry.answer_index : 0;
        const tags = Array.isArray(entry?.tags) ? entry.tags.filter((t) => typeof t === 'string' && t.trim().length) : [];
        const derivedAlt = typeof entry?.alt_text === 'string' && entry.alt_text.trim().length ? entry.alt_text.trim() : null;
        const difficultyLabel = typeof entry?.difficulty === 'string' && entry.difficulty.trim().length
            ? entry.difficulty.trim()
            : difficulty || null;

        return {
            item_type: 'image_mcq',
            tags,
            difficulty: difficultyLabel,
            question_data: {
                stem_raw: typeof entry?.stem === 'string' ? entry.stem : '',
                choices,
                answer_index: answerIndex,
                image_url,
                alt_text: derivedAlt || alt_text || null
            }
        };
    });
}

const generateImageQuestion = async (topic, subject, _imagePool, numQuestions, options = {}) => {
    const count = Math.max(1, Number(numQuestions) || 1);
    const selectedImages = selectMetadataRecords({ subject, category: topic, topic, count });
    return generateSimpleImageQuestions({
        subject,
        images: selectedImages,
        timeoutMs: options?.timeoutMs
    });
};

const generateIntegratedSet = async (topic, subject, imagePool, numQuestions, options = {}) => {
    const totalRequested = Math.max(1, Number(numQuestions) || 1);
    if (!Array.isArray(imagePool) || !imagePool.length) {
        return [];
    }

    const {
        minWords = 80,
        maxWords = 120,
        requireAttribution = true,
        requireNamedEntity = true
    } = options;

    const eligiblePool = filterEligibleImages(Array.isArray(imagePool) ? imagePool : []);
    if (!eligiblePool.length) {
        return [];
    }

    const byCategory = eligiblePool.filter((img) => {
        const matchesSubject = !subject || img.subject === subject;
        const matchesCategory = !topic || img.category === topic;
        return matchesSubject && matchesCategory;
    });

    let selectedImage = byCategory.length
        ? byCategory[Math.floor(Math.random() * byCategory.length)]
        : null;

    if (!selectedImage) {
        const subjectImages = eligiblePool.filter((img) => img.subject === subject);
        if (subjectImages.length) {
            selectedImage = subjectImages[Math.floor(Math.random() * subjectImages.length)];
        } else {
            selectedImage = eligiblePool[Math.floor(Math.random() * eligiblePool.length)];
        }
    }

    if (!selectedImage) {
        return [];
    }

    const curatedRecord = resolveCuratedImageMeta(selectedImage.id || selectedImage.filePath || selectedImage.src || selectedImage.path);
    if (curatedRecord && !isImageEligible(curatedRecord)) {
        console.warn(`[IMG-GUARD] Skipped weak metadata for ${curatedRecord.id || selectedImage.filePath || selectedImage.src || 'integrated-image'}`);
        return [];
    }
    const resolvedMeta = resolveImageMeta(selectedImage.filePath || selectedImage.src || selectedImage.path || '');
    const normalizedPathRaw = curatedRecord?.src
        ? normalizeImagePath(curatedRecord.src)
        : resolvedMeta?.src
            ? normalizeImagePath(resolvedMeta.src)
            : normalizeImagePath(selectedImage.filePath || selectedImage.src || selectedImage.path || '');
    const normalizedPath = normalizedPathRaw || null;
    const encodedPath = normalizedPath ? normalizedPath : null;
    const mergedAlt = curatedRecord?.alt || curatedRecord?.altText || resolvedMeta?.altText || selectedImage.altText || '';
    const description = resolvedMeta?.detailedDescription || selectedImage.detailedDescription || '';
    const usage = resolvedMeta?.usageDirectives || selectedImage.usageDirectives || '';
    const keywords = Array.isArray(selectedImage.keywords) && selectedImage.keywords.length
        ? selectedImage.keywords.join(', ')
        : Array.isArray(resolvedMeta?.keywords) && resolvedMeta.keywords.length
            ? resolvedMeta.keywords.join(', ')
            : '';

    const schema = {
        type: 'OBJECT',
        properties: {
            passage: { type: 'STRING' },
            questions: {
                type: 'ARRAY',
                items: {
                    type: 'OBJECT',
                    properties: {
                        questionText: { type: 'STRING' },
                        answerOptions: {
                            type: 'ARRAY',
                            items: {
                                type: 'OBJECT',
                                properties: {
                                    text: { type: 'STRING' },
                                    isCorrect: { type: 'BOOLEAN' },
                                    rationale: { type: 'STRING' }
                                },
                                required: ['text', 'isCorrect', 'rationale']
                            }
                        },
                        imagePath: { type: 'STRING' }
                    },
                    required: ['questionText', 'answerOptions', 'imagePath']
                }
            }
        },
        required: ['passage', 'questions']
    };

    const promptParts = [
        `You are a GED Social Studies exam creator. Use the visual described below to craft an integrated reading-and-visual task about "${topic}".`,
        `First, write an informational passage of ${minWords}-${maxWords} words that contextualizes the visual evidence.`,
        requireNamedEntity ? 'Mention at least one specific named person, place, policy, or event in the passage.' : '',
        'Keep the passage neutral in tone and grounded in verifiable facts.',
        requireAttribution ? 'End the passage with the exact sentence "Adapted from an encyclopedia entry."' : '',
        `After the passage, create ${totalRequested} GED-style multiple-choice questions that require synthesizing details from both the passage and the visual.`
    ].filter(Boolean).join(' ');

    const questionRules = [
        'Each question must cite at least one detail from the passage and one explicit visual element (legend term, axis label, color, date, region, statistic, etc.).',
        'Do not provide strategy advice or refer to students or readers.',
        'Use comparative or quantitative language whenever the image contains numeric information.',
        'Provide exactly four answer options with rationales; mark one option with "isCorrect": true.',
        normalizedPath
            ? `Set "imagePath" to "${normalizedPath}" for every question.`
            : 'Ensure each question includes an "imagePath" that accurately references the described visual.'
    ].join(' ');

    const contextBlock = [
        '**Image Summary:**',
        `- Alt Text: ${mergedAlt || 'N/A'}`,
        `- Description: ${description || 'N/A'}`,
        `- Usage Notes: ${usage || 'N/A'}`,
        keywords ? `- Keywords: ${keywords}` : null
    ].filter(Boolean).join('\n');

    const prompt = `${promptParts}\n\n${contextBlock}\n\n${questionRules}\nReturn a JSON object with "passage" and "questions".`;

    const result = await callAI(prompt, schema, options);

    let passageText = typeof result?.passage === 'string' ? result.passage.trim() : '';
    if (passageText) {
        passageText = limitWords(passageText, maxWords);
        const wordCount = passageText.split(/\s+/).filter(Boolean).length;
        if (wordCount < minWords) {
            console.warn(`[INTEGRATED] Passage under target length (${wordCount} words < ${minWords}) for topic ${topic}.`);
        }
        if (requireAttribution && !/adapted from an encyclopedia entry\.?$/i.test(passageText)) {
            passageText = `${passageText.replace(/\s+$/, '')} Adapted from an encyclopedia entry.`;
        }
    }

    const questions = Array.isArray(result?.questions) ? result.questions.slice(0, totalRequested) : [];
    return questions.map((question) => normalizeQuestionSkeleton({
        ...question,
        passage: passageText,
        imageUrl: encodedPath || curatedRecord?.src || normalizedPath || null,
        imageAlt: mergedAlt,
        imageRef: encodedPath ? { path: encodedPath, altText: mergedAlt, id: curatedRecord?.id } : undefined,
        type: 'integrated'
    }, subject));
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
    return normalizeQuestionSkeleton(question, subject);
};

function normalizeSubjectKey(subject) {
    if (!subject || typeof subject !== 'string') {
        return '';
    }
    return subject.trim().toLowerCase().replace(/\s+/g, '-');
}

function scoreImageForPlan(img, desired) {
    let score = 0;
    const vt = (img?.visualType || '').toLowerCase();
    if (desired.visualTypes.length && desired.visualTypes.includes(vt)) {
        score += 3;
    }

    const subtopics = new Set((Array.isArray(img?.subtopics) ? img.subtopics : []).map((value) => String(value).toLowerCase()));
    desired.subtopics.forEach((subtopic) => {
        if (subtopics.has(subtopic)) {
            score += 2;
        }
    });

    const concepts = new Set((Array.isArray(img?.concepts) ? img.concepts : []).map((value) => String(value).toLowerCase()));
    let hits = 0;
    desired.concepts.forEach((concept) => {
        if (concepts.has(concept)) {
            hits += 1;
        }
    });
    score += Math.min(hits, 3);

    return score;
}

const PLAN_WARNINGS = new Set();

async function generateAiExamPayload({ subject, examType, totalQuestions, sectionMix, useImages }) {
    const normalizedSubject = typeof subject === 'string' && subject.trim().length ? subject.trim() : 'General Studies';
    const normalizedExamType = normalizeExamType(examType);
    const template = resolveExamTemplate(normalizedSubject, normalizedExamType);
    const { plan, totalQuestions: desiredTotal, notes: planNotes } = computeSectionPlan({
        template,
        totalQuestions,
        sectionMix,
        useImages
    });

    const errors = [];
    const notes = [...planNotes];
    const sectionCounts = { image: 0, reading: 0, standalone: 0 };
    const generationStart = Date.now();

    const imageTopics = template.topics?.image || [];
    const readingTopics = template.topics?.reading || [];
    const standaloneTopics = template.topics?.standalone || [];

    const timeoutMs = selectModelTimeoutMs({ examType: normalizedExamType });

    const imageItems = [];
    let imageShortage = 0;
    if (plan.image > 0) {
        const metadata = selectMetadataRecords({
            subject: normalizedSubject,
            topic: pickTopic(imageTopics, 0, normalizedSubject),
            count: plan.image
        });

        if (metadata.length < plan.image) {
            imageShortage = plan.image - metadata.length;
            notes.push(`Only ${metadata.length} eligible images found for ${normalizedSubject}; will backfill ${imageShortage} items.`);
        }

        try {
            const questions = await generateSimpleImageQuestions({
                subject: normalizedSubject,
                images: metadata,
                timeoutMs
            });
            const trimmed = questions.slice(0, plan.image);
            sectionCounts.image = trimmed.length;
            imageItems.push(...trimmed.map((item) => ({ ...item, type: 'image' })));
            if (trimmed.length < plan.image) {
                imageShortage = plan.image - trimmed.length;
                notes.push(`Generated ${trimmed.length} image questions out of ${plan.image}; shifting ${imageShortage} to standalone.`);
            }
        } catch (error) {
            imageShortage = plan.image;
            const message = typeof error?.message === 'string' ? error.message : 'Image generation failed';
            errors.push(`Image generation failed: ${message}`);
            notes.push('Unable to generate image-based questions; reallocating to standalone.');
        }
    }

    const readingItems = [];
    let readingShortage = 0;
    if (plan.reading > 0) {
        let remaining = plan.reading;
        let batchIndex = 0;
        while (remaining > 0) {
            const batchSize = Math.min(remaining, remaining > 4 ? 4 : remaining);
            const topic = pickTopic(readingTopics, batchIndex, normalizedSubject);
            try {
                const set = await generatePassageSet(topic, normalizedSubject, batchSize, {
                    minWords: 120,
                    maxWords: 180,
                    requireNamedEntity: true
                });
                const trimmed = Array.isArray(set) ? set.slice(0, batchSize) : [];
                readingItems.push(...trimmed.map((item) => ({ ...item, type: 'reading' })));
                sectionCounts.reading += trimmed.length;
                if (trimmed.length < batchSize) {
                    const gap = batchSize - trimmed.length;
                    readingShortage += gap;
                    errors.push(`Reading passage generation returned ${trimmed.length} items instead of ${batchSize} for topic "${topic}".`);
                }
            } catch (error) {
                readingShortage += batchSize;
                const message = typeof error?.message === 'string' ? error.message : 'Unknown error';
                errors.push(`Reading generation failed for topic "${topic}": ${message}`);
            }
            remaining -= batchSize;
            batchIndex += 1;
        }
    }

    const standaloneItems = [];
    const totalStandaloneNeeded = plan.standalone + imageShortage + readingShortage;
    for (let i = 0; i < totalStandaloneNeeded; i += 1) {
        const topic = pickTopic(standaloneTopics, i, normalizedSubject);
        try {
            const question = await generateStandaloneQuestion(normalizedSubject, topic, { timeoutMs });
            if (question) {
                standaloneItems.push({ ...question, type: 'standalone' });
                sectionCounts.standalone += 1;
            }
        } catch (error) {
            const message = typeof error?.message === 'string' ? error.message : 'Unknown error';
            errors.push(`Standalone generation failed for topic "${topic}": ${message}`);
        }
    }

    let combined = [...imageItems, ...readingItems, ...standaloneItems];
    let validationIssues = validateItems(combined);
    if (validationIssues.length) {
        const invalidIndices = new Set(validationIssues.map((issue) => issue.index));
        combined = combined.filter((_, idx) => !invalidIndices.has(idx));
        validationIssues.forEach((issue) => {
            errors.push(`Dropped invalid item at index ${issue.index}: ${issue.reason}`);
        });
    }

    let safeguardAttempts = 0;
    while (combined.length < desiredTotal && safeguardAttempts < 4) {
        safeguardAttempts += 1;
        const topic = pickTopic(standaloneTopics, combined.length + safeguardAttempts, normalizedSubject);
        try {
            const fallback = await generateStandaloneQuestion(normalizedSubject, topic, { timeoutMs });
            if (fallback) {
                combined.push({ ...fallback, type: 'standalone' });
                sectionCounts.standalone += 1;
            }
        } catch (error) {
            const message = typeof error?.message === 'string' ? error.message : 'Unknown error';
            errors.push(`Fallback standalone generation failed: ${message}`);
        }
    }

    if (combined.length > desiredTotal) {
        combined = combined.slice(0, desiredTotal);
    }

    if (combined.length < desiredTotal) {
        throw new Error(`AI generation produced only ${combined.length} items (expected ${desiredTotal}).`);
    }

    const normalizedItems = combined.map((item, idx) => {
        const normalized = normalizeQuestionSkeleton(item, normalizedSubject) || {};
        return {
            ...normalized,
            questionNumber: idx + 1
        };
    });

    const generationTimeMs = Date.now() - generationStart;
    const meta = {
        subject: normalizedSubject,
        examType: normalizedExamType,
        totalQuestions: desiredTotal,
        sections: {
            image: plan.image,
            reading: plan.reading,
            standalone: plan.standalone
        },
        generatedCounts: {
            image: sectionCounts.image,
            reading: sectionCounts.reading,
            standalone: sectionCounts.standalone
        },
        generationTimeMs,
        notes
    };

    return { meta, items: normalizedItems, errors };
}

function warnPlanOnce(message) {
    if (!PLAN_WARNINGS.has(message)) {
        PLAN_WARNINGS.add(message);
        console.warn(message);
    }
}

function isImageEligibleForPlan(img) {
    if (!img) return false;
    if (!isImageEligible(img)) return false;
    if (!img.visualType) {
        warnPlanOnce('[images][plan] soft check: missing visualType.');
    }
    if (!Array.isArray(img.subtopics) || img.subtopics.length === 0) {
        warnPlanOnce('[images][plan] soft check: missing subtopics.');
    }
    if (!Array.isArray(img.questionHooks) || img.questionHooks.length === 0) {
        warnPlanOnce('[images][plan] soft check: missing questionHooks.');
    }
    return true;
}

function sanitizeImageRef(ref) {
    if (!ref) return null;
    const value = String(ref).trim();
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return null;
    return value;
}

function safePath(p) {
    if (!p) return null;
    let s = String(p);
    for (let i = 0; i < 3 && /%[0-9A-Fa-f]{2}/.test(s); i++) {
        try {
            s = decodeURIComponent(s);
        } catch {
            break;
        }
    }
    s = s.replace(/^\.?\/+/, '');
    if (!s.toLowerCase().startsWith('images/')) s = 'Images/' + s;
    return '/' + encodeURI(s);
}

function isLenientEligible(img) {
    // Minimal requirements to be attachable.
    return !!(img && (img.src || img.filePath || img.file) && (img.alt || img.title));
}

function pickCuratedFallback(subject, usedIds = new Set()) {
    const pool = (global.curatedImages || []);
    // prefer same-subject by tags, else global
    const subj = subject ? String(subject).toLowerCase() : null;
    const bySubj = subj
        ? pool.filter((im) => (im.tags || []).map((t) => String(t).toLowerCase()).includes(subj))
        : [];
    const candidates = (bySubj.length ? bySubj : pool).filter(isLenientEligible);
    for (const im of candidates) {
        if (!usedIds.has(im.id)) return im;
    }
    return null;
}

/**
 * Clean the AI draft *before* restore:
 * - Drop externals (example.com, any http/https)
 * - Fix double-encoding, normalize to /Images/...
 * - Resolve to curated meta (id/src/alt)
 * - If no hit, swap in a curated fallback so we never end with 0 images.
 */
function sanitizeDraftImages(draft) {
    if (!draft || !Array.isArray(draft.items)) return draft;
    const used = new Set();
    const subj = (draft.subject || '').toLowerCase();
    let attached = 0;
    let swapped = 0;
    let nulled = 0;

    for (const q of draft.items) {
        // ensure each item carries a subject if possible
        if (!q.subject && draft.subject) q.subject = draft.subject;

        const raw = q.imageUrl || q.imageRef || q.imagePath;
        const localRef = sanitizeImageRef(raw); // null if external
        if (!localRef) {
            // try an immediate curated swap
            const swap = pickCuratedFallback(q.subject || subj, used);
            if (swap) {
                q.imageRef = swap.id;
                q.imageUrl = swap.src || safePath(swap.filePath || swap.file);
                if (!q.imageAlt) q.imageAlt = swap.alt || '';
                used.add(swap.id);
                swapped++;
                attached++;
            } else {
                q.imageUrl = null;
                nulled++;
            }
            continue;
        }

        // normalize and try to resolve curated meta
        const fixed = safePath(localRef);
        const meta = resolveImageMeta(fixed) || resolveImageMeta(localRef);
        if (meta && (meta.src || meta.filePath || meta.file)) {
            q.imageRef = meta.id || q.imageRef || q.imageUrl;
            q.imageUrl = meta.src || safePath(meta.filePath || meta.file);
            if (!q.imageAlt) q.imageAlt = meta.alt || '';
            used.add(q.imageRef);
            attached++;
            continue;
        }

        // still no luck → curated swap
        const swap = pickCuratedFallback(q.subject || subj, used);
        if (swap) {
            q.imageRef = swap.id;
            q.imageUrl = swap.src || safePath(swap.filePath || swap.file);
            if (!q.imageAlt) q.imageAlt = swap.alt || '';
            used.add(swap.id);
            swapped++;
            attached++;
        } else {
            q.imageUrl = null;
            nulled++;
        }
    }

    console.log(`[DRAFT-IMG] sanitized=${draft.items.length} attached=${attached} swapped=${swapped} nulled=${nulled}`);
    return draft;
}

let cachedImageMetadata = null;

function loadImageMetadataRecords() {
    if (Array.isArray(cachedImageMetadata)) {
        return cachedImageMetadata;
    }

    try {
        const raw = fs.readFileSync(IMAGE_METADATA_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        cachedImageMetadata = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.error('[images] Failed to load curated image metadata:', err?.message || err);
        cachedImageMetadata = [];
    }

    return cachedImageMetadata;
}

function toNormalizedArray(values) {
    if (!Array.isArray(values)) {
        return [];
    }
    return values
        .map((value) => String(value || '').trim().toLowerCase())
        .filter(Boolean);
}

function matchesTerm(value, term) {
    if (!value || !term) {
        return false;
    }
    return String(value).toLowerCase().includes(term);
}

function imageMatchesSearchTerm(image, term) {
    if (!term) {
        return true;
    }

    return matchesTerm(image?.category, term)
        || matchesTerm(image?.topic, term)
        || matchesTerm(image?.title, term)
        || matchesTerm(image?.caption, term)
        || matchesTerm(image?.description, term)
        || matchesTerm(image?.detailedDescription, term)
        || matchesTerm(image?.context, term)
        || toNormalizedArray(image?.tags).some((entry) => entry.includes(term))
        || toNormalizedArray(image?.subtopics).some((entry) => entry.includes(term))
        || toNormalizedArray(image?.concepts).some((entry) => entry.includes(term));
}

function pickRandomSubset(list, count) {
    const limit = Math.max(0, Math.min(list.length, Math.floor(count)));
    if (!limit) {
        return [];
    }
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, limit);
}

function selectMetadataRecords({ subject, category, topic, count = 1, visualTypes = [], subtopics = [], concepts = [] }) {
    const metadata = loadImageMetadataRecords();
    if (!metadata.length) {
        return [];
    }

    const subjectKey = normalizeSubjectKey(subject);
    let pool = metadata;

    if (subjectKey) {
        const subjectMatches = metadata.filter((image) => normalizeSubjectKey(image?.subject || image?.domain || '') === subjectKey);
        if (subjectMatches.length) {
            pool = subjectMatches;
        }
    }

    const searchTerm = (category || topic || '').trim().toLowerCase();
    if (searchTerm) {
        const filteredByTerm = pool.filter((image) => imageMatchesSearchTerm(image, searchTerm));
        if (filteredByTerm.length) {
            pool = filteredByTerm;
        }
    }

    const normalizedVisualTypes = toNormalizedArray(visualTypes);
    if (normalizedVisualTypes.length) {
        const visualSet = new Set(normalizedVisualTypes);
        const filteredByVisual = pool.filter((image) => visualSet.has(String(image?.visualType || '').trim().toLowerCase()));
        if (filteredByVisual.length) {
            pool = filteredByVisual;
        }
    }

    const normalizedSubtopics = toNormalizedArray(subtopics);
    if (normalizedSubtopics.length) {
        const subtopicSet = new Set(normalizedSubtopics);
        const filteredBySubtopic = pool.filter((image) => {
            const imageSubtopics = toNormalizedArray(image?.subtopics);
            return imageSubtopics.some((entry) => subtopicSet.has(entry));
        });
        if (filteredBySubtopic.length) {
            pool = filteredBySubtopic;
        }
    }

    const normalizedConcepts = toNormalizedArray(concepts);
    if (normalizedConcepts.length) {
        const conceptSet = new Set(normalizedConcepts);
        const filteredByConcept = pool.filter((image) => {
            const imageConcepts = toNormalizedArray(image?.concepts);
            return imageConcepts.some((entry) => conceptSet.has(entry));
        });
        if (filteredByConcept.length) {
            pool = filteredByConcept;
        }
    }

    if (!pool.length) {
        pool = metadata;
    }

    return pickRandomSubset(pool, Math.max(1, count));
}

function buildSimpleImagePrompt(subject, image) {
    const safeSubject = typeof subject === 'string' && subject.trim().length ? subject.trim() : 'General Studies';
    const title = typeof image?.title === 'string' && image.title.trim().length ? image.title.trim() : 'N/A';
    const description = typeof image?.description === 'string' && image.description.trim().length
        ? image.description.trim()
        : typeof image?.detailedDescription === 'string' && image.detailedDescription.trim().length
            ? image.detailedDescription.trim()
            : typeof image?.caption === 'string' && image.caption.trim().length
                ? image.caption.trim()
                : '';
    const context = typeof image?.context === 'string' && image.context.trim().length
        ? image.context.trim()
        : typeof image?.region === 'string' && image.region.trim().length
            ? image.region.trim()
            : typeof image?.timePeriod === 'string' && image.timePeriod.trim().length
                ? image.timePeriod.trim()
                : 'N/A';

    return `You are a GED exam creator. Based on this image metadata, write one high-quality GED-style question.\nSubject: ${safeSubject}\nTitle: ${title}\nDescription: ${description}\nContext: ${context}`;
}

function resolveMetadataImagePath(image) {
    if (!image || typeof image !== 'object') {
        return null;
    }

    const candidates = [
        image.filePath,
        image.file,
        image.filename,
        image.src,
        image.path
    ];

    for (const candidate of candidates) {
        if (typeof candidate !== 'string') {
            continue;
        }
        const trimmed = candidate.trim();
        if (!trimmed || /^https?:\/\//i.test(trimmed)) {
            continue;
        }
        const normalized = normalizeImagePath(trimmed);
        if (normalized) {
            return normalized;
        }
    }

    return null;
}

async function generateSimpleImageQuestions({ subject, images, timeoutMs }) {
    const resolvedImages = Array.isArray(images) ? images : [];
    const questions = [];
    const callOptions = {
        timeoutMs: Math.min(MODEL_HTTP_TIMEOUT_MS, timeoutMs || MODEL_HTTP_TIMEOUT_MS),
        callSite: 'image-metadata-simple'
    };

    for (const image of resolvedImages) {
        const prompt = buildSimpleImagePrompt(subject, image);
        try {
            const rawQuestion = await callAI(prompt, SINGLE_IMAGE_QUESTION_SCHEMA, callOptions);
            const normalized = buildNormalizedImageQuestion(rawQuestion, { subject, index: questions.length });
            if (!normalized) {
                continue;
            }

            const imageUrl = resolveMetadataImagePath(image);
            if (!imageUrl) {
                console.warn('[IMG-FIRST] Skipping image with missing local path', image?.id || image?.file || 'unknown');
                continue;
            }

            const altText = [image?.alt, image?.altText, image?.title, image?.caption]
                .map((value) => (typeof value === 'string' ? value.trim() : ''))
                .find((value) => value.length) || '';

            normalized.imageUrl = imageUrl;
            normalized.imageAlt = altText;
            normalized.imageId = image?.id || null;
            normalized.imageRef = {
                id: image?.id || null,
                imageUrl,
                altText
            };
            normalized.subject = subject;
            normalized.questionNumber = questions.length + 1;

            questions.push(normalized);
        } catch (error) {
            console.warn('[IMG-FIRST] Failed to generate question from metadata', image?.id || image?.file || 'unknown', error?.message || error);
        }
    }

    return questions;
}

function selectCuratedImages({ subject, count = 10, visualTypes = [], subtopics = [], concepts = [] }) {
    return selectMetadataRecords({ subject, count, visualTypes, subtopics, concepts });
}

const SINGLE_IMAGE_QUESTION_SCHEMA = {
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
            },
            minItems: 3,
            maxItems: 6
        },
        rationale: { type: "STRING" },
        difficulty: { type: "STRING" }
    },
    required: ["questionText", "answerOptions"]
};

function buildNormalizedImageQuestion(rawQuestion, { subject, index }) {
    if (!rawQuestion || typeof rawQuestion !== 'object') {
        return null;
    }

    const text = typeof rawQuestion.questionText === 'string' ? rawQuestion.questionText.trim() : '';
    if (!text) {
        return null;
    }

    let answerOptions = Array.isArray(rawQuestion.answerOptions)
        ? rawQuestion.answerOptions.map((opt) => {
            if (!opt || typeof opt !== 'object') {
                const textValue = String(opt ?? '').trim();
                return { text: textValue, isCorrect: false, rationale: '' };
            }
            const textValue = typeof opt.text === 'string' ? opt.text.trim() : String(opt.text ?? '').trim();
            const rationaleValue = typeof opt.rationale === 'string' ? opt.rationale.trim() : '';
            return { text: textValue, isCorrect: Boolean(opt.isCorrect), rationale: rationaleValue };
        }).filter((opt) => opt.text.length)
        : [];

    if (answerOptions.length < 4) {
        return null;
    }

    let correctIndex = answerOptions.findIndex((opt) => opt.isCorrect);
    if (correctIndex === -1) {
        answerOptions = answerOptions.map((opt, idx) => ({ ...opt, isCorrect: idx === 0 }));
        correctIndex = 0;
    }

    if (answerOptions.length > 4) {
        if (correctIndex < 4) {
            answerOptions = answerOptions.slice(0, 4);
        } else {
            const correct = answerOptions[correctIndex];
            const others = answerOptions.filter((_, idx) => idx !== correctIndex).slice(0, 3);
            answerOptions = [correct, ...others];
            correctIndex = 0;
        }
    }

    const explanation = typeof rawQuestion.rationale === 'string' ? rawQuestion.rationale.trim() : '';
    const normalized = answerOptions.map((opt, idx) => ({
        text: opt.text,
        isCorrect: idx === correctIndex,
        rationale: opt.rationale || explanation
    }));

    const baseQuestion = {
        id: rawQuestion.id || `img-${Date.now()}-${index}`,
        questionNumber: index + 1,
        type: 'image',
        questionText: text,
        stem: text,
        answerOptions: normalized,
        choices: normalized.map((opt) => opt.text),
        correctIndex,
        solution: explanation,
        rationale: explanation,
        difficulty: typeof rawQuestion.difficulty === 'string' ? rawQuestion.difficulty : undefined
    };

    return normalizeQuestionSkeleton(baseQuestion, subject);
}

async function generateQuestionsFromImages({ subject, images, questionCount, timeoutMs }) {
    const desiredCount = Math.max(1, Math.floor(questionCount || (Array.isArray(images) ? images.length : 0) || 1));
    const resolvedImages = Array.isArray(images) && images.length
        ? images
        : selectMetadataRecords({ subject, count: desiredCount });
    const safeSubject = typeof subject === 'string' && subject.trim().length ? subject.trim() : 'General Studies';

    const questions = await generateSimpleImageQuestions({ subject: safeSubject, images: resolvedImages.slice(0, desiredCount), timeoutMs });

    return {
        id: `ai_image_exam_${Date.now()}`,
        title: `${safeSubject} Image-Based Exam`,
        subject: safeSubject,
        questions
    };
}

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
    return normalizeQuestionSkeleton(question, 'Math');
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
    return normalizeQuestionSkeleton(question, 'Math');
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
    return normalizeQuestionSkeleton(question, 'Math');
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
    return normalizeQuestionSkeleton(question, 'Math');
}

async function generateRlaPart1(options = {}) {
    const prompt = `${STRICT_JSON_HEADER_RLA}
Create the Reading Comprehension section of a GED RLA exam. Produce exactly 4 passages: 2 informational texts, 1 literary prose text (like a short story excerpt), and 1 public domain poem. Each passage should be an appropriate length for a GED test, have a title in <strong> tags, and use <p> tags for paragraphs. For EACH of the 4 passages, generate exactly 5 reading comprehension questions (total 20). Return the JSON array of question objects only.`;
    const schema = { type: "ARRAY", items: singleQuestionSchema };
    const questions = await callAI(prompt, schema, options);
    const cappedQuestions = Array.isArray(questions)
        ? questions.map((q) => normalizeQuestionSkeleton(q, 'RLA'))
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
        p.questions.forEach(q => groupedQuestions.push(normalizeQuestionSkeleton({ ...q, passage: p.passage, type: 'passage' }, 'RLA')));
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
        ? questions.map((q) => normalizeQuestionSkeleton(q, 'RLA'))
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
        p.questions.forEach(q => groupedQuestions.push(normalizeQuestionSkeleton({ ...q, passage: p.passage, type: 'passage' }, 'RLA')));
    });
    return groupedQuestions;
}

async function reviewAndCorrectQuiz(draftQuiz, options = {}) {
    const prompt = `You are a meticulous GED exam editor. Output only valid JSON. No markdown, no code fences, no trailing commas, no comments.
Review the provided JSON for a ${draftQuiz.questions.length}-question ${draftQuiz.subject} exam. Your task is to review and improve it based on these rules:
    1.  **IMPROVE QUESTION VARIETY:** The top priority. If you see repetitive question phrasing, rewrite some questions to ask about specific details, inferences, or data points.
    2.  **ENSURE CLARITY:** Fix any grammatical errors or awkward phrasing.
    3.  **MAINTAIN JSON STRUCTURE:** The final output MUST be a perfectly valid JSON object that strictly adheres to the original schema. Do not change any field names.

    Here is the draft quiz JSON:
    ---
    ${JSON.stringify(draftQuiz, null, 2)}
    ---
    Return the corrected and improved quiz as a single, valid JSON object.`;

    const isSocialStudies = draftQuiz.subject === 'Social Studies';
    const schema = isSocialStudies ? SS_RESPONSE_SCHEMA : quizSchema;
    const callOptions = isSocialStudies ? { ...options, callSite: 'ss-review' } : options;
    const correctedQuiz = await callAI(prompt, schema, callOptions);

    if (draftQuiz?.subject && correctedQuiz && typeof correctedQuiz === 'object' && !correctedQuiz.subject) {
        correctedQuiz.subject = draftQuiz.subject;
    }
    if (draftQuiz?.title && correctedQuiz && typeof correctedQuiz === 'object' && !correctedQuiz.title) {
        correctedQuiz.title = draftQuiz.title;
    }

    if (isSocialStudies) {
        if (correctedQuiz && typeof correctedQuiz === 'object') {
            if (typeof draftQuiz?.title === 'string') {
                correctedQuiz.title = draftQuiz.title;
            }
            if (draftQuiz?.subject && !correctedQuiz.subject) {
                correctedQuiz.subject = draftQuiz.subject;
            }
        }
        return correctedQuiz;
    }

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

        let items = generatedItems.map((it) => normalizeAnswerOptionsStructure(
            enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(it)), subject)
        ));
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
                items[bad[j]] = normalizeAnswerOptionsStructure(
                    enforceWordCapsOnItem(sanitizeQuestionKeepLatex(cloneQuestion(f)), subject)
                );
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

app.post('/generate-quiz', (_req, res) => {
    res.status(410).json({ error: 'legacy_endpoint_removed', message: 'Use /api/exams/generate.' });
});

app.post('/api/generate-exam', (_req, res) => {
    res.status(410).json({ error: 'legacy_endpoint_removed', message: 'Use /api/exams/generate.' });
});

app.post('/api/exams/generate', express.json(), async (req, res) => {
    try {
        const { subject, examType, totalQuestions, sectionMix, useImages } = req.body || {};
        if (!subject || typeof subject !== 'string' || !subject.trim().length) {
            return res.status(400).json({ error: 'subject_required' });
        }

        if (totalQuestions != null) {
            const parsed = Number(totalQuestions);
            if (!Number.isFinite(parsed) || parsed <= 0) {
                return res.status(400).json({ error: 'total_questions_invalid' });
            }
        }

        const payload = await generateAiExamPayload({ subject, examType, totalQuestions, sectionMix, useImages });
        res.json(payload);
    } catch (error) {
        console.error('AI exam generation failed:', error);
        const message = typeof error?.message === 'string' ? error.message : 'Failed to generate exam.';
        res.status(500).json({ error: 'failed_to_generate_exam', message });
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
        const intendedRole = typeof req.body?.intendedRole === 'string'
            ? req.body.intendedRole.trim().toLowerCase()
            : null;
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

        if (intendedRole === 'instructor') {
            try {
                const updateRoleResult = await pool.query(
                    `UPDATE users
                     SET role = 'instructor',
                         organization_id = $1
                     WHERE id = $2
                     RETURNING *;`,
                    [1, userRow.id]
                );

                if (updateRoleResult.rowCount > 0) {
                    userRow = updateRoleResult.rows[0];
                } else {
                    userRow.role = 'instructor';
                    userRow.organization_id = 1;
                }
            } catch (error) {
                console.error('Failed to update instructor role after Google login:', error);
                throw error;
            }
        } else if (!userRow.role) {
            userRow.role = 'student';
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


app.use((err, req, res, next) => {
    console.error(err?.stack || err);
    res.status(500).json({
        error: 'Something went wrong on our end. Please try again later.'
    });
});

// The '0.0.0.0' is important for containerized environments like Render.
if (require.main === module) {
    const startServer = () => {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Your service is live 🚀`);
            console.log(`Server listening on port ${port}`);
        });
    };

    if (isDatabaseConfigured()) {
        ensureSchema(pool)
            .then(startServer)
            .catch((err) => {
                console.error('Failed to ensure database schema:', err);
                process.exit(1);
            });
    } else {
        startServer();
    }
}

module.exports = {
    normalizeLatexText,
    selectCuratedImages,
    filterEligibleImages,
    isImageEligible
};
