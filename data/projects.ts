import type { Project } from '@/lib/types'
export const projects: Project[] = [
  {
    slug: 'order-entry-system',
    title: 'Hedge‑Fund Order Entry System',
    period: '2024',
    summary: 'Low‑latency order entry (Redis, FastAPI, HTMX). Demoed at Millennium HQ (NYC).',
    tags: ['Python','FastAPI','Redis','HTMX','WebSocket'],
    links: [ { label: 'GitHub', href: 'https://github.com/...' } ],
    highlights: [
      'Sub‑50ms request/response (local bench)',
      'Real‑time order book via websockets',
      'Role‑based access & audit log',
    ],
    cover: '/images/order-entry.png',
  },
  {
    slug: 'playlist-agents',
    title: 'Playlist Agents (Spotify → Apple Music)',
    period: '2025',
    summary: 'Agentic pipeline that builds personalized Spotify playlists and ports them to Apple Music.',
    tags: ['TypeScript','APIs','LLM','Next.js'],
  },
  {
    slug: 'gtsf-research',
    title: 'GTSF — Financial Sector Research',
    period: '2024–present',
    summary: 'Valuations & theses for a ~$2.3M student‑managed fund; led sector research.',
    tags: ['Finance','Valuation','DDM','Comparables'],
  },
]
