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

function ensureSingleCorrect(questions, topicId) {
  for (const q of questions) {
    if (!Array.isArray(q.answerOptions)) continue;
    const count = q.answerOptions.filter(
      (o) => o && o.isCorrect === true
    ).length;
    if (count !== 1)
      throw new Error(
        `${topicId} question ${q.questionNumber} has ${count} correct options`
      );
  }
}

const mathRatios10 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A recipe uses flour:sugar in a ratio of 7:3. If a baker uses 4.2 kg of flour, how much sugar is needed to keep the ratio?',
    answerOptions: [
      {
        text: '1.8 kg',
        isCorrect: true,
        rationale: 'Set 7k = 4.2, so k = 0.6. Sugar is 3k = 1.8 kg.',
      },
      {
        text: '2.4 kg',
        isCorrect: false,
        rationale: 'This uses an incorrect scale factor.',
      },
      {
        text: '1.2 kg',
        isCorrect: false,
        rationale: 'This underestimates the sugar amount.',
      },
      {
        text: '3.0 kg',
        isCorrect: false,
        rationale: 'This reverses the ratio relationship.',
      },
    ],
    rationale: 'Scale the ratio by the same constant for both terms.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A map scale is 1:50,000. Two towns are 8.6 cm apart on the map. What is the real distance in kilometers?',
    answerOptions: [
      {
        text: '4.3 km',
        isCorrect: true,
        rationale: '8.6 cm × 50,000 = 430,000 cm = 4,300 m = 4.3 km.',
      },
      {
        text: '43 km',
        isCorrect: false,
        rationale: 'This is a place-value conversion error.',
      },
      {
        text: '0.43 km',
        isCorrect: false,
        rationale: 'This converts centimeters to kilometers incorrectly.',
      },
      {
        text: '8.6 km',
        isCorrect: false,
        rationale: 'This ignores the scale multiplier.',
      },
    ],
    rationale:
      'Use scale conversion and unit conversion carefully in sequence.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 3,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A machine completes 18 parts in 12 minutes at a constant rate. At this rate, how many parts can it complete in 55 minutes?',
    correctAnswer: '82.5',
    rationale:
      'Rate is 18/12 = 1.5 parts per minute. In 55 minutes: 1.5 × 55 = 82.5.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A school has boys:girls ratio 9:11. If total enrollment is 580, how many girls are enrolled?',
    answerOptions: [
      {
        text: '261',
        isCorrect: false,
        rationale: 'This computes the number of boys.',
      },
      {
        text: '319',
        isCorrect: true,
        rationale:
          'Total parts = 20. One part = 580/20 = 29. Girls = 11×29 = 319.',
      },
      {
        text: '290',
        isCorrect: false,
        rationale: 'This assumes equal numbers of boys and girls.',
      },
      {
        text: '341',
        isCorrect: false,
        rationale: 'This overcounts the girls share.',
      },
    ],
    rationale: 'Convert ratio parts to counts using total-part scaling.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'A car used 14.4 gallons to drive 403.2 miles. At the same efficiency, how many miles per gallon does the car get?',
    answerOptions: [
      {
        text: '24',
        isCorrect: false,
        rationale: 'This underestimates the quotient.',
      },
      {
        text: '26',
        isCorrect: false,
        rationale: 'This is close but not exact.',
      },
      { text: '28', isCorrect: true, rationale: '403.2 ÷ 14.4 = 28 mpg.' },
      {
        text: '30',
        isCorrect: false,
        rationale: 'This overestimates the quotient.',
      },
    ],
    rationale: 'Unit rate is found by dividing total miles by gallons used.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A solution is mixed with acid:water ratio 2:13. If 390 mL of water is used, how many milliliters of acid are needed?',
    answerOptions: [
      {
        text: '52 mL',
        isCorrect: false,
        rationale: 'This misses the ratio scaling by a factor of 3.',
      },
      {
        text: '60 mL',
        isCorrect: true,
        rationale: '13k=390 gives k=30. Acid is 2k=60 mL.',
      },
      {
        text: '90 mL',
        isCorrect: false,
        rationale: 'This applies an incorrect multiplier.',
      },
      {
        text: '120 mL',
        isCorrect: false,
        rationale: 'This doubles the required acid.',
      },
    ],
    rationale: 'Solve for the shared ratio scale factor first.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A photo is resized from 12 in by 18 in to 20 in by 30 in. By what percent did the area increase?',
    answerOptions: [
      {
        text: '40%',
        isCorrect: false,
        rationale: '40% is the linear scale increase, not area increase.',
      },
      {
        text: '66.7%',
        isCorrect: false,
        rationale: 'This underestimates the area increase.',
      },
      {
        text: '177.8%',
        isCorrect: true,
        rationale:
          'Area increase = (600−216)/216 = 384/216 = 1.777... = 177.8%.',
      },
      {
        text: '250%',
        isCorrect: false,
        rationale: 'This overstates the increase.',
      },
    ],
    rationale:
      'Area scales by the square of linear scale factor; compute from actual areas for accuracy.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 8,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A contractor can paint 7/8 of a wall in 2.1 hours at a constant rate. How many hours are needed to paint one full wall?',
    correctAnswer: '2.4',
    rationale:
      'If 7/8 takes 2.1 h, full wall takes 2.1 ÷ (7/8) = 2.1 × 8/7 = 2.4 h.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A fundraiser keeps administration:program cost ratio at 3:17. If program spending is budgeted at $102,000, what is the total budget?',
    answerOptions: [
      {
        text: '$120,000',
        isCorrect: true,
        rationale:
          '17k=102,000 so k=6,000. Total parts 20 => total budget 20×6,000=120,000.',
      },
      {
        text: '$108,000',
        isCorrect: false,
        rationale:
          'This adds only one extra part instead of three admin parts.',
      },
      {
        text: '$114,000',
        isCorrect: false,
        rationale: 'This misallocates ratio parts.',
      },
      {
        text: '$138,000',
        isCorrect: false,
        rationale: 'This uses an incorrect total part count.',
      },
    ],
    rationale: 'Recover the common part value, then multiply by total parts.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'A recipe for 12 servings uses 4.5 cups of rice. How much rice is needed for 28 servings at the same ratio?',
    answerOptions: [
      {
        text: '9.0 cups',
        isCorrect: false,
        rationale: 'This doubles servings, but 28 is more than double 12.',
      },
      {
        text: '10.5 cups',
        isCorrect: true,
        rationale:
          'Rice per serving is 4.5/12 = 0.375. For 28 servings: 28×0.375 = 10.5.',
      },
      {
        text: '12.0 cups',
        isCorrect: false,
        rationale: 'This overestimates proportional need.',
      },
      {
        text: '14.0 cups',
        isCorrect: false,
        rationale: 'This is not proportional to the original recipe.',
      },
    ],
    rationale: 'Use unit-rate scaling for non-integer multiples of servings.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A data plan costs $36 for 12 GB. Another plan costs $54 for 20 GB. Which plan has the lower unit cost per GB and by how much?',
    answerOptions: [
      {
        text: 'The $36 plan by $0.30/GB',
        isCorrect: false,
        rationale: 'Unit-rate comparison shows this statement is reversed.',
      },
      {
        text: 'The $54 plan by $0.30/GB',
        isCorrect: true,
        rationale:
          'Unit costs are $3.00 and $2.70 per GB, so the $54 plan is cheaper by $0.30 per GB.',
      },
      {
        text: 'The $54 plan by $1.30/GB',
        isCorrect: false,
        rationale: 'Difference is $0.30, not $1.30.',
      },
      {
        text: 'Both plans have the same unit cost',
        isCorrect: false,
        rationale: 'Their unit costs differ.',
      },
    ],
    rationale:
      'Compare unit rates first, then subtract to find the difference.',
    challenge_tags: ['math-1'],
  },
  {
    questionNumber: 12,
    type: 'fillIn',
    inputCalculator: true,
    calculator: true,
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A scale model uses ratio model:actual = 1:175. If the model bridge is 32 cm long, what is the actual bridge length in meters?',
    correctAnswer: '56',
    rationale: 'Actual length = 32×175 = 5600 cm = 56 m.',
    challenge_tags: ['math-1'],
  },
];

