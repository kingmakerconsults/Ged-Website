// Reading Comprehension — Test Ready: Inference — Practice 7
// 10 questions | logical reasoning, survivorship bias, literary subtext, data interpretation
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "During the Second World War, the U.S. government conducted a study of military aircraft that returned from missions and plotted the locations of bullet damage. Engineers proposed reinforcing the areas with the most hits. Statistician Abraham Wald argued the opposite: the areas that should be reinforced were the ones with NO bullet damage on returning planes — because damage in those areas meant the aircraft didn't return.",
    question: "What principle does Wald's reasoning illustrate?",
    answerOptions: [
      { text: "Pilots who survived were better at avoiding bullets.", isCorrect: false, rationale: "The argument is about where the damage was, not pilot skill." },
      { text: "Survivorship bias — studying only surviving cases can lead to false conclusions about where protection is most needed.", isCorrect: true, rationale: "Planes hit in critical areas didn't return — so the returning planes' damage pattern omits the fatal hits, creating a biased sample." },
      { text: "Aircraft should not be reinforced at all because reinforcement adds weight.", isCorrect: false, rationale: "Wald's argument is about where to reinforce, not whether to reinforce." },
      { text: "Statistical analysis should only be applied to aircraft that were destroyed.", isCorrect: false, rationale: "Wald was analysing the returning planes precisely to infer about the destroyed ones." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city conducted a study on its park system. Parks with regular programming — concerts, fitness classes, farmers' markets — attracted an average of 2,400 visitors per week. Parks with no programming averaged 310 visitors per week. The city's parks commissioner concluded: 'Programming is what people want in parks. We should convert all parks to programmed spaces.'",
    question: "What inference problem is present in the commissioner's conclusion?",
    answerOptions: [
      { text: "Parks with 310 visitors are clearly not functioning as public spaces.", isCorrect: false, rationale: "310 visitors is still meaningful use; the statement mischaracterises the comparison." },
      { text: "The commissioner ignores that some people may specifically value unprogrammed parks for quiet, nature, and unstructured use — higher attendance at programmed parks doesn't mean all parks should be programmed.", isCorrect: true, rationale: "High attendance at programmed parks shows those are valued; it doesn't follow that all visitors want programming, or that unprogrammed parks serve no purpose." },
      { text: "Farmers' markets are not appropriate for parks.", isCorrect: false, rationale: "Appropriateness of specific programming is not the logical flaw being discussed." },
      { text: "The study should have used a larger sample of parks.", isCorrect: false, rationale: "Sample size may be a concern, but the commissioner's logical error is about the scope of the conclusion, not sample size." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a novel: Olivia could count on one hand the times her father had talked about his childhood. He spoke freely about books, politics, and food, but when the conversation approached the years before he turned eighteen, something shifted in his face — a shuttering, slight and practiced — and he would find a reason to leave the room. She had learned not to ask.",
    question: "What can be inferred about Olivia's father's relationship with his childhood?",
    answerOptions: [
      { text: "He had a happy childhood and simply prefers not to be nostalgic.", isCorrect: false, rationale: "People who shut down discussion of a happy childhood with a 'practiced' expression and room-leaving are not typically described this way in literary contexts." },
      { text: "Something painful or difficult about his childhood has led him to avoid the subject — the 'practiced' nature of his shutdown suggests it has been a pattern for years.", isCorrect: true, rationale: "The involuntary expression, the practiced deflection, the pattern Olivia has 'learned' — all suggest long-standing avoidance of something painful." },
      { text: "Olivia's father had no childhood and was created as an adult.", isCorrect: false, rationale: "Not supported — the passage refers to 'the years before he turned eighteen.'" },
      { text: "Olivia doesn't care about her father's past and has moved on.", isCorrect: false, rationale: "Her observation and learning 'not to ask' suggests she is attentive and curious, not indifferent." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2021 meta-analysis examined 45 studies on eyewitness identification. When police lineups were administered by an officer who knew which person was the suspect, witnesses identified the suspect 27% more often than in double-blind lineups where the administering officer did not know. The difference held even when officers reported making no deliberate gestures or comments.",
    question: "What does the finding that officers 'reported making no deliberate gestures' most critically imply?",
    answerOptions: [
      { text: "The officers were lying about their behaviour during lineups.", isCorrect: false, rationale: "Deception is possible but not the researchers' finding — subliminal cueing is the more parsimonious explanation." },
      { text: "Officers may transmit subtle, unconscious cues — through body language, tone, or timing — that influence witnesses even without the officer's intention or awareness.", isCorrect: true, rationale: "The gap persists despite officers believing they gave no cues, which points to unconscious influence rather than deliberate corruption." },
      { text: "Double-blind lineups are less accurate than standard lineups.", isCorrect: false, rationale: "Higher identification rates in non-blind lineups may reflect bias, not accuracy — the passage frames this as a problem." },
      { text: "Eyewitness identification is always unreliable regardless of procedure.", isCorrect: false, rationale: "The study compares two procedures — it doesn't dismiss all eyewitness identification." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a short story: The retirement party had 47 guests, a sheet cake from the good bakery, and a card signed by every member of the department. Mr. Franklin gave a speech about teamwork. When it was over, the guest of honour — a woman who had managed the department's budget for 28 years — thanked everyone, carried her orchid to the car, and drove home to an apartment she had told no one about.",
    question: "What does the final detail — 'an apartment she had told no one about' — most strongly suggest?",
    answerOptions: [
      { text: "She is moving to a new city for another job.", isCorrect: false, rationale: "She is the retiring guest of honour — a new job is not implied." },
      { text: "Despite 28 years of professional closeness, she maintained a fundamental separation between her work life and private life that her colleagues never penetrated.", isCorrect: true, rationale: "The contrast between 47 guests and a card from everyone versus 'an apartment she had told no one about' reveals a carefully maintained privacy boundary." },
      { text: "She is embarrassed about where she lives.", isCorrect: false, rationale: "Embarrassment is not implied — the tone is one of quiet, deliberate privacy." },
      { text: "Her colleagues did not actually care about her personally.", isCorrect: false, rationale: "The 47 guests and signed card suggest genuine affection — the distance was maintained from her side." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A study compared hospital patient outcomes in two groups. In Group A, patients were given detailed informed-consent documents averaging 12 pages. In Group B, patients received a simplified 2-page summary covering the same key risks. Group B patients scored 40% higher on comprehension tests about their procedure's risks. Group A patients were more likely to say they felt 'fully informed' despite understanding less.",
    question: "What paradox do these findings reveal about informed consent?",
    answerOptions: [
      { text: "Longer documents should be banned from hospitals.", isCorrect: false, rationale: "A policy ban goes beyond the study's finding — the issue is effectiveness, not legality." },
      { text: "Longer documents may create an illusion of thoroughness that gives patients a false sense of being informed, while shorter documents actually produce better comprehension of the information that matters.", isCorrect: true, rationale: "Group A felt more informed but understood less — length substituted for clarity, creating a gap between perceived and actual understanding." },
      { text: "Group B patients were more intelligent than Group A patients.", isCorrect: false, rationale: "Intelligence differences are not described — the variable was document length, not patient ability." },
      { text: "Doctors should not explain risks to patients at all.", isCorrect: false, rationale: "The study compares methods of explanation, not whether to explain." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1854, physician John Snow mapped cholera deaths in London and found they clustered around the Broad Street water pump. He persuaded the parish to remove the pump handle, and the outbreak slowed. At the time, most physicians believed cholera spread through 'bad air' (miasma theory). Snow's germ theory explanation was not widely accepted until decades later when microscopy confirmed waterborne bacteria.",
    question: "What does the delay between Snow's successful intervention and the acceptance of his explanation reveal?",
    answerOptions: [
      { text: "Snow's intervention did not actually stop the cholera outbreak.", isCorrect: false, rationale: "The passage says the outbreak slowed — the intervention was effective." },
      { text: "Effective practical action can outpace theoretical acceptance — a correct intervention can work even when the scientific establishment has not yet accepted the mechanism behind it.", isCorrect: true, rationale: "Snow stopped the outbreak with evidence-based action, but the prevailing theory (miasma) delayed acceptance of why it worked until the mechanism was independently confirmed." },
      { text: "Miasma theory was ultimately proven correct by microscopy.", isCorrect: false, rationale: "Microscopy confirmed waterborne bacteria — germ theory, not miasma." },
      { text: "Physicians in 1854 had access to microscopes and chose not to use them.", isCorrect: false, rationale: "The passage implies that microscopy confirmation came later — it doesn't describe deliberate refusal." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'medium',
    passage: "A zoo discovered that its elephants were healthiest when their feeding schedule was unpredictable. When food appeared at random times and in varied locations within the enclosure, elephants walked 3 times farther daily, showed fewer repetitive behaviours, and had lower cortisol (stress hormone) levels than elephants fed on a fixed schedule at the same spot.",
    question: "What does this finding most strongly suggest about elephant well-being in captivity?",
    answerOptions: [
      { text: "Elephants dislike eating and prefer to be hungry.", isCorrect: false, rationale: "They still ate — the variable was schedule predictability, not food availability." },
      { text: "Predictable routines may actually increase stress in intelligent animals by removing the cognitive challenge and physical activity that foraging behaviour naturally provides.", isCorrect: true, rationale: "Unpredictable feeding mimics natural foraging — increased movement, reduced repetitive behaviour, and lower cortisol all point to enrichment through challenge." },
      { text: "Zoos should release all elephants into the wild immediately.", isCorrect: false, rationale: "The study addresses captive enrichment strategies, not a release prescription." },
      { text: "Cortisol levels have no relationship to animal well-being.", isCorrect: false, rationale: "The passage explicitly links lower cortisol to improved outcomes — it treats cortisol as a stress indicator." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A newspaper analysed campaign donations in a state that had recently introduced term limits. Before term limits, 78% of corporate PAC donations went to incumbents. After term limits, corporate PAC donations shifted heavily toward candidates who had previously been corporate lobbyists or industry consultants. The total amount of corporate PAC spending did not decrease.",
    question: "What does the shift in donation patterns most strongly imply about the term limits' effect on corporate political influence?",
    answerOptions: [
      { text: "Term limits completely eliminated corporate influence in the state's politics.", isCorrect: false, rationale: "Total spending didn't decrease and donations simply shifted — influence was redirected, not eliminated." },
      { text: "Corporate interests adapted to term limits by supporting candidates with pre-existing industry ties, maintaining influence through personnel rather than through incumbent relationships.", isCorrect: true, rationale: "When long-serving incumbents were removed, corporate money flowed to candidates already aligned with industry — the channel changed but the influence persisted." },
      { text: "All former lobbyists who run for office are corrupt.", isCorrect: false, rationale: "The passage describes donation patterns, not corruption — previous industry experience does not automatically equal corruption." },
      { text: "Term limits caused corporate PAC spending to increase dramatically.", isCorrect: false, rationale: "The passage says total spending 'did not decrease' — it doesn't say it increased dramatically." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary novel: 'Mrs. Alvarez watered the flowers on her husband's grave every Tuesday. She arranged them carefully, spoke to the headstone about their grandchildren, and brushed the leaves from the marble. On the drive home she would stop at the diner where they had eaten breakfast every Saturday for 40 years. She ordered for two. The waitress, who had served them for a decade, never asked about the second coffee.'",
    question: "Why does the waitress 'never ask about the second coffee'?",
    answerOptions: [
      { text: "The waitress does not notice Mrs. Alvarez ordering two coffees.", isCorrect: false, rationale: "A decade of service makes inattention unlikely — the omission is deliberate." },
      { text: "The waitress understands that the second coffee is a continuation of a ritual that helps Mrs. Alvarez maintain connection with her late husband, and questioning it would be a cruelty.", isCorrect: true, rationale: "The waitress's silence is an act of compassion — she recognises the ritual's emotional function and protects it by not acknowledging the absence." },
      { text: "Mrs. Alvarez is waiting for someone to join her for coffee.", isCorrect: false, rationale: "The cemetery visit and the 40-year breakfast context make clear this is a memorial ritual, not an expected meeting." },
      { text: "The diner has a policy against asking customers about their orders.", isCorrect: false, rationale: "This is a human moment, not a business policy — the literary framing centres on compassion." },
    ],
    challenge_tags: ['rla-2'],
  },
];