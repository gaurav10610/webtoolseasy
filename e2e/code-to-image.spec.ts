import { test, expect } from '@playwright/test';

test.describe('Code Snippet Generator', () => {
  test('should load the page and render default state', async ({ page }) => {
    await page.goto('/tools/code-to-image');
    
    await expect(page.getByRole('heading', { name: 'Beautiful Code Snippets' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export PNG' })).toBeVisible();
    
    // Check if the Monaco editor is rendered inside the mac window frame
    const editor = page.locator('.monaco-editor');
    await expect(editor.first()).toBeVisible();
    
    // Check if the default window title is present
    await expect(page.getByText('main.ts')).toBeVisible();
  });

  test('should update window title when input changes', async ({ page }) => {
    await page.goto('/tools/code-to-image');
    
    const titleInput = page.getByPlaceholder('e.g. main.ts');
    await titleInput.fill('hello_world.rs');
    
    // The window frame should now display the new title
    // Wait for the exact text to appear in the DOM
    await expect(page.getByText('hello_world.rs')).toBeVisible();
  });

  test('should toggle drop shadow', async ({ page }) => {
    await page.goto('/tools/code-to-image');
    
    const shadowCheckbox = page.getByLabel('Window Shadow');
    
    // Default is checked, so the frame should have a shadow class
    const frame = page.locator('div.shadow-\\[0_20px_60px_-15px_rgba\\(0\\,0\\,0\\,0\\.6\\)\\]');
    await expect(frame).toBeVisible();
    
    // Uncheck it
    await shadowCheckbox.uncheck();
    
    // The shadow class should be removed
    await expect(frame).toBeHidden();
  });

  test('should change background gradient', async ({ page }) => {
    await page.goto('/tools/code-to-image');
    
    // Click the Ocean background (2nd background button)
    const oceanButton = page.getByTitle('Ocean');
    await oceanButton.click();
    
    // The frame container should now have the ocean gradient classes
    const frameContainer = page.locator('div.bg-gradient-to-br.from-teal-400.to-blue-500');
    await expect(frameContainer).toBeVisible();
  });
});
