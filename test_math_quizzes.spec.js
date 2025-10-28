import { test, expect } from '@playwright/test';

test('Math quizzes visual verification', async ({ page }) => {
  // Capture console logs
  page.on('console', msg => console.log(msg.text()));

  await page.goto('http://localhost:8000');
  await page.waitForLoadState('load');

  // Wait for the name prompt modal to appear and fill it out
  await page.locator('#firstName').fill('Test');
  await page.locator('#lastName').fill('User');
  await page.getByRole('button', { name: 'Save Name' }).click();

  // Navigate to the Math section
  await page.getByRole('button', { name: 'Math' }).click();

  // Take a screenshot of the math quizzes
  await page.screenshot({ path: 'math_quizzes.png' });
});
