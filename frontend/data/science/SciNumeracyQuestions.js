// Extracted SCI_NUMERACY_QUESTIONS from app.jsx (questions 1-18)
export const SCI_NUMERACY_QUESTIONS = [
  {
    questionNumber: 1,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A botanist measures the height (in cm) of five plants: 15, 18, 15, 22, and 20.</p>',
    question:
      'What is the <strong>mean (average)</strong> height of the plants?',
    answerOptions: [
      {
        text: '15 cm',
        rationale: '15 is the mode (most common), not the mean.',
        isCorrect: false,
      },
      {
        text: '18 cm',
        rationale: 'Correct. (15+18+15+22+20)=90; 90÷5=18.',
        isCorrect: true,
      },
      {
        text: '18.5 cm',
        rationale: 'Close, but not the exact average.',
        isCorrect: false,
      },
      {
        text: '22 cm',
        rationale: '22 is just the tallest plant.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['math-1'],
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>In pea plants, purple flowers (P) are dominant over white flowers (p). Two heterozygous plants (Pp × Pp) are crossed.</p>',
    question:
      'What percent of offspring are expected to have <strong>white</strong> flowers?',
    answerOptions: [
      {
        text: '0%',
        rationale: 'Incorrect. White can appear if the plant gets pp.',
        isCorrect: false,
      },
      {
        text: '25%',
        rationale:
          'Correct. The Punnett square gives PP, Pp, Pp, pp  1 of 4 is pp (white).',
        isCorrect: true,
      },
      {
        text: '50%',
        rationale: '50% would be too high; only 1 of 4 is pp.',
        isCorrect: false,
      },
      {
        text: '75%',
        rationale: '75% would be purple, not white.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: '<p>A rock has a mass of 60 g and displaces 20 cm³ of water.</p>',
    question: "What is the rock's density?",
    answerOptions: [
      {
        text: '1 g/cm³',
        rationale: 'That would be 20 g ÷ 20 cm³.',
        isCorrect: false,
      },
      {
        text: '3 g/cm³',
        rationale: 'Correct. Density = mass ÷ volume = 60 ÷ 20 = 3 g/cm³.',
        isCorrect: true,
      },
      {
        text: '20 g/cm³',
        rationale: "That's just the volume, not density.",
        isCorrect: false,
      },
      {
        text: '40 g/cm³',
        rationale: 'Not based on 60 ÷ 20.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: '<p>A car travels 150 km in 3 hours at a constant speed.</p>',
    question: "What is the car's average speed?",
    answerOptions: [
      {
        text: '50 km/h',
        rationale: 'Correct. 150 km ÷ 3 h = 50 km/h.',
        isCorrect: true,
      },
      {
        text: '30 km/h',
        rationale: 'Too low. That would be 90 km over 3 h.',
        isCorrect: false,
      },
      {
        text: '100 km/h',
        rationale: 'Too high. That would be 300 km in 3 h.',
        isCorrect: false,
      },
      {
        text: '450 km/h',
        rationale: 'Impossible for the data given.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A student pushes a box with a force of 50 N across the floor for 4 m.</p>',
    question: 'How much work was done on the box?',
    answerOptions: [
      {
        text: '12.5 J',
        rationale: 'This divides instead of multiplying.',
        isCorrect: false,
      },
      {
        text: '46 N',
        rationale: 'Newtons measure force, not work (energy).',
        isCorrect: false,
      },
      {
        text: '200 J',
        rationale: 'Correct. Work W = F × d = 50 N × 4 m = 200 J.',
        isCorrect: true,
      },
      {
        text: '200 N',
        rationale: 'Units are wrong  work is in joules.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: '<p>A 2 kg cart accelerates at 3 m/s.</p>',
    question: 'What net force is acting on the cart?',
    answerOptions: [
      {
        text: '0.67 N',
        rationale: 'That divides instead of multiplies.',
        isCorrect: false,
      },
      {
        text: '1.5 N',
        rationale: 'Still dividing, not multiplying.',
        isCorrect: false,
      },
      {
        text: '5 N',
        rationale: 'Close, but 2 × 3 is 6, not 5.',
        isCorrect: false,
      },
      {
        text: '6 N',
        rationale: 'Correct. F = m × a = 2 kg × 3 m/s = 6 N.',
        isCorrect: true,
      },
    ],
  },
  {
    questionNumber: 7,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage: `<p>A student heats four samples of the same liquid:</p>
          <table class="min-w-full text-sm text-left">
            <thead><tr><th>Trial</th><th>Start Temp (°C)</th><th>End Temp (°C)</th></tr></thead>
            <tbody>
              <tr><td>A</td><td>22</td><td>30</td></tr>
              <tr><td>B</td><td>22</td><td>29</td></tr>
              <tr><td>C</td><td>22</td><td>35</td></tr>
              <tr><td>D</td><td>22</td><td>28</td></tr>
            </tbody>
          </table>`,
    question: 'Which trial had the greatest temperature increase?',
    answerOptions: [
      {
        text: 'Trial A',
        rationale: 'Increase was 30 − 22 = 8°C.',
        isCorrect: false,
      },
      { text: 'Trial B', rationale: 'Increase was 7°C.', isCorrect: false },
      {
        text: 'Trial C',
        rationale: 'Correct. Increase was 35 − 22 = 13°C, the largest.',
        isCorrect: true,
      },
      { text: 'Trial D', rationale: 'Increase was 6°C.', isCorrect: false },
    ],
  },
  {
    questionNumber: 8,
    challenge_tags: ['math-6', 'science-1'],
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>Colony counts of bacteria on 5 plates were 12, 15, 15, 18, and 30 (in thousands).</p>',
    question: 'What is the <strong>range</strong> of the data?',
    answerOptions: [
      {
        text: '12',
        rationale: '12 is just the smallest value.',
        isCorrect: false,
      },
      { text: '18', rationale: '18 is not max − min.', isCorrect: false },
      {
        text: '30',
        rationale: '30 is just the largest value.',
        isCorrect: false,
      },
      {
        text: '18 (thousand)',
        rationale: 'Correct. Range = 30 − 12 = 18.',
        isCorrect: true,
      },
    ],
  },
  {
    questionNumber: 9,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>In the first 20 minutes of a run, a runner goes 10 km. After 10 minutes the runner had 5 km. Assume constant speed.</p>',
    question: "What is the runner's speed during this period (in km/min)?",
    answerOptions: [
      {
        text: '0.25 km/min',
        rationale: 'Too low (that would be 5 km in 20 min).',
        isCorrect: false,
      },
      {
        text: '0.5 km/min',
        rationale: 'Correct. 10 km ÷ 20 min = 0.5 km/min.',
        isCorrect: true,
      },
      {
        text: '2 km/min',
        rationale: 'Too high. That would be 40 km in 20 min.',
        isCorrect: false,
      },
      {
        text: '20 km/min',
        rationale: 'Way too high for a human runner.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 10,
    challenge_tags: ['science-2', 'math-6', 'science-1'],
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A sealed container (nothing can enter or escape) has a total mass of 120 g before a chemical reaction and 120 g after.</p>',
    question: 'Which statement is best supported by this data?',
    answerOptions: [
      {
        text: 'Mass is created during the reaction.',
        rationale: "No; mass didn't increase.",
        isCorrect: false,
      },
      {
        text: 'Mass is destroyed during the reaction.',
        rationale: "No; mass didn't decrease.",
        isCorrect: false,
      },
      {
        text: 'Mass is conserved during the reaction.',
        rationale: 'Correct. The total stayed 120 g.',
        isCorrect: true,
      },
      {
        text: 'The container leaked gas.',
        rationale: 'If it leaked, mass would drop.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 11,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A pump moves 12 liters of water in 4 minutes at a constant rate.</p>',
    question: 'How many liters will it move in 10 minutes?',
    answerOptions: [
      {
        text: '20 L',
        rationale: 'That assumes 2 L/min. Actual rate is 3 L/min.',
        isCorrect: false,
      },
      {
        text: '24 L',
        rationale: "That's 12 L in 4 min scaled to 8 min, not 10.",
        isCorrect: false,
      },
      {
        text: '30 L',
        rationale: 'Correct. 12 ÷ 4 = 3 L/min. 3 × 10 = 30 L.',
        isCorrect: true,
      },
      {
        text: '120 L',
        rationale: 'Way too high for this rate.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 12,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A household budget is $3,000 per month. Housing is 35% of the budget.</p>',
    question: 'How much money goes to housing each month?',
    answerOptions: [
      {
        text: '$700',
        rationale: "That's 700 / 3000  23%. Too low.",
        isCorrect: false,
      },
      { text: '$900', rationale: "That's 30% of $3,000.", isCorrect: false },
      {
        text: '$1,050',
        rationale: 'Correct. 35% of $3,000 = 0.35 × 3000 = $1,050.',
        isCorrect: true,
      },
      {
        text: '$1,500',
        rationale: 'That would be 50%, not 35%.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 13,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A beaker contains 250 mL of water. 50 mL evaporates. How much is left?</p>',
    question: 'How much water remains in the beaker?',
    answerOptions: [
      {
        text: '200 mL',
        rationale: 'Correct. 250 - 50 = 200 mL.',
        isCorrect: true,
      },
      {
        text: '250 mL',
        rationale: 'This is the starting amount.',
        isCorrect: false,
      },
      {
        text: '50 mL',
        rationale: 'This is the amount that evaporated.',
        isCorrect: false,
      },
      {
        text: '300 mL',
        rationale: 'This would be more than the starting amount.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 14,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A student records temperatures: 10°C, 12°C, 15°C, 13°C, 10°C.</p>',
    question: 'What is the mode of the temperatures?',
    answerOptions: [
      {
        text: '10°C',
        rationale: 'Correct. 10°C appears twice.',
        isCorrect: true,
      },
      { text: '12°C', rationale: '12°C appears once.', isCorrect: false },
      { text: '15°C', rationale: '15°C appears once.', isCorrect: false },
      { text: '13°C', rationale: '13°C appears once.', isCorrect: false },
    ],
  },
  {
    questionNumber: 15,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A car uses 8 liters of fuel to travel 100 km. How many liters for 250 km?</p>',
    question: 'How much fuel is needed for 250 km?',
    answerOptions: [
      {
        text: '20 L',
        rationale: 'Correct. 8/100 = 0.08 L/km; 0.08*250=20 L.',
        isCorrect: true,
      },
      { text: '25 L', rationale: 'Incorrect calculation.', isCorrect: false },
      { text: '32 L', rationale: 'Incorrect calculation.', isCorrect: false },
      { text: '8 L', rationale: 'This is for 100 km.', isCorrect: false },
    ],
  },
  {
    questionNumber: 16,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A sample has masses: 2g, 4g, 6g, 8g, 10g. What is the mean?</p>',
    question: 'What is the mean mass of the sample?',
    answerOptions: [
      { text: '6g', rationale: 'Correct. (2+4+6+8+10)/5=6g.', isCorrect: true },
      { text: '5g', rationale: 'Incorrect calculation.', isCorrect: false },
      { text: '8g', rationale: 'Incorrect calculation.', isCorrect: false },
      {
        text: '10g',
        rationale: 'This is the largest value.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 17,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A block is pulled with a force of 10 N for 5 m. How much work is done?</p>',
    question: 'How much work is done on the block?',
    answerOptions: [
      {
        text: '50 J',
        rationale: 'Correct. 10 N × 5 m = 50 J.',
        isCorrect: true,
      },
      { text: '15 J', rationale: 'Incorrect calculation.', isCorrect: false },
      { text: '2 J', rationale: 'Incorrect calculation.', isCorrect: false },
      { text: '5 J', rationale: 'Incorrect calculation.', isCorrect: false },
    ],
  },
  {
    questionNumber: 18,
    qaProfileKey: 'numeracy',
    type: 'knowledge',
    passage:
      '<p>A solution is made by mixing 100 mL of water and 50 mL of alcohol. What is the total volume?</p>',
    question: 'What is the total volume of the solution?',
    answerOptions: [
      {
        text: '150 mL',
        rationale: 'Correct. 100 + 50 = 150 mL.',
        isCorrect: true,
      },
      {
        text: '100 mL',
        rationale: 'This is just the water.',
        isCorrect: false,
      },
      {
        text: '50 mL',
        rationale: 'This is just the alcohol.',
        isCorrect: false,
      },
      { text: '200 mL', rationale: 'Incorrect calculation.', isCorrect: false },
    ],
  },
];
