import { create } from 'zustand'

type RoomState = {
  /** Scene has finished loading and faded in. */
  ready: boolean
  /** Hotspot the camera is currently looking at, or null for the idle pose. */
  focus: string | null
  /** Hotspot whose DOM overlay is open. Usually follows `focus`, one beat behind. */
  overlay: string | null
  quality: 'high' | 'low'
  setReady: (ready: boolean) => void
  setQuality: (quality: 'high' | 'low') => void
  focusHotspot: (id: string | null) => void
  closeOverlay: () => void
}

export const useRoom = create<RoomState>((set) => ({
  ready: false,
  focus: null,
  overlay: null,
  quality: 'high',
  setReady: (ready) => set({ ready }),
  setQuality: (quality) => set({ quality }),
  focusHotspot: (id) => set({ focus: id, overlay: id }),
  closeOverlay: () => set({ focus: null, overlay: null }),
}))
