import { test, expect } from '@playwright/test';

test.describe('Color A11y Generator', () => {
  test('should load the page and render default blue palette', async ({ page }) => {
    await page.goto('/tools/color-a11y');
    
    await expect(page.getByRole('heading', { name: 'Color A11y Generator' })).toBeVisible();
    
    // Default base is #3b82f6 (blue-500)
    const textInput = page.locator('input[type="text"]');
    await expect(textInput).toHaveValue('#3b82f6');
    
    // Should render 11 shades (50 to 950)
    await expect(page.getByText('50', { exact: true })).toBeVisible();
    await expect(page.getByText('500', { exact: true })).toBeVisible();
    await expect(page.getByText('950', { exact: true })).toBeVisible();
    
    // 500 should be marked as Base
    const baseBadge = page.locator('div', { hasText: /^Base$/ }).first();
    await expect(baseBadge).toBeVisible();
  });

  test('should generate new palette when valid hex is entered', async ({ page }) => {
    await page.goto('/tools/color-a11y');
    
    const textInput = page.locator('input[type="text"]');
    
    // Change to pure red
    await textInput.fill('#ff0000');
    
    // The palette hex values should update (e.g., the base should be #ff0000)
    await expect(page.getByText('#ff0000', { exact: true })).toBeVisible();
  });

  test('should show error for invalid hex', async ({ page }) => {
    await page.goto('/tools/color-a11y');
    
    const textInput = page.locator('input[type="text"]');
    
    // Enter invalid hex
    await textInput.fill('invalid');
    
    await expect(page.getByText('Invalid Hex Color')).toBeVisible();
  });
});
