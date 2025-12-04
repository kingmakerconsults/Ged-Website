// Canonical SubjectBadge component
import React from 'react';
import { colors, radii, typography } from '../theme';

export default function SubjectBadge({ subject, style = {}, ...props }) {
  // You can expand this with subject-specific colors from theme.js
  return (
    <span
      style={{
        display: 'inline-block',
        background: colors.primary,
        color: '#fff',
        borderRadius: radii.full,
        padding: '0.25rem 0.75rem',
        fontFamily: typography.fontFamily,
        fontSize: '0.95em',
        fontWeight: typography.fontWeightBold,
        ...style,
      }}
      {...props}
    >
      {subject}
    </span>
  );
}
