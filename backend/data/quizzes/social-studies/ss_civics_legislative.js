/**
 * The Legislative Branch
 * Extracted from frontend app.jsx
 * Fixed to backend format: flattened from 3 sub-quizzes
 */

module.exports = [
  {
    "questionNumber": 1,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "The U.S. Congress is a bicameral legislature, meaning it is composed of two chambers: the House of Representatives and the Senate. Representation in the House is based on a state's population, with representatives serving two-year terms. In the Senate, every state is represented equally with two senators, who serve six-year terms. This structure was the result of the Great Compromise at the Constitutional Convention.",
    "question": "Why is the U.S. Congress considered 'bicameral'?",
    "answerOptions": [
      {
        "text": "Because representatives serve two-year terms.",
        "rationale": "Term length does not define a bicameral legislature.",
        "isCorrect": false
      },
      {
        "text": "Because it consists of two separate chambers (the House and the Senate).",
        "rationale": "Correct. 'Bi' means two and 'cameral' refers to a chamber, so a bicameral legislature is one with two houses.",
        "isCorrect": true
      },
      {
        "text": "Because it includes both elected officials and appointed judges.",
        "rationale": "Judges are part of the judicial branch, not the legislative branch.",
        "isCorrect": false
      },
      {
        "text": "Because its members can belong to two different political parties.",
        "rationale": "Political party composition does not define the structure of the legislature.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "knowledge",
    "question": "What is the total number of senators in the U.S. Senate?",
    "answerOptions": [
      {
        "text": "50",
        "rationale": "This would be one senator per state.",
        "isCorrect": false
      },
      {
        "text": "100",
        "rationale": "Correct. Since each of the 50 states gets two senators, the total is 100.",
        "isCorrect": true
      },
      {
        "text": "435",
        "rationale": "This is the number of representatives in the House of Representatives.",
        "isCorrect": false
      },
      {
        "text": "535",
        "rationale": "This is the total number of voting members in both the House and the Senate combined.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 3,
    "type": "knowledge",
    "question": "Which chamber of Congress has the exclusive power to initiate all bills related to revenue (taxes)?",
    "answerOptions": [
      {
        "text": "The Senate",
        "rationale": "The Senate can amend revenue bills, but they must originate in the House.",
        "isCorrect": false
      },
      {
        "text": "The House of Representatives",
        "rationale": "Correct. The Constitution (Article I, Section 7) requires that all bills for raising revenue must originate in the House, based on the principle that the chamber closer to the people should control taxation.",
        "isCorrect": true
      },
      {
        "text": "Both chambers can initiate them equally.",
        "rationale": "The Constitution gives this specific power to the House.",
        "isCorrect": false
      },
      {
        "text": "The Supreme Court",
        "rationale": "The Supreme Court interprets laws; it does not initiate them.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 4,
    "type": "text",
    "passage": "For a bill to become a law, it must be passed by both the House of Representatives and the Senate in identical form. First, a bill is introduced in one chamber, where it is assigned to a committee. The committee studies the bill, holds hearings, and may make changes. If the committee approves it, the bill is debated and voted on by the full chamber. If it passes, it is sent to the other chamber to go through the same process.",
    "question": "What is the role of a committee in the lawmaking process?",
    "answerOptions": [
      {
        "text": "To introduce the bill on the floor of the House or Senate.",
        "rationale": "Any member can introduce a bill; the committee's role comes after introduction.",
        "isCorrect": false
      },
      {
        "text": "To study the bill, hold hearings, and make revisions before it is voted on by the full chamber.",
        "rationale": "Correct. Committees are where the detailed work of crafting and scrutinizing legislation happens.",
        "isCorrect": true
      },
      {
        "text": "To sign the bill into law after it has passed both chambers.",
        "rationale": "The President signs a bill into law.",
        "isCorrect": false
      },
      {
        "text": "To vote on the final version of the bill after it has been approved by both chambers.",
        "rationale": "The full chamber votes on the bill after it leaves committee.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 5,
    "type": "knowledge",
    "question": "If the House and the Senate pass different versions of the same bill, what is the next step to resolve the differences?",
    "answerOptions": [
      {
        "text": "The bill is sent to the President to choose the preferred version.",
        "rationale": "The President receives only one final version of a bill.",
        "isCorrect": false
      },
      {
        "text": "The bill is sent to a conference committee to create a compromise version.",
        "rationale": "Correct. A conference committee, made up of members from both the House and Senate, is convened to iron out the differences between the two versions of the bill.",
        "isCorrect": true
      },
      {
        "text": "The Supreme Court decides which version is constitutional.",
        "rationale": "The Supreme Court does not get involved in the legislative process at this stage.",
        "isCorrect": false
      },
      {
        "text": "The bill is sent back to the chamber where it originated to be rewritten from scratch.",
        "rationale": "A conference committee is the standard procedure for resolving differences.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 1,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "After a bill has been passed in identical form by both the House and the Senate, it is sent to the President. The President has several options. He can sign the bill, and it becomes law. He can veto the bill, sending it back to Congress with his objections. Or, he can do nothing. If Congress is in session, the bill becomes law after ten days without the President's signature.",
    "question": "What happens if the President vetoes a bill?",
    "answerOptions": [
      {
        "text": "The bill is automatically dead and cannot be reconsidered.",
        "rationale": "Congress has the power to override a veto.",
        "isCorrect": false
      },
      {
        "text": "The bill is sent to the Supreme Court for a final decision.",
        "rationale": "The Supreme Court does not participate in this part of the legislative process.",
        "isCorrect": false
      },
      {
        "text": "The bill is sent back to Congress, which can override the veto with a two-thirds vote in both chambers.",
        "rationale": "Correct. A presidential veto is a powerful check, but Congress can overcome it with a supermajority vote.",
        "isCorrect": true
      },
      {
        "text": "The bill becomes law, but only for a temporary period.",
        "rationale": "A veto prevents a bill from becoming law unless it is overridden.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "challenge_tags": [
      "social-1"
    ],
    "type": "knowledge",
    "question": "Which of the following is an enumerated (or expressed) power of Congress, as listed in Article I, Section 8 of the Constitution?",
    "answerOptions": [
      {
        "text": "The power to issue driver's licenses.",
        "rationale": "This is a power reserved to the states.",
        "isCorrect": false
      },
      {
        "text": "The power to establish public schools.",
        "rationale": "This is a power generally reserved to state and local governments.",
        "isCorrect": false
      },
      {
        "text": "The power to declare war.",
        "rationale": "Correct. Article I, Section 8 explicitly grants Congress the power to declare war.",
        "isCorrect": true
      },
      {
        "text": "The power to appoint Supreme Court justices.",
        "rationale": "This power belongs to the President, with the Senate's approval.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "text",
    "passage": "The 'Necessary and Proper Clause' (also known as the Elastic Clause) in Article I, Section 8 of the Constitution gives Congress the power 'To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers...' This clause grants Congress implied powers��powers not explicitly stated in the Constitution but that are necessary to carry out its expressed powers.",
    "question": "The 'Elastic Clause' is significant because it grants Congress:",
    "answerOptions": [
      {
        "text": "the power to veto laws passed by the states.",
        "rationale": "Congress does not have a direct veto over state laws, though federal law is supreme.",
        "isCorrect": false
      },
      {
        "text": "implied powers that are not explicitly listed in the Constitution.",
        "rationale": "Correct. This clause 'stretches' the powers of Congress beyond those that are specifically enumerated, allowing it to adapt to changing needs.",
        "isCorrect": true
      },
      {
        "text": "the sole power to amend the Constitution.",
        "rationale": "Amending the Constitution requires a proposal by Congress and ratification by the states.",
        "isCorrect": false
      },
      {
        "text": "the power to appoint its own members to the cabinet.",
        "rationale": "Cabinet members are appointed by the President.",
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
    "question": "Which chamber of Congress has the exclusive power of 'advice and consent' on presidential appointments and treaties?",
    "answerOptions": [
      {
        "text": "The House of Representatives",
        "rationale": "The House does not have this power.",
        "isCorrect": false
      },
      {
        "text": "The Senate",
        "rationale": "Correct. The Senate must confirm major presidential appointments (like cabinet members and federal judges) and must ratify treaties negotiated by the President.",
        "isCorrect": true
      },
      {
        "text": "Both chambers share this power equally.",
        "rationale": "The Constitution specifically grants this power to the Senate.",
        "isCorrect": false
      },
      {
        "text": "No chamber has this power; it belongs to the judiciary.",
        "rationale": "This is a key legislative power.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 5,
    "challenge_tags": [
      "social-1"
    ],
    "type": "text",
    "passage": "The process of impeachment is a power granted to the Legislative Branch to remove a federal official from office for 'Treason, Bribery, or other high Crimes and Misdemeanors.' The process involves two steps: The House of Representatives has the sole power to impeach (to formally accuse), and the Senate has the sole power to hold the trial and vote on removal.",
    "question": "In the impeachment process, what is the role of the House of Representatives?",
    "answerOptions": [
      {
        "text": "To conduct the trial of the impeached official.",
        "rationale": "The Senate conducts the trial.",
        "isCorrect": false
      },
      {
        "text": "To formally accuse the official of wrongdoing (to impeach).",
        "rationale": "Correct. The House acts as the grand jury, deciding whether there is enough evidence to bring formal charges, which is the act of impeachment.",
        "isCorrect": true
      },
      {
        "text": "To decide the punishment if the official is found guilty.",
        "rationale": "The only punishment the Senate can issue is removal from office and disqualification from future office.",
        "isCorrect": false
      },
      {
        "text": "To pardon the official if they are convicted.",
        "rationale": "The power to pardon belongs to the President.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 1,
    "challenge_tags": [
      "rla-7"
    ],
    "type": "chart",
    "passage": "<div class=\"passage-text\"><b>How a Bill Becomes a Law</b><br>1. Bill is Introduced in House or Senate.<br>2. Referred to Committee for study.<br>3. Floor Debate and Vote in the first chamber.<br>4. Bill is sent to the other chamber for the same process.<br>5. Conference Committee (if needed to resolve differences).<br>6. Final Vote in both chambers.<br>7. Sent to President.</div>",
    "question": "According to the chart, what happens immediately after a bill is introduced in the House of Representatives?",
    "answerOptions": [
      {
        "text": "It is sent to the Senate for a vote.",
        "rationale": "The bill must go through the committee and floor process in the House first.",
        "isCorrect": false
      },
      {
        "text": "It is referred to a committee for study and review.",
        "rationale": "Correct. The chart shows that after introduction (Step 1), the bill is sent to a committee (Step 2).",
        "isCorrect": true
      },
      {
        "text": "It is debated on the floor of the House.",
        "rationale": "Floor debate happens after the committee has reviewed the bill.",
        "isCorrect": false
      },
      {
        "text": "It is sent directly to the President.",
        "rationale": "The President is the last step in the process.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 2,
    "challenge_tags": [
      "social-1"
    ],
    "type": "knowledge",
    "question": "A filibuster is a tactic used in the Senate to delay or block a vote on a bill. How can a filibuster be ended?",
    "answerOptions": [
      {
        "text": "By a simple majority vote of 51 senators.",
        "rationale": "A simple majority is not enough to end a filibuster.",
        "isCorrect": false
      },
      {
        "text": "By a vote for cloture, which requires a three-fifths majority (60 votes).",
        "rationale": "Correct. The Senate can invoke 'cloture' with 60 votes, which limits further debate and ends the filibuster.",
        "isCorrect": true
      },
      {
        "text": "By the President issuing an executive order.",
        "rationale": "The President cannot interfere with the internal rules and procedures of the Senate.",
        "isCorrect": false
      },
      {
        "text": "By the Speaker of a House calling for a vote.",
        "rationale": "The Speaker of the House has no authority over Senate proceedings.",
        "isCorrect": false
      }
    ]
  },
  {
    "questionNumber": 3,
    "type": "text",
    "passage": "Congress has the 'power of the purse,' which is one of its most important checks on the executive branch. This means that Congress controls the nation's finances. It must approve the federal budget and authorize any spending by federal agencies. If Congress disagrees with a policy of the executive branch, it can refuse to provide funding for it.",
    "question": "How does the 'power of the purse' allow Congress to check the executive branch?",
    "answerOptions": [
      {
        "text": "By allowing Congress to impeach the President.",
        "rationale": "Impeachment is a separate power, not part of the 'power of the purse.'",
        "isCorrect": false
      },
      {
        "text": "By giving Congress the ability to control funding for executive branch programs and agencies.",
        "rationale": "Correct. By controlling the money, Congress can limit or prevent the executive branch from carrying out certain actions.",
        "isCorrect": true
      },
      {
        "text": "By allowing Congress to declare executive orders unconstitutional.",
        "rationale": "The power to declare actions unconstitutional belongs to the judicial branch.",
        "isCorrect": false
      },
      {
        "text": "By giving Congress the power to appoint cabinet members.",
        "rationale": "The President appoints cabinet members, though the Senate must confirm them.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 4,
    "type": "knowledge",
    "question": "What is the term for a member of the House or Senate who is chosen by their party to help plan the party's legislative strategy and ensure party members are present for important votes?",
    "answerOptions": [
      {
        "text": "The Speaker of the House",
        "rationale": "The Speaker is the presiding officer of the House, a higher leadership position.",
        "isCorrect": false
      },
      {
        "text": "The President pro tempore",
        "rationale": "This is a senior senator who presides over the Senate in the absence of the Vice President.",
        "isCorrect": false
      },
      {
        "text": "The Whip",
        "rationale": "Correct. The majority and minority whips in both chambers are responsible for 'whipping up' support for their party's positions and making sure members are present for votes.",
        "isCorrect": true
      },
      {
        "text": "A Lobbyist",
        "rationale": "Lobbyists are representatives of outside groups who try to influence Congress; they are not members of Congress.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  },
  {
    "questionNumber": 5,
    "type": "knowledge",
    "question": "If a representative in the House of Representatives serves a two-year term and a senator serves a six-year term, what is the ratio of a senator's term to a representative's term?",
    "answerOptions": [
      {
        "text": "1:3",
        "rationale": "This ratio is inverted.",
        "isCorrect": false
      },
      {
        "text": "2:1",
        "rationale": "This would mean a representative's term is twice as long as a senator's.",
        "isCorrect": false
      },
      {
        "text": "3:1",
        "rationale": "Correct. A senator's six-year term is three times as long as a representative's two-year term (6 years / 2 years = 3).",
        "isCorrect": true
      },
      {
        "text": "1:2",
        "rationale": "This would mean a senator's term is half as long as a representative's.",
        "isCorrect": false
      }
    ],
    "challenge_tags": [
      "social-3"
    ]
  }
];
