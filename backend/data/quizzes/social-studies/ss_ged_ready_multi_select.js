/**
 * GED Ready-Style Multi-Select Questions
 * Questions with multiple correct answers (2-3 correct out of 5-6 options).
 * The frontend auto-detects multi-select when multiple answerOptions have isCorrect: true.
 */

module.exports = [
  {
    "questionNumber": 1,
    "type": "text",
    "difficulty": "medium",
    "topic": "Civics & Government",
    "contentArea": "civics",
    "multiSelect": true,
    "passage": "This paragraph is the First Amendment to the U.S. Constitution.\n\nCongress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or [limiting] the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government [to settle] grievances.\n\nA photograph from the Library of Congress shows suffragists picketing at the White House on January 25, 1917. The women carry signs reading messages such as \"Mr. President, you say liberty is the fundamental demand of the human spirit\" and \"Mr. President, we are interested in the United States, politically speaking, in nothing but human liberty.\"",
    "question": "Based on the description, which 1st Amendment rights are the protesters using to send their message to President Woodrow Wilson? Select <strong>all</strong> that apply.",
    "answerOptions": [
      {
        "text": "freedom of religion",
        "rationale": "The protesters' signs and actions do not involve religious practice or belief. They are expressing political views, not exercising religious freedom.",
        "isCorrect": false
      },
      {
        "text": "right to peaceable assembly",
        "rationale": "Correct. The suffragists are peacefully gathering as a group in a public space (in front of the White House) to make their political message heard — this is the right to peaceable assembly.",
        "isCorrect": true
      },
      {
        "text": "freedom of the press",
        "rationale": "Freedom of the press protects publishing and media. The suffragists are personally protesting with signs, not publishing through a press outlet.",
        "isCorrect": false
      },
      {
        "text": "freedom of speech",
        "rationale": "Correct. The suffragists are expressing their political opinions through signs with written messages directed at the president — this is an exercise of free speech.",
        "isCorrect": true
      },
      {
        "text": "right to petition the government",
        "rationale": "Correct. The suffragists are directly addressing the president ('Mr. President') with their demands for liberty and political rights — this is petitioning the government to address their grievances.",
        "isCorrect": true
      }
    ]
  },
  {
    "questionNumber": 2,
    "type": "text",
    "difficulty": "hard",
    "topic": "Civics & Government",
    "contentArea": "civics",
    "multiSelect": true,
    "passage": "The following is the text of the Fourteenth Amendment, Section 1, to the U.S. Constitution (ratified 1868).\n\nAll persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside. No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws.",
    "question": "Which protections are guaranteed by this amendment? Select <strong>all</strong> that apply.",
    "answerOptions": [
      {
        "text": "Citizenship for all persons born in the United States",
        "rationale": "Correct. The amendment explicitly states that 'All persons born or naturalized in the United States . . . are citizens.'",
        "isCorrect": true
      },
      {
        "text": "The right to bear arms",
        "rationale": "The right to bear arms is addressed by the Second Amendment, not the Fourteenth.",
        "isCorrect": false
      },
      {
        "text": "Equal protection under the law",
        "rationale": "Correct. The amendment states that no state shall 'deny to any person within its jurisdiction the equal protection of the laws.'",
        "isCorrect": true
      },
      {
        "text": "The right to a jury trial in civil cases",
        "rationale": "The right to a jury trial in civil cases is addressed by the Seventh Amendment, not the Fourteenth.",
        "isCorrect": false
      },
      {
        "text": "Due process before deprivation of life, liberty, or property",
        "rationale": "Correct. The amendment states that no state shall 'deprive any person of life, liberty, or property, without due process of law.'",
        "isCorrect": true
      }
    ]
  }
];
