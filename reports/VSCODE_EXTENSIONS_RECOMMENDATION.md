# Recommended VS Code Extensions for GED Quiz Development

## Overview

These extensions enhance productivity, code quality, and maintainability when working with the GED Website codebase (JSON quiz data, JavaScript/Node.js scripts, Markdown documentation, KaTeX math content).

---

## Essential Extensions

### 1. **ESLint** (`dbaeumer.vscode-eslint`)

**Purpose:** Real-time JavaScript/Node.js linting and code quality enforcement

**Benefits:**

- Catches syntax errors, unused variables, and anti-patterns as you type
- Enforces consistent coding style across scripts (e.g., `sanitize_math_katex.mjs`, `audit_premade_math_quizzes.js`)
- Auto-fix common issues on save (optional configuration)
- Integrates with project's `.eslintrc` if present

**Setup:**

```bash
# Install extension from VS Code marketplace
code --install-extension dbaeumer.vscode-eslint

# Initialize ESLint config (if not already present)
npm init @eslint/config
```

**Recommended workspace settings (`.vscode/settings.json`):**

```json
{
  "eslint.validate": ["javascript", "javascriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

### 2. **Prettier - Code Formatter** (`esbenp.prettier-vscode`)

**Purpose:** Automatic code formatting for JavaScript, JSON, Markdown

**Benefits:**

- Ensures consistent formatting across all quiz JSON files (indentation, bracket spacing)
- Formats scripts and documentation on save
- Reduces diff noise in version control (Git) by normalizing whitespace
- Works alongside ESLint (use `eslint-config-prettier` to avoid conflicts)

**Setup:**

```bash
code --install-extension esbenp.prettier-vscode

