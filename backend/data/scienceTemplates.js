// Curated science templates used to seed numeracy, scenario, and short-response
// formats for GED-style assessments. These templates are intentionally
// lightweight so the generator can stitch them into AI-created sets or be used
// verbatim when we need guaranteed coverage of a skill. All content is
// plaintext/HTML safe for direct rendering in the React frontend.

const SCI_NUMERIC_TABLE_ITEMS = [
  {
    id: 'num_density_comparison',
    type: 'numeric',
    responseType: 'numeric',
    qaProfileKey: 'numeracy',
    difficulty: 'medium',
    topicTags: ['Physical Science', 'Data Interpretation'],
    stem: '<p>Two metal samples with identical volumes are tested in the lab.</p>',
    passage:
      '<table class="data-table"><thead><tr><th>Sample</th><th>Mass (g)</th><th>Volume (cm³)</th></tr></thead><tbody><tr><td>A</td><td>312</td><td>40</td></tr><tr><td>B</td><td>260</td><td>35</td></tr></tbody></table>',
    questionText:
      'Based on the table, what is the density difference (in g/cm³) between Sample A and Sample B? Give your answer rounded to the nearest tenth.',
    correctAnswer: '1.1',
    tolerance: 0.05,
    rationale:
      'Sample A density = 312 ÷ 40 = 7.8 g/cm³. Sample B density = 260 ÷ 35 ≈ 7.4 g/cm³. Difference ≈ 0.4 g/cm³.',
  },
  {
    id: 'num_evaporation_rate',
    type: 'numeric',
    responseType: 'numeric',
    qaProfileKey: 'numeracy',
    difficulty: 'medium',
    topicTags: ['Earth Science', 'Scientific Practices'],
    stem: '<p>A student tracks how much water remains in two identical trays while a fan runs at low and high speed.</p>',
    passage:
      '<table class="data-table"><thead><tr><th>Time (min)</th><th>Low Speed (mL)</th><th>High Speed (mL)</th></tr></thead><tbody><tr><td>0</td><td>250</td><td>250</td></tr><tr><td>20</td><td>212</td><td>198</td></tr><tr><td>40</td><td>181</td><td>142</td></tr><tr><td>60</td><td>160</td><td>90</td></tr></tbody></table>',
    questionText:
      'What is the average evaporation rate (in mL/min) for the high-speed fan between 20 and 60 minutes?',
    correctAnswer: '1.35',
    tolerance: 0.05,
    rationale:
      'High-speed tray lost 198 − 90 = 108 mL over 40 minutes → 108 ÷ 40 = 2.7 mL per 2 minutes or 1.35 mL/min.',
  },
  {
    id: 'num_energy_output',
    type: 'numeric',
    responseType: 'numeric',
    qaProfileKey: 'numeracy',
    difficulty: 'hard',
    topicTags: ['Life Science', 'Energy Transformations'],
    stem: '<p>An investigation tracks how efficiently algae bioreactors convert light energy into chemical energy.</p>',
    passage:
      '<table class="data-table"><thead><tr><th>Bioreactor</th><th>Light Input (kJ)</th><th>Chemical Output (kJ)</th></tr></thead><tbody><tr><td>X</td><td>480</td><td>182</td></tr><tr><td>Y</td><td>520</td><td>210</td></tr><tr><td>Z</td><td>500</td><td>205</td></tr></tbody></table>',
    questionText:
      'What is the efficiency percentage of Bioreactor Y? (Efficiency = output ÷ input × 100.) Round to the nearest whole percent.',
    correctAnswer: '40',
    tolerance: 0.6,
    rationale: '210 ÷ 520 ≈ 0.4038 → 40%.',
  },
];

