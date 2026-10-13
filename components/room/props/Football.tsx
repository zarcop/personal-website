'use client'

/**
 * Faceted rather than smooth. A low-poly sphere with flat shading reads as a
 * deliberate stylistic choice; a smooth one just reads as an untextured sphere.
 */
export default function Football({ accent }: { accent: string }) {
  return (
    <group>
      <mesh castShadow>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshStandardMaterial color={accent} roughness={0.65} flatShading />
      </mesh>
    </group>
  )
}
