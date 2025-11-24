import React from 'react';

/**
 * AppShell: Provides consistent page background & constrained content area.
 * Wrap major views in this for unified spacing & theme variables.
 */
export function AppShell({ children, header = null, footer = null }) {
  return (
    <div className="min-h-screen bg-page text-primary flex flex-col">
      {header}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        {children}
      </main>
      {footer && (
        <footer className="mt-auto py-8 text-center text-xs text-muted">
          {footer}
        </footer>
      )}
    </div>
  );
}

export default AppShell;
