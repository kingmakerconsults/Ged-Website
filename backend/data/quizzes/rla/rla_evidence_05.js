// Reading Comprehension  Core: Textual Evidence  Practice 5
// 10 questions | source relevance, evidence sufficiency, claim-evidence matching
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'easy',
    passage: "A community newsletter claimed that volunteering improves mental health. It cited a survey of 500 regular volunteers, 78% of whom reported 'feeling happier and more purposeful' since they started volunteering. The newsletter also included a quote from a local volunteer coordinator who said, 'I can just see the difference in people's eyes when they help others.'",
    question: "Which piece of evidence is more persuasive in supporting the mental health claim  the survey or the coordinator's quote?",
    answerOptions: [
      { text: "The coordinator's quote, because she observes volunteers directly.", isCorrect: false, rationale: "Direct observation by one person is anecdotal  one person's perception cannot measure mental health across 500 people." },
      { text: "The survey, because it provides quantified data from a larger sample of volunteers' self-reported well-being.", isCorrect: true, rationale: "While self-reported data has limits, 78% of 500 people is systematically collected evidence that outweighs one coordinator's impression." },
      { text: "Neither, because volunteering cannot affect mental health.", isCorrect: false, rationale: "The passage presents evidence that it does  dismissing both pieces without basis is not an analysis of evidence strength." },
      { text: "Both are equally strong because they agree with each other.", isCorrect: false, rationale: "Agreement does not make evidence equally strong  data from 500 respondents is systematically stronger than one person's observation." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'easy',
    passage: "A news report argued that the city's new after-school tutoring programme was effective. It noted that 92% of participating students passed their end-of-year exams, compared to 68% of non-participating students. The report also mentioned that the programme's waiting list had grown to 300 students.",
    question: "Which detail best supports the claim that the programme is effective at improving academic outcomes?",
    answerOptions: [
      { text: "The waiting list grew to 300 students.", isCorrect: false, rationale: "A long waiting list shows demand, not effectiveness  popular programmes aren't necessarily effective ones." },
      { text: "92% of participants passed compared to 68% of non-participants.", isCorrect: true, rationale: "The pass rate comparison directly measures academic outcomes between two groups, making it the strongest evidence of effectiveness." },
      { text: "The programme is offered after school.", isCorrect: false, rationale: "Scheduling is a programme feature, not evidence of its impact." },
      { text: "The programme was described as 'new.'", isCorrect: false, rationale: "Novelty is not evidence of effectiveness." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'medium',
    passage: "An environmental group argued that single-use plastic bag bans reduce ocean pollution. They presented data showing that in cities with bag bans, plastic bag litter on beaches dropped 72% within two years. A critic responded that overall ocean plastic pollution comes primarily from industrial sources and fishing equipment, not consumer bags, which account for less than 1% of ocean plastic by weight.",
    question: "How does the critic's evidence challenge the environmental group's argument?",
    answerOptions: [
      { text: "It proves that plastic bag bans have no effect on anything.", isCorrect: false, rationale: "The group's data shows beach litter did drop  the bans clearly had a local effect." },
      { text: "It reframes the argument by showing that even a successful bag ban addresses less than 1% of ocean plastic  the intervention works locally but is insignificant against the larger ocean pollution problem the group implied it would help solve.", isCorrect: true, rationale: "The group's claim linked bag bans to 'ocean pollution,' but the critic shows consumer bags are a tiny fraction of the problem  the ban's real impact is much narrower than the group's framing suggests." },
      { text: "Beach litter data is always unreliable.", isCorrect: false, rationale: "The critic doesn't question the beach data  they question its relevance to the broader ocean pollution claim." },
      { text: "Industrial pollution is not a real problem.", isCorrect: false, rationale: "The critic explicitly identifies industrial sources as the primary problem." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'medium',
    passage: "A parenting magazine article claimed that children who eat dinner with their families at least five times per week are less likely to use drugs or alcohol as teenagers. The article cited a 10-year study of 8,000 families. A sociologist noted that families who eat together regularly also tend to have higher incomes, more parental supervision, and stricter household rules.",
    question: "What does the sociologist's observation suggest about the magazine's claim?",
    answerOptions: [
      { text: "The study's sample size of 8,000 is too small.", isCorrect: false, rationale: "8,000 families is a large sample  the concern is about confounding variables, not sample size." },
      { text: "Family dinners may be a marker of broader parenting practices and family stability  the correlation between dinners and lower substance use could be driven by these underlying factors rather than the meals themselves.", isCorrect: true, rationale: "If dinner-eating families also have higher incomes and stricter supervision, any of those factors could explain the lower substance use. The dinner may be correlated with, not causing, the outcome." },
      { text: "The sociologist believes family dinners are harmful.", isCorrect: false, rationale: "The sociologist questions the causal mechanism, not the value of family dinners." },
      { text: "All families should eat dinner together seven nights a week.", isCorrect: false, rationale: "This is a prescription not suggested by either the article or the sociologist." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'medium',
    passage: "A technology columnist argued that remote work increases productivity. She cited a Stanford study in which call-centre workers who worked from home completed 13.5% more calls per shift. She also cited her own experience of 'getting more done' since working remotely, and mentioned a company CEO who reported higher quarterly profits since going fully remote.",
    question: "Which of the three pieces of evidence is strongest, and why?",
    answerOptions: [
      { text: "The CEO's report, because profits are the most important measure.", isCorrect: false, rationale: "Profits can change for many reasons (market conditions, pricing, staffing)  a CEO's report doesn't isolate remote work as the cause." },
      { text: "The Stanford study, because it uses a controlled comparison to measure a specific productivity metric in a defined work context.", isCorrect: true, rationale: "A controlled study with measurable output (calls per shift) isolates the remote work variable better than personal experience or aggregate profit reports." },
      { text: "The columnist's own experience, because personal testimony is always the most reliable.", isCorrect: false, rationale: "Personal experience is subject to bias and is the weakest form of evidence  one person's perception cannot generalize." },
      { text: "All three are equally strong because they all support the same conclusion.", isCorrect: false, rationale: "Agreeing doesn't make evidence equal  a controlled study is systematically stronger than anecdote or a single company's financials." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "A pharmaceutical company's advertisement stated: '4 out of 5 dentists recommend our toothpaste.' A consumer advocacy group investigated and found that the survey asked dentists whether they would recommend the toothpaste among several acceptable options  not whether they recommended it over others. Of the 5 dentists surveyed in each sample group, most recommended multiple brands equally.",
    question: "How does the advocacy group's finding change the meaning of the '4 out of 5' claim?",
    answerOptions: [
      { text: "It proves the toothpaste is ineffective.", isCorrect: false, rationale: "The toothpaste may be perfectly effective  the issue is how the recommendation data was framed." },
      { text: "The claim technically accurate but deeply misleading  '4 out of 5 recommend it' implies exclusive preference, but the dentists actually recommended it as one of many acceptable options, a distinction the advertisement deliberately obscures.", isCorrect: true, rationale: "Recommending a product 'among several' is very different from recommending it above others. The statistic is not false, but its framing creates a false impression of superiority." },
      { text: "Dental recommendations are always meaningless.", isCorrect: false, rationale: "Dentist expertise is valuable  the problem is how the company reported the survey, not the value of dental opinion." },
      { text: "The advocacy group is biased against the company.", isCorrect: false, rationale: "The group reported factual findings about the survey methodology  this is investigative journalism, not bias." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A governor argued that her state's economy was thriving, citing a 3.2% unemployment rate  the lowest in 15 years. An economist countered that the low unemployment rate masked important details: 40% of new jobs created were part-time or temporary, average wages had not kept pace with inflation, and the labour force participation rate had dropped 4 points, meaning many working-age adults had stopped looking for work entirely.",
    question: "What does the economist's evidence reveal about using unemployment rate alone as a measure of economic health?",
    answerOptions: [
      { text: "The unemployment rate is always a meaningless statistic.", isCorrect: false, rationale: "It measures something real  the issue is that it doesn't capture the full picture alone." },
      { text: "A low unemployment rate can coexist with economic weakness if the jobs created are low-quality and many potential workers have exited the labour force  a single metric can present a misleadingly positive picture.", isCorrect: true, rationale: "Part-time jobs, stagnant wages, and workers leaving the labour force all indicate economic stress that the unemployment number alone doesn't reveal." },
      { text: "The governor fabricated the unemployment data.", isCorrect: false, rationale: "The economist doesn't dispute the 3.2% figure  they add context that changes its interpretation." },
      { text: "More people should enter the labour force immediately.", isCorrect: false, rationale: "The economist diagnoses a measurement problem  they don't prescribe individual behaviour." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A school district defended its new reading programme by reporting that 85% of third-graders reached grade-level reading proficiency by year's end. A parent noticed that the district had also changed the proficiency test that year, lowering the passage complexity and reducing the number of questions requiring written response. Under the previous test, only 61% had reached proficiency.",
    question: "How does the test change affect the reliability of the district's claim?",
    answerOptions: [
      { text: "Changing the test proves the programme works.", isCorrect: false, rationale: "If the measuring tool changed, the improvement could reflect the easier test rather than better reading." },
      { text: "The 85% figure may reflect a lower assessment standard rather than genuine reading improvement  comparing scores across two different tests makes it impossible to determine whether students actually read better or simply faced an easier bar.", isCorrect: true, rationale: "When both the programme and the test change simultaneously, any 'improvement' is uninterpretable. The parent identifies that the metric itself shifted, not necessarily the skill being measured." },
      { text: "Proficiency tests should never be updated.", isCorrect: false, rationale: "Tests can be legitimately updated  the problem is using the updated test to claim improvement from a programme implemented at the same time." },
      { text: "Third-graders are too young for reading proficiency to matter.", isCorrect: false, rationale: "Third-grade reading proficiency is a critical educational milestone with lifelong consequences." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "A fitness influencer claimed that cold showers boost immune function, citing a Dutch study in which participants who took cold showers for 30 days reported 29% fewer sick days than a control group. The influencer did not mention that the study also found no difference in actual illness duration between the two groups  the cold-shower group simply went to work while sick more often.",
    question: "How does the omitted finding change the interpretation of the '29% fewer sick days' claim?",
    answerOptions: [
      { text: "The study was fraudulent and should be discarded.", isCorrect: false, rationale: "The study itself reported both findings honestly  the influencer selectively cited only one." },
      { text: "Fewer sick days did not mean fewer illnesses  the cold-shower group felt more energised or resilient and chose to work through illness rather than actually being sick less often, meaning the immune benefit the influencer claimed is not supported.", isCorrect: true, rationale: "Same illness duration but fewer sick days means the behaviour changed, not the immune response. The influencer's causal claim (cold showers boost immunity) is contradicted by the full data." },
      { text: "Cold showers are dangerous and should be avoided entirely.", isCorrect: false, rationale: "The study doesn't show danger  it shows the claimed mechanism is wrong." },
      { text: "Going to work while sick is always the healthiest choice.", isCorrect: false, rationale: "Working while sick may spread illness  the study describes behaviour, not health advice." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "An advocacy group argued for expanding public preschool, citing research showing that children who attended preschool entered kindergarten with vocabulary scores 20% higher than non-attenders. The group's opponent noted that 80% of the preschool children in the study were enrolled by parents who also read to them daily, attended library programmes, and actively sought educational resources  suggesting the parents, not the preschool, drove the vocabulary gains.",
    question: "What type of evidence problem does the opponent identify?",
    answerOptions: [
      { text: "The vocabulary test was flawed.", isCorrect: false, rationale: "The opponent doesn't question the test  they question what caused the scores." },
      { text: "Selection bias  parents who chose preschool were already more educationally engaged, so the children's higher vocabulary may reflect home environment rather than the preschool programme itself.", isCorrect: true, rationale: "When the participants who receive the intervention are systematically different from those who don't, the outcome could be driven by those differences rather than the intervention. This is textbook selection bias." },
      { text: "Preschool is harmful to children's development.", isCorrect: false, rationale: "The opponent questions causal attribution, not whether preschool is harmful." },
      { text: "Only children whose parents read to them should attend preschool.", isCorrect: false, rationale: "This is a policy recommendation not implied by the opponent's statistical critique." },
    ],
    challenge_tags: ['rla-2'],
  },
];
