import React, { useState, useMemo } from 'react';

// Science Concept Questions Data
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
    explanation:
      'Force is measured in newtons (N). One newton is the force required to accelerate a 1 kg mass at 1 m/s².',
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
    explanation:
      'Total energy remains constant in an isolated system according to the law of conservation of energy.',
  },
  {
    id: 'phys_3',
    category: 'Physics',
    difficulty: 'medium',
    question:
      'An object moves at constant velocity. What is the net force acting on it?',
    choices: [
      { text: 'Zero', correct: true },
      { text: 'Equal to its weight', correct: false },
      { text: 'Increasing', correct: false },
      { text: 'Opposite to its velocity', correct: false },
    ],
    explanation:
      "Newton's First Law states that constant velocity implies zero net force. Forces are balanced.",
  },
  {
    id: 'phys_4',
    category: 'Physics',
    difficulty: 'medium',
    question: 'What is the formula for kinetic energy?',
    choices: [
      { text: 'KE = ½mv²', correct: true },
      { text: 'KE = mv', correct: false },
      { text: 'KE = mgh', correct: false },
      { text: 'KE = Fd', correct: false },
    ],
    explanation:
      'Kinetic energy is calculated as KE = ½mv², where m is mass and v is velocity.',
  },
  // Chemistry
  {
    id: 'chem_1',
    category: 'Chemistry',
    difficulty: 'easy',
    question: 'What is the chemical symbol for water?',
    choices: [
      { text: 'H₂O', correct: true },
      { text: 'CO₂', correct: false },
      { text: 'O₂', correct: false },
      { text: 'NaCl', correct: false },
    ],
    explanation: 'Water is H₂O: two hydrogen atoms bonded to one oxygen atom.',
  },
  {
    id: 'chem_2',
    category: 'Chemistry',
    difficulty: 'easy',
    question: 'What is the smallest unit of an element?',
    choices: [
      { text: 'Atom', correct: true },
      { text: 'Molecule', correct: false },
      { text: 'Cell', correct: false },
      { text: 'Compound', correct: false },
    ],
    explanation:
      'An atom is the smallest unit that retains the properties of an element.',
  },
  {
    id: 'chem_3',
    category: 'Chemistry',
    difficulty: 'medium',
    question:
      'What type of bond forms when electrons are shared between atoms?',
    choices: [
      { text: 'Covalent bond', correct: true },
      { text: 'Ionic bond', correct: false },
      { text: 'Metallic bond', correct: false },
      { text: 'Hydrogen bond', correct: false },
    ],
    explanation:
      'Covalent bonds form when atoms share electrons to achieve stable electron configurations.',
  },
  {
    id: 'chem_4',
    category: 'Chemistry',
    difficulty: 'hard',
    question: 'What happens during an oxidation reaction?',
    choices: [
      { text: 'Loss of electrons', correct: true },
      { text: 'Gain of electrons', correct: false },
      { text: 'Gain of protons', correct: false },
      { text: 'Loss of neutrons', correct: false },
    ],
    explanation:
      'Oxidation is the loss of electrons. Remember: OIL RIG (Oxidation Is Loss, Reduction Is Gain).',
  },
  // Biology
  {
    id: 'bio_1',
    category: 'Biology',
    difficulty: 'easy',
    question: 'What is the basic unit of life?',
    choices: [
      { text: 'Cell', correct: true },
      { text: 'Tissue', correct: false },
      { text: 'Organ', correct: false },
      { text: 'Atom', correct: false },
    ],
    explanation:
      'The cell is the basic structural and functional unit of all living organisms.',
  },
  {
    id: 'bio_2',
    category: 'Biology',
    difficulty: 'easy',
    question: 'What organelle is responsible for photosynthesis?',
    choices: [
      { text: 'Chloroplast', correct: true },
      { text: 'Mitochondria', correct: false },
      { text: 'Nucleus', correct: false },
      { text: 'Ribosome', correct: false },
    ],
    explanation:
      'Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.',
  },
  {
    id: 'bio_3',
    category: 'Biology',
    difficulty: 'medium',
    question: 'DNA is composed of repeating units called:',
    choices: [
      { text: 'Nucleotides', correct: true },
      { text: 'Amino acids', correct: false },
      { text: 'Proteins', correct: false },
      { text: 'Lipids', correct: false },
    ],
    explanation:
      'Nucleotides are the building blocks of DNA, each containing a sugar, phosphate, and nitrogenous base.',
  },
  {
    id: 'bio_4',
    category: 'Biology',
    difficulty: 'hard',
    question: 'Which process produces the most ATP in cellular respiration?',
    choices: [
      { text: 'Electron transport chain', correct: true },
      { text: 'Glycolysis', correct: false },
      { text: 'Krebs cycle', correct: false },
      { text: 'Fermentation', correct: false },
    ],
    explanation:
      'The electron transport chain produces about 34 ATP molecules, the most of any stage in cellular respiration.',
  },
  // Earth Science
  {
    id: 'earth_1',
    category: 'Earth Science',
    difficulty: 'easy',
    question: 'What causes tides on Earth?',
    choices: [
      { text: "Moon's gravitational pull", correct: true },
      { text: 'Wind patterns', correct: false },
      { text: 'Ocean currents', correct: false },
      { text: "Earth's rotation", correct: false },
    ],
    explanation:
      "Tides are primarily caused by the Moon's gravitational pull on Earth's oceans.",
  },
  {
    id: 'earth_2',
    category: 'Earth Science',
    difficulty: 'medium',
    question: 'Which layer of Earth is the thickest?',
    choices: [
      { text: 'Mantle', correct: true },
      { text: 'Crust', correct: false },
      { text: 'Outer core', correct: false },
      { text: 'Inner core', correct: false },
    ],
    explanation:
      "The mantle makes up about 84% of Earth's volume and extends nearly 2,900 km deep.",
  },
  {
    id: 'earth_3',
    category: 'Earth Science',
    difficulty: 'medium',
    question: 'What type of rock is formed from cooled magma or lava?',
    choices: [
      { text: 'Igneous', correct: true },
      { text: 'Sedimentary', correct: false },
      { text: 'Metamorphic', correct: false },
      { text: 'Crystalline', correct: false },
    ],
    explanation:
      'Igneous rocks form when molten rock (magma or lava) cools and solidifies.',
  },
  {
    id: 'earth_4',
    category: 'Earth Science',
    difficulty: 'hard',
    question: 'What drives plate tectonics?',
    choices: [
      { text: 'Convection currents in the mantle', correct: true },
      { text: 'Ocean currents', correct: false },
      { text: 'Atmospheric pressure', correct: false },
      { text: "Earth's magnetic field", correct: false },
    ],
    explanation:
      "Heat-driven convection currents in the mantle cause tectonic plates to move across Earth's surface.",
  },
  // ── Physics (continued) ──────────────────────────────────────────────
  {
    id: 'phys_5',
    category: 'Physics',
    difficulty: 'easy',
    question: 'What is the unit of electrical current?',
    choices: [
      { text: 'Ampere (A)', correct: true },
      { text: 'Volt (V)', correct: false },
      { text: 'Ohm (Ω)', correct: false },
      { text: 'Watt (W)', correct: false },
    ],
    explanation:
      'Electrical current is measured in amperes (A). One ampere equals one coulomb of charge per second.',
  },
  {
    id: 'phys_6',
    category: 'Physics',
    difficulty: 'easy',
    question: 'Which form of energy does a compressed spring possess?',
    choices: [
      { text: 'Elastic potential energy', correct: true },
      { text: 'Kinetic energy', correct: false },
      { text: 'Thermal energy', correct: false },
      { text: 'Chemical energy', correct: false },
    ],
    explanation:
      'A compressed or stretched spring stores elastic potential energy, which is released when the spring returns to its natural length.',
  },
  {
    id: 'phys_7',
    category: 'Physics',
    difficulty: 'medium',
    question:
      "According to Newton's Third Law, when you push on a wall, the wall:",
    choices: [
      {
        text: 'Pushes back on you with an equal and opposite force',
        correct: true,
      },
      { text: 'Does not exert any force on you', correct: false },
      { text: 'Pushes back with a greater force', correct: false },
      { text: 'Pulls you toward it', correct: false },
    ],
    explanation:
      "Newton's Third Law states that every action has an equal and opposite reaction. The wall pushes back on you with the same magnitude of force.",
  },
  {
    id: 'phys_8',
    category: 'Physics',
    difficulty: 'medium',
    question:
      'What happens to the speed of light when it passes from air into glass?',
    choices: [
      { text: 'It decreases', correct: true },
      { text: 'It increases', correct: false },
      { text: 'It stays the same', correct: false },
      { text: 'It doubles', correct: false },
    ],
    explanation:
      'Light slows down when it enters a denser medium like glass, which causes it to refract (bend).',
  },
  {
    id: 'phys_9',
    category: 'Physics',
    difficulty: 'medium',
    question: 'A wave with a higher frequency has a __ wavelength.',
    choices: [
      { text: 'Shorter', correct: true },
      { text: 'Longer', correct: false },
      { text: 'The same', correct: false },
      { text: 'Variable — it depends on the medium', correct: false },
    ],
    explanation:
      'For waves traveling at the same speed, frequency and wavelength are inversely related: higher frequency = shorter wavelength (v = fλ).',
  },
  {
    id: 'phys_10',
    category: 'Physics',
    difficulty: 'hard',
    question:
      'An object is thrown horizontally from a cliff. Ignoring air resistance, what determines how long it takes to hit the ground?',
    choices: [
      { text: 'The height of the cliff only', correct: true },
      { text: 'The horizontal speed only', correct: false },
      { text: 'Both height and horizontal speed equally', correct: false },
      { text: 'The mass of the object', correct: false },
    ],
    explanation:
      'Vertical and horizontal motions are independent. Only gravity and the height of the cliff determine fall time; horizontal speed affects how far the object travels, not how long it falls.',
  },
  {
    id: 'phys_11',
    category: 'Physics',
    difficulty: 'medium',
    question:
      'What kind of circuit allows current to flow through multiple separate paths?',
    choices: [
      { text: 'Parallel circuit', correct: true },
      { text: 'Series circuit', correct: false },
      { text: 'Open circuit', correct: false },
      { text: 'Short circuit', correct: false },
    ],
    explanation:
      'In a parallel circuit, each component has its own path to the power source. If one path breaks, the others continue to work.',
  },
  {
    id: 'phys_12',
    category: 'Physics',
    difficulty: 'easy',
    question: 'What is the term for the amount of matter in an object?',
    choices: [
      { text: 'Mass', correct: true },
      { text: 'Weight', correct: false },
      { text: 'Volume', correct: false },
      { text: 'Density', correct: false },
    ],
    explanation:
      'Mass measures the amount of matter in an object and does not change with location. Weight is the gravitational force on that mass and varies by location.',
  },
  {
    id: 'phys_13',
    category: 'Physics',
    difficulty: 'hard',
    question: 'Which electromagnetic wave has the most energy?',
    choices: [
      { text: 'Gamma rays', correct: true },
      { text: 'X-rays', correct: false },
      { text: 'Visible light', correct: false },
      { text: 'Radio waves', correct: false },
    ],
    explanation:
      'Gamma rays have the shortest wavelength and highest frequency in the electromagnetic spectrum, giving them the most energy.',
  },
  {
    id: 'phys_14',
    category: 'Physics',
    difficulty: 'medium',
    question: 'What does the law of conservation of momentum state?',
    choices: [
      {
        text: 'Total momentum in a closed system remains constant',
        correct: true,
      },
      { text: 'Momentum increases as velocity increases', correct: false },
      { text: 'Mass is always conserved', correct: false },
      { text: 'Force equals mass times acceleration', correct: false },
    ],
    explanation:
      'In a closed system with no external forces, the total momentum before and after a collision is the same.',
  },
  {
    id: 'phys_15',
    category: 'Physics',
    difficulty: 'easy',
    question: 'Gravity on Earth pulls objects downward at approximately:',
    choices: [
      { text: '9.8 m/s²', correct: true },
      { text: '3.2 m/s²', correct: false },
      { text: '15.0 m/s²', correct: false },
      { text: '1.6 m/s²', correct: false },
    ],
    explanation:
      "Earth's gravitational acceleration is approximately 9.8 m/s² (often rounded to 10 m/s² for calculations).",
  },
  {
    id: 'phys_16',
    category: 'Physics',
    difficulty: 'medium',
    question: 'What is the difference between speed and velocity?',
    choices: [
      { text: 'Velocity includes direction; speed does not', correct: true },
      { text: 'Speed includes direction; velocity does not', correct: false },
      { text: 'They are the same thing', correct: false },
      { text: 'Velocity is always faster than speed', correct: false },
    ],
    explanation:
      'Speed is a scalar quantity (magnitude only). Velocity is a vector quantity that includes both magnitude and direction.',
  },
  {
    id: 'phys_17',
    category: 'Physics',
    difficulty: 'hard',
    question: 'A 2 kg object moving at 4 m/s has a kinetic energy of:',
    choices: [
      { text: '16 J', correct: true },
      { text: '8 J', correct: false },
      { text: '32 J', correct: false },
      { text: '4 J', correct: false },
    ],
    explanation: 'KE = ½mv² = ½ × 2 × 4² = ½ × 2 × 16 = 16 J.',
  },
  // ── Chemistry (continued) ────────────────────────────────────────────
  {
    id: 'chem_5',
    category: 'Chemistry',
    difficulty: 'easy',
    question: 'What is the pH of a neutral solution?',
    choices: [
      { text: '7', correct: true },
      { text: '0', correct: false },
      { text: '14', correct: false },
      { text: '1', correct: false },
    ],
    explanation:
      'A neutral solution (like pure water) has a pH of 7. Below 7 is acidic; above 7 is basic (alkaline).',
  },
  {
    id: 'chem_6',
    category: 'Chemistry',
    difficulty: 'easy',
    question:
      'What are the products of burning a hydrocarbon completely in oxygen?',
    choices: [
      { text: 'Carbon dioxide and water', correct: true },
      { text: 'Carbon monoxide and hydrogen', correct: false },
      { text: 'Oxygen and nitrogen', correct: false },
      { text: 'Carbon and steam', correct: false },
    ],
    explanation:
      'Complete combustion of a hydrocarbon in sufficient oxygen produces CO₂ and H₂O.',
  },
  {
    id: 'chem_7',
    category: 'Chemistry',
    difficulty: 'medium',
    question: 'Which particle in an atom has a negative charge?',
    choices: [
      { text: 'Electron', correct: true },
      { text: 'Proton', correct: false },
      { text: 'Neutron', correct: false },
      { text: 'Nucleus', correct: false },
    ],
    explanation:
      'Electrons carry a negative charge and orbit the nucleus. Protons are positive, neutrons are neutral.',
  },
  {
    id: 'chem_8',
    category: 'Chemistry',
    difficulty: 'medium',
    question: 'What does a chemical equation\'s "balanced" state mean?',
    choices: [
      {
        text: 'The same number of each type of atom on both sides',
        correct: true,
      },
      { text: 'The coefficients are all equal', correct: false },
      { text: 'Products equal reactants by mass formula', correct: false },
      { text: 'The charge is zero on both sides', correct: false },
    ],
    explanation:
      "A balanced chemical equation obeys the law of conservation of mass — atoms are neither created nor destroyed, so each element's count must match on both sides.",
  },
  {
    id: 'chem_9',
    category: 'Chemistry',
    difficulty: 'easy',
    question: 'Which state of matter has a definite shape and definite volume?',
    choices: [
      { text: 'Solid', correct: true },
      { text: 'Liquid', correct: false },
      { text: 'Gas', correct: false },
      { text: 'Plasma', correct: false },
    ],
    explanation:
      'Solids have tightly packed particles giving them both a definite shape and volume. Liquids have definite volume but no definite shape. Gases have neither.',
  },
  {
    id: 'chem_10',
    category: 'Chemistry',
    difficulty: 'medium',
    question: 'What is the atomic number of an element?',
    choices: [
      { text: 'Number of protons in the nucleus', correct: true },
      { text: 'Number of neutrons in the nucleus', correct: false },
      { text: 'Total number of electrons and protons', correct: false },
      { text: 'Average atomic mass', correct: false },
    ],
    explanation:
      'The atomic number equals the number of protons. It uniquely identifies each element on the periodic table.',
  },
  {
    id: 'chem_11',
    category: 'Chemistry',
    difficulty: 'hard',
    question:
      'In electrolysis, which electrode attracts positively charged ions (cations)?',
    choices: [
      { text: 'Cathode (negative electrode)', correct: true },
      { text: 'Anode (positive electrode)', correct: false },
      { text: 'Both electrodes equally', correct: false },
      { text: 'Neither — ions move to the solution center', correct: false },
    ],
    explanation:
      'Opposite charges attract. The cathode carries a negative charge, so positive cations move toward it. The anode attracts negative anions.',
  },
  {
    id: 'chem_12',
    category: 'Chemistry',
    difficulty: 'medium',
    question: 'Which change is a physical change?',
    choices: [
      { text: 'Ice melting into water', correct: true },
      { text: 'Wood burning', correct: false },
      { text: 'Rust forming on iron', correct: false },
      { text: 'Baking soda reacting with vinegar', correct: false },
    ],
    explanation:
      'Melting ice is a physical change — water changes state but no new substance is formed. The other options involve chemical reactions that produce new substances.',
  },
  {
    id: 'chem_13',
    category: 'Chemistry',
    difficulty: 'hard',
    question: 'An acid and a base react to form:',
    choices: [
      { text: 'Salt and water (neutralization)', correct: true },
      { text: 'Gas and acid', correct: false },
      { text: 'A new acid', correct: false },
      { text: 'Only water', correct: false },
    ],
    explanation:
      'Neutralization reaction: acid + base → salt + water. For example, HCl + NaOH → NaCl + H₂O.',
  },
  {
    id: 'chem_14',
    category: 'Chemistry',
    difficulty: 'easy',
    question: "What is the most abundant gas in Earth's atmosphere?",
    choices: [
      { text: 'Nitrogen (N₂)', correct: true },
      { text: 'Oxygen (O₂)', correct: false },
      { text: 'Carbon dioxide (CO₂)', correct: false },
      { text: 'Argon (Ar)', correct: false },
    ],
    explanation:
      "Nitrogen makes up about 78% of Earth's atmosphere. Oxygen is about 21%, and argon and other gases make up the rest.",
  },
  {
    id: 'chem_15',
    category: 'Chemistry',
    difficulty: 'medium',
    question:
      'What type of chemical bond is formed between a metal and a nonmetal?',
    choices: [
      { text: 'Ionic bond', correct: true },
      { text: 'Covalent bond', correct: false },
      { text: 'Metallic bond', correct: false },
      { text: 'Hydrogen bond', correct: false },
    ],
    explanation:
      'Ionic bonds form when a metal transfers electrons to a nonmetal, creating oppositely charged ions that attract each other (e.g., NaCl).',
  },
  {
    id: 'chem_16',
    category: 'Chemistry',
    difficulty: 'hard',
    question: 'During photosynthesis, plants convert light energy into:',
    choices: [
      { text: 'Chemical energy stored in glucose', correct: true },
      { text: 'Thermal energy released as heat', correct: false },
      { text: 'Electrical energy in cell membranes', correct: false },
      { text: 'Kinetic energy of molecules', correct: false },
    ],
    explanation:
      'Photosynthesis converts sunlight into chemical energy stored in glucose (C₆H₁₂O₆), with CO₂ and H₂O as reactants and O₂ as a byproduct.',
  },
  {
    id: 'chem_17',
    category: 'Chemistry',
    difficulty: 'medium',
    question:
      'Isotopes of the same element have the same number of protons but different numbers of:',
    choices: [
      { text: 'Neutrons', correct: true },
      { text: 'Electrons', correct: false },
      { text: 'Protons', correct: false },
      { text: 'Valence electrons', correct: false },
    ],
    explanation:
      'Isotopes are atoms of the same element (same atomic number/protons) but with different numbers of neutrons, giving them different mass numbers.',
  },
  // ── Biology (continued) ──────────────────────────────────────────────
  {
    id: 'bio_5',
    category: 'Biology',
    difficulty: 'easy',
    question:
      'What molecule carries genetic information in most living organisms?',
    choices: [
      { text: 'DNA', correct: true },
      { text: 'RNA', correct: false },
      { text: 'Protein', correct: false },
      { text: 'Lipid', correct: false },
    ],
    explanation:
      'DNA (deoxyribonucleic acid) stores genetic information and is found in the nucleus. RNA helps translate that information into proteins.',
  },
  {
    id: 'bio_6',
    category: 'Biology',
    difficulty: 'easy',
    question: 'What organelle is known as the "powerhouse of the cell"?',
    choices: [
      { text: 'Mitochondria', correct: true },
      { text: 'Nucleus', correct: false },
      { text: 'Ribosome', correct: false },
      { text: 'Vacuole', correct: false },
    ],
    explanation:
      'Mitochondria produce ATP through cellular respiration. They are the primary energy-generating organelles of the cell.',
  },
  {
    id: 'bio_7',
    category: 'Biology',
    difficulty: 'medium',
    question: 'What is the process by which plants make food using sunlight?',
    choices: [
      { text: 'Photosynthesis', correct: true },
      { text: 'Cellular respiration', correct: false },
      { text: 'Fermentation', correct: false },
      { text: 'Digestion', correct: false },
    ],
    explanation:
      'Photosynthesis uses sunlight, CO₂, and water to produce glucose and oxygen: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.',
  },
  {
    id: 'bio_8',
    category: 'Biology',
    difficulty: 'medium',
    question: 'Which blood vessels carry blood away from the heart?',
    choices: [
      { text: 'Arteries', correct: true },
      { text: 'Veins', correct: false },
      { text: 'Capillaries', correct: false },
      { text: 'Lymph vessels', correct: false },
    ],
    explanation:
      'Arteries carry oxygenated blood away from the heart (except the pulmonary artery). Veins carry blood back to the heart.',
  },
  {
    id: 'bio_9',
    category: 'Biology',
    difficulty: 'easy',
    question: 'What structure controls what enters and exits the cell?',
    choices: [
      { text: 'Cell membrane', correct: true },
      { text: 'Cell wall', correct: false },
      { text: 'Nucleus', correct: false },
      { text: 'Cytoplasm', correct: false },
    ],
    explanation:
      'The cell membrane (plasma membrane) is selectively permeable — it controls which substances pass in and out of the cell.',
  },
  {
    id: 'bio_10',
    category: 'Biology',
    difficulty: 'medium',
    question: 'What is natural selection?',
    choices: [
      {
        text: 'Organisms with favorable traits are more likely to survive and reproduce',
        correct: true,
      },
      { text: 'Organisms choose their own genetic mutations', correct: false },
      {
        text: 'All organisms survive equally in an environment',
        correct: false,
      },
      {
        text: 'Traits are passed from parent to offspring unchanged',
        correct: false,
      },
    ],
    explanation:
      "Natural selection (Darwin's mechanism of evolution) means individuals with traits better suited to their environment tend to survive, reproduce, and pass on those traits.",
  },
  {
    id: 'bio_11',
    category: 'Biology',
    difficulty: 'hard',
    question: 'What is the role of ribosomes in a cell?',
    choices: [
      { text: 'Synthesize proteins', correct: true },
      { text: 'Produce ATP', correct: false },
      { text: 'Store genetic information', correct: false },
      { text: 'Break down waste materials', correct: false },
    ],
    explanation:
      'Ribosomes are the sites of protein synthesis. They read mRNA instructions and assemble amino acids into proteins.',
  },
  {
    id: 'bio_12',
    category: 'Biology',
    difficulty: 'medium',
    question:
      'Which type of reproduction produces offspring that are genetically identical to the parent?',
    choices: [
      { text: 'Asexual reproduction', correct: true },
      { text: 'Sexual reproduction', correct: false },
      { text: 'Binary fission only', correct: false },
      { text: 'Budding only', correct: false },
    ],
    explanation:
      'Asexual reproduction (including binary fission, budding, and cloning) produces genetically identical offspring since only one parent is involved.',
  },
  {
    id: 'bio_13',
    category: 'Biology',
    difficulty: 'hard',
    question: "What is the function of the cell's nucleus?",
    choices: [
      {
        text: 'Control center that contains DNA and regulates cell activity',
        correct: true,
      },
      { text: 'Produce energy for the cell', correct: false },
      { text: 'Digest old organelles', correct: false },
      { text: 'Transport proteins outside the cell', correct: false },
    ],
    explanation:
      "The nucleus contains the cell's DNA and directs cellular activities including growth, metabolism, and reproduction.",
  },
  {
    id: 'bio_14',
    category: 'Biology',
    difficulty: 'easy',
    question: 'Which kingdom do mushrooms belong to?',
    choices: [
      { text: 'Fungi', correct: true },
      { text: 'Plantae', correct: false },
      { text: 'Animalia', correct: false },
      { text: 'Protista', correct: false },
    ],
    explanation:
      'Mushrooms are fungi — they cannot photosynthesize and obtain nutrients by decomposing organic matter.',
  },
  {
    id: 'bio_15',
    category: 'Biology',
    difficulty: 'medium',
    question:
      'What is the term for all the different populations living together in an area?',
    choices: [
      { text: 'Community', correct: true },
      { text: 'Ecosystem', correct: false },
      { text: 'Biome', correct: false },
      { text: 'Population', correct: false },
    ],
    explanation:
      'A community is all the populations of different species living together and interacting in a specific area. An ecosystem adds the abiotic (non-living) components.',
  },
  {
    id: 'bio_16',
    category: 'Biology',
    difficulty: 'hard',
    question: 'Which process involves copying DNA before cell division?',
    choices: [
      { text: 'DNA replication', correct: true },
      { text: 'Transcription', correct: false },
      { text: 'Translation', correct: false },
      { text: 'Mitosis', correct: false },
    ],
    explanation:
      'DNA replication occurs in the S phase of interphase before cell division, producing two identical copies of the chromosome.',
  },
  {
    id: 'bio_17',
    category: 'Biology',
    difficulty: 'medium',
    question: 'What does a food chain show?',
    choices: [
      {
        text: 'The flow of energy from one organism to the next through feeding',
        correct: true,
      },
      { text: 'How organisms migrate through an ecosystem', correct: false },
      { text: 'The population size of organisms in an area', correct: false },
      { text: 'How organisms reproduce', correct: false },
    ],
    explanation:
      'A food chain shows the transfer of energy through a series of organisms: producer → primary consumer → secondary consumer → etc.',
  },
  {
    id: 'bio_18',
    category: 'Biology',
    difficulty: 'easy',
    question: 'What gas do plants release during photosynthesis?',
    choices: [
      { text: 'Oxygen', correct: true },
      { text: 'Carbon dioxide', correct: false },
      { text: 'Nitrogen', correct: false },
      { text: 'Hydrogen', correct: false },
    ],
    explanation:
      'Plants use CO₂ and water to make glucose, releasing oxygen as a byproduct of photosynthesis.',
  },
  {
    id: 'bio_19',
    category: 'Biology',
    difficulty: 'hard',
    question: 'What is a dominant allele?',
    choices: [
      {
        text: 'An allele whose trait is expressed even if only one copy is present',
        correct: true,
      },
      { text: 'An allele that is always inherited', correct: false },
      {
        text: 'An allele that requires two copies to show in the phenotype',
        correct: false,
      },
      { text: 'An allele found only in one parent', correct: false },
    ],
    explanation:
      'A dominant allele masks a recessive allele when both are present. Only one copy is needed for the dominant trait to appear in the phenotype.',
  },
  {
    id: 'bio_20',
    category: 'Biology',
    difficulty: 'medium',
    question:
      'Which organ system is responsible for transporting oxygen and nutrients throughout the body?',
    choices: [
      { text: 'Circulatory system', correct: true },
      { text: 'Respiratory system', correct: false },
      { text: 'Digestive system', correct: false },
      { text: 'Nervous system', correct: false },
    ],
    explanation:
      'The circulatory system (heart, blood vessels, blood) transports oxygen, nutrients, hormones, and waste products throughout the body.',
  },
  // ── Earth Science (continued) ────────────────────────────────────────
  {
    id: 'earth_5',
    category: 'Earth Science',
    difficulty: 'easy',
    question:
      'What is the water cycle process by which water changes from liquid to water vapor?',
    choices: [
      { text: 'Evaporation', correct: true },
      { text: 'Condensation', correct: false },
      { text: 'Precipitation', correct: false },
      { text: 'Transpiration', correct: false },
    ],
    explanation:
      'Evaporation is the process by which liquid water (from oceans, lakes, etc.) is heated by the sun and becomes water vapor in the atmosphere.',
  },
  {
    id: 'earth_6',
    category: 'Earth Science',
    difficulty: 'easy',
    question: 'What is the outermost layer of Earth called?',
    choices: [
      { text: 'Crust', correct: true },
      { text: 'Mantle', correct: false },
      { text: 'Core', correct: false },
      { text: 'Lithosphere', correct: false },
    ],
    explanation:
      "The crust is Earth's thin, outermost layer. Continental crust is about 30-50 km thick; oceanic crust is thinner at 5-10 km.",
  },
  {
    id: 'earth_7',
    category: 'Earth Science',
    difficulty: 'medium',
    question:
      'Which type of rock forms from existing rocks changed by heat and pressure?',
    choices: [
      { text: 'Metamorphic', correct: true },
      { text: 'Igneous', correct: false },
      { text: 'Sedimentary', correct: false },
      { text: 'Volcanic', correct: false },
    ],
    explanation:
      'Metamorphic rocks form when existing rocks are transformed by intense heat, pressure, or chemical processes (e.g., limestone becomes marble, shale becomes slate).',
  },
  {
    id: 'earth_8',
    category: 'Earth Science',
    difficulty: 'medium',
    question: 'What is the term for the bending of rock layers due to stress?',
    choices: [
      { text: 'Folding', correct: true },
      { text: 'Faulting', correct: false },
      { text: 'Erosion', correct: false },
      { text: 'Deposition', correct: false },
    ],
    explanation:
      'Folding occurs when rock layers are compressed and bend without breaking, forming mountain ranges like the Appalachians.',
  },
  {
    id: 'earth_9',
    category: 'Earth Science',
    difficulty: 'easy',
    question: 'What causes seasons on Earth?',
    choices: [
      { text: "Earth's tilted axis as it orbits the Sun", correct: true },
      {
        text: "Earth's distance from the Sun changing throughout the year",
        correct: false,
      },
      { text: "Changes in the Sun's energy output", correct: false },
      { text: "The Moon's gravitational pull", correct: false },
    ],
    explanation:
      "Earth's axis is tilted 23.5°. As Earth orbits the Sun, different hemispheres are tilted toward or away from the Sun, causing seasonal changes.",
  },
  {
    id: 'earth_10',
    category: 'Earth Science',
    difficulty: 'medium',
    question: 'What is the greenhouse effect?',
    choices: [
      {
        text: "Atmospheric gases trap heat, warming Earth's surface",
        correct: true,
      },
      {
        text: 'The ozone layer reflects sunlight away from Earth',
        correct: false,
      },
      { text: 'Plants release gases that cool the atmosphere', correct: false },
      { text: 'Oceans absorb sunlight and emit cold air', correct: false },
    ],
    explanation:
      "Greenhouse gases (CO₂, methane, water vapor) absorb outgoing infrared radiation and re-radiate it, warming Earth's surface. Without it, Earth would be much colder.",
  },
  {
    id: 'earth_11',
    category: 'Earth Science',
    difficulty: 'hard',
    question: 'What happens at a divergent plate boundary?',
    choices: [
      { text: 'Plates move apart, and new crust forms', correct: true },
      { text: 'Plates collide, and one sinks below the other', correct: false },
      { text: 'Plates slide horizontally past each other', correct: false },
      { text: 'Mountains fold and rise', correct: false },
    ],
    explanation:
      'At divergent boundaries, tectonic plates move apart. Magma rises to fill the gap, creating new oceanic crust (e.g., Mid-Atlantic Ridge).',
  },
  {
    id: 'earth_12',
    category: 'Earth Science',
    difficulty: 'medium',
    question: 'Which layer of the atmosphere contains the ozone layer?',
    choices: [
      { text: 'Stratosphere', correct: true },
      { text: 'Troposphere', correct: false },
      { text: 'Mesosphere', correct: false },
      { text: 'Thermosphere', correct: false },
    ],
    explanation:
      "The ozone layer sits in the stratosphere, roughly 15–35 km above Earth's surface, where it absorbs most of the Sun's harmful UV radiation.",
  },
  {
    id: 'earth_13',
    category: 'Earth Science',
    difficulty: 'easy',
    question:
      'What is the process by which wind and water break down rocks into smaller pieces?',
    choices: [
      { text: 'Weathering', correct: true },
      { text: 'Erosion', correct: false },
      { text: 'Deposition', correct: false },
      { text: 'Metamorphism', correct: false },
    ],
    explanation:
      'Weathering is the breakdown of rocks in place. Erosion is the transport of broken material to a new location.',
  },
  {
    id: 'earth_14',
    category: 'Earth Science',
    difficulty: 'medium',
    question: "What is the most common type of rock on Earth's surface?",
    choices: [
      { text: 'Sedimentary', correct: true },
      { text: 'Igneous', correct: false },
      { text: 'Metamorphic', correct: false },
      { text: 'Basaltic', correct: false },
    ],
    explanation:
      "Sedimentary rocks cover about 75% of Earth's land surface. They form from accumulated sediments (sand, silt, shells) that are compacted over time.",
  },
  {
    id: 'earth_15',
    category: 'Earth Science',
    difficulty: 'hard',
    question: 'What is a seismograph used to measure?',
    choices: [
      { text: 'Earthquake waves', correct: true },
      { text: 'Volcanic gas emissions', correct: false },
      { text: 'Ocean tides', correct: false },
      { text: 'Atmospheric pressure', correct: false },
    ],
    explanation:
      'A seismograph detects and records seismic waves produced by earthquakes or other ground vibrations.',
  },
  {
    id: 'earth_16',
    category: 'Earth Science',
    difficulty: 'medium',
    question:
      'Which renewable energy source uses moving water to generate electricity?',
    choices: [
      { text: 'Hydroelectric power', correct: true },
      { text: 'Solar power', correct: false },
      { text: 'Wind power', correct: false },
      { text: 'Geothermal power', correct: false },
    ],
    explanation:
      'Hydroelectric power plants use the kinetic energy of flowing or falling water to spin turbines and generate electricity.',
  },
  {
    id: 'earth_17',
    category: 'Earth Science',
    difficulty: 'hard',
    question: 'What is the Coriolis effect?',
    choices: [
      {
        text: "Earth's rotation deflects wind and water currents to the right in the Northern Hemisphere",
        correct: true,
      },
      {
        text: "The Sun's gravity causes ocean currents to move east",
        correct: false,
      },
      { text: 'Cold air always sinks while warm air rises', correct: false },
      { text: 'The Moon deflects atmospheric wind patterns', correct: false },
    ],
    explanation:
      "Earth's rotation causes moving air and water to curve — to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. This drives cyclone rotation patterns.",
  },
  {
    id: 'earth_18',
    category: 'Earth Science',
    difficulty: 'easy',
    question:
      'What is the main gas responsible for the enhanced greenhouse effect (climate change)?',
    choices: [
      { text: 'Carbon dioxide (CO₂)', correct: true },
      { text: 'Nitrogen (N₂)', correct: false },
      { text: 'Oxygen (O₂)', correct: false },
      { text: 'Helium (He)', correct: false },
    ],
    explanation:
      'CO₂ from burning fossil fuels is the primary driver of the enhanced greenhouse effect, trapping more heat and raising global temperatures.',
  },
];

