from playwright.sync_api import sync_playwright, expect, Page

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the local server
        page.goto("http://localhost:8000/index.html", timeout=60000)

        # Wait for the app to load
        expect(page.locator("h1:has-text('Mr. Smith\\'s Learning Canvas')")).to_be_visible()

        # Manually set a dummy user and customNameSet to simulate login and bypass the modal
        page.evaluate("""() => {
            const dummyUser = {
                id: '12345',
                name: 'Test User',
                picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ-9C0Xb-s-Z-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g-g=s96-c'
            };
            localStorage.setItem('appUser', JSON.stringify(dummyUser));
            localStorage.setItem('appToken', 'dummy_token');
            localStorage.setItem('customNameSet_12345', 'true');
        }""")

        # Reload the page to apply the simulated login
        page.reload()

        # Wait for the main content to load after login
        expect(page.locator("h1:has-text('Welcome, Test User!')")).to_be_visible(timeout=10000)

        # Now that the main page is loaded, proceed with the test
        math_button = page.get_by_role("button", name="Math", exact=True)
        expect(math_button).to_be_visible(timeout=10000)

        # Click on the Math subject
        math_button.click()

        # Click on the Quantitative Problem Solving category
        page.locator("button:has-text('Quantitative Problem Solving')").click()

        # Use a more robust locator for the quiz button
        quiz_button = page.get_by_role("button", name="Start Quiz").first
        expect(quiz_button).to_be_visible()
        quiz_button.click()

        # Wait for the quiz to load and the question to be visible
        expect(page.locator("h3:has-text('1.')")).to_be_visible()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Take a screenshot on error to see the page state
        page.screenshot(path="jules-scratch/verification/verification_error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)