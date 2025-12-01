// frontend/data/science_formula_practice.js
// Converted from module export to plain const + window assignment for UMD/Babel environment.
const SCIENCE_FORMULA_PRACTICE = [
  // DENSITY PROBLEMS
  {
    id: 'density_1',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = \\frac{m}{V}',
    variableLegend: [
      { symbol: 'd', meaning: 'density', units: 'g/cm³' },
      { symbol: 'm', meaning: 'mass', units: 'g' },
      { symbol: 'V', meaning: 'volume', units: 'cm³' },
    ],
    problemText:
      'A metal block has a mass of 120 g and a volume of 15 cm³. What is its density?',
    given: { m: 120, V: 15 },
    answer: 8,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Identify the formula: d = m / V.',
      'Substitute: d = 120 g / 15 cm³.',
      'Compute: d = 8 g/cm³.',
    ],
  },
  {
    id: 'density_2',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = \\frac{m}{V}',
    variableLegend: [
      { symbol: 'd', meaning: 'density', units: 'g/cm³' },
      { symbol: 'm', meaning: 'mass', units: 'g' },
      { symbol: 'V', meaning: 'volume', units: 'cm³' },
    ],
    problemText:
      'A piece of wood has a mass of 45 g and a volume of 60 cm³. Calculate its density.',
    given: { m: 45, V: 60 },
    answer: 0.75,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Use the formula: d = m / V.',
      'Substitute: d = 45 g / 60 cm³.',
      'Compute: d = 0.75 g/cm³.',
    ],
  },
  {
    id: 'density_3',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = \\frac{m}{V}',
    variableLegend: [
      { symbol: 'd', meaning: 'density', units: 'g/mL' },
      { symbol: 'm', meaning: 'mass', units: 'g' },
      { symbol: 'V', meaning: 'volume', units: 'mL' },
    ],
    problemText:
      'A liquid sample has a mass of 250 g and occupies 200 mL. What is its density?',
    given: { m: 250, V: 200 },
    answer: 1.25,
    answerUnits: 'g/mL',
    tolerance: 0.01,
    steps: [
      'Apply the formula: d = m / V.',
      'Substitute: d = 250 g / 200 mL.',
      'Compute: d = 1.25 g/mL.',
    ],
  },
  {
    id: 'density_4',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = \\frac{m}{V}',
    variableLegend: [
      { symbol: 'd', meaning: 'density', units: 'g/cm³' },
      { symbol: 'm', meaning: 'mass', units: 'g' },
      { symbol: 'V', meaning: 'volume', units: 'cm³' },
    ],
    problemText:
      'An iron cube has a mass of 394 g and a volume of 50 cm³. Find its density.',
    given: { m: 394, V: 50 },
    answer: 7.88,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Use d = m / V.',
      'Substitute: d = 394 g / 50 cm³.',
      'Compute: d = 7.88 g/cm³.',
    ],
  },
  {
    id: 'density_5',
    category: 'Density',
    formulaName: 'Density',
    formulaDisplay: 'd = \\frac{m}{V}',
    variableLegend: [
      { symbol: 'd', meaning: 'density', units: 'g/cm³' },
      { symbol: 'm', meaning: 'mass', units: 'g' },
      { symbol: 'V', meaning: 'volume', units: 'cm³' },
    ],
    problemText:
      'A rock has a mass of 180 g and a volume of 72 cm³. Calculate its density.',
    given: { m: 180, V: 72 },
    answer: 2.5,
    answerUnits: 'g/cm³',
    tolerance: 0.01,
    steps: [
      'Apply d = m / V.',
      'Substitute: d = 180 g / 72 cm³.',
      'Compute: d = 2.5 g/cm³.',
    ],
  },

  // SPEED PROBLEMS
  {
    id: 'speed_1',
    category: 'Speed',
    formulaName: 'Speed',
    formulaDisplay: 'v = \\frac{d}{t}',
    variableLegend: [
      { symbol: 'v', meaning: 'speed', units: 'm/s' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
      { symbol: 't', meaning: 'time', units: 's' },
    ],
    problemText: `A runner covers 400 meters in 80 seconds. What is the runner's average speed?`,
    given: { d: 400, t: 80 },
    answer: 5,
    answerUnits: 'm/s',
    tolerance: 0.01,
    steps: [
      'Use v = d / t.',
      'Substitute: v = 400 m / 80 s.',
      'Compute: v = 5 m/s.',
    ],
  },
  {
    id: 'speed_2',
    category: 'Speed',
    formulaName: 'Speed',
    formulaDisplay: 'v = \\frac{d}{t}',
    variableLegend: [
      { symbol: 'v', meaning: 'speed', units: 'km/h' },
      { symbol: 'd', meaning: 'distance', units: 'km' },
      { symbol: 't', meaning: 'time', units: 'h' },
    ],
    problemText:
      'A car travels 150 kilometers in 3 hours. What is its average speed?',
    given: { d: 150, t: 3 },
    answer: 50,
    answerUnits: 'km/h',
    tolerance: 0.01,
    steps: [
      'Use the formula v = d / t.',
      'Substitute: v = 150 km / 3 h.',
      'Compute: v = 50 km/h.',
    ],
  },
  {
    id: 'speed_3',
    category: 'Speed',
    formulaName: 'Speed',
    formulaDisplay: 'v = \\frac{d}{t}',
    variableLegend: [
      { symbol: 'v', meaning: 'speed', units: 'm/s' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
      { symbol: 't', meaning: 'time', units: 's' },
    ],
    problemText: `A cyclist rides 1200 meters in 240 seconds. Find the cyclist's speed.`,
    given: { d: 1200, t: 240 },
    answer: 5,
    answerUnits: 'm/s',
    tolerance: 0.01,
    steps: [
      'Apply v = d / t.',
      'Substitute: v = 1200 m / 240 s.',
      'Compute: v = 5 m/s.',
    ],
  },
  {
    id: 'speed_4',
    category: 'Speed',
    formulaName: 'Speed',
    formulaDisplay: 'v = \\frac{d}{t}',
    variableLegend: [
      { symbol: 'v', meaning: 'speed', units: 'm/s' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
      { symbol: 't', meaning: 'time', units: 's' },
    ],
    problemText:
      'A train travels 3000 meters in 120 seconds. What is its average speed?',
    given: { d: 3000, t: 120 },
    answer: 25,
    answerUnits: 'm/s',
    tolerance: 0.01,
    steps: [
      'Use v = d / t.',
      'Substitute: v = 3000 m / 120 s.',
      'Compute: v = 25 m/s.',
    ],
  },
  {
    id: 'speed_5',
    category: 'Speed',
    formulaName: 'Speed',
    formulaDisplay: 'v = \\frac{d}{t}',
    variableLegend: [
      { symbol: 'v', meaning: 'speed', units: 'km/h' },
      { symbol: 'd', meaning: 'distance', units: 'km' },
      { symbol: 't', meaning: 'time', units: 'h' },
    ],
    problemText:
      'A plane flies 600 kilometers in 2 hours. Calculate its speed.',
    given: { d: 600, t: 2 },
    answer: 300,
    answerUnits: 'km/h',
    tolerance: 0.01,
    steps: [
      'Apply the formula v = d / t.',
      'Substitute: v = 600 km / 2 h.',
      'Compute: v = 300 km/h.',
    ],
  },

  // FORCE PROBLEMS
  {
    id: 'force_1',
    category: 'Force',
    formulaName: "Newton's Second Law",
    formulaDisplay: 'F = m \\cdot a',
    variableLegend: [
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'a', meaning: 'acceleration', units: 'm/s²' },
    ],
    problemText:
      'A 3 kg object accelerates at 4 m/s². What net force acts on the object?',
    given: { m: 3, a: 4 },
    answer: 12,
    answerUnits: 'N',
    tolerance: 0.01,
    steps: [
      'Use F = m · a.',
      'Substitute: F = 3 kg · 4 m/s².',
      'Compute: F = 12 N.',
    ],
  },
  {
    id: 'force_2',
    category: 'Force',
    formulaName: "Newton's Second Law",
    formulaDisplay: 'F = m \\cdot a',
    variableLegend: [
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'a', meaning: 'acceleration', units: 'm/s²' },
    ],
    problemText:
      'A 10 kg box is pushed with an acceleration of 2 m/s². What force is applied?',
    given: { m: 10, a: 2 },
    answer: 20,
    answerUnits: 'N',
    tolerance: 0.01,
    steps: [
      'Use the formula F = m · a.',
      'Substitute: F = 10 kg · 2 m/s².',
      'Compute: F = 20 N.',
    ],
  },
  {
    id: 'force_3',
    category: 'Force',
    formulaName: "Newton's Second Law",
    formulaDisplay: 'F = m \\cdot a',
    variableLegend: [
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'a', meaning: 'acceleration', units: 'm/s²' },
    ],
    problemText:
      'A 5 kg object experiences an acceleration of 6 m/s². Find the force.',
    given: { m: 5, a: 6 },
    answer: 30,
    answerUnits: 'N',
    tolerance: 0.01,
    steps: [
      'Apply F = m · a.',
      'Substitute: F = 5 kg · 6 m/s².',
      'Compute: F = 30 N.',
    ],
  },
  {
    id: 'force_4',
    category: 'Force',
    formulaName: "Newton's Second Law",
    formulaDisplay: 'F = m \\cdot a',
    variableLegend: [
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'a', meaning: 'acceleration', units: 'm/s²' },
    ],
    problemText:
      'A 15 kg sled accelerates at 3 m/s². What is the net force on the sled?',
    given: { m: 15, a: 3 },
    answer: 45,
    answerUnits: 'N',
    tolerance: 0.01,
    steps: [
      'Use F = m · a.',
      'Substitute: F = 15 kg · 3 m/s².',
      'Compute: F = 45 N.',
    ],
  },
  {
    id: 'force_5',
    category: 'Force',
    formulaName: "Newton's Second Law",
    formulaDisplay: 'F = m \\cdot a',
    variableLegend: [
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'a', meaning: 'acceleration', units: 'm/s²' },
    ],
    problemText:
      'A 2 kg ball is kicked with an acceleration of 8 m/s². Calculate the force.',
    given: { m: 2, a: 8 },
    answer: 16,
    answerUnits: 'N',
    tolerance: 0.01,
    steps: [
      'Apply the formula F = m · a.',
      'Substitute: F = 2 kg · 8 m/s².',
      'Compute: F = 16 N.',
    ],
  },

  // WORK PROBLEMS
  {
    id: 'work_1',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F \\cdot d',
    variableLegend: [
      { symbol: 'W', meaning: 'work', units: 'J' },
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
    ],
    problemText:
      'A force of 20 N is applied to move an object 5 meters. How much work is done?',
    given: { F: 20, d: 5 },
    answer: 100,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Use W = F · d.',
      'Substitute: W = 20 N · 5 m.',
      'Compute: W = 100 J.',
    ],
  },
  {
    id: 'work_2',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F \\cdot d',
    variableLegend: [
      { symbol: 'W', meaning: 'work', units: 'J' },
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
    ],
    problemText:
      'A person pushes a box with a force of 50 N over a distance of 10 meters. Calculate the work done.',
    given: { F: 50, d: 10 },
    answer: 500,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Use the formula W = F · d.',
      'Substitute: W = 50 N · 10 m.',
      'Compute: W = 500 J.',
    ],
  },
  {
    id: 'work_3',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F \\cdot d',
    variableLegend: [
      { symbol: 'W', meaning: 'work', units: 'J' },
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
    ],
    problemText:
      'A worker lifts a 100 N weight vertically 2 meters. How much work is done?',
    given: { F: 100, d: 2 },
    answer: 200,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Apply W = F · d.',
      'Substitute: W = 100 N · 2 m.',
      'Compute: W = 200 J.',
    ],
  },
  {
    id: 'work_4',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F \\cdot d',
    variableLegend: [
      { symbol: 'W', meaning: 'work', units: 'J' },
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
    ],
    problemText:
      'A force of 80 N moves an object 3 meters. Find the work done.',
    given: { F: 80, d: 3 },
    answer: 240,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Use W = F · d.',
      'Substitute: W = 80 N · 3 m.',
      'Compute: W = 240 J.',
    ],
  },
  {
    id: 'work_5',
    category: 'Work',
    formulaName: 'Work',
    formulaDisplay: 'W = F \\cdot d',
    variableLegend: [
      { symbol: 'W', meaning: 'work', units: 'J' },
      { symbol: 'F', meaning: 'force', units: 'N' },
      { symbol: 'd', meaning: 'distance', units: 'm' },
    ],
    problemText:
      'A crane applies a force of 500 N to lift an object 4 meters. Calculate the work.',
    given: { F: 500, d: 4 },
    answer: 2000,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Apply the formula W = F · d.',
      'Substitute: W = 500 N · 4 m.',
      'Compute: W = 2000 J.',
    ],
  },

  // KINETIC ENERGY PROBLEMS
  {
    id: 'ke_1',
    category: 'Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = \\frac{1}{2}mv^2',
    variableLegend: [
      { symbol: 'KE', meaning: 'kinetic energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'v', meaning: 'velocity', units: 'm/s' },
    ],
    problemText: 'A 4 kg ball moves at 5 m/s. What is its kinetic energy?',
    given: { m: 4, v: 5 },
    answer: 50,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Use KE = (1/2) · m · v².',
      'Substitute: KE = (1/2) · 4 kg · (5 m/s)².',
      'Compute: KE = 0.5 · 4 · 25 = 50 J.',
    ],
  },
  {
    id: 'ke_2',
    category: 'Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = \\frac{1}{2}mv^2',
    variableLegend: [
      { symbol: 'KE', meaning: 'kinetic energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'v', meaning: 'velocity', units: 'm/s' },
    ],
    problemText:
      'A 10 kg object travels at 6 m/s. Calculate its kinetic energy.',
    given: { m: 10, v: 6 },
    answer: 180,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Use the formula KE = (1/2) · m · v².',
      'Substitute: KE = (1/2) · 10 kg · (6 m/s)².',
      'Compute: KE = 0.5 · 10 · 36 = 180 J.',
    ],
  },
  {
    id: 'ke_3',
    category: 'Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = \\frac{1}{2}mv^2',
    variableLegend: [
      { symbol: 'KE', meaning: 'kinetic energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'v', meaning: 'velocity', units: 'm/s' },
    ],
    problemText:
      'A 2 kg object has a velocity of 10 m/s. Find its kinetic energy.',
    given: { m: 2, v: 10 },
    answer: 100,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Apply KE = (1/2) · m · v².',
      'Substitute: KE = (1/2) · 2 kg · (10 m/s)².',
      'Compute: KE = 0.5 · 2 · 100 = 100 J.',
    ],
  },
  {
    id: 'ke_4',
    category: 'Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = \\frac{1}{2}mv^2',
    variableLegend: [
      { symbol: 'KE', meaning: 'kinetic energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'v', meaning: 'velocity', units: 'm/s' },
    ],
    problemText:
      'A 5 kg skateboard moves at 8 m/s. What is its kinetic energy?',
    given: { m: 5, v: 8 },
    answer: 160,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Use KE = (1/2) · m · v².',
      'Substitute: KE = (1/2) · 5 kg · (8 m/s)².',
      'Compute: KE = 0.5 · 5 · 64 = 160 J.',
    ],
  },
  {
    id: 'ke_5',
    category: 'Energy',
    formulaName: 'Kinetic Energy',
    formulaDisplay: 'KE = \\frac{1}{2}mv^2',
    variableLegend: [
      { symbol: 'KE', meaning: 'kinetic energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'v', meaning: 'velocity', units: 'm/s' },
    ],
    problemText: 'A 3 kg cart rolls at 4 m/s. Calculate its kinetic energy.',
    given: { m: 3, v: 4 },
    answer: 24,
    answerUnits: 'J',
    tolerance: 0.01,
    steps: [
      'Apply the formula KE = (1/2) · m · v².',
      'Substitute: KE = (1/2) · 3 kg · (4 m/s)².',
      'Compute: KE = 0.5 · 3 · 16 = 24 J.',
    ],
  },

  // POTENTIAL ENERGY PROBLEMS
  {
    id: 'pe_1',
    category: 'Energy',
    formulaName: 'Potential Energy',
    formulaDisplay: 'PE = mgh',
    variableLegend: [
      { symbol: 'PE', meaning: 'potential energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'g', meaning: 'gravity', units: 'm/s² (9.8)' },
      { symbol: 'h', meaning: 'height', units: 'm' },
    ],
    problemText:
      'A 2 kg book sits on a shelf 5 meters high. What is its potential energy? (Use g = 9.8 m/s²)',
    given: { m: 2, g: 9.8, h: 5 },
    answer: 98,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Use PE = m · g · h.',
      'Substitute: PE = 2 kg · 9.8 m/s² · 5 m.',
      'Compute: PE = 98 J.',
    ],
  },
  {
    id: 'pe_2',
    category: 'Energy',
    formulaName: 'Potential Energy',
    formulaDisplay: 'PE = mgh',
    variableLegend: [
      { symbol: 'PE', meaning: 'potential energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'g', meaning: 'gravity', units: 'm/s² (9.8)' },
      { symbol: 'h', meaning: 'height', units: 'm' },
    ],
    problemText:
      'A 10 kg box is lifted to a height of 3 meters. Calculate its potential energy. (Use g = 9.8 m/s²)',
    given: { m: 10, g: 9.8, h: 3 },
    answer: 294,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Use the formula PE = m · g · h.',
      'Substitute: PE = 10 kg · 9.8 m/s² · 3 m.',
      'Compute: PE = 294 J.',
    ],
  },
  {
    id: 'pe_3',
    category: 'Energy',
    formulaName: 'Potential Energy',
    formulaDisplay: 'PE = mgh',
    variableLegend: [
      { symbol: 'PE', meaning: 'potential energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'g', meaning: 'gravity', units: 'm/s² (9.8)' },
      { symbol: 'h', meaning: 'height', units: 'm' },
    ],
    problemText:
      'A 5 kg ball is held 8 meters above the ground. Find its potential energy. (Use g = 9.8 m/s²)',
    given: { m: 5, g: 9.8, h: 8 },
    answer: 392,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Apply PE = m · g · h.',
      'Substitute: PE = 5 kg · 9.8 m/s² · 8 m.',
      'Compute: PE = 392 J.',
    ],
  },
  {
    id: 'pe_4',
    category: 'Energy',
    formulaName: 'Potential Energy',
    formulaDisplay: 'PE = mgh',
    variableLegend: [
      { symbol: 'PE', meaning: 'potential energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'g', meaning: 'gravity', units: 'm/s² (9.8)' },
      { symbol: 'h', meaning: 'height', units: 'm' },
    ],
    problemText:
      'A 15 kg object is elevated 2 meters. What is its potential energy? (Use g = 9.8 m/s²)',
    given: { m: 15, g: 9.8, h: 2 },
    answer: 294,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Use PE = m · g · h.',
      'Substitute: PE = 15 kg · 9.8 m/s² · 2 m.',
      'Compute: PE = 294 J.',
    ],
  },
  {
    id: 'pe_5',
    category: 'Energy',
    formulaName: 'Potential Energy',
    formulaDisplay: 'PE = mgh',
    variableLegend: [
      { symbol: 'PE', meaning: 'potential energy', units: 'J' },
      { symbol: 'm', meaning: 'mass', units: 'kg' },
      { symbol: 'g', meaning: 'gravity', units: 'm/s² (9.8)' },
      { symbol: 'h', meaning: 'height', units: 'm' },
    ],
    problemText:
      'A 4 kg rock sits on a cliff 10 meters high. Calculate its potential energy. (Use g = 9.8 m/s²)',
    given: { m: 4, g: 9.8, h: 10 },
    answer: 392,
    answerUnits: 'J',
    tolerance: 0.5,
    steps: [
      'Apply the formula PE = m · g · h.',
      'Substitute: PE = 4 kg · 9.8 m/s² · 10 m.',
      'Compute: PE = 392 J.',
    ],
  },
];

// Make available globally for components
if (typeof window !== 'undefined') {
  window.SCIENCE_FORMULA_PRACTICE = SCIENCE_FORMULA_PRACTICE;
}
