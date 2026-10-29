import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PAN_MAX, PAN_MIN, panBy } from './pan.ts'

test('no drag leaves the pan where it was', () => {
  assert.equal(panBy(1, 0, 0.01), 1)
})

test('dragging right moves the camera left, so the room follows the finger', () => {
  assert.equal(panBy(0, 100, 0.01), -1)
  assert.equal(panBy(0, -100, 0.01), 1)
})

test('the pan stops at the bookcase end', () => {
  assert.equal(panBy(0, 10_000, 0.01), PAN_MIN)
})

test('the pan stops at the window end', () => {
  assert.equal(panBy(0, -10_000, 0.01), PAN_MAX)
})

test('a pan already at an end stays there when dragged further', () => {
  assert.equal(panBy(PAN_MAX, -50, 0.01), PAN_MAX)
})
