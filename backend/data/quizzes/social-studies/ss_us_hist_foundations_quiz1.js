/**
 * Foundations of American Government: Quiz 1
 * Topics: Articles of Confederation, Constitutional Convention, Federalism, Bill of Rights
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      'The Articles of Confederation, ratified in 1781, served as the first governing document of the United States. Under the Articles, the national government consisted of a single legislative body with no executive or judicial branch. Each state, regardless of size, received one vote in Congress. The national government could not levy taxes, regulate interstate commerce, or raise an army without the consent of the states. Amending the Articles required unanimous approval from all thirteen states.',
    question: 'Based on the passage, which statement best describes a weakness of the Articles of Confederation?',
    answerOptions: [
      {
        text: 'The national government lacked the power to collect taxes from the states.',
        isCorrect: true,
        rationale:
          'The passage explicitly states that the national government "could not levy taxes," which severely limited its ability to fund operations or pay war debts.',
      },
      {
        text: 'The states were not allowed to govern themselves on local matters.',
        isCorrect: false,
        rationale:
          'The Articles actually gave states significant autonomy; the weakness was the opposite\u2014the national government was too weak.',
      },
      {
        text: 'The executive branch held too much authority over Congress.',
        isCorrect: false,
        rationale:
          'The passage states there was no executive branch under the Articles of Confederation.',
      },
      {
        text: 'Larger states dominated the legislative process through proportional representation.',
        isCorrect: false,
        rationale:
          'The passage notes each state received one vote regardless of size, meaning larger states did not have proportional representation.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 2,
    type: 'text',
    passage:
      'In 1786, a former Continental Army captain named Daniel Shays led a rebellion of debt-ridden farmers in western Massachusetts. The farmers, many of them Revolutionary War veterans, faced imprisonment for unpaid debts and demanded relief from the state courts. When Shays and his followers attempted to seize a federal armory in Springfield, the national government under the Articles of Confederation proved unable to raise troops to respond. Massachusetts eventually put down the rebellion using a privately funded militia.',
    question: 'How did Shays\\'s Rebellion demonstrate the need for a stronger national government?',
    answerOptions: [
      {
        text: 'It showed that the national government could not effectively maintain order or raise a military force.',
        isCorrect: true,
        rationale:
          'The passage describes how the national government "proved unable to raise troops to respond," directly illustrating its weakness under the Articles.',
      },
      {
        text: 'It proved that individual states were too large to govern themselves effectively.',
        isCorrect: false,
        rationale:
          'Massachusetts did manage to suppress the rebellion using its own resources; the issue was the national government\\'s inability to act.',
      },
      {
        text: 'It demonstrated that farmers should not be allowed to petition the government.',
        isCorrect: false,
        rationale:
          'The right to petition was not the issue; the rebellion highlighted structural weaknesses in the Articles of Confederation.',
      },
      {
        text: 'It led directly to the abolition of state militias across the country.',
        isCorrect: false,
        rationale:
          'State militias were not abolished; in fact, Massachusetts used a privately funded militia to end the rebellion.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'The Constitutional Convention convened in Philadelphia in May 1787 with the stated purpose of revising the Articles of Confederation. Delegates from twelve of the thirteen states attended; Rhode Island refused to send representatives, fearing that a stronger central government would threaten its autonomy. Early in the proceedings, Virginia delegate James Madison presented a plan that called for an entirely new government with three separate branches and a bicameral legislature based on proportional representation. This proposal, known as the Virginia Plan, effectively shifted the Convention\\'s goal from revision to replacement of the Articles.',
    question: 'Why did Rhode Island refuse to send delegates to the Constitutional Convention?',
    answerOptions: [
      {
        text: 'Rhode Island feared that a stronger central government would undermine its independence.',
        isCorrect: true,
        rationale:
          'The passage states Rhode Island "refused to send representatives, fearing that a stronger central government would threaten its autonomy."',
      },
      {
        text: 'Rhode Island believed the Convention was unnecessary because the Articles worked well.',
        isCorrect: false,
        rationale:
          'While Rhode Island opposed the Convention, the passage specifically cites fear of losing autonomy, not satisfaction with the Articles.',
      },
      {
        text: 'Rhode Island was not invited to participate in the Convention.',
        isCorrect: false,
        rationale:
          'The passage implies Rhode Island chose not to attend ("refused"), not that it was excluded.',
      },
      {
        text: 'Rhode Island had already adopted its own new constitution.',
        isCorrect: false,
        rationale:
          'The passage does not mention Rhode Island having its own constitution; it cites concern about losing state autonomy.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      'One of the most contentious debates at the Constitutional Convention concerned representation in the new legislature. Large states favored the Virginia Plan, which proposed representation based on population, giving them more influence. Small states countered with the New Jersey Plan, which called for equal representation for every state, similar to the system under the Articles of Confederation. The deadlock was resolved by the Connecticut Compromise, also called the Great Compromise, which created a bicameral legislature: a House of Representatives with seats apportioned by population and a Senate with two members from each state.',
    question: 'What was the primary purpose of the Connecticut Compromise?',
    answerOptions: [
      {
        text: 'To resolve the dispute between large and small states over legislative representation.',
        isCorrect: true,
        rationale:
          'The passage describes the compromise as resolving the "deadlock" between the Virginia Plan (population-based) and the New Jersey Plan (equal representation).',
      },
      {
        text: 'To determine whether the president would be elected by popular vote or by Congress.',
        isCorrect: false,
        rationale:
          'Presidential election methods were a separate debate; the Connecticut Compromise specifically addressed legislative representation.',
      },
      {
        text: 'To establish the process for admitting new states to the Union.',
        isCorrect: false,
        rationale:
          'Admission of new states was addressed elsewhere in the Constitution, not by the Connecticut Compromise.',
      },
      {
        text: 'To define the powers of the judicial branch.',
        isCorrect: false,
        rationale:
          'The compromise dealt with the structure of Congress, not the judiciary.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 5,
    type: 'text',
    passage:
      'The Three-Fifths Compromise addressed how enslaved people would be counted for purposes of representation and taxation. Southern states wanted enslaved individuals counted fully toward their population, which would increase their seats in the House of Representatives. Northern states argued that since enslaved people were denied the rights of citizenship, they should not be counted at all. The compromise determined that three out of every five enslaved persons would be counted for both representation and direct taxation purposes.',
    question: 'Which inference can be drawn from the passage about the Three-Fifths Compromise?',
    answerOptions: [
      {
        text: 'Southern states sought to increase their political power by counting enslaved people toward representation.',
        isCorrect: true,
        rationale:
          'The passage states Southern states "wanted enslaved individuals counted fully toward their population, which would increase their seats in the House," revealing their political motivation.',
      },
      {
        text: 'Northern states wanted enslaved people counted to increase tax revenue from the South.',
        isCorrect: false,
        rationale:
          'Northern states argued enslaved people should not be counted at all; they were not trying to increase the South\\'s tax burden through this provision.',
      },
      {
        text: 'The compromise gave enslaved people three-fifths of the rights held by free citizens.',
        isCorrect: false,
        rationale:
          'The fraction applied only to population counts for representation and taxation, not to the rights of enslaved individuals.',
      },
      {
        text: 'Both Northern and Southern delegates agreed that slavery should eventually be abolished.',
        isCorrect: false,
        rationale:
          'The passage does not mention abolition; the debate was strictly about how to count enslaved people for political purposes.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 6,
    type: 'text',
    passage:
      'The principle of federalism divides governmental power between the national government and the state governments. The Constitution grants certain enumerated powers exclusively to the federal government, such as coining money, declaring war, and regulating interstate commerce. Powers not delegated to the federal government are reserved to the states or the people under the Tenth Amendment. Some powers, known as concurrent powers, are shared by both levels of government\u2014for example, the power to tax, build roads, and establish courts.',
    question: 'According to the passage, which is an example of a concurrent power?',
    answerOptions: [
      {
        text: 'The power to levy taxes.',
        isCorrect: true,
        rationale:
          'The passage lists "the power to tax" as a concurrent power shared by both levels of government.',
      },
      {
        text: 'The power to coin money.',
        isCorrect: false,
        rationale:
          'Coining money is listed as an enumerated power granted exclusively to the federal government.',
      },
      {
        text: 'The power to declare war.',
        isCorrect: false,
        rationale:
          'Declaring war is an enumerated federal power, not a concurrent power.',
      },
      {
        text: 'The power to regulate interstate commerce.',
        isCorrect: false,
        rationale:
          'Regulating interstate commerce is listed as an exclusively federal enumerated power.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 7,
    type: 'text',
    passage:
      'During the ratification debates of 1787\u20131788, Anti-Federalists argued that the proposed Constitution gave too much power to the central government and lacked protections for individual liberties. Prominent Anti-Federalists such as Patrick Henry and George Mason warned that without a bill of rights, the new government could become tyrannical. Federalists like Alexander Hamilton and James Madison countered that the structure of the government itself\u2014with its separation of powers and checks and balances\u2014provided sufficient protection. Ultimately, the promise to add a bill of rights was essential to securing ratification in several key states.',
    question: 'What was the primary concern of the Anti-Federalists regarding the proposed Constitution?',
    answerOptions: [
      {
        text: 'That the Constitution concentrated too much power in the national government without protecting individual rights.',
        isCorrect: true,
        rationale:
          'The passage states Anti-Federalists argued the Constitution "gave too much power to the central government and lacked protections for individual liberties."',
      },
      {
        text: 'That the Constitution maintained the weak central government of the Articles of Confederation.',
        isCorrect: false,
        rationale:
          'Anti-Federalists believed the opposite\u2014that the new government would be too strong, not too weak.',
      },
      {
        text: 'That the Constitution did not establish a legislature to represent the people.',
        isCorrect: false,
        rationale:
          'The Constitution did create a legislature (Congress); the Anti-Federalist concern was about individual rights, not the lack of a legislature.',
      },
      {
        text: 'That the Constitution would prevent states from collecting taxes.',
        isCorrect: false,
        rationale:
          'Taxation powers were not the central concern of the Anti-Federalists as described in this passage.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      'The Bill of Rights, ratified in 1791, comprises the first ten amendments to the United States Constitution. The First Amendment protects freedoms of religion, speech, the press, assembly, and the right to petition the government. The Second Amendment addresses the right to bear arms. The Fourth Amendment guards against unreasonable searches and seizures, while the Fifth Amendment protects against self-incrimination and guarantees due process of law. The Eighth Amendment prohibits cruel and unusual punishment.',
    question: 'A police officer searches a citizen\\'s home without a warrant or probable cause. Which amendment in the Bill of Rights is most directly violated?',
    answerOptions: [
      {
        text: 'The Fourth Amendment.',
        isCorrect: true,
        rationale:
          'The Fourth Amendment "guards against unreasonable searches and seizures," making a warrantless search without probable cause a direct violation.',
      },
      {
        text: 'The First Amendment.',
        isCorrect: false,
        rationale:
          'The First Amendment protects freedoms of religion, speech, press, and assembly\u2014not protection from searches.',
      },
      {
        text: 'The Fifth Amendment.',
        isCorrect: false,
        rationale:
          'The Fifth Amendment covers self-incrimination and due process, not protection against unreasonable searches.',
      },
      {
        text: 'The Eighth Amendment.',
        isCorrect: false,
        rationale:
          'The Eighth Amendment prohibits cruel and unusual punishment, which is not related to an unlawful search.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 9,
    type: 'text',
    passage:
      'The Constitution establishes three branches of government and assigns each distinct responsibilities. Article I creates the legislative branch (Congress), which makes laws. Article II establishes the executive branch, headed by the President, which enforces laws. Article III creates the judicial branch, headed by the Supreme Court, which interprets laws. Each branch has the ability to limit the powers of the others through a system known as checks and balances. For example, the President can veto legislation passed by Congress, Congress can override a veto with a two-thirds vote, and the Supreme Court can declare laws unconstitutional.',
    question: 'Which scenario best illustrates the system of checks and balances described in the passage?',
    answerOptions: [
      {
        text: 'The Supreme Court rules that a law passed by Congress violates the Constitution.',
        isCorrect: true,
        rationale:
          'The passage states the Supreme Court "can declare laws unconstitutional," which is a direct example of one branch checking another.',
      },
      {
        text: 'Congress passes a new law to fund public education.',
        isCorrect: false,
        rationale:
          'Passing a law is a normal legislative function, not an example of one branch checking another.',
      },
      {
        text: 'The President signs an executive order directing a federal agency.',
        isCorrect: false,
        rationale:
          'Directing a federal agency is a standard executive function, not a check on another branch.',
      },
      {
        text: 'A senator gives a speech on the floor of Congress.',
        isCorrect: false,
        rationale:
          'Giving a speech is part of normal legislative activity and does not demonstrate one branch limiting another\\'s power.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 10,
    type: 'text',
    passage:
      'The Supremacy Clause, found in Article VI of the Constitution, establishes that the Constitution, federal laws made pursuant to it, and treaties made under its authority constitute the "supreme Law of the Land." This means that when state laws conflict with federal laws, the federal law prevails. The clause was essential to establishing a functioning national government because under the Articles of Confederation, states frequently ignored or contradicted congressional directives, leading to economic chaos and interstate disputes.',
    question: 'What problem did the Supremacy Clause address?',
    answerOptions: [
      {
        text: 'States ignoring or contradicting federal directives under the Articles of Confederation.',
        isCorrect: true,
        rationale:
          'The passage states that under the Articles, "states frequently ignored or contradicted congressional directives," and the Supremacy Clause resolved this by making federal law supreme.',
      },
      {
        text: 'The lack of a national currency standard among the states.',
        isCorrect: false,
        rationale:
          'While currency issues existed under the Articles, the Supremacy Clause broadly addresses the hierarchy of laws, not currency specifically.',
      },
      {
        text: 'Disputes between the President and the Supreme Court over treaty powers.',
        isCorrect: false,
        rationale:
          'The Supremacy Clause addresses federal-state conflicts, not disputes between branches of the federal government.',
      },
      {
        text: 'The inability of citizens to vote for their representatives in Congress.',
        isCorrect: false,
        rationale:
          'Voting rights are addressed in other parts of the Constitution; the Supremacy Clause concerns the authority of federal over state law.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 11,
    type: 'knowledge',
    question: 'Which of the following best explains why the framers of the Constitution created an amendment process?',
    answerOptions: [
      {
        text: 'They recognized that the document would need to adapt to changing circumstances over time.',
        isCorrect: true,
        rationale:
          'The framers included Article V\\'s amendment process because they understood that no document could anticipate every future need, making flexibility essential.',
      },
      {
        text: 'They wanted to make it easy for any single state to change the Constitution.',
        isCorrect: false,
        rationale:
          'The amendment process requires broad consensus (two-thirds of Congress and three-fourths of states), not action by a single state.',
      },
      {
        text: 'They intended for the President to have sole authority to modify the Constitution.',
        isCorrect: false,
        rationale:
          'The President has no formal role in the constitutional amendment process; it is driven by Congress and state legislatures.',
      },
      {
        text: 'They believed the original Articles of Confederation were too easy to amend.',
        isCorrect: false,
        rationale:
          'The Articles actually required unanimous consent of all thirteen states to amend, making changes nearly impossible\u2014the opposite of easy.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 12,
    type: 'text',
    passage:
      'The Electoral College was established by Article II of the Constitution as the method for electing the President. Under this system, each state receives a number of electors equal to its total representation in Congress (House members plus two senators). The framers created this indirect system as a compromise between those who wanted Congress to choose the president and those who favored direct popular election. Critics have long argued that the Electoral College can produce a winner who did not receive the most popular votes nationally, as occurred in the elections of 1824, 1876, 1888, 2000, and 2016.',
    question: 'Why did the framers establish the Electoral College instead of a direct popular vote for president?',
    answerOptions: [
      {
        text: 'It served as a compromise between congressional selection and direct popular election.',
        isCorrect: true,
        rationale:
          'The passage explicitly states the Electoral College was created "as a compromise between those who wanted Congress to choose the president and those who favored direct popular election."',
      },
      {
        text: 'They believed only wealthy landowners should participate in presidential elections.',
        isCorrect: false,
        rationale:
          'The passage does not mention property qualifications; the compromise was about the method of selection, not voter eligibility.',
      },
      {
        text: 'They wanted to ensure that the candidate with the most popular votes would always win.',
        isCorrect: false,
        rationale:
          'The passage actually notes that the Electoral College has produced winners who did not receive the most popular votes.',
      },
      {
        text: 'They intended for the Supreme Court to have the final say in presidential elections.',
        isCorrect: false,
        rationale:
          'The Supreme Court is not part of the Electoral College system as described in the passage.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
];
