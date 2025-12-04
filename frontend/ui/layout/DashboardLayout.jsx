// Canonical DashboardLayout: wraps all role dashboards
import React from 'react';
import { colors, radii, shadows } from '../theme';

/**
 * DashboardLayout provides a consistent layout for all dashboards (student, instructor, admin, etc.)
 */
export default function DashboardLayout({ children, title }) {
  return (
    <section
      style={{
        background: colors.surface,
        borderRadius: radii.lg,
        boxShadow: shadows.md,
        padding: '2rem',
        margin: '2rem auto',
        maxWidth: 1000,
      }}
    >
      {title && <h1 style={{ marginBottom: '1.5rem' }}>{title}</h1>}
      {children}
    </section>
  );
}
