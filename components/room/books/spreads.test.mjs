import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pageNumber, toSpreads } from './spreads.ts'

test('a book with no pages has no spreads', () => {
  assert.deepEqual(toSpreads([]), [])
})

test('the first page opens alone on the right', () => {
  assert.deepEqual(toSpreads(['title']), [[null, 'title']])
})

test('after the first page, pages pair up left and right', () => {
  assert.deepEqual(toSpreads(['t', 'a', 'b', 'c', 'd']), [
    [null, 't'],
    ['a', 'b'],
    ['c', 'd'],
  ])
})

test('an odd page at the end leaves the right side blank', () => {
  assert.deepEqual(toSpreads(['t', 'a', 'b', 'c']), [
    [null, 't'],
    ['a', 'b'],
    ['c', null],
  ])
})

test('page numbers follow the printed order', () => {
  assert.equal(pageNumber(0, 'right'), 1)
  assert.equal(pageNumber(1, 'left'), 2)
  assert.equal(pageNumber(1, 'right'), 3)
  assert.equal(pageNumber(2, 'left'), 4)
})
