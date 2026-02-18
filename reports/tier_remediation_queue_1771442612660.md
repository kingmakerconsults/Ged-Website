# Tier Remediation Queue

- Generated: 2026-02-18T19:23:32.658Z
- Source audit: tier_progression_audit_1771442612048.json
- Mode: report-only-manual-review
- Totals: files=10, questions=4382, warnings=343, structural=22

## Subject Priority
- Math: score=478, warnings=118, structural=1, files=2
- Social Studies: score=360, warnings=75, structural=19, files=3
- RLA: score=324, warnings=81, structural=0, files=2
- Science: score=282, warnings=69, structural=2, files=2
- Workforce: score=0, warnings=0, structural=0, files=1

## Next Batch (Top Priority Files)
- public\quizzes\math.quizzes.part1.json (Math) — score=308, warnings=77, structural=0, reason=question complexity appears below topic tier
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — score=196, warnings=49, structural=0, reason=question complexity appears below topic tier
- public\quizzes\rla.quizzes.part1.json (RLA) — score=176, warnings=44, structural=0, reason=question complexity appears below topic tier
- public\quizzes\math.quizzes.part2.json (Math) — score=170, warnings=41, structural=1, reason=question complexity appears below topic tier
- public\quizzes\science.quizzes.part1.json (Science) — score=150, warnings=36, structural=2, reason=question complexity appears below topic tier
- public\quizzes\social-studies.extras.json (Social Studies) — score=126, warnings=18, structural=18, reason=missing question tier metadata
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — score=38, warnings=8, structural=1, reason=question complexity appears below topic tier

## Quick Wins
- public\quizzes\workforce.quizzes.json (Workforce) — reason=none, warnings=0, action=Auto-populate question tier from topic tier, then re-run audit.

## Deep Rewrite Targets
- public\quizzes\math.quizzes.part1.json (Math) — complexityFlags=77, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — complexityFlags=49, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part1.json (RLA) — complexityFlags=44, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\math.quizzes.part2.json (Math) — complexityFlags=41, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part1.json (Science) — complexityFlags=33, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part2.json (RLA) — complexityFlags=37, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part2.json (Science) — complexityFlags=33, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — complexityFlags=8, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
