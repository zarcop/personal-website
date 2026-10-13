'use client'

import Interactable from '@/components/room/Interactable'

/**
 * M1 stand-in for the real model. Every interactive object is a primitive, and
 * the mesh names match `data/room.ts` so M2 can swap in the glTF without
 * touching the hotspot registry or the camera poses.
 *
 * Deliberately ugly. If clicking these boxes already feels good, the art is an
 * upgrade rather than a rescue.
 */

const SHELL = '#d9d3c9'
const PROP = '#b9b1a4'

/** Hover/active tint, shared by every hotspot so they read as one system. */
function propColor(hovered: boolean, active: boolean) {
  if (active) return '#c2703c'
  if (hovered) return '#d08c5f'
  return PROP
}

export default function GreyboxRoom() {
  return (
    <group>
      {/* ——— shell ——— */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={SHELL} />
      </mesh>
      <mesh position={[0, 1.5, -4]} receiveShadow>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={SHELL} />
      </mesh>
      <mesh position={[-4, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color={SHELL} />
      </mesh>

      {/* ——— desk + monitor ——— */}
      <mesh position={[-1.1, 0.74, -3.5]} castShadow>
        <boxGeometry args={[2.2, 0.08, 0.9]} />
        <meshStandardMaterial color={PROP} />
      </mesh>
      <Interactable id="desk">
        {({ hovered, active }) => (
          <mesh name="monitor" position={[-1.1, 1.3, -3.6]} castShadow>
            <boxGeometry args={[1.2, 0.72, 0.06]} />
            <meshStandardMaterial color={propColor(hovered, active)} />
          </mesh>
        )}
      </Interactable>

      {/* ——— map on the back wall ——— */}
      <Interactable id="map">
        {({ hovered, active }) => (
          <mesh name="map" position={[2.1, 1.9, -3.95]} castShadow>
            <boxGeometry args={[1.4, 0.95, 0.04]} />
            <meshStandardMaterial color={propColor(hovered, active)} />
          </mesh>
        )}
      </Interactable>

      {/* ——— bookshelf against the left wall ——— */}
      <Interactable id="bookshelf">
        {({ hovered, active }) => (
          <mesh name="bookshelf" position={[-3.7, 1.0, 0.2]} castShadow>
            <boxGeometry args={[0.45, 2.0, 1.6]} />
            <meshStandardMaterial color={propColor(hovered, active)} />
          </mesh>
        )}
      </Interactable>

      {/* ——— ball on the floor ——— */}
      <Interactable id="football">
        {({ hovered, active }) => (
          <mesh name="football" position={[2.6, 0.26, 1.2]} castShadow>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial color={propColor(hovered, active)} />
          </mesh>
        )}
      </Interactable>
    </group>
  )
}
