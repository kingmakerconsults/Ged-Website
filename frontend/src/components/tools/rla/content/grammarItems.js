export const GRAMMAR_ITEMS = [
  {
    id: 'g1',
    prompt: 'Choose the sentence with correct subject-verb agreement.',
    options: [
      {
        text: 'The list of approved candidates were posted yesterday.',
        correct: false,
        rationale: '"List" is singular, so the verb should be "was".',
      },
      {
        text: 'The list of approved candidates was posted yesterday.',
        correct: true,
        rationale:
          'Correct. The simple subject "list" is singular and takes "was".',
      },
      {
        text: 'The list of approved candidates have been posted yesterday.',
        correct: false,
        rationale: '"Have" agrees with a plural subject; "list" is singular.',
      },
      {
        text: 'The list of approved candidates are posted yesterday.',
        correct: false,
        rationale: '"Are" is plural; "list" is singular.',
      },
    ],
  },
  {
    id: 'g2',
    prompt: 'Which sentence uses the correct pronoun?',
    options: [
      {
        text: 'The supervisor gave the new schedule to Maya and I.',
        correct: false,
        rationale: 'After a preposition, use the object form "me".',
      },
      {
        text: 'The supervisor gave the new schedule to Maya and me.',
        correct: true,
        rationale: 'Correct. "Me" is the object of the preposition "to".',
      },
      {
        text: 'The supervisor gave the new schedule to myself and Maya.',
        correct: false,
        rationale:
          '"Myself" is reflexive and needs an antecedent in the same clause.',
      },
      {
        text: 'The supervisor gave the new schedule to I and Maya.',
        correct: false,
        rationale: 'Same problem as A; "I" is a subject pronoun.',
      },
    ],
  },
  {
    id: 'g3',
    prompt: 'Which sentence uses parallel structure correctly?',
    options: [
      {
        text: 'The training covered budgeting, communicating, and how to manage time.',
        correct: false,
        rationale: 'Mixes gerunds with an infinitive phrase.',
      },
      {
        text: 'The training covered budgeting, communication, and time management.',
        correct: true,
        rationale: 'Correct. All three items are noun phrases.',
      },
      {
        text: 'The training covered to budget, communication, and time management.',
        correct: false,
        rationale: 'Mixes infinitive and noun phrases.',
      },
      {
        text: 'The training covered budgeting, to communicate, and managed time.',
        correct: false,
        rationale: 'Mixes three different forms.',
      },
    ],
  },
  {
    id: 'g4',
    prompt: 'Choose the sentence with the modifier placed correctly.',
    options: [
      {
        text: 'Walking to work, the rain soaked my jacket.',
        correct: false,
        rationale: 'Dangling modifier — the rain was not walking.',
      },
      {
        text: 'Walking to work, I felt the rain soak my jacket.',
        correct: true,
        rationale:
          'Correct. "I" is the one walking, so the modifier attaches properly.',
      },
      {
        text: 'The rain soaked my jacket walking to work.',
        correct: false,
        rationale: 'Misplaced modifier; sounds like the jacket was walking.',
      },
      {
        text: 'My jacket was soaked walking to work by the rain.',
        correct: false,
        rationale: 'Awkward and still implies the jacket was walking.',
      },
    ],
  },
  {
    id: 'g5',
    prompt: 'Which sentence uses commas correctly?',
    options: [
      {
        text: 'After the meeting ended we, walked to the parking lot.',
        correct: false,
        rationale: 'Comma is misplaced inside the main clause.',
      },
      {
        text: 'After the meeting ended, we walked to the parking lot.',
        correct: true,
        rationale: 'Correct. A comma follows an introductory dependent clause.',
      },
      {
        text: 'After the meeting, ended we walked to the parking lot.',
        correct: false,
        rationale: 'Comma breaks the introductory phrase incorrectly.',
      },
      {
        text: 'After the meeting ended we walked, to the parking lot.',
        correct: false,
        rationale: 'No comma is needed before the prepositional phrase.',
      },
    ],
  },
  {
    id: 'g6',
    prompt: 'Which sentence is free of a comma splice?',
    options: [
      {
        text: 'The bus arrived early, the riders were still inside.',
        correct: false,
        rationale:
          'Comma splice — two independent clauses joined by only a comma.',
      },
      {
        text: 'The bus arrived early; the riders were still inside.',
        correct: true,
        rationale:
          'Correct. A semicolon properly joins the two independent clauses.',
      },
      {
        text: 'The bus arrived early the riders were still inside.',
        correct: false,
        rationale: 'Run-on sentence with no punctuation between clauses.',
      },
      {
        text: 'The bus arrived early, but, the riders were still inside.',
        correct: false,
        rationale: 'Extra comma after "but" is incorrect.',
      },
    ],
  },
  {
    id: 'g7',
    prompt:
      'Which verb tense matches the rest of the sentence? "By the time the supervisor arrived, the team ___ the report."',
    options: [
      {
        text: 'finished',
        correct: false,
        rationale:
          'Past tense alone does not show that the action was completed before another past event.',
      },
      {
        text: 'had finished',
        correct: true,
        rationale:
          'Correct. Past perfect shows action completed before "arrived".',
      },
      {
        text: 'has finished',
        correct: false,
        rationale: 'Present perfect does not fit a past timeline.',
      },
      {
        text: 'will have finished',
        correct: false,
        rationale: 'Future perfect does not fit a past timeline.',
      },
    ],
  },
  {
    id: 'g8',
    prompt: 'Choose the sentence with correct apostrophe use.',
    options: [
      {
        text: 'The companys policies are posted in the breakroom.',
        correct: false,
        rationale: 'Missing possessive apostrophe.',
      },
      {
        text: 'The company\u2019s policies are posted in the breakroom.',
        correct: true,
        rationale: 'Correct singular possessive.',
      },
      {
        text: 'The companies\u2019 policies are posted in the breakroom.',
        correct: false,
        rationale: 'Plural possessive implies more than one company.',
      },
      {
        text: 'The company\u2019s policy\u2019s are posted in the breakroom.',
        correct: false,
        rationale: '"Policy\u2019s" is incorrect; the plural is "policies".',
      },
    ],
  },
  {
    id: 'g9',
    prompt: 'Which sentence uses the correct word?',
    options: [
      {
        text: 'The new policy will effect every department.',
        correct: false,
        rationale: '"Effect" is usually a noun; the verb here is "affect".',
      },
      {
        text: 'The new policy will affect every department.',
        correct: true,
        rationale: 'Correct. "Affect" is the verb meaning to influence.',
      },
      {
        text: 'The new policy will affects every department.',
        correct: false,
        rationale: 'Subject-verb agreement error after "will".',
      },
      {
        text: 'The new policy will effects every department.',
        correct: false,
        rationale: 'Same problems as A and C combined.',
      },
    ],
  },
  {
    id: 'g10',
    prompt: 'Identify the sentence with the correct conjunction usage.',
    options: [
      {
        text: 'I wanted to attend the workshop, however, I had a doctor\u2019s appointment.',
        correct: false,
        rationale:
          '"However" is a conjunctive adverb; it needs a semicolon before it.',
      },
      {
        text: 'I wanted to attend the workshop; however, I had a doctor\u2019s appointment.',
        correct: true,
        rationale: 'Correct. Semicolon before "however," comma after.',
      },
      {
        text: 'I wanted to attend the workshop however I had a doctor\u2019s appointment.',
        correct: false,
        rationale: 'No punctuation around "however" creates a run-on.',
      },
      {
        text: 'I wanted to attend the workshop, but however, I had a doctor\u2019s appointment.',
        correct: false,
        rationale: 'Doubles up the conjunction unnecessarily.',
      },
    ],
  },
  {
    id: 'g11',
    prompt: 'Choose the sentence with correct capitalization.',
    options: [
      {
        text: 'We met at the corner of Oak street and main avenue.',
        correct: false,
        rationale:
          '"Street" and "Avenue" are part of proper names and should be capitalized.',
      },
      {
        text: 'We met at the corner of Oak Street and Main Avenue.',
        correct: true,
        rationale: 'Correct. Both street names are fully capitalized.',
      },
      {
        text: 'We met at the Corner of oak street and Main avenue.',
        correct: false,
        rationale:
          '"Corner" is not a proper noun; capitalization is inconsistent.',
      },
      {
        text: 'We met at the corner of oak street and main avenue.',
        correct: false,
        rationale: 'Proper street names need capitalization.',
      },
    ],
  },
  {
    id: 'g12',
    prompt: 'Which option correctly uses a colon?',
    options: [
      {
        text: 'You will need three things: a notebook, a pen, and a quiet space.',
        correct: true,
        rationale:
          'Correct. The colon follows a complete clause and introduces a list.',
      },
      {
        text: 'You will need: a notebook, a pen, and a quiet space.',
        correct: false,
        rationale: 'A colon should not break a verb from its objects.',
      },
      {
        text: 'You will need three things, a notebook, a pen, and a quiet space.',
        correct: false,
        rationale: 'Replace the comma with a colon to introduce the list.',
      },
      {
        text: 'You will need; three things; a notebook, a pen, and a quiet space.',
        correct: false,
        rationale: 'Semicolons are used incorrectly in place of a colon.',
      },
    ],
  },
  {
    id: 'g13',
    prompt: 'Choose the sentence that avoids a double negative.',
    options: [
      {
        text: 'I don\u2019t need no help finishing the form.',
        correct: false,
        rationale: 'Double negative.',
      },
      {
        text: 'I don\u2019t need any help finishing the form.',
        correct: true,
        rationale: 'Correct. "Any" pairs properly with "don\u2019t".',
      },
      {
        text: 'I don\u2019t hardly need any help finishing the form.',
        correct: false,
        rationale: '"Hardly" combined with "don\u2019t" is a double negative.',
      },
      {
        text: 'I don\u2019t never need help finishing the form.',
        correct: false,
        rationale: 'Double negative again.',
      },
    ],
  },
  {
    id: 'g14',
    prompt: 'Which sentence keeps verb tense consistent?',
    options: [
      {
        text: 'When the lecture ended, the students stand and applaud.',
        correct: false,
        rationale: 'Shifts from past to present.',
      },
      {
        text: 'When the lecture ended, the students stood and applauded.',
        correct: true,
        rationale: 'Correct. Both verbs are past tense.',
      },
      {
        text: 'When the lecture ends, the students stood and applauded.',
        correct: false,
        rationale: 'Shifts from present to past.',
      },
      {
        text: 'When the lecture ends, the students stand and applauded.',
        correct: false,
        rationale: 'Inconsistent across all three verbs.',
      },
    ],
  },
  {
    id: 'g15',
    prompt: 'Choose the sentence with correctly used quotation marks.',
    options: [
      {
        text: 'The supervisor said, "the new policy starts Monday".',
        correct: false,
        rationale:
          'Period belongs inside the closing quotation mark; opening word should be capitalized.',
      },
      {
        text: 'The supervisor said, "The new policy starts Monday."',
        correct: true,
        rationale:
          'Correct. Capitalized first word and period inside the quotes.',
      },
      {
        text: 'The supervisor said "The new policy starts Monday."',
        correct: false,
        rationale: 'Missing comma before the quotation.',
      },
      {
        text: 'The supervisor said, "The new policy starts Monday".',
        correct: false,
        rationale: 'Period belongs inside the quotation marks in U.S. style.',
      },
    ],
  },
];
