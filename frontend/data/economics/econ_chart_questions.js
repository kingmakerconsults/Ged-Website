// Chart-reading practice for the Market Simulator.
// Each item describes a small supply/demand chart and asks the student to
// read or interpret it. The chart is rendered inline as SVG by the tool.
//
// Each question has:
//   id, prompt, choices[], correct (index), explanation
//   chart: { type, ... } — describes what to draw
//
// Chart types:
//   'sd-baseline'      — initial S & D lines, ask for equilibrium
//   'sd-shift'         — initial + shifted curve, ask what changed
//   'price-change'     — given price set above/below equilibrium, ask result
//   'reading'          — read a value off the chart

export const ECON_CHART_QUESTIONS = [
  {
    id: 'cq_001',
    prompt:
      'On the graph below, what is the equilibrium price (where supply and demand cross)?',
    chart: { type: 'sd-baseline', dIntercept: 10, sIntercept: 0 },
    choices: ['$3', '$5', '$7', '$10'],
    correct: 1,
    explanation:
      'The lines intersect at Q = 5 and P = 5. The equilibrium price is $5.',
  },
  {
    id: 'cq_002',
    prompt: 'Looking at the chart, what is the equilibrium quantity?',
    chart: { type: 'sd-baseline', dIntercept: 10, sIntercept: 0 },
    choices: ['3 units', '5 units', '7 units', '10 units'],
    correct: 1,
    explanation:
      'Equilibrium quantity is read from the horizontal axis at the intersection — 5 units.',
  },
  {
    id: 'cq_003',
    prompt:
      'The dashed line shows the new demand curve. What kind of shift is this?',
    chart: {
      type: 'sd-shift',
      curve: 'demand',
      dIntercept: 10,
      sIntercept: 0,
      shift: 2,
    },
    choices: [
      'Increase in demand (shift right)',
      'Decrease in demand (shift left)',
      'Increase in supply',
      'Decrease in supply',
    ],
    correct: 0,
    explanation:
      'The demand curve moved to the right (out), which is an increase in demand.',
  },
  {
    id: 'cq_004',
    prompt:
      'After the demand shift shown, what happened to equilibrium price and quantity?',
    chart: {
      type: 'sd-shift',
      curve: 'demand',
      dIntercept: 10,
      sIntercept: 0,
      shift: 2,
    },
    choices: [
      'Price up, quantity up',
      'Price down, quantity down',
      'Price up, quantity down',
      'Price down, quantity up',
    ],
    correct: 0,
    explanation:
      'When demand increases, the new intersection with supply is at a higher price AND higher quantity.',
  },
  {
    id: 'cq_005',
    prompt:
      'The dashed line shows the new supply curve. What does this represent?',
    chart: {
      type: 'sd-shift',
      curve: 'supply',
      dIntercept: 10,
      sIntercept: 0,
      shift: 2,
    },
    choices: [
      'Increase in supply (shift right)',
      'Decrease in supply (shift left)',
      'Increase in demand',
      'Decrease in demand',
    ],
    correct: 0,
    explanation:
      'Supply moved out (right). At every price, sellers will offer more — that is an increase in supply.',
  },
  {
    id: 'cq_006',
    prompt:
      'The supply curve shifted left as shown. What happens at the new equilibrium?',
    chart: {
      type: 'sd-shift',
      curve: 'supply',
      dIntercept: 10,
      sIntercept: 0,
      shift: -2,
    },
    choices: [
      'Price up, quantity down',
      'Price down, quantity up',
      'Price up, quantity up',
      'Price down, quantity down',
    ],
    correct: 0,
    explanation:
      'A decrease in supply (left shift) raises equilibrium price and lowers equilibrium quantity.',
  },
  {
    id: 'cq_007',
    prompt:
      'The horizontal line shows a price ceiling at $3 — below the market equilibrium. What will happen?',
    chart: {
      type: 'price-change',
      dIntercept: 10,
      sIntercept: 0,
      pricedAt: 3,
    },
    choices: [
      'There will be a shortage (Qd > Qs).',
      'There will be a surplus (Qs > Qd).',
      'The market is in equilibrium.',
      'Nothing will change.',
    ],
    correct: 0,
    explanation:
      'At $3, quantity demanded (7) is greater than quantity supplied (3) — a shortage of 4 units.',
  },
  {
    id: 'cq_008',
    prompt:
      'The horizontal line shows a price of $7 — above equilibrium. What is the situation?',
    chart: {
      type: 'price-change',
      dIntercept: 10,
      sIntercept: 0,
      pricedAt: 7,
    },
    choices: [
      'There is a surplus (Qs > Qd).',
      'There is a shortage (Qd > Qs).',
      'The market is in equilibrium.',
      'Demand will shift right.',
    ],
    correct: 0,
    explanation:
      'At $7, sellers want to sell 7 units but buyers only want 3 — a surplus of 4 units.',
  },
  {
    id: 'cq_009',
    prompt:
      'According to the chart, what quantity is supplied when the price is $4?',
    chart: { type: 'reading', dIntercept: 10, sIntercept: 0, readPrice: 4 },
    choices: ['2 units', '4 units', '6 units', '8 units'],
    correct: 1,
    explanation:
      'On a supply line P = Q, when P = 4, Q = 4. Read across to where the line meets price = $4.',
  },
  {
    id: 'cq_010',
    prompt:
      'According to the chart, what quantity is demanded at a price of $8?',
    chart: { type: 'reading', dIntercept: 10, sIntercept: 0, readPrice: 8 },
    choices: ['2 units', '4 units', '6 units', '8 units'],
    correct: 0,
    explanation:
      'On a demand line P = 10 − Q, when P = 8, Q = 2. Buyers only want 2 units when price is $8.',
  },
  // ── Additional chart questions ────────────────────────────────────────
  {
    id: 'cq_011',
    prompt:
      'The demand curve shifted left as shown. What effect does this have on equilibrium?',
    chart: {
      type: 'sd-shift',
      curve: 'demand',
      dIntercept: 10,
      sIntercept: 0,
      shift: -2,
    },
    choices: [
      'Price down, quantity down',
      'Price up, quantity up',
      'Price down, quantity up',
      'Price up, quantity down',
    ],
    correct: 0,
    explanation:
      'A decrease in demand (left shift) lowers both the equilibrium price and quantity.',
  },
  {
    id: 'cq_012',
    prompt:
      'The chart shows a supply curve and demand curve with equilibrium at (6, 4). A new supply curve (dashed) now intersects demand at (8, 2). What happened?',
    chart: {
      type: 'sd-shift',
      curve: 'supply',
      dIntercept: 10,
      sIntercept: 0,
      shift: 4,
    },
    choices: [
      'Supply increased — price fell, quantity rose',
      'Supply decreased — price rose, quantity fell',
      'Demand increased — price rose, quantity rose',
      'Demand decreased — price fell, quantity fell',
    ],
    correct: 0,
    explanation:
      'An increase in supply (right shift) drives equilibrium price down and quantity up.',
  },
  {
    id: 'cq_013',
    prompt:
      'According to the chart, what quantity is supplied when the price is $7?',
    chart: { type: 'reading', dIntercept: 10, sIntercept: 0, readPrice: 7 },
    choices: ['3 units', '5 units', '7 units', '9 units'],
    correct: 2,
    explanation:
      'On the supply line P = Q, when P = 7, Q = 7. Sellers want to supply 7 units at this price.',
  },
  {
    id: 'cq_014',
    prompt:
      'According to the chart, what quantity is demanded when the price is $3?',
    chart: { type: 'reading', dIntercept: 10, sIntercept: 0, readPrice: 3 },
    choices: ['3 units', '5 units', '7 units', '9 units'],
    correct: 2,
    explanation:
      'On the demand line P = 10 − Q, when P = 3, Q = 7. More is demanded at lower prices.',
  },
  {
    id: 'cq_015',
    prompt:
      'A price floor is set at $7 (above equilibrium). What situation results?',
    chart: {
      type: 'price-change',
      dIntercept: 10,
      sIntercept: 0,
      pricedAt: 7,
    },
    choices: [
      'A surplus — quantity supplied exceeds quantity demanded',
      'A shortage — quantity demanded exceeds quantity supplied',
      'The market remains in equilibrium',
      'Demand automatically increases to fix the surplus',
    ],
    correct: 0,
    explanation:
      'Price floors set above equilibrium cause surpluses because sellers supply more than buyers want at that high price.',
  },
  {
    id: 'cq_016',
    prompt:
      'On a standard supply and demand graph, what does the X-axis (horizontal) represent?',
    chart: { type: 'sd-baseline', dIntercept: 10, sIntercept: 0 },
    choices: ['Quantity', 'Price', 'Revenue', 'Supply'],
    correct: 0,
    explanation:
      'The horizontal axis (X) represents Quantity and the vertical axis (Y) represents Price on a standard supply and demand graph.',
  },
  {
    id: 'cq_017',
    prompt:
      'On a standard supply and demand graph, which curve slopes downward from left to right?',
    chart: { type: 'sd-baseline', dIntercept: 10, sIntercept: 0 },
    choices: [
      'The demand curve',
      'The supply curve',
      'Both curves slope downward',
      'Neither — both are flat',
    ],
    correct: 0,
    explanation:
      'The demand curve slopes downward (negative slope) because at higher prices, buyers demand less.',
  },
  {
    id: 'cq_018',
    prompt:
      'The supply curve shifted right (increased). Which of these could have caused this shift?',
    chart: {
      type: 'sd-shift',
      curve: 'supply',
      dIntercept: 10,
      sIntercept: 0,
      shift: 2,
    },
    choices: [
      'New technology made production cheaper',
      'A new tax increased production costs',
      'Consumer income fell',
      'Consumer preferences changed',
    ],
    correct: 0,
    explanation:
      'Supply increases (shifts right) when production costs decrease — e.g., new technology, lower input costs, or subsidies.',
  },
  {
    id: 'cq_019',
    prompt:
      'A price ceiling is set at $3 (below equilibrium). What quantity is supplied at this price?',
    chart: {
      type: 'price-change',
      dIntercept: 10,
      sIntercept: 0,
      pricedAt: 3,
    },
    choices: ['3 units', '5 units', '7 units', '10 units'],
    correct: 0,
    explanation:
      'On the supply line P = Q, when P = 3, Q = 3. The price ceiling limits the price, so sellers only produce 3 units.',
  },
  {
    id: 'cq_020',
    prompt:
      'Which of the following would shift the demand curve to the left (decrease demand)?',
    chart: { type: 'sd-baseline', dIntercept: 10, sIntercept: 0 },
    choices: [
      'A decrease in consumer income',
      'A decrease in the price of the good',
      'A decrease in production costs',
      'A decrease in the number of suppliers',
    ],
    correct: 0,
    explanation:
      'Demand decreases (shifts left) when consumer income falls, when a complementary good gets more expensive, or when consumer tastes change. A price change moves along the demand curve — it does not shift it.',
  },
];
