// Reading Comprehension  Test Ready: Inference  Practice 7
// 10 questions | logical reasoning, survivorship bias, literary subtext, data interpretation
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "During the Second World War, the U.S. government conducted a study of military aircraft that returned from missions and plotted the locations of bullet damage. Engineers proposed reinforcing the areas with the most hits. Statistician Abraham Wald argued the opposite: the areas that should be reinforced were the ones with NO bullet damage on returning planes  because damage in those areas meant the aircraft didn't return.",
    question: "What principle does Wald's reasoning illustrate?",
    answerOptions: [
      { text: "The most-damaged areas on returning planes were clearly the most vulnerable, so reinforcing those high-damage zones would best improve aircraft survival rates.", isCorrect: false, rationale: "This restates the engineers' flawed reasoning  Wald showed that visible damage on returning planes actually indicated where hits were survivable." },
      { text: "Proper damage assessment requires controlling for observational attrition in the sample, meaning only recovered wreckage data can produce valid reinforcement conclusions.", isCorrect: false, rationale: "This uses technical jargon to obscure the point  Wald did not require wreckage data; he inferred from the returning planes' pattern what was missing." },
      { text: "Survivorship bias  the undamaged areas on returning planes marked where hits were fatal, making those the sections that most needed reinforcement.", isCorrect: true, rationale: "Planes hit in the undamaged zones did not return, so the surviving sample omitted the fatal damage pattern, illustrating classic survivorship bias." },
      { text: "Military engineers had already identified the correct reinforcement locations, and Wald's statistical review simply confirmed their original engineering proposal.", isCorrect: false, rationale: "Wald contradicted the engineers  he argued for reinforcing the opposite areas from what they had proposed." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city conducted a study on its park system. Parks with regular programming  concerts, fitness classes, farmers' markets  attracted an average of 2,400 visitors per week. Parks with no programming averaged 310 visitors per week. The city's parks commissioner concluded: 'Programming is what people want in parks. We should convert all parks to programmed spaces.'",
    question: "What inference problem is present in the commissioner's conclusion?",
    answerOptions: [
      { text: "The conclusion assumes higher attendance signals greater value, ignoring that some residents specifically seek quiet, unprogrammed green spaces for rest and reflection.", isCorrect: true, rationale: "Higher attendance at programmed parks shows demand for those, but it does not prove all residents prefer programming or that unprogrammed spaces serve no purpose." },
      { text: "Parks with only 310 weekly visitors are clearly failing as public resources and should be converted to programmed spaces to justify the city's ongoing maintenance spending.", isCorrect: false, rationale: "Lower attendance does not mean failure  some parks serve residents who prefer solitude, nature, and unstructured use." },
      { text: "The study's comparison is undermined because programmed parks likely received more city funding and better maintenance, so attendance gaps may reflect investment levels.", isCorrect: false, rationale: "Funding differences are possible but speculative  the core flaw is the commissioner's leap from attendance data to a universal prescription." },
      { text: "The commissioner's analysis conflates aggregate utilization metrics with normative preference data, undermining the inferential link between attendance and resident desires.", isCorrect: false, rationale: "This uses technical language to gesture at the problem while obscuring the simpler insight that not all value is captured by attendance counts." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a novel: Olivia could count on one hand the times her father had talked about his childhood. He spoke freely about books, politics, and food, but when the conversation approached the years before he turned eighteen, something shifted in his face  a shuttering, slight and practiced  and he would find a reason to leave the room. She had learned not to ask.",
    question: "What can be inferred about Olivia's father's relationship with his childhood?",
    answerOptions: [
      { text: "He discusses his childhood freely in other social settings but finds conversations with Olivia uncomfortable due to the emotional complexity of their father-daughter bond.", isCorrect: false, rationale: "The passage shows a practiced, habitual avoidance regardless of audience  the shuttering is not specific to Olivia but appears whenever the topic arises." },
      { text: "His avoidance pattern results from an involuntary dissociative response that suppresses episodic memory retrieval through practiced behavioral withdrawal from his surroundings.", isCorrect: false, rationale: "This applies clinical jargon to a literary passage  the text suggests emotional pain and deliberate deflection, not a clinical dissociative condition." },
      { text: "He had an ordinary, uneventful childhood with nothing remarkable to share, so he naturally gravitates toward more stimulating topics like books, food, and political issues.", isCorrect: false, rationale: "An uneventful childhood would not produce a shuttering expression and practiced room-leaving  those reactions signal something actively painful being avoided." },
      { text: "Something painful or difficult marked his early years, and his practiced shutdown and consistent pattern of avoidance suggest he has been deflecting this topic for a long time.", isCorrect: true, rationale: "The involuntary facial change, practiced deflection, and Olivia's learned restraint all point to long-standing avoidance of a painful past." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2021 meta-analysis examined 45 studies on eyewitness identification. When police lineups were administered by an officer who knew which person was the suspect, witnesses identified the suspect 27% more often than in double-blind lineups where the administering officer did not know. The difference held even when officers reported making no deliberate gestures or comments.",
    question: "What does the finding that officers 'reported making no deliberate gestures' most critically imply?",
    answerOptions: [
      { text: "The officers knowingly guided witnesses toward the suspect through intentional verbal hints but denied doing so to protect the apparent integrity of their procedures.", isCorrect: false, rationale: "Deliberate deception is possible but not the most supported inference  the study points to unconscious influence as the more parsimonious explanation." },
      { text: "Officers may transmit subtle, unconscious cues through body language, tone, or timing that influence witnesses even when the officers themselves are completely unaware of it.", isCorrect: true, rationale: "The 27% gap persists despite officers believing they gave no cues, which points to unconscious influence rather than intentional corruption." },
      { text: "Double-blind lineups produce lower identification rates because the administering officer's visible uncertainty makes witnesses feel less confident in their own visual memory.", isCorrect: false, rationale: "Lower rates in double-blind lineups may reflect reduction of bias, not reduced accuracy  the passage frames the non-blind gap as a contamination problem." },
      { text: "Nonverbal paralinguistic channel effects systematically prime identificatory cognition, producing confirmatory bias outcomes independent of the administrator's volitional awareness.", isCorrect: false, rationale: "This uses dense jargon to restate the finding without clearly expressing that unconscious body language cues affected witness choices." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a short story: The retirement party had 47 guests, a sheet cake from the good bakery, and a card signed by every member of the department. Mr. Franklin gave a speech about teamwork. When it was over, the guest of honour  a woman who had managed the department's budget for 28 years  thanked everyone, carried her orchid to the car, and drove home to an apartment she had told no one about.",
    question: "What does the final detail  'an apartment she had told no one about'  most strongly suggest?",
    answerOptions: [
      { text: "Despite 28 years of professional closeness, she maintained a firm boundary between her work identity and her private life that none of her colleagues ever penetrated.", isCorrect: true, rationale: "The contrast between 47 guests and a signed card versus a secret apartment reveals a carefully maintained separation between her public and private selves." },
      { text: "Her compartmentalized approach to social disclosure reflects an asymmetric information strategy where professional integration masked deliberate personal boundary maintenance.", isCorrect: false, rationale: "This uses inflated jargon to obscure a literary observation  the passage conveys quiet privacy, not a calculated information control strategy." },
      { text: "She recently moved to a new apartment after selling her previous home and simply had not yet told anyone at the department about the change before her final retirement day.", isCorrect: false, rationale: "The phrasing 'told no one about' implies long-standing concealment, not a recent move she merely happened not to mention yet." },
      { text: "Her coworkers already knew where she lived from years of department gatherings, and the undisclosed apartment was a second property she purchased for occasional weekend retreats.", isCorrect: false, rationale: "The passage says she told no one about the apartment, directly contradicting the idea that colleagues already knew her living arrangements." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A study compared hospital patient outcomes in two groups. In Group A, patients were given detailed informed-consent documents averaging 12 pages. In Group B, patients received a simplified 2-page summary covering the same key risks. Group B patients scored 40% higher on comprehension tests about their procedure's risks. Group A patients were more likely to say they felt 'fully informed' despite understanding less.",
    question: "What paradox do these findings reveal about informed consent?",
    answerOptions: [
      { text: "The longer documents contained excessive technical terminology, and Group A patients would have matched Group B's comprehension scores if the twelve-page language were simplified.", isCorrect: false, rationale: "Language difficulty is a plausible factor, but the study varied document length, not vocabulary level  the paradox concerns volume versus clarity." },
      { text: "Group B scored higher because shorter documents are simply easier to memorize, and the comprehension test measured recall of key phrases rather than genuine depth of understanding.", isCorrect: false, rationale: "The passage describes comprehension of risks, not rote memorization  and the paradox centers on Group A feeling more informed while actually understanding less." },
      { text: "Longer documents create a false sense of thoroughness that substitutes for actual understanding, while concise summaries force focus on essential risks and produce better real grasp.", isCorrect: true, rationale: "Group A felt more informed but understood less  document length created an illusion of completeness while actually reducing comprehension of critical information." },
      { text: "An inverse correlation between perceived informational saturation and measurable comprehension uptake reveals that document volume paradoxically suppresses active epistemic engagement.", isCorrect: false, rationale: "This restates the finding in dense academic jargon without clearly naming the practical paradox of feeling informed while not actually being informed." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1854, physician John Snow mapped cholera deaths in London and found they clustered around the Broad Street water pump. He persuaded the parish to remove the pump handle, and the outbreak slowed. At the time, most physicians believed cholera spread through 'bad air' (miasma theory). Snow's germ theory explanation was not widely accepted until decades later when microscopy confirmed waterborne bacteria.",
    question: "What does the delay between Snow's successful intervention and the acceptance of his explanation reveal?",
    answerOptions: [
      { text: "The medical establishment rejected Snow's findings because he lacked a sufficient sample size and had not conducted a formal controlled experiment to prove water caused cholera.", isCorrect: false, rationale: "While methodological objections existed, the passage emphasizes the dominance of miasma theory, not data insufficiency, as the reason for delayed acceptance." },
      { text: "Snow removed the pump handle as a precaution, but the outbreak was already declining naturally and his intervention contributed little to the pace of the epidemic's eventual end.", isCorrect: false, rationale: "The passage states the outbreak slowed after the handle was removed  it does not suggest the decline was independent of Snow's intervention." },
      { text: "Paradigmatic resistance within established theoretical frameworks creates temporal dissociation between empirical interventional success and the formation of formal scientific consensus.", isCorrect: false, rationale: "This uses dense jargon to restate the idea without clearly expressing the insight that practical success can precede theoretical understanding." },
      { text: "Effective practical action can outpace theoretical acceptance  a correct intervention can succeed even before the scientific community embraces the mechanism that explains why it works.", isCorrect: true, rationale: "Snow stopped the outbreak through evidence-based reasoning, but miasma theory's dominance delayed acceptance of his explanation until microscopy confirmed it decades later." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'medium',
    passage: "A zoo discovered that its elephants were healthiest when their feeding schedule was unpredictable. When food appeared at random times and in varied locations within the enclosure, elephants walked 3 times farther daily, showed fewer repetitive behaviours, and had lower cortisol (stress hormone) levels than elephants fed on a fixed schedule at the same spot.",
    question: "What does this finding most strongly suggest about elephant well-being in captivity?",
    answerOptions: [
      { text: "Unpredictable feeding schedules simply caused the elephants to walk more while searching for food, and the resulting increase in daily exercise alone explains all of the health benefits.", isCorrect: false, rationale: "Increased walking is one factor, but reduced repetitive behaviors and lower cortisol point to cognitive enrichment, not just physical exercise." },
      { text: "Predictable routines may increase stress in intelligent animals by eliminating the cognitive stimulation and physical activity that natural foraging behavior would normally provide.", isCorrect: true, rationale: "Unpredictable feeding mimics natural foraging  the combined improvements in movement, behavior, and stress hormones suggest enrichment through mental and physical challenge." },
      { text: "Stochastic resource distribution activates innate exploratory behavioral circuits in large mammals, reducing stereotypic displacement activities and lowering neuroendocrine stress markers.", isCorrect: false, rationale: "This restates the findings in dense scientific jargon without drawing the accessible inference about what captive animals actually need to thrive." },
      { text: "Elephants on fixed feeding schedules were actually healthier in most clinical measures, but the unpredictable schedule made them appear more active by compelling unnecessary movements.", isCorrect: false, rationale: "The passage explicitly states that unpredictable feeding produced lower cortisol and fewer repetitive behaviors  the fixed schedule was worse by every reported measure." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A newspaper analysed campaign donations in a state that had recently introduced term limits. Before term limits, 78% of corporate PAC donations went to incumbents. After term limits, corporate PAC donations shifted heavily toward candidates who had previously been corporate lobbyists or industry consultants. The total amount of corporate PAC spending did not decrease.",
    question: "What does the shift in donation patterns most strongly imply about the term limits' effect on corporate political influence?",
    answerOptions: [
      { text: "Corporate interests adapted to term limits by funding candidates with pre-existing industry ties, maintaining their political influence through personnel selection rather than incumbent loyalty.", isCorrect: true, rationale: "When long-serving incumbents were removed, corporate money flowed to candidates already aligned with industry  the channel changed but the influence persisted." },
      { text: "Term limits successfully reduced corporate influence because even though total spending remained constant, donations were distributed among newer candidates who held less consolidated power.", isCorrect: false, rationale: "Steady spending and a targeted shift toward industry-connected candidates suggest influence was maintained, not reduced by the reform." },
      { text: "The shift happened because newly eligible candidates needed more campaign funding than incumbents, and corporate PACs simply filled a natural financing gap without any strategic intent.", isCorrect: false, rationale: "The specific targeting of former lobbyists and consultants, rather than all new candidates, undermines the claim that this was neutral gap-filling." },
      { text: "The reallocation of fiduciary contributions toward candidates with prior regulatory-sector affiliations illustrates institutional path dependency within donor-recipient network structures.", isCorrect: false, rationale: "This uses dense jargon to obscure the straightforward point that corporate interests found new recipients who already shared their policy priorities." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a literary novel: 'Mrs. Alvarez watered the flowers on her husband's grave every Tuesday. She arranged them carefully, spoke to the headstone about their grandchildren, and brushed the leaves from the marble. On the drive home she would stop at the diner where they had eaten breakfast every Saturday for 40 years. She ordered for two. The waitress, who had served them for a decade, never asked about the second coffee.'",
    question: "Why does the waitress 'never ask about the second coffee'?",
    answerOptions: [
      { text: "The waitress assumes Mrs. Alvarez is expecting a friend to arrive and does not want to embarrass her by drawing attention to the fact that no one has come to join her.", isCorrect: false, rationale: "The cemetery visit and 40-year breakfast context make clear this is a memorial ritual, not an expected meeting  the waitress likely understands the real reason." },
      { text: "The waitress's non-interrogative response reflects a tacit service-industry convention in habitual dining settings where long-established customer patterns go professionally unquestioned.", isCorrect: false, rationale: "This frames a deeply human moment as mere professional protocol  the literary context signals compassion, not policy compliance." },
      { text: "The waitress recognizes the second coffee as a ritual of grief and continuing connection, and her silence is a deliberate act of compassion that protects this meaningful habit.", isCorrect: true, rationale: "Having served the couple for a decade, the waitress understands the emotional weight of the ritual and chooses silence to honor Mrs. Alvarez's bond with her late husband." },
      { text: "The diner provides two place settings and coffees to every customer seated at a booth as standard practice, so the second order is nothing unusual for the waitress to notice.", isCorrect: false, rationale: "The passage frames this as a personal, emotionally significant moment  the literary tone makes a routine procedural explanation implausible." },
    ],
    challenge_tags: ['rla-2'],
  },
];
