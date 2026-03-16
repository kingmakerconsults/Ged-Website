const o = (text, isCorrect, rationale) => ({ text, isCorrect, rationale });
const q = (questionText, answerOptions) => ({ questionText, answerOptions });

const SOCIAL_STUDIES_IMAGE_QUESTION_SETS = Object.freeze({
  '/images/Social%20Studies/035fa172_2083_4c13_9485_0001.png': {
    questions: [
      q(
        'According to the pie chart, which category makes up the largest share of federal spending shown?',
        [
          o(
            'Health',
            true,
            'Correct. The chart labels Health at 28%, which is the largest slice shown.'
          ),
          o(
            'Social Security',
            false,
            'Social Security is a large share at 25.3%, but it is still smaller than Health.'
          ),
          o(
            'Defense/Homeland Security',
            false,
            'Defense/Homeland Security is 16.2%, well below the largest slice.'
          ),
          o('Transportation', false, 'Transportation is only 4% on the chart.'),
        ]
      ),
      q(
        'If Health spending is combined with Social Security spending, what total share of spending do those two categories represent?',
        [
          o(
            '53.3%',
            true,
            'Correct. Adding 28% for Health and 25.3% for Social Security gives 53.3%.'
          ),
          o(
            '44.2%',
            false,
            'This total is too low; it does not match the two largest slices added together.'
          ),
          o(
            '41.5%',
            false,
            'This is less than the combined total of the two largest categories shown.'
          ),
          o(
            '63.2%',
            false,
            'This overstates the combined share of Health and Social Security.'
          ),
        ]
      ),
      q(
        'Which group of programs is shown as taking 1% each of spending in the chart?',
        [
          o(
            'Housing, Energy, Science, and Labor',
            true,
            'Correct. Each of those four categories is labeled 1% in the chart.'
          ),
          o(
            'Veterans, Transportation, Education, and Labor',
            false,
            'Veterans and Transportation are 4%, and Education is 3%, not 1%.'
          ),
          o(
            'Health, Housing, Science, and Labor',
            false,
            'Health is 28%, not 1%.'
          ),
          o(
            'Energy, Defense/Homeland Security, Housing, and Labor',
            false,
            'Defense/Homeland Security is 16.2%, not 1%.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/a_map_of_the_triangular_trade_routes_0001.jpg': {
    questions: [
      q(
        'What movement is most clearly shown by the arrows leaving Africa on the triangular trade map?',
        [
          o(
            'The forced transport of enslaved Africans to the Americas',
            true,
            'Correct. The map centers on the Atlantic slave trade routes from Africa to destinations in the Americas.'
          ),
          o(
            'The migration of European settlers back to Africa',
            false,
            'That is not the movement highlighted by the slave-trade routes on the map.'
          ),
          o(
            'Trade between Asia and South America',
            false,
            'The map focuses on the Atlantic world, not Asia-South America trade.'
          ),
          o(
            'Military invasions of Europe by North American colonies',
            false,
            'The routes shown are commercial-slavery routes, not colonial invasions of Europe.'
          ),
        ]
      ),
      q(
        'What additional information does the inset pie chart provide on this map?',
        [
          o(
            'The regional origins of enslaved Africans taken to North America',
            true,
            'Correct. The inset adds data about the share coming from different African regions.'
          ),
          o(
            'The price of enslaved labor in each colony',
            false,
            'The inset is a pie chart of origins, not prices.'
          ),
          o(
            'The number of European ships built in each port',
            false,
            'Shipbuilding data is not what the inset displays.'
          ),
          o(
            'The voting patterns of colonial legislatures',
            false,
            'The inset relates to the slave trade, not voting.'
          ),
        ]
      ),
      q(
        'Which set of continents is directly connected by the main trade network shown on the map?',
        [
          o(
            'Africa, Europe, and the Americas',
            true,
            'Correct. The triangular trade map links Africa, European colonial powers, and destinations in North and South America.'
          ),
          o(
            'Africa, Asia, and Australia',
            false,
            "Australia is not one of the core regions connected in the map's Atlantic system."
          ),
          o(
            'Europe, Asia, and Antarctica',
            false,
            'The map is about Atlantic trade, not polar or Asian trade routes.'
          ),
          o(
            'South America, Asia, and Australia',
            false,
            'The routes shown do not center on those three continents.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/civil_rights_act_of_1964_0001.png': {
    questions: [
      q(
        'According to the legend, what does a yellow state represent on the Senate vote map?',
        [
          o(
            "The state's senators were split on the bill",
            true,
            'Correct. The legend identifies yellow as Split.'
          ),
          o(
            'Both senators voted Yea',
            false,
            'Yea is shown with a different color in the legend.'
          ),
          o(
            'Both senators voted Nay',
            false,
            'Nay is shown with a different color in the legend.'
          ),
          o(
            'The state had no Senate vote recorded',
            false,
            'The legend categories are Yea, Nay, and Split, not missing vote.'
          ),
        ]
      ),
      q(
        'Which region shows the strongest concentration of opposition or divided support for the Civil Rights Act on this map?',
        [
          o(
            'The South',
            true,
            'Correct. Southern states are where Nay and Split outcomes are most visibly clustered on the map.'
          ),
          o(
            'New England',
            false,
            'New England shows much stronger support than opposition on the map.'
          ),
          o(
            'The Pacific Northwest',
            false,
            'That region does not show the main concentration of Nay or Split states.'
          ),
          o(
            'Alaska and Hawaii',
            false,
            'Those states are not the main regional cluster of opposition shown.'
          ),
        ]
      ),
      q(
        'What broader conclusion does this map support about Senate votes on the Civil Rights Act of 1964?',
        [
          o(
            'Support was generally stronger outside the Deep South',
            true,
            'Correct. The geographic pattern shows the strongest resistance clustered in the South, while much of the rest of the country is marked Yea.'
          ),
          o(
            'Opposition was evenly spread across all regions',
            false,
            'The map shows a clear regional pattern, not an even distribution.'
          ),
          o(
            'Western states were the main source of Nay votes',
            false,
            "The map's opposition is not concentrated in the West."
          ),
          o(
            'Northern states mostly refused to support the bill',
            false,
            'The map shows the opposite pattern in much of the North.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/ged_grsph_0001.png': {
    questions: [
      q(
        'According to the left graph, which river is the longest of the ones listed?',
        [
          o(
            'Missouri',
            true,
            'Correct. The left bar graph shows the Missouri River as the longest river in the set.'
          ),
          o(
            'Colorado',
            false,
            'Colorado is shorter than the Missouri on the graph.'
          ),
          o(
            'St. Lawrence',
            false,
            'St. Lawrence appears much shorter than the longest river shown.'
          ),
          o(
            'Yukon',
            false,
            'Yukon is long, but it is not the longest bar on the length graph.'
          ),
        ]
      ),
      q(
        'According to the right graph, which river has the largest drainage basin?',
        [
          o(
            'Mississippi',
            true,
            'Correct. The drainage-area graph shows the Mississippi River with the largest basin among those listed.'
          ),
          o(
            'Rio Grande',
            false,
            "The Rio Grande's drainage basin is much smaller on the graph."
          ),
          o(
            'St. Lawrence',
            false,
            'St. Lawrence does not have the largest basin in the chart.'
          ),
          o(
            'Colorado',
            false,
            'Colorado is not shown with the largest drainage basin.'
          ),
        ]
      ),
      q(
        'Which graph should a student use to determine which river drains the largest land area?',
        [
          o(
            'The drainage-area graph on the right',
            true,
            'Correct. Drainage basin size is shown in the right-hand graph, not the length graph.'
          ),
          o(
            'The length graph on the left',
            false,
            'The left graph measures miles of river length, not land area drained.'
          ),
          o(
            'Neither graph, because both only show rainfall',
            false,
            'The graphs show river length and drainage area, not rainfall.'
          ),
          o(
            'Only the labels under the bars',
            false,
            'The labels name the rivers, but the right graph is what shows drainage-area size.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/ged_grsph_2_0001.png': {
    questions: [
      q(
        'What does the point where the supply and demand curves intersect represent?',
        [
          o(
            'Market equilibrium',
            true,
            'Correct. The intersection of supply and demand marks the equilibrium price and quantity.'
          ),
          o(
            'A government price ceiling',
            false,
            'A price ceiling is a policy, not the point where the two curves meet.'
          ),
          o(
            'A shortage caused by low production',
            false,
            'The intersection represents balance, not a shortage.'
          ),
          o(
            'A monopoly price',
            false,
            'Nothing in the graph indicates monopoly pricing.'
          ),
        ]
      ),
      q(
        'If the market price were set above the intersection point on the graph, what would the graph most likely show?',
        [
          o(
            'A surplus, because quantity supplied would exceed quantity demanded',
            true,
            'Correct. Above equilibrium, producers supply more than consumers want to buy.'
          ),
          o(
            'A shortage, because quantity demanded would exceed quantity supplied',
            false,
            'That is what happens below equilibrium, not above it.'
          ),
          o(
            'No change, because supply and demand would still be equal',
            false,
            'Prices above equilibrium move the market away from equality.'
          ),
          o(
            'The graph would stop showing supply and demand',
            false,
            'The graph still shows both curves at prices above equilibrium.'
          ),
        ]
      ),
      q('Which curve on the graph slopes downward from left to right?', [
        o(
          'Demand',
          true,
          'Correct. The demand curve slopes downward because consumers buy less at higher prices.'
        ),
        o('Supply', false, 'Supply slopes upward on the graph.'),
        o('Both curves', false, 'Only one curve slopes downward in the graph.'),
        o(
          'Neither curve',
          false,
          'The graph clearly shows one downward and one upward slope.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/a_new_nation_quiz_2_0001.png': {
    questions: [
      q('On the map, what territory is highlighted in white?', [
        o(
          'The Louisiana Purchase',
          true,
          'Correct. The white region is labeled as the Louisiana Purchase territory.'
        ),
        o(
          'The Mexican Cession',
          false,
          'That territory was added later and is not the white region on this map.'
        ),
        o(
          'The Oregon Territory',
          false,
          'The map specifically highlights the Louisiana Purchase, not Oregon.'
        ),
        o(
          'The original thirteen states',
          false,
          'The original states are shown separately from the white-highlighted area.'
        ),
      ]),
      q('What does the map best show about the Louisiana Purchase?', [
        o(
          'It greatly expanded U.S. territory west of the Mississippi River.',
          true,
          'Correct. The map shows a very large land acquisition stretching far westward from the earlier United States.'
        ),
        o(
          'It gave the United States control of all of Canada.',
          false,
          'Canada is shown bordering the region, not becoming part of the United States.'
        ),
        o(
          'It reduced the size of the United States.',
          false,
          'The acquisition clearly enlarged the country.'
        ),
        o(
          'It happened after the Civil War.',
          false,
          'The Louisiana Purchase occurred much earlier, in 1803.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/american_civil_war_0002.png': {
    questions: [
      q('What overall change does the Civil War map show from 1861 to 1865?', [
        o(
          'The Confederacy lost territory over time as Union control expanded.',
          true,
          'Correct. The shaded regions show the Confederacy shrinking while Union-controlled areas spread.'
        ),
        o(
          'The Union steadily lost all coastal territory.',
          false,
          'The map instead shows Union control growing, including coastal areas.'
        ),
        o(
          'The Confederacy gained new western territories each year.',
          false,
          'The map does not show Confederate expansion.'
        ),
        o(
          'State borders disappeared by the end of the war.',
          false,
          'The map still uses state borders as part of the display.'
        ),
      ]),
      q('Why is the legend important for interpreting this map?', [
        o(
          'It explains which patterns represent Union control and which represent territory lost by the Confederacy in different years.',
          true,
          'Correct. Without the legend, the shaded regions and dates would be much harder to interpret accurately.'
        ),
        o(
          'It lists the names of every Civil War general.',
          false,
          'The legend identifies map patterns, not generals.'
        ),
        o(
          'It gives the exact number of soldiers in each battle.',
          false,
          'The map is about territorial control, not troop counts.'
        ),
        o(
          'It shows the text of the Emancipation Proclamation.',
          false,
          'That document is not what the legend is for.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/civil_rights_movement_0001.png': {
    questions: [
      q(
        'Which goal is most clearly shown by the protest signs in the photograph?',
        [
          o(
            'Expanding civil rights such as voting rights, school integration, and equal opportunity',
            true,
            'Correct. The signs call for voting rights, integrated schools, jobs, and equal rights.'
          ),
          o(
            'Ending overseas military alliances',
            false,
            'The signs address domestic civil-rights issues, not foreign policy.'
          ),
          o(
            'Lowering tariffs on imported goods',
            false,
            'The photograph is not about trade policy.'
          ),
          o(
            'Expanding westward settlement',
            false,
            'That is unrelated to the demands shown in the image.'
          ),
        ]
      ),
      q(
        'What does this image suggest about how many civil rights activists tried to create change?',
        [
          o(
            'They used organized public marches to draw attention to injustice and demand reform.',
            true,
            'Correct. The large crowd, signs, and leaders marching together show coordinated public protest.'
          ),
          o(
            'They relied mainly on secret military operations.',
            false,
            'The image shows an open public demonstration, not military action.'
          ),
          o(
            'They avoided public communication with government.',
            false,
            'Marches were designed to make demands visible and public.'
          ),
          o(
            'They focused only on local issues instead of national rights.',
            false,
            'The signs point to broad national civil-rights goals.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/colonial_history_of_the_united_states_0003.png': {
    questions: [
      q(
        'Before the Treaty of Utrecht, which European power controlled the largest continuous land area shown on the map?',
        [
          o(
            'France',
            true,
            'Correct. The map shows French claims stretching across a large connected area of Canada and Louisiana.'
          ),
          o(
            'Great Britain',
            false,
            'Britain controlled important Atlantic areas but not the largest continuous interior landmass shown.'
          ),
          o(
            'Spain',
            false,
            'Spain held major territory, but not the largest continuous area on this specific map.'
          ),
          o(
            'The Netherlands',
            false,
            'The Netherlands is not one of the main powers represented on this map.'
          ),
        ]
      ),
      q(
        'What does the map suggest was one effect of the Treaty of Utrecht in 1713?',
        [
          o(
            'France gave up some northeastern territory to Great Britain.',
            true,
            'Correct. The map specifically highlights territories ceded by France to Great Britain under the treaty.'
          ),
          o(
            'Spain transferred Louisiana to France.',
            false,
            'That is not the territorial change highlighted by the treaty note on the map.'
          ),
          o(
            'Great Britain lost all Atlantic coast colonies.',
            false,
            'The map does not show Britain losing all Atlantic colonies.'
          ),
          o(
            'All European claims in North America ended.',
            false,
            'The map clearly shows continuing European territorial claims.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/ged_grsph_1_0001.png': {
    questions: [
      q('Which territorial acquisition on the map appears to be the largest?', [
        o(
          'The Louisiana Purchase',
          true,
          'Correct. The Louisiana Purchase covers the largest labeled land area on the map.'
        ),
        o(
          'The Gadsden Purchase',
          false,
          'The Gadsden Purchase is a much smaller strip of land.'
        ),
        o(
          'The Florida Cession',
          false,
          'Florida is much smaller than the Louisiana Purchase.'
        ),
        o(
          'Texas Annexation',
          false,
          'Texas added a large area, but the Louisiana Purchase is larger on the map.'
        ),
      ]),
      q(
        'What general pattern of U.S. growth is shown by the sequence of acquisitions on the map?',
        [
          o(
            'The United States expanded mostly westward and southward across the continent.',
            true,
            'Correct. The acquisitions extend the country outward from its original eastern base toward the interior, Southwest, and Pacific.'
          ),
          o(
            'The United States expanded mostly eastward into the Atlantic Ocean.',
            false,
            'The growth shown is continental, not eastward into the ocean.'
          ),
          o(
            'The United States shrank after 1803.',
            false,
            'The map documents expansion, not contraction.'
          ),
          o(
            'The United States gained all of North America by 1853.',
            false,
            'The map still shows territory outside U.S. control.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/ged_grsph_4_0001.png': {
    questions: [
      q(
        'Which amendment on the voting-rights timeline granted women the right to vote nationwide?',
        [
          o(
            'The Nineteenth Amendment',
            true,
            'Correct. The Nineteenth Amendment extended voting rights to women nationwide.'
          ),
          o(
            'The Fifteenth Amendment',
            false,
            'The Fifteenth Amendment addressed race-based denial of voting rights, not women’s suffrage.'
          ),
          o(
            'The Twenty-Fourth Amendment',
            false,
            'The Twenty-Fourth Amendment banned poll taxes in federal elections.'
          ),
          o(
            'The Twenty-Sixth Amendment',
            false,
            'The Twenty-Sixth Amendment lowered the voting age to 18.'
          ),
        ]
      ),
      q(
        'Which amendment on the timeline lowered the voting age from 21 to 18?',
        [
          o(
            'The Twenty-Sixth Amendment',
            true,
            'Correct. The Twenty-Sixth Amendment lowered the voting age to 18.'
          ),
          o(
            'The Fourteenth Amendment',
            false,
            'The Fourteenth Amendment addressed citizenship and equal protection, not voting age.'
          ),
          o(
            'The Nineteenth Amendment',
            false,
            'That amendment focused on women’s suffrage.'
          ),
          o(
            'The Twenty-Fourth Amendment',
            false,
            'That amendment addressed poll taxes, not age requirements.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/global_conflicts_0002.jpg': {
    questions: [
      q(
        'Which continent would a student look at to find Brazil on the political world map?',
        [
          o(
            'South America',
            true,
            'Correct. Brazil is located on the South American continent.'
          ),
          o('Europe', false, 'Brazil is not in Europe.'),
          o(
            'Africa',
            false,
            'Brazil is across the Atlantic from Africa, not on that continent.'
          ),
          o('Australia', false, 'Brazil is not part of Australia or Oceania.'),
        ]
      ),
      q(
        'What is the main purpose of using different colors for neighboring countries on the map?',
        [
          o(
            'To make political borders easier to distinguish',
            true,
            'Correct. Different colors help readers identify separate countries and follow borders more easily.'
          ),
          o(
            'To show which countries have the largest populations',
            false,
            'Color on this map distinguishes countries, not population size.'
          ),
          o(
            'To show which countries share a language',
            false,
            'The colors are not a language key.'
          ),
          o(
            'To show average annual rainfall',
            false,
            'This is a political map, not a climate map.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/great_depression_0001.png': {
    questions: [
      q(
        'What problem of the Great Depression is most directly shown in this photograph?',
        [
          o(
            'Widespread unemployment and poverty',
            true,
            'Correct. The lines for free food and aid point to severe unemployment and economic hardship.'
          ),
          o(
            'Overseas military expansion',
            false,
            'The photo is about domestic economic struggle, not war.'
          ),
          o(
            'Rapid suburban growth',
            false,
            'The image shows hardship, not suburban development.'
          ),
          o(
            'A boom in factory wages',
            false,
            'The need for free food suggests the opposite of economic prosperity.'
          ),
        ]
      ),
      q(
        'What do the signs offering free coffee, doughnuts, and soup suggest about life during this period?',
        [
          o(
            'Many people depended on charitable relief to meet basic needs.',
            true,
            'Correct. The signs indicate that private or community aid was helping unemployed people get food.'
          ),
          o(
            'Most workers could easily afford restaurant meals.',
            false,
            'The need for free food suggests the opposite.'
          ),
          o(
            'The federal government had ended all forms of assistance.',
            false,
            'The signs show relief existed, even if the source is charitable.'
          ),
          o(
            'Unemployment only affected rural farmers.',
            false,
            'The urban street scene shows hardship beyond rural areas.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/history_of_propaganda_0002.png': {
    questions: [
      q(
        'What message is this World War II poster most clearly designed to promote?',
        [
          o(
            'Infantry service requires courage and deserves public respect and support.',
            true,
            'Correct. The dramatic combat scene and the word courage are meant to honor and promote the infantry.'
          ),
          o(
            'War should be avoided because soldiers are ineffective.',
            false,
            'The poster praises infantry service rather than criticizing it.'
          ),
          o(
            'Civilian factory work was unimportant during wartime.',
            false,
            'The poster focuses on infantry courage, not on dismissing other wartime roles.'
          ),
          o(
            'The war had already been won in 1943.',
            false,
            'The poster encourages wartime commitment; it does not claim the war was already finished.'
          ),
        ]
      ),
      q('How do the text and imagery work together in this poster?', [
        o(
          'The battle scene visually dramatizes the bravery named in the slogan.',
          true,
          'Correct. The poster pairs the word courage with soldiers under fire so the message feels urgent and heroic.'
        ),
        o(
          'The text contradicts the image by discouraging military service.',
          false,
          'The text and image reinforce the same patriotic message.'
        ),
        o(
          'The imagery is neutral and avoids emotion.',
          false,
          'Explosions, smoke, and active combat are highly emotional choices.'
        ),
        o(
          'The text is unrelated to the soldiers shown.',
          false,
          'The text directly labels and celebrates the infantry depicted.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/join_or_die_0001.png': {
    questions: [
      q('What is the main idea of the segmented snake labeled Join, or Die?', [
        o(
          'The colonies needed to unite in order to resist British pressure effectively.',
          true,
          'Correct. The broken snake symbolizes separate colonies that would be stronger if joined together.'
        ),
        o(
          'Each colony should act alone and avoid cooperation.',
          false,
          'The slogan argues for unity, not separation.'
        ),
        o(
          'The colonies should immediately form separate nations.',
          false,
          'The symbol is about joining together, not breaking further apart.'
        ),
        o(
          'Britain had already granted complete independence.',
          false,
          'The 1774 context is one of rising conflict, not settled independence.'
        ),
      ]),
      q(
        'Why is the 1774 date on the newspaper important to understanding the image?',
        [
          o(
            'It places the masthead in the tense pre-Revolution period when colonial unity was becoming urgent.',
            true,
            'Correct. In 1774, conflict with Britain was escalating, so calls for unity carried clear political meaning.'
          ),
          o(
            'It shows the image was made after the Civil War.',
            false,
            'The date is nearly a century earlier than the Civil War.'
          ),
          o(
            'It proves the newspaper was printed after the Constitution was adopted.',
            false,
            'The Constitution had not yet been written in 1774.'
          ),
          o(
            'It indicates the colonies had already ratified the Bill of Rights.',
            false,
            'That happened much later, after independence and the Constitution.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/ged_social_studies_fig_9_0001.png': {
    questions: [
      q('What long-term trend is shown by the median-age bar graph?', [
        o(
          'The median age rises over time',
          true,
          'Correct. Each later bar is generally higher than the earlier ones, showing an aging population.'
        ),
        o(
          'The median age falls sharply after 1990',
          false,
          'The graph does not show a sharp decline after 1990.'
        ),
        o(
          'The median age stays almost unchanged for sixty years',
          false,
          'The bars increase across the period shown.'
        ),
        o(
          'The median age only changes in projected years',
          false,
          'The increase begins before the projected years.'
        ),
      ]),
      q(
        'Which years on the graph are marked as projected rather than recorded historical data?',
        [
          o(
            '2010, 2020, and 2030',
            true,
            'Correct. Those bars carry the asterisk marking projected values.'
          ),
          o(
            '1970, 1980, and 1990',
            false,
            'Those are historical data points, not projected years.'
          ),
          o(
            '1990, 2000, and 2010',
            false,
            'Only the later years with asterisks are projected.'
          ),
          o(
            '2000, 2010, and 2020',
            false,
            '2000 is not marked as projected on the graph.'
          ),
        ]
      ),
      q(
        'About how much does the median age increase from 1970 to 2030 on the graph?',
        [
          o(
            'About 9 years',
            true,
            'Correct. The graph rises from about 28 in 1970 to about 37 in 2030.'
          ),
          o('About 3 years', false, 'The increase shown is larger than that.'),
          o(
            'About 15 years',
            false,
            'The graph does not show that large a jump.'
          ),
          o(
            'About 1 year',
            false,
            'The change over the whole period is much greater than 1 year.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/political_cartoon_0002.png': {
    questions: [
      q(
        'In the cartoon, what does the chick labeled Panama Republic hatching from an egg labeled Colombia most clearly suggest?',
        [
          o(
            "Panama's independence was shaped by outside intervention",
            true,
            'Correct. The hatching image suggests the new republic was brought into being through outside manipulation rather than simply appearing on its own.'
          ),
          o(
            'Colombia peacefully annexed Panama',
            false,
            'The cartoon suggests separation and intervention, not annexation.'
          ),
          o(
            'France gave control of the canal to Colombia alone',
            false,
            'The cartoon shows several actors and competing interests, not a simple French handoff to Colombia.'
          ),
          o(
            'The United States had no interest in canal negotiations',
            false,
            'Roosevelt and the canal documents make U.S. involvement central to the image.'
          ),
        ]
      ),
      q(
        "What does Theodore Roosevelt's presence with a shovel and canal papers suggest in the cartoon?",
        [
          o(
            'The United States was pushing hard for a canal agreement',
            true,
            'Correct. Roosevelt is shown as actively connected to the concession and canal project.'
          ),
          o(
            'Roosevelt opposed building a canal in Panama',
            false,
            'The image points to involvement and support, not opposition.'
          ),
          o(
            'Roosevelt was representing Colombia against Panama',
            false,
            'The documents and posture suggest U.S. canal interests, not defense of Colombia.'
          ),
          o(
            'Roosevelt was a neutral bystander with no political role',
            false,
            'He is too prominently placed for that interpretation.'
          ),
        ]
      ),
      q("Why is the word Intrigue important to the cartoon's message?", [
        o(
          'It suggests secretive political maneuvering helped create the outcome',
          true,
          'Correct. The label implies the events were driven by scheming and manipulation.'
        ),
        o(
          'It shows that the cartoon is mainly about agricultural trade',
          false,
          'The cartoon is about political maneuvering around Panama, not agriculture.'
        ),
        o(
          'It means the canal was built before the republic existed',
          false,
          'That is not what the labeled word is emphasizing.'
        ),
        o(
          'It praises the process as transparent and democratic',
          false,
          'Intrigue implies the opposite of transparent politics.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/questions_are_based_on_the_following_graph_8_0001.png':
    {
      questions: [
        q(
          'According to the table, which constitutional principle means that government gets its power from the people?',
          [
            o(
              'Popular sovereignty',
              true,
              'Correct. Popular sovereignty means the people are the source of governmental authority.'
            ),
            o(
              'Federalism',
              false,
              'Federalism is about dividing power between national and state governments.'
            ),
            o(
              'Checks and balances',
              false,
              'Checks and balances refers to branches limiting one another.'
            ),
            o(
              'Limited government',
              false,
              'Limited government means power is restrained by law, not that it comes from the people.'
            ),
          ]
        ),
        q(
          'Which pair of constitutional principles most directly focuses on dividing and restraining power inside government?',
          [
            o(
              'Separation of powers and checks and balances',
              true,
              'Correct. One divides power among branches, and the other keeps those branches from dominating one another.'
            ),
            o(
              'Popular sovereignty and republican government',
              false,
              'Those principles focus more on representation and source of authority.'
            ),
            o(
              'Federalism and popular sovereignty',
              false,
              'Only one of those directly concerns dividing governmental power.'
            ),
            o(
              'Limited government and republican government',
              false,
              'Those ideas matter, but they are not the clearest pair for internal division and restraint of power.'
            ),
          ]
        ),
        q('How does the table describe federalism?', [
          o(
            'Power is shared between national and state governments',
            true,
            'Correct. Federalism divides governing authority between national and state levels.'
          ),
          o(
            'The president can veto any court decision',
            false,
            'That is not what federalism means.'
          ),
          o(
            'Citizens vote directly on every law',
            false,
            "That idea is not the table's definition of federalism."
          ),
          o(
            'Courts make laws for the states',
            false,
            "The table's federalism principle is about division of authority, not courts legislating."
          ),
        ]),
      ],
    },
  '/images/Social%20Studies/reconstruction_era_0001.png': {
    questions: [
      q(
        "What is the main argument made by the phrase 'Tis but a change of banners' in this Reconstruction cartoon?",
        [
          o(
            'The beliefs behind Confederate resistance continued under new political symbols after the war',
            true,
            'Correct. The cartoon argues that the ideology did not disappear; it merely took on a new banner in Reconstruction politics.'
          ),
          o(
            'The Civil War ended all sectional conflict immediately',
            false,
            'The cartoon argues the opposite by linking old and new movements.'
          ),
          o(
            'The KKK had no connection to postwar politics',
            false,
            'The image explicitly connects organizations and politics after the war.'
          ),
          o(
            'The Democratic Party had become a civil rights party by 1868',
            false,
            "That is not the cartoonist's message."
          ),
        ]
      ),
      q('Why are the dates 1864 and 1868 placed beside the two figures?', [
        o(
          'To connect Confederate wartime loyalty with postwar Reconstruction politics',
          true,
          'Correct. The dates show continuity from the Civil War era into the political struggles of Reconstruction.'
        ),
        o(
          'To compare two unrelated military victories',
          false,
          'The dates are being used politically, not to compare victories.'
        ),
        o(
          'To show when the Constitution was rewritten',
          false,
          'That is not what the dates represent in the cartoon.'
        ),
        o(
          'To prove that both figures served in the same office',
          false,
          'The dates identify eras and political meaning, not shared officeholding.'
        ),
      ]),
      q(
        'What connection is the cartoonist trying to draw between the two men shown?',
        [
          o(
            'That the KKK and former Confederates represented a continuation of the same political outlook',
            true,
            'Correct. The visual pairing suggests a shared ideology despite a change in labels or moment.'
          ),
          o(
            'That both men supported equal protection during Reconstruction',
            false,
            'The cartoon is not praising either figure for equality.'
          ),
          o(
            'That military uniforms and campaign banners have identical legal meaning',
            false,
            'The point is ideological continuity, not legal definitions.'
          ),
          o(
            'That the election of 1868 ended racial violence in the South',
            false,
            'The cartoon suggests ongoing hostility, not its end.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/robber_baron_industrialist_0001.jpg': {
    questions: [
      q('In this cartoon, the octopus is mainly a symbol for what?', [
        o(
          'The sprawling power of the Standard Oil monopoly',
          true,
          'Correct. The octopus represents Standard Oil reaching into many parts of the economy and government.'
        ),
        o(
          'The environmental benefits of oil drilling',
          false,
          'The image is critical of corporate power, not a celebration of oil extraction.'
        ),
        o(
          'A military alliance protecting U.S. industry',
          false,
          'The cartoon is about monopoly power, not defense alliances.'
        ),
        o(
          'A natural disaster affecting coastal cities',
          false,
          'The octopus is symbolic, not a literal disaster scene.'
        ),
      ]),
      q(
        'What is the best interpretation of the tentacles reaching around major buildings and industries?',
        [
          o(
            "Standard Oil's influence extended into both business and government",
            true,
            'Correct. The tentacles imply control across multiple institutions, not just one company sector.'
          ),
          o(
            'Oil companies were reducing their role in politics',
            false,
            'The cartoon shows expansion of influence, not retreat.'
          ),
          o(
            'The government had fully eliminated monopolies',
            false,
            'The cartoon suggests the opposite: government is under pressure from monopoly power.'
          ),
          o(
            'Only foreign countries were threatened by Standard Oil',
            false,
            'The institutions shown indicate domestic influence as well.'
          ),
        ]
      ),
      q("Why is an octopus an effective symbol for the artist's message?", [
        o(
          'Because many tentacles suggest one organization reaching into many areas at once',
          true,
          'Correct. The tentacles make the idea of far-reaching control easy to visualize.'
        ),
        o(
          'Because octopuses are commonly used to represent democratic reform',
          false,
          'That is not the common point of the symbol here.'
        ),
        o(
          'Because the cartoon is mainly about sea trade routes',
          false,
          'The focus is monopoly power, not maritime trade.'
        ),
        o(
          "Because the artist wanted to praise Standard Oil's efficiency",
          false,
          'The image is satirical and critical, not praising.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/territorial_evolution_of_the_united_states_0063.png':
    {
      questions: [
        q(
          'Which major acquisition shown on the map came from France in 1803?',
          [
            o(
              'The Louisiana Purchase',
              true,
              'Correct. The map labels the Louisiana Purchase as the 1803 acquisition from France.'
            ),
            o(
              'The Mexican Cession',
              false,
              'The Mexican Cession came later and from Mexico, not France.'
            ),
            o(
              'The Oregon Territory',
              false,
              'Oregon Territory was not the 1803 French acquisition.'
            ),
            o(
              'The Alaska Purchase',
              false,
              'Alaska was purchased from Russia in 1867.'
            ),
          ]
        ),
        q('According to the map, which acquisition occurred latest in time?', [
          o(
            'The Virgin Islands in 1917',
            true,
            'Correct. The map lists the Virgin Islands as the latest acquisition shown.'
          ),
          o(
            'Puerto Rico in 1898',
            false,
            'Puerto Rico appears earlier than 1917.'
          ),
          o(
            'The Alaska Purchase in 1867',
            false,
            'Alaska was acquired much earlier than the latest date on the map.'
          ),
          o(
            'The Mexican Cession in 1848',
            false,
            'That acquisition happened decades earlier.'
          ),
        ]),
        q(
          'Why does the map include inset maps for places such as Alaska and Hawaii?',
          [
            o(
              'To show U.S. acquisitions that are not part of the contiguous mainland',
              true,
              'Correct. The insets let the viewer see important acquisitions outside the lower forty-eight states.'
            ),
            o(
              'To show foreign colonies that were never connected to U.S. expansion',
              false,
              'The insets are still part of U.S. territorial history.'
            ),
            o(
              'To replace the need for the main map of the continental United States',
              false,
              'The insets supplement the main map rather than replace it.'
            ),
            o(
              'To compare U.S. states with Canadian provinces',
              false,
              'That is not the purpose of the insets.'
            ),
          ]
        ),
      ],
    },
  '/images/Social%20Studies/licensed_image_0004.jpg': {
    questions: [
      q('What does the Iron Curtain line on the Cold War map represent?', [
        o(
          'The political division between Soviet-aligned Eastern Europe and Western Europe',
          true,
          'Correct. The line marks the Cold War boundary between the two blocs.'
        ),
        o(
          'The border between Europe and Asia',
          false,
          'The Iron Curtain was a political divide, not a continental boundary.'
        ),
        o(
          'The front line of World War I trench warfare',
          false,
          'The map is about the Cold War, not World War I.'
        ),
        o(
          'A trade route used by NATO countries',
          false,
          'The line marks separation, not a trade corridor.'
        ),
      ]),
      q('Why is divided Germany especially important on this map?', [
        o(
          'It shows how one nation became a central symbol of the Cold War split in Europe',
          true,
          'Correct. East and West Germany visibly show the ideological division of the continent.'
        ),
        o(
          'It marks the only country in Europe that remained neutral',
          false,
          'Divided Germany was not the example of neutrality shown by the map.'
        ),
        o(
          'It proves the Soviet Union controlled all of Western Europe',
          false,
          'The map distinguishes Eastern Bloc states from Western countries.'
        ),
        o(
          'It shows where the Monroe Doctrine was enforced',
          false,
          'The Monroe Doctrine concerns the Americas, not Cold War Europe.'
        ),
      ]),
      q(
        "What can a student most directly infer from the map's two-color scheme?",
        [
          o(
            'Europe was divided into rival political blocs rather than operating as one unified political region',
            true,
            'Correct. The contrasting colors emphasize the separation between opposing alliances and systems.'
          ),
          o(
            'Every country on the map had the same type of government',
            false,
            'The map emphasizes differences, not sameness.'
          ),
          o(
            'All neutral countries belonged to the Soviet bloc',
            false,
            'Neutral and Western countries are separated from the Soviet-aligned bloc.'
          ),
          o(
            'The Iron Curtain was a natural mountain barrier',
            false,
            'The map presents it as a political line, not a natural landform.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/licensed_image_0005.jpg': {
    questions: [
      q(
        'What do the numbers printed inside each state add to the election map?',
        [
          o(
            "They show each state's electoral-vote total",
            true,
            'Correct. The numbers indicate how many Electoral College votes each state contributes.'
          ),
          o(
            "They show the state's population rank",
            false,
            'The map is presenting electoral votes, not population ranking.'
          ),
          o(
            'They show the number of congressional districts',
            false,
            'The visual is about the Electoral College, not district count.'
          ),
          o(
            'They show the year each state joined the Union',
            false,
            'The state numbers are contemporary electoral-vote totals, not admission dates.'
          ),
        ]
      ),
      q(
        'Why can a candidate win many states on this map but still lose the national election?',
        [
          o(
            'Because some states contribute far more electoral votes than others',
            true,
            'Correct. The map shows that states have different electoral-vote weights, so winning many small states may not be enough.'
          ),
          o(
            'Because every state gives exactly the same number of electoral votes',
            false,
            'The map shows different numbers for different states.'
          ),
          o(
            'Because only blue states count in the Electoral College',
            false,
            "Both parties' states count toward the total."
          ),
          o(
            'Because the Electoral College ignores state outcomes',
            false,
            'The Electoral College is built from those state outcomes.'
          ),
        ]
      ),
      q(
        'What civics idea is best illustrated by this red-blue electoral map?',
        [
          o(
            'Presidential elections are decided state by state through the Electoral College',
            true,
            "Correct. The map combines state winners with each state's electoral-vote weight."
          ),
          o(
            'Senators are elected by national popular vote',
            false,
            'That is not what the map is showing.'
          ),
          o(
            'Supreme Court justices are chosen by party-color majorities',
            false,
            'The map is about presidential elections, not judicial appointments.'
          ),
          o(
            'Congressional laws are passed according to state color on election maps',
            false,
            'Election maps do not determine legislative passage in that way.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/monroe_doctrine_0001.png': {
    questions: [
      q('What is Uncle Sam mainly doing in this Monroe Doctrine cartoon?', [
        o(
          'Warning European powers not to interfere in the Western Hemisphere',
          true,
          'Correct. The no-trespass warning and guarded Latin American countries express that message clearly.'
        ),
        o(
          'Inviting European powers to divide Latin America',
          false,
          'The cartoon shows the opposite of an invitation.'
        ),
        o(
          'Asking Latin American countries to join Europe',
          false,
          'The image separates Latin America from European powers.'
        ),
        o(
          'Arguing that the United States should leave the hemisphere',
          false,
          'The cartoon shows the United States asserting a protective role.'
        ),
      ]),
      q(
        'What does the No Trespass sign contribute to the meaning of the cartoon?',
        [
          o(
            'It turns U.S. policy into a direct warning against European intervention',
            true,
            'Correct. The sign makes the Monroe Doctrine visible as an explicit barrier.'
          ),
          o(
            'It suggests free trade between Europe and Latin America',
            false,
            'A no-trespass sign signals restriction, not openness.'
          ),
          o(
            'It shows that Latin American countries were part of Europe',
            false,
            'The sign distinguishes the regions rather than merging them.'
          ),
          o(
            'It proves Uncle Sam was withdrawing from foreign policy',
            false,
            'The cartoon shows active involvement, not withdrawal.'
          ),
        ]
      ),
      q('What broader view of U.S. foreign policy does the cartoon promote?', [
        o(
          'The United States should act as protector and gatekeeper in the Western Hemisphere',
          true,
          'Correct. Uncle Sam is shown shielding nearby nations from European powers.'
        ),
        o(
          'The United States should let European empires settle disputes in the Americas',
          false,
          "That is the opposite of the cartoon's message."
        ),
        o(
          'The United States should focus only on domestic elections',
          false,
          'The image is about hemispheric foreign policy.'
        ),
        o(
          'The United States should surrender Caribbean influence to Britain',
          false,
          'The cartoon argues against European intrusion.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/monroe_doctrine_0002.jpg': {
    questions: [
      q(
        "What does the cannon labeled Monroe Doctrine suggest about Roosevelt's foreign policy in this cartoon?",
        [
          o(
            'The United States was prepared to use force to keep European powers out of Caribbean affairs',
            true,
            'Correct. The warship and cannon turn doctrine into a threat backed by military power.'
          ),
          o(
            'The United States planned to surrender Santo Domingo to Europe',
            false,
            'The title Hands Off shows the opposite.'
          ),
          o(
            'Roosevelt wanted Europe to collect claims without resistance',
            false,
            'The cartoon depicts Roosevelt blocking that outcome.'
          ),
          o(
            'The Monroe Doctrine only applied to trade tariffs',
            false,
            'The image focuses on intervention and power, not tariffs.'
          ),
        ]
      ),
      q("Why is the title Hands Off important to the cartoon's message?", [
        o(
          'It makes the U.S. warning to Europe direct and unmistakable',
          true,
          'Correct. The title turns the entire scene into a blunt warning.'
        ),
        o(
          'It shows Roosevelt refusing involvement in the Caribbean',
          false,
          'The scene shows active involvement and threat of force.'
        ),
        o(
          'It suggests Santo Domingo is threatening the United States',
          false,
          'The warning is directed at Europe, not at Santo Domingo.'
        ),
        o(
          'It means the Monroe Doctrine had ended by 1904',
          false,
          'The cartoon presents it as very much alive.'
        ),
      ]),
      q(
        'What historical idea is most closely represented by Roosevelt standing guard over Santo Domingo?',
        [
          o(
            "The Roosevelt Corollary's claim that the U.S. could intervene to prevent European action in Latin America",
            true,
            'Correct. The image goes beyond warning Europe and shows the U.S. taking an active policing role.'
          ),
          o(
            'The policy of isolation from world affairs',
            false,
            'The cartoon shows interventionist policy, not isolation.'
          ),
          o(
            'The end of American influence in the Caribbean',
            false,
            'The cartoon suggests growing influence, not retreat.'
          ),
          o(
            'A promise that Latin American nations would rule European colonies',
            false,
            'That is not what the image represents.'
          ),
        ]
      ),
    ],
  },
  '/images/Social%20Studies/political_cartoon_0001.jpg': {
    questions: [
      q('What does the torn globe in the cartoon most clearly symbolize?', [
        o(
          'A nation split apart by the Civil War',
          true,
          'Correct. The damaged globe represents the divided United States, especially the break involving the Southern states.'
        ),
        o(
          'The expansion of U.S. trade around the world',
          false,
          'The tear suggests rupture, not commercial expansion.'
        ),
        o(
          'A dispute over European colonies',
          false,
          'The cartoon is focused on the United States itself.'
        ),
        o(
          'The creation of the League of Nations',
          false,
          'The image belongs to the Civil War/Reconstruction era, not the post-World War I order.'
        ),
      ]),
      q(
        'Why are Lincoln and Andrew Johnson shown sewing the nation together?',
        [
          o(
            'To portray reunion as a process of repairing the Union after war',
            true,
            'Correct. Sewing turns national restoration into a visible act of repair.'
          ),
          o(
            'To suggest the Union should be permanently split into smaller countries',
            false,
            'The action of sewing suggests restoration, not permanent breakup.'
          ),
          o(
            'To show that textile production caused the Civil War',
            false,
            'The sewing is symbolic, not economic explanation.'
          ),
          o(
            'To represent industrial labor in northern factories',
            false,
            'The act is about political reunion, not factory work.'
          ),
        ]
      ),
      q("What does Johnson's participation in the stitching imply?", [
        o(
          'He had a role in shaping the postwar process of reunion and Reconstruction',
          true,
          "Correct. The cartoon treats him as part of the effort to mend the nation after Lincoln's wartime leadership."
        ),
        o(
          'He led the Confederacy during the war',
          false,
          'Johnson did not lead the Confederacy.'
        ),
        o(
          'He opposed any attempt to bring Southern states back into the Union',
          false,
          'The cartoon shows him helping stitch the nation together.'
        ),
        o(
          'He replaced Lincoln before the Civil War began',
          false,
          'That does not fit the period represented by the image.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/the_cold_war_era_0001.jpg': {
    questions: [
      q(
        'What general direction does the Lewis and Clark route follow on the map?',
        [
          o(
            'From the interior of the United States westward to the Pacific coast',
            true,
            'Correct. The expedition route runs across the continent toward the Pacific.'
          ),
          o(
            'From California eastward to the Atlantic seaboard',
            false,
            'The map shows the route moving in the opposite direction overall.'
          ),
          o(
            'From Canada south into Mexico',
            false,
            'That is not the path shown on the expedition map.'
          ),
          o(
            'From Florida to New England',
            false,
            'The route is a transcontinental westward journey, not a southeastern one.'
          ),
        ]
      ),
      q(
        'Why are places such as Fort Mandan and Fort Clatsop labeled on the map?',
        [
          o(
            "They mark important stopping points that help trace the expedition's route and progress",
            true,
            'Correct. The forts help the reader follow where the expedition traveled and camped.'
          ),
          o(
            'They show the capitals of new Cold War alliances',
            false,
            'This is an exploration map, not a Cold War alliance map.'
          ),
          o(
            'They identify the main battle sites of the Civil War',
            false,
            'The map concerns the Lewis and Clark expedition.'
          ),
          o(
            'They show where the expedition discovered gold mines',
            false,
            'The labels are route markers, not a mining record.'
          ),
        ]
      ),
      q('How does this map connect to the history of the Louisiana Purchase?', [
        o(
          'It shows an expedition sent to explore and map lands connected to the purchase and the route to the West',
          true,
          'Correct. The expedition helped the United States understand territory tied to westward expansion after the purchase.'
        ),
        o(
          'It shows Europe taking back the Louisiana Territory',
          false,
          'The map is about American exploration, not European reconquest.'
        ),
        o(
          'It proves the purchase only included the Pacific coast',
          false,
          'The Louisiana Purchase and expedition covered a much larger transcontinental region.'
        ),
        o(
          'It shows that the purchase ended all western exploration',
          false,
          'The map shows exploration continuing because of the purchase.'
        ),
      ]),
    ],
  },
  '/images/Social%20Studies/this_question_is_based_on_the_following_graph_0001.png':
    {
      questions: [
        q(
          'Which tax category accounts for the largest share of IRS receipts in the 2010 pie chart?',
          [
            o(
              'Personal income tax',
              true,
              'Correct. Personal income tax is labeled 50.1%, the largest share on the chart.'
            ),
            o(
              'Employment taxes',
              false,
              'Employment taxes are a large share at 35.1%, but not the largest.'
            ),
            o(
              'Business income taxes',
              false,
              'Business income taxes are far smaller at 11.9%.'
            ),
            o(
              'Excise taxes',
              false,
              'Excise taxes contribute only a small slice of total receipts.'
            ),
          ]
        ),
        q(
          'About what percentage of IRS receipts comes from personal income tax and employment taxes combined?',
          [
            o('85.2%', true, 'Correct. Adding 50.1% and 35.1% gives 85.2%.'),
            o(
              '62.0%',
              false,
              'That total is much lower than the combined share of the two biggest categories.'
            ),
            o('47.0%', false, 'This is less than personal income tax alone.'),
            o(
              '92.7%',
              false,
              'That would overstate the combined total shown on the chart.'
            ),
          ]
        ),
        q(
          'What does the pie chart suggest about federal tax receipts in 2010?',
          [
            o(
              'Most revenue came from income-related taxes rather than from excise or estate taxes',
              true,
              'Correct. Personal income and employment taxes dominate the pie chart.'
            ),
            o(
              'Estate and gift taxes were the main source of federal receipts',
              false,
              'That category is one of the smallest on the chart.'
            ),
            o(
              'All tax categories contributed almost equally',
              false,
              'The chart shows a very uneven distribution.'
            ),
            o(
              'Business income taxes exceeded personal income taxes',
              false,
              'The chart clearly shows personal income taxes as much larger.'
            ),
          ]
        ),
      ],
    },
  '/images/Social%20Studies/this_question_is_based_on_the_following_graph_2_0001.png':
    {
      questions: [
        q(
          'What overall demographic change does the graph show from 1900 to 2010?',
          [
            o(
              'The United States became far more urban while the rural share declined',
              true,
              'Correct. The urban line rises over time while the rural line falls.'
            ),
            o(
              'The rural share grew steadily and overtook the urban share',
              false,
              'The graph shows the opposite trend.'
            ),
            o(
              'Urban and rural shares stayed almost identical for the whole period',
              false,
              'The lines diverge significantly over time.'
            ),
            o(
              'Both urban and rural shares increased at the same time',
              false,
              'Because the graph shows shares of the total population, one rises while the other falls.'
            ),
          ]
        ),
        q('What is significant about the point where the two lines cross?', [
          o(
            'It marks the period when the urban population became larger than the rural population',
            true,
            'Correct. The crossing point signals the moment urban share overtook rural share.'
          ),
          o(
            'It shows the year when population growth stopped',
            false,
            'The graph is about percentages, not total population stopping.'
          ),
          o(
            'It marks the creation of suburbs',
            false,
            'The graph does not identify that specific event.'
          ),
          o(
            'It proves the rural population disappeared',
            false,
            'The rural share declines, but it does not disappear.'
          ),
        ]),
        q(
          'Why is this graph useful for studying social change in the United States?',
          [
            o(
              'It visually tracks long-term urbanization across more than a century',
              true,
              'Correct. The graph makes the shift from rural to urban life easy to compare over time.'
            ),
            o(
              'It gives the unemployment rate for each decade',
              false,
              'The graph tracks urban and rural population shares, not unemployment.'
            ),
            o(
              'It identifies every major city by name',
              false,
              'It shows national percentages, not a city-by-city list.'
            ),
            o(
              'It compares federal spending categories',
              false,
              'That belongs to a different kind of chart.'
            ),
          ]
        ),
      ],
    },
  '/images/Social%20Studies/unclassified_0004.png': {
    questions: [
      q(
        'Which election year shown most clearly reflects a strong third-party Progressive challenge?',
        [
          o(
            '1912',
            true,
            "Correct. The 1912 panel includes Theodore Roosevelt's Progressive candidacy, which visibly reshaped the electoral and popular-vote breakdown."
          ),
          o(
            '1908',
            false,
            '1908 does not show the same major Progressive split.'
          ),
          o(
            '1916',
            false,
            '1916 is competitive, but it is not the landmark third-party split shown in 1912.'
          ),
          o(
            '1920',
            false,
            '1920 does not show the same Progressive disruption visible in 1912.'
          ),
        ]
      ),
      q(
        'Why is it useful that each election year includes both a state map and pie charts?',
        [
          o(
            'Together they show both where parties won and how electoral and popular support differed',
            true,
            'Correct. The maps reveal geography while the pie charts summarize vote shares.'
          ),
          o(
            "Because pie charts alone show every state's result",
            false,
            'Pie charts summarize totals, but they do not show state-by-state outcomes.'
          ),
          o(
            'Because the maps make candidate names unnecessary',
            false,
            'The panels still rely on candidate and party labels for interpretation.'
          ),
          o(
            'Because maps and pie charts always produce identical information',
            false,
            'The two displays complement each other rather than duplicate exactly the same information.'
          ),
        ]
      ),
      q(
        'What broader political change can a student trace by comparing these four election panels side by side?',
        [
          o(
            'Shifts in party strength and electoral coalitions across the Progressive Era',
            true,
            'Correct. Looking across 1908, 1912, 1916, and 1920 reveals changing alliances and vote patterns over time.'
          ),
          o(
            'The rise and fall of the Roman Empire',
            false,
            'The image is about U.S. presidential elections, not ancient history.'
          ),
          o(
            'Changes in Cold War alliances',
            false,
            'These are early-20th-century U.S. elections, not Cold War maps.'
          ),
          o(
            'The spread of suburban growth after World War II',
            false,
            'That is outside the period and type of data shown here.'
          ),
        ]
      ),
    ],
  },
});

module.exports = {
  SOCIAL_STUDIES_IMAGE_QUESTION_SETS,
};
