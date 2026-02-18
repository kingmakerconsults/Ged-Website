/**
 * rewrite-rla-c.cjs — RLA batch 3
 * inference_04-10, vocabulary_04-10
 * Run: node scripts/rewrite-rla-c.cjs
 */

const fs = require('fs');
const path = require('path');
const RLA = path.join(__dirname, '../backend/data/quizzes/rla');
const write = (f, c) => {
  fs.writeFileSync(path.join(RLA, f), c.trim(), 'utf8');
  console.log('  ✓', f);
};

// ─── INFERENCE 04 — Core ────────────────────────────────────────────────────
write('rla_inference_04.js', `
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
`);

// ─── INFERENCE 05 — Core ────────────────────────────────────────────────────
write('rla_inference_05.js', `
// Reading Comprehension — Core: Inference — Practice 5
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "The town of Millbridge cancelled its annual summer festival for the third consecutive year, citing 'financial constraints and insufficient volunteer coordination.' Last year's festival had attracted 8,000 visitors and generated an estimated $400,000 for local businesses. The mayor released a statement saying the town 'looks forward to exploring new options for community celebration in coming years.'",
    question: "What can most reasonably be inferred from the mayor's statement?",
    answerOptions: [
      { text: "The mayor plans to hold three festivals next year to make up for lost years.", isCorrect: false, rationale: "Nothing in the statement suggests multiple festivals — it is deliberately vague." },
      { text: "The mayor is being diplomatically vague, leaving open the possibility that the festival may not return in its previous form.", isCorrect: true, rationale: "'Exploring new options' and 'in coming years' are non-committal — standard political phrasing when a tradition may be ending without saying so directly." },
      { text: "The festival was cancelled because visitors stopped attending.", isCorrect: false, rationale: "8,000 visitors in the last held year suggests strong attendance — cancellation was due to finances and volunteers." },
      { text: "Millbridge has decided to permanently eliminate all public celebrations.", isCorrect: false, rationale: "The mayor's statement specifically mentions 'community celebration' — a permanent ban is not implied." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "Ancient Romans built aqueducts — engineered stone channels — to carry fresh water from mountain springs into cities, sometimes over distances of 100 kilometres. The aqueducts used gravity alone, with the channel graded at a precise and consistent slight downhill angle. Some Roman aqueducts are still partially functioning today.",
    question: "What does the fact that some aqueducts are still partially functioning imply?",
    answerOptions: [
      { text: "Roman engineers had access to modern concrete technology.", isCorrect: false, rationale: "Romans used their own concrete — calling it 'modern' is anachronistic." },
      { text: "The Romans built with remarkable durability and engineering precision that has allowed structures to survive 2,000 years.", isCorrect: true, rationale: "Still-functional infrastructure after 2,000 years is direct evidence of exceptional construction quality and design." },
      { text: "The Romans built aqueducts using iron pipes that will never corrode.", isCorrect: false, rationale: "The passage describes stone channels, not iron pipes." },
      { text: "Modern engineers have had to completely rebuild the aqueducts in recent centuries.", isCorrect: false, rationale: "'Partially functioning' implies the original structures remained — not that they were fully rebuilt." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "From a short story: When David's phone buzzed with a number he didn't recognise, he let it go to voicemail. An hour later, checking the message, he heard his daughter's voice: 'Dad, I borrowed a friend's phone. Please call me back.' He stared at the screen for a long moment, then called — not the number she'd called from, but his daughter's own number.",
    question: "Why did David call his daughter's own number rather than the number she called from?",
    answerOptions: [
      { text: "He had forgotten the number she called from.", isCorrect: false, rationale: "He had just listened to the message — the number would be present on the screen." },
      { text: "He was suspicious that the voicemail was not actually from his daughter and wanted to verify by calling her known number.", isCorrect: true, rationale: "The deliberate pause and choice to call her direct number — rather than the number left — suggests he wanted to confirm the caller's identity through a trusted contact point." },
      { text: "He didn't know how to return calls from unknown numbers on his phone.", isCorrect: false, rationale: "The passage doesn't support technophobia — his behaviour is deliberate, not confused." },
      { text: "He wanted to congratulate his daughter on getting a new phone.", isCorrect: false, rationale: "Nothing suggests this — the message said she borrowed a friend's phone." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "From 1950 to 1970, the U.S. government built the Interstate Highway System — 47,000 miles of limited-access highways connecting every major American city. The project cost $425 billion in today's dollars. Simultaneously, mass transit ridership in American cities fell by more than 60% between 1950 and 1970, and dozens of urban streetcar systems were dismantled during this period.",
    question: "What is the most reasonable inference about the relationship between these two trends?",
    answerOptions: [
      { text: "Interstate highways caused public transit companies to improve their service quality.", isCorrect: false, rationale: "The opposite happened — ridership fell dramatically while highways were built." },
      { text: "The massive federal investment in highways made car travel so convenient that public transit use declined sharply.", isCorrect: true, rationale: "Simultaneous highway expansion and dramatic transit decline is most logically explained by a causal relationship — cars became the practical default as highways made driving more attractive." },
      { text: "Americans stopped using transit because it became too expensive during this period.", isCorrect: false, rationale: "Pricing is not mentioned — the passage points to infrastructure investment as the key variable." },
      { text: "Streetcar companies went bankrupt before 1950 because of poor management.", isCorrect: false, rationale: "The timeline shows dismantling happened during 1950-1970, concurrent with highway construction." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a science article: For decades, astronomers accepted that the universe was electrically neutral at the largest scales — that positive and negative charges balanced out in cosmic structures. Then, in the 1990s, instruments sensitive enough to detect weak magnetic fields found that the filaments connecting galaxy clusters appear to carry faint, structured magnetic fields. No existing model of cosmic formation fully explains these fields. Some researchers now wonder whether large-scale electromagnetic forces may play a role in cosmic structure that has been systematically underestimated.",
    question: "What can be inferred about the state of cosmological science from this passage?",
    answerOptions: [
      { text: "Physics has fully explained all features of the universe and no major revisions are needed.", isCorrect: false, rationale: "The discovery of unexplained cosmic magnetic fields directly contradicts this." },
      { text: "The discovery of unexpected cosmic magnetic fields suggests that current cosmological models may be incomplete and open to significant revision.", isCorrect: true, rationale: "'No existing model fully explains' the fields, and researchers are reopening the question of electromagnetic forces — a clear signal of potential model revision." },
      { text: "Astronomers in the 1990s were incompetent and failed to notice obvious magnetic fields.", isCorrect: false, rationale: "The fields were undetected because instruments weren't sensitive enough — not because of incompetence." },
      { text: "The universe is definitively electrically charged at all scales.", isCorrect: false, rationale: "The passage says the fields exist in filaments between galaxy clusters — not that the universe is entirely charged." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary excerpt: 'When the company announced it was relocating its headquarters to Denver, nobody was more publicly supportive than Regional Vice President Norris. He sent encouraging emails to staff, hosted town halls about the exciting opportunities ahead, and volunteered to chair the relocation committee. Three weeks after the move was complete, Norris submitted his resignation.'",
    question: "What do Norris's actions before and after the move suggest?",
    answerOptions: [
      { text: "Norris was sincerely enthusiastic about the relocation and resigned for unrelated personal reasons.", isCorrect: false, rationale: "The deliberate proximity of the resignation (three weeks after completion) makes unrelated reasons implausible as the most likely interpretation." },
      { text: "Norris privately opposed the relocation but used public support to manage his professional standing until a more convenient moment to leave.", isCorrect: true, rationale: "The pattern — strong public support, volunteering to lead, then immediate post-completion resignation — suggests his support was strategic rather than genuine." },
      { text: "Norris was forced to resign by his superiors after the move.", isCorrect: false, rationale: "'Submitted his resignation' implies a voluntary act." },
      { text: "Denver's job market has no opportunities for Vice Presidents.", isCorrect: false, rationale: "This is speculation not supported by the passage." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "In the decade following the introduction of smartphones in 2007, rates of depression, anxiety, and suicide attempts among American teenagers — particularly girls — rose sharply. Researcher Jean Twenge documented the shift, noting that teen social life migrated from in-person hangouts to phone-based communication. Her correlational data showed that teens who spent 5 or more hours daily on their phones were 66% more likely to have at least one risk factor for suicide.",
    question: "Which inference is most appropriately cautious given that the study is correlational?",
    answerOptions: [
      { text: "Smartphones definitely cause teen mental health decline.", isCorrect: false, rationale: "'Definitely cause' is too strong — correlation does not establish causation." },
      { text: "There is a strong correlation between heavy smartphone use and teen mental health risk factors, suggesting a possible relationship that warrants further causal investigation.", isCorrect: true, rationale: "Acknowledges the finding (strong correlation) while appropriately limiting the inference to 'possible relationship' and calling for causal research." },
      { text: "The timing is coincidental and smartphones have no relationship to teen mental health.", isCorrect: false, rationale: "The 66% correlation with risk factors is too strong to dismiss as coincidental." },
      { text: "All teens who use smartphones 5 hours daily will develop suicidal ideation.", isCorrect: false, rationale: "'All' is far beyond what a correlation study demonstrates." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a scientific journal abstract: A study of 400 professional athletes found that those who participated in structured mindfulness training for 8 weeks showed a 31% reduction in self-reported anxiety around competition and a 22% improvement in reaction time on standardised tests. A control group of 400 athletes in the same sport who did not receive mindfulness training showed no significant change in either measure over the same period.",
    question: "What makes this study's evidence stronger than a study without a control group?",
    answerOptions: [
      { text: "The study used professional athletes, who are more reliable reporters.", isCorrect: false, rationale: "The control group design, not the subject population, is what strengthens the evidence." },
      { text: "The control group allows us to determine that the improvements in the mindfulness group are not simply due to time passing, training effects, or natural variation.", isCorrect: true, rationale: "If the control group showed no change, the improvements in the mindfulness group cannot be attributed to non-intervention factors — the control group isolates the effect." },
      { text: "Having 400 athletes is the minimum scientifically valid sample size.", isCorrect: false, rationale: "No such universal minimum is established — and that isn't the issue that control groups address." },
      { text: "The study was 8 weeks long, which is the optimal research duration.", isCorrect: false, rationale: "Duration is separate from the methodological value of a control group." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "From an 1845 political speech: 'Gentlemen, our nation is young and its greatness is not yet achieved; it lies ahead of us, in the vast territories that Providence has clearly destined to be ours. The peoples who now roam these lands will adapt to civilised ways, or they will perish — as all races unfitted for progress must ultimately perish before superior ones.'",
    question: "What does this speech reveal about the ideological framework used to justify westward expansion?",
    answerOptions: [
      { text: "The speaker was trying to protect the rights of all people living on the continent.", isCorrect: false, rationale: "The speech explicitly frames other peoples as 'unfitted for progress' — not as equal rights-holders." },
      { text: "The speaker used racial hierarchy and religious justification (Providence) to frame territorial conquest as inevitable and morally sanctioned.", isCorrect: true, rationale: "The speech combines racial hierarchy ('superior races') and divine mandate ('Providence') to reframe conquest as natural law — a clear ideological framework." },
      { text: "The speaker opposed westward expansion.", isCorrect: false, rationale: "The speech advocates for expansion." },
      { text: "The speaker's views represent modern American values.", isCorrect: false, rationale: "These views represent 19th-century Manifest Destiny ideology — they are explicitly contradicted by modern constitutional and civil rights principles." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary excerpt: The courtroom fell silent as the judge read the verdict aloud. Marcus kept his face still. He had learned, over twenty-three years of trying cases, that jurors watch the attorney's face when the verdict is read — that any flicker is interpreted as either relief or defeat, smugness or surprise, all of which can undo future cases with the same jury pool. Only after the door to the parking garage closed behind him did he allow himself to exhale slowly, lower himself onto a parking block, and rest his head in his hands.",
    question: "What does the contrast between Marcus's courtroom behaviour and his parking garage behaviour most reveal?",
    answerOptions: [
      { text: "Marcus is a cold person who never truly cares about his cases.", isCorrect: false, rationale: "His collapse in the parking garage shows he cares deeply — courtroom restraint is professional, not personal coldness." },
      { text: "Marcus maintains rigid professional composure in public while experiencing genuine emotional release only when no one is watching — suggesting the verdict was significant and the controlled exterior cost him effort.", isCorrect: true, rationale: "The post-verdict exhale, the descent onto a parking block, and head in hands are unmistakable signs of emotional release after sustained suppression." },
      { text: "Marcus won the case and is celebrating alone.", isCorrect: false, rationale: "Head in hands is not a celebration gesture — the emotional context is ambiguous but heavy, not triumphant." },
      { text: "Marcus forgot to eat and is simply tired after a long day.", isCorrect: false, rationale: "The passage frames everything around the verdict and professional composure — fatigue is not the explanation offered." },
    ],
    challenge_tags: ['rla-2'],
  },
];
`);

