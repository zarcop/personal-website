import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        faint: 'hsl(var(--faint) / <alpha-value>)',
        line: 'hsl(var(--line) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        label: '0.12em',
      },
      maxWidth: {
        reading: '38rem',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        load: {
          '0%': { width: '0%', opacity: '1' },
          '70%': { width: '100%', opacity: '1' },
          '100%': { width: '100%', opacity: '0' },
        },
        'window-open': {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        rise: 'rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        eq: 'eq 0.9s ease-in-out infinite',
        load: 'load 0.6s ease-out forwards',
        'window-open': 'window-open 0.18s cubic-bezier(0.16, 1, 0.3, 1) backwards',
      },
    },
  },
  plugins: [],
} satisfies Config
