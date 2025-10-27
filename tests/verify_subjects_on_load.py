
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("http://localhost:8000")

            # Wait for the main heading to be visible
            await expect(page.locator("h1").get_by_text("GED Practice Test")).to_be_visible(timeout=10000)

            # Check for the subject buttons
            await expect(page.locator("text=Math")).to_be_visible()
            await expect(page.locator("text=Science")).to_be_visible()
            await expect(page.locator("text=Social Studies")).to_be_visible()
            await expect(page.locator("text=Language Arts")).to_be_visible()

            # Capture a screenshot
            screenshot_path = "frontend/verify_subjects_on_load.png"
            await page.screenshot(path=screenshot_path)

            print(f"Verification successful. Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            await page.screenshot(path="frontend/verification_error.png")

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
