// Reading Comprehension  Test Ready: Inference  Practice 8
// 10 questions | scientific reasoning, business case studies, biography, literary analysis
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A marine biologist studying coral reef recovery found that reefs near areas with strong sea urchin populations recovered from bleaching events 40% faster than reefs in areas where urchins had been overharvested. Sea urchins eat the algae that smother recovering coral. In areas without urchins, algae blooms prevented coral larvae from attaching to rock surfaces.",
    question: "What can be inferred about the role of sea urchins in reef resilience?",
    answerOptions: [
      { text: "Sea urchins help reefs recover primarily by providing essential nutrients to weakened coral polyps, which strengthens their resistance to future bleaching", isCorrect: false, rationale: "The passage states urchins eat algae  they do not provide nutrients to coral polyps. This invents a plausible but unsupported mechanism." },
      { text: "Overharvesting sea urchins has little effect on reef ecosystems because algae blooms naturally dissipate once water temperatures return to normal levels", isCorrect: false, rationale: "The passage directly states that without urchins, algae prevented coral recovery  overharvesting clearly had a significant negative effect." },
      { text: "Sea urchins perform a critical maintenance function by controlling algae, and their removal directly undermines the reef's ability to recover from bleaching", isCorrect: true, rationale: "The 40% faster recovery in urchin-rich areas, combined with the algae-control mechanism, directly supports this inference about their ecological role." },
      { text: "The faster recovery in urchin-rich areas shows that algae colonization facilitates coral settlement when regulated by urchin-mediated trophic cascades", isCorrect: false, rationale: "This inverts the relationship  algae smothers coral rather than facilitating settlement. The jargon obscures the logical reversal." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a business case study: In 2018, a national coffee chain introduced a mobile pre-ordering app. In the first year, mobile orders increased from $0 to 18% of total revenue. In-store wait times fell by an average of 4 minutes. However, barista turnover rates increased by 24% compared to the prior year. Exit interviews with departing baristas cited 'relentless order pressure with no human interaction' as the primary reason for leaving.",
    question: "What does the barista turnover data suggest about the app's impact that the revenue and wait-time data does not?",
    answerOptions: [
      { text: "The app created real operational and human costs at the staff level that the positive revenue and wait-time metrics failed to capture or reflect", isCorrect: true, rationale: "Revenue and wait times improved for customers, but turnover data reveals hidden staff-level costs  the two sets of metrics tell different stories." },
      { text: "The inverse relationship between digital transaction volume and barista retention validates that workflow automation consistently improves employee engagement", isCorrect: false, rationale: "This inverts the finding  automation worsened engagement. The jargon-heavy language disguises a claim that contradicts the exit interview data." },
      { text: "The barista turnover spike was most likely driven by a tight labor market in 2018 that happened to coincide with the app rollout during that same period", isCorrect: false, rationale: "Exit interviews specifically cited app-related pressure as the reason for leaving  an external labor market explanation contradicts direct testimony." },
      { text: "The app's strong revenue performance confirms that employee satisfaction is a secondary concern when technological innovation delivers measurable customer results", isCorrect: false, rationale: "The passage presents turnover as a genuine problem, not a secondary concern. This dismisses the data the question explicitly asks about." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a biography: 'Lincoln rarely showed anger in public. When cabinet members reported to him that Secretary of War Stanton had called him a fool, Lincoln replied quietly: \"If Stanton said I was a d--- fool, then I must be one, for he is nearly always right and generally says what he means.\" The cabinet members expected a dismissal; instead they received a lesson in the strategic use of equanimity.'",
    question: "What does Lincoln's response to Stanton's insult most reveal?",
    answerOptions: [
      { text: "Lincoln genuinely accepted Stanton's criticism as accurate and truly believed he lacked the judgment needed to lead the cabinet during wartime", isCorrect: false, rationale: "The biographer frames the response as 'strategic equanimity'  it was a calculated move, not a sincere admission of inadequacy." },
      { text: "Lincoln avoided confronting Stanton because he feared that a public conflict between them would cause Stanton to resign from his crucial wartime post", isCorrect: false, rationale: "Fear is not implied anywhere. Lincoln praised Stanton as 'nearly always right,' suggesting respect and strategy rather than fear of losing him." },
      { text: "Lincoln's equanimity toward the insult shows that emotionally restrained leaders undermine their own authority by failing to enforce respect from subordinates", isCorrect: false, rationale: "The biographer presents equanimity as a strength, not a weakness. This inverts the passage's interpretation of Lincoln's leadership approach." },
      { text: "Lincoln used calculated self-deprecation to defuse political tension while subtly praising Stanton's judgment, revealing sharp political and emotional intelligence", isCorrect: true, rationale: "By agreeing with the insult, Lincoln avoided confrontation, maintained cabinet unity, and praised Stanton's reliability  the biographer calls this strategic." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A public health study tracked lead levels in children's blood across two adjacent neighbourhoods. Neighbourhood A replaced all its lead water pipes in 2015 and saw children's blood-lead levels drop 52% by 2019. Neighbourhood B did not replace pipes but installed water filters in every home; their blood-lead levels dropped 48% over the same period. Neighbourhood B's programme cost one-tenth of A's.",
    question: "What do these findings most strongly suggest for cities with limited budgets facing lead contamination?",
    answerOptions: [
      { text: "The nearly identical reduction percentages confirm that health infrastructure follows a cost-efficiency paradox where higher spending produces diminishing returns", isCorrect: false, rationale: "A 'cost-efficiency paradox' is not an established principle in the passage. The data shows a cost difference, not a universal law about infrastructure spending." },
      { text: "Water filters may produce nearly equivalent reductions in blood-lead levels at a fraction of the cost, making them a practical interim measure for budget-limited cities", isCorrect: true, rationale: "48% vs 52% at one-tenth the cost directly supports filters as a cost-effective interim option  'interim' is appropriate since filters need ongoing maintenance." },
      { text: "The data proves that full pipe replacement is unnecessary since water filters achieved almost the same reduction in children's blood-lead levels for far less money", isCorrect: false, rationale: "'Proves unnecessary' is too strong  pipe replacement achieved a higher reduction and is a permanent fix, while filters require ongoing maintenance." },
      { text: "Since neither approach fully eliminated lead exposure, the findings suggest that partial reductions in blood-lead levels have minimal impact on children's health", isCorrect: false, rationale: "The study aims to reduce lead because it harms health  partial success does not mean partial reductions lack value for children's wellbeing." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary novel: 'The letter had been folded and unfolded so many times that three of the creases had torn through, and the handwriting  once a confident, looping cursive  could only be read by filling in the gaps from memory. Margaret carried it in her coat pocket. She had not read it in years, but she checked for it every morning, the way someone checks for keys or a wallet.'",
    question: "What does Margaret's relationship with the letter most strongly reveal?",
    answerOptions: [
      { text: "The letter's emotional significance has outlived its readability, and its physical presence serves as a talisman linking Margaret to whatever the letter represents", isCorrect: true, rationale: "She checks for it daily without reading it  the letter's meaning now resides in touch and proximity, not in the words written on it." },
      { text: "Margaret carries the letter because she routinely needs to reference its contents for practical matters, such as verifying important information or addresses", isCorrect: false, rationale: "She hasn't read it in years and the writing is illegible  practical reference is impossible and clearly not her motivation." },
      { text: "Margaret's ritualistic checking indicates that the deterioration of physical mementos gradually accelerates emotional detachment from the memories they represent", isCorrect: false, rationale: "Her daily checking shows intensified attachment, not detachment. The deterioration has not weakened her bond with the letter at all." },
      { text: "Margaret has developed a compulsive daily habit of checking for the letter, but the behavior no longer carries any particular emotional significance or meaning", isCorrect: false, rationale: "Comparing the check to keys and a wallet suggests importance, not emptiness. The worn condition proves sustained emotional engagement over many years." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A school district studied the effect of later start times on high school performance. When schools shifted from 7:30 AM to 8:45 AM, average attendance rose 6%, car accidents involving teen drivers in the district fell 14%, and SAT scores among juniors increased by an average of 17 points. Opponents of the change argued that the later start inconvenienced parents' work schedules.",
    question: "How does the opponents' argument relate to the data presented?",
    answerOptions: [
      { text: "The opponents' argument demonstrates that inconvenience to parents automatically outweighs the measured health and academic benefits observed among students", isCorrect: false, rationale: "The passage does not establish any hierarchy between parent convenience and student outcomes  this assumes a priority the data does not support." },
      { text: "The concerns about parent scheduling directly disprove the study's findings on attendance improvement, accident reduction, and standardized test score increases", isCorrect: false, rationale: "Parent inconvenience is a logistical concern that cannot invalidate separately measured health and academic data." },
      { text: "The opponents identify a legitimate logistical cost that coexists with the documented benefits, requiring decision-makers to weigh both dimensions of the change", isCorrect: true, rationale: "The data shows measurable student gains; the opponents raise a real implementation cost. Both can be true  the challenge is balancing them." },
      { text: "The opposition's focus on scheduling conflicts validates the principle that ancillary stakeholder impacts always supersede direct beneficiary outcomes in policy analysis", isCorrect: false, rationale: "No such principle exists in the passage. The word 'always' and the jargon obscure the unsupported claim that parent needs outrank student health." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "Researchers studying food deserts found that when a full-service grocery store opened in a low-income neighbourhood that previously had none, residents' purchasing of fresh fruits and vegetables increased by 22%. However, rates of diet-related illness  diabetes, hypertension, and obesity  showed no significant change after three years. Community health workers noted that many residents lacked cooking equipment, time for meal preparation, or knowledge of how to prepare fresh produce.",
    question: "What does the gap between increased purchasing and unchanged health outcomes most strongly suggest?",
    answerOptions: [
      { text: "The unchanged health outcomes prove that fresh fruits and vegetables provide no meaningful nutritional benefits to residents of low-income neighborhoods", isCorrect: false, rationale: "Nutritional science broadly supports the benefits of produce  the issue is barriers to preparation and use, not the food's inherent value." },
      { text: "The grocery store most likely failed to improve health because the produce it stocked was lower quality compared to what stores in wealthier areas typically carry", isCorrect: false, rationale: "Produce quality is never mentioned  health workers specifically identified preparation barriers like equipment and knowledge, not product quality." },
      { text: "The decoupling of purchasing from health outcomes validates the nutritional access model, in which food acquisition alone is sufficient to drive clinical improvement", isCorrect: false, rationale: "This inverts the finding  acquisition did NOT drive clinical improvement. The jargon disguises a claim that contradicts the actual results." },
      { text: "Access to healthy food is necessary but not sufficient for health improvement  structural barriers like cooking equipment, time, and food literacy must be addressed", isCorrect: true, rationale: "People bought more produce but did not get healthier, and health workers identified specific structural barriers preventing access from translating into outcomes." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a memoir: 'My mother kept every report card, every crayon drawing, every participation ribbon. They filled three closets by the time I left for college. When I asked why she kept a second-grade worksheet where I had written the number 7 backwards, she looked at me as if I had asked why she breathed. \"Because you made it,\" she said, as if no further explanation were possible.'",
    question: "What does the mother's response reveal about her relationship to the objects?",
    answerOptions: [
      { text: "The mother saves each item because she hopes her child will someday want to review these objects and appreciate their own growth and developmental progress", isCorrect: false, rationale: "Her response  'because you made it'  focuses on authorship, not the child's future appreciation. The value is in the making, not in later review." },
      { text: "Each object serves as proof of her child's existence at a moment in time  the quality or correctness is irrelevant because the authorship alone gives it meaning", isCorrect: true, rationale: "She keeps a worksheet with an error. 'Because you made it'  the value is in the making, not the merit. Achievement is beside the point." },
      { text: "The mother's comprehensive archival behavior shows that documenting achievement milestones is the primary mechanism through which her parental attachment is sustained", isCorrect: false, rationale: "Achievement is not the focus  she kept a worksheet with a mistake. The jargon obscures the fact that 'achievement milestones' contradicts her actual words." },
      { text: "The mother keeps the items because she expects them to appreciate in financial value as her child matures and potentially achieves professional recognition or success", isCorrect: false, rationale: "A backwards-7 worksheet has no financial value  her explanation is explicitly emotional, not economic." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A transportation study found that cities that built wider highways to reduce traffic congestion saw initial improvements lasting 3-5 years. After that period, traffic volumes increased to fill the new capacity, returning commute times to pre-expansion levels. The phenomenon was observed in 26 of 30 cities studied. Economists call this 'induced demand'  wider roads attract more drivers and development.",
    question: "If a city is considering widening its main highway to solve congestion, what does this study most strongly imply?",
    answerOptions: [
      { text: "Widening may provide temporary relief but is likely to produce induced demand that restores congestion, so the city should also consider demand-reduction alternatives", isCorrect: true, rationale: "The 26/30 pattern makes temporary relief the expected outcome  induced demand explains why, and alternatives logically follow from the finding." },
      { text: "The study's findings apply only to the thirty specific cities examined and cannot be reliably used to predict outcomes for any other city considering highway expansion", isCorrect: false, rationale: "A consistent pattern in 26 of 30 cities provides strong predictive evidence  dismissing it as inapplicable ignores the breadth of the data." },
      { text: "Highway widening will permanently resolve the city's congestion because adding lanes creates enough surplus capacity to absorb all future increases in traffic volume", isCorrect: false, rationale: "The study directly contradicts permanence  26 of 30 cities saw congestion return within 3-5 years as induced demand filled the new capacity." },
      { text: "The induced demand phenomenon shows that roadway capacity expansion inherently optimizes traffic equilibrium by distributing vehicles across a wider transportation network", isCorrect: false, rationale: "This uses technical language to disguise a claim opposite to the evidence  induced demand worsened congestion rather than optimizing any equilibrium." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a short story: The interview panel asked candidate after candidate the same five questions. Each candidate answered confidently and thoroughly. At the end of the day, the committee chair asked the group which candidate they wanted to hire. Every member named the candidate who had paused longest before answering  the one who had said, 'That's a harder question than it seems. Let me think for a moment,' before each response.",
    question: "What does the committee's unanimous preference most strongly suggest about how they evaluated candidates?",
    answerOptions: [
      { text: "The committee preferred the pausing candidate because the other candidates gave incorrect answers and were clearly less qualified for the position overall", isCorrect: false, rationale: "The passage states all candidates answered 'confidently and thoroughly'  nothing suggests incorrect answers or lesser qualifications." },
      { text: "The unanimous selection of the reflective candidate confirms that response latency inversely correlates with competence in structured interview assessment frameworks", isCorrect: false, rationale: "This uses jargon to claim slower responses indicate greater competence as a universal rule  the passage describes one committee's preference, not a law." },
      { text: "The committee valued visible evidence of genuine reflection over polished fluency  the pauses signaled intellectual honesty and depth rather than lack of preparation", isCorrect: true, rationale: "Every member chose the one who acknowledged difficulty and took time to think. Confidence can be performed; thoughtfulness is harder to fake." },
      { text: "The committee selected the pausing candidate because they wanted someone who would work at a slower pace and take additional time to complete all assigned duties", isCorrect: false, rationale: "Pausing to think during an interview does not imply slow work pace  the pauses are framed as thoughtfulness, not as indicators of work speed." },
    ],
    challenge_tags: ['rla-2'],
  },
];
