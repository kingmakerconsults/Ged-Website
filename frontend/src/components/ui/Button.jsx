import React from 'react';

/**
 * Shared button primitives using design system CSS variables.
 * Variants: primary | secondary | ghost | danger | success
 */
export function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  iconLeft = null,
  iconRight = null,
  title,
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition';
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    secondary: 'btn-ghost text-primary',
    danger:
      'btn-primary bg-[var(--color-danger)] border-[var(--color-danger)] hover:bg-[var(--color-danger)]/90',
    success:
      'btn-primary bg-[var(--color-success)] border-[var(--color-success)] hover:bg-[var(--color-success)]/90',
  };
  const resolved = variants[variant] || variants.primary;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${resolved} ${className}`.trim()}
      title={title}
    >
      {iconLeft && <span className="mr-1 flex items-center">{iconLeft}</span>}
      <span className="truncate">{children}</span>
      {iconRight && <span className="ml-1 flex items-center">{iconRight}</span>}
    </button>
  );
}

export default Button;
