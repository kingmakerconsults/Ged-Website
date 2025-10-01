from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies ONLY the "Join, or Die" cartoon change.
    """
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()

    page.get_by_role("button", name="Social Studies").click()
    page.get_by_role("button", name="U.S. History").click()
    topic_element = page.locator("div.grid > div", has_text="Foundations (1491-1763)")
    topic_element.get_by_role("button", name="Start Quiz").click()
    page.locator(".quiz-nav").get_by_role("button", name="15", exact=True).click()

    image = page.get_by_alt_text("Visual for question 15")
    expect(image).to_be_visible()
    expect(image).to_have_attribute("src", "Images/American_School_-_Join_or_Die_drawing_considers_the_first_political_cartoon_published_in_the_Penns_-_(MeisterDrucke-971488).jpg")

    page.screenshot(path="jules-scratch/verification/02_join_or_die.png")
    print("Successfully verified 'Join, or Die' cartoon.")

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