'use client'

import type { NowPlaying } from '@/components/room/NowPlaying'
import { SpotifyIcon } from '@/components/room/surfaces/BrandIcons'
import { socialById } from '@/data/socials'

/**
 * The music player. Shows the live track when Spotify has one, and an honest
 * "nothing playing" otherwise — including when Spotify is not connected, which
 * a visitor has no reason to be told about.
 */
export default function Music({ data }: { data: NowPlaying | null }) {
  const track = data?.configured && data.title ? data : null
  const profile = socialById('spotify')?.href
  const href = track?.url ?? profile

  return (
    <div className="flex h-full items-center gap-4 px-4">
      <span
        className="grid h-[96px] w-[96px] flex-none place-items-center overflow-hidden rounded-lg bg-[#1db954]/15 text-[#1db954] ring-1 ring-white/10"
        style={track?.art ? { backgroundImage: `url("${track.art}")`, backgroundSize: 'cover' } : undefined}
      >
        {!track?.art && <SpotifyIcon className="h-9 w-9" />}
      </span>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#7fd6a0]">
          {track?.playing && <Equaliser />}
          {track ? (track.playing ? 'Listening now' : 'Last played') : 'Nothing playing'}
        </p>
        <p className="mt-1.5 truncate text-[15px] font-semibold text-white/90">
          {track?.title ?? 'Quiet for now'}
        </p>
        <p className="truncate text-[12px] text-white/55">
          {track ? [track.artist, track.album].filter(Boolean).join(' · ') : 'Check back later'}
        </p>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#1db954] px-3 py-1 text-[10.5px] font-semibold text-[#0b2b16] hover:bg-[#23d160]"
          >
            <SpotifyIcon className="h-3 w-3" />
            {track ? 'Open in Spotify' : 'My Spotify'}
          </a>
        )}
      </div>
    </div>
  )
}

/** Three bars bouncing out of step, the universal sign for "this is playing". */
function Equaliser() {
  return (
    <span aria-hidden className="flex h-[9px] items-end gap-[2px]">
      {[0, 180, 360].map((delay) => (
        <span
          key={delay}
          className="w-[2px] origin-bottom animate-eq rounded-sm bg-[#7fd6a0]"
          style={{ animationDelay: `${delay}ms`, height: '100%' }}
        />
      ))}
    </span>
  )
}
