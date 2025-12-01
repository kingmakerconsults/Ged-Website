/**
 * Global Design System for GED Platform
 * Provides consistent colors, typography, and spacing across all subjects and themes
 */

export const designSystem = {
  // Base colors - Light Mode
  light: {
    // Page & surface colors
    bgPage: '#f5f7fb',
    bgPageAlt: '#f8fafc',
    surface: '#ffffff',
    surfaceAlt: '#f8fafc',
    surfaceHover: '#f1f5f9',

    // Borders
    borderSubtle: '#e2e8f0',
    border: '#cbd5e1',
    borderStrong: '#94a3b8',

    // Text colors
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#64748b',
    textDisabled: '#94a3b8',

    // Interactive states
    primary: '#0ea5e9',
    primaryHover: '#0284c7',
    primaryActive: '#0369a1',

    // Semantic colors
    success: '#10b981',
    successSoft: '#d1fae5',
    warning: '#f59e0b',
    warningSoft: '#fef3c7',
    danger: '#ef4444',
    dangerSoft: '#fee2e2',
    info: '#3b82f6',
    infoSoft: '#dbeafe',
  },

  // Base colors - Dark Mode
  dark: {
    // Page & surface colors
    bgPage: '#020617',
    bgPageAlt: '#0f172a',
    surface: '#1e293b',
    surfaceAlt: '#334155',
    surfaceHover: '#475569',

    // Borders
    borderSubtle: '#334155',
    border: '#475569',
    borderStrong: '#64748b',

    // Text colors
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    textDisabled: '#64748b',

    // Interactive states
    primary: '#38bdf8',
    primaryHover: '#0ea5e9',
    primaryActive: '#0284c7',

    // Semantic colors
    success: '#34d399',
    successSoft: '#064e3b',
    warning: '#fbbf24',
    warningSoft: '#78350f',
    danger: '#f87171',
    dangerSoft: '#7f1d1d',
    info: '#60a5fa',
    infoSoft: '#1e3a8a',
  },

  // Subject themes
  subjects: {
    math: {
      light: {
        accent: '#2563eb',
        bg: '#eff6ff',
        bgSoft: '#dbeafe',
        chipBg: '#bfdbfe',
        chipText: '#1e40af',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        primary: '#2563eb',
        secondary: '#3b82f6',
        text: '#ffffff',
      },
      dark: {
        accent: '#60a5fa',
        bg: '#1e3a8a',
        bgSoft: '#1e40af',
        chipBg: '#1e40af',
        chipText: '#bfdbfe',
        gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        primary: '#60a5fa',
        secondary: '#3b82f6',
        text: '#ffffff',
      },
    },

    rla: {
      light: {
        accent: '#7c3aed',
        bg: '#f5f3ff',
        bgSoft: '#ede9fe',
        chipBg: '#ddd6fe',
        chipText: '#5b21b6',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        text: '#ffffff',
      },
      dark: {
        accent: '#a78bfa',
        bg: '#4c1d95',
        bgSoft: '#5b21b6',
        chipBg: '#6d28d9',
        chipText: '#ddd6fe',
        gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
        primary: '#a78bfa',
        secondary: '#8b5cf6',
        text: '#ffffff',
      },
    },

    science: {
      light: {
        accent: '#dc2626',
        bg: '#fef2f2',
        bgSoft: '#fee2e2',
        chipBg: '#fecaca',
        chipText: '#991b1b',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        primary: '#dc2626',
        secondary: '#ef4444',
        text: '#ffffff',
      },
      dark: {
        accent: '#f87171',
        bg: '#7f1d1d',
        bgSoft: '#991b1b',
        chipBg: '#b91c1c',
        chipText: '#fee2e2',
        gradient: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
        primary: '#f87171',
        secondary: '#ef4444',
        text: '#ffffff',
      },
    },

    socialStudies: {
      light: {
        accent: '#059669',
        bg: '#f0fdf4',
        bgSoft: '#dcfce7',
        chipBg: '#bbf7d0',
        chipText: '#166534',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        primary: '#059669',
        secondary: '#10b981',
        text: '#ffffff',
      },
      dark: {
        accent: '#34d399',
        bg: '#064e3b',
        bgSoft: '#065f46',
        chipBg: '#047857',
        chipText: '#d1fae5',
        gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
        primary: '#34d399',
        secondary: '#10b981',
        text: '#ffffff',
      },
    },

    workforce: {
      light: {
        accent: '#0891b2',
        bg: '#f0fdfa',
        bgSoft: '#ccfbf1',
        chipBg: '#99f6e4',
        chipText: '#115e59',
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)',
      },
      dark: {
        accent: '#5eead4',
        bg: '#134e4a',
        bgSoft: '#115e59',
        chipBg: '#0f766e',
        chipText: '#ccfbf1',
        gradient: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
      },
    },

    coach: {
      light: {
        accent: '#ea580c',
        bg: '#fffbeb',
        bgSoft: '#fef3c7',
        chipBg: '#fde68a',
        chipText: '#92400e',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
      },
      dark: {
        accent: '#fbbf24',
        bg: '#78350f',
        bgSoft: '#92400e',
        chipBg: '#b45309',
        chipText: '#fef3c7',
        gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      },
    },

    admin: {
      light: {
        accent: '#6366f1',
        bg: '#eef2ff',
        bgSoft: '#e0e7ff',
        chipBg: '#c7d2fe',
        chipText: '#3730a3',
        gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
      },
      dark: {
        accent: '#a5b4fc',
        bg: '#312e81',
        bgSoft: '#3730a3',
        chipBg: '#4338ca',
        chipText: '#e0e7ff',
        gradient: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
      },
    },
  },

  // Typography scale
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Spacing scale
  spacing: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

// Helper function to get subject theme based on current mode
export function getSubjectTheme(subject, isDark = false) {
  const mode = isDark ? 'dark' : 'light';
  const subjectKey = subject.toLowerCase().replace(/\s+/g, '');
  const normalizedKey =
    subjectKey === 'socialstudies'
      ? 'socialStudies'
      : subjectKey === 'ged'
      ? 'coach'
      : subjectKey;

  return (
    designSystem.subjects[normalizedKey]?.[mode] ||
    designSystem.subjects.math[mode]
  );
}

// Helper function to get base theme based on current mode
export function getBaseTheme(isDark = false) {
  return isDark ? designSystem.dark : designSystem.light;
}

export default designSystem;
