/**
 * GED Ready-Style Civics & Government — Passage-Based Questions
 * Modeled after GED Ready® Social Studies exam format:
 *   - Primary source passages (150-350 words)
 *   - Higher-order thinking: inference, evaluation, point-of-view analysis
 *   - "Based on the passage..." / "According to the excerpt..." stems
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      'This excerpt is from remarks President Lyndon B. Johnson made at the signing of the Voting Rights Act of 1965.\n\nThis act flows from a clear and simple wrong. Its only purpose is to right that wrong. Millions of Americans are denied the right to vote because of their color. This law will ensure them the right to vote. The wrong is one which no American, in his heart, can justify. The right is one which no American, true to our principles, can deny.',
    question:
      'Which statement from this excerpt is a fact and <em>not</em> an opinion?',
    answerOptions: [
      {
        text: '"This act flows from a clear and simple wrong."',
        rationale:
          "This is an opinion — what counts as a 'clear and simple wrong' is a value judgment, even if widely shared.",
        isCorrect: false,
      },
      {
        text: '"Millions of Americans are denied the right to vote because of their color."',
        rationale:
          'Correct. This is a verifiable factual claim about the state of voting access at the time, which could be confirmed with data on voter registration and turnout by race.',
        isCorrect: true,
      },
      {
        text: '"The wrong is one which no American, in his heart, can justify."',
        rationale:
          'This is an opinion — it asserts what Americans feel in their hearts, which is a subjective claim about moral beliefs.',
        isCorrect: false,
      },
      {
        text: '"The right is one which no American, true to our principles, can deny."',
        rationale:
          "This is an opinion — it makes a value judgment about what Americans 'true to our principles' should believe.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      'This excerpt is from the Declaration of Independence, adopted in 1776.\n\n. . . That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, —That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to [result in] their Safety and Happiness . . .',
    question: 'Which idea about government powers is stated in the excerpt?',
    answerOptions: [
      {
        text: 'They are assigned to separate branches.',
        rationale:
          'The separation of powers into branches is not discussed in this excerpt from the Declaration of Independence.',
        isCorrect: false,
      },
      {
        text: 'They must be granted by the people.',
        rationale:
          "Correct. The excerpt states that governments derive 'their just powers from the consent of the governed,' meaning the people grant the government its authority.",
        isCorrect: true,
      },
      {
        text: 'They are granted to enforce laws.',
        rationale:
          'While government does enforce laws, this excerpt focuses on where government power comes from (the people), not on law enforcement.',
        isCorrect: false,
      },
      {
        text: 'They must be firmly protected.',
        rationale:
          "The excerpt discusses the people's right to alter or abolish government, not the protection of government powers themselves.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'hard',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      'This essay was published in 1788 in response to an article that argued against the ratification of the U.S. Constitution.\n\nHe tells you that the President will have more power than many Princes in Europe;—The President has not, in many instances, as much power as the Governor of this State. He tells you also that the President has the power to call out the Militia, when, and how he pleases; this is not a fact. The power of calling out the Militia is vested in Congress:—Congress ought to have the power of calling out the Militia in cases of invasions or insurrections; for instance, if our State was to be invaded by a numerous enemy, too powerful for our Militia to oppose, ought not Congress to have power to call on the Militia of the other States to assist us? Surely they ought: Or are we to be destroyed because we have not force sufficient to drive the enemy from amongst us? This is the monstrous power which the Congress have over the Militia, and which this man relates such frightful tales about.—The Governor of this State has more power over the Militia of the State than the President will have over the militia of the United States.',
    question:
      'According to the essay, what is the effect of dividing control of the military power of the United States between Congress and the president?',
    answerOptions: [
      {
        text: 'limiting the military powers of the states',
        rationale:
          'The essay actually argues that state governors retain significant militia power, not that state military powers are limited.',
        isCorrect: false,
      },
      {
        text: 'providing assistance to the state governors',
        rationale:
          "While the essay mentions Congress calling on other states' militias, the main point is about preventing concentrated power, not assisting governors.",
        isCorrect: false,
      },
      {
        text: 'preventing the consolidation of power in one individual',
        rationale:
          "Correct. The essay's central argument is that dividing military power between Congress and the President prevents any one person from having too much control—the President does not have unchecked power over the militia.",
        isCorrect: true,
      },
      {
        text: 'ensuring protection against invasion by a foreign force',
        rationale:
          "While defense against invasion is mentioned as an example, it is used to justify Congress's power—not presented as the main effect of dividing military authority.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      'This paragraph is the First Amendment to the U.S. Constitution.\n\nCongress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or [limiting] the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government [to settle] grievances.',
    question: 'Which circumstance shows an application of the First Amendment?',
    answerOptions: [
      {
        text: "After a political activist calls for a workers' revolution at a protest, a U.S. government leader asks to debate the activist on television.",
        rationale:
          'A government leader debating an activist is not a First Amendment issue; it is simply political discourse. No rights are being restricted or exercised in an unusual way.',
        isCorrect: false,
      },
      {
        text: 'After a newspaper prints an editorial criticizing the president, the government tries to censor the newspaper.',
        rationale:
          'Correct. The First Amendment protects freedom of the press. A government attempt to censor a newspaper for criticizing the president is a direct application (violation) of this amendment.',
        isCorrect: true,
      },
      {
        text: 'When a nonviolent protest against a U.S. government policy occurs, police record the names of the protest leaders.',
        rationale:
          'While recording names raises civil liberties concerns, police observation of a public protest does not directly restrict First Amendment rights.',
        isCorrect: false,
      },
      {
        text: 'When a group sues the government to stop the implementation of a policy, the government investigates the activities of the group.',
        rationale:
          'This scenario involves the right to petition the government (filing a lawsuit), but a government investigation does not directly restrict that right under the First Amendment.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      'This excerpt is from the U.S. Constitution.\n\nArticle II, Section 2\nHe [the president] shall have Power, by and with the Advice and Consent of the Senate, to make Treaties, provided two thirds of the Senators present concur; and he shall nominate, and by and with the Advice and Consent of the Senate, shall appoint Ambassadors, other public Ministers and Consuls, Judges of the supreme Court, and all other Officers of the United States, whose Appointments are not herein otherwise provided for, and which shall be established by Law: but the Congress may by Law vest the Appointment of such inferior Officers, as they think proper, in the President alone, in the Courts of Law, or in the Heads of Departments.',
    question:
      'Which fundamental principle of U.S. democracy does this excerpt describe?',
    answerOptions: [
      {
        text: 'representative government',
        rationale:
          'While the Senate represents the people, this excerpt focuses on the shared power between the executive and legislative branches, not on representation itself.',
        isCorrect: false,
      },
      {
        text: 'checks and balances',
        rationale:
          "Correct. The excerpt describes how the president's power to make treaties and appoint officials requires the 'Advice and Consent of the Senate,' which is a check by the legislative branch on executive power.",
        isCorrect: true,
      },
      {
        text: 'right to a fair trial',
        rationale:
          'The right to a fair trial is addressed in other amendments (5th and 6th), not in Article II, Section 2.',
        isCorrect: false,
      },
      {
        text: 'legislative powers',
        rationale:
          "While the Senate's role is mentioned, the excerpt is about the balance of power between branches, not about Congress's legislative authority to make laws.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'text',
    difficulty: 'hard',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      "This excerpt is from 2009 remarks by Senator Lamar Alexander on the floor of the U.S. Senate.\n\n. . . At this morning's breakfast [attended by Democratic and Republican Senators] we discussed health care. . . . [O]ne of the things we said is that we agree on about 80 percent of what needs to be done. But one of the areas where we do not agree is cost. . . .\n\nA lot of us are feeling like we have had about enough of Washington takeovers. . . . Government-run insurance is not the best way to extend coverage to low-income Americans who need it. . . . Let me mention an aspect of cost which is often overlooked. Federal debt is certainly a problem, but as a former Governor, I care about the State debt and State taxes. . . .\n\nMy suggestion to every Governor in this country is . . . to call in your Medicaid director, ask that Medicaid director to call the Senate and say: Tell us exactly how much [these health-care bills] will impose in new costs on our State if the costs are shifted to the States. . . .",
    question: 'Which statement from the excerpt states an opinion?',
    answerOptions: [
      {
        text: '". . . At this morning\'s breakfast [attended by Democratic and Republican Senators] we discussed health care. . . ."',
        rationale:
          'This is a factual statement about an event that occurred — a breakfast meeting where health care was discussed.',
        isCorrect: false,
      },
      {
        text: '"But one of the areas where we do not agree is cost. . . ."',
        rationale:
          'This is a factual observation about a point of disagreement between senators.',
        isCorrect: false,
      },
      {
        text: '"Government-run insurance is not the best way to extend coverage to low-income Americans who need it. . . ."',
        rationale:
          "Correct. This is an opinion — it expresses the senator's personal judgment about policy. Whether government-run insurance is 'the best way' is a debatable value judgment, not a verifiable fact.",
        isCorrect: true,
      },
      {
        text: '". . . as a former Governor, I care about the State debt and State taxes. . . ."',
        rationale:
          'While this expresses a personal concern, the statement that he was a former Governor is factual, and his stated concern about debt is a political position rather than the most clearly opinionated statement in the passage.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'text',
    difficulty: 'hard',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      'These excerpts are from a 2011 debate in the U.S. Congress concerning financial reform.\n\n<strong>Excerpt 1:</strong>\nOne of the provisions of [a proposed bill] that will hinder economic growth and the creation of new jobs is the massive new bureaucracy called the Consumer Financial Protection Bureau, or CFPB. Everyone supports consumer protection, but the CFPB was given virtually unlimited power to dictate the types, terms and prices of financial products and services that consumers and small businesses can obtain from their bank or other credit provider. . . . The burden of this credit rationing will fall most heavily on lower-income and middle class families, as well as the small businesses that create about 80 percent of all new jobs. Rather than being protected, consumers are likely to be denied the products they want and need.\n—U.S. House Committee on Financial Services report, 2011\n\n<strong>Excerpt 2:</strong>\nWe have all seen the consequences of a regulatory system in which no single regulator has the authority and the comprehensive tools necessary to ensure that the consumer financial markets work for American families. For years, we have seen the growth of fine print that hides important and complex terms, fine print that makes it almost impossible for consumers to know what they are really getting into when they sign on the dotted line. . . . As a country, we are all paying the price for a consumer credit system that was broken.\n—Elizabeth Warren, U.S. Treasury Department, 2011',
    question:
      "Which basic assumption behind the committee report is <em>not</em> a basic assumption behind Warren's statement?",
    answerOptions: [
      {
        text: 'Concentrated authority is a threat to freedom.',
        rationale:
          "The committee report assumes that giving the CFPB 'virtually unlimited power' (concentrated authority) is harmful. Warren, in contrast, argues that the lack of a single regulatory authority was the problem — she sees concentrated regulatory power as beneficial, not threatening.",
        isCorrect: true,
      },
      {
        text: 'Economies depend on borrowed money.',
        rationale:
          'Both excerpts discuss credit and financial products, implying that borrowing is part of the economy. This assumption is shared.',
        isCorrect: false,
      },
      {
        text: 'Conflicting authority causes uncertainty.',
        rationale:
          'Warren specifically argues that a fragmented regulatory system was problematic, suggesting she shares this concern about conflicting authority.',
        isCorrect: false,
      },
      {
        text: 'Government oversight is unnecessary.',
        rationale:
          "The committee report does not claim oversight is unnecessary — it states 'everyone supports consumer protection.' The disagreement is about the degree of regulatory power.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      "This excerpt is from remarks made by President Barack Obama at the Tribal Nations Conference in 2014.\n\nWhen anybody in this country is not being treated equally under the law . . . it's my job as President to help solve it.\n\nNow, when I visited the Crow Nation in Montana, . . . I made it a point to meet with tribal leaders . . . because I wanted to make sure our country did better by our First Americans. . . .\n\nI wanted to change the relationship between our governments—to elevate your voices in Washington and give your tribes greater say over the decisions that affect the lives of your people every day. And I wanted to turn the page on a history that is riddled with too many broken promises, [and] write a new chapter with a spirit of respect and trust.",
    question:
      "Which statement from the excerpt shows that President Obama believes it is the president's duty to ensure that Native American nations are involved in the democratic process?",
    answerOptions: [
      {
        text: '"When anybody in this country is not being treated equally under the law . . . it\'s my job as President to help solve it."',
        rationale:
          "While this establishes Obama's view of presidential responsibility broadly, it does not specifically address involving Native American nations in the democratic process.",
        isCorrect: false,
      },
      {
        text: '"I made it a point to meet with tribal leaders . . . because I wanted to make sure our country did better by our First Americans."',
        rationale:
          'This describes a personal action (meeting with leaders) to improve conditions, but does not specifically address democratic participation or involvement in governance.',
        isCorrect: false,
      },
      {
        text: '"I wanted to change the relationship between our governments—to elevate your voices in Washington and give your tribes greater say over the decisions that affect the lives of your people every day."',
        rationale:
          "Correct. This statement directly addresses giving tribes 'greater say over the decisions that affect the lives of your people' — which is involvement in the democratic process of governance.",
        isCorrect: true,
      },
      {
        text: '"And I wanted to turn the page on a history that is riddled with too many broken promises, [and] write a new chapter with a spirit of respect and trust."',
        rationale:
          'This expresses a desire to improve the relationship, but focuses on trust-building rather than specifically ensuring democratic participation.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 9,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      'This speech discussing the Athenian government was delivered by Pericles in the fifth century BCE.\n\nOur constitution does not copy the laws of neighboring states; we are rather a pattern to others than imitators ourselves. Its administration favors the many instead of the few; this is why it is called a democracy. If we look to the laws, they afford equal justice to all in their private differences; if to social standing, advancement in public life falls to reputation for capacity, class considerations not being allowed to interfere with merit; nor again does poverty bar the way; if a man is able to serve the state, he is not hindered by the obscurity of his condition.',
    question: 'Which principle did Pericles discuss in this speech?',
    answerOptions: [
      {
        text: 'civil rights',
        rationale:
          'While Pericles mentions equal justice, the speech is primarily about the broader principle of how government and social advancement function in a democracy, not about specific civil rights protections.',
        isCorrect: false,
      },
      {
        text: 'equality before the law',
        rationale:
          "Correct. Pericles describes a system where 'the laws afford equal justice to all in their private differences' and where merit, not class or wealth, determines advancement — the principle of equality before the law.",
        isCorrect: true,
      },
      {
        text: 'separation of powers',
        rationale:
          'Pericles does not discuss dividing government into separate branches. His speech is about the democratic principle of equal access and merit-based advancement.',
        isCorrect: false,
      },
      {
        text: 'citizen responsibilities',
        rationale:
          "While Pericles mentions serving the state, the main focus is on the system's fairness and equality, not on obligations citizens owe to the government.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 10,
    type: 'text',
    difficulty: 'hard',
    topic: 'Civics & Government',
    contentArea: 'civics',
    passage:
      "This excerpt is from a 1957 speech by President Dwight D. Eisenhower.\n\n1\tFor a few minutes this evening I want to speak to you about the serious situation that has arisen in Little Rock. . . .\n\n2\tIn that city, under the leadership of demagogic extremists, disorderly mobs have deliberately prevented the carrying out of proper orders from a Federal Court. . . .\n\n3\tThis morning the mob again gathered in front of the Central High School of Little Rock, obviously for the purpose of again preventing the carrying out of the Court's order relating to the admission of Negro children to that school.\n\n4\tWhenever normal agencies prove inadequate to the task, and it becomes necessary for the Executive Branch of the Federal Government to use its powers and authority to uphold Federal Courts, the President's responsibility is inescapable.\n\n5\tIn accordance with that responsibility, I have today issued an Executive Order directing the use of troops under Federal authority to aid in the execution of Federal law at Little Rock, Arkansas.",
    question:
      "Based on the excerpt from President Eisenhower's speech, how did the historical circumstances shape his point of view?",
    answerOptions: [
      {
        text: 'Court orders directing presidential action caused him to see the need for military action.',
        rationale:
          "The courts did not direct the president to act. Eisenhower explains that when 'normal agencies prove inadequate,' the president's responsibility becomes 'inescapable' — it was his own assessment.",
        isCorrect: false,
      },
      {
        text: 'Increasing resistance to court decisions made him more willing to assert executive power.',
        rationale:
          "Correct. Eisenhower describes how 'disorderly mobs deliberately prevented' court orders (paragraphs 2-3), and when 'normal agencies prove inadequate' (paragraph 4), he felt compelled to use federal troops — showing that escalating resistance drove his decision.",
        isCorrect: true,
      },
      {
        text: 'Growing northern support for integration caused him to send federal troops into segregated cities.',
        rationale:
          'Eisenhower does not mention public opinion or northern support. His justification centers on upholding federal court orders, not on popular sentiment.',
        isCorrect: false,
      },
      {
        text: 'Rapid responses from southern leaders made him more willing to wait patiently for state officials to protect citizens.',
        rationale:
          'The opposite is described — mobs continued to gather and state authorities did not prevent them, prompting federal intervention rather than patience.',
        isCorrect: false,
      },
    ],
  },
];
