from playwright.sync_api import sync_playwright, Page, expect
import json

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Set up a dummy user for localStorage to bypass login
        dummy_user = {
            "id": "12345",
            "name": "Test User",
            "email": "test@example.com",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ-9zX3QQ_x_e-b-g_a_A-s_a_A-s_a_A-s_a_A-s_a_A=s96-c"
        }
        dummy_token = "dummy_token"

        # Go to the page first to have a domain to set localStorage on
        page.goto("http://localhost:8000/index.html")

        # Use page.evaluate to set items in localStorage
        page.evaluate(f"""
            localStorage.setItem('appUser', '{json.dumps(dummy_user)}');
            localStorage.setItem('appToken', '{dummy_token}');
            localStorage.setItem('customNameSet_12345', 'true');
        """)

        # Reload the page to apply the logged-in state
        page.reload()

        # Wait for the main content to be visible by checking for the welcome message
        expect(page.get_by_role("heading", name="Welcome, Test User!")).to_be_visible()

        # Click the "Math" subject button, using exact=True to resolve ambiguity
        page.get_by_role("button", name="Math", exact=True).click()

        # Click the "Whole Numbers, Fractions & Decimals" topic button
        page.get_by_role("button", name="Whole Numbers, Fractions & Decimals").click()

        # Click the "Start Quiz" button
        page.get_by_role("button", name="Start Quiz").click()

        # Wait for the quiz to load and take a screenshot of the first question
        expect(page.locator("h3")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/mathtext_verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)