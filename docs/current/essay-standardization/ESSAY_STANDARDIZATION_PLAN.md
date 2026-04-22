# Essay Practice Passages Standardization Plan

## Executive Summary

Converting 20 essay topics (40 total passages) to meet GED standards:

- **Target**: 250 words per passage (±20 words)
- **Evidence**: 2-3 marked pieces per passage
- **Authors**: Clean "First Last" format
- **Quality**: Clear strong vs. weak evidence distinction

## Progress Tracker

### Completed ✓

1. Voting Age (16) - ID: rla_arg_001
2. Universal Basic Income - ID: rla_arg_002
3. Renewable Energy Subsidies - ID: rla_arg_003

### In Progress 🔄

4. Social Media & Teen Mental Health - ID: rla_arg_004
5. College vs. Vocational Training - ID: rla_arg_005
6. Smartphone Bans in Schools - ID: rla_arg_006

### Pending ⏳

7. Fast-Food Calorie Labeling - ID: rla_arg_007
8. National Parks Lottery System - ID: rla_arg_008
9. Standardized Tests in Admissions - ID: rla_arg_009
10. Remote vs. In-Office Work - ID: rla_arg_010
11. Homework Limits (1 Hour) - ID: rla_arg_011
12. Free Public Transit - ID: rla_arg_012
13. Year-Round School Calendars - ID: rla_arg_013
14. Single-Use Plastic Bag Bans - ID: rla_arg_014
15. Tuition-Free Public College - ID: rla_arg_015
16. Compulsory Voting - ID: rla_arg_016
17. Plant-Forward School Menus - ID: rla_arg_017
18. Congestion Pricing - ID: rla_arg_018
19. Student Dress Codes - ID: rla_arg_019
20. Financial Literacy Requirement - ID: rla_arg_020

## Standardization Rules

### Word Count

- **Target**: 250 words
- **Acceptable**: 230-270 words
- **Method**: Count after stripping HTML tags

### Author Attribution

**Before**: "Dr. Alisa Klein, Sociologist (Stronger Argument)"  
**After**: "Alisa Klein"

**Rules**:

- Remove professional titles (Dr., Prof., Mr., Ms., Mrs.)
- Remove role descriptions
- Remove strength indicators
- Keep only first and last name

### Evidence Markers

**Strong Articles** use `<span class="good-evidence">`:

- Specific data/statistics
- Named studies or researchers
- Concrete examples
- Verifiable sources

**Weak Articles** use `<span class="bad-evidence">`:

- Personal anecdotes
- Vague generalizations
- "Everyone knows..." statements
- Emotional appeals
- "Common sense" arguments

### Evidence Requirements

- **Minimum**: 2 evidence pieces per passage
- **Optimal**: 3 evidence pieces per passage
- **Strong articles**: All good-evidence markers
- **Weak articles**: All bad-evidence markers (may include 1 good marker to show contrast)

## Quality Control Checklist

For each passage verify:

- [ ] Word count: 230-270
- [ ] Author: Clean "First Last" format
- [ ] Evidence: 2-3 marked pieces
- [ ] Marker match: good-evidence for strong, bad-evidence for weak
- [ ] Topic relevance: GED-appropriate theme
- [ ] Neutral tone: No satirical/inappropriate content
- [ ] HTML valid: Proper paragraph tags
- [ ] Prompt: Clear comparative instruction

## Original vs. Standardized Comparison

### Example 1: Voting Age Topic

**Original Issues**:

- Article A: ~195 words (TOO SHORT)
- Article B: ~160 words (TOO SHORT)
- Author: "Dr. Alisa Klein, Sociologist (Stronger Argument)" (TOO VERBOSE)

**Standardized Solution**:

- Article A: 245 words ✓
- Article B: 238 words ✓
- Author: "Alisa Klein" ✓
- Evidence markers: 3 per article ✓

## Implementation Strategy

### Phase 1: Content Standardization (Current)

1. Rewrite/expand short passages to 250 words
2. Trim long passages to 250 words
3. Maintain argument quality and coherence

### Phase 2: Evidence Enhancement

1. Add specific data where missing
2. Mark all evidence appropriately
3. Ensure 2-3 markers per passage

### Phase 3: Integration

1. Replace passagesData in LegacyRootApp.jsx
2. Update essay template logic if needed
3. Test essay practice tool

### Phase 4: Validation

1. Run automated word count check
2. Verify evidence marker consistency
3. User acceptance testing

## Next Steps

1. Complete remaining 17 topics (34 passages)
2. Run comprehensive validation script
3. Back up original passages
4. Deploy standardized version
5. Document changes for stakeholders

## Estimated Completion

- **Passages**: 20 topics × 2 articles = 40 passages
- **Rate**: ~6-8 passages per hour (careful rewriting)
- **Total Time**: 5-7 hours for complete standardization
- **Current Progress**: 3 of 20 topics complete (15%)
