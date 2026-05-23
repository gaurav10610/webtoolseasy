import { test, expect } from '@playwright/test';

test.describe('JSON to Zod Converter', () => {
  test('should load the page and render default output', async ({ page }) => {
    // Navigate to the tool
    await page.goto('/tools/json-to-zod');
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'JSON to Zod & TypeScript Converter' })).toBeVisible();
    
    // The textarea should have the default input
    const inputArea = page.locator('textarea[placeholder="Paste JSON here..."]');
    await expect(inputArea).toBeVisible();
    
    // The default JSON should trigger default Zod generation
    const outputArea = page.locator('textarea[readOnly]');
    await expect(outputArea).toHaveValue(/export const rootSchema = z\.object\(\{/);
    await expect(outputArea).toHaveValue(/name: z\.string\(\)/);
  });

  test('should convert valid JSON to TypeScript correctly when tab is clicked', async ({ page }) => {
    await page.goto('/tools/json-to-zod');
    
    // Switch to TypeScript tab
    await page.getByRole('button', { name: 'TypeScript' }).click();
    
    const outputArea = page.locator('textarea[readOnly]');
    await expect(outputArea).toHaveValue(/export interface Root \{/);
    await expect(outputArea).toHaveValue(/name: string;/);
    await expect(outputArea).toHaveValue(/roles: string\[\];/);
  });

  test('should show error for invalid JSON', async ({ page }) => {
    await page.goto('/tools/json-to-zod');
    
    const inputArea = page.locator('textarea[placeholder="Paste JSON here..."]');
    
    // Clear and enter invalid JSON
    await inputArea.fill('{ "broken": true, }'); // Trailing comma is invalid JSON
    
    // Verify error badge appears
    await expect(page.getByText('Expected double-quoted property name in JSON')).toBeVisible();
    
    // Output should be empty when invalid
    const outputArea = page.locator('textarea[readOnly]');
    await expect(outputArea).toHaveValue('');
  });

  test('should clear output when input is empty', async ({ page }) => {
    await page.goto('/tools/json-to-zod');
    
    const inputArea = page.locator('textarea[placeholder="Paste JSON here..."]');
    await inputArea.fill('');
    
    const outputArea = page.locator('textarea[readOnly]');
    await expect(outputArea).toHaveValue('');
  });
});
