import '@testing-library/jest-dom'
import { vi, beforeEach } from 'vitest'

// Mock next-translate
vi.mock('next-translate/useTranslation', () => ({
  default: () => ({
    t: (key) => {
      const translations = {
        'newsletter:mail': 'Email address',
        'newsletter:placeholderSucces': 'You are subscribed!',
        'newsletter:placeholderDefault': 'Enter your email',
        'newsletter:buttonSuccess': 'Subscribed',
        'newsletter:buttonDefault': 'Subscribe',
        'newsletter:messageError': 'An error occurred. Please try again.',
      }
      return translations[key] || key
    },
    lang: 'en',
  }),
}))

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'en',
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
  }),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

// Mock fetch for API tests
global.fetch = vi.fn()

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})
