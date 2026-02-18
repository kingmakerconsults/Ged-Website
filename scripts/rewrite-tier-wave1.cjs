const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MATH_FILE = path.join(
  ROOT,
  'public',
  'quizzes',
  'math.quizzes.part2.json'
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
  const categories = dataset?.categories || {};
  for (const category of Object.values(categories)) {
    const topics = Array.isArray(category?.topics) ? category.topics : [];
    for (const topic of topics) {
      if (topic?.id === topicId) return topic;
    }
  }
  return null;
}

const rewrittenMathGeometry11 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      "A triangular park has vertices at (1, 2), (7, 2), and (7, 10) on a coordinate grid where 1 unit = 20 meters. What is the park's area in square meters?",
    answerOptions: [
      {
        text: '9600',
        isCorrect: true,
        rationale:
          'Base = 6 units and height = 8 units, so area = 1/2(6)(8)=24 square units. Each square unit is 20×20=400 m², so 24×400=9600 m².',
      },
      {
        text: '4800',
        isCorrect: false,
        rationale: 'This forgets to convert square units to square meters.',
      },
      {
        text: '5600',
        isCorrect: false,
        rationale: 'This uses an incorrect base-height product.',
      },
      {
        text: '19200',
        isCorrect: false,
        rationale: 'This doubles the triangle area incorrectly.',
      },
    ],
    rationale:
      'Find area in coordinate units first, then apply unit conversion: 24 square units × 400 m²/unit² = 9600 m².',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A cylindrical water tank has radius 1.8 m and height 4.5 m. It is filled to 70% of capacity. About how many cubic meters of water are in the tank? Use 3.14 for π.',
    answerOptions: [
      {
        text: '32.0',
        isCorrect: true,
        rationale:
          'Volume = πr²h = 3.14(1.8²)(4.5)=45.79 m³. 70% of that is about 32.05 m³.',
      },
      {
        text: '45.8',
        isCorrect: false,
        rationale: 'This is full capacity, not 70%.',
      },
      {
        text: '22.9',
        isCorrect: false,
        rationale: 'This is about 50% of full capacity, not 70%.',
      },
      {
        text: '64.1',
        isCorrect: false,
        rationale: 'This incorrectly scales up instead of taking 70%.',
      },
    ],
    rationale: 'Compute full volume first and then multiply by 0.70.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A right triangle has hypotenuse 26 and one leg 10. The triangle is enlarged by scale factor 1.5. What is the perimeter of the enlarged triangle?',
    answerOptions: [
      {
        text: '90',
        isCorrect: true,
        rationale:
          'Missing leg is 24 by Pythagorean theorem. Original perimeter is 10+24+26=60, enlarged perimeter is 60(1.5)=90.',
      },
      {
        text: '78',
        isCorrect: false,
        rationale: 'This scales only the hypotenuse and one leg incorrectly.',
      },
      {
        text: '86',
        isCorrect: false,
        rationale: 'This uses a wrong third side from Pythagorean theorem.',
      },
      {
        text: '120',
        isCorrect: false,
        rationale: 'This doubles instead of scaling by 1.5.',
      },
    ],
    rationale:
      'Find the third side, compute original perimeter, then apply the scale factor.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A cone and a cylinder have the same radius of 4 cm and same height of 9 cm. What is the difference in their volumes? Use 3.14 for π.',
    answerOptions: [
      {
        text: '301.44 cm³',
        isCorrect: true,
        rationale:
          'Cylinder: πr²h = 452.16. Cone: 1/3 of cylinder = 150.72. Difference = 301.44 cm³.',
      },
      {
        text: '150.72 cm³',
        isCorrect: false,
        rationale: 'This is the cone volume only.',
      },
      {
        text: '452.16 cm³',
        isCorrect: false,
        rationale: 'This is the cylinder volume only.',
      },
      {
        text: '602.88 cm³',
        isCorrect: false,
        rationale: 'This doubles the correct difference.',
      },
    ],
    rationale:
      'Use the relationship V_cone = (1/3)V_cylinder for same radius and height.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 5,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A circle sector has a central angle of 135° and radius 12 cm. What is the sector area? Round to the nearest tenth. Use 3.14 for π.',
    correctAnswer: '169.6',
    rationale:
      'Sector area = (135/360)πr² = (3/8)(3.14)(144) = 169.56, which rounds to 169.6.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      "Rectangle A has dimensions 8 by 15. Rectangle B is similar to A and has perimeter 69. What is Rectangle B's area?",
    answerOptions: [
      {
        text: '270',
        isCorrect: true,
        rationale:
          'Perimeter scale: 69/46 = 1.5. New dimensions: 12 and 22.5, area = 270.',
      },
      {
        text: '180',
        isCorrect: false,
        rationale: 'This is the area of rectangle A, not B.',
      },
      {
        text: '360',
        isCorrect: false,
        rationale: 'This over-scales area with an incorrect factor.',
      },
      {
        text: '225',
        isCorrect: false,
        rationale: 'This uses one scaled side with one original side.',
      },
    ],
    rationale:
      'Find scale factor from perimeter, then apply it to both dimensions before computing area.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A rectangular prism has dimensions 5 m by 8 m by 12 m. A cube has the same volume. About how long is one side of the cube?',
    answerOptions: [
      {
        text: '7.8 m',
        isCorrect: true,
        rationale: 'Volume is 480 m³. Cube side is ∛480 ≈ 7.83.',
      },
      { text: '6.0 m', isCorrect: false, rationale: '6³ = 216, too small.' },
      {
        text: '8.0 m',
        isCorrect: false,
        rationale: '8³ = 512, slightly too large.',
      },
      {
        text: '10.0 m',
        isCorrect: false,
        rationale: '10³ = 1000, far too large.',
      },
    ],
    rationale: 'Match volumes and use the cube root to estimate side length.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A company prints circular labels with diameter 6 cm from rectangular sheets measuring 30 cm by 42 cm. If labels are arranged in a grid with no overlap, how many full labels fit on one sheet?',
    answerOptions: [
      {
        text: '35',
        isCorrect: true,
        rationale:
          'Across: 30/6 = 5 labels. Down: 42/6 = 7 labels. Total = 5×7 = 35.',
      },
      {
        text: '33',
        isCorrect: false,
        rationale: 'This miscounts one full row or column.',
      },
      {
        text: '42',
        isCorrect: false,
        rationale: 'This treats radius as spacing instead of diameter.',
      },
      {
        text: '49',
        isCorrect: false,
        rationale: 'This assumes 7×7, but only 5 fit across.',
      },
    ],
    rationale:
      'Use diameter as both horizontal and vertical spacing in a grid model.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 9,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A right circular cylinder has volume 628 cm³ and radius 5 cm. What is its height? Use 3.14 for π.',
    correctAnswer: '8',
    rationale: 'V = πr²h → 628 = 3.14(25)h = 78.5h, so h = 8.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A ramp rises 1.2 m over a horizontal distance of 7.5 m. Building code requires slope no greater than 1:12 (rise:run). Does this ramp meet code?',
    answerOptions: [
      {
        text: 'No, because 1.2:7.5 simplifies to 1:6.25, which is steeper than 1:12.',
        isCorrect: true,
        rationale: 'A smaller run per 1 rise means steeper slope.',
      },
      {
        text: 'Yes, because 7.5 is greater than 1.2.',
        isCorrect: false,
        rationale: 'You must compare ratio, not just which number is larger.',
      },
      {
        text: 'Yes, because 1.2/7.5 is less than 1.',
        isCorrect: false,
        rationale: 'Code threshold is 1/12, not 1.',
      },
      {
        text: 'No, because 1:12 means the ramp must be vertical.',
        isCorrect: false,
        rationale: '1:12 describes a shallow incline, not vertical.',
      },
    ],
    rationale:
      'Compare rise/run = 1.2/7.5 = 0.16 to 1/12 ≈ 0.083. Since 0.16 is larger, the ramp is too steep.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'Two triangles are similar. In Triangle A, corresponding sides are 6, 8, and 10. In Triangle B, the side corresponding to 6 is 15. What is the side corresponding to 10 in Triangle B?',
    answerOptions: [
      {
        text: '25',
        isCorrect: true,
        rationale: 'Scale factor is 15/6 = 2.5. Then 10×2.5 = 25.',
      },
      {
        text: '19',
        isCorrect: false,
        rationale: 'This applies a non-proportional increase.',
      },
      {
        text: '21',
        isCorrect: false,
        rationale: 'This misapplies cross-multiplication.',
      },
      {
        text: '16',
        isCorrect: false,
        rationale: 'This uses the wrong scale factor direction.',
      },
    ],
    rationale:
      'Use the same scale factor for all corresponding sides in similar triangles.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A square courtyard has side length 18 m. A path of uniform width x is built inside all four edges, leaving a central square of area 196 m². What is x?',
    answerOptions: [
      {
        text: '2 m',
        isCorrect: true,
        rationale: 'Inner side is √196 = 14, so 18 - 2x = 14 → x = 2.',
      },
      {
        text: '1 m',
        isCorrect: false,
        rationale: 'This gives inner side 16 and area 256.',
      },
      {
        text: '3 m',
        isCorrect: false,
        rationale: 'This gives inner side 12 and area 144.',
      },
      {
        text: '4 m',
        isCorrect: false,
        rationale: 'This gives inner side 10 and area 100.',
      },
    ],
    rationale:
      'Translate area condition to side length condition before solving for path width.',
    challenge_tags: ['math-5'],
  },
];

