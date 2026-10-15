import { NextResponse } from 'next/server'

/**
 * What Elias is listening to, read from Spotify.
 *
 * Credentials never reach the browser: the refresh token is exchanged for a
 * short-lived access token here, server-side, on every request.
 *
 * Returns `configured: false` rather than an error when the environment
 * variables are absent, so the room simply omits the line instead of showing a
 * broken widget. That is also what happens on every preview deploy that has not
 * had the secrets added.
 */

export const dynamic = 'force-dynamic'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

/** Only the corner of Spotify's response this route reads. */
type SpotifyTrack = {
  name?: string
  artists?: { name?: string }[]
  album?: { name?: string; images?: { url?: string }[] }
  external_urls?: { spotify?: string }
}

type Payload = {
  configured: boolean
  /** True only when something is playing right now. */
  playing: boolean
  title?: string
  artist?: string
  album?: string
  url?: string
  art?: string
}

const OFF: Payload = { configured: false, playing: false }

/**
 * Both URLs are third-party strings that end up in the browser — the album art
 * in a CSS `url()`, the track link in an href. Pin them to the hosts they are
 * supposed to come from so neither can carry anything else.
 */
function safeUrl(value: unknown, hosts: string[]): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return undefined
    if (!hosts.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))) return undefined
    return url.toString()
  } catch {
    return undefined
  }
}

/** Spotify returns a lot; we want five fields. */
function shape(track: SpotifyTrack | undefined, playing: boolean): Payload | null {
  if (!track?.name) return null
  return {
    configured: true,
    playing,
    title: track.name,
    artist: (track.artists ?? []).map((a) => a?.name).filter(Boolean).join(', '),
    album: track.album?.name,
    url: safeUrl(track.external_urls?.spotify, ['spotify.com']),
    art: safeUrl(track.album?.images?.at(-1)?.url, ['scdn.co']),
  }
}

async function accessToken(id: string, secret: string, refresh: string) {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = await res.json()
  return typeof json.access_token === 'string' ? json.access_token : null
}

export async function GET() {
  const id = process.env.SPOTIFY_CLIENT_ID
  const secret = process.env.SPOTIFY_CLIENT_SECRET
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN

  if (!id || !secret || !refresh) return cached(OFF)

  try {
    const token = await accessToken(id, secret, refresh)
    if (!token) return cached(OFF)

    const headers = { Authorization: `Bearer ${token}` }

    const live = await fetch(NOW_PLAYING_URL, { headers, cache: 'no-store' })
    // 204 means nothing is playing; anything 2xx with a body means something is
    if (live.status === 200) {
      const json = await live.json().catch(() => null)
      const shaped = json?.item ? shape(json.item, Boolean(json.is_playing)) : null
      if (shaped) return cached(shaped)
    }

    // nothing live — show the last thing played instead of an empty slot
    const recent = await fetch(RECENT_URL, { headers, cache: 'no-store' })
    if (recent.ok) {
      const json = await recent.json().catch(() => null)
      const shaped = shape(json?.items?.[0]?.track, false)
      if (shaped) return cached(shaped)
    }

    return cached({ configured: true, playing: false })
  } catch {
    // network blip, revoked token, Spotify outage — the room just hides the line
    return cached(OFF)
  }
}

function cached(payload: Payload) {
  const res = NextResponse.json(payload)
  // Short CDN cache keeps us well inside Spotify's rate limit without the line
  // ever feeling stale. Every exit from GET goes through here, including the
  // empty ones: a visitor polling a room where nothing is playing was otherwise
  // reaching Spotify twice per request.
  res.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=90')
  return res
}
