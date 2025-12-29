import { describe, it, expect } from 'vitest'
import kebabCase from '../kebabCase'

describe('kebabCase', () => {
  it('converts simple string to kebab-case', () => {
    expect(kebabCase('Hello World')).toBe('hello-world')
  })

  it('handles camelCase input', () => {
    expect(kebabCase('helloWorld')).toBe('helloworld')
  })

  it('handles PascalCase input', () => {
    expect(kebabCase('HelloWorld')).toBe('helloworld')
  })

  it('handles already kebab-case string', () => {
    expect(kebabCase('hello-world')).toBe('hello-world')
  })

  it('handles string with special characters', () => {
    const result = kebabCase('Hello! World?')
    expect(result).not.toContain('!')
    expect(result).not.toContain('?')
  })

  it('handles string with numbers', () => {
    expect(kebabCase('Hello World 2024')).toBe('hello-world-2024')
  })

  it('handles empty string', () => {
    expect(kebabCase('')).toBe('')
  })

  it('handles single word', () => {
    expect(kebabCase('Hello')).toBe('hello')
  })

  it('handles multiple spaces', () => {
    // github-slugger converts each space to a dash
    expect(kebabCase('Hello   World')).toBe('hello---world')
  })

  it('handles typical blog post tags', () => {
    expect(kebabCase('Machine Learning')).toBe('machine-learning')
    expect(kebabCase('React.js')).toBe('reactjs')
    expect(kebabCase('Next.js')).toBe('nextjs')
    expect(kebabCase('TypeScript')).toBe('typescript')
  })
})
