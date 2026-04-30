// frontend/components/layout/PlatformHeader.jsx
//
// Shared top header used by routes that render OUTSIDE the legacy app
// (e.g. /collab, /collab/:roomCode, /workforce). Visually mirrors the
// legacy `AppHeader` defined inside LegacyRootApp.jsx — same brand title,
// same nav items, same theme toggle, same user menu — so the platform
// feels identical no matter which page you're on.
//
// Because we live outside the legacy state, navigation to in-app views
// (Dashboard / Quizzes / Progress / Profile / Settings) is done via
// `/?nav=<view>` and the legacy app consumes that query param on mount
// to call its internal `goTo*` shortcuts.
import React, { useEffect, useState } from 'react';
import AppIcon from '../../src/components/icons/AppIcon.jsx';

function readUser() {
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
  if (next === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
  try {
    localStorage.setItem('theme', next);
  } catch (_) {}
}

function go(nav) {
  if (typeof window === 'undefined') return;
  window.location.href = `/?nav=${encodeURIComponent(nav)}`;
}

export default function PlatformHeader() {
  const [user] = useState(readUser);
  const [theme, setTheme] = useState(readTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
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

  const handleLogout = () => {
    try {
      localStorage.removeItem('appUser');
      localStorage.removeItem('appToken');
      localStorage.removeItem('token');
    } catch (_) {}
    window.location.href = '/';
  };

  const displayName = user?.name || user?.email || 'Learner';
  const initial = displayName.trim().charAt(0).toUpperCase() || 'U';
  const toggleButtonStyle = isDark
    ? undefined
    : {
        background: '#ffffff',
        color: '#0f172a',
        borderColor: 'rgba(15,23,42,0.18)',
        boxShadow: '0 12px 20px -14px rgba(15,23,42,0.25)',
      };

  return (
    <>
      <header className="app-header fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b shadow-sm">
        <div className="w-full flex items-center gap-3 lg:gap-4 justify-between px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => go('dashboard')}
              className="text-left text-base sm:text-lg font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 rounded-lg px-2 inline-flex items-center gap-2 whitespace-nowrap min-w-0"
              title="Mr. Smith's Learning Canvas"
            >
              <AppIcon name="home" tone="sky" size={20} />
              <span>Mr. Smith's Learning Canvas</span>
            </button>
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
              <button
                onClick={() => go('dashboard')}
                className="nav-link flex items-center gap-1.5 whitespace-nowrap"
                type="button"
              >
                <AppIcon name="dashboard" tone="current" size={16} />
                Dashboard
              </button>
              <button
                onClick={() => go('quizzes')}
                className="nav-link flex items-center gap-1.5 whitespace-nowrap"
                type="button"
              >
                <AppIcon name="quiz" tone="current" size={16} />
                Quizzes
              </button>
              <button
                onClick={() => go('progress')}
                className="nav-link flex items-center gap-1.5 whitespace-nowrap"
                type="button"
              >
                <AppIcon name="progress" tone="current" size={16} />
                Progress
              </button>
              {user && (
                <a
                  href="/collab"
                  className="px-2.5 xl:px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full no-underline inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ textDecoration: 'none' }}
                  title="Work Together"
                  aria-label="Work Together"
                >
                  <AppIcon name="workTogether" tone="white" size={14} />
                  <span className="hidden xl:inline">Work Together</span>
                </a>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle bg-white/90 dark:bg-slate-900/90 focus-ring-primary"
            >
              <span className="text-lg leading-none">☰</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              aria-pressed={isDark}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle shadow-sm transition hover:opacity-95 focus-ring-primary text-secondary"
              style={toggleButtonStyle}
            >
              <AppIcon
                name={isDark ? 'moon' : 'sun'}
                tone={isDark ? 'white' : 'amber'}
                size={20}
                alt={isDark ? 'Dark mode' : 'Light mode'}
              />
            </button>
            {user && (
              <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    aria-label="Account menu"
                    className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover shadow"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-info text-white flex items-center justify-center font-semibold shadow">
                        {initial}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-primary truncate max-w-[10rem] xl:max-w-[14rem]">
                      {user.name || 'Learner'}
                    </span>
                    <svg
                      className="w-4 h-4 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px]"
                        onClick={() => setUserMenuOpen(false)}
                        aria-hidden="true"
                      />
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 w-48 rounded-xl border border-subtle bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 p-1 shadow-lg z-50"
                      >
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setUserMenuOpen(false);
                            go('profile');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left transition-colors text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <AppIcon
                            name="student"
                            tone={isDark ? 'white' : 'slate'}
                            size={16}
                          />
                          Profile
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setUserMenuOpen(false);
                            go('settings');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left transition-colors text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <AppIcon
                            name="gear"
                            tone={isDark ? 'white' : 'slate'}
                            size={16}
                          />
                          Settings
                        </button>
                        <div className="my-1 border-t border-subtle" />
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        >
                          <AppIcon name="logout" tone="rose" size={16} />
                          Log Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {mobileOpen && (
          <div
            className="lg:hidden border-t px-4 py-3 flex flex-col gap-2"
            style={{
              borderColor: isDark ? '#1e293b' : '#e2e8f0',
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
            }}
          >
            <button
              onClick={() => go('dashboard')}
              type="button"
              className="nav-link text-left flex items-center gap-2"
            >
              <AppIcon name="dashboard" tone="current" size={16} />
              Dashboard
            </button>
            <button
              onClick={() => go('quizzes')}
              type="button"
              className="nav-link text-left flex items-center gap-2"
            >
              <AppIcon name="quiz" tone="current" size={16} />
              Quizzes
            </button>
            <button
              onClick={() => go('progress')}
              type="button"
              className="nav-link text-left flex items-center gap-2"
            >
              <AppIcon name="progress" tone="current" size={16} />
              Progress
            </button>
            {user && (
              <>
                <button
                  onClick={() => go('profile')}
                  type="button"
                  className="nav-link text-left flex items-center gap-2"
                >
                  <AppIcon name="student" tone="slate" size={16} />
                  Profile
                </button>
                <button
                  onClick={() => go('settings')}
                  type="button"
                  className="nav-link text-left flex items-center gap-2"
                >
                  <AppIcon name="gear" tone="slate" size={16} />
                  Settings
                </button>
                <a
                  href="/collab"
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full no-underline text-center inline-flex items-center justify-center gap-1.5"
                  style={{ textDecoration: 'none' }}
                >
                  <AppIcon name="workTogether" tone="white" size={14} />
                  Work Together
                </a>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="nav-link text-left flex items-center gap-2 text-rose-600 dark:text-rose-400"
                >
                  <AppIcon name="logout" tone="rose" size={16} />
                  Log Out
                </button>
              </>
            )}
          </div>
        )}
      </header>
      {/* Spacer to offset the fixed header so page content isn't hidden under it */}
      <div style={{ height: 64 }} aria-hidden="true" />
    </>
  );
}
