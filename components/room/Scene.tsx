'use client'

import { useEffect } from 'react'
import CameraRig from '@/components/room/CameraRig'
import GreyboxRoom from '@/components/room/GreyboxRoom'
import { useRoom } from '@/store/room'

/** Everything inside the <Canvas>. Lighting here is placeholder — M2 bakes it. */
export default function Scene({ quality }: { quality: 'high' | 'low' }) {
  const setReady = useRoom((s) => s.setReady)

  useEffect(() => {
    setReady(true)
    return () => setReady(false)
  }, [setReady])

  return (
    <>
      <color attach="background" args={['#faf8f5']} />
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.5}
        castShadow={quality === 'high'}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.4} />
      <GreyboxRoom />
      <CameraRig />
    </>
  )
}
