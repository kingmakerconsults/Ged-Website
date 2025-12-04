import React from 'react';

/**
 * Modal - Reusable modal component
 * Extracted pattern from LegacyRootApp.jsx modal implementations
 * Provides consistent backdrop, dialog, and close functionality
 *
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal should close (optional for non-dismissible modals)
 * @param {string} title - Modal header title (optional)
 * @param {React.ReactNode} children - Modal content
 * @param {string} size - Modal size: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'md')
 * @param {boolean} showCloseButton - Show X button in top-right (default: true if onClose provided)
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-6xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      style={{ backgroundColor: 'var(--modal-overlay)' }}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full ${sizeClasses[size]} rounded-lg p-6 shadow-2xl`}
        style={{
          backgroundColor: 'var(--modal-surface)',
          border: `1px solid var(--modal-border)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100"
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

/**
 * ModalActions - Standard modal footer with action buttons
 * Use this for consistent button layouts in modals
 *
 * @param {React.ReactNode} children - Button elements
 */
export function ModalActions({ children }) {
  return <div className="mt-6 space-y-3">{children}</div>;
}

/**
 * ModalButton - Standard modal button with consistent styling
 *
 * @param {function} onClick - Click handler
 * @param {string} variant - Button style: 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {React.ReactNode} children - Button text/content
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional classes
 */
export function ModalButton({
  onClick,
  variant = 'secondary',
  children,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses =
    'w-full rounded-lg px-6 py-3 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantStyles = {
    primary: {
      style: {
        backgroundColor: 'var(--accent)',
        color: 'var(--accent-text)',
      },
      className: 'hover:opacity-90',
    },
    secondary: {
      className:
        'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600',
    },
    danger: {
      className: 'bg-red-600 text-white hover:bg-red-700',
    },
    ghost: {
      className:
        'bg-transparent border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800',
    },
  };

  const { style, className: variantClass } = variantStyles[variant] || {};

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClass || ''} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
