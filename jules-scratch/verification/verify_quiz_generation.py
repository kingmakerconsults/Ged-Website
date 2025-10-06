from playwright.sync_api import sync_playwright, expect
import time

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the local server
        page.goto("http://localhost:8000/index.html", timeout=60000)

        # 1. Create a new user and log in
        page.locator('input[placeholder="Enter your name"]').fill("TestUser")
        page.get_by_role("button", name="Create & Login").click()

        # 2. Wait for main screen and click "Social Studies"
        # The h2 is inside the button, so we locate the button containing the h2
        social_studies_button = page.locator('button:has(h2:has-text("Social Studies"))')
        expect(social_studies_button).to_be_visible(timeout=30000)
        social_studies_button.click()

        # 3. Click the "Generate" button for AI quiz
        # This button is inside a div with a specific h3
        generate_button = page.locator('div:has(h3:has-text("Smith a Quiz"))').get_by_role("button", name="Generate")
        expect(generate_button).to_be_visible(timeout=30000)
        generate_button.click()

        # 4. In the AI generator, select a topic
        topic_selector = page.locator('select')
        expect(topic_selector).to_be_visible(timeout=30000)
        # Choosing a topic that is likely to have charts to verify the new HTML table feature
        topic_selector.select_option('Map & Data Skills')

        # 5. Click "Generate Quiz" and wait for the quiz to load
        page.get_by_role("button", name="Generate Quiz").click()

        # Wait for the quiz to load, specifically for the first question container.
        # Increased timeout because AI generation can be slow.
        first_question_container = page.locator('.question-container')
        expect(first_question_container).to_be_visible(timeout=90000)

        # 6. Take a screenshot of the first question
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Take a screenshot even if it fails to see the state
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        # Clean up
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)