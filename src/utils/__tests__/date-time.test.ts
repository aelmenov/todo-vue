import { describe, it } from 'vitest'
import { timestampToDateString } from '../date-time'

describe('date-time', () => {
  it('timestampToDateString returns invalid date at undefined', ({ expect }) => {
    expect(timestampToDateString(undefined as any)).toBe('Invalid Date')
  })

  it('timestampToDateString returns invalid date at NaN', ({ expect }) => {
    expect(timestampToDateString(NaN as any)).toBe('Invalid Date')
  })

  it('timestampToDateString returns zero epoch time at null', ({ expect }) => {
    expect(timestampToDateString(null as any)).toContain('1/1/1970')
  })

  it('timestampToDateString returns correct value', ({ expect }) => {
    expect(timestampToDateString(1681365756900)).toBe('4/13/2023')
  })
})
