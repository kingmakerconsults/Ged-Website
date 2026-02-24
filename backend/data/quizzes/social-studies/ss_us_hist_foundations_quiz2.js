/**
 * Foundations of American Government: Quiz 2
 * Topics: The Federalist Papers, Separation of Powers, Ratification Debates, Popular Sovereignty
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      'In Federalist No. 10, James Madison argued that a large republic would be better equipped to control the dangers of factions\u2014groups of citizens united by a common interest adverse to the rights of others or the community as a whole. Madison reasoned that in a larger republic, the greater number and variety of interests would make it more difficult for any single faction to gain majority control. He contrasted this with small democracies, where a dominant faction could easily oppress minorities.',
    question: 'According to Madison in Federalist No. 10, why would a large republic be more effective at controlling factions?',
    answerOptions: [
      {
        text: 'A greater diversity of interests would prevent any single faction from dominating.',
        isCorrect: true,
        rationale:
          'Madison argued that "the greater number and variety of interests" in a large republic would make it harder for one faction to gain majority control.',
      },
      {
        text: 'A strong executive would have the power to ban dangerous factions.',
        isCorrect: false,
        rationale:
          'Madison\u2019s argument relied on the natural diversity of a large republic, not executive authority to suppress groups.',
      },
      {
        text: 'Citizens in large republics are generally less interested in politics.',
        isCorrect: false,
        rationale:
          'Madison did not argue that political apathy was a solution; he focused on structural advantages of size and diversity.',
      },
      {
        text: 'The Constitution would outlaw the formation of political factions.',
        isCorrect: false,
        rationale:
          'Madison acknowledged that factions were inevitable and could not be eliminated without destroying liberty; the goal was to control their effects.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 2,
    type: 'text',
    passage:
      'In Federalist No. 51, Madison wrote: "If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary. In framing a government which is to be administered by men over men, the great difficulty lies in this: you must first enable the government to control the governed; and in the next place oblige it to control itself." This passage encapsulates the Federalist argument for why the Constitution\u2019s system of checks and balances was essential.',
    question: 'What is the main argument Madison makes in this excerpt from Federalist No. 51?',
    answerOptions: [
      {
        text: 'Government must be powerful enough to govern but also structured to limit its own power.',
        isCorrect: true,
        rationale:
          'Madison states the "great difficulty" is enabling government to "control the governed" while also obliging it "to control itself"\u2014a dual requirement.',
      },
      {
        text: 'The ideal government would have no restrictions on its authority.',
        isCorrect: false,
        rationale:
          'Madison explicitly argues the opposite: government must be obliged to "control itself" through internal checks.',
      },
      {
        text: 'Only morally perfect leaders should be allowed to hold public office.',
        isCorrect: false,
        rationale:
          'Madison\u2019s point is precisely that leaders are not angels, which is why structural safeguards are needed.',
      },
      {
        text: 'Citizens should directly vote on all laws rather than electing representatives.',
        isCorrect: false,
        rationale:
          'Madison was arguing for representative government with built-in checks, not direct democracy.',
      },
    ],
    challenge_tags: ['social-1', 'social-4', 'rla-5'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'The principle of popular sovereignty holds that the authority of government is derived from the consent of the people. This concept is reflected in the opening words of the Constitution: "We the People of the United States." Unlike monarchies, where power flows from a sovereign ruler, or theocracies, where authority is claimed through divine right, a government based on popular sovereignty recognizes that citizens are the ultimate source of political legitimacy. The framers embedded this principle through mechanisms such as elections, the amendment process, and representative government.',
    question: 'Which phrase from the Constitution most directly reflects the principle of popular sovereignty?',
    answerOptions: [
      {
        text: '"We the People of the United States"',
        isCorrect: true,
        rationale:
          'The passage explicitly identifies this phrase as reflecting popular sovereignty\u2014the idea that government authority comes from the people.',
      },
      {
        text: '"Congress shall make no law"',
        isCorrect: false,
        rationale:
          'This phrase from the First Amendment addresses limits on government power, not the source of government authority.',
      },
      {
        text: '"The executive Power shall be vested in a President"',
        isCorrect: false,
        rationale:
          'This clause establishes the executive branch but does not directly express the idea that power originates from the people.',
      },
      {
        text: '"All legislative Powers herein granted"',
        isCorrect: false,
        rationale:
          'This describes the scope of congressional power but does not directly affirm popular sovereignty.',
      },
    ],
    challenge_tags: ['social-1', 'rla-5'],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      'The Constitution requires that a proposed amendment receive approval from two-thirds of both houses of Congress before being sent to the states for ratification. Three-fourths of the state legislatures (or state conventions) must then approve the amendment for it to become part of the Constitution. Alternatively, two-thirds of state legislatures can call a constitutional convention to propose amendments, though this method has never been used. Since 1789, over 11,000 amendments have been proposed in Congress, but only 27 have been ratified.',
    question: 'What conclusion can be drawn from the fact that only 27 of over 11,000 proposed amendments have been ratified?',
    answerOptions: [
      {
        text: 'The amendment process was intentionally designed to require broad consensus, making change difficult.',
        isCorrect: true,
        rationale:
          'The very low success rate (27 out of 11,000+) reflects the high thresholds required\u2014two-thirds of Congress and three-fourths of states\u2014indicating the process was designed to prevent hasty changes.',
      },
      {
        text: 'Americans have generally been uninterested in changing the Constitution.',
        isCorrect: false,
        rationale:
          'Over 11,000 proposed amendments suggest strong interest in change; the low success rate reflects the difficulty of the process, not lack of interest.',
      },
      {
        text: 'The President has vetoed most proposed amendments.',
        isCorrect: false,
        rationale:
          'The President has no formal role in the amendment process and cannot veto a proposed amendment.',
      },
      {
        text: 'State legislatures have consistently refused to participate in the ratification process.',
        isCorrect: false,
        rationale:
          'State legislatures have ratified 27 amendments; it is the high threshold (three-fourths), not refusal to participate, that limits ratification.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 5,
    type: 'text',
    passage:
      'The concept of separation of powers divides the federal government into three distinct branches, each with its own responsibilities. The legislative branch (Congress) writes the laws. The executive branch (the President) enforces the laws. The judicial branch (the courts) interprets the laws. The French Enlightenment thinker Baron de Montesquieu strongly influenced this design. In his 1748 work "The Spirit of the Laws," Montesquieu argued that concentrating legislative, executive, and judicial power in the same hands\u2014whether of one person or a group\u2014was the very definition of tyranny.',
    question: 'How did Montesquieu\u2019s ideas influence the structure of the U.S. government?',
    answerOptions: [
      {
        text: 'His argument that combining powers leads to tyranny inspired the framers to divide government into three branches.',
        isCorrect: true,
        rationale:
          'The passage states Montesquieu argued that concentrating all powers "was the very definition of tyranny," and this "strongly influenced" the Constitution\u2019s three-branch design.',
      },
      {
        text: 'He proposed that the United States should adopt a parliamentary system similar to Britain\u2019s.',
        isCorrect: false,
        rationale:
          'Montesquieu advocated for separation of powers, which differs from a parliamentary system where legislative and executive functions overlap.',
      },
      {
        text: 'He argued that only a monarchy could effectively prevent tyranny.',
        isCorrect: false,
        rationale:
          'Montesquieu\u2019s argument was against concentrating power, whether in a monarch or any single entity.',
      },
      {
        text: 'He designed the specific system of checks and balances used in the Constitution.',
        isCorrect: false,
        rationale:
          'While Montesquieu inspired the principle, the specific mechanisms of checks and balances were developed by the framers at the Convention.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 6,
    type: 'text',
    passage:
      'During the ratification debates, the Federalist and Anti-Federalist camps produced extensive written arguments for and against the proposed Constitution. The Federalist Papers, authored by Alexander Hamilton, James Madison, and John Jay under the pseudonym "Publius," consisted of 85 essays published in New York newspapers. These essays systematically defended the Constitution\u2019s provisions and addressed concerns about centralized power. Anti-Federalist writers, using pseudonyms like "Brutus" and "Centinel," argued that the Constitution created a government that was too distant from the people and that it lacked explicit protections for individual liberties.',
    question: 'Why did both Federalists and Anti-Federalists use pseudonyms when publishing their arguments?',
    answerOptions: [
      {
        text: 'Using pseudonyms was a common practice that encouraged readers to evaluate arguments on their merits rather than the authors\u2019 reputations.',
        isCorrect: true,
        rationale:
          'In 18th-century political discourse, pseudonyms allowed ideas to be judged independently of the writer\u2019s personal standing or potential retribution.',
      },
      {
        text: 'The authors feared arrest by the British government for publishing political opinions.',
        isCorrect: false,
        rationale:
          'By 1787\u20131788, the United States was independent; authors were not at risk from Britain but followed established literary conventions.',
      },
      {
        text: 'The Constitution prohibited government officials from publishing political essays.',
        isCorrect: false,
        rationale:
          'No such prohibition existed; many authors were prominent public figures whose identities were widely suspected.',
      },
      {
        text: 'Only Anti-Federalists used pseudonyms to hide their opposition to the government.',
        isCorrect: false,
        rationale:
          'The passage states that both sides used pseudonyms: "Publius" for Federalists and "Brutus" and "Centinel" for Anti-Federalists.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 7,
    type: 'text',
    passage:
      'The Necessary and Proper Clause, found in Article I, Section 8 of the Constitution, grants Congress the power "to make all Laws which shall be necessary and proper for carrying into Execution" its enumerated powers. This clause, sometimes called the Elastic Clause, has been used to justify a wide range of congressional actions not explicitly mentioned in the Constitution. Strict constructionists, like Thomas Jefferson, argued this clause should be interpreted narrowly, while loose constructionists, like Alexander Hamilton, believed it granted Congress broad implied powers to address national needs.',
    question: 'Why is the Necessary and Proper Clause sometimes called the "Elastic Clause"?',
    answerOptions: [
      {
        text: 'Because it can be stretched to justify a wide range of congressional powers beyond those explicitly listed.',
        isCorrect: true,
        rationale:
          'The passage explains the clause "has been used to justify a wide range of congressional actions not explicitly mentioned," making it flexible or elastic in its application.',
      },
      {
        text: 'Because it allows the Constitution to be amended without a formal process.',
        isCorrect: false,
        rationale:
          'The amendment process is governed by Article V, not the Necessary and Proper Clause; this clause expands legislative power, not the amendment process.',
      },
      {
        text: 'Because it gives the President the ability to expand executive authority.',
        isCorrect: false,
        rationale:
          'The clause applies to Congress (Article I), not to presidential power.',
      },
      {
        text: 'Because it allows states to override federal laws when necessary.',
        isCorrect: false,
        rationale:
          'The clause grants Congress additional power; it does not give states the ability to override federal law.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      'The process of ratifying the Constitution required approval by conventions in at least nine of the thirteen states. Delaware became the first state to ratify on December 7, 1787, followed quickly by Pennsylvania and New Jersey. The most difficult battles took place in large, influential states like Virginia and New York, where Anti-Federalist opposition was strong. In Virginia, James Madison debated Patrick Henry for weeks before the convention narrowly approved ratification 89\u201379. New York ratified by an even slimmer margin of 30\u201327, influenced partly by the Federalist Papers and partly by the knowledge that the Constitution would take effect with or without New York\u2019s approval.',
    question: 'What factor helped persuade New York to ratify the Constitution despite strong Anti-Federalist opposition?',
    answerOptions: [
      {
        text: 'The realization that the Constitution would take effect regardless of New York\u2019s decision.',
        isCorrect: true,
        rationale:
          'The passage states New York was "influenced partly by the knowledge that the Constitution would take effect with or without New York\u2019s approval."',
      },
      {
        text: 'A guarantee that New York City would become the permanent national capital.',
        isCorrect: false,
        rationale:
          'The passage does not mention any deal about the capital; the persuasive factors were the Federalist Papers and the inevitability of ratification.',
      },
      {
        text: 'New York was the first state to ratify and wanted to set a precedent.',
        isCorrect: false,
        rationale:
          'Delaware was the first state to ratify; New York was among the later states to approve.',
      },
      {
        text: 'Anti-Federalists in New York withdrew their objections after the Bill of Rights was ratified.',
        isCorrect: false,
        rationale:
          'The Bill of Rights was not ratified until 1791; New York\u2019s ratification occurred in 1788.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 9,
    type: 'knowledge',
    question: 'The principle of "limited government" means that:',
    answerOptions: [
      {
        text: 'the government may only exercise powers granted to it by the Constitution.',
        isCorrect: true,
        rationale:
          'Limited government is the principle that governmental authority is restricted to the powers delegated by the founding document, preventing overreach.',
      },
      {
        text: 'only a small number of citizens are allowed to participate in elections.',
        isCorrect: false,
        rationale:
          'Limited government refers to restrictions on governmental power, not on citizen participation in elections.',
      },
      {
        text: 'the government should only operate during limited hours of the day.',
        isCorrect: false,
        rationale:
          'The term refers to the scope of government authority, not operational schedules.',
      },
      {
        text: 'states have no power to make their own laws or policies.',
        isCorrect: false,
        rationale:
          'Under federalism, states retain significant powers; limited government restricts the national government, not the states.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 10,
    type: 'text',
    passage:
      'The concept of rule of law holds that no person\u2014including government officials and elected leaders\u2014is above the law. All individuals and institutions are subject to and accountable under the law, which must be publicly promulgated, equally enforced, and independently adjudicated. The framers embedded this principle throughout the Constitution, including provisions for impeachment of the President, requirements that all officials swear an oath to support the Constitution, and the establishment of an independent judiciary with lifetime appointments to insulate judges from political pressure.',
    question: 'How does the impeachment process reflect the principle of rule of law?',
    answerOptions: [
      {
        text: 'It ensures that even the President can be held accountable for violating the law.',
        isCorrect: true,
        rationale:
          'The passage states rule of law means "no person\u2014including government officials and elected leaders\u2014is above the law," and impeachment provides the mechanism to enforce this for the highest officeholder.',
      },
      {
        text: 'It allows the President to remove members of Congress who break the law.',
        isCorrect: false,
        rationale:
          'Impeachment is a congressional power over executive and judicial officials; the President cannot impeach members of Congress.',
      },
      {
        text: 'It gives the Supreme Court the authority to elect a new President.',
        isCorrect: false,
        rationale:
          'The Supreme Court does not participate in impeachment proceedings or select the President; impeachment is handled by Congress.',
      },
      {
        text: 'It prevents any changes from being made to the Constitution.',
        isCorrect: false,
        rationale:
          'Impeachment is a process for removing officials, unrelated to the amendment process.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
];
