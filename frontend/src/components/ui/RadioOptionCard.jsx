import React from 'react';

/**
 * Radio option card with the same explicit on/off visual as CheckboxField:
 *   - Off: empty rounded square with a slate border.
 *   - On:  filled sky-600 square with a white checkmark.
 *
 * Semantically uses <input type="radio"> so groups still behave correctly.
 * Designed to drop into the existing `.option-pill` styling used by Settings.
 */
export default function RadioOptionCard({
  name,
  value,
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) {
  const inputId = `radio-${name}-${value}`;

  return (
    <label
      htmlFor={inputId}
      className={`option-pill ${
        checked ? 'is-selected' : ''
      } group flex items-center gap-3 rounded-lg border px-3 py-2 transition ${
        checked
          ? 'border-sky-400 ring-2 ring-sky-200 dark:ring-sky-500/40'
          : 'border-slate-200 dark:border-slate-600'
      } bg-white/40 dark:bg-slate-900/50 hover:border-sky-300 dark:hover:border-sky-400 ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`relative inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-colors
          border-slate-300 bg-white
          dark:border-slate-500 dark:bg-slate-800
          peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white
          dark:peer-focus-visible:ring-offset-slate-900
          peer-checked:border-sky-600 peer-checked:bg-sky-600
          dark:peer-checked:border-sky-500 dark:peer-checked:bg-sky-500`}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 text-white transition-opacity"
          style={{ opacity: checked ? 1 : 0 }}
        >
          <polyline points="3.5 8.5 6.5 11.5 12.5 5" />
        </svg>
      </span>
      <span className="flex flex-col">
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </span>
        {description ? (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
