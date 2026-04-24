/**
 * GED Ready-Style Science — Multi-Select Set
 * Modeled after GED Ready® Science exam format:
 *   - "Select all that apply" items spanning life, physical, and earth science
 *   - Each item has multiSelect: true and uses "select all that apply" prompt phrasing
 *     to satisfy the validator's multi-select detection rules
 *   - Calculator and formula sheet available
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'multipleChoice',
    multiSelect: true,
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'life_science',
    calculatorAllowed: true,
    passage:
      'In a laboratory experiment, a researcher exposed bacteria to a low concentration of an antibiotic and then transferred the surviving bacteria to a new culture. After repeating this process for many generations, she noticed that the bacterial population was now able to grow at antibiotic concentrations that would have killed almost all of the original bacteria.',
    question:
      'Which statements are supported by this experiment? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: 'Some bacteria in the original population had random genetic differences that made them more resistant to the antibiotic.',
        rationale:
          'Correct. The fact that any bacteria survived the initial exposure shows that genetic variation existed in the original population, with some individuals already more resistant than others.',
        isCorrect: true,
      },
      {
        text: 'Repeated exposure to the antibiotic acted as a selection pressure favoring resistant bacteria.',
        rationale:
          'Correct. By killing susceptible bacteria each generation, the antibiotic selected for resistant individuals, whose offspring made up a larger and larger share of the population — natural selection in action.',
        isCorrect: true,
      },
      {
        text: 'The antibiotic created brand-new resistance traits in bacteria that were not previously possible.',
        rationale:
          'Antibiotics select for existing variation; they do not directly create new traits in the way described. Mutations that produce new variants happen randomly, not because the antibiotic willed them into existence.',
        isCorrect: false,
      },
      {
        text: 'Bacteria can develop resistance to antibiotics over many generations of exposure.',
        rationale:
          'Correct. The experiment is a textbook example of bacterial populations becoming more resistant to an antibiotic over generations of exposure.',
        isCorrect: true,
      },
      {
        text: 'Bacteria can never become resistant to any antibiotic.',
        rationale:
          'This is directly contradicted by the result of the experiment, which shows the population becoming much more resistant over time.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'multipleChoice',
    multiSelect: true,
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    passage:
      'A student claims that the kinetic energy of a moving car increases when either its mass increases or its speed increases.',
    question:
      'Which of the following pieces of evidence support this claim? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: 'A 2,000 kg truck moving at 25 m/s causes more damage in a head-on collision than an 800 kg car moving at the same speed.',
        rationale:
          'Correct. With speed held constant, the more massive vehicle has more kinetic energy and does more damage on impact — supporting the mass part of the claim.',
        isCorrect: true,
      },
      {
        text: 'The braking distance of a car at 60 mph is much longer than the braking distance of the same car at 30 mph.',
        rationale:
          'Correct. The same car (same mass) has substantially more kinetic energy at higher speed, requiring a longer distance for the brakes to do enough work to stop it — supporting the speed part of the claim.',
        isCorrect: true,
      },
      {
        text: 'A parked car has the same kinetic energy regardless of its mass.',
        rationale:
          'A parked car has zero kinetic energy regardless of mass, so this statement is true in itself but does not support the claim that mass and speed both increase kinetic energy in moving cars.',
        isCorrect: false,
      },
      {
        text: "A baseball pitcher throwing the ball harder (higher speed) makes it sting more when it hits the catcher's glove.",
        rationale:
          'Correct. Higher speed gives the ball more kinetic energy, transferred to the glove (and hand) on impact — supporting the speed part of the claim.',
        isCorrect: true,
      },
      {
        text: 'A heavier ball thrown at the same speed as a lighter ball reaches the catcher faster.',
        rationale:
          'Two balls thrown at the same speed cover the same distance in the same time, so this statement is wrong on its face and does not support the claim.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    multiSelect: true,
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'earth_space',
    calculatorAllowed: true,
    passage:
      'Climate scientists report that human activities since the late 1800s have raised the average global temperature by about 1 °C, with most of the warming occurring after 1980. They also report that average global atmospheric CO₂ concentrations have risen sharply during the same period.',
    question:
      'Which observations would, if confirmed, provide additional evidence that human activities are contributing to global warming? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: 'CO₂ concentrations measured at remote monitoring stations have risen steadily and closely track global emissions from fossil fuels.',
        rationale:
          'Correct. A rise in atmospheric CO₂ matching the timing and amount of human emissions supports the claim that humans are driving the change in CO₂ levels associated with warming.',
        isCorrect: true,
      },
      {
        text: 'Glaciers and Arctic sea ice have shrunk substantially over the same decades that average global temperatures have risen.',
        rationale:
          'Correct. Independent physical evidence (glacier and sea-ice loss) consistent with rising temperatures supports the broader picture of recent warming linked to human-driven CO₂ rise.',
        isCorrect: true,
      },
      {
        text: 'Average global temperatures have stayed perfectly constant for the last century.',
        rationale:
          'This contradicts the claim itself and would be evidence against, not for, the warming pattern.',
        isCorrect: false,
      },
      {
        text: 'Computer climate models that include human CO₂ emissions match the observed temperature record more closely than models that include only natural factors.',
        rationale:
          'Correct. When models that include human emissions reproduce the observed warming pattern much better than models without them, that is direct evidence that human activities are an important cause.',
        isCorrect: true,
      },
      {
        text: 'Volcanic eruptions in the past century have, on their own, supplied more CO₂ to the atmosphere than all human activities combined.',
        rationale:
          'This would actually argue that natural sources, not humans, dominate CO₂ rise — the opposite of the claim. (Measurements show human emissions are far larger than volcanic emissions.)',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    multiSelect: true,
    difficulty: 'medium',
    topic: 'Scientific Practices',
    contentArea: 'life_science',
    calculatorAllowed: true,
    passage:
      'A teacher asks students to identify whether each of the following processes carried out by living things <strong>requires energy from food</strong> (or other chemical energy that ultimately came from food).',
    question:
      'Which processes require energy from food (or stored chemical energy from food)? Select <strong>all</strong> that apply.',
    answerOptions: [
      {
        text: 'Muscle contraction in animals during exercise.',
        rationale:
          'Correct. Muscle contraction is powered by ATP, which is produced by cellular respiration breaking down food.',
        isCorrect: true,
      },
      {
        text: 'Active transport of ions across a cell membrane against a concentration gradient.',
        rationale:
          'Correct. Moving ions against their concentration gradient requires ATP to power membrane pumps; ATP comes from food energy.',
        isCorrect: true,
      },
      {
        text: 'A rock rolling downhill on its own.',
        rationale:
          'A rock is not a living thing and is not powered by food energy. Its motion comes from gravity acting on stored gravitational potential energy.',
        isCorrect: false,
      },
      {
        text: 'Maintaining body temperature in a warm-blooded mammal.',
        rationale:
          'Correct. Mammals maintain body temperature through metabolism, which uses energy from food (cellular respiration) to generate heat.',
        isCorrect: true,
      },
      {
        text: 'Photosynthesis in a plant on a sunny day.',
        rationale:
          'Photosynthesis requires energy from sunlight, not from food. The plant uses light energy to build glucose, which can later be used as food energy.',
        isCorrect: false,
      },
    ],
  },
];
