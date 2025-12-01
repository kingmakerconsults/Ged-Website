import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ThemeAwareView - Wrapper component that monitors theme changes
 * and provides back navigation
 */
export default function ThemeAwareView({ children, ViewComponent }) {
  const [dark, setDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return (
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
    );
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark';
      setDark(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="theme-aware-view">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 px-4 py-2 rounded-lg shadow-lg font-medium transition-all hover:shadow-xl"
        style={{
          backgroundColor: dark ? '#334155' : '#ffffff',
          color: dark ? '#e2e8f0' : '#1e293b',
          border: `2px solid ${dark ? '#475569' : '#e2e8f0'}`,
        }}
      >
        ← Back to Dashboard
      </button>

      {/* Render the view with updated dark prop */}
      <ViewComponent dark={dark} />
    </div>
  );
}