// ─── INFERENCE 06-10 — Core through Challenge ───────────────────────────────
// Each file: 1 well-crafted anchor question, stated difficulty
const inferenceStubs = [
  { file: 'rla_inference_06.js', tier: 'Core', n: 6 },
  { file: 'rla_inference_07.js', tier: 'Test Ready', n: 7 },
  { file: 'rla_inference_08.js', tier: 'Test Ready', n: 8 },
  { file: 'rla_inference_09.js', tier: 'Test Ready', n: 9 },
  { file: 'rla_inference_10.js', tier: 'Challenge', n: 10 },
];

const inferenceQuestions = [
  // 06 Core
  [
    { passage: "A 2022 poll of 3,000 American adults found that 61% could not name all three branches of the federal government. Among adults under 35, the figure was 71%. The same poll found that 44% of respondents said they could not explain what the First Amendment protects.", q: "What can be reasonably inferred from the poll results about civic knowledge?", a1: "The majority of Americans have taken civics courses and passed them.", c1: false, r1: "No data on course completion is given.", a2: "There is a significant and widespread gap in basic civic knowledge among American adults, with younger adults showing even lower familiarity.", c2: true, r2: "61% unable to name three branches and 71% among under-35s directly support a widespread knowledge gap.", a3: "All Americans who can name all three branches are also familiar with the First Amendment.", c3: false, r3: "The poll measures two separate knowledge areas — no such correlation is stated.", a4: "The U.S. should eliminate its three-branch government structure.", c4: false, r4: "The poll reveals knowledge gaps, not a policy prescription.", diff: 'easy' },
    { passage: "A small fishing village recorded 400 annual fishing trips in 1980. By 2000, the total catch per trip had fallen by 58% despite the use of more efficient modern boats and equipment. By 2020, many fishing families had abandoned the trade entirely.", q: "What is the most reasonable inference about the state of fish populations over this period?", a1: "Modern equipment caused fish to swim to deeper water temporarily.", c1: false, r1: "Temporary depth migration doesn't explain a 40-year decline across catch totals.", a2: "The fish population in the village's fishing waters likely declined substantially due to overfishing or environmental change.", c2: true, r2: "More efficient equipment plus dramatically lower catch per trip across 40 years strongly suggests resource depletion.", a3: "The fishing families left because they found higher-paying industries.", c3: false, r3: "The passage doesn't mention employment alternatives — the most direct inference is about fish populations.", a4: "Fishing in 2000 was less efficient than fishing in 1980.", c4: false, r4: "The passage says modern boats are more efficient — catch decline despite efficiency gains points to resource depletion.", diff: 'medium' },
    { passage: "The following data appeared in a city crime report: burglary rates in Westside fell by 34% in the year a neighbourhood watch programme was introduced. However, burglary rates in the adjacent Northside neighbourhood — with no watch programme — rose by 28% in the same year.", q: "What do these two data points together most reasonably suggest?", a1: "The neighbourhood watch eliminated burglary from the entire city.", c1: false, r1: "Northside rates rose — the programme clearly did not eliminate citywide burglary.", a2: "Some burglars may have shifted their activity from Westside to Northside rather than stopping burglary altogether.", c2: true, r2: "A simultaneous fall in one area and rise in the adjacent area is a classic displacement pattern — burglars shifted locations rather than stopping.", a3: "Neighbourhood watches always reduce crime in every area they operate.", c3: false, r3: "This case shows crime displaced to an adjacent area — 'always' and 'every area' are unsupported generalisations.", a4: "The police failed to respond effectively to the Northside increase.", c4: false, r4: "Police response is not discussed — the data pattern is about displacement, not policing.", diff: 'hard' },
  ],
  // 07 Test Ready
  [
    { passage: "During the Second World War, the U.S. government conducted a study of military aircraft that returned from missions and plotted the locations of bullet damage. Engineers proposed reinforcing the areas with the most hits. Statistician Abraham Wald argued the opposite: the areas that should be reinforced were the ones with NO bullet damage on returning planes — because damage in those areas meant the aircraft didn't return.", q: "What principle does Wald's reasoning illustrate?", a1: "Pilots who survived were better at avoiding bullets.", c1: false, r1: "The argument is about where the damage was, not pilot skill.", a2: "Survivorship bias — studying only surviving cases can lead to false conclusions about where protection is most needed.", c2: true, r2: "Planes hit in critical areas didn't return — so the returning planes' damage pattern omits the fatal hits, creating a biased sample.", a3: "Aircraft should not be reinforced at all because reinforcement adds weight.", c3: false, r3: "Wald's argument is about where to reinforce, not whether to reinforceempty.", a4: "Statistical analysis should only be applied to aircraft that were destroyed.", c4: false, r4: "Wald was analysing the returning planes precisely to infer about the destroyed ones.", diff: 'hard' },
    { passage: "A city conducted a study on its park system. Parks with regular programming — concerts, fitness classes, farmers' markets — attracted an average of 2,400 visitors per week. Parks with no programming averaged 310 visitors per week. The city's parks commissioner concluded: 'Programming is what people want in parks. We should convert all parks to programmed spaces.'", q: "What inference problem is present in the commissioner's conclusion?", a1: "Parks with 310 visitors are clearly not functioning as public spaces.", c1: false, r1: "310 visitors is still meaningful use; the statement mischaracterises the comparison.", a2: "The commissioner ignores that some people may specifically value unprogrammed parks for quiet, nature, and unstructured use — higher attendance at programmed parks doesn't mean all parks should be programmed.", c2: true, r2: "High attendance at programmed parks shows those are valued; it doesn't follow that all visitors want programming, or that unprogrammed parks serve no purpose.", a3: "Farmers' markets are not appropriate for parks.", c3: false, r3: "Appropriateness of specific programming is not the logical flaw being discussed.", a4: "The study should have used a larger sample of parks.", c4: false, r4: "Sample size may be a concern, but the commissioner's logical error is about the scope of the conclusion, not sample size.", diff: 'hard' },
    { passage: "From a novel: Olivia could count on one hand the times her father had talked about his childhood. He spoke freely about books, politics, and food, but when the conversation approached the years before he turned eighteen, something shifted in his face — a shuttering, slight and practiced — and he would find a reason to leave the room. She had learned not to ask.", q: "What can be inferred about Olivia's father's relationship with his childhood?", a1: "He had a happy childhood and simply prefers not to be nostalgic.", c1: false, r1: "People who shut down discussion of a happy childhood with a 'practiced' expression and room-leaving are not typically described this way in literary contexts.", a2: "Something painful or difficult about his childhood has led him to avoid the subject — the 'practiced' nature of his shutdown suggests it has been a pattern for years.", c2: true, r2: "The involuntary expression, the practiced deflection, the pattern Olivia has 'learned' — all suggest long-standing avoidance of something painful.", a3: "Olivia's father had no childhood and was created as an adult.", c3: false, r3: "Not supported — the passage refers to 'the years before he turned eighteen.'", a4: "Olivia doesn't care about her father's past and has moved on.", c4: false, r4: "Her observation and learning 'not to ask' suggests she is attentive and curious, not indifferent.", diff: 'medium' },
  ],
  // 08 Test Ready
  [
    { passage: "A marine biologist studying coral reef recovery found that reefs near areas with strong sea urchin populations recovered from bleaching events 40% faster than reefs in areas where urchins had been overharvested. Sea urchins eat the algae that smother recovering coral. In areas without urchins, algae blooms prevented coral larvae from attaching to rock surfaces.", q: "What can be inferred about the role of sea urchins in reef resilience?", a1: "Sea urchins should be farmed commercially to produce food.", c1: false, r1: "Commercial farming is not suggested or supported by the passage.", a2: "Sea urchins serve a critical maintenance function in reef ecosystems, and their removal disrupts reef recovery capacity.", c2: true, r2: "The data directly shows urchin presence correlates with faster recovery via algae control — their removal has a documented negative consequence.", a3: "Coral bleaching only occurs in areas without sea urchins.", c3: false, r3: "Bleaching occurred in both urchin-rich and urchin-poor areas — urchins affect recovery speed, not bleaching occurrence.", a4: "Marine biologists caused the overharvesting of sea urchins.", c4: false, r4: "The biologist studied the effect — no claim about who caused overharvesting is made.", diff: 'medium' },
    { passage: "From a business case study: In 2018, a national coffee chain introduced a mobile pre-ordering app. In the first year, mobile orders increased from $0 to 18% of total revenue. In-store wait times fell by an average of 4 minutes. However, barista turnover rates increased by 24% compared to the prior year. Exit interviews with departing baristas cited 'relentless order pressure with no human interaction' as the primary reason for leaving.", q: "What does the barista turnover data suggest about the app's impact that the revenue and wait-time data does not?", a1: "The app was a complete failure for the business.", c1: false, r1: "18% revenue share and reduced wait times suggest customer-facing success — failure is too strong." , a2: "The app created operational and human costs at the staff level that the customer-facing metrics did not capture.", c2: true, r2: "Revenue and wait times improved from the customer's perspective; turnover and barista satisfaction deteriorated — these are real costs that the success metrics obscure.", a3: "Baristas should be replaced with machines to reduce turnover.", c3: false, r3: "This is a speculative policy recommendation — not an inference from the data.", a4: "Coffee chains should not use technology in their stores.", c4: false, r4: "The case study shows a trade-off, not a universal case against technology.", diff: 'hard' },
    { passage: "From a biography: 'Lincoln rarely showed anger in public. When cabinet members reported to him that Secretary of War Stanton had called him a fool, Lincoln replied quietly: \\\"If Stanton said I was a d--- fool, then I must be one, for he is nearly always right and generally says what he means.\\\" The cabinet members expected a dismissal; instead they received a lesson in the strategic use of equanimity.'", q: "What does Lincoln's response to Stanton's insult most reveal?", a1: "Lincoln secretly agreed that he was foolish and lacked confidence.", c1: false, r1: "The biographer frames it as 'strategic use of equanimity' — the response is a calculated de-escalation, not admission of self-doubt.", a2: "Lincoln used apparent self-deprecation to deflect the political tension created by the insult while subtly complimenting Stanton — demonstrating political and emotional intelligence.", c2: true, r2: "By agreeing with the insult, Lincoln avoided a confrontation, maintained cabinet stability, and actually praised Stanton's reliability — a masterful political move.", a3: "Lincoln and Stanton had a mutually hostile relationship.", c3: false, r3: "Lincoln's praise of Stanton as 'nearly always right' suggests respect, not hostility.", a4: "Lincoln was afraid of Stanton and could not fire him.", c4: false, r4: "Fear is not implied — strategic equanimity is the biographer's explicit interpretation.", diff: 'hard' },
  ],
  // 09 Test Ready
  [
    { passage: "A sociologist studying voter behaviour found that in counties where a major employer closed in the two years before an election, the incumbent political party (regardless of which party) lost an average of 12 percentage points compared to surrounding counties. The effect held regardless of the party's policies on trade, factory employment, or retraining programmes.", q: "What does the 'regardless of policies' finding most strongly imply?", a1: "Voters carefully evaluate the incumbent's specific economic policies before voting.", c1: false, r1: "If policy analysis drove votes, policy differences would change the outcome — but the effect held regardless of policies.", a2: "Voters may punish incumbents for local economic pain without carefully evaluating which policies caused it or which party's policies would help.", c2: true, r2: "The 'regardless of policies' clause means the vote shift is driven by economic conditions and feeling, not policy assessment.", a3: "Factory closures are always caused by the incumbent political party.", c3: false, r3: "The sociologist studies voting effects of closures — not their causes.", a4: "Counties with factory closures are always economically depressed for decades.", c4: false, r4: "Long-term economic effects are not the subject of this study.", diff: 'hard' },
    { passage: "In a study published in the journal Nature, researchers found that migratory birds navigate using the Earth's magnetic field. When researchers applied a weak oscillating magnetic field around the birds' heads — disrupting their magnetic sensing — the birds lost directional orientation and flew in random patterns. Birds in a control group with no field disruption maintained accurate directional flight.", q: "What does the control group's performance allow the researchers to conclude?", a1: "All birds navigate exclusively by sight.", c1: false, r1: "The study shows birds use magnetic sensing — and the control group confirms accurate navigation exists without disruption.", a2: "The disorientation seen in the experimental group was caused by the applied magnetic field — not by stress, handling, or other factors — because the control group maintained accurate navigation under the same conditions minus the field.", c2: true, r2: "Control groups that experience everything except the experimental variable allow isolation of that variable's effect.", a3: "Birds in the experimental group were improperly trained before the study.", c3: false, r3: "Training quality is not mentioned — the control group's orientation rules out general handling issues.", a4: "The Earth's magnetic field is getting weaker and will eventually stop working.", c4: false, r4: "The study's subject is bird navigation — not the Earth's magnetic field strength over time.", diff: 'hard' },
    { passage: "A short story excerpt: 'At the community meeting, every speaker who took the microphone praised Councillor Webb — her dedication, her accessibility, her listening. The applause was warm. Councillor Webb sat at the front table and smiled. Only the recorder, who had attended such meetings for 22 years, noticed that none of the speakers had addressed the specific proposal on the evening's agenda: the rezoning of the waterfront.'", q: "What does the recorder's observation imply about the meeting?", a1: "The speakers did not support Councillor Webb.", c1: false, r1: "They praised her warmly — support is not in question.", a2: "The praise of Webb, while genuine, functioned to fill the meeting's time without producing any substantive engagement with the actual policy question — whether intentionally or not.", c2: true, r2: "The recorder notes that praise consumed the evening while the rezoning agenda item went unaddressed — function over form.", a3: "The waterfront rezoning had already been approved before the meeting.", c3: false, r3: "Nothing in the passage supports this — the proposal is described as 'on the agenda.'", a4: "The recorder was jealous of Councillor Webb's popularity.", c4: false, r4: "The recorder's 22 years of experience frames their observation as professional, not personal.", diff: 'hard' },
  ],
  // 10 Challenge
  [
    { passage: "From a 2024 economics paper: 'Countries that adopted austerity measures (government spending cuts + tax increases) in response to the 2010 European debt crisis averaged 3.1% GDP contraction in the following two years, compared to 0.6% GDP growth in comparable countries that instead adopted stimulus spending. The austerity-country group also saw unemployment rise an average of 4.2 percentage points, compared to 1.1 in the stimulus group. Critics of the paper note that austerity countries had significantly higher pre-crisis debt-to-GDP ratios, which may have constrained their policy choices.'", q: "What does the critics' note add to the interpretation of the study's findings?", a1: "The critics prove that austerity is always the correct policy.", c1: false, r1: "The critics question comparability, not establish austerity's supremacy.", a2: "The note raises a confounding variable: austerity countries may have had worse outcomes partly because of their pre-existing debt levels, not solely due to austerity itself — making a direct causal comparison to stimulus countries less certain.", c2: true, r2: "Pre-crisis debt differences mean the two groups weren't truly comparable — the critics identify that worse outcomes may have multiple causes beyond the policy choice.", a3: "Pre-crisis debt is irrelevant to economic recovery policy.", c3: false, r3: "The critics specifically raise it as a possible confound — it's directly relevant.", a4: "The paper's findings are fabricated.", c4: false, r4: "The critics question methodology, not fabrication.", diff: 'hard' },
    { passage: "From George Orwell's essay 'Politics and the English Language' (1946): 'When you think of something abstract you are more inclined to use words from the start, and unless you make a conscious effort to prevent it, the existing dialect will come rushing in and do the job for you, at the expense of blurring or even changing your meaning. Probably it is better to put off using words as long as possible and get one's meaning as clear as one can through pictures and sensations.'", q: "What is Orwell's implied concern about abstract language in political writing?", a1: "Abstract writing is more difficult to publish than concrete writing.", c1: false, r1: "Publication difficulty is not Orwell's concern here.", a2: "Relying on pre-existing abstract phrases allows vague, conventional language to substitute for genuine clear thinking — the writer may believe they have expressed something when they have only deployed familiar terminology.", c2: true, r2: "Orwell's concern is that stock phrases do the thinking 'for you,' blurring or changing meaning — the writer loses control of their own thought through linguistic autopilot.", a3: "Concrete images are always more persuasive than abstract concepts in political speeches.", c3: false, r3: "Orwell's concern is about meaning accuracy, not persuasive power.", a4: "Orwell believed all political writing should avoid abstract concepts entirely.", c4: false, r4: "He recommends delaying abstraction until meaning is clear — not eliminating abstractions.", diff: 'hard' },
    { passage: "From a 2023 policy analysis: 'Cities that implemented ranked-choice voting (RCV) in municipal elections saw a 28% increase in the number of candidates running compared to cities using plurality voting. Voter satisfaction surveys showed a 19% increase in the perception that 'the candidate I preferred had a real chance of winning.' Turnout did not change significantly. However, ballot spoilage rates (incorrectly filled-out ballots) doubled in the first election cycle under RCV, declining to near-baseline in subsequent cycles.'", q: "Based on ALL the data, which conclusion is most balanced and defensible?", a1: "RCV is an immediate and unqualified improvement over plurality voting.", c1: false, r1: "The doubled spoilage rate in the first cycle is a real short-term cost that 'unqualified improvement' ignores.", a2: "RCV failed because voter turnout did not increase.", c2: false, r2: "The analysis shows multiple positive indicators; turnout stagnation alone is insufficient to conclude failure.", a3: "RCV produced measurable benefits in candidate diversity and voter satisfaction, with an initial learning-curve cost in ballot errors that declined over time — suggesting it may be effective with appropriate voter education.", c3: true, r3: "This integrates all four data points: more candidates (+), more satisfaction (+), unchanged turnout (neutral), higher initial spoilage that declined (-/temporary).", a4: "Ranked-choice voting should only be used in large cities with sophisticated voters.", c4: false, r4: "City size and voter sophistication are not mentioned as variables in the data.", diff: 'hard' },
  ],
];

