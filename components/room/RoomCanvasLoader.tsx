'use client'

import dynamic from 'next/dynamic'

/**
 * Thin client boundary. `ssr: false` is rejected inside a Server Component in the
 * App Router, and R3F touches `window` on mount, so the import has to be deferred
 * from here rather than from app/(room)/page.tsx.
 *
 * Everything three.js-shaped lands in this chunk, keeping it out of the shared
 * bundle that the written site pays for.
 */
const RoomCanvas = dynamic(() => import('@/components/room/RoomCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <p className="font-mono text-2xs uppercase tracking-label text-faint">Loading the room…</p>
    </div>
  ),
})

export default function RoomCanvasLoader() {
  return <RoomCanvas />
}
