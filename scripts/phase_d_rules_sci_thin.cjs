const { buildRule } = require('./propagate_rationale_rewrites.cjs');

// For each entry: option text, OLD rationale, NEW rationale (longer, with
// explanatory connector words such as "because", "since", "which", etc.).
module.exports = [
  buildRule(
    'To exchange oxygen and carbon dioxide with the blood.',
    'Correct. Gas exchange occurs in the alveoli.',
    'Correct because the alveoli are tiny air sacs surrounded by capillaries, which is where oxygen diffuses into the blood and carbon dioxide diffuses out into the lungs to be exhaled.'
  ),
  buildRule(
    'Homozygous for that gene.',
    "Correct. 'Homo-' means the alleles are the same.",
    'Correct because the prefix \'homo-\' means "same," so an organism with two identical alleles for a gene is described as homozygous for that gene.'
  ),
  buildRule(
    'A rabbit that eats grass.',
    'Correct. Primary consumers eat producers (plants).',
    'Correct because primary consumers are organisms that feed directly on producers, so a rabbit eating grass (a plant) is a textbook example of a primary consumer.'
  ),
  buildRule(
    'Chloroplast',
    'Correct. Chloroplasts are the site of photosynthesis.',
    'Correct because chloroplasts contain chlorophyll, which captures light energy and uses it to convert carbon dioxide and water into glucose and oxygen during photosynthesis.'
  ),
  buildRule(
    'Unicellular',
    'Correct. "Uni-" means one.',
    'Correct because the prefix "uni-" means one, so a unicellular organism is one made up of a single cell that performs all of its life functions.'
  ),
  buildRule(
    'Meiosis',
    'Correct. Meiosis is essential for sexual reproduction.',
    'Correct because meiosis is the cell division that produces gametes (sex cells) with half the parent\u2019s chromosome number, which is essential for sexual reproduction and genetic variation.'
  ),
  buildRule(
    'Natural selection',
    'Correct. This is the main mechanism of evolution.',
    'Correct because natural selection is the process by which individuals with traits better suited to their environment are more likely to survive and reproduce, which drives evolutionary change in a population.'
  ),
  buildRule(
    'A group of organisms that can successfully interbreed and produce fertile offspring.',
    'Correct. This is the biological species concept.',
    'Correct because the biological species concept defines a species as a group of organisms that can interbreed and produce fertile offspring, which is the standard definition used in modern biology.'
  ),
  buildRule(
    'Parasitism',
    'Correct. An example is a tick feeding on a dog.',
    'Correct because parasitism is a relationship in which one organism (the parasite) benefits at the expense of another (the host), as when a tick feeds on a dog\u2019s blood, harming the dog while gaining nutrition.'
  ),
  buildRule(
    'To control which substances enter and leave the cell.',
    'Correct. The cell membrane is selectively permeable.',
    'Correct because the cell membrane is selectively permeable, which means it regulates the passage of ions, nutrients, and waste so the cell can maintain a stable internal environment.'
  ),
  buildRule(
    'Cell',
    'Correct. All living things are made of cells.',
    'Correct because cell theory states that the cell is the basic structural and functional unit of life, since all living organisms are made of one or more cells.'
  ),
  buildRule(
    'To break down and recycle waste materials and cellular debris.',
    "Correct. They act as the cell's 'recycling center'.",
    'Correct because lysosomes contain digestive enzymes that break down old organelles, food particles, and cellular debris, which allows the cell to recycle the resulting building blocks.'
  ),
  buildRule(
    'Defend the body against pathogens like bacteria and viruses.',
    'Correct. It identifies and attacks foreign invaders.',
    'Correct because the immune system identifies foreign pathogens such as bacteria and viruses and mounts a response that destroys them, which protects the body from infection and disease.'
  ),
  buildRule(
    'Power',
    'Correct. Power measures how quickly work is performed.',
    'Correct because power is defined as the rate at which work is done (P = W/t), which means it measures how quickly energy is transferred or work is performed.'
  ),
  buildRule(
    'Kinetic Energy',
    'Correct. Kinetic energy is the energy of motion.',
    'Correct because kinetic energy is defined as the energy an object possesses due to its motion, which is calculated as KE = \u00bdmv\u00b2 and depends on mass and speed.'
  ),
  buildRule(
    'Solid, Liquid, and Gas',
    'Correct. These are the three common states of matter.',
    'Correct because solid, liquid, and gas are the three most common states of matter, which differ in how tightly their particles are packed and how freely those particles can move.'
  ),
  buildRule(
    'They repel each other.',
    'Correct. Like poles of a magnet repel each other.',
    'Correct because magnets follow the rule that like poles repel and opposite poles attract, which means two north poles or two south poles brought together will push each other apart.'
  ),
  buildRule(
    '240 watts',
    'Correct. Power = 120 V × 2 A = 240 W.',
    'Correct because electrical power equals voltage times current (P = V \u00d7 I), so 120 V \u00d7 2 A equals 240 watts.'
  ),
  buildRule(
    'Mass',
    'Correct. Mass is a fundamental property of matter.',
    'Correct because mass is the measure of the amount of matter in an object, which stays constant regardless of location and is a fundamental property of all physical matter.'
  ),
  buildRule(
    'Solid',
    'Correct. Solids have a fixed shape and volume.',
    'Correct because the particles in a solid are tightly packed and held in fixed positions, which gives a solid both a definite shape and a definite volume.'
  ),
  buildRule(
    'Neutral',
    'Correct. Pure water has a pH of 7.',
    'Correct because pure water has equal concentrations of H\u207a and OH\u207b ions, which gives it a pH of 7 and makes it neither acidic nor basic but neutral.'
  ),
  buildRule(
    'Covalent bond',
    'Correct. Covalent bonds form molecules, like H₂O.',
    'Correct because a covalent bond forms when two atoms share one or more pairs of electrons, which is what holds the hydrogen and oxygen atoms together in a water (H\u2082O) molecule.'
  ),
  buildRule(
    '20 Joules',
    'Correct. Work = 10 N × 2 m = 20 J.',
    'Correct because work equals force times distance (W = F \u00d7 d), so 10 N \u00d7 2 m equals 20 joules.'
  ),
  buildRule(
    'Radiation',
    'Correct. This is how the sun heats the Earth.',
    'Correct because radiation transfers heat as electromagnetic waves through empty space, which is how the Sun\u2019s energy reaches and warms the Earth without any matter in between.'
  ),
  buildRule(
    'Energy cannot be created or destroyed, only transformed from one form to another.',
    'Correct. This is the First Law of Thermodynamics.',
    'Correct because the First Law of Thermodynamics, also called the law of conservation of energy, states that energy is never created or destroyed but only transferred or transformed between forms.'
  ),
  buildRule(
    'Inertia',
    'Correct. Inertia is a property of mass.',
    "Correct because inertia is an object's resistance to changes in its state of motion, which is directly proportional to its mass \u2014 the more massive an object, the greater its inertia."
  ),
  buildRule(
    'Energy cannot be created or destroyed, only transformed from one form to another.',
    'Correct. This is a fundamental principle of physics.',
    'Correct because the First Law of Thermodynamics, also called the law of conservation of energy, states that energy is never created or destroyed but only transferred or transformed between forms.'
  ),
  buildRule(
    'Conduction',
    'Correct. An example is a pan heating up on a stove.',
    'Correct because conduction transfers heat through direct contact between particles, which is what happens when a metal pan touches a hot stove and the heat flows from the burner into the pan.'
  ),
  buildRule(
    'Catalyst',
    'Correct. Enzymes are biological catalysts.',
    'Correct because a catalyst speeds up a chemical reaction without being consumed, which is exactly what enzymes do in biological systems by lowering the activation energy of metabolic reactions.'
  ),
  buildRule(
    'Reaction',
    'Correct. This is the classic statement of the law.',
    'Correct because Newton\u2019s Third Law states that for every action force there is an equal and opposite reaction force, which means forces always occur in interacting pairs.'
  ),
  buildRule(
    'The magnets will repel each other.',
    'Correct. The passage states that like poles repel.',
    'Correct because, as the passage states, like magnetic poles repel one another, so two north poles (or two south poles) brought together will push each other apart.'
  ),
  buildRule(
    '20 km/h',
    'Correct. Using v = d/t: v = 60 km ÷ 3 h = 20 km/h.',
    'Correct because average speed equals distance divided by time (v = d/t), so 60 km divided by 3 h equals 20 km/h.'
  ),
  buildRule(
    '20 N',
    'Correct. Using F = ma: F = (10 kg)(2 m/s²) = 20 N.',
    'Correct because Newton\u2019s Second Law states force equals mass times acceleration (F = m \u00d7 a), so 10 kg \u00d7 2 m/s\u00b2 equals 20 N.'
  ),
  buildRule(
    '400 J',
    'Correct. Using W = F × d: W = (50 N)(8 m) = 400 J.',
    'Correct because work equals force times the distance moved in the direction of the force (W = F \u00d7 d), so 50 N \u00d7 8 m equals 400 joules.'
  ),
  buildRule(
    '400 W',
    'Correct. Using P = W/t: P = 12,000 J ÷ 30 s = 400 W.',
    'Correct because power equals work divided by time (P = W/t), so 12,000 J divided by 30 s equals 400 W.'
  ),
  buildRule(
    '18 cm',
    'Correct. (15+18+15+22+20)=90; 90÷5=18.',
    'Correct because the mean is found by adding all values and dividing by the count, which gives (15 + 18 + 15 + 22 + 20) = 90 and 90 \u00f7 5 = 18 cm.'
  ),
  buildRule(
    '3 g/cm³',
    'Correct. Density = mass ÷ volume = 60 ÷ 20 = 3 g/cm³.',
    'Correct because density equals mass divided by volume (D = m/V), so 60 g divided by 20 cm\u00b3 equals 3 g/cm\u00b3.'
  ),
  buildRule(
    '50 km/h',
    'Correct. 150 km ÷ 3 h = 50 km/h.',
    'Correct because average speed equals total distance divided by total time, so 150 km \u00f7 3 h equals 50 km/h.'
  ),
  buildRule(
    '200 J',
    'Correct. Work W = F × d = 50 N × 4 m = 200 J.',
    'Correct because work equals force times distance moved in the direction of the force (W = F \u00d7 d), so 50 N \u00d7 4 m equals 200 J.'
  ),
  buildRule(
    '6 N',
    'Correct. F = m × a = 2 kg × 3 m/s² = 6 N.',
    'Correct because Newton\u2019s Second Law gives F = m \u00d7 a, so 2 kg \u00d7 3 m/s\u00b2 equals 6 N.'
  ),
  buildRule(
    'Trial C',
    'Correct. Increase was 35−22 = 13°C, the largest.',
    'Correct because the temperature change in Trial C is 35 \u2212 22 = 13 \u00b0C, which is the largest increase shown among all the trials.'
  ),
  buildRule(
    '18 (thousand)',
    'Correct. Range = 30 − 12 = 18.',
    'Correct because the range of a data set equals the maximum value minus the minimum value, so 30 \u2212 12 equals 18 (thousand).'
  ),
  buildRule(
    '0.5 km/min',
    'Correct. 10 km ÷ 20 min = 0.5 km/min.',
    'Correct because average speed equals distance divided by time, so 10 km divided by 20 min equals 0.5 km/min.'
  ),
  buildRule(
    'Mass is conserved during the reaction.',
    'Correct. The total stayed 120 g.',
    'Correct because the law of conservation of mass states the total mass of reactants equals the total mass of products, which is shown by the total remaining at 120 g throughout the reaction.'
  ),
  buildRule(
    '30 L',
    'Correct. 12 ÷ 4 = 3 L/min. 3 × 10 = 30 L.',
    'Correct because the flow rate is 12 L \u00f7 4 min = 3 L/min, so in 10 minutes the volume equals 3 L/min \u00d7 10 min = 30 L.'
  ),
  buildRule(
    '$1,050',
    'Correct. 35% of $3,000 = 0.35 × 3000 = $1,050.',
    'Correct because 35% of $3,000 is calculated as 0.35 \u00d7 3,000, which equals $1,050.'
  ),
  buildRule(
    'Condensation',
    'Correct. This process is what forms clouds.',
    'Correct because condensation is the process by which water vapor cools and changes back into liquid droplets, which is how clouds, fog, and dew are formed in the atmosphere.'
  ),
  buildRule(
    'Igneous',
    'Correct. This is the definition of an igneous rock.',
    'Correct because igneous rocks form when molten material (magma or lava) cools and solidifies, which is the textbook definition of an igneous rock.'
  ),
  buildRule(
    'A large cloud of gas and dust in space, often where new stars are formed.',
    'Correct. Nebulae are the "nurseries" of stars.',
    'Correct because a nebula is a vast cloud of gas and dust in space, and gravitational collapse within these clouds is what gives rise to new stars, which is why they are called stellar "nurseries."'
  ),
  buildRule(
    'Igneous rock',
    "Correct. 'Igneous' comes from the Latin word for fire.",
    'Correct because the word "igneous" comes from the Latin ignis, meaning fire, which reflects how these rocks form when molten magma or lava cools and hardens.'
  ),
  buildRule(
    'Half of a sample of the isotope to decay.',
    'Correct. This is the definition of half-life.',
    'Correct because half-life is defined as the time required for half of the radioactive atoms in a sample to decay, which makes it a constant property of each isotope used in radiometric dating.'
  ),
  buildRule(
    'Convergent boundary',
    "Correct. 'Converge' means to come together.",
    'Correct because the verb "converge" means to come together, so a convergent plate boundary is one where two tectonic plates move toward and collide with each other.'
  ),
  buildRule(
    'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
    'Correct. This is the order of the eight planets.',
    "Correct because this is the standard order of the eight planets from the Sun outward, which reflects each planet's average distance from the Sun."
  ),
  buildRule(
    "The Moon passes between the Sun and the Earth, blocking the Sun's light.",
    'Correct. This alignment casts a shadow on the Earth.',
    "Correct because a solar eclipse occurs when the Moon moves directly between the Sun and the Earth, which causes the Moon to block the Sun's light and cast a shadow on the Earth's surface."
  ),
  buildRule(
    'March 2009\u2013March 2018',
    'Correct. The title specifies March 2009\u2013March 2018.',
    'Correct because the chart\u2019s title explicitly identifies the time span as March 2009 to March 2018, which sets the data range shown.'
  ),
  buildRule(
    '1990 to 2000',
    'Correct. The map compares changes from 1990 to 2000.',
    'Correct because the map\u2019s title and legend specify that the comparison is between 1990 and 2000, which establishes the time period the data represents.'
  ),
  buildRule(
    'State gaining 1 seat',
    'Correct. This category appears in the legend.',
    'Correct because the map\u2019s legend lists "State gaining 1 seat" as one of its labeled categories, which is how the map depicts apportionment changes.'
  ),
];
