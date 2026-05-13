import { test, expect } from '@playwright/test';

test.describe('Rankings Page', () => {
  test('loads and displays university list', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('UniAggregator')).toBeVisible();
    await expect(page.locator('[data-testid="university-row"]').first()).toBeVisible();
  });

  test('country filter narrows results', async ({ page }) => {
    await page.goto('/');
    await page.selectOption('[data-testid="country-filter"]', 'USA');
    await expect(page.locator('[data-testid="university-row"]')).not.toHaveCount(0);
    const rows = page.locator('[data-testid="university-row"]');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i)).toContainText('USA');
    }
  });

  test('search filters universities by name', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="search-input"]', 'MIT');
    await expect(page.locator('[data-testid="university-row"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="university-row"]')).toContainText('Massachusetts');
  });

  test('clicking a university navigates to detail page', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="university-row"]').first().getByRole('link').click();
    await expect(page).toHaveURL(/\/university\/.+/);
    await expect(page.getByText('Admission Requirements')).toBeVisible();
  });
});

test.describe('University Detail Page', () => {
  test('displays admission requirements', async ({ page }) => {
    await page.goto('/university/mit');
    await expect(page.getByText('Admission Requirements')).toBeVisible();
    await expect(page.getByText('IELTS')).toBeVisible();
    await expect(page.getByText('TOEFL')).toBeVisible();
    await expect(page.getByText('Minimum GPA')).toBeVisible();
  });

  test('back button returns to rankings', async ({ page }) => {
    await page.goto('/university/mit');
    await page.getByText('Back to Rankings').click();
    await expect(page).toHaveURL('/');
  });

  test('displays university specialties', async ({ page }) => {
    await page.goto('/university/mit');
    await expect(page.getByText('Specialties')).toBeVisible();
  });
});
