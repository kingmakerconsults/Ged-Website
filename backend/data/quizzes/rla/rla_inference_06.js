// Reading Comprehension  Core: Inference  Practice 6
// 10 questions | data-driven inference, cause-effect reasoning, distinguishing supported vs. unsupported conclusions
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "A 2022 poll of 3,000 American adults found that 61% could not name all three branches of the federal government. Among adults under 35, the figure was 71%. The same poll found that 44% of respondents said they could not explain what the First Amendment protects.",
    question: "What can be reasonably inferred from the poll results about civic knowledge?",
    answerOptions: [
      { text: "A significant gap in basic civic knowledge exists among American adults broadly, and younger adults demonstrate even less familiarity with government.", isCorrect: true, rationale: "The data  61% unable to name branches, 71% among under-35s  directly supports a widespread and age-related knowledge gap." },
      { text: "Civic education programs have steadily declined in quality over recent decades, which directly explains why younger adults performed worse on the poll.", isCorrect: false, rationale: "The poll measures current knowledge levels but provides no data on how education program quality has changed over time." },
      { text: "Most respondents understood the three branches but chose not to answer the survey questions accurately due to confusion over the wording.", isCorrect: false, rationale: "Nothing in the passage suggests respondents were confused by the questions or deliberately answered incorrectly." },
      { text: "The inverse correlation between respondent age and constitutional literacy suggests a pedagogical deficit in secondary institutional curricula.", isCorrect: false, rationale: "This dresses a simple poll result in academic jargon and leaps to blaming specific institutions without any supporting evidence." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "A hospital tracked hand-washing compliance among staff for six months. When reminder signs were posted near sinks, compliance rose from 42% to 67%. When the signs were removed for a follow-up period, compliance dropped back to 48% within two weeks.",
    question: "What does the drop after the signs were removed most reasonably suggest?",
    answerOptions: [
      { text: "Staff became dependent on the signs to remember proper hygiene technique, indicating a gap in their medical training and clinical education.", isCorrect: false, rationale: "Staff achieved 67% compliance with reminders, showing they knew the technique  the issue is sustained behavior, not a training gap." },
      { text: "Removing the signs proved that hospital hygiene programs are ineffective and should be replaced with stricter employee monitoring procedures.", isCorrect: false, rationale: "The program raised compliance by 25 percentage points; calling it ineffective ignores the significant measurable improvement it produced." },
      { text: "The signs functioned as behavioral prompts, and without them staff reverted toward prior habits rather than maintaining internalized compliance.", isCorrect: true, rationale: "If compliance had been internalized, it would have persisted after sign removal  the rapid decline shows signs drove the behavior." },
      { text: "The compliance regression reflects a stimulus-response extinction curve, where habituated procedural adherence decays without environmental reinforcement.", isCorrect: false, rationale: "This applies conditioning jargon incorrectly  the finding is about habit formation and environmental cues, not laboratory conditioning." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "A small fishing village recorded 400 annual fishing trips in 1980. By 2000, the total catch per trip had fallen by 58% despite the use of more efficient modern boats and equipment. By 2020, many fishing families had abandoned the trade entirely.",
    question: "What is the most reasonable inference about the state of fish populations over this period?",
    answerOptions: [
      { text: "The fishermen were using the wrong type of modern equipment, which scared fish away from the village's traditional fishing waters.", isCorrect: false, rationale: "The passage says modern boats were more efficient, not that the equipment type was wrong or that it frightened fish away." },
      { text: "Fish populations in the village's waters likely declined substantially, since even more efficient equipment produced dramatically lower catches.", isCorrect: true, rationale: "A 58% drop in catch per trip despite better technology over 40 years strongly indicates the fish population itself shrank." },
      { text: "Families abandoned fishing primarily because younger generations preferred urban employment opportunities, not because fish stocks had diminished.", isCorrect: false, rationale: "The passage mentions no employment alternatives  falling catches are the most direct explanation for families leaving the trade." },
      { text: "Increased trawling efficiency created a paradoxical yield inversion where higher catch capacity correlates with diminished net biomass extraction.", isCorrect: false, rationale: "This uses technical-sounding language to obscure a straightforward point  the data shows depletion, not a paradox of efficiency." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "A school district introduced free breakfast for all students in 2019. By the end of the school year, tardiness dropped 18%, nurse visits for headaches and stomach aches fell 31%, and disciplinary referrals in morning classes decreased 22%. Test scores did not change significantly.",
    question: "What can be most reasonably inferred from these combined results?",
    answerOptions: [
      { text: "Breakfast addressed physical needs that were interfering with attendance, health, and behavior, though academic gains may require a longer timeframe.", isCorrect: true, rationale: "Three behavioral and health metrics improved while scores held steady, suggesting physical barriers were reduced even if cognitive gains need more time." },
      { text: "The null effect on standardized metrics indicates that nutritional interventions decouple somatic wellness from cognitive performance outcomes.", isCorrect: false, rationale: "One year of unchanged scores does not prove nutrition and cognition are unrelated  this overreaches using clinical jargon." },
      { text: "Since test scores did not improve, the breakfast program mainly served as a social incentive for students to arrive on time each school morning.", isCorrect: false, rationale: "Reduced nurse visits and disciplinary referrals go well beyond an attendance incentive  they reflect genuine health and behavioral changes." },
      { text: "The program failed to achieve its primary educational purpose because none of the academic performance indicators showed measurable improvement.", isCorrect: false, rationale: "Calling the program a failure ignores three significant measured improvements in attendance, health, and classroom behavior." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "A tech company surveyed 800 remote employees. Those who had a dedicated home office reported 23% higher productivity than those who worked from couches, beds, or kitchen tables. However, employees working from dedicated offices also reported 15% more difficulty 'disconnecting' from work at the end of the day.",
    question: "What trade-off does the survey data most clearly suggest?",
    answerOptions: [
      { text: "Employees with dedicated offices are more ambitious and career-focused, which explains both their higher output and their reluctance to stop working.", isCorrect: false, rationale: "The survey compares workspace setups, not personality types  attributing the results to ambition introduces an unsupported variable." },
      { text: "Working from a couch or bed is equally productive, and the reported productivity gap reflects survey bias rather than any real performance difference.", isCorrect: false, rationale: "The 23% productivity gap is a direct survey finding; dismissing it as bias contradicts the reported data without supporting evidence." },
      { text: "A dedicated home office may boost productivity but also blur the line between work and personal life, making it harder to disengage after hours.", isCorrect: true, rationale: "Higher productivity paired with difficulty disconnecting describes a direct boundary-blurring trade-off supported by both data points." },
      { text: "Spatial work-identity fusion in home environments creates a bidirectional priming effect where productivity gains are offset by boundary dissolution.", isCorrect: false, rationale: "This uses invented jargon to restate the finding without adding meaning, and mischaracterizes the relationship as a net-zero effect." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "The following data appeared in a city crime report: burglary rates in Westside fell by 34% in the year a neighbourhood watch programme was introduced. However, burglary rates in the adjacent Northside neighbourhood  with no watch programme  rose by 28% in the same year.",
    question: "What do these two data points together most reasonably suggest?",
    answerOptions: [
      { text: "The neighbourhood watch in Westside reduced overall crime in the city, and Northside's increase was caused by separate unrelated economic factors.", isCorrect: false, rationale: "Simultaneous opposite changes in adjacent areas make coincidence unlikely  the pattern strongly suggests the two trends are connected." },
      { text: "Crime rates in both neighbourhoods were already shifting before the watch programme began, so the programme had no real measurable effect on burglary.", isCorrect: false, rationale: "No pre-existing trend data is mentioned, and this ignores the precise timing alignment between the program and the opposing rate changes." },
      { text: "The inverse correlation between adjacent jurisdictional crime indices reflects a zero-sum deterrence model within a bounded geographic area.", isCorrect: false, rationale: "This obscures the straightforward displacement idea with unnecessary jargon and incorrectly implies a fixed total amount of crime." },
      { text: "Some criminal activity may have shifted from the watched Westside area to the unwatched Northside rather than being eliminated altogether.", isCorrect: true, rationale: "A decline in one area and a concurrent rise next door is a classic crime displacement pattern  offenders relocated rather than stopped." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A nationwide study found that counties with the highest number of doctors per capita also had the highest rates of diagnostic surgeries. Critics argued this proved that doctors were performing unnecessary procedures. Defenders of the medical community pointed out that areas with more doctors may also attract sicker patients who travel for specialised care.",
    question: "Why does the defenders' alternative explanation weaken the critics' inference?",
    answerOptions: [
      { text: "It shows the critics relied on unreliable methods, so their entire argument about unnecessary diagnostic surgeries should be dismissed outright.", isCorrect: false, rationale: "Both sides accept the same data  the defenders challenge the interpretation, not the reliability of the underlying numbers." },
      { text: "It identifies patient migration as a confounding variable that could explain higher surgery rates without assuming doctors perform unnecessary procedures.", isCorrect: true, rationale: "If sicker patients travel to doctor-rich areas, higher surgery rates are expected even without unnecessary procedures, breaking the causal chain." },
      { text: "It demonstrates that high-doctor counties attract sicker patients, which means that every diagnostic surgery performed in those areas was justified.", isCorrect: false, rationale: "The defenders offer a plausible alternative, but that does not prove every surgery was necessary  it only weakens the critics' certainty." },
      { text: "The defenders' rebuttal introduces selection bias into the observational cohort, neutralizing the ecological inference fallacy in the critics' claim.", isCorrect: false, rationale: "This misapplies multiple statistical terms and distorts the defenders' straightforward argument about patient travel patterns." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A literary excerpt: 'Grandmother always set five places at the dinner table, even after Grandfather passed. The fifth plate gleamed, untouched, through every meal. When visitors asked about it, she would smile and change the subject. One evening, her grandson moved the plate to the cupboard. Grandmother set it back before the next meal without saying a word.'",
    question: "What does Grandmother's silent replacement of the plate most strongly reveal?",
    answerOptions: [
      { text: "The place setting is a deliberate ritual of ongoing connection with Grandfather, and removing it would make his absence feel unacceptably final.", isCorrect: true, rationale: "Her awareness  smiling and deflecting questions  plus her silent insistence show the act is intentional and emotionally necessary." },
      { text: "Grandmother maintains the setting out of deeply ingrained daily habit rather than any conscious emotional intention or deeper symbolic purpose.", isCorrect: false, rationale: "Her deliberate deflection when questioned and immediate restoration show conscious purpose  a mere habit would not prompt subject-changing." },
      { text: "Her non-verbal restoration of the symbolic object indicates an unresolved grief attachment operating below her conscious behavioral awareness.", isCorrect: false, rationale: "This imposes clinical jargon that contradicts the passage  her calm, purposeful actions suggest resolved intention, not unconscious grieving." },
      { text: "She replaces the plate because she disagrees with her grandson's decision to rearrange the kitchen items in her house without permission.", isCorrect: false, rationale: "The long-standing pattern since Grandfather's death makes this about mourning and memory, not a household authority dispute." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "Between 1970 and 2020, the average American new-build house grew from 1,500 to 2,300 square feet. During the same period, the average household size shrank from 3.1 to 2.5 people. Home energy costs rose steadily, and surveys showed that the rooms cited as 'least used' were formal dining rooms and guest bedrooms.",
    question: "What do these combined trends most strongly suggest?",
    answerOptions: [
      { text: "The divergence between per-capita spatial allocation and occupancy ratios indicates a market-driven overconsumption of residential square footage.", isCorrect: false, rationale: "This restates the trend in dense jargon without explaining the mismatch between growing home size, falling occupancy, and rising costs." },
      { text: "Home builders constructed larger houses because construction materials became cheaper, making additional square footage an affordable option for buyers.", isCorrect: false, rationale: "The passage provides no construction cost data, and cheaper materials would not explain why rooms like formal dining rooms go unused." },
      { text: "Americans have built increasingly large homes for shrinking households, creating substantial unused space and higher energy costs for rooms with little use.", isCorrect: true, rationale: "More square footage, fewer people, rising costs, and rooms named as unused together form a clear pattern of excess space relative to need." },
      { text: "Families chose larger homes so they would have enough room for future children, even though household sizes were declining during this entire period.", isCorrect: false, rationale: "The unused rooms cited are formal dining rooms and guest bedrooms, not children's rooms  this introduces an unsupported assumption." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A psychology experiment offered participants \\(5 to write an essay arguing a position they disagreed with. A second group was offered \\)1 for the same task. Surprisingly, the $1 group later reported greater agreement with the position they had argued than the $5 group. Researchers explained that the $5 group had sufficient external justification for writing the essay, while the $1 group did not.",
    question: "What does the researchers' explanation imply about how people resolve the discomfort of arguing a position they reject?",
    answerOptions: [
      { text: "Participants in the lower-paid group changed their beliefs because they felt guilty about accepting money for writing something dishonest.", isCorrect: false, rationale: "The researchers attribute the shift to cognitive dissonance resolution, not guilt  the two are distinct psychological mechanisms." },
      { text: "The lower-paid group agreed more with the position because the small payment forced them to think more carefully about the arguments they wrote.", isCorrect: false, rationale: "Careful reflection would be conscious, but the researchers describe an unconscious belief shift driven by insufficient external justification." },
      { text: "Insufficient extrinsic reinforcement triggers a compensatory cognitive realignment wherein attitudinal valence shifts to restore internal consonance.", isCorrect: false, rationale: "This buries the finding in dense psychological jargon without explaining the underlying mechanism in accessible terms." },
      { text: "When external justification is too small to explain their actions, people may unconsciously shift their beliefs to reduce the discomfort of having argued against them.", isCorrect: true, rationale: "With only a small payment, participants lacked a strong external reason, so they resolved discomfort by aligning beliefs with their actions." },
    ],
    challenge_tags: ['rla-2'],
  },
];
