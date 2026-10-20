/**
 * The desktop's state, pure and DOM-free so it can be tested on its own:
 *   - the window manager: which windows are open, where, and which is in front
 *   - the browser's history, so back and forward work like a browser's
 *
 * Window coordinates are design pixels inside the desktop area (below the menu
 * bar, above the dock).
 */

export type AppId = 'browser' | 'finder' | 'music'

export type Frame = { x: number; y: number; w: number; h: number }

export type WindowState = Frame & {
  id: AppId
  open: boolean
  minimized: boolean
  maximized: boolean
  /** Stacking order. The highest value is the front window. */
  z: number
}

export type Bounds = { w: number; h: number }

export type WindowAction =
  | { type: 'open'; id: AppId }
  | { type: 'close'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'toggleMaximize'; id: AppId }
  | { type: 'focus'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number; bounds: Bounds }

/** How much of a title bar must stay on screen, so a window can always be dragged back. */
export const GRIP = 90

export function initialWindows(frames: Record<AppId, Frame>, openAtStart: AppId[]): WindowState[] {
  return (Object.keys(frames) as AppId[]).map((id, index) => ({
    id,
    ...frames[id],
    open: openAtStart.includes(id),
    minimized: false,
    maximized: false,
    z: index + 1,
  }))
}

const topZ = (windows: WindowState[]) => Math.max(0, ...windows.map((w) => w.z))

function update(windows: WindowState[], id: AppId, change: (w: WindowState) => Partial<WindowState>) {
  return windows.map((w) => (w.id === id ? { ...w, ...change(w) } : w))
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function windowsReducer(windows: WindowState[], action: WindowAction): WindowState[] {
  switch (action.type) {
    case 'open':
    case 'focus': {
      const z = topZ(windows) + 1
      return update(windows, action.id, () => ({ open: true, minimized: false, z }))
    }
    case 'close':
      return update(windows, action.id, () => ({ open: false, minimized: false, maximized: false }))
    case 'minimize':
      return update(windows, action.id, () => ({ minimized: true }))
    case 'toggleMaximize': {
      const z = topZ(windows) + 1
      return update(windows, action.id, (w) => ({ maximized: !w.maximized, z }))
    }
    case 'move': {
      const { bounds } = action
      return update(windows, action.id, (w) => ({
        x: clamp(action.x, GRIP - w.w, bounds.w - GRIP),
        y: clamp(action.y, 0, bounds.h - 30),
      }))
    }
  }
}

/** The window that receives the menu bar's name: open, not minimized, in front. */
export function frontWindow(windows: WindowState[]): WindowState | undefined {
  return windows
    .filter((w) => w.open && !w.minimized)
    .reduce<WindowState | undefined>((front, w) => (!front || w.z > front.z ? w : front), undefined)
}

/* ——— browser history ——— */

export type Page = 'about' | 'experience' | 'projects'

export type History = { stack: Page[]; index: number }

export const startHistory = (page: Page): History => ({ stack: [page], index: 0 })

export const currentPage = (history: History): Page => history.stack[history.index]

/** Visiting a page drops anything forward of where you are, like a browser does. */
export function visit(history: History, page: Page): History {
  if (currentPage(history) === page) return history
  const stack = [...history.stack.slice(0, history.index + 1), page]
  return { stack, index: stack.length - 1 }
}

export const canGoBack = (history: History) => history.index > 0
export const canGoForward = (history: History) => history.index < history.stack.length - 1

export const back = (history: History): History =>
  canGoBack(history) ? { ...history, index: history.index - 1 } : history

export const forward = (history: History): History =>
  canGoForward(history) ? { ...history, index: history.index + 1 } : history
