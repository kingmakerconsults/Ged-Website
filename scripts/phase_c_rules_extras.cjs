const { buildRule } = require('./propagate_rationale_rewrites.cjs');

module.exports = [
  // ===== rla_info_structure_purpose extras =====

  // Q: intermittency
  buildRule(
    'The high cost of installation.',
    '"The high cost of installation." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The passage uses "intermittency" to describe inconsistent output, not cost; price is a separate concern discussed elsewhere in the passage.'
  ),
  buildRule(
    'The state of being inconsistent or not continuous.',
    'The state of being inconsistent or not continuous.',
    'Correct. In context, the passage uses "intermittency" to mean that solar and wind power generation cuts in and out depending on weather and time of day \u2014 i.e., it is not steady or continuous.'
  ),
  buildRule(
    'The potential harm to local wildlife.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Wildlife impacts are discussed separately as an environmental concern; "intermittency" specifically refers to the inconsistent nature of generation, not to ecological harm.'
  ),
  buildRule(
    'The requirement for large areas of land.',
    '"The requirement for large areas of land." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Land use is a different drawback the passage may mention; "intermittency" specifically denotes the on-and-off nature of solar and wind output.'
  ),

  // Q: primary environmental motivation
  buildRule(
    'To reduce the visual impact of power plants on landscapes.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The passage frames the transition as a response to climate change driven by greenhouse-gas emissions, not as an aesthetic concern about how power plants look.'
  ),
  buildRule(
    'To mitigate climate change caused by greenhouse gas emissions from fossil fuels.',
    'To mitigate climate change caused by greenhouse gas emissions from fossil fuels.',
    'Correct. The passage explicitly identifies greenhouse-gas-driven climate change as the central environmental cost of fossil fuels and the primary motivation for moving to renewables.'
  ),
  buildRule(
    'To prevent the disruption of fish migration caused by large dams.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. The passage discusses dam impacts as a downside of one renewable source (hydropower), not as a motivation for the transition itself.'
  ),
  buildRule(
    'To decrease reliance on foreign energy sources.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Energy independence is an economic/geopolitical motive; the passage frames the *environmental* motivation specifically in terms of reducing greenhouse-gas emissions.'
  ),

  // Q: difference between hydropower
  buildRule(
    'their cost-effectiveness.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. The passage does not present cost as the defining contrast between these technologies; it focuses on their reliability profiles.'
  ),
  buildRule(
    'their geographical limitations.',
    '"their geographical limitations." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. All four sources have geographic constraints (rivers, hot subsurface zones, sun, wind); the passage emphasizes consistency of output as the key differentiator, not location.'
  ),
  buildRule(
    'their level of reliability and consistency.',
    'their level of reliability and consistency.',
    'Correct. The passage portrays hydropower and geothermal as steady, on-demand sources, while solar and wind are intermittent \u2014 inconsistent and weather-dependent \u2014 making reliability the central contrast.'
  ),
  buildRule(
    'their impact on avian wildlife.',
    '"their impact on avian wildlife." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Bird strikes are mainly a wind-power concern, but the passage uses reliability/consistency \u2014 not wildlife impact \u2014 to draw the contrast between these sets of technologies.'
  ),

  // Q: smart grids
  buildRule(
    'To lower the cost of electricity for consumers by reducing waste.',
    '"To lower the cost of electricity for consumers by reducing waste." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Cost savings may be a side effect, but paragraph 5 frames smart grids as a tool for *managing* electricity flow from many varied sources, not as a price-cutting measure.'
  ),
  buildRule(
    'To generate more power from existing solar and wind farms.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. Smart grids do not generate electricity; they coordinate distribution. Increasing solar or wind output requires more or improved generating equipment, not grid software.'
  ),
  buildRule(
    'To better manage electricity distribution from varied and decentralized sources.',
    'To better manage electricity distribution from varied and decentralized sources.',
    'Correct. Paragraph 5 explains smart grids handle the unpredictable mix of inputs from rooftop solar, wind farms, batteries, and traditional plants by routing power dynamically across the network.'
  ),
  buildRule(
    'To provide tax incentives for homeowners to install their own solar panels.',
    '"To provide tax incentives for homeowners to install their own solar panels." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Tax incentives are a policy tool, separate from smart-grid infrastructure; the passage describes smart grids as technological systems for distributing power, not as financial programs.'
  ),

  // Q: structure the main body
  buildRule(
    'By chronologically detailing the invention of each renewable technology.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Paragraphs 2\u20134 are organized by *type* of energy (solar, wind, hydropower, etc.), not by the historical order in which each technology was invented.'
  ),
  buildRule(
    'By comparing and contrasting the economic cost of each energy source.',
    '"By comparing and contrasting the economic cost of each energy source." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The body paragraphs cover several aspects of each technology; cost is mentioned in passing but is not the organizing principle of paragraphs 2\u20134.'
  ),
  buildRule(
    'By dedicating separate paragraphs to different types of renewable energy, outlining their pros and cons.',
    'By dedicating separate paragraphs to different types of renewable energy, outlining their pros and cons.',
    'Correct. Each of paragraphs 2\u20134 focuses on a different renewable source (such as solar, wind, hydropower, geothermal) and discusses both the advantages and the limitations of that technology in turn.'
  ),
  buildRule(
    'By presenting a problem and then immediately offering a single, definitive solution.',
    '"By presenting a problem and then immediately offering a single, definitive so\u2026" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The passage presents the problem of fossil fuels but then surveys *several* renewable solutions, each with trade-offs, rather than naming one definitive answer.'
  ),

  // Q: accelerate the transition
  buildRule(
    'Increase subsidies for fossil fuel companies.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. Subsidizing fossil fuels would entrench the very source the passage identifies as the problem, slowing rather than accelerating the renewable transition.'
  ),
  buildRule(
    'Ban the construction of new dams for hydropower.',
    '"Ban the construction of new dams for hydropower." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The passage treats hydropower as part of the renewable mix; banning new dams would limit, not accelerate, the move away from fossil fuels.'
  ),
  buildRule(
    'Invest in battery technology and offer tax incentives for solar installations.',
    'Invest in battery technology and offer tax incentives for solar installations.',
    'Correct. The passage highlights better storage and supportive policy as the two main accelerators of the transition; investing in batteries (storage) and offering solar tax credits (policy) targets both directly.'
  ),
  buildRule(
    'Focus exclusively on geothermal energy regardless of geographic location.',
    '"Focus exclusively on geothermal energy regardless of geographic location." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Geothermal works only where geological conditions permit; the passage actually argues for a *diversified* renewable strategy, not single-source reliance.'
  ),

  // Q: photovoltaic cells
  buildRule(
    'Wind power generation.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Wind power uses turbines that convert kinetic energy of moving air into electricity \u2014 not photovoltaic cells, which convert sunlight directly to electricity.'
  ),
  buildRule(
    'Geothermal energy extraction.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. Geothermal energy uses heat from inside the Earth to drive steam turbines; it does not rely on photovoltaic cells.'
  ),
  buildRule(
    'Hydropower dams.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. Hydropower dams convert the kinetic energy of flowing water into electricity through turbines; photovoltaic cells are not part of that process.'
  ),
  buildRule(
    'Solar power generation.',
    'Solar power generation.',
    'Correct. Photovoltaic (PV) cells convert sunlight directly into electricity through the photovoltaic effect, which is the core technology behind solar panels described in the passage.'
  ),

  // Q: economic aspect
  buildRule(
    'The transition is primarily an economic burden with no financial benefits.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The passage discusses falling renewable costs and growing markets; it does not portray the transition as purely a burden but as a major economic shift with both costs and opportunities.'
  ),
  buildRule(
    'It involves significant technological and economic evolution.',
    'It involves significant technological and economic evolution.',
    'Correct. The passage describes new generation, storage, and grid technologies emerging together with shifting investment patterns and policy support \u2014 a combined technological and economic transformation.'
  ),
  buildRule(
    'All renewable technologies are still significantly more expensive than coal or natural gas.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The passage notes that the cost of solar and wind has fallen dramatically and is now competitive in many markets, contradicting a blanket "always more expensive" claim.'
  ),
  buildRule(
    'The only economic driver for renewables is government mandates.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The passage credits *both* policy support and improving technology/economics with driving renewables forward; mandates are not described as the sole economic driver.'
  ),

  // Q: large hydropower dams
  buildRule(
    'a negligible issue that has been resolved by modern technology.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The passage treats dam-related impacts as a real, ongoing limitation \u2014 not a problem already solved by technology.'
  ),
  buildRule(
    'a significant limitation that can alter ecosystems and displace people.',
    'a significant limitation that can alter ecosystems and displace people.',
    'Correct. The passage notes that large dams change river ecosystems, block fish migration, and can flood inhabited areas, forcing people to relocate \u2014 all serious drawbacks of hydropower.'
  ),
  buildRule(
    'a positive effect that creates new habitats for aquatic life.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The passage frames hydropower\u2019s ecological impact negatively (disruption and displacement); reservoirs may host some species, but that is not how the author characterizes the impact.'
  ),
  buildRule(
    'an unproven theory without sufficient evidence.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. The passage presents the negative environmental effects of large dams as well-established consequences, not as a speculative or unproven claim.'
  ),

  // Q: overall tone
  buildRule(
    'Pessimistic and critical.',
    '"Pessimistic and critical." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The passage acknowledges challenges but also points to genuine progress and viable solutions, so its overall stance is not strictly pessimistic.'
  ),
  buildRule(
    'Overly simplistic and biased.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The author surveys multiple technologies and discusses both pros and cons; the writing is balanced rather than one-sided or oversimplified.'
  ),
  buildRule(
    'Informative and cautiously optimistic.',
    'Informative and cautiously optimistic.',
    'Correct. The passage methodically describes each renewable source (informative) while suggesting that progress is real but tempered by remaining challenges \u2014 the hallmark of cautious optimism.'
  ),
  buildRule(
    'Sarcastic and dismissive.',
    '"Sarcastic and dismissive." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The author uses straightforward expository language and treats the topic seriously; nothing in the wording is sarcastic or dismissive.'
  ),

  // ===== ss_us_hist_new_nation extras =====

  // Q: Battle of Little Bighorn
  buildRule(
    'A decisive victory for the U.S. Army, leading to the immediate surrender of the Sioux.',
    'This is not the correct answer based on the information provided.',
    "Incorrect. The U.S. Army was defeated at Little Bighorn \u2014 Custer's 7th Cavalry was wiped out; the Sioux did not surrender as a result of this battle."
  ),
  buildRule(
    'A major victory for the Lakota, Cheyenne, and Arapaho tribes against the U.S. Army.',
    'A major victory for the Lakota, Cheyenne, and Arapaho tribes against the U.S. Army.',
    'Correct. Lakota, Cheyenne, and Arapaho warriors led by Sitting Bull and Crazy Horse overwhelmed Custer\u2019s detachment, killing him and roughly 268 of his men in one of the worst U.S. Army defeats of the Indian Wars.'
  ),
  buildRule(
    'A peace treaty that granted the Sioux permanent control of the Black Hills.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. The Black Hills had been guaranteed to the Sioux in the 1868 Fort Laramie Treaty, but after Little Bighorn the U.S. seized them; no permanent grant followed the battle.'
  ),
  buildRule(
    'A stalemate that resulted in a temporary truce.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. The battle was a clear tactical defeat for the U.S. Army, not a draw; the U.S. responded with intensified military campaigns, not a truce.'
  ),

  // Q: destruction of bison
  buildRule(
    'It had little impact, as they primarily relied on farming.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. Plains tribes such as the Lakota and Cheyenne were primarily nomadic hunters who depended on bison for food, clothing, shelter, and tools \u2014 not on farming.'
  ),
  buildRule(
    'It forced them to migrate to Canada.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. While some leaders like Sitting Bull briefly fled to Canada, mass northern migration was not the primary outcome; the dominant consequence was confinement on U.S. reservations.'
  ),
  buildRule(
    'It destroyed their traditional way of life and forced them onto reservations.',
    'It destroyed their traditional way of life and forced them onto reservations.',
    'Correct. Bison provided food, hides for clothing and shelter, and materials for nearly every aspect of Plains life; their near-extermination by hunters and the U.S. Army eliminated the resource base that made independent life possible, pushing tribes onto reservations.'
  ),
  buildRule(
    'It led to a shift from hunting to fishing.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. The Plains environment offers limited fishing resources; tribes did not transition from hunting bison to fishing as a substitute economy.'
  ),

  // Q: popular sovereignty
  buildRule(
    'That the President should have the power to decide the status of slavery in new territories.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Popular sovereignty placed the decision with the territory\u2019s settlers (a local-democracy approach), not with the executive branch.'
  ),
  buildRule(
    'That the settlers in a new territory should vote to decide whether to allow slavery.',
    'That the settlers in a new territory should vote to decide whether to allow slavery.',
    'Correct. Championed by Stephen Douglas and embodied in the Kansas-Nebraska Act (1854), popular sovereignty held that the white male settlers of a territory should vote on slavery, replacing earlier congressional limits like the Missouri Compromise.'
  ),
  buildRule(
    'That Congress should ban slavery in all new territories.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. That position belonged to the Wilmot Proviso and the Republican Party; popular sovereignty was offered as an alternative that *removed* Congress from the decision.'
  ),
  buildRule(
    'That Native American tribes should have the final say on the status of slavery.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. Native tribes were excluded from the U.S. political system at the time; popular sovereignty referred specifically to the votes of white male settlers in territorial governments.'
  ),

  // Q: barbed wire (1870s invention)
  buildRule(
    'The steel plow',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. John Deere\u2019s steel plow (1830s) made breaking the prairie sod easier but did not provide a way to fence off open rangeland.'
  ),
  buildRule(
    'The windmill',
    '"The windmill" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Windmills helped pump scarce groundwater on the Plains, supporting settlement, but they did not enclose pastures or end the open range.'
  ),
  buildRule(
    'Barbed wire',
    'Barbed wire',
    'Correct. Joseph Glidden\u2019s patent for barbed wire (1874) made cheap, effective fencing possible across the treeless Plains, allowing ranchers and farmers to enclose land and ending the era of open-range grazing and long cattle drives.'
  ),
  buildRule(
    'The railroad',
    '"The railroad" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Railroads actually enabled the long cattle drives by carrying cattle east from railhead towns; they did not fence off ranchland.'
  ),

  // Q: Dawes Act 1887
  buildRule(
    'To strengthen tribal governments and preserve Native American culture.',
    '"To strengthen tribal governments and preserve Native American culture." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The Dawes Act did the opposite: it broke up communal tribal landholdings into individual allotments, deliberately undermining tribal governance and traditional culture.'
  ),
  buildRule(
    'To encourage Native Americans to assimilate by turning them into individual farmers.',
    'To encourage Native Americans to assimilate by turning them into individual farmers.',
    'Correct. The Dawes Act of 1887 divided reservation land into 160-acre allotments held by individual Native households, with the explicit goal of pressuring tribes to abandon communal life and adopt yeoman-farmer assimilation.'
  ),
  buildRule(
    'To create new, larger reservations for Native American tribes.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. The Dawes Act actually shrank Native landholdings dramatically: "surplus" land remaining after allotments was sold to white settlers, costing tribes roughly two-thirds of their reservation lands.'
  ),
  buildRule(
    'To grant immediate U.S. citizenship to all Native Americans.',
    '"To grant immediate U.S. citizenship to all Native Americans." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The Dawes Act offered citizenship only to those who accepted allotments and adopted assimilated lifestyles; universal citizenship for Native Americans came later, with the Indian Citizenship Act of 1924.'
  ),

  // Q: Wounded Knee 1890
  buildRule(
    'A successful peace treaty was signed between the U.S. government and the Lakota.',
    '"A successful peace treaty was signed between the U.S. government and the Lakota." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Wounded Knee was a massacre of disarmed Lakota by U.S. troops, not a treaty; it ended the era of large-scale armed Native resistance, but no peace agreement was signed there.'
  ),
  buildRule(
    'A battle in which Native American warriors defeated a U.S. Army regiment.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. That description fits Little Bighorn (1876), not Wounded Knee. At Wounded Knee, U.S. cavalry inflicted heavy casualties on Lakota men, women, and children.'
  ),
  buildRule(
    'The U.S. Army killed approximately 300 Lakota men, women, and children.',
    'The U.S. Army killed approximately 300 Lakota men, women, and children.',
    'Correct. On December 29, 1890, the U.S. 7th Cavalry surrounded a Lakota encampment near Wounded Knee Creek; an attempt to disarm the group erupted in gunfire, leaving roughly 250\u2013300 Lakota dead, most of them noncombatants.'
  ),
  buildRule(
    'A Ghost Dance ceremony that led to a spiritual revival.',
    '"A Ghost Dance ceremony that led to a spiritual revival." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The Ghost Dance movement preceded and helped trigger the events at Wounded Knee, but the conflict itself was a violent massacre, not a spiritual ceremony.'
  ),

  // Q: Frontier Thesis
  buildRule(
    'It was a source of conflict that weakened the nation.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. Turner argued the frontier *strengthened* American character through self-reliance and democratic experience; conflict was part of the story, but the overall thesis was positive about the frontier\u2019s national role.'
  ),
  buildRule(
    'It was a defining force that shaped American character and institutions.',
    'It was a defining force that shaped American character and institutions.',
    'Correct. In his 1893 essay, Turner argued that successive frontiers fostered individualism, democratic practices, and innovation, and that this experience uniquely shaped American identity \u2014 the very heart of the Frontier Thesis.'
  ),
  buildRule(
    'It was a barrier to economic growth and progress.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. Turner viewed the frontier as an *engine* of growth that absorbed energy and ambition, opening land and opportunity, not as an obstacle to development.'
  ),
  buildRule(
    'It had little to no impact on American culture.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Turner\u2019s entire argument was that the frontier was *the* defining cultural influence on the United States, so claiming negligible impact directly contradicts the thesis.'
  ),

  // Q: Gadsden Purchase
  buildRule(
    'To acquire land for a southern transcontinental railroad route.',
    'To acquire land for a southern transcontinental railroad route.',
    'Correct. The 1854 Gadsden Purchase added roughly 30,000 square miles in present-day southern Arizona and New Mexico, providing the relatively flat terrain needed for a southern transcontinental railroad route.'
  ),
  buildRule(
    'To gain access to new gold mines.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The land had limited mineral importance at the time; the deal\u2019s purpose was the favorable rail corridor, not access to a known goldfield.'
  ),
  buildRule(
    'To create a buffer zone between the two countries.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. The purchase moved the U.S.\u2013Mexico border *southward* and integrated the strip into the United States; it did not create an unsettled buffer between the nations.'
  ),
  buildRule(
    'To settle a border dispute over the state of Texas.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The Texas border had already been settled by the Treaty of Guadalupe Hidalgo in 1848; the Gadsden Purchase concerned a different strip of territory farther west.'
  ),
];
