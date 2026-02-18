# Tier Remediation Queue

- Generated: 2026-02-18T17:09:34.214Z
- Source audit: tier_progression_audit_1771434573059.json
- Mode: report-only-manual-review
- Totals: files=10, questions=4382, warnings=1377, structural=22

## Subject Priority
- Math: score=1858, warnings=523, structural=1, files=2
- Social Studies: score=1393, warnings=386, structural=19, files=3
- Science: score=967, warnings=272, structural=2, files=2
- RLA: score=669, warnings=196, structural=0, files=2
- Workforce: score=0, warnings=0, structural=0, files=1

## Next Batch (Top Priority Files)
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — score=1193, warnings=348, structural=0, reason=question tier does not match topic tier
- public\quizzes\math.quizzes.part2.json (Math) — score=964, warnings=271, structural=1, reason=question complexity appears below topic tier
- public\quizzes\math.quizzes.part1.json (Math) — score=894, warnings=252, structural=0, reason=question complexity appears below topic tier
- public\quizzes\science.quizzes.part1.json (Science) — score=553, warnings=154, structural=2, reason=question complexity appears below topic tier
- public\quizzes\rla.quizzes.part1.json (RLA) — score=434, warnings=130, structural=0, reason=question tier does not match topic tier
- public\quizzes\science.quizzes.part2.json (Science) — score=414, warnings=118, structural=0, reason=question complexity appears below topic tier
- public\quizzes\rla.quizzes.part2.json (RLA) — score=235, warnings=66, structural=0, reason=question complexity appears below topic tier
- public\quizzes\social-studies.extras.json (Social Studies) — score=126, warnings=18, structural=18, reason=missing question tier metadata
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — score=74, warnings=20, structural=1, reason=question tier does not match topic tier

## Quick Wins
- public\quizzes\workforce.quizzes.json (Workforce) — reason=none, warnings=0, action=Auto-populate question tier from topic tier, then re-run audit.

## Deep Rewrite Targets
- public\quizzes\social-studies.quizzes.part2.json (Social Studies) — complexityFlags=149, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\math.quizzes.part2.json (Math) — complexityFlags=145, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\math.quizzes.part1.json (Math) — complexityFlags=138, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part1.json (Science) — complexityFlags=79, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part1.json (RLA) — complexityFlags=44, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\science.quizzes.part2.json (Science) — complexityFlags=60, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\rla.quizzes.part2.json (RLA) — complexityFlags=37, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
- public\quizzes\social-studies.quizzes.part1.json (Social Studies) — complexityFlags=8, action=Manual content rewrite: remove filler and increase multi-step reasoning per tier rubric.