const SCIENTIFIC_SCENARIO_SETS = [
  {
    id: 'scenario_water_quality',
    clusterLabel: 'Community Water Analysis',
    groupId: 'scenario:water-quality',
    qaProfileKey: 'reasoning',
    sharedPassage:
      '<p>Students investigate whether increased fertilizer runoff is lowering dissolved oxygen (DO) in a river. They set three sample stations: upstream forest, midstream near farms, and downstream near a town outflow. Each day they record water temperature, nitrates (mg/L), and DO (mg/L). They also note that algae blooms appear most frequently near the farms.</p>',
    questions: [
      {
        questionText:
          'Which station should serve as the control when evaluating the effect of fertilizer runoff on dissolved oxygen?',
        answerOptions: [
          {
            text: 'Upstream forest station',
            rationale:
              'It is unaffected by farms or town runoff, so it isolates natural conditions.',
            isCorrect: true,
          },
          {
            text: 'Midstream near farms',
            rationale: 'This is the impacted site, not the control.',
            isCorrect: false,
          },
          {
            text: 'Downstream near the town outflow',
            rationale: 'This location adds new variables (treated wastewater).',
            isCorrect: false,
          },
          {
            text: 'All stations combined',
            rationale: 'Controls must be a single baseline condition.',
            isCorrect: false,
          },
        ],
      },
      {
        questionText:
          'If nitrates spike midstream while temperature stays constant, which claim best explains a drop in dissolved oxygen?',
        answerOptions: [
          {
            text: 'Cooler water upstream dissolves less oxygen.',
            rationale: 'Cooler water dissolves more oxygen, not less.',
            isCorrect: false,
          },
          {
            text: 'Excess nutrients fuel algae that consume oxygen when they decompose.',
            rationale: 'Correct. Decomposition of algal blooms lowers DO.',
            isCorrect: true,
          },
          {
            text: 'Higher river velocity midstream forces oxygen out of solution.',
            rationale: 'Faster water usually increases oxygen mixing.',
            isCorrect: false,
          },
          {
            text: 'Town wastewater dilutes oxygen midstream.',
            rationale: 'Town runoff is downstream, not midstream.',
            isCorrect: false,
          },
        ],
      },
      {
        questionText:
          'Which additional measurement would best strengthen the students’ conclusion about fertilizer impact?',
        answerOptions: [
          {
            text: 'Recording daily rainfall totals for the watershed',
            rationale:
              'Heavy rain can increase runoff volume, clarifying cause and effect.',
            isCorrect: true,
          },
          {
            text: 'Measuring dissolved oxygen at night only',
            rationale:
              'Night readings help but do not directly connect to fertilizer application.',
            isCorrect: false,
          },
          {
            text: 'Testing salinity of the upstream forest station',
            rationale:
              'Salinity is unlikely to change in this freshwater setting.',
            isCorrect: false,
          },
          {
            text: 'Counting fish by species at the downstream station',
            rationale:
              'Biodiversity is useful but not a direct mechanistic link.',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: 'scenario_free_fall_lab',
    clusterLabel: 'Motion Sensor Trials',
    groupId: 'scenario:free-fall',
    qaProfileKey: 'reasoning',
    sharedPassage:
      '<p>A physics class compares motion sensor data for objects dropped from a balcony. Drop A uses a smooth metal sphere, Drop B uses the same sphere with a parachute, and Drop C uses a crumpled paper ball. Students graph velocity vs. time for each drop.</p>',
    questions: [
      {
        questionText:
          'Which drop provides the best approximation of free fall near Earth’s surface?',
        answerOptions: [
          {
            text: 'Drop A (smooth metal sphere)',
            rationale:
              'The streamlined sphere experiences minimal air resistance.',
            isCorrect: true,
          },
          {
            text: 'Drop B (sphere with parachute)',
            rationale:
              'The parachute dramatically increases drag, breaking free-fall conditions.',
            isCorrect: false,
          },
          {
            text: 'Drop C (crumpled paper ball)',
            rationale:
              'Paper is light and affected by drag, so it deviates from free fall.',
            isCorrect: false,
          },
          {
            text: 'None of the drops model free fall because gravity varies.',
            rationale: 'Gravity is effectively constant over the small height.',
            isCorrect: false,
          },
        ],
      },
      {
        questionText:
          'Why does the velocity-time graph for Drop B level off quickly?',
        answerOptions: [
          {
            text: 'The sensor lost connection mid-trial.',
            rationale: 'Data show consistent readings, so this is unlikely.',
            isCorrect: false,
          },
          {
            text: 'The parachute adds drag until net force becomes zero.',
            rationale:
              'Correct. Terminal velocity occurs when drag equals weight.',
            isCorrect: true,
          },
          {
            text: 'The mass of the object increases during the fall.',
            rationale: 'Mass stays constant; drag is the changing factor.',
            isCorrect: false,
          },
          {
            text: 'Gravity weakens at higher speeds.',
            rationale: 'Gravity is independent of speed at these scales.',
            isCorrect: false,
          },
        ],
      },
      {
        questionText:
          'Which modification would best test how surface area affects drag?',
        answerOptions: [
          {
            text: 'Use the same mass but switch between smooth and dimpled surfaces.',
            rationale: 'Changing surface texture isolates drag effects.',
            isCorrect: true,
          },
          {
            text: 'Drop the objects from twice the height.',
            rationale: 'Greater height changes time, not just surface area.',
            isCorrect: false,
          },
          {
            text: 'Measure temperature at the ground.',
            rationale:
              'Temperature is unrelated to surface area drag in this context.',
            isCorrect: false,
          },
          {
            text: 'Use a heavier sphere for Drop A.',
            rationale: 'Changing mass confounds the variable of interest.',
            isCorrect: false,
          },
        ],
      },
    ],
  },
];

const SCI_SHORT_RESPONSE_PROMPTS = [
  {
    id: 'short_response_controls',
    questionText:
      'A student claims they performed a fair test on how pH affects enzyme activity but changed the enzyme concentration halfway through. In 2–3 sentences, explain why this undermines the validity of the results and identify the variable that was not controlled.',
    expectedFeatures: [
      'States that only one independent variable should change in a fair test.',
      'Identifies enzyme concentration as the uncontrolled variable.',
      'Connects the uncontrolled variable to unreliable conclusions about pH.',
    ],
    sampleAnswer:
      'Because they changed both pH and enzyme concentration, the student cannot tell which change altered the reaction rate. Enzyme concentration became a second independent variable. Without holding it constant, the claim about pH is not supported.',
  },
  {
    id: 'short_response_claim_evidence',
    questionText:
      'During a greenhouse investigation, plants under blue light grew 3 cm taller than plants under red light after four weeks. Write a short response that states a claim about the best light color for growth and supports it with evidence from the investigation.',
    expectedFeatures: [
      'Clear claim selecting blue light as more effective.',
      'Evidence citing the measured 3 cm difference.',
      'Reasoning that links increased height to improved growth.',
    ],
    sampleAnswer:
      'Blue light produced more growth because those plants averaged 3 cm taller than the red-light plants after four weeks, showing that blue wavelengths drove faster biomass gains.',
  },
];

function pickRandomItem(list, excludeIds = new Set()) {
  const pool = list.filter((item) => !excludeIds.has(item.id));
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getRandomScienceScenario(excludeIds) {
  return pickRandomItem(SCIENTIFIC_SCENARIO_SETS, excludeIds);
}

function getRandomScienceNumeracyItem(excludeIds) {
  return pickRandomItem(SCI_NUMERIC_TABLE_ITEMS, excludeIds);
}

function getRandomScienceShortResponse(excludeIds) {
  return pickRandomItem(SCI_SHORT_RESPONSE_PROMPTS, excludeIds);
}

module.exports = {
  SCI_NUMERIC_TABLE_ITEMS,
  SCIENTIFIC_SCENARIO_SETS,
  SCI_SHORT_RESPONSE_PROMPTS,
  getRandomScienceScenario,
  getRandomScienceNumeracyItem,
  getRandomScienceShortResponse,
};
