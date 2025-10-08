from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the application
        page.goto("http://localhost:8000/index.html")

        # 2. Log in
        page.get_by_placeholder("Enter your name").fill("Jules")
        page.get_by_role("button", name="Create & Login").click()

        # Wait for the main screen to load by looking for the main heading
        expect(page.get_by_role("main").get_by_role("heading", name="Mr. Smith's Learning Canvas")).to_be_visible()

        # 3. Navigate to the RLA section
        page.get_by_role("button", name="Reasoning Through Language Arts (RLA)").click()

        # 4. Navigate to the essay writing section
        page.get_by_role("button", name="Writing Skills: The Extended Response").click()

        # 5. Open the Interactive Essay Guide
        page.get_by_role("button", name="Open").click()

        # 6. Verify the new content is present
        # Check for the title of the first passage of the default topic.
        expect(page.get_by_text("Dr. Alisa Klein, Sociologist (Stronger Argument)")).to_be_visible()

        # Also check for one of the highlighted evidence spans to ensure they rendered correctly.
        expect(page.locator("span.good-evidence").first).to_be_visible()

        # 7. Take a screenshot
        page.screenshot(path="jules-scratch/verification/essay_guide_verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)