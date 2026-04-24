/**
 * GED Ready-Style Multi-Select Civic & Government Reasoning (Set 2)
 * Questions with multiple correct answers (2-3 correct out of 5-6 options).
 * The frontend auto-detects multi-select via multiple isCorrect: true.
 *
 * Topics: separation of powers, federalism, civil-rights amendments,
 *         voter access barriers
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    multiSelect: true,
    passage:
      'This passage describes the constitutional principle of separation of powers in the U.S. federal government.\n\nThe U.S. Constitution divides federal power among three branches. The <strong>legislative branch</strong> (Congress) writes laws, levies taxes, declares war, and confirms or rejects presidential nominees and treaties. The <strong>executive branch</strong> (the President and federal agencies) carries out laws, commands the armed forces, negotiates treaties, and nominates federal judges. The <strong>judicial branch</strong> (federal courts, headed by the Supreme Court) interprets the laws and the Constitution and decides whether actions of the other branches are constitutional.',
    question:
      'Which of the following are powers of the legislative branch (Congress)? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: 'Confirming presidential nominees to federal courts.',
        rationale:
          'Correct. The passage states Congress "confirms or rejects presidential nominees" — a power of the Senate (a chamber of the legislative branch).',
        isCorrect: true,
      },
      {
        text: 'Commanding the U.S. armed forces in active military operations.',
        rationale:
          'The passage explicitly assigns command of the armed forces to the executive branch (the President as commander in chief).',
        isCorrect: false,
      },
      {
        text: 'Levying taxes on individuals and businesses.',
        rationale:
          'Correct. The passage states the legislative branch "levies taxes."',
        isCorrect: true,
      },
      {
        text: 'Issuing the final ruling on whether a federal law is constitutional.',
        rationale:
          'Final constitutional rulings are a power of the judicial branch (the courts), not Congress.',
        isCorrect: false,
      },
      {
        text: 'Declaring war on another country.',
        rationale:
          'Correct. The passage explicitly lists "declares war" as a power of Congress.',
        isCorrect: true,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Civics & Government',
    contentArea: 'civics',
    multiSelect: true,
    passage:
      'This passage describes federalism in the U.S. political system.\n\nUnder American federalism, governmental powers are divided between the national (federal) government and the state governments. Some powers are <strong>delegated</strong> to the federal government (such as coining money, regulating interstate and foreign commerce, maintaining a standing army, and making treaties). Other powers are <strong>reserved</strong> to the states under the Tenth Amendment (such as conducting elections, establishing local governments, regulating intrastate commerce, and overseeing public education and most policing). A third category of <strong>concurrent</strong> powers — such as taxing, borrowing, building roads, and creating courts — is exercised by both levels of government.',
    question:
      'Which of the following are powers reserved to the states (rather than delegated exclusively to the federal government)? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: 'Conducting elections, including for federal offices.',
        rationale:
          'Correct. The passage explicitly lists conducting elections as a reserved power of the states.',
        isCorrect: true,
      },
      {
        text: 'Coining U.S. currency.',
        rationale:
          'Coining money is a delegated power of the federal government, listed in the passage as one of its exclusive powers.',
        isCorrect: false,
      },
      {
        text: 'Overseeing public K–12 education and most local policing.',
        rationale:
          'Correct. The passage names public education and most policing as powers reserved to the states.',
        isCorrect: true,
      },
      {
        text: 'Negotiating treaties with foreign nations.',
        rationale:
          'Treaty-making is a delegated power of the federal government (specifically the President with Senate approval), not the states.',
        isCorrect: false,
      },
      {
        text: 'Establishing local governments such as cities and counties.',
        rationale:
          'Correct. The passage explicitly lists establishing local governments as a power reserved to the states.',
        isCorrect: true,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'hard',
    topic: 'Civics & Government',
    contentArea: 'civics',
    multiSelect: true,
    passage:
      'This passage summarizes three key amendments expanding voting rights in the United States.\n\n<strong>Fifteenth Amendment (1870):</strong> "The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude."\n\n<strong>Nineteenth Amendment (1920):</strong> "The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex."\n\n<strong>Twenty-Sixth Amendment (1971):</strong> "The right of citizens of the United States, who are eighteen years of age or older, to vote shall not be denied or abridged by the United States or any State on account of age."',
    question:
      'Based on the passage, which expansions of the right to vote are guaranteed by these three amendments together? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: "States cannot deny the right to vote because of a citizen's race.",
        rationale:
          'Correct. The Fifteenth Amendment explicitly forbids denying or abridging the vote "on account of race, color, or previous condition of servitude."',
        isCorrect: true,
      },
      {
        text: "States cannot deny the right to vote because of a citizen's sex.",
        rationale:
          'Correct. The Nineteenth Amendment explicitly forbids denying or abridging the vote "on account of sex."',
        isCorrect: true,
      },
      {
        text: 'States cannot deny the right to vote to citizens 18 years of age or older because of age.',
        rationale:
          'Correct. The Twenty-Sixth Amendment guarantees that the vote may not be denied to citizens 18 or older "on account of age."',
        isCorrect: true,
      },
      {
        text: 'States must let non-citizens vote in federal elections.',
        rationale:
          'All three amendments protect the rights of "citizens." None requires states to enfranchise non-citizens.',
        isCorrect: false,
      },
      {
        text: 'States must lower the voting age to 16.',
        rationale:
          'The Twenty-Sixth Amendment establishes 18 as a maximum permissible voting age, not 16. States are free to set 18 as the minimum age.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'hard',
    topic: 'Civics & Government',
    contentArea: 'civics',
    multiSelect: true,
    passage:
      "This passage describes barriers historically used to limit voting after the Fifteenth Amendment was ratified.\n\nDespite the Fifteenth Amendment's 1870 guarantee against race-based voting discrimination, many Southern states throughout the late 1800s and early 1900s adopted laws and practices that effectively prevented African Americans from voting. Common barriers included:\n\n• <strong>Literacy tests</strong> requiring would-be voters to read and interpret complex passages, often graded subjectively by white registrars.\n• <strong>Poll taxes</strong> requiring payment of a fee to vote, putting voting out of reach for many low-income citizens.\n• <strong>Grandfather clauses</strong> exempting voters from literacy or poll-tax rules if their grandfathers had been able to vote before the Civil War — exempting most white voters but virtually no Black voters.\n• <strong>White primary elections</strong> in which only white voters could vote in the dominant party's primary, the only competitive election in many one-party Southern states.\n• <strong>Intimidation and violence</strong> by private groups and, at times, local officials.",
    question:
      'Based on the passage, which of the following were used as barriers to African American voting in the South after 1870? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: 'Literacy tests with subjective grading by local registrars.',
        rationale:
          'Correct. The passage explicitly identifies literacy tests, often graded subjectively by white registrars, as a barrier.',
        isCorrect: true,
      },
      {
        text: 'Federal supervision of all Southern elections from 1870 onward.',
        rationale:
          "The passage describes the Fifteenth Amendment's guarantee being undermined, not active federal supervision. Federal oversight only became significant later, especially through the Voting Rights Act of 1965.",
        isCorrect: false,
      },
      {
        text: 'Poll taxes that required payment of a fee to vote.',
        rationale:
          'Correct. The passage explicitly lists poll taxes as a tool that put voting out of reach, especially for low-income citizens.',
        isCorrect: true,
      },
      {
        text: 'Automatic voter registration of all adult citizens at age 18.',
        rationale:
          'Automatic voter registration was not a feature of post-1870 Southern election law. The passage describes barriers to registration, not facilitation.',
        isCorrect: false,
      },
      {
        text: 'Grandfather clauses that exempted most white voters but few Black voters from literacy or poll-tax rules.',
        rationale:
          'Correct. The passage describes grandfather clauses as exempting voters whose grandfathers could vote before the Civil War — a description that excluded almost all Black voters in the post-Reconstruction South.',
        isCorrect: true,
      },
      {
        text: 'White-only primary elections in one-party Southern states.',
        rationale:
          "Correct. The passage explicitly identifies white primary elections as a barrier in states where the dominant party's primary was the only competitive election.",
        isCorrect: true,
      },
    ],
  },
];
