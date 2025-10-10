from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the local server
    page.goto("http://localhost:8000/index.html")

    # Log in
    page.get_by_placeholder("Enter your name").click()
    page.get_by_placeholder("Enter your name").fill("TestUser")
    page.get_by_role("button", name="Create & Login").click()

    # Wait for the main screen to be visible after login
    # Use exact=True to disambiguate from the progress bar button
    math_button = page.get_by_role("button", name="Math", exact=True)
    expect(math_button).to_be_visible()

    # Click on the Math subject
    math_button.click()

    # Wait for the category to be visible
    qps_button = page.get_by_role("button", name="Quantitative Problem Solving")
    expect(qps_button).to_be_visible()

    # Click on the Quantitative Problem Solving category
    qps_button.click()

    # Wait for the topics to be visible
    expect(page.get_by_role("button", name="Start Quiz").first).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/math_quizzes.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)