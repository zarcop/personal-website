'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useNowPlaying, type NowPlaying } from '@/components/room/NowPlaying'
import { GitHubIcon, LinkedInIcon, SpotifyIcon, XIcon } from '@/components/room/surfaces/BrandIcons'
import { hotspotById } from '@/data/room'
import { socialById } from '@/data/socials'

/**
 * The screen inside the monitor: a desktop with a browser open on it.
 *
 * This is laid out in its own 900 x 528 pixel space and mapped onto the screen
 * plane by SurfaceUI — so these sizes are design pixels, not CSS pixels on the
 * visitor's display. At the desk pose the screen fills roughly 72% of frame
 * height, which renders them about 1.2x larger than written here.
 *
 * It opens with the browser up, because the intro is the reason anyone lands
 * here. Closing it leaves the desktop: the dock, the shortcuts, and whatever is
 * playing.
 */

const PX_W = 900
const PX_H = 528

/**
 * The desktop picture: a system wallpaper, not a nameplate. Three layers —
 * a sweep through blue into violet and warm pink, a glow bottom-right, and a
 * highlight top-left — because a single linear gradient across 900px reads flat
 * and banded where a layered one reads lit.
 */
const WALLPAPER = [
  'radial-gradient(85% 70% at 14% 4%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 58%)',
  'radial-gradient(115% 95% at 88% 104%, rgba(236,142,96,0.58) 0%, rgba(236,142,96,0) 56%)',
  'linear-gradient(152deg, #0d1f55 0%, #262a7c 28%, #4f2f85 52%, #8a3a7c 76%, #b85070 100%)',
].join(', ')

