import { test, expect } from '@playwright/test';

test.describe('Bcrypt Hash Generator', () => {
  test('should load the page and render default hash and match state', async ({ page }) => {
    await page.goto('/tools/bcrypt-generator');
    
    await expect(page.getByRole('heading', { name: 'Bcrypt Hash Generator' })).toBeVisible();
    
    // Default password is my_secure_password
    const inputs = page.locator('input[type="text"]');
    await expect(inputs.first()).toHaveValue('my_secure_password');
    
    // Hash should be generated and match state should be True eventually
    // (We wait because generation is async with bcryptjs)
    await expect(page.getByText('True — Hashes Match')).toBeVisible({ timeout: 10000 });
  });

  test('should show false when passwords do not match', async ({ page }) => {
    await page.goto('/tools/bcrypt-generator');
    
    // Wait for initial generation and true state
    await expect(page.getByText('True — Hashes Match')).toBeVisible({ timeout: 10000 });
    
    const inputs = page.locator('input[type="text"]');
    
    // Change verifier password to something else
    await inputs.nth(1).fill('wrong_password');
    
    // Match state should turn False
    await expect(page.getByText('False — No Match')).toBeVisible({ timeout: 5000 });
  });

  test('should handle salt round changes', async ({ page }) => {
    await page.goto('/tools/bcrypt-generator');
    
    // Change salt rounds to 5 (slider)
    const rangeInput = page.locator('input[type="range"]');
    await rangeInput.fill('5');
    
    // Should see "Computing..." and then a new hash
    // Wait for the new hash to be validated
    await expect(page.getByText('True — Hashes Match')).toBeVisible({ timeout: 10000 });
  });
});
