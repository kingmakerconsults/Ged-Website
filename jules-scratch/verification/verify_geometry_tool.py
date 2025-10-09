from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the app
        page.goto("http://localhost:8000/index.html")

        # Log in
        page.get_by_placeholder("Enter your name").fill("Jules")
        page.get_by_role("button", name="Create & Login").click()

        # Navigate to Math categories
        page.get_by_role("button", name="Math", exact=True).click()

        # Click the Geometry category button
        page.locator("button:has(h3:has-text('Geometry'))").click()

        # Find the specific "Open" button for the Geometry Practice Tool
        tool_container = page.locator("div:has-text('Geometry Practice Tool')")
        tool_container.get_by_role("button", name="Open").click()

        # Wait for the tool to load
        expect(page.get_by_role("heading", name="Geometry Practice Tool")).to_be_visible()

        # Add a delay to allow the fade-in animation to complete
        page.wait_for_timeout(1000) # 1 second delay

        # Take the screenshot
        page.screenshot(path="jules-scratch/verification/geometry_tool.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)