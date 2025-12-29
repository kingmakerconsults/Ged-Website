import { useState, useCallback } from 'react';

export function useThemeController() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return window.__START_THEME__ === 'dark' ? 'dark' : 'light';
  });

  const applyTheme = useCallback((nextTheme) => {
    const normalized = nextTheme === 'dark' ? 'dark' : 'light';
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (root) {
        root.classList.toggle('dark', normalized === 'dark');
        root.setAttribute('data-theme', normalized);
      }
      try {
        if (document.body) {
          document.body.classList.toggle('dark', normalized === 'dark');
          document.body.setAttribute('data-theme', normalized);
        }
      } catch {}
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('appTheme', normalized);
      }
    } catch (error) {
      console.warn('Unable to persist theme preference:', error);
    }
    setTheme((current) => (current === normalized ? current : normalized));
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, applyTheme]);

  return { theme, toggleTheme, applyTheme };
}

// Legacy window attachment (will be removed once all consumers use ES modules)
if (typeof window !== 'undefined') {
  window.Hooks = Object.assign(window.Hooks || {}, { useThemeController });
}
