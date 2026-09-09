export type Link = { label: string; href: string }

export type Figure = {
  src: string
  alt: string
  width: number
  height: number
  /** Optional line rendered beneath the image. */
  caption?: string
}

export type Experience = {
  slug: string
  org: string
  role: string
  /** Human-readable range shown in the mono column, e.g. "2024 — Now". */
  period: string
  /** Compact form for the home-page list, e.g. "2025". */
  shortPeriod: string
  /** One line for the home-page list. */
  summary: string
  logo?: string
  tech?: string[]
  bullets: string[]
  links?: Link[]
}

export type Project = {
  slug: string
  title: string
  /** Undefined when the year isn't confirmed — the list renders a dash. */
  year?: string
  /** One line for the home-page list. */
  summary: string
  /** Fuller description on the projects page. */
  description: string
  tech: string[]
  highlights?: string[]
  figures?: Figure[]
  links?: Link[]
}
