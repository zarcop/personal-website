import type { Experience } from '@/lib/types'

export const experience: Experience[] = [
  {
    slug: 'hsbc',
    org: 'HSBC Mexico',
    role: 'AI Project Manager',
    period: 'Summer 2026',
    shortPeriod: '2026',
    summary: 'Implementing AI inside the bank\'s Transformation Department.',
    // TODO(elias): add 1-2 concrete bullets — what you shipped, what changed because of it.
    tech: ['Python'],
    bullets: [
      "Worked in HSBC's Transformation Department on implementing AI rather than building it",
      'Focused on adoption: the people who had to trust the output and the processes that had to bend around it',
    ],
  },
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
