// Evidence & Argumentation — Challenge: Practice 10
// 12 questions | GED-level and above, complex paired-source reasoning
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2024 Senate hearing on social media regulation:

Senator Vance: 'Your platform's algorithm actively recommends extremist content to teenagers. An internal company study, leaked to the press, found that 64% of users who joined extremist groups were led there through your platform's recommendations.'

Platform CEO: 'We've invested \$5 billion in trust and safety over five years. Our systems remove millions of pieces of harmful content daily. Our platform also connects billions to family, education, and democratic participation.'",
    question: "The CEO's response is best described as:",
    answerOptions: [
      { text: "A direct refutation of the 64% recommendation statistic.", isCorrect: false, rationale: "The CEO never disputes the figure." },
      { text: "A pivot to non-responsive evidence — highlighting safety spending and benefits without addressing the senator's specific claim about algorithmic radicalisation.", isCorrect: true, rationale: "The CEO describes investments and positive uses but does not address whether the algorithm leads users to extremist groups as the leaked study alleged." },
      { text: "An appeal to authority citing independent safety research.", isCorrect: false, rationale: "The CEO cites their own spending, not independent authorities." },
      { text: "A valid counter-argument that proves the platform is safe.", isCorrect: false, rationale: "Removing harmful content and the radicalisation issue are different problems — removing content doesn't refute algorithmic recommendation of extremism." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "Passage A — 2019 climate report: 'Permafrost in Siberia and Canada stores an estimated 1.5 trillion tonnes of carbon in frozen organic matter. As temperatures rise, permafrost thaws and releases methane and carbon dioxide — potent greenhouse gases — potentially creating a feedback loop that accelerates warming faster than current models project.'

Passage B — Policy response memo: 'Even the most aggressive current emissions reduction targets focus on industrial and transportation sources. No major international agreement includes binding commitments to address or monitor permafrost carbon release.'",
    question: "What policy gap do both passages together reveal?",
    answerOptions: [
      { text: "Countries are ignoring all forms of climate change.", isCorrect: false, rationale: "Passage B acknowledges that industrial and transportation emissions are addressed." },
      { text: "International climate agreements may be addressing the wrong carbon sources entirely.", isCorrect: false, rationale: "They're addressing real sources — the gap is that a major additional source (permafrost) is unaddressed, not that industrial emissions are wrong targets." },
      { text: "A potentially massive and self-accelerating carbon source — permafrost — is not monitored or bound by any international climate commitment, creating an unaccounted-for gap in global climate strategy.", isCorrect: true, rationale: "Passage A establishes the magnitude and feedback risk; Passage B confirms no international framework addresses it. Together: a critical blind spot." },
      { text: "Climate scientists do not know how much carbon is stored in permafrost.", isCorrect: false, rationale: "The estimate (1.5 trillion tonnes) is cited — scientists have estimates." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city health department reports that life expectancy in a wealthy ZIP code averages 87 years while life expectancy in a low-income ZIP code 4 miles away averages 67 years — a 20-year gap. Public health officials attribute the gap to differences in access to healthcare, healthy food, green space, quality housing, and exposure to environmental hazards. A city council member responds: 'Life expectancy is largely genetic. We cannot control for individual choices.'",
    question: "How do public health officials' findings challenge the council member's framing?",
    answerOptions: [
      { text: "They prove genetics plays no role in life expectancy.", isCorrect: false, rationale: "Officials cite social determinants — they don't disprove genetic factors entirely." },
      { text: "A 20-year life expectancy gap between two ZIP codes 4 miles apart cannot be explained by genetics alone — it points to environmental and social conditions as the primary drivers of the difference.", isCorrect: true, rationale: "If genetics were the primary driver, you would not expect a 20-year gap between nearby neighbourhoods. Geographic clustering of social conditions is the key evidence." },
      { text: "Individual choices are irrelevant to health outcomes.", isCorrect: false, rationale: "Choices matter — the argument is that conditions shape what choices are available." },
      { text: "The council member's argument would be stronger if citing national data instead of local ZIP codes.", isCorrect: false, rationale: "The local ZIP code comparison is precisely what makes the social-determinant explanation compelling, not a weakness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 19th century newspaper editorial (1883):

'The railroads are the arteries of national commerce — their prosperity is America's prosperity. Any regulation proposed by agitator politicians is nothing but socialist interference in private enterprise. The railroad owners built these lines with their own capital and risk, and no government has the right to tell them what rates to charge.'

From a Congressional report (1887), following two years of public hearings that led to the Interstate Commerce Act:

'The committee found that railroads engaged in discriminatory rate-setting, charging grain farmers in western states rates 10–50 times higher than comparable eastern routes, effectively destroying agricultural livelihoods. The committee concluded that the public interest requires federal oversight of rates.'",
    question: "Which of the following best explains why the Congressional report undermines the editorial's argument?",
    answerOptions: [
      { text: "The government is always better at managing businesses than private owners.", isCorrect: false, rationale: "This is a sweeping generalisation not supported by either source." },
      { text: "The editorial assumes private enterprise operates fairly and in the public interest; the Congressional findings showed concrete, documented harm to farmers — demonstrating that unregulated monopoly power extracted discriminatory rents.", isCorrect: true, rationale: "The editorial assumes no regulation is needed because private enterprise is inherently fair — the Congressional evidence directly refutes that assumption with documented harm." },
      { text: "The editorial was written before railroads became important.", isCorrect: false, rationale: "The editorial calls railroads 'the arteries of national commerce' — it recognises their importance." },
      { text: "The Congressional report proves that all private business must be nationalised.", isCorrect: false, rationale: "The report recommends oversight of rates, not nationalisation." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2023 education study: 'Students in classrooms where teachers called on students randomly — using a systematic randomisation tool — showed 22% higher participation from historically quiet students and 19% better retention of material on post-unit assessments compared to classes using traditional volunteer-based discussion.'

A teacher responds in a faculty meeting: 'I've used random calling for years and my students resent it. Several tell me it causes anxiety. I don't think the data reflects reality in my classroom.'",
    question: "How should the study's authors respond to the teacher's objection most constructively?",
    answerOptions: [
      { text: "Acknowledge that the teacher's individual experience doesn't invalidate aggregate data from a systematic study, while also recognising that implementation quality and classroom culture matter and may vary.", isCorrect: true, rationale: "The study measures systematic, controlled conditions. Anecdotes from one teacher don't override it, but classroom culture and implementation are legitimate moderating factors." },
      { text: "Dismiss the teacher's concern because individual experience is always less reliable than data.", isCorrect: false, rationale: "Dismissing practitioner experience entirely is scientifically and professionally inappropriate." },
      { text: "Revise the study to exclude teachers who don't like random calling.", isCorrect: false, rationale: "Selection bias would invalidate the study's generalisability." },
      { text: "Concede that the study's findings are probably wrong.", isCorrect: false, rationale: "One teacher's anecdote is not sufficient grounds to concede a well-designed study." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1854, Dr. John Snow mapped cholera deaths in London and found they clustered around a specific water pump on Broad Street. By comparing the death pattern to the locations of water sources, he concluded that contaminated water — not 'miasma' (bad air) — spread cholera. He persuaded local authorities to remove the pump handle, ending that outbreak. At the time, the germ theory of disease had not yet been established.",
    question: "What does Snow's investigation demonstrate about effective evidence-based reasoning?",
    answerOptions: [
      { text: "You must know the biological mechanism of a disease before taking action.", isCorrect: false, rationale: "Snow acted without knowing germ theory — he identified the source through pattern evidence." },
      { text: "Spatial pattern analysis of data can reveal causal relationships even when the underlying mechanism is not yet understood, enabling effective action.", isCorrect: true, rationale: "Snow used mapping to identify the pump as the source — pattern evidence sufficient for action without knowing the germ mechanism." },
      { text: "Government officials should always take scientists at their word.", isCorrect: false, rationale: "The passage shows reasoned persuasion with evidence, not blind deference to authority." },
      { text: "The miasma theory was correct and cholera is airborne.", isCorrect: false, rationale: "Snow's evidence disproved miasma theory." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A nonprofit organisation running an after-school tutoring programme reports a 94% graduation rate among its participants. The city's overall graduation rate is 72%. The organisation uses this data to argue their programme is highly effective.

An independent evaluator notes: 'Students self-select into the programme. Families who actively seek out after-school tutoring likely have higher motivation levels and more home support than average, regardless of whether the programme itself is effective. Without a randomised control group or a comparison to similarly motivated students who didn't receive the programme, the 22-percentage-point gap does not prove programme effectiveness.'",
    question: "The evaluator's concern about self-selection bias means that:",
    answerOptions: [
      { text: "The programme definitely doesn't work.", isCorrect: false, rationale: "Self-selection bias means we can't determine effectiveness from this data — not that the programme fails." },
      { text: "The graduation rate difference may reflect the characteristics of families who seek out tutoring, not the programme's impact.", isCorrect: true, rationale: "Students who enrol may have been likely to graduate anyway. Without a control group, the gap can't be attributed to the programme." },
      { text: "The organisation fabricated its graduation data.", isCorrect: false, rationale: "The evaluator doesn't question the data's accuracy — just its interpretation." },
      { text: "A 94% graduation rate is always too high to be credible.", isCorrect: false, rationale: "High rates are plausible in motivated, supported populations — but that's precisely the selection concern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "From a 2025 editorial on urban crime statistics:

'Crime in our city has plummeted. Mayor Torres deserves full credit — violent crime is down 18% since she took office three years ago.' A criminologist notes: 'Violent crime declined across all 50 largest U.S. cities in the same period, irrespective of the mayor's policies. Additionally, the city adopted broader police reporting changes two years ago that reclassified some offences downward, which partially explains the statistical decline.'",
    question: "The criminologist is identifying TWO problems with the editorial. What are they?",
    answerOptions: [
      { text: "The mayor is dishonest and the crime statistics are fabricated.", isCorrect: false, rationale: "Neither dishonesty nor fabrication is claimed." },
      { text: "Attributing a national trend to local leadership (false attribution) and measurement changes that affect the statistic without reflecting real-world change (definitional/reporting shift).", isCorrect: true, rationale: "Both problems: (1) decline was national, not Torres-specific; (2) reclassification artificially reduced reported crime — neither supports crediting the mayor's policies." },
      { text: "The 18% figure is too large to be statistically possible.", isCorrect: false, rationale: "No such claim is made by the criminologist." },
      { text: "The editorial uses too informal a tone for discussing public policy.", isCorrect: false, rationale: "Tone is not the criminologist's concern." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "Economist A argues: 'Immigration increases the labour supply, which can depress wages for native-born workers in low-skill jobs.'

Economist B argues: 'Immigrants also increase demand — they buy goods, rent homes, and create businesses. A 2020 National Bureau of Economic Research review of 27 studies found that immigration had a neutral-to-positive effect on native wages overall, with small negative effects concentrated only in very specific skill-sector overlaps.'",
    question: "Based on both passages, what is the most precise and defensible conclusion about immigration and wages?",
    answerOptions: [
      { text: "Immigration always raises wages for all workers.", isCorrect: false, rationale: "The NBER review found neutral-to-positive overall, with some small negatives in specific sectors." },
      { text: "Immigration always suppresses wages.", isCorrect: false, rationale: "Economist B's review of 27 studies contradicts this generalisation." },
      { text: "Immigration's wage effects are mixed and sector-specific, with most evidence showing neutral-to-positive overall outcomes, though small negative effects may appear in overlapping skill sectors.", isCorrect: true, rationale: "This precisely reflects what both economists and the NBER review say: neither blanket harm nor blanket benefit, but context-specific effects." },
      { text: "The two economists' views are irreconcilable.", isCorrect: false, rationale: "They are reconcilable — Economist A identifies a mechanism; Economist B shows the net empirical effect is neutral-to-positive overall." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "From Rachel Carson's Silent Spring (1962):

'The most alarming of all man's assaults upon the environment is the contamination of air, earth, rivers, and sea with dangerous and even lethal materials. This pollution is for the most part irrecoverable; the chain of evil it initiates not only in the world that must support life but in living tissues is for the most part irreversible.'",
    question: "Carson's use of the words 'irrecoverable' and 'irreversible' is intended to do which of the following?",
    answerOptions: [
      { text: "Argue that environmental laws have already failed.", isCorrect: false, rationale: "The book was written before major environmental law — it argues for urgency, not about failed laws." },
      { text: "Emphasise the permanence of harm to create a sense of urgency — damage is not temporary and cannot be undone by future cleanup efforts.", isCorrect: true, rationale: "Both words stress permanence, which is a rhetorical move to argue that prevention — not remediation — is the only effective strategy." },
      { text: "Suggest that humans should stop all industrial activity immediately.", isCorrect: false, rationale: "Carson argues for responsible chemical use, not the end of industry." },
      { text: "Undermine her own argument by admitting defeat.", isCorrect: false, rationale: "Stating that damage is irreversible motivates action — it is not an admission of defeat but a call to prevent further harm." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 11, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2024 longitudinal study tracked 10,000 workers in industries where AI automation was introduced between 2018 and 2022. Within three years: 23% of workers whose primary tasks were automat-able reported job displacement or major role reduction; 61% of workers in hybrid roles (combining routine and non-routine tasks) reported productivity increases and no displacement; and 16% of workers whose roles were primarily non-routine reported new job expansions and higher compensation.",
    question: "Which conclusion does the study's data most directly support?",
    answerOptions: [
      { text: "AI automation will eliminate all jobs within a decade.", isCorrect: false, rationale: "Only 23% of those in automatable roles were displaced — and overall, most workers in hybrid or non-routine roles benefited." },
      { text: "AI automation has no negative labour market consequences.", isCorrect: false, rationale: "23% of automatable-task workers faced displacement — a real negative consequence." },
      { text: "AI automation's impact on workers varies sharply by role type, with those in purely routine-task roles most at risk and those in hybrid or non-routine roles likely to benefit.", isCorrect: true, rationale: "The data maps directly to three outcome groups based on role type — this is precisely what is observed." },
      { text: "All workers should immediately retrain for non-routine roles.", isCorrect: false, rationale: "This is a policy recommendation that goes beyond what the study demonstrates." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 12, type: 'multipleChoice', difficulty: 'hard',
    passage: "United States v. Nixon (1974): The Supreme Court unanimously ruled that President Nixon had to turn over White House tape recordings subpoenaed by special counsel, rejecting his claim of absolute executive privilege. The Court held that 'the generalized assertion of privilege must yield to the demonstrated, specific need for evidence in a pending criminal trial.'

In his formal response to the ruling, Nixon's attorney had argued: 'Compelling a sitting president to produce evidence for a criminal case sets a dangerous precedent that will paralyze the executive branch in every future administration.'",
    question: "How does the Supreme Court's ruling most directly answer the attorney's concern?",
    answerOptions: [
      { text: "The Court agreed that executive privilege is absolute and unlimited.", isCorrect: false, rationale: "The Court rejected that position." },
      { text: "By limiting the ruling to demonstrated, specific criminal trial needs, the Court showed that privilege is not eliminated — only that generalised claims cannot override specific, demonstrated evidentiary needs.", isCorrect: true, rationale: "The Court structured the ruling narrowly: not all privilege claims fail, only non-specific ones when specific criminal need is demonstrated. This directly rebuts the 'paralysis' concern." },
      { text: "The Court ruled that presidents can never assert executive privilege.", isCorrect: false, rationale: "The ruling does not abolish the privilege — it balances it against specific legal needs." },
      { text: "The Court agreed with the attorney but decided against Nixon anyway for procedural reasons.", isCorrect: false, rationale: "The Court rejected the absolutist position on its merits, unanimously." },
    ],
    challenge_tags: ['rla-2'],
  },
];