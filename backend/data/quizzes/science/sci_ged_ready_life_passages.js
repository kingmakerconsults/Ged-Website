/**
 * GED Ready-Style Life Science — Passage & Genetics Set
 * Modeled after GED Ready® Science exam format:
 *   - Long reading passages (~150-220 words) with paired questions
 *   - Cell biology, ecosystems/energy flow, and genetics with Punnett squares
 *   - Calculator and formula sheet available; Punnett tool on genetics items
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'easy',
    topic: 'Life Science',
    contentArea: 'life_science',
    calculatorAllowed: true,
    passage:
      "This passage describes the structure and function of plant and animal cells.\n\nAll living things are made of cells. Plant and animal cells share many of the same internal structures, called organelles. Both contain a <strong>nucleus</strong>, which holds the cell's genetic instructions; <strong>mitochondria</strong>, where the cell converts the chemical energy stored in food into a usable form (ATP); and a <strong>cell membrane</strong>, which controls what enters and leaves the cell.\n\nPlant cells, however, have several structures that animal cells lack. They have a rigid outer <strong>cell wall</strong> made of cellulose that surrounds the cell membrane and gives the cell its shape. They contain <strong>chloroplasts</strong>, organelles filled with the green pigment chlorophyll, where photosynthesis takes place. They also have a single large <strong>central vacuole</strong> that stores water, ions, and waste products. Animal cells may have many small vacuoles, but they do not have a single dominant central vacuole, nor do they have chloroplasts or a cell wall.",
    question:
      'A scientist examining an unknown cell under a microscope sees a clearly defined cell wall and many green organelles. Which conclusion is most strongly supported by the passage?',
    answerOptions: [
      {
        text: 'The cell is most likely a plant cell because the cell wall and chloroplasts are described as plant-cell features.',
        rationale:
          'Correct. The passage states animal cells lack both a cell wall and chloroplasts, while plant cells have both. The presence of these structures supports identifying the cell as a plant cell.',
        isCorrect: true,
      },
      {
        text: 'The cell must be an animal cell because both plant and animal cells have a cell wall.',
        rationale:
          'The passage explicitly states animal cells do not have a cell wall.',
        isCorrect: false,
      },
      {
        text: 'The cell cannot be alive because it has visible organelles.',
        rationale:
          'Visible organelles are characteristic of living cells, not evidence against life.',
        isCorrect: false,
      },
      {
        text: 'The cell is not a real cell because plants and animals do not have organelles in common.',
        rationale:
          'The passage explicitly lists organelles (nucleus, mitochondria, cell membrane) that plant and animal cells share.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Life Science',
    contentArea: 'life_science',
    calculatorAllowed: true,
    passage:
      "This passage continues the discussion of cells by describing how cells obtain energy.\n\nCells need a constant supply of energy to grow, repair themselves, and carry out their functions. In animal cells, this energy comes from <strong>cellular respiration</strong>, a process in which glucose (a sugar) and oxygen are broken down inside the mitochondria to produce carbon dioxide, water, and ATP, the cell's usable energy currency. Plant cells also carry out cellular respiration, but they have an additional ability: in their chloroplasts, they perform <strong>photosynthesis</strong>, using sunlight to combine carbon dioxide and water into glucose and oxygen.\n\nIn this way, photosynthesis and cellular respiration are linked: the products of one are the raw materials of the other. Plants and other photosynthetic organisms therefore form the base of most food chains, capturing the sun's energy in chemical form and making it available to organisms that cannot photosynthesize.",
    question:
      'Based on the passage, which statement best explains why most food chains depend on plants?',
    answerOptions: [
      {
        text: 'Plants are the only organisms that can carry out cellular respiration.',
        rationale: "Incorrect because the passage explicitly states that animal cells also carry out cellular respiration to produce ATP from glucose and oxygen.",
        isCorrect: false,
      },
      {
        text: 'Plants capture energy from sunlight and store it in chemical form, making it available to organisms that cannot photosynthesize.',
        rationale:
          "Correct. The passage states plants use photosynthesis to combine CO₂ and water into glucose and oxygen, capturing the sun's energy in chemical form, and that this is why they form the base of most food chains.",
        isCorrect: true,
      },
      {
        text: 'Animals can manufacture their own glucose using sunlight.',
        rationale: "Incorrect because the passage credits photosynthesis only to plants and other photosynthetic organisms; animals must obtain glucose by eating, since they cannot make it from sunlight.",
        isCorrect: false,
      },
      {
        text: 'Mitochondria are found only in plant cells.',
        rationale: "Incorrect because the passage explicitly states both plant and animal cells contain mitochondria, where cellular respiration produces ATP.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'medium',
    topic: 'Life Science',
    contentArea: 'life_science',
    calculatorAllowed: true,
    passage:
      'This passage describes how energy moves through an ecosystem.\n\nIn a typical ecosystem, energy enters when producers (plants, algae, and certain bacteria) capture sunlight through photosynthesis and store it as chemical energy in their tissues. Primary consumers (herbivores) eat the producers and gain some of that stored energy. Secondary consumers (carnivores or omnivores) eat the primary consumers and gain energy in turn, and so on up the food chain.\n\nAt every step, however, most of the energy obtained from food is not stored — it is used by the organism for movement, growth, and warmth, and a large fraction is released as heat to the surroundings. Ecologists summarize this with a useful rule of thumb: only about 10 percent of the energy at one level of a food chain is passed on to the next level. As a result, food chains rarely have more than four or five levels, because there is too little energy left near the top to support large populations.',
    question:
      "A meadow ecosystem traps about 100,000 kilojoules (kJ) of usable solar energy in its grasses each day. According to the 10 percent rule described in the passage, about how much energy from that day's sunlight would be available to a hawk feeding at the third consumer level (i.e., grass → grasshopper → small bird → hawk)?",
    answerOptions: [
      {
        text: 'About 10,000 kJ',
        rationale:
          'This is the energy at the first consumer level (grasshoppers). Each higher level loses another 90%.',
        isCorrect: false,
      },
      {
        text: 'About 1,000 kJ',
        rationale:
          'This is the energy at the second consumer level (small birds), not the third (hawks).',
        isCorrect: false,
      },
      {
        text: 'About 100 kJ',
        rationale:
          'Correct. Applying the 10% rule three times to 100,000 kJ: 100,000 → 10,000 (grasshoppers) → 1,000 (small birds) → 100 kJ (hawks).',
        isCorrect: true,
      },
      {
        text: 'About 100,000 kJ',
        rationale:
          'This is the original solar energy captured by producers. The passage explains that energy is lost at every transfer.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'hard',
    topic: 'Life Science',
    contentArea: 'life_science',
    calculatorAllowed: true,
    passage:
      'This passage continues the ecosystem discussion by describing what happens when one species in a food web declines.\n\nIn the Pacific kelp forests of the western United States, sea otters prey on sea urchins. Sea urchins, in turn, graze on giant kelp, a fast-growing seaweed that forms underwater "forests" supporting hundreds of other species, including fish, crabs, and seals.\n\nWhen sea otters were nearly hunted to extinction in the 1800s, urchin populations exploded. The expanded urchin populations grazed kelp down so heavily that many kelp forests collapsed, becoming what biologists call "urchin barrens" — flat areas of bare seafloor with very little marine life. After otters were protected and reintroduced in some areas in the 20th century, urchin populations dropped, kelp forests regrew, and many other species returned. Ecologists describe sea otters as a <strong>keystone species</strong>: a species whose effect on its ecosystem is much larger than its numbers alone would suggest.',
    question:
      'Which prediction is most strongly supported by the passage if a disease were to sharply reduce the sea otter population in a kelp forest today?',
    answerOptions: [
      {
        text: 'Kelp forests would expand because fewer otters would compete with kelp for nutrients.',
        rationale:
          'The passage describes otters as predators of urchins, not as competitors of kelp. Otters do not consume kelp.',
        isCorrect: false,
      },
      {
        text: 'Sea urchin populations would increase, leading to overgrazed kelp and the formation of urchin barrens.',
        rationale:
          'Correct. The passage describes exactly this chain of effects when otters were nearly wiped out in the 1800s: urchins exploded, kelp was overgrazed, and "urchin barrens" formed. The same mechanism would apply if otters declined again.',
        isCorrect: true,
      },
      {
        text: 'Sea urchin populations would decline because they would lose their food supply.',
        rationale:
          'Sea urchins eat kelp; otters eat urchins. Removing predators (otters) tends to increase urchin populations, not decrease them.',
        isCorrect: false,
      },
      {
        text: 'The ecosystem would not change because otters are too few in number to matter.',
        rationale:
          'The passage defines a keystone species as one whose effect is much larger than numbers alone would suggest, and documents major ecosystem change when otters declined historically.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'medium',
    topic: 'Life Science',
    contentArea: 'genetics',
    calculatorAllowed: true,
    toolsAllowed: ['punnett-square'],
    passage:
      'This passage describes the inheritance of a single trait in pea plants.\n\nIn pea plants, the allele for purple flowers (P) is dominant over the allele for white flowers (p). An organism with two copies of the same allele is <strong>homozygous</strong> (for example, PP or pp); an organism with two different alleles is <strong>heterozygous</strong> (Pp). The visible trait — purple or white flowers — is the <strong>phenotype</strong>, while the underlying combination of alleles (PP, Pp, or pp) is the <strong>genotype</strong>. Because P is dominant, both PP and Pp produce purple flowers. Only pp produces white flowers.\n\nA scientist crosses two heterozygous purple-flowered plants (Pp × Pp). The offspring inherit one allele from each parent, with all four combinations equally likely.',
    question:
      'Using a Punnett square for the cross Pp × Pp, what is the expected ratio of <strong>genotypes</strong> in the offspring?',
    answerOptions: [
      {
        text: '1 PP : 2 Pp : 1 pp',
        rationale:
          'Correct. A Pp × Pp Punnett square produces four equally likely combinations: PP, Pp, Pp, pp — yielding the classic 1:2:1 genotype ratio.',
        isCorrect: true,
      },
      {
        text: '3 PP : 1 pp',
        rationale:
          'This pattern is not produced by Pp × Pp. The 3:1 ratio in such a cross applies to phenotypes (3 purple : 1 white), not genotypes.',
        isCorrect: false,
      },
      {
        text: 'All Pp',
        rationale:
          'All Pp offspring would result from a homozygous-dominant × homozygous-recessive cross (PP × pp), not Pp × Pp.',
        isCorrect: false,
      },
      {
        text: '1 PP : 1 pp',
        rationale:
          'This ratio omits the heterozygous (Pp) offspring, which actually make up half of the expected outcomes from Pp × Pp.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'text',
    difficulty: 'medium',
    topic: 'Life Science',
    contentArea: 'genetics',
    calculatorAllowed: true,
    toolsAllowed: ['punnett-square'],
    passage:
      'This question uses the same pea-plant trait described in the previous passage. P (purple) is dominant; p (white) is recessive. The cross Pp × Pp produces a 1:2:1 ratio of PP : Pp : pp offspring.',
    question:
      'Out of every 100 expected offspring from a Pp × Pp cross, about how many will have <strong>white</strong> flowers?',
    answerOptions: [
      {
        text: 'About 0',
        rationale:
          'White flowers (pp) are still produced when both parents pass on the recessive allele. About one-fourth of offspring are expected to be white.',
        isCorrect: false,
      },
      {
        text: 'About 25',
        rationale:
          'Correct. The 1:2:1 genotype ratio means 1 of every 4 offspring is pp, which is the only genotype that produces white flowers — about 25 out of 100.',
        isCorrect: true,
      },
      {
        text: 'About 50',
        rationale:
          'Half the offspring are heterozygous (Pp), but Pp plants have purple flowers because P is dominant — they are not white.',
        isCorrect: false,
      },
      {
        text: 'About 75',
        rationale:
          '75 out of 100 corresponds to the purple-flowered offspring (PP + Pp), not the white-flowered ones.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'text',
    difficulty: 'hard',
    topic: 'Life Science',
    contentArea: 'genetics',
    calculatorAllowed: true,
    toolsAllowed: ['punnett-square'],
    passage:
      'This passage describes a sex-linked trait in humans.\n\nRed-green colorblindness in humans is caused by a recessive allele on the X chromosome. Females have two X chromosomes (XX); males have one X and one Y (XY). A female who carries one normal allele (X) and one colorblind allele (Xᶜ) — written XXᶜ — has normal color vision but is a carrier. A male who inherits a single colorblind allele (XᶜY) is colorblind, because there is no second X chromosome to mask the recessive allele.\n\nA carrier mother (XXᶜ) and a father with normal color vision (XY) decide to have a child.',
    question:
      "Using a Punnett square for the cross XXᶜ × XY, what fraction of the couple's <strong>sons</strong> would be expected to be colorblind?",
    answerOptions: [
      {
        text: '0 of 2 sons (none)',
        rationale:
          'The mother is a carrier, so half her eggs carry the colorblind allele (Xᶜ). Sons receive their X from the mother, so some are expected to be colorblind.',
        isCorrect: false,
      },
      {
        text: '1 of 2 sons (about 50%)',
        rationale:
          "Correct. The mother's eggs are equally likely to carry X or Xᶜ. Sons receive Y from the father and X (or Xᶜ) from the mother. Half the sons are XY (normal vision); half are XᶜY (colorblind).",
        isCorrect: true,
      },
      {
        text: '2 of 2 sons (all sons)',
        rationale:
          'For every son to be colorblind, the mother would need to be colorblind herself (XᶜXᶜ) — passing only Xᶜ to her sons. The passage describes her as a carrier (XXᶜ), so only half her sons are expected to be colorblind.',
        isCorrect: false,
      },
      {
        text: '1 of 2 daughters (about 50%)',
        rationale:
          'The question asks about sons. Daughters receive an X from each parent and would be either XX (normal) or XXᶜ (carrier with normal vision); none would be colorblind under this cross.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'easy',
    topic: 'Life Science',
    contentArea: 'life_science',
    calculatorAllowed: true,
    question:
      "Which of the following is the best example of an <strong>adaptation</strong> that improves an organism's chances of survival in its environment?",
    answerOptions: [
      {
        text: "A polar bear's thick layer of fat and white fur for life in cold, snowy environments.",
        rationale:
          "Correct. Both fat (insulation against cold) and white fur (camouflage in snow) are inherited features that improve survival in the polar bear's environment — the definition of an adaptation.",
        isCorrect: true,
      },
      {
        text: 'A deer that wanders away from its usual feeding ground because of human development.',
        rationale:
          'A behavioral response to a single event is not an inherited trait that evolves over generations to fit an environment.',
        isCorrect: false,
      },
      {
        text: 'A houseplant that wilts after being left without water for several days.',
        rationale:
          "Wilting from a lack of water is a stress response, not a trait that improves survival in the plant's normal environment.",
        isCorrect: false,
      },
      {
        text: 'A bacterial colony that dies after being exposed to a strong antibiotic.',
        rationale:
          'Death from antibiotic exposure is the opposite of an adaptation. A relevant adaptation in this scenario would be antibiotic resistance — bacteria that can survive the drug.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 9,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Life Science',
    contentArea: 'life_science',
    calculatorAllowed: true,
    question:
      'In the human body, which body system is most directly responsible for transporting oxygen from the lungs to the cells throughout the body?',
    answerOptions: [
      {
        text: 'Digestive system',
        rationale:
          'The digestive system breaks down food into nutrients but does not transport oxygen.',
        isCorrect: false,
      },
      {
        text: 'Circulatory system',
        rationale:
          'Correct. The heart pumps blood through the circulatory system; red blood cells carry oxygen taken in by the lungs to body tissues, then return carbon dioxide back to the lungs.',
        isCorrect: true,
      },
      {
        text: 'Skeletal system',
        rationale:
          'The skeletal system provides structure and protection. While bones produce blood cells, they do not transport oxygen on their own.',
        isCorrect: false,
      },
      {
        text: 'Endocrine system',
        rationale:
          'The endocrine system regulates body processes by releasing hormones; it does not transport oxygen.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 10,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Life Science',
    contentArea: 'life_science',
    calculatorAllowed: true,
    question:
      'Two students argue about whether a plant in a sealed terrarium would survive over many weeks if it received only sunlight. Which explanation best supports the conclusion that the plant <strong>could</strong> survive?',
    answerOptions: [
      {
        text: 'The plant does not need oxygen because it does not breathe.',
        rationale:
          'Plants do require oxygen for cellular respiration, just like animals. They do not "not breathe" — they exchange gases differently than animals.',
        isCorrect: false,
      },
      {
        text: 'Photosynthesis and cellular respiration in the plant continually exchange oxygen, carbon dioxide, and water inside the sealed system.',
        rationale:
          "Correct. In a sealed terrarium with sunlight, the plant takes in CO₂ and releases O₂ during photosynthesis, then uses some O₂ in respiration and releases CO₂ — and water cycles through the plant's soil, leaves, and condensation. These linked processes can sustain the plant for an extended time.",
        isCorrect: true,
      },
      {
        text: 'The plant gets all its energy from carbon dioxide alone, without needing sunlight.',
        rationale:
          'Photosynthesis explicitly requires sunlight to combine CO₂ and water into glucose. CO₂ alone is not enough.',
        isCorrect: false,
      },
      {
        text: 'A sealed terrarium isolates the plant from any chemical interaction with its surroundings.',
        rationale:
          'A sealed terrarium isolates the system from the outside but the plant still interacts chemically with the air, water, and soil inside the container — those interactions are exactly what keep it alive.',
        isCorrect: false,
      },
    ],
  },
];
