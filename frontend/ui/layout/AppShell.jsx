// Canonical AppShell: wraps the entire app UI
import React from 'react';
import { colors, typography } from '../theme';

/**
 * AppShell is the single top-level layout wrapper for the GED platform UI.
 * All global nav, sidebars, and layout structure should be defined here.
 */
export default function AppShell({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.background,
        fontFamily: typography.fontFamily,
      }}
    >
      {/* TODO: Add global nav/sidebar here */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
        {children}
      </main>
    </div>
  );
}
