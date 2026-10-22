'use client'

import { Suspense, useLayoutEffect, type ReactNode } from 'react'
import { useGLTF } from '@react-three/drei'
import type { Mesh } from 'three'
import { propModels } from '@/data/props.generated'

function GltfProp({ url }: { url: string }) {
  // meshopt on, draco off: the asset pipeline uses meshopt, and the draco
  // decoder is ~345 KB against meshopt's ~29 KB
  const { scene } = useGLTF(url, false, true)

  // glTF does not carry shadow flags, so an imported prop arrives casting
  // nothing and a modelled object would sit in the room with no contact shadow
  // under it — the single clearest sign that something is pasted on rather than
  // standing there. Safe to mutate: useGLTF caches one scene per URL.
  useLayoutEffect(() => {
    scene.traverse((node) => {
      if ((node as Mesh).isMesh) {
        node.castShadow = true
        node.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} />
}

/**
 * Renders the modelled version of a prop if one exists, and the code-authored
 * fallback otherwise.
 *
 * `data/props.generated.ts` is written from the contents of public/models/, so
 * dropping `monitor.glb` in there swaps the monitor with no code change. That
 * lets Elias replace props one at a time as he models them, while the room
 * stays presentable throughout.
 */
export default function Prop({ name, children }: { name: string; children: ReactNode }) {
  const url = propModels[name]
  if (!url) return <>{children}</>

  return (
    <Suspense fallback={<>{children}</>}>
      <GltfProp url={url} />
    </Suspense>
  )
}
