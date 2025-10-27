from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    logs = []
    page.on("console", lambda msg: logs.append(msg.text))

    page.goto("http://localhost:8000")

    print("".join(logs))

    page.screenshot(path="jules-scratch/verification/math_quiz_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
