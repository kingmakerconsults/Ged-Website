from playwright.sync_api import sync_playwright, Page, expect
import re

def test_new_essay_topics(page: Page):
    """
    This test verifies that the newly added essay topics are present in the
    Interactive Essay Guide.
    """
    # 1. Arrange: Go to the application homepage.
    page.goto("http://localhost:8000/index.html")

    # Log in
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()

    # 2. Act: Navigate to the Essay Guide.
    page.get_by_role("button", name=re.compile("Reasoning Through Language Arts")).click()
    page.get_by_role("button", name="Writing Skills: The Extended Response").click()
    page.get_by_role("button", name="Open").click()

    # 3. Assert: Check for the new topics in the dropdown.
    dropdown = page.locator("#topic-selector")

    # Check that all new topics are present
    expect(dropdown).to_contain_text("Is Universal Basic Income (UBI) a Viable Solution to Poverty?")
    expect(dropdown).to_contain_text("Should Governments Aggressively Subsidize Renewable Energy?")
    expect(dropdown).to_contain_text("Does Social Media Do More Harm Than Good for Teen Mental Health?")

    # Select one of the new topics to confirm it loads
    dropdown.select_option(label="Does Social Media Do More Harm Than Good for Teen Mental Health?")

    # Verify that the passage titles have updated correctly
    expect(page.get_by_role("heading", name="U.S. Surgeon General's Advisory (Harmful)")).to_be_visible()
    expect(page.get_by_role("heading", name="Youth Mental Health Council (Beneficial)")).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/essay_topics_verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_new_essay_topics(page)
        browser.close()

if __name__ == "__main__":
    main()