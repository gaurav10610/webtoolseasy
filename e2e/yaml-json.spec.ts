import { test, expect } from '@playwright/test';

test.describe('YAML-JSON Converter', () => {
  test('should load the page and render empty state', async ({ page }) => {
    await page.goto('/tools/yaml-json-converter');
    
    await expect(page.getByRole('heading', { name: 'YAML ⇄ JSON Converter' })).toBeVisible();
    
    const textareas = page.locator('textarea');
    await expect(textareas.first()).toBeEmpty();
    await expect(textareas.nth(1)).toBeEmpty();
  });

  test('should auto-detect and convert JSON to YAML', async ({ page }) => {
    await page.goto('/tools/yaml-json-converter');
    
    // Default is YAML to JSON
    // We paste JSON, it should auto-detect and switch to JSON-to-YAML
    const input = page.locator('textarea').first();
    await input.fill('{"test": 123}');
    
    const output = page.locator('textarea').nth(1);
    await expect(output).not.toBeEmpty();
    
    const val = await output.inputValue();
    expect(val).toContain('test: 123');
    
    // Check if the headers swapped
    await expect(page.getByText('Input JSON')).toBeVisible();
    await expect(page.getByText('Output YAML')).toBeVisible();
  });

  test('should auto-detect and convert YAML to JSON', async ({ page }) => {
    await page.goto('/tools/yaml-json-converter');
    
    // First, toggle to JSON to YAML mode
    await page.getByLabel('Toggle Direction').click();
    
    // Now we paste YAML
    const input = page.locator('textarea').first();
    await input.fill('test: 123');
    
    const output = page.locator('textarea').nth(1);
    await expect(output).not.toBeEmpty();
    
    const val = await output.inputValue();
    expect(val).toContain('"test": 123');
    
    // Check if headers swapped back
    await expect(page.getByText('Input YAML')).toBeVisible();
    await expect(page.getByText('Output JSON')).toBeVisible();
  });

  test('should swap input and output when toggle button is clicked', async ({ page }) => {
    await page.goto('/tools/yaml-json-converter');
    
    const input = page.locator('textarea').first();
    await input.fill('test: 123');
    
    const output = page.locator('textarea').nth(1);
    await expect(output).not.toBeEmpty();
    const yamlToJsonVal = await output.inputValue();
    
    // Disable auto detect for predictability when toggling
    await page.getByLabel('Auto-Detect Input').uncheck();
    
    // Click toggle button
    await page.getByLabel('Toggle Direction').click();
    
    // Input should now have the JSON value
    const val = await input.inputValue();
    expect(val).toEqual(yamlToJsonVal);
  });
});
