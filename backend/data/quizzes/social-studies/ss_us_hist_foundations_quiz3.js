/**
 * Foundations of American Government: Quiz 3
 * Topics: Early Republic, Hamilton's Financial Plan, Washington's Presidency, Judicial Review, Early Amendments
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      'When George Washington took office as the first President in 1789, virtually every action he took set a precedent for future presidents. He established the tradition of a Cabinet by appointing heads of executive departments as his closest advisors, including Thomas Jefferson as Secretary of State, Alexander Hamilton as Secretary of the Treasury, and Henry Knox as Secretary of War. Washington also set the precedent of serving only two terms, a tradition that lasted until Franklin Roosevelt won a third in 1940 and was later codified by the Twenty-Second Amendment in 1951.',
    question: 'Why were George Washington\u2019s actions as the first President particularly significant?',
    answerOptions: [
      {
        text: 'His decisions established precedents that shaped the presidency for future generations.',
        isCorrect: true,
        rationale:
          'The passage states "virtually every action he took set a precedent for future presidents," making his choices foundational to the office.',
      },
      {
        text: 'He was the only President who was unanimously elected by the Electoral College.',
        isCorrect: false,
        rationale:
          'While historically true, the passage focuses on the significance of his precedent-setting actions, not on how he was elected.',
      },
      {
        text: 'He established a monarchy-style government based on British traditions.',
        isCorrect: false,
        rationale:
          'Washington deliberately avoided monarchical trappings; his precedents supported a republican form of government.',
      },
      {
        text: 'He personally wrote the Bill of Rights before leaving office.',
        isCorrect: false,
        rationale:
          'James Madison drafted the Bill of Rights; the passage does not attribute this to Washington.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 2,
    type: 'text',
    passage:
      'Alexander Hamilton, as Secretary of the Treasury, proposed an ambitious financial plan to stabilize the new nation\u2019s economy. The plan included federal assumption of state debts incurred during the Revolutionary War, the creation of a national bank, and the imposition of tariffs and excise taxes to generate revenue. Hamilton argued that assuming state debts would bind the states to the national government and establish the nation\u2019s creditworthiness with foreign lenders. His proposals faced fierce opposition from Thomas Jefferson and James Madison, who feared the plan would concentrate too much power in the federal government and favor Northern commercial interests over Southern agricultural ones.',
    question: 'Why did Hamilton argue that the federal government should assume state war debts?',
    answerOptions: [
      {
        text: 'It would unite the states under the national government and establish creditworthiness.',
        isCorrect: true,
        rationale:
          'The passage states Hamilton believed assuming debts "would bind the states to the national government and establish the nation\u2019s creditworthiness with foreign lenders."',
      },
      {
        text: 'He wanted to punish states that had already paid their debts independently.',
        isCorrect: false,
        rationale:
          'Hamilton\u2019s goal was national unity, not punishment; the passage does not mention penalizing any states.',
      },
      {
        text: 'He believed individual states were incapable of managing their own finances.',
        isCorrect: false,
        rationale:
          'Hamilton\u2019s argument was about national cohesion and credit, not about state incompetence.',
      },
      {
        text: 'He planned to eliminate all taxes on the Southern states.',
        isCorrect: false,
        rationale:
          'The plan actually proposed tariffs and excise taxes; Jefferson and Madison specifically objected that it favored the North.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'The debate over Hamilton\u2019s proposed national bank revealed a fundamental disagreement about how to interpret the Constitution. Hamilton argued for a broad interpretation, claiming the Necessary and Proper Clause gave Congress implied powers to create a bank as a means of carrying out its financial responsibilities. Jefferson countered with a strict interpretation, insisting that since the Constitution did not explicitly authorize a national bank, creating one exceeded Congress\u2019s authority. President Washington ultimately sided with Hamilton, and the First Bank of the United States was chartered in 1791 for a twenty-year term.',
    question: 'What constitutional principle was at the center of the debate over the national bank?',
    answerOptions: [
      {
        text: 'Whether the Necessary and Proper Clause granted Congress implied powers beyond those explicitly listed.',
        isCorrect: true,
        rationale:
          'The passage frames the debate as "broad interpretation" (implied powers via the Necessary and Proper Clause) versus "strict interpretation" (only explicitly granted powers).',
      },
      {
        text: 'Whether the President had the authority to create financial institutions by executive order.',
        isCorrect: false,
        rationale:
          'The debate was about Congress\u2019s legislative authority, not presidential executive orders.',
      },
      {
        text: 'Whether states could establish their own competing national banks.',
        isCorrect: false,
        rationale:
          'The issue was federal authority to create a bank, not state authority to compete with it.',
      },
      {
        text: 'Whether foreign nations should be allowed to invest in American financial institutions.',
        isCorrect: false,
        rationale:
          'Foreign investment was not the focus of this constitutional debate; it centered on the scope of congressional power.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      'In 1793, war broke out between France and Britain, creating a foreign policy crisis for the young United States. Many Americans, remembering French support during the Revolution, favored aiding France. Others, particularly merchants who depended on trade with Britain, urged neutrality. Despite a 1778 treaty of alliance with France, President Washington issued the Proclamation of Neutrality, declaring that the United States would not take sides in the European conflict. This decision established the precedent that the President could set foreign policy direction and reinforced the principle that a new nation should avoid entangling alliances.',
    question: 'What precedent did Washington\u2019s Proclamation of Neutrality establish?',
    answerOptions: [
      {
        text: 'That the President could independently set the direction of foreign policy.',
        isCorrect: true,
        rationale:
          'The passage states the decision "established the precedent that the President could set foreign policy direction."',
      },
      {
        text: 'That Congress alone had the authority to declare neutrality in foreign wars.',
        isCorrect: false,
        rationale:
          'Washington issued the proclamation on his own executive authority, establishing presidential leadership in foreign affairs.',
      },
      {
        text: 'That the United States would permanently support France in all future conflicts.',
        isCorrect: false,
        rationale:
          'The proclamation declared neutrality despite the French alliance, not permanent support for France.',
      },
      {
        text: 'That all treaties with foreign nations would be automatically voided during wartime.',
        isCorrect: false,
        rationale:
          'The proclamation addressed U.S. neutrality in a specific conflict; it did not create a general rule about treaties.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 5,
    type: 'text',
    passage:
      'The landmark Supreme Court case Marbury v. Madison (1803) established the principle of judicial review\u2014the power of the courts to determine whether laws and actions of the government are constitutional. Chief Justice John Marshall ruled that Section 13 of the Judiciary Act of 1789 was unconstitutional because it attempted to expand the Supreme Court\u2019s original jurisdiction beyond what the Constitution allowed. Although the immediate result was that William Marbury did not receive his commission, the broader consequence was transformative: the Supreme Court claimed the authority to be the final interpreter of the Constitution.',
    question: 'Why is Marbury v. Madison considered one of the most important Supreme Court cases in American history?',
    answerOptions: [
      {
        text: 'It established judicial review, giving the Supreme Court the power to declare laws unconstitutional.',
        isCorrect: true,
        rationale:
          'The passage states the case "established the principle of judicial review" and that the Court "claimed the authority to be the final interpreter of the Constitution."',
      },
      {
        text: 'It gave Congress the power to override Supreme Court decisions.',
        isCorrect: false,
        rationale:
          'The case did the opposite\u2014it strengthened the judiciary\u2019s power relative to Congress by allowing courts to strike down laws.',
      },
      {
        text: 'It ensured that all presidential appointments must be approved by the Senate.',
        isCorrect: false,
        rationale:
          'Senate confirmation of appointments was already in the Constitution; Marbury v. Madison addressed the scope of judicial power.',
      },
      {
        text: 'It required that all federal judges be elected rather than appointed.',
        isCorrect: false,
        rationale:
          'The Constitution provides for appointment of federal judges; this case did not change that process.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 6,
    type: 'text',
    passage:
      'Political parties were not anticipated by the Constitution, yet they emerged almost immediately. By the early 1790s, two factions had formed: the Federalists, led by Alexander Hamilton, who favored a strong central government, loose constitutional interpretation, and close ties with Britain; and the Democratic-Republicans, led by Thomas Jefferson and James Madison, who championed states\u2019 rights, strict constitutional interpretation, and sympathy toward France. Washington warned against political parties in his 1796 Farewell Address, calling them a potential source of "frightful despotism," but the two-party system became a permanent feature of American politics.',
    question: 'On which issue did the Federalists and Democratic-Republicans most clearly disagree?',
    answerOptions: [
      {
        text: 'The proper balance of power between the national government and the states.',
        isCorrect: true,
        rationale:
          'The passage contrasts Federalists (strong central government, loose interpretation) with Democratic-Republicans (states\u2019 rights, strict interpretation)\u2014fundamentally a disagreement about federal vs. state power.',
      },
      {
        text: 'Whether the United States should remain a monarchy or become a republic.',
        isCorrect: false,
        rationale:
          'Both parties supported republican government; their disagreement was about the scope of federal authority within that framework.',
      },
      {
        text: 'Whether women should have the right to vote in national elections.',
        isCorrect: false,
        rationale:
          'Women\u2019s suffrage was not a defining issue between these parties in the 1790s.',
      },
      {
        text: 'Whether the Constitution should include a bill of rights.',
        isCorrect: false,
        rationale:
          'The Bill of Rights was ratified in 1791 before the party system fully developed; the central disagreement was about how to interpret and apply the Constitution.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 7,
    type: 'text',
    passage:
      'In 1798, amid fears of war with France and concerns about foreign influence, the Federalist-controlled Congress passed the Alien and Sedition Acts. The Alien Acts extended the residency requirement for citizenship from five to fourteen years and granted the President power to deport foreigners deemed dangerous. The Sedition Act made it a crime to publish "false, scandalous, and malicious" statements about the government or its officials. Democratic-Republicans denounced these laws as unconstitutional attacks on free speech and states\u2019 rights. Jefferson and Madison secretly authored the Kentucky and Virginia Resolutions, arguing that states had the right to nullify unconstitutional federal laws.',
    question: 'Why did Democratic-Republicans object to the Sedition Act?',
    answerOptions: [
      {
        text: 'They believed it violated the First Amendment by criminalizing political criticism of the government.',
        isCorrect: true,
        rationale:
          'The passage states the Act criminalized critical statements about the government, and Democratic-Republicans "denounced these laws as unconstitutional attacks on free speech."',
      },
      {
        text: 'They argued it gave too much power to state governments over immigration policy.',
        isCorrect: false,
        rationale:
          'The Acts gave power to the federal government, not the states; Democratic-Republicans objected to federal overreach, not state empowerment.',
      },
      {
        text: 'They feared it would lead to immediate war with France.',
        isCorrect: false,
        rationale:
          'The Sedition Act addressed domestic speech, not foreign policy; war fears were the context but not the basis of the objection.',
      },
      {
        text: 'They wanted stronger penalties for those who criticized the President.',
        isCorrect: false,
        rationale:
          'Democratic-Republicans opposed the Act; they did not seek stronger penalties for political speech.',
      },
    ],
    challenge_tags: ['social-1', 'social-3', 'rla-5'],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      'The election of 1800 represented a peaceful transfer of power from one political party to another\u2014a first in American history. President John Adams, a Federalist, lost to Thomas Jefferson, a Democratic-Republican, after a bitterly contested campaign. The transition was complicated by a tie in the Electoral College between Jefferson and his running mate Aaron Burr, which had to be resolved by the House of Representatives after 36 ballots. Despite the intense partisanship, Adams peacefully left office, establishing the critical precedent that political power would be transferred through elections, not violence.',
    question: 'Why is the election of 1800 often called the "Revolution of 1800"?',
    answerOptions: [
      {
        text: 'It marked the first peaceful transfer of power between opposing political parties.',
        isCorrect: true,
        rationale:
          'The passage emphasizes this was "a first in American history" and that it established the "critical precedent that political power would be transferred through elections, not violence."',
      },
      {
        text: 'It resulted in an armed conflict between Federalists and Democratic-Republicans.',
        isCorrect: false,
        rationale:
          'The passage specifically highlights the peaceful nature of the transfer, noting Adams "peacefully left office."',
      },
      {
        text: 'It was the first election in which all American citizens were allowed to vote.',
        isCorrect: false,
        rationale:
          'Voting rights were still limited in 1800; the significance was the peaceful party-to-party transfer of power.',
      },
      {
        text: 'It eliminated the Electoral College in favor of a popular vote.',
        isCorrect: false,
        rationale:
          'The Electoral College was used in 1800 and continues today; the election actually exposed a flaw (the Jefferson-Burr tie) that led to the Twelfth Amendment.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 9,
    type: 'text',
    passage:
      'The Twelfth Amendment, ratified in 1804, changed the Electoral College process to require separate ballots for President and Vice President. Under the original system, the candidate with the most electoral votes became President and the runner-up became Vice President. This had produced the awkward situation of a President and Vice President from opposing parties (Adams and Jefferson in 1796) and the dangerous tie between Jefferson and Burr in 1800. The amendment resolved these problems by ensuring that presidential and vice-presidential candidates would run together on a single ticket.',
    question: 'What problem did the Twelfth Amendment specifically address?',
    answerOptions: [
      {
        text: 'The original Electoral College system could produce a President and Vice President from opposing parties or create dangerous ties.',
        isCorrect: true,
        rationale:
          'The passage cites two specific problems: the "awkward situation" of Adams and Jefferson from rival parties and the "dangerous tie" between Jefferson and Burr.',
      },
      {
        text: 'The original system did not allow citizens to vote for the President.',
        isCorrect: false,
        rationale:
          'The Twelfth Amendment changed balloting procedures within the Electoral College, not citizen voting rights.',
      },
      {
        text: 'State governors had too much influence over presidential elections.',
        isCorrect: false,
        rationale:
          'The amendment addressed the mechanics of electoral voting, not gubernatorial influence.',
      },
      {
        text: 'There was no process for replacing a President who died in office.',
        isCorrect: false,
        rationale:
          'Presidential succession was addressed in Article II and later the Twenty-Fifth Amendment, not the Twelfth.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 10,
    type: 'text',
    passage:
      'In his 1796 Farewell Address, President Washington offered advice that shaped American policy for generations. He warned against "permanent alliances" with foreign nations, arguing that the United States should maintain commercial relations with all countries but avoid binding political commitments. He also cautioned against the "baneful effects of the spirit of party," predicting that partisan divisions could weaken the republic. Washington urged national unity, reminding citizens that their shared identity as Americans should transcend regional loyalties.',
    question: 'Which of Washington\u2019s warnings from the Farewell Address proved most prophetic regarding early American politics?',
    answerOptions: [
      {
        text: 'His warning about the "baneful effects of the spirit of party" predicted the intense partisanship that immediately followed his presidency.',
        isCorrect: true,
        rationale:
          'The bitter party conflict of the late 1790s (Alien and Sedition Acts, election of 1800) confirmed Washington\u2019s fear that partisan divisions could weaken the republic.',
      },
      {
        text: 'His advice about permanent alliances was immediately violated when the U.S. allied with France in 1798.',
        isCorrect: false,
        rationale:
          'The U.S. nearly went to war with France (the Quasi-War) in 1798, not into an alliance; Washington\u2019s neutrality principle was generally followed.',
      },
      {
        text: 'His call for national unity prevented any regional disagreements for the next fifty years.',
        isCorrect: false,
        rationale:
          'Regional tensions (North vs. South, free vs. slave states) intensified in the decades following Washington\u2019s address, eventually leading to the Civil War.',
      },
      {
        text: 'His recommendation to avoid commerce with foreign nations was adopted as official policy.',
        isCorrect: false,
        rationale:
          'Washington advocated maintaining commercial relations with all nations; he warned against political alliances, not trade.',
      },
    ],
    challenge_tags: ['social-1', 'social-3', 'rla-5'],
  },
];
