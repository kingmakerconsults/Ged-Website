// frontend/data/science_concept_questions.js
// Multiple-choice conceptual practice questions for Science.
(function loadScienceConceptQuestions() {
  if (typeof window === 'undefined') return;
  const SCIENCE_CONCEPT_QUESTIONS = [
    // Physics
    {
      id: 'phys_1',
      category: 'Physics',
      difficulty: 'easy',
      question: 'What is the unit of force in the SI system?',
      choices: [
        { text: 'Newton (N)', correct: true },
        { text: 'Joule (J)', correct: false },
        { text: 'Watt (W)', correct: false },
        { text: 'Pascal (Pa)', correct: false },
      ],
      explanation: 'Force is measured in newtons (N).',
    },
    {
      id: 'phys_2',
      category: 'Physics',
      difficulty: 'easy',
      question: 'Which quantity is conserved in an isolated system?',
      choices: [
        { text: 'Energy', correct: true },
        { text: 'Velocity', correct: false },
        { text: 'Force', correct: false },
        { text: 'Power', correct: false },
      ],
      explanation: 'Total energy remains constant in an isolated system.',
    },
    {
      id: 'phys_3',
      category: 'Physics',
      difficulty: 'medium',
      question: 'An object moves at constant velocity. What is the net force?',
      choices: [
        { text: 'Zero', correct: true },
        { text: 'Equal to its weight', correct: false },
        { text: 'Increasing', correct: false },
        { text: 'Opposite its velocity', correct: false },
      ],
      explanation:
        "Newton's First Law: constant velocity implies zero net force.",
    },
    {
      id: 'phys_4',
      category: 'Physics',
      difficulty: 'medium',
      question: 'Kinetic energy formula is?',
      choices: [
        { text: 'KE = 1/2 m v^2', correct: true },
        { text: 'KE = m g h', correct: false },
        { text: 'KE = F d', correct: false },
        { text: 'KE = p v', correct: false },
      ],
      explanation: 'Kinetic energy is one half mass times velocity squared.',
    },
    {
      id: 'phys_5',
      category: 'Physics',
      difficulty: 'hard',
      question: 'Momentum is defined as:',
      choices: [
        { text: 'Mass × Velocity', correct: true },
        { text: 'Force ÷ Time', correct: false },
        { text: 'Energy × Time', correct: false },
        { text: 'Power × Area', correct: false },
      ],
      explanation: 'Momentum p = m v.',
    },
    // Biology
    {
      id: 'bio_1',
      category: 'Biology',
      difficulty: 'easy',
      question: 'Basic unit of life is the:',
      choices: [
        { text: 'Cell', correct: true },
        { text: 'Atom', correct: false },
        { text: 'Organ', correct: false },
        { text: 'Tissue', correct: false },
      ],
      explanation: 'Cells are the basic living units.',
    },
    {
      id: 'bio_2',
      category: 'Biology',
      difficulty: 'easy',
      question: 'Organelle responsible for energy production:',
      choices: [
        { text: 'Mitochondrion', correct: true },
        { text: 'Ribosome', correct: false },
        { text: 'Golgi apparatus', correct: false },
        { text: 'Nucleolus', correct: false },
      ],
      explanation: 'Mitochondria produce ATP.',
    },
    {
      id: 'bio_3',
      category: 'Biology',
      difficulty: 'medium',
      question: 'DNA replicates during which cell cycle phase?',
      choices: [
        { text: 'S phase', correct: true },
        { text: 'G1 phase', correct: false },
        { text: 'G2 phase', correct: false },
        { text: 'M phase', correct: false },
      ],
      explanation: 'DNA synthesis occurs in S phase.',
    },
    {
      id: 'bio_4',
      category: 'Biology',
      difficulty: 'medium',
      question: 'Photosynthesis occurs in which organelle?',
      choices: [
        { text: 'Chloroplast', correct: true },
        { text: 'Mitochondrion', correct: false },
        { text: 'Lysosome', correct: false },
        { text: 'Ribosome', correct: false },
      ],
      explanation: 'Chloroplasts contain chlorophyll for photosynthesis.',
    },
    {
      id: 'bio_5',
      category: 'Biology',
      difficulty: 'hard',
      question: 'Transcription produces:',
      choices: [
        { text: 'mRNA from DNA template', correct: true },
        { text: 'DNA from mRNA template', correct: false },
        { text: 'Protein from mRNA', correct: false },
        { text: 'ATP from ADP', correct: false },
      ],
      explanation: 'Transcription produces messenger RNA.',
    },
    // Chemistry
    {
      id: 'chem_1',
      category: 'Chemistry',
      difficulty: 'easy',
      question: 'Atomic number equals number of:',
      choices: [
        { text: 'Protons', correct: true },
        { text: 'Neutrons', correct: false },
        { text: 'Electrons only', correct: false },
        { text: 'Protons + Neutrons', correct: false },
      ],
      explanation: 'Atomic number is proton count.',
    },
    {
      id: 'chem_2',
      category: 'Chemistry',
      difficulty: 'easy',
      question: 'NaCl is held together by:',
      choices: [
        { text: 'Ionic bond', correct: true },
        { text: 'Covalent bond', correct: false },
        { text: 'Hydrogen bond', correct: false },
        { text: 'Metallic bond', correct: false },
      ],
      explanation: 'Ionic bond between Na+ and Cl-.',
    },
    {
      id: 'chem_3',
      category: 'Chemistry',
      difficulty: 'medium',
      question: 'pH of a neutral aqueous solution at 25°C is:',
      choices: [
        { text: '7', correct: true },
        { text: '0', correct: false },
        { text: '1', correct: false },
        { text: '14', correct: false },
      ],
      explanation: 'Neutral water has pH 7.',
    },
    {
      id: 'chem_4',
      category: 'Chemistry',
      difficulty: 'medium',
      question: "Avogadro's number is approximately:",
      choices: [
        { text: '6.02 × 10^23', correct: true },
        { text: '3.14 × 10^8', correct: false },
        { text: '9.81 × 10^2', correct: false },
        { text: '1.60 × 10^-19', correct: false },
      ],
      explanation: 'Number of particles in one mole.',
    },
    {
      id: 'chem_5',
      category: 'Chemistry',
      difficulty: 'hard',
      question: 'STP reference temperature is:',
      choices: [
        { text: '273 K', correct: true },
        { text: '298 K', correct: false },
        { text: '310 K', correct: false },
        { text: '220 K', correct: false },
      ],
      explanation: 'Standard temperature is 0°C = 273 K.',
    },
    // Earth Science
    {
      id: 'earth_1',
      category: 'Earth Science',
      difficulty: 'easy',
      question: "Layer directly below Earth's crust is:",
      choices: [
        { text: 'Mantle', correct: true },
        { text: 'Outer core', correct: false },
        { text: 'Inner core', correct: false },
        { text: 'Asthenosphere only', correct: false },
      ],
      explanation: 'Mantle lies beneath crust.',
    },
    {
      id: 'earth_2',
      category: 'Earth Science',
      difficulty: 'easy',
      question: 'Plate tectonics describes movement of:',
      choices: [
        { text: 'Lithospheric plates', correct: true },
        { text: 'Ocean tides', correct: false },
        { text: 'Weather fronts', correct: false },
        { text: 'Constellations', correct: false },
      ],
      explanation: 'Tectonic plates move slowly.',
    },
    {
      id: 'earth_3',
      category: 'Earth Science',
      difficulty: 'medium',
      question: 'Rock formed from cooling magma is:',
      choices: [
        { text: 'Igneous', correct: true },
        { text: 'Sedimentary', correct: false },
        { text: 'Metamorphic', correct: false },
        { text: 'Fossil', correct: false },
      ],
      explanation: 'Igneous rocks form from solidified magma.',
    },
    {
      id: 'earth_4',
      category: 'Earth Science',
      difficulty: 'medium',
      question: "Main driver of Earth's weather patterns:",
      choices: [
        { text: 'Solar energy', correct: true },
        { text: "Earth's rotation alone", correct: false },
        { text: 'Moon phases', correct: false },
        { text: 'Cosmic rays', correct: false },
      ],
      explanation: 'Sun provides energy causing atmospheric circulation.',
    },
    {
      id: 'earth_5',
      category: 'Earth Science',
      difficulty: 'hard',
      question: 'The Richter scale measures:',
      choices: [
        { text: 'Earthquake magnitude', correct: true },
        { text: 'Wind speed', correct: false },
        { text: 'Volcanic temperature', correct: false },
        { text: 'Ocean salinity', correct: false },
      ],
      explanation: 'Richter is a logarithmic earthquake magnitude scale.',
    },
    // Astronomy
    {
      id: 'astro_1',
      category: 'Astronomy',
      difficulty: 'easy',
      question: 'What is the closest star to Earth?',
      choices: [
        { text: 'The Sun', correct: true },
        { text: 'Alpha Centauri', correct: false },
        { text: 'Sirius', correct: false },
        { text: 'Betelgeuse', correct: false },
      ],
      explanation: 'The Sun is our closest star, about 93 million miles away.',
    },
    {
      id: 'astro_2',
      category: 'Astronomy',
      difficulty: 'easy',
      question: 'How many planets are in our solar system?',
      choices: [
        { text: '8', correct: true },
        { text: '7', correct: false },
        { text: '9', correct: false },
        { text: '10', correct: false },
      ],
      explanation:
        'There are 8 planets since Pluto was reclassified as a dwarf planet.',
    },
    {
      id: 'astro_3',
      category: 'Astronomy',
      difficulty: 'medium',
      question: 'What causes the phases of the Moon?',
      choices: [
        {
          text: "The Moon's position relative to the Sun and Earth",
          correct: true,
        },
        { text: "Earth's shadow on the Moon", correct: false },
        { text: "The Moon's rotation", correct: false },
        { text: 'Clouds in space', correct: false },
      ],
      explanation:
        'Moon phases result from the changing angle of sunlight on the Moon as seen from Earth.',
    },
    {
      id: 'astro_4',
      category: 'Astronomy',
      difficulty: 'medium',
      question: 'What is a light-year?',
      choices: [
        { text: 'The distance light travels in one year', correct: true },
        { text: 'The time it takes light to reach Earth', correct: false },
        { text: 'A measure of brightness', correct: false },
        { text: 'The age of the universe', correct: false },
      ],
      explanation:
        'A light-year measures distance, about 9.46 trillion kilometers.',
    },
    {
      id: 'astro_5',
      category: 'Astronomy',
      difficulty: 'hard',
      question: 'What is the main composition of the Sun?',
      choices: [
        { text: 'Hydrogen and helium', correct: true },
        { text: 'Oxygen and nitrogen', correct: false },
        { text: 'Carbon and iron', correct: false },
        { text: 'Methane and ammonia', correct: false },
      ],
      explanation: 'The Sun is about 75% hydrogen and 24% helium by mass.',
    },
    // Genetics
    {
      id: 'gen_1',
      category: 'Genetics',
      difficulty: 'easy',
      question: 'What molecule carries genetic information?',
      choices: [
        { text: 'DNA', correct: true },
        { text: 'Protein', correct: false },
        { text: 'Lipid', correct: false },
        { text: 'Carbohydrate', correct: false },
      ],
      explanation:
        'DNA (deoxyribonucleic acid) carries hereditary information.',
    },
    {
      id: 'gen_2',
      category: 'Genetics',
      difficulty: 'easy',
      question: 'How many chromosomes do humans typically have?',
      choices: [
        { text: '46', correct: true },
        { text: '23', correct: false },
        { text: '48', correct: false },
        { text: '50', correct: false },
      ],
      explanation: 'Humans have 23 pairs of chromosomes, totaling 46.',
    },
    {
      id: 'gen_3',
      category: 'Genetics',
      difficulty: 'medium',
      question: 'What is a dominant trait?',
      choices: [
        { text: 'A trait expressed when one allele is present', correct: true },
        {
          text: 'A trait that needs two alleles to be expressed',
          correct: false,
        },
        { text: 'A trait that never appears', correct: false },
        { text: 'A trait only in males', correct: false },
      ],
      explanation:
        'Dominant traits are expressed even with only one copy of the allele.',
    },
    {
      id: 'gen_4',
      category: 'Genetics',
      difficulty: 'medium',
      question: 'What is the function of RNA?',
      choices: [
        { text: 'Protein synthesis', correct: true },
        { text: 'Energy storage', correct: false },
        { text: 'Structural support', correct: false },
        { text: 'Cell division', correct: false },
      ],
      explanation: 'RNA helps translate DNA code into proteins.',
    },
    {
      id: 'gen_5',
      category: 'Genetics',
      difficulty: 'hard',
      question: 'What is a mutation?',
      choices: [
        { text: 'A change in DNA sequence', correct: true },
        { text: 'Normal cell division', correct: false },
        { text: 'Protein production', correct: false },
        { text: 'Chromosome duplication', correct: false },
      ],
      explanation:
        'Mutations are alterations in the DNA sequence that can affect traits.',
    },
    // Ecology
    {
      id: 'eco_1',
      category: 'Ecology',
      difficulty: 'easy',
      question: 'What is a producer in an ecosystem?',
      choices: [
        { text: 'An organism that makes its own food', correct: true },
        { text: 'An organism that eats other organisms', correct: false },
        { text: 'An organism that breaks down dead matter', correct: false },
        { text: 'An organism that lives in water', correct: false },
      ],
      explanation: 'Producers, like plants, make food through photosynthesis.',
    },
    {
      id: 'eco_2',
      category: 'Ecology',
      difficulty: 'easy',
      question: 'What is the primary source of energy for most ecosystems?',
      choices: [
        { text: 'The Sun', correct: true },
        { text: 'Water', correct: false },
        { text: 'Wind', correct: false },
        { text: 'Soil', correct: false },
      ],
      explanation:
        'Solar energy drives photosynthesis, the base of most food chains.',
    },
    {
      id: 'eco_3',
      category: 'Ecology',
      difficulty: 'medium',
      question: 'What is a food chain?',
      choices: [
        {
          text: 'A sequence showing energy transfer between organisms',
          correct: true,
        },
        { text: 'A list of all organisms in an area', correct: false },
        { text: 'A diagram of organism habitats', correct: false },
        { text: 'A classification of species', correct: false },
      ],
      explanation:
        'Food chains show how energy passes from one organism to another.',
    },
    {
      id: 'eco_4',
      category: 'Ecology',
      difficulty: 'medium',
      question: 'What role do decomposers play?',
      choices: [
        {
          text: 'Break down dead organisms and recycle nutrients',
          correct: true,
        },
        { text: 'Produce food through photosynthesis', correct: false },
        { text: 'Hunt and eat herbivores', correct: false },
        { text: 'Pollinate plants', correct: false },
      ],
      explanation:
        'Decomposers like fungi and bacteria recycle nutrients back into the ecosystem.',
    },
    {
      id: 'eco_5',
      category: 'Ecology',
      difficulty: 'hard',
      question: 'What is carrying capacity?',
      choices: [
        {
          text: 'Maximum population size an environment can sustain',
          correct: true,
        },
        { text: 'The weight of all organisms in an area', correct: false },
        { text: 'The number of species in an ecosystem', correct: false },
        { text: 'The rate of population growth', correct: false },
      ],
      explanation:
        'Carrying capacity is limited by resources like food, water, and space.',
    },
    // Atomic Structure
    {
      id: 'atom_1',
      category: 'Atomic Structure',
      difficulty: 'easy',
      question: 'What particles are in the nucleus of an atom?',
      choices: [
        { text: 'Protons and neutrons', correct: true },
        { text: 'Protons and electrons', correct: false },
        { text: 'Neutrons and electrons', correct: false },
        { text: 'Only protons', correct: false },
      ],
      explanation:
        'The nucleus contains protons and neutrons; electrons orbit outside.',
    },
    {
      id: 'atom_2',
      category: 'Atomic Structure',
      difficulty: 'easy',
      question: 'What charge does a proton have?',
      choices: [
        { text: 'Positive', correct: true },
        { text: 'Negative', correct: false },
        { text: 'Neutral', correct: false },
        { text: 'Variable', correct: false },
      ],
      explanation:
        'Protons have a positive charge; electrons are negative; neutrons are neutral.',
    },
    {
      id: 'atom_3',
      category: 'Atomic Structure',
      difficulty: 'medium',
      question: 'What determines the atomic number of an element?',
      choices: [
        { text: 'Number of protons', correct: true },
        { text: 'Number of neutrons', correct: false },
        { text: 'Number of electrons', correct: false },
        { text: 'Total mass', correct: false },
      ],
      explanation: 'Atomic number equals the number of protons in the nucleus.',
    },
    {
      id: 'atom_4',
      category: 'Atomic Structure',
      difficulty: 'medium',
      question: 'What are isotopes?',
      choices: [
        {
          text: 'Atoms of the same element with different numbers of neutrons',
          correct: true,
        },
        { text: 'Atoms with different numbers of protons', correct: false },
        { text: 'Atoms with different numbers of electrons', correct: false },
        { text: 'Atoms from different elements', correct: false },
      ],
      explanation:
        'Isotopes have the same atomic number but different mass numbers.',
    },
    {
      id: 'atom_5',
      category: 'Atomic Structure',
      difficulty: 'hard',
      question: 'What is an ion?',
      choices: [
        {
          text: 'An atom with an unequal number of protons and electrons',
          correct: true,
        },
        { text: 'An atom with extra neutrons', correct: false },
        { text: 'An atom that is radioactive', correct: false },
        { text: 'A molecule with two atoms', correct: false },
      ],
      explanation:
        'Ions form when atoms gain or lose electrons, creating a net charge.',
    },
    // Thermodynamics
    {
      id: 'thermo_1',
      category: 'Thermodynamics',
      difficulty: 'easy',
      question: 'What is heat?',
      choices: [
        {
          text: 'Energy transferred due to temperature difference',
          correct: true,
        },
        { text: 'The same as temperature', correct: false },
        { text: 'A type of matter', correct: false },
        { text: 'Potential energy', correct: false },
      ],
      explanation:
        'Heat is thermal energy moving from warmer to cooler objects.',
    },
    {
      id: 'thermo_2',
      category: 'Thermodynamics',
      difficulty: 'easy',
      question: 'What does temperature measure?',
      choices: [
        { text: 'Average kinetic energy of particles', correct: true },
        { text: 'Total energy of a system', correct: false },
        { text: 'Amount of matter', correct: false },
        { text: 'Volume of a substance', correct: false },
      ],
      explanation:
        'Temperature reflects how fast particles are moving on average.',
    },
    {
      id: 'thermo_3',
      category: 'Thermodynamics',
      difficulty: 'medium',
      question: 'What is the first law of thermodynamics?',
      choices: [
        { text: 'Energy cannot be created or destroyed', correct: true },
        { text: 'Heat flows from cold to hot', correct: false },
        { text: 'Entropy always increases', correct: false },
        { text: 'Work equals force times distance', correct: false },
      ],
      explanation: 'The first law states energy is conserved in all processes.',
    },
    {
      id: 'thermo_4',
      category: 'Thermodynamics',
      difficulty: 'medium',
      question: 'What is thermal expansion?',
      choices: [
        { text: 'Matter expanding when heated', correct: true },
        { text: 'Heat moving through a vacuum', correct: false },
        { text: 'Temperature decreasing over time', correct: false },
        { text: 'Energy being converted to mass', correct: false },
      ],
      explanation:
        'Most materials expand when heated as particles move faster.',
    },
    {
      id: 'thermo_5',
      category: 'Thermodynamics',
      difficulty: 'hard',
      question: 'What is entropy?',
      choices: [
        {
          text: 'A measure of disorder or randomness in a system',
          correct: true,
        },
        { text: 'The total energy in a closed system', correct: false },
        { text: 'The rate of heat transfer', correct: false },
        { text: 'The temperature at absolute zero', correct: false },
      ],
      explanation:
        'Entropy tends to increase, meaning systems naturally become more disordered.',
    },
  ];
  window.SCIENCE_CONCEPT_QUESTIONS = SCIENCE_CONCEPT_QUESTIONS;
})();
