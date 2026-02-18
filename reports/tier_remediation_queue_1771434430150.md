# Tier Remediation Queue

- Generated: 2026-02-18T17:07:10.149Z
- Source audit: tier_progression_audit_1771434429125.json
- Mode: report-only-manual-review
- Totals: files=10, questions=4382, warnings=762, structural=22

## Subject Priority
- Math: score=1354, warnings=355, structural=1, files=2
- Social Studies: score=760, warnings=175, structural=19, files=3
- Science: score=604, warnings=151, structural=2, files=2
- RLA: score=324, warnings=81, structural=0, files=2
- Workforce: score=0, warnings=0, structural=0, files=1

## Next Batch (Top Priority Files)
- public\quizzes\math.quizzes.part2.json (Math) — score=730, warnings=193, structural=1, reason=question complexity appears below topic tier
- public\quizzes\math.quizzes.part1.json (Math) — score=624, warnings=162, structural=0, reason=question complexity appears below topic tier
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — score=596, warnings=149, structural=0, reason=question complexity appears below topic tier
- public\quizzes\science.quizzes.part1.json (Science) — score=364, warnings=91, structural=2, reason=question complexity appears below topic tier
- public\quizzes\science.quizzes.part2.json (Science) — score=240, warnings=60, structural=0, reason=question complexity appears below topic tier
- public\quizzes\rla.quizzes.part1.json (RLA) — score=176, warnings=44, structural=0, reason=question complexity appears below topic tier
- public\quizzes\social-studies.extras.json (Social Studies) — score=126, warnings=18, structural=18, reason=missing question tier metadata
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — score=38, warnings=8, structural=1, reason=question complexity appears below topic tier

## Quick Wins
- public\quizzes\workforce.quizzes.json (Workforce) — reason=none, warnings=0, action=Auto-populate question tier from topic tier, then re-run audit.

## Deep Rewrite Targets
- public\quizzes\math.quizzes.part2.json (Math) — complexityFlags=145, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\math.quizzes.part1.json (Math) — complexityFlags=138, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — complexityFlags=149, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part1.json (Science) — complexityFlags=79, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part2.json (Science) — complexityFlags=60, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part1.json (RLA) — complexityFlags=44, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part2.json (RLA) — complexityFlags=37, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — complexityFlags=8, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
