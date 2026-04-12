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
    difficulty: 'medium',
    topicTags: ['Physical Science', 'Data Interpretation'],
    stem: '<p>Students measure the force required to push crates across a warehouse floor.</p>',
    passage:
      '<table class="data-table"><thead><tr><th>Crate</th><th>Force (N)</th><th>Distance (m)</th></tr></thead><tbody><tr><td>X</td><td>80</td><td>12</td></tr><tr><td>Y</td><td>65</td><td>15</td></tr><tr><td>Z</td><td>90</td><td>10</td></tr></tbody></table>',
    questionText:
      'Using the formula W = Fd (Work = Force × Distance), how much more work (in joules) is done pushing Crate Y compared to Crate Z?',
    correctAnswer: '75',
    tolerance: 0.5,
    rationale:
      'Crate Y work = 65 × 15 = 975 J. Crate Z work = 90 × 10 = 900 J. Difference = 75 J.',
  },
  {
    id: 'num_mean_speed',
    type: 'numeric',
    responseType: 'numeric',
    qaProfileKey: 'numeracy',
    difficulty: 'medium',
    topicTags: ['Physical Science', 'Data Interpretation'],
    stem: '<p>Unstable traffic flow occurs when drivers accelerate and brake too often. The table below gives one example of traffic speeds, in kilometers per hour (km/h), in an unstable flow situation.</p>',
    passage:
      '<table class="data-table"><thead><tr><th>Time (p.m.)</th><th>4:00</th><th>4:10</th><th>4:20</th><th>4:30</th><th>4:40</th><th>4:50</th><th>5:00</th></tr></thead><tbody><tr><td><strong>Speed (km/h)</strong></td><td>30</td><td>20</td><td>50</td><td>70</td><td>20</td><td>70</td><td>20</td></tr></tbody></table>',
    questionText:
      'What is the mean speed, in km/h, in this situation?',
    correctAnswer: '40',
    tolerance: 0.5,
    rationale:
      'Mean = (30 + 20 + 50 + 70 + 20 + 70 + 20) ÷ 7 = 280 ÷ 7 = 40 km/h.',
    skillIntent: 'data-table-calculation',
  },
  {
    id: 'num_weighted_avg_isotope',
    type: 'numeric',
    responseType: 'numeric',
    qaProfileKey: 'numeracy',
    difficulty: 'hard',
    topicTags: ['Physical Science', 'Data Interpretation'],
    stem: '<p>The table below shows data for two isotopes of chlorine (Cl). The data in the "% Abundance" column represents the likelihood that any given atom of chlorine is a particular isotope.</p>',
    passage:
      '<table class="data-table"><thead><tr><th>Isotope</th><th>Mass (amu)</th><th>% Abundance</th></tr></thead><tbody><tr><td><sup>35</sup>Cl</td><td>34.97</td><td>75.78</td></tr><tr><td><sup>37</sup>Cl</td><td>36.97</td><td>24.22</td></tr></tbody></table>',
    questionText:
      'What is the weighted average mass of chlorine? Round to the nearest hundredth.',
    correctAnswer: '35.45',
    tolerance: 0.02,
    rationale:
      'Weighted avg = (34.97 × 0.7578) + (36.97 × 0.2422) = 26.50 + 8.95 = 35.45 amu.',
    skillIntent: 'data-table-calculation',
  },
  {
    id: 'num_kinetic_energy_diff',
    type: 'numeric',
    responseType: 'numeric',
    qaProfileKey: 'numeracy',
    difficulty: 'hard',
    topicTags: ['Physical Science', 'Data Interpretation'],
    stem: '<p>Moving objects, such as automobiles, have kinetic energy (KE), which is measured in joules. This energy can be calculated using the following formula:</p><p style="text-align:center">KE = ½mv²</p>',
    passage:
      '<p>A person drives an automobile with a mass of 450 kilograms at a velocity of 26 meters per second. The driver accelerates to a velocity of 30 meters per second.</p>',
    questionText:
      'The difference in the automobile\'s kinetic energy between the two velocities is ______ joules.',
    correctAnswer: '50400',
    tolerance: 100,
    rationale:
      'KE₁ = ½ × 450 × 26² = ½ × 450 × 676 = 152,100 J. KE₂ = ½ × 450 × 30² = ½ × 450 × 900 = 202,500 J. Difference = 202,500 − 152,100 = 50,400 J.',
    skillIntent: 'formula-application',
  },
  {
    id: 'num_light_frequency',
    type: 'numeric',
    responseType: 'numeric',
    qaProfileKey: 'numeracy',
    difficulty: 'hard',
    topicTags: ['Physical Science', 'Data Interpretation'],
    stem: '<p>The color of light can be expressed in terms of either frequency (ν) or wavelength (λ), which has units of nanometers (nm). The equation that relates the frequency and wavelength of light with the speed of light (c) is:</p><p style="text-align:center">ν = c / λ</p><p>The speed of light is a constant and approximately equal to 300,000,000 meters per second.</p><p>Green lasers emit light at a wavelength of 532 nm. However, the material that is used to make most green lasers does not emit light at 532 nm. Instead, it emits light at a different wavelength, and the laser then uses a "frequency doubler." This doubles the frequency of the emitted light, and the resultant light is the green 532 nm that we observe.</p><p>1 meter is equal to 1,000,000,000 nanometers.</p>',
    passage: '',
    questionText:
      'What is the output light frequency of the material used before doubling? Express your answer in Hz using scientific notation (e.g. 2.8e14).',
    correctAnswer: '2.82e14',
    tolerance: 0.05e14,
    rationale:
      'Green light frequency = c / λ = 3×10⁸ / (532×10⁻⁹) = 5.64×10¹⁴ Hz. Before doubling: 5.64×10¹⁴ / 2 = 2.82×10¹⁴ Hz.',
    skillIntent: 'formula-application',
  },
];

