# update_app_data.py

import re

# Read the content of the new math exams data file
with open('data/new_math_exams.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract the "Math" object as a string.
# We find the start of the object and then carefully find the matching closing brace.
start_str = '"Math": {'
start_index = js_content.find(start_str)
if start_index == -1:
    print("Error: Could not find the start of the 'Math' object in data/new_math_exams.js")
    exit(1)

open_braces = 0
end_index = -1
# Start searching from the first brace
for i in range(start_index + len(start_str) - 1, len(js_content)):
    if js_content[i] == '{':
        open_braces += 1
    elif js_content[i] == '}':
        open_braces -= 1
        # When the initial brace is closed, we've found our match.
        if open_braces == -1:
            end_index = i + 1
            break

if end_index == -1:
    print("Error: Could not find the matching closing brace for the 'Math' object.")
    exit(1)

# The final string to be inserted, from `"Math": {` to the final `}`
math_data_str = js_content[start_index:end_index]

# Read the content of the main HTML file
with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace the placeholder '"Math": {}' with the actual data
# Using a regex to be slightly more flexible with whitespace
updated_html_content = re.sub(r'"Math":\s*{}', math_data_str, html_content)

# Write the updated content back to the HTML file
with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(updated_html_content)

print("Successfully updated frontend/index.html with new math exams.")
