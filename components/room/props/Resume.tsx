'use client'

/**
 * A sheet of A4 lying on the desk, turned slightly off-square so it reads as
 * something someone put down rather than something that was placed.
 */
export default function Resume({ accent }: { accent: string }) {
  const lines = [0.09, 0.055, 0.075, 0.04, 0.085, 0.05]

  return (
    <group rotation={[0, 0.14, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.21, 0.004, 0.297]} />
        <meshStandardMaterial color={accent} roughness={0.95} />
      </mesh>

      {/* a suggestion of text — enough to read as a CV at this distance */}
      {lines.map((width, i) => (
        <mesh key={i} position={[-0.075 + width / 2, 0.0025, -0.1 + i * 0.038]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width * 1.6, 0.008]} />
          <meshStandardMaterial color="#9a958c" roughness={1} />
        </mesh>
      ))}
      {/* name line, heavier */}
      <mesh position={[-0.055, 0.0025, -0.125]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 0.016]} />
        <meshStandardMaterial color="#4a453e" roughness={1} />
      </mesh>
    </group>
  )
}
