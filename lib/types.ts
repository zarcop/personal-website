export type Link = { label: string; href: string }
export type Project = {
  slug: string
  title: string
  period?: string
  summary: string
  tags: string[]
  links?: Link[]
  highlights?: string[]
  cover?: string // e.g., '/images/project.png'
}
export type Experience = {
  org: string
  role: string
  start: string
  end?: string
  logo?: string
  bullets: string[]
  links?: Link[]
}
