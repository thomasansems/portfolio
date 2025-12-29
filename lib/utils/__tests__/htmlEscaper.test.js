import { describe, it, expect } from 'vitest'
import { escape } from '../htmlEscaper'

describe('htmlEscaper', () => {
  describe('escape', () => {
    it('escapes ampersand', () => {
      expect(escape('Tom & Jerry')).toBe('Tom &amp; Jerry')
    })

    it('escapes less than sign', () => {
      expect(escape('<script>')).toBe('&lt;script&gt;')
    })

    it('escapes greater than sign', () => {
      expect(escape('a > b')).toBe('a &gt; b')
    })

    it('escapes single quotes', () => {
      expect(escape("It's a test")).toBe('It&#39;s a test')
    })

    it('escapes double quotes', () => {
      expect(escape('Say "Hello"')).toBe('Say &quot;Hello&quot;')
    })

    it('escapes multiple special characters', () => {
      const input = '<div class="test">Hello & "World"</div>'
      const expected = '&lt;div class=&quot;test&quot;&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
      expect(escape(input)).toBe(expected)
    })

    it('returns unchanged string when no special characters', () => {
      const input = 'Hello World 123'
      expect(escape(input)).toBe(input)
    })

    it('handles empty string', () => {
      expect(escape('')).toBe('')
    })

    it('prevents XSS attack patterns', () => {
      const xssAttempt = '<script>alert("XSS")</script>'
      const result = escape(xssAttempt)
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('</script>')
      expect(result).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;')
    })

    it('handles HTML attributes safely', () => {
      const input = 'onclick="alert(\'xss\')"'
      const result = escape(input)
      expect(result).not.toContain('"')
      expect(result).not.toContain("'")
    })
  })
})
