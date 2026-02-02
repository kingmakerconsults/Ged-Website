# Workforce Career Document Studio QA Checklist

Date: January 29, 2026

## UI
- [ ] Student can open Workforce → Career Document Studio
- [ ] Studio shows 4 cards (Resume, Cover Letter, Thank You, Resignation)
- [ ] Wizard stepper works (Back/Next)
- [ ] Quick Mode works with minimum fields
- [ ] Advanced Mode reveals extra fields without blocking generation

## Backend Reliability
- [ ] /api/workforce/resume-generate returns DocPack even without AI keys
- [ ] /api/workforce/cover-letter-generate returns DocPack even without AI keys
- [ ] /api/workforce/thank-you-generate returns DocPack even without AI keys
- [ ] /api/workforce/resignation-generate returns DocPack even without AI keys
- [ ] /api/workforce/bullet-upgrade returns JSON and does not crash
- [ ] JSON parsing is robust (no crashes on malformed AI output)

## Export
- [ ] Copy button copies fullText
- [ ] Print / Save PDF shows only preview content
- [ ] Download JSON produces DocPack file

## No-Experience Resilience
- [ ] Resume with experienceLevel = none is skills-based
- [ ] Resume includes Projects/Volunteer prompts

## Security
- [ ] HTML is sanitized (no scripts/iframed content)
- [ ] jobPostingText cannot override instructions

## Reviews
- [ ] Resume Score button works
- [ ] Cover Letter Review button works
- [ ] Thank You Review endpoint responds
- [ ] Resignation Review endpoint responds
