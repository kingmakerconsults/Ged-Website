const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MATH_FILE = path.join(
  ROOT,
  'public',
  'quizzes',
  'math.quizzes.part1.json'
);
const SS_FILE = path.join(
  ROOT,
  'public',
  'quizzes',
  'social-studies.quizzes.part2.json'
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function findTopicById(dataset, topicId) {
  for (const category of Object.values(dataset?.categories || {})) {
    for (const topic of category?.topics || []) {
      if (topic?.id === topicId) return topic;
    }
  }
  return null;
}

function replaceTopicQuestions(filePath, topicId, questions) {
  const data = readJson(filePath);
  const topic = findTopicById(data, topicId);
  if (!topic) throw new Error(`Topic not found: ${topicId}`);
  if (Array.isArray(topic.quizzes) && topic.quizzes.length > 0) {
    topic.quizzes[0].questions = questions;
  } else {
    topic.questions = questions;
  }
  writeJson(filePath, data);
}

function ensureSingleCorrect(questions, topicId) {
  for (const q of questions) {
    if (!Array.isArray(q.answerOptions)) continue;
    const n = q.answerOptions.filter((o) => o && o.isCorrect === true).length;
    if (n !== 1)
      throw new Error(
        `${topicId} question ${q.questionNumber} has ${n} correct answers`
      );
  }
}

const mathAlgebra10 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A phone company offers Plan A: C = 45 + 0.08m and Plan B: C = 25 + 0.12m, where m is monthly minutes over the base allowance. For what value of m do both plans cost the same?',
    answerOptions: [
      {
        text: '250',
        isCorrect: false,
        rationale: 'At 250, Plan A is 65 and Plan B is 55.',
      },
      {
        text: '500',
        isCorrect: true,
        rationale: '45 + 0.08m = 25 + 0.12m gives 20 = 0.04m, so m = 500.',
      },
      {
        text: '625',
        isCorrect: false,
        rationale: 'This comes from dividing incorrectly by 0.032.',
      },
      {
        text: '800',
        isCorrect: false,
        rationale: 'At 800, Plan A and Plan B are not equal.',
      },
    ],
    rationale: 'Set the linear expressions equal and solve for m.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'The system y = 3x - 7 and y = -2x + 13 models supply and demand. What is the intersection point?',
    answerOptions: [
      {
        text: '(4, 5)',
        isCorrect: true,
        rationale: '3x - 7 = -2x + 13 => 5x = 20 => x=4, then y=5.',
      },
      {
        text: '(5, 8)',
        isCorrect: false,
        rationale: 'This does not satisfy both equations.',
      },
      {
        text: '(3, 2)',
        isCorrect: false,
        rationale: 'This satisfies only one equation.',
      },
      {
        text: '(2, -1)',
        isCorrect: false,
        rationale: 'This is not a common solution.',
      },
    ],
    rationale: 'At intersection, both equations have the same x and y values.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 3,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question: 'Solve: 2(3x - 5) - 4 = 5x + 7. Enter x.',
    correctAnswer: '21',
    rationale: 'Expand: 6x - 10 - 4 = 5x + 7 => 6x - 14 = 5x + 7 => x = 21.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A rectangle has perimeter 54 and area 176. What are its side lengths?',
    answerOptions: [
      {
        text: '8 and 22',
        isCorrect: false,
        rationale: '8+22=30, so the perimeter condition is not satisfied.',
      },
      {
        text: '11 and 16',
        isCorrect: true,
        rationale: '11+16=27 and 11×16=176, satisfying both conditions.',
      },
      {
        text: '12 and 15',
        isCorrect: false,
        rationale: 'This gives area 180, not 176.',
      },
      {
        text: '9 and 18',
        isCorrect: false,
        rationale: 'This gives area 162, not 176.',
      },
    ],
    rationale: 'Use sum from perimeter and product from area simultaneously.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    tier: 'challenge',
    question: 'If f(x)=2x²-3x+1, what is f(4)-f(1)?',
    answerOptions: [
      {
        text: '18',
        isCorrect: false,
        rationale: 'This is not equal to f(4)-f(1).',
      },
      {
        text: '21',
        isCorrect: true,
        rationale: 'f(4)=2(16)-12+1=21 and f(1)=2-3+1=0, so difference is 21.',
      },
      {
        text: '24',
        isCorrect: false,
        rationale: 'This ignores -3x term effects.',
      },
      {
        text: '16',
        isCorrect: false,
        rationale: 'This uses only 2x² components.',
      },
    ],
    rationale: 'Compute both function values first, then subtract.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A store discounts an item by 15% and then adds 8% sales tax. The final price is $110.16. What was the original price?',
    answerOptions: [
      {
        text: '$120',
        isCorrect: true,
        rationale:
          'Original × 0.85 × 1.08 = original × 0.918. 110.16/0.918=120.',
      },
      {
        text: '$118',
        isCorrect: false,
        rationale:
          'This does not reverse both percentage operations correctly.',
      },
      {
        text: '$126',
        isCorrect: false,
        rationale: 'This overestimates the pre-discount value.',
      },
      {
        text: '$130',
        isCorrect: false,
        rationale: 'This ignores combined multiplier size.',
      },
    ],
    rationale: 'Reverse multi-step percentage changes with inverse operations.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    tier: 'test-ready',
    question: 'Which inequality has the same solution set as 4 - 3x > 19?',
    answerOptions: [
      {
        text: 'x < -5',
        isCorrect: true,
        rationale:
          'Subtract 4: -3x > 15; divide by -3 and reverse sign: x < -5.',
      },
      {
        text: 'x > -5',
        isCorrect: false,
        rationale: 'Sign reversal was missed when dividing by negative.',
      },
      { text: 'x < 5', isCorrect: false, rationale: 'Sign on 5 is wrong.' },
      {
        text: 'x > 5',
        isCorrect: false,
        rationale: 'Both sign and direction are wrong.',
      },
    ],
    rationale:
      'Dividing inequalities by a negative reverses the comparison symbol.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 8,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question: 'Solve for x: (x - 3)/4 + (x + 1)/6 = 7',
    correctAnswer: '18.2',
    rationale:
      'Multiply by 12: 3(x-3)+2(x+1)=84 => 5x-7=84 => 5x=91 => x=18.2.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A quadratic model for revenue is R(x) = -5x² + 120x - 400 where x is dollars in ticket price. What ticket price gives maximum revenue?',
    answerOptions: [
      {
        text: '$10',
        isCorrect: false,
        rationale: 'This is not the vertex x-value.',
      },
      {
        text: '$12',
        isCorrect: true,
        rationale: 'For ax²+bx+c, vertex is at x=-b/(2a) = -120/(2·-5)=12.',
      },
      {
        text: '$15',
        isCorrect: false,
        rationale: 'This is right of the vertex where revenue has decreased.',
      },
      {
        text: '$20',
        isCorrect: false,
        rationale: 'Far from the maximizing point.',
      },
    ],
    rationale: 'Use vertex formula for a downward-opening parabola.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    tier: 'challenge',
    question: 'If 3^(x+1) = 81, what is x?',
    answerOptions: [
      { text: '2', isCorrect: false, rationale: '3^(2+1)=27, not 81.' },
      { text: '3', isCorrect: true, rationale: '81 = 3^4, so x+1=4 and x=3.' },
      { text: '4', isCorrect: false, rationale: 'This makes 3^(5)=243.' },
      { text: '5', isCorrect: false, rationale: 'This is much too large.' },
    ],
    rationale: 'Rewrite 81 as a power of 3 and equate exponents.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'A car rental charges a fixed fee plus $0.30 per mile. For 120 miles, total cost is $83. What is the fixed fee?',
    answerOptions: [
      {
        text: '$36',
        isCorrect: false,
        rationale: '0.30×120=36 is variable cost only.',
      },
      { text: '$47', isCorrect: true, rationale: 'Fixed fee = 83 - 36 = 47.' },
      {
        text: '$53',
        isCorrect: false,
        rationale: 'This adds instead of subtracting the mileage charge.',
      },
      {
        text: '$25',
        isCorrect: false,
        rationale: 'This underestimates the fixed portion.',
      },
    ],
    rationale: 'Separate variable and fixed components from the linear model.',
    challenge_tags: ['math-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A population model is P(t)=900(1.04)^t. About how many years until the population first exceeds 1200?',
    answerOptions: [
      {
        text: '6 years',
        isCorrect: false,
        rationale: '900(1.04)^6 ≈ 1139, still below 1200.',
      },
      {
        text: '7 years',
        isCorrect: false,
        rationale: '900(1.04)^7 ≈ 1185, still below 1200.',
      },
      {
        text: '8 years',
        isCorrect: true,
        rationale: '900(1.04)^8 ≈ 1232, first year above 1200.',
      },
      {
        text: '9 years',
        isCorrect: false,
        rationale: 'It exceeds by year 8 already, so 9 is not first.',
      },
    ],
    rationale:
      'Evaluate the exponential expression by integer years and find first exceedance.',
    challenge_tags: ['math-3'],
  },
];