# Install Prettier locally (recommended for team consistency)
npm install --save-dev prettier
```

**Create `.prettierrc` config:**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**Workspace settings:**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

### 3. **JSON Schema Validator** (built-in + `redhat.vscode-yaml` for enhanced schemas)

**Purpose:** Validate quiz JSON structure against defined schemas

**Benefits:**

- Immediate feedback on missing required fields (e.g., `questionText`, `answerOptions`)
- Auto-complete for JSON properties based on schema
- Prevents structural errors before running validation scripts

**Setup for quiz files:**
Create `schemas/quiz.schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "subject": { "type": "string" },
    "categories": {
      "type": "object",
      "patternProperties": {
        ".*": {
          "type": "object",
          "properties": {
            "topics": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "quizzes": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "questions": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "required": [
                              "questionNumber",
                              "type",
                              "answerOptions"
                            ],
                            "properties": {
                              "questionNumber": { "type": "integer" },
                              "type": { "type": "string" },
                              "answerOptions": {
                                "type": "array",
                                "minItems": 4,
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "text",
                                    "isCorrect",
                                    "rationale"
                                  ],
                                  "properties": {
                                    "text": { "type": "string" },
                                    "isCorrect": { "type": "boolean" },
                                    "rationale": {
                                      "type": "string",
                                      "minLength": 1
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**Associate schema with quiz files (workspace settings):**

```json
{
  "json.schemas": [
    {
      "fileMatch": ["public/quizzes/*.json"],
      "url": "./schemas/quiz.schema.json"
    }
  ]
}
```

---

### 4. **Markdown Preview Enhanced** (`shd101wyy.markdown-preview-enhanced`)

**Purpose:** Rich Markdown preview with KaTeX math rendering support

**Benefits:**

- Live preview of audit reports (e.g., `MATH_QUIZ_AUDIT_SUMMARY.md`) with properly rendered math
- Side-by-side editing and preview for documentation
- Supports KaTeX inline (`$...$`) and display (`$$...$$`) math
- Export to HTML/PDF for sharing reports

**Setup:**

```bash
code --install-extension shd101wyy.markdown-preview-enhanced
```

**Usage:**

- Open any `.md` file
- Press `Ctrl+Shift+V` (Windows/Linux) or `Cmd+Shift+V` (Mac) for preview
- Math like `$\frac{3}{4}$` renders correctly

**Workspace settings (optional, for LaTeX math):**

```json
{
  "markdown-preview-enhanced.mathRenderingOption": "KaTeX"
}
```

---

### 5. **Error Lens** (`usernamehw.errorlens`)

**Purpose:** Inline display of linting errors, warnings, and diagnostics

**Benefits:**

- Shows ESLint errors directly next to problematic code (no need to hover)
- Highlights issues in JSON files (schema violations, syntax errors)
- Reduces context switching—see problems immediately while editing
- Customizable colors for errors/warnings/info

**Setup:**

```bash
code --install-extension usernamehw.errorlens
```

**Recommended settings:**

```json
{
  "errorLens.enabledDiagnosticLevels": ["error", "warning"],
  "errorLens.fontWeight": "600"
}
```

---

### 6. **GitLens** (`eamodio.gitlens`)

**Purpose:** Advanced Git integration for tracking changes and collaboration

**Benefits:**

- **Blame annotations:** See who last modified quiz questions (useful for multi-author content)
- **File history:** Compare sanitized vs. original quiz files across commits
- **Line history:** Track when specific rationales or answers were updated
- **Commit graph:** Visualize audit/repair workflow branches
- **Diff tools:** Side-by-side comparison of before/after sanitation

**Setup:**

```bash
code --install-extension eamodio.gitlens
```

**Key features for this project:**

- **Inline blame:** Hover over any line to see commit author and date
- **File annotations:** View full file history with `GitLens: Toggle File Blame`
- **Compare branches:** Easily diff `main` vs. feature branches for quiz updates

**Recommended settings:**

```json
{
  "gitlens.codeLens.enabled": true,
  "gitlens.currentLine.enabled": true,
  "gitlens.hovers.currentLine.over": "line"
}
```

---

## Bonus Extensions

### 7. **Todo Tree** (`gruntfwork.todo-tree`)

**Purpose:** Highlight and track TODO/FIXME comments across codebase

**Benefits:**

- Quickly find any remaining `TODO_AUTOGEN` placeholders in quizzes
- Track improvement tasks in scripts (e.g., `// TODO: Add support for fraction simplification`)
- Sidebar view lists all TODOs across workspace

```bash
code --install-extension gruntfwork.todo-tree
```

---

### 8. **Path Intellisense** (`christian-kohler.path-intellisense`)

**Purpose:** Autocomplete file paths in imports and require statements

**Benefits:**

- Speeds up writing import statements in Node.js scripts
- Prevents typos in file paths (e.g., `../utils/quizValidator.js`)
- Works with relative and absolute paths

```bash
code --install-extension christian-kohler.path-intellisense
```

---

### 9. **npm Intellisense** (`christian-kohler.npm-intellisense`)

**Purpose:** Autocomplete npm package names in import/require

**Benefits:**

- Faster script writing (auto-complete installed packages)
- Avoid typos when importing dependencies

```bash
code --install-extension christian-kohler.npm-intellisense
```

---

## Quick Installation Script

Install all recommended extensions at once:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension shd101wyy.markdown-preview-enhanced
code --install-extension usernamehw.errorlens
code --install-extension eamodio.gitlens
code --install-extension gruntfwork.todo-tree
code --install-extension christian-kohler.path-intellisense
code --install-extension christian-kohler.npm-intellisense
```

Or create `.vscode/extensions.json` to suggest extensions when team members open workspace:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "shd101wyy.markdown-preview-enhanced",
    "usernamehw.errorlens",
    "eamodio.gitlens",
    "gruntfwork.todo-tree",
    "christian-kohler.path-intellisense",
    "christian-kohler.npm-intellisense"
  ]
}
```

---

## Integration with Current Workflow

### Pre-Commit Quality Checks

Combine extensions with Husky hooks:

```json
// package.json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.json": ["prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

### Continuous Validation

Add to CI/CD pipeline (GitHub Actions example):

```yaml
name: Quiz Validation
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run audit:math:premade
      - run: npm run validate-quizzes
      - run: npx eslint scripts/ utils/
```

---

## Summary

| Extension                     | Primary Benefit                 | Setup Complexity         |
| ----------------------------- | ------------------------------- | ------------------------ |
| **ESLint**                    | Code quality enforcement        | Medium (requires config) |
| **Prettier**                  | Consistent formatting           | Low (works out-of-box)   |
| **JSON Schema**               | Quiz structure validation       | Medium (custom schema)   |
| **Markdown Preview Enhanced** | Math rendering in docs          | Low                      |
| **Error Lens**                | Inline error visibility         | Low                      |
| **GitLens**                   | Change tracking & collaboration | Low                      |

**Priority for immediate impact:**

1. Prettier (standardize formatting)
2. Error Lens (catch issues faster)
3. Markdown Preview Enhanced (review reports with math)
4. ESLint (enforce quality in new scripts)
5. GitLens (track audit/repair changes)

All extensions are free and actively maintained. Combined, they reduce manual review time, prevent errors, and improve team collaboration.
