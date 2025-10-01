from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies the corrected image for the urbanization question.
    """
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()

    page.get_by_role("button", name="Social Studies").click()
    page.get_by_role("button", name="U.S. History").click()
    topic_element = page.locator("div.grid > div", has_text="Industrial America (1877-1914)")
    topic_element.get_by_role("button", name="Start Quiz").click()
    page.locator(".quiz-nav").get_by_role("button", name="5", exact=True).click()

    image = page.get_by_alt_text("Visual for question 5")
    expect(image).to_be_visible()
    expect(image).to_have_attribute("src", "Images/Questions-are-based-on-the-following-graph.-7.png")

    page.screenshot(path="jules-scratch/verification/05_urbanization.png")
    print("Successfully verified urbanization graph.")

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