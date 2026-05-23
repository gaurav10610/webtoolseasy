import { test, expect } from '@playwright/test';

test.describe('Diff Checker', () => {
  test('should load the page and render default JSON diff', async ({ page }) => {
    await page.goto('/tools/diff-checker');
    
    await expect(page.getByRole('heading', { name: 'Diff Checker' })).toBeVisible();
    
    // The diff pane should show the removed age: 30 and added age: 31
    // The library outputs the lines with spaces, we'll just check for text content
    await expect(page.getByText('30,').last()).toBeVisible(); // Removed
    await expect(page.getByText('31,').last()).toBeVisible(); // Added
    await expect(page.getByText('"active": true').last()).toBeVisible(); // Added
  });

  test('should update diff when text mode is selected', async ({ page }) => {
    await page.goto('/tools/diff-checker');
    
    // Switch to Text mode
    await page.getByRole('button', { name: 'Plain Text' }).click();
    
    // Fill text
    const origInput = page.getByPlaceholder('Paste original text or JSON here...');
    const modInput = page.getByPlaceholder('Paste modified text or JSON here...');
    
    await origInput.fill('Hello World\nLine 2');
    await modInput.fill('Hello World\nLine 3');
    
    // Diff should show the change
    await expect(page.getByText('Line 2').last()).toBeVisible();
    await expect(page.getByText('Line 3').last()).toBeVisible();
  });

  test('should show error for invalid JSON in JSON mode', async ({ page }) => {
    await page.goto('/tools/diff-checker');
    
    // Make JSON invalid
    const origInput = page.getByPlaceholder('Paste original text or JSON here...');
    await origInput.fill('{ invalid json }');
    
    // Should display JSON syntax error message
    // The exact message depends on the browser engine's JSON.parse error, so we match any error state
    await expect(page.locator('.text-red-400', { hasText: /JSON/i })).toBeVisible();
  });
});
