import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx,mdx}','./components/**/*.{ts,tsx}','./content/**/*.mdx'],
  theme: {
    extend: {
      borderRadius: { xl: '1rem' },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