const socialBillOfRights15 = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'A city requires all parade permits to be approved by a board that may deny applications it considers "disrespectful" without clear standards.',
    question: 'Which constitutional concern is most directly raised?',
    answerOptions: [
      {
        text: 'Viewpoint discrimination and prior restraint on protected expression.',
        isCorrect: true,
        rationale:
          'Vague, discretionary denial based on viewpoint is a core First Amendment issue.',
      },
      {
        text: 'Double jeopardy in criminal sentencing.',
        isCorrect: false,
        rationale: 'No repeated prosecution is described.',
      },
      {
        text: 'Quartering soldiers in private homes.',
        isCorrect: false,
        rationale: 'This concerns the Third Amendment, not permit policy.',
      },
      {
        text: 'Excessive bail in a felony trial.',
        isCorrect: false,
        rationale: 'No bail process is involved here.',
      },
    ],
    rationale: 'Analyze permit discretion through free-speech doctrine.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'Police use thermal imaging from outside a home to detect heat patterns and then enter without a warrant. Which amendment issue is most central?',
    answerOptions: [
      {
        text: 'Fourth Amendment limits on unreasonable searches and warrant requirements.',
        isCorrect: true,
        rationale:
          'Intrusive surveillance and home entry implicate search protections.',
      },
      {
        text: 'Second Amendment militia clause interpretation.',
        isCorrect: false,
        rationale: 'No firearms issue is presented.',
      },
      {
        text: 'Eighth Amendment ban on excessive fines only.',
        isCorrect: false,
        rationale: 'Search and seizure, not punishment, is at issue.',
      },
      {
        text: 'Tenth Amendment reserved powers exclusively.',
        isCorrect: false,
        rationale: 'The central issue is individual search rights.',
      },
    ],
    rationale: 'Home privacy and warrants are core Fourth Amendment terrain.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'A suspect is interrogated in custody for six hours, repeatedly asks for an attorney, and then signs a confession after continued questioning.',
    question: 'Which constitutional protection is most likely violated?',
    answerOptions: [
      {
        text: 'Fifth and Sixth Amendment protections against compelled self-incrimination and denial of counsel.',
        isCorrect: true,
        rationale:
          'Continuing interrogation after requesting counsel is constitutionally problematic.',
      },
      {
        text: 'Third Amendment protections against military housing.',
        isCorrect: false,
        rationale: 'No military quartering issue exists.',
      },
      {
        text: 'Seventh Amendment civil jury trial guarantee only.',
        isCorrect: false,
        rationale: 'This concerns criminal procedure, not civil jury rights.',
      },
      {
        text: 'Ninth Amendment unenumerated rights doctrine only.',
        isCorrect: false,
        rationale: 'Specific enumerated criminal protections apply directly.',
      },
    ],
    rationale:
      'Identify overlapping procedural rights in custodial interrogation.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'Which statement best describes incorporation of the Bill of Rights?',
    answerOptions: [
      {
        text: 'Many protections were applied to states through the Fourteenth Amendment over time.',
        isCorrect: true,
        rationale: 'Selective incorporation is the key doctrinal development.',
      },
      {
        text: 'The Bill of Rights has always applied identically to states and federal government.',
        isCorrect: false,
        rationale: 'Application to states developed gradually.',
      },
      {
        text: 'Incorporation eliminated all state criminal courts.',
        isCorrect: false,
        rationale: 'State courts remain central in criminal justice.',
      },
      {
        text: 'Incorporation applies only to tax policy disputes.',
        isCorrect: false,
        rationale: 'It concerns constitutional rights protections broadly.',
      },
    ],
    rationale:
      'Incorporation explains how federal rights constrain state actions.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'A state imposes a mandatory minimum sentence far above typical penalties for a nonviolent offense, with no judicial discretion.',
    question: 'Which constitutional argument is strongest?',
    answerOptions: [
      {
        text: 'The punishment may be challenged as cruel and unusual if grossly disproportionate.',
        isCorrect: true,
        rationale: 'Eighth Amendment proportionality is the key argument.',
      },
      {
        text: 'The policy automatically violates free exercise of religion.',
        isCorrect: false,
        rationale: 'No religious burden is indicated.',
      },
      {
        text: 'The sentence invalidates all state legislative authority.',
        isCorrect: false,
        rationale:
          'States retain sentencing authority within constitutional limits.',
      },
      {
        text: 'Mandatory minimums always violate due process regardless of severity.',
        isCorrect: false,
        rationale:
          'Constitutionality depends on context and proportionality analysis.',
      },
    ],
    rationale:
      'Frame punishment claims through proportionality and Eighth Amendment standards.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A law prohibits all anonymous political pamphlets before an election. Which constitutional principle is most directly implicated?',
    answerOptions: [
      {
        text: 'Protection of political speech, including anonymous expression in core public debate.',
        isCorrect: true,
        rationale:
          'Anonymous political advocacy is closely tied to free-expression protections.',
      },
      {
        text: 'Takings Clause compensation for private property.',
        isCorrect: false,
        rationale: 'No property seizure is presented.',
      },
      {
        text: 'Quartering restrictions during peacetime.',
        isCorrect: false,
        rationale: 'This is unrelated to speech regulation.',
      },
      {
        text: 'Ban on ex post facto criminal statutes only.',
        isCorrect: false,
        rationale: 'The primary issue is speech suppression.',
      },
    ],
    rationale: 'Political expression receives high constitutional protection.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Officers stop and search all passengers in a neighborhood without individualized suspicion as part of a broad anti-crime sweep.',
    question: 'What constitutional critique is strongest?',
    answerOptions: [
      {
        text: "Generalized suspicionless searches risk violating the Fourth Amendment's reasonableness requirement.",
        isCorrect: true,
        rationale:
          'Mass individualized searches without specific cause are constitutionally suspect.',
      },
      {
        text: 'The policy is unconstitutional only if no arrests occur.',
        isCorrect: false,
        rationale:
          'Constitutionality does not hinge solely on arrest outcomes.',
      },
      {
        text: 'The policy concerns only voting rights doctrine.',
        isCorrect: false,
        rationale: 'Search-and-seizure law is the relevant framework.',
      },
      {
        text: 'The policy is valid whenever crime rates are high, without limits.',
        isCorrect: false,
        rationale:
          'Public safety concerns do not remove constitutional constraints.',
      },
    ],
    rationale:
      'Assess policing policies using reasonableness and individualized suspicion principles.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'Why is the Ninth Amendment often discussed alongside the Tenth Amendment?',
    answerOptions: [
      {
        text: 'Both address limits on federal power and acknowledge rights or powers not exhaustively listed.',
        isCorrect: true,
        rationale:
          'They caution against reading the Constitution as an exhaustive list.',
      },
      {
        text: 'Both create the federal court system.',
        isCorrect: false,
        rationale: 'Judiciary structure appears elsewhere in the Constitution.',
      },
      {
        text: 'Both prohibit taxation by states.',
        isCorrect: false,
        rationale: 'State taxation is not categorically prohibited.',
      },
      {
        text: 'Both require two-term limits for judges.',
        isCorrect: false,
        rationale: 'No such requirement exists in these amendments.',
      },
    ],
    rationale:
      'Understand constitutional structure beyond enumerated rights text.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    question:
      'A city ordinance permits speech in parks only between 10:00 a.m. and 2:00 p.m., regardless of crowd size, noise level, or location. What is the key constitutional test issue?',
    answerOptions: [
      {
        text: 'Whether the time-place-manner restriction is narrowly tailored and leaves ample alternative channels.',
        isCorrect: true,
        rationale:
          'Neutral speech regulations must satisfy this balancing framework.',
      },
      {
        text: 'Whether the rule increases tourism revenue.',
        isCorrect: false,
        rationale: 'Economic effects are not the constitutional speech test.',
      },
      {
        text: 'Whether all speakers agree with city policy.',
        isCorrect: false,
        rationale: 'Agreement with policy is not a valid speech criterion.',
      },
      {
        text: 'Whether newspapers support the ordinance editorially.',
        isCorrect: false,
        rationale:
          'Editorial support does not determine constitutional validity.',
      },
    ],
    rationale: 'Apply doctrinal framework to practical regulation scenarios.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'After a conviction, new DNA evidence strongly suggests innocence, but state rules severely limit post-conviction review windows.',
    question: 'Which constitutional value is most in tension in this scenario?',
    answerOptions: [
      {
        text: 'Finality of judgments versus due process and fairness in criminal procedure.',
        isCorrect: true,
        rationale:
          'The conflict is between closure and procedural justice for potentially wrongful convictions.',
      },
      {
        text: 'Quartering of troops versus local taxation.',
        isCorrect: false,
        rationale: 'These are unrelated to post-conviction review.',
      },
      {
        text: 'Freedom of religion versus eminent domain.',
        isCorrect: false,
        rationale: 'This scenario concerns criminal justice process.',
      },
      {
        text: 'Interstate commerce versus campaign finance limits.',
        isCorrect: false,
        rationale: 'No commerce or campaign issue is presented.',
      },
    ],
    rationale:
      'High-level constitutional analysis often involves competing legal values.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 11,
    type: 'multipleChoice',
    difficulty: 'medium',
    tier: 'test-ready',
    question:
      'The Seventh Amendment differs from the Sixth Amendment mainly because it protects what?',
    answerOptions: [
      {
        text: 'Jury trial rights in certain civil cases rather than criminal prosecutions.',
        isCorrect: true,
        rationale: 'Sixth is criminal, Seventh is civil jury protection.',
      },
      {
        text: 'Protection against self-incrimination during police questioning.',
        isCorrect: false,
        rationale: 'That is associated with Fifth Amendment protections.',
      },
      {
        text: 'Freedom of speech and religion.',
        isCorrect: false,
        rationale: 'Those are First Amendment protections.',
      },
      {
        text: 'Limits on excessive bail and fines.',
        isCorrect: false,
        rationale: 'Those are Eighth Amendment concerns.',
      },
    ],
    rationale: 'Differentiate constitutional trial rights by case type.',
    challenge_tags: ['social-3'],
  },
  {
    questionNumber: 12,
    type: 'multipleChoice',
    difficulty: 'hard',
    tier: 'challenge',
    passage:
      'Source A argues broad surveillance powers are needed for public safety. Source B documents increased mistaken-identity searches in communities with limited legal resources.',
    question: 'Which policy response best integrates both concerns?',
    answerOptions: [
      {
        text: 'Retain targeted surveillance authority with stronger warrant standards, auditing, and accessible remedies for wrongful searches.',
        isCorrect: true,
        rationale:
          'This addresses safety goals while reducing rights harms through oversight.',
      },
      {
        text: 'Ban all investigations involving digital evidence.',
        isCorrect: false,
        rationale: 'This overcorrects and undermines legitimate enforcement.',
      },
      {
        text: 'Allow unrestricted surveillance without judicial review.',
        isCorrect: false,
        rationale: 'This ignores documented rights risks.',
      },
      {
        text: 'Resolve all search disputes through private arbitration only.',
        isCorrect: false,
        rationale:
          'Constitutional claims require public legal review mechanisms.',
      },
    ],
    rationale:
      'Synthesis favors constrained authority plus accountability design.',
    challenge_tags: ['social-3'],
  },
];

function main() {
  ensureSingleCorrect(mathRatios10, 'math_ratios_10');
  ensureSingleCorrect(socialBillOfRights15, 'ss_civics_bill_of_rights_15');
  replaceTopicQuestions(MATH_FILE, 'math_ratios_10', mathRatios10);
  replaceTopicQuestions(
    SS_FILE,
    'ss_civics_bill_of_rights_15',
    socialBillOfRights15
  );
  console.log('Rewrote question sets:');
  console.log('- public/quizzes/math.quizzes.part2.json :: math_ratios_10');
  console.log(
    '- public/quizzes/social-studies.quizzes.part2.json :: ss_civics_bill_of_rights_15'
  );
}

main();
