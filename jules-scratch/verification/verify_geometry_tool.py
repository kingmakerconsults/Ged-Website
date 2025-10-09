from playwright.sync_api import Page, expect
import re

def test_capture_page_html(page: Page):
    """
    This script navigates to the app and captures its HTML content
    to diagnose why it might be failing to render correctly.
    """
    # 1. Arrange: Go to the application homepage.
    page.goto("http://localhost:8000/index.html")

    # 2. Act: Wait for a moment to ensure scripts have tried to load.
    page.wait_for_timeout(3000) # Wait 3 seconds

    # 3. Capture HTML content
    html_content = page.content()
    with open("jules-scratch/verification/page_content.html", "w", encoding="utf-8") as f:
        f.write(html_content)

    # 4. Screenshot: Also try to capture a screenshot for context.
    page.screenshot(path="jules-scratch/verification/debug_screenshot.png")