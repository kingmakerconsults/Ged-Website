// Reading Comprehension — Core: Inference & Conclusions — Practice 4
// 10 questions | drawing supported conclusions, distinguishing fact from inference
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "A local grocery store placed mirrors along the candy and snack aisle. Within three months, snack sales dropped by 18% while fresh produce sales increased by 12%. The store manager noted that customers who saw their own reflection while reaching for snacks appeared to pause and reconsider.",
    question: "Which inference is best supported by the store's observation?",
    answerOptions: [
      { text: "Mirrors cause people to make healthier choices in all situations.", isCorrect: false, rationale: "Generalising to 'all situations' is unsupported — the study is limited to one aisle in one store." },
      { text: "Seeing one's reflection may prompt brief self-reflection that influences purchasing decisions toward healthier options.", isCorrect: true, rationale: "The timing (mirror placement → behaviour change) and the manager's observation support this limited causal inference." },
      { text: "Fresh produce became cheaper at the same time the mirrors were installed.", isCorrect: false, rationale: "No price change is mentioned — this introduces an alternative explanation not present in the passage." },
      { text: "The store should install mirrors in every aisle to increase all sales.", isCorrect: false, rationale: "This goes far beyond what the passage supports." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "During the 2008 financial crisis, luxury goods sales fell sharply while discount retailers like Dollar Tree and Aldi reported record sales growth. Consumers who had previously shopped exclusively at premium grocery stores began appearing in discount chains for the first time.",
    question: "What can be most reasonably inferred from this information?",
    answerOptions: [
      { text: "Discount retailers have better quality products than luxury retailers.", isCorrect: false, rationale: "Quality comparison is not supported by the passage — only sales patterns are described." },
      { text: "Economic hardship caused consumers to prioritise price over brand loyalty.", isCorrect: true, rationale: "The shift from premium to discount stores during a financial crisis directly supports this inference." },
      { text: "Luxury goods companies went bankrupt during the 2008 crisis.", isCorrect: false, rationale: "The passage says sales 'fell sharply' — not that companies went bankrupt." },
      { text: "Dollar Tree caused the 2008 financial crisis.", isCorrect: false, rationale: "No causal relationship between discount retailers and the crisis is stated or suggested." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "In a study of 500 adults, participants who maintained a journal for 20 minutes daily reported significantly lower anxiety levels after eight weeks than a control group that did not journal. The journalling group also showed improved problem-solving performance on standardised tests. The researchers noted that participants who journalled about specific ongoing stressors — rather than general daily events — showed the greatest reductions in anxiety.",
    question: "Based on the study, which inference about the journalling effect is MOST defensible?",
    answerOptions: [
      { text: "Journalling works equally well no matter what is written.", isCorrect: false, rationale: "The study found targeted journalling about stressors produced the greatest reduction — method matters." },
      { text: "Writing about specific stressors may help people process and reduce anxiety more effectively than general journalling.", isCorrect: true, rationale: "The finding that stressor-focused journalling produced the greatest anxiety reduction directly supports this inference." },
      { text: "Journalling cures all forms of clinical anxiety.", isCorrect: false, rationale: "'Cures all forms' is far beyond what an 8-week study of general adults supports." },
      { text: "Problem-solving improves because journalling increases IQ.", isCorrect: false, rationale: "No claim about IQ is made — the mechanism is not identified in the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "Between 1880 and 1920, the United States saw the construction of thousands of Carnegie libraries — public libraries funded by steel magnate Andrew Carnegie. Carnegie believed that free access to books and self-education could allow any motivated individual to rise from poverty. He donated approximately $60 million to build 2,500 libraries across the English-speaking world. He required that local governments commit to funding the library's ongoing operation before he would give the building.",
    question: "What does Carnegie's requirement that local governments fund operations suggest about his philosophy?",
    answerOptions: [
      { text: "Carnegie did not trust local governments to manage money.", isCorrect: false, rationale: "Distrust is not implied — requiring ongoing commitment shows a partnership model, not distrust." },
      { text: "Carnegie wanted his philanthropy to create lasting, community-supported institutions rather than buildings that would close after his funding ran out.", isCorrect: true, rationale: "Requiring local operational funding ensures sustainability — the condition reflects a philosophy of lasting impact." },
      { text: "Carnegie wanted governments to repay him for the cost of the buildings over time.", isCorrect: false, rationale: "The passage says he 'donated' — no repayment arrangement is described." },
      { text: "Carnegie only cared about wealthier communities that could afford to fund operations.", isCorrect: false, rationale: "The passage doesn't suggest this — the condition was a partnership mechanism, not a wealth filter." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "From a short story: Elena arrived at the interview 20 minutes early, smoothing her blazer for the third time. She had memorised every fact on the company's website, rehearsed answers to 40 common interview questions, and printed five copies of her résumé. When the receptionist called her name, she stood, straightened her shoulders, and walked to the door — then stopped and asked if there was a restroom nearby.",
    question: "What can be inferred about Elena's emotional state?",
    answerOptions: [
      { text: "She is completely calm and comfortable with the interview situation.", isCorrect: false, rationale: "The repeated blazer-smoothing, over-preparation, and last-minute restroom request suggest anxiety, not calm." },
      { text: "She is highly anxious but has tried to manage it with thorough preparation.", isCorrect: true, rationale: "Compulsive preparation and the physical tell (restroom request upon hearing her name) indicate anxiety that preparation hasn't fully resolved." },
      { text: "She forgot to bring her résumé and is trying to delay the interview.", isCorrect: false, rationale: "She printed five copies — she clearly brought her résumé." },
      { text: "She is angry at the company for making her wait.", isCorrect: false, rationale: "Nothing in the description suggests anger." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "By 1900, more than 1,700 horse-drawn streetcar lines operated in American cities. Horse waste, disease, and city traffic from tens of thousands of animals per city created a sanitation crisis that contemporary commentators predicted would eventually make cities uninhabitable. Then, between 1900 and 1920, the automobile appeared and replaced urban horses almost entirely. Many historians point out that this transition was celebrated at the time as a solution to the horse pollution problem.",
    question: "What does this historical account most strongly suggest about technological solutions to urban problems?",
    answerOptions: [
      { text: "Cars were worse for cities than horses in every measurable way.", isCorrect: false, rationale: "The passage doesn't compare the full environmental footprint of cars versus horses." },
      { text: "New technologies that solve one problem may create new problems that only become visible over time.", isCorrect: true, rationale: "Cars were celebrated as a hygiene solution in 1900-1920 — the passage implies (without explicitly stating) that we now know cars created different long-term pollution problems. This is the most defensible inference from the overall framing." },
      { text: "Horse-drawn transport was superior to automotive transport.", isCorrect: false, rationale: "The passage describes horses as a crisis — no superiority claim is made." },
      { text: "Cities have always been unhealthy and uninhabitable.", isCorrect: false, rationale: "The passage describes the horse-era prediction of uninhabitability — it doesn't validate that prediction as permanent." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a short story: Mr. Chen had worked at the accounting firm for 22 years. Every morning he arrived at exactly 7:45, brewed his own coffee, and lined up his coloured pencils in rainbow order before opening his inbox. When the new director announced that everyone would work remotely on Fridays, Mr. Chen sat very still for a moment, cleared his throat, and said, 'I see.' He then spent the next hour reorganising the supply closet.",
    question: "What does Mr. Chen's behaviour after the announcement most likely reveal?",
    answerOptions: [
      { text: "Mr. Chen is enthusiastic about remote work and wants to start immediately.", isCorrect: false, rationale: "Reorganising the supply closet is a displacement activity — not an expression of enthusiasm." },
      { text: "Mr. Chen is deeply uncomfortable with the change and copes by imposing order on his immediate environment.", isCorrect: true, rationale: "His established routines (exact timing, colour-coded pencils) reveal a need for structure. The closet organisation after unexpected news is a classic coping response: restoring control in an uncontrollable moment." },
      { text: "Mr. Chen is angry at the director and is preparing to file a complaint.", isCorrect: false, rationale: "Nothing in the passage indicates anger or complaint-filing intent." },
      { text: "Mr. Chen has a specific responsibility to reorganise supply closets at the firm.", isCorrect: false, rationale: "The closet organisation is described as a spontaneous response to news, not a job duty." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "Between 2000 and 2020, the United States lost approximately 4.7 million manufacturing jobs. During the same period, American manufacturing output (measured by value of goods produced) rose by 40%. Companies in the same factories that once employed 1,000 workers now employ 200 — but produce more goods than before.",
    question: "What do these two simultaneous trends (fewer workers, more output) most strongly imply about American manufacturing?",
    answerOptions: [
      { text: "American manufacturers deliberately chose to reduce quality in order to cut costs.", isCorrect: false, rationale: "Producing more output at higher value contradicts a quality-reduction interpretation." },
      { text: "Automation and productivity improvements enabled manufacturers to produce more with significantly fewer workers.", isCorrect: true, rationale: "When output rises steeply while headcount falls sharply, the most direct inference is that technology/automation replaced human labour." },
      { text: "All manufacturing jobs moved overseas during this period.", isCorrect: false, rationale: "The passage shows domestic output increased — if all jobs had moved offshore, domestic value-added output would not have risen." },
      { text: "American workers became 40% less productive between 2000 and 2020.", isCorrect: false, rationale: "Output rose 40% with fewer workers — productivity per remaining worker increased, not decreased." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a biography of scientist Marie Curie: 'Her laboratory notebooks from the 1890s remain so radioactive today that researchers must wear protective gear to handle them. They are stored in lead-lined boxes. Curie herself carried test tubes of radioactive isotopes in her lab coat pockets and kept a glowing vial of radium on her bedside table, finding its soft blue-green light beautiful. She died in 1934 from aplastic anaemia — a condition now known to result from prolonged radiation exposure.'",
    question: "What can be inferred from the contrast between how Curie treated radioactive materials and the current storage and handling protocols?",
    answerOptions: [
      { text: "Curie was reckless and did not care about scientific safety.", isCorrect: false, rationale: "Safety protocols didn't exist — Curie was not reckless by the standards of her time; she was simply unaware of risks that had not yet been discovered." },
      { text: "The health risks of radiation were not yet understood in Curie's time, and her death illustrates the personal cost of working with materials whose dangers science had not yet discovered.", isCorrect: true, rationale: "Carrying radium casually, admiring its glow, and dying of radiation illness together form a powerful picture of discovery outpacing safety knowledge." },
      { text: "Modern storage protocols are unnecessarily cautious because radium is not actually dangerous.", isCorrect: false, rationale: "The notebooks remain radioactive enough to require protective gear — modern caution is clearly warranted." },
      { text: "Curie's laboratory practices were typical of all scientists in the 1890s.", isCorrect: false, rationale: "This may be true but is not supported or contradicted by the passage — we cannot infer it from these details." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2023 study monitored 1,000 college students over one semester. Students who spent more than 3 hours daily on social media were 4 times more likely to report clinical levels of loneliness than students who used social media less than 1 hour daily — even after controlling for pre-existing social anxiety. Paradoxically, students in the high-use group reported feeling more 'connected' to their peers online and described their online friend networks as 'large and supportive.'",
    question: "The 'paradox' the researchers describe most likely illustrates which phenomenon?",
    answerOptions: [
      { text: "Loneliness is not a real health problem and students who feel lonely are not actually lonely.", isCorrect: false, rationale: "Clinical loneliness is a validated, measured condition — dismissing it contradicts the study." },
      { text: "High social media use may create an illusion of connection that does not satisfy the deeper relational needs that reduce loneliness.", isCorrect: true, rationale: "Feeling 'connected' but simultaneously experiencing clinical loneliness suggests online connection doesn't provide the same psychological fulfilment as in-person relationships." },
      { text: "Students who use social media more have more friends and are therefore less lonely in reality.", isCorrect: false, rationale: "The study shows they report more clinical loneliness despite larger online networks — the reverse of this conclusion." },
      { text: "The researchers made an error in their loneliness measurements.", isCorrect: false, rationale: "No methodological error is described — the finding is treated as a genuine paradox worth explaining." },
    ],
    challenge_tags: ['rla-2'],
  },
];