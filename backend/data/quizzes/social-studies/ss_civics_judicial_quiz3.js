/**
 * The Judicial Branch: Quiz 3
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    "questionNumber": 1,
    "challenge_tags": [
      "social-1"
    ],
    "type": "knowledge",
    "question": "The power to create lower federal courts, such as district courts and courts of appeals, belongs to which branch of government?",
    "answerOptions": [
      {
        "text": "The Executive Branch",
        "rationale": "The President appoints judges, but does not create the courts themselves.",
        "isCorrect": false
      },
      {
        "text": "The Judicial Branch",
        "rationale": "The judiciary operates the courts, but Article III gives Congress the power to establish them.",
        "isCorrect": false
      },
      {
        "text": "The Legislative Branch",
        "rationale": "Correct. Article III of the Constitution explicitly gives Congress the authority to 'ordain and establish' courts inferior to the Supreme Court.",
        "isCorrect": true
      },
      {
        "text": "The state governments",
        "rationale": "State governments create state courts, not federal courts.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "The Supreme Court has two main types of jurisdiction: original and appellate. Original jurisdiction means the Court hears a case for the first time. This is rare and typically involves disputes between states. Most of the Court's cases are heard on appellate jurisdiction, meaning the Court is hearing an appeal of a decision made by a lower court.",
    "question": "Most cases that reach the Supreme Court are heard through which type of jurisdiction?",
    "answerOptions": [
      {
        "text": "Original jurisdiction",
        "rationale": "The passage states that original jurisdiction is rare.",
        "isCorrect": false
      },
      {
        "text": "Appellate jurisdiction",
        "rationale": "Correct. The passage states that 'Most of the Court's cases are heard on appellate jurisdiction.'",
        "isCorrect": true
      },
      {
        "text": "Concurrent jurisdiction",
        "rationale": "Concurrent jurisdiction means a case could be heard in either state or federal court, but it doesn't describe how a case gets to the Supreme Court.",
        "isCorrect": false
      },
      {
        "text": "Exclusive jurisdiction",
        "rationale": "Exclusive jurisdiction means a case can only be heard in a particular court, but most Supreme Court cases are appeals.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "What is the term for a previous court ruling that is used as a basis for deciding a current case with similar facts or issues?",
    "answerOptions": [
      {
        "text": "A statute",
        "rationale": "A statute is a written law passed by a legislature.",
        "isCorrect": false
      },
      {
        "text": "An amendment",
        "rationale": "An amendment is a change to the Constitution.",
        "isCorrect": false
      },
      {
        "text": "A precedent",
        "rationale": "Correct. The principle of following precedent, known as stare decisis, is a cornerstone of the American legal system, ensuring consistency and predictability in the law.",
        "isCorrect": true
      },
      {
        "text": "A filibuster",
        "rationale": "A filibuster is a tactic used in the Senate.",
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
      "social-1"
    ],
    "type": "knowledge",
    "question": "The landmark case Roe v. Wade (1973), which was overturned in 2022, dealt with which constitutional issue?",
    "answerOptions": [
      {
        "text": "The right to bear arms.",
        "rationale": "This is covered by the Second Amendment.",
        "isCorrect": false
      },
      {
        "text": "Freedom of the press.",
        "rationale": "This is covered by the First Amendment.",
        "isCorrect": false
      },
      {
        "text": "The right to privacy and abortion.",
        "rationale": "Correct. Roe v. Wade established a woman's constitutional right to an abortion, based on the right to privacy implied in the Constitution.",
        "isCorrect": true
      },
      {
        "text": "The separation of church and state.",
        "rationale": "This is covered by the First Amendment.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "challenge_tags": [
      "math-6"
    ],
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>Supreme Court Justices by Appointing President (1981-2022)</b><table class=\"w-full text-left mt-2\"><thead><tr><th class=\"p-2 border-b\">President</th><th class=\"p-2 border-b\">Number of Appointments</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"p-2\">Ronald Reagan</td><td class=\"p-2\">4</td></tr><tr class=\"border-b\"><td class=\"p-2\">George H.W. Bush</td><td class=\"p-2\">2</td></tr><tr class=\"border-b\"><td class=\"p-2\">Bill Clinton</td><td class=\"p-2\">2</td></tr><tr class=\"border-b\"><td class=\"p-2\">George W. Bush</td><td class=\"p-2\">2</td></tr><tr class=\"border-b\"><td class=\"p-2\">Barack Obama</td><td class=\"p-2\">2</td></tr><tr class=\"border-b\"><td class=\"p-2\">Donald Trump</td><td class=\"p-2\">3</td></tr><tr class=\"border-b\"><td class=\"p-2\">Joe Biden</td><td class=\"p-2\">1</td></tr></tbody></table></div>",
    "question": "What is the mode of the number of appointments shown in the chart?",
    "answerOptions": [
      {
        "text": "1",
        "rationale": "1 appears only once.",
        "isCorrect": false
      },
      {
        "text": "2",
        "rationale": "Correct. The number 2 appears most frequently in the data set (four times).",
        "isCorrect": true
      },
      {
        "text": "3",
        "rationale": "3 appears only once.",
        "isCorrect": false
      },
      {
        "text": "4",
        "rationale": "4 appears only once.",
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
    "passage": "Article III of the Constitution establishes the Judicial Branch of the federal government. It creates the Supreme Court and gives Congress the power to create lower federal courts. Federal judges, including Supreme Court justices, are appointed by the President and confirmed by the Senate. They hold their offices 'during good Behaviour,' which generally means for life.",
    "question": "How long is the term for a Supreme Court justice?",
    "answerOptions": [
      {
        "text": "A ten-year term.",
        "rationale": "Justices do not have a fixed term length.",
        "isCorrect": false
      },
      {
        "text": "For life, or until they choose to retire.",
        "rationale": "Correct. The phrase 'during good Behaviour' has been interpreted to mean that justices serve for life, ensuring an independent judiciary free from political pressure.",
        "isCorrect": true
      },
      {
        "text": "A six-year term, the same as a senator.",
        "rationale": "Senators serve six-year terms, but Supreme Court justices serve for life.",
        "isCorrect": false
      },
      {
        "text": "They must be re-appointed by each new President.",
        "rationale": "Once appointed and confirmed, justices do not need to be re-appointed.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 7,
    "type": "knowledge",
    "question": "What is the highest court in the United States federal court system?",
    "answerOptions": [
      {
        "text": "The Court of Appeals",
        "rationale": "The Courts of Appeals are intermediate federal courts, below the Supreme Court.",
        "isCorrect": false
      },
      {
        "text": "The District Court",
        "rationale": "District Courts are the trial courts of the federal system, at the lowest level.",
        "isCorrect": false
      },
      {
        "text": "The Supreme Court",
        "rationale": "Correct. The Supreme Court is the highest federal court and has the final say on matters of constitutional law.",
        "isCorrect": true
      },
      {
        "text": "The State Supreme Court",
        "rationale": "Each state has its own supreme court, but the U.S. Supreme Court is the highest court for federal law.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 8,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "The power of judicial review is one of the most important powers of the Supreme Court. This principle, established in the 1803 case of Marbury v. Madison, allows the Court to review laws and actions taken by the legislative and executive branches and to determine whether they are constitutional. If the Court finds a law to be unconstitutional, it is nullified.",
    "question": "What does the power of judicial review allow the Supreme Court to do?",
    "answerOptions": [
      {
        "text": "To write new laws to replace ones it finds unconstitutional.",
        "rationale": "The Court can only strike down laws; it cannot write new ones. That is a legislative power.",
        "isCorrect": false
      },
      {
        "text": "To declare laws passed by Congress and signed by the President to be unconstitutional.",
        "rationale": "Correct. This is the core function of judicial review��ensuring that laws adhere to the Constitution.",
        "isCorrect": true
      },
      {
        "text": "To veto bills before they are signed by the President.",
        "rationale": "The power to veto bills belongs to the President.",
        "isCorrect": false
      },
      {
        "text": "To impeach the President for unconstitutional actions.",
        "rationale": "The power of impeachment belongs to Congress.",
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
    "question": "Which landmark Supreme Court case established the principle of judicial review?",
    "answerOptions": [
      {
        "text": "Plessy v. Ferguson",
        "rationale": "Plessy v. Ferguson established the 'separate but equal' doctrine.",
        "isCorrect": false
      },
      {
        "text": "Brown v. Board of Education",
        "rationale": "Brown v. Board of Education overturned 'separate but equal' in public schools.",
        "isCorrect": false
      },
      {
        "text": "Marbury v. Madison",
        "rationale": "Correct. In this 1803 case, Chief Justice John Marshall asserted the Court's power to review and nullify acts of Congress, establishing the principle of judicial review.",
        "isCorrect": true
      },
      {
        "text": "Miranda v. Arizona",
        "rationale": "Miranda v. Arizona established the requirement for police to inform suspects of their rights.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 10,
    "type": "text",
    "passage": "The Supreme Court consists of a Chief Justice and eight Associate Justices. For a case to be heard by the Supreme Court, at least four of the nine justices must agree to grant a writ of certiorari��an order for a lower court to send up the records of a case for review. This is known as the 'rule of four.'",
    "question": "What is the 'rule of four'?",
    "answerOptions": [
      {
        "text": "The requirement that a case must be reviewed by at least four lower courts before it can reach the Supreme Court.",
        "rationale": "There is no such requirement.",
        "isCorrect": false
      },
      {
        "text": "The minimum number of justices required to be present to hear a case.",
        "rationale": "This describes a quorum, not the rule of four.",
        "isCorrect": false
      },
      {
        "text": "The number of justices required to agree for a decision to be made in a case.",
        "rationale": "A majority (usually five justices) is needed to decide a case.",
        "isCorrect": false
      },
      {
        "text": "The minimum number of justices who must agree to hear a case before it is taken up by the Court.",
        "rationale": "Correct. The 'rule of four' is the informal practice that the Court will hear a case if four of the nine justices agree to do so.",
        "isCorrect": true
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 11,
    "challenge_tags": [
      "social-1"
    ],
    "type": "knowledge",
    "question": "The landmark case of Gideon v. Wainwright (1963) affirmed the right of the accused to what?",
    "answerOptions": [
      {
        "text": "The right to a trial by jury.",
        "rationale": "This right is in the 6th Amendment but was not the subject of this case.",
        "isCorrect": false
      },
      {
        "text": "The right to legal counsel (a lawyer), even if they cannot afford one.",
        "rationale": "Correct. The Court ruled that the 6th Amendment's guarantee of counsel is a fundamental right essential to a fair trial and must be provided to indigent defendants in felony cases.",
        "isCorrect": true
      },
      {
        "text": "The right to remain silent.",
        "rationale": "This was central to the Miranda v. Arizona case.",
        "isCorrect": false
      },
      {
        "text": "Protection from unreasonable searches.",
        "rationale": "This is the focus of the 4th Amendment.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 12,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "In the case of Tinker v. Des Moines (1969), the Supreme Court ruled on the free speech rights of students in public schools. Students had worn black armbands to protest the Vietnam War and were suspended. The Court famously stated that students do not 'shed their constitutional rights to freedom of speech or expression at the schoolhouse gate.'",
    "question": "What principle was established by the Supreme Court's decision in Tinker v. Des Moines?",
    "answerOptions": [
      {
        "text": "That students have no free speech rights in public schools.",
        "rationale": "The ruling affirmed the opposite.",
        "isCorrect": false
      },
      {
        "text": "That schools can ban any form of student expression they disagree with.",
        "rationale": "The ruling limited the ability of schools to ban expression.",
        "isCorrect": false
      },
      {
        "text": "That students have a right to symbolic speech at school, as long as it does not substantially disrupt the educational environment.",
        "rationale": "Correct. This case established that students' symbolic speech (like wearing armbands) is protected under the First Amendment unless it causes a significant disruption.",
        "isCorrect": true
      },
      {
        "text": "That only spoken speech, not symbolic speech, is protected in schools.",
        "rationale": "The case specifically protected symbolic speech.",
        "isCorrect": false
      }
    ]
  }
];
