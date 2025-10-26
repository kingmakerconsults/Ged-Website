import re
from playwright.sync_api import Page, expect
import pytest
import subprocess
import time
import os
import json

@pytest.fixture(scope="session")
def server():
    # Kill any existing server on port 8000
    try:
        subprocess.run("kill $(lsof -t -i:8000)", shell=True, check=True)
        time.sleep(1) # Give it a moment to release the port
    except subprocess.CalledProcessError:
        pass # No process was running, which is fine

    # Start the server in a separate process
    server_process = subprocess.Popen(
        ["python3", "-m", "http.server", "8000"],
        cwd="frontend",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    # Wait for the server to start
    time.sleep(2)
    yield
    # Stop the server
    server_process.kill()

def test_rla_expansion(server, page: Page):
    try:
        page.goto("http://localhost:8000")

        # Bypass login by setting localStorage
        user = {
            'name': 'Test User',
            'email': 'test@example.com',
            'picture': 'https://example.com/avatar.png',
            'role': 'student'
        }
        token = 'dummy_token'

        # Use page.evaluate to set items in localStorage
        page.evaluate(f"""
        (params) => {{
            localStorage.setItem('appUser', params.user);
            localStorage.setItem('appToken', params.token);
        }}
        """, {'user': json.dumps(user), 'token': token})


        # Reload the page to apply the localStorage changes
        page.reload()
        page.wait_for_load_state('networkidle')


        # Expect a title to contain a substring.
        expect(page).to_have_title(re.compile("Mr. Smith's Learning Canvas"))

        # Find the RLA button and click it
        rla_button = page.locator('[data-testid="subject-button-reasoning-through-language-arts-rla"]')
        expect(rla_button).to_be_visible()
        rla_button.click()
        page.wait_for_load_state('networkidle')


        # Verify that the new quizzes are present
        expect(page.get_by_text("Main Idea & Details")).to_be_visible()
        expect(page.get_by_text("Structure & Purpose")).to_be_visible()
        expect(page.get_by_text("Analyzing Arguments")).to_be_visible()

        # Check for one of the new quizzes under "Main Idea & Details"
        main_idea_details = page.get_by_text("Main Idea & Details")
        main_idea_details.click()
        page.wait_for_load_state('networkidle')


        expect(page.get_by_text("Set 1")).to_be_visible()
        expect(page.get_by_text("Set 2")).to_be_visible()
        expect(page.get_by_text("Set 3")).to_be_visible()

    except Exception as e:
        page.screenshot(path="screenshot.png")
        pytest.fail(f"Test failed with exception: {e}. Screenshot saved to screenshot.png")
