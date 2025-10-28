import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            await page.goto("http://localhost:8000/index.html")

            # In-depth profile setup to bypass all onboarding modals
            profile_data = {
                "profile": {
                    "id": "local-dev-user",
                    "name": "Jules Verne",
                    "onboardingComplete": True
                },
                "testPlan": [
                    {
                        "subject": "Math",
                        "testDate": "2025-01-01",
                        "testLocation": "Test Center",
                        "passed": False
                    }
                ],
                "challengeOptions": [
                    {
                        "id": "math-1",
                        "subject": "Math",
                        "subtopic": "Fractions",
                        "label": "Fractions are hard",
                        "selected": True
                    }
                ],
                "scores": {},
                "recentScoresDashboard": {}
            }

            # Use page.evaluate to set localStorage
            await page.evaluate(f"""
                localStorage.setItem('ged_local_profile', JSON.stringify({json.dumps(profile_data)}));
            """)

            # Reload the page for localStorage changes to take effect
            await page.reload()

            print("Successfully set up profile and reloaded page.")
            await page.wait_for_timeout(2000) # Wait for animations and content to load

            # Click the Math subject button
            math_button_selector = 'button[data-testid="subject-button-math"]'
            print(f"Waiting for selector: {math_button_selector}")
            await page.wait_for_selector(math_button_selector, timeout=15000)
            await page.click(math_button_selector)
            print("Clicked 'Math' subject button.")

            # Click the category "Quantitative Problem Solving"
            category_selector = 'button:has-text("Quantitative Problem Solving")'
            print(f"Waiting for selector: {category_selector}")
            await page.wait_for_selector(category_selector, timeout=10000)
            await page.click(category_selector)
            print("Clicked 'Quantitative Problem Solving' category.")

            # Click on the first topic to start a quiz
            topic_selector = 'button[data-testid="topic-button-math_quant_problem_solving_with_ratios_and_proportions"]'
            print(f"Waiting for selector: {topic_selector}")
            await page.wait_for_selector(topic_selector, timeout=10000)
            await page.click(topic_selector)
            print("Clicked first math topic.")

            # Wait for the quiz interface to appear
            quiz_interface_selector = 'div.quiz-panel'
            print(f"Waiting for selector: {quiz_interface_selector}")
            await page.wait_for_selector(quiz_interface_selector, timeout=10000)
            print("Quiz interface is visible.")

            # Take a screenshot to verify the math exam is running
            screenshot_path = 'jules-scratch/verification/math_exam_loaded.png'
            await page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path='jules-scratch/verification/error_screenshot.png')
            print("Error screenshot saved.")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
