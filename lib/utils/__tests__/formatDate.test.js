import { describe, it, expect, vi } from 'vitest'
import formatDate from '../formatDate'

describe('formatDate', () => {
  it('formats date correctly for English locale', () => {
    const result = formatDate('2024-01-15', 'en')
    expect(result).toContain('January')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('formats date correctly for Dutch locale', () => {
    const result = formatDate('2024-03-20', 'nl')
    expect(result).toContain('Maart')
    expect(result).toContain('20')
    expect(result).toContain('2024')
  })

  it('capitalizes month names properly', () => {
    // Some locales return lowercase month names, function should capitalize
    const result = formatDate('2024-06-01', 'en')
    // First character of each word should be uppercase
    const words = result.split(' ')
    words.forEach((word) => {
      expect(word[0]).toBe(word[0].toUpperCase())
    })
  })

  it('handles different date formats as input', () => {
    const isoDate = formatDate('2024-12-25T00:00:00.000Z', 'en')
    expect(isoDate).toContain('December')
    expect(isoDate).toContain('25')
    expect(isoDate).toContain('2024')
  })

  it('handles edge cases - start of year', () => {
    const result = formatDate('2024-01-01', 'en')
    expect(result).toContain('January')
    expect(result).toContain('1')
    expect(result).toContain('2024')
  })

  it('handles edge cases - end of year', () => {
    const result = formatDate('2024-12-31', 'en')
    expect(result).toContain('December')
    expect(result).toContain('31')
    expect(result).toContain('2024')
  })
})
