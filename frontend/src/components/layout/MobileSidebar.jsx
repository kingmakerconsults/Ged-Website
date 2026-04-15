import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * MobileSidebar - Slide-out navigation for mobile screens
 * Glassmorphic panel that slides from the left with overlay backdrop
 */
export default function MobileSidebar({
  open,
  onClose,
  navItems = [],
  activeView = '',
  onShowProfile,
  onShowSettings,
  isProfileActive = false,
  isSettingsActive = false,
}) {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const initial = currentUser?.name?.[0]?.toUpperCase() || '?';

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 glass-surface border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col transform transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        {/* Close button + brand */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200/50 dark:border-slate-700/50">
          <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
            Mr. Smith's Learning Canvas
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User info */}
        {currentUser && (
          <div className="px-4 py-4 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              {currentUser.picture ? (
                <img
                  src={currentUser.picture}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center text-sm font-semibold ring-2 ring-white dark:ring-slate-700">
                  {initial}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {currentUser.name || 'Learner'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email || ''}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ label, action, id }) => {
            const isActive = activeView === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => { action?.(); onClose(); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {label}
              </button>
            );
          })}

          <div className="my-3 border-t border-slate-200/50 dark:border-slate-700/50" />

          <button
            type="button"
            onClick={() => { onShowProfile?.(); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isProfileActive
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => { onShowSettings?.(); onClose(); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isSettingsActive
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Settings
          </button>
        </nav>

        {/* Bottom: theme toggle + logout */}
        <div className="px-3 py-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-1">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </button>

          {currentUser && (
            <button
              type="button"
              onClick={() => { logout(); onClose(); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
