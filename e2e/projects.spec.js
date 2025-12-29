import { test, expect } from '@playwright/test'

test.describe('Projects Page', () => {
  test('loads projects page successfully', async ({ page }) => {
    await page.goto('/projects')

    // Page should have projects heading
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test('displays project cards', async ({ page }) => {
    await page.goto('/projects')

    // Should have at least one project
    const projectCards = page.locator('[class*="md:w-1/2"]')
    const count = await projectCards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('project cards have required elements', async ({ page }) => {
    await page.goto('/projects')

    // Get first project card
    const firstCard = page.locator('[class*="md:w-1/2"]').first()

    // Should have a title (h2)
    const title = firstCard.locator('h2')
    await expect(title).toBeVisible()

    // Should have a description (p)
    const description = firstCard.locator('p')
    await expect(description).toBeVisible()
  })

  test('project links are clickable', async ({ page }) => {
    await page.goto('/projects')

    // Get all project links
    const projectLinks = page.locator('[class*="md:w-1/2"] a').first()

    if (await projectLinks.isVisible()) {
      const href = await projectLinks.getAttribute('href')
      expect(href).toBeTruthy()
    }
  })
})

test.describe('Projects SEO', () => {
  test('has proper meta tags', async ({ page }) => {
    await page.goto('/projects')

    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]')
    const content = await metaDescription.getAttribute('content')
    expect(content).toBeTruthy()
  })

  test('has proper Open Graph tags', async ({ page }) => {
    await page.goto('/projects')

    // Check for og:title
    const ogTitle = page.locator('meta[property="og:title"]')
    const title = await ogTitle.getAttribute('content')
    expect(title).toBeTruthy()
  })
})
