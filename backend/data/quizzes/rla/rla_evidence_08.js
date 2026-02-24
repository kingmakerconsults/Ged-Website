// Reading Comprehension  Test Ready: Textual Evidence  Practice 8
// 10 questions | evaluating research methodology, conflicting sources, and evidence hierarchies
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "A magazine article reported that a new brain-training app could 'boost IQ by 10 points in 30 days.' The claim was based on a company-funded study of 50 users who completed a post-training IQ test. No pre-training IQ test was administered, and no control group was used. A cognitive scientist noted that without a baseline score, there was no way to determine whether IQ changed at all  the '10 points' was simply the average difference between the users' scores and the general population mean.",
    question: "What fundamental research flaw does the cognitive scientist identify?",
    answerOptions: [
      { text: "The study had too many participants.", isCorrect: false, rationale: "Fifty participants is small but not the primary flaw  the missing baseline and control group are." },
      { text: "Without pre-training IQ scores or a control group, the study cannot demonstrate that any change occurred  it measured only a single post-test snapshot and compared it to an external average, which could reflect the participants' starting abilities rather than any app-induced improvement.", isCorrect: true, rationale: "A pre-post design without a control group is already weak, but this study lacks even the 'pre' measurement. There is literally no evidence of change, only a single measurement assumed to reflect improvement." },
      { text: "IQ tests cannot measure intelligence.", isCorrect: false, rationale: "While IQ test limitations are debatable, the flaw here is the study design, not the measurement tool." },
      { text: "The magazine should not report on apps.", isCorrect: false, rationale: "The issue is evidence quality, not whether magazines should cover technology." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "Two studies examined whether later school start times improved teen academic performance. Study A surveyed 200 students who reported feeling more alert and earning higher grades after their district shifted from 7:30 to 8:30 AM starts. Study B compared standardised test scores across 40 districts  20 that shifted start times and 20 that did not  over three years, finding a statistically significant but modest improvement of 3 percentile points in the shifting districts.",
    question: "Which study provides stronger evidence that start times affect performance, and why?",
    answerOptions: [
      { text: "Study A, because students directly reported feeling more alert.", isCorrect: false, rationale: "Self-reported alertness and grades are subjective and susceptible to expectation effects  students may report improvement because they expect the change to help." },
      { text: "Study B, because comparing shifting and non-shifting districts with standardised tests over three years controls for placebo effects and provides an objective, comparable measure of achievement across a larger and more diverse sample.", isCorrect: true, rationale: "Study B uses a comparison group, objective measures, multiple time points, and many more data points. Study A relies entirely on self-report from a single district." },
      { text: "Both studies are equally strong because they reach similar conclusions.", isCorrect: false, rationale: "Agreeing conclusions don't make the studies equally rigorous  methodology determines evidence strength." },
      { text: "Neither study is valid because education research is unreliable.", isCorrect: false, rationale: "Dismissing an entire field doesn't address the specific design differences between these studies." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "A city health department reported that childhood lead poisoning rates had fallen from 8.2% to 2.1% over a decade, attributing the decline to its lead paint abatement programme in public housing. A public health researcher pointed out that during the same decade the federal government banned remaining lead in gasoline nationwide, that the city's drinking water utility replaced 70% of lead service pipes, and that the health department changed its lead poisoning threshold from 10 micrograms to 5 micrograms per decilitre  meaning the lower rate was measured against a stricter standard, making the apparent improvement even more complicated to attribute.",
    question: "How many distinct factors besides the abatement programme could explain the decline?",
    answerOptions: [
      { text: "One  the gasoline ban.", isCorrect: false, rationale: "The researcher identifies three additional factors, not just one." },
      { text: "Three  the federal gasoline ban reduced airborne lead exposure, the water utility's pipe replacement reduced drinking water lead, and the changed threshold means the 2.1% rate was measured by a different standard than the 8.2% rate, complicating direct comparison.", isCorrect: true, rationale: "Each factor independently could contribute to the decline. The threshold change is particularly important because it means the two rates aren't measured on the same scale." },
      { text: "None  the abatement programme clearly caused the entire decline.", isCorrect: false, rationale: "Three concurrent interventions and a measurement change make single-cause attribution impossible." },
      { text: "The decline didn't actually happen because the threshold changed.", isCorrect: false, rationale: "Lead poisoning likely did decline  the question is what caused it, not whether it happened." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A televangelist claimed that prayer healed cancer, citing five audience members who testified that they prayed daily and their cancer went into remission. A biostatistician responded that approximately 250,000 people in the United States experience spontaneous cancer remission each year, and that in any group of devout people with cancer, some will experience remission by statistical probability alone. She added that no controlled study has ever demonstrated that prayer accelerates cancer remission above the rate expected by chance.",
    question: "What does the biostatistician's response demonstrate about the testimonial evidence?",
    answerOptions: [
      { text: "The five people are lying about their remission.", isCorrect: false, rationale: "The biostatistician does not question the remission  she questions the cause." },
      { text: "Five cases of remission among people who pray is consistent with the background rate of spontaneous remission  the testimonials are real but don't demonstrate that prayer caused the remission, because the same outcome would be expected without prayer at a predictable statistical rate.", isCorrect: true, rationale: "With 250,000 annual spontaneous remissions, finding five who also prayed is mathematically unremarkable. Correlation (they prayed and recovered) is not causation without controlling for the base rate." },
      { text: "Biostatisticians are biased against religion.", isCorrect: false, rationale: "The response is about evidence quality, not religious belief." },
      { text: "Cancer remission never occurs spontaneously.", isCorrect: false, rationale: "The passage explicitly states the opposite  250,000 spontaneous remissions annually." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "A restaurant chain published a sustainability report claiming it had reduced its 'carbon footprint by 40%' over five years. Environmental analysts discovered that the company changed its measurement methodology in year three, switching from a comprehensive lifecycle assessment that included supply chain emissions to a narrower 'operations-only' measure covering just its own restaurants' energy use. Under the original methodology, emissions had dropped only 11%.",
    question: "How does the methodology change affect the credibility of the 40% claim?",
    answerOptions: [
      { text: "The change is irrelevant because both methods measure carbon.", isCorrect: false, rationale: "Measuring different scopes of carbon produces different numbers  changing the ruler midway makes the comparison invalid." },
      { text: "The 40% figure is technically accurate under the new methodology but fundamentally misleading  by narrowing the measurement scope to excludethe largest emission source (supply chain), the company created the appearance of dramatic progress while the comprehensive measure showed only 11% improvement.", isCorrect: true, rationale: "Switching methodologies mid-measurement is a form of moving the goalposts. The broader measure captures actual environmental impact; the narrow one captures a fraction that happened to improve more." },
      { text: "All sustainability reports are fraudulent.", isCorrect: false, rationale: "The 40% is technically real under the new method  the issue is misleading comparison, not fraud in all reports." },
      { text: "The company should stop measuring emissions entirely.", isCorrect: false, rationale: "Better measurement, not no measurement, is the solution." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A union representative argued that outsourcing the city's trash collection to a private company would endanger workers, citing OSHA data showing private waste haulers had a fatality rate 60% higher than municipal crews. The private company responded with data showing its own safety record was better than the industry average, that all its drivers completed 40-hour safety certifications, and that the OSHA data included many small, poorly regulated firms that the city would never contract with.",
    question: "Whose evidence is more relevant to the specific decision being made, and why?",
    answerOptions: [
      { text: "The union, because OSHA data covers the entire industry.", isCorrect: false, rationale: "Industry-wide data includes firms irrelevant to this decision  the city would contract with one specific company, not the entire industry." },
      { text: "The company's firm-specific safety data is more relevant to the actual decision because the city would contract with this particular company  but the union's industry data remains valuable as context for the risks of privatisation generally, especially if oversight weakens over time or the contract changes hands.", isCorrect: true, rationale: "Both datasets are informative but answer different questions. The company's record predicts this specific contract's risk; the industry data predicts the risk category. The best analysis uses both." },
      { text: "Neither, because safety data cannot predict future accidents.", isCorrect: false, rationale: "While no prediction is perfect, historical safety data is the standard basis for risk assessment." },
      { text: "The company, because it always has better data than the government.", isCorrect: false, rationale: "The company has better data about itself; OSHA has better data about the industry. Both are needed." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A news programme reported that a large social media platform's internal research showed that its algorithm made 32% of teen girls feel worse about their bodies. The platform's CEO responded that the same research also showed 68% of teen girls reported no negative body-image effects, that the company had already implemented 'well-being nudges,' and that the research proved the company took the issue seriously. A media critic noted that the CEO was using the same data that revealed the harm to argue the company was responsible.",
    question: "What rhetorical strategy does the media critic identify in the CEO's response?",
    answerOptions: [
      { text: "The CEO lied about the research findings.", isCorrect: false, rationale: "The CEO cited the same data accurately  the issue is how it was framed, not falsified." },
      { text: "The CEO reframed evidence of harm as evidence of responsibility  using the company's own damaging research to claim credit for self-awareness while deflecting from the finding that the platform actively harmed nearly one in three teen girls, turning an indictment into a talking point.", isCorrect: true, rationale: "This is a sophisticated reframing: 'we found a problem' becomes 'we're the kind of company that looks for problems.' The harmful finding is absorbed into a corporate responsibility narrative." },
      { text: "The 32% figure is too small to matter.", isCorrect: false, rationale: "Nearly one-third of teen girls experiencing worsened body image is significant at any platform scale." },
      { text: "Internal research should never be made public.", isCorrect: false, rationale: "Public accountability for internal findings is the point of the news report." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "An insurance industry report argued that tort reform  limiting medical malpractice lawsuit payouts  reduced healthcare costs. The report compared healthcare spending growth in states with and without damage caps. A health policy researcher pointed out that the comparison did not adjust for differences in population age, insurance coverage rates, or hospital market concentration. She showed that states with damage caps also tended to have younger, healthier populations and more competitive hospital markets  both of which independently lower healthcare costs.",
    question: "What does the researcher demonstrate about the insurance industry's comparison?",
    answerOptions: [
      { text: "Tort reform actually increases healthcare costs.", isCorrect: false, rationale: "The researcher questions the evidence, not necessarily the conclusion  tort reform might still reduce some costs, but the cited comparison doesn't prove it." },
      { text: "The industry's comparison suffers from confounding: states with damage caps differ from states without them in population health, insurance coverage, and market structure  all factors that independently affect healthcare costs, making it impossible to attribute cost differences to damage caps alone.", isCorrect: true, rationale: "This is a classic confounding problem: the 'treatment' group (cap states) differs from the 'control' group (no-cap states) in multiple ways that independently affect the outcome." },
      { text: "Insurance companies should not conduct research.", isCorrect: false, rationale: "Any party can conduct research  the issue is whether the analysis controls for relevant variables." },
      { text: "Healthcare costs are too complex to study.", isCorrect: false, rationale: "Healthcare costs are complex but studiable  the issue is doing it properly with appropriate controls." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A parenting blog claimed that 'screen time causes ADHD in children,' citing three studies. Study 1 found a correlation between daily screen hours and ADHD diagnosis rates in 5,000 children. Study 2 found that children diagnosed with ADHD spent more time on screens than non-ADHD peers. Study 3 found that reducing screen time in a group of ADHD children did not reduce their symptoms over six months. A developmental psychologist noted that studies 1 and 2 could reflect reverse causation  children with attention difficulties may be drawn to screens rather than screens causing the difficulties.",
    question: "How does Study 3 interact with the reverse-causation interpretation?",
    answerOptions: [
      { text: "Study 3 proves screens have no effect on anyone.", isCorrect: false, rationale: "Study 3 is limited to children already diagnosed with ADHD  it doesn't address screen effects on all children." },
      { text: "Study 3 supports the reverse-causation interpretation: if screens caused ADHD, reducing screen time should reduce symptoms  but it didn't, suggesting that the correlation found in studies 1 and 2 may reflect ADHD driving screen use rather than screen use driving ADHD.", isCorrect: true, rationale: "If A causes B, removing A should reduce B. Removing screens (A) didn't reduce ADHD symptoms (B), which is consistent with B causing A  children with ADHD gravitate toward screens, not the other way around." },
      { text: "Study 3 contradicts studies 1 and 2 entirely.", isCorrect: false, rationale: "Study 3 doesn't contradict the correlation  it reinterprets its direction. The correlation is real; the question is which variable drives it." },
      { text: "Reducing screen time is harmful for children with ADHD.", isCorrect: false, rationale: "Study 3 found no symptom change  not that reduction was harmful." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "A mayor proposed closing three neighbourhood fire stations and consolidating resources into one central 'super station,' citing a consulting firm's analysis showing the change would save $4.2 million annually while maintaining a city-wide average response time of 6 minutes. The fire chief publicly disagreed, presenting neighbourhood-level data showing that while the west side's response time would drop from 5 to 4 minutes due to proximity to the new station, the east side's would increase from 6 to 14 minutes. The chief argued that a city-wide average masked 'deadly geographic inequality.'",
    question: "Why is the fire chief's neighbourhood-level data more appropriate for this policy decision than the consulting firm's city-wide average?",
    answerOptions: [
      { text: "The fire chief has more experience than the consulting firm.", isCorrect: false, rationale: "Experience matters, but the question is about which data format  average vs. disaggregated  is more appropriate." },
      { text: "Emergency response is experienced locally, not as a city-wide average  a resident whose nearest station closes will experience the 14-minute reality, not the 6-minute average. The consulting firm's average hides that some residents face more than doubled response times, which for emergencies like cardiac arrest can mean the difference between life and death.", isCorrect: true, rationale: "Averages can conceal dangerous outliers. In emergency services, the distribution of response times matters as much as the mean  especially when the outliers represent life-threatening delays for specific neighbourhoods." },
      { text: "Consulting firms always produce biased analyses.", isCorrect: false, rationale: "The math may be correct  the issue is that a correct average can be the wrong metric for the decision." },
      { text: "No fire stations should ever be closed.", isCorrect: false, rationale: "The chief's argument is about equitable distribution, not absolute opposition to any operational change." },
    ],
    challenge_tags: ['rla-2'],
  },
];
