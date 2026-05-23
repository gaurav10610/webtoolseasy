import { test, expect } from '@playwright/test';

test.describe('JWT Debugger', () => {
  test('should load the page and render default decoded JWT', async ({ page }) => {
    await page.goto('/tools/jwt-debugger');
    
    await expect(page.getByRole('heading', { name: 'Secure JWT Debugger' })).toBeVisible();
    
    // The default JWT payload should be visible
    await expect(page.getByText('John Doe')).toBeVisible();
    
    // The default header should be visible
    await expect(page.getByText('HS256')).toBeVisible();
  });

  test('should update JWT token when payload is edited', async ({ page }) => {
    await page.goto('/tools/jwt-debugger');
    
    // The payload text area
    const payloadInput = page.getByRole('textbox').nth(2);
    
    // We will replace the default payload JSON with a new one
    await payloadInput.fill('{"sub":"1234567890","name":"Jane Smith","iat":1516239022}');
    
    // Wait a moment for React state to update the top token input
    await page.waitForTimeout(100);
    
    // The main token input should have changed.
    const tokenInput = page.getByRole('textbox').first();
    const tokenValue = await tokenInput.inputValue();
    
    // "Jane Smith" encoded payload starts with eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgU21pdGgi
    expect(tokenValue).toContain('IkphbmUgU21pdGgi'); 
  });

  test('should show error for invalid JWT string', async ({ page }) => {
    await page.goto('/tools/jwt-debugger');
    
    const tokenInput = page.getByRole('textbox').first();
    await tokenInput.fill('invalid.token'); 
    
    await expect(page.getByText('Invalid Signature/Format')).toBeVisible();
    await expect(page.getByPlaceholder('Fix token errors to view header')).toBeVisible();
  });

  test('should clear output when input is empty', async ({ page }) => {
    await page.goto('/tools/jwt-debugger');
    
    const tokenInput = page.getByRole('textbox').first();
    await tokenInput.fill('');
    
    await expect(page.getByText('Paste a JWT token here...')).toBeVisible();
  });
});
