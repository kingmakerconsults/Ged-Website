import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const ThemeContext = createContext(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function getCurrentTheme() {
  if (typeof document === 'undefined') return 'light';

  const root = document.documentElement;
  const themeAttr = root.getAttribute('data-theme');
  const hasDarkClass = root.classList.contains('dark');

  if (themeAttr === 'dark' || hasDarkClass) return 'dark';
  if (themeAttr === 'light') return 'light';

  // Check localStorage
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {}

  // Check system preference
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }

  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Unable to persist theme preference:', error);
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getCurrentTheme);
  const [fontSize, setFontSize] = useState(() => {
    if (typeof localStorage === 'undefined') return 'medium';
    try {
      return localStorage.getItem('fontSize') || 'medium';
    } catch {
      return 'medium';
    }
  });

  // Apply theme on mount and when it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Apply font size
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'x-large': '20px',
    };

    root.style.fontSize = fontSizeMap[fontSize] || '16px';

    try {
      localStorage.setItem('fontSize', fontSize);
    } catch (error) {
      console.warn('Unable to persist font size preference:', error);
    }
  }, [fontSize]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setThemePreference = useCallback((newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setTheme(newTheme);
    }
  }, []);

  const setFontSizePreference = useCallback((newSize) => {
    const validSizes = ['small', 'medium', 'large', 'x-large'];
    if (validSizes.includes(newSize)) {
      setFontSize(newSize);
    }
  }, []);

  const isDark = theme === 'dark';

  const value = {
    theme,
    fontSize,
    isDark,
    toggleTheme,
    setTheme: setThemePreference,
    setFontSize: setFontSizePreference,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
