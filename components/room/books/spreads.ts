/**
 * How a book's pages fall into open spreads, the way a printed book does: the
 * first page sits alone on the right with the inside of the cover on its left,
 * and from then on every spread is a left and a right page.
 *
 * `null` is a blank side: the inside cover, or the back of the last page.
 */
export type Spread<T> = [left: T | null, right: T | null]

export function toSpreads<T>(pages: T[]): Spread<T>[] {
  if (pages.length === 0) return []
  const spreads: Spread<T>[] = [[null, pages[0]]]
  for (let i = 1; i < pages.length; i += 2) {
    spreads.push([pages[i], pages[i + 1] ?? null])
  }
  return spreads
}

/** Printed page number of a side, counting the first page as 1. */
export function pageNumber(spread: number, side: 'left' | 'right'): number {
  return spread === 0 ? 1 : spread * 2 + (side === 'left' ? 0 : 1)
}
