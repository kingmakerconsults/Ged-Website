import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getSubjectTheme } from '../theme/designSystem';
import { getToolsForSubject } from './tools/registry';
import ToolShell from './tools/ToolShell';

const STORAGE_KEY = 'subjectToolsModal:lastTool';

function readLastTool(subject) {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    return map?.[subject] || null;
  } catch {
    return null;
  }
}

function writeLastTool(subject, id) {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    if (id) map[subject] = id;
    else delete map[subject];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore quota / disabled storage */
  }
}

/**
 * SubjectToolsModal — centralized tools panel for each subject.
 * Renders a card grid of tools and, on selection, the active tool inside
 * a shared <ToolShell> (unless the tool opts out via `useShell: false`).
 */
export default function SubjectToolsModal({ subject, dark = false, onClose }) {
  const tools = getToolsForSubject(subject);
  const [selectedTool, setSelectedTool] = useState(() =>
    readLastTool(subject)
  );
  const theme = getSubjectTheme(subject?.toLowerCase(), dark);
  const dialogRef = useRef(null);

  // Persist last selection per subject so reopening returns to the same tool.
  useEffect(() => {
    writeLastTool(subject, selectedTool);
  }, [subject, selectedTool]);

  // If the persisted id is no longer in the registry, reset.
  useEffect(() => {
    if (selectedTool && !tools.some((t) => t.id === selectedTool)) {
      setSelectedTool(null);
    }
  }, [tools, selectedTool]);

  const handleBackOrClose = useCallback(() => {
    if (selectedTool) setSelectedTool(null);
    else onClose?.();
  }, [selectedTool, onClose]);

  // Esc key + simple focus trap inside the dialog.
  useEffect(() => {
    if (!subject) return undefined;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleBackOrClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    // Move focus into the dialog so the trap and Esc work immediately.
    const t = setTimeout(() => {
      dialogRef.current?.focus?.();
    }, 0);
    return () => {
      document.removeEventListener('keydown', handleKey);
      clearTimeout(t);
    };
  }, [subject, handleBackOrClose]);

  if (!subject) return null;

  const activeEntry = selectedTool
    ? tools.find((t) => t.id === selectedTool)
    : null;
  const ActiveToolComponent = activeEntry?.component || null;
  const useShell = activeEntry ? activeEntry.useShell !== false : false;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${subject} tools`}
        className="w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col outline-none"
        style={{
          backgroundColor: dark ? '#1e293b' : '#ffffff',
          border: `2px solid ${theme?.accent || '#64748b'}`,
          opacity: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 flex items-center justify-between"
          style={{
            background: dark
              ? theme?.gradient ||
                'linear-gradient(135deg, #64748b 0%, #475569 100%)'
              : '#f0f9ff',
            color: dark ? '#ffffff' : '#0f172a',
          }}
        >
          <div className="min-w-0">
            <h2 className="text-2xl font-bold truncate">{subject} Tools</h2>
            <p className="text-sm opacity-90 mt-1">
              {selectedTool
                ? 'Press Esc or use ← Tools to return to the menu.'
                : 'Select a tool below to access practice resources.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition-colors"
            aria-label="Close tools panel"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 overflow-y-auto p-6"
          style={{ backgroundColor: dark ? '#1e293b' : '#ffffff' }}
        >
          {!selectedTool ? (
            <ToolGrid
              tools={tools}
              dark={dark}
              accent={theme?.accent || '#64748b'}
              onSelect={(id) => setSelectedTool(id)}
            />
          ) : !ActiveToolComponent ? (
            <div className="text-center py-12 text-sm opacity-75">
              That tool is no longer available.
            </div>
          ) : useShell ? (
            <ToolShell
              icon={activeEntry.icon}
              title={activeEntry.name}
              accent={theme?.accent || '#64748b'}
              dark={dark}
              onBack={() => setSelectedTool(null)}
            >
              <ActiveToolComponent
                onClose={() => setSelectedTool(null)}
                onExit={() => setSelectedTool(null)}
                dark={dark}
              />
            </ToolShell>
          ) : (
            <div className="tool-direct">
              {/* Tools that render their own header still get a thin Back chip */}
              <button
                type="button"
                onClick={() => setSelectedTool(null)}
                className="mb-4 px-3 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: dark ? '#334155' : '#f1f5f9',
                  color: dark ? '#e2e8f0' : '#0f172a',
                }}
              >
                ← Tools
              </button>
              <ActiveToolComponent
                onClose={() => setSelectedTool(null)}
                onExit={() => setSelectedTool(null)}
                dark={dark}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="p-4 border-t flex justify-between items-center"
          style={{
            backgroundColor: dark ? '#0f172a' : '#f8fafc',
            borderColor: dark ? '#334155' : '#e2e8f0',
            color: dark ? '#94a3b8' : '#64748b',
          }}
        >
          <span className="text-sm">
            {tools.length} tool{tools.length !== 1 ? 's' : ''} available
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/60 transition-colors"
            style={{
              backgroundColor: theme?.accent || '#64748b',
              color: '#ffffff',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ToolGrid({ tools, dark, accent, onSelect }) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4" aria-hidden>
          🚧
        </div>
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: dark ? '#e2e8f0' : '#1e293b' }}
        >
          Tools Coming Soon
        </h3>
        <p
          className="text-sm opacity-75"
          style={{ color: dark ? '#94a3b8' : '#64748b' }}
        >
          Subject-specific tools are being developed.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => {
        const disabled = !!tool.comingSoon;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => !disabled && onSelect(tool.id)}
            disabled={disabled}
            aria-disabled={disabled || undefined}
            className={`group relative p-6 rounded-xl border-2 text-left transition-all focus:outline-none focus:ring-2 ${
              disabled
                ? 'cursor-not-allowed opacity-60'
                : 'hover:-translate-y-0.5 hover:shadow-xl'
            }`}
            style={{
              backgroundColor: dark ? '#334155' : '#f1f5f9',
              borderColor: dark ? accent : '#cbd5e1',
              color: dark ? '#e2e8f0' : '#0f172a',
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: accent,
                  color: '#ffffff',
                  fontSize: 22,
                  lineHeight: 1,
                }}
                aria-hidden
              >
                {tool.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold leading-tight">
                  {tool.name}
                </h3>
                {disabled && (
                  <span
                    className="inline-block mt-1 text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: dark ? '#475569' : '#e2e8f0',
                      color: dark ? '#cbd5e1' : '#475569',
                    }}
                  >
                    Coming soon
                  </span>
                )}
              </div>
            </div>
            {tool.description && (
              <p
                className="text-sm leading-snug opacity-80"
                style={{ color: dark ? '#cbd5e1' : '#334155' }}
              >
                {tool.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
