'use client'

import type { ColorRepresentation } from 'three'

import { RoundedBox } from '@react-three/drei'

/**
 * Origin sits at the centre of the screen body, matching the greybox, so the
 * stand hangs below into local -Y and reaches the desk.
 *
 * Every edge is bevelled. Nothing real has a perfectly sharp 90° corner, so a
 * couple of millimetres of radius is most of what separates "modelled" from
 * "primitive" at this scale.
 */
const SCREEN = '#10323f'

export default function Monitor({ accent, playing }: { accent: ColorRepresentation; playing?: boolean }) {
  // a mock desktop built from flat planes. The screen is the first thing anyone
  // sees, and an unlit black rectangle reads as a monitor that is switched off.
  const lines: { x: number; y: number; w: number; h: number; c: string }[] = [
    { x: -0.3, y: 0.2, w: 0.38, h: 0.022, c: '#6f9fb5' },
    { x: -0.36, y: 0.15, w: 0.26, h: 0.014, c: '#44697e' },
    { x: -0.28, y: 0.105, w: 0.42, h: 0.014, c: '#44697e' },
    { x: -0.33, y: 0.06, w: 0.32, h: 0.014, c: '#44697e' },
    { x: 0.2, y: -0.02, w: 0.3, h: 0.014, c: '#3c5e71' },
    { x: 0.14, y: -0.065, w: 0.42, h: 0.014, c: '#3c5e71' },
  ]

  return (
    <group>
      {/* bezel — this is what carries the hover/active tint */}
      <RoundedBox args={[1.2, 0.72, 0.06]} radius={0.014} smoothness={3} castShadow>
        <meshStandardMaterial color={accent} roughness={0.55} metalness={0.15} />
      </RoundedBox>

      {/* screen — emissive so it stays lit when the room goes dark at night */}
      <mesh position={[0, 0.02, 0.032]}>
        <planeGeometry args={[1.1, 0.6]} />
        <meshStandardMaterial
          color={SCREEN}
          roughness={0.25}
          emissive={SCREEN}
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* title bar */}
      <mesh position={[0, 0.278, 0.0335]}>
        <planeGeometry args={[1.06, 0.045]} />
        <meshBasicMaterial color="#12323f" />
      </mesh>
      {[-0.49, -0.46, -0.43].map((x) => (
        <mesh key={x} position={[x, 0.278, 0.034]}>
          <circleGeometry args={[0.008, 10]} />
          <meshBasicMaterial color="#5c8599" />
        </mesh>
      ))}

      {/* text */}
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, line.y, 0.0335]}>
          <planeGeometry args={[line.w, line.h]} />
          <meshBasicMaterial color={line.c} />
        </mesh>
      ))}

      {/* now-playing strip, lit only when something is actually playing */}
      <mesh position={[0, -0.2, 0.0335]}>
        <planeGeometry args={[1.0, 0.09]} />
        <meshBasicMaterial color={playing ? '#17414f' : '#123540'} />
      </mesh>
      <mesh position={[-0.44, -0.2, 0.034]}>
        <circleGeometry args={[0.022, 14]} />
        <meshBasicMaterial color={playing ? '#c2703c' : '#2d5666'} />
      </mesh>
      {[0.3, 0.46].map((w, i) => (
        <mesh key={w} position={[-0.38 + w / 2, -0.182 + i * -0.036, 0.034]}>
          <planeGeometry args={[w, 0.012]} />
          <meshBasicMaterial color={playing ? '#8fc0d2' : '#3c6274'} />
        </mesh>
      ))}

      {/* neck */}
      <RoundedBox args={[0.1, 0.16, 0.07]} radius={0.015} smoothness={3} position={[0, -0.44, 0]} castShadow>
        <meshStandardMaterial color="#35353b" roughness={0.6} metalness={0.2} />
      </RoundedBox>

      {/* base */}
      <RoundedBox args={[0.42, 0.025, 0.22]} radius={0.01} smoothness={3} position={[0, -0.525, 0]} castShadow>
        <meshStandardMaterial color="#35353b" roughness={0.6} metalness={0.2} />
      </RoundedBox>
    </group>
  )
}
