from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the application
        page.goto("http://localhost:8000/index.html")

        # Create and log in as a new user
        page.get_by_placeholder("Enter your name").fill("TestUser")
        page.get_by_role("button", name="Create & Login").click()

        # Go to Social Studies
        main_heading = page.get_by_role("main").get_by_role("heading", name="Mr. Smith's Learning Canvas")
        expect(main_heading).to_be_visible()
        page.get_by_role("button", name="Social Studies").click()

        # Click the "Smith a Quiz" generate button
        expect(page.get_by_role("heading", name="Smith a Quiz")).to_be_visible()
        page.get_by_role("button", name="Generate").click()

        # Verify the generator page renders
        generator_heading = page.get_by_role("heading", name="Create a New Quiz")
        expect(generator_heading).to_be_visible()

        # Select a topic
        page.get_by_role("combobox").select_option("U.S. History")

        # Click the generate button
        page.get_by_role("button", name="Generate Quiz").click()

        # Verify that the loading overlay appears with the correct message
        loading_heading = page.get_by_role("heading", name="Loading...")
        expect(loading_heading).to_be_visible()
        loading_message = page.get_by_text("Please give us a moment to smith this for you")
        expect(loading_message).to_be_visible()

        # Take a screenshot of the loading screen to prove the full flow works
        page.screenshot(path="jules-scratch/verification/full_flow_verification.png")

        print("Full flow verification script ran successfully.")

    except Exception as e:
        print(f"An error occurred during full flow verification: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)