#!/usr/bin/env node
/*
 * AI BANK DUPLICATION AUDIT
 * Cross-references AI questions against previously audited static sources.
 * Outputs:
 *  - reports/ai_duplications_vs_static.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');
const API_BASE = process.env.API_BASE_URL || 'http://localhost:3002';

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function normalizeText(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\s+/g, ' ').trim();
}

function stableKeySort(value) {
  if (Array.isArray(value)) return value.map(stableKeySort);
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = stableKeySort(value[key]);
    }
    return out;
  }
  return value;
}

function hashObject(obj) {
  const stable = stableKeySort(obj);
  const json = JSON.stringify(stable);
  return crypto.createHash('sha256').update(json).digest('hex');
}

function getQuestionText(q) {
  if (!q || typeof q !== 'object') return '';
  const direct =
    typeof q.questionText === 'string'
      ? q.questionText
      : typeof q.text === 'string'
        ? q.text
        : typeof q.question === 'string'
          ? q.question
          : '';
  if (direct && direct.trim()) return direct;
  const content = q.content && typeof q.content === 'object' ? q.content : null;
  if (content) {
    const nested =
      typeof content.questionText === 'string'
        ? content.questionText
        : typeof content.text === 'string'
          ? content.text
          : typeof content.question === 'string'
            ? content.question
            : '';
    if (nested && nested.trim()) return nested;
  }
  return '';
}

function getPassageText(q) {
  return q?.passage || q?.passageText || q?.passageHtml || '';
}

function getAnswerOptions(q) {
  if (Array.isArray(q?.answerOptions)) return q.answerOptions;
  if (Array.isArray(q?.choices)) return q.choices;
  if (Array.isArray(q?.answers)) return q.answers;
  if (Array.isArray(q?.options)) return q.options;
  return [];
}

function normalizeOption(opt) {
  if (opt && typeof opt === 'object') {
    return {
      text: normalizeText(
        opt.text || opt.label || opt.value || opt.answer || ''
      ),
      value: normalizeText(opt.value || opt.id || ''),
      isCorrect: !!(opt.isCorrect || opt.correct || opt.isAnswer),
    };
  }
  return { text: normalizeText(opt), value: '', isCorrect: false };
}

function computeContentFingerprint(question) {
  const q = question || {};
  const options = getAnswerOptions(q).map(normalizeOption);
  const correctOptionTexts = options
    .filter((o) => o.isCorrect)
    .map((o) => o.text)
    .filter(Boolean);
  const payload = {
    type: normalizeText(q.type || q.questionType || q.format || q.kind || ''),
    questionText: normalizeText(getQuestionText(q)),
    passage: normalizeText(getPassageText(q)),
    options: options.map((o) => o.text),
    correctText: correctOptionTexts.length ? correctOptionTexts : undefined,
    correctAnswer: normalizeText(
      q.correctAnswer || q.answer || q.correct || ''
    ),
  };
  return hashObject(payload);
}

async function devLogin() {
  const res = await fetch(`${API_BASE}/api/dev-login-as`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'superAdmin' }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Dev login failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  const token = data?.token || null;
  if (!token) {
    throw new Error('Dev login succeeded but no token was returned');
  }
  return token;
}

async function fetchAiQuestions(token) {
  const res = await fetch(`${API_BASE}/api/admin/all-questions`, {
    headers: token
      ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI questions fetch failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function loadStaticInventory() {
  const inventoryPath = path.join(REPORTS, 'phase1_inventory_all_sources.json');
  const raw = fs.readFileSync(inventoryPath, 'utf8');
  const data = JSON.parse(raw);
  const inventory = Array.isArray(data?.inventory) ? data.inventory : [];
  const byContent = new Map();
  inventory.forEach((entry) => {
    if (!entry?.contentFingerprint) return;
    if (!byContent.has(entry.contentFingerprint)) {
      byContent.set(entry.contentFingerprint, []);
    }
    byContent.get(entry.contentFingerprint).push({
      questionRef: entry.questionRef,
      source: entry.source,
    });
  });
  return { inventory, byContent };
}

async function main() {
  ensureDir(REPORTS);

  const report = {
    generatedAt: new Date().toISOString(),
    apiBase: API_BASE,
    staticInventory: {
      source: 'reports/phase1_inventory_all_sources.json',
      total: 0,
      uniqueContentFingerprints: 0,
    },
    aiBank: {
      totalRows: 0,
      totalQuestions: 0,
      matchedToStatic: 0,
      unmatched: 0,
    },
    matches: [],
    unmatched: [],
    errors: [],
  };

  try {
    const { inventory, byContent } = loadStaticInventory();
    report.staticInventory.total = inventory.length;
    report.staticInventory.uniqueContentFingerprints = byContent.size;

    const token = await devLogin();
    const rows = await fetchAiQuestions(token);
    report.aiBank.totalRows = rows.length;

    rows.forEach((row, idx) => {
      const q = row?.question_json || row?.question || row;
      if (!q || typeof q !== 'object') return;
      report.aiBank.totalQuestions += 1;
      const contentFingerprint = computeContentFingerprint(q);
      const matches = byContent.get(contentFingerprint) || [];
      if (matches.length > 0) {
        report.aiBank.matchedToStatic += 1;
        report.matches.push({
          aiId: row?.id ?? idx,
          subject: row?.subject || q?.subject || 'Unknown',
          topic: row?.topic || q?.topic || q?.category || 'Unknown',
          contentFingerprint,
          staticMatches: matches,
        });
      } else {
        report.aiBank.unmatched += 1;
        report.unmatched.push({
          aiId: row?.id ?? idx,
          subject: row?.subject || q?.subject || 'Unknown',
          topic: row?.topic || q?.topic || q?.category || 'Unknown',
          contentFingerprint,
        });
      }
    });
  } catch (err) {
    report.errors.push(String(err?.message || err));
  }

  const outPath = path.join(REPORTS, 'ai_duplications_vs_static.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`[ai-dup] wrote ${path.relative(ROOT, outPath)}`);
  if (report.errors.length) {
    console.error('[ai-dup] errors:', report.errors.join(' | '));
    process.exitCode = 1;
  } else {
    console.log(
      `[ai-dup] staticQuestions=${report.staticInventory.total} aiQuestions=${report.aiBank.totalQuestions} matched=${report.aiBank.matchedToStatic} unmatched=${report.aiBank.unmatched}`
    );
  }
}

main().catch((err) => {
  console.error('[ai-dup] fatal:', err);
  process.exit(1);
});
