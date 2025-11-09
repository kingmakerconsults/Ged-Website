## U.S. History — Westward Expansion (Quiz A)

- Target: `ss_us_hist_westward_expansion_set1` (both duplicate blocks synchronized)
- Passages ensured:
  - Q1: Manifest Destiny excerpt (already present in one block; added to the duplicate).
  - Q5: Oregon Trail diary scenario (already present in one block; added to the duplicate).
- Stem rewrites: Removed all remaining “Which term best matches…” stems. Standardized to concise year/action/outcome phrasing matching both blocks (Q1–Q12).
- Answers/rationales: Preserved exactly.
- Validation: PASS.

## Civics — Supreme Court (Quiz C)

- Target: `ss_civics_supreme_court_set3` (both duplicate blocks synchronized)
- Passages added:
  - Q1: School newspaper censorship scenario (principal removes articles).
  - Q4: Marital privacy contraception advisory scenario.
- Stem rewrites: Diversified all question stems (Q1–Q12) using year/action/outcome phrasing; removed all "Which term best matches" constructions.
- Answers/rationales: Preserved unchanged.
- Validation: PASS (no schema or key issues detected).

## Civics — Supreme Court (Quiz B)

- Target: `ss_civics_supreme_court_set2` (both duplicate blocks synchronized)
- Passages added:
  - Q1: School-led daily prayer scenario (state-written, teacher-led) for 1962 ruling.
  - Q12: Pentagon Papers prior restraint dispute during the Vietnam War.
- Stem rewrites: Replaced all formulaic stems with concise year/function/outcome phrasing (e.g., “Which 1961 decision applied the exclusionary rule…?”).
- Answers/rationales: Preserved exactly.
- Validation: PASS (quiz validator succeeded).

## Civics — Supreme Court (Quiz A)

- Target: `ss_civics_supreme_court_set1` (both duplicate blocks synchronized)
- Passages added:
  - Q1: Judicial review passage describing the 1803 decision establishing the Court’s power to invalidate unconstitutional laws.
  - Q8: Miranda warnings passage describing the requirement to inform suspects of their rights prior to interrogation.
- Stem rewrites: Diversified all items to remove formulaic “Which term best matches…” phrasing. New stems reference year, function, or outcome (e.g., “Which 1824 ruling confirmed federal authority to regulate interstate commerce?”).
- Answers/rationales: Preserved as-is for all items.
- Validation: PASS (schema and content checks succeeded).

# Social Studies Quiz Passage Additions (2025-11-08)

Added passage stimuli to strengthen reading/context integration across Westward Expansion and Colonial Period quizzes.

## Colonial Period
- Quiz `ss_us_hist_colonial_period_set1` (Quiz A)
  - Q5 Mayflower Compact: Added historical description excerpt.
  - Q8 Mercantilism: Added explanatory economic theory passage.

## Westward Expansion
- Quiz `ss_us_hist_westward_expansion_set1` (Quiz A / Manifest Destiny):
  - Q1 Manifest Destiny: Added contextual passage on providential mission rhetoric.
  - Q5 Oregon Trail: Added diary-style migration conditions passage.
  - All 12 questions: Rewrote stems to avoid the repeated “Which term best matches…” phrasing (dates, who/what, outcome-oriented wording).
- Quiz `ss_us_hist_westward_expansion_set2` (Quiz B / Territorial acquisitions):
  - Q3 Homestead Act: Added passage describing eligibility and impact (questionNumber 3).
  - Q5 Transcontinental Railroad: Added passage about Promontory Summit completion (questionNumber 5).
  - Q8 Chisholm Trail: Added cattle drive logistics passage (questionNumber 8).
  - Q1 California Gold Rush: Added miner's diary contextual passage (questionNumber 1).
  - Duplicate quiz block synchronized (both occurrences now identical with passages at Q1, Q3, Q5, Q8). Validation: PASS.
  - All 12 questions: Diversified stems (cause/effect, nicknames, policy language, trail names, invention impact).
- Quiz `ss_us_hist_westward_expansion_set3` (Quiz C / Impact on Native Americans):
  - Q1 Indian Removal Act: Added passage from 1830 context of Jackson's message & congressional action.
  - Q2 Trail of Tears: Added passage describing 1838–1839 forced march and mortality.
  - All 12 questions: Rewrote stems for variety and extended Q12 with a fuller description of the movement.
  - Duplicate quiz block synchronized (both occurrences now identical with diversified stems and passages at Q1 & Q2). Validation: PASS.

## Validation
- Ran `npm run validate-quizzes` after each set of edits; all changes passed existing validation script.

