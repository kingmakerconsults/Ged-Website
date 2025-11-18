/**
 * QUIZ EXPANSIONS - NEW PREMADE QUIZZES
 *
 * This file contains new premade quizzes to fill gaps in:
 * 1. Social Studies (30+ quizzes across all topics)
 * 2. Science - Chemistry focus with equation balancing
 * 3. Workforce Skills (15+ quizzes)
 *
 * All quizzes follow standards:
 * - Use stimulus (passages/images from our library)
 * - Proper KaTeX for math
 * - 12 questions minimum per quiz
 * - Quality rationales
 * - Appropriate challenge tags
 */

// ============================================================================
// SOCIAL STUDIES EXPANSIONS
// ============================================================================

const SOCIAL_STUDIES_CIVICS_QUIZZES = {
  // Topic: Three Branches of Government
  ss_civics_branches_quiz1: {
    id: 'ss_civics_branches_quiz1',
    label: 'Separation of Powers & Checks',
    description: 'Understanding the three branches and their balance of power.',
    questions: [
      {
        questionNumber: 1,
        challenge_tags: ['social-1', 'social-2'],
        type: 'knowledge',
        question:
          'Which branch of government has the power to veto legislation passed by Congress?',
        answerOptions: [
          {
            text: 'The Legislative Branch',
            rationale:
              'The Legislative Branch creates laws but cannot veto them.',
            isCorrect: false,
          },
          {
            text: 'The Executive Branch',
            rationale:
              'Correct. The President (Executive Branch) can veto bills passed by Congress.',
            isCorrect: true,
          },
          {
            text: 'The Judicial Branch',
            rationale:
              'The Judicial Branch interprets laws but does not have veto power.',
            isCorrect: false,
          },
          {
            text: 'The Supreme Court',
            rationale:
              'The Supreme Court can declare laws unconstitutional but cannot veto legislation.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 2,
        challenge_tags: ['social-1'],
        type: 'text',
        passage:
          'The system of checks and balances ensures that no single branch of government becomes too powerful. For example, while Congress can pass laws, the President can veto them. However, Congress can override a presidential veto with a two-thirds vote in both the House and Senate.',
        question:
          'What percentage of Congress must vote to override a presidential veto?',
        answerOptions: [
          {
            text: 'Simple majority (51%)',
            rationale: 'A simple majority is not enough to override a veto.',
            isCorrect: false,
          },
          {
            text: 'Three-fifths (60%)',
            rationale:
              'This is used for ending filibusters in the Senate, not for veto overrides.',
            isCorrect: false,
          },
          {
            text: 'Two-thirds (67%)',
            rationale:
              'Correct. A two-thirds vote in both chambers is required to override a presidential veto.',
            isCorrect: true,
          },
          {
            text: 'Three-quarters (75%)',
            rationale:
              'This threshold is used for constitutional amendments, not veto overrides.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 3,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'Which branch of government has the power to declare laws unconstitutional?',
        answerOptions: [
          {
            text: 'The Legislative Branch',
            rationale:
              'Congress creates laws but cannot declare them unconstitutional.',
            isCorrect: false,
          },
          {
            text: 'The Executive Branch',
            rationale:
              'The President enforces laws but cannot declare them unconstitutional.',
            isCorrect: false,
          },
          {
            text: 'The Judicial Branch',
            rationale:
              'Correct. The Supreme Court and federal courts have the power of judicial review.',
            isCorrect: true,
          },
          {
            text: 'The Cabinet',
            rationale:
              'The Cabinet advises the President but has no judicial power.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 4,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'The Senate must confirm many presidential appointments, including Supreme Court justices, Cabinet members, and federal judges. This requirement prevents the President from unilaterally filling important positions and ensures that qualified individuals are selected.',
        question:
          'Which of the following presidential appointments does NOT require Senate confirmation?',
        answerOptions: [
          {
            text: 'Supreme Court Justice',
            rationale:
              'Supreme Court justices must be confirmed by the Senate.',
            isCorrect: false,
          },
          {
            text: 'Cabinet Secretary',
            rationale: 'All Cabinet secretaries require Senate confirmation.',
            isCorrect: false,
          },
          {
            text: 'White House Chief of Staff',
            rationale:
              'Correct. The Chief of Staff is a personal staff position that does not require Senate confirmation.',
            isCorrect: true,
          },
          {
            text: 'Federal Judge',
            rationale: 'All federal judges must be confirmed by the Senate.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 5,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'Which chamber of Congress has the sole power to impeach federal officials?',
        answerOptions: [
          {
            text: 'The Senate',
            rationale:
              'The Senate conducts the impeachment trial, but does not initiate impeachment.',
            isCorrect: false,
          },
          {
            text: 'The House of Representatives',
            rationale:
              'Correct. The House has the sole power to impeach (formally charge) officials.',
            isCorrect: true,
          },
          {
            text: 'Both chambers together',
            rationale:
              'The chambers have separate roles: House impeaches, Senate tries.',
            isCorrect: false,
          },
          {
            text: 'The Supreme Court',
            rationale:
              'The Supreme Court has no role in impeachment proceedings.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 6,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'The power of judicial review, established in Marbury v. Madison (1803), allows the Supreme Court to determine whether laws passed by Congress or actions taken by the President are constitutional. This power is not explicitly stated in the Constitution but has become a cornerstone of American government.',
        question:
          'The power of judicial review was established in which landmark Supreme Court case?',
        answerOptions: [
          {
            text: 'Brown v. Board of Education',
            rationale:
              'This case dealt with school segregation, not judicial review.',
            isCorrect: false,
          },
          {
            text: 'Marbury v. Madison',
            rationale:
              'Correct. This 1803 case established the principle of judicial review.',
            isCorrect: true,
          },
          {
            text: 'McCulloch v. Maryland',
            rationale:
              'This case dealt with federal vs. state power and implied powers.',
            isCorrect: false,
          },
          {
            text: 'Gibbons v. Ogden',
            rationale: 'This case dealt with interstate commerce.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 7,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question: 'How many justices serve on the U.S. Supreme Court?',
        answerOptions: [
          {
            text: '7',
            rationale: 'This is not the correct number of justices.',
            isCorrect: false,
          },
          {
            text: '9',
            rationale:
              'Correct. There are nine Supreme Court justices: one Chief Justice and eight Associate Justices.',
            isCorrect: true,
          },
          {
            text: '11',
            rationale: 'This is not the correct number.',
            isCorrect: false,
          },
          {
            text: '12',
            rationale: 'Twelve is the size of a jury, not the Supreme Court.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 8,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'The President nominates federal judges, including Supreme Court justices, who serve lifetime appointments. This lifetime tenure is designed to insulate judges from political pressure, allowing them to make decisions based on the law and Constitution rather than public opinion or political considerations.',
        question: 'Why do federal judges serve lifetime appointments?',
        answerOptions: [
          {
            text: 'To ensure they gain enough experience before making important decisions',
            rationale:
              'Experience is gained before appointment; lifetime tenure serves a different purpose.',
            isCorrect: false,
          },
          {
            text: 'To make them independent from political pressure',
            rationale:
              'Correct. Lifetime tenure protects judges from having to please voters or politicians to keep their jobs.',
            isCorrect: true,
          },
          {
            text: 'To prevent frequent confirmation hearings',
            rationale:
              'While this is a result, it is not the primary reason for lifetime appointments.',
            isCorrect: false,
          },
          {
            text: 'To save money on judicial elections',
            rationale:
              'Federal judges are not elected, so this is not a factor.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 9,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'Which of the following is an example of a check the Judicial Branch has on the Executive Branch?',
        answerOptions: [
          {
            text: 'Appointing Cabinet members',
            rationale:
              'The President appoints Cabinet members; the Judicial Branch does not.',
            isCorrect: false,
          },
          {
            text: 'Declaring executive actions unconstitutional',
            rationale:
              'Correct. Courts can review and strike down executive orders or actions that violate the Constitution.',
            isCorrect: true,
          },
          {
            text: 'Vetoing executive orders',
            rationale:
              'Only the President has veto power, and it applies to legislation, not executive orders.',
            isCorrect: false,
          },
          {
            text: 'Impeaching the President',
            rationale: 'Impeachment is a power of Congress, not the courts.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 10,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'The Legislative Branch (Congress) is divided into two chambers: the House of Representatives and the Senate. This bicameral structure was a compromise between large and small states at the Constitutional Convention. The House is based on population, while each state has two senators regardless of size.',
        question:
          'Why does each state have two senators regardless of its population?',
        answerOptions: [
          {
            text: 'To ensure all states have equal representation in at least one chamber',
            rationale:
              'Correct. Equal representation in the Senate was designed to protect smaller states.',
            isCorrect: true,
          },
          {
            text: 'To make the Senate more efficient',
            rationale: 'Efficiency was not the reason for this structure.',
            isCorrect: false,
          },
          {
            text: 'To limit the power of populous states',
            rationale:
              'While this is an effect, the primary reason was to ensure equal state representation.',
            isCorrect: false,
          },
          {
            text: 'To speed up the legislative process',
            rationale:
              'The bicameral structure actually slows down legislation, not speeds it up.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 11,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question: 'Which branch of government has the power to declare war?',
        answerOptions: [
          {
            text: 'The Executive Branch',
            rationale:
              'The President is Commander-in-Chief but cannot declare war.',
            isCorrect: false,
          },
          {
            text: 'The Legislative Branch',
            rationale:
              'Correct. Only Congress has the constitutional power to declare war.',
            isCorrect: true,
          },
          {
            text: 'The Judicial Branch',
            rationale: 'Courts have no role in declaring war.',
            isCorrect: false,
          },
          {
            text: 'The Secretary of Defense',
            rationale:
              'The Secretary of Defense is part of the Executive Branch and cannot declare war.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 12,
        challenge_tags: ['social-1', 'social-2'],
        type: 'text',
        passage:
          "The power of the purse refers to Congress's constitutional authority to control government spending. All bills for raising revenue must originate in the House of Representatives, and both chambers must approve the federal budget. This gives Congress significant leverage over the Executive Branch.",
        question:
          'How does the "power of the purse" serve as a check on the Executive Branch?',
        answerOptions: [
          {
            text: 'It allows Congress to remove the President from office',
            rationale:
              'Removal from office is done through impeachment, not budget control.',
            isCorrect: false,
          },
          {
            text: 'It requires the President to approve all Congressional spending',
            rationale:
              'Congress controls spending; the President does not approve Congressional budgets.',
            isCorrect: false,
          },
          {
            text: 'It gives Congress control over funding for executive agencies and programs',
            rationale:
              'Correct. Congress can limit executive power by controlling the budget for federal agencies.',
            isCorrect: true,
          },
          {
            text: "It allows Congress to set the President's salary",
            rationale:
              'While Congress does set the salary, this is not the primary check referred to as the power of the purse.',
            isCorrect: false,
          },
        ],
      },
    ],
  },

  ss_civics_branches_quiz2: {
    id: 'ss_civics_branches_quiz2',
    label: 'Legislative Process & Congress',
    description: 'How a bill becomes a law and Congressional procedures.',
    questions: [
      {
        questionNumber: 1,
        challenge_tags: ['social-1', 'social-2'],
        type: 'text',
        passage:
          'For a bill to become a law, it must pass both the House of Representatives and the Senate in identical form. If the two chambers pass different versions, a conference committee made up of members from both chambers works to create a compromise version that both can approve.',
        question:
          'What happens if the House and Senate pass different versions of the same bill?',
        answerOptions: [
          {
            text: 'The President decides which version becomes law',
            rationale:
              'The President cannot choose between versions; both chambers must agree.',
            isCorrect: false,
          },
          {
            text: 'The House version automatically takes precedence',
            rationale: "Neither chamber's version takes automatic precedence.",
            isCorrect: false,
          },
          {
            text: 'A conference committee creates a compromise version',
            rationale:
              'Correct. Members from both chambers work together to reconcile differences.',
            isCorrect: true,
          },
          {
            text: 'The bill is automatically rejected',
            rationale:
              'Bills are not automatically rejected; they go to conference.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 2,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'How many days does the President have to sign or veto a bill after it reaches their desk?',
        answerOptions: [
          {
            text: '5 days',
            rationale: 'This is not the correct timeframe.',
            isCorrect: false,
          },
          {
            text: '10 days',
            rationale:
              'Correct. The President has 10 days (not counting Sundays) to act on a bill.',
            isCorrect: true,
          },
          {
            text: '15 days',
            rationale: 'This is not the correct timeframe.',
            isCorrect: false,
          },
          {
            text: '30 days',
            rationale: 'This is too long; the President has less time.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 3,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'A filibuster is a tactic used in the Senate to delay or block a vote on legislation. A senator can speak for as long as they wish on any topic, preventing the Senate from moving forward. Ending a filibuster requires a cloture vote, which needs 60 senators to agree.',
        question:
          'How many senators are needed to end a filibuster through cloture?',
        answerOptions: [
          {
            text: '51 (simple majority)',
            rationale: 'A simple majority is not enough to end a filibuster.',
            isCorrect: false,
          },
          {
            text: '60 (three-fifths)',
            rationale:
              'Correct. Cloture requires 60 votes to end debate and proceed to a vote.',
            isCorrect: true,
          },
          {
            text: '67 (two-thirds)',
            rationale:
              'Two-thirds is required for veto overrides and treaty ratification, not cloture.',
            isCorrect: false,
          },
          {
            text: '75 (three-quarters)',
            rationale:
              'This threshold is used for constitutional amendments, not cloture.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 4,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'Which chamber of Congress has the power to ratify treaties with foreign nations?',
        answerOptions: [
          {
            text: 'The House of Representatives',
            rationale: 'The House does not have treaty ratification power.',
            isCorrect: false,
          },
          {
            text: 'The Senate',
            rationale:
              'Correct. The Senate must approve treaties with a two-thirds vote.',
            isCorrect: true,
          },
          {
            text: 'Both chambers together',
            rationale: 'Only the Senate ratifies treaties.',
            isCorrect: false,
          },
          {
            text: 'Neither; only the President ratifies treaties',
            rationale:
              'The President negotiates treaties but the Senate must ratify them.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 5,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'When Congress is in session and the President receives a bill but neither signs nor vetoes it within 10 days, the bill automatically becomes law. However, if Congress adjourns during those 10 days and the President takes no action, the bill does not become law. This is called a "pocket veto."',
        question: 'What is a "pocket veto"?',
        answerOptions: [
          {
            text: 'When the President signs a bill in private',
            rationale:
              'Pocket veto has nothing to do with where a bill is signed.',
            isCorrect: false,
          },
          {
            text: 'When Congress overrides a presidential veto',
            rationale: 'This describes a veto override, not a pocket veto.',
            isCorrect: false,
          },
          {
            text: 'When a bill dies because Congress adjourns before the President acts on it',
            rationale:
              'Correct. A pocket veto occurs when the President runs out the clock while Congress is adjourned.',
            isCorrect: true,
          },
          {
            text: 'When the President vetoes only part of a bill',
            rationale:
              'This describes a line-item veto, which is unconstitutional for the President.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 6,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'All bills for raising revenue (tax bills) must originate in which chamber?',
        answerOptions: [
          {
            text: 'The Senate',
            rationale:
              'The Senate can modify revenue bills but cannot originate them.',
            isCorrect: false,
          },
          {
            text: 'The House of Representatives',
            rationale:
              'Correct. The Constitution requires revenue bills to start in the House.',
            isCorrect: true,
          },
          {
            text: 'Either chamber',
            rationale:
              'Most bills can start in either chamber, but revenue bills must start in the House.',
            isCorrect: false,
          },
          {
            text: 'The Treasury Department',
            rationale:
              'The Treasury Department is part of the Executive Branch and cannot introduce bills.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 7,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'Congressional committees are specialized groups of legislators who review and modify bills before they reach the full chamber for a vote. Most of the detailed work on legislation happens in committees, where experts examine bills, hold hearings, and make changes. A bill that dies in committee never reaches a floor vote.',
        question:
          'What role do congressional committees play in the legislative process?',
        answerOptions: [
          {
            text: 'They enforce laws passed by Congress',
            rationale:
              'Enforcement is the job of the Executive Branch, not committees.',
            isCorrect: false,
          },
          {
            text: 'They review, modify, and recommend bills before they reach the full chamber',
            rationale:
              'Correct. Committees do the detailed work of examining and improving legislation.',
            isCorrect: true,
          },
          {
            text: 'They veto bills they disagree with',
            rationale:
              'Committees do not have veto power; only the President can veto.',
            isCorrect: false,
          },
          {
            text: 'They automatically approve all bills sent to them',
            rationale:
              'Committees review bills critically and many bills die in committee.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 8,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'How many members serve in the U.S. House of Representatives?',
        answerOptions: [
          {
            text: '100',
            rationale: 'This is the number of senators, not representatives.',
            isCorrect: false,
          },
          {
            text: '435',
            rationale:
              'Correct. There are 435 voting members in the House of Representatives.',
            isCorrect: true,
          },
          {
            text: '538',
            rationale:
              'This is the number of Electoral College votes, not House members.',
            isCorrect: false,
          },
          {
            text: '535',
            rationale:
              'This is the total number of senators (100) and representatives (435) combined.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 9,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          'The Speaker of the House is the presiding officer of the House of Representatives and is elected by House members. The Speaker is typically a member of the majority party and is second in line to succeed the President, after the Vice President.',
        question: 'Who elects the Speaker of the House?',
        answerOptions: [
          {
            text: 'The President',
            rationale: 'The President does not elect the Speaker.',
            isCorrect: false,
          },
          {
            text: 'The American voters',
            rationale:
              'Voters elect representatives, but the Speaker is chosen by House members.',
            isCorrect: false,
          },
          {
            text: 'Members of the House of Representatives',
            rationale:
              'Correct. House members vote to elect their own Speaker.',
            isCorrect: true,
          },
          {
            text: 'The Senate',
            rationale: 'The Senate does not elect the Speaker of the House.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 10,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question:
          'What is the minimum age requirement to serve in the U.S. Senate?',
        answerOptions: [
          {
            text: '25 years old',
            rationale:
              'This is the minimum age for the House of Representatives.',
            isCorrect: false,
          },
          {
            text: '30 years old',
            rationale: 'Correct. Senators must be at least 30 years old.',
            isCorrect: true,
          },
          {
            text: '35 years old',
            rationale: 'This is the minimum age to be President.',
            isCorrect: false,
          },
          {
            text: '40 years old',
            rationale:
              'There is no age requirement this high for any federal office.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 11,
        challenge_tags: ['social-1', 'social-5'],
        type: 'text',
        passage:
          "Each state's representation in the House of Representatives is based on its population, as determined by the U.S. Census conducted every 10 years. After each census, seats may be redistributed among states in a process called reapportionment. States that gain population may gain seats, while those that lose population may lose seats.",
        question: 'What is the purpose of reapportionment after each census?',
        answerOptions: [
          {
            text: 'To ensure each state has two senators',
            rationale:
              "Each state always has two senators regardless of population; this doesn't change.",
            isCorrect: false,
          },
          {
            text: 'To adjust House seats based on population changes',
            rationale:
              'Correct. Reapportionment redistributes House seats to reflect population shifts.',
            isCorrect: true,
          },
          {
            text: 'To determine Electoral College votes only',
            rationale:
              'While Electoral College votes are affected, reapportionment primarily concerns House seats.',
            isCorrect: false,
          },
          {
            text: 'To change state boundaries',
            rationale:
              'Reapportionment does not involve changing state boundaries.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 12,
        challenge_tags: ['social-2'],
        type: 'knowledge',
        question: 'How long is a term for a U.S. Senator?',
        answerOptions: [
          {
            text: '2 years',
            rationale: 'This is the length of a House term, not a Senate term.',
            isCorrect: false,
          },
          {
            text: '4 years',
            rationale: 'This is the length of a presidential term.',
            isCorrect: false,
          },
          {
            text: '6 years',
            rationale: 'Correct. Senators serve six-year terms.',
            isCorrect: true,
          },
          {
            text: '8 years',
            rationale: 'No federal office has an eight-year term.',
            isCorrect: false,
          },
        ],
      },
    ],
  },

  // Add quiz 3 for rights & responsibilities
  ss_civics_rights_quiz1: {
    id: 'ss_civics_rights_quiz1',
    label: 'Bill of Rights Fundamentals',
    description: 'Understanding the first 10 amendments to the Constitution.',
    questions: [
      {
        questionNumber: 1,
        challenge_tags: ['social-1', 'social-3'],
        type: 'knowledge',
        question:
          'Which amendment protects freedom of speech, religion, press, assembly, and petition?',
        answerOptions: [
          {
            text: 'First Amendment',
            rationale:
              'Correct. The First Amendment protects these five fundamental freedoms.',
            isCorrect: true,
          },
          {
            text: 'Second Amendment',
            rationale: 'The Second Amendment concerns the right to bear arms.',
            isCorrect: false,
          },
          {
            text: 'Fourth Amendment',
            rationale:
              'The Fourth Amendment protects against unreasonable searches and seizures.',
            isCorrect: false,
          },
          {
            text: 'Fifth Amendment',
            rationale:
              'The Fifth Amendment deals with due process and self-incrimination.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 2,
        challenge_tags: ['social-3'],
        type: 'text',
        passage:
          "The Fourth Amendment protects citizens from unreasonable searches and seizures by the government. It requires law enforcement to obtain a warrant based on probable cause before searching a person's property. Evidence obtained without a proper warrant is generally not admissible in court.",
        question:
          "What must law enforcement have to conduct a legal search of someone's home?",
        answerOptions: [
          {
            text: 'Permission from a neighbor',
            rationale:
              "Neighbors cannot grant permission to search someone else's home.",
            isCorrect: false,
          },
          {
            text: 'A warrant based on probable cause',
            rationale:
              'Correct. The Fourth Amendment requires a warrant supported by probable cause.',
            isCorrect: true,
          },
          {
            text: 'Approval from the President',
            rationale:
              'Presidential approval is not needed for search warrants.',
            isCorrect: false,
          },
          {
            text: 'A majority vote from Congress',
            rationale: 'Congress does not vote on individual search warrants.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 3,
        challenge_tags: ['social-3'],
        type: 'knowledge',
        question:
          'The Fifth Amendment protects against which of the following?',
        answerOptions: [
          {
            text: 'Freedom of speech restrictions',
            rationale: 'Freedom of speech is protected by the First Amendment.',
            isCorrect: false,
          },
          {
            text: 'Self-incrimination',
            rationale:
              'Correct. The Fifth Amendment includes the right against self-incrimination ("pleading the Fifth").',
            isCorrect: true,
          },
          {
            text: 'Unreasonable searches',
            rationale:
              'Protection against unreasonable searches is in the Fourth Amendment.',
            isCorrect: false,
          },
          {
            text: 'Excessive bail',
            rationale:
              'Protection against excessive bail is in the Eighth Amendment.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 4,
        challenge_tags: ['social-1', 'social-3'],
        type: 'text',
        passage:
          'The Sixth Amendment guarantees the right to a speedy and public trial by an impartial jury. It also ensures that defendants have the right to know the charges against them, confront witnesses, compel witnesses to testify on their behalf, and have legal counsel.',
        question:
          'According to the Sixth Amendment, what right do defendants have regarding legal representation?',
        answerOptions: [
          {
            text: 'The right to represent themselves only',
            rationale:
              'Defendants can represent themselves, but they also have the right to an attorney.',
            isCorrect: false,
          },
          {
            text: 'The right to an attorney, even if they cannot afford one',
            rationale:
              'Correct. The Sixth Amendment guarantees the right to counsel, which has been interpreted to require providing attorneys to indigent defendants.',
            isCorrect: true,
          },
          {
            text: 'The right to hire any attorney they choose, but only if they can pay',
            rationale:
              'While defendants can hire their own attorney, those who cannot afford one must be provided with counsel.',
            isCorrect: false,
          },
          {
            text: 'No specific right to legal counsel',
            rationale:
              'The Sixth Amendment explicitly guarantees the right to legal counsel.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 5,
        challenge_tags: ['social-3'],
        type: 'knowledge',
        question:
          'Which amendment protects against cruel and unusual punishment?',
        answerOptions: [
          {
            text: 'Sixth Amendment',
            rationale:
              'The Sixth Amendment deals with trial rights, not punishment.',
            isCorrect: false,
          },
          {
            text: 'Seventh Amendment',
            rationale: 'The Seventh Amendment concerns civil trials.',
            isCorrect: false,
          },
          {
            text: 'Eighth Amendment',
            rationale:
              'Correct. The Eighth Amendment prohibits excessive bail, fines, and cruel and unusual punishment.',
            isCorrect: true,
          },
          {
            text: 'Tenth Amendment',
            rationale:
              'The Tenth Amendment concerns powers reserved to states.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 6,
        challenge_tags: ['social-1', 'social-3'],
        type: 'text',
        passage:
          'The Second Amendment states: "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed." The interpretation and scope of this amendment continue to be debated in American politics and law.',
        question: 'What right does the Second Amendment protect?',
        answerOptions: [
          {
            text: 'The right to free speech',
            rationale: 'Free speech is protected by the First Amendment.',
            isCorrect: false,
          },
          {
            text: 'The right to bear arms',
            rationale:
              'Correct. The Second Amendment protects the right to keep and bear arms.',
            isCorrect: true,
          },
          {
            text: 'The right to a jury trial',
            rationale:
              'Jury trial rights are in the Sixth and Seventh Amendments.',
            isCorrect: false,
          },
          {
            text: 'The right to vote',
            rationale:
              'Voting rights are addressed in later amendments (15th, 19th, 26th).',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 7,
        challenge_tags: ['social-3'],
        type: 'knowledge',
        question:
          'The Third Amendment prohibits the government from doing what during peacetime?',
        answerOptions: [
          {
            text: 'Collecting taxes',
            rationale:
              'Tax collection is not addressed by the Third Amendment.',
            isCorrect: false,
          },
          {
            text: 'Quartering soldiers in private homes without consent',
            rationale:
              'Correct. The Third Amendment prevents the government from forcing citizens to house soldiers.',
            isCorrect: true,
          },
          {
            text: 'Conducting searches',
            rationale: 'Searches are addressed by the Fourth Amendment.',
            isCorrect: false,
          },
          {
            text: 'Restricting free speech',
            rationale:
              'Speech restrictions are addressed by the First Amendment.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 8,
        challenge_tags: ['social-1', 'social-3'],
        type: 'text',
        passage:
          'The Ninth Amendment states that the enumeration of certain rights in the Constitution does not mean that people do not have other rights not specifically listed. This amendment recognizes that the Bill of Rights is not an exhaustive list of all rights retained by the people.',
        question: 'What does the Ninth Amendment establish?',
        answerOptions: [
          {
            text: 'That only rights listed in the Constitution are protected',
            rationale: 'The Ninth Amendment explicitly states the opposite.',
            isCorrect: false,
          },
          {
            text: 'That people have rights beyond those specifically listed in the Constitution',
            rationale:
              'Correct. The Ninth Amendment recognizes unenumerated rights.',
            isCorrect: true,
          },
          {
            text: 'That the Bill of Rights can never be amended',
            rationale:
              'Amendments can be added; this is not what the Ninth Amendment addresses.',
            isCorrect: false,
          },
          {
            text: 'That states have more power than the federal government',
            rationale:
              'State vs. federal power is addressed in the Tenth Amendment.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 9,
        challenge_tags: ['social-3'],
        type: 'knowledge',
        question:
          'Which amendment reserves powers not delegated to the federal government to the states or the people?',
        answerOptions: [
          {
            text: 'Eighth Amendment',
            rationale:
              'The Eighth Amendment deals with punishment, not federal vs. state powers.',
            isCorrect: false,
          },
          {
            text: 'Ninth Amendment',
            rationale:
              'The Ninth Amendment concerns unenumerated individual rights.',
            isCorrect: false,
          },
          {
            text: 'Tenth Amendment',
            rationale:
              'Correct. The Tenth Amendment reserves powers to states or the people that are not given to the federal government.',
            isCorrect: true,
          },
          {
            text: 'Eleventh Amendment',
            rationale: 'The Eleventh Amendment deals with sovereign immunity.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 10,
        challenge_tags: ['social-1', 'social-3'],
        type: 'text',
        passage:
          'The First Amendment\'s Establishment Clause prohibits the government from establishing an official religion or favoring one religion over another. The Free Exercise Clause protects individuals\' rights to practice their religion freely. Together, these clauses are sometimes described as creating a "wall of separation" between church and state.',
        question:
          'What do the Establishment and Free Exercise Clauses of the First Amendment protect?',
        answerOptions: [
          {
            text: "The government's right to establish a national religion",
            rationale: 'The Establishment Clause prohibits this.',
            isCorrect: false,
          },
          {
            text: 'Religious freedom and separation of church and state',
            rationale:
              'Correct. These clauses protect both individual religious practice and prevent government establishment of religion.',
            isCorrect: true,
          },
          {
            text: 'Only Christian religious practices',
            rationale: 'The First Amendment protects all religions equally.',
            isCorrect: false,
          },
          {
            text: 'The right to discriminate based on religion',
            rationale: 'The First Amendment does not protect discrimination.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 11,
        challenge_tags: ['social-3'],
        type: 'knowledge',
        question: 'Double jeopardy, prohibited by the Fifth Amendment, means:',
        answerOptions: [
          {
            text: 'Being tried twice for the same crime after acquittal',
            rationale:
              'Correct. Double jeopardy prevents a person from being tried twice for the same offense.',
            isCorrect: true,
          },
          {
            text: 'Being charged for two different crimes',
            rationale:
              'A person can be charged with multiple crimes; this is not double jeopardy.',
            isCorrect: false,
          },
          {
            text: 'Serving two sentences at once',
            rationale:
              'Concurrent sentences are legal and not related to double jeopardy.',
            isCorrect: false,
          },
          {
            text: 'Having two different attorneys',
            rationale:
              'Having multiple attorneys is not related to double jeopardy.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 12,
        challenge_tags: ['social-1', 'social-3'],
        type: 'text',
        passage:
          'The Seventh Amendment guarantees the right to a jury trial in certain civil cases involving disputes over $20 or more. While $20 was significant in 1791 when the amendment was ratified, courts today interpret this to apply to cases of substantial value adjusted for inflation.',
        question:
          'In what type of case does the Seventh Amendment guarantee a jury trial?',
        answerOptions: [
          {
            text: 'All criminal cases',
            rationale:
              'Criminal jury trials are guaranteed by the Sixth Amendment, not the Seventh.',
            isCorrect: false,
          },
          {
            text: 'Civil cases involving disputes over money',
            rationale:
              'Correct. The Seventh Amendment provides for jury trials in civil cases.',
            isCorrect: true,
          },
          {
            text: 'Only capital murder cases',
            rationale:
              'The Seventh Amendment deals with civil, not criminal, cases.',
            isCorrect: false,
          },
          {
            text: 'Cases involving the federal government only',
            rationale:
              'The Seventh Amendment applies to federal civil cases generally, not just those involving the government.',
            isCorrect: false,
          },
        ],
      },
    ],
  },
};

// ============================================================================
// SCIENCE CHEMISTRY EXPANSIONS
// ============================================================================

const SCIENCE_CHEMISTRY_QUIZZES = {
  // Topic: Chemical Equations & Balancing
  sci_chem_equations_quiz1: {
    id: 'sci_chem_equations_quiz1',
    label: 'Chemical Equations & Balancing',
    description:
      'Understanding and balancing chemical equations with proper coefficients.',
    questions: [
      {
        questionNumber: 1,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'A chemical equation shows the reactants (starting substances) and products (ending substances) in a chemical reaction. The Law of Conservation of Mass states that matter cannot be created or destroyed, so the number of atoms of each element must be the same on both sides of the equation. Coefficients are used to balance equations.',
        question:
          'Balance the following equation: $\\text{H}_2 + \\text{O}_2 \\rightarrow \\text{H}_2\\text{O}$',
        answerOptions: [
          {
            text: '$\\text{H}_2 + \\text{O}_2 \\rightarrow \\text{H}_2\\text{O}$',
            rationale:
              'This equation is not balanced. There are 2 oxygen atoms on the left but only 1 on the right.',
            isCorrect: false,
          },
          {
            text: '$2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}$',
            rationale:
              'Correct. This balanced equation has 4 hydrogen atoms and 2 oxygen atoms on each side.',
            isCorrect: true,
          },
          {
            text: '$\\text{H}_2 + 2\\text{O}_2 \\rightarrow \\text{H}_2\\text{O}_2$',
            rationale:
              'This changes the product to hydrogen peroxide, not water, and is still unbalanced.',
            isCorrect: false,
          },
          {
            text: '$4\\text{H}_2 + 2\\text{O}_2 \\rightarrow 4\\text{H}_2\\text{O}$',
            rationale:
              'While balanced, this uses unnecessarily large coefficients. The simplest ratio is preferred.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 2,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question:
          'In the balanced equation $2\\text{Na} + \\text{Cl}_2 \\rightarrow 2\\text{NaCl}$, what is the coefficient for sodium chloride (NaCl)?',
        answerOptions: [
          {
            text: '1',
            rationale: 'The coefficient is explicitly written as 2.',
            isCorrect: false,
          },
          {
            text: '2',
            rationale:
              'Correct. The coefficient 2 in front of NaCl indicates 2 molecules of sodium chloride are produced.',
            isCorrect: true,
          },
          {
            text: '3',
            rationale: 'This is not the coefficient shown in the equation.',
            isCorrect: false,
          },
          {
            text: '4',
            rationale: 'This is not the coefficient shown in the equation.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 3,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'Combustion reactions occur when a substance reacts with oxygen to produce heat and light. Hydrocarbon combustion produces carbon dioxide and water. For example, methane burning: $\\text{CH}_4 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
        question:
          'Balance the combustion equation for methane: $\\text{CH}_4 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
        answerOptions: [
          {
            text: '$\\text{CH}_4 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
            rationale:
              'Unbalanced: 4 H on left, 2 H on right; 2 O on left, 3 O on right.',
            isCorrect: false,
          },
          {
            text: '$\\text{CH}_4 + 2\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$',
            rationale:
              'Correct. 1 C, 4 H, and 4 O on each side. This represents complete combustion.',
            isCorrect: true,
          },
          {
            text: '$2\\text{CH}_4 + 3\\text{O}_2 \\rightarrow 2\\text{CO}_2 + 4\\text{H}_2\\text{O}$',
            rationale:
              'While balanced, this is not the simplest whole-number ratio.',
            isCorrect: false,
          },
          {
            text: '$\\text{CH}_4 + 3\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}$',
            rationale:
              'Unbalanced: 6 oxygen atoms on left but only 4 on right.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 4,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question:
          'Which type of reaction is represented by $\\text{AB} \\rightarrow \\text{A} + \\text{B}$?',
        answerOptions: [
          {
            text: 'Synthesis',
            rationale:
              'Synthesis combines elements: $\\text{A} + \\text{B} \\rightarrow \\text{AB}$',
            isCorrect: false,
          },
          {
            text: 'Decomposition',
            rationale:
              'Correct. Decomposition breaks down a compound into simpler substances.',
            isCorrect: true,
          },
          {
            text: 'Single replacement',
            rationale:
              'Single replacement: $\\text{A} + \\text{BC} \\rightarrow \\text{AC} + \\text{B}$',
            isCorrect: false,
          },
          {
            text: 'Double replacement',
            rationale:
              'Double replacement: $\\text{AB} + \\text{CD} \\rightarrow \\text{AD} + \\text{CB}$',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 5,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'In a synthesis reaction, two or more simple substances combine to form a more complex product. For example, when iron reacts with sulfur: $\\text{Fe} + \\text{S} \\rightarrow \\text{FeS}$. When aluminum reacts with oxygen, aluminum oxide is formed.',
        question:
          'Balance the synthesis reaction: $\\text{Al} + \\text{O}_2 \\rightarrow \\text{Al}_2\\text{O}_3$',
        answerOptions: [
          {
            text: '$\\text{Al} + \\text{O}_2 \\rightarrow \\text{Al}_2\\text{O}_3$',
            rationale:
              'Unbalanced: 2 Al on right vs 1 on left; 3 O on right vs 2 on left.',
            isCorrect: false,
          },
          {
            text: '$2\\text{Al} + 3\\text{O}_2 \\rightarrow \\text{Al}_2\\text{O}_3$',
            rationale: 'Close, but unbalanced: 6 O on left vs 3 O on right.',
            isCorrect: false,
          },
          {
            text: '$4\\text{Al} + 3\\text{O}_2 \\rightarrow 2\\text{Al}_2\\text{O}_3$',
            rationale: 'Correct. 4 Al and 6 O on each side.',
            isCorrect: true,
          },
          {
            text: '$2\\text{Al} + \\text{O}_2 \\rightarrow 2\\text{Al}_2\\text{O}_3$',
            rationale: 'Unbalanced: 2 Al on left vs 4 Al on right.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 6,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question:
          'In the equation $\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3$, how many total atoms are on the reactant side?',
        answerOptions: [
          {
            text: '4 atoms',
            rationale: 'This only counts the molecules, not all atoms.',
            isCorrect: false,
          },
          {
            text: '5 atoms',
            rationale: 'Incorrect count.',
            isCorrect: false,
          },
          {
            text: '8 atoms',
            rationale:
              'Correct. 2 N atoms (from $\\text{N}_2$) + 6 H atoms (from $3\\text{H}_2$) = 8 total atoms.',
            isCorrect: true,
          },
          {
            text: '10 atoms',
            rationale: 'Overcount.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 7,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'When calcium carbonate (limestone) is heated, it decomposes into calcium oxide and carbon dioxide gas. This is an example of a decomposition reaction where heat energy breaks chemical bonds. The equation is: $\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2$',
        question:
          'Is the decomposition of calcium carbonate equation balanced as written?',
        answerOptions: [
          {
            text: 'No, it needs a coefficient of 2 for $\\text{CaO}$',
            rationale: 'Adding this coefficient would create an imbalance.',
            isCorrect: false,
          },
          {
            text: 'No, it needs a coefficient of 2 for $\\text{CO}_2$',
            rationale:
              'This would create more carbon atoms than present in the reactant.',
            isCorrect: false,
          },
          {
            text: 'Yes, it is already balanced',
            rationale: 'Correct. 1 Ca, 1 C, and 3 O on each side.',
            isCorrect: true,
          },
          {
            text: 'No, it needs a coefficient of 2 for $\\text{CaCO}_3$',
            rationale:
              'This would double the reactants without balancing products.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 8,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question: 'In a single replacement reaction, what happens?',
        answerOptions: [
          {
            text: 'Two compounds exchange parts',
            rationale: 'This describes a double replacement reaction.',
            isCorrect: false,
          },
          {
            text: 'One element replaces another in a compound',
            rationale:
              'Correct. Pattern: $\\text{A} + \\text{BC} \\rightarrow \\text{AC} + \\text{B}$',
            isCorrect: true,
          },
          {
            text: 'A compound breaks into elements',
            rationale: 'This describes decomposition.',
            isCorrect: false,
          },
          {
            text: 'Elements combine to form a compound',
            rationale: 'This describes synthesis.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 9,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'Photosynthesis in plants can be represented by the equation: $6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\rightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$. This shows carbon dioxide and water combining to form glucose and oxygen using light energy.',
        question:
          'How many oxygen atoms are on the reactant side of the photosynthesis equation?',
        answerOptions: [
          {
            text: '6',
            rationale: 'This only counts oxygen from one reactant.',
            isCorrect: false,
          },
          {
            text: '12',
            rationale: 'This is close but undercounts.',
            isCorrect: false,
          },
          {
            text: '18',
            rationale:
              'Correct. $6\\text{CO}_2$ has 12 O atoms and $6\\text{H}_2\\text{O}$ has 6 O atoms: 12 + 6 = 18.',
            isCorrect: true,
          },
          {
            text: '24',
            rationale: 'This is an overcount.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 10,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question:
          'Balance: $\\text{Fe} + \\text{O}_2 \\rightarrow \\text{Fe}_2\\text{O}_3$',
        answerOptions: [
          {
            text: '$\\text{Fe} + \\text{O}_2 \\rightarrow \\text{Fe}_2\\text{O}_3$',
            rationale: 'Unbalanced.',
            isCorrect: false,
          },
          {
            text: '$2\\text{Fe} + 3\\text{O}_2 \\rightarrow \\text{Fe}_2\\text{O}_3$',
            rationale: 'Unbalanced: 6 O on left, 3 O on right.',
            isCorrect: false,
          },
          {
            text: '$4\\text{Fe} + 3\\text{O}_2 \\rightarrow 2\\text{Fe}_2\\text{O}_3$',
            rationale: 'Correct. 4 Fe and 6 O on each side.',
            isCorrect: true,
          },
          {
            text: '$3\\text{Fe} + 2\\text{O}_2 \\rightarrow \\text{Fe}_2\\text{O}_3$',
            rationale: 'Unbalanced.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 11,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'Cellular respiration is the reverse of photosynthesis. Glucose combines with oxygen to release energy, producing carbon dioxide and water: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
        question:
          'Balance the cellular respiration equation: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
        answerOptions: [
          {
            text: '$\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$',
            rationale: 'Unbalanced.',
            isCorrect: false,
          },
          {
            text: '$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O}$',
            rationale: 'Correct. 6 C, 12 H, and 18 O on each side.',
            isCorrect: true,
          },
          {
            text: '$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 3\\text{O}_2 \\rightarrow 3\\text{CO}_2 + 3\\text{H}_2\\text{O}$',
            rationale: 'Unbalanced: 6 C on left vs 3 C on right.',
            isCorrect: false,
          },
          {
            text: '$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 12\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 12\\text{H}_2\\text{O}$',
            rationale: 'Unbalanced: too many oxygen atoms on the left.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 12,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question: 'What does it mean if a chemical equation is balanced?',
        answerOptions: [
          {
            text: 'The reactants and products have the same mass',
            rationale:
              'While true due to conservation of mass, this doesn\'t describe what "balanced" specifically means.',
            isCorrect: false,
          },
          {
            text: 'The same number of atoms of each element appears on both sides',
            rationale:
              'Correct. A balanced equation has equal numbers of each type of atom on both sides.',
            isCorrect: true,
          },
          {
            text: 'The coefficients are all the same number',
            rationale:
              'Coefficients can be different; they just must balance the atoms.',
            isCorrect: false,
          },
          {
            text: 'There are the same number of molecules on each side',
            rationale:
              "Molecule count can differ; it's the atom count that must match.",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  sci_chem_equations_quiz2: {
    id: 'sci_chem_equations_quiz2',
    label: 'Reaction Types & Stoichiometry',
    description: 'Classifying reactions and understanding mole ratios.',
    questions: [
      {
        questionNumber: 1,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'Stoichiometry involves calculating quantities in chemical reactions using mole ratios from balanced equations. For example, in $2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}$, the ratio of hydrogen to oxygen is 2:1.',
        question:
          'According to the equation $2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}$, how many moles of water are produced from 4 moles of hydrogen?',
        answerOptions: [
          {
            text: '2 moles',
            rationale:
              'This would be true if only 2 moles of hydrogen reacted.',
            isCorrect: false,
          },
          {
            text: '4 moles',
            rationale:
              'Correct. The ratio is 2:2, so 4 moles $\\text{H}_2$ produces 4 moles $\\text{H}_2\\text{O}$.',
            isCorrect: true,
          },
          {
            text: '6 moles',
            rationale: 'This exceeds the stoichiometric ratio.',
            isCorrect: false,
          },
          {
            text: '8 moles',
            rationale: 'This greatly exceeds the ratio.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 2,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question:
          'Classify this reaction: $\\text{Zn} + \\text{CuSO}_4 \\rightarrow \\text{ZnSO}_4 + \\text{Cu}$',
        answerOptions: [
          {
            text: 'Synthesis',
            rationale: 'Synthesis combines simpler substances.',
            isCorrect: false,
          },
          {
            text: 'Decomposition',
            rationale: 'Decomposition breaks down a compound.',
            isCorrect: false,
          },
          {
            text: 'Single replacement',
            rationale: 'Correct. Zinc replaces copper in the compound.',
            isCorrect: true,
          },
          {
            text: 'Double replacement',
            rationale: 'Only one replacement occurs here.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 3,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'In neutralization reactions, an acid reacts with a base to form salt and water. For example: $\\text{HCl} + \\text{NaOH} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$. This is a type of double replacement reaction.',
        question:
          'How many moles of water are produced when 2 moles of HCl react completely with NaOH?',
        answerOptions: [
          {
            text: '1 mole',
            rationale: 'This ratio is incorrect.',
            isCorrect: false,
          },
          {
            text: '2 moles',
            rationale:
              'Correct. The ratio is 1:1, so 2 moles HCl produces 2 moles $\\text{H}_2\\text{O}$.',
            isCorrect: true,
          },
          {
            text: '3 moles',
            rationale: 'This exceeds the stoichiometric ratio.',
            isCorrect: false,
          },
          {
            text: '4 moles',
            rationale: 'This exceeds the stoichiometric ratio.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 4,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question:
          'Classify: $\\text{AgNO}_3 + \\text{NaCl} \\rightarrow \\text{AgCl} + \\text{NaNO}_3$',
        answerOptions: [
          {
            text: 'Synthesis',
            rationale: 'Not combining into one compound.',
            isCorrect: false,
          },
          {
            text: 'Decomposition',
            rationale: 'Not breaking down; rearranging.',
            isCorrect: false,
          },
          {
            text: 'Single replacement',
            rationale: 'Two exchanges occur, not one.',
            isCorrect: false,
          },
          {
            text: 'Double replacement',
            rationale:
              'Correct. $\\text{Ag}^+$ and $\\text{Na}^+$ exchange places.',
            isCorrect: true,
          },
        ],
      },
      {
        questionNumber: 5,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'The limiting reactant is the substance that is completely consumed first in a reaction, limiting the amount of product formed. In $\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3$, if you have 1 mole of $\\text{N}_2$ and 2 moles of $\\text{H}_2$, hydrogen is limiting because you need 3 moles.',
        question:
          'In the reaction above, how many moles of $\\text{NH}_3$ can be produced with 1 mole $\\text{N}_2$ and 2 moles $\\text{H}_2$?',
        answerOptions: [
          {
            text: '1 mole',
            rationale: 'More can be produced.',
            isCorrect: false,
          },
          {
            text: '1.33 moles',
            rationale:
              'Correct. 2 moles $\\text{H}_2$ ÷ 3 = 0.67 mole sets × 2 $\\text{NH}_3$ = 1.33 moles.',
            isCorrect: true,
          },
          {
            text: '2 moles',
            rationale: 'This would require 3 moles of $\\text{H}_2$.',
            isCorrect: false,
          },
          {
            text: '3 moles',
            rationale: 'Not enough reactants for this.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 6,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question:
          'What is the coefficient ratio of reactants in: $\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\rightarrow 3\\text{CO}_2 + 4\\text{H}_2\\text{O}$?',
        answerOptions: [
          {
            text: '1:5',
            rationale: 'Correct. Propane to oxygen ratio is 1:5.',
            isCorrect: true,
          },
          {
            text: '1:3',
            rationale: 'This is not the reactant ratio.',
            isCorrect: false,
          },
          {
            text: '3:4',
            rationale: 'This is the product ratio.',
            isCorrect: false,
          },
          {
            text: '5:8',
            rationale: "This ratio doesn't match the equation.",
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 7,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'Percent yield compares actual yield to theoretical yield: $\\text{Percent yield} = \\frac{\\text{actual}}{\\text{theoretical}} \\times 100\\%$. If a reaction should produce 10 g but only produces 8 g, the percent yield is 80%.',
        question:
          'A reaction has a theoretical yield of 25 grams but produces 20 grams. What is the percent yield?',
        answerOptions: [
          {
            text: '75%',
            rationale: 'Incorrect calculation.',
            isCorrect: false,
          },
          {
            text: '80%',
            rationale: 'Correct. $20 \\div 25 \\times 100 = 80\\%$',
            isCorrect: true,
          },
          {
            text: '85%',
            rationale: 'Incorrect calculation.',
            isCorrect: false,
          },
          {
            text: '125%',
            rationale: 'Percent yield cannot exceed 100% in ideal conditions.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 8,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question: 'Endothermic reactions:',
        answerOptions: [
          {
            text: 'Release energy to surroundings',
            rationale: 'This describes exothermic reactions.',
            isCorrect: false,
          },
          {
            text: 'Absorb energy from surroundings',
            rationale: 'Correct. Endothermic reactions require energy input.',
            isCorrect: true,
          },
          {
            text: 'Have no energy change',
            rationale: 'All reactions involve energy changes.',
            isCorrect: false,
          },
          {
            text: 'Only occur at high temperatures',
            rationale:
              'Endothermic reactions can occur at various temperatures.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 9,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'In $2\\text{Al} + 3\\text{Cl}_2 \\rightarrow 2\\text{AlCl}_3$, aluminum reacts with chlorine gas to form aluminum chloride. The mole ratio shows that 2 moles of aluminum require 3 moles of chlorine.',
        question:
          'How many moles of chlorine are needed to react with 6 moles of aluminum?',
        answerOptions: [
          {
            text: '4 moles',
            rationale: "This doesn't match the 2:3 ratio.",
            isCorrect: false,
          },
          {
            text: '6 moles',
            rationale: 'This would be a 1:1 ratio.',
            isCorrect: false,
          },
          {
            text: '9 moles',
            rationale:
              'Correct. $6 \\text{ mol Al} \\times \\frac{3 \\text{ mol Cl}_2}{2 \\text{ mol Al}} = 9 \\text{ mol Cl}_2$',
            isCorrect: true,
          },
          {
            text: '12 moles',
            rationale: 'This exceeds the required ratio.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 10,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question: 'Exothermic reactions:',
        answerOptions: [
          {
            text: 'Absorb heat from surroundings',
            rationale: 'This describes endothermic reactions.',
            isCorrect: false,
          },
          {
            text: 'Release heat to surroundings',
            rationale: 'Correct. Combustion is a common exothermic reaction.',
            isCorrect: true,
          },
          {
            text: 'Require continuous energy input',
            rationale: 'Exothermic reactions release energy.',
            isCorrect: false,
          },
          {
            text: 'Never occur spontaneously',
            rationale: 'Many exothermic reactions occur spontaneously.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 11,
        challenge_tags: ['science-2', 'science-4'],
        type: 'text',
        passage:
          'Molar mass is the mass of one mole of a substance in grams. For $\\text{H}_2\\text{O}$: H = 1 g/mol × 2 = 2 g/mol, O = 16 g/mol × 1 = 16 g/mol. Total molar mass = 18 g/mol.',
        question:
          'What is the molar mass of $\\text{CO}_2$? (C = 12 g/mol, O = 16 g/mol)',
        answerOptions: [
          {
            text: '28 g/mol',
            rationale: 'This only includes one oxygen.',
            isCorrect: false,
          },
          {
            text: '32 g/mol',
            rationale: 'This is only the oxygen contribution.',
            isCorrect: false,
          },
          {
            text: '44 g/mol',
            rationale: 'Correct. 12 + (16 × 2) = 12 + 32 = 44 g/mol.',
            isCorrect: true,
          },
          {
            text: '60 g/mol',
            rationale: 'This is an overcount.',
            isCorrect: false,
          },
        ],
      },
      {
        questionNumber: 12,
        challenge_tags: ['science-2'],
        type: 'knowledge',
        question: 'A catalyst:',
        answerOptions: [
          {
            text: 'Is consumed in the reaction',
            rationale: 'Catalysts are not consumed; they can be reused.',
            isCorrect: false,
          },
          {
            text: 'Speeds up a reaction without being consumed',
            rationale:
              'Correct. Catalysts lower activation energy and can be recovered.',
            isCorrect: true,
          },
          {
            text: 'Slows down a reaction',
            rationale: 'This describes an inhibitor, not a catalyst.',
            isCorrect: false,
          },
          {
            text: 'Changes the products of a reaction',
            rationale: "Catalysts don't change products, only reaction rate.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};

// Export note: In actual implementation, these would be inserted into AppData
// at the appropriate locations within the Science Physical Science categories.

module.exports = {
  SOCIAL_STUDIES_CIVICS_QUIZZES,
  SCIENCE_CHEMISTRY_QUIZZES,
  // Additional quiz sets would be exported here
};
