import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PAN_MAX, PAN_MIN, glide, panBy } from './pan.ts'

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

test('a glide with no velocity stays put', () => {
  assert.deepEqual(glide(1, 0, 1 / 60), { pan: 1, velocity: 0 })
})

test('a glide carries on in the direction of the flick and slows down', () => {
  const step = glide(0, 2, 1 / 60)
  assert.ok(step.pan > 0)
  assert.ok(step.velocity > 0 && step.velocity < 2)
})

test('a glide eventually stops on its own', () => {
  let state = { pan: 0, velocity: 2 }
  for (let i = 0; i < 600 && state.velocity !== 0; i++) state = glide(state.pan, state.velocity, 1 / 60)
  assert.equal(state.velocity, 0)
  assert.ok(state.pan > 0 && state.pan < PAN_MAX)
})

test('a glide covers the same distance whatever the frame rate', () => {
  const run = (dt) => {
    let state = { pan: 0, velocity: 1 }
    for (let t = 0; t < 0.5; t += dt) state = glide(state.pan, state.velocity, dt)
    return state.pan
  }
  assert.ok(Math.abs(run(1 / 30) - run(1 / 120)) < 0.01)
})

test('a glide stops dead at the window end', () => {
  assert.deepEqual(glide(PAN_MAX - 0.01, 5, 0.1), { pan: PAN_MAX, velocity: 0 })
})

test('a glide stops dead at the bookcase end', () => {
  assert.deepEqual(glide(PAN_MIN + 0.01, -5, 0.1), { pan: PAN_MIN, velocity: 0 })
})
