import type { Experience } from '@/lib/types'

export const experience: Experience[] = [
  {
    org: 'Georgia Tech Student Foundation (GTSF)',
    role: 'Quantitative Analyst',
    start: '2024',
    end: 'Present',
    logo: '/images/experience/gtsf-logo.png', // TODO: Add logo
    bullets: [
      'Advanced to Quantitative Analyst role developing forecasting models',
      'Implemented ARIMA, SARIMA-GARCH, XGBoost models to monitor commodities volatility',
      'Designed ensemble trading strategies with backtesting and risk-adjusted performance metrics',
    ],
  },
  {
    org: 'Georgia Tech Student Foundation (GTSF)',
    role: 'Senior Analyst — Financial Sector',
    start: '2023',
    end: '2024',
    logo: '/images/experience/gtsf-logo.png', // TODO: Add logo
    bullets: [
      'Conducted financial modeling and relative valuations for 7 financial institutions',
      'Presented stock pitches that influenced allocation decisions within $2.3M student-managed portfolio',
      'Achieved sector Sharpe ratio of 2.79',
    ],
  },
  {
    org: 'Google — LearnX',
    role: 'Software Engineering Intern',
    start: 'Summer 2024',
    logo: '/images/experience/google-logo.png', // TODO: Add logo
    bullets: [
      'Built agentic AI pipelines and interactive TypeScript game templates',
      'Reduced latency by ~95% on Gemini workflows',
    ],
  },
]
