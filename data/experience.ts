import type { Experience } from '@/lib/types'

export const experience: Experience[] = [
  {
    org: 'Google — LearnX',
    role: 'Software Engineering Intern',
    start: 'Summer 2025',
    logo: '/images/experience/google_logo.jpeg', 
    bullets: [
      'Built agentic AI pipelines and interactive TypeScript game templates',
      'Reduced latency by ~95% on Gemini workflows',
    ],
  },

  {
    org: 'Georgia Tech Student Foundation (GTSF)',
    role: 'Quantitative Analyst',
    start: '2024',
    end: 'Present',
    logo: '/images/experience/gtsfinvestments_logo.jpeg', 
    bullets: [
      'Implemented ARIMA, SARIMA-GARCH, XGBoost models to monitor commodities volatility',
      'Designed ensemble trading strategies with backtesting and risk-adjusted performance metrics',
    ],
  },
]
