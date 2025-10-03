from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the app
        page.goto("http://localhost:8000/index.html")

        # 1. Login
        # Create a new user to ensure a clean state
        page.get_by_placeholder("Enter your name").fill("JulesTest")
        page.get_by_role("button", name="Create & Login").click()
        expect(page.get_by_text("Welcome, JulesTest!")).to_be_visible()

        # 2. Start Comprehensive RLA Exam
        page.get_by_role("button", name="Reasoning Through Language Arts (RLA)").click()
        # Wait for the category view to load
        expect(page.get_by_text("Reading Comprehension: Informational Texts")).to_be_visible()
        page.get_by_role("button", name="Start Comprehensive Exam").click()

        # 3. Verify Part 1 (Reading Comprehension)
        # Wait for the exam to load - the heading is a good indicator
        part1_heading = page.get_by_role("heading", name="Part 1: Reading Comprehension")
        expect(part1_heading).to_be_visible(timeout=60000) # Increased timeout for AI generation
        page.screenshot(path="jules-scratch/verification/01_part1_reading.png")

        # 4. Navigate to Part 2 (Essay)
        page.get_by_role("button", name="Continue to Essay Section").click()
        part2_heading = page.get_by_role("heading", name="Part 2: Extended Response")
        expect(part2_heading).to_be_visible()
        page.screenshot(path="jules-scratch/verification/02_part2_essay.png")

        # 5. Navigate to Part 3 (Language & Grammar)
        page.get_by_role("button", name="Continue to Final Section").click()
        part3_heading = page.get_by_role("heading", name="Part 3: Language & Grammar")
        expect(part3_heading).to_be_visible()
        page.screenshot(path="jules-scratch/verification/03_part3_language.png")

        # 6. Verify Pause functionality
        pause_button = page.get_by_role("button", name="Pause")
        expect(pause_button).to_be_visible()
        pause_button.click()
        paused_heading = page.get_by_role("heading", name="Exam Paused")
        expect(paused_heading).to_be_visible()
        page.screenshot(path="jules-scratch/verification/04_paused_screen.png")

        print("Verification script completed successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
        print("Error screenshot saved to jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)