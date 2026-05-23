import { test, expect } from '@playwright/test';

test.describe('ID Generator & Decoder', () => {
  test('should load the page and generate default 10 UUIDv4s', async ({ page }) => {
    await page.goto('/tools/id-generator');
    
    await expect(page.getByRole('heading', { name: 'Advanced ID Generator' })).toBeVisible();
    
    // Quantity label should show 10
    await expect(page.getByText('Quantity10')).toBeVisible();
    
    // Output should contain 10 lines of UUIDv4s (roughly 36 chars each)
    const textarea = page.locator('textarea');
    // Wait until textarea has some value
    await expect(textarea).not.toBeEmpty({ timeout: 10000 });
    const val = await textarea.inputValue();
    const lines = val.trim().split('\n');
    expect(lines.length).toBe(10);
    expect(lines[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('should generate UUIDv7 when tab is clicked', async ({ page }) => {
    await page.goto('/tools/id-generator');
    
    // Clear the textarea to ensure we wait for new values
    const textarea = page.locator('textarea');
    await expect(textarea).not.toBeEmpty({ timeout: 10000 });
    const initialVal = await textarea.inputValue();
    
    await page.getByRole('button', { name: 'UUID v7' }).click();
    await page.getByRole('button', { name: 'Generate 10 IDs' }).click();
    
    // Wait until textarea value changes from initial
    await expect(textarea).not.toHaveValue(initialVal, { timeout: 10000 });
    
    const val = await textarea.inputValue();
    const lines = val.trim().split('\n');
    expect(lines.length).toBe(10);
    // v7 regex (7th char of 3rd group is 7)
    expect(lines[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('should extract timestamp from ULID', async ({ page }) => {
    await page.goto('/tools/id-generator');
    
    const input = page.locator('input[type="text"]');
    await input.fill('01HBCS3Z93W4J591GFV6G8Z0C2');
    
    await expect(page.locator('div.text-teal-300.font-bold', { hasText: 'ULID' })).toBeVisible();
    await expect(page.locator('div.text-teal-300.font-mono')).toHaveText(/^\d{13}$/);
  });

  test('should extract timestamp from UUIDv7', async ({ page }) => {
    await page.goto('/tools/id-generator');
    
    const input = page.locator('input[type="text"]');
    await input.fill('018ade12-d98c-76e9-b50a-f0f8c0576394');
    
    await expect(page.locator('div.text-teal-300.font-bold', { hasText: 'UUIDv7' })).toBeVisible();
    await expect(page.locator('div.text-teal-300.font-mono')).toHaveText(/^\d{13}$/);
  });

  test('should show no timestamp found for UUIDv4', async ({ page }) => {

    await page.goto('/tools/id-generator');
    
    const input = page.locator('input[type="text"]');
    // A known UUIDv4
    await input.fill('339ecbd4-e1b1-41fb-9964-b81605335bdf');
    
    await expect(page.getByText('No Timestamp Found')).toBeVisible();
  });
});
