/**
 * GED Ready-Style Economics — Passage, Scenario, and Data Questions
 * Modeled after GED Ready® Social Studies exam format:
 *   - Supply & demand, fiscal vs. monetary policy, market structures,
 *     taxation, labor & unemployment
 *   - Mix of short economic passages, scenarios, and data tables
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'medium',
    topic: 'Economics',
    contentArea: 'economics',
    passage:
      'This passage describes basic principles of supply and demand.\n\nIn a competitive market, the price of a good is shaped by the interaction of supply (how much producers are willing and able to sell at each price) and demand (how much consumers are willing and able to buy at each price). When the price of a good rises, producers generally want to supply more of it, but consumers generally want to buy less. When the price falls, the reverse occurs. The market tends toward an equilibrium price at which the quantity supplied equals the quantity demanded.\n\nWhen something disrupts this balance — such as a sudden shortage of an input, a new tax, or a change in consumer tastes — the equilibrium price moves. For example, if a severe drought reduces the orange harvest, the supply of oranges falls. With less supply available at every price, the equilibrium price of oranges rises until the smaller quantity supplied again matches the quantity consumers are willing to buy at that higher price.',
    question:
      'Based on the passage, what would most likely happen to the price of coffee beans if a major coffee-growing region experienced a long drought, assuming demand stays constant?',
    answerOptions: [
      {
        text: 'The price would rise because supply has decreased while demand stays the same.',
        rationale:
          'Correct. The passage explains that a reduction in supply (with demand unchanged) pushes the equilibrium price upward — exactly the orange-drought example applied to coffee.',
        isCorrect: true,
      },
      {
        text: 'The price would fall because consumers always switch to substitutes.',
        rationale:
          'The question states demand stays constant, so consumers are not assumed to switch. Even if some did, a supply drop alone tends to raise price.',
        isCorrect: false,
      },
      {
        text: 'The price would stay exactly the same because supply and demand are independent.',
        rationale:
          'The passage explicitly states price is shaped by the interaction of supply and demand; they are not independent.',
        isCorrect: false,
      },
      {
        text: 'The price would rise only if the government raised taxes on coffee.',
        rationale:
          'The passage lists a tax as one possible disruption but also lists supply shocks like reduced harvests as separate, sufficient causes of a price change.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Economics',
    contentArea: 'economics',
    passage:
      'This passage continues the discussion of supply and demand by describing shifts in demand.\n\nDemand for a particular good can shift because of changes outside of price. Common causes include changes in consumer income, the price of related goods (substitutes and complements), changes in tastes or fashion, expectations about future prices, and the size of the population.\n\nFor example, if a popular medical study reports that eating blueberries lowers the risk of heart disease, demand for blueberries may rise at every price level. The whole demand curve shifts to the right. Producers, seeing higher demand, will tend to supply more — but in the short run, the increased demand against an unchanged supply pushes the equilibrium price upward.',
    question:
      'Based on the passage, which scenario would most likely cause the demand for hybrid cars to shift to the right (increase) at every price?',
    answerOptions: [
      {
        text: 'A new car factory opens, doubling production capacity for hybrid cars.',
        rationale:
          'A change in production capacity is a supply-side change, not a shift in demand. The passage describes demand shifts as caused by changes outside of price such as income, tastes, or substitutes.',
        isCorrect: false,
      },
      {
        text: 'The price of gasoline rises sharply and is expected to remain high.',
        rationale:
          'Correct. Gasoline is a complement to gas-powered cars and a substitute fuel cost compared with hybrids. Higher gasoline prices make hybrids relatively more attractive, shifting demand for hybrids to the right.',
        isCorrect: true,
      },
      {
        text: 'The federal government raises a sales tax specifically on hybrid cars.',
        rationale:
          'A tax on hybrids would generally reduce the quantity demanded at any given pre-tax price, not increase demand.',
        isCorrect: false,
      },
      {
        text: 'A study finds that hybrid car batteries are unreliable in cold weather.',
        rationale:
          'A negative tastes/quality change would shift demand to the left (decrease), not to the right.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'medium',
    topic: 'Economics',
    contentArea: 'economics',
    passage:
      'This passage describes two main tools governments use to influence the economy.\n\n<strong>Fiscal policy</strong> refers to government decisions about taxation and spending. In the United States, fiscal policy is set by Congress and the President through the federal budget. To stimulate a slowing economy, the government may cut taxes or increase spending on programs such as infrastructure or unemployment benefits — moves that put more money into the hands of consumers and businesses.\n\n<strong>Monetary policy</strong> refers to actions by a country\'s central bank — in the United States, the Federal Reserve ("the Fed") — to influence the supply of money and credit. The Fed\'s most-used tool is adjusting short-term interest rates. Lowering interest rates makes borrowing cheaper, encouraging businesses to invest and consumers to buy big-ticket items such as homes and cars. Raising interest rates does the opposite and is often used to slow inflation.',
    question:
      'During a recession, the President signs a bill that cuts personal income tax rates and funds new highway construction. This action is best classified as:',
    answerOptions: [
      {
        text: 'Expansionary monetary policy.',
        rationale:
          'Monetary policy is conducted by the Federal Reserve through interest rates and money supply, not by the President signing a tax-and-spending bill.',
        isCorrect: false,
      },
      {
        text: 'Contractionary monetary policy.',
        rationale:
          'Apart from being a fiscal action rather than a monetary one, the bill aims to expand activity (cutting taxes, raising spending), not contract it.',
        isCorrect: false,
      },
      {
        text: 'Expansionary fiscal policy.',
        rationale:
          'Correct. A tax cut combined with increased government spending is a textbook expansionary fiscal policy: it uses the federal budget to inject more money into the economy during a recession.',
        isCorrect: true,
      },
      {
        text: 'Contractionary fiscal policy.',
        rationale:
          'Contractionary fiscal policy would mean raising taxes or cutting spending. The bill described does the opposite of both.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'hard',
    topic: 'Economics',
    contentArea: 'economics',
    passage:
      'This passage describes four major types of market structures.\n\n<table><thead><tr><th>Market Structure</th><th>Number of Firms</th><th>Product Type</th><th>Pricing Power</th><th>Example</th></tr></thead><tbody><tr><td>Perfect Competition</td><td>Many</td><td>Identical</td><td>None (price-taker)</td><td>Wheat farming</td></tr><tr><td>Monopolistic Competition</td><td>Many</td><td>Differentiated</td><td>Limited</td><td>Restaurants, clothing brands</td></tr><tr><td>Oligopoly</td><td>Few</td><td>Identical or differentiated</td><td>Significant</td><td>Wireless carriers, airlines</td></tr><tr><td>Monopoly</td><td>One</td><td>Unique</td><td>Substantial (price-maker)</td><td>Local water utility</td></tr></tbody></table>',
    question:
      'A small town has only three internet service providers, and each company can noticeably influence its prices because there are so few competitors. Which market structure best describes this situation?',
    answerOptions: [
      {
        text: 'Perfect competition',
        rationale:
          'Perfect competition requires many firms selling identical products with no pricing power — the opposite of three providers with significant influence.',
        isCorrect: false,
      },
      {
        text: 'Monopolistic competition',
        rationale:
          'Monopolistic competition assumes many firms with differentiated products and only limited pricing power. Three competitors with notable price influence is too few firms for this category.',
        isCorrect: false,
      },
      {
        text: 'Oligopoly',
        rationale:
          'Correct. The table defines oligopoly as a market with few firms whose pricing power is significant — exactly matching three internet providers that can noticeably influence prices.',
        isCorrect: true,
      },
      {
        text: 'Monopoly',
        rationale:
          'A monopoly has only one firm. The town has three providers, so it is not a monopoly.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'medium',
    topic: 'Economics',
    contentArea: 'economics',
    passage:
      'This passage describes three categories of taxes based on how the tax burden changes with income.\n\nA <strong>progressive tax</strong> takes a larger percentage of income from people with higher incomes. The U.S. federal income tax is generally considered progressive because higher tax brackets apply higher rates to additional income.\n\nA <strong>proportional tax</strong> (sometimes called a "flat tax") takes the same percentage of income from everyone, regardless of how much they earn. Many state-level flat income taxes work this way.\n\nA <strong>regressive tax</strong> takes a larger percentage of income from people with lower incomes, even if everyone pays the same dollar amount or rate. Sales taxes on groceries are often described as regressive because lower-income households spend a larger share of their income on basic goods than higher-income households do.',
    question:
      'A state replaces its 5% flat income tax with a sales tax on all retail purchases at a single 5% rate. Lower-income households tend to spend almost all of their income on retail purchases, while higher-income households save a larger share. What change in the overall tax burden does this most likely create?',
    answerOptions: [
      {
        text: 'The tax system becomes more progressive.',
        rationale:
          'A more progressive system would shift more of the burden to higher-income households. The passage shows that sales taxes generally do the opposite.',
        isCorrect: false,
      },
      {
        text: 'The tax system becomes more regressive.',
        rationale:
          'Correct. The passage explains that sales taxes are typically regressive because lower-income households spend a larger share of their income on taxed goods. Replacing a flat-rate income tax with a sales tax shifts a relatively larger share of the burden onto lower-income households.',
        isCorrect: true,
      },
      {
        text: 'The tax system becomes perfectly proportional.',
        rationale:
          'A truly proportional system would take the same percentage of income from every household. Because higher-income households save more and spend less of their income on taxed goods, a sales tax does not produce equal percentages.',
        isCorrect: false,
      },
      {
        text: 'The tax system has no effect on different income groups.',
        rationale:
          'The passage and the scenario both describe systematically different impacts on lower- and higher-income households.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'text',
    difficulty: 'medium',
    topic: 'Economics',
    contentArea: 'data_interpretation',
    passage:
      'This information is from the U.S. Bureau of Labor Statistics.\n\n<strong>U.S. Civilian Labor Force Statistics, Selected Years</strong>\n<table><thead><tr><th>Year</th><th>Civilian Labor Force (millions)</th><th>Employed (millions)</th><th>Unemployed (millions)</th><th>Unemployment Rate</th></tr></thead><tbody><tr><td>2000</td><td>142.6</td><td>136.9</td><td>5.7</td><td>4.0%</td></tr><tr><td>2007</td><td>153.1</td><td>146.0</td><td>7.1</td><td>4.6%</td></tr><tr><td>2009</td><td>154.1</td><td>139.9</td><td>14.3</td><td>9.3%</td></tr><tr><td>2015</td><td>157.1</td><td>148.8</td><td>8.3</td><td>5.3%</td></tr><tr><td>2019</td><td>163.5</td><td>157.5</td><td>6.0</td><td>3.7%</td></tr></tbody></table>',
    question: 'Which conclusion is best supported by the data in the table?',
    answerOptions: [
      {
        text: 'The U.S. labor force shrank between 2000 and 2019.',
        rationale:
          'The civilian labor force grew from 142.6 million in 2000 to 163.5 million in 2019 — clear growth, not a shrinking.',
        isCorrect: false,
      },
      {
        text: 'The unemployment rate rose sharply in 2009 before falling back below the 2000 rate by 2019.',
        rationale:
          'Correct. The 2009 unemployment rate spiked to 9.3% (more than double the 2000 rate of 4.0%) and then fell to 3.7% by 2019, which is below the 4.0% rate from 2000.',
        isCorrect: true,
      },
      {
        text: 'The number of employed Americans was lowest in 2019.',
        rationale:
          'Employment in 2019 was 157.5 million, the highest year shown in the table — not the lowest.',
        isCorrect: false,
      },
      {
        text: 'Unemployment in 2007 was higher than in 2009.',
        rationale:
          'In 2007, 7.1 million were unemployed (4.6%); in 2009, 14.3 million were unemployed (9.3%). 2009 was much higher than 2007.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'text',
    difficulty: 'hard',
    topic: 'Economics',
    contentArea: 'data_interpretation',
    passage:
      "This information is adapted from federal labor data.\n\n<strong>Median Weekly Earnings by Highest Level of Education Completed (Workers Age 25+)</strong>\n<table><thead><tr><th>Education Level</th><th>Median Weekly Earnings</th><th>Unemployment Rate</th></tr></thead><tbody><tr><td>Less than a high school diploma</td><td>\626</td><td>5.4%</td></tr><tr><td>High school diploma, no college</td><td>\809</td><td>3.9%</td></tr><tr><td>Some college, no degree</td><td>\899</td><td>3.3%</td></tr><tr><td>Associate degree</td><td>\963</td><td>2.7%</td></tr><tr><td>Bachelor's degree</td><td>\1,334</td><td>2.2%</td></tr><tr><td>Master's degree</td><td>\1,574</td><td>2.0%</td></tr></tbody></table>",
    question:
      'Which generalization is best supported by both columns of the table?',
    answerOptions: [
      {
        text: 'Higher levels of education are associated with both higher earnings and lower unemployment.',
        rationale:
          "Correct. As the education level increases from less than a high school diploma to a master's degree, median weekly earnings rise steadily ($626 → $1,574) while the unemployment rate falls steadily (5.4% → 2.0%). Both columns move together in the predicted direction.",
        isCorrect: true,
      },
      {
        text: "Workers with a bachelor's degree always earn exactly twice as much as workers with only a high school diploma.",
        rationale:
          "A bachelor's degree median ($1,334) is roughly 1.65 times the high school diploma median ($809), not exactly double. The table shows a consistent pattern, but not a precise 2× relationship.",
        isCorrect: false,
      },
      {
        text: 'Education has no measurable effect on earnings.',
        rationale:
          'The earnings column shows large differences across education levels, contradicting the claim of no effect.',
        isCorrect: false,
      },
      {
        text: 'Workers without a high school diploma have the lowest unemployment rate.',
        rationale:
          "Workers without a high school diploma have the highest unemployment rate (5.4%), not the lowest. The lowest is the master's degree group at 2.0%.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'text',
    difficulty: 'medium',
    topic: 'Economics',
    contentArea: 'economics',
    passage:
      'This scenario describes a possible federal policy change.\n\nSuppose Congress passes a law raising the federal minimum wage from its current level to $15 per hour over the next three years. Supporters argue the change will lift wages for millions of low-paid workers and reduce poverty. Opponents argue some employers — especially small businesses with thin profit margins — will cut hours or jobs in response, and that some prices may rise as businesses pass higher labor costs on to customers.',
    question:
      'Which of the following best describes a likely <strong>economic trade-off</strong> created by this policy?',
    answerOptions: [
      {
        text: 'Workers who keep their jobs would earn less than before, but businesses would hire more workers overall.',
        rationale:
          'A higher minimum wage raises (not lowers) the pay of workers who keep their jobs. Most economic analyses also predict somewhat fewer, not more, jobs at the affected wage level.',
        isCorrect: false,
      },
      {
        text: 'Many low-wage workers would earn more, but some workers might see reduced hours or lose jobs, and consumers could face higher prices.',
        rationale:
          'Correct. The classic trade-off described in the scenario is between higher pay for workers who remain employed and possible negative side effects: reduced hours, fewer jobs, and higher consumer prices as businesses adjust.',
        isCorrect: true,
      },
      {
        text: 'There would be no economic effects at all because the law only changes wages, not behavior.',
        rationale:
          'The scenario itself describes likely behavioral responses by employers (cutting hours/jobs) and consumers (paying higher prices), so "no effects" is not consistent with the passage.',
        isCorrect: false,
      },
      {
        text: 'Inflation would automatically fall because workers have more spending power.',
        rationale:
          'More spending power generally tends to push prices upward, not downward. The scenario explicitly mentions higher prices as a possible side effect.',
        isCorrect: false,
      },
    ],
  },
];
