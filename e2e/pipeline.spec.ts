import { test, expect } from '@playwright/test';

test.describe('Pipeline Execution Engine', () => {
  test('should execute base64 encode transform successfully', async ({ page }) => {
    // Navigate to the base64-encoder tool page which comes pre-configured
    await page.goto('http://localhost:3000/tools/base64-encoder');

    // Wait for canvas to load
    await expect(page.locator('.react-flow__renderer')).toBeVisible();

    // Find the input node's textarea and fill it
    // The GenericNode uses input/textarea fields
    const inputField = page.locator('textarea[placeholder="Paste your raw payload here..."]').first();
    await inputField.fill('Hello Playwright');

    // Click the Run Pipeline button in the header
    const runButton = page.locator('button', { hasText: 'Run Pipeline' });
    await runButton.click();

    // Wait for the output to appear in the Output node's preview
    // btoa('Hello Playwright') = SGVsbG8gUGxheXdyaWdodA==
    const outputPreview = page.locator('pre.text-emerald-400\\/80').last();
    await expect(outputPreview).toContainText('SGVsbG8gUGxheXdyaWdodA==', { timeout: 10000 });
  });

  test('should execute multiple tools in a chain if configured', async ({ page }) => {
    // We can also test the json-formatter
    await page.goto('http://localhost:3000/tools/json-formatter');
    
    await expect(page.locator('.react-flow__renderer')).toBeVisible();

    const inputField = page.locator('textarea[placeholder="Paste your raw payload here..."]').first();
    await inputField.fill('{"ugly":"json","test":true}');

    await page.locator('button', { hasText: 'Run Pipeline' }).click();

    const outputPreview = page.locator('pre.text-emerald-400\\/80').last();
    await expect(outputPreview).toContainText('"ugly": "json"', { timeout: 10000 });
  });
});