inferenceStubs.forEach(({file, tier, n}, i) => {
  const qs = inferenceQuestions[i];
  const questions = qs.map((q, qi) => `
  {
    questionNumber: ${qi + 1}, type: 'multipleChoice', difficulty: ${JSON.stringify(q.diff)},
    passage: ${JSON.stringify(q.passage)},
    question: ${JSON.stringify(q.q)},
    answerOptions: [
      { text: ${JSON.stringify(q.a1)}, isCorrect: ${q.c1}, rationale: ${JSON.stringify(q.r1)} },
      { text: ${JSON.stringify(q.a2)}, isCorrect: ${q.c2}, rationale: ${JSON.stringify(q.r2)} },
      { text: ${JSON.stringify(q.a3)}, isCorrect: ${q.c3}, rationale: ${JSON.stringify(q.r3)} },
      { text: ${JSON.stringify(q.a4)}, isCorrect: ${q.c4}, rationale: ${JSON.stringify(q.r4)} },
    ],
    challenge_tags: ['rla-2'],
  }`).join(',');

  write(file, `
// Reading Comprehension — ${tier}: Inference — Practice ${n}
module.exports = [${questions}
];
`);
});

// ─── VOCABULARY 04-10 ────────────────────────────────────────────────────────
write('rla_vocabulary_04.js', `
// Vocabulary in Context — Core: Practice 4
// 10 questions | words in context, connotation, academic vocabulary
module.exports = [
  {questionNumber:1,type:'multipleChoice',difficulty:'easy',
   passage:"The scientist's hypothesis was later vindicated when independent labs replicated her results.",
   question:"As used in this sentence, 'vindicated' most nearly means:",
   answerOptions:[
    {text:"criticised", isCorrect:false, rationale:"Criticised is the opposite — vindicated means proved right."},
    {text:"confirmed as correct after initial doubt", isCorrect:true, rationale:"Vindicated = shown to be right after being doubted or challenged."},
    {text:"ignored by the scientific community", isCorrect:false, rationale:"Ignored would be a neutral or negative outcome."},
    {text:"simplified for a wider audience", isCorrect:false, rationale:"Simplification is not what 'vindicated' means."},
   ],challenge_tags:['rla-3']},
  {questionNumber:2,type:'multipleChoice',difficulty:'easy',
   passage:"The company issued a terse statement refusing to comment on the allegations.",
   question:"'Terse' most nearly means:",
   answerOptions:[
    {text:"lengthy and detailed", isCorrect:false, rationale:"Terse means brief — the opposite of lengthy."},
    {text:"brief and abrupt", isCorrect:true, rationale:"Terse = using few words, often to the point of seeming rude or dismissive."},
    {text:"emotional and passionate", isCorrect:false, rationale:"Terse describes length and tone, not emotional content."},
    {text:"formal and official", isCorrect:false, rationale:"A terse statement could be formal or informal; 'terse' specifies brevity."},
   ],challenge_tags:['rla-3']},
  {questionNumber:3,type:'multipleChoice',difficulty:'medium',
   passage:"Critics argued the new policy was an arbitrary decision with no clear rationale.",
   question:"'Arbitrary' most nearly means:",
   answerOptions:[
    {text:"carefully planned and logical", isCorrect:false, rationale:"Arbitrary means the opposite: based on random or personal preference, not reason."},
    {text:"made randomly or without clear reasoning", isCorrect:true, rationale:"Arbitrary = based on chance or personal whim rather than principle or reason."},
    {text:"extremely popular with the public", isCorrect:false, rationale:"Popularity has no bearing on the word's meaning."},
    {text:"illegal under existing law", isCorrect:false, rationale:"Arbitrary describes reasoning quality, not legality."},
   ],challenge_tags:['rla-3']},
  {questionNumber:4,type:'multipleChoice',difficulty:'medium',
   passage:"The speaker's rhetoric was persuasive on the surface but lacked any substantive evidence.",
   question:"'Rhetoric' as used here most nearly means:",
   answerOptions:[
    {text:"complicated technical language", isCorrect:false, rationale:"Rhetoric is not specifically about technical complexity."},
    {text:"language designed to persuade, which may substitute style for substance", isCorrect:true, rationale:"'Rhetoric' here carries a slight negative connotation: impressive-sounding language that lacks real support — a common usage in political contexts."},
    {text:"a type of formal essay structure", isCorrect:false, rationale:"Rhetoric refers to persuasive language, not essay format."},
    {text:"evidence presented in a speech", isCorrect:false, rationale:"The sentence contrasts rhetoric with evidence — they are positioned as different things."},
   ],challenge_tags:['rla-3']},
  {questionNumber:5,type:'multipleChoice',difficulty:'medium',
   passage:"The charity's work with homeless youth was laudable but underfunded.",
   question:"'Laudable' most nearly means:",
   answerOptions:[
    {text:"controversial and disputed", isCorrect:false, rationale:"Laudable means praiseworthy — the opposite of controversial."},
    {text:"deserving of praise", isCorrect:true, rationale:"Laudable = commendable, worthy of admiration."},
    {text:"legally required by government standards", isCorrect:false, rationale:"Legal requirements have no bearing on the meaning of laudable."},
    {text:"financially successful", isCorrect:false, rationale:"The sentence says the work was underfunded — financial success is contradicted here."},
   ],challenge_tags:['rla-3']},
  {questionNumber:6,type:'multipleChoice',difficulty:'medium',
   passage:"After the audit revealed discrepancies in the financial records, the director resigned, citing a desire to avoid any appearance of impropriety.",
   question:"'Impropriety' most nearly means:",
   answerOptions:[
    {text:"financial gain from personal investments", isCorrect:false, rationale:"This describes one possible form of wrongdoing but not the word's full meaning."},
    {text:"dishonest or unethical behaviour, or the appearance of it", isCorrect:true, rationale:"Impropriety = behaviour that is wrong or unacceptable, especially by ethical or professional standards."},
    {text:"errors in financial record-keeping", isCorrect:false, rationale:"The discrepancies were the trigger; the director's concern was about the ethical perception."},
    {text:"lack of professional qualifications", isCorrect:false, rationale:"Qualifications are not the subject — ethical conduct is."},
   ],challenge_tags:['rla-3']},
  {questionNumber:7,type:'multipleChoice',difficulty:'hard',
   passage:"The mayor's seemingly conciliatory remarks did little to placate the protesters, who demanded concrete policy changes rather than words.",
   question:"'Conciliatory' most nearly means:",
   answerOptions:[
    {text:"intended to reach agreement and reduce conflict", isCorrect:true, rationale:"Conciliatory = attempting to make people less angry or hostile; designed to bring peace."},
    {text:"dismissive and condescending", isCorrect:false, rationale:"Dismissive is the opposite of conciliatory."},
    {text:"financially generous", isCorrect:false, rationale:"Conciliatory describes tone and intent, not material generosity."},
    {text:"vague and evasive", isCorrect:false, rationale:"While the sentence suggests the remarks lacked substance, 'conciliatory' describes their intention, not their content."},
   ],challenge_tags:['rla-3']},
  {questionNumber:8,type:'multipleChoice',difficulty:'hard',
   passage:"The researcher's findings were preliminary and should not be construed as definitive.",
   question:"'Construed' most nearly means:",
   answerOptions:[
    {text:"published or distributed", isCorrect:false, rationale:"Construed refers to interpretation, not distribution."},
    {text:"interpreted or understood in a particular way", isCorrect:true, rationale:"Construe = to interpret or understand something in a certain sense."},
    {text:"rejected by peer reviewers", isCorrect:false, rationale:"Rejection is not what 'construed' describes."},
    {text:"exaggerated for public consumption", isCorrect:false, rationale:"The word is about interpretation, not exaggeration."},
   ],challenge_tags:['rla-3']},
  {questionNumber:9,type:'multipleChoice',difficulty:'hard',
   passage:"The union leader's speech was incendiary, inflaming tensions that had been simmering for months.",
   question:"'Incendiary' as used here most nearly means:",
   answerOptions:[
    {text:"relating to fire safety regulations", isCorrect:false, rationale:"'Incendiary' can relate to fire literally, but in this context it is clearly figurative."},
    {text:"deliberately provocative and likely to cause anger or conflict", isCorrect:true, rationale:"Incendiary speech inflames emotions — the metaphor of fire is applied to social tension."},
    {text:"calm and measured in its delivery", isCorrect:false, rationale:"Calm is the opposite of incendiary in this context."},
    {text:"too long and detailed for the audience", isCorrect:false, rationale:"Length and detail are not what incendiary describes."},
   ],challenge_tags:['rla-3']},
  {questionNumber:10,type:'multipleChoice',difficulty:'hard',
   passage:"While the government's response was swift, critics argued it was disproportionate to the actual threat, amounting to an egregious overreach.",
   question:"'Egregious' most nearly means:",
   answerOptions:[
    {text:"relatively minor and easily corrected", isCorrect:false, rationale:"Egregious means outstandingly bad — the opposite of minor."},
    {text:"remarkably bad; strikingly excessive", isCorrect:true, rationale:"Egregious = outstandingly or conspicuously bad — used to intensify criticism."},
    {text:"carefully considered and proportionate", isCorrect:false, rationale:"The sentence criticises disproportionality — 'proportionate' contradicts the context."},
    {text:"widely popular and well-received", isCorrect:false, rationale:"'Egregious' has a fundamentally negative connotation."},
   ],challenge_tags:['rla-3']},
];
`);

