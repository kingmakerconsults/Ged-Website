# Tier Remediation Queue

- Generated: 2026-02-18T19:36:08.450Z
- Source audit: tier_progression_audit_1771443367884.json
- Mode: report-only-manual-review
- Totals: files=10, questions=4580, warnings=221, structural=5

## Subject Priority
- Social Studies: score=442, warnings=183, structural=2, files=3
- Math: score=66, warnings=15, structural=1, files=2
- Science: score=64, warnings=13, structural=2, files=2
- RLA: score=40, warnings=10, structural=0, files=2
- Workforce: score=0, warnings=0, structural=0, files=1

## Next Batch (Top Priority Files)
- public\quizzes\social-studies.extras.json (Social Studies) — score=308, warnings=151, structural=1, reason=question tier exceeds topic tier
- public\quizzes\science.quizzes.part1.json (Science) — score=40, warnings=7, structural=2, reason=question complexity appears below topic tier
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — score=38, warnings=8, structural=1, reason=question complexity appears below topic tier
- public\quizzes\math.quizzes.part2.json (Math) — score=26, warnings=5, structural=1, reason=question complexity appears below topic tier

## Quick Wins
- public\quizzes\workforce.quizzes.json (Workforce) — reason=none, warnings=0, action=Auto-populate question tier from topic tier, then re-run audit.

## Deep Rewrite Targets
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — complexityFlags=24, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\math.quizzes.part1.json (Math) — complexityFlags=10, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part1.json (Science) — complexityFlags=7, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — complexityFlags=8, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part1.json (RLA) — complexityFlags=8, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\math.quizzes.part2.json (Math) — complexityFlags=5, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part2.json (Science) — complexityFlags=6, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part2.json (RLA) — complexityFlags=2, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