const rewrittenSocialCivilRights14 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Source A (1963): "We can no longer wait for rights already promised under law."\nSource B (1964): Congress passes a law banning discrimination in public accommodations and employment.',
    question: 'Which claim is best supported by both sources together?',
    answerOptions: [
      {
        text: 'Grassroots pressure helped accelerate federal civil-rights action.',
        isCorrect: true,
        rationale:
          'Source A shows urgency from activists; Source B shows subsequent federal legislation.',
      },
      {
        text: 'Civil-rights goals were fully achieved before 1963.',
        isCorrect: false,
        rationale: 'Source A explicitly argues change was still needed.',
      },
      {
        text: 'Federal policy shifted away from rights protections in 1964.',
        isCorrect: false,
        rationale: 'Source B indicates expanded protections.',
      },
      {
        text: 'Public accommodations were not addressed by federal law.',
        isCorrect: false,
        rationale: 'Source B states they were addressed.',
      },
    ],
    rationale:
      'Synthesis across sources shows activism and federal policy change as connected developments.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Voting rights in some counties rose from 8% to 58% within several years after federal oversight and literacy-test restrictions were enforced.',
    question: 'Which conclusion is most strongly supported by this evidence?',
    answerOptions: [
      {
        text: 'Federal enforcement reduced barriers that had suppressed voter participation.',
        isCorrect: true,
        rationale:
          'The large increase after oversight suggests prior barriers were limiting participation.',
      },
      {
        text: 'Local barriers had no measurable impact on voting access.',
        isCorrect: false,
        rationale: 'The change suggests barriers had major impact.',
      },
      {
        text: 'Participation increased only because population doubled.',
        isCorrect: false,
        rationale: 'No evidence about population change is provided.',
      },
      {
        text: 'Voting restrictions became stricter after reform.',
        isCorrect: false,
        rationale:
          'The data trend indicates improved access, not stricter barriers.',
      },
    ],
    rationale: 'Use before-after quantitative evidence to infer policy impact.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A historian argues that court rulings alone did not end school segregation quickly. Which additional evidence would most strengthen this argument?',
    answerOptions: [
      {
        text: 'Records showing prolonged noncompliance and delayed local implementation after the ruling.',
        isCorrect: true,
        rationale:
          'Noncompliance would directly support the claim that rulings alone were insufficient.',
      },
      {
        text: 'A timeline of the original court case filing date.',
        isCorrect: false,
        rationale: 'Filing dates do not show implementation outcomes.',
      },
      {
        text: 'A biography of one Supreme Court justice.',
        isCorrect: false,
        rationale:
          'Biographical detail is indirect and less relevant to enforcement.',
      },
      {
        text: 'An opinion poll about school lunch preferences.',
        isCorrect: false,
        rationale: 'Irrelevant to segregation policy implementation.',
      },
    ],
    rationale:
      'Best evidence directly tests whether legal decisions translated into practice.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    passage:
      'A labor leader organized farm workers through strikes and consumer boycotts to pressure growers for contracts on wages, safety, and working conditions.',
    question: 'Which strategy is illustrated in the passage?',
    answerOptions: [
      {
        text: 'Using coordinated economic pressure to achieve policy and workplace change.',
        isCorrect: true,
        rationale: 'Strikes and boycotts are forms of economic pressure.',
      },
      {
        text: 'Relying exclusively on military intervention.',
        isCorrect: false,
        rationale: 'No military strategy is described.',
      },
      {
        text: 'Avoiding public participation to reduce attention.',
        isCorrect: false,
        rationale: 'Boycotts and strikes require broad participation.',
      },
      {
        text: 'Replacing elections with direct rule by unions.',
        isCorrect: false,
        rationale:
          'The passage is about labor organizing tactics, not abolishing elections.',
      },
    ],
    rationale: 'Classify the tactic based on methods in the passage.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'Which scenario best demonstrates the constitutional principle of equal protection in action?',
    answerOptions: [
      {
        text: 'A court invalidates a state policy that imposes harsher penalties on one racial group for the same offense.',
        isCorrect: true,
        rationale: 'Equal protection addresses unequal treatment under law.',
      },
      {
        text: 'Congress extends a highway budget by one fiscal year.',
        isCorrect: false,
        rationale: 'Budget timing is not a direct equal-protection issue.',
      },
      {
        text: 'A governor reduces state park entry fees for all residents.',
        isCorrect: false,
        rationale:
          'Uniform fee changes are not discrimination-focused adjudication.',
      },
      {
        text: 'A city repaves roads after winter storms.',
        isCorrect: false,
        rationale:
          'Public works decisions are unrelated to equal-protection review.',
      },
    ],
    rationale:
      'Equal protection is most directly applied when courts address unequal legal treatment.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'A policy analyst compares two reforms: (1) banning literacy tests and (2) requiring federal review before election rule changes in selected jurisdictions.',
    question: 'What is the strongest reason these reforms were paired?',
    answerOptions: [
      {
        text: 'One removed an existing barrier while the other aimed to prevent new barriers from replacing it.',
        isCorrect: true,
        rationale:
          'The pair addresses both present and future suppression mechanisms.',
      },
      {
        text: 'Both reforms focused only on campaign finance limits.',
        isCorrect: false,
        rationale: 'Neither reform is about campaign finance.',
      },
      {
        text: 'They transferred all election authority to the Supreme Court.',
        isCorrect: false,
        rationale: 'Election administration remained multi-level.',
      },
      {
        text: 'They ended the need for voter registration.',
        isCorrect: false,
        rationale: 'Registration systems remained in place.',
      },
    ],
    rationale:
      'Analyze policy design as immediate removal plus forward-looking protection.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      "A state university receives federal funding and sets different athletic resource standards for men's and women's programs without a clear justification. Which legal framework is most relevant to challenge this policy?",
    answerOptions: [
      {
        text: 'Title IX of the Education Amendments.',
        isCorrect: true,
        rationale:
          'Title IX bars sex-based discrimination in federally funded education programs.',
      },
      {
        text: 'The Sherman Antitrust Act.',
        isCorrect: false,
        rationale:
          'Antitrust law governs market competition, not sex discrimination in education.',
      },
      {
        text: 'The Federal Reserve Act.',
        isCorrect: false,
        rationale: 'This law concerns monetary policy.',
      },
      {
        text: 'The Social Security Act.',
        isCorrect: false,
        rationale: 'This law concerns social insurance programs.',
      },
    ],
    rationale:
      'Identify the statute aligned to sex-equity obligations in education.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    passage:
      'During the Cold War, U.S. policymakers often framed foreign conflicts through the goal of containing Soviet influence.',
    question:
      'How did this framework most likely shape civil-rights messaging abroad?',
    answerOptions: [
      {
        text: 'Leaders had incentives to present progress on rights as evidence of democratic legitimacy.',
        isCorrect: true,
        rationale:
          'Global ideological competition encouraged showcasing democratic reform.',
      },
      {
        text: 'It removed all attention from domestic policy debates.',
        isCorrect: false,
        rationale: 'Domestic debates continued and were often highly visible.',
      },
      {
        text: 'It required states to adopt identical school laws immediately.',
        isCorrect: false,
        rationale:
          'No such uniform immediate requirement followed from Cold War framing.',
      },
      {
        text: 'It eliminated federal court involvement in rights cases.',
        isCorrect: false,
        rationale: 'Federal courts remained central in rights litigation.',
      },
    ],
    rationale:
      'Connect foreign-policy image concerns with domestic reform narratives.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'Which statement best distinguishes de jure from de facto inequality in historical analysis?',
    answerOptions: [
      {
        text: 'De jure inequality is written into law; de facto inequality persists through practice even when law changes.',
        isCorrect: true,
        rationale:
          'This accurately contrasts legal status with on-the-ground outcomes.',
      },
      {
        text: 'De jure inequality is always temporary, while de facto is always permanent.',
        isCorrect: false,
        rationale: 'Duration varies in both cases.',
      },
      {
        text: 'De jure inequality applies only to voting, while de facto applies only to housing.',
        isCorrect: false,
        rationale: 'Both concepts can apply across many policy areas.',
      },
      {
        text: 'De jure and de facto are interchangeable in constitutional law.',
        isCorrect: false,
        rationale: 'They are distinct analytical categories.',
      },
    ],
    rationale: 'Use precise definitions to evaluate post-reform outcomes.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'County A adopted reforms and saw voting participation rise from 40% to 64%. County B made no reforms and rose from 41% to 45% over the same period.',
    question: 'Which inference is most defensible based on this comparison?',
    answerOptions: [
      {
        text: 'Reforms are associated with a much larger participation increase than observed in the comparison county.',
        isCorrect: true,
        rationale: 'County A rose 24 points versus 4 points in County B.',
      },
      {
        text: 'Both counties had identical participation growth trends.',
        isCorrect: false,
        rationale: 'The changes are not equal.',
      },
      {
        text: 'County B likely had stronger reform enforcement than County A.',
        isCorrect: false,
        rationale: 'The data suggests the opposite.',
      },
      {
        text: 'No inference can be made because both started near 40%.',
        isCorrect: false,
        rationale:
          'Starting similarity strengthens comparative interpretation.',
      },
    ],
    rationale:
      'Use comparative change, not just baseline values, to infer association.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'A policy brief says a reform had "uneven implementation across states." Which additional evidence would best clarify that claim?',
    answerOptions: [
      {
        text: 'State-by-state compliance timelines and enforcement actions over time.',
        isCorrect: true,
        rationale:
          'Implementation differences are best shown by comparative timelines and enforcement records.',
      },
      {
        text: 'A dictionary definition of implementation.',
        isCorrect: false,
        rationale: 'Definitions do not measure variation across states.',
      },
      {
        text: 'A map showing average yearly temperatures by state.',
        isCorrect: false,
        rationale: 'Temperature is unrelated to policy implementation.',
      },
      {
        text: 'A list of all state capitals in alphabetical order.',
        isCorrect: false,
        rationale: 'Geographic facts do not show implementation variation.',
      },
    ],
    rationale:
      'Operational evidence should directly measure adoption and enforcement differences.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Source A emphasizes courtroom strategy; Source B emphasizes mass protest, boycotts, and local organizing.',
    question: 'Which interpretation best reconciles the two sources?',
    answerOptions: [
      {
        text: 'Major civil-rights gains often required interaction between legal strategy and sustained public mobilization.',
        isCorrect: true,
        rationale:
          'The sources highlight complementary, not mutually exclusive, mechanisms.',
      },
      {
        text: 'Only mass protest mattered; legal strategy was irrelevant.',
        isCorrect: false,
        rationale: 'Source A directly contradicts this claim.',
      },
      {
        text: 'Only courts mattered; organizing had no policy effect.',
        isCorrect: false,
        rationale: 'Source B directly contradicts this claim.',
      },
      {
        text: 'Civil-rights change occurred independently of institutions and movements.',
        isCorrect: false,
        rationale: 'Both sources identify concrete channels of change.',
      },
    ],
    rationale:
      'Best reconciliation integrates multiple causal pathways instead of choosing one exclusively.',
    challenge_tags: ['social-3'],
  },
];

function replaceTopicQuestions(filePath, topicId, questions) {
  const data = readJson(filePath);
  const topic = findTopicById(data, topicId);
  if (!topic) {
    throw new Error(`Topic not found: ${topicId} in ${filePath}`);
  }

  const primaryQuiz =
    Array.isArray(topic.quizzes) && topic.quizzes.length > 0
      ? topic.quizzes[0]
      : null;

  if (primaryQuiz) {
    primaryQuiz.questions = questions;
  } else {
    topic.questions = questions;
  }

  writeJson(filePath, data);
}

function main() {
  replaceTopicQuestions(MATH_FILE, 'math_geometry_11', rewrittenMathGeometry11);
  replaceTopicQuestions(
    SS_FILE,
    'ss_civil_rights_14',
    rewrittenSocialCivilRights14
  );

  console.log('Rewrote question sets:');
  console.log('- public/quizzes/math.quizzes.part2.json :: math_geometry_11');
  console.log(
    '- public/quizzes/social-studies.quizzes.part2.json :: ss_civil_rights_14'
  );
}

main();
