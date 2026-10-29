'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils, PerspectiveCamera, Vector3 } from 'three'
import { panBy } from '@/components/room/pan'
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

/**
 * How much further back than its pose the camera opens, along the same line.
 * The first thing the room does is a short settle onto the desk rather than a
 * flight across it, which held the intro back by about a second.
 */
const INTRO_PULLBACK = 0.25

/** Frame-rate independent exponential smoothing. */
function damp(current: Vector3, goal: Vector3, lambda: number, delta: number) {
  current.lerp(goal, 1 - Math.exp(-lambda * delta))
}

export default function CameraRig() {
  const focus = useRoom((s) => s.focus)
  const reducedMotion = useRoom((s) => s.reducedMotion)

  const desiredPosition = useRef(new Vector3())
  const desiredTarget = useRef(new Vector3(...IDLE_POSE.target))
  const smoothedTarget = useRef(new Vector3(...IDLE_POSE.target))
  const offset = useRef(new Vector3())
  const placed = useRef(false)
  // metres along the wall; only portrait's idle pose uses it
  const pan = useRef(0)
  const get = useThree((s) => s.get)

  // Swipe to look along the wall on portrait. Listens on the canvas itself, so
  // a drag that starts on a label or the bottom panel never moves the room.
  useEffect(() => {
    const canvas = get().gl.domElement
    let lastX: number | null = null

    const down = (e: PointerEvent) => {
      const { viewport } = get()
      if (viewport.aspect < 1 && !useRoom.getState().focus) lastX = e.clientX
    }
    const move = (e: PointerEvent) => {
      if (lastX === null) return
      const { camera, size } = get()
      const distance = camera.position.distanceTo(smoothedTarget.current)
      const fov = MathUtils.degToRad((camera as PerspectiveCamera).fov)
      const metresPerPx = (2 * distance * Math.tan(fov / 2)) / size.height
      pan.current = panBy(pan.current, e.clientX - lastX, metresPerPx)
      lastX = e.clientX
    }
    const up = () => {
      lastX = null
    }

    canvas.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      canvas.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [get])

  useFrame((state, delta) => {
    const aspect = state.viewport.aspect
    // portrait viewports cannot fit the whole wall at any sane distance, so they
    // idle on the desk rather than trying to show everything at once
    const idle = aspect < 1 ? IDLE_POSE_NARROW : IDLE_POSE
    const hotspot = hotspotById(focus)
    const pose = hotspot?.camera ?? idle

    desiredTarget.current.set(...pose.target)

    // push out along the pose's own view direction, keeping its framing intent.
    // Surface poses are capped on portrait: their content moves to the bottom
    // panel there, so letting the object crop at the sides beats backing off far
    // enough to fit all of it and leaving a postage stamp in the middle.
    let scale = distanceScale(aspect)
    if (hotspot?.surface && aspect < 1) scale = Math.min(scale, 2.4)
    offset.current.set(...pose.position).sub(desiredTarget.current).multiplyScalar(scale)
    // slide the whole pose sideways, so the view stays square to the wall
    if (!hotspot && aspect < 1) desiredTarget.current.x += pan.current
    desiredPosition.current.copy(desiredTarget.current).add(offset.current)

    if (!placed.current) {
      placed.current = true
      smoothedTarget.current.copy(desiredTarget.current)
      state.camera.position.copy(desiredPosition.current).addScaledVector(offset.current, INTRO_PULLBACK)
    }

    if (reducedMotion) {
      // cut straight to the pose: still a 3D room, just one that holds still
      state.camera.position.copy(desiredPosition.current)
      smoothedTarget.current.copy(desiredTarget.current)
      state.camera.lookAt(smoothedTarget.current)
      return
    }

    // Parallax leans the camera; it does not orbit it. Vertical is damped harder
    // because up/down movement reads as much stronger than sideways.
    //
    // Suppressed on surface hotspots: those mount real DOM onto the object, and
    // any lean yaws the surface off flat-on, which skews the text and pushes the
    // object out of frame.
    if (!hotspot?.surface) {
      desiredPosition.current.x += state.pointer.x * PARALLAX
      desiredPosition.current.y += state.pointer.y * PARALLAX * 0.45
    }

    // clamp delta: a backgrounded tab resumes with a huge delta and would snap
    const dt = Math.min(delta, 0.1)
    damp(state.camera.position, desiredPosition.current, 3.2, dt)
    damp(smoothedTarget.current, desiredTarget.current, 3.2, dt)
    state.camera.lookAt(smoothedTarget.current)
  })

  return null
}
