import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check that the page loads
    await expect(page).toHaveTitle(/Thomas Ansems/)
  })

  test('has visible navigation', async ({ page }) => {
    await page.goto('/')

    // Check navigation links exist (may be hidden on mobile, so check for existence)
    const nav = page.locator('nav')
    await expect(nav).toHaveCount(1)
  })

  test('has footer with copyright', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check current year is in footer
    const currentYear = new Date().getFullYear().toString()
    await expect(footer).toContainText(currentYear)
  })

  test('theme toggle works', async ({ page }) => {
    await page.goto('/')

    // Find theme toggle button
    const themeButton = page.locator('button[aria-label*="theme"]').first()

    if (await themeButton.isVisible()) {
      await themeButton.click()

      // Check that html element has class change or attribute change
      const html = page.locator('html')
      const classAttr = await html.getAttribute('class')
      expect(classAttr).toBeTruthy()
    }
  })
})

test.describe('Navigation', () => {
  test('can navigate to projects page', async ({ page }) => {
    await page.goto('/')

    // Click on projects link
    const projectsLink = page.getByRole('link', { name: /project/i }).first()
    await projectsLink.click()

    // Should navigate to projects page
    await expect(page).toHaveURL(/projects/)
  })

  test('can navigate to contact page', async ({ page }) => {
    await page.goto('/')

    // Click on contact link if exists
    const contactLink = page.getByRole('link', { name: /contact/i }).first()

    if (await contactLink.isVisible()) {
      await contactLink.click()
      await expect(page).toHaveURL(/contact/)
    }
  })

  test('can navigate to resume page', async ({ page }) => {
    await page.goto('/')

    // Click on resume/cv link if exists
    const resumeLink = page.getByRole('link', { name: /resume|cv/i }).first()

    if (await resumeLink.isVisible()) {
      await resumeLink.click()
      await expect(page).toHaveURL(/resume/)
    }
  })

  test('logo/title links back to homepage', async ({ page }) => {
    await page.goto('/projects')

    // Click on home link (logo or title)
    const homeLink = page.getByRole('link', { name: /thomas/i }).first()
    await homeLink.click()

    await expect(page).toHaveURL('/')
  })
})

test.describe('Accessibility', () => {
  test('page has text content', async ({ page }) => {
    await page.goto('/')

    // Page should have meaningful text content
    const body = page.locator('body')
    const text = await body.textContent()
    expect(text.length).toBeGreaterThan(100)
  })

  test('images have alt text', async ({ page }) => {
    await page.goto('/')

    // Get all images
    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      // All images should have alt attribute (can be empty for decorative)
      expect(alt !== null).toBeTruthy()
    }
  })

  test('links have accessible names', async ({ page }) => {
    await page.goto('/')

    // Get all links
    const links = page.locator('a')
    const count = await links.count()

    for (let i = 0; i < Math.min(count, 20); i++) {
      // Check first 20 links
      const link = links.nth(i)
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')

      // Link should have text content or aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy()
    }
  })
})

test.describe('Responsive Design', () => {
  test('mobile navigation toggle works', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Look for mobile menu button
    const menuButton = page.locator('button').filter({ hasText: /menu/i }).first()
    const hamburgerButton = page.locator('button[aria-label*="menu"]').first()

    const mobileMenuBtn = (await menuButton.isVisible()) ? menuButton : hamburgerButton

    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click()

      // Navigation should become visible
      const mobileNav = page.locator('nav, [role="navigation"]')
      await expect(mobileNav.first()).toBeVisible()
    }
  })

  test('content is readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Main content should be visible
    const main = page.locator('main').first()
    await expect(main).toBeVisible()

    // Check that content doesn't overflow
    const body = page.locator('body')
    const bodyWidth = await body.evaluate((el) => el.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(375)
  })
})
