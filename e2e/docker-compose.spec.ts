import { test, expect } from '@playwright/test';

test.describe('Docker Compose Architect', () => {
  test('should load the page and render empty state', async ({ page }) => {
    await page.goto('/tools/docker-compose');
    
    await expect(page.getByRole('heading', { name: 'Docker Compose Architect' })).toBeVisible();
    await expect(page.getByText('No Service Selected')).toBeVisible();
    
    const textarea = page.locator('textarea');
    await expect(textarea).toHaveValue('# Add services to generate docker-compose.yml\n');
  });

  test('should add Postgres template and generate YAML', async ({ page }) => {
    await page.goto('/tools/docker-compose');
    
    await page.getByRole('button', { name: 'PostgreSQL' }).click();
    
    // The service should be selected and show config
    const nameInput = page.locator('input[type="text"]').first();
    await expect(nameInput).toHaveValue(/^postgres_[a-z0-9]+$/);
    
    // Check ports are prepopulated
    const portInputs = page.locator('input[placeholder="Host"]').first();
    await expect(portInputs).toHaveValue('5432');
    
    // Check YAML output
    const textarea = page.locator('textarea');
    await expect(textarea).toContainText('image: postgres:15-alpine');
    await expect(textarea).toContainText('- 5432:5432');
    await expect(textarea).toContainText('POSTGRES_USER: myuser');
  });

  test('should add multiple services and dependencies', async ({ page }) => {
    await page.goto('/tools/docker-compose');
    
    // Add Node and Redis
    await page.getByRole('button', { name: 'Node.js' }).click();
    await page.getByRole('button', { name: 'Redis' }).click();
    
    // Redis is active, click to make Node active
    // Target the span containing the exact name
    await page.locator('span').filter({ hasText: /^api_[a-z0-9]+$/ }).click();
    
    // Click depends_on for redis
    // The button will have the text of the redis service name (e.g. redis_xxxx)
    const redisButton = page.getByRole('button', { name: /^redis_[a-z0-9]+$/ });
    await redisButton.click();
    
    // Check YAML output for depends_on
    const textarea = page.locator('textarea');
    await expect(textarea).toContainText('depends_on:');
  });
});
