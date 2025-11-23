const { useState, useCallback } = React;

function useThemeController() {
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

// Attach to window.Hooks for global access
if (typeof window !== 'undefined') {
  window.Hooks = Object.assign(window.Hooks || {}, { useThemeController });
}
