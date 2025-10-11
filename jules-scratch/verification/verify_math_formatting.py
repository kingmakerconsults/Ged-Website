from playwright.sync_api import sync_playwright, Page, expect
import json

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Go to the page first to have a document context
        page.goto("http://localhost:8000/index.html")

        # Use page.evaluate to set items in localStorage
        # This simulates a logged-in user who has already set their name
        dummy_user = {
            "id": "testuser123",
            "name": "Test User",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ_3_LqS3u-t9_g_jGkXGq-Y2k-a9Z_JkQj_Xg=s96-c"
        }
        page.evaluate(f"""() => {{
            localStorage.setItem('appUser', '{json.dumps(dummy_user)}');
            localStorage.setItem('appToken', 'dummy-test-token');
            localStorage.setItem('customNameSet_testuser123', 'true');
        }}""")

        # Reload the page for localStorage changes to take effect on app load
        page.reload()

        # Wait for the main screen to appear, confirming login bypass was successful
        page.wait_for_selector("text=Welcome, Test User!")

        # Click on the Math subject
        page.get_by_role("button", name="Math", exact=True).click()

        # Click on the 'Quantitative Problem Solving' category
        page.get_by_role("button", name="Quantitative Problem Solving").click()

        # Click on the 'Whole Numbers, Fractions & Decimals' topic
        page.get_by_role("button", name="Start Quiz").first.click()

        # Give the app a moment to transition
        page.wait_for_timeout(2000)

        # Print the page content for debugging
        print(page.content())

        # Wait for a stable element in the QuizRunner component
        page.wait_for_selector("button:has-text('Back')")

        # Add a short delay to ensure the KaTeX rendering is complete
        page.wait_for_timeout(1000)

        # Take a screenshot to verify the math formatting
        page.screenshot(path="jules-scratch/verification/math_formatting.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)