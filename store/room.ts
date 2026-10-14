import { create } from 'zustand'

type RoomState = {
  /** Scene has finished loading and faded in. */
  ready: boolean
  /** Viewer asked for less movement: no camera tweening, no parallax. */
  reducedMotion: boolean
  /** Hotspot the camera is currently looking at, or null for the idle pose. */
  focus: string | null
  /** Hotspot whose DOM overlay is open. Usually follows `focus`, one beat behind. */
  overlay: string | null
  quality: 'high' | 'low'
  /** Something is playing on Spotify right now. Drives the monitor's screen. */
  playing: boolean
  setPlaying: (playing: boolean) => void
  setReady: (ready: boolean) => void
  setReducedMotion: (reduced: boolean) => void
  setQuality: (quality: 'high' | 'low') => void
  focusHotspot: (id: string | null) => void
  closeOverlay: () => void
}

export const useRoom = create<RoomState>((set) => ({
  ready: false,
  reducedMotion: false,
  // The room opens on the desk rather than the whole wall: the intro is the
  // thing a visitor should land on, not a survey of the furniture.
  focus: 'desk',
  overlay: 'desk',
  quality: 'high',
  playing: false,
  setPlaying: (playing) => set({ playing }),
  setReady: (ready) => set({ ready }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setQuality: (quality) => set({ quality }),
  focusHotspot: (id) => set({ focus: id, overlay: id }),
  closeOverlay: () => set({ focus: null, overlay: null }),
}))
