'use client'

import { useEffect, useState } from 'react'

export type NowPlaying = {
  configured: boolean
  playing: boolean
  title?: string
  artist?: string
  album?: string
  url?: string
  art?: string
}

/**
 * Polls only while the desk panel is open. A room left on a second monitor
 * should not hammer the route all afternoon.
 */
export function useNowPlaying(active: boolean) {
  const [data, setData] = useState<NowPlaying | null>(null)

  useEffect(() => {
    if (!active) return
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch('/api/now-playing')
        if (!res.ok) return
        const json: NowPlaying = await res.json()
        if (!cancelled) setData(json)
      } catch {
        // offline or blocked — leave whatever we last had
      }
    }

    void load()
    const id = setInterval(load, 45_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [active])

  return data
}

/** Renders nothing at all unless Spotify is configured and returned a track. */
export default function NowPlayingLine({ data }: { data: NowPlaying | null }) {
  if (!data?.configured || !data.title) return null

  const line = (
    <>
      <span className="font-medium text-foreground">{data.title}</span>
      {data.artist && <span className="text-muted"> — {data.artist}</span>}
    </>
  )

  return (
    <div className="mt-5 flex items-start gap-2.5 border-t border-line pt-4">
      <span
        aria-hidden
        className={[
          'mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full',
          data.playing ? 'animate-pulse bg-accent' : 'bg-faint',
        ].join(' ')}
      />
      <p className="text-[0.9375rem] leading-relaxed">
        <span className="mr-2 font-mono text-2xs uppercase tracking-label text-faint">
          {data.playing ? 'Listening now' : 'Last played'}
        </span>
        <br />
        {data.url ? (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line decoration-1 underline-offset-[5px] transition-colors hover:decoration-accent"
          >
            {line}
          </a>
        ) : (
          line
        )}
      </p>
    </div>
  )
}
