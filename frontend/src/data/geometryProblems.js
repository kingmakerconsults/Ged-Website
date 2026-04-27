// Geometry practice problem bank for the GeometryPracticePanel.
// Each problem has:
//   { id, kind: 'image' | 'word', topic, prompt, choices, correct, explanation, formula }
// `figure` (optional) is a small inline-SVG description rendered by the panel:
//   { shape: 'rectangle' | 'right-triangle' | 'circle' | 'parallel-lines' | ..., vals: {...} }

const PI = Math.PI;
const r2 = (n) => Math.round(n * 100) / 100;
const r1 = (n) => Math.round(n * 10) / 10;

export const GEOMETRY_PROBLEMS = [
  // ── Perimeter / circumference ──────────────────────────────────────
  {
    id: 'perim-1',
    kind: 'image',
    topic: 'Perimeter',
    figure: { shape: 'rectangle', vals: { w: 8, h: 5 } },
    prompt: 'What is the perimeter of the rectangle?',
    choices: ['13', '26', '40', '80'],
    correct: 1,
    explanation: 'Perimeter of a rectangle = 2(w + h) = 2(8 + 5) = 26.',
    formula: 'P = 2(w + h)',
  },
  {
    id: 'perim-2',
    kind: 'word',
    topic: 'Perimeter',
    prompt:
      'A rectangular yard is 24 ft long and 18 ft wide. How many feet of fencing are needed to enclose it?',
    choices: ['42', '84', '108', '432'],
    correct: 1,
    explanation: 'P = 2(24 + 18) = 2(42) = 84 ft.',
    formula: 'P = 2(L + W)',
  },
  {
    id: 'circ-1',
    kind: 'image',
    topic: 'Circumference',
    figure: { shape: 'circle', vals: { r: 7 } },
    prompt: 'What is the circumference of the circle? (Use π ≈ 3.14)',
    choices: ['21.98', '43.96', '153.86', '49'],
    correct: 1,
    explanation: 'C = 2πr = 2 × 3.14 × 7 = 43.96.',
    formula: 'C = 2\\pi r',
  },
  {
    id: 'circ-2',
    kind: 'word',
    topic: 'Circumference',
    prompt:
      'A pizza has a 12-inch diameter. What is its circumference to the nearest tenth? (Use π ≈ 3.14)',
    choices: ['18.8', '37.7', '75.4', '113.0'],
    correct: 1,
    explanation: 'C = π × d = 3.14 × 12 ≈ 37.68 ≈ 37.7 in.',
    formula: 'C = \\pi d',
  },

  // ── Area ───────────────────────────────────────────────────────────
  {
    id: 'area-1',
    kind: 'image',
    topic: 'Area',
    figure: { shape: 'rectangle', vals: { w: 12, h: 7 } },
    prompt: 'What is the area of the rectangle?',
    choices: ['19', '38', '84', '144'],
    correct: 2,
    explanation: 'A = w × h = 12 × 7 = 84.',
    formula: 'A = w \\times h',
  },
  {
    id: 'area-2',
    kind: 'image',
    topic: 'Area',
    figure: { shape: 'right-triangle', vals: { a: 6, b: 8 } },
    prompt: 'What is the area of the right triangle?',
    choices: ['14', '24', '48', '96'],
    correct: 1,
    explanation: 'A = ½ × base × height = ½ × 6 × 8 = 24.',
    formula: 'A = \\tfrac{1}{2} b h',
  },
  {
    id: 'area-3',
    kind: 'image',
    topic: 'Area',
    figure: { shape: 'circle', vals: { r: 5 } },
    prompt: 'What is the area of the circle? (Use π ≈ 3.14)',
    choices: ['15.7', '31.4', '78.5', '157'],
    correct: 2,
    explanation: 'A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5.',
    formula: 'A = \\pi r^2',
  },
  {
    id: 'area-4',
    kind: 'image',
    topic: 'Area',
    figure: { shape: 'trapezoid', vals: { b1: 10, b2: 6, h: 4 } },
    prompt: 'What is the area of the trapezoid?',
    choices: ['16', '24', '32', '40'],
    correct: 2,
    explanation: 'A = ½(b₁ + b₂)h = ½(10 + 6)(4) = ½ × 64 = 32.',
    formula: 'A = \\tfrac{1}{2}(b_1 + b_2)h',
  },
  {
    id: 'area-5',
    kind: 'word',
    topic: 'Area',
    prompt:
      'A circular garden has a radius of 7 ft. What is its area to the nearest tenth? (Use π ≈ 3.14)',
    choices: ['21.98', '43.96', '153.86', '154.0'],
    correct: 3,
    explanation: 'A = πr² = 3.14 × 49 = 153.86 ≈ 154.0 sq ft.',
    formula: 'A = \\pi r^2',
  },
  {
    id: 'area-6',
    kind: 'word',
    topic: 'Area',
    prompt:
      'A parallelogram has a base of 14 cm and a height of 9 cm. What is its area?',
    choices: ['23', '46', '63', '126'],
    correct: 3,
    explanation: 'A = b × h = 14 × 9 = 126 sq cm.',
    formula: 'A = b h',
  },
  {
    id: 'area-7',
    kind: 'word',
    topic: 'Area',
    prompt:
      'A square tile is 9 inches on each side. What is the area of one tile?',
    choices: ['18', '36', '72', '81'],
    correct: 3,
    explanation: 'Area of a square = s² = 9² = 81 sq in.',
    formula: 'A = s^2',
  },

  // ── Pythagorean theorem ────────────────────────────────────────────
  {
    id: 'pyth-1',
    kind: 'image',
    topic: 'Pythagorean',
    figure: { shape: 'right-triangle', vals: { a: 3, b: 4 } },
    prompt: 'What is the length of the hypotenuse?',
    choices: ['5', '6', '7', '12'],
    correct: 0,
    explanation: 'c² = 3² + 4² = 9 + 16 = 25, so c = 5.',
    formula: 'a^2 + b^2 = c^2',
  },
  {
    id: 'pyth-2',
    kind: 'image',
    topic: 'Pythagorean',
    figure: { shape: 'right-triangle', vals: { a: 5, b: 12 } },
    prompt: 'What is the length of the hypotenuse?',
    choices: ['13', '15', '17', '60'],
    correct: 0,
    explanation: 'c² = 5² + 12² = 25 + 144 = 169, so c = 13.',
    formula: 'a^2 + b^2 = c^2',
  },
  {
    id: 'pyth-3',
    kind: 'word',
    topic: 'Pythagorean',
    prompt:
      'A 10 ft ladder leans against a wall. The base of the ladder is 6 ft from the wall. How high up the wall does the ladder reach?',
    choices: ['4 ft', '6 ft', '8 ft', '14 ft'],
    correct: 2,
    explanation: 'h² + 6² = 10², so h² = 100 − 36 = 64, h = 8 ft.',
    formula: 'a^2 + b^2 = c^2',
  },
  {
    id: 'pyth-4',
    kind: 'word',
    topic: 'Pythagorean',
    prompt:
      'A right triangle has legs of 9 and 12 cm. What is the hypotenuse?',
    choices: ['10 cm', '15 cm', '18 cm', '21 cm'],
    correct: 1,
    explanation: 'c² = 81 + 144 = 225, so c = 15 cm.',
    formula: 'a^2 + b^2 = c^2',
  },

  // ── Volume ─────────────────────────────────────────────────────────
  {
    id: 'vol-1',
    kind: 'image',
    topic: 'Volume',
    figure: { shape: 'rect-prism', vals: { l: 6, w: 4, h: 3 } },
    prompt: 'What is the volume of the rectangular prism?',
    choices: ['13', '36', '48', '72'],
    correct: 3,
    explanation: 'V = l × w × h = 6 × 4 × 3 = 72.',
    formula: 'V = l w h',
  },
  {
    id: 'vol-2',
    kind: 'image',
    topic: 'Volume',
    figure: { shape: 'cylinder', vals: { r: 3, h: 10 } },
    prompt: 'What is the volume of the cylinder? (Use π ≈ 3.14)',
    choices: ['94.2', '188.4', '282.6', '565.2'],
    correct: 2,
    explanation: 'V = πr²h = 3.14 × 9 × 10 = 282.6.',
    formula: 'V = \\pi r^2 h',
  },
  {
    id: 'vol-3',
    kind: 'word',
    topic: 'Volume',
    prompt:
      'A box is 8 in long, 5 in wide, and 4 in tall. What is its volume in cubic inches?',
    choices: ['17', '52', '120', '160'],
    correct: 3,
    explanation: 'V = 8 × 5 × 4 = 160 cubic inches.',
    formula: 'V = l w h',
  },
  {
    id: 'vol-4',
    kind: 'word',
    topic: 'Volume',
    prompt:
      'A cylindrical water tank has radius 4 ft and height 6 ft. What is its volume to the nearest tenth? (Use π ≈ 3.14)',
    choices: ['75.4', '150.8', '301.4', '301.6'],
    correct: 3,
    explanation: 'V = πr²h = 3.14 × 16 × 6 = 301.44 ≈ 301.6 cubic ft. (rounded — choice closest)',
    formula: 'V = \\pi r^2 h',
  },
  {
    id: 'vol-5',
    kind: 'word',
    topic: 'Volume',
    prompt:
      'A sphere has a radius of 3 cm. What is its volume to the nearest tenth? (Use π ≈ 3.14)',
    choices: ['28.3', '36.0', '113.0', '113.1'],
    correct: 3,
    explanation: 'V = (4/3)πr³ = (4/3) × 3.14 × 27 = 113.04 ≈ 113.1.',
    formula: 'V = \\tfrac{4}{3}\\pi r^3',
  },

  // ── Surface area ───────────────────────────────────────────────────
  {
    id: 'sa-1',
    kind: 'word',
    topic: 'Surface area',
    prompt:
      'A cube has a side length of 5 in. What is its total surface area?',
    choices: ['25', '125', '150', '300'],
    correct: 2,
    explanation: 'SA = 6s² = 6 × 25 = 150 sq in.',
    formula: 'SA = 6 s^2',
  },
  {
    id: 'sa-2',
    kind: 'word',
    topic: 'Surface area',
    prompt:
      'A rectangular box is 4 by 3 by 2 cm. What is its surface area?',
    choices: ['24', '26', '48', '52'],
    correct: 3,
    explanation: 'SA = 2(lw + lh + wh) = 2(12 + 8 + 6) = 2(26) = 52 sq cm.',
    formula: 'SA = 2(lw + lh + wh)',
  },

  // ── Angles ─────────────────────────────────────────────────────────
  {
    id: 'ang-1',
    kind: 'word',
    topic: 'Angles',
    prompt: 'Two angles are complementary. One angle is 35°. What is the other?',
    choices: ['45°', '55°', '65°', '145°'],
    correct: 1,
    explanation: 'Complementary angles sum to 90°. 90 − 35 = 55°.',
    formula: '\\angle 1 + \\angle 2 = 90^\\circ',
  },
  {
    id: 'ang-2',
    kind: 'word',
    topic: 'Angles',
    prompt: 'Two angles are supplementary. One angle is 110°. What is the other?',
    choices: ['20°', '70°', '90°', '250°'],
    correct: 1,
    explanation: 'Supplementary angles sum to 180°. 180 − 110 = 70°.',
    formula: '\\angle 1 + \\angle 2 = 180^\\circ',
  },
  {
    id: 'ang-3',
    kind: 'word',
    topic: 'Angles',
    prompt:
      'In a triangle, two angles measure 47° and 68°. What is the third angle?',
    choices: ['65°', '75°', '85°', '115°'],
    correct: 0,
    explanation: 'The angles of a triangle sum to 180°. 180 − 47 − 68 = 65°.',
    formula: '\\angle A + \\angle B + \\angle C = 180^\\circ',
  },
  {
    id: 'ang-4',
    kind: 'image',
    topic: 'Angles',
    figure: { shape: 'parallel-lines', vals: { angle: 65 } },
    prompt:
      'Two parallel lines are cut by a transversal forming a 65° angle. What is the measure of its corresponding angle?',
    choices: ['25°', '65°', '115°', '180°'],
    correct: 1,
    explanation:
      'Corresponding angles formed by a transversal cutting parallel lines are equal. So the corresponding angle is also 65°.',
    formula: '\\text{corresponding angles are } \\cong',
  },
  {
    id: 'ang-5',
    kind: 'image',
    topic: 'Angles',
    figure: { shape: 'parallel-lines', vals: { angle: 65 } },
    prompt:
      'Using the same diagram, what is the measure of the co-interior (same-side interior) angle to the 65° angle?',
    choices: ['25°', '65°', '115°', '180°'],
    correct: 2,
    explanation:
      'Co-interior angles on the same side of the transversal are supplementary. 180 − 65 = 115°.',
    formula: '\\angle 1 + \\angle 2 = 180^\\circ',
  },
  {
    id: 'ang-6',
    kind: 'word',
    topic: 'Angles',
    prompt:
      'Vertical angles are formed when two lines cross. If one vertical angle is 73°, what is the other?',
    choices: ['17°', '73°', '107°', '180°'],
    correct: 1,
    explanation: 'Vertical angles are always equal in measure. So both are 73°.',
    formula: '\\text{vertical angles are } \\cong',
  },

  // ── Mixed / harder ─────────────────────────────────────────────────
  {
    id: 'mix-1',
    kind: 'word',
    topic: 'Mixed',
    prompt:
      'A square has an area of 64 sq cm. What is the length of one side?',
    choices: ['4 cm', '6 cm', '8 cm', '32 cm'],
    correct: 2,
    explanation: 's = √64 = 8 cm.',
    formula: 's = \\sqrt{A}',
  },
  {
    id: 'mix-2',
    kind: 'word',
    topic: 'Mixed',
    prompt:
      'The diameter of a circle is 14 in. What is its area to the nearest tenth? (π ≈ 3.14)',
    choices: ['43.96', '153.86', '154.0', '615.4'],
    correct: 2,
    explanation: 'r = 7, A = π × 49 = 153.86 ≈ 154.0 sq in.',
    formula: 'A = \\pi r^2',
  },
  {
    id: 'mix-3',
    kind: 'word',
    topic: 'Mixed',
    prompt:
      'A rectangular pool is 25 ft long, 12 ft wide, and 5 ft deep. How many cubic feet of water does it hold when full?',
    choices: ['42', '300', '1500', '15000'],
    correct: 2,
    explanation: 'V = 25 × 12 × 5 = 1500 cubic ft.',
    formula: 'V = l w h',
  },
];

export const GEOMETRY_TOPICS = [
  'All',
  'Perimeter',
  'Circumference',
  'Area',
  'Pythagorean',
  'Volume',
  'Surface area',
  'Angles',
  'Mixed',
];
