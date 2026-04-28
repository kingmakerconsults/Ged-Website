/**
 * Frame.jsx — reusable visual chrome for OS / browser / app / phone mocks
 * used by Digital Literacy modules.
 *
 * These are *visual* mocks only — they do not load real URLs or real apps.
 * They give learners a task-based environment to perform tasks in.
 */
import React from 'react';

export function WindowFrame({
  title,
  os = 'win11',
  children,
  width = 'auto',
  height = 'auto',
  onClose,
  className = '',
}) {
  const isMac = os === 'mac';
  return (
    <div
      className={`window-frame rounded-lg overflow-hidden shadow-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 ${className}`}
      style={{ width, height }}
      role="group"
      aria-label={`${title} window`}
    >
      <div
        className={`flex items-center px-3 py-2 text-xs font-medium ${
          isMac
            ? 'bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-700 dark:text-slate-200'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
        }`}
      >
        {isMac ? (
          <div className="flex gap-1.5 mr-3" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        ) : null}
        <div className="flex-1 text-center truncate">{title}</div>
        {!isMac ? (
          <div className="flex gap-2 text-slate-500" aria-hidden="true">
            <span>—</span>
            <span>▢</span>
            <button
              type="button"
              onClick={onClose}
              className="hover:text-red-600"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        ) : null}
      </div>
      <div className="window-body bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({ url, onUrlChange, children, className = '' }) {
  return (
    <WindowFrame title={url || 'New Tab'} os="win11" className={className}>
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="text-slate-500 dark:text-slate-400" aria-hidden="true">
          ←
        </span>
        <span className="text-slate-500 dark:text-slate-400" aria-hidden="true">
          →
        </span>
        <span className="text-slate-500 dark:text-slate-400" aria-hidden="true">
          ↻
        </span>
        <input
          type="text"
          value={url || ''}
          onChange={(e) => onUrlChange?.(e.target.value)}
          className="flex-1 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
          aria-label="Address bar"
          spellCheck="false"
        />
      </div>
      <div className="browser-body p-4 text-slate-900 dark:text-slate-100">
        {children}
      </div>
    </WindowFrame>
  );
}

export function PhoneFrame({ children, label = 'Phone', className = '' }) {
  return (
    <div
      className={`phone-frame mx-auto rounded-[2.5rem] border-[10px] border-slate-800 bg-black shadow-2xl ${className}`}
      style={{ width: 320, height: 600 }}
      role="group"
      aria-label={label}
    >
      <div className="h-6 flex items-center justify-center bg-black text-white text-[10px] font-medium">
        <span>•••</span>
      </div>
      <div className="phone-screen rounded-[1.5rem] bg-white dark:bg-slate-900 overflow-hidden h-[calc(100%-1.5rem)]">
        {children}
      </div>
    </div>
  );
}
