export type Vec3 = [number, number, number]

export type Link = { label: string; href: string }

export type Figure = {
  src: string
  alt: string
  width: number
  height: number
  /** Optional line rendered beneath the image. */
  caption?: string
}

/**
 * The square that stands in for an employer in the room's timeline. A real
 * `logo` file wins when there is one; otherwise this draws a lettered tile, so
 * a missing logo reads as deliberate rather than as a hole in the row.
 */
export type Mark = { short: string; bg: string; fg?: string }

export type Experience = {
  slug: string
  org: string
  role: string
  /** City, shown in the timeline — the geography is part of the point. */
  location?: string
  /** Human-readable range shown in the mono column, e.g. "2024 — Now". */
  period: string
  /** Compact form for the home-page list, e.g. "2025". */
  shortPeriod: string
  /** One line for the home-page list. */
  summary: string
  logo?: string
  mark?: Mark
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
