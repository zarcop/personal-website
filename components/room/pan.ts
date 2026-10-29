/**
 * How far a portrait screen can slide along the wall from its idle pose, in
 * metres. Portrait idles on the desk because the whole wall never fits, so
 * swiping is how the bookcase at one end and the window at the other come
 * into view. Measured from IDLE_POSE_NARROW's x (0.45) to the bookcase
 * (-2.45) and the window (3.62).
 */
export const PAN_MIN = -2.9
export const PAN_MAX = 3.17

/**
 * The pan after dragging `dx` screen pixels. The room follows the finger, so
 * dragging right moves the camera left. `metresPerPx` is how much wall one
 * pixel covers at the camera's current distance.
 */
export function panBy(pan: number, dx: number, metresPerPx: number) {
  return Math.min(Math.max(pan - dx * metresPerPx, PAN_MIN), PAN_MAX)
}
