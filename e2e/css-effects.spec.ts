import { test, expect } from '@playwright/test';

test.describe('CSS Effects Generator', () => {
  test('should load the page and render default state', async ({ page }) => {
    await page.goto('/tools/css-effects');
    
    await expect(page.getByRole('heading', { name: 'CSS Glassmorphism & Shadow Builder' })).toBeVisible();
    
    // Check if the preview card is rendered
    const previewCard = page.locator('#preview-card');
    await expect(previewCard).toBeVisible();
    
    // Check default generated code
    const editorText = page.locator('.view-lines');
    await expect(editorText).toContainText('backdrop-blur-md');
  });

  test('should update generated standard CSS when switching tabs', async ({ page }) => {
    await page.goto('/tools/css-effects');
    
    // Switch to Standard CSS
    await page.getByRole('button', { name: 'Standard CSS' }).click();
    
    const editorText = page.locator('.view-lines');
    await expect(editorText).toContainText('backdrop-filter: blur(16px);');
  });

  test('should update code when slider is changed', async ({ page }) => {
    await page.goto('/tools/css-effects');
    
    // Change Backdrop Blur slider (assuming it's the first range input)
    const blurSlider = page.locator('input[type="range"]').first();
    
    // Move the slider to value 40
    await blurSlider.fill('40');
    
    // The Tailwind code should update to include backdrop-blur-xl (since blur=40 maps to xl)
    const editorText = page.locator('.view-lines');
    await expect(editorText).toContainText('backdrop-blur-xl');
  });

  test('should update style of preview card when shadow X offset changes', async ({ page }) => {
    await page.goto('/tools/css-effects');
    
    // Switch to Standard CSS to easily check the raw output
    await page.getByRole('button', { name: 'Standard CSS' }).click();
    
    // The X Offset slider is the 3rd range input (Blur, Opacity, then Shadow X)
    const shadowXSlider = page.locator('input[type="range"]').nth(2);
    
    // Set X offset to 50
    await shadowXSlider.fill('50');
    
    // The Standard CSS output should reflect 50px
    const editorText = page.locator('.view-lines');
    await expect(editorText).toContainText('50px');
  });
});
