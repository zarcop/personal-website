'use client'

import { Html } from '@react-three/drei'
import type { ReactNode } from 'react'
import type { Vec3 } from '@/lib/types'

/**
 * Mounts real DOM onto a surface inside the room, so a monitor shows a working
 * screen rather than a picture of one.
 *
 * This uses `<Html transform>`, which earlier in the build I argued against for
 * the bottom panels — and that still holds for those. The objection was that
 * transformed DOM goes soft at an angle and costs a lot per frame. Neither
 * applies here: these only mount while the camera is flying flat-on to the
 * surface, and only one is ever mounted at a time.
 *
 * `pxWidth` is the design width of the DOM, scaled so it lands exactly on
 * `width` world units.
 *
 * CSS_UNITS is drei's transform-mode convention: in that mode the DOM is laid
 * out in its own pixel space and mapped through a CSS matrix, so one world unit
 * is not one pixel. This is measured against this scene, not derived: render a
 * surface, compare its getBoundingClientRect width against the width the camera
 * distance and fov say it should be, and divide. If it ever drifts off its
 * object, re-measure the same way rather than nudging it by eye.
 */
const CSS_UNITS = 40

export default function SurfaceUI({
  id,
  position,
  rotation,
  width,
  pxWidth,
  pxHeight,
  children,
}: {
  /** Which object this is mounted on. Also the handle the render checks use. */
  id: string
  position: Vec3
  rotation?: Vec3
  /** Width of the surface in world units. */
  width: number
  pxWidth: number
  pxHeight: number
  children: ReactNode
}) {
  return (
    <Html
      transform
      position={position}
      rotation={rotation}
      scale={(width / pxWidth) * CSS_UNITS}
      // the surface sits behind this; nothing needs to occlude it
      occlude={false}
      zIndexRange={[12, 0]}
      style={{ width: pxWidth, height: pxHeight }}
    >
      <div
        data-surface={id}
        style={{ width: pxWidth, height: pxHeight }}
        className="overflow-hidden font-sans"
      >
        {children}
      </div>
    </Html>
  )
}
