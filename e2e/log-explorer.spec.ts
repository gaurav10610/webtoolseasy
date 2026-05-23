import { test, expect } from '@playwright/test';

test.describe('Big Data Log Explorer', () => {
  test('should load the page and render empty state', async ({ page }) => {
    await page.goto('/tools/log-explorer');
    
    await expect(page.getByRole('heading', { name: 'Big Data Log Explorer' })).toBeVisible();
    await expect(page.getByText('Drop a .log or .jsonl file to begin.')).toBeVisible();
  });

  test('should load example data and render virtualized list', async ({ page }) => {
    await page.goto('/tools/log-explorer');
    
    // Click "100k Lines Example"
    await page.getByRole('button', { name: '100k Lines Example' }).click();
    
    // Wait for file name to appear
    await expect(page.getByText('example_server.log')).toBeVisible();
    await expect(page.getByText('100,000 lines')).toBeVisible();
    
    // Check if the virtualized list renders the first few items
    // (The example data generates dummy log lines, e.g., "User authentication successful")
    const lines = page.locator('.whitespace-pre');
    await expect(lines.first()).toBeVisible();
  });

  test('should filter logs using search query', async ({ page }) => {
    await page.goto('/tools/log-explorer');
    
    // Load example data
    await page.getByRole('button', { name: '100k Lines Example' }).click();
    await expect(page.getByText('example_server.log')).toBeVisible();
    
    // Search for "ERROR"
    const searchInput = page.getByPlaceholder('Search logs...');
    await searchInput.fill('ERROR');
    
    // Wait for the debounce and worker search to complete (UI shows "Filtered out")
    await expect(page.getByText(/Filtered out: /)).toBeVisible();
    
    // Total size of virtualizer should be much smaller now
    const lines = page.locator('.whitespace-pre');
    await expect(lines.first()).toContainText('ERROR');
  });

  test('should clear file and reset state', async ({ page }) => {
    await page.goto('/tools/log-explorer');
    
    await page.getByRole('button', { name: '100k Lines Example' }).click();
    await expect(page.getByText('example_server.log')).toBeVisible();
    
    // Click close button
    await page.getByRole('button', { name: 'Close file' }).click();
    
    await expect(page.getByText('example_server.log')).toBeHidden();
    await expect(page.getByText('Drop a .log or .jsonl file to begin.')).toBeVisible();
  });
});
