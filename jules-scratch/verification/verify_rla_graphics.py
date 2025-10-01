from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies the rewritten RLA graphics questions.
    """
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()

    page.get_by_role("button", name="Reasoning Through Language Arts (RLA)").click()
    page.get_by_role("button", name="Reading Comprehension: Informational Texts").click()
    topic_element = page.locator("div.grid > div", has_text="Interpreting Graphics")
    topic_element.get_by_role("button", name="Start Quiz").click()

    # Assert that the new question title is visible using a more specific locator
    title_locator = page.locator("b:has-text('Allied Military Deaths in World War II (Approximate)')")
    expect(title_locator).to_be_visible()

    # Assert that the image is correct
    image = page.get_by_alt_text("A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 48%, China: 22%, United States: 5%, United Kingdom: 5%, Other Allies: 20%.")
    expect(image).to_be_visible()
    expect(image).to_have_attribute("src", "Images/WorldWarII-MilitaryDeaths-Allies-Piechart.png")

    page.screenshot(path="jules-scratch/verification/06_rla_graphics.png")
    print("Successfully verified RLA graphics question.")

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