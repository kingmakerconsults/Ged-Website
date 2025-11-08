# Social Studies Quiz Bank – Change Log (2025-11-08)

## Summary
- Completed global em‑dash normalization in Social Studies quiz titles (mojibake "ΓÇ—/ΓÇô" → "—").
- Diversified stems for Early Republic (U.S. History Set 3) across all three quizzes (A–C), preserving correct answers.
- Fixed a stray encoding sequence in a coordinate reference (36°30').
- Repository validator run after changes: PASS.

## Scope and counts
- Dash normalization in titles: 178 occurrences updated across U.S. History, Civics & Government, Economics, Geography and the World, Civil Rights/Modern Era, Civil War & Reconstruction, Colonial era and early U.S., Economics/Geography, Reading Sources, and Westward expansion/industrialization. Remaining mojibake occurrences: 0.
- Early Republic stem diversification: 36 questions rewritten (12 per quiz; Quizzes A, B, and C for topic `The Early Republic`).
- Encoding correction: 1 occurrence (Missouri Compromise coordinate normalized to 36°30').

## Details
### Title cleanup (mojibake → proper em‑dash)
- Before: `"title": "Social Studies ΓÇ— U.S. History Set 1"`
- After:  `"title": "Social Studies — U.S. History Set 1"`
- Applied consistently to all Social Studies category titles listed above.

### Early Republic – stems diversified (kept answer keys)
Topic: `The Early Republic` (quizzes `ss_us_hist_early_republic_set1/2/3` in `public/quizzes/social-studies.quizzes.json`)

Representative examples (before → after):
1) Quiz A (Foundations)
- Before: "Which term best matches the following description: First U.S. framework that created a weak central government with limited powers.?"
- After:  "Which document created a deliberately weak national government with no power to tax or enforce laws, convincing many leaders that a new convention was needed?" (Answer preserved: Articles of Confederation)

- Before: "Which term best matches the following description: Agreement creating a bicameral legislature with proportional representation in the House and equal representation in the Senate.?"
- After:  "Which compromise settled the dispute between large and small states by creating a bicameral Congress with proportional representation in one house and equal representation in the other?" (Answer: Great Compromise)

2) Quiz B (Nation‑building)
- Before: "Which term best matches the following description: 1794 protest of a federal excise tax …?"
- After:  "Which 1794 uprising over a federal excise tax was quelled by militia, demonstrating federal authority under the new Constitution?" (Answer: Whiskey Rebellion)

- Before: "Which term best matches the following description: Program to assume state debts, create a national bank, and support manufacturing.?"
- After:  "Which comprehensive plan proposed assuming state debts, chartering a national bank, and encouraging manufacturing?" (Answer: Hamilton's financial plan)

3) Quiz C (Early challenges)
- Before: "Which term best matches the following description: 1823 policy opposing European colonization in the Western Hemisphere.?"
- After:  "Which 1823 presidential doctrine warned European powers against further colonization in the Americas?" (Answer: Monroe Doctrine)

- Before: "Which term best matches the following description: 1820 agreement … banning slavery north of 36┬░30'.?"
- After:  "Which 1820 compromise admitted Missouri as slave and Maine as free while banning slavery north of 36°30' in the Louisiana Territory?" (Answer: Missouri Compromise)

All edits preserved existing correct answers and question numbering.

## Validation
- Command: npm run validate-quizzes
- Result: PASS (Exit Code 0)

## Notes / follow‑ups
- Multi‑select wording audit remains in scope repository‑wide; continue to flag any "Select TWO" mismatches on next content pass.
- Consider adding 1–2 short document‑based questions (DBQs) or political cartoons to Early Republic in a later iteration to increase source analysis variety.
