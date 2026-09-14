import type { Experience } from '@/lib/types'

export const experience: Experience[] = [
  {
    slug: 'google-learnx',
    org: 'Google',
    role: 'Software Engineer Intern',
    period: 'Summer 2025',
    shortPeriod: '2025',
    summary: 'Agentic AI pipelines and interactive learning templates on the LearnX team.',
    logo: '/images/experience/google_logo.jpeg',
    tech: ['Python', 'TypeScript', 'Kotlin', 'Javascript'],
    bullets: [
      'Built agentic AI pipelines and interactive TypeScript game templates for the LearnX team',
      'Cut latency on Gemini workflows by roughly 95%',
    ],
  },
  {
    slug: 'gtsf',
    org: 'Georgia Tech Student Foundation',
    role: 'Quantitative Analyst',
    period: '2024 — Now',
    shortPeriod: '2024 —',
    summary: 'Volatility models and ensemble strategies for a student-managed fund.',
    logo: '/images/experience/gtsfinvestments_logo.jpeg',
    tech: ['Python', 'XGBoost', 'ARIMA', 'Pandas'],
    bullets: [
      'Implemented ARIMA, SARIMA-GARCH, and XGBoost models to monitor commodities volatility',
      'Designed ensemble trading strategies with backtesting and risk-adjusted performance metrics',
    ],
  },
]
