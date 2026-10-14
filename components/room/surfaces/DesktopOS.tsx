'use client'

import { useEffect, useState } from 'react'
import NowPlayingLine, { useNowPlaying } from '@/components/room/NowPlaying'
import { hotspotById } from '@/data/room'

/**
 * The screen inside the monitor: a small desktop with a window on it.
 *
 * Opens with the window up, because the intro is the reason anyone lands here.
 * Closing it reveals the apps underneath.
 */

const APPS: { id: string; label: string; href: string; glyph: string }[] = [
  { id: 'x', label: 'X', href: 'https://x.com/', glyph: '𝕏' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/eliaszarcog', glyph: 'in' },
  { id: 'music', label: 'Apple Music', href: 'https://music.apple.com/', glyph: '♪' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/zarcop', glyph: '{ }' },
]

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

export default function DesktopOS() {
  const [windowOpen, setWindowOpen] = useState(true)
  const nowPlaying = useNowPlaying(true)
  const hotspot = hotspotById('desk')

  return (
    <div className="flex h-full w-full flex-col bg-[#0d2a36] text-[#dfe9ee]">
      {/* menu bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0a222c] px-4 py-2 text-[13px]">
        <span className="font-medium tracking-tight">Elias Zarco</span>
        <span className="flex items-center gap-4 text-white/55">
          {nowPlaying?.playing && <span className="text-[#e39466]">♪ playing</span>}
          <Clock />
        </span>
      </div>

      <div className="relative flex-1">
        {/* desktop icons, revealed when the window is closed */}
        <div className="absolute inset-0 flex flex-col items-start gap-4 p-5">
          {APPS.map((app) => (
            <a
              key={app.id}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-white/10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-[15px] text-white/85 ring-1 ring-white/15">
                {app.glyph}
              </span>
              <span className="text-[13px] text-white/75 group-hover:text-white">{app.label}</span>
            </a>
          ))}

          {!windowOpen && (
            <button
              type="button"
              onClick={() => setWindowOpen(true)}
              className="mt-2 flex items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#e39466]/20 text-[15px] text-[#e39466] ring-1 ring-[#e39466]/40">
                ✎
              </span>
              <span className="text-[13px] text-white/75">About me</span>
            </button>
          )}
        </div>

        {/* the window */}
        {windowOpen && (
          <div className="absolute inset-x-5 top-4 bottom-4 flex flex-col overflow-hidden rounded-lg bg-[#f7f4ef] text-[#1c1a17] shadow-2xl ring-1 ring-black/20">
            <div className="flex items-center gap-2 border-b border-black/10 bg-[#ece7e0] px-3 py-2">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setWindowOpen(false)}
                className="h-3 w-3 rounded-full bg-[#e06c5a] transition-transform hover:scale-110"
              />
              <span className="h-3 w-3 rounded-full bg-[#e0b45a]" />
              <span className="h-3 w-3 rounded-full bg-[#7fb86b]" />
              <span className="ml-2 text-[12px] text-black/50">about — elias zarco</span>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <h2 className="text-[17px] font-semibold tracking-tight">Elias Zarco</h2>
              <p className="mt-0.5 text-[12px] uppercase tracking-[0.12em] text-black/45">
                AI, optimization &amp; systems
              </p>

              {hotspot?.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-[13px] leading-relaxed text-black/70">
                  {paragraph}
                </p>
              ))}

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px]">
                {hotspot?.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[#a8552a] underline decoration-[#a8552a]/40 underline-offset-2 hover:decoration-[#a8552a]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="[&_*]:!text-[12px]">
                <NowPlayingLine data={nowPlaying} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
