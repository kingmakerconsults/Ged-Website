# Premade Quiz Quality Audit — 2026-04-30T12:08:56.063Z

**Total questions:** 4232  **With ≥1 issue:** 758 (17.91%)

## Issue counts (workspace-wide)
| Issue | Count |
|---|---:|
| duplicate-rationales | 376 |
| weak-rationale | 274 |
| invalid-correct-count | 174 |
| science-thin-rationale | 97 |
| short-correct-rationale | 64 |
| non-four-options | 57 |
| missing-stimulus | 22 |
| duplicate-options | 12 |
| short-question-text | 3 |

## Per source
### `frontend/data/quiz_data.js` — 396 questions, 63 flagged (15.91%), 17 quizzes affected
| Issue | Count |
|---|---:|
| science-thin-rationale | 47 |
| short-correct-rationale | 10 |
| duplicate-rationales | 6 |
| short-question-text | 3 |

**By subject:**
| Subject | Questions | Flagged |
|---|---:|---:|
| Science | 180 | 52 |
| Math | 144 | 11 |
| Reasoning Through Language Arts (RLA) | 72 | 0 |

### `backend/data/premade-questions.js` — 74 questions, 0 flagged (0.00%), 0 quizzes affected

**By subject:**
| Subject | Questions | Flagged |
|---|---:|---:|
| Science | 48 | 0 |
| Math | 1 | 0 |
| Social Studies | 1 | 0 |
| Reasoning Through Language Arts (RLA) | 24 | 0 |

### `quizzes.txt` — 6 questions, 6 flagged (100.00%), 3 quizzes affected
| Issue | Count |
|---|---:|
| invalid-correct-count | 6 |
| weak-rationale | 6 |

### `frontend/Expanded/expanded.quizzes.bundle.js` — 3588 questions, 521 flagged (14.52%), 162 quizzes affected
| Issue | Count |
|---|---:|
| duplicate-rationales | 370 |
| weak-rationale | 156 |
| short-correct-rationale | 54 |
| science-thin-rationale | 50 |
| missing-stimulus | 22 |
| duplicate-options | 12 |
| non-four-options | 1 |

**By subject:**
| Subject | Questions | Flagged |
|---|---:|---:|
| Math | 984 | 114 |
| Social Studies | 1332 | 258 |
| Science | 663 | 94 |
| Reasoning Through Language Arts (RLA) | 599 | 55 |
| RLA | 10 | 0 |

### `frontend/New Exams/new_math_exams2.js` — 168 questions, 168 flagged (100.00%), 14 quizzes affected
| Issue | Count |
|---|---:|
| invalid-correct-count | 168 |
| weak-rationale | 112 |
| non-four-options | 56 |

