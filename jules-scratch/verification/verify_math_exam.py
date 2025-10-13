import pytest
from playwright.sync_api import sync_playwright, expect

def test_comprehensive_math_exam_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            page.goto("http://localhost:8000/index.html")

            user = {
                "id": "12345test",
                "name": "Test User",
                "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ-g_8B4a-2b_4YtX_g_8B4a-2b_4YtX_g_8B4a-2b=s96-c"
            }
            page.evaluate(
                """(user) => {
                    localStorage.setItem('appUser', JSON.stringify(user));
                    localStorage.setItem('appToken', 'dummy-token');
                    localStorage.setItem(`customNameSet_${user.id}`, 'true');
                }""",
                user
            )

            page.reload()

            expect(page.locator("h1:has-text('Welcome, Test User!')")).to_be_visible()

            page.get_by_role("button", name="Math", exact=True).click()

            page.locator('button:has-text("Comprehensive Exam")').click()

            # Screenshot Part 1
            expect(page.locator("h2:has-text('Part 1: Non-Calculator Section')")).to_be_visible(timeout=15000)
            page.screenshot(path="jules-scratch/verification/part1_verification.png")

            for i in range(5):
                page.locator('.space-y-3 button').first.click()
                if i < 4:
                    page.locator('button:has-text("Next")').click()

            page.locator('button:has-text("Continue to Part 2")').click()

            expect(page.locator("h2:has-text('Part 2: Calculator-Permitted Section')")).to_be_visible()

            # Find a fill-in-the-blank question and screenshot it
            for i in range(41):
                input_locator = page.locator('input[type="text"][placeholder="Enter your answer"]')
                try:
                    input_locator.wait_for(state='visible', timeout=100)
                    page.screenshot(path="jules-scratch/verification/fill_in_the_blank_verification.png")
                    break # Exit loop once we've found and screenshotted one
                except Exception:
                    page.locator('.space-y-3 button').first.click()
                    if i < 40:
                        page.locator('button:has-text("Next")').click()

        except Exception as e:
            pytest.fail(f"Verification script failed: {e}")

        finally:
            browser.close()