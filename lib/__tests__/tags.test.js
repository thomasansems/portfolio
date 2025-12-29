import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import kebabCase from '../utils/kebabCase'

// Since the tags.js module has complex fs dependencies, we test the logic separately
// The actual getAllTags function is tested via E2E tests

describe('Tag processing logic', () => {
  describe('kebabCase transformation for tags', () => {
    it('converts tag with spaces to kebab-case', () => {
      expect(kebabCase('Machine Learning')).toBe('machine-learning')
    })

    it('converts tag with mixed case', () => {
      expect(kebabCase('JavaScript')).toBe('javascript')
    })

    it('handles tag with dots', () => {
      expect(kebabCase('Next.js')).toBe('nextjs')
    })

    it('handles already lowercase tag', () => {
      expect(kebabCase('react')).toBe('react')
    })
  })

  describe('Tag counting logic', () => {
    it('counts tags correctly from mock data', () => {
      const mockPosts = [
        { tags: ['JavaScript', 'React'], draft: false },
        { tags: ['JavaScript', 'Next.js'], draft: false },
        { tags: ['React', 'Next.js'], draft: false },
      ]

      const tagCount = {}
      mockPosts.forEach((post) => {
        if (post.tags && post.draft !== true) {
          post.tags.forEach((tag) => {
            const formattedTag = kebabCase(tag)
            if (formattedTag in tagCount) {
              tagCount[formattedTag] += 1
            } else {
              tagCount[formattedTag] = 1
            }
          })
        }
      })

      expect(tagCount['javascript']).toBe(2)
      expect(tagCount['react']).toBe(2)
      expect(tagCount['nextjs']).toBe(2)
    })

    it('excludes draft posts from tag count', () => {
      const mockPosts = [
        { tags: ['JavaScript'], draft: false },
        { tags: ['JavaScript', 'React'], draft: true },
      ]

      const tagCount = {}
      mockPosts.forEach((post) => {
        if (post.tags && post.draft !== true) {
          post.tags.forEach((tag) => {
            const formattedTag = kebabCase(tag)
            if (formattedTag in tagCount) {
              tagCount[formattedTag] += 1
            } else {
              tagCount[formattedTag] = 1
            }
          })
        }
      })

      expect(tagCount['javascript']).toBe(1)
      expect(tagCount['react']).toBeUndefined()
    })

    it('handles posts without tags', () => {
      const mockPosts = [
        { title: 'No tags post', draft: false },
        { tags: ['Test'], draft: false },
      ]

      const tagCount = {}
      mockPosts.forEach((post) => {
        if (post.tags && post.draft !== true) {
          post.tags.forEach((tag) => {
            const formattedTag = kebabCase(tag)
            if (formattedTag in tagCount) {
              tagCount[formattedTag] += 1
            } else {
              tagCount[formattedTag] = 1
            }
          })
        }
      })

      expect(tagCount['test']).toBe(1)
      expect(Object.keys(tagCount)).toHaveLength(1)
    })

    it('returns empty object when no posts have tags', () => {
      const mockPosts = [
        { title: 'Post 1', draft: false },
        { title: 'Post 2', draft: false },
      ]

      const tagCount = {}
      mockPosts.forEach((post) => {
        if (post.tags && post.draft !== true) {
          post.tags.forEach((tag) => {
            const formattedTag = kebabCase(tag)
            if (formattedTag in tagCount) {
              tagCount[formattedTag] += 1
            } else {
              tagCount[formattedTag] = 1
            }
          })
        }
      })

      expect(tagCount).toEqual({})
    })
  })
})
