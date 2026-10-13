'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { IDLE_POSE, IDLE_POSE_NARROW, PARALLAX, hotspotById } from '@/data/room'
import { useRoom } from '@/store/room'

/**
 * The camera always faces the wall and never orbits behind it. Clicking a
 * hotspot moves it to that hotspot's authored pose; the pointer nudges it a few
 * centimetres for parallax so the scene still reads as three-dimensional.
 *
 * Deliberately not drei's CameraControls: free orbit on a single-wall set lets
 * visitors find the angle where the wall reads as a floating flat panel, which
 * is exactly what it is.
 */

/** Aspect the poses in data/room.ts were framed against. */
const REFERENCE_ASPECT = 1.6

/**
 * three.js `fov` is vertical, so a narrow viewport sees proportionally less
 * width at the same distance. Poses authored on a laptop would frame a phone
 * far too tightly, so back the camera off along its own view direction instead
 * of authoring a second set of poses for every hotspot.
 */
function distanceScale(aspect: number) {
  const scale = REFERENCE_ASPECT / Math.max(aspect, 0.3)
  return Math.min(Math.max(scale, 1), 3.8)
}

/** Frame-rate independent exponential smoothing. */
function damp(current: Vector3, goal: Vector3, lambda: number, delta: number) {
  current.lerp(goal, 1 - Math.exp(-lambda * delta))
}

export default function CameraRig() {
  const focus = useRoom((s) => s.focus)

  const desiredPosition = useRef(new Vector3())
  const desiredTarget = useRef(new Vector3(...IDLE_POSE.target))
  const smoothedTarget = useRef(new Vector3(...IDLE_POSE.target))
  const offset = useRef(new Vector3())

  useFrame((state, delta) => {
    const aspect = state.viewport.aspect
    // portrait viewports cannot fit the whole wall at any sane distance, so they
    // idle on the desk rather than trying to show everything at once
    const idle = aspect < 1 ? IDLE_POSE_NARROW : IDLE_POSE
    const pose = hotspotById(focus)?.camera ?? idle

    desiredTarget.current.set(...pose.target)

    // push out along the pose's own view direction, keeping its framing intent
    offset.current.set(...pose.position).sub(desiredTarget.current).multiplyScalar(distanceScale(aspect))
    desiredPosition.current.copy(desiredTarget.current).add(offset.current)

    // parallax leans the camera; it does not orbit it. Vertical is damped harder
    // because up/down movement reads as much stronger than sideways.
    desiredPosition.current.x += state.pointer.x * PARALLAX
    desiredPosition.current.y += state.pointer.y * PARALLAX * 0.45

    // clamp delta: a backgrounded tab resumes with a huge delta and would snap
    const dt = Math.min(delta, 0.1)
    damp(state.camera.position, desiredPosition.current, 3.2, dt)
    damp(smoothedTarget.current, desiredTarget.current, 3.2, dt)
    state.camera.lookAt(smoothedTarget.current)
  })

  return null
}
