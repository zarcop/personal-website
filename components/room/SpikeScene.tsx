'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

/**
 * M0 placeholder. Exists only to prove the renderer mounts, animates and
 * responds to input inside this app. Deleted in M1 when the greybox room
 * replaces it.
 */
export default function SpikeScene() {
  const mesh = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.4
    mesh.current.rotation.y += delta * 0.6
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} />
      <mesh ref={mesh}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshStandardMaterial color="#c2703c" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#e8e2d9" />
      </mesh>
    </>
  )
}
