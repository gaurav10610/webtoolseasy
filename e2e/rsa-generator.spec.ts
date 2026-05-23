import { test, expect } from '@playwright/test';

test.describe('RSA Key Pair Generator', () => {
  test('should load the page and render default empty state', async ({ page }) => {
    await page.goto('/tools/rsa-generator');
    
    await expect(page.getByRole('heading', { name: 'RSA Key Pair Generator' })).toBeVisible();
    
    // Default size is 2048 and should be selected
    const btn2048 = page.getByRole('button', { name: '2048' });
    await expect(btn2048).toHaveClass(/bg-emerald-500\/20/);
    
    const textareas = page.locator('textarea');
    await expect(textareas.first()).toHaveValue('Generate a key pair first...');
    await expect(textareas.nth(1)).toHaveValue('Generate a key pair first...');
  });

  test('should generate RSA keys when button is clicked', async ({ page }) => {
    await page.goto('/tools/rsa-generator');
    
    // Choose 1024 for faster generation in tests
    await page.getByRole('button', { name: '1024' }).click();
    
    await page.getByRole('button', { name: 'Generate Key Pair' }).click();
    
    // Button should briefly show "Generating Keys..."
    // Wait for the button to revert to "Generate Key Pair", indicating completion
    await expect(page.getByRole('button', { name: 'Generate Key Pair' })).toBeVisible({ timeout: 10000 });
    
    const textareas = page.locator('textarea');
    
    // Public Key should contain SPKI BEGIN block
    await expect(textareas.first()).toContainText('-----BEGIN PUBLIC KEY-----');
    await expect(textareas.first()).toContainText('-----END PUBLIC KEY-----');
    
    // Private Key should contain PKCS8 BEGIN block
    await expect(textareas.nth(1)).toContainText('-----BEGIN PRIVATE KEY-----');
    await expect(textareas.nth(1)).toContainText('-----END PRIVATE KEY-----');
  });
});
