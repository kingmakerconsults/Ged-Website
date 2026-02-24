// Reading Comprehension  Challenge: Practice 10 / Main Idea & Author's Purpose
// 10 questions | academic argumentation, primary source analysis, competing interpretations
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "In ecology, a keystone species is an organism whose impact on its ecosystem is disproportionately large relative to its abundance. The sea otter is a classic example: by preying on sea urchins, otters prevent urchin populations from devouring kelp forests. Without otters, urchin populations explode, kelp forests collapse, and the hundreds of species dependent on kelp habitat  fish, invertebrates, marine mammals  decline in a trophic cascade. The concept challenges the intuition that large, abundant species are always the most ecologically important; sometimes the linchpin is rare and easily overlooked.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "Sea otters are the most important ocean animal.", isCorrect: false, rationale: "The sea otter illustrates the concept  the main idea is about keystone species generally, not a ranking of ocean animals." },
      { text: "The keystone species concept reveals that ecological stability can depend on organisms whose small numbers disguise their outsized influence  and that removing such a species triggers cascading failures disproportionate to its apparent ecological footprint.", isCorrect: true, rationale: "The passage uses the otter-urchin-kelp cascade to illustrate the broader principle: disproportionate importance, counter-intuitive rarity-significance relationship, and cascading consequences of removal." },
      { text: "Kelp forests are the most important marine habitat.", isCorrect: false, rationale: "Kelp forests are the downstream beneficiary in the example  not the passage's main concept." },
      { text: "Sea urchins are harmful to ocean ecosystems.", isCorrect: false, rationale: "Urchins are part of a balanced system  they become destructive only when their predator (the otter) is removed." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "W.E.B. Du Bois's concept of 'double consciousness,' introduced in The Souls of Black Folk (1903), describes the experience of 'always looking at one's self through the eyes of others, of measuring one's soul by the tape of a world that looks on in amused contempt and pity.' Du Bois argued that Black Americans lived with a bifurcated identity  simultaneously aware of their own self-perception and of how white society perceived them. This dual awareness produced both psychological burden and analytical advantage: seeing oneself through two lenses granted an understanding of power structures invisible to those who had only ever seen through one.",
    question: "According to the passage, what paradox does Du Bois identify in double consciousness?",
    answerOptions: [
      { text: "Black Americans have no self-perception of their own.", isCorrect: false, rationale: "Du Bois describes dual perception  self-perception and perception through others' eyes  not absence of self-perception." },
      { text: "Double consciousness is both a psychological burden  the strain of navigating two identities  and an analytical advantage, because living under a dominant gaze forces awareness of power dynamics that members of the dominant group, seeing through only one lens, never develop.", isCorrect: true, rationale: "The paradox is that oppression creates insight: the painful necessity of seeing oneself through the oppressor's eyes also produces a more complete understanding of how power operates." },
      { text: "All people experience double consciousness equally.", isCorrect: false, rationale: "Du Bois specifically describes it as an experience of Black Americans negotiating white-dominated society  not a universal experience." },
      { text: "Double consciousness was resolved after 1903.", isCorrect: false, rationale: "The passage describes a structural condition of racial hierarchy  Du Bois didn't claim it was temporary." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "Economist Amartya Sen argued that famines are not caused by food shortage alone. In his study of the 1943 Bengal famine, Sen demonstrated that food production in Bengal had not significantly declined. Instead, wartime inflation, speculative hoarding, and wage stagnation meant that the poorest workers could no longer afford food that was physically present in markets. The famine killed three million people not because food didn't exist, but because the economic system failed to distribute it. Sen's 'entitlement approach' reframed famine as a failure of access rather than a failure of supply.",
    question: "What is the central argument of Sen's entitlement approach?",
    answerOptions: [
      { text: "Bengal did not produce enough food in 1943.", isCorrect: false, rationale: "Sen's central finding was the opposite  production had not significantly declined." },
      { text: "Famines can occur amid adequate food supply when economic and political systems deny vulnerable populations the purchasing power or entitlements to access available food  making famine a crisis of distribution and access, not necessarily of production.", isCorrect: true, rationale: "Sen's revolution was showing that the question 'Is there enough food?' is less important than 'Can people get the food that exists?' This shifted famine analysis from agriculture to economics and politics." },
      { text: "All famines throughout history have been caused by war.", isCorrect: false, rationale: "Wartime conditions contributed to the Bengal famine, but Sen's framework is broader  it applies to peacetime distribution failures too." },
      { text: "Food speculation should be encouraged during crises.", isCorrect: false, rationale: "Sen identifies speculation as a cause of the famine  the passage implies criticism, not endorsement." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "Political theorist Isaiah Berlin distinguished between two concepts of liberty: 'negative liberty'  freedom from external interference ('no one stops me')  and 'positive liberty'  the capacity to act on one's own will ('I have the resources and ability to act'). Berlin warned that positive liberty, taken to an extreme, could justify authoritarian intervention: if the state defines what citizens 'truly' want, it can coerce them 'for their own good.' Yet critics of Berlin counter that negative liberty alone leaves the poorest nominally free but practically powerless  legally permitted to do what they lack the means to accomplish.",
    question: "What tension does the passage identify between the two concepts of liberty?",
    answerOptions: [
      { text: "Negative liberty is always superior to positive liberty.", isCorrect: false, rationale: "The passage presents Berlin's concern about positive liberty AND critics' concern about negative liberty  neither is presented as simply superior." },
      { text: "Negative liberty protects against state interference but may leave people without the resources to exercise their freedom, while positive liberty empowers people to act but risks justifying state paternalism  each concept addresses a real need while creating a distinct danger.", isCorrect: true, rationale: "The tension is structural: negative liberty's weakness is positive liberty's strength, and vice versa. Pure negative liberty produces formal freedom without practical capacity; pure positive liberty enables capacity but risks authoritarian 'for your own good' logic." },
      { text: "Isaiah Berlin opposed all forms of government.", isCorrect: false, rationale: "Berlin distinguished types of liberty  he didn't advocate anarchism." },
      { text: "Liberty and freedom are completely unrelated concepts.", isCorrect: false, rationale: "The passage treats liberty as the central concept and distinguishes two forms of it." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "In her essay 'Can the Subaltern Speak?' (1988), Gayatri Spivak argued that marginalised groups in postcolonial societies face a double silencing. First, colonial power structures suppressed indigenous voices and knowledge systems. Second, even well-intentioned Western academics who claim to 'give voice' to the subaltern often end up speaking for them rather than enabling them to speak for themselves, reproducing the very power dynamic they claim to challenge. Spivak's point was not that marginalised people have nothing to say, but that the institutional frameworks through which speech is heard remain controlled by those with power.",
    question: "What is Spivak's central argument about the relationship between power and voice?",
    answerOptions: [
      { text: "Marginalised people cannot think for themselves.", isCorrect: false, rationale: "Spivak explicitly argues the opposite  the problem is not lack of thought but lack of institutional channels for being heard." },
      { text: "Even efforts to amplify marginalised voices can reproduce power imbalances if the amplifiers control the frameworks of representation  the problem is structural, not individual, because the institutions through which speech becomes audible are themselves products of the power relationships that created the silencing.", isCorrect: true, rationale: "Spivak's insight is recursive: the attempt to solve the problem (giving voice) can replicate the problem (controlling voice) if the institutional structures remain unchanged. The silencing is embedded in the system, not just in individual acts of suppression." },
      { text: "Western academics should never study postcolonial societies.", isCorrect: false, rationale: "Spivak critiques how such study is conducted, not whether it should occur." },
      { text: "Colonialism ended all cultural production in colonised societies.", isCorrect: false, rationale: "Spivak argues colonialism suppressed indigenous voices  not that it eliminated all cultural production." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "Philosopher Thomas Kuhn's The Structure of Scientific Revolutions (1962) argued that science does not progress through steady accumulation of knowledge. Instead, long periods of 'normal science'  work within an accepted framework (paradigm)  are punctuated by 'paradigm shifts,' fundamental reconceptions that redefine what counts as a valid question or meaningful evidence. Kuhn's most controversial claim was that competing paradigms are 'incommensurable'  that scientists working in different paradigms literally see different things when looking at the same data, making purely rational comparison between frameworks impossible.",
    question: "Why is Kuhn's incommensurability claim controversial?",
    answerOptions: [
      { text: "It suggests that old scientific theories were always wrong.", isCorrect: false, rationale: "Kuhn argued paradigms are not simply wrong  they are incommensurable, which is a different claim about the relationship between frameworks." },
      { text: "It challenges the assumption that scientific progress is purely rational by suggesting that paradigm choice involves factors beyond evidence comparison  since scientists in different paradigms interpret the same data through incompatible frameworks, there is no neutral standpoint from which to objectively judge one paradigm superior to another.", isCorrect: true, rationale: "The controversy is that incommensurability threatens the ideal of science as purely rational progress. If paradigms can't be objectively compared, then paradigm shifts involve social, not just rational, processes  which challenges the dominant self-image of science." },
      { text: "Kuhn believed science makes no progress at all.", isCorrect: false, rationale: "Kuhn argued science progresses through paradigm shifts  his account of progress is different, not absent." },
      { text: "All scientists agree with Kuhn's theory.", isCorrect: false, rationale: "The passage calls the claim 'controversial,' indicating significant disagreement." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "Legal scholar Derrick Bell's 'interest convergence' thesis argues that racial justice advances in the United States occur primarily when they align with the interests of white elites. Bell cited the Supreme Court's Brown v. Board of Education decision (1954), arguing that desegregation was supported not solely because it was morally right, but because American racial apartheid was becoming an embarrassment during the Cold War, when the U.S. competed with the Soviet Union for the loyalty of newly independent African and Asian nations. In this reading, civil rights progress was less a triumph of morality than a byproduct of geopolitical strategy.",
    question: "What does Bell's thesis imply about the sustainability of racial justice gains?",
    answerOptions: [
      { text: "Racial justice has been fully achieved in the United States.", isCorrect: false, rationale: "Bell's thesis is inherently sceptical about the depth of racial justice gains  full achievement contradicts his framework." },
      { text: "If racial justice advances primarily when they serve elite interests, then those gains are vulnerable to reversal when elite interests shift  progress is contingent rather than permanent, dependent on strategic alignment rather than moral commitment, which means gains can erode when the strategic calculus changes.", isCorrect: true, rationale: "Bell's framework implies that justice gains tied to elite interests last only as long as the interests persist. When Cold War pressures eased, for example, enforcement of desegregation weakened  consistent with the interest-convergence prediction." },
      { text: "The Supreme Court always makes decisions based on morality.", isCorrect: false, rationale: "Bell's thesis argues precisely the opposite  that strategic interests, not just morality, drove the Brown decision." },
      { text: "The Cold War was irrelevant to American domestic policy.", isCorrect: false, rationale: "Bell's central example connects Cold War geopolitics directly to domestic civil rights policy." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "Anthropologist Clifford Geertz distinguished between 'thin description'  recording observable behaviour  and 'thick description'  interpreting the meaning of behaviour within its cultural context. He illustrated the difference with a wink: thin description records a rapid eyelid contraction; thick description asks whether it is an involuntary twitch, a knowing signal to a friend, a conspiratorial gesture, or a parody of someone else's wink. The same physical movement carries entirely different meanings depending on context, and ethnography's task is to read the meanings, not merely record the movements.",
    question: "What is Geertz's main argument about the purpose of ethnographic research?",
    answerOptions: [
      { text: "Ethnographers should use video cameras to record observations.", isCorrect: false, rationale: "Recording captures thin description  Geertz argues for interpretation beyond what cameras see." },
      { text: "Ethnography should go beyond recording observable actions to interpreting their culturally embedded meanings  because identical physical behaviours can carry radically different significance depending on context, and understanding culture requires reading the interpretive layers, not just the surface movements.", isCorrect: true, rationale: "Geertz's argument is that culture lives in meaning, not behaviour. The wink example shows that observation alone misses everything that matters culturally  interpretation is the core of ethnographic work." },
      { text: "All winks have the same meaning across cultures.", isCorrect: false, rationale: "Geertz's entire point is that the same physical action can mean completely different things  even within a single culture." },
      { text: "Thick description is always longer than thin description.", isCorrect: false, rationale: "'Thick' refers to interpretive depth, not word count  though thick descriptions may be longer, length is not the defining characteristic." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "Historian Howard Zinn challenged the practice of writing history 'from the top down'  through the lens of presidents, generals, and industrialists. In A People's History of the United States (1980), he reconstructed events from the perspectives of enslaved people, factory workers, immigrants, and Native Americans  those affected by power rather than those wielding it. Critics accused Zinn of bias; he responded that all history is biased, and that the conventional 'objective' history simply reflected the biases of the powerful. 'You can't be neutral on a moving train,' he wrote  meaning that in a society of inequality, claiming neutrality implicitly sides with the status quo.",
    question: "What does Zinn's metaphor 'You can't be neutral on a moving train' mean in the context of historical writing?",
    answerOptions: [
      { text: "Trains are an important subject for historians.", isCorrect: false, rationale: "The train is a metaphor for an ongoing process (societal inequality), not a literal historical subject." },
      { text: "In a society shaped by ongoing power imbalances, claiming historical objectivity is itself a political position  it naturalises existing arrangements by presenting them without critique, effectively endorsing the status quo while appearing neutral. Zinn argues that choosing whose perspective to centre is always a political act, whether acknowledged or not.", isCorrect: true, rationale: "The metaphor means that in a moving system (ongoing inequality), standing still (claiming neutrality) means moving with the train (supporting the existing direction). True neutrality is impossible when the ground beneath you is already in motion." },
      { text: "Zinn believed all historical facts are fabricated.", isCorrect: false, rationale: "Zinn questioned perspective and framing, not factual accuracy  he used documented evidence from marginalised groups." },
      { text: "Professional historians should not have political opinions.", isCorrect: false, rationale: "Zinn argues the opposite  that all historians have perspectives, and pretending otherwise is dishonest." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Linguist Benjamin Lee Whorf's hypothesis that language shapes thought  the Sapir-Whorf hypothesis  remains debated. Strong versions claiming that language determines thought have been largely discredited: speakers of languages without future tense can still plan ahead. But weaker versions find empirical support: speakers of languages that assign grammatical gender perceive objects differently (Spanish speakers describe a bridge, feminine in Spanish, as 'elegant' and 'slender,' while German speakers, for whom bridge is masculine, choose 'strong' and 'sturdy'), and speakers of languages with absolute spatial terms (north/south) instead of relative ones (left/right) show superior navigational abilities.",
    question: "How does the passage present the current status of the Sapir-Whorf hypothesis?",
    answerOptions: [
      { text: "The hypothesis has been completely proven true.", isCorrect: false, rationale: "The strong version has been 'largely discredited'  only the weak version finds support." },
      { text: "The passage presents a nuanced middle position: the extreme claim that language determines thought has been disproven, but substantial evidence supports the softer claim that language influences perception and cognition in measurable ways  the hypothesis survives in weakened form, supported by specific empirical findings rather than sweeping determinism.", isCorrect: true, rationale: "The passage navigates between total acceptance and total rejection: strong Whorf is out, weak Whorf is supported. The examples (gendered perception, spatial cognition) demonstrate real linguistic influence without claiming language controls thought entirely." },
      { text: "Language has no effect on thought at all.", isCorrect: false, rationale: "The passage provides two empirical examples showing language does influence perception." },
      { text: "All linguists agree about the Sapir-Whorf hypothesis.", isCorrect: false, rationale: "The passage explicitly states the hypothesis 'remains debated.'" },
    ],
    challenge_tags: ['rla-2'],
  },
];
