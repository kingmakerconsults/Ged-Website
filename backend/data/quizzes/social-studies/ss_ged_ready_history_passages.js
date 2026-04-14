/**
 * GED Ready-Style U.S. History — Passage-Based Questions
 * Modeled after GED Ready® Social Studies exam format:
 *   - Primary source passages (150-350 words)
 *   - Jim Crow, Civil Rights, suffrage, early Republic
 *   - Higher-order thinking: inference, timeline, accuracy checks
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'hard',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This passage describes Jim Crow laws in the United States.\n\nFor years discriminatory laws known as "black codes" were enforced against African Americans in the United States. These laws, which legalized segregation and unfair treatment of people based on race, ensured that African Americans remained second-class citizens despite the ratification of the 14th Amendment in 1868.\nThe 14th Amendment was passed following the Civil War. Included in the amendment were the due process clause and the equal protection clause, which declared unfair treatment of people based on race to be unconstitutional and thus required that all people be treated equally under the law. However, after Reconstruction the "Jim Crow" laws, which replaced the black codes, ignored the amendment as it related to African Americans.\nJim Crow laws were upheld largely through violence and were used to ensure that African Americans remained second-class citizens socially, politically, economically, and legally. African Americans who resisted were often subjected to beatings or even lynching. Jim Crow laws were so embedded in society that they remained in effect for many years, ending only after passage of the Civil Rights Act and the Voting Rights Act in the 1960s.',
    question: 'Based on this passage, which statement is accurate?',
    answerOptions: [
      {
        text: 'Jim Crow laws took effect during the Civil War.',
        rationale:
          "The passage states Jim Crow laws replaced the black codes 'after Reconstruction,' which followed the Civil War.",
        isCorrect: false,
      },
      {
        text: 'Jim Crow laws were created before Reconstruction.',
        rationale:
          "The passage indicates that 'black codes' existed before Reconstruction, but Jim Crow laws came after — they 'replaced the black codes' after Reconstruction.",
        isCorrect: false,
      },
      {
        text: 'Jim Crow laws were created as a response to the Civil Rights Act.',
        rationale:
          "The passage states Jim Crow laws ended 'only after passage of the Civil Rights Act,' so they existed before it, not as a response to it.",
        isCorrect: false,
      },
      {
        text: 'Jim Crow laws took effect after ratification of the 14th Amendment.',
        rationale:
          "Correct. The passage states the 14th Amendment was ratified in 1868, and 'after Reconstruction' the Jim Crow laws replaced the black codes, ignoring the amendment. This means they took effect after the amendment was ratified.",
        isCorrect: true,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This excerpt is from the Seneca Falls Declaration of Sentiments, written in 1848.\n\nWe hold these truths to be self-evident: that all men and women are created equal; that they are endowed by their Creator with certain inalienable rights; that among these are life, liberty, and the pursuit of happiness; that to secure these rights governments are instituted, deriving their just powers from the consent of the governed. . . .\n\nThe history of mankind is a history of repeated injuries and usurpations on the part of man toward woman, having in direct object the establishment of an absolute tyranny over her. To prove this, let facts be submitted to a candid world.\n\nHe has never permitted her to exercise her inalienable right to the elective franchise.\nHe has compelled her to submit to laws, in the formation of which she had no voice.\nHe has made her, if married, in the eye of the law, civilly dead.',
    question:
      'The writers of the Seneca Falls Declaration modeled their document after which earlier American document?',
    answerOptions: [
      {
        text: 'The U.S. Constitution',
        rationale:
          'While the Constitution is a foundational document, the Declaration of Sentiments mirrors the language and structure of the Declaration of Independence, not the Constitution.',
        isCorrect: false,
      },
      {
        text: 'The Declaration of Independence',
        rationale:
          "Correct. The opening language ('We hold these truths to be self-evident') and the list of grievances closely mirror Thomas Jefferson's Declaration of Independence, deliberately adapting it to advocate for women's rights.",
        isCorrect: true,
      },
      {
        text: 'The Federalist Papers',
        rationale:
          'The Federalist Papers were essays arguing for ratification of the Constitution, written in a very different style from this declaration.',
        isCorrect: false,
      },
      {
        text: 'The Bill of Rights',
        rationale:
          'The Bill of Rights lists specific amendments to the Constitution. The Declaration of Sentiments follows a different structure—a statement of principles followed by a list of grievances.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      "This excerpt is from President Franklin D. Roosevelt's First Inaugural Address, delivered on March 4, 1933.\n\nThis is preeminently the time to speak the truth, the whole truth, frankly and boldly. Nor need we shrink from honestly facing conditions in our country today. This great Nation will endure as it has endured, will revive and will prosper. So, first of all, let me assert my firm belief that the only thing we have to fear is fear itself—nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance. In every dark hour of our national life a leadership of frankness and vigor has met with that understanding and support of the people themselves which is essential to victory. . . .\n\nOur greatest primary task is to put people to work. This is no unsolvable problem if we face it wisely and courageously. It can be accomplished in part by direct recruiting by the Government itself, treating the task as we would treat the emergency of a war, but at the same time, through this employment, accomplishing greatly needed projects to stimulate and reorganize the use of our natural resources.",
    question:
      'Based on the excerpt, which approach did Roosevelt propose for addressing unemployment?',
    answerOptions: [
      {
        text: 'Reducing the size of the federal government to cut spending',
        rationale:
          'Roosevelt proposed the opposite — using the government to directly create jobs, not reducing government.',
        isCorrect: false,
      },
      {
        text: 'Having the government directly employ people for needed projects',
        rationale:
          "Correct. Roosevelt explicitly states that putting people to work 'can be accomplished in part by direct recruiting by the Government itself' and 'accomplishing greatly needed projects.'",
        isCorrect: true,
      },
      {
        text: 'Encouraging private businesses to voluntarily hire more workers',
        rationale:
          'The excerpt does not mention private business hiring. Roosevelt specifically proposes government action.',
        isCorrect: false,
      },
      {
        text: 'Waiting for the economy to recover on its own through market forces',
        rationale:
          "Roosevelt's tone is urgent and action-oriented. He compares the task to 'the emergency of a war,' indicating he does not advocate waiting.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'hard',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This is an excerpt from "What to the Slave Is the Fourth of July?" a speech delivered by Frederick Douglass on July 5, 1852.\n\nFellow-citizens, pardon me, allow me to ask, why am I called upon to speak here to-day? What have I, or those I represent, to do with your national independence? Are the great principles of political freedom and of natural justice, embodied in that Declaration of Independence, extended to us? . . .\n\nWhat, to the American slave, is your Fourth of July? I answer; a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim. To him, your celebration is a sham; your boasted liberty, an unholy license; your national greatness, swelling vanity; your sounds of rejoicing are empty and heartless; your denunciation of tyrants, brass fronted impudence; your shouts of liberty and equality, hollow mockery.',
    question:
      'What is the main purpose of Douglass\'s use of the word "your" throughout the excerpt?',
    answerOptions: [
      {
        text: "To show respect for the audience's patriotic traditions",
        rationale:
          "Douglass's use of 'your' is not respectful — it is deliberately distancing, meant to point out exclusion rather than honor traditions.",
        isCorrect: false,
      },
      {
        text: 'To emphasize that the promises of liberty do not apply to enslaved people',
        rationale:
          "Correct. By repeatedly saying 'your Fourth of July,' 'your celebration,' 'your boasted liberty,' Douglass draws a sharp contrast between the freedoms celebrated by white Americans and the reality of enslavement — the holiday and its ideals belong to them, not to the enslaved.",
        isCorrect: true,
      },
      {
        text: 'To encourage the audience to take personal responsibility for ending slavery',
        rationale:
          "While Douglass may want the audience to act, his use of 'your' primarily serves to highlight the hypocrisy and exclusion, not to assign personal responsibility.",
        isCorrect: false,
      },
      {
        text: 'To suggest that the Declaration of Independence was written for all Americans',
        rationale:
          "Douglass's point is the opposite — he questions whether the Declaration's principles have been 'extended to us,' implying they have not been applied to enslaved people.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      "This excerpt is from President Harry S. Truman's address to Congress requesting aid for Greece and Turkey, delivered on March 12, 1947.\n\nAt the present moment in world history nearly every nation must choose between alternative ways of life. The choice is too often not a free one.\n\nOne way of life is based upon the will of the majority, and is distinguished by free institutions, representative government, free elections, guarantees of individual liberty, freedom of speech and religion, and freedom from political oppression.\n\nThe second way of life is based upon the will of a minority forcibly imposed upon the majority. It relies upon terror and oppression, a controlled press and radio, fixed elections, and the suppression of personal freedoms.\n\nI believe that it must be the policy of the United States to support free peoples who are resisting attempted subjugation by armed minorities or by outside pressures.",
    question:
      'Which foreign policy principle is Truman establishing in this address?',
    answerOptions: [
      {
        text: 'Isolationism — the United States should avoid involvement in foreign conflicts.',
        rationale:
          'Truman is advocating for active U.S. involvement, the opposite of isolationism.',
        isCorrect: false,
      },
      {
        text: 'Containment — the United States should support nations resisting the spread of communism.',
        rationale:
          'Correct. This speech established the Truman Doctrine, committing the U.S. to supporting free peoples resisting subjugation — a cornerstone of the Cold War containment policy against the spread of communism.',
        isCorrect: true,
      },
      {
        text: 'Imperialism — the United States should expand its territory to protect global interests.',
        rationale:
          'Truman does not advocate for territorial expansion. His proposal is to support existing free governments, not to acquire new territories.',
        isCorrect: false,
      },
      {
        text: 'Détente — the United States should pursue peaceful negotiations with the Soviet Union.',
        rationale:
          "Détente refers to a later period of eased Cold War tensions. Truman's speech establishes a confrontational stance, not a conciliatory one.",
        isCorrect: false,
      },
    ],
  },
];
