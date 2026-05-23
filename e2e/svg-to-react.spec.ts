import { test, expect } from '@playwright/test';

test.describe('SVG to React Converter', () => {
  test('should load the page and render default JSX output', async ({ page }) => {
    // Navigate to the tool
    await page.goto('/tools/svg-to-react');
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'SVG to React Converter' })).toBeVisible();
    
    // The textarea should have the default input
    const inputArea = page.locator('textarea[placeholder="Paste <svg>...</svg> here..."]');
    await expect(inputArea).toBeVisible();
    
    // The default JSX should trigger
    const outputArea = page.locator('textarea[readOnly]');
    await expect(outputArea).toHaveValue(/export const Icon = \(props: IconProps\) => \(/);
    await expect(outputArea).toHaveValue(/strokeWidth="2"/); // check camel casing
    await expect(outputArea).toHaveValue(/currentColor/); // check current color
  });

  test('should toggle React Native code generation', async ({ page }) => {
    await page.goto('/tools/svg-to-react');
    
    // Toggle React Native
    await page.getByLabel('React Native').check();
    
    const outputArea = page.locator('textarea[readOnly]');
    
    // It should import from react-native-svg
    await expect(outputArea).toHaveValue(/import \{ Svg, Path \} from "react-native-svg";/);
    await expect(outputArea).toHaveValue(/<Svg/); // Tag names should be capitalized
    await expect(outputArea).toHaveValue(/<Path/);
  });

  test('should show error for invalid SVG', async ({ page }) => {
    await page.goto('/tools/svg-to-react');
    
    const inputArea = page.locator('textarea[placeholder="Paste <svg>...</svg> here..."]');
    
    // Clear and enter invalid SVG
    await inputArea.fill('<svg><unclosed>'); 
    
    // Verify error badge appears
    await expect(page.getByText('Invalid SVG markup')).toBeVisible();
    
    // Output should be empty when invalid
    const outputArea = page.locator('textarea[readOnly]');
    await expect(outputArea).toHaveValue('');
  });

  test('should clear output when input is empty', async ({ page }) => {
    await page.goto('/tools/svg-to-react');
    
    const inputArea = page.locator('textarea[placeholder="Paste <svg>...</svg> here..."]');
    await inputArea.fill('');
    
    const outputArea = page.locator('textarea[readOnly]');
    await expect(outputArea).toHaveValue('');
  });
});
