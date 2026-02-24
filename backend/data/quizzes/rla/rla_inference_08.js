// Reading Comprehension — Test Ready: Inference — Practice 8
// 10 questions | scientific reasoning, business case studies, biography, literary analysis
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A marine biologist studying coral reef recovery found that reefs near areas with strong sea urchin populations recovered from bleaching events 40% faster than reefs in areas where urchins had been overharvested. Sea urchins eat the algae that smother recovering coral. In areas without urchins, algae blooms prevented coral larvae from attaching to rock surfaces.",
    question: "What can be inferred about the role of sea urchins in reef resilience?",
    answerOptions: [
      { text: "Sea urchins should be farmed commercially to produce food.", isCorrect: false, rationale: "Commercial farming is not suggested or supported by the passage." },
      { text: "Sea urchins serve a critical maintenance function in reef ecosystems, and their removal disrupts reef recovery capacity.", isCorrect: true, rationale: "The data directly shows urchin presence correlates with faster recovery via algae control — their removal has a documented negative consequence." },
      { text: "Coral bleaching only occurs in areas without sea urchins.", isCorrect: false, rationale: "Bleaching occurred in both urchin-rich and urchin-poor areas — urchins affect recovery speed, not bleaching occurrence." },
      { text: "Marine biologists caused the overharvesting of sea urchins.", isCorrect: false, rationale: "The biologist studied the effect — no claim about who caused overharvesting is made." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a business case study: In 2018, a national coffee chain introduced a mobile pre-ordering app. In the first year, mobile orders increased from $0 to 18% of total revenue. In-store wait times fell by an average of 4 minutes. However, barista turnover rates increased by 24% compared to the prior year. Exit interviews with departing baristas cited 'relentless order pressure with no human interaction' as the primary reason for leaving.",
    question: "What does the barista turnover data suggest about the app's impact that the revenue and wait-time data does not?",
    answerOptions: [
      { text: "The app was a complete failure for the business.", isCorrect: false, rationale: "18% revenue share and reduced wait times suggest customer-facing success — failure is too strong." },
      { text: "The app created operational and human costs at the staff level that the customer-facing metrics did not capture.", isCorrect: true, rationale: "Revenue and wait times improved from the customer's perspective; turnover and barista satisfaction deteriorated — these are real costs that the success metrics obscure." },
      { text: "Baristas should be replaced with machines to reduce turnover.", isCorrect: false, rationale: "This is a speculative policy recommendation — not an inference from the data." },
      { text: "Coffee chains should not use technology in their stores.", isCorrect: false, rationale: "The case study shows a trade-off, not a universal case against technology." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a biography: 'Lincoln rarely showed anger in public. When cabinet members reported to him that Secretary of War Stanton had called him a fool, Lincoln replied quietly: \"If Stanton said I was a d--- fool, then I must be one, for he is nearly always right and generally says what he means.\" The cabinet members expected a dismissal; instead they received a lesson in the strategic use of equanimity.'",
    question: "What does Lincoln's response to Stanton's insult most reveal?",
    answerOptions: [
      { text: "Lincoln secretly agreed that he was foolish and lacked confidence.", isCorrect: false, rationale: "The biographer frames it as 'strategic use of equanimity' — the response is a calculated de-escalation, not admission of self-doubt." },
      { text: "Lincoln used apparent self-deprecation to deflect the political tension created by the insult while subtly complimenting Stanton — demonstrating political and emotional intelligence.", isCorrect: true, rationale: "By agreeing with the insult, Lincoln avoided a confrontation, maintained cabinet stability, and actually praised Stanton's reliability — a masterful political move." },
      { text: "Lincoln and Stanton had a mutually hostile relationship.", isCorrect: false, rationale: "Lincoln's praise of Stanton as 'nearly always right' suggests respect, not hostility." },
      { text: "Lincoln was afraid of Stanton and could not fire him.", isCorrect: false, rationale: "Fear is not implied — strategic equanimity is the biographer's explicit interpretation." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A public health study tracked lead levels in children's blood across two adjacent neighbourhoods. Neighbourhood A replaced all its lead water pipes in 2015 and saw children's blood-lead levels drop 52% by 2019. Neighbourhood B did not replace pipes but installed water filters in every home; their blood-lead levels dropped 48% over the same period. Neighbourhood B's programme cost one-tenth of A's.",
    question: "What do these findings most strongly suggest for cities with limited budgets facing lead contamination?",
    answerOptions: [
      { text: "Water filters are always superior to pipe replacement for lead reduction.", isCorrect: false, rationale: "'Always superior' is too absolute — the study compares two specific programmes in two neighbourhoods." },
      { text: "Water filters may achieve nearly equivalent health outcomes to full pipe replacement at a fraction of the cost, making them a practical interim solution when budgets are constrained.", isCorrect: true, rationale: "48% vs 52% reduction at one-tenth the cost suggests filters are a cost-effective alternative — 'interim' hedges appropriately since filters require ongoing maintenance." },
      { text: "Lead in water is not a serious health concern since both reductions were partial.", isCorrect: false, rationale: "The study aims to reduce lead because it is a health concern — partial success doesn't diminish the problem's severity." },
      { text: "Neighbourhood A wasted money replacing pipes.", isCorrect: false, rationale: "Pipe replacement achieved a slightly higher reduction and is a permanent fix — calling it waste ignores its long-term benefit." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary novel: 'The letter had been folded and unfolded so many times that three of the creases had torn through, and the handwriting — once a confident, looping cursive — could only be read by filling in the gaps from memory. Margaret carried it in her coat pocket. She had not read it in years, but she checked for it every morning, the way someone checks for keys or a wallet.'",
    question: "What does Margaret's relationship with the letter most strongly reveal?",
    answerOptions: [
      { text: "She has forgotten what the letter says and needs to re-read it regularly.", isCorrect: false, rationale: "She hasn't read it in years — she checks for its physical presence, not its content." },
      { text: "The letter's emotional significance has outlasted its readability — its physical presence has become a talisman of connection to whatever or whoever it represents.", isCorrect: true, rationale: "Checking daily without reading, carrying a letter too worn to read, treating it like keys — the letter's meaning now resides in touch and proximity, not text." },
      { text: "Margaret is a disorganised person who loses things frequently.", isCorrect: false, rationale: "The daily checking pattern shows meticulous tracking — she is more attentive than average, not disorganised." },
      { text: "The letter contains important legal documents she needs for work.", isCorrect: false, rationale: "Legal documents would be replaced, not carried in a pocket for years until illegible." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A school district studied the effect of later start times on high school performance. When schools shifted from 7:30 AM to 8:45 AM, average attendance rose 6%, car accidents involving teen drivers in the district fell 14%, and SAT scores among juniors increased by an average of 17 points. Opponents of the change argued that the later start inconvenienced parents' work schedules.",
    question: "How does the opponents' argument relate to the data presented?",
    answerOptions: [
      { text: "It disproves the health and academic benefits observed in the study.", isCorrect: false, rationale: "Parent inconvenience is a real concern but does not disprove the measured health and academic outcomes." },
      { text: "It identifies a legitimate logistical cost that exists alongside — but does not negate — the documented benefits, requiring decision-makers to weigh both dimensions.", isCorrect: true, rationale: "The data shows measurable student gains; the opponents raise a real implementation cost. Both can be true simultaneously — the question is how to weigh them." },
      { text: "Parent work schedules are more important than student health outcomes.", isCorrect: false, rationale: "The passage presents the argument but does not establish this ranking of priorities." },
      { text: "The study's data was flawed because parents were inconvenienced.", isCorrect: false, rationale: "Parent inconvenience is a separate issue from data validity." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "Researchers studying food deserts found that when a full-service grocery store opened in a low-income neighbourhood that previously had none, residents' purchasing of fresh fruits and vegetables increased by 22%. However, rates of diet-related illness — diabetes, hypertension, and obesity — showed no significant change after three years. Community health workers noted that many residents lacked cooking equipment, time for meal preparation, or knowledge of how to prepare fresh produce.",
    question: "What does the gap between increased purchasing and unchanged health outcomes most strongly suggest?",
    answerOptions: [
      { text: "Fresh fruits and vegetables have no health benefits.", isCorrect: false, rationale: "Nutritional science broadly supports their benefits — the issue is implementation, not the food itself." },
      { text: "Access to healthy food is necessary but not sufficient for health improvement — structural barriers like cooking equipment, time, and food literacy must also be addressed.", isCorrect: true, rationale: "People bought more produce but didn't get healthier, and health workers identified specific barriers. Access without the supporting infrastructure didn't translate to health outcomes." },
      { text: "The grocery store was selling low-quality produce.", isCorrect: false, rationale: "Produce quality is not mentioned — the health workers identified preparation barriers, not quality issues." },
      { text: "Low-income residents prefer processed food over fresh food.", isCorrect: false, rationale: "A 22% increase in produce purchasing contradicts the claim that residents prefer processed food." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a memoir: 'My mother kept every report card, every crayon drawing, every participation ribbon. They filled three closets by the time I left for college. When I asked why she kept a second-grade worksheet where I had written the number 7 backwards, she looked at me as if I had asked why she breathed. \"Because you made it,\" she said, as if no further explanation were possible.'",
    question: "What does the mother's response reveal about her relationship to the objects?",
    answerOptions: [
      { text: "She keeps them because they might have financial value someday.", isCorrect: false, rationale: "A backwards-7 worksheet has no financial value — her reason is explicitly emotional." },
      { text: "For her, each object is not a record of achievement but proof of her child's existence and presence at a moment in time — the content is irrelevant; the authorship is everything.", isCorrect: true, rationale: "She keeps a worksheet with an error. 'Because you made it' — the value is in the making, not the merit. Achievement is beside the point." },
      { text: "She is a hoarder who cannot throw anything away.", isCorrect: false, rationale: "The collection is specific — only the child's items — and her explanation shows intentionality, not compulsive hoarding." },
      { text: "She is disappointed in her child's academic performance.", isCorrect: false, rationale: "Her protective instinct toward a flawed worksheet shows the opposite of disappointment." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A transportation study found that cities that built wider highways to reduce traffic congestion saw initial improvements lasting 3-5 years. After that period, traffic volumes increased to fill the new capacity, returning commute times to pre-expansion levels. The phenomenon was observed in 26 of 30 cities studied. Economists call this 'induced demand' — wider roads attract more drivers and development.",
    question: "If a city is considering widening its main highway to solve congestion, what does this study most strongly imply?",
    answerOptions: [
      { text: "Highway widening will permanently solve the city's traffic problems.", isCorrect: false, rationale: "26 of 30 cities saw congestion return within 3-5 years — permanence is directly contradicted." },
      { text: "Widening may provide temporary relief but is likely to generate enough induced demand to restore congestion to original levels, suggesting the city should consider demand-reduction alternatives.", isCorrect: true, rationale: "The 26/30 pattern makes temporary relief the expected outcome, and 'induced demand' explains why — more capacity generates more traffic." },
      { text: "All highway construction is wasteful and should be stopped.", isCorrect: false, rationale: "The study identifies a specific pattern about congestion relief — it doesn't condemn all construction." },
      { text: "The four cities that did not see congestion return prove highway widening works.", isCorrect: false, rationale: "4 out of 30 is an 13% success rate — citing the exceptions as proof ignores the overwhelming pattern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a short story: The interview panel asked candidate after candidate the same five questions. Each candidate answered confidently and thoroughly. At the end of the day, the committee chair asked the group which candidate they wanted to hire. Every member named the candidate who had paused longest before answering — the one who had said, 'That's a harder question than it seems. Let me think for a moment,' before each response.",
    question: "What does the committee's unanimous preference most strongly suggest about how they evaluated candidates?",
    answerOptions: [
      { text: "The committee preferred candidates who spoke slowly.", isCorrect: false, rationale: "Speed of speech is different from thoughtful pausing — the candidate paused to think, not to speak slowly." },
      { text: "The committee valued visible evidence of genuine thought over polished, rehearsed fluency — the pauses signalled depth and honesty rather than lack of preparation.", isCorrect: true, rationale: "Every member chose the one who acknowledged difficulty and took time to think. Confidence can be performed; thoughtfulness is harder to fake." },
      { text: "Confident candidates are always less qualified than hesitant ones.", isCorrect: false, rationale: "The passage describes one committee's preference — 'always' is an unsupported generalisation." },
      { text: "The committee wanted to hire the least experienced candidate.", isCorrect: false, rationale: "Nothing connects pausing with inexperience — the pauses are framed as thoughtfulness, not ignorance." },
    ],
    challenge_tags: ['rla-2'],
  },
];