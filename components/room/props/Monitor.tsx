'use client'

import { RoundedBox } from '@react-three/drei'

/**
 * Origin sits at the centre of the screen body, matching the greybox, so the
 * stand hangs below into local -Y and reaches the desk.
 *
 * Every edge is bevelled. Nothing real has a perfectly sharp 90° corner, so a
 * couple of millimetres of radius is most of what separates "modelled" from
 * "primitive" at this scale.
 */
export default function Monitor({ accent }: { accent: string }) {
  return (
    <group>
      {/* bezel */}
      <RoundedBox args={[1.2, 0.72, 0.06]} radius={0.014} smoothness={3} castShadow>
        <meshStandardMaterial color="#2b2b30" roughness={0.55} metalness={0.15} />
      </RoundedBox>

      {/* screen, inset slightly proud of the bezel */}
      <mesh position={[0, 0.02, 0.032]}>
        <planeGeometry args={[1.1, 0.6]} />
        <meshStandardMaterial color={accent} roughness={0.25} emissive={accent} emissiveIntensity={0.18} />
      </mesh>

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
