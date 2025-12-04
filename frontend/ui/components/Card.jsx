// Canonical Card component
import React from 'react';
import { colors, radii, shadows } from '../theme';

export default function Card({ children, style = {}, ...props }) {
  return (
    <div
      style={{
        background: colors.surface,
        borderRadius: radii.lg,
        boxShadow: shadows.sm,
        padding: '1.5rem',
        border: `1px solid ${colors.border}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
