
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000")
        page.screenshot(path="jules-scratch/verification/initial_load.png")

        # Navigate to the RLA section
        page.click("button:has-text('Reasoning Through Language Arts')")
        page.screenshot(path="jules-scratch/verification/rla_section.png")

        # Verify the new sub-sections are present
        page.wait_for_selector("h3:has-text('Reading Comprehension: Informational Texts')")
        page.wait_for_selector("h3:has-text('Reading Comprehension: Literary Texts')")
        page.wait_for_selector("h3:has-text('Language & Grammar')")

        # Verify the new topics are present
        page.wait_for_selector("div:has-text('Structure & Purpose')")
        page.wait_for_selector("div:has-text('Plot & Character')")
        page.wait_for_selector("div:has-text('Theme & Figurative Language')")
        page.wait_for_selector("div:has-text('Extended Response')")

        page.screenshot(path="jules-scratch/verification/rla_expanded.png")

        browser.close()

if __name__ == "__main__":
    run()
