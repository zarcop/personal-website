'use client'

import type { ColorRepresentation } from 'three'

import { RoundedBox } from '@react-three/drei'

/** Wall-mounted board. Faces +Z. */
export default function Whiteboard({ accent }: { accent: ColorRepresentation }) {
  return (
    <group>
      <RoundedBox args={[1.3, 0.92, 0.045]} radius={0.01} smoothness={3} castShadow>
        <meshStandardMaterial color={accent} roughness={0.6} metalness={0.25} />
      </RoundedBox>

      {/* writing surface */}
      <mesh position={[0, 0, 0.024]}>
        <planeGeometry args={[1.2, 0.82]} />
        <meshStandardMaterial color="#f7f5f1" roughness={0.35} />
      </mesh>

      {/* a few marker strokes, so it does not read as a blank panel */}
      {[
        { x: -0.42, y: 0.3, w: 0.5, c: '#2b3a4a' },
        { x: -0.3, y: 0.22, w: 0.74, c: '#8a8580' },
        { x: -0.36, y: 0.14, w: 0.62, c: '#8a8580' },
        { x: 0.3, y: -0.06, w: 0.46, c: '#8a4b32' },
        { x: 0.24, y: -0.14, w: 0.58, c: '#8a8580' },
        { x: -0.4, y: -0.3, w: 0.42, c: '#3f5b52' },
      ].map((stroke, i) => (
        <mesh key={i} position={[stroke.x, stroke.y, 0.026]}>
          <planeGeometry args={[stroke.w, 0.022]} />
          <meshStandardMaterial color={stroke.c} roughness={0.9} />
        </mesh>
      ))}

      {/* marker tray */}
      <mesh position={[0, -0.52, 0.04]} castShadow>
        <boxGeometry args={[0.5, 0.025, 0.06]} />
        <meshStandardMaterial color="#9b9690" roughness={0.7} />
      </mesh>
    </group>
  )
}
