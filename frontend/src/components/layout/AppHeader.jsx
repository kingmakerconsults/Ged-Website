import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import MobileSidebar from './MobileSidebar';

/**
 * AppHeader - Glassmorphic application header
 * Clean nav with pill-shaped active indicators, proper SVG icons, mobile sidebar trigger
 */
export default function AppHeader({
  onShowHome,
  onShowQuizzes,
  onShowProgress,
  onShowProfile,
  onShowSettings,
  activeView = '',
  isProfileActive = false,
  isSettingsActive = false,
}) {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isDark = theme === 'dark';
  const initial = currentUser?.name?.[0]?.toUpperCase() || '?';

  const navItems = [
    { label: 'Dashboard', action: onShowHome, id: 'home' },
    { label: 'Quizzes', action: onShowQuizzes, id: 'quizzes' },
    { label: 'Progress', action: onShowProgress, id: 'progress' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-surface border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Left: hamburger + brand */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={onShowHome}
              className="text-left font-bold text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg px-1 text-base sm:text-lg tracking-tight"
            >
              Mr. Smith's Learning Canvas
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navItems.map(({ label, action, id }) => {
                const isActive = activeView === id;
                return (
                  <button
                    key={id}
                    onClick={action}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: theme toggle + user */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              aria-pressed={isDark}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* User section */}
            {currentUser && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  {currentUser.picture ? (
                    <img
                      src={currentUser.picture}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center text-sm font-semibold ring-2 ring-white dark:ring-slate-700">
                      {initial}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[8rem] truncate">
                    {currentUser.name || 'Learner'}
                  </span>
                  <svg
                    className="w-4 h-4 text-slate-400 hidden sm:block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl glass-card p-1 z-50 border border-slate-200 dark:border-slate-700 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          onShowProfile?.();
                          setUserMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          isProfileActive
                            ? 'bg-slate-100 dark:bg-slate-700 font-medium'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        } text-slate-700 dark:text-slate-200`}
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onShowSettings?.();
                          setUserMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          isSettingsActive
                            ? 'bg-slate-100 dark:bg-slate-700 font-medium'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        } text-slate-700 dark:text-slate-200`}
                      >
                        Settings
                      </button>
                      <div className="my-1 border-t border-slate-200 dark:border-slate-700" />
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navItems={navItems}
        activeView={activeView}
        onShowProfile={onShowProfile}
        onShowSettings={onShowSettings}
        isProfileActive={isProfileActive}
        isSettingsActive={isSettingsActive}
      />
    </>
  );
}
