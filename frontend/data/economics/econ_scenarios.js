// Economics scenarios for the Market Simulator
export const SCENARIOS = [
  {
    id: 'econ_001',
    prompt:
      'A new technology lowers production costs across the industry. What happens?',
    affect: 'supply', // training mode step 1
    direction: 'increase', // training mode step 2
    explanation:
      'Lower input costs increase supply (shift right), reducing price and increasing quantity.',
    difficulty: 'easy',
    tags: ['technology', 'input_costs'],
  },
  {
    id: 'econ_002',
    prompt: 'Consumer incomes rise sharply for a normal good. What happens?',
    affect: 'demand',
    direction: 'increase',
    explanation:
      'Higher income for a normal good increases demand (shift right), raising price and quantity.',
    difficulty: 'medium',
    tags: ['income', 'tastes'],
  },
  {
    id: 'econ_003',
    prompt: 'A health scare reduces consumer preference for a product.',
    affect: 'demand',
    direction: 'decrease',
    explanation:
      'Lower preference decreases demand (shift left), reducing price and quantity.',
    difficulty: 'medium',
    tags: ['tastes'],
  },
  {
    id: 'econ_004',
    prompt: 'A tax raises input costs for producers.',
    affect: 'supply',
    direction: 'decrease',
    explanation:
      'Higher input costs decrease supply (shift left), raising price and lowering quantity.',
    difficulty: 'hard',
    tags: ['input_costs', 'taxes'],
  },
];
