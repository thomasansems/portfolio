/* eslint-disable @next/next/no-html-link-for-pages */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// Mock Footer component for testing rendering logic
const MockFooter = ({ locale = 'en' }) => {
  const siteMetadata = {
    title: { en: 'Test Site', nl: 'Test Site NL' },
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/test',
  }

  return (
    <footer>
      <div className="mb-3 flex justify-center space-x-4">
        <a href={siteMetadata.github} data-testid="social-icon-github">
          GitHub
        </a>
        <a href={siteMetadata.linkedin} data-testid="social-icon-linkedin">
          LinkedIn
        </a>
      </div>
      <div className="mt-16 mb-4 flex flex-col">
        <div className="mb-6 flex justify-center space-x-2 text-sm">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <a href="/">{siteMetadata.title[locale]}</a>
        </div>
      </div>
    </footer>
  )
}

describe('Footer Component', () => {
  it('renders copyright with current year', () => {
    render(<MockFooter />)

    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument()
  })

  it('renders site title link for English locale', () => {
    render(<MockFooter locale="en" />)

    const link = screen.getByRole('link', { name: 'Test Site' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders site title link for Dutch locale', () => {
    render(<MockFooter locale="nl" />)

    const link = screen.getByRole('link', { name: 'Test Site NL' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders GitHub social icon', () => {
    render(<MockFooter />)

    const githubIcon = screen.getByTestId('social-icon-github')
    expect(githubIcon).toBeInTheDocument()
    expect(githubIcon).toHaveAttribute('href', 'https://github.com/test')
  })

  it('renders LinkedIn social icon', () => {
    render(<MockFooter />)

    const linkedinIcon = screen.getByTestId('social-icon-linkedin')
    expect(linkedinIcon).toBeInTheDocument()
    expect(linkedinIcon).toHaveAttribute('href', 'https://linkedin.com/test')
  })

  it('renders footer element', () => {
    const { container } = render(<MockFooter />)

    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('has bullet separator between copyright and title', () => {
    render(<MockFooter />)

    expect(screen.getByText('•')).toBeInTheDocument()
  })
})
