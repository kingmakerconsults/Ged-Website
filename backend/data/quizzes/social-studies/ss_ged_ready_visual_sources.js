/**
 * GED Ready-Style Visual Sources — Image-Based Questions
 * Modeled after GED Ready® Social Studies exam format:
 *   - Political cartoons, historical maps, charts, and primary-source photos
 *   - All images sourced from existing /images/Social Studies/ assets
 *   - Stems use inference, symbolism, and source-analysis skills
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'image',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/join_or_die_0001.png',
    imageAlt:
      "Newspaper masthead from 1774 reproducing Benjamin Franklin's segmented snake 'Join, or Die' woodcut.",
    question:
      "On the eve of the American Revolution, newspapers reprinted Benjamin Franklin's 1754 'Join, or Die' image (originally created during the French and Indian War). What did the segmented snake most strongly suggest to colonial readers in the 1770s?",
    answerOptions: [
      {
        text: 'Each colony should declare independence separately to avoid drawing British attention.',
        rationale:
          "The image's message is the opposite of acting separately — a snake cut into pieces dies; only by joining together do the parts survive.",
        isCorrect: false,
      },
      {
        text: 'The colonies must unite or risk being defeated one at a time by Great Britain.',
        rationale:
          "Correct. The visual logic of a sectioned snake conveys that the colonies, like the snake's segments, would die divided. Reprinting the image in 1774 urged colonial unity in the face of British policies leading toward conflict.",
        isCorrect: true,
      },
      {
        text: 'Native American tribes should join the British against the colonies.',
        rationale:
          'The cartoon is addressed to the colonies (its segments are labeled with colony abbreviations), not Native American nations, and was reprinted by colonial Patriots, not the British.',
        isCorrect: false,
      },
      {
        text: 'France would soon invade the colonies and divide them among European powers.',
        rationale:
          'The image makes no reference to France or to a European partition. It is a call for internal colonial unity.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'image',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/american_civil_war_0006.jpg',
    imageAlt:
      "1861 political cartoon map titled 'Scott's Great Snake' showing the Union's Anaconda Plan as a snake constricting the Confederate states.",
    question:
      "In this 1861 cartoon map, a large snake labeled with the Union's strategy is shown wrapping around the Confederate states. The cartoon is most often used to illustrate which Civil War strategy?",
    answerOptions: [
      {
        text: 'A frontal land invasion of Richmond from Washington, D.C.',
        rationale:
          'A direct land assault on Richmond would be shown as a single arrow or column, not as a snake constricting the entire Confederacy along its rivers and coastline.',
        isCorrect: false,
      },
      {
        text: 'The Anaconda Plan — a Union naval blockade and control of the Mississippi River to slowly squeeze the Confederate economy.',
        rationale:
          'Correct. The snake wrapping around the Confederate coastline and reaching down the Mississippi River visualizes the Anaconda Plan: blockade Confederate ports, take control of the Mississippi, and gradually cut off Southern supplies.',
        isCorrect: true,
      },
      {
        text: "Sherman's March to the Sea through Georgia in 1864.",
        rationale:
          "Sherman's March was a single overland campaign in 1864, three years after this 1861 cartoon, and would be drawn as a path across Georgia rather than a snake encircling the whole South.",
        isCorrect: false,
      },
      {
        text: 'A peaceful negotiation that returned the Confederate states without military action.',
        rationale:
          'The image of a giant snake crushing the Confederacy depicts coercive military and economic pressure, not peaceful negotiation.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'image',
    difficulty: 'hard',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/puck_magazine_0001.png',
    imageAlt:
      "Puck magazine political cartoon depicting demons with labels such as 'Scandal' and 'Garbled News' pouring out of a printing press portrayed as a monster.",
    question:
      'In this cartoon from <em>Puck</em> magazine, a printing press is drawn as a monster, and demon-like figures labeled with words such as "Scandal" and "Garbled News" pour out from it. What is the cartoonist most likely arguing?',
    answerOptions: [
      {
        text: 'New printing technology will end public access to news.',
        rationale:
          'The cartoon shows the press producing massive amounts of content (demons pouring out), not stopping production or access.',
        isCorrect: false,
      },
      {
        text: 'The popular press is producing harmful content — sensationalism, scandal, and distorted news — and damaging the public.',
        rationale:
          "Correct. By drawing the printing press as a monster and the products as demons labeled with words like 'Scandal' and 'Garbled News,' the cartoonist criticizes the press for producing destructive, harmful content rather than honest reporting.",
        isCorrect: true,
      },
      {
        text: 'The government should take direct control of all newspapers.',
        rationale:
          'The cartoon criticizes the content of the press but offers no specific policy proposal, especially not government takeover of newspapers.',
        isCorrect: false,
      },
      {
        text: 'Newspapers are too expensive for ordinary readers to afford.',
        rationale:
          'The cartoon is about the kind of content being printed, not the price of newspapers.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'image',
    difficulty: 'hard',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/puck_magazine_0003.png',
    imageAlt:
      'Puck magazine cartoon showing Theodore Roosevelt depicted as the infant Hercules strangling serpents that represent Standard Oil and corporate trusts.',
    question:
      'In this Progressive Era cartoon, Theodore Roosevelt is drawn as the infant Hercules strangling serpents that represent giant corporate trusts (most notably Standard Oil). Which government effort is the cartoonist most directly praising?',
    answerOptions: [
      {
        text: 'The expansion of segregation laws across the South.',
        rationale:
          'Segregation laws have nothing to do with Roosevelt strangling serpents that symbolize corporate trusts. The cartoon is about economic regulation, not race policy.',
        isCorrect: false,
      },
      {
        text: 'Federal antitrust action to break up monopolies and limit corporate power.',
        rationale:
          "Correct. Drawing Roosevelt as Hercules defeating serpents labeled as monopolies celebrates his administration's antitrust enforcement, including the famous suit against Standard Oil. The image presents trust-busting as a heroic public service.",
        isCorrect: true,
      },
      {
        text: 'The strengthening of state militias against labor strikes.',
        rationale:
          "The cartoon's targets are the trusts (the serpents), not labor unions. There is no imagery of strikes or militias.",
        isCorrect: false,
      },
      {
        text: 'Cutting all federal taxes on large corporations.',
        rationale:
          "Cutting corporate taxes would empower the trusts, not strangle them. That contradicts the cartoon's heroic framing of Roosevelt's action.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'image',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/clifford_k_berryman_0001.png',
    imageAlt:
      "Berryman political cartoon from 1939 depicting Adolf Hitler as a groom and Joseph Stalin in a wedding dress, with the caption 'Wonder how long the honeymoon will last?'",
    question:
      'In this 1939 Berryman cartoon, Hitler is drawn as a groom and Stalin is drawn as a bride, and the caption reads "Wonder how long the honeymoon will last?" To which historical event is the cartoon most directly responding?',
    answerOptions: [
      {
        text: 'The signing of the Treaty of Versailles ending World War I.',
        rationale:
          'The Treaty of Versailles was signed in 1919 and dealt with the end of World War I, not a Hitler–Stalin agreement two decades later.',
        isCorrect: false,
      },
      {
        text: 'The Nazi–Soviet (Molotov–Ribbentrop) Non-Aggression Pact of August 1939.',
        rationale:
          "Correct. The cartoon depicts Hitler and Stalin as newlyweds in 1939 to satirize the surprise non-aggression pact between Nazi Germany and the Soviet Union. The 'honeymoon' caption foreshadows that the alliance would not last — and indeed Germany invaded the USSR in 1941.",
        isCorrect: true,
      },
      {
        text: 'The 1945 Yalta Conference between the Allied powers.',
        rationale:
          'Yalta was a 1945 wartime meeting of the U.S., U.K., and Soviet Union — six years after this 1939 cartoon and not involving Hitler at all.',
        isCorrect: false,
      },
      {
        text: 'The 1948 Berlin Airlift.',
        rationale:
          'The Berlin Airlift was a Cold War event in 1948–49 between the Western Allies and the Soviet Union, with no Nazi involvement.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'image',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/political_cartoon_0001.jpg',
    imageAlt:
      'Reconstruction-era political cartoon showing Abraham Lincoln and Andrew Johnson sewing together a torn map of the United States.',
    question:
      'In this Reconstruction-era cartoon, Lincoln and Johnson are shown sewing together a torn map of the United States. What political message does the imagery most strongly convey?',
    answerOptions: [
      {
        text: 'Reuniting the country after the Civil War would be a deliberate, hands-on repair job rather than an automatic return to pre-war unity.',
        rationale:
          'Correct. Drawing the country as a torn map being stitched back together by the president and vice president presents reunion as careful, intentional work — exactly how Reconstruction was understood politically.',
        isCorrect: true,
      },
      {
        text: 'The Confederacy should be permanently allowed to remain a separate country.',
        rationale:
          'The whole point of stitching the map back together is to restore the Union, the opposite of permanent separation.',
        isCorrect: false,
      },
      {
        text: 'Lincoln and Johnson favored military rule indefinitely over the entire country.',
        rationale:
          'Sewing tools and a domestic repair scene do not represent military occupation. The cartoon emphasizes mending, not coercion.',
        isCorrect: false,
      },
      {
        text: 'Reconstruction would only require repairing damaged buildings, not political institutions.',
        rationale:
          'The torn map is a political symbol of the divided Union — it is about national political reunion, not literal property damage.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'image',
    difficulty: 'medium',
    topic: 'Geography',
    contentArea: 'visual_sources',
    imageUrl:
      '/images/Social%20Studies/a_map_of_the_triangular_trade_routes_0001.jpg',
    imageAlt:
      'Map of the transatlantic triangular trade routes connecting Europe, West Africa, and the Americas, with an inset pie chart showing African regional shares of enslaved people taken to North America.',
    question:
      'Based on this map of the triangular trade, which statement about transatlantic trade in the 1600s and 1700s is best supported?',
    answerOptions: [
      {
        text: 'Three continents — Europe, Africa, and the Americas — were linked by a system of trade that included the forced movement of enslaved Africans to the Americas.',
        rationale:
          "Correct. The map's routes connect Europe, West Africa, and the Americas in a triangular pattern, with arrows showing forced movement of enslaved people from Africa to the Americas — the defining feature of the transatlantic slave trade.",
        isCorrect: true,
      },
      {
        text: 'The trade involved only Europe and the Americas, with no African role.',
        rationale:
          'The map prominently features Africa as one of the three corners of the triangle, and the inset pie chart shows the African regional sources of enslaved people.',
        isCorrect: false,
      },
      {
        text: 'Most enslaved Africans were transported eastward to Asia.',
        rationale:
          'The arrows on the map run westward from West Africa to the Americas (the Middle Passage), not eastward to Asia.',
        isCorrect: false,
      },
      {
        text: 'European powers had no presence in the Americas during this trade.',
        rationale:
          "The map's legend identifies European empires controlling colonial areas in the Americas — exactly the source of demand that drove the trade.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'image',
    difficulty: 'easy',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/a_new_nation_quiz_2_0001.png',
    imageAlt:
      'Map of North America with a large central region highlighted in white, representing the territory acquired in the Louisiana Purchase, with St. Louis and New Orleans labeled.',
    question:
      'On this map, the highlighted central region of North America (with St. Louis and New Orleans on its eastern edge) represents which major U.S. land acquisition?',
    answerOptions: [
      {
        text: 'The Louisiana Purchase from France in 1803.',
        rationale:
          'Correct. The highlighted area covers the vast territory between the Mississippi River and the Rocky Mountains, with St. Louis and New Orleans on its eastern edge — the boundaries of the Louisiana Purchase that Thomas Jefferson acquired from France in 1803.',
        isCorrect: true,
      },
      {
        text: 'The Mexican Cession after the Mexican-American War.',
        rationale:
          'The Mexican Cession covered the present-day Southwest (California, Nevada, Utah, most of Arizona/New Mexico), not the central plains shown on this map.',
        isCorrect: false,
      },
      {
        text: 'The original thirteen colonies along the Atlantic coast.',
        rationale:
          'The original thirteen colonies were on the East Coast, not in the interior region highlighted here.',
        isCorrect: false,
      },
      {
        text: 'The Alaska Purchase from Russia in 1867.',
        rationale:
          'Alaska is in the far northwest of North America, not the central region highlighted on this map.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 9,
    type: 'image',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'visual_sources',
    imageUrl: '/images/Social%20Studies/civil_rights_act_of_1964_0001.png',
    imageAlt:
      'Color-coded U.S. map showing 1964 Senate votes on the Civil Rights Act, with Yea, Nay, and Split states distinguished by color.',
    question:
      "This map color-codes how each state's U.S. senators voted on the Civil Rights Act of 1964. Which regional pattern is most strongly visible on the map?",
    answerOptions: [
      {
        text: 'Opposition was concentrated among states of the Deep South, while most other regions showed strong support.',
        rationale:
          'Correct. The map shows Nay and Split votes clustered tightly across Deep South states (former Confederate states), while the Northeast, Midwest, and Mountain West appear largely Yea — exactly the regional pattern documented in the historical Senate roll call.',
        isCorrect: true,
      },
      {
        text: 'Opposition was concentrated among states in the Northeast.',
        rationale:
          'The Northeast appears largely supportive on the map. Opposition was concentrated in the South.',
        isCorrect: false,
      },
      {
        text: 'Every state in the country voted unanimously in favor.',
        rationale:
          'The presence of Nay and Split colors on the map shows that the vote was clearly not unanimous.',
        isCorrect: false,
      },
      {
        text: 'Opposition was randomly distributed with no regional pattern.',
        rationale:
          'The Nay/Split cluster across the Deep South is precisely a regional pattern, not a random distribution.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 10,
    type: 'image',
    difficulty: 'medium',
    topic: 'Economics',
    contentArea: 'visual_sources',
    imageUrl:
      '/images/Social%20Studies/this_question_is_based_on_the_following_graph_0001.png',
    imageAlt:
      'Pie chart titled "IRS Receipts" showing the percentage shares of total federal tax revenue collected by the IRS, divided among personal income tax, employment (payroll) taxes, corporate income tax, excise taxes, estate and gift taxes, and other categories.',
    question:
      'Based on the IRS receipts pie chart, which conclusion about U.S. federal tax revenue is best supported?',
    answerOptions: [
      {
        text: 'The federal government relies most heavily on individual income and payroll taxes for its revenue.',
        rationale:
          "Correct. In the chart, personal income tax and employment (payroll) taxes together make up the dominant share of IRS receipts — far larger than corporate, excise, or estate-and-gift taxes — indicating the federal government's heaviest revenue reliance.",
        isCorrect: true,
      },
      {
        text: 'Corporate income taxes provide the largest share of federal tax revenue.',
        rationale:
          'The corporate slice in the chart is far smaller than the combined individual income and payroll slices.',
        isCorrect: false,
      },
      {
        text: 'Excise taxes (on items like fuel and tobacco) are the largest source of federal revenue.',
        rationale:
          'The excise tax slice in the chart is one of the smallest, far smaller than personal income or payroll taxes.',
        isCorrect: false,
      },
      {
        text: 'Estate and gift taxes provide more revenue than personal income tax.',
        rationale:
          'The estate and gift category is shown as one of the smallest slices, while personal income tax is one of the largest.',
        isCorrect: false,
      },
    ],
  },
];
