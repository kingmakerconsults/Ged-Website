// Canonical SubjectPanel component
import React from 'react';
import { colors, radii, shadows } from '../theme';

export default function SubjectPanel({
  subject,
  children,
  style = {},
  ...props
}) {
  // You can expand this with subject-specific colors from theme.js
  return (
    <div
      style={{
        background: colors.surface,
        borderRadius: radii.lg,
        boxShadow: shadows.sm,
        border: `2px solid ${colors.primary}`,
        padding: '1.5rem',
        marginBottom: '1.5rem',
        ...style,
      }}
      {...props}
    >
      <h2 style={{ color: colors.primary, marginBottom: '1rem' }}>{subject}</h2>
      {children}
    </div>
  );
}
