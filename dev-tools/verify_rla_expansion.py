import asyncio
from playwright.async_api import async_playwright, expect
import time

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            # The server is now managed externally, just need to connect.
            await page.goto("http://localhost:8000", timeout=60000)

            print("Checking for initial screen...")

            name_prompt_locator = page.locator('input[name="firstName"]')
            login_form_locator = page.locator('input[name="email"]')

            # Wait for either the name prompt OR the login form to appear
            await expect(name_prompt_locator.or_(login_form_locator)).to_be_visible(timeout=15000)

            # Conditionally handle the screen
            if await name_prompt_locator.is_visible():
                print("Name prompt found. Handling...")
                await page.fill('input[name="firstName"]', "Test")
                await page.fill('input[name="lastName"]', "User")
                await page.click('button:has-text("Save Name")')
                print("Name prompt handled.")
                await expect(login_form_locator).to_be_visible(timeout=10000)

            if await login_form_locator.is_visible():
                print("Login form found. Attempting UI login...")
                await page.fill('input[name="email"]', "Testuser123@gmail.com")
                await page.fill('input[name="password"]', "Kingmaker123")
                await page.click('button:has-text("Login")')

            await expect(page.locator("#dashboard-container")).to_be_visible(timeout=15000)
            print("Successfully logged in and loaded dashboard.")

            rla_button_selector = '[data-testid="subject-button-reasoning-through-language-arts-rla"]'
            await expect(page.locator(rla_button_selector)).to_be_visible(timeout=10000)
            await page.wait_for_timeout(1000)
            await page.locator(rla_button_selector).click()

            await expect(page.get_by_text("Reading Comprehension: Informational Texts")).to_be_visible()
            await page.screenshot(path="rla_section.png")
            print("Successfully took screenshot of the RLA section.")

        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="error_screenshot.png")
            # Re-raise the exception to ensure the script exits with a non-zero code
            raise
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
