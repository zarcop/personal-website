import type { Project } from '@/lib/types'

// NOTE: projects without a `year` are marked TODO — confirm and fill them in.
export const projects: Project[] = [
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
    slug: 'vision-benchmark',
    title: 'Vision Model Benchmark',
    // TODO(elias): confirm year
    summary: 'LeNet, AlexNet and a Vision Transformer, compared on equal compute.',
    description:
      'A controlled PyTorch benchmark of LeNet-5, a custom AlexNet and a custom Vision Transformer. Each was trained to a fixed A100 wall-clock budget rather than a fixed number of epochs, so the comparison is compute-for-compute: what does each architecture do with the same hour?',
    tech: ['Python', 'PyTorch'],
    highlights: [
      'Fixed wall-clock budget instead of fixed epochs, so the three are compared on equal compute',
      'Stratified k-fold tuning across all three architectures',
      'Accuracy per GFLOP as the headline metric — the ViT comes out ahead of AlexNet',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/zarcop/4803_project_advanced_neural_networks',
      },
      {
        label: 'White paper',
        href: 'https://drive.google.com/file/d/1aMVNbAwdfhnp0odzNY_4aSZ39a8U7nYY/view?usp=sharing',
      },
    ],
  },
  {
    slug: 'deadlight-harness',
    title: 'AI Safety Sandbox for Navy Agents',
    year: '2026',
    summary: 'Simulates every command an AI agent sends to a naval drone, and blocks the unsafe ones.',
    description:
      'An offline safety layer between an AI agent and a naval drone. Every command is simulated before it is allowed through, combining hard rules for the things that are never permitted with anomaly detection over ONNX embeddings and a FAISS index for the things that merely look wrong.',
    tech: ['Python', 'ONNX', 'FAISS'],
    highlights: [
      '35 of 35 dangerous commands stopped across 21 simulated scenarios',
      'About 8 ms per decision, at a 0.4% false-alarm rate',
      'Hard rules for the absolutes, anomaly detection for everything else',
      'Offline by design — no network call sits inside the safety path',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/zarcop/deadlight-harness' }],
  },
  {
    slug: 'shpe-network',
    title: "Who's Going to SHPE",
    year: '2026',
    summary: 'A live graph of who is at SHPE, searchable in plain English.',
    description:
      'A networking app for SHPE attendees and recruiters. People sign up from a résumé or LinkedIn PDF, then explore a graph of everyone coming, linked through four hubs: college, company, country of origin and major. You can also search for people in plain English.',
    tech: ['TypeScript', 'React Native', 'Supabase', 'Claude'],
    highlights: [
      'Résumé and LinkedIn autofill that runs entirely on the device, with pdf.js and fixed rules instead of an LLM',
      'Force-directed graph of people, joined through college, company, country and major',
      'Plain-English search: free on-device rules first, Claude Haiku only for what they miss',
      'Row-level security on Postgres, covered by pgTAP tests',
    ],
    links: [
      { label: 'Live', href: 'https://who-is-going-to-shpe.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/zarcop/shpe-network' },
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

/** The first five lead: the room's computer and the projects tower show only these. */
export const featuredProjects = projects.slice(0, 5)
