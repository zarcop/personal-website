'use client'

import { RoundedBox, useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'
import type { ColorRepresentation } from 'three'

/**
 * The framed Toluca photo. Reuses the image already in the repo for the written
 * site's Toluca panel, so this costs no new bytes.
 */
export default function MapFrame({ accent }: { accent: ColorRepresentation }) {
  const texture = useTexture('/images/story/toluca.jpg')
  // photographic textures are authored in sRGB; without this they render washed out
  texture.colorSpace = SRGBColorSpace

  return (
    <group>
      <RoundedBox args={[1.4, 0.95, 0.04]} radius={0.012} smoothness={3} castShadow>
        <meshStandardMaterial color="#6b5540" roughness={0.75} />
      </RoundedBox>

      {/* mount board */}
      <mesh position={[0, 0, 0.021]}>
        <planeGeometry args={[1.3, 0.85]} />
        <meshStandardMaterial color="#f2ece2" roughness={0.9} />
      </mesh>

      {/* the photograph itself, 3:2 inside the mount */}
      <mesh position={[0, 0, 0.023]}>
        <planeGeometry args={[1.14, 0.69]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>

      {/* hover/active tint rides on a thin inner border rather than the photo */}
      <mesh position={[0, 0, 0.019]}>
        <planeGeometry args={[1.34, 0.89]} />
        <meshStandardMaterial color={accent} roughness={0.8} />
      </mesh>
    </group>
  )
}
