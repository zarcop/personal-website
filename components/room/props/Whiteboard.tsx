'use client'

import type { ColorRepresentation } from 'three'

import { RoundedBox } from '@react-three/drei'
import { experience } from '@/data/experience'

/**
 * Wall-mounted board. Faces +Z.
 *
 * What is drawn on it is the same timeline the live surface renders when the
 * board is focused (components/room/surfaces/BoardContent): one rail, one dot
 * and one logo tile per role, in the same order. From across the room you
 * should already be able to tell it is a timeline — zooming in only makes it
 * legible, it does not reveal a different object.
 */

const BODY_W = 1.4
const BODY_H = 1.1
export const SURFACE_W = 1.3
export const SURFACE_H = 1.0
/** Where the live DOM surface mounts, relative to the board's origin. */
export const SURFACE_Z = 0.026

const Z = 0.0265

/** Matches the row rhythm in BoardContent, so the swap lands in the same place. */
const ROW_TOP = 0.28
const ROW_GAP = 0.168
const RAIL_X = -0.52

export default function Whiteboard({ accent }: { accent: ColorRepresentation }) {
  const rows = experience.slice(0, 5)

  return (
    <group>
      <RoundedBox args={[BODY_W, BODY_H, 0.045]} radius={0.012} smoothness={3} castShadow>
        <meshStandardMaterial color={accent} roughness={0.6} metalness={0.25} />
      </RoundedBox>

      {/* writing surface */}
      <mesh position={[0, 0, 0.024]}>
        <planeGeometry args={[SURFACE_W, SURFACE_H]} />
        <meshStandardMaterial color="#f7f5f1" roughness={0.35} />
      </mesh>

      {/* heading and its rule */}
      <mesh position={[-0.46, 0.42, Z]}>
        <planeGeometry args={[0.3, 0.028]} />
        <meshBasicMaterial color="#23211e" />
      </mesh>
      <mesh position={[0.42, 0.42, Z]}>
        <planeGeometry args={[0.24, 0.012]} />
        <meshBasicMaterial color="#9b958c" />
      </mesh>
      <mesh position={[0, 0.385, Z]}>
        <planeGeometry args={[1.18, 0.005]} />
        <meshBasicMaterial color="#3a3733" />
      </mesh>

      {/* the rail */}
      <mesh position={[RAIL_X, -0.08, Z]}>
        <planeGeometry args={[0.005, 0.74]} />
        <meshBasicMaterial color="#c6c0b6" />
      </mesh>

      {rows.map((role, i) => {
        const y = ROW_TOP - i * ROW_GAP
        const tile = role.mark?.bg ?? '#3a4a55'

        return (
          <group key={role.slug} position={[0, y, 0]}>
            {/* dot on the rail */}
            <mesh position={[RAIL_X, 0.02, Z]}>
              <circleGeometry args={[0.014, 16]} />
              <meshBasicMaterial color="#2b4f63" />
            </mesh>

            {/* logo tile */}
            <mesh position={[-0.44, 0.0, Z]}>
              <planeGeometry args={[0.072, 0.072]} />
              <meshBasicMaterial color={tile} />
            </mesh>

            {/* org, role, and the one line under them */}
            <mesh position={[-0.265, 0.028, Z]}>
              <planeGeometry args={[0.2, 0.017]} />
              <meshBasicMaterial color="#2a2724" />
            </mesh>
            <mesh position={[-0.295, 0.0, Z]}>
              <planeGeometry args={[0.14, 0.01]} />
              <meshBasicMaterial color="#a8552a" />
            </mesh>
            <mesh position={[-0.165, -0.028, Z]}>
              <planeGeometry args={[0.4, 0.01]} />
              <meshBasicMaterial color="#7d7770" />
            </mesh>

            {/* the date column, right-aligned like the real thing */}
            <mesh position={[0.53, 0.028, Z]}>
              <planeGeometry args={[0.13, 0.01]} />
              <meshBasicMaterial color="#9b958c" />
            </mesh>
          </group>
        )
      })}

      {/* marker tray */}
      <mesh position={[0, -0.5675, 0.04]} castShadow>
        <boxGeometry args={[0.5, 0.025, 0.06]} />
        <meshStandardMaterial color="#9b9690" roughness={0.7} />
      </mesh>
    </group>
  )
}