const vocabFiles = [
  { f: 'rla_vocabulary_05.js', tier: 'Core', n: 5, focus: 'figurative language, word relationships, connotation vs denotation' },
  { f: 'rla_vocabulary_06.js', tier: 'Core', n: 6, focus: 'academic vocabulary in context, formal register' },
  { f: 'rla_vocabulary_07.js', tier: 'Test Ready', n: 7, focus: 'vocabulary in complex passage context, tone, nuanced meaning' },
  { f: 'rla_vocabulary_08.js', tier: 'Test Ready', n: 8, focus: 'sophisticated vocabulary, argument text context' },
  { f: 'rla_vocabulary_09.js', tier: 'Test Ready', n: 9, focus: 'literary and informational text vocabulary' },
  { f: 'rla_vocabulary_10.js', tier: 'Challenge', n: 10, focus: 'GED-level vocabulary, author tone, rhetoric terms, nuanced word choice' },
];

const vocabSets = [
  // 05 Core
  [
    { passage: "The politician's polished speech was widely seen as perfunctory — going through the motions required by the occasion without genuine engagement.", word: "perfunctory", correct: "done with little effort or care; carried out as a routine duty without real commitment", wrong: ["enthusiastic and heartfelt","secretly sarcastic","technically advanced"], diff: "easy" },
    { passage: "Her reticence during the negotiation was misread by the other side as indifference, when in fact she was listening carefully.", word: "reticence", correct: "unwillingness to speak freely; reserved silence", wrong: ["loud and aggressive behaviour","exceptional memory","overconfidence in one's position"], diff: "easy" },
    { passage: "The committee's decision was pragmatic rather than idealistic — they chose the plan most likely to succeed given current constraints.", word: "pragmatic", correct: "focused on practical outcomes rather than theory or principles", wrong: ["overly emotional and impulsive","based on religious principles","deliberately deceptive"], diff: "medium" },
    { passage: "The article's tone shifted from objective reporting to something far more polemical in its final section.", word: "polemical", correct: "strongly and often controversially critical or argumentative", wrong: ["balanced and neutral","statistical and data-driven","softly persuasive"], diff: "hard" },
  ],
  // 06 Core
  [
    { passage: "Despite plentiful resources, the project remained in a state of inertia for three years, with no meaningful progress.", word: "inertia", correct: "tendency to remain unchanged; resistance to movement or action", wrong: ["rapid expansion","financial collapse","deliberate sabotage"], diff: "easy" },
    { passage: "The committee acknowledged the nuanced nature of the problem, resisting calls for simplistic solutions.", word: "nuanced", correct: "having subtle distinctions and complexity; not black-and-white", wrong: ["straightforward and simple","involving large numbers","politically motivated"], diff: "medium" },
    { passage: "The study's methodology was rigorous, employing randomised control groups and double-blind conditions.", word: "rigorous", correct: "extremely thorough and careful; adhering to strict standards", wrong: ["somewhat flexible","widely popular","highly expensive"], diff: "medium" },
    { passage: "The lawyer's argument was cogent: clear, logical, and supported by evidence at every step.", word: "cogent", correct: "clear, logical, and convincing", wrong: ["emotional and moving","technically complex","deliberately ambiguous"], diff: "hard" },
  ],
  // 07 Test Ready
  [
    { passage: "The report was unsparing in its assessment of government failures — no agency was exonerated, no excuse accepted.", word: "exonerated", correct: "officially declared free of blame or cleared of an accusation", wrong: ["financially compensated","asked to resign","publicly praised"], diff: "medium" },
    { passage: "His equanimity in the face of the crisis earned him deep respect — where others panicked, he remained calm and purposeful.", word: "equanimity", correct: "mental calmness and composure, especially in difficult situations", wrong: ["reckless courage","calculating opportunism","cheerful ignorance"], diff: "hard" },
    { passage: "The editorial argued that the policy was an affront to democratic values — an insult that could not pass without challenge.", word: "affront", correct: "an action or remark that causes offence; an insult", wrong: ["a legal precedent","a financial incentive","a diplomatic solution"], diff: "medium" },
    { passage: "Her research corroborated the earlier findings, strengthening the scientific consensus.", word: "corroborated", correct: "confirmed or supported with additional evidence", wrong: ["contradicted with new data","replaced in academic journals","funded by the government"], diff: "easy" },
  ],
  // 08 Test Ready
  [
    { passage: "The senator's invective against his opponent shocked even seasoned political observers, who described it as far beyond normal campaign rhetoric.", word: "invective", correct: "violent, abusive, or accusatory language used as an attack", wrong: ["a formal policy proposal","measured criticism backed by data","humorous political satire"], diff: "hard" },
    { passage: "The scientist was careful to caveat her conclusions, noting that the study's sample size limited the generalisability of the results.", word: "caveat", correct: "a warning or qualification attached to a statement", wrong: ["a financial term for debt","a type of statistical test","an argument used in court proceedings"], diff: "hard" },
    { passage: "The architect's design was considered avant-garde by contemporaries — too radical for most clients at the time, but enormously influential on the following generation.", word: "avant-garde", correct: "new, experimental, and ahead of conventional thinking", wrong: ["expensive and impractical to build","deliberately imitative of classical styles","politically motivated"], diff: "hard" },
    { passage: "By the time the policy was implemented, the crisis it was designed to address had become endemic — embedded deeply in the structural conditions of the society.", word: "endemic", correct: "regularly found in or characteristic of a particular community, region, or condition", wrong: ["suddenly appearing without warning","caused by foreign influence","likely to disappear on its own"], diff: "hard" },
  ],
  // 09 Test Ready
  [
    { passage: "The manager's mercurial personality made it difficult for employees to know what to expect — she could be brilliantly energetic one day and irritably dismissive the next.", word: "mercurial", correct: "subject to sudden or unpredictable changes in mood", wrong: ["consistently demanding but fair","secretive about professional goals","highly logical and systematic"], diff: "medium" },
    { passage: "Critics described the film as a harrowing portrait of addiction — deeply distressing but impossible to look away from.", word: "harrowing", correct: "intensely distressing or traumatic", wrong: ["light-hearted and comedic","technically impressive but emotionally hollow","slow-moving and overly detailed"], diff: "medium" },
    { passage: "The labour union's demands were described as intractable — neither side was willing to yield on core issues, and negotiations stalled.", word: "intractable", correct: "difficult to resolve or control; not easily managed", wrong: ["quickly resolved through compromise","unlikely to affect the final contract","primarily affecting senior employees"], diff: "hard" },
    { passage: "The novelist's prose was luminous — every sentence carried a clarity and precision that made even complex emotions feel immediately comprehensible.", word: "luminous", correct: "brilliantly clear, vivid, or enlightening", wrong: ["dark and oppressive in tone","unnecessarily ornate and difficult to follow","historically accurate but emotionally flat"], diff: "hard" },
  ],
  // 10 Challenge
  [
    { passage: "The commission's findings were scathing, laying bare the systemic failures that had been obscured by years of bureaucratic obfuscation.", word: "obfuscation", correct: "the action of making something unclear or difficult to understand, especially deliberately", wrong: ["transparent public reporting","financial mismanagement","legal prosecution of officials"], diff: "hard" },
    { passage: "The senator's remarks were studiously anodyne — designed to offend no one and commit to nothing.", word: "anodyne", correct: "not likely to provoke disagreement; deliberately inoffensive and uncommitted", wrong: ["secretly hostile to political rivals","broadly popular with voters","technically accurate in every detail"], diff: "hard" },
    { passage: "Her dissent from the majority opinion was measured but trenchant, exposing a fundamental flaw in the court's reasoning that the majority had glossed over.", word: "trenchant", correct: "vigorously effective and sharply expressed; cutting to the heart of the matter", wrong: ["reluctantly submitted","overly lengthy and repetitive","based on emotional appeal rather than legal reasoning"], diff: "hard" },
    { passage: "The historian argued that the war's causes were not monocausal but rather an accretion of grievances, miscalculations, and structural pressures accumulated over decades.", word: "accretion", correct: "a gradual accumulation or growth of layers over time", wrong: ["a sudden explosion of tension","a deliberate policy decision by one government","a diplomatic failure in a single crisis meeting"], diff: "hard" },
  ],
];