const socialColonialEra12 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Source A: Parliament claims authority to tax colonies for imperial defense. Source B: Colonial assemblies claim only elected representatives may levy internal taxes.',
    question:
      'Which principle is the core constitutional conflict reflected by these sources?',
    answerOptions: [
      {
        text: 'Competing claims about political representation and legitimate taxing authority.',
        isCorrect: true,
        rationale:
          'Both sources center on who has lawful authority to tax colonists.',
      },
      {
        text: 'Disagreement over agricultural crop rotation methods.',
        isCorrect: false,
        rationale: 'The conflict is political, not agricultural.',
      },
      {
        text: 'Debate about whether colonies should abolish trial by jury.',
        isCorrect: false,
        rationale: 'Tax authority is the specific issue presented.',
      },
      {
        text: 'Arguments over bilingual ballot design in modern elections.',
        isCorrect: false,
        rationale: 'This is anachronistic and unrelated.',
      },
    ],
    rationale:
      'Synthesis shows a legitimacy dispute over governance structure.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A historian argues that boycotts in the 1760s had political impact beyond economics. Which evidence would best strengthen this argument?',
    answerOptions: [
      {
        text: 'Records linking organized nonimportation campaigns to policy concessions and repeals.',
        isCorrect: true,
        rationale: 'This directly ties economic action to political outcomes.',
      },
      {
        text: 'A list of popular colonial recipes.',
        isCorrect: false,
        rationale: 'Cultural lists do not show political effect.',
      },
      {
        text: 'Average annual rainfall by colony.',
        isCorrect: false,
        rationale: 'Rainfall is unrelated to boycott strategy outcomes.',
      },
      {
        text: 'A biography of one colonial printer only.',
        isCorrect: false,
        rationale: 'Single biography is too indirect for broad causal claim.',
      },
    ],
    rationale: 'Best support includes direct pre/post policy linkage.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Two ports imposed similar customs duties. Port X had stronger merchant committees coordinating resistance; Port Y did not. Smuggled imports and protest participation were far higher in Port X.',
    question: 'Which inference is most defensible?',
    answerOptions: [
      {
        text: 'Organizational capacity likely influenced collective political action.',
        isCorrect: true,
        rationale:
          'Different coordination levels align with different protest outcomes.',
      },
      {
        text: 'Customs duties were irrelevant because both ports had them.',
        isCorrect: false,
        rationale: 'Equal duties do not eliminate other explanatory factors.',
      },
      {
        text: 'Port Y likely had stronger committees than Port X.',
        isCorrect: false,
        rationale: 'The scenario states the opposite.',
      },
      {
        text: 'No inference can be made without knowing ship colors.',
        isCorrect: false,
        rationale: 'Ship colors are irrelevant to causal interpretation.',
      },
    ],
    rationale:
      'Compare matched policy context with differing institutional capacity.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'Why did colonial pamphlets and newspapers play a major role in pre-revolution politics?',
    answerOptions: [
      {
        text: 'They helped spread shared arguments and coordinate action across distant colonies.',
        isCorrect: true,
        rationale: 'Print networks supported common framing and mobilization.',
      },
      {
        text: 'They replaced all local assemblies as legal governments.',
        isCorrect: false,
        rationale: 'Assemblies remained governing institutions.',
      },
      {
        text: 'They were required by Parliament as official tax forms.',
        isCorrect: false,
        rationale: 'Pamphlets were political communication, not tax paperwork.',
      },
      {
        text: 'They ended the need for town meetings entirely.',
        isCorrect: false,
        rationale: 'Local meetings continued to matter.',
      },
    ],
    rationale:
      'Communication infrastructure is a key driver of coordinated politics.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'Which development most directly transformed a tax dispute into a broader sovereignty crisis?',
    answerOptions: [
      {
        text: 'Escalation from specific fiscal objections to competing claims about who held final legislative authority.',
        isCorrect: true,
        rationale:
          'Sovereignty conflict emerges when legitimacy of rule itself is contested.',
      },
      {
        text: 'Introduction of decimal currency in all colonies.',
        isCorrect: false,
        rationale: 'Currency format is not the core constitutional shift.',
      },
      {
        text: 'Creation of mandatory state-funded schools in every colony.',
        isCorrect: false,
        rationale: 'This did not define the sovereignty conflict.',
      },
      {
        text: 'Elimination of all colonial trade with Europe.',
        isCorrect: false,
        rationale: 'Trade persisted and was central to disputes.',
      },
    ],
    rationale:
      'The conflict broadened from policy terms to authority structure.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'A petition emphasizes rights of Englishmen, while a later declaration emphasizes natural rights and consent of the governed.',
    question: 'What does this shift in language most strongly suggest?',
    answerOptions: [
      {
        text: 'Political justification moved from inherited legal tradition toward universal principles.',
        isCorrect: true,
        rationale: 'The language shift reflects widening normative claims.',
      },
      {
        text: 'Colonial leaders rejected all legal argumentation entirely.',
        isCorrect: false,
        rationale: 'Legal arguments remained important, but framing expanded.',
      },
      {
        text: 'Consent of the governed supported unlimited monarchy.',
        isCorrect: false,
        rationale:
          'Consent implies legitimacy through the governed, not absolute monarchy.',
      },
      {
        text: 'Natural-rights ideas were used only for trade tariffs.',
        isCorrect: false,
        rationale:
          'Natural-rights framing addressed governance legitimacy broadly.',
      },
    ],
    rationale: 'Track ideological evolution through textual framing.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A colony imposes embargoes that reduce imports by 30% but local prices rise 12% short-term. Which conclusion is most balanced?',
    answerOptions: [
      {
        text: 'Collective resistance imposed short-run economic costs while increasing political leverage.',
        isCorrect: true,
        rationale:
          'Data indicates both material cost and strategic pressure effects.',
      },
      {
        text: 'Embargoes had no economic consequences at all.',
        isCorrect: false,
        rationale: 'Price increase indicates consequences.',
      },
      {
        text: 'Higher prices prove resistance failed politically.',
        isCorrect: false,
        rationale: 'Political outcomes depend on leverage, not only prices.',
      },
      {
        text: 'Import decline means domestic production stopped.',
        isCorrect: false,
        rationale: 'Import decline does not imply production collapse.',
      },
    ],
    rationale:
      'Evaluate mixed-outcome policies with both economic and political dimensions.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'Which institutional weakness under the Articles of Confederation most motivated calls for constitutional revision?',
    answerOptions: [
      {
        text: 'The national government lacked reliable power to raise revenue and enforce national policy.',
        isCorrect: true,
        rationale:
          'Fiscal and enforcement weaknesses were central reform drivers.',
      },
      {
        text: 'The national government had unrestricted executive veto over states.',
        isCorrect: false,
        rationale: 'No such strong executive existed under the Articles.',
      },
      {
        text: 'States had no legislative authority of their own.',
        isCorrect: false,
        rationale: 'States retained substantial authority.',
      },
      {
        text: 'The Articles required universal suffrage in all states.',
        isCorrect: false,
        rationale: 'Voting qualifications remained state-controlled.',
      },
    ],
    rationale: 'Identify structural governance capacity issues.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'State A had broad western land claims; State B had none. Debate over cession terms shaped ratification timing of national arrangements.',
    question: 'What broader principle does this conflict illustrate?',
    answerOptions: [
      {
        text: 'Uneven resource endowments can create bargaining asymmetries in federal negotiations.',
        isCorrect: true,
        rationale: 'Differential claims affected leverage and timing.',
      },
      {
        text: 'All states had identical strategic interests in every negotiation.',
        isCorrect: false,
        rationale: 'The scenario highlights divergent interests.',
      },
      {
        text: 'Land claims were irrelevant to federal legitimacy debates.',
        isCorrect: false,
        rationale: 'They directly affected ratification politics.',
      },
      {
        text: 'Ratification depended solely on weather events.',
        isCorrect: false,
        rationale: 'This is unrelated and unsupported.',
      },
    ],
    rationale:
      'Connect specific dispute to general bargaining theory in federal design.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'Which evidence would best test a claim that revolutionary rhetoric expanded political participation over time?',
    answerOptions: [
      {
        text: 'Longitudinal records of petitioning, meeting attendance, and enfranchisement changes across social groups.',
        isCorrect: true,
        rationale:
          'These metrics directly track participation change over time.',
      },
      {
        text: 'A map of colonial river systems.',
        isCorrect: false,
        rationale: 'Geography alone does not test participation expansion.',
      },
      {
        text: 'Uniform prices of imported tea for one month.',
        isCorrect: false,
        rationale: 'Single price snapshot is insufficient and indirect.',
      },
      {
        text: 'One speech excerpt without any comparative data.',
        isCorrect: false,
        rationale: 'A single document cannot establish trend breadth.',
      },
    ],
    rationale:
      'Trend claims require time-series and group-comparative evidence.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'The phrase "consent of the governed" most directly limits which government practice?',
    answerOptions: [
      {
        text: 'Rule without accountability to the people subject to the laws.',
        isCorrect: true,
        rationale:
          'Consent requires legitimacy through representation or participation.',
      },
      {
        text: 'Any form of local self-government.',
        isCorrect: false,
        rationale: 'Consent supports accountable self-government.',
      },
      {
        text: 'All written constitutions.',
        isCorrect: false,
        rationale:
          'Constitutions can institutionalize consent-based governance.',
      },
      {
        text: 'Judicial interpretation of laws.',
        isCorrect: false,
        rationale:
          'Judicial review can coexist with consent-based constitutional order.',
      },
    ],
    rationale: 'Tie core political principle to institutional constraints.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Source A highlights local grievances; Source B highlights trans-colonial congresses and coordinated declarations.',
    question: 'What interpretation best reconciles these sources?',
    answerOptions: [
      {
        text: 'Local disputes and intercolonial coordination interacted to scale resistance from regional to continental politics.',
        isCorrect: true,
        rationale: 'The sources describe connected levels of mobilization.',
      },
      {
        text: 'Only local grievances mattered; continental coordination was irrelevant.',
        isCorrect: false,
        rationale: 'Source B directly emphasizes coordination.',
      },
      {
        text: 'Coordination replaced all local political institutions immediately.',
        isCorrect: false,
        rationale: 'Local institutions remained active.',
      },
      {
        text: 'Continental declarations were unrelated to legitimacy claims.',
        isCorrect: false,
        rationale: 'Declarations articulated legitimacy arguments explicitly.',
      },
    ],
    rationale:
      'Synthesis integrates local and supra-local mechanisms of change.',
    challenge_tags: ['social-3'],
  },
];

function main() {
  ensureSingleCorrect(mathAlgebra10, 'math_algebra_10');
  ensureSingleCorrect(socialColonialEra12, 'ss_colonial_era_12');
  replaceTopicQuestions(MATH_FILE, 'math_algebra_10', mathAlgebra10);
  replaceTopicQuestions(SS_FILE, 'ss_colonial_era_12', socialColonialEra12);
  console.log('Rewrote question sets:');
  console.log('- public/quizzes/math.quizzes.part1.json :: math_algebra_10');
  console.log(
    '- public/quizzes/social-studies.quizzes.part2.json :: ss_colonial_era_12'
  );
}

main();
