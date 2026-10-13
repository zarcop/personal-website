'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { detectCapability, type Capability } from '@/lib/capability'
import { useRoom } from '@/store/room'
import SpikeScene from '@/components/room/SpikeScene'

function Fallback({ reason }: { reason: Capability['reason'] }) {
  const message =
    reason === 'reduced-motion'
      ? 'Your system is set to reduce motion, so the 3D room is switched off.'
      : reason === 'no-webgl'
        ? "This browser can't run the 3D room."
        : 'The 3D room is unavailable on this device.'

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="max-w-reading text-center">
        <p className="text-[1.0625rem] leading-[1.75] text-muted">{message}</p>
        <p className="mt-6">
          <Link
            href="/"
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

  useEffect(() => {
    const result = detectCapability()
    setCapability(result)
    if (result.ok) setQuality(result.quality)
  }, [setQuality])

  if (!capability) return null
  if (!capability.ok) return <Fallback reason={capability.reason} />

  return (
    <Canvas
      camera={{ position: [4, 3, 5], fov: 45 }}
      // cap DPR: retina phones will happily render 3x and melt
      dpr={[1, capability.quality === 'high' ? 2 : 1.5]}
      gl={{ antialias: capability.quality === 'high', powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <SpikeScene />
      </Suspense>
    </Canvas>
  )
}
