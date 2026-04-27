import { useEffect, useState } from 'react';

/**
 * progressStore.js
 * localStorage-backed progress for the Workforce Hub.
 *
 * Stores per-user state under key `workforce:progress:{userId}`. Emits a
 * `workforce:progress` window event whenever state changes so components
 * (hub, academy, badge chips) can re-render without prop drilling.
 *
 * Schema:
 *   {
 *     dl: { [moduleId]: { score: 0..100, mastered: bool, attempts: n, lastAt: ISO } },
 *     badges: { foundation: bool, pro: bool },
 *     proctored: bool,                // instructor toggle
 *     journal: { [yyyy-mm-dd]: string },
 *     streak: { count: n, lastDay: 'yyyy-mm-dd' },
 *     applications: [ { id, company, role, dateApplied, status, nextStep, contact } ],
 *     star: [ { id, label, situation, task, action, result } ],
 *   }
 */

const KEY = (uid) => `workforce:progress:${uid || 'anon'}`;
const EVENT = 'workforce:progress';

export const MASTERY_THRESHOLD = 85;

// 17 Northstar-aligned ids + 5 beyond-Northstar ids.
export const FOUNDATION_MODULES = [
  'a1_phone_login',
  'a2_basic_computer',
  'a3_internet_basics',
  'a4_using_email',
  'a5_windows_10',
  'a6_windows_11',
  'a7_mac_os',
  'b1_ms_word',
  'b2_ms_excel',
  'b3_ms_powerpoint',
  'b4_google_docs',
  'c1_social_media',
  'c2_information_literacy',
  'c3_career_search_skills',
  'c4_k12_distance',
  'c5_telehealth',
  'c6_digital_footprint',
  'c7_cybersecurity', // counted toward Northstar parity (Cybersecurity Basics)
];

export const PRO_MODULES = [
  ...FOUNDATION_MODULES,
  'd1_ai_literacy',
  'd2_smartphone_privacy',
  'd3_video_conferencing',
  'd4_web_accessibility',
  'd5_civic_gov_services',
];

const empty = () => ({
  dl: {},
  badges: { foundation: false, pro: false },
  proctored: false,
  journal: {},
  streak: { count: 0, lastDay: null },
  applications: [],
  star: [],
});

export function loadProgress(userId) {
  if (typeof window === 'undefined') return empty();
  try {
    const raw = window.localStorage.getItem(KEY(userId));
    if (!raw) return empty();
    const parsed = JSON.parse(raw);
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

function save(userId, state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY(userId), JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { userId } }));
  } catch {
    /* ignore quota errors */
  }
}

export function recomputeBadges(state) {
  const masteredCount = (ids) =>
    ids.filter((id) => state.dl[id]?.mastered).length;
  return {
    foundation: masteredCount(FOUNDATION_MODULES) === FOUNDATION_MODULES.length,
    pro: masteredCount(PRO_MODULES) === PRO_MODULES.length,
  };
}

export function setModuleResult(userId, moduleId, score) {
  const state = loadProgress(userId);
  const prev = state.dl[moduleId] || { attempts: 0 };
  state.dl[moduleId] = {
    score: Math.max(0, Math.min(100, Math.round(score))),
    mastered: score >= MASTERY_THRESHOLD,
    attempts: (prev.attempts || 0) + 1,
    lastAt: new Date().toISOString(),
  };
  state.badges = recomputeBadges(state);
  save(userId, state);
  return state;
}

export function setProctored(userId, enabled) {
  const state = loadProgress(userId);
  state.proctored = !!enabled;
  save(userId, state);
}

export function recordJournalEntry(userId, dayKey, text) {
  const state = loadProgress(userId);
  state.journal[dayKey] = String(text || '');
  // streak: bump if dayKey is today and lastDay was yesterday or today.
  const today = new Date().toISOString().slice(0, 10);
  if (dayKey === today) {
    const last = state.streak.lastDay;
    if (last === today) {
      // already counted today
    } else {
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10);
      state.streak.count = last === yesterday ? state.streak.count + 1 : 1;
      state.streak.lastDay = today;
    }
  }
  save(userId, state);
  return state;
}

export function upsertApplication(userId, app) {
  const state = loadProgress(userId);
  const id =
    app.id || `app_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const idx = state.applications.findIndex((a) => a.id === id);
  const next = { ...app, id };
  if (idx >= 0) state.applications[idx] = next;
  else state.applications.push(next);
  save(userId, state);
  return next;
}

export function deleteApplication(userId, id) {
  const state = loadProgress(userId);
  state.applications = state.applications.filter((a) => a.id !== id);
  save(userId, state);
}

export function upsertStar(userId, star) {
  const state = loadProgress(userId);
  const id =
    star.id || `star_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const idx = state.star.findIndex((s) => s.id === id);
  const next = { ...star, id };
  if (idx >= 0) state.star[idx] = next;
  else state.star.push(next);
  save(userId, state);
  return next;
}

export function deleteStar(userId, id) {
  const state = loadProgress(userId);
  state.star = state.star.filter((s) => s.id !== id);
  save(userId, state);
}

/** React hook: subscribe to progress changes for a user. */
export function useWorkforceProgress(userId) {
  const [state, setState] = useState(() => loadProgress(userId));
  useEffect(() => {
    setState(loadProgress(userId));
    const handler = (e) => {
      if (!e?.detail?.userId || e.detail.userId === userId) {
        setState(loadProgress(userId));
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener(EVENT, handler);
      return () => window.removeEventListener(EVENT, handler);
    }
    return undefined;
  }, [userId]);
  return state;
}
