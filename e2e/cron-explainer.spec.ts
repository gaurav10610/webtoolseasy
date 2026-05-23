import { test, expect } from '@playwright/test';

test.describe('Cron Explorer', () => {
  test('should load the page and render default cron translation', async ({ page }) => {
    // Navigate to the tool
    await page.goto('/tools/cron-explainer');
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'Visual Cron Explorer' })).toBeVisible();
    
    // The input should have the default cron
    const inputArea = page.locator('input[type="text"]').first();
    await expect(inputArea).toBeVisible();
    await expect(inputArea).toHaveValue('*/15 0 1,15 * 1-5');
    
    // It should translate it to English
    await expect(page.getByText('"Every 15 minutes, between 00:00 and 00:59, on day 1 and 15 of the month, Monday through Friday"')).toBeVisible();
    
    // Next execution dates should be shown
    await expect(page.getByText('Next Scheduled Runs')).toBeVisible();
  });

  test('should update when interactive builder is used', async ({ page }) => {
    await page.goto('/tools/cron-explainer');
    
    // Find the minute input in the builder
    const minuteInput = page.getByRole('textbox').nth(1); // the first one is the main cron str
    
    await minuteInput.fill('30');
    
    // The main string should update
    const mainInput = page.locator('input[type="text"]').first();
    await expect(mainInput).toHaveValue('30 0 1,15 * 1-5');
    
    // The translation should update
    await expect(page.getByText('"At 00:30, on day 1 and 15 of the month, Monday through Friday"')).toBeVisible();
  });

  test('should show error for invalid cron string', async ({ page }) => {
    await page.goto('/tools/cron-explainer');
    
    const mainInput = page.locator('input[type="text"]').first();
    
    // Enter invalid cron
    await mainInput.fill('invalid cron string'); 
    
    // Verify error badge appears
    await expect(page.getByText('Invalid Syntax')).toBeVisible();
    
    // UI should tell user to fix
    await expect(page.getByText('Fix the syntax errors to view the schedule.')).toBeVisible();
  });

  test('should clear output when input is empty', async ({ page }) => {
    await page.goto('/tools/cron-explainer');
    
    const mainInput = page.locator('input[type="text"]').first();
    await mainInput.fill('');
    
    await expect(page.getByText('Enter a cron expression to see when it runs next.')).toBeVisible();
  });
});