## Civil War and Reconstruction
- Quiz `ss_us_hist_civil_war_set1` (Quiz A / Causes of the Civil War):
  - Added two passages:
    - Compromise of 1850: brief overview of the package and its provisions.
    - Dred Scott decision: summary of the Court’s holding and impact.
  - Rewrote all 12 question stems to avoid the repeated “Which term best matches…” pattern; phrased as which law/event/decision, outcomes, policy definitions, and specific-noun questions.

## Foundations (1491–1763)
- Quiz `ss_us_hist_foundations` (Social Studies — U.S. History Set 6)
  - Added new passage item (Q2) for Columbian Exchange using a composite observer excerpt to prompt source-based reasoning.
  - Rewrote stems Q3–Q12 to eliminate "Which term best matches" phrasing; varied to purpose, mechanism, outcome, timeframe, administrative experiment, and migratory process.
  - Preserved all correct answers and distractors; adjusted rationales for clarity (Columbian Exchange, missions, encomienda, Roanoke, headright system, Bering Land Bridge, Iroquois Confederacy, Pequot War, King Philip's War, Navigation Acts, Dominion of New England).
  - Validation: PASS.

## Civics & Government — Bill of Rights (Quiz B: Amendments 6–10)
- Quiz `ss_civics_bill_of_rights_set2`
  - Added two passage-based items:
    - Q1 Speedy trial (Sixth Amendment): jail delay scenario; identify implicated right.
    - Q9 Excessive bail (Eighth Amendment): punitive bail scenario; identify the protection.
  - Rewrote stems for all remaining items (Q2–Q8, Q10–Q12) to remove repetitive "Which term best matches…" phrasing; now framed as application, scenario, or principle identification.
  - Keys and distractors preserved; rationales tightened for accuracy.
  - Validation: PASS.

## Civics & Government — Structure (Quiz A)
- Quiz `ss_civics_gov_structure_set1`
  - Added one passage-based item:
    - Q7 Judicial review: short scenario of Supreme Court striking down a statute; identify the power.
  - Rewrote stems across Q1–Q6, Q8–Q12 to eliminate repeated “Which term best matches…” phrasing; reframed to clear application/principle questions.
  - Answer options/keys preserved; rationales tightened for accuracy and brevity.
  - Validation: PASS.

## Next Steps (Not yet done)
- Audit remaining Social Studies quizzes lacking any `passage` fields (e.g., Set 4 industrialization / later era quizzes) and add at least 1–2 stimuli each.
- Incorporate primary source excerpts (e.g., Monroe Doctrine, Gettysburg Address) to diversify stimulus types (done in some existing questions already).
- Spot-check UI rendering for newly added passages in multiple-choice items.

---
Generated automatically on 2025-11-08.
\n+## Civics & Government — Structure (Quiz B)
  - Added two passage-based scenario items:
    - Q2 Senate advice and consent: cabinet nomination hearing excerpt prompting identification of the chamber's confirmation role.
    - Q6 Conference committee: scenario describing differing House/Senate bill versions requiring reconciliation.
  - Rewrote all remaining stems (Q1, Q3–Q5, Q7–Q12) to remove “Which term best matches…” phrasing; now framed as direct functional or scenario-based questions (presiding officer, jurisdiction types, agency rulemaking, prior decisions, chamber structure).
  - Preserved correct answers and distractors; adjusted rationales only where passage context required clarification (Q2, Q6, administrative law wording).
## Civics & Government — Structure (Quiz C)
- Quiz `ss_civics_gov_structure_set3`
  - Added two passage-based items:
    - Q1 Supremacy Clause: state vs federal conflict scenario (environmental regulation) requiring identification of the overriding principle.
    - Q6 Full Faith and Credit: recognition scenario (marriage/judgment across states) requiring identification of the clause.
  - Rewrote all remaining stems (Q2–Q5, Q7–Q12) to remove “Which term best matches…” phrasing and use clear function/scenario language (Elastic Clause flexibility, enumerated vs reserved vs concurrent powers, grants, dual vs cooperative federalism, devolution).
  - Preserved answer keys and distractors; lightly revised rationales to fit scenario wording where needed.
  - Applied edits to both duplicate occurrences of this quiz block in the JSON.
  - Validation: PASS.

  ## Civics — Political Parties (Quiz A)
  - Quiz `ss_civics_elections_set1`
    - Added two passage-based items:
      - Q1 Party platform: short platform-style excerpt to identify the document.
      - Q7 Grassroots organizing: field note describing canvassing/registration activities.
    - Rewrote all remaining stems (Q2–Q6, Q8–Q12) to avoid “Which term best matches…” phrasing; reframed as scenarios or functional definitions (realignment, two-party system, third parties, caucus, national committee, party ID, coalitions, patronage, issue advocacy, polarization).
    - Preserved keys and distractors; adjusted rationales minimally where passages required context.
    - Applied edits to both duplicate occurrences of this quiz block in the JSON.
    - Validation: PASS.

    ## Civics — Election Process (Quiz B)
    - Quiz `ss_civics_elections_set2`
      - Added two passage-based items:
        - Q1 Primary election: scenario of secret-ballot state-run contest selecting party nominee.
        - Q2 Caucus: gym meeting scenario with speeches and preference grouping.
      - Rewrote stems for Q3–Q12 to replace repetitive definition phrasing with functional or scenario-based questions (general election timing, Electoral College purpose, popular vote aggregate, winner-take-all allocation, swing state competitiveness, incumbent seeking reelection, registration prerequisite, absentee voting method, campaign finance scope, turnout proportion).
      - Preserved answer keys and distractors; updated rationales only for passage-context clarity (primary, caucus).
      - Synced edits across both duplicate JSON blocks.
      - Validation: PASS.

  - Validation: PASS.

## Civics — Civic Participation (Quiz C)
- Quiz `ss_civics_elections_set3`
  - Added two passage-based items:
    - Q1 Voting Rights Act: brief passage describing the 1965 law banning literacy tests and authorizing federal oversight; identify the law.
    - Q3 Gerrymandering: scenario passage describing district packing and cracking to advantage one party; identify the practice.
  - Rewrote stems for all remaining items (Q2, Q4–Q12) to eliminate the repetitive “Which term best matches…” phrasing, using concise scenarios or functional descriptions instead:
    - Q2 DMV registration scenario -> Motor Voter Act.
    - Q4 televised event with candidates -> Campaign debate.
    - Q5 member-contribution group donating within limits -> Political action committee.
    - Q6 independent spending without coordination -> Super PAC.
    - Q7 same-party selections across ballot -> Straight-ticket voting.
    - Q8 choosing candidates from different parties -> Split-ticket voting.
    - Q9 share of eligible citizens casting ballots -> Voter turnout.
    - Q10 communications plan across TV/radio/digital/print -> Campaign media strategy.
    - Q11 pre-election mobilization calls, reminders, rides -> Get-out-the-vote.
    - Q12 trained volunteer observing polling place -> Poll watcher.
  - Preserved all answer keys and distractors; rationales left intact where still accurate with new stems.
  - Applied edits to both duplicate occurrences of this quiz block in the JSON.
  - Validation: PASS.

## Civics — Constitutional Principles (Quiz A)
- Quiz `ss_civics_constitutional_principles_set1`
  - Added two passage-based scenario items:
    - Q1 Popular sovereignty: 1787 draft constitution excerpt highlighting consent of the governed.
    - Q7 Enumerated & implied powers: environmental standards statute scenario.
  - Rewrote stems for all items (Q2–Q6, Q8–Q12) to remove repetitive phrasing; reframed as principle identification, citizen action examples, level-of-government function, historical purpose, amendment protection, shared powers terminology, case significance, cooperative federalism characterization, clause function, Supremacy conflict resolution.
  - Preserved answer keys and distractors; rationales retained as still accurate with new stems.
  - Synchronized edits across both duplicate JSON blocks.
  - Validation: PASS.

## Civics — Constitutional Principles (Quiz B)
- Quiz `ss_civics_constitutional_principles_set2`
  - Added two passage-based items:
    - Q2 Veto: short scenario describing the President returning a bill with written objections.
    - Q11 Treaty ratification: scenario describing an international agreement requiring Senate consent.
  - Reworded stems for clarity and variety (Q1, Q3, Q4) while preserving the original answer sets and rationales.
  - Applied edits to both duplicate occurrences of this quiz block in the JSON.
  - Validation: PASS.

## Civics — Constitutional Principles (Quiz C)
- Quiz `ss_civics_constitutional_principles_set3`
  - Added two passage-based items:
    - Q2 Presidential veto: passage describing return of bill with objections.
    - Q3 Judicial injunction: passage where a federal court enjoins part of an executive order conflicting with statute.
  - Diversified remaining stems (Q1, Q4–Q12) to scenario/function phrasing (Senate limiting nominees, veto override margin, oversight hearings, power of the purse check, amendment response to rulings, impeachment accountability, structural Court size check, bill signing finalization, voter accountability leverage, effect of unconstitutional ruling).
  - Preserved answer keys and existing rationales (still contextually accurate after stem changes).
  - Synced edits across duplicate quiz blocks.
  - Validation: PASS.

