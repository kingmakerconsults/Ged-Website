// frontend/components/collab/CollabHeader.jsx
// Lightweight standalone header for /collab routes so they keep the same
// top bar as the rest of the app even though they render outside
// LegacyRootApp. Mirrors the legacy header's look (Mr. Smith's Learning
// Canvas title, primary nav, theme toggle, user chip) without depending
// on any of the legacy app's hooks/state.
import React, { useEffect, useState } from 'react';

function getCurrentUser() {
  try {
    const raw = localStorage.getItem('appUser');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function readTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(next) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (next === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  try {
    localStorage.setItem('theme', next);
  } catch (_) {}
}

export default function CollabHeader() {
  const [user] = useState(() => getCurrentUser());
  const [theme, setTheme] = useState(() => readTheme());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Keep in sync if other parts of the app toggle the html.dark class.
    const obs = new MutationObserver(() => setTheme(readTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  const isDark = theme === 'dark';
  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };

  const goHome = () => {
    window.location.href = '/';
  };
  const goQuizzes = () => {
    window.location.href = '/?view=quizzes';
  };
  const goProgress = () => {
    window.location.href = '/?view=progress';
  };

  return (
    <>
      <header
        className="app-header fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b shadow-sm"
        style={{
          backgroundColor: isDark
            ? 'rgba(15,23,42,0.85)'
            : 'rgba(255,255,255,0.9)',
          borderColor: isDark ? '#1e293b' : '#e2e8f0',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center gap-4 justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goHome}
              className="text-left text-base sm:text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg px-2"
              style={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            >
              Mr. Smith's Learning Canvas
            </button>
            <nav className="hidden md:flex items-center gap-4">
              <button
                onClick={goHome}
                type="button"
                className="text-sm font-medium hover:underline"
                style={{ color: isDark ? '#cbd5e1' : '#334155' }}
              >
                Dashboard
              </button>
              <button
                onClick={goQuizzes}
                type="button"
                className="text-sm font-medium hover:underline"
                style={{ color: isDark ? '#cbd5e1' : '#334155' }}
              >
                Quizzes
              </button>
              <button
                onClick={goProgress}
                type="button"
                className="text-sm font-medium hover:underline"
                style={{ color: isDark ? '#cbd5e1' : '#334155' }}
              >
                Progress
              </button>
              {user && (
                <a
                  href="/collab"
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full no-underline"
                  style={{ textDecoration: 'none' }}
                >
                  🤝 Work Together
                </a>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border"
              style={{
                borderColor: isDark ? '#334155' : '#e2e8f0',
                color: isDark ? '#f8fafc' : '#0f172a',
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
              }}
            >
              <span className="text-lg leading-none">☰</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              aria-pressed={isDark}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm"
              style={{
                borderColor: isDark ? '#334155' : '#e2e8f0',
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
              }}
            >
              <span style={{ fontSize: 18 }}>{isDark ? '🌙' : '☀️'}</span>
            </button>
            {user && (
              <div className="hidden md:flex items-center gap-2">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      backgroundColor: '#7c3aed',
                      color: '#ffffff',
                    }}
                  >
                    {(user.name || user.email || '?').charAt(0).toUpperCase()}
                  </div>
                )}
                <span
                  className="text-sm"
                  style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                >
                  {user.name || user.email}
                </span>
              </div>
            )}
          </div>
        </div>
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-2"
            style={{
              borderColor: isDark ? '#1e293b' : '#e2e8f0',
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
            }}
          >
            <button
              onClick={goHome}
              className="text-left text-sm font-medium"
              style={{ color: isDark ? '#cbd5e1' : '#334155' }}
            >
              Dashboard
            </button>
            <button
              onClick={goQuizzes}
              className="text-left text-sm font-medium"
              style={{ color: isDark ? '#cbd5e1' : '#334155' }}
            >
              Quizzes
            </button>
            <button
              onClick={goProgress}
              className="text-left text-sm font-medium"
              style={{ color: isDark ? '#cbd5e1' : '#334155' }}
            >
              Progress
            </button>
            {user && (
              <a
                href="/collab"
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full no-underline text-center"
                style={{ textDecoration: 'none' }}
              >
                🤝 Work Together
              </a>
            )}
          </div>
        )}
      </header>
      {/* Spacer to offset the fixed header so page content isn't hidden under it */}
      <div style={{ height: 64 }} aria-hidden="true" />
    </>
  );
}
