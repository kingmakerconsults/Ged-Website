import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * AppHeader - Centralized application header
 * Extracted from LegacyRootApp.jsx (lines 22996-23135)
 * Uses AuthContext and ThemeContext for state management
 */
export default function AppHeader({
  onShowHome,
  onShowQuizzes,
  onShowProgress,
  onShowProfile,
  onShowSettings,
  isProfileActive = false,
  isSettingsActive = false,
}) {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const initial = currentUser?.name?.[0]?.toUpperCase() || '?';

  // Theme toggle button styling (original inline styles preserved)
  const toggleButtonStyle =
    theme === 'dark'
      ? {
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
          borderColor: 'rgba(226,232,240,0.18)',
          boxShadow: '0 12px 20px -14px rgba(0,0,0,0.45)',
        }
      : {
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          borderColor: 'rgba(15,23,42,0.18)',
          boxShadow: '0 12px 20px -14px rgba(15,23,42,0.25)',
        };

  return (
    <header className="app-header fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center gap-4 justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onShowHome}
            className="text-left text-base sm:text-lg font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 rounded-lg px-2"
          >
            Mr. Smith's Learning Canvas
          </button>
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={onShowHome}
              className="nav-link flex items-center"
              type="button"
            >
              <img
                src="/icons/house-svgrepo-com.svg"
                alt=""
                className="w-4 h-4"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(545%) hue-rotate(177deg) brightness(92%) contrast(89%)',
                }}
              />
              Dashboard
            </button>
            <button
              onClick={onShowQuizzes}
              className="nav-link"
              type="button"
              aria-controls="quizzes"
            >
              Quizzes
            </button>
            <button
              onClick={onShowProgress}
              className="nav-link"
              type="button"
              aria-controls="progress"
            >
              Progress
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color mode"
            aria-pressed={isDark}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle shadow-sm transition hover:opacity-95 focus-ring-primary text-secondary"
            style={toggleButtonStyle}
          >
            <img
              src={
                isDark
                  ? '/icons/moon-svgrepo-com.svg'
                  : '/icons/sun-svgrepo-com.svg'
              }
              alt={isDark ? 'Dark mode' : 'Light mode'}
              className="h-5 w-5"
              style={{
                filter: isDark
                  ? 'brightness(0) saturate(100%) invert(100%)'
                  : 'brightness(0) saturate(100%) invert(45%) sepia(90%) saturate(2000%) hue-rotate(10deg)',
              }}
            />
          </button>
          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {currentUser.picture ? (
                  <img
                    src={currentUser.picture}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full object-cover shadow"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-info text-white flex items-center justify-center font-semibold shadow">
                    {initial}
                  </div>
                )}
                <div className="flex flex-col leading-tight">
                  <span className="text-xs uppercase tracking-wide text-secondary">
                    Welcome
                  </span>
                  <span className="text-sm font-semibold text-primary truncate max-w-[10rem]">
                    {currentUser.name || 'Learner'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btnProfile"
                  onClick={onShowProfile}
                  className={`btn-ghost ${
                    isProfileActive ? 'nav-link-active' : ''
                  }`}
                  aria-controls="profileView"
                  aria-expanded={isProfileActive}
                >
                  Profile
                </button>
                <button
                  type="button"
                  id="btnSettings"
                  onClick={onShowSettings}
                  className={`btn-ghost ${
                    isSettingsActive ? 'nav-link-active' : ''
                  }`}
                  aria-controls="settingsView"
                  aria-expanded={isSettingsActive}
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="btn-ghost text-danger flex items-center gap-2"
                >
                  <img
                    src="/icons/house-svgrepo-com.svg"
                    alt=""
                    className="w-4 h-4"
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(31%) sepia(84%) saturate(2787%) hue-rotate(336deg) brightness(94%) contrast(95%)',
                    }}
                  />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
