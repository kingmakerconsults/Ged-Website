// Centralized subject visual + vocabulary meta constants
// Extracted from app.jsx to reduce monolith size and prevent drift.

const SUBJECT_NAMES = ['Math', 'RLA', 'Science', 'Social Studies'];

const SUBJECT_COLORS = {
  Science: {
    background: 'var(--subject-science-accent)',
    text: 'var(--subject-science-surface-text)',
    heroText: 'var(--subject-science-text)',
    border: 'var(--subject-science-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-science-text)',
    scoreBorder: 'var(--subject-science-border)',
    accent: 'var(--subject-science-accent)',
    accentText: 'var(--subject-science-accent-text)',
  },
  'Social Studies': {
    background: 'var(--subject-social-accent)',
    text: 'var(--subject-social-surface-text)',
    heroText: 'var(--subject-social-text)',
    border: 'var(--subject-social-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-social-text)',
    scoreBorder: 'var(--subject-social-border)',
    accent: 'var(--subject-social-accent)',
    accentText: 'var(--subject-social-accent-text)',
  },
  'Reasoning Through Language Arts (RLA)': {
    background: 'var(--subject-rla-accent)',
    text: 'var(--subject-rla-surface-text)',
    heroText: 'var(--subject-rla-text)',
    border: 'var(--subject-rla-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-rla-text)',
    scoreBorder: 'var(--subject-rla-border)',
    accent: 'var(--subject-rla-accent)',
    accentText: 'var(--subject-rla-accent-text)',
  },
  Math: {
    background: 'var(--subject-math-accent)',
    text: 'var(--math-text)',
    heroText: 'var(--subject-math-text)',
    border: 'var(--math-surface-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--math-text)',
    scoreBorder: 'var(--math-surface-border)',
    accent: 'var(--subject-math-accent)',
    accentText: 'var(--subject-math-accent-text)',
    surface: 'var(--math-surface)',
    surfaceStrong: 'var(--math-surface)',
    surfaceBorder: 'var(--math-surface-border)',
    divider: 'var(--math-divider)',
    mutedText: 'var(--math-muted-text)',
    onBackgroundText: 'var(--math-text)',
  },
  Workforce: {
    background: 'var(--subject-workforce-accent)',
    text: 'var(--subject-workforce-surface-text)',
    heroText: 'var(--subject-workforce-text)',
    border: 'var(--subject-workforce-border)',
    scoreBackground: 'var(--bg-overlay)',
    scoreText: 'var(--subject-workforce-text)',
    scoreBorder: 'var(--subject-workforce-border)',
    accent: 'var(--subject-workforce-accent)',
    accentText: 'var(--subject-workforce-accent-text)',
  },
};

const SUBJECT_BG_GRADIENTS = {
  Math: 'var(--subject-math-gradient)',
  Science: 'var(--subject-science-gradient)',
  'Social Studies': 'var(--subject-social-gradient)',
  'Reasoning Through Language Arts (RLA)': 'var(--subject-rla-gradient)',
  Workforce: 'var(--subject-workforce-gradient)',
};

const SUBJECT_LIGHT_SURFACE_GRADIENTS = {
  Math: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(2,132,199,0.12))',
  Science:
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(220,38,38,0.12))',
  'Social Studies':
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(22,163,74,0.12))',
  'Reasoning Through Language Arts (RLA)':
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(124,58,237,0.12))',
  Workforce:
    'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(20,184,166,0.12))',
};

const SUBJECT_LIGHT_TINTS = {
  Math: 'rgba(2,132,199,0.2)',
  Science: 'rgba(220,38,38,0.2)',
  'Social Studies': 'rgba(22,163,74,0.2)',
  'Reasoning Through Language Arts (RLA)': 'rgba(124,58,237,0.2)',
  Workforce: 'rgba(20,184,166,0.2)',
};

const SUBJECT_SHORT_LABELS = {
  Science: 'Science',
  Math: 'Math',
  'Social Studies': 'Social Studies',
  'Reasoning Through Language Arts (RLA)': 'RLA',
  Workforce: 'Workforce',
};

const VOCABULARY_SUBJECT_COLORS = {
  Science: '#dc2626',
  Math: '#0284c7',
  'Social Studies': '#16a34a',
  'Reasoning Through Language Arts (RLA)': '#7c3aed',
};

const MAX_TICKER_WORDS_PER_SUBJECT = 10;

// Fallback vocabulary remains in app.jsx for now to reduce diff size.
// It can be moved here later once references are confirmed.

if (typeof window !== 'undefined') {
  window.SubjectVisuals = Object.assign(window.SubjectVisuals || {}, {
    SUBJECT_NAMES,
    SUBJECT_COLORS,
    SUBJECT_BG_GRADIENTS,
    SUBJECT_LIGHT_SURFACE_GRADIENTS,
    SUBJECT_LIGHT_TINTS,
    SUBJECT_SHORT_LABELS,
    VOCABULARY_SUBJECT_COLORS,
    MAX_TICKER_WORDS_PER_SUBJECT,
  });
}
