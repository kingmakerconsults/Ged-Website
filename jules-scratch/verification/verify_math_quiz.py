
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000")

    # Click the Math subject button
    page.get_by_role("button", name="Math").click()

    # Click the "Quantitative Problem Solving" category button
    page.get_by_role("button", name="Quantitative Problem Solving").click()

    # Click the "Quiz A" button to start the quiz
    page.get_by_role("button", name="Quiz A").click()

    # Take a screenshot of the quiz interface
    page.screenshot(path="jules-scratch/verification/math_quiz_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
