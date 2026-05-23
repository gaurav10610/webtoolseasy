import { test, expect } from '@playwright/test';

test.describe('Base64 File Encoder', () => {
  test('should load the page and render empty state', async ({ page }) => {
    await page.goto('/tools/base64-file');
    
    await expect(page.getByRole('heading', { name: 'Base64 File Encoder' })).toBeVisible();
    await expect(page.getByText('Click or drag a file here')).toBeVisible();
    await expect(page.getByPlaceholder('Data URI will appear here...')).toBeVisible();
    await expect(page.getByPlaceholder('data:image/png;base64,iVBORw0KGgo...')).toBeVisible();
    await expect(page.getByText('Waiting for input...')).toBeVisible();
  });

  test('should render preview when valid base64 image is pasted', async ({ page }) => {
    await page.goto('/tools/base64-file');
    
    const decodeTextarea = page.getByPlaceholder('data:image/png;base64,iVBORw0KGgo...');
    
    // A tiny 1x1 transparent PNG base64
    const validBase64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
    await decodeTextarea.fill(validBase64Image);
    
    // The preview should show an img tag
    await expect(page.locator('img[alt="Base64 Preview"]')).toBeVisible();
    
    // The "Waiting for input..." text should be gone
    await expect(page.getByText('Waiting for input...')).not.toBeVisible();
  });

  test('should show error when invalid base64 image is pasted', async ({ page }) => {
    await page.goto('/tools/base64-file');
    
    const decodeTextarea = page.getByPlaceholder('data:image/png;base64,iVBORw0KGgo...');
    
    // Invalid image data uri
    await decodeTextarea.fill('data:text/plain;base64,SGVsbG8gV29ybGQ=');
    
    // The preview should show an error
    await expect(page.getByText('Valid image Data URI not detected.')).toBeVisible();
  });
});
