// Reading Comprehension  Test Ready: Practice 10 / Main Idea & Author's Purpose
// 10 questions | advanced academic texts, competing theoretical frameworks, implicit argumentation
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "Ecologist Robert Paine coined the term 'keystone species' after observing that removing a single predator  the sea star Pisaster  from a tidal ecosystem caused a cascade of changes: mussels dominated, crowded out other species, and biodiversity collapsed. The concept has since been applied beyond ecology. Some political scientists describe swing-state voters as 'keystone' actors whose small numbers produce disproportionate electoral effects, and economists have used the term for firms whose failure would trigger systemic collapse, as Lehman Brothers did in 2008.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "The keystone species concept, originating in ecology, has been applied to politics and economics to describe small actors with disproportionate systemic impact.", isCorrect: true, rationale: "The passage traces the concept from Paine's ecological observation to its metaphorical expansion into political science and economics." },
      { text: "Sea stars are the most important predator in every marine ecosystem because their absence always leads to total biodiversity collapse.", isCorrect: false, rationale: "The sea star example illustrates the keystone concept in one ecosystem; the passage doesn't claim sea stars are universally the most important predator." },
      { text: "The 2008 financial crisis was caused primarily by the failure of ecological thinking within banking regulation frameworks.", isCorrect: false, rationale: "Lehman Brothers is cited as an example of a keystone actor; the passage doesn't argue ecological thinking caused or could have prevented the crisis." },
      { text: "Robert Paine's research focused specifically on how mussel populations thrive when predators are removed from tidal zones.", isCorrect: false, rationale: "Mussel dominance was a consequence Paine observed, but his broader point was about a single species maintaining ecosystem balance." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "W.E.B. Du Bois described the experience of Black Americans as a 'double consciousness'  the sense of always looking at oneself through the eyes of a society that views you with contempt. Du Bois argued this produced a 'two-ness': being both American and Black, with each identity in tension. The concept has been extended by later scholars to immigrants navigating two cultures, women in male-dominated professions, and LGBTQ+ individuals code-switching between communities  any group forced to maintain dual awareness of how they see themselves and how the dominant culture sees them.",
    question: "Why has Du Bois's concept of 'double consciousness' been applied beyond race?",
    answerOptions: [
      { text: "The core mechanism  maintaining dual awareness of self-perception and dominant-culture perception  applies to any marginalised group navigating identity tension.", isCorrect: true, rationale: "The concept's portability rests on its structural insight: any group forced to see itself through two lenses experiences the same cognitive duality Du Bois described." },
      { text: "Later scholars proved that Du Bois was actually writing about immigration rather than race when he coined the term.", isCorrect: false, rationale: "Du Bois explicitly wrote about Black American experience; later scholars extended the concept to other groups, they didn't reinterpret his intent." },
      { text: "Double consciousness only applies to racial identity and cannot meaningfully describe other forms of marginalisation or code-switching.", isCorrect: false, rationale: "The passage directly describes successful extensions to immigrants, women in male-dominated professions, and LGBTQ+ individuals." },
      { text: "Du Bois developed the concept after studying immigrant communities in the early twentieth century rather than Black Americans.", isCorrect: false, rationale: "Du Bois described the Black American experience specifically; the immigrant extension came from later scholars building on his framework." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "Economist Amartya Sen challenged the conventional understanding of famine as a food shortage. Analysing the 1943 Bengal famine, Sen demonstrated that food supply had not significantly declined; instead, wartime inflation, speculative hoarding, and British colonial distribution priorities left millions unable to afford available food. Sen's 'entitlement approach' argues that famine is caused not by insufficient food but by the collapse of people's ability to access food  through wages, trade, or social safety nets. The theory shifted famine analysis from production statistics to questions of political economy and justice.",
    question: "How did Sen's theory change the understanding of famine?",
    answerOptions: [
      { text: "Sen showed that famines result from failures of food access and distribution rather than from insufficient food production.", isCorrect: true, rationale: "Sen's key insight was that famine is about entitlement failure  people's inability to access food  not aggregate supply shortage." },
      { text: "Sen proved that food production statistics are entirely unreliable and should never be used in economic analysis of hunger.", isCorrect: false, rationale: "Sen didn't dismiss production data; he showed it alone is insufficient because famine can occur amid adequate supply." },
      { text: "The Bengal famine of 1943 was caused by a severe drought that destroyed most of the region's rice crop.", isCorrect: false, rationale: "Sen demonstrated the opposite: food supply had not significantly declined; distribution and affordability were the failures." },
      { text: "Famines are unpredictable natural disasters that cannot be prevented through government policy or economic intervention.", isCorrect: false, rationale: "Sen's entire argument implies that because famines are caused by political and economic failures, they can be prevented through policy reform." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "Political philosopher Isaiah Berlin distinguished between two concepts of liberty. 'Negative liberty' is freedom from external interference  the absence of obstacles, barriers, or constraints imposed by others. 'Positive liberty' is the capacity to act on one's own will  having the resources, education, and opportunities to pursue self-determined goals. Berlin warned that positive liberty, when wielded by the state, could become coercive: a government claiming to know citizens' 'true' interests might restrict their choices 'for their own good.' Much of 20th-century political conflict, Berlin argued, stemmed from the tension between these two conceptions.",
    question: "What is Berlin's concern about positive liberty?",
    answerOptions: [
      { text: "When the state claims to know citizens' true interests, positive liberty can justify coercive restrictions disguised as benevolence.", isCorrect: true, rationale: "Berlin's warning is that 'freedom to' can become 'forced to' when the state defines what citizens truly want and imposes those goals." },
      { text: "Positive liberty is always preferable to negative liberty because it requires governments to provide resources for citizens.", isCorrect: false, rationale: "Berlin doesn't rank the two; his concern is precisely that positive liberty's appeal can mask authoritarian overreach." },
      { text: "Negative and positive liberty are essentially the same concept expressed in different philosophical language.", isCorrect: false, rationale: "Berlin's entire framework rests on their being fundamentally distinct concepts with different political implications." },
      { text: "Negative liberty causes most political conflicts because it allows individuals too much freedom to interfere with each other.", isCorrect: false, rationale: "Berlin argues political conflict stems from the tension between both conceptions, and his specific warning targets positive liberty's coercive potential." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "Gayatri Chakravorty Spivak's essay 'Can the Subaltern Speak?' examines whether marginalised people in post-colonial societies can make their voices heard within dominant power structures. Spivak argues that the very frameworks through which the powerful 'listen'  academic discourse, legal systems, media  are structured by the same power relations that created the marginalisation. When Western intellectuals claim to 'let the subaltern speak,' they often translate the subaltern's experience into their own theoretical language, inadvertently silencing the voice they claim to amplify. The title's question, Spivak suggests, should be answered no  not because the subaltern has nothing to say, but because the structures of listening are not designed to hear.",
    question: "Why does Spivak answer 'no' to her own question?",
    answerOptions: [
      { text: "Existing power structures shape how marginalised voices are received, so attempts to amplify them often translate them into the dominant framework instead.", isCorrect: true, rationale: "Spivak's answer is structural: the problem is not speechlessness but the fact that listening systems are built by and for the powerful." },
      { text: "Marginalised people in post-colonial societies lack the education and vocabulary necessary to express their experiences clearly.", isCorrect: false, rationale: "Spivak explicitly states the subaltern has things to say; the failure lies in listening structures, not in the speakers' capacity." },
      { text: "Western intellectuals genuinely succeed in amplifying subaltern voices through careful academic translation of their experiences.", isCorrect: false, rationale: "Spivak argues the opposite: intellectual translation inadvertently silences the voice it claims to amplify by reformulating it in dominant terms." },
      { text: "Post-colonial societies have fully resolved the power imbalances that once prevented marginalised groups from being heard.", isCorrect: false, rationale: "Spivak's entire argument rests on the persistence of colonial power structures within current academic and institutional frameworks." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "Thomas Kuhn's The Structure of Scientific Revolutions (1962) argued that science does not progress through steady accumulation of knowledge. Instead, Kuhn described periods of 'normal science'  research within an accepted framework, or paradigm  punctuated by revolutionary 'paradigm shifts' when anomalies accumulate that the old framework cannot explain. The shift from Newtonian mechanics to Einstein's relativity was not an extension of Newton but a fundamental reconceptualisation. Kuhn's most controversial claim was that competing paradigms are 'incommensurable'  they define problems, methods, and even what counts as evidence so differently that scientists in different paradigms literally see different worlds.",
    question: "What makes Kuhn's concept of 'incommensurability' controversial?",
    answerOptions: [
      { text: "It implies scientists in competing paradigms cannot fully compare their frameworks because each paradigm defines the terms of evaluation differently.", isCorrect: true, rationale: "Incommensurability is controversial because it challenges the idea of objective, paradigm-independent standards for judging scientific theories." },
      { text: "It proves that all scientific theories are equally valid, making it impossible to distinguish good science from pseudoscience.", isCorrect: false, rationale: "Kuhn didn't claim all theories are equal; incommensurability addresses comparison difficulty, not equivalence of all claims." },
      { text: "It demonstrates that Einstein's relativity was simply a minor extension of Newton's existing theoretical framework.", isCorrect: false, rationale: "The passage explicitly states relativity was 'not an extension of Newton but a fundamental reconceptualisation.'" },
      { text: "Scientists universally accepted Kuhn's paradigm shift model because it aligned perfectly with the prevailing philosophy of science.", isCorrect: false, rationale: "The passage describes incommensurability as Kuhn's 'most controversial claim,' indicating it provoked disagreement rather than universal acceptance." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "Legal scholar Derrick Bell's 'interest convergence' theory proposes that racial justice advances in the United States occur primarily when they align with the interests of white elites. Bell analysed Brown v. Board of Education (1954) and argued that the Supreme Court desegregated schools not solely because segregation was unjust, but because Cold War propaganda needs required the U.S. to present itself as a racial democracy to compete with the Soviet Union for the allegiance of newly independent African and Asian nations. When the interests diverged  when desegregation became costly or inconvenient  progress stalled.",
    question: "How does Bell's theory reinterpret the Brown v. Board decision?",
    answerOptions: [
      { text: "Bell argues the ruling aligned with Cold War interests in projecting racial democracy abroad, not solely with moral opposition to segregation.", isCorrect: true, rationale: "Bell reinterprets Brown as interest convergence: racial justice advanced because it served the geopolitical needs of white elites during the Cold War." },
      { text: "Bell celebrates the Brown decision as the purest example of the Supreme Court ruling solely on moral principles without political influence.", isCorrect: false, rationale: "Bell's entire framework challenges this view; he argues Brown served strategic Cold War interests in addition to moral reasoning." },
      { text: "The Supreme Court desegregated schools because Congress passed legislation requiring them to do so in 1954.", isCorrect: false, rationale: "Brown was a judicial decision based on constitutional interpretation, not congressional legislation; Bell analyses the political context behind the ruling." },
      { text: "Desegregation proceeded smoothly after 1954 because white elites consistently supported racial equality throughout the following decades.", isCorrect: false, rationale: "Bell argues the opposite: when interests diverged and desegregation became costly, progress stalled." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "Anthropologist Clifford Geertz distinguished between 'thin description'  simply reporting observable behaviour  and 'thick description'  interpreting the meaning of behaviour within its cultural context. Seeing someone wink is thin description; understanding whether the wink is a conspiratorial signal, a nervous tic, or a parody of someone else's wink requires thick description. Geertz argued that anthropology's task is not to catalogue behaviours but to read cultures as texts, deciphering the webs of meaning that make human action intelligible to participants. Without thick description, cultural analysis reduces people to stimulus-response machines.",
    question: "Why does Geertz argue that 'thick description' is essential for cultural understanding?",
    answerOptions: [
      { text: "Behaviour only becomes meaningful when interpreted within the cultural context that gives it significance to participants.", isCorrect: true, rationale: "Geertz's point is that identical physical actions can have entirely different meanings; only contextual interpretation reveals what participants actually communicate." },
      { text: "Thin description provides a more scientific and objective account of human behaviour than thick description can offer.", isCorrect: false, rationale: "Geertz argues the opposite: thin description misses cultural meaning, reducing complex human action to mere observable movements." },
      { text: "Anthropologists should only catalogue physical behaviours without attempting to interpret their cultural meanings.", isCorrect: false, rationale: "Geertz explicitly rejects this approach, arguing anthropology's task is to read cultures as texts and decipher meaning." },
      { text: "The distinction between a wink and a nervous tic is physically observable without any knowledge of cultural context.", isCorrect: false, rationale: "Geertz's wink example illustrates that identical physical movements carry different meanings that only cultural context can reveal." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "Historian Howard Zinn's A People's History of the United States (1980) challenged conventional historiography by narrating American history from the perspective of marginalised groups  workers, slaves, women, Indigenous peoples  rather than political elites. Zinn argued that traditional history textbooks, by focusing on presidents and generals, implicitly endorsed the view that history is shaped by powerful individuals. His critics contend that Zinn replaced one bias with another, romanticising dissent and ignoring instances where institutional power produced genuine social benefits. The debate illustrates a fundamental question in historiography: can any historical narrative be truly objective, or does every telling reflect the teller's values?",
    question: "What fundamental historiographical question does the passage raise?",
    answerOptions: [
      { text: "Whether any historical narrative can be truly objective, or whether every account inevitably reflects the values and perspective of its author.", isCorrect: true, rationale: "The passage uses Zinn vs. traditional history to illustrate the deeper question: does the teller's perspective always shape the narrative?" },
      { text: "Whether Howard Zinn should be considered the most important American historian because he was the first to include marginalised perspectives.", isCorrect: false, rationale: "The passage discusses Zinn as one example; it doesn't rank historians or claim he was the first to include marginalised voices." },
      { text: "Whether political elites such as presidents and generals have had any meaningful influence on American history.", isCorrect: false, rationale: "Zinn challenged the exclusive focus on elites; neither he nor the passage claims elites had no influence at all." },
      { text: "Whether traditional history textbooks should be removed from schools and replaced entirely with Zinn's alternative version.", isCorrect: false, rationale: "The passage presents a historiographical debate, not a curriculum recommendation; it notes valid criticisms on both sides." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Linguists Edward Sapir and Benjamin Lee Whorf proposed that the language a person speaks shapes how they perceive and categorise reality  a concept known as linguistic relativity. In its strong form, the hypothesis claims that language determines thought: speakers of languages without a future tense, for example, would be unable to conceptualise the future. Most linguists reject this strong version but accept a weaker form: language influences habitual patterns of thought without making alternative thoughts impossible. Studies showing that speakers of languages with more colour terms distinguish between colours faster support the weaker version.",
    question: "Why do most linguists reject the strong form of linguistic relativity?",
    answerOptions: [
      { text: "The strong form claims language determines thought entirely, but evidence shows people can think beyond their language's categories, just less habitually.", isCorrect: true, rationale: "The weaker form acknowledges influence without determinism: language shapes habitual thought but doesn't imprison it." },
      { text: "Sapir and Whorf never published any formal research, so their hypothesis lacks the academic credibility required for serious linguistic study.", isCorrect: false, rationale: "The passage presents Sapir-Whorf as a recognised academic hypothesis with supporting studies; their credibility isn't questioned." },
      { text: "All human languages contain identical grammatical structures and vocabulary, making cross-linguistic thought differences theoretically impossible.", isCorrect: false, rationale: "The passage acknowledges linguistic differences exist; the debate is about how much those differences affect thought." },
      { text: "The colour-term studies definitively proved that language has absolutely no effect on perception or cognitive processing.", isCorrect: false, rationale: "The colour studies actually support the weaker form of linguistic relativity, showing language does influence perception." },
    ],
    challenge_tags: ['rla-2'],
  },
];
