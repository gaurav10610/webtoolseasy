import { test, expect } from '@playwright/test';

test.describe('API Tester', () => {
  test('should load the page and render empty state', async ({ page }) => {
    await page.goto('/tools/api-tester');
    
    await expect(page.getByRole('heading', { name: 'API & Network Sandbox' })).toBeVisible();
    await expect(page.getByText('Enter a URL and click Send to get a response.')).toBeVisible();
  });

  test('should execute GET request and display response', async ({ page }) => {
    // Intercept the request to mock the response
    await page.route('https://jsonplaceholder.typicode.com/todos/1', async route => {
      expect(route.request().method()).toBe('GET');
      expect(route.request().headers()['accept']).toBe('application/json');
      
      const json = {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false
      };
      await route.fulfill({ json, status: 200, headers: { 'content-type': 'application/json' } });
    });

    await page.goto('/tools/api-tester');
    
    // Click Send
    await page.getByRole('button', { name: 'Send' }).click();
    
    // Wait for response to appear
    await expect(page.getByText('200 OK')).toBeVisible();
    await expect(page.getByText('Size:')).toBeVisible();
    
    // The Monaco editor should contain the formatted JSON response
    const editorText = page.locator('.view-lines');
    await expect(editorText).toContainText('delectus aut autem');
  });

  test('should execute POST request with body', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/todos/1', async route => {
      expect(route.request().method()).toBe('POST');
      const postData = route.request().postDataJSON();
      // Our default editor value is "{\n  \n}"
      expect(postData).toEqual({});
      
      await route.fulfill({ status: 201, json: { id: 101 } });
    });

    await page.goto('/tools/api-tester');
    
    // Change method to POST
    await page.locator('select').selectOption('POST');
    
    // Click Send
    await page.getByRole('button', { name: 'Send' }).click();
    
    // Wait for response to appear
    await expect(page.getByText('201 Created')).toBeVisible();
  });

  test('should handle network errors and CORS gracefully', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/todos/1', async route => {
      await route.abort('failed');
    });

    await page.goto('/tools/api-tester');
    
    await page.getByRole('button', { name: 'Send' }).click();
    
    // Should show error banner
    await expect(page.getByText('ERROR')).toBeVisible();
    await expect(page.getByText(/Failed to fetch/)).toBeVisible();
  });
});
