/**
 * Analyzing Arguments
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    question: "What is the author's main claim in the passage?",
    answerOptions: [
      {
        text: 'Cities should focus exclusively on building more affordable housing.',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
      {
        text: 'Urban green spaces are a critical and necessary component of a healthy city.',
        isCorrect: true,
        rationale:
          'Urban green spaces are a critical and necessary component of a healthy city.',
      },
      {
        text: 'The environmental benefits of parks outweigh the social benefits.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'City planners are not doing enough to combat the urban heat island effect.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Consider the key details in the question.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 2,
    question:
      'Which piece of evidence does the author use to support the claim about environmental benefits?',
    answerOptions: [
      {
        text: 'The assertion that parks increase the value of nearby properties.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'The statement that a single tree can provide the cooling effect of ten air conditioners.',
        isCorrect: true,
        rationale:
          'The statement that a single tree can provide the cooling effect of ten air conditioners.',
      },
      {
        text: 'The argument that parks foster community cohesion.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'The claim that time spent in nature reduces stress.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 3,
    question:
      'In paragraph 4, the author addresses the counterargument that cities need land for housing, not parks. How does the author rebut this point?',
    answerOptions: [
      {
        text: 'By arguing that housing is not as important as parks.',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
      {
        text: 'By agreeing that parks should only be built if there is no housing shortage.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: "By stating that the choice between housing and parks is a 'false dichotomy' and that both are possible.",
        isCorrect: true,
        rationale:
          "By stating that the choice between housing and parks is a 'false dichotomy' and that both are possible.",
      },
      {
        text: 'By providing statistics on how many new parks have been built recently.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 4,
    question:
      "The author's claim that 'studies have consistently shown' that nature reduces stress is an appeal to what?",
    answerOptions: [
      {
        text: 'Emotion',
        isCorrect: false,
        rationale:
          'This option does not accurately reflect the passage or question context.',
      },
      {
        text: 'Tradition',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Consider the key details in the question.',
      },
      {
        text: 'Authority or expert evidence',
        isCorrect: true,
        rationale: 'Authority or expert evidence',
      },
      {
        text: 'Anecdotal evidence',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 5,
    question:
      "What is the logical flaw in the argument that cities 'cannot afford to 'waste' land on parks,' as described by the author?",
    answerOptions: [
      {
        text: 'It is an ad hominem attack on city planners.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Consider the key details in the question.',
      },
      {
        text: 'It is a slippery slope argument that assumes parks will lead to bankruptcy.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'It presents a false dichotomy by suggesting the only choice is between parks and housing.',
        isCorrect: true,
        rationale:
          'It presents a false dichotomy by suggesting the only choice is between parks and housing.',
      },
      {
        text: 'It is a circular argument that repeats the claim without evidence.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 6,
    question:
      'Which of the following statements is presented as a fact rather than an opinion in the passage?',
    answerOptions: [
      {
        text: 'Green spaces are not a luxury, but a vital necessity.',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
      {
        text: 'The argument against green spaces is shortsighted.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'Trees and vegetation absorb carbon dioxide.',
        isCorrect: true,
        rationale: 'Trees and vegetation absorb carbon dioxide.',
      },
      {
        text: 'The choice is between short-term profit and long-term sustainability.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Consider the key details in the question.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 7,
    question:
      "The author's argument would be most weakened by which of the following findings?",
    answerOptions: [
      {
        text: 'A new study showing that the cooling effect of trees is less than previously thought.',
        isCorrect: true,
        rationale:
          'A new study showing that the cooling effect of trees is less than previously thought.',
      },
      {
        text: 'A report that community gardens are growing in popularity.',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
      {
        text: 'Evidence that most city residents prefer indoor recreation.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Consider the key details in the question.',
      },
      {
        text: 'A survey showing that people feel happier after visiting a park.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Consider the key details in the question.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 8,
    question: "The author's argument would be most strengthened by including:",
    answerOptions: [
      {
        text: 'more emotional language about the beauty of nature.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: "a personal story about the author's favorite park.",
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'specific data from a city where adding parks led to measurable economic and health benefits.',
        isCorrect: true,
        rationale:
          'specific data from a city where adding parks led to measurable economic and health benefits.',
      },
      {
        text: 'a longer discussion of the history of urban development.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 9,
    question:
      'What unstated assumption does the author make about their audience?',
    answerOptions: [
      {
        text: 'The audience is primarily made up of real estate developers.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'The audience values scientific evidence and the well-being of citizens.',
        isCorrect: true,
        rationale:
          'The audience values scientific evidence and the well-being of citizens.',
      },
      {
        text: 'The audience is opposed to any form of government spending.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Consider the key details in the question.',
      },
      {
        text: 'The audience has little interest in environmental issues.',
        isCorrect: false,
        rationale:
          'This option does not accurately reflect the passage or question context.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 10,
    question:
      "By stating that the argument against green spaces is 'shortsighted,' the author implies that opponents are:",
    answerOptions: [
      {
        text: 'focusing on immediate costs without considering long-term benefits.',
        isCorrect: true,
        rationale:
          'focusing on immediate costs without considering long-term benefits.',
      },
      {
        text: 'maliciously trying to harm the environment.',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
      {
        text: 'unaware of the current housing shortage.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'proposing a better long-term solution.',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 11,
    question:
      "Is the author's claim that green spaces can 'save millions in infrastructure costs' a valid conclusion based on the evidence provided?",
    answerOptions: [
      {
        text: 'No, because the author provides no evidence to support this specific financial claim.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
      {
        text: 'Yes, because the author logically connects permeable surfaces to reduced stormwater runoff and flooding.',
        isCorrect: true,
        rationale:
          'Yes, because the author logically connects permeable surfaces to reduced stormwater runoff and flooding.',
      },
      {
        text: 'No, because building parks is always more expensive than building flood barriers.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'Yes, because all green spaces are known to generate revenue for cities.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 12,
    question:
      "The author's argument that green spaces are 'essential infrastructure' is an attempt to:",
    answerOptions: [
      {
        text: "frame parks as being as critical to a city's function as roads and bridges.",
        isCorrect: true,
        rationale:
          "frame parks as being as critical to a city's function as roads and bridges.",
      },
      {
        text: 'suggest that parks should be funded through taxes on gasoline.',
        isCorrect: false,
        rationale:
          'This option does not accurately reflect the passage or question context.',
      },
      {
        text: 'argue that all green spaces should be built with concrete and steel.',
        isCorrect: false,
        rationale:
          'While this might seem plausible, it is not supported by the information given.',
      },
      {
        text: 'prove that green spaces are a new and untested idea.',
        isCorrect: false,
        rationale:
          'This option does not accurately reflect the passage or question context.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 13,
    question:
      "How does the author use the example of 'underserved neighborhoods' in paragraph 3 to support the main argument?",
    answerOptions: [
      {
        text: 'To suggest that only poor neighborhoods need parks.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'To highlight the equity and social justice dimension of providing green spaces.',
        isCorrect: true,
        rationale:
          'To highlight the equity and social justice dimension of providing green spaces.',
      },
      {
        text: 'To argue that parks in wealthy neighborhoods are a waste of money.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'To prove that all social gatherings happen in parks.',
        isCorrect: false,
        rationale:
          'This option does not accurately reflect the passage or question context.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 14,
    question:
      'Which of the following claims made by the author is LEAST supported by specific evidence in the text?',
    answerOptions: [
      {
        text: 'Green spaces mitigate the urban heat island effect.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'Access to green space is linked to improved health.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'The presence of parks can increase the value of nearby residential properties.',
        isCorrect: true,
        rationale:
          'The presence of parks can increase the value of nearby residential properties.',
      },
      {
        text: 'Green spaces can help manage stormwater.',
        isCorrect: false,
        rationale:
          'This answer is incorrect. Review the passage carefully to find the correct information.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
  {
    questionNumber: 15,
    question:
      "Overall, is the author's argument that green spaces are a 'vital necessity' convincing?",
    answerOptions: [
      {
        text: 'No, because the author fails to address any counterarguments.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'No, because the author relies solely on emotional appeals without any factual evidence.',
        isCorrect: false,
        rationale:
          'This option does not accurately reflect the passage or question context.',
      },
      {
        text: 'Yes, because the author presents a variety of environmental, social, and health benefits and refutes a key counterargument.',
        isCorrect: true,
        rationale:
          'Yes, because the author presents a variety of environmental, social, and health benefits and refutes a key counterargument.',
      },
      {
        text: 'Yes, but only for cities that do not have a housing shortage.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['rla-7'],
  },
];
