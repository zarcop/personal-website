'use client'

import { useEffect, useState } from 'react'
import { useRoom } from '@/store/room'

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
  const setPlaying = useRoom((s) => s.setPlaying)

  useEffect(() => {
    if (!active) return
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch('/api/now-playing')
        if (!res.ok) return
        const json: NowPlaying = await res.json()
        if (cancelled) return
        setData(json)
        // the monitor's screen lights its now-playing strip from this
        setPlaying(Boolean(json.playing))
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
  }, [active, setPlaying])

  return data
}
