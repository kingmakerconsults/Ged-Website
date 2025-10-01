from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    This script verifies the image and content changes in the quiz application.
    It uses helper functions to manage navigation state between the start screen and quizzes.
    """

    # --- Helper function to navigate from the START screen to a specific question ---
    def go_to_quiz_question(subject: str, category: str, topic_title: str, question_index: int):
        page.get_by_role("button", name=subject).click()
        page.get_by_role("button", name=category).click()

        topic_element = page.locator("div.grid > div", has_text=topic_title)
        topic_element.get_by_role("button", name="Start Quiz").click()

        page.locator(".quiz-nav").get_by_role("button", name=str(question_index), exact=True).click()

    # --- Helper function to navigate from a quiz back to the START screen ---
    def go_home_from_quiz():
        page.get_by_role("button", name="Back").click()

    # 1. Start and Login
    page.goto("http://localhost:8000/index.html")
    page.get_by_placeholder("Enter your name").fill("Jules")
    page.get_by_role("button", name="Create & Login").click()
    expect(page.get_by_text("Welcome, Jules!")).to_be_visible()

    # 2. Verify Triangular Trade Map
    go_to_quiz_question("Social Studies", "U.S. History", "Foundations (1491-1763)", 13)
    expect(page.get_by_alt_text("Visual for question 13")).to_have_attribute("src", "Images/A map of the Triangular Trade routes..jpg")
    page.screenshot(path="jules-scratch/verification/01_triangular_trade.png")
    go_home_from_quiz()

    # 3. Verify "Join, or Die" Cartoon
    go_to_quiz_question("Social Studies", "U.S. History", "Foundations (1491-1763)", 15)
    expect(page.get_by_alt_text("Visual for question 15")).to_have_attribute("src", "Images/American_School_-_Join_or_Die_drawing_considers_the_first_political_cartoon_published_in_the_Penns_-_(MeisterDrucke-971488).jpg")
    page.screenshot(path="jules-scratch/verification/02_join_or_die.png")
    go_home_from_quiz()

    # 4. Verify Manifest Destiny Map
    go_to_quiz_question("Social Studies", "U.S. History", "A Nation Divided (1824-1877)", 2)
    expect(page.get_by_alt_text("Visual for question 2")).to_have_attribute("src", "Images/territorial-gains-by-the-us.jpg")
    page.screenshot(path="jules-scratch/verification/03_manifest_destiny.png")
    go_home_from_quiz()

    # 5. Verify Anaconda Plan Question (is now text-based)
    go_to_quiz_question("Social Studies", "U.S. History", "A Nation Divided (1824-1877)", 15)
    expect(page.get_by_text("The Union's 'Anaconda Plan' was a key military strategy")).to_be_visible()
    expect(page.locator("img[alt='Visual for question 15']")).not_to_be_visible()
    page.screenshot(path="jules-scratch/verification/04_anaconda_plan.png")
    go_home_from_quiz()

    # 6. Verify Urbanization Graph
    go_to_quiz_question("Social Studies", "U.S. History", "Industrial America (1877-1914)", 5)
    expect(page.get_by_alt_text("Visual for question 5")).to_have_attribute("src", "Images/Questions-are-based-on-the-following-graph.-7.png")
    page.screenshot(path="jules-scratch/verification/05_urbanization.png")
    go_home_from_quiz()

    # 7. Verify RLA Graphics Question
    page.get_by_role("button", name="Reasoning Through Language Arts (RLA)").click()
    page.get_by_role("button", name="Reading Comprehension: Informational Texts").click()
    page.locator("div.grid > div", has_text="Interpreting Graphics").get_by_role("button", name="Start Quiz").click()
    expect(page.get_by_text("Allied Military Deaths in World War II (Approximate)")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/06_rla_graphics.png")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()