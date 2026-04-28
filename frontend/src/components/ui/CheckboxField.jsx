import React from 'react';

/**
 * Shared checkbox control with an explicit on/off visual:
 *   - Off: empty rounded square with a slate border.
 *   - On:  filled sky-600 square with a white checkmark.
 *
 * The native <input type="checkbox"> stays in the DOM (visually hidden) so
 * keyboard, screen readers, and form semantics keep working.
 *
 * Preferred over raw <input type="checkbox"> for any new UI.
 */
export default function CheckboxField({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  name,
  id,
  className = '',
  align = 'start', // 'start' | 'center'
}) {
  const inputId = id || (name ? `cb-${name}` : undefined);
  const itemsClass = align === 'center' ? 'items-center' : 'items-start';

  return (
    <label
      htmlFor={inputId}
      className={`group inline-flex ${itemsClass} gap-2.5 text-sm select-none ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        id={inputId}
        name={name}
        type="checkbox"
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`relative mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-colors
          border-slate-300 bg-white
          dark:border-slate-500 dark:bg-slate-800
          peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white
          dark:peer-focus-visible:ring-offset-slate-900
          peer-checked:border-sky-600 peer-checked:bg-sky-600
          dark:peer-checked:border-sky-500 dark:peer-checked:bg-sky-500
          group-hover:border-slate-400 dark:group-hover:border-slate-400`}
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
      <span className="flex flex-col gap-0.5 leading-snug">
        <span className="text-slate-800 dark:text-slate-100">{label}</span>
        {description ? (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
