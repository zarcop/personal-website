'use client'

import { useProgress } from '@react-three/drei'

/**
 * Covers the canvas until the scene is ready. Without it the room pops in
 * abruptly on a slow connection, which reads as a glitch rather than a load.
 *
 * Sits outside the Canvas, so it is ordinary DOM: readable, and announced to
 * screen readers.
 */
export default function LoadingScreen() {
  const { active, progress } = useProgress()

  return (
    <div
      aria-hidden={!active}
      className={[
        'pointer-events-none absolute inset-0 z-30 flex items-center justify-center',
        'bg-background transition-opacity duration-[250ms]',
        active ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
    >
      <div className="w-40 text-center">
        <p className="font-mono text-2xs uppercase tracking-label text-faint" role="status">
          Building the room
        </p>
        <div className="mt-3 h-px w-full bg-line">
          <div
            className="h-px bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
