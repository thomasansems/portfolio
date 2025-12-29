import { describe, it, expect, vi, beforeEach } from 'vitest'
import { formatSlug, dateSortDesc } from '../mdx'

// Note: getFiles and getFileBySlug require complex mocking of the file system
// Testing the pure functions here

describe('formatSlug', () => {
  it('extracts slug from simple filename', () => {
    expect(formatSlug('my-blog-post.md')).toBe('my-blog-post')
  })

  it('extracts slug from filename with locale', () => {
    expect(formatSlug('my-blog-post.en.md')).toBe('my-blog-post')
    expect(formatSlug('my-blog-post.nl.mdx')).toBe('my-blog-post')
  })

  it('extracts slug from mdx files', () => {
    expect(formatSlug('react-tutorial.mdx')).toBe('react-tutorial')
  })

  it('handles filename with multiple dots in slug', () => {
    // The function takes the first segment before the first dot
    expect(formatSlug('next.js-guide.en.md')).toBe('next')
  })

  it('handles slug without extension', () => {
    // Edge case - if slug has no dot
    expect(formatSlug('my-blog-post')).toBe('my-blog-post')
  })
})

describe('dateSortDesc', () => {
  it('returns -1 when first date is greater (more recent)', () => {
    expect(dateSortDesc('2024-01-15', '2024-01-10')).toBe(-1)
  })

  it('returns 1 when first date is smaller (older)', () => {
    expect(dateSortDesc('2024-01-10', '2024-01-15')).toBe(1)
  })

  it('returns 0 when dates are equal', () => {
    expect(dateSortDesc('2024-01-15', '2024-01-15')).toBe(0)
  })

  it('sorts array of dates correctly', () => {
    const dates = ['2024-01-10', '2024-03-15', '2024-02-20', '2024-01-01']
    const sorted = [...dates].sort(dateSortDesc)

    expect(sorted).toEqual(['2024-03-15', '2024-02-20', '2024-01-10', '2024-01-01'])
  })

  it('handles ISO date strings', () => {
    expect(dateSortDesc('2024-01-15T10:00:00.000Z', '2024-01-15T09:00:00.000Z')).toBe(-1)
  })

  it('handles Date objects converted to strings', () => {
    const date1 = new Date('2024-06-01').toISOString()
    const date2 = new Date('2024-01-01').toISOString()
    expect(dateSortDesc(date1, date2)).toBe(-1)
  })
})
