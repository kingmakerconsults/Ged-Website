module.exports = {
  content: [
    './index.html',
    './app.jsx',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './tools/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
    './_legacy/**/*.{js,jsx,ts,tsx}',
    './graphing/**/*.{js,jsx,ts,tsx}',
    './geometry/**/*.{js,jsx,ts,tsx}',
    './ui/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: 'var(--bg-page)',
        surface: 'var(--bg-surface)',
        'surface-alt': 'var(--bg-muted)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-tertiary)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        danger: 'var(--danger-text)',
        success: 'var(--success-text)',
        info: 'var(--accent)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-lift': '0 12px 24px -4px rgba(0, 0, 0, 0.12)',
        'card-lift-dark': '0 12px 24px -4px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        glass: '16px',
        'glass-strong': '20px',
      },
    },
  },
  plugins: [],
};
