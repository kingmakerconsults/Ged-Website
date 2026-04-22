// Shared theme + palette for the /collab views.
// Reads (and stays in sync with) the html.dark class managed by CollabHeader
// and the legacy app, and exposes a PALETTE object the inline-styled collab
// components can consume.
import { useEffect, useState } from 'react';

function readTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

const LIGHT = {
  isDark: false,
  pageBg: '#f8fafc',
  pageText: '#0f172a',
  cardBg: '#ffffff',
  cardBorder: '#e2e8f0',
  mutedText: '#475569',
  subtleText: '#64748b',
  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
  inputText: '#0f172a',
  primary: '#7c3aed',
  primaryText: '#ffffff',
  bannerBg: '#eef2ff',
  bannerBorder: '#c7d2fe',
  bannerText: '#4338ca',
  pillBg: '#ffffff',
  pillText: '#4338ca',
  divider: '#e2e8f0',
  successBg: '#dcfce7',
  successText: '#166534',
  errorBg: '#fee2e2',
  errorText: '#b91c1c',
  // CSS variables consumed by CollabQuizSession (and similar) so the same
  // inline-styled component renders correctly in either theme.
  cssVars: {
    '--collab-pageText': '#0f172a',
    '--collab-pageMuted': '#475569',
    '--collab-cardBg': '#ffffff',
    '--collab-cardBorder': '#e2e8f0',
    '--collab-passageBg': '#f8fafc',
    '--collab-optionBg': '#ffffff',
    '--collab-optionBorder': '#cbd5e1',
    '--collab-myChoice': '#dbeafe',
    '--collab-myChoiceBorder': '#3b82f6',
    '--collab-correct': '#dcfce7',
    '--collab-correctBorder': '#16a34a',
    '--collab-wrong': '#fee2e2',
    '--collab-wrongBorder': '#dc2626',
  },
};

const DARK = {
  isDark: true,
  pageBg: '#0f172a',
  pageText: '#e2e8f0',
  cardBg: '#1e293b',
  cardBorder: '#334155',
  mutedText: '#cbd5e1',
  subtleText: '#94a3b8',
  inputBg: '#0f172a',
  inputBorder: '#475569',
  inputText: '#e2e8f0',
  primary: '#8b5cf6',
  primaryText: '#ffffff',
  bannerBg: '#1e1b4b',
  bannerBorder: '#4338ca',
  bannerText: '#c7d2fe',
  pillBg: '#312e81',
  pillText: '#e0e7ff',
  divider: '#334155',
  successBg: '#064e3b',
  successText: '#a7f3d0',
  errorBg: '#7f1d1d',
  errorText: '#fecaca',
  cssVars: {
    '--collab-pageText': '#e2e8f0',
    '--collab-pageMuted': '#94a3b8',
    '--collab-cardBg': '#1e293b',
    '--collab-cardBorder': '#334155',
    '--collab-passageBg': '#0f172a',
    '--collab-optionBg': '#1e293b',
    '--collab-optionBorder': '#475569',
    '--collab-myChoice': '#1e3a8a',
    '--collab-myChoiceBorder': '#60a5fa',
    '--collab-correct': '#064e3b',
    '--collab-correctBorder': '#22c55e',
    '--collab-wrong': '#7f1d1d',
    '--collab-wrongBorder': '#f87171',
  },
};

export default function useCollabTheme() {
  const [theme, setTheme] = useState(() => readTheme());

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const obs = new MutationObserver(() => setTheme(readTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  return theme === 'dark' ? DARK : LIGHT;
}

export { LIGHT, DARK };
