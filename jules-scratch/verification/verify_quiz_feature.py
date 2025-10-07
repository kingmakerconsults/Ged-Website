from playwright.sync_api import sync_playwright, expect
import re

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the application
        page.goto("http://localhost:8000/index.html", timeout=60000)

        # 1a. Login as a test user
        page.get_by_placeholder("Enter your name").fill("TestUser")
        page.get_by_role("button", name="Create & Login").click()
        expect(page.get_by_text("Welcome back! Please select a subject to begin.")).to_be_visible()

        # 2. Click on a Subject to reveal the category options
        page.get_by_role("button", name="Science").click()
        expect(page.get_by_text("Life Science")).to_be_visible() # Wait for next screen to load

        # 3. Click the "Smith a Quiz" button to open the AI Quiz Generator
        # This button is now visible after selecting a subject.
        page.get_by_role("button", name="Generate", exact=True).click()
        expect(page.get_by_text("Create a New Quiz")).to_be_visible()

        # 4. Select a topic - let's use "Life Science"
        page.locator("select").select_option("Life Science Basics")

        # 5. Click the "Generate Quiz" button
        page.get_by_role("button", name="Generate Quiz").click()

        # 6. Assert: Wait for the quiz to load and verify the title appears
        # The quiz runner shows a title like "AI-Generated Quiz: ..."
        quiz_title_locator = page.get_by_role("heading", name=re.compile("AI-Generated Quiz:"))
        expect(quiz_title_locator).to_be_visible(timeout=90000) # Increased timeout for AI generation

        # 7. Assert: Verify the first question is rendered
        first_question_locator = page.locator(".question-container").first
        expect(first_question_locator).to_be_visible(timeout=10000)
        expect(first_question_locator.get_by_text("Question 1 of 15")).to_be_visible()

        # 8. Screenshot the result
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        # Cleanup
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)