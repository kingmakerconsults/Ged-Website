
import logging
from playwright.sync_api import Page, expect

logging.basicConfig(level=logging.INFO)

def test_math_quiz_display(page: Page):
    """
    This test verifies that the math quizzes are displayed correctly.
    """
    try:
        logging.info("Navigating to the homepage.")
        page.goto("http://localhost:8000")

        logging.info("Clicking the 'Math' button.")
        math_button = page.get_by_role("button", name="Math")
        math_button.click()

        logging.info("Checking for math quiz topics.")
        expect(page.get_by_text("Number Sense and Operations")).to_be_visible()
        expect(page.get_by_text("Data Analysis and Statistics")).to_be_visible()
        expect(page.get_by_text("Geometric Figures")).to_be_visible()
        expect(page.get_by_text("The Pythagorean Theorem")).to_be_visible()
        expect(page.get_by_text("Expressions and Equations")).to_be_visible()
        expect(page.get_by_text("Functions")).to_be_visible()

        logging.info("Taking a screenshot.")
        page.screenshot(path="jules-scratch/verification/math_quizzes.png")
        logging.info("Screenshot saved to jules-scratch/verification/math_quizzes.png")

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/verification_error.png")
        raise
