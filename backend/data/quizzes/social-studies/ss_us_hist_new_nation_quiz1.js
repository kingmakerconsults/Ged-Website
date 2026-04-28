/**
 * A New Nation: Quiz 1
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    challenge_tags: ['social-3', 'science-5'],
    type: 'text',
    passage:
      "Following the Revolutionary War, the newly independent states adopted the Articles of Confederation as their first national government. The Articles created a weak central government, reflecting the states' fear of a strong, centralized authority like the British monarchy. Under the Articles, the national Congress had no power to tax, raise a national army, or regulate interstate commerce. These weaknesses quickly became apparent, leading to events like Shays' Rebellion.",
    question:
      'The primary weakness of the government formed by the Articles of Confederation was that it...',
    answerOptions: [
      {
        text: 'gave too much power to the executive branch.',
        rationale:
          'There was no strong executive branch under the Articles; power was concentrated in a weak Congress.',
        isCorrect: false,
      },
      {
        text: 'lacked the authority to effectively govern and manage the nation.',
        rationale:
          "Correct. The inability to tax, raise an army, or regulate trade meant the central government was too weak to manage the nation's finances, defense, or economy, leading to instability.",
        isCorrect: true,
      },
      {
        text: 'favored the larger states over the smaller states.',
        rationale:
          "This was a key debate during the Constitutional Convention. Under the Articles, each state had one vote, which was a point of contention but not the primary weakness of the government's overall power.",
        isCorrect: false,
      },
      {
        text: 'created a judicial system that frequently overruled state laws.',
        rationale:
          'There was no national judicial system under the Articles of Confederation.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    challenge_tags: ['social-3'],
    type: 'knowledge',
    question:
      'What event highlighted the weaknesses of the Articles of Confederation and convinced many national leaders that a stronger central government was needed?',
    answerOptions: [
      {
        text: 'The Boston Tea Party',
        rationale:
          'The Boston Tea Party occurred before the Articles were written and was a protest against British rule.',
        isCorrect: false,
      },
      {
        text: "Shays' Rebellion",
        rationale:
          "Correct. Shays' Rebellion, an uprising of debt-ridden farmers in Massachusetts, could not be effectively put down by the weak national government, alarming leaders and demonstrating the need for a stronger federal authority.",
        isCorrect: true,
      },
      {
        text: 'The Whiskey Rebellion',
        rationale:
          'The Whiskey Rebellion occurred after the Constitution was ratified and was suppressed by the new, stronger federal government.',
        isCorrect: false,
      },
      {
        text: 'The Battle of Yorktown',
        rationale:
          'This was the final major battle of the Revolution, which occurred before the full weaknesses of the Articles became apparent.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    challenge_tags: ['social-1'],
    type: 'text',
    passage:
      'The Constitutional Convention of 1787 was called to address the problems of the Articles of Confederation. A major point of contention was representation in Congress. The Virginia Plan, favored by large states, proposed representation based on population. The New Jersey Plan, favored by small states, proposed equal representation for all states. The dispute was resolved by the Great Compromise (or Connecticut Compromise), which created a bicameral (two-house) legislature.',
    question:
      'How did the Great Compromise resolve the debate over representation?',
    answerOptions: [
      {
        text: 'It created a single legislative house with representation based on population.',
        rationale:
          'This describes the Virginia Plan, which was not adopted in its entirety.',
        isCorrect: false,
      },
      {
        text: 'It established a system where all states had equal representation in a single house.',
        rationale:
          'This describes the New Jersey Plan, which was also not adopted in its entirety.',
        isCorrect: false,
      },
      {
        text: 'It created a two-house Congress, with one house based on population (House of Representatives) and the other with equal representation (Senate).',
        rationale:
          'Correct. This accurately describes the bicameral solution of the Great Compromise, which balanced the interests of both large and small states.',
        isCorrect: true,
      },
      {
        text: 'It allowed states to choose whether their representation would be equal or based on population.',
        rationale:
          'The compromise established a uniform system for all states, not a choice.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'knowledge',
    question:
      'The Three-Fifths Compromise, reached during the Constitutional Convention, concerned which of the following issues?',
    answerOptions: [
      {
        text: 'The number of votes required to pass a law.',
        rationale:
          'This was determined by the rules of Congress, not the Three-Fifths Compromise.',
        isCorrect: false,
      },
      {
        text: 'How to count enslaved people for the purposes of representation and taxation.',
        rationale:
          "Correct. The compromise determined that three-fifths of the enslaved population would be counted when determining a state's population for representation in the House and for levying federal taxes.",
        isCorrect: true,
      },
      {
        text: 'The process for admitting new states to the Union.',
        rationale:
          'This process was outlined in the Constitution but was not part of the Three-Fifths Compromise.',
        isCorrect: false,
      },
      {
        text: 'The balance of power between the federal government and the states.',
        rationale:
          'This was a broader theme of the convention, addressed by federalism, not this specific compromise.',
        isCorrect: false,
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 5,
    challenge_tags: ['social-1'],
    type: 'text',
    passage:
      'To prevent any one branch of the new government from becoming too powerful, the framers of the Constitution created a system of checks and balances. For example, the President (Executive Branch) can veto laws passed by Congress (Legislative Branch). Congress can impeach and remove the President. The Supreme Court (Judicial Branch) can declare laws unconstitutional, a power known as judicial review.',
    question:
      'Which of the following is an example of the system of checks and balances?',
    answerOptions: [
      {
        text: 'The President issuing an executive order.',
        rationale:
          'This is a power of the executive branch, but not in itself an example of checking another branch.',
        isCorrect: false,
      },
      {
        text: 'The Senate confirming a presidential appointment to the Supreme Court.',
        rationale:
          'Correct. This is an example of the Legislative Branch (Senate) checking the power of the Executive Branch (President) to appoint judges.',
        isCorrect: true,
      },
      {
        text: 'A state government passing a law about local schools.',
        rationale:
          'This is an example of federalism, the division of power between state and national governments, not checks and balances between federal branches.',
        isCorrect: false,
      },
      {
        text: 'A citizen voting in a presidential election.',
        rationale:
          'This is an example of popular sovereignty, not the system of checks and balances between the branches of government.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    challenge_tags: ['social-3'],
    type: 'text',
    passage:
      "Manifest Destiny was a widely held cultural belief in the 19th-century United States that American settlers were destined to expand across North America. This idea was used to justify westward expansion, the removal of Native American tribes, and the war with Mexico. Proponents argued that it was not only the nation's destiny but its duty to spread democracy and Protestant Christianity across the continent.",
    question: 'What was the core idea of Manifest Destiny?',
    answerOptions: [
      {
        text: 'That the United States should limit its territory to the original thirteen colonies.',
        isCorrect: false,
        rationale:
          'Incorrect. Manifest Destiny was an expansionist doctrine, not an isolationist one; its central claim was that the U.S. should grow far beyond the original thirteen colonies.',
      },
      {
        text: 'That American settlers were destined to expand across the continent, spreading their institutions with them.',
        isCorrect: true,
        rationale:
          'Correct. As the passage explains, Manifest Destiny held that Americans were destined — even duty-bound — to spread across North America and carry democracy and Protestant Christianity with them.',
      },
      {
        text: 'That the United States should form a military alliance with Mexico.',
        isCorrect: false,
        rationale:
          'Incorrect. Manifest Destiny justified war with Mexico (not alliance with it) in order to seize western lands; it never advocated a U.S.–Mexican military partnership.',
      },
      {
        text: 'That Native American tribes should be given full citizenship.',
        isCorrect: false,
        rationale:
          'Incorrect. Manifest Destiny was used to justify the removal of Native American tribes from their lands, not to extend citizenship to them.',
      },
    ],
  },
  {
    questionNumber: 7,
    challenge_tags: ['social-3'],
    type: 'knowledge',
    question:
      'Which of the following events, completed in 1869, was a major catalyst for westward expansion by making travel and trade across the continent significantly faster and cheaper?',
    answerOptions: [
      {
        text: 'The Lewis and Clark Expedition',
        isCorrect: false,
        rationale:
          'Incorrect. The Lewis and Clark Expedition occurred from 1804 to 1806 to explore the Louisiana Purchase — over 60 years before 1869 — and did not provide rapid coast-to-coast travel.',
      },
      {
        text: 'The construction of the Transcontinental Railroad',
        isCorrect: true,
        rationale:
          'Correct. Completed at Promontory Summit, Utah in 1869, the Transcontinental Railroad linked the eastern rail network with the Pacific coast, dramatically cutting the cost and time of transcontinental travel and trade.',
      },
      {
        text: 'The California Gold Rush',
        isCorrect: false,
        rationale:
          'Incorrect. The California Gold Rush peaked around 1848–1855 and drew migrants westward, but it did not build the transportation infrastructure described, and it predates 1869.',
      },
      {
        text: 'The passage of the Homestead Act',
        isCorrect: false,
        rationale:
          'Incorrect. The Homestead Act was passed in 1862 and offered free land to settlers; it did not, by itself, provide the faster cross-country travel and trade described in the question.',
      },
    ],
  },
  {
    questionNumber: 8,
    challenge_tags: ['social-1'],
    type: 'text',
    passage:
      "The Homestead Act of 1862 was a pivotal piece of legislation that encouraged westward migration. It allowed any adult citizen, or intended citizen, who had never borne arms against the U.S. government to claim 160 acres of surveyed government land. Claimants were required to 'improve' the plot by building a dwelling and cultivating the land for five years before receiving full ownership.",
    question: 'What was the main purpose of the Homestead Act of 1862?',
    answerOptions: [
      {
        text: 'To create national parks and preserve wilderness.',
        isCorrect: false,
        rationale:
          'Incorrect. The Homestead Act distributed government land for cultivation and settlement; the federal national-park system began later, with Yellowstone in 1872.',
      },
      {
        text: 'To sell government land to railroad companies.',
        isCorrect: false,
        rationale:
          'Incorrect. Land grants to railroads were made under separate Pacific Railroad Acts; the Homestead Act specifically gave 160-acre plots to individual settlers, not corporations.',
      },
      {
        text: 'To encourage the settlement of the American West by individual farmers.',
        isCorrect: true,
        rationale:
          'Correct. The Act gave any qualifying adult citizen up to 160 acres of public land in exchange for building a home and farming it for five years, directly promoting individual western settlement.',
      },
      {
        text: 'To establish large, government-owned farms.',
        isCorrect: false,
        rationale:
          'Incorrect. The Homestead Act transferred land out of government ownership into private hands of individual settlers, not into large state-run farms.',
      },
    ],
  },
  {
    questionNumber: 9,
    type: 'knowledge',
    question:
      'The forced removal of the Cherokee Nation from their ancestral lands in the southeastern United States to territory in present-day Oklahoma is known as the:',
    answerOptions: [
      {
        text: 'The Oregon Trail',
        isCorrect: false,
        rationale:
          'Incorrect. The Oregon Trail was a voluntary overland route used by settlers heading west; it was not the forced relocation of the Cherokee from the Southeast.',
      },
      {
        text: 'The Trail of Tears',
        isCorrect: true,
        rationale:
          'Correct. Following the Indian Removal Act of 1830, the U.S. government forcibly relocated the Cherokee and other tribes to Indian Territory (now Oklahoma); thousands died on the journey, which became known as the Trail of Tears.',
      },
      {
        text: 'The Great Migration',
        isCorrect: false,
        rationale:
          'Incorrect. The Great Migration refers to the early-20th-century movement of African Americans from the rural South to northern cities, not the forced removal of the Cherokee in the 1830s.',
      },
      {
        text: 'The Santa Fe Trail',
        isCorrect: false,
        rationale:
          'Incorrect. The Santa Fe Trail was a 19th-century commercial trade route between Missouri and New Mexico; it had nothing to do with the forced removal of the Cherokee Nation.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 10,
    type: 'text',
    passage:
      "The California Gold Rush began in 1848 after gold was discovered at Sutter's Mill. The news of gold brought some 300,000 people to California from the rest of the United States and abroad. This massive influx of 'forty-niners' dramatically increased California's population, leading to its rapid statehood in 1850 and fueling economic growth and westward expansion.",
    question: 'What was a major consequence of the California Gold Rush?',
    answerOptions: [
      {
        text: "A rapid increase in California's population and its admission to the Union as a state.",
        isCorrect: true,
        rationale:
          "Correct. As the passage notes, roughly 300,000 'forty-niners' poured into California after gold was discovered in 1848, swelling the population enough that California was admitted to the Union as a state in 1850.",
      },
      {
        text: 'A war between the United States and Mexico.',
        isCorrect: false,
        rationale:
          "Incorrect. The Mexican-American War (1846–1848) ended just before gold was discovered at Sutter's Mill; the Gold Rush was a consequence of that war's territorial transfer, not a cause of war.",
      },
      {
        text: 'The discovery of a water route to the Pacific Ocean.',
        isCorrect: false,
        rationale:
          'Incorrect. No new water route to the Pacific was discovered during the Gold Rush; migrants reached California overland or by sea around South America.',
      },
      {
        text: 'A decline in the value of gold.',
        isCorrect: false,
        rationale:
          "Incorrect. Although large quantities of gold entered circulation, the major consequences described in the passage were demographic and political (population growth and statehood), not a collapse in gold's value.",
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 11,
    challenge_tags: ['social-3'],
    type: 'knowledge',
    question:
      'The Oregon Trail was a major overland route for westward migration in the 19th century. What was the primary motivation for most pioneers who traveled the Oregon Trail?',
    answerOptions: [
      {
        text: 'To find gold and become rich.',
        isCorrect: false,
        rationale:
          'Incorrect. Gold-seekers used the California Trail to reach the gold fields; pioneers on the Oregon Trail were primarily heading to the fertile Willamette Valley to farm.',
      },
      {
        text: 'To establish new trade routes with Asia.',
        isCorrect: false,
        rationale:
          'Incorrect. The Oregon Trail was a wagon route across the continent for settlers; trans-Pacific trade with Asia was conducted by ship, not by overland pioneers.',
      },
      {
        text: 'To acquire fertile farmland and start new lives in the West.',
        isCorrect: true,
        rationale:
          'Correct. Most Oregon Trail pioneers were drawn by reports of rich farmland in the Pacific Northwest and the chance to claim cheap or free land for homesteads.',
      },
      {
        text: 'To escape religious persecution in the East.',
        isCorrect: false,
        rationale:
          "Incorrect. Some religious groups (notably the Mormons) migrated west, but they used the Mormon Trail to Utah; the typical Oregon Trail pioneer's primary motive was farmland, not religious refuge.",
      },
    ],
  },
  {
    questionNumber: 12,
    challenge_tags: ['social-3'],
    type: 'text',
    passage:
      'The Mexican-American War (1846-1848) was a conflict between the United States and Mexico, primarily over the U.S. annexation of Texas. The war ended with the Treaty of Guadalupe Hidalgo, in which Mexico ceded a vast territory, known as the Mexican Cession, to the United States. This territory included present-day California, Nevada, Utah, and parts of several other states.',
    question: 'What was a major outcome of the Mexican-American War?',
    answerOptions: [
      {
        text: 'The United States lost territory to Mexico.',
        isCorrect: false,
        rationale:
          'Incorrect. The opposite occurred: under the Treaty of Guadalupe Hidalgo, Mexico ceded the Mexican Cession to the United States, not the other way around.',
      },
      {
        text: 'The United States acquired a vast amount of territory, significantly expanding its borders.',
        isCorrect: true,
        rationale:
          'Correct. The Treaty of Guadalupe Hidalgo (1848) transferred a huge area — including modern California, Nevada, Utah, and parts of several other states — to the United States, dramatically enlarging the country.',
      },
      {
        text: 'Mexico and the United States formed a permanent military alliance.',
        isCorrect: false,
        rationale:
          'Incorrect. The war ended with a peace treaty and a territorial cession, not a military alliance; the two nations remained separate sovereign states.',
      },
      {
        text: 'The issue of slavery in the new territories was permanently resolved.',
        isCorrect: false,
        rationale:
          'Incorrect. Whether slavery would be allowed in the newly acquired lands became one of the most divisive issues of the 1850s, leading to the Compromise of 1850 and ultimately the Civil War.',
      },
    ],
  },
];
