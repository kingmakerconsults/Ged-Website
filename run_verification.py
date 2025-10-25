from playwright.sync_api import sync_playwright

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to the page...")
            page.goto("http://localhost:8000/index.html", timeout=60000)

            # Wait for the welcome modal and click "Skip for now"
            print("Waiting for the welcome modal...")
            skip_button_selector = "button:has-text('Skip for now')"
            page.wait_for_selector(skip_button_selector, state='visible', timeout=15000)
            print("Modal is visible. Clicking 'Skip for now' button.")
            page.click(skip_button_selector)

            # Wait for the main content to be ready
            print("Waiting for main content to load...")
            page.wait_for_selector("h2:has-text('Math')", state='visible', timeout=5000)
            print("Main content loaded.")

            # Click on the Math button
            print("Clicking on the Math button...")
            page.get_by_role("heading", name="Math", exact=True).locator("xpath=..").click()

            # Click on the "Whole Numbers, Fractions & Decimals" topic
            print("Clicking on the topic button...")
            page.get_by_role("heading", name="Whole Numbers, Fractions & Decimals").click()

            # Start the quiz
            print("Starting the quiz...")
            page.get_by_role("button", name="Start Quiz").click()

            # Wait for the quiz question to be visible
            print("Waiting for the quiz question...")
            page.wait_for_selector("p.text-xl.font-semibold", timeout=10000)
            print("Quiz question is visible.")

            # Take a screenshot
            screenshot_path = "math_quiz_screenshot.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot taken: {screenshot_path}")

            print("Verification script completed successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()
