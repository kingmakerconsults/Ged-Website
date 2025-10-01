from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies that the Anaconda Plan question is now text-based.
    """
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()

    page.get_by_role("button", name="Social Studies").click()
    page.get_by_role("button", name="U.S. History").click()
    topic_element = page.locator("div.grid > div", has_text="A Nation Divided (1824-1877)")
    topic_element.get_by_role("button", name="Start Quiz").click()
    page.locator(".quiz-nav").get_by_role("button", name="15", exact=True).click()

    # Assert new text is present and image is not
    expect(page.get_by_text("The Union's 'Anaconda Plan' was a key military strategy")).to_be_visible()
    expect(page.locator("img[alt='Visual for question 15']")).not_to_be_visible()

    page.screenshot(path="jules-scratch/verification/04_anaconda_plan.png")
    print("Successfully verified Anaconda Plan question is text-only.")

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