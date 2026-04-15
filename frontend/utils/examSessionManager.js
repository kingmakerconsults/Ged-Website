/**
 * examSessionManager.js
 *
 * Manages active exam sessions for resume-on-disconnect.
 * Uses backend API as source of truth with localStorage as fast-recovery cache.
 */

const LS_PREFIX = 'activeExam:';

function getApiBase() {
  if (typeof window === 'undefined') return '';
  return (
    (typeof window.API_BASE_URL === 'string' && window.API_BASE_URL) ||
    window.__CLIENT_CONFIG__?.API_BASE_URL ||
    window.location.origin ||
    ''
  );
}

function getAuthToken() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('appToken') || null;
}

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── localStorage helpers ──────────────────────────────────────────────────────

function saveToLocalStorage(quizId, data) {
  try {
    localStorage.setItem(
      LS_PREFIX + quizId,
      JSON.stringify({ ...data, _savedAt: Date.now() })
    );
  } catch (_) {
    // localStorage full or unavailable
  }
}

function loadFromLocalStorage(quizId) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + quizId);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function removeFromLocalStorage(quizId) {
  try {
    localStorage.removeItem(LS_PREFIX + quizId);
  } catch (_) {}
}

function getAllLocalSessions() {
  const sessions = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(LS_PREFIX)) {
        const data = JSON.parse(localStorage.getItem(key));
        if (data) sessions.push(data);
      }
    }
  } catch (_) {}
  return sessions;
}

// ── Backend API calls (fire-and-forget safe) ──────────────────────────────────

/**
 * Create a new active exam session on the backend.
 */
export async function createExamSession({
  quizId,
  subject,
  quizType,
  quizTitle,
  quizPayload,
  timeRemainingMs,
}) {
  const token = getAuthToken();
  if (!token) return null;

  // Save to localStorage immediately for fast recovery
  saveToLocalStorage(quizId, {
    quizId,
    subject,
    quizType,
    quizTitle,
    quizPayload,
    answers: [],
    marked: [],
    confidence: [],
    timeSpent: [],
    currentQuestionIndex: 0,
    timeRemainingMs,
  });

  try {
    const res = await fetch(`${getApiBase()}/api/exam-sessions`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        quizId,
        subject,
        quizType,
        quizTitle,
        quizPayload,
        timeRemainingMs,
      }),
    });
    if (!res.ok) {
      console.warn('[examSession] create failed:', res.status);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn('[examSession] create error:', e?.message);
    return null;
  }
}

/**
 * Auto-save exam progress. Debounce externally.
 */
export async function saveExamProgress(quizId, progress) {
  // Always update localStorage immediately
  const existing = loadFromLocalStorage(quizId);
  if (existing) {
    saveToLocalStorage(quizId, { ...existing, ...progress });
  }

  const token = getAuthToken();
  if (!token) return;

  try {
    await fetch(
      `${getApiBase()}/api/exam-sessions/${encodeURIComponent(quizId)}`,
      {
        method: 'PATCH',
        headers: authHeaders(token),
        body: JSON.stringify(progress),
      }
    );
  } catch (e) {
    // Silently fail — localStorage serves as fallback
    console.warn('[examSession] save error:', e?.message);
  }
}

/**
 * Fetch active (non-expired) exam sessions for the current user.
 * Returns backend sessions merged with any localStorage-only sessions.
 */
export async function fetchActiveSessions() {
  const token = getAuthToken();
  const localSessions = getAllLocalSessions();

  if (!token) {
    // Not authenticated — return localStorage sessions only
    return localSessions.filter((s) => s?.quizPayload).map(normalizeSession);
  }

  try {
    const res = await fetch(`${getApiBase()}/api/exam-sessions/active`, {
      headers: authHeaders(token),
    });
    if (!res.ok) {
      console.warn('[examSession] fetch failed:', res.status);
      return localSessions.filter((s) => s?.quizPayload).map(normalizeSession);
    }
    const serverSessions = await res.json();

    // Server is source of truth. Also sync to localStorage for future fast recovery.
    for (const s of serverSessions) {
      saveToLocalStorage(s.quiz_id, {
        quizId: s.quiz_id,
        subject: s.subject,
        quizType: s.quiz_type,
        quizTitle: s.quiz_title,
        quizPayload: s.quiz_payload,
        answers: s.answers,
        marked: s.marked,
        confidence: s.confidence,
        timeSpent: s.time_spent,
        currentQuestionIndex: s.current_question_index,
        currentPart: s.current_part,
        timeRemainingMs: s.time_remaining_ms,
        essayText: s.essay_text || '',
        runnerState: s.runner_state || null,
        startedAt: s.started_at,
        updatedAt: s.updated_at,
      });
    }

    return serverSessions.map(normalizeSession);
  } catch (e) {
    console.warn('[examSession] fetch error:', e?.message);
    return localSessions.filter((s) => s?.quizPayload).map(normalizeSession);
  }
}

/**
 * Delete an exam session (on submit or abandon).
 */
export async function deleteExamSession(quizId) {
  removeFromLocalStorage(quizId);

  const token = getAuthToken();
  if (!token) return;

  try {
    await fetch(
      `${getApiBase()}/api/exam-sessions/${encodeURIComponent(quizId)}`,
      {
        method: 'DELETE',
        headers: authHeaders(token),
      }
    );
  } catch (e) {
    console.warn('[examSession] delete error:', e?.message);
  }
}

// Normalize a server row to a consistent shape
function normalizeSession(row) {
  // Handle both server snake_case and localStorage camelCase
  return {
    quizId: row.quiz_id || row.quizId,
    subject: row.subject,
    quizType: row.quiz_type || row.quizType,
    quizTitle: row.quiz_title || row.quizTitle,
    quizPayload: row.quiz_payload || row.quizPayload,
    answers: row.answers || [],
    marked: row.marked || [],
    confidence: row.confidence || [],
    timeSpent: row.time_spent || row.timeSpent || [],
    currentQuestionIndex:
      row.current_question_index ?? row.currentQuestionIndex ?? 0,
    currentPart: row.current_part || row.currentPart || null,
    timeRemainingMs: row.time_remaining_ms ?? row.timeRemainingMs ?? null,
    essayText: row.essay_text ?? row.essayText ?? '',
    runnerState: row.runner_state || row.runnerState || null,
    startedAt: row.started_at || row.startedAt || null,
    updatedAt: row.updated_at || row.updatedAt || null,
  };
}
