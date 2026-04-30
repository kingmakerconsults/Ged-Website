// backend/src/essayScoringService.js
// Shared core for AI-based essay scoring. Used by:
//   - POST /api/essay/score    (solo Essay Practice; persists to essay_scores)
//   - collab `essay:submit`    (collaborative essay; does NOT persist)
//
// The HTTP route remains responsible for DB persistence and challenge-tag
// pipelines; this module just produces a normalized score object (or a
// fallback) without side effects.

const axios = require('axios');
const {
  buildEssayScoringPrompt,
  ESSAY_RESPONSE_SCHEMA,
  normalizeEssayResponse,
  analyzeEssayHeuristics,
  applyHeuristicCaps,
  deriveChallengeTags,
  buildFallbackResponse,
} = require('./essayRubric');

const DEFAULT_TIMEOUT_MS = Number(process.env.MODEL_HTTP_TIMEOUT_MS) || 60_000;
const httpClient = axios.create({ timeout: DEFAULT_TIMEOUT_MS });

/**
 * Score an essay with the Gemini API and apply heuristic caps + challenge tags.
 *
 * @param {string} essayText
 * @param {object} [opts]
 * @param {boolean} [opts.completion=true]  Was the essay submitted as final?
 * @param {string}  [opts.logTag='ESSAY-SCORE']  Prefix for log lines.
 * @returns {Promise<{ ok: boolean, normalized: object, heuristics?: object, fallback?: boolean, error?: string }>}
 *   Always resolves; on failure returns `{ ok:false, fallback:true, normalized: <fallback> }`.
 */
async function scoreEssayWithAI(essayText, opts = {}) {
  const { completion = true, logTag = 'ESSAY-SCORE' } = opts;
  if (!essayText || typeof essayText !== 'string' || !essayText.trim()) {
    return {
      ok: false,
      fallback: true,
      normalized: buildFallbackResponse(),
      error: 'Empty essay text',
    };
  }
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.error(`[${logTag}] API key not configured on the server.`);
    return {
      ok: false,
      fallback: true,
      normalized: buildFallbackResponse(),
      error: 'Missing GOOGLE_AI_API_KEY',
    };
  }

  const prompt = buildEssayScoringPrompt(essayText, completion);
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ESSAY_RESPONSE_SCHEMA,
    },
  };
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await httpClient.post(apiUrl, payload);
    const normalized = normalizeEssayResponse(response.data);
    if (!normalized) {
      throw new Error('AI response was not parseable');
    }
    const heuristics = analyzeEssayHeuristics(essayText);
    const warnings = applyHeuristicCaps(normalized, heuristics);
    deriveChallengeTags(normalized, heuristics);
    if (warnings.length) {
      console.log(`[${logTag}] Heuristic warnings:`, warnings);
    }
    return { ok: true, normalized, heuristics, warnings };
  } catch (error) {
    const errMsg = error?.response
      ? JSON.stringify(error.response.data)
      : error?.message || String(error);
    console.error(`[${logTag}] AI scoring failed:`, errMsg);
    return {
      ok: false,
      fallback: true,
      normalized: buildFallbackResponse(),
      error: errMsg,
    };
  }
}

module.exports = { scoreEssayWithAI };
