// Economics scenarios for the Market Simulator.
// Each scenario provides:
//   - prompt:        the situation
//   - determinant:   the underlying factor (input cost, taste, income, etc.)
//   - curve:         'supply' | 'demand'  (which curve shifts)
//   - direction:     'increase' | 'decrease'  (right-shift or left-shift)
//   - eqPriceChange: 'up' | 'down'   (effect on equilibrium price)
//   - eqQtyChange:   'up' | 'down'   (effect on equilibrium quantity)
//   - explanation:   plain-English reasoning
//   - difficulty:    'easy' | 'medium' | 'hard'
//   - tags:          searchable tags
// Legacy fields `affect` and `direction` are preserved for backward compatibility
// with older tool code (affect === curve).
export const SCENARIOS = [
  // ── Supply-side determinants ──────────────────────────────────────────────
  {
    id: 'econ_001',
    prompt:
      'A new technology lowers production costs across the bicycle industry.',
    determinant: 'Production technology',
    curve: 'supply',
    affect: 'supply',
    direction: 'increase',
    eqPriceChange: 'down',
    eqQtyChange: 'up',
    explanation:
      'Better technology lets producers make more bikes for less money, so supply shifts right. Equilibrium price falls and quantity rises.',
    difficulty: 'easy',
    tags: ['technology', 'input_costs'],
  },
  {
    id: 'econ_002',
    prompt: 'A drought destroys a large share of the wheat harvest.',
    determinant: 'Resource availability',
    curve: 'supply',
    affect: 'supply',
    direction: 'decrease',
    eqPriceChange: 'up',
    eqQtyChange: 'down',
    explanation:
      'Less wheat is available at every price, so supply shifts left. Equilibrium price rises and quantity falls.',
    difficulty: 'easy',
    tags: ['resources', 'natural_disaster'],
  },
  {
    id: 'econ_003',
    prompt: 'The government places a new $2 tax on every pack of cigarettes.',
    determinant: 'Taxes on producers',
    curve: 'supply',
    affect: 'supply',
    direction: 'decrease',
    eqPriceChange: 'up',
    eqQtyChange: 'down',
    explanation:
      'Taxes raise producers’ costs, shifting supply left. Price rises and quantity falls.',
    difficulty: 'medium',
    tags: ['taxes'],
  },
  {
    id: 'econ_004',
    prompt: 'The government gives solar-panel makers a $500-per-unit subsidy.',
    determinant: 'Subsidies to producers',
    curve: 'supply',
    affect: 'supply',
    direction: 'increase',
    eqPriceChange: 'down',
    eqQtyChange: 'up',
    explanation:
      'A subsidy lowers per-unit costs, shifting supply right. Price falls and quantity rises.',
    difficulty: 'medium',
    tags: ['subsidies'],
  },
  {
    id: 'econ_005',
    prompt: 'The price of steel (an input for cars) rises sharply.',
    determinant: 'Input prices',
    curve: 'supply',
    affect: 'supply',
    direction: 'decrease',
    eqPriceChange: 'up',
    eqQtyChange: 'down',
    explanation:
      'Higher input costs reduce supply. Car prices rise and quantity sold falls.',
    difficulty: 'easy',
    tags: ['input_costs'],
  },
  {
    id: 'econ_006',
    prompt:
      'Three new pizza shops open in a small town that already had only one.',
    determinant: 'Number of sellers',
    curve: 'supply',
    affect: 'supply',
    direction: 'increase',
    eqPriceChange: 'down',
    eqQtyChange: 'up',
    explanation:
      'More sellers in the market shifts supply right, pushing price down and quantity up.',
    difficulty: 'easy',
    tags: ['number_of_sellers'],
  },
  {
    id: 'econ_007',
    prompt:
      'Producers expect the price of corn to be much higher next month, so they hold back inventory.',
    determinant: 'Producer expectations',
    curve: 'supply',
    affect: 'supply',
    direction: 'decrease',
    eqPriceChange: 'up',
    eqQtyChange: 'down',
    explanation:
      'When producers expect higher future prices, they reduce current supply. Today’s price rises and quantity falls.',
    difficulty: 'hard',
    tags: ['expectations'],
  },
  {
    id: 'econ_008',
    prompt:
      'A new factory automation halves the labor needed to produce smartphones.',
    determinant: 'Production technology',
    curve: 'supply',
    affect: 'supply',
    direction: 'increase',
    eqPriceChange: 'down',
    eqQtyChange: 'up',
    explanation:
      'Productivity gains shift supply right; price falls and quantity rises.',
    difficulty: 'easy',
    tags: ['technology'],
  },

  // ── Demand-side determinants ──────────────────────────────────────────────
  {
    id: 'econ_009',
    prompt:
      'Consumer incomes rise sharply for a normal good (e.g., restaurant meals).',
    determinant: 'Income (normal good)',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'When income rises, demand for normal goods shifts right. Both price and quantity increase.',
    difficulty: 'easy',
    tags: ['income', 'normal_good'],
  },
  {
    id: 'econ_010',
    prompt:
      'Consumer incomes fall during a recession. Sales of generic instant noodles (an inferior good) climb.',
    determinant: 'Income (inferior good)',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'For inferior goods, demand rises when income falls — buyers trade down. Price and quantity both rise.',
    difficulty: 'hard',
    tags: ['income', 'inferior_good'],
  },
  {
    id: 'econ_011',
    prompt: 'A health scare reduces consumer preference for sugary drinks.',
    determinant: 'Tastes & preferences',
    curve: 'demand',
    affect: 'demand',
    direction: 'decrease',
    eqPriceChange: 'down',
    eqQtyChange: 'down',
    explanation:
      'Lower preference shifts demand left. Equilibrium price falls and quantity falls.',
    difficulty: 'easy',
    tags: ['tastes'],
  },
  {
    id: 'econ_012',
    prompt:
      'A viral celebrity post makes a brand of sneakers very fashionable overnight.',
    determinant: 'Tastes & preferences',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'Stronger preference shifts demand right. Both price and quantity rise.',
    difficulty: 'easy',
    tags: ['tastes', 'trends'],
  },
  {
    id: 'econ_013',
    prompt:
      'The price of tea (a substitute for coffee) doubles, while coffee prices stay the same.',
    determinant: 'Price of substitute',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'When a substitute (tea) becomes more expensive, demand for coffee rises. Coffee’s price and quantity both increase.',
    difficulty: 'medium',
    tags: ['substitutes'],
  },
  {
    id: 'econ_014',
    prompt:
      'The price of hot dog buns (a complement to hot dogs) rises sharply.',
    determinant: 'Price of complement',
    curve: 'demand',
    affect: 'demand',
    direction: 'decrease',
    eqPriceChange: 'down',
    eqQtyChange: 'down',
    explanation:
      'When a complement gets more expensive, demand for the related good falls. Hot dog price and quantity both fall.',
    difficulty: 'medium',
    tags: ['complements'],
  },
  {
    id: 'econ_015',
    prompt:
      'A city’s population grows by 20% as new residents move in for jobs.',
    determinant: 'Number of buyers',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'More buyers shifts demand right. Equilibrium price and quantity both rise.',
    difficulty: 'easy',
    tags: ['number_of_buyers', 'population'],
  },
  {
    id: 'econ_016',
    prompt:
      'Buyers expect the price of gasoline to spike next week, so they line up to fill their tanks today.',
    determinant: 'Buyer expectations',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'When buyers expect higher future prices, current demand rises. Today’s price and quantity both rise.',
    difficulty: 'medium',
    tags: ['expectations'],
  },
  {
    id: 'econ_017',
    prompt:
      'A long heat wave dramatically increases air-conditioner purchases.',
    determinant: 'Tastes (seasonal)',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'Hot weather raises preference for AC units. Demand shifts right; price and quantity rise.',
    difficulty: 'easy',
    tags: ['weather', 'tastes'],
  },
  {
    id: 'econ_018',
    prompt: 'A new study shows red meat is healthier than previously thought.',
    determinant: 'Tastes & preferences',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'Improved opinion of the good raises demand. Price and quantity both rise.',
    difficulty: 'medium',
    tags: ['tastes', 'information'],
  },
  {
    id: 'econ_019',
    prompt:
      'A new electric-vehicle tax credit makes EVs $7,500 cheaper for buyers.',
    determinant: 'Subsidy to buyers',
    curve: 'demand',
    affect: 'demand',
    direction: 'increase',
    eqPriceChange: 'up',
    eqQtyChange: 'up',
    explanation:
      'A buyer subsidy increases willingness to pay, shifting demand right. Pre-credit market price and quantity rise.',
    difficulty: 'hard',
    tags: ['subsidy', 'policy'],
  },
  {
    id: 'econ_020',
    prompt:
      'Local universities switch all classes online — fewer students live near campus.',
    determinant: 'Number of buyers',
    curve: 'demand',
    affect: 'demand',
    direction: 'decrease',
    eqPriceChange: 'down',
    eqQtyChange: 'down',
    explanation:
      'Fewer local buyers shifts demand for nearby apartments left. Rent and quantity rented both fall.',
    difficulty: 'medium',
    tags: ['number_of_buyers'],
  },
  {
    id: 'econ_021',
    prompt:
      'Streaming services release dozens of free shows, reducing demand for movie tickets.',
    determinant: 'Price of substitute',
    curve: 'demand',
    affect: 'demand',
    direction: 'decrease',
    eqPriceChange: 'down',
    eqQtyChange: 'down',
    explanation:
      'Cheaper substitutes shift movie-ticket demand left. Price and quantity both fall.',
    difficulty: 'medium',
    tags: ['substitutes'],
  },
  {
    id: 'econ_022',
    prompt:
      'A reliable forecast says coffee prices will fall next month. Cafés delay restocking.',
    determinant: 'Buyer expectations',
    curve: 'demand',
    affect: 'demand',
    direction: 'decrease',
    eqPriceChange: 'down',
    eqQtyChange: 'down',
    explanation:
      'Expected lower future prices reduce current demand. Today’s price and quantity fall.',
    difficulty: 'hard',
    tags: ['expectations'],
  },
  {
    id: 'econ_023',
    prompt:
      'Several major airlines retire older planes, reducing the number of flights available.',
    determinant: 'Number of sellers',
    curve: 'supply',
    affect: 'supply',
    direction: 'decrease',
    eqPriceChange: 'up',
    eqQtyChange: 'down',
    explanation:
      'Fewer flights means lower supply. Ticket prices rise; quantity sold falls.',
    difficulty: 'medium',
    tags: ['number_of_sellers'],
  },
  {
    id: 'econ_024',
    prompt:
      'A pandemic shutters restaurants. Demand for restaurant meals collapses.',
    determinant: 'Tastes / safety',
    curve: 'demand',
    affect: 'demand',
    direction: 'decrease',
    eqPriceChange: 'down',
    eqQtyChange: 'down',
    explanation:
      'Sharp drop in willingness to dine out shifts demand left. Price and quantity both fall.',
    difficulty: 'easy',
    tags: ['tastes', 'shock'],
  },
];
