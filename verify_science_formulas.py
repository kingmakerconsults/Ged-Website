
import asyncio
import json
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            # Go to the page first
            await page.goto("http://localhost:8000/index.html", wait_until="networkidle")

            # Use page.evaluate to perform a login using the new test endpoint
            # This is more robust than trying to manually set localStorage from the test script
            login_success = await page.evaluate('''async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/test-login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: 'test-playwright@example.com', organizationId: 1 }),
                    });
                    if (!response.ok) {
                        console.error('Failed to login for test:', response.statusText);
                        return false;
                    }
                    const { token, user } = await response.json();
                    localStorage.setItem('appUser', JSON.stringify(user));
                    localStorage.setItem('appToken', token);
                    localStorage.setItem('customNameSet_' + user.id, 'true');
                    return true;
                } catch (error) {
                    console.error('Error during test login:', error);
                    return false;
                }
            }''')

            if not login_success:
                raise Exception("Failed to execute login script in browser.")

            # Reload the page to apply the authentication state
            await page.reload(wait_until="networkidle")

            # Add a small delay to ensure the UI has updated after reload
            await page.wait_for_timeout(1000)

            # Look for a "Get Started" button in a modal and click it if it exists
            get_started_button = page.locator("button:has-text('Get Started')")
            if await get_started_button.count() > 0:
                print("Modal detected, attempting to close.")
                await get_started_button.click()
                await page.wait_for_timeout(500) # Wait for modal to disappear

            # Proceed with the test
            await page.click("button:has-text('Science')")

            # Wait for the view to transition after clicking the subject
            await page.wait_for_timeout(500)

            # Click the button to show the formula sheet
            formula_sheet_button = page.locator("button:has-text('View Science Formula Sheet')")
            await formula_sheet_button.wait_for(timeout=5000)
            await formula_sheet_button.click()

            # After clicking, wait for the formula card content to appear
            await page.wait_for_selector("p:has-text('Density')", timeout=5000)

            # Give a moment for any animations to settle
            await page.wait_for_timeout(500)

            await page.screenshot(path="science_formulas.png")
            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="error_after_login_endpoint.png")
        finally:
            await browser.close()

asyncio.run(main())
