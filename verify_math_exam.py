import asyncio
from playwright.async_api import async_playwright
import os
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            # Navigate to the local server
            await page.goto("http://localhost:8000", timeout=30000)

            # The page automatically sets a dummy user on localhost.
            # We just need to provide a complete profile for that user to bypass onboarding.
            user_profile = {
                "profile": {
                    "id": "local-dev-user",
                    "name": "Dev User",
                    "onboardingComplete": True,
                },
                "testPlan": [
                    {"subject": "Math", "testDate": "2025-12-01", "passed": False}
                ],
                "challengeOptions": [
                    {"id": "math-1", "selected": True}
                ]
            }

            # Set the local profile for the dummy user
            await page.evaluate(f"""() => {{
                localStorage.setItem('ged_local_profile', JSON.stringify({json.dumps(user_profile)}));
            }}""")

            # Reload the page to make the app use the profile
            await page.reload(wait_until="domcontentloaded")

            # Wait for the splash screen to appear and then disappear.
            try:
                await page.wait_for_selector("text=Welcome, Dev User!", timeout=5000)
                print("Splash screen found.")
                await page.wait_for_timeout(3500) # Wait for it to fade
            except Exception:
                print("Splash screen did not appear, continuing...")


            # Now, we should be on the dashboard. Proceed with verification.
            await page.wait_for_selector("h1:text('Welcome, Dev User!')", timeout=10000)
            print("Dashboard loaded.")

            # Click on the Math subject card
            await page.click('[data-testid="subject-button-math"]')
            print("Clicked Math subject.")

            # Wait for the category view to appear and click the category
            await page.wait_for_selector("h2:text('Quantitative Problem Solving')", timeout=5000)
            print("Math categories loaded.")
            await page.click("button:has-text('Quantitative Problem Solving')")
            print("Clicked Quantitative Problem Solving category.")

            # Wait for the topic view to appear
            await page.wait_for_selector("h2:text('Quantitative Problem Solving')", timeout=5000)
            await page.wait_for_selector("h3:text('Problem Solving with Ratios and Proportions')", timeout=5000)
            print("Topics for category loaded.")

            # Take a screenshot of the topics list
            screenshot_path = "frontend_verification_math_topics.png"
            await page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            await page.screenshot(path="error_screenshot.png")
            print("Error screenshot saved to error_screenshot.png")
            # Re-raise the exception to fail the script
            raise
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