const SCIENTIFIC_SCENARIO_SETS = [
  {
    id: 'scenario_genetics_punnett',
    clusterLabel: 'Flower Color Inheritance',
    groupId: 'scenario:genetics-punnett',
    qaProfileKey: 'reasoning',
    sharedPassage:
      '<p>A biology class completes a Punnett square for two heterozygous flower plants, Gg x Gg. In this trait, G is the dominant allele for purple flowers and g is the recessive allele for white flowers.</p><table class="data-table"><thead><tr><th> </th><th>G</th><th>g</th></tr></thead><tbody><tr><th>G</th><td>GG</td><td>Gg</td></tr><tr><th>g</th><td>Gg</td><td>gg</td></tr></tbody></table><p>Use the completed Punnett square to answer the questions.</p>',
    questions: [
      {
        questionText:
          'Based on the completed Punnett square, what is the genotype ratio of the offspring?',
        answerOptions: [
          {
            text: '1 GG : 2 Gg : 1 gg',
            rationale:
              'Correct. The four outcomes are one GG, two Gg, and one gg.',
            isCorrect: true,
          },
          {
            text: '3 GG : 1 gg',
            rationale:
              'The completed square includes two heterozygous outcomes, not three GG outcomes.',
            isCorrect: false,
          },
          {
            text: '2 GG : 1 Gg : 1 gg',
            rationale: 'Only one GG square appears in the passage.',
            isCorrect: false,
          },
          {
            text: '1 GG : 1 Gg : 2 gg',
            rationale: 'Only one gg square appears in the completed square.',
            isCorrect: false,
          },
        ],
      },
      {
        questionText:
          'If purple is dominant over white, what is the phenotype ratio for the offspring in this cross?',
        answerOptions: [
          {
            text: '3 purple : 1 white',
            rationale:
              'Correct. Three boxes contain at least one dominant G allele, while one box is gg.',
            isCorrect: true,
          },
          {
            text: '1 purple : 1 white',
            rationale: 'The square shows three purple outcomes, not one.',
            isCorrect: false,
          },
          {
            text: '1 purple : 2 white',
            rationale: 'Only one box gives the recessive white phenotype.',
            isCorrect: false,
          },
          {
            text: '4 purple : 0 white',
            rationale:
              'The completed square includes one recessive gg outcome.',
            isCorrect: false,
          },
        ],
      },
      {
        questionText:
          'What is the probability that an offspring from this cross will be homozygous recessive?',
        answerOptions: [
          {
            text: '1/4',
            rationale: 'Correct. One of the four equally likely boxes is gg.',
            isCorrect: true,
          },
          {
            text: '1/2',
            rationale:
              'Two of the four boxes are heterozygous, not homozygous recessive.',
            isCorrect: false,
          },
          {
            text: '3/4',
            rationale:
              'Three-fourths of the offspring are not homozygous recessive.',
            isCorrect: false,
          },
          {
            text: '1',
            rationale:
              'The completed square does not show every offspring as gg.',
            isCorrect: false,
          },
        ],
      },
    ],
  },
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
