// Canonical Panel component
import React from 'react';
import { colors, radii, shadows } from '../theme';

export default function Panel({ children, style = {}, ...props }) {
  return (
    <section
      style={{
        background: colors.surface,
        borderRadius: radii.md,
        boxShadow: shadows.md,
        padding: '1.25rem',
        border: `1px solid ${colors.border}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  );
}
