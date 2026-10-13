'use client'

import { useCallback, useState, type ReactNode } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { useRoom } from '@/store/room'

/**
 * Wraps any mesh to make it a hotspot: hover highlight, pointer cursor, and a
 * click that hands focus to the store. One component for every object in the
 * room, so the greybox and the real model behave identically.
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
  const active = focus === id

  const over = useCallback((e: ThreeEvent<PointerEvent>) => {
    // stop the ray carrying on to objects behind this one
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }, [])

  const out = useCallback(() => {
    setHovered(false)
    document.body.style.cursor = ''
  }, [])

  const click = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      focusHotspot(id)
    },
    [focusHotspot, id],
  )

  return (
    <group onPointerOver={over} onPointerOut={out} onClick={click}>
      {children({ hovered, active })}
    </group>
  )
}
