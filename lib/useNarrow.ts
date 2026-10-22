'use client'

import { useEffect, useState } from 'react'

/**
 * True on a viewport taller than it is wide — the same rule CameraRig uses to
 * pick the portrait idle pose.
 *
 * It decides whether the monitor and the whiteboard carry their own content.
 * three.js `fov` is vertical, so fitting a landscape surface across a portrait
 * screen pushes the camera back far enough that the text on it is unreadable,
 * however large the surface is in the room. Portrait screens get the
 * whiteboard in the bottom panel and the desktop full-screen instead.
 *
 * Starts false and corrects after mount: reading the viewport during render
 * would desync hydration.
 */
export function useNarrowViewport() {
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-aspect-ratio: 1/1)')
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return narrow
}
