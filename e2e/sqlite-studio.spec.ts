import { test, expect } from '@playwright/test';

test.describe('SQLite Studio', () => {
  test('should load the page and initialize WASM successfully', async ({ page }) => {
    await page.goto('/tools/sqlite-studio');
    
    await expect(page.getByRole('heading', { name: 'In-Browser SQLite Studio' })).toBeVisible();
    
    // The "Initializing WASM..." text should eventually disappear
    await expect(page.getByText('Initializing WASM...')).toBeHidden({ timeout: 10000 });
    
    // Editor should be ready
    await expect(page.getByText('SQL Editor')).toBeVisible();
  });

  test('should run default query successfully', async ({ page }) => {
    await page.goto('/tools/sqlite-studio');
    
    // Wait for WASM to initialize
    await expect(page.getByText('Initializing WASM...')).toBeHidden({ timeout: 10000 });
    
    // Click "Run Query"
    await page.getByRole('button', { name: /Run Query/ }).click();
    
    // Should see "Hello World" in the results table
    await expect(page.getByRole('cell', { name: 'Hello World' })).toBeVisible();
    await expect(page.getByText('1 rows returned')).toBeVisible();
  });

  test('should load example data and query it', async ({ page }) => {
    await page.goto('/tools/sqlite-studio');
    
    await expect(page.getByText('Initializing WASM...')).toBeHidden({ timeout: 10000 });
    
    // Click "Load Example Data"
    await page.getByRole('button', { name: 'Load Example Data' }).click();
    
    // It should automatically create the table and run a query showing active users
    // Wait for the query to finish (button becomes enabled again)
    await expect(page.getByRole('button', { name: /Run Query/ })).toBeEnabled();
    
    // We expect Alice Smith, Bob Johnson, and Diana Prince to be in the active users
    await expect(page.getByRole('cell', { name: 'Alice Smith' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Bob Johnson' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Diana Prince' })).toBeVisible();
    
    // Charlie Brown is inactive, so he shouldn't be there
    await expect(page.getByRole('cell', { name: 'Charlie Brown' })).toBeHidden();
    
    // Check if table shows up in schema list
    await expect(page.locator('span.font-mono').filter({ hasText: /^users$/ })).toBeVisible();
  });
});
