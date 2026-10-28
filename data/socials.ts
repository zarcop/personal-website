/**
 * Where to find me. One list, used by the dock on the monitor's desktop and by
 * anything else that needs the same links.
 */
export type Social = {
  id: 'github' | 'linkedin' | 'x' | 'spotify'
  label: string
  href: string
  /** The name on the account, where there is a readable one. */
  handle?: string
  todo?: string
}

export const socials: Social[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/zarcop', handle: 'zarcop' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eliaszarcog/',
    handle: 'eliaszarcog',
  },
  { id: 'x', label: 'X', href: 'https://x.com/_ezarco', handle: '_ezarco' },
  // the fallback when nothing is playing; a live track overrides it in the dock
  { id: 'spotify', label: 'Spotify', href: 'https://open.spotify.com/user/3yp9w608mnmcbjk6pejv68s8b' },
]

export const socialById = (id: Social['id']) => socials.find((s) => s.id === id)

/**
 * The one-page PDF, served from public/. The written site, the computer and the
 * résumé on the desk all link here. When it changes, also re-render page 1 into
 * public/images/resume/: the desk shows those images, not the PDF itself.
 */
export const resumePdf = '/resume.pdf'

/** Who to write to. */
export const email = 'eliaszarco@gmail.com'
