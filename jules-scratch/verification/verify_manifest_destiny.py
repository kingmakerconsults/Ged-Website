from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies ONLY the Manifest Destiny map change.
    """
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()

    page.get_by_role("button", name="Social Studies").click()
    page.get_by_role("button", name="U.S. History").click()
    topic_element = page.locator("div.grid > div", has_text="A Nation Divided (1824-1877)")
    topic_element.get_by_role("button", name="Start Quiz").click()
    page.locator(".quiz-nav").get_by_role("button", name="2", exact=True).click()

    image = page.get_by_alt_text("Visual for question 2")
    expect(image).to_be_visible()
    expect(image).to_have_attribute("src", "Images/territorial-gains-by-the-us.jpg")

    page.screenshot(path="jules-scratch/verification/03_manifest_destiny.png")
    print("Successfully verified Manifest Destiny map.")

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