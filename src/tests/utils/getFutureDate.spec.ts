import { expect, test } from 'vitest'
import { getFutureDate } from './getFutureDate'

test('increases date with one year', () => {
  const year = new Date().getFullYear()

  expect(getFutureDate(`${year}-10-17`).getFullYear()).toEqual(2023)
})