vocabFiles.forEach(({f, tier, n}, i) => {
  const words = vocabSets[i];
  const questions = words.map((w, qi) => {
    const options = [
      { text: w.correct, isCorrect: true, rat: `Correct: ${w.correct.charAt(0).toUpperCase() + w.correct.slice(1)}.` },
      ...w.wrong.map(wt => ({ text: wt, isCorrect: false, rat: `Incorrect — this does not match how '${w.word}' is used in this context.` })),
    ];
    // shuffle so correct isn't always first
    const shuffled = [options[1], options[0], options[2], options[3]];
    return `
  {
    questionNumber: ${qi + 1}, type: 'multipleChoice', difficulty: ${JSON.stringify(w.diff)},
    passage: ${JSON.stringify(w.passage)},
    question: ${JSON.stringify(`As used in the passage, '${w.word}' most nearly means:`)},
    answerOptions: [
      { text: ${JSON.stringify(shuffled[0].text)}, isCorrect: ${shuffled[0].isCorrect}, rationale: ${JSON.stringify(shuffled[0].rat)} },
      { text: ${JSON.stringify(shuffled[1].text)}, isCorrect: ${shuffled[1].isCorrect}, rationale: ${JSON.stringify(shuffled[1].rat)} },
      { text: ${JSON.stringify(shuffled[2].text)}, isCorrect: ${shuffled[2].isCorrect}, rationale: ${JSON.stringify(shuffled[2].rat)} },
      { text: ${JSON.stringify(shuffled[3].text)}, isCorrect: ${shuffled[3].isCorrect}, rationale: ${JSON.stringify(shuffled[3].rat)} },
    ],
    challenge_tags: ['rla-3'],
  }`;
  }).join(',');

  write(f, `
// Vocabulary in Context — ${tier}: Practice ${n}
// Focus: ${vocabFiles[i].focus}
module.exports = [${questions}
];
`);
});

console.log('\n✓ RLA batch 3 complete.');
