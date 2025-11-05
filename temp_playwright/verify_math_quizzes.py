
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto("http://localhost:8000/frontend/index.html")
            await page.wait_for_selector("text=Math", timeout=5000)  # Wait for the Math button to appear
            await page.click("text=Math")
            await page.wait_for_selector("text=Problem Solving with Percents") # Wait for a topic to appear
            await page.screenshot(path="temp_playwright/math_topics.png")
            print("Successfully navigated to Math topics and took a screenshot.")
        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="temp_playwright/error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
