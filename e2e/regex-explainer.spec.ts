import { test, expect } from '@playwright/test';

test.describe('Regex Explainer', () => {
  test('should load the page and render default AST and matches', async ({ page }) => {
    // Navigate to the tool
    await page.goto('/tools/regex-explainer');
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'Visual Regex Explainer' })).toBeVisible();
    
    // The AST pane should have parsed the default domain regex
    await expect(page.getByText('Regular Expression with flags: im')).toBeVisible();
    await expect(page.getByText('Matches the beginning of the string')).toBeVisible();
    await expect(page.getByText('Captures the matched sub-expression (Group 1 / <domain>)')).toBeVisible();
    
    // The Match Results pane should have found the matches (there are 3 valid domains in the default test string)
    await expect(page.getByText('3 match(es)')).toBeVisible();
    await expect(page.getByText('example.com').first()).toBeVisible(); // highlighted match
    // Group extractions should be displayed
    await expect(page.getByText('domain:').first()).toBeVisible();
  });

  test('should update AST and matches when regex changes', async ({ page }) => {
    await page.goto('/tools/regex-explainer');
    
    const regexInput = page.locator('input[type="text"]');
    await regexInput.fill('/\\d+/g'); // match numbers
    
    const testInput = page.locator('textarea[placeholder="Enter test text here..."]');
    await testInput.fill('There are 42 cats and 123 dogs');
    
    // Check AST update
    await expect(page.getByText('Matches any digit (0-9)')).toBeVisible();
    
    // Check matches update
    await expect(page.getByText('2 match(es)')).toBeVisible();
    // Use .last() or exact to avoid finding it in the textarea value
    await expect(page.locator('span.bg-pink-500\\/20', { hasText: '42' })).toBeVisible();
    await expect(page.locator('span.bg-pink-500\\/20', { hasText: '123' })).toBeVisible();
  });

  test('should show error for invalid regex', async ({ page }) => {
    await page.goto('/tools/regex-explainer');
    
    const regexInput = page.locator('input[type="text"]');
    await regexInput.fill('/(unclosed/'); 
    
    // AST should tell user to fix error
    await expect(page.getByText('Fix syntax errors to view AST')).toBeVisible();
  });

  test('should clear AST when input is empty', async ({ page }) => {
    await page.goto('/tools/regex-explainer');
    
    const regexInput = page.locator('input[type="text"]');
    await regexInput.fill('');
    
    await expect(page.getByText('Enter a regex to see explanation')).toBeVisible();
  });
});
