import { test, expect } from '@playwright/test';

test.describe('Game Loading', () => {
  test('loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });

  test('shows game title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('shows start button in setup phase', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /start/i })).toBeVisible();
  });
});

test.describe('Gameplay', () => {
  test('clicking start begins game', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start/i }).click();
    
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible();
  });

  test('clicking game board increases score', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start/i }).click();
    
    const initialScore = await page.locator('.score').textContent();
    await page.locator('.game-board').click();
    
    const newScore = await page.locator('.score').textContent();
    expect(newScore).not.toBe(initialScore);
  });

  test('end game shows final score', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /start/i }).click();
    await page.locator('.game-board').click();
    await page.locator('.game-board').click();
    await page.getByRole('button', { name: /end/i }).click();
    
    await expect(page.getByText(/game over/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /play again/i })).toBeVisible();
  });
});

test.describe('Visual Regression', () => {
  test('setup screen matches snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300); // Let animations settle
    
    await expect(page).toHaveScreenshot('setup-screen.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});

