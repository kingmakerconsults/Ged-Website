from playwright.sync_api import Page, expect

def test_rla_bold_title(page: Page):
    """
    This test verifies that the RLA reading comprehension article titles are correctly rendered as bold.
    """
    # 1. Arrange: Go to the application's home page.
    # The server should be running on localhost:8000.
    page.goto("http://localhost:8000/index.html")

    # 2. Act: Log in and navigate to the specific RLA reading quiz.

    # Use an existing user or create a new one to log in.
    # Let's try to click the user 'Jules' if it exists. If not, we'll create it.
    try:
        page.get_by_role("button", name="Jules").click()
    except Exception:
        page.get_by_placeholder("Enter your name").fill("Jules")
        page.get_by_role("button", name="Create & Login").click()

    # Navigate to the RLA section
    page.get_by_role("button", name="Reasoning Through Language Arts (RLA)").click()

    # Navigate to the Informational Texts category
    page.get_by_role("button", name="Reading Comprehension: Informational Texts").click()

    # Start the "Main Idea & Details" quiz
    page.get_by_role("button", name="Start Quiz").first.click()

    # 3. Assert: Check if the title is rendered correctly with a strong tag.

    # Locate the h3 element for the title.
    title_element = page.locator("h3.text-2xl.font-bold")

    # The title should contain a <strong> element for the bolded text.
    # We can check the inner HTML to confirm the tag is present.
    expect(title_element).to_contain_text("The Rise of Renewable Energy")

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/rla_bold_title.png")