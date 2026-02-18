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

const mathGeometry12 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      "A rectangular prism has dimensions 9 cm, 14 cm, and 20 cm. A uniform coating 0.5 cm thick is added to every outside face. What is the coated prism's total volume increase (in cm³)?",
    answerOptions: [
      {
        text: '524',
        isCorrect: false,
        rationale:
          'This comes from an incorrect volume-difference calculation.',
      },
      {
        text: '630',
        isCorrect: true,
        rationale:
          'Each dimension increases by 1 cm. New volume 10×15×21 = 3150. Original volume 9×14×20 = 2520. Increase = 630.',
      },
      {
        text: '3150',
        isCorrect: false,
        rationale: 'This is the new total volume, not the increase.',
      },
      {
        text: '2520',
        isCorrect: false,
        rationale: 'This is the original volume.',
      },
    ],
    rationale:
      'Adding 0.5 cm to both sides of each dimension increases each dimension by 1 cm total.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 2,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A right circular cone has radius 6 m and volume 226.08 m³. What is its height? Use 3.14 for π.',
    correctAnswer: '6',
    rationale:
      'V = (1/3)πr²h = (1/3)(3.14)(36)h = 37.68h. So h = 226.08 / 37.68 = 6.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A city map uses a scale of 1 cm : 0.8 km. Two parks are 7.5 cm apart on the map. A new bike path is planned that is 20% longer than the real straight-line distance. About how long will the bike path be?',
    answerOptions: [
      {
        text: '7.2 km',
        isCorrect: true,
        rationale: 'Real distance = 7.5×0.8=6 km. Path = 1.2×6 = 7.2 km.',
      },
      {
        text: '6.0 km',
        isCorrect: false,
        rationale:
          'This is the straight-line distance before the 20% increase.',
      },
      {
        text: '9.0 km',
        isCorrect: false,
        rationale:
          'This multiplies map distance by 1.2 before scaling incorrectly.',
      },
      {
        text: '5.0 km',
        isCorrect: false,
        rationale: 'This uses an incorrect map conversion.',
      },
    ],
    rationale:
      'Convert map to real distance first, then apply percent increase.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A ladder reaches a point 24 ft up a wall when its base is 7 ft from the wall. The base is moved so it is 15 ft from the wall, with ladder length unchanged. How high up the wall does it now reach?',
    answerOptions: [
      {
        text: '20 ft',
        isCorrect: true,
        rationale:
          'Ladder length is √(24²+7²)=25. New height = √(25²−15²)=√400=20.',
      },
      {
        text: '18 ft',
        isCorrect: false,
        rationale:
          'This uses an arithmetic difference instead of Pythagorean relation.',
      },
      {
        text: '22 ft',
        isCorrect: false,
        rationale: 'This does not satisfy the fixed-length condition.',
      },
      {
        text: '16 ft',
        isCorrect: false,
        rationale: 'This underestimates the resulting height.',
      },
    ],
    rationale: 'Use Pythagorean theorem twice with constant hypotenuse.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      "A company packs spherical ornaments in cylindrical cans. Each ornament has diameter 8 cm. A can has radius 4 cm and height 8 cm. What percent of the can's volume is occupied by one ornament? Use 3.14 for π.",
    answerOptions: [
      {
        text: '66.7%',
        isCorrect: true,
        rationale:
          'Sphere volume = 4/3πr³ = 4/3π(64). Cylinder = πr²h = π(16)(8). Ratio = (256/3)/(128)=2/3=66.7%.',
      },
      {
        text: '50.0%',
        isCorrect: false,
        rationale: 'This underestimates the sphere volume fraction.',
      },
      {
        text: '75.0%',
        isCorrect: false,
        rationale: 'This overestimates the sphere volume fraction.',
      },
      {
        text: '83.3%',
        isCorrect: false,
        rationale: 'This confuses constants in sphere/cylinder formulas.',
      },
    ],
    rationale: 'Use the exact formula ratio before converting to a percentage.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 6,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A circular track has radius 35 m. A runner completes 18 laps. About how many meters does the runner travel? Round to the nearest whole meter. Use 3.14 for π.',
    correctAnswer: '3956',
    rationale:
      'One lap = 2πr = 2(3.14)(35)=219.8 m. For 18 laps: 219.8×18=3956.4 ≈ 3956.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A rectangular lot is 48 m by 30 m. Local code requires a constant-width buffer strip around the inside edge, leaving a central rectangle of area 1008 m². What is the buffer width?',
    answerOptions: [
      {
        text: '3 m',
        isCorrect: true,
        rationale: '(48−2x)(30−2x)=1008 gives (42)(24)=1008 when x=3.',
      },
      {
        text: '2 m',
        isCorrect: false,
        rationale: 'This gives area 1144, too large.',
      },
      {
        text: '4 m',
        isCorrect: false,
        rationale: 'This gives area 880, too small.',
      },
      {
        text: '6 m',
        isCorrect: false,
        rationale: 'This overly shrinks the interior region.',
      },
    ],
    rationale: 'Translate geometry condition into a quadratic area equation.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A right triangle has side lengths in the ratio 5:12:13. If the shortest side is 20, what is the area of the triangle?',
    answerOptions: [
      {
        text: '960',
        isCorrect: false,
        rationale: 'This doubles the correct area.',
      },
      {
        text: '480',
        isCorrect: true,
        rationale: 'Sides scale to 20, 48, 52. Area = 1/2(20)(48)=480.',
      },
      {
        text: '520',
        isCorrect: false,
        rationale: 'This confuses area with hypotenuse-related arithmetic.',
      },
      {
        text: '240',
        isCorrect: false,
        rationale: 'This is half of the correct area due to extra division.',
      },
    ],
    rationale: 'Use proportional scaling and area formula for right triangles.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A water tower is modeled as a cylinder of height 18 m topped by a hemisphere of radius 6 m. What is the total volume of water it can hold? Use 3.14 for π.',
    answerOptions: [
      {
        text: '2444.8 m³',
        isCorrect: false,
        rationale: 'This does not match the sum of the component volumes.',
      },
      {
        text: '2486.88 m³',
        isCorrect: true,
        rationale:
          'Add cylinder and hemisphere volumes: 2034.72 + 452.16 = 2486.88.',
      },
      {
        text: '2034.72 m³',
        isCorrect: false,
        rationale: 'This includes cylinder only, omitting hemisphere.',
      },
      {
        text: '452.16 m³',
        isCorrect: false,
        rationale: 'This includes hemisphere only.',
      },
    ],
    rationale: 'Break composite solid into standard parts and sum volumes.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 10,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      "A model car uses a scale of 1:24. If the model's length is 19.5 cm, what is the actual car length in meters?",
    correctAnswer: '4.68',
    rationale: 'Actual length = 19.5×24 = 468 cm = 4.68 m.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: false,
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      "A line segment from (−3, 4) to (5, −2) is translated right 2 and down 5. What is the segment's new length?",
    answerOptions: [
      {
        text: '10',
        isCorrect: true,
        rationale:
          'Translations preserve distance. Original distance is √[(8)²+(−6)²]=√100=10.',
      },
      {
        text: '8',
        isCorrect: false,
        rationale: 'This uses only horizontal change.',
      },
      {
        text: '6',
        isCorrect: false,
        rationale: 'This uses only vertical change.',
      },
      {
        text: '12',
        isCorrect: false,
        rationale:
          'This adds coordinate changes instead of Euclidean distance.',
      },
    ],
    rationale: 'Rigid transformations preserve length.',
    challenge_tags: ['math-5'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A sector with radius 15 cm has area 176.625 cm². What is its central angle in degrees? Use 3.14 for π.',
    answerOptions: [
      {
        text: '90°',
        isCorrect: true,
        rationale:
          'Full circle area is 3.14×225=706.5. Sector fraction is 176.625/706.5=0.25, so angle is 0.25×360=90°.',
      },
      {
        text: '60°',
        isCorrect: false,
        rationale:
          'This corresponds to one-sixth of circle area, not one-fourth.',
      },
      {
        text: '120°',
        isCorrect: false,
        rationale: 'This corresponds to one-third of the full area.',
      },
      {
        text: '45°',
        isCorrect: false,
        rationale: 'This corresponds to one-eighth of the full area.',
      },
    ],
    rationale:
      'Convert sector area to fraction of full circle, then to degrees.',
    challenge_tags: ['math-5'],
  },
];

