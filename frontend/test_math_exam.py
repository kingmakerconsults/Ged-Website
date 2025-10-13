import pytest
from playwright.sync_api import sync_playwright, expect

def test_comprehensive_math_exam_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))

        try:
            print("Navigating to page...")
            page.goto("http://localhost:8000/index.html")
            print("Page loaded.")

            user = {
                "id": "12345test",
                "name": "Test User",
                "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ-g_8B4a-2b_4YtX_g_8B4a-2b_4YtX_g_8B4a-2b=s96-c"
            }
            print("Setting localStorage for login...")
            page.evaluate(
                """(user) => {
                    localStorage.setItem('appUser', JSON.stringify(user));
                    localStorage.setItem('appToken', 'dummy-token');
                    localStorage.setItem(`customNameSet_${user.id}`, 'true');
                }""",
                user
            )
            print("localStorage set.")

            print("Reloading page...")
            page.reload()
            print("Page reloaded.")

            print("Waiting for welcome message...")
            expect(page.locator("h1:has-text('Welcome, Test User!')")).to_be_visible()
            print("Welcome message visible.")

            print("Clicking Math button...")
            page.get_by_role("button", name="Math", exact=True).click()
            print("Math button clicked.")

            print("Clicking Comprehensive Exam button...")
            page.locator('button:has-text("Comprehensive Exam")').click()
            print("Comprehensive Exam button clicked.")

            print("Waiting for Part 1 title...")
            expect(page.locator("h2:has-text('Part 1: Non-Calculator Section')")).to_be_visible(timeout=15000)
            print("Part 1 title visible.")

            for i in range(5):
                print(f"Answering question {i+1} of Part 1...")
                page.locator('.space-y-3 button').first.click()
                if i < 4:
                    page.locator('button:has-text("Next")').click()

            print("Clicking 'Continue to Part 2'...")
            page.locator('button:has-text("Continue to Part 2")').click()
            print("Continue button clicked.")

            print("Waiting for Part 2 title...")
            expect(page.locator("h2:has-text('Part 2: Calculator-Permitted Section')")).to_be_visible()
            print("Part 2 title visible.")

            fill_in_the_blank_found = False
            for i in range(41):
                print(f"Answering question {i+1} of Part 2...")
                input_locator = page.locator('input[type="text"][placeholder="Enter your answer"]')

                try:
                    input_locator.wait_for(state='visible', timeout=100)
                    print("Fill-in-the-blank question found.")
                    fill_in_the_blank_found = True
                    input_locator.fill("123")
                except Exception:
                    page.locator('.space-y-3 button').first.click()

                if i < 40:
                    page.locator('button:has-text("Next")').click()

            assert fill_in_the_blank_found, "Expected to find at least one fill-in-the-blank question."

            print("Finishing quiz...")
            page.locator('button:has-text("Finish Exam")').click()
            print("Finish button clicked.")

            print("Verifying results screen...")
            expect(page.locator("h2:has-text('Results:')")).to_be_visible()
            expect(page.locator("p:has-text('Your estimated GED® Score is:')")).to_be_visible()

            print("Test passed: Comprehensive Math Exam flow is correct.")

        except Exception as e:
            pytest.fail(f"Test failed: {e}")

        finally:
            browser.close()