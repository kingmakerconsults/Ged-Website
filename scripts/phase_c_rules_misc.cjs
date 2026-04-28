const { buildRule } = require('./propagate_rationale_rewrites.cjs');

module.exports = [
  // ss_us_hist_divided_nation Q5: Emancipation Proclamation limitation
  buildRule(
    'It freed all enslaved people throughout the entire United States.',
    'This is incorrect. The proclamation explicitly did not apply to the loyal border states.',
    'Incorrect. The proclamation explicitly excluded the loyal border states (Maryland, Kentucky, Missouri, Delaware) and parts of the Confederacy already under Union control \u2014 it did not free everyone in the U.S.'
  ),
  buildRule(
    'It was immediately declared unconstitutional by the Supreme Court.',
    'The Supreme Court did not rule on its constitutionality at the time.',
    "Incorrect. The Supreme Court never ruled on the proclamation's constitutionality during the war; Lincoln issued it as a wartime measure under his Commander-in-Chief authority."
  ),
  buildRule(
    'It was rejected by the abolitionist movement as being too radical.',
    'Abolitionists generally supported it, though some wished it had gone further.',
    'Incorrect. Abolitionists generally welcomed the proclamation as a major step forward, though some criticized it for not freeing slaves in the loyal border states or in Union-held Southern territory.'
  ),

  // sci_ged_ready_life_passages Q2: Plant food chains
  buildRule(
    'Plants are the only organisms that can carry out cellular respiration.',
    'The passage explicitly states animal cells also carry out cellular respiration, so this is incorrect.',
    'Incorrect because the passage explicitly states that animal cells also carry out cellular respiration to produce ATP from glucose and oxygen.'
  ),
  buildRule(
    'Animals can manufacture their own glucose using sunlight.',
    'The passage credits photosynthesis only to plants and other photosynthetic organisms, not animals.',
    'Incorrect because the passage credits photosynthesis only to plants and other photosynthetic organisms; animals must obtain glucose by eating, since they cannot make it from sunlight.'
  ),
  buildRule(
    'Mitochondria are found only in plant cells.',
    'The passage states both plant and animal cells contain mitochondria.',
    'Incorrect because the passage explicitly states both plant and animal cells contain mitochondria, where cellular respiration produces ATP.'
  ),

  // sci_physical_science_newtons_laws_10 Q10: Mass vs weight
  buildRule(
    'They are the same thing.',
    'They are related but distinct concepts.',
    'Incorrect because mass and weight are related but physically distinct: mass measures the amount of matter, while weight is the gravitational force acting on that matter.'
  ),
  buildRule(
    'Mass is a force, and weight is a measure of inertia.',
    'This is incorrect. Weight is a force, and mass is a measure of inertia.',
    "Incorrect because the labels are reversed: weight is the force of gravity (measured in newtons), and mass is the measure of an object's inertia (measured in kilograms)."
  ),
  buildRule(
    'Mass depends on gravity, while weight does not.',
    'This is the opposite of the correct relationship.',
    'Incorrect because the relationship is reversed: weight depends on local gravity (your weight changes on the Moon), while mass stays constant regardless of gravitational field.'
  ),

  // math_alg_expressions Q3: (2x+3)+(x-1)
  buildRule(
    '\\(2x + 2\\)',
    'Forgot to add the \\(x\\) terms correctly.',
    'Incorrect because the \\(x\\)-terms were not combined: \\(2x + x = 3x\\), so the answer cannot start with \\(2x\\).'
  ),
  buildRule(
    '\\(3x + 4\\)',
    'Incorrectly added 3 and 1.',
    'Incorrect because the constants were added with the wrong sign: \\(3 + (-1) = 2\\), not \\(4\\).'
  ),
  buildRule(
    '\\(2x^2 - 2\\)',
    'This is incorrect; this is addition, not multiplication.',
    'Incorrect because adding linear expressions does not produce an \\(x^2\\) term; an \\(x^2\\) term would only appear from multiplying the binomials, not adding them.'
  ),

  // rla_info_structure_purpose Q1: Renewable energy main idea
  buildRule(
    'Hydropower is the most reliable and established form of renewable energy available today.',
    '"Hydropower is the most reliable and established form of renewable energy avai\u2026" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The passage mentions hydropower only as one example among several renewable sources; it does not single hydropower out as the most reliable, so this cannot be the main idea.'
  ),
  buildRule(
    'The global shift to renewable energy is a multifaceted response to the environmental impact of fossil fuels, driven by technology and policy.',
    'The global shift to renewable energy is a multifaceted response to the environmental impact of fossil fuels, driven by technology and policy.',
    'Correct. The passage frames the energy transition as a response to fossil-fuel-driven climate change and notes that it is supported by improving technology, government policy, and public demand \u2014 capturing the central argument as a whole.'
  ),
  buildRule(
    'The primary challenge of renewable energy is overcoming the high cost of solar panels and wind turbines.',
    '"The primary challenge of renewable energy is overcoming the high cost of sola\u2026" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Cost is a side detail at most; the passage instead emphasizes the overall transition and its drivers, so cost cannot be the main idea.'
  ),
  buildRule(
    'Fossil fuels, despite their environmental drawbacks, remain the only viable option for large-scale energy production.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. The passage actually argues the opposite \u2014 that renewable sources are increasingly viable replacements for fossil fuels, supported by policy and technological advances.'
  ),

  // rla_info_graphics Q4: Largest electricity consumer
  buildRule(
    'Residential',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The table shows Residential at 35%, which is below the Industrial sector\u2019s 40%.'
  ),
  buildRule(
    'Commercial',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. The Commercial sector accounts for less than the Industrial sector in the table; Industrial is the largest at 40%.'
  ),
  buildRule(
    'Transportation',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The table lists Transportation as one of the smallest shares of electricity use, not the largest.'
  ),
  buildRule(
    'Industrial',
    'Industrial',
    'Correct. The table lists the Industrial sector at 40%, the largest share of any sector listed and therefore the largest consumer of electricity.'
  ),

  // rla_info_graphics Q6: Why transportation growth significant
  buildRule(
    'Because transportation already uses the most electricity.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. The table shows transportation as one of the smallest electricity consumers, not the largest, so this premise is wrong.'
  ),
  buildRule(
    'Because transportation currently represents a very small fraction of electricity use, so any growth will be a large relative change.',
    'Because transportation currently represents a very small fraction of electricity use, so any growth will be a large relative change.',
    'Correct. Because transportation starts from a very small share in the table, even a modest absolute increase represents a large percentage growth \u2014 which is why a shift toward electric vehicles would be especially noteworthy.'
  ),
  buildRule(
    "Because the industrial sector's electricity use is declining rapidly.",
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The table provides only current shares; it does not show trends over time and gives no evidence that industrial electricity use is declining.'
  ),
  buildRule(
    'Because transportation is the only sector where electricity use is measured.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The table reports electricity use for multiple sectors, including Industrial, Residential, and Commercial \u2014 not just transportation.'
  ),

  // rla_info_graphics Q7: Highest test score
  buildRule(
    'Math',
    '"Math" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The table shows Math at 82, lower than Reading\u2019s 88, so Math is not the highest.'
  ),
  buildRule(
    'Reading',
    'Reading',
    'Correct. The table lists Reading at 88, which is the highest score among the four subjects shown.'
  ),
  buildRule(
    'Science',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. The Science score in the table is below Reading\u2019s 88, so it is not the highest.'
  ),
  buildRule(
    'Social Studies',
    '"Social Studies" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The Social Studies score in the table is lower than Reading\u2019s 88, so it is not the highest.'
  ),

  // rla_info_graphics Q10: Population trend
  buildRule(
    'The population is projected to decrease over time.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. The numbers in the table rise from 100,000 in 2020 to higher figures in later years, so the population is growing, not decreasing.'
  ),
  buildRule(
    'The population is projected to grow at a steady, constant rate.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The increase between successive years gets larger over time, indicating accelerating (not constant) growth.'
  ),
  buildRule(
    'The population is projected to grow at an accelerating rate.',
    'The population is projected to grow at an accelerating rate.',
    'Correct. Successive five-year increases in the table get larger over time (e.g., +10,000 then +15,000 then +20,000\u2026), which is the defining pattern of accelerating growth.'
  ),
  buildRule(
    'The population is projected to remain stable after 2030.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The table shows population values continuing to rise after 2030, not leveling off.'
  ),

  // rla_info_graphics Q14: Bar chart use
  buildRule(
    'Showing a trend over a continuous period of time.',
    '"Showing a trend over a continuous period of time." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Continuous trends over time are best displayed with line graphs; bar charts are better for comparing distinct categories.'
  ),
  buildRule(
    'Comparing distinct categories or groups.',
    'Comparing distinct categories or groups.',
    'Correct. Bar charts are designed to compare values across discrete categories \u2014 for example, sales by region or scores by subject \u2014 by lining up bars of differing heights.'
  ),
  buildRule(
    'Showing the parts of a whole or percentages.',
    '"Showing the parts of a whole or percentages." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Parts-of-a-whole relationships are best shown with pie charts (or stacked bars), not standard bar charts comparing categories side by side.'
  ),
  buildRule(
    'Displaying the exact location of geographical features.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. Geographical locations are shown on maps; bar charts cannot represent spatial position.'
  ),

  // rla_info_graphics Q15: Pie chart use
  buildRule(
    'Showing a trend over a continuous period of time.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. Pie charts capture proportions at a single point in time; trends over time are better shown with line graphs.'
  ),
  buildRule(
    'Comparing distinct categories or groups.',
    '"Comparing distinct categories or groups." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Direct category-to-category comparison is easier with bar charts; pie charts compare slices to the whole rather than to each other precisely.'
  ),
  buildRule(
    'Showing the parts of a whole or percentages.',
    'Showing the parts of a whole or percentages.',
    'Correct. Pie charts divide a circle into slices that visually represent each category\u2019s share of the total, making them ideal for showing how 100% of a quantity is distributed.'
  ),
  buildRule(
    'Displaying the exact location of geographical features.',
    '"Displaying the exact location of geographical features." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Geographical positions are shown on maps; pie charts represent proportions, not spatial locations.'
  ),
];