const DOCK = [
  { id: 'github', Icon: GitHubIcon, bg: '#1f2328' },
  { id: 'linkedin', Icon: LinkedInIcon, bg: '#0a66c2' },
  { id: 'x', Icon: XIcon, bg: '#16181c' },
  { id: 'spotify', Icon: SpotifyIcon, bg: '#1db954' },
] as const

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="tabular-nums">
      {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

/** The desktop's own now-playing card. Absent entirely when there is no track. */
function MusicCard({ data }: { data: NowPlaying | null }) {
  if (!data?.configured || !data.title) return null

  const body = (
    <>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#7fd6a0]">
        {data.playing ? 'Listening now' : 'Last played'}
      </p>
      <p className="mt-1.5 truncate text-[13px] font-medium text-white/90">{data.title}</p>
      {data.artist && <p className="truncate text-[11px] text-white/55">{data.artist}</p>}
    </>
  )

  return (
    <div className="w-[340px] rounded-xl bg-black/35 p-3.5 ring-1 ring-white/10">
      <div className="flex items-center gap-3.5">
        <span
          className="grid h-[52px] w-[52px] flex-none place-items-center overflow-hidden rounded-lg bg-[#1db954]/15 text-[#1db954]"
          style={data.art ? { backgroundImage: `url(${data.art})`, backgroundSize: 'cover' } : undefined}
        >
          {!data.art && <SpotifyIcon className="h-6 w-6" />}
        </span>
        <div className="min-w-0 flex-1">
          {data.url ? (
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90">
              {body}
            </a>
          ) : (
            body
          )}
        </div>
      </div>
    </div>
  )
}

/** A shortcut sitting on the wallpaper, the way files do. */
function Shortcut({
  href,
  label,
  glyph,
  external,
}: {
  href: string
  label: string
  glyph: string
  external?: boolean
}) {
  const inner = (
    <>
      <span className="grid h-[38px] w-[38px] place-items-center rounded-lg bg-white/10 text-[15px] text-white/80 ring-1 ring-white/15 transition-colors group-hover:bg-white/20">
        {glyph}
      </span>
      <span className="text-[10px] text-white/65 group-hover:text-white">{label}</span>
    </>
  )
  const className = 'group flex w-[72px] flex-col items-center gap-1.5 text-center'

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}

export default function DesktopOS() {
  const [browserOpen, setBrowserOpen] = useState(true)
  const nowPlaying = useNowPlaying(true)
  const hotspot = hotspotById('desk')
  const resume = hotspotById('resume')?.links?.[0]

  return (
    <div
      className="relative flex flex-col overflow-hidden text-[#eef1f6]"
      style={{ width: PX_W, height: PX_H, background: WALLPAPER }}
    >
      {/* ——— menu bar ——— */}
      <div className="flex flex-none items-center justify-between border-b border-white/10 bg-black/30 px-4 py-[6px] text-[11px]">
        <span className="flex items-center gap-2.5">
          <span className="grid h-[15px] w-[15px] place-items-center rounded-[4px] bg-[#c2703c] text-[8px] font-bold text-[#140f0b]">
            EZ
          </span>
          <span className="font-medium tracking-tight">Elias Zarco</span>
          <span className="text-white/35">{browserOpen ? 'Browser' : 'Finder'}</span>
        </span>
        <span className="flex items-center gap-3.5 text-white/55">
          {nowPlaying?.playing && nowPlaying.title && (
            <span className="flex max-w-[260px] items-center gap-1.5 text-[#7fd6a0]">
              <SpotifyIcon className="h-3 w-3 flex-none" />
              <span className="truncate">
                {nowPlaying.title}
                {nowPlaying.artist && <span className="text-white/45"> — {nowPlaying.artist}</span>}
              </span>
            </span>
          )}
          <Clock />
        </span>
      </div>

      {/* ——— desktop ——— */}
      <div className="relative flex-1">
        {/* shortcuts, the way files sit on a desktop */}
        <div className="absolute left-4 top-4 flex flex-col gap-3.5">
          {resume && <Shortcut href={resume.href} label="Résumé.pdf" glyph="▤" external />}
          <Shortcut href="/projects" label="Projects" glyph="▸" />
          <Shortcut href="/experience" label="Experience" glyph="◈" />
          <Shortcut href="/" label="Written site" glyph="⌂" />
        </div>

        {/* With the browser closed, the wallpaper is the desktop. A track floats
            over it when Spotify has one; otherwise there is nothing to say. */}
        {!browserOpen && (
          <div className="absolute inset-0 grid place-items-center px-10">
            <MusicCard data={nowPlaying} />
          </div>
        )}

        {browserOpen && (
          <div className="absolute inset-x-6 bottom-2 top-3 flex flex-col overflow-hidden rounded-[10px] bg-[#f6f3ee] text-[#1c1a17] shadow-[0_18px_44px_rgba(0,0,0,0.45)] ring-1 ring-black/25">
            {/* tab strip */}
            <div className="flex flex-none items-center gap-2.5 bg-[#ddd7cd] px-3 pt-2">
              <span className="flex gap-1.5 pb-2">
                <button
                  type="button"
                  aria-label="Close the browser"
                  onClick={() => setBrowserOpen(false)}
                  className="h-[11px] w-[11px] rounded-full bg-[#e06c5a] transition-transform hover:scale-110"
                />
                <span className="h-[11px] w-[11px] rounded-full bg-[#e0b45a]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#7fb86b]" />
              </span>
              <span className="flex items-center gap-1.5 rounded-t-[7px] bg-[#f6f3ee] px-3 py-[6px] text-[11px]">
                <span className="h-[9px] w-[9px] rounded-[2px] bg-[#c2703c]" />
                about — elias zarco
              </span>
              <span className="pb-2 text-[12px] text-black/30">+</span>
            </div>

            {/* address bar */}
            <div className="flex flex-none items-center gap-2.5 border-b border-black/10 bg-[#efeae3] px-3 py-[7px]">
              <span aria-hidden className="flex gap-2 text-[12px] leading-none text-black/25">
                <span>←</span>
                <span>→</span>
                <span>⟳</span>
              </span>
              <span className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-[3px] text-[10.5px] text-black/45 ring-1 ring-black/5">
                <span aria-hidden>🔒</span>
                <span className="text-black/70">eliaszarco.com</span>
                <span>/about</span>
              </span>
            </div>

            {/* page */}
            <div className="flex-1 overflow-y-auto px-7 py-4">
              <h1 className="text-[21px] font-semibold leading-tight tracking-tight">Elias Zarco</h1>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.17em] text-black/45">
                AI · Optimization · Systems
              </p>

              <div className="mt-3 space-y-2">
                {hotspot?.body.map((paragraph) => (
                  <p key={paragraph} className="text-[12px] leading-[1.6] text-black/72">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-black/10 pt-2.5 text-[11px]">
                {hotspot?.links?.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a8552a] underline decoration-[#a8552a]/35 underline-offset-[3px] hover:decoration-[#a8552a]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[#a8552a] underline decoration-[#a8552a]/35 underline-offset-[3px] hover:decoration-[#a8552a]"
                    >
                      {link.label} →
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ——— dock ——— */}
      <div className="flex flex-none items-center justify-center gap-3 border-t border-white/10 bg-black/45 py-2">
        <button
          type="button"
          onClick={() => setBrowserOpen((open) => !open)}
          aria-pressed={browserOpen}
          className="group flex w-[58px] flex-col items-center gap-1"
        >
          <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-[#c2703c] text-[12px] font-bold text-[#140f0b] ring-1 ring-white/15 transition-transform group-hover:-translate-y-0.5">
            EZ
          </span>
          <span className="text-[9px] text-white/70 group-hover:text-white">
            {browserOpen ? 'Close' : 'About'}
          </span>
        </button>

        <span aria-hidden className="mx-1 h-8 w-px bg-white/10" />

        {DOCK.map(({ id, Icon, bg }) => {
          const social = socialById(id)
          if (!social) return null
          const href = id === 'spotify' && nowPlaying?.url ? nowPlaying.url : social.href

          return (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-[58px] flex-col items-center gap-1"
            >
              <span
                className="grid h-[38px] w-[38px] place-items-center rounded-[11px] text-white ring-1 ring-white/15 transition-transform group-hover:-translate-y-0.5"
                style={{ background: bg }}
              >
                <Icon className="h-[19px] w-[19px]" />
              </span>
              <span className="text-[9px] text-white/70 group-hover:text-white">
                {social.label}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
