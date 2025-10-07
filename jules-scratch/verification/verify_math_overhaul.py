from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies the complete math section overhaul.
    """
    # 1. Navigate to the app and log in
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Test User")
    page.get_by_role("button", name="Create & Login").click()
    expect(page.get_by_text("Welcome, Test User!")).to_be_visible()

    # 2. Verify Part 1: New Math Content Structure
    page.get_by_role("button", name="Math").click()
    expect(page.get_by_text("Quantitative Problem Solving")).to_be_visible()
    expect(page.get_by_text("Algebraic Problem Solving")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/01_math_categories.png")

    # 3. Verify Part 3: Interactive Graphing Question
    page.get_by_role("button", name="Algebraic Problem Solving").click()

    # Locate the correct topic container and click the "Start Quiz" button within it
    graphing_topic_container = page.locator(".border:has-text('Graphing Equations')")
    graphing_start_button = graphing_topic_container.get_by_role("button", name="Start Quiz")
    expect(graphing_start_button).to_be_visible()
    graphing_start_button.click()

    # Check that the graphing tool is rendered instead of multiple choice
    expect(page.get_by_text("Graph the two linear equations")).to_be_visible()
    expect(page.locator("#graphing-tool-board")).to_be_visible()
    expect(page.get_by_label("Enter your answer:")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/02_graphing_question.png")

    # 4. Verify Part 4: Interactive Geometry Tool
    # Go back home. The "Back" button in the quiz runner returns to the main dashboard.
    page.locator("header:has-text('Graphing Equations')").get_by_role("button", name="Back").click()

    # Navigate to simulations from the main dashboard
    page.get_by_role("button", name="Simulations").click()
    expect(page.get_by_text("Interactive Labs")).to_be_visible()
    page.get_by_role("button", name="Interactive Labs").click()

    # Click the new tool
    geometry_tool_container = page.locator(".border:has-text('Interactive Geometry Tool')")
    geometry_open_button = geometry_tool_container.get_by_role("button", name="Open")
    expect(geometry_open_button).to_be_visible()
    geometry_open_button.click()

    # Verify the tool loaded
    expect(page.get_by_text("Real-Time Calculations")).to_be_visible()
    expect(page.locator("canvas")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/03_geometry_tool.png")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()