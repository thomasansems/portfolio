import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock @mailchimp/mailchimp_marketing before importing the handler
vi.mock('@mailchimp/mailchimp_marketing', () => ({
  default: {
    setConfig: vi.fn(),
    lists: {
      addListMember: vi.fn(),
    },
  },
}))

describe('Mailchimp API Route', () => {
  let handler
  let mailchimp

  beforeEach(async () => {
    vi.resetModules()

    // Set environment variables
    process.env.MAILCHIMP_API_KEY = 'test-api-key'
    process.env.MAILCHIMP_API_SERVER = 'us1'
    process.env.MAILCHIMP_AUDIENCE_ID = 'test-audience-id'

    // Import after mocks are set up
    mailchimp = (await import('@mailchimp/mailchimp_marketing')).default
    const module = await import('../mailchimp')
    handler = module.default
  })

  const createMockRequest = (body) => ({
    body,
  })

  const createMockResponse = () => {
    const res = {}
    res.status = vi.fn().mockReturnValue(res)
    res.json = vi.fn().mockReturnValue(res)
    return res
  }

  it('returns 400 when email is missing', async () => {
    const req = createMockRequest({})
    const res = createMockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Email is required' })
  })

  it('returns 400 when email is empty string', async () => {
    const req = createMockRequest({ email: '' })
    const res = createMockResponse()

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Email is required' })
  })

  it('returns 201 on successful subscription', async () => {
    const req = createMockRequest({ email: 'test@example.com' })
    const res = createMockResponse()

    mailchimp.lists.addListMember.mockResolvedValueOnce({ id: 'member-123' })

    await handler(req, res)

    expect(mailchimp.lists.addListMember).toHaveBeenCalledWith('test-audience-id', {
      email_address: 'test@example.com',
      status: 'subscribed',
    })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ error: '' })
  })

  it('returns 500 when Mailchimp API fails', async () => {
    const req = createMockRequest({ email: 'test@example.com' })
    const res = createMockResponse()

    const errorMessage = 'Member already exists'
    mailchimp.lists.addListMember.mockRejectedValueOnce(new Error(errorMessage))

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage })
  })

  it('handles non-Error objects thrown by Mailchimp', async () => {
    const req = createMockRequest({ email: 'test@example.com' })
    const res = createMockResponse()

    mailchimp.lists.addListMember.mockRejectedValueOnce('String error')

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'String error' })
  })

  it('uses correct environment variables for configuration', async () => {
    expect(mailchimp.setConfig).toHaveBeenCalledWith({
      apiKey: 'test-api-key',
      server: 'us1',
    })
  })
})
