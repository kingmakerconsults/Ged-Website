from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies ONLY the Triangular Trade map change.
    """
    # 1. Start and Login
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()
    expect(page.get_by_text("Welcome, Jules!")).to_be_visible()

    # 2. Navigate to the specific quiz and question
    page.get_by_role("button", name="Social Studies").click()
    page.get_by_role("button", name="U.S. History").click()
    topic_element = page.locator("div.grid > div", has_text="Foundations (1491-1763)")
    topic_element.get_by_role("button", name="Start Quiz").click()
    page.locator(".quiz-nav").get_by_role("button", name="13", exact=True).click()

    # 3. Assert that the correct image is now being used
    image = page.get_by_alt_text("Visual for question 13")
    expect(image).to_be_visible()
    expect(image).to_have_attribute("src", "Images/A map of the Triangular Trade routes..jpg")

    # 4. Take a screenshot for visual confirmation
    page.screenshot(path="jules-scratch/verification/01_triangular_trade.png")
    print("Successfully verified Triangular Trade map.")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_verification(page)
        finally:
            browser.close()

if __name__ == "__main__":
    main()