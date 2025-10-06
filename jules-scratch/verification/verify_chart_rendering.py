from playwright.sync_api import sync_playwright, expect
import time

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the local server
            page.goto("http://localhost:8000/index.html", timeout=60000)

            # --- LOGIN LOGIC ---
            expect(page.get_by_role("heading", name="Create New User")).to_be_visible(timeout=15000)
            page.get_by_placeholder("Enter your name").fill("Test User")
            page.get_by_role("button", name="Create & Login").click()

            # --- QUIZ GENERATION ---
            expect(page.get_by_role("button", name="Science")).to_be_visible(timeout=15000)
            page.get_by_role("button", name="Science").click()

            expect(page.get_by_role("button", name="Generate")).to_be_visible(timeout=15000)
            page.get_by_role("button", name="Generate").click()

            expect(page.locator("select")).to_be_visible(timeout=15000)
            page.locator("select").select_option("Chemistry Fundamentals")
            page.get_by_role("button", name="Generate Quiz").click()

            # --- MODIFIED VERIFICATION ---
            # Wait for the first question header to be visible, regardless of type.
            # This is more robust than waiting for a specific chart.
            first_question_header = page.locator("h3.text-xl.font-semibold").first

            # Wait up to 60 seconds for the quiz to generate and the first question to appear.
            expect(first_question_header).to_be_visible(timeout=60000)

            print("First question loaded. Taking screenshot...")
            page.screenshot(path="jules-scratch/verification/verification.png")
            print("Screenshot saved to jules-scratch/verification/verification.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
            print("Error screenshot saved to jules-scratch/verification/error.png")
            raise

        finally:
            browser.close()

if __name__ == "__main__":
    time.sleep(5)
    run_verification()