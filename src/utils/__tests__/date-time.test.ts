import { describe, it } from 'vitest'
import { timestampToDateString } from '../date-time'

describe('date-time', () => {
  it('timestampToDateString returns invalid date at undefined', ({ expect }) => {
    const result = timestampToDateString(undefined as any)
    const expected = 'Invalid Date'

    expect(result).toBe(expected)
  })

  it('timestampToDateString returns invalid date at NaN', ({ expect }) => {
    const result = timestampToDateString(NaN as any)
    const expected = 'Invalid Date'

    expect(result).toBe(expected)
  })

  it('timestampToDateString returns zero epoch time at null', ({ expect }) => {
    const result = timestampToDateString(null as any)
    const expected = '1/1/1970'

    expect(result).toBe(expected)
  })

  it('timestampToDateString returns correct value', ({ expect }) => {
    const result = timestampToDateString(1681365756900)
    const expected = '4/13/2023'

    expect(result).toBe(expected)
  })
})
