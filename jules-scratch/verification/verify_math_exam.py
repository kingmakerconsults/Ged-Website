from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:8000/index.html")

        # Wait for the login button to be visible
        google_button = page.locator('div[role="button"]:has-text("Sign in with Google")')
        expect(google_button).to_be_visible(timeout=20000)

        # This is a mock login. In a real scenario, you would not do this.
        page.evaluate("""() => {
            const user = {
                "id": "12345",
                "name": "Jules",
                "email": "jules@example.com",
                "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ-9H3_k6V_jQk_pG-jVq_kUq_zY-X_qYqYqYqY=s96-c"
            };
            const token = "mock_token";
            localStorage.setItem('appUser', JSON.stringify(user));
            localStorage.setItem('appToken', token);
            localStorage.setItem('customNameSet_12345', 'true');
            window.location.reload();
        }""")

        # Wait for the page to reload and the main content to be visible
        expect(page.locator("h1:has-text('Welcome, Jules!')")).to_be_visible(timeout=20000)

        # Start a comprehensive math exam
        page.click('button:has-text("Math")')
        page.wait_for_selector('button:has-text("Comprehensive Exam")', timeout=60000)
        page.click('button:has-text("Comprehensive Exam")')

        # Wait for the quiz to load
        expect(page.locator('text=Part 1: Non-Calculator Section')).to_be_visible(timeout=120000)

        # Answer the first 5 questions
        for _ in range(5):
            page.locator('.space-y-3 button').first.click()
            page.click('button:has-text("Next")')

        # Take a screenshot of the interstitial screen
        page.screenshot(path="jules-scratch/verification/interstitial.png")

        # Continue to part 2
        page.click('button:has-text("Start Part 2")')

        # Wait for part 2 to load
        expect(page.locator('text=Part 2: Calculator-Permitted Section')).to_be_visible(timeout=20000)

        # Find a fill-in-the-blank question
        # This is tricky because we don't know the order. We'll click next until we find one.
        for _ in range(41): # Max questions in part 2
            is_fill_in = page.locator('input[placeholder="Type your answer here"]').is_visible()
            if is_fill_in:
                break
            page.click('button:has-text("Next")')

        # Take a screenshot of the fill-in-the-blank question
        page.screenshot(path="jules-scratch/verification/fill_in_the_blank.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)