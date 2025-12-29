import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useRef, useState } from 'react'

// Mock NewsletterForm component for testing
const MockNewsletterForm = ({ title = 'Subscribe to the newsletter' }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const translations = {
    mail: 'Email address',
    placeholderSuccess: 'You are subscribed!',
    placeholderDefault: 'Enter your email',
    buttonSuccess: 'Subscribed',
    buttonDefault: 'Subscribe',
    messageError: 'An error occurred. Please try again.',
  }

  const subscribe = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/mailchimp', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const data = await res.json()
    if (data.error) {
      setError(true)
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold">{title}</div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label className="sr-only" htmlFor="email-input">
            {translations.mail}
          </label>
          <input
            autoComplete="email"
            className="w-72 rounded-md px-4"
            id="email-input"
            name="email"
            placeholder={
              subscribed ? translations.placeholderSuccess : translations.placeholderDefault
            }
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className="w-full rounded-md py-2 px-4 font-medium"
            type="submit"
            disabled={subscribed}
          >
            {subscribed ? translations.buttonSuccess : translations.buttonDefault}
          </button>
        </div>
      </form>
      {error && <div className="w-72 pt-2 text-sm text-red-500">{translations.messageError}</div>}
    </div>
  )
}

describe('NewsletterForm', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form with default title', () => {
    render(<MockNewsletterForm />)

    expect(screen.getByText('Subscribe to the newsletter')).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(<MockNewsletterForm title="Get updates" />)

    expect(screen.getByText('Get updates')).toBeInTheDocument()
  })

  it('shows default placeholder when not subscribed', () => {
    render(<MockNewsletterForm />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter your email')
  })

  it('submits form with valid email', async () => {
    const user = userEvent.setup()

    global.fetch.mockResolvedValueOnce({
      json: async () => ({ error: '' }),
    })

    render(<MockNewsletterForm />)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: 'Subscribe' })

    await user.type(input, 'test@example.com')
    await user.click(button)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/mailchimp', {
        body: JSON.stringify({ email: 'test@example.com' }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
    })
  })

  it('shows success state after successful subscription', async () => {
    const user = userEvent.setup()

    global.fetch.mockResolvedValueOnce({
      json: async () => ({ error: '' }),
    })

    render(<MockNewsletterForm />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test@example.com')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Subscribed' })).toBeInTheDocument()
    })

    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows error message when subscription fails', async () => {
    const user = userEvent.setup()

    global.fetch.mockResolvedValueOnce({
      json: async () => ({ error: 'Email already subscribed' }),
    })

    render(<MockNewsletterForm />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'existing@example.com')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument()
    })
  })

  it('clears input after successful subscription', async () => {
    const user = userEvent.setup()

    global.fetch.mockResolvedValueOnce({
      json: async () => ({ error: '' }),
    })

    render(<MockNewsletterForm />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test@example.com')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('requires email input', () => {
    render(<MockNewsletterForm />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('has proper accessibility attributes', () => {
    render(<MockNewsletterForm />)

    const input = screen.getByLabelText('Email address')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('autocomplete', 'email')
  })
})
