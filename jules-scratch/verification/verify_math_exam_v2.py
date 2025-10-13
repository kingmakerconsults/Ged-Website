import json
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate and Login
        page.goto("http://localhost:8000/index.html")

        # Inject login credentials
        user_data = {
            "id": "12345",
            "name": "Test User",
            "email": "test@example.com",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ-9H3jY_87VwRobA2I-4L2u25P_9-sI5a_aI-A-w=s96-c"
        }
        token = "fake_token"
        page.evaluate(f"localStorage.setItem('appUser', '{json.dumps(user_data)}');")
        page.evaluate(f"localStorage.setItem('appToken', '{token}');")
        page.evaluate("localStorage.setItem('customNameSet_12345', 'true');")

        # Reload to apply login
        page.reload()
        expect(page.locator("h1:has-text('Welcome, Test User!')")).to_be_visible(timeout=10000)
        print("Login successful.")

        # 2. Start a comprehensive math exam
        page.locator("button:has(h2:has-text('Math'))").click()
        print("Clicked 'Math' subject button.")

        # Wait for the "Start Comprehensive Exam" button to be visible
        comprehensive_button = page.get_by_role('button', name='Start Comprehensive Exam')
        expect(comprehensive_button).to_be_visible(timeout=10000)
        print("Comprehensive exam button is visible.")
        comprehensive_button.click()

        # Wait for the loading screen to appear and disappear
        expect(page.locator("text=Loading...")).to_be_visible(timeout=10000)
        print("Loading screen appeared.")
        expect(page.locator("text=Loading...")).not_to_be_visible(timeout=90000)
        print("Loading screen disappeared.")

        # 3. Verify Part 1 (Non-Calculator)
        expect(page.locator("h3:has-text('Part 1: Mathematical Reasoning (No Calculator)')")).to_be_visible(timeout=10000)
        print("Part 1 view is visible.")

        # 4. Verify KaTeX rendering
        # Wait for at least one KaTeX element to be rendered
        expect(page.locator(".katex").first).to_be_visible(timeout=10000)
        print("KaTeX rendering verified.")

        # 5. Proceed to Part 2
        # Click through all questions in Part 1 to get to the end
        for i in range(4):
            page.get_by_role('button', name='Next').click()

        page.get_by_role('button', name='Continue').click()
        expect(page.get_by_role('button', name='Continue to Part 2')).to_be_visible(timeout=5000)
        page.get_by_role('button', name='Continue to Part 2').click()
        print("Navigated to Part 2.")

        # 6. Verify Part 2 (Calculator) and Fill-in-the-Blank
        expect(page.locator("h3:has-text('Part 2: Mathematical Reasoning (Calculator Permitted)')")).to_be_visible(timeout=10000)
        print("Part 2 view is visible.")

        # Find a fill-in-the-blank question by clicking through until one is found
        found_fill_in_blank = False
        for i in range(41): # There are 41 questions in part 2
            input_locator = page.locator("input[placeholder='Enter your numerical answer']")
            if input_locator.is_visible():
                found_fill_in_blank = True
                break
            if i < 40: # Don't click next on the last question
                page.get_by_role('button', name='Next').click()

        if not found_fill_in_blank:
            raise Exception("Could not find a fill-in-the-blank question in Part 2.")

        print("Fill-in-the-blank question verified.")

        # 7. Take Screenshot
        page.screenshot(path="jules-scratch/verification/math_exam_verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)