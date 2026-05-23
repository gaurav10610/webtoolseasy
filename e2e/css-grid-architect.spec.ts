import { test, expect } from '@playwright/test';

test.describe('CSS Grid Architect', () => {
  test('should load the page and render default 3x3 grid', async ({ page }) => {
    // Navigate to the tool
    await page.goto('/tools/css-grid-architect');
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'CSS Grid Architect' })).toBeVisible();
    
    // The visual canvas should contain exactly 9 blocks (3x3)
    await expect(page.getByText(/^9$/)).toBeVisible();
    
    // The generated pure CSS should be visible
    await expect(page.getByText('grid-template-columns: repeat(3, 1fr);')).toBeVisible();
    await expect(page.getByText('grid-template-rows: repeat(3, 1fr);')).toBeVisible();
    
    // The generated Tailwind should be visible
    await expect(page.getByText('className="grid grid-cols-3 gap-x-[16px] gap-y-[16px]"')).toBeVisible();
  });

  test('should update grid when controls are changed', async ({ page }) => {
    await page.goto('/tools/css-grid-architect');
    
    // Change columns slider to 4
    const columnsSlider = page.locator('input[type="range"]').nth(0);
    await columnsSlider.fill('4');
    
    // Change rows slider to 2
    const rowsSlider = page.locator('input[type="range"]').nth(1);
    await rowsSlider.fill('2');
    
    // The grid should now have 4x2 = 8 items
    await expect(page.getByText(/^8$/)).toBeVisible();
    await expect(page.getByText(/^9$/)).not.toBeVisible();
    
    // Pure CSS code block should update
    await expect(page.getByText('grid-template-columns: repeat(4, 1fr);')).toBeVisible();
    await expect(page.getByText('grid-template-rows: repeat(2, 1fr);')).toBeVisible();
    
    // Tailwind code block should update
    await expect(page.getByText('className="grid grid-cols-4')).toBeVisible();
  });

  test('should update gaps when controls are changed', async ({ page }) => {
    await page.goto('/tools/css-grid-architect');
    
    // Change column gap to 32px
    const colGapSlider = page.locator('input[type="range"]').nth(2);
    await colGapSlider.fill('32');
    
    // Pure CSS code block should update
    await expect(page.getByText('column-gap: 32px;')).toBeVisible();
    
    // Tailwind code block should update
    await expect(page.getByText('gap-x-[32px]')).toBeVisible();
  });
});
