import type { Project } from '@/lib/types'

// NOTE: projects without a `year` are marked TODO — confirm and fill them in.
export const projects: Project[] = [
  {
    slug: 'insight-for-impact',
    title: 'Insight for Impact',
    year: '2026',
    summary: 'AI humanitarian command center built in 36 hours for Hacklytics 2026.',
    description:
      'An AI-powered humanitarian command center built for Hacklytics 2026 (Databricks × United Nations). It turns fragmented UN humanitarian data into something you can actually act on: a 3D crisis globe, funding gap analytics, ML forecasts, and natural-language queries over live data.',
    tech: ['Python', 'XGBoost', 'Prophet', 'Streamlit'],
    highlights: [
      'Two-stage ML pipeline — Prophet for funding trends, XGBoost for needs prediction',
      'Interactive 3D globe with Globe.gl / Three.js and Plotly analytics',
      'Conversational queries over UN HNO/HRP data via Databricks Genie',
      'Mismatch scoring to surface high-neglect-risk regions',
    ],
    figures: [
      {
        src: '/images/projects/insight-for-impact-screenshot.png',
        alt: 'Insight for Impact — humanitarian dashboard and 3D crisis globe',
        width: 800,
        height: 480,
      },
      {
        src: '/images/projects/insight-for-impact-team.png',
        alt: 'The Insight for Impact team at Hacklytics 2026',
        width: 800,
        height: 533,
        caption: 'Built with Nikil Kandala for Hacklytics 2026: Golden Byte at Georgia Tech.',
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Nikil456/Insight-for-Impact' },
      {
        label: 'Devpost',
        href: 'https://devpost.com/software/insight-for-impact?ref_content=my-projects-tab&ref_feature=my_projects',
      },
    ],
  },
  {
    slug: 'order-entry-system',
    title: 'Order Entry System',
    year: '2024',
    summary: 'Sub-50ms trading system in Redis and FastAPI, demoed at Millennium HQ.',
    description:
      'A full-stack order entry system for hedge fund traders, built with a three-person team. Redis caching and low-latency matching over FastAPI and WebSockets get request/response under 50ms, behind a deliberately lightweight HTMX front end.',
    tech: ['Python', 'FastAPI', 'Redis'],
    highlights: [
      'Sub-50ms request/response on local benchmarks',
      'Redis sorted sets for price-time priority, atomic matching via Lua scripts',
      'Real-time order book streamed over WebSockets',
      'Risk limits, role-based access, multi-account support, and audit logging',
    ],
    figures: [
      {
        src: '/images/projects/order-entry-screenshot.png',
        alt: 'Order Entry System — order book and trading interface',
        width: 800,
        height: 480,
      },
      {
        src: '/images/projects/millennium-hq-team.jpg',
        alt: 'The team at Millennium HQ in New York',
        width: 800,
        height: 480,
        caption:
          'Demoed at Millennium HQ in New York — order submission, real-time matching, and risk controls.',
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/zarcop/order-entry-system-millenium',
      },
    ],
  },
  {
    slug: 'cruise-line-database',
    title: 'Cruise Line Database System',
    // TODO(elias): confirm year
    summary: 'EERD design and an optimized SQL backend for cruise line operations.',
    description:
      'Designed the EERD and built an optimized SQL database for a cruise line management system, with the constraints and stored procedures needed to keep the data honest under complex booking scenarios.',
    tech: ['SQL', 'Python'],
    highlights: [
      'Optimized constraints and stored procedures',
      'Enforced data integrity without sacrificing query performance',
      'Schema designed to scale with operational complexity',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/zarcop/CruiseLine-DatabaseSystem' },
    ],
  },
  {
    slug: 'peohnein',
    title: 'Peohnein',
    // TODO(elias): confirm year
    summary: 'Real-time air quality data turned into workplace PPE recommendations.',
    description:
      'A workplace safety app that reads live air quality from PurpleAir sensors and recommends protective equipment against safety thresholds, sourcing real products through the Amazon Product Advertising API.',
    tech: ['Python', 'Javascript', 'Node.js'],
    highlights: [
      'Real-time air quality monitoring across sensor APIs',
      'Automated PPE recommendations driven by safety thresholds',
      'Dashboard for workplace safety metrics',
    ],
  },
  {
    slug: 'air-quality-analysis',
    title: 'Air Quality Analysis',
    // TODO(elias): confirm year
    summary: 'Trend and forecast analysis over a million-plus pollution readings.',
    description:
      'A statistical study of more than a million pollution data points, using correlation analysis, time-series modeling, and forecasting to find the trends underneath the noise.',
    tech: ['Numpy', 'Pandas', 'MatPlotlib'],
    highlights: [
      'Correlation analysis across a million-plus readings',
      'Time-series modeling and statistical forecasting',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/zarcop/Air-Quality-Stastical-Analysis.',
      },
    ],
  },
]
