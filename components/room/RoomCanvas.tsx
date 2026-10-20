'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { detectCapability, type Capability } from '@/lib/capability'
import { useRoom } from '@/store/room'
import Scene from '@/components/room/Scene'
import OverlayHost from '@/components/room/overlays/OverlayHost'
import BookReader from '@/components/room/books/BookReader'
import LoadingScreen from '@/components/room/LoadingScreen'
import BackToRoom from '@/components/room/BackToRoom'

function Fallback({ reason }: { reason: Capability['reason'] }) {
  const message =
    reason === 'no-webgl'
      ? "This browser can't run the 3D room."
      : 'The 3D room is unavailable on this device.'

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="max-w-reading text-center">
        <p className="text-[1.0625rem] leading-[1.75] text-muted">{message}</p>
        <p className="mt-6">
          <Link
            href="/about"
            className="font-mono text-2xs uppercase tracking-label text-foreground underline decoration-faint decoration-dotted underline-offset-[5px] transition-colors hover:decoration-accent"
          >
            Read the written version instead →
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function RoomCanvas() {
  // null = not yet measured; measuring during render would desync hydration
  const [capability, setCapability] = useState<Capability | null>(null)
  const setQuality = useRoom((s) => s.setQuality)
  const setReducedMotion = useRoom((s) => s.setReducedMotion)

  useEffect(() => {
    const result = detectCapability()
    setCapability(result)
    setReducedMotion(result.reducedMotion)
    if (result.ok) setQuality(result.quality)
  }, [setQuality, setReducedMotion])

  if (!capability) return null
  if (!capability.ok) return <Fallback reason={capability.reason} />

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows={capability.quality === 'high'}
        camera={{ position: [6.5, 4.2, 6.5], fov: 42 }}
        // cap DPR: retina phones will happily render at 3x and melt
        dpr={[1, capability.quality === 'high' ? 2 : 1.5]}
        gl={{ antialias: capability.quality === 'high', powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene quality={capability.quality} />
        </Suspense>
      </Canvas>

      <OverlayHost />
      <BookReader />
      <BackToRoom />
      <LoadingScreen />
    </div>
  )
}
