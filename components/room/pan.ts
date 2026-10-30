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

/** How quickly a flicked pan slows down, per second. */
const GLIDE_FRICTION = 4
/** Below this speed, in metres per second, a glide counts as stopped. */
const GLIDE_STOP = 0.02

/**
 * One step of the glide after a flick: the room keeps sliding at `velocity`
 * (metres per second) and eases to a stop, so one swipe can carry the camera
 * from the desk to either end instead of needing several. Stops dead at the
 * ends rather than bouncing.
 */
export function glide(pan: number, velocity: number, dt: number) {
  const decay = Math.exp(-GLIDE_FRICTION * dt)
  // exact integral of the decaying velocity, so the distance does not depend on frame rate
  const next = pan + (velocity * (1 - decay)) / GLIDE_FRICTION
  const clamped = Math.min(Math.max(next, PAN_MIN), PAN_MAX)
  const speed = velocity * decay
  const stopped = clamped !== next || Math.abs(speed) < GLIDE_STOP
  return { pan: clamped, velocity: stopped ? 0 : speed }
}