/**
 * ScienceConceptPractice - Multiple-choice science concept questions
 */
export default function ScienceConceptPractice({ onClose, dark = false }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState('');

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const categories = useMemo(() => {
    const unique = [
      ...new Set(SCIENCE_CONCEPT_QUESTIONS.map((q) => q.category)),
    ];
    return unique.sort();
  }, []);

  const difficulties = useMemo(() => {
    const unique = [
      ...new Set(SCIENCE_CONCEPT_QUESTIONS.map((q) => q.difficulty)),
    ];
    return ['all', ...unique.sort()];
  }, []);

  function selectNewQuestion() {
    setNotice('');
    if (!selectedCategory) {
      setNotice('Please select a category first.');
      return;
    }
    let pool = SCIENCE_CONCEPT_QUESTIONS.filter(
      (q) => q.category === selectedCategory
    );
    if (selectedDifficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    }
    if (pool.length === 0) {
      setNotice('No questions available for this selection.');
      return;
    }
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQuestion(picked);
    setShuffledChoices(shuffle(picked.choices));
    setSelectedChoice(null);
    setRevealed(false);
  }

  function grade() {
    if (!currentQuestion) return;
    if (selectedChoice === null) {
      setNotice('Please select an answer first.');
      return;
    }
    setNotice('');
    setRevealed(true);
  }

  return (
    <div
      className={`p-6 rounded-xl ${
        dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
        🔬 Science Concept Practice
      </h2>

      {/* Category Selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Category:</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : dark
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Difficulty:</label>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                selectedDifficulty === diff
                  ? 'bg-purple-600 text-white'
                  : dark
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* New Question Button */}
      <div className="mb-6">
        <button
          onClick={selectNewQuestion}
          disabled={!selectedCategory}
          className={`px-6 py-3 rounded-lg font-bold text-white transition ${
            !selectedCategory
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          New Question
        </button>
        {notice && (
          <p
            role="alert"
            className="mt-2 text-sm text-red-700 dark:text-red-300"
          >
            {notice}
          </p>
        )}
      </div>

      {/* Question Display */}
      {currentQuestion ? (
        <div
          className={`p-4 rounded-lg mb-4 ${
            dark ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                currentQuestion.difficulty === 'easy'
                  ? 'bg-green-200 text-green-800'
                  : currentQuestion.difficulty === 'medium'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-red-200 text-red-800'
              }`}
            >
              {currentQuestion.difficulty.toUpperCase()}
            </span>
            <span className="text-xs opacity-70">
              {currentQuestion.category}
            </span>
          </div>

          <h3 className="text-lg font-bold mb-3">Question:</h3>
          <p className="mb-4">{currentQuestion.question}</p>

          <div className="space-y-2 mb-4">
            {shuffledChoices.map((ch, idx) => {
              const chosen = selectedChoice === idx;
              const correct = ch.correct;
              let btnStyle = chosen ? 'ring-2 ring-blue-500' : '';

              if (revealed) {
                if (correct) {
                  btnStyle += ' bg-green-600 text-white';
                } else if (chosen && !correct) {
                  btnStyle += ' bg-red-600 text-white';
                } else {
                  btnStyle += dark ? ' bg-gray-600' : ' bg-gray-200';
                }
              } else {
                btnStyle += chosen
                  ? ' bg-blue-600 text-white'
                  : dark
                    ? ' bg-gray-600 text-gray-100'
                    : ' bg-gray-200 text-gray-800';
              }

              return (
                <button
                  key={idx}
                  disabled={revealed}
                  onClick={() => setSelectedChoice(idx)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${btnStyle}`}
                >
                  {ch.text}
                </button>
              );
            })}
          </div>

          {!revealed && (
            <button
              onClick={grade}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
            >
              Check Answer
            </button>
          )}

          {revealed && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                shuffledChoices[selectedChoice]?.correct
                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                  : 'bg-red-100 text-red-800 border-2 border-red-500'
              }`}
            >
              <p className="font-bold mb-2">
                {shuffledChoices[selectedChoice]?.correct
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </p>
              <p className="text-sm">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`p-4 text-center ${
            dark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <p>Select a category and click "New Question" to begin.</p>
          <p className="text-sm mt-2">
            Practice with {SCIENCE_CONCEPT_QUESTIONS.length} questions across 4
            categories!
          </p>
        </div>
      )}
    </div>
  );
}
