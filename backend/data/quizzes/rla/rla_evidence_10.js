// Reading Comprehension  Challenge: Textual Evidence  Practice 10
// 10 questions | academic-level evidence synthesis, primary source analysis, advanced methodology critique
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'hard',
    passage: "In a landmark 2003 study, researchers randomised 13,000 job applications to help-wanted ads in Chicago and Boston, assigning either stereotypically white-sounding names (Emily Walsh, Greg Baker) or stereotypically African-American-sounding names (Lakisha Washington, Jamal Jones) to otherwise identical résumés. White-named applicants received 50% more callbacks. A critic argued that the names might signal socioeconomic class rather than race  'Lakisha' might evoke lower-class associations independent of racial bias. The original researchers responded that the callback gap persisted even when résumés listed higher education and suburban addresses that should have countered class signals.",
    question: "How does the researchers' response address the class-signal critique?",
    answerOptions: [
      { text: "It proves social class doesn't exist.", isCorrect: false, rationale: "The researchers don't deny class  they test whether class signals on the résumé can eliminate the name-based gap." },
      { text: "By showing the callback gap persisted even when résumés included markers of higher socioeconomic status (college degrees, suburban addresses), the researchers demonstrated that employers' differential treatment was linked to the name's racial associations specifically  not merely to class inferences, because the class indicators on the résumé should have neutralised any class-based interpretation of the name.", isCorrect: true, rationale: "This is a strong rebuttal: if the name's effect were purely about class, adding upper-middle-class résumé signals should reduce the gap. Their persistence suggests racial, not merely class-based, discrimination." },
      { text: "The critic was wrong to question the study.", isCorrect: false, rationale: "The class-signal critique was methodologically valid  the researchers' ability to address it strengthened the study." },
      { text: "All employers are equally biased.", isCorrect: false, rationale: "The study shows a statistical pattern across many employers  it doesn't claim every individual employer is equally biased." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1854, physician John Snow mapped cholera deaths in London's Soho district and identified a contaminated water pump on Broad Street as the outbreak's source  decades before germ theory was established. His evidence included geographic clustering of deaths around the pump, the survival of brewery workers (who drank beer, not pump water), and the death of a woman miles away whose family had water from the Broad Street pump delivered to her home. The local Board of Guardians disputed Snow's theory, attributing cholera to 'miasma'  foul air from decomposing matter.",
    question: "Why is the distant woman's death particularly powerful evidence for Snow's water-transmission theory?",
    answerOptions: [
      { text: "It showed that cholera could travel through the air over long distances.", isCorrect: false, rationale: "Her death actually undermines the air theory  she lived far from the 'miasma' but drank the water." },
      { text: "Her death eliminated geographic proximity to the pump as the transmission mechanism and pointed directly to the water itself  she lived miles from the 'miasma' yet contracted cholera because she consumed Broad Street water, demonstrating that the common factor was the water, not the air at the location.", isCorrect: true, rationale: "This case is a natural experiment: same exposure (the water) without the confounding proximity to the area's air. It cleanly separates the water hypothesis from the miasma hypothesis." },
      { text: "It proved that germ theory was already accepted in 1854.", isCorrect: false, rationale: "Snow's work predated germ theory's acceptance  the passage explicitly notes this." },
      { text: "It showed that breweries were the real source of cholera.", isCorrect: false, rationale: "The brewery evidence showed that drinking beer (not pump water) was protective  not that breweries caused cholera." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A frequently cited 1998 paper claimed a link between the MMR vaccine and autism, based on 12 children whose parents reported behavioural changes after vaccination. Subsequent investigations revealed that the lead author had been paid by a law firm planning to sue vaccine manufacturers, that several of the children's medical records contradicted the published timeline of symptom onset, and that the author had applied for a patent on a competing single-disease vaccine before publishing. The paper was retracted in 2010 after multiple large-scale studies  including one of 650,000 Danish children  found no association.",
    question: "Which of the three revelations about the original study is most damaging to its scientific credibility, and why?",
    answerOptions: [
      { text: "The law firm payments, because financial conflicts always invalidate research.", isCorrect: false, rationale: "Financial conflicts raise concern but don't automatically invalidate findings  the data itself matters more." },
      { text: "The altered medical records, because they indicate the study's core data was unreliable  if symptom timelines were changed to create the appearance of a vaccine connection that the original records didn't support, the study's central finding was built on fabricated evidence rather than observation.", isCorrect: true, rationale: "Conflicts of interest and competing patents create motive for bias, but contradicted medical records demonstrate the bias was acted upon  the data itself was compromised, which is the most fundamental form of scientific fraud." },
      { text: "The competing patent, because it shows the author was a businessperson.", isCorrect: false, rationale: "The patent creates a financial motive but doesn't prove the data were falsified  the records do." },
      { text: "None of them matter because the paper was eventually retracted.", isCorrect: false, rationale: "Understanding why the paper was retracted is essential to evaluating evidence quality  retraction is an outcome, not an explanation." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "An economist published a widely cited paper concluding that high government debt (above 90% of GDP) caused economic growth to slow sharply. The paper influenced European austerity policies affecting millions. A graduate student attempting to replicate the study discovered three problems: a coding error in the spreadsheet that excluded five countries from the calculation, selective exclusion of available data from New Zealand during a high-growth period, and unconventional weighting that gave Belgium's single poor year the same influence as the United Kingdom's nineteen years of data. Correcting all three errors eliminated the sharp growth dropoff.",
    question: "Which of the three errors is the most methodologically concerning, and why?",
    answerOptions: [
      { text: "The coding error, because spreadsheet mistakes are unforgivable.", isCorrect: false, rationale: "Coding errors are serious but inadvertent  the methodological choices raise deeper concerns about analytical judgement." },
      { text: "The unconventional weighting, because it introduced a systematic distortion that amplified outlier results  giving one Belgian year equal analytical weight to 19 UK years made a single bad outcome disproportionately influential, which is a methodological choice that required active justification the authors never provided.", isCorrect: true, rationale: "The coding error was accidental; the data exclusion might be defensible. But the weighting scheme was a deliberate analytical choice that systematically inflated the influence of outlier data points, distorting the central finding without transparent justification." },
      { text: "The New Zealand exclusion, because New Zealand is an important country.", isCorrect: false, rationale: "New Zealand's importance isn't the issue  selectivity in data inclusion is. But the weighting is more systematically distorting." },
      { text: "All three are equally concerning because they all affected the result.", isCorrect: false, rationale: "While all mattered, methodological choices requiring justification (weighting) are more concerning than accidents (coding errors) because they reflect analytical decisions." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "Frederick Douglass's 1852 speech 'What to the Slave Is the Fourth of July?' used the audience's own stated values as evidence against them: 'You declare before the world... that you hold these truths to be self-evident, that all men are created equal...' He then catalogued the legal reality of slavery  family separation, denial of education, and physical brutality  asking, 'What have I, or those I represent, to do with your national independence?' Douglass did not introduce external philosophical arguments; he built his case entirely from documents and principles his audience already endorsed.",
    question: "Why is Douglass's evidence strategy  using the audience's own documents and principles  rhetorically effective?",
    answerOptions: [
      { text: "It avoids the need for any evidence at all.", isCorrect: false, rationale: "Douglass's strategy is deeply evidence-based  he cites the Declaration of Independence and catalogues legal realities." },
      { text: "By grounding his argument in principles his audience already claims to believe, Douglass makes denial impossible without self-contradiction  the audience must either acknowledge the hypocrisy between their stated ideals and the reality of slavery, or abandon the principles they publicly celebrate, leaving no intellectually honest escape.", isCorrect: true, rationale: "This rhetorical strategy  called 'immanent critique'  is powerful because it requires no premises the audience doesn't already accept. The contradiction is entirely internal to their own value system." },
      { text: "He used emotional language that made people feel guilty.", isCorrect: false, rationale: "While the speech is emotional, the question asks about the evidence strategy  using the audience's own documents  not the emotional tone." },
      { text: "The Fourth of July is the most important American holiday.", isCorrect: false, rationale: "The holiday's significance to the audience is context, not the reason the evidence strategy works." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A 2019 replication crisis study attempted to reproduce the results of 21 high-profile social science experiments published in Nature and Science between 2010 and 2015. Using sample sizes roughly five times larger than the originals, the replication study found that only 13 of the 21 experiments (62%) produced results in the same direction as the originals, and effect sizes were on average half as large. The original authors were given the opportunity to review and approve the replication protocols before execution.",
    question: "Why is the detail about original authors reviewing replication protocols significant to interpreting the results?",
    answerOptions: [
      { text: "It proves the original authors approved of being proven wrong.", isCorrect: false, rationale: "Approving protocols doesn't mean approving outcomes  they agreed the methods were fair, not that they expected reduced effects." },
      { text: "It eliminates the most common defence against failed replications  that the replication team used different methods or made procedural errors. With original-author approval, methodological differences cannot explain the weaker results, strengthening the conclusion that the original effects were likely overestimated.", isCorrect: true, rationale: "Failed replications are often challenged by claiming the replication 'didn't do it right.' Pre-approval by the original researchers closes this escape route, making the reduced effect sizes harder to explain away." },
      { text: "It means the original studies were fraudulent.", isCorrect: false, rationale: "Failing to replicate doesn't prove fraud  it may reflect statistical flukes, publication bias, or context sensitivity." },
      { text: "21 studies is too small a sample to draw conclusions.", isCorrect: false, rationale: "21 high-profile experiments with 5x sample sizes is a meaningful test  and the 62% replication rate is itself a significant finding about the reliability of published science." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A federal court considered whether a chemical company's industrial discharge caused elevated cancer rates in a nearby town. The company introduced a toxicological study showing that rats exposed to the chemical at factory-emission levels developed tumours at the same rate as unexposed rats. The plaintiffs introduced an epidemiological study showing that residents within two miles of the factory developed bladder cancer at 2.7 times the expected rate. The company argued that the rat study proved the chemical was safe; the plaintiffs argued that the human data showed it wasn't.",
    question: "Why might the two types of evidence reach different conclusions, and which is more relevant to the court's question?",
    answerOptions: [
      { text: "The rat study is more reliable because animals cannot lie.", isCorrect: false, rationale: "Truthfulness isn't the issue  species differences in metabolism and exposure duration are." },
      { text: "Animal studies may not capture species-specific metabolic differences, multi-chemical interactions, or the decades-long exposure durations humans experienced  the epidemiological study directly measures the outcome (cancer rates in the actual affected population) relevant to the court's question, making it more directly applicable even though it cannot prove causation as cleanly as an experiment.", isCorrect: true, rationale: "The court's question is whether factory emissions harmed these specific humans. The rat study controls variables well but may not model human biology. The epidemiological study measures the population the court cares about, despite weaker causal inference. Each has complementary strengths." },
      { text: "Neither study is relevant because courts should not consider scientific evidence.", isCorrect: false, rationale: "Scientific evidence is routinely considered in environmental and tort litigation." },
      { text: "The studies prove the chemical is both safe and dangerous simultaneously.", isCorrect: false, rationale: "The studies address different species and conditions  they don't produce a contradiction so much as incomplete information from different perspectives." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "During the 2008 financial crisis, credit rating agencies that had given AAA ratings  the highest safety grade  to mortgage-backed securities were criticised after those securities collapsed. Investigators found that the agencies were paid by the same banks that issued the securities they rated, that analysts who gave lower ratings faced pressure from managers concerned about losing clients, and that the agencies' mathematical models assumed housing prices would continue rising nationally  something that had not happened since the Great Depression. A former analyst testified that 'the model didn't have a variable for housing prices going down.'",
    question: "How do the three identified problems  payment structure, internal pressure, and model assumptions  interact to produce systematic failure?",
    answerOptions: [
      { text: "Each problem independently caused the crisis.", isCorrect: false, rationale: "The problems are interconnected and mutually reinforcing, not independent causes." },
      { text: "The payment structure created financial incentive to rate favourably; internal pressure enforced that incentive on individual analysts who might have dissented; and the model's assumption of permanently rising prices provided a technical justification for high ratings  together, the structural incentive, enforcement mechanism, and intellectual framework aligned to make accurate risk assessment nearly impossible.", isCorrect: true, rationale: "This is a systems-level failure: the business model incentivised high ratings (motive), management pressure silenced dissenters (enforcement), and the model's assumption made the high ratings look analytically justified (rationalisation). All three layers had to fail simultaneously." },
      { text: "Mathematical models are always wrong.", isCorrect: false, rationale: "Models are simplifications  the issue was this model's specific and extreme assumption, not all models." },
      { text: "The agencies should have predicted the exact timing of the housing crash.", isCorrect: false, rationale: "The critique isn't about timing prediction  it's about failing to model the possibility of decline at all." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A longitudinal study tracked 10,000 children from birth to age 30, measuring family income, neighbourhood quality, school resources, parental education, and adult earnings. The study found that moving a child from a 20th-percentile neighbourhood to an 80th-percentile neighbourhood before age 13 increased adult earnings by 12%, but the same move after age 13 produced no measurable benefit. Critics noted that families who moved to better neighbourhoods may have been more motivated, educated, or resourceful  traits that independently predict higher earnings for their children.",
    question: "How should the study's finding about age 13 as a threshold be interpreted in light of the critics' selection-bias concern?",
    answerOptions: [
      { text: "The age-13 finding proves the study is flawed.", isCorrect: false, rationale: "The age-13 threshold actually helps address the selection concern  it would be an unusual pattern for selection bias alone to produce." },
      { text: "The age-13 cutoff partially addresses the selection-bias critique: if motivated parents' traits were driving the earnings boost, those traits wouldn't suddenly stop affecting children who moved after age 13. The fact that the benefit accrues only to younger movers suggests something specific about childhood neighbourhood exposure  not just family characteristics  contributes to the outcome.", isCorrect: true, rationale: "Selection bias predicts a consistent benefit for all children of motivated families regardless of move timing. The age threshold creates a natural test: same families, different timing, different outcomes  suggesting the neighbourhood itself matters during a critical developmental window." },
      { text: "Children over 13 are too old to benefit from anything.", isCorrect: false, rationale: "The study shows teen movers didn't benefit from neighbourhood change specifically  not that teens can't benefit from any intervention." },
      { text: "Neighbourhood quality has no effect on children.", isCorrect: false, rationale: "The study shows the opposite for children under 13." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "Hannah Arendt, covering the 1961 trial of Nazi administrator Adolf Eichmann, reported that he was not the monster she expected but 'terrifyingly normal'  a bureaucrat who followed orders, used clichés instead of thinking, and claimed he bore no personal responsibility because he 'just did his job.' Critics accused Arendt of excusing Eichmann. She responded that identifying the psychological mechanism by which ordinary people participate in atrocity  the abdication of independent judgement in favour of bureaucratic routine  was essential precisely because it revealed how easily atrocity could recur in any society that rewarded obedience over conscience.",
    question: "How does Arendt use her evidence about Eichmann's ordinariness to make a broader argument?",
    answerOptions: [
      { text: "She argues that Eichmann was innocent because he was ordinary.", isCorrect: false, rationale: "Arendt explicitly does not excuse Eichmann  she argues his ordinariness makes the crime's mechanism more universal and dangerous." },
      { text: "Arendt presents Eichmann's normalcy not as exculpation but as evidence for a systemic thesis: if genocide required only monstrous individuals, it could not recur in 'normal' societies  but if ordinary bureaucrats enabled it through obedience and thoughtlessness, such atrocity becomes a permanent possibility in any system that rewards compliance over moral reasoning.", isCorrect: true, rationale: "Arendt inverts the expected argument: ordinarily, saying someone is 'not a monster' excuses them. She uses the same observation to make a more alarming claim  that the capacity for atrocity lives in ordinary institutional behaviour, not just in extraordinary evil." },
      { text: "She argues that all bureaucrats are potential war criminals.", isCorrect: false, rationale: "Arendt identifies a mechanism (abdication of judgement within bureaucratic systems), not a claim that all bureaucrats will commit crimes." },
      { text: "Eichmann's trial was unfair because he was just following orders.", isCorrect: false, rationale: "Arendt did not argue the trial was unfair  she analysed what happened psychologically while supporting accountability." },
    ],
    challenge_tags: ['rla-2'],
  },
];
