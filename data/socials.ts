/**
 * Where to find me. One list, used by the dock on the monitor's desktop and by
 * anything else that needs the same links.
 *
 * `todo` entries still point at the service's front door rather than at a
 * profile; `npm run content:check` lists them.
 */
export type Social = {
  id: 'github' | 'linkedin' | 'x' | 'spotify'
  label: string
  href: string
  todo?: string
}

export const socials: Social[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/zarcop' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/eliaszarcog' },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/',
    todo: 'Your X handle. Until it is here the icon just opens x.com.',
  },
  {
    id: 'spotify',
    label: 'Spotify',
    href: 'https://open.spotify.com/',
    todo: 'Your Spotify profile URL, for when nothing is playing.',
  },
]

export const socialById = (id: Social['id']) => socials.find((s) => s.id === id)
