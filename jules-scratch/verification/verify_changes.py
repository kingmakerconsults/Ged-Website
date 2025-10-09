from playwright.sync_api import sync_playwright, expect

def verify_frontend_changes(page):
    """
    This script verifies two features:
    1. The fraction rendering fix in the Formula Sheet.
    2. The new Geometry Stimulus Generator tool.
    """
    # Navigate to the app
    page.goto("http://localhost:8000/index.html")

    # --- Log in ---
    # Create a new user to ensure a clean state
    page.get_by_placeholder("Enter your name").fill("Tester")
    page.get_by_role("button", name="Create & Login").click()

    # Wait for the main screen to be visible
    expect(page.get_by_role("main").get_by_role("heading", name="Mr. Smith's Learning Canvas")).to_be_visible()

    # --- Verification for Task 1: Fraction Rendering Fix ---
    print("Verifying fraction rendering fix...")

    # Click on the Math subject
    page.get_by_role("button", name="Math", exact=True).click()

    # Click the Formula Sheet button
    page.get_by_role("button", name="Formula Sheet").click()

    # Wait for the modal to appear and take a screenshot
    formula_sheet_modal = page.get_by_role("heading", name="GED® Mathematical Reasoning Formula Sheet").locator('..').locator('..')
    expect(formula_sheet_modal).to_be_visible()
    page.wait_for_timeout(500) # Wait for fade-in animation
    formula_sheet_modal.screenshot(path="jules-scratch/verification/fraction_fix_verification.png")
    print("Screenshot for fraction fix saved.")

    # Close the modal
    page.get_by_role("button", name="×").click()

    # Go back to the home screen
    page.get_by_role("button", name="Back").click()
    expect(page.get_by_role("main").get_by_role("heading", name="Mr. Smith's Learning Canvas")).to_be_visible()

    # --- Verification for Task 2: Geometry Generator ---
    print("Verifying Geometry Generator integration...")

    # Click on the Simulations subject
    page.get_by_role("button", name="Simulations", exact=True).click()

    # Click on the Interactive Labs category
    page.get_by_role("button", name="Interactive Labs").click()

    # Click on the Geometry Generator topic
    # The topic.id for the Geometry Generator is 'sim_geometry_generator'
    page.get_by_test_id("topic-button-sim_geometry_generator").click()

    # Wait for the generator to load and take a screenshot
    geometry_generator = page.get_by_role("heading", name="Geometry Stimulus Generator").locator('..').locator('..')
    expect(geometry_generator).to_be_visible()
    page.wait_for_timeout(500) # Wait for fade-in animation
    geometry_generator.screenshot(path="jules-scratch/verification/geometry_generator_verification.png")
    print("Screenshot for Geometry Generator saved.")

    # Go back home
    page.get_by_role("button", name="Back").click()
    expect(page.get_by_role("main").get_by_role("heading", name="Mr. Smith's Learning Canvas")).to_be_visible()

    print("Verification script completed successfully.")


if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_frontend_changes(page)
        finally:
            browser.close()