from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000")
    page.click("text=Science")
    page.click("button[aria-expanded='false']")
    page.wait_for_selector("text=Density")
    page.screenshot(path="jules-scratch/verification/science-formulas.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