const socialCivicsElections17 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'County X adopted same-day registration in 2022. Voter turnout moved from 54% (2020) to 63% (2024). Neighboring County Y, with no policy change, moved from 55% to 57%.',
    question: 'Which inference is best supported by the comparison?',
    answerOptions: [
      {
        text: 'The policy change is associated with a larger turnout increase than in the comparison county.',
        isCorrect: true,
        rationale: 'County X gained 9 points versus 2 points in County Y.',
      },
      {
        text: 'County Y likely had stronger turnout reforms than County X.',
        isCorrect: false,
        rationale: 'The data trend suggests the opposite.',
      },
      {
        text: 'The policy must guarantee turnout above 70%.',
        isCorrect: false,
        rationale: 'No guarantee is shown.',
      },
      {
        text: 'County X had lower turnout in 2024 than County Y.',
        isCorrect: false,
        rationale: 'County X is higher at 63%.',
      },
    ],
    rationale: 'Compare change over time, not just baseline values.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A state law reduces polling places in one region while keeping voting-age population constant. Which evidence would most directly test whether this change disproportionately affects access?',
    answerOptions: [
      {
        text: 'Average travel time and wait-time changes by precinct before and after the law.',
        isCorrect: true,
        rationale: 'These measures directly capture access burden changes.',
      },
      {
        text: 'A list of campaign slogans used that year.',
        isCorrect: false,
        rationale: 'Slogans do not measure access.',
      },
      {
        text: 'The number of state parks opened in the same period.',
        isCorrect: false,
        rationale: 'Irrelevant to voting access.',
      },
      {
        text: 'A biography of the secretary of state.',
        isCorrect: false,
        rationale: 'Biography is indirect and non-quantitative.',
      },
    ],
    rationale: 'Use operational metrics tied to practical access outcomes.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Source A: "Strict ID rules protect election integrity." Source B: "When acceptable IDs are limited, participation drops among groups less likely to hold those IDs."',
    question:
      'Which policy design most directly addresses both concerns raised by the sources?',
    answerOptions: [
      {
        text: 'Maintain ID verification while expanding accepted IDs and free, accessible ID issuance.',
        isCorrect: true,
        rationale: 'This preserves verification while reducing exclusion risk.',
      },
      {
        text: 'Remove all voter verification procedures.',
        isCorrect: false,
        rationale:
          'This addresses access concern but ignores integrity concern.',
      },
      {
        text: 'Accept only one state-issued photo ID with no alternatives.',
        isCorrect: false,
        rationale: 'This worsens Source B concern.',
      },
      {
        text: 'Move all voting to weekday-only in-person sites.',
        isCorrect: false,
        rationale: 'This introduces additional access barriers.',
      },
    ],
    rationale: 'Best reconciliation balances integrity with equitable access.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'Which statement best explains why the Constitution delegates election administration largely to states while still allowing federal oversight?',
    answerOptions: [
      {
        text: 'Federalism permits state administration, while constitutional protections allow federal intervention against rights violations.',
        isCorrect: true,
        rationale: 'This captures shared authority and rights constraints.',
      },
      {
        text: 'States have exclusive power and federal courts cannot review election law.',
        isCorrect: false,
        rationale: 'Federal courts can review constitutional claims.',
      },
      {
        text: 'Congress may not pass any election-related statutes.',
        isCorrect: false,
        rationale: 'Congress has enacted major election statutes.',
      },
      {
        text: 'Federal oversight applies only to local school elections.',
        isCorrect: false,
        rationale: 'Oversight is broader than school elections.',
      },
    ],
    rationale:
      'Understand constitutional structure: delegated powers plus rights enforcement.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'In District A, turnout among first-time voters rose from 22% to 35% after automatic voter registration. In District B, turnout rose from 23% to 26% without that reform.',
    question: 'What is the strongest conclusion from this evidence?',
    answerOptions: [
      {
        text: 'Automatic registration is associated with a substantially larger increase in first-time voter turnout.',
        isCorrect: true,
        rationale:
          'District A increased 13 points versus 3 points in District B.',
      },
      {
        text: 'District B outperformed District A after reform.',
        isCorrect: false,
        rationale: 'District A had larger gains and higher final turnout.',
      },
      {
        text: 'Both districts experienced identical reform effects.',
        isCorrect: false,
        rationale: 'Effects differ by 10 points.',
      },
      {
        text: 'Automatic registration lowers turnout in all settings.',
        isCorrect: false,
        rationale: 'Data shows the opposite in District A.',
      },
    ],
    rationale: 'Use comparative gains to evaluate likely policy impact.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A legislature redraws districts after census changes. Which criterion most directly addresses a claim of partisan gerrymandering?',
    answerOptions: [
      {
        text: 'Whether district boundaries systematically convert similar vote shares into unequal seat shares.',
        isCorrect: true,
        rationale: 'This directly tests representation distortion.',
      },
      {
        text: 'Whether district maps use county colors that are easy to read.',
        isCorrect: false,
        rationale: 'Readability does not address partisan fairness.',
      },
      {
        text: 'Whether district names are alphabetical.',
        isCorrect: false,
        rationale: 'Naming conventions are irrelevant.',
      },
      {
        text: 'Whether all districts include at least one river.',
        isCorrect: false,
        rationale: 'Geographic features are not fairness tests.',
      },
    ],
    rationale:
      'Evaluate whether map design alters translation of votes to seats.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'A campaign ad claims turnout dropped "because voters do not care." Data shows turnout decline occurred only in precincts where polling sites were consolidated and wait times doubled.',
    question: 'Which critique is most appropriate?',
    answerOptions: [
      {
        text: 'The ad ignores a plausible structural confounder linked to turnout decline.',
        isCorrect: true,
        rationale:
          'Site consolidation and longer waits provide an alternative explanation.',
      },
      {
        text: 'The ad proves causation because it uses strong language.',
        isCorrect: false,
        rationale: 'Rhetoric does not establish causality.',
      },
      {
        text: 'Wait times are unrelated to voting behavior by definition.',
        isCorrect: false,
        rationale: 'Access burdens can affect participation.',
      },
      {
        text: 'Turnout changes can never be analyzed with precinct data.',
        isCorrect: false,
        rationale: 'Precinct-level analysis is common in election studies.',
      },
    ],
    rationale:
      'Distinguish unsupported causal claims from evidence-based inference.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'A proposed law requires multilingual ballots in jurisdictions with large language-minority populations. What constitutional value does this most directly support?',
    answerOptions: [
      {
        text: 'Equal access to political participation.',
        isCorrect: true,
        rationale: 'Language access lowers participation barriers.',
      },
      {
        text: 'Limiting judicial review of election disputes.',
        isCorrect: false,
        rationale: 'Language access does not restrict courts.',
      },
      {
        text: 'Eliminating all local election administration.',
        isCorrect: false,
        rationale: 'Local administration remains.',
      },
      {
        text: 'Reducing the number of elected offices.',
        isCorrect: false,
        rationale: 'No such effect is implied.',
      },
    ],
    rationale:
      'Connect policy mechanism to participation and equality principles.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'A state introduces ranked-choice voting in local elections. In two cycles, ballot exhaustion falls from 11% to 4% after voter-education campaigns and ballot redesign.',
    question: 'Which interpretation is best supported?',
    answerOptions: [
      {
        text: 'Implementation quality can materially affect reform outcomes.',
        isCorrect: true,
        rationale:
          'Education and ballot design changes coincide with lower exhaustion.',
      },
      {
        text: 'Ranked-choice voting necessarily eliminates all invalid ballots.',
        isCorrect: false,
        rationale: 'A 4% exhaustion rate remains.',
      },
      {
        text: 'Ballot design has no measurable influence on voter behavior.',
        isCorrect: false,
        rationale: 'Data suggests the opposite.',
      },
      {
        text: 'Election reforms cannot be evaluated with repeated cycles.',
        isCorrect: false,
        rationale: 'Longitudinal comparisons are useful for evaluation.',
      },
    ],
    rationale: 'Infer mechanism and effect from sequential policy adjustments.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'Which evidence would best support a claim that campaign-finance rules have unequal effects across candidates?',
    answerOptions: [
      {
        text: 'Comparative fundraising, spending, and win-rate data by candidate type before and after rule changes.',
        isCorrect: true,
        rationale:
          'Pre/post comparisons with outcome metrics directly test differential effects.',
      },
      {
        text: 'A list of campaign rally locations.',
        isCorrect: false,
        rationale: 'Locations alone do not establish finance-rule effects.',
      },
      {
        text: 'The weather on election day.',
        isCorrect: false,
        rationale: 'Weather is not a direct finance-rule measure.',
      },
      {
        text: 'A map of congressional districts by area size.',
        isCorrect: false,
        rationale: 'District area does not directly test finance impact.',
      },
    ],
    rationale: 'Use targeted pre/post data linked to competition outcomes.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'A court strikes down an election rule as violating equal protection. Which immediate policy response is most consistent with the ruling?',
    answerOptions: [
      {
        text: 'Revise the rule to apply uniformly and avoid unjustified differential burdens.',
        isCorrect: true,
        rationale: 'Equal protection rulings target unequal legal treatment.',
      },
      {
        text: 'Suspend all elections indefinitely.',
        isCorrect: false,
        rationale: 'Courts do not require ending elections.',
      },
      {
        text: 'Transfer all election authority to private groups.',
        isCorrect: false,
        rationale: 'Public authority remains constitutionally structured.',
      },
      {
        text: 'Ignore the ruling unless approved by local referendum.',
        isCorrect: false,
        rationale: 'Court rulings are binding.',
      },
    ],
    rationale:
      'Translate constitutional doctrine into policy compliance steps.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Source A argues that stricter deadlines improve administrative efficiency. Source B shows higher rejection rates in communities with limited mail access when deadlines were tightened.',
    question: 'Which conclusion best integrates the two sources?',
    answerOptions: [
      {
        text: 'Administrative efficiency gains can coexist with equity tradeoffs that require mitigation design.',
        isCorrect: true,
        rationale: 'The sources show both a benefit and a distributional cost.',
      },
      {
        text: 'Efficiency concerns are always illegitimate in election policy.',
        isCorrect: false,
        rationale: 'Source A provides a plausible policy rationale.',
      },
      {
        text: 'Tighter deadlines necessarily improve equity outcomes.',
        isCorrect: false,
        rationale: 'Source B indicates potential inequity.',
      },
      {
        text: 'Mail access differences are irrelevant to election administration.',
        isCorrect: false,
        rationale: 'Source B directly links access to rejection rates.',
      },
    ],
    rationale:
      'Synthesis requires balancing competing policy objectives with evidence.',
    challenge_tags: ['social-3'],
  },
];

function enforceSingleCorrect(questions, topicId) {
  for (const q of questions) {
    if (!Array.isArray(q.answerOptions)) continue;
    const correctCount = q.answerOptions.filter(
      (o) => o && o.isCorrect === true
    ).length;
    if (correctCount !== 1) {
      throw new Error(
        `Topic ${topicId}: question ${q.questionNumber} has ${correctCount} correct options.`
      );
    }
  }
}

function main() {
  enforceSingleCorrect(mathGeometry12, 'math_geometry_12');
  enforceSingleCorrect(socialCivicsElections17, 'ss_civics_elections_17');
  replaceTopicQuestions(MATH_FILE, 'math_geometry_12', mathGeometry12);
  replaceTopicQuestions(
    SS_FILE,
    'ss_civics_elections_17',
    socialCivicsElections17
  );
  console.log('Rewrote question sets:');
  console.log('- public/quizzes/math.quizzes.part2.json :: math_geometry_12');
  console.log(
    '- public/quizzes/social-studies.quizzes.part2.json :: ss_civics_elections_17'
  );
}

main();
