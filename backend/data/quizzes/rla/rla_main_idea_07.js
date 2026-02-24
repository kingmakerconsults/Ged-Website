// Reading Comprehension  Test Ready: Practice 7 / Main Idea & Author's Purpose
// 10 questions | inferring implicit main ideas, evaluating author purpose and tone in complex texts
module.exports = [
  {
    questionNumber: 1, type: 'multipleChoice', difficulty: 'medium',
    passage: "In the early 20th century, American cities faced a sanitation crisis. Rapidly growing industrial populations produced volumes of waste that overwhelmed existing systems. Tuberculosis, typhoid, and cholera spread through contaminated water and crowded tenements. Progressive reformers responded not primarily with medical interventions but with infrastructure: sewage systems, water treatment plants, building codes mandating light and ventilation, and garbage collection. The dramatic decline in urban mortality rates that followed was less a triumph of medicine than of engineering and political will.",
    question: "What is the main idea of the passage?",
    answerOptions: [
      { text: "American cities in the early 20th century were dirty and dangerous.", isCorrect: false, rationale: "This describes the problem, not the passage's main idea  which is about the solution and what it reveals." },
      { text: "The major public health gains of the early 20th century were achieved mainly through infrastructure and regulation rather than medical advances  making the improvement a story of engineering and political action, not clinical medicine.", isCorrect: true, rationale: "The passage builds toward its thesis in the final sentence: mortality declined because of infrastructure, not medicine. Everything before sets up this counter-intuitive conclusion." },
      { text: "Tuberculosis was the most dangerous disease in American cities.", isCorrect: false, rationale: "TB is one of several diseases listed  the passage doesn't rank them." },
      { text: "Building codes are more important than sewage systems.", isCorrect: false, rationale: "The passage lists both as part of the same infrastructure response  it doesn't rank them against each other." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 2, type: 'multipleChoice', difficulty: 'medium',
    passage: "The Marshall Plan, formally the European Recovery Program (1948-1952), provided $13 billion in American economic assistance to rebuild Western European economies devastated by World War II. While humanitarian motives were genuine, the programme also served strategic Cold War objectives: prosperous Western European nations were far less likely to elect communist governments. By tying aid to the purchase of American goods, the Plan also stimulated U.S. exports. Critics argue the Plan was less about generosity than about securing American economic and geopolitical dominance; supporters counter that good outcomes for multiple parties do not diminish the achievement.",
    question: "What is the author's approach to presenting the Marshall Plan?",
    answerOptions: [
      { text: "The author condemns the Marshall Plan as purely self-interested.", isCorrect: false, rationale: "The author acknowledges humanitarian motives alongside strategic ones  and presents supporters' counterargument." },
      { text: "The author presents a multi-layered interpretation: the Marshall Plan had genuine humanitarian aims but also served American strategic and economic interests, and the passage gives voice to both critics and supporters rather than choosing one position.", isCorrect: true, rationale: "The passage deliberately presents multiple motivations (humanitarian, anti-communist, economic) and includes both the critics' and supporters' perspectives a balanced analytical approach." },
      { text: "The author argues the Marshall Plan was the most important event of the Cold War.", isCorrect: false, rationale: "The passage doesn't rank the Plan among Cold War events." },
      { text: "The author believes American exports were more important than European recovery.", isCorrect: false, rationale: "Export stimulation is mentioned as one effect, not prioritised over recovery." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 3, type: 'multipleChoice', difficulty: 'hard',
    passage: "When a city installs surveillance cameras in a high-crime area and crime drops 15%, officials celebrate. Rarely do they mention that crime in adjacent, uncovered areas rose 12% during the same period. Criminologists call this 'crime displacement'  the cameras didn't eliminate criminal behaviour; they redistributed it to softer targets. The net city-wide crime reduction was only 3%, and it came at the cost of concentrating risk in neighbourhoods too poor or politically weak to demand their own cameras.",
    question: "What is the author's implicit argument about surveillance cameras?",
    answerOptions: [
      { text: "Surveillance cameras should be installed in every neighbourhood.", isCorrect: false, rationale: "The author criticises the displacement effect  universal installation might address it but isn't the argument being made." },
      { text: "Surveillance cameras in isolated locations create an illusion of public safety improvement while primarily shifting danger from politically powerful areas to vulnerable ones  making the policy an equity issue, not just a crime-reduction issue.", isCorrect: true, rationale: "The author doesn't state the argument explicitly in one sentence  it emerges from the data: small net benefit, displaced risk, and the final equity point about which neighbourhoods bear the burden." },
      { text: "Crime can never be reduced by any means.", isCorrect: false, rationale: "The passage acknowledges a 3% net reduction  the argument is that the reduction is smaller than claimed and inequitably distributed." },
      { text: "Criminologists oppose all law enforcement technology.", isCorrect: false, rationale: "Criminologists named the displacement phenomenon  the passage doesn't characterise their position on all technology." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 4, type: 'multipleChoice', difficulty: 'hard',
    passage: "A biologist writes: 'De-extinction  the attempt to recreate vanished species using preserved DNA  captures public imagination but diverts attention from a more productive goal: preventing current extinctions. The resources needed to bring back a single woolly mammoth could protect hundreds of endangered species and their habitats. We risk building a narrative in which extinction becomes reversible and therefore less urgent, when in reality genetic reconstruction produces Frankenstein approximations, not ecological restoration. The species is not the sequence; it is the web of relationships in which it evolved.'",
    question: "What is the biologist's central argument?",
    answerOptions: [
      { text: "De-extinction is scientifically impossible.", isCorrect: false, rationale: "The biologist doesn't say it's impossible  she says it's misguided and resource-wasteful." },
      { text: "De-extinction diverts resources and public urgency from conservation of living species, creates a false sense that extinction is reversible, and fundamentally misunderstands species as genetic sequences rather than as products of ecological relationships that cannot be recreated in a lab.", isCorrect: true, rationale: "Three-part argument: misallocation of resources, moral hazard (reduced urgency), and philosophical error (species are ecological, not just genetic). The final sentence is the deepest claim." },
      { text: "Woolly mammoths should be prioritised over other extinct species.", isCorrect: false, rationale: "The mammoth is used as an example of misplaced effort, not as a priority recommendation." },
      { text: "DNA preservation technology is advancing rapidly.", isCorrect: false, rationale: "The biologist doesn't discuss the pace of technology  she questions its purpose." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 5, type: 'multipleChoice', difficulty: 'hard',
    passage: "In 1911, the Triangle Shirtwaist Factory fire killed 146 garment workers, mostly young immigrant women, who were unable to escape because the factory owners had locked exit doors to prevent unauthorised breaks. The tragedy shocked the nation and led to landmark workplace safety laws, fire codes, and labour regulations. Yet the factory owners were acquitted of manslaughter charges. The fire did more to advance worker protection than any legislative campaign before it  a bitter reminder that rights are often won not through persuasion but through catastrophe.",
    question: "What does the author's final sentence reveal about the passage's deeper argument?",
    answerOptions: [
      { text: "The fire was beneficial because it led to new laws.", isCorrect: false, rationale: "'Bitter reminder' signals the author sees irony and tragedy  not benefit  in needing a catastrophe to produce reform." },
      { text: "The passage argues that systemic reform often requires catastrophic loss because normal political processes are insufficient to overcome institutional inertia  the workers' deaths achieved what lobbying could not, but the human cost of that 'achievement' exposes a moral failure in the system.", isCorrect: true, rationale: "The final sentence transforms a historical account into a broader argument about how change happens: through catastrophe rather than persuasion, which the author frames as 'bitter'  both effective and tragically inadequate." },
      { text: "Factory owners should never lock doors.", isCorrect: false, rationale: "This is a safety recommendation implicit in the events, not the deeper argument the question asks about." },
      { text: "Immigration led to unsafe working conditions.", isCorrect: false, rationale: "The workers' immigrant status is context, not cause  the locked doors and absent regulation caused the deaths." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 6, type: 'multipleChoice', difficulty: 'hard',
    passage: "Two researchers studied the same inner-city after-school programme. Researcher A used a quantitative approach: she compared test scores of 200 programme participants with 200 similar non-participants and found no significant academic improvement. Researcher B used qualitative methods: she spent six months observing the programme and interviewing 30 participants. She found that students developed stronger study habits, greater confidence in asking teachers for help, and a sense of belonging in school  none of which were captured by test scores. Both researchers published their findings in reputable journals.",
    question: "What does the contrast between the two studies illustrate about research methodology?",
    answerOptions: [
      { text: "Quantitative research is always more reliable than qualitative research.", isCorrect: false, rationale: "The passage shows each method captures different outcomes  reliability is not the issue." },
      { text: "The choice of research method determines which outcomes become visible  quantitative methods captured test scores but missed behavioural and emotional growth, while qualitative methods captured developmental changes invisible to standardised measures. Neither is wrong; they answer different questions about the same programme.", isCorrect: true, rationale: "The passage illustrates methodological complementarity: what you measure shapes what you find. The programme may be genuinely effective in ways that only qualitative methods can detect." },
      { text: "The after-school programme is a waste of money.", isCorrect: false, rationale: "Whether the programme is worthwhile depends on which outcomes you value  the passage doesn't make this judgement." },
      { text: "Researcher B spent more time and therefore her conclusions are correct.", isCorrect: false, rationale: "Time spent doesn't determine correctness  the passage presents both approaches as valid contributions." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 7, type: 'multipleChoice', difficulty: 'hard',
    passage: "A climate scientist writes: 'The debate about whether climate change is happening is over. The remaining debate  how to respond  is not primarily scientific but economic and political. Any honest assessment must acknowledge trade-offs: aggressive emissions reduction will raise energy costs in the short term and may disproportionately burden low-income households. Inaction, however, will produce costs measured in drowned cities, collapsed fisheries, and climate refugees. The choice is not between costs and no costs. It is between manageable costs now and catastrophic costs later.'",
    question: "What rhetorical strategy does the scientist use to frame the climate response debate?",
    answerOptions: [
      { text: "She denies that climate action has any costs.", isCorrect: false, rationale: "She explicitly acknowledges costs: 'aggressive emissions reduction will raise energy costs.'" },
      { text: "She reframes the debate from 'action vs. inaction' to 'which costs we prefer'  acknowledging that mitigation has real short-term costs but positioning inaction as even more expensive, making the debate about cost timing and magnitude rather than cost avoidance.", isCorrect: true, rationale: "The key move is the final sentence: both paths have costs. By accepting the opponent's concern (costs of action) and showing the alternative is worse, she turns a 'should we act?' debate into a 'when do we pay?' debate." },
      { text: "She argues that economic concerns are irrelevant to climate policy.", isCorrect: false, rationale: "She calls the debate 'economic and political'  the opposite of calling economics irrelevant." },
      { text: "She attacks fossil fuel companies personally.", isCorrect: false, rationale: "No companies are mentioned  the argument is about policy trade-offs." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 8, type: 'multipleChoice', difficulty: 'hard',
    passage: "A memoir excerpt reads: 'My mother cooked every meal from scratch  not because she loved cooking, but because we could not afford prepared food. She never once described this as sacrifice; she called it 'doing what's necessary.' I did not understand until I became a parent that her refusal to name her labour as sacrifice was itself a form of protection. She shielded us from knowing we were poor by treating scarcity as ordinary.'",
    question: "What is the central insight of this passage?",
    answerOptions: [
      { text: "The author's mother was an excellent cook.", isCorrect: false, rationale: "Cooking skill is not mentioned  the mother cooked out of necessity, not passion." },
      { text: "The mother's act of framing economic necessity as routine normalcy was a deliberate form of emotional protection  she hid the family's poverty from her children not by lying but by refusing to label hardship as hardship, which the author recognises only in retrospect.", isCorrect: true, rationale: "The insight is about how language shapes children's understanding: by not calling sacrifice 'sacrifice,' the mother controlled the narrative of their circumstances. The adult narrator recognises this reframing as protective." },
      { text: "Prepared food is more expensive than cooking from scratch.", isCorrect: false, rationale: "The passage says they couldn't afford prepared food  but cost comparison isn't the central insight." },
      { text: "All parents make sacrifices for their children.", isCorrect: false, rationale: "The passage is about a specific kind of linguistic and emotional strategy, not a generalisation about all parents." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 9, type: 'multipleChoice', difficulty: 'hard',
    passage: "The concept of 'digital redlining' describes how algorithms reproduce historical discrimination in new forms. Insurance companies charge higher premiums in certain ZIP codes based on historical claims data  data shaped by decades of underinvestment in those same neighbourhoods. Hiring algorithms trained on a company's past successful employees perpetuate the demographics of a historically non-diverse workforce. In each case, the technology appears neutral because it relies on 'data,' but the data itself encodes past discrimination, which the algorithm then automates and scales.",
    question: "What is the author's main argument about algorithmic decision-making?",
    answerOptions: [
      { text: "Algorithms are intentionally designed to be racist.", isCorrect: false, rationale: "The author's argument is that algorithms reproduce bias without intentional design  the discrimination is in the training data." },
      { text: "Algorithms that rely on historical data inherit the biases embedded in that data  appearing objective because they use numbers while actually automating and scaling the same discriminatory patterns that produced the data, giving old inequities a new technological veneer of neutrality.", isCorrect: true, rationale: "The key claim is the paradox of data neutrality: data feels objective but carries historical bias. Algorithms don't create new discrimination  they perpetuate existing discrimination at scale." },
      { text: "ZIP codes should not be used for any purpose.", isCorrect: false, rationale: "ZIP-code-based pricing is one example  the argument is about data-encoded bias broadly." },
      { text: "All technology is harmful.", isCorrect: false, rationale: "The author critiques a specific mechanism (bias in training data)  not technology in general." },
    ],
    challenge_tags: ['rla-2'],
  },
  {
    questionNumber: 10, type: 'multipleChoice', difficulty: 'hard',
    passage: "An economist writes: 'GDP growth is the most commonly cited indicator of national prosperity, yet it counts a car accident as economic progress  the ambulance, the hospital visit, the car repair all add to GDP  while ignoring unpaid caregiving, environmental depletion, and the distribution of wealth. A country can show rising GDP while most citizens grow poorer, if the gains concentrate at the top. GDP measures activity, not welfare. Using it as a synonym for national well-being is like judging a person's health by how much time they spend in a doctor's office.'",
    question: "What does the economist's final analogy illustrate?",
    answerOptions: [
      { text: "Doctors' offices are unhealthy places.", isCorrect: false, rationale: "The analogy is about measurement  more doctor visits don't mean better health, just as more economic activity doesn't mean greater well-being." },
      { text: "Just as frequent doctor visits measure medical system usage rather than actual health, GDP measures economic activity rather than citizen well-being  both metrics can rise precisely because of negative circumstances (illness, accidents) rather than genuinely positive outcomes.", isCorrect: true, rationale: "The analogy drives home the passage's central argument: GDP counts activity regardless of whether that activity reflects prosperity or misfortune. The doctor's office parallel makes this abstract critique concrete." },
      { text: "GDP should be abolished as a measurement.", isCorrect: false, rationale: "The economist argues GDP is misused as a welfare measure  not that it should stop being tracked entirely." },
      { text: "Car accidents are good for the economy.", isCorrect: false, rationale: "The economist uses this example to show GDP's absurdity  car accidents add to GDP but don't represent prosperity." },
    ],
    challenge_tags: ['rla-2'],
  },
];
