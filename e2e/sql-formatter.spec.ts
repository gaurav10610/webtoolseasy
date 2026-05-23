import { test, expect } from '@playwright/test';

test.describe('SQL Formatter & Validator', () => {
  test('should load the page and render empty state', async ({ page }) => {
    await page.goto('/tools/sql-formatter');
    
    await expect(page.getByRole('heading', { name: 'SQL Formatter & Validator' })).toBeVisible();
    
    // Output should be empty initially
    const textareas = page.locator('textarea');
    await expect(textareas.first()).toBeEmpty();
    await expect(textareas.nth(1)).toBeEmpty();
  });

  test('should format SQL query with default options', async ({ page }) => {
    await page.goto('/tools/sql-formatter');
    
    const input = page.locator('textarea').first();
    await input.fill("select id, name from users where status='active' order by id;");
    
    const output = page.locator('textarea').nth(1);
    
    // Wait for the formatter to run
    await expect(output).not.toBeEmpty();
    
    const val = await output.inputValue();
    // Default is UPPERCASE keywords and 2 spaces
    expect(val).toContain('SELECT');
    expect(val).toContain('  id');
    expect(val).toContain('FROM');
    expect(val).toContain('WHERE');
    expect(val).toContain('ORDER BY');
  });

  test('should apply lowercase formatting when option is changed', async ({ page }) => {
    await page.goto('/tools/sql-formatter');
    
    const input = page.locator('textarea').first();
    await input.fill("SELECT id, name FROM users WHERE status='active' ORDER BY id;");
    
    // Change case to lower
    await page.locator('select').nth(1).selectOption('lower');
    
    const output = page.locator('textarea').nth(1);
    
    await expect(output).not.toBeEmpty();
    
    const val = await output.inputValue();
    // It should now have lowercase keywords
    expect(val).toContain('select');
    expect(val).toContain('from');
    expect(val).toContain('where');
    expect(val).toContain('order by');
  });

  test('should show syntax error for invalid SQL', async ({ page }) => {
    await page.goto('/tools/sql-formatter');
    
    const input = page.locator('textarea').first();
    // Missing matching quote will cause a syntax error
    await input.fill("SELECT * FROM users WHERE name = 'John");
    
    // Expect error alert to appear
    await expect(page.locator('div.text-red-300')).toBeVisible();
  });
});
