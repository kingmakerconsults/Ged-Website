// Canonical Button component
import React from 'react';
import { colors, radii, typography } from '../theme';

export default function Button({
  children,
  onClick,
  type = 'button',
  style = {},
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: colors.primary,
        color: '#fff',
        border: 'none',
        borderRadius: radii.md,
        padding: '0.75rem 1.5rem',
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeightBold,
        fontSize: typography.fontSizeBase,
        cursor: 'pointer',
        transition: 'background 0.2s',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
