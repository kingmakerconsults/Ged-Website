import re
from playwright.sync_api import Page, expect

def test_math_content_loads_correctly(page: Page):
    """
    This test verifies that the new math quiz content is correctly loaded
    by navigating to the page, clicking the Math subject, and checking for
    the titles of the new quizzes.
    """
    # Navigate to the local server
    page.goto("http://localhost:8000")

    # Click the button to select the "Math" subject
    math_button = page.locator("button", has_text="Math")
    expect(math_button).to_be_visible()
    math_button.click()

    # Check that the titles of the two new quizzes for the first topic are visible
    expect(page.get_by_text("GED Math: Quantitative Problem Solving Test 1")).to_be_visible()
    expect(page.get_by_text("GED Math: Quantitative Problem Solving Test 2")).to_be_visible()

    # Take a screenshot for visual verification
    page.screenshot(path="math_content_verification.png")