## Quizzes failing >5% of questions (top 50)
| File | Quiz | Subject | Q# | Flagged | Fail % |
|---|---|---|---:|---:|---:|
| frontend/Expanded/expanded.quizzes.bundle.js | history-maps Visual Practice (social_studies_img_history_maps) | Social Studies | 23 | 23 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Structure & Purpose (rla_info_structure_purpose) | Reasoning Through Language Arts (RLA) | 15 | 15 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | The Cold War Era (1945-1991) (ss_us_hist_cold_war) | Social Studies | 13 | 13 | 100% |
| frontend/New Exams/new_math_exams2.js | Percents Quiz 1 (math_quant_percents_quiz_1) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Percents Quiz 2 (math_quant_percents_quiz_2) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Ratios and Proportions Quiz 1 (math_quant_ratios_quiz_1) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Ratios and Proportions Quiz 2 (math_quant_ratios_quiz_2) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Fractions and Decimals Quiz 1 (math_quant_fractions_decimals_quiz_1) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Fractions and Decimals Quiz 2 (math_quant_fractions_decimals_quiz_2) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Functions and Word Problems Quiz 1 (math_alg_functions_quiz_1) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Functions and Word Problems Quiz 2 (math_alg_functions_quiz_2) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Area, Perimeter, and Volume Quiz 1 (math_geom_area_perimeter_volume_quiz_1) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Area, Perimeter, and Volume Quiz 2 (math_geom_area_perimeter_volume_quiz_2) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Expressions and Equations Quiz 1 (math_alg_expressions_quiz_1) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Expressions and Equations Quiz 2 (math_alg_expressions_quiz_2) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Formulas Quiz 1 (math_geom_formulas_quiz_1) | Math | 12 | 12 | 100% |
| frontend/New Exams/new_math_exams2.js | Formulas Quiz 2 (math_geom_formulas_quiz_2) | Math | 12 | 12 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist Cold War Practice 1 (Foundations) (ss_us_hist_cold_war_quiz1) | Social Studies | 10 | 10 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist Cold War Practice 2 (Core Skills) (ss_us_hist_cold_war_quiz2) | Social Studies | 10 | 10 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist Cold War Practice 3 (Test Ready) (ss_us_hist_cold_war_quiz3) | Social Studies | 10 | 10 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Meaning from Context (rla_vocabulary_05) | Reasoning Through Language Arts (RLA) | 4 | 4 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Determining Word Meanings (rla_vocabulary_06) | Reasoning Through Language Arts (RLA) | 4 | 4 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Understanding Vocabulary from Context (rla_vocabulary_07) | Reasoning Through Language Arts (RLA) | 4 | 4 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Advanced Vocabulary (rla_vocabulary_08) | Reasoning Through Language Arts (RLA) | 4 | 4 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Challenging Vocabulary (rla_vocabulary_09) | Reasoning Through Language Arts (RLA) | 4 | 4 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Comprehensive Vocabulary Review (rla_vocabulary_10) | Reasoning Through Language Arts (RLA) | 4 | 4 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | US-history-maps Visual Practice (rla_img_us_history_maps) | Reasoning Through Language Arts (RLA) | 3 | 3 | 100% |
| quizzes.txt | Causes of the Revolution (us_history_revolution_quiz_1) | unknown | 2 | 2 | 100% |
| quizzes.txt | Key Figures and Battles (us_history_revolution_quiz_2) | unknown | 2 | 2 | 100% |
| quizzes.txt | Ideals and Consequences (us_history_revolution_quiz_3) | unknown | 2 | 2 | 100% |
| frontend/Expanded/expanded.quizzes.bundle.js | Industrial America (1877-1914) (ss_us_hist_industrial_america) | Social Studies | 15 | 14 | 93.3% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist Industrial America Practice 1 (Foundations) (ss_us_hist_industrial_america_quiz1) | Social Studies | 12 | 11 | 91.7% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist Industrial America Practice 2 (Core Skills) (ss_us_hist_industrial_america_quiz2) | Social Studies | 12 | 11 | 91.7% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist Industrial America Practice 3 (Test Ready) (ss_us_hist_industrial_america_quiz3) | Social Studies | 12 | 11 | 91.7% |
| frontend/Expanded/expanded.quizzes.bundle.js | Interpreting Graphics (rla_info_graphics) | Reasoning Through Language Arts (RLA) | 15 | 12 | 80% |
| frontend/Expanded/expanded.quizzes.bundle.js | Equations & Inequalities (math_alg_equations_inequalities) | Math | 15 | 11 | 73.3% |
| frontend/Expanded/expanded.quizzes.bundle.js | bar-charts Visual Practice (social_studies_img_bar_charts) | Social Studies | 15 | 10 | 66.7% |
| frontend/data/quiz_data.js | unknown (sci_physical_science_basics_set1) | Science | 15 | 9 | 60% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist New Nation Practice 1 (Foundations) (ss_us_hist_new_nation_quiz1) | Social Studies | 12 | 7 | 58.3% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist New Nation Practice 2 (Core Skills) (ss_us_hist_new_nation_quiz2) | Social Studies | 12 | 7 | 58.3% |
| frontend/Expanded/expanded.quizzes.bundle.js | Us Hist New Nation Practice 3 (Test Ready) (ss_us_hist_new_nation_quiz3) | Social Studies | 12 | 7 | 58.3% |
| frontend/Expanded/expanded.quizzes.bundle.js | Westward Expansion (ss_us_hist_new_nation) | Social Studies | 30 | 15 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | Ratios, Proportions & Percents (math_quant_ratios_percents) | Math | 18 | 9 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | physics-diagrams Visual Practice (science_img_physics_diagrams) | Social Studies | 10 | 5 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | chemistry-diagrams Visual Practice (science_img_chemistry_diagrams) | Social Studies | 10 | 5 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | line-graphs Visual Practice (social_studies_img_line_graphs) | Social Studies | 8 | 4 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | civics-maps Visual Practice (social_studies_img_civics_maps) | Social Studies | 8 | 4 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | science-graphs Visual Practice (science_img_science_graphs) | Social Studies | 6 | 3 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | General Visual Practice (social_studies_img_general) | Social Studies | 6 | 3 | 50% |
| frontend/Expanded/expanded.quizzes.bundle.js | economic-maps Visual Practice (social_studies_img_economic_maps) | Social Studies | 6 | 3 | 50% |

Full per-quiz matrix and a sample of up to 500 flagged questions are in the JSON report.
