import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  GRIP,
  back,
  canGoBack,
  canGoForward,
  currentPage,
  forward,
  frontWindow,
  initialWindows,
  startHistory,
  visit,
  windowsReducer,
} from './state.ts'

const frames = {
  browser: { x: 20, y: 10, w: 800, h: 400 },
  finder: { x: 100, y: 60, w: 400, h: 260 },
  music: { x: 500, y: 40, w: 340, h: 170 },
}
const bounds = { w: 900, h: 438 }
const start = () => initialWindows(frames, ['browser'])
const byId = (windows, id) => windows.find((w) => w.id === id)

test('only the windows named at start are open', () => {
  const windows = start()
  assert.equal(byId(windows, 'browser').open, true)
  assert.equal(byId(windows, 'finder').open, false)
  assert.equal(frontWindow(windows).id, 'browser')
})

test('opening a window brings it to the front', () => {
  const windows = windowsReducer(start(), { type: 'open', id: 'finder' })
  assert.equal(frontWindow(windows).id, 'finder')
})

test('focusing a back window raises it above the others', () => {
  let windows = windowsReducer(start(), { type: 'open', id: 'finder' })
  windows = windowsReducer(windows, { type: 'focus', id: 'browser' })
  assert.equal(frontWindow(windows).id, 'browser')
})

test('closing the only window leaves an empty desktop', () => {
  const windows = windowsReducer(start(), { type: 'close', id: 'browser' })
  assert.equal(frontWindow(windows), undefined)
})

test('closing un-maximizes, so the window reopens at its own size', () => {
  let windows = windowsReducer(start(), { type: 'toggleMaximize', id: 'browser' })
  assert.equal(byId(windows, 'browser').maximized, true)
  windows = windowsReducer(windows, { type: 'close', id: 'browser' })
  windows = windowsReducer(windows, { type: 'open', id: 'browser' })
  assert.equal(byId(windows, 'browser').maximized, false)
})

test('a minimized window is not the front one, and reopening restores it', () => {
  let windows = windowsReducer(start(), { type: 'minimize', id: 'browser' })
  assert.equal(frontWindow(windows), undefined)
  windows = windowsReducer(windows, { type: 'open', id: 'browser' })
  assert.equal(byId(windows, 'browser').minimized, false)
  assert.equal(frontWindow(windows).id, 'browser')
})

test('moving keeps enough of the title bar on screen to drag it back', () => {
  const far = windowsReducer(start(), { type: 'move', id: 'browser', x: 5000, y: 5000, bounds })
  assert.equal(byId(far, 'browser').x, bounds.w - GRIP)
  assert.equal(byId(far, 'browser').y, bounds.h - 30)

  const negative = windowsReducer(start(), { type: 'move', id: 'browser', x: -5000, y: -5000, bounds })
  assert.equal(byId(negative, 'browser').x, GRIP - frames.browser.w)
  assert.equal(byId(negative, 'browser').y, 0)
})

test('a move inside the bounds lands exactly where asked', () => {
  const windows = windowsReducer(start(), { type: 'move', id: 'browser', x: 40, y: 25, bounds })
  assert.deepEqual([byId(windows, 'browser').x, byId(windows, 'browser').y], [40, 25])
})

test('back and forward walk the pages visited', () => {
  let h = startHistory('about')
  assert.equal(canGoBack(h), false)
  h = visit(h, 'experience')
  h = visit(h, 'projects')
  h = back(h)
  assert.equal(currentPage(h), 'experience')
  assert.equal(canGoForward(h), true)
  h = forward(h)
  assert.equal(currentPage(h), 'projects')
  assert.equal(canGoForward(h), false)
})

test('visiting after going back drops the forward pages', () => {
  let h = visit(visit(startHistory('about'), 'experience'), 'projects')
  h = visit(back(back(h)), 'projects')
  assert.deepEqual(h.stack, ['about', 'projects'])
  assert.equal(canGoForward(h), false)
})

test('visiting the current page adds no entry', () => {
  const h = visit(startHistory('about'), 'about')
  assert.deepEqual(h.stack, ['about'])
})

test('back at the first page and forward at the last stay put', () => {
  const h = startHistory('about')
  assert.equal(back(h), h)
  assert.equal(forward(h), h)
})
