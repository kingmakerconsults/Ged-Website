/**
 * GED Ready-Style Physical Science — Numeracy & Passages
 * Modeled after GED Ready® Science exam format:
 *   - 2 short reading passages (forces & motion, energy transformations)
 *   - 6 numeracy items using ONLY GED formula-sheet equations:
 *       d = m/V, v = d/t, a = Δv/Δt, F = ma, W = Fd, P = W/t
 *   - Calculator and formula sheet available
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'medium',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    passage:
      "This passage describes Newton's laws of motion.\n\nIsaac Newton formulated three laws describing how forces affect the motion of objects. The <strong>first law</strong> (often called the law of inertia) states that an object at rest stays at rest, and an object in motion continues moving in a straight line at constant speed, unless acted upon by a net (unbalanced) outside force. The <strong>second law</strong> states that the acceleration produced by a net force on an object is directly proportional to that net force and inversely proportional to the object's mass: F = ma. The <strong>third law</strong> states that for every action force there is an equal and opposite reaction force.\n\nThese laws apply only when forces are unbalanced. If two equal and opposite forces act on an object — for example, gravity pulling down and the floor pushing up with equal force — the net force is zero and the object's motion does not change.",
    question:
      'A heavy crate sits motionless on a flat warehouse floor. A worker pushes horizontally on the crate but it does not move. According to the passage, why does the crate stay at rest?',
    answerOptions: [
      {
        text: "Newton's third law cancels every push the worker applies, so no force can ever move the crate.",
        rationale:
          "Newton's third law pairs apply to two different objects (worker on crate, crate on worker). The reaction force does not cancel the action force on the same object.",
        isCorrect: false,
      },
      {
        text: "Friction from the floor exerts a force equal and opposite to the worker's push, so the net force on the crate is zero.",
        rationale:
          "Correct. The passage explains an object stays at rest when forces are balanced (net force zero). Static friction from the floor matches the worker's push up to a limit, producing a zero net force and no acceleration.",
        isCorrect: true,
      },
      {
        text: "The worker is applying a negative force, which subtracts from the crate's motion.",
        rationale:
          '"Negative force" is not a meaningful explanation here. The crate is not moving, so the issue is balanced forces, not direction of force.',
        isCorrect: false,
      },
      {
        text: 'The crate has no mass, so F = ma cannot apply.',
        rationale:
          "A heavy crate clearly has mass. Newton's second law still applies — it says zero net force produces zero acceleration.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    passage:
      'This passage describes energy and energy transformations.\n\nEnergy is the ability to do <strong>work</strong>, and work is done whenever a force moves an object some distance: W = F × d. Energy comes in many forms, including kinetic (motion), potential (stored, such as in a raised object or a stretched spring), thermal (heat), chemical, and electrical. Energy can be converted from one form to another, but according to the law of conservation of energy, the total amount of energy in a closed system stays the same.\n\nFor example, when a roller-coaster car climbs to the top of a hill, work is done on it against gravity, and that work is stored as gravitational potential energy. As the car rolls back down, that potential energy is converted into kinetic energy of motion. In a real coaster, some energy is also converted into thermal energy by friction with the rails and the air, which is why a coaster slowly loses height across each successive hill.',
    question:
      'Which statement best describes the energy transformation that occurs when a roller-coaster car drops from the top of its highest hill to the bottom?',
    answerOptions: [
      {
        text: 'Kinetic energy is converted entirely into gravitational potential energy.',
        rationale:
          'This is the reverse of what happens during a drop. Kinetic energy increases on the way down; potential energy decreases.',
        isCorrect: false,
      },
      {
        text: 'Gravitational potential energy is converted into kinetic energy, with some energy converted to thermal energy by friction.',
        rationale:
          'Correct. The passage explicitly describes this transformation: stored potential energy at the top becomes kinetic energy as the car speeds up, while friction converts some energy to heat — which is why a coaster cannot reach the same height on later hills.',
        isCorrect: true,
      },
      {
        text: 'New energy is created from the motion of the car.',
        rationale:
          'The law of conservation of energy stated in the passage forbids creating new energy. Energy can only change form.',
        isCorrect: false,
      },
      {
        text: 'All of the energy is destroyed when the car reaches the bottom.',
        rationale:
          'Energy cannot be destroyed; it can only be transformed. At the bottom, much of the original potential energy has become kinetic and thermal energy.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'multipleChoice',
    difficulty: 'easy',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    numeracy: true,
    question:
      'A small block has a mass of 240 grams (g) and a volume of 80 cubic centimeters (cm³). Using the formula for density (d = m/V), what is the density of the block in g/cm³?',
    answerOptions: [
      {
        text: '0.33 g/cm³',
        rationale:
          'This is the inverted ratio (V/m = 80 ÷ 240). Density is m/V, not V/m.',
        isCorrect: false,
      },
      {
        text: '3.0 g/cm³',
        rationale: 'Correct. Using d = m/V: d = 240 g ÷ 80 cm³ = 3.0 g/cm³.',
        isCorrect: true,
      },
      {
        text: '160 g/cm³',
        rationale:
          'This is the difference (240 − 80), not the density. The formula d = m/V is a quotient, not a subtraction.',
        isCorrect: false,
      },
      {
        text: '19,200 g/cm³',
        rationale:
          'This is the product (240 × 80), not the quotient. Density is mass divided by volume.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    numeracy: true,
    question:
      "A bicyclist travels 60 kilometers (km) in 3 hours (h). Using the formula for speed (v = d/t), what is the bicyclist's average speed in km/h?",
    answerOptions: [
      {
        text: '15 km/h',
        rationale:
          'This is half the correct value. Check the division: 60 ÷ 3 = 20, not 15.',
        isCorrect: false,
      },
      {
        text: '20 km/h',
        rationale: 'Correct. Using v = d/t: v = 60 km ÷ 3 h = 20 km/h.',
        isCorrect: true,
      },
      {
        text: '63 km/h',
        rationale:
          'This is 60 + 3. Speed is distance divided by time, not distance plus time.',
        isCorrect: false,
      },
      {
        text: '180 km/h',
        rationale:
          'This is 60 × 3. Speed is distance divided by time, not multiplied by it.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    numeracy: true,
    question:
      "A car traveling at 5 meters per second (m/s) accelerates uniformly to 25 m/s in 4 seconds (s). Using the formula a = Δv/Δt, what is the car's acceleration in m/s²?",
    answerOptions: [
      {
        text: '5 m/s²',
        rationale:
          'Correct. Δv = 25 − 5 = 20 m/s. a = Δv/Δt = 20 m/s ÷ 4 s = 5 m/s².',
        isCorrect: true,
      },
      {
        text: '6.25 m/s²',
        rationale:
          'This is 25 ÷ 4, which uses only the final velocity. Acceleration uses the change in velocity (final − initial = 20), not just the final.',
        isCorrect: false,
      },
      {
        text: '20 m/s²',
        rationale:
          'This is the change in velocity (Δv) by itself, not divided by the time interval. Acceleration is Δv per second.',
        isCorrect: false,
      },
      {
        text: '80 m/s²',
        rationale:
          'This is 20 × 4 (multiplying instead of dividing). Acceleration is Δv divided by Δt.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    numeracy: true,
    question:
      "A 10 kilogram (kg) box on a smooth floor is pushed by a horizontal force, giving it an acceleration of 2 m/s². Using Newton's second law (F = ma), how much net force is acting on the box, in newtons (N)?",
    answerOptions: [
      {
        text: '5 N',
        rationale:
          'This is mass divided by acceleration (10 ÷ 2). F = ma is a product, not a quotient.',
        isCorrect: false,
      },
      {
        text: '12 N',
        rationale:
          'This is 10 + 2. The formula F = ma is a product, not a sum.',
        isCorrect: false,
      },
      {
        text: '20 N',
        rationale: 'Correct. Using F = ma: F = (10 kg)(2 m/s²) = 20 N.',
        isCorrect: true,
      },
      {
        text: '0.2 N',
        rationale:
          'This is 2 ÷ 10. The formula F = ma is a product (m × a), not a/m.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'multipleChoice',
    difficulty: 'medium',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    numeracy: true,
    question:
      'A worker pushes a cart with a constant horizontal force of 50 newtons (N) for a distance of 8 meters (m) along a level floor. Using W = F × d, how much work does the worker do on the cart, in joules (J)?',
    answerOptions: [
      {
        text: '6.25 J',
        rationale:
          'This is 50 ÷ 8. The formula for work is a product (F × d), not a quotient.',
        isCorrect: false,
      },
      {
        text: '58 J',
        rationale:
          'This is 50 + 8. Work is force times distance, not force plus distance.',
        isCorrect: false,
      },
      {
        text: '400 J',
        rationale: 'Correct. Using W = F × d: W = (50 N)(8 m) = 400 J.',
        isCorrect: true,
      },
      {
        text: '40,000 J',
        rationale:
          'This appears to multiply correctly (50 × 8 = 400) and then add two extra zeros — likely a unit/decimal slip. The correct value is 400 J.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'multipleChoice',
    difficulty: 'hard',
    topic: 'Physical Science',
    contentArea: 'physical_science',
    calculatorAllowed: true,
    formulaSheetAllowed: true,
    numeracy: true,
    question:
      'An elevator motor lifts a load by doing 12,000 joules (J) of work in 30 seconds (s). Using the formula for power (P = W/t), what is the average power output of the motor in watts (W)?',
    answerOptions: [
      {
        text: '40 W',
        rationale:
          'This is too low by a factor of 10. Recheck: 12,000 ÷ 30 = 400, not 40.',
        isCorrect: false,
      },
      {
        text: '400 W',
        rationale: 'Correct. Using P = W/t: P = 12,000 J ÷ 30 s = 400 W.',
        isCorrect: true,
      },
      {
        text: '4,000 W',
        rationale:
          'This is too high by a factor of 10. The correct division is 12,000 ÷ 30 = 400.',
        isCorrect: false,
      },
      {
        text: '360,000 W',
        rationale:
          'This is 12,000 × 30 (multiplying instead of dividing). Power is work divided by time.',
        isCorrect: false,
      },
    ],
  },
];
