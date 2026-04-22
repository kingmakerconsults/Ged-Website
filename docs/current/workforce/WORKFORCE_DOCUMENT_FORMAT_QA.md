# Workforce Document Format QA

## Standard

- Fonts: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial
- Body size: 11pt (resume 10.75pt)
- Line height: 1.3
- Margins: 0.85in
- Single column; no tables; no icons

## Acceptance Checklist

- [ ] Resume renders on 1–2 pages; no broken spacing
- [ ] Cover letter renders within one page
- [ ] Thank you renders within one page
- [ ] Resignation renders within one page
- [ ] No placeholder text in final docs
- [ ] Dates formatted consistently
- [ ] Bullet indentation consistent
- [ ] Print-to-PDF shows only document content

## Test Fixtures

Run through each fixture with Generate:

### 1) No experience, education + skills

Fixture: fixtures/workforce-docs/resume-no-experience.json

### 2) Some experience, 2 jobs + 1 project

Fixture: fixtures/workforce-docs/resume-some-experience.json

### 3) Experienced, 4 jobs

Fixture: fixtures/workforce-docs/resume-experienced.json

### 4) Cover letter (with/without manager name)

Fixture: fixtures/workforce-docs/cover-letter-standard.json

### 5) Thank you with 2 discussion points

Fixture: fixtures/workforce-docs/thank-you-email.json

### 6) Resignation with/without transition plan

Fixture: fixtures/workforce-docs/resignation-letter.json

## Notes

- Email-mode outputs include a Subject line in copy text.
- Letter-mode outputs include full header blocks only in preview.
