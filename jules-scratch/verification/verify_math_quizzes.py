
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    page.goto("http://localhost:8000")

    # Navigate to Whole Numbers, Fractions & Decimals
    page.click("text=Mathematics")
    page.click("text=Whole Numbers, Fractions & Decimals")
    page.screenshot(path="jules-scratch/verification/whole_numbers.png")

    # Navigate to Ratios, Proportions & Percents
    page.click("text=Back to Topics")
    page.click("text=Ratios, Proportions & Percents")
    page.screenshot(path="jules-scratch/verification/ratios.png")

    # Navigate to Statistics & Probability
    page.click("text=Back to Topics")
    page.click("text=Statistics & Probability")
    page.screenshot(path="jules-scratch/verification/statistics.png")

    # Navigate to Expressions & Polynomials
    page.click("text=Back to Topics")
    page.click("text=Expressions & Polynomials")
    page.screenshot(path="jules-scratch/verification/expressions.png")

    # Navigate to Equations & Inequalities
    page.click("text=Back to Topics")
    page.click("text=Equations & Inequalities")
    page.screenshot(path="jules-scratch/verification/equations.png")

    # Navigate to Graphing & Functions
    page.click("text=Back to Topics")
    page.click("text=Graphing & Functions")
    page.screenshot(path="jules-scratch/verification/graphing.png")

    # Navigate to Geometry Basics
    page.click("text=Back to Topics")
    page.click("text=Geometry Basics")
    page.screenshot(path="jules-scratch/verification/geometry.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
