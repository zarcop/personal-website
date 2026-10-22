'use client'

import { useEffect, useMemo, useState } from 'react'
import { ContactShadows } from '@react-three/drei'
import CameraRig from '@/components/room/CameraRig'
import Room from '@/components/room/Room'
import { daylightAt, localHour, type Daylight } from '@/lib/daylight'
import { useRoom } from '@/store/room'

/** Re-read the clock every five minutes, so a long visit drifts with the light. */
const CLOCK_INTERVAL = 5 * 60 * 1000

export default function Scene({ quality }: { quality: 'high' | 'low' }) {
  const setReady = useRoom((s) => s.setReady)
  const [hour, setHour] = useState(() => localHour())

  useEffect(() => {
    setReady(true)
    const id = setInterval(() => setHour(localHour()), CLOCK_INTERVAL)
    return () => {
      clearInterval(id)
      setReady(false)
    }
  }, [setReady])

  const light: Daylight = useMemo(() => daylightAt(hour), [hour])

  return (
    <>
      <color attach="background" args={[light.background]} />
      <ambientLight intensity={light.ambient} />

      {/* key light, angled through where the window is */}
      <directionalLight
        position={[6, 6.5, 4]}
        color={light.keyColor}
        intensity={light.keyIntensity}
        castShadow={quality === 'high'}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0008}
        // the default shadow frustum is a 10m box centred on the origin, which
        // clips this room badly — widen it to cover the whole wall
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={7}
        shadow-camera-bottom={-3}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
      />
      <directionalLight
        position={[-5, 3.5, 2]}
        color={light.fillColor}
        intensity={light.fillIntensity}
      />

      <Room daylight={light} />

      {/*
        Grounding shadow under the free-standing objects. Without it the ball and
        the bookcase read as floating, because a single directional light at this
        angle puts almost nothing underneath them.
      */}
      <ContactShadows
        position={[0.4, 0.012, -2.2]}
        scale={14}
        resolution={quality === 'high' ? 1024 : 512}
        blur={2.4}
        opacity={0.34 + (1 - light.brightness) * 0.12}
        far={3}
        frames={1}
      />

      <CameraRig />
    </>
  )
}
