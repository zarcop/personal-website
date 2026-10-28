import type { Experience } from '@/lib/types'

/**
 * Newest first. This feeds both the written /experience page and the timeline
 * drawn on the whiteboard in the room, which is why `summary` has to work as a
 * standalone line: on the board it is the only sentence an entry gets.
 *
 * `logo` points at a real file in public/images/experience when one exists.
 * Everything else falls back to `mark` — a lettered tile in the org's colour.
 * Drop a file in and add the `logo` line to swap it; nothing else changes.
 */
export const experience: Experience[] = [
  {
    slug: 'ai4opt',
    org: 'AI4OPT',
    role: 'Research Assistant',
    location: 'Atlanta, GA',
    period: 'Sept 2026 — Now',
    shortPeriod: '2026 —',
    summary: 'Diffusion models for large-scale optimization, aimed at supply chain and healthcare.',
    logo: '/images/experience/ai4opt_logo.png',
    mark: { short: 'AI4', bg: '#1d3f63' },
    tech: ['Python', 'PyTorch', 'Gurobi'],
    bullets: [
      'Researching diffusion-model approaches to large-scale optimization at the NSF AI Institute for Advances in Optimization',
      'The applications are supply chain and healthcare operations, where the schedule is most of the product',
    ],
  },
  {
    slug: 'hsbc',
    org: 'HSBC',
    role: 'AI Project Manager Intern',
    location: 'Mexico City, MX',
    period: 'Summer 2026',
    shortPeriod: '2026',
    summary: 'Got AI agents working inside a global bank — 40% to 90% task success.',
    logo: '/images/experience/hsbc_logo.png',
    mark: { short: 'HSBC', bg: '#db0011' },
    tech: ['Python', 'SQL'],
    bullets: [
      "Led AI adoption for a Transformation team running a $5M+ quarterly project portfolio, scoping agent use cases against a global bank's data-governance and security rules",
      'Ran the technical workshops that moved 25+ business analysts from evaluating agents to using them in production',
      'The agents were failing on unstructured input, not on reasoning. Wrote Python and SQL that broke sprawling Excel workbooks into normalised, agent-readable tables, and task success went from 40% to 90%',
      "Built the adoption metrics and the rollout plan behind that number, and presented the results to HSBC México's C-suite",
    ],
  },
  {
    slug: 'isye-tutor',
    org: 'Georgia Tech ISyE',
    role: 'Academic Tutor',
    location: 'Atlanta, GA',
    period: 'Spring 2026',
    shortPeriod: '2026',
    summary: 'Optimization and statistics, for courses with 1,000+ students between them.',
    logo: '/images/experience/gt_logo.png',
    mark: { short: 'GT', bg: '#b3a369', fg: '#1f1e1a' },
    tech: ['Python', 'Gurobi', 'R'],
    bullets: [
      'Tutored Engineering Optimization and Statistics, courses with 1,000+ students enrolled between them',
      'Mostly linear and integer programming models, and the Python (Gurobi) and R projects that go with them',
    ],
  },
  {
    slug: 'google-learnx',
    org: 'Google',
    role: 'Associate Software Developer Intern',
    location: 'Mountain View, CA',
    period: 'Summer 2025',
    shortPeriod: '2025',
    summary: "Full-stack AI feature for Gemini Education's interactive learning tools.",
    logo: '/images/experience/google_logo.jpeg',
    mark: { short: 'G', bg: '#1a73e8' },
    tech: ['Kotlin', 'TypeScript', 'Python', 'JavaScript'],
    bullets: [
      "Owned a full-stack, AI-integrated feature for Gemini Education's interactive learning tools in Kotlin and TypeScript, cutting content-generation latency by more than 95%",
      'Built the API layer that lets sandboxed iframe components exchange JSON with Gemini, with prompt routing across reusable front-end game templates',
      'Built an autonomous QA framework where a multimodal agent playtests the tools from screenshots, to check launch-readiness for Gemini and NotebookLM',
    ],
  },
  {
    slug: 'gtsf',
    org: 'GTSF Investments Committee',
    role: 'Quantitative Analyst',
    location: 'Atlanta, GA',
    period: '2024 — 2026',
    shortPeriod: '2024',
    summary: 'Volatility models and bank valuations for a $2.3M student-run fund.',
    logo: '/images/experience/gtsfinvestments_logo.jpeg',
    mark: { short: 'GTSF', bg: '#2d4a3e' },
    tech: ['Python', 'XGBoost', 'Pandas', 'R'],
    bullets: [
      'Valued seven financial institutions with dividend discount and comparables, and pitched to a 200+ member committee allocating a $2.3M student-managed portfolio (sector Sharpe ratio 1.59)',
      'Built VECM, SARIMA-GARCH and XGBoost models on satellite-derived and macro indicators to anticipate commodity volatility, then adjusted fund strategy through backtesting and risk-adjusted evaluation',
    ],
  },
]
