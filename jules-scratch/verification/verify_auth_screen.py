from playwright.sync_api import sync_playwright, expect, Page
import time

def verify_auth_flow(page: Page):
    """
    This test verifies two things:
    1. The Google Sign-In button renders correctly, testing the race condition fix.
    2. The "Set Your Name" modal appears for a "new" user using a test backdoor.
    """
    try:
        # 1. Verify Sign-In Button Rendering
        print("Navigating to the page...")
        page.goto("http://localhost:8000/index.html", timeout=20000)

        print("Waiting for the 'Welcome!' heading...")
        expect(page.get_by_role("heading", name="Welcome!")).to_be_visible(timeout=10000)

        print("Waiting for the Google Sign-In button iframe...")
        google_button_iframe = page.frame_locator('iframe[title="Sign in with Google"]')
        google_button = google_button_iframe.get_by_role("button", name="Sign in with Google")

        print("Expecting the Google Sign-In button to be visible...")
        expect(google_button).to_be_visible(timeout=15000)
        print("Verification Part 1 successful: Google Sign-In button rendered.")

        # 2. Verify Name Prompt Modal
        print("Simulating login to trigger modal...")
        # Simulate a login by calling the handleLogin function in the browser context
        user_object = {
            "id": "12345",
            "name": "Jane Doe",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ-9z8X6Y-pE9e-Xg=s96-c"
        }
        token = 'fake_token_for_testing'
        page.evaluate(f"window.handleLogin({str(user_object)}, '{token}')")

        # Now, use the test backdoor to show the name prompt modal
        print("Using test backdoor to show name prompt...")
        page.evaluate("window.test_setShowNamePrompt(true)")

        # Add a small delay to ensure the modal has time to render after state change
        time.sleep(1)

        print("Checking for modal visibility...")
        modal_heading = page.get_by_role("heading", name="Welcome! Let's set up your name.")
        expect(modal_heading).to_be_visible(timeout=5000)

        print("Verifying modal content...")
        expect(page.get_by_label("First Name")).to_have_value("Jane")
        expect(page.get_by_label("Last Name")).to_have_value("Doe")

        print("Verification Part 2 successful: Name prompt modal appeared correctly.")

        # Take a screenshot of the modal.
        page.screenshot(path="jules-scratch/verification/final_verification.png")
        print("Verification complete. Screenshot taken.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/verification_error.png")
        raise

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    verify_auth_flow(page)
    browser.close()