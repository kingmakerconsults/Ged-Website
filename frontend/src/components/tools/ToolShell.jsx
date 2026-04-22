import React from 'react';

/**
 * ToolShell — consistent header/chrome for tools rendered inside the
 * SubjectToolsModal. Provides a back button, title, and a sticky header
 * that adapts to dark mode and the subject accent color.
 *
 * Tools that bring their own full-screen layout (e.g. Social Studies tools)
 * should NOT be wrapped in ToolShell. Mark them `useShell: false` in the
 * registry and the hub will render the component directly.
 *
 * Props:
 *   icon, title          — header content
 *   onBack               — invoked when "← Tools" is clicked
 *   accent               — subject accent color (for the icon chip + bar)
 *   dark                 — boolean dark mode
 *   children             — the actual tool body
 */
export default function ToolShell({
  icon,
  title,
  onBack,
  accent = '#64748b',
  dark = false,
  children,
}) {
  return (
    <div
      className="tool-shell flex flex-col h-full"
      style={{ color: dark ? '#e2e8f0' : '#0f172a' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-4 pb-3 border-b"
        style={{ borderColor: dark ? '#334155' : '#e2e8f0' }}
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2"
          style={{
            backgroundColor: dark ? '#334155' : '#f1f5f9',
            color: dark ? '#e2e8f0' : '#0f172a',
          }}
          aria-label="Back to tools menu"
        >
          <span aria-hidden>←</span>
          <span>Tools</span>
        </button>

        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 36,
            height: 36,
            backgroundColor: accent,
            color: '#ffffff',
            fontSize: 20,
            lineHeight: 1,
          }}
          aria-hidden
        >
          {icon}
        </div>

        <h3 className="text-lg font-semibold flex-1 truncate" title={title}>
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
