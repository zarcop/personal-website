'use client'

import { useEffect, useRef } from 'react'
import { CameraControls } from '@react-three/drei'
import { IDLE_POSE, hotspotById } from '@/data/room'
import { useRoom } from '@/store/room'

/**
 * Drives the camera between authored poses. Visitors get a deliberately
 * constrained orbit rather than free control: free orbit lets people end up
 * inside a wall, or staring at the one corner of the room with nothing in it.
 */
export default function CameraRig() {
  const controls = useRef<CameraControls>(null)
  const focus = useRoom((s) => s.focus)

  useEffect(() => {
    const rig = controls.current
    if (!rig) return

    const pose = hotspotById(focus)?.camera ?? IDLE_POSE
    const [px, py, pz] = pose.position
    const [tx, ty, tz] = pose.target

    // `true` = tween rather than jump
    void rig.setLookAt(px, py, pz, tx, ty, tz, true)
  }, [focus])

  return (
    <CameraControls
      ref={controls}
      makeDefault
      smoothTime={0.55}
      minDistance={1.5}
      maxDistance={14}
      // keep the camera above the floor and out of the walls
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2.15}
      // no panning: it is the fastest way to get lost in a small scene
      mouseButtons={{ left: 1, middle: 0, right: 0, wheel: 8 }}
      touches={{ one: 32, two: 512, three: 0 }}
    />
  )
}
