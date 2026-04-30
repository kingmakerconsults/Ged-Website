export const PUNCTUATION_ITEMS = [
  {
    id: 'p1',
    prompt: 'Choose the version with correct comma usage.',
    options: [
      {
        text: 'Before we leave the building please double check that all of the windows are closed.',
        correct: false,
        rationale: 'Missing comma after the introductory clause.',
      },
      {
        text: 'Before we leave the building, please double check that all of the windows are closed.',
        correct: true,
        rationale: 'Correct. Comma sets off the introductory clause.',
      },
      {
        text: 'Before we leave, the building please double check that all of the windows are closed.',
        correct: false,
        rationale: 'Comma is misplaced inside the noun phrase.',
      },
      {
        text: 'Before we leave the building please, double check that all of the windows are closed.',
        correct: false,
        rationale: 'Comma falls in the wrong spot.',
      },
    ],
  },
  {
    id: 'p2',
    prompt: 'Pick the correctly punctuated sentence.',
    options: [
      {
        text: 'My brother who lives in Denver is a paramedic.',
        correct: false,
        rationale: 'Missing commas around the nonrestrictive clause.',
      },
      {
        text: 'My brother, who lives in Denver, is a paramedic.',
        correct: true,
        rationale:
          'Correct. Commas set off the nonrestrictive relative clause.',
      },
      {
        text: 'My brother, who lives in Denver is a paramedic.',
        correct: false,
        rationale: 'Missing the second comma.',
      },
      {
        text: 'My brother who lives in Denver, is a paramedic.',
        correct: false,
        rationale: 'Comma is unbalanced.',
      },
    ],
  },
  {
    id: 'p3',
    prompt: 'Which sentence uses the semicolon correctly?',
    options: [
      {
        text: 'The deadline is Friday; please submit your forms early.',
        correct: true,
        rationale: 'Correct. Joins two related independent clauses.',
      },
      {
        text: 'The deadline is Friday; and please submit your forms early.',
        correct: false,
        rationale:
          'Do not use both a semicolon and a coordinating conjunction.',
      },
      {
        text: 'The deadline is Friday, please; submit your forms early.',
        correct: false,
        rationale: 'Semicolon is misplaced inside the second clause.',
      },
      {
        text: 'The deadline; is Friday, please submit your forms early.',
        correct: false,
        rationale: 'Semicolon should not separate subject from verb.',
      },
    ],
  },
  {
    id: 'p4',
    prompt: 'Which sentence uses an apostrophe correctly?',
    options: [
      {
        text: 'The buses\u2019 schedule changes every Sunday.',
        correct: false,
        rationale:
          'Plural possessive implies multiple buses sharing one schedule.',
      },
      {
        text: 'The bus\u2019s schedule changes every Sunday.',
        correct: true,
        rationale: 'Correct singular possessive.',
      },
      {
        text: 'The buses schedule changes every Sunday.',
        correct: false,
        rationale: 'Missing apostrophe entirely.',
      },
      {
        text: 'The bus schedule\u2019s change every Sunday.',
        correct: false,
        rationale:
          'Apostrophe attached to the wrong word and verb agreement is off.',
      },
    ],
  },
  {
    id: 'p5',
    prompt: 'Choose the correct version.',
    options: [
      {
        text: 'However we plan the route we still need a backup driver.',
        correct: false,
        rationale: 'Missing comma after introductory dependent clause.',
      },
      {
        text: 'However we plan the route, we still need a backup driver.',
        correct: true,
        rationale: 'Correct. Comma after the introductory clause.',
      },
      {
        text: 'However, we plan the route we still need a backup driver.',
        correct: false,
        rationale:
          'Misreads "however" as a conjunctive adverb instead of part of the clause.',
      },
      {
        text: 'However we plan, the route we still need a backup driver.',
        correct: false,
        rationale: 'Comma misplaced in the middle of the dependent clause.',
      },
    ],
  },
  {
    id: 'p6',
    prompt: 'Which sentence punctuates the list correctly?',
    options: [
      {
        text: 'The kit includes a flashlight, batteries, a whistle and a map.',
        correct: false,
        rationale:
          'GED standard prefers the Oxford (serial) comma before "and".',
      },
      {
        text: 'The kit includes a flashlight, batteries, a whistle, and a map.',
        correct: true,
        rationale: 'Correct. Serial comma keeps the list unambiguous.',
      },
      {
        text: 'The kit includes; a flashlight, batteries, a whistle, and a map.',
        correct: false,
        rationale: 'Semicolon should not introduce the list after a verb.',
      },
      {
        text: 'The kit includes, a flashlight batteries a whistle and a map.',
        correct: false,
        rationale: 'Random comma after "includes" and missing internal commas.',
      },
    ],
  },
  {
    id: 'p7',
    prompt: 'Pick the correctly punctuated quotation.',
    options: [
      {
        text: 'The coach said we should "leave on time".',
        correct: false,
        rationale:
          'Period belongs inside the closing quotation mark in U.S. style.',
      },
      {
        text: 'The coach said we should "leave on time."',
        correct: true,
        rationale: 'Correct. Period inside the quotation marks.',
      },
      {
        text: 'The coach said we should, "leave on time".',
        correct: false,
        rationale: 'Comma is unnecessary after "should".',
      },
      {
        text: 'The coach said, "we should leave on time".',
        correct: false,
        rationale:
          'First word of the quote should be capitalized and period should be inside.',
      },
    ],
  },
  {
    id: 'p8',
    prompt:
      'Which option correctly fixes the comma splice? "The class trip was canceled, the bus had broken down."',
    options: [
      {
        text: 'The class trip was canceled the bus had broken down.',
        correct: false,
        rationale: 'That creates a run-on.',
      },
      {
        text: 'The class trip was canceled; the bus had broken down.',
        correct: true,
        rationale: 'Correct. Semicolon joins two related independent clauses.',
      },
      {
        text: 'The class trip was canceled, and, the bus had broken down.',
        correct: false,
        rationale: 'Extra comma after "and" is wrong.',
      },
      {
        text: 'The class trip, was canceled, the bus had broken down.',
        correct: false,
        rationale: 'Adds an unnecessary comma and keeps the splice.',
      },
    ],
  },
  {
    id: 'p9',
    prompt: 'Choose the version with the correct dash use.',
    options: [
      {
        text: 'Three students\u2014Maya, Jorge, and Liu\u2014won scholarships this year.',
        correct: true,
        rationale: 'Correct. Em dashes set off the nonessential list of names.',
      },
      {
        text: 'Three students-Maya, Jorge, and Liu-won scholarships this year.',
        correct: false,
        rationale: 'Hyphens cannot replace em dashes here.',
      },
      {
        text: 'Three students Maya, Jorge, and Liu won scholarships this year.',
        correct: false,
        rationale: 'Missing the dashes entirely creates ambiguity.',
      },
      {
        text: 'Three students\u2014Maya, Jorge, and Liu won scholarships this year.',
        correct: false,
        rationale: 'Only one dash is used; the second is missing.',
      },
    ],
  },
  {
    id: 'p10',
    prompt: 'Pick the correctly punctuated sentence.',
    options: [
      {
        text: 'Its been a long week for the entire crew.',
        correct: false,
        rationale: 'Missing apostrophe in the contraction "it\u2019s".',
      },
      {
        text: 'It\u2019s been a long week for the entire crew.',
        correct: true,
        rationale: 'Correct contraction of "it has".',
      },
      {
        text: 'Its\u2019 been a long week for the entire crew.',
        correct: false,
        rationale: 'Apostrophe is misplaced after the s.',
      },
      {
        text: 'Its been, a long week for the entire crew.',
        correct: false,
        rationale: 'Inserts a wrong comma and still missing the apostrophe.',
      },
    ],
  },
  {
    id: 'p11',
    prompt: 'Choose the version with correct hyphenation.',
    options: [
      {
        text: 'She gave a well prepared presentation to the board.',
        correct: false,
        rationale: 'Compound modifier before a noun should be hyphenated.',
      },
      {
        text: 'She gave a well-prepared presentation to the board.',
        correct: true,
        rationale:
          'Correct. "Well-prepared" is a compound adjective before "presentation".',
      },
      {
        text: 'She gave a well-prepared-presentation to the board.',
        correct: false,
        rationale: 'Extra hyphen between adjective and noun.',
      },
      {
        text: 'She gave a wellprepared presentation to the board.',
        correct: false,
        rationale: 'Drops the hyphen and runs the words together.',
      },
    ],
  },
  {
    id: 'p12',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      {
        text: 'The library opens early on weekdays it closes by six.',
        correct: false,
        rationale: 'Run-on; needs punctuation between the clauses.',
      },
      {
        text: 'The library opens early on weekdays, but it closes by six.',
        correct: true,
        rationale:
          'Correct. Comma + coordinating conjunction joins the clauses.',
      },
      {
        text: 'The library opens early on weekdays but, it closes by six.',
        correct: false,
        rationale: 'Comma is on the wrong side of "but".',
      },
      {
        text: 'The library opens early on weekdays; but it closes by six.',
        correct: false,
        rationale: 'Do not use both a semicolon and "but".',
      },
    ],
  },
];
