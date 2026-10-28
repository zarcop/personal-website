'use client'

import { Suspense } from 'react'
import { useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'
import type { ColorRepresentation } from 'three'

/**
 * A sheet of US Letter lying on the desk, turned slightly off-square so it reads
 * as something someone put down rather than something that was placed. Page 1
 * of the real résumé is printed on it.
 */

const PAPER_W = 0.216
const PAPER_H = 0.279

const FLAT: [number, number, number] = [-Math.PI / 2, 0, 0]

/** The printed page. Rendered from public/resume.pdf; re-render it when that changes. */
function Page() {
  const texture = useTexture('/images/resume/page-1-texture.jpg')
  texture.colorSpace = SRGBColorSpace

  return (
    <mesh position={[0, 0.0025, 0]} rotation={FLAT}>
      <planeGeometry args={[PAPER_W, PAPER_H]} />
      <meshStandardMaterial map={texture} roughness={0.95} />
    </mesh>
  )
}

/** A suggestion of text, shown until the page image arrives. */
function Lines() {
  const lines = [0.09, 0.055, 0.075, 0.04, 0.085, 0.05]

  return (
    <>
      {lines.map((width, i) => (
        <mesh key={i} position={[-0.075 + width / 2, 0.0025, -0.1 + i * 0.038]} rotation={FLAT}>
          <planeGeometry args={[width * 1.6, 0.008]} />
          <meshStandardMaterial color="#9a958c" roughness={1} />
        </mesh>
      ))}
      {/* name line, heavier */}
      <mesh position={[-0.055, 0.0025, -0.115]} rotation={FLAT}>
        <planeGeometry args={[0.08, 0.016]} />
        <meshStandardMaterial color="#4a453e" roughness={1} />
      </mesh>
    </>
  )
}

export default function Resume({ accent }: { accent: ColorRepresentation }) {
  return (
    <group rotation={[0, 0.14, 0]}>
      {/* the sheet's edge carries the hover tint; the page sits on top of it */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[PAPER_W, 0.004, PAPER_H]} />
        <meshStandardMaterial color={accent} roughness={0.95} />
      </mesh>

      {/* its own boundary, so the room never waits on this image to appear */}
      <Suspense fallback={<Lines />}>
        <Page />
      </Suspense>
    </group>
  )
}
