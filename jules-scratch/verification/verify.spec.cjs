const { test, expect } = require('@playwright/test');

test('Verify new math exams are loaded', async ({ page }) => {
  // Navigate to the root of the server
  await page.goto('http://localhost:8000/');

  // Click on the Math subject button
  await page.click('button[data-testid="subject-button-math"]');

  // Wait for the math categories to be visible
  await page.waitForSelector('text="Number Sense and Operations"');

  // Click on a category to see the new exams
  await page.click('text="Number Sense and Operations"');

  // Verify that the new exams are present
  await page.waitForSelector('text="Math Exam: Number Sense and Operations 1"');
  await page.waitForSelector('text="Math Exam: Number Sense and Operations 2"');

  // Take a screenshot to visually confirm the changes
  await page.screenshot({ path: 'jules-scratch/verification/screenshot.png' });
});
