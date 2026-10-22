'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { useThree, type ThreeEvent } from '@react-three/fiber'
import { useRoom } from '@/store/room'

/**
 * Wraps any mesh to make it a hotspot: hover highlight, pointer cursor, and a
 * click that hands focus to the store. One component for every object in the
 * room, so the greybox and the real model behave identically.
 *
 * R3F listens on the canvas's PARENT, not the canvas, so a click on any DOM we
 * lay over the scene — a floating label, the bottom panel, the live screen on
 * the monitor — also casts a ray into the room and selects whatever happens to
 * be behind it. That is how closing the browser on the monitor ended up
 * selecting the photo hanging behind it. So: only act on events the browser
 * actually dispatched to the canvas.
 */
export default function Interactable({
  id,
  children,
}: {
  id: string
  children: (state: { hovered: boolean; active: boolean }) => ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  const focus = useRoom((s) => s.focus)
  const focusHotspot = useRoom((s) => s.focusHotspot)
  const canvas = useThree((s) => s.gl.domElement)
  const active = focus === id

  const over = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      // stop the ray carrying on to objects behind this one
      e.stopPropagation()
      if (e.nativeEvent.target !== canvas) return
      setHovered(true)
      document.body.style.cursor = 'pointer'
    },
    [canvas],
  )

  // deliberately not gated on the canvas: moving the pointer off an object and
  // onto an overlay should still clear the highlight
  const out = useCallback(() => {
    setHovered(false)
    document.body.style.cursor = ''
  }, [])

  const click = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      if (e.nativeEvent.target !== canvas) return
      focusHotspot(id)
    },
    [canvas, focusHotspot, id],
  )

  return (
    <group onPointerOver={over} onPointerOut={out} onClick={click}>
      {children({ hovered, active })}
    </group>
  )
}
