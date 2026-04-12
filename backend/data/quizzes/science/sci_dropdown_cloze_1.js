// Science dropdown/cloze items (official GED pattern — sentence completion with embedded dropdowns)
// These use the existing inline_dropdown infrastructure.
// Each entry is a standalone cloze item: passageWithPlaceholders + per-blank answerOptions.
module.exports = [
  {
    "questionNumber": 1,
    "type": "multipleChoice",
    "itemType": "inline_dropdown",
    "difficulty": "medium",
    "passage": "After a meal, glucose is absorbed from the small intestine, starting the following process.\n\n1. Blood glucose concentration increases.\n2. The pancreas responds, secreting insulin into the bloodstream.\n3. Insulin causes the liver to convert glucose to glycogen, reducing blood glucose.\n4. The pancreas stops secreting insulin.\n5. Low levels of glucose cause glucagon to be released.\n6. Glucagon causes the liver to break down some of its stored glycogen to glucose, increasing blood glucose.",
    "passageWithPlaceholders": "At point A on the graph, [[1]] is turning into [[2]].",
    "placeholderNumber": 1,
    "answerOptions": [
      { "text": "glucose", "isCorrect": true, "rationale": "At point A, blood glucose is dropping because insulin is causing the liver to convert glucose into glycogen." },
      { "text": "glycogen", "isCorrect": false, "rationale": "Glycogen is being formed, not broken down, at this point." },
      { "text": "insulin", "isCorrect": false, "rationale": "Insulin is a hormone triggering the conversion, not the substance being converted." },
      { "text": "glucagon", "isCorrect": false, "rationale": "Glucagon is released later when blood glucose is low, not at point A." }
    ],
    "challenge_tags": ["science-3"],
    "skillIntent": "dropdown-cloze",
    "category": "Life Science"
  },
  {
    "questionNumber": 2,
    "type": "multipleChoice",
    "itemType": "inline_dropdown",
    "difficulty": "medium",
    "passage": "After a meal, glucose is absorbed from the small intestine, starting the following process.\n\n1. Blood glucose concentration increases.\n2. The pancreas responds, secreting insulin into the bloodstream.\n3. Insulin causes the liver to convert glucose to glycogen, reducing blood glucose.\n4. The pancreas stops secreting insulin.\n5. Low levels of glucose cause glucagon to be released.\n6. Glucagon causes the liver to break down some of its stored glycogen to glucose, increasing blood glucose.",
    "placeholderNumber": 2,
    "answerOptions": [
      { "text": "glycogen", "isCorrect": true, "rationale": "Insulin directs the liver to convert glucose into glycogen for storage." },
      { "text": "glucose", "isCorrect": false, "rationale": "Glucose is the starting material being converted, not the product at this stage." },
      { "text": "insulin", "isCorrect": false, "rationale": "Insulin is the signal, not the product of the conversion." },
      { "text": "glucagon", "isCorrect": false, "rationale": "Glucagon triggers the reverse process and is not produced from glucose conversion." }
    ],
    "challenge_tags": ["science-3"],
    "skillIntent": "dropdown-cloze",
    "category": "Life Science"
  },
  {
    "questionNumber": 3,
    "type": "multipleChoice",
    "itemType": "inline_dropdown",
    "difficulty": "medium",
    "passage": "In a food chain, energy flows from producers to consumers. Plants capture light energy through photosynthesis and store it as chemical energy in glucose. When an animal eats a plant, only about 10% of the stored energy is transferred to the next level.",
    "passageWithPlaceholders": "In a food chain, energy transfer is [[1]] because most energy at each level is lost as [[2]].",
    "placeholderNumber": 1,
    "answerOptions": [
      { "text": "inefficient", "isCorrect": true, "rationale": "Only about 10% of energy is transferred between trophic levels, making the process inefficient." },
      { "text": "efficient", "isCorrect": false, "rationale": "Losing 90% of energy at each level is not efficient." },
      { "text": "reversed", "isCorrect": false, "rationale": "Energy flows in one direction through a food chain, not in reverse." },
      { "text": "recycled", "isCorrect": false, "rationale": "Energy is not recycled in ecosystems; it flows in one direction and is lost as heat." }
    ],
    "challenge_tags": ["science-3"],
    "skillIntent": "dropdown-cloze",
    "category": "Life Science"
  },
  {
    "questionNumber": 4,
    "type": "multipleChoice",
    "itemType": "inline_dropdown",
    "difficulty": "medium",
    "passage": "In a food chain, energy flows from producers to consumers. Plants capture light energy through photosynthesis and store it as chemical energy in glucose. When an animal eats a plant, only about 10% of the stored energy is transferred to the next level.",
    "placeholderNumber": 2,
    "answerOptions": [
      { "text": "heat", "isCorrect": true, "rationale": "Organisms use most of the energy they consume for life processes, and this energy is released as heat through cellular respiration." },
      { "text": "light", "isCorrect": false, "rationale": "Animals do not release significant energy as light." },
      { "text": "sound", "isCorrect": false, "rationale": "Sound carries very little energy compared to heat from metabolism." },
      { "text": "motion", "isCorrect": false, "rationale": "While some energy goes to movement, the majority of lost energy is released as heat." }
    ],
    "challenge_tags": ["science-3"],
    "skillIntent": "dropdown-cloze",
    "category": "Life Science"
  },
  {
    "questionNumber": 5,
    "type": "multipleChoice",
    "itemType": "inline_dropdown",
    "difficulty": "medium",
    "passage": "Newton's third law states that for every action, there is an equal and opposite reaction. When a rocket launches, hot gases are expelled downward from the engine at high speed.",
    "passageWithPlaceholders": "When a rocket launches, the engine pushes gas [[1]] and the gas pushes the rocket [[2]].",
    "placeholderNumber": 1,
    "answerOptions": [
      { "text": "downward", "isCorrect": true, "rationale": "The rocket engine expels gas downward, which is the action force." },
      { "text": "upward", "isCorrect": false, "rationale": "The gas is expelled downward out of the engine nozzle, not upward." },
      { "text": "sideways", "isCorrect": false, "rationale": "In a normal launch, gases are directed downward, not sideways." },
      { "text": "inward", "isCorrect": false, "rationale": "The gas is expelled outward from the engine, not compressed inward." }
    ],
    "challenge_tags": ["science-1"],
    "skillIntent": "dropdown-cloze",
    "category": "Physical Science"
  },
  {
    "questionNumber": 6,
    "type": "multipleChoice",
    "itemType": "inline_dropdown",
    "difficulty": "medium",
    "passage": "Newton's third law states that for every action, there is an equal and opposite reaction. When a rocket launches, hot gases are expelled downward from the engine at high speed.",
    "placeholderNumber": 2,
    "answerOptions": [
      { "text": "upward", "isCorrect": true, "rationale": "By Newton's third law, the reaction to the downward push on the gas is an equal upward push on the rocket." },
      { "text": "downward", "isCorrect": false, "rationale": "The reaction force acts in the opposite direction of the action force." },
      { "text": "sideways", "isCorrect": false, "rationale": "The reaction force is opposite to the action force direction, which is vertical." },
      { "text": "in a circle", "isCorrect": false, "rationale": "Newton's third law produces forces in opposite linear directions, not circular motion." }
    ],
    "challenge_tags": ["science-1"],
    "skillIntent": "dropdown-cloze",
    "category": "Physical Science"
  }
];
