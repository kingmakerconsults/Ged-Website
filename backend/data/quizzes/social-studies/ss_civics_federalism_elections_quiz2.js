/**
 * Federalism & Elections: Quiz 2
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    "questionNumber": 1,
    "type": "knowledge",
    "question": "How many total electoral votes are there, and how many are needed to win the presidency?",
    "answerOptions": [
      {
        "text": "100 total; 51 to win.",
        "rationale": "This is related to the number of senators, not the Electoral College.",
        "isCorrect": false
      },
      {
        "text": "435 total; 218 to win.",
        "rationale": "This is related to the number of representatives, not the Electoral College.",
        "isCorrect": false
      },
      {
        "text": "538 total; 270 to win.",
        "rationale": "Correct. There are 538 electoral votes in total (435 Representatives + 100 Senators + 3 for Washington D.C.). A majority, 270, is needed to win.",
        "isCorrect": true
      },
      {
        "text": "1,000 total; 501 to win.",
        "rationale": "These numbers are incorrect.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 2,
    "challenge_tags": [
      "social-3"
    ],
    "type": "text",
    "passage": "A major criticism of the Electoral College is that it is possible for a candidate to win the presidency without winning the national popular vote. This happens if a candidate wins by narrow margins in several large states, while their opponent wins by large margins in fewer states. This has occurred in several U.S. presidential elections, including in 2000 and 2016.",
    "question": "What is a major criticism of the Electoral College system?",
    "answerOptions": [
      {
        "text": "It gives too much power to the most populous states.",
        "rationale": "While large states have many votes, the system can be criticized for giving disproportionate power to smaller states.",
        "isCorrect": false
      },
      {
        "text": "It is possible to become president without winning the most individual votes nationwide.",
        "rationale": "Correct. The passage identifies this as a major criticism, as it can lead to a result where the winner of the popular vote loses the election.",
        "isCorrect": true
      },
      {
        "text": "It is too expensive to operate.",
        "rationale": "Cost is not a primary criticism of the system.",
        "isCorrect": false
      },
      {
        "text": "It makes it too difficult for any candidate to win.",
        "rationale": "The system is designed to produce a clear winner.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "What is the primary function of political parties in the United States?",
    "answerOptions": [
      {
        "text": "To enforce federal laws.",
        "rationale": "This is the role of the executive branch.",
        "isCorrect": false
      },
      {
        "text": "To interpret the Constitution.",
        "rationale": "This is the role of the judicial branch.",
        "isCorrect": false
      },
      {
        "text": "To nominate candidates for office, mobilize voters, and try to control the government.",
        "rationale": "Correct. Political parties are organizations that share a common ideology and work to elect their members to government positions to influence policy.",
        "isCorrect": true
      },
      {
        "text": "To remain neutral in all political matters.",
        "rationale": "Political parties are inherently partisan and exist to compete for power.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 4,
    "challenge_tags": [
      "rla-7"
    ],
    "type": "text",
    "passage": "The United States has a two-party system, which has been dominated by the Democratic and Republican parties for most of its history. While third parties, such as the Libertarian or Green parties, exist and can influence elections, they have rarely won major national offices. The winner-take-all nature of most elections makes it very difficult for third parties to gain a foothold.",
    "question": "According to the passage, why is it difficult for third parties to succeed in the U.S. political system?",
    "answerOptions": [
      {
        "text": "Because they are illegal in most states.",
        "rationale": "Third parties are legal.",
        "isCorrect": false
      },
      {
        "text": "Because they are not allowed to raise money.",
        "rationale": "Third parties can raise money, though it is often more difficult for them.",
        "isCorrect": false
      },
      {
        "text": "Because the 'winner-take-all' electoral system makes it hard for them to win elections.",
        "rationale": "Correct. In a winner-take-all system, even a party with significant support (e.g., 15-20% of the vote) wins no representation, which discourages voters and donors from supporting them.",
        "isCorrect": true
      },
      {
        "text": "Because they are not allowed to participate in presidential debates.",
        "rationale": "While debate access is a challenge, the core structural problem is the winner-take-all system.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "challenge_tags": [
      "social-3"
    ],
    "type": "knowledge",
    "question": "What is the term for an election held to choose which candidate will represent a political party in the general election?",
    "answerOptions": [
      {
        "text": "A general election",
        "rationale": "The general election is the final contest between the party nominees.",
        "isCorrect": false
      },
      {
        "text": "A primary election",
        "rationale": "Correct. In a primary election (or caucus), voters select which candidate they want their party to nominate for office.",
        "isCorrect": true
      },
      {
        "text": "A recall election",
        "rationale": "A recall election is a procedure to remove an elected official from office.",
        "isCorrect": false
      },
      {
        "text": "A referendum",
        "rationale": "A referendum is a vote on a specific law or policy, not a candidate.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 6,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "Federalism is a system of government in which power is divided between a central, national government and various regional governments, such as states. The U.S. Constitution establishes this system by granting certain powers to the federal government (enumerated powers), reserving other powers for the states (reserved powers), and allowing some powers to be shared by both (concurrent powers).",
    "question": "Which of the following is the best definition of federalism?",
    "answerOptions": [
      {
        "text": "A system where all power is held by a single, central government.",
        "rationale": "This describes a unitary system, not federalism.",
        "isCorrect": false
      },
      {
        "text": "A system where power is divided between a national government and state governments.",
        "rationale": "Correct. Federalism is characterized by this division of power between different levels of government.",
        "isCorrect": true
      },
      {
        "text": "A system where the government is divided into three separate branches.",
        "rationale": "This describes the separation of powers, not federalism.",
        "isCorrect": false
      },
      {
        "text": "A system where the people vote directly on all laws.",
        "rationale": "This describes a direct democracy, not federalism.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 7,
    "challenge_tags": [
      "social-3"
    ],
    "type": "knowledge",
    "question": "The power to coin money, declare war, and make treaties are all examples of what type of power in the U.S. federal system?",
    "answerOptions": [
      {
        "text": "Reserved powers",
        "rationale": "Reserved powers belong to the states.",
        "isCorrect": false
      },
      {
        "text": "Concurrent powers",
        "rationale": "Concurrent powers are shared by both federal and state governments.",
        "isCorrect": false
      },
      {
        "text": "Enumerated powers",
        "rationale": "Correct. These powers are explicitly listed, or enumerated, in the Constitution as belonging to the federal government.",
        "isCorrect": true
      },
      {
        "text": "Implied powers",
        "rationale": "Implied powers are not explicitly listed but are considered necessary to carry out expressed powers.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 8,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "The Tenth Amendment to the Constitution states that powers not delegated to the federal government, nor prohibited to the states, are reserved for the states or the people. These 'reserved powers' form the basis of state authority over many aspects of daily life.",
    "question": "Which of the following is the best example of a reserved power held by state governments?",
    "answerOptions": [
      {
        "text": "Regulating interstate commerce.",
        "rationale": "The Constitution gives the power to regulate commerce between the states to the federal government.",
        "isCorrect": false
      },
      {
        "text": "Conducting elections.",
        "rationale": "Correct. While the federal government sets some general rules, states are responsible for the administration of elections, including setting up polling places and printing ballots.",
        "isCorrect": true
      },
      {
        "text": "Negotiating treaties with foreign countries.",
        "rationale": "This is an enumerated power of the federal government.",
        "isCorrect": false
      },
      {
        "text": "Maintaining an army and a navy.",
        "rationale": "This is an enumerated power of the federal government.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 9,
    "challenge_tags": [
      "social-1"
    ],
    "type": "knowledge",
    "question": "Powers that are shared by both the federal government and state governments, such as the power to tax and build roads, are known as:",
    "answerOptions": [
      {
        "text": "Concurrent powers",
        "rationale": "Correct. 'Concurrent' means happening at the same time, and these are powers that both levels of government can exercise.",
        "isCorrect": true
      },
      {
        "text": "Reserved powers",
        "rationale": "Reserved powers belong only to the states.",
        "isCorrect": false
      },
      {
        "text": "Enumerated powers",
        "rationale": "Enumerated powers belong only to the federal government.",
        "isCorrect": false
      },
      {
        "text": "Delegated powers",
        "rationale": "Delegated powers are those specifically granted to the federal government.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 10,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "The President of the United States is not elected by a direct popular vote. Instead, the election is decided by the Electoral College. In this system, each state is assigned a number of electors equal to its total number of representatives in Congress (House + Senate). In most states, the candidate who wins the popular vote in that state wins all of that state's electoral votes.",
    "question": "How is the number of electoral votes for each state determined?",
    "answerOptions": [
      {
        "text": "It is based on the physical size of the state.",
        "rationale": "The number of electoral votes is based on population, not land area.",
        "isCorrect": false
      },
      {
        "text": "Each state receives the same number of electoral votes.",
        "rationale": "The number of votes varies greatly from state to state based on population.",
        "isCorrect": false
      },
      {
        "text": "It is equal to the state's total number of Senators and Representatives in Congress.",
        "rationale": "Correct. The passage clearly states this is how the number of electors is determined.",
        "isCorrect": true
      },
      {
        "text": "It is determined by the state governor.",
        "rationale": "The number is determined by the census and congressional apportionment, not the governor.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 11,
    "challenge_tags": [
      "social-1",
      "social-5"
    ],
    "type": "text",
    "passage": "Political ideologies in the U.S. are often described on a spectrum. Generally, those on the 'left' (often associated with the Democratic party) tend to favor more government intervention in the economy and more support for social programs. Those on the 'right' (often associated with the Republican party) tend to favor less government intervention, lower taxes, and a stronger emphasis on individual responsibility.",
    "question": "A politician who advocates for less government regulation of business and lower taxes would most likely be described as being on which side of the political spectrum?",
    "answerOptions": [
      {
        "text": "The left",
        "rationale": "The left generally favors more government regulation and social programs funded by taxes.",
        "isCorrect": false
      },
      {
        "text": "The right",
        "rationale": "Correct. Favoring less government intervention in the economy and lower taxes are core principles generally associated with the political right in the U.S.",
        "isCorrect": true
      },
      {
        "text": "The center",
        "rationale": "A centrist might hold a mix of views, but a strong stance on less regulation and lower taxes is characteristic of the right.",
        "isCorrect": false
      },
      {
        "text": "Unaffiliated",
        "rationale": "This describes a lack of party membership, not an ideological position.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 12,
    "challenge_tags": [
      "social-1",
      "social-3"
    ],
    "type": "knowledge",
    "question": "The process of redrawing legislative district boundaries every 10 years after the census is known as:",
    "answerOptions": [
      {
        "text": "Gerrymandering",
        "rationale": "Gerrymandering is the manipulation of these boundaries to favor one party, but the process itself is called redistricting.",
        "isCorrect": false
      },
      {
        "text": "Redistricting",
        "rationale": "Correct. Redistricting is the process of redrawing electoral district boundaries to account for population shifts.",
        "isCorrect": true
      },
      {
        "text": "Filibustering",
        "rationale": "This is a tactic used in the Senate.",
        "isCorrect": false
      },
      {
        "text": "Lobbying",
        "rationale": "This is the act of trying to influence lawmakers.",
        "isCorrect": false
      }
    ]
  }
];
