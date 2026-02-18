# Tier Remediation Queue

- Generated: 2026-02-18T19:18:59.943Z
- Source audit: tier_progression_audit_1771442339374.json
- Mode: report-only-manual-review
- Totals: files=10, questions=4382, warnings=576, structural=22

## Subject Priority
- Math: score=830, warnings=212, structural=1, files=2
- Social Studies: score=600, warnings=141, structural=19, files=3
- Science: score=574, warnings=142, structural=2, files=2
- RLA: score=324, warnings=81, structural=0, files=2
- Workforce: score=0, warnings=0, structural=0, files=1

## Next Batch (Top Priority Files)
- public\quizzes\math.quizzes.part2.json (Math) — score=450, warnings=117, structural=1, reason=question complexity appears below topic tier
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — score=436, warnings=115, structural=0, reason=question complexity appears below topic tier
- public\quizzes\math.quizzes.part1.json (Math) — score=380, warnings=95, structural=0, reason=question complexity appears below topic tier
- public\quizzes\science.quizzes.part1.json (Science) — score=334, warnings=82, structural=2, reason=question complexity appears below topic tier
- public\quizzes\science.quizzes.part2.json (Science) — score=240, warnings=60, structural=0, reason=question complexity appears below topic tier
- public\quizzes\rla.quizzes.part1.json (RLA) — score=176, warnings=44, structural=0, reason=question complexity appears below topic tier
- public\quizzes\social-studies.extras.json (Social Studies) — score=126, warnings=18, structural=18, reason=missing question tier metadata
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — score=38, warnings=8, structural=1, reason=question complexity appears below topic tier

## Quick Wins
- public\quizzes\workforce.quizzes.json (Workforce) — reason=none, warnings=0, action=Auto-populate question tier from topic tier, then re-run audit.

## Deep Rewrite Targets
- public\quizzes\math.quizzes.part2.json (Math) — complexityFlags=105, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — complexityFlags=103, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\math.quizzes.part1.json (Math) — complexityFlags=95, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part1.json (Science) — complexityFlags=79, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part2.json (Science) — complexityFlags=60, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part1.json (RLA) — complexityFlags=44, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part2.json (RLA) — complexityFlags=37, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — complexityFlags=8, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
