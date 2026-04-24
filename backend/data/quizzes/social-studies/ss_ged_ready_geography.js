/**
 * GED Ready-Style Geography — Passage, Scenario, and Data Questions
 * Modeled after GED Ready® Social Studies exam format:
 *   - Push/pull migration, climate-driven settlement, urbanization data,
 *     regional resources, human-environment interaction
 *   - Mix of short geography passages, scenarios, and data tables
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'easy',
    topic: 'Geography',
    contentArea: 'geography',
    passage:
      'This passage describes how geographers explain why people move from one place to another.\n\nGeographers often use the concepts of <strong>push factors</strong> and <strong>pull factors</strong> to explain migration. Push factors are conditions that drive people away from their current location. Common push factors include war, persecution, natural disasters, famine, and a lack of jobs. Pull factors are conditions that attract people to a new location. Common pull factors include better job opportunities, religious or political freedom, family connections, and access to better schools or health care.\n\nMany migration decisions involve both push and pull factors at the same time. For example, a family that leaves a region because of drought-driven crop failures (a push factor) may settle in a city where they have relatives and where factory work is available (pull factors).',
    question:
      'A family leaves their village because ongoing civil war has made it unsafe to stay. They settle in another country where they have cousins and can apply for asylum. Which statement best identifies the push and pull factors in this scenario?',
    answerOptions: [
      {
        text: 'The civil war is a push factor; family connections and asylum protection are pull factors.',
        rationale:
          'Correct. The passage defines push factors as conditions driving people away (war fits) and pull factors as conditions attracting people (family ties and asylum protection fit).',
        isCorrect: true,
      },
      {
        text: 'The civil war is a pull factor; family connections are push factors.',
        rationale:
          'This reverses the definitions. War drives people away (push), and family ties attract people (pull).',
        isCorrect: false,
      },
      {
        text: 'Both the civil war and the asylum protection are push factors.',
        rationale:
          'Asylum protection is something the family is moving toward, which makes it a pull factor, not a push factor.',
        isCorrect: false,
      },
      {
        text: 'Migration in this case has no identifiable push or pull factors.',
        rationale:
          'The scenario clearly contains both kinds of factors, matching the categories described in the passage.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'medium',
    topic: 'Geography',
    contentArea: 'geography',
    passage:
      'This passage describes climate and human settlement patterns.\n\nThroughout history, most large human settlements have developed in places with a reliable supply of fresh water, moderate climates, and fertile soil. Early civilizations such as Mesopotamia, Egypt, the Indus Valley, and ancient China grew up in river valleys, where seasonal flooding renewed soils and rivers provided water for drinking, irrigation, and transportation.\n\nIn contrast, regions with extreme climates — very cold tundra, arid desert interiors, and dense tropical rainforests — generally support smaller, more dispersed populations. Modern technology (irrigation, air conditioning, refrigerated shipping) has made it possible for cities to grow in less hospitable environments, such as Phoenix in the Arizona desert or Las Vegas in the Mojave. However, those cities depend heavily on imported water and energy resources, leaving them vulnerable to drought and rising costs.',
    question: 'Which conclusion is best supported by the passage?',
    answerOptions: [
      {
        text: 'Geography no longer affects where modern cities can be built.',
        rationale:
          'The passage notes modern technology lets cities grow in harsher environments, but it also stresses these cities are "vulnerable to drought and rising costs," meaning geography still matters.',
        isCorrect: false,
      },
      {
        text: 'River valleys are typically poor places for large settlements because of flooding.',
        rationale:
          'The passage describes river valleys as ideal for early civilizations because seasonal flooding renewed soils and rivers supported drinking water, irrigation, and transport.',
        isCorrect: false,
      },
      {
        text: 'Cities in extreme climates can grow with technology, but they remain dependent on imported resources such as water and energy.',
        rationale:
          'Correct. The passage cites Phoenix and Las Vegas as examples of cities made possible by technology while emphasizing that they "depend heavily on imported water and energy resources."',
        isCorrect: true,
      },
      {
        text: 'Most large historical civilizations developed in tropical rainforests.',
        rationale:
          'The passage states the opposite — tropical rainforests typically support smaller, more dispersed populations, while large early civilizations grew in river valleys.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'medium',
    topic: 'Geography',
    contentArea: 'data_interpretation',
    passage:
      'This information is from the U.S. Census Bureau.\n\n<strong>Percentage of U.S. Population Living in Urban Areas, Selected Years</strong>\n<table><thead><tr><th>Year</th><th>Total Population (millions)</th><th>Urban Population (%)</th><th>Rural Population (%)</th></tr></thead><tbody><tr><td>1900</td><td>76</td><td>40%</td><td>60%</td></tr><tr><td>1920</td><td>106</td><td>51%</td><td>49%</td></tr><tr><td>1950</td><td>151</td><td>64%</td><td>36%</td></tr><tr><td>1980</td><td>227</td><td>74%</td><td>26%</td></tr><tr><td>2010</td><td>309</td><td>81%</td><td>19%</td></tr></tbody></table>',
    question: 'Which statement is best supported by the data in the table?',
    answerOptions: [
      {
        text: 'The total U.S. rural population fell to nearly zero by 2010.',
        rationale:
          'Even though the rural share fell to 19% in 2010, that share of 309 million is roughly 59 million people — far from "nearly zero."',
        isCorrect: false,
      },
      {
        text: 'The urban share of the U.S. population first surpassed the rural share between 1900 and 1920.',
        rationale:
          'Correct. The urban share moved from 40% in 1900 to 51% in 1920, which is when it first crossed the 50% line and exceeded the rural share.',
        isCorrect: true,
      },
      {
        text: 'The total U.S. population shrank between 1900 and 2010.',
        rationale:
          'The total population grew from 76 million in 1900 to 309 million in 2010 — a roughly fourfold increase.',
        isCorrect: false,
      },
      {
        text: 'The rural population share grew steadily from 1900 to 2010.',
        rationale:
          'The rural share fell at every step shown, from 60% in 1900 to 19% in 2010 — the opposite of growing.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'medium',
    topic: 'Geography',
    contentArea: 'geography',
    passage:
      "This passage describes economic geography in the United States.\n\nDifferent regions of the United States have historically specialized in different economic activities, shaped largely by their natural environments and resources. The Great Plains, with deep soils and a relatively flat landscape, became a center for large-scale wheat farming and ranching. The Pacific Northwest, with abundant forests and heavy rainfall, developed major lumber and salmon industries. The southeastern coastal plain, with mild winters and access to ports, became known for cotton, tobacco, and later, citrus and tourism. The northeastern Megalopolis (the Boston-to-Washington corridor) sits on the country's most concentrated network of harbors, rivers, and rail lines, which helped make it a hub for finance, manufacturing, and government.",
    question:
      'A geographer is asked to explain why long-distance freight rail lines tend to converge in the Midwest. Which generalization from the passage best supports an answer?',
    answerOptions: [
      {
        text: 'Regions specialize in economic activities shaped by their natural environments and resources, and infrastructure tends to follow those activities.',
        rationale:
          "Correct. The passage repeatedly links each region's economic activity (wheat, lumber, ports, finance) to its natural environment and notes that the Northeast's rail lines exist where its harbors, rivers, and corridors are. By the same logic, freight rail networks would converge in the Midwest because that region's grain, livestock, and manufacturing activity demand heavy shipping.",
        isCorrect: true,
      },
      {
        text: 'Regions of the United States have nearly identical economic activities, so freight rail location is essentially random.',
        rationale:
          'The passage emphasizes regional specialization, not similarity. This contradicts the central point of the passage.',
        isCorrect: false,
      },
      {
        text: 'The Midwest is mountainous, which forces rail lines to share narrow passes.',
        rationale:
          'The Midwest is generally flat (the passage notes the Great Plains are "relatively flat"), not mountainous. This is a factual error.',
        isCorrect: false,
      },
      {
        text: 'Freight rail is determined entirely by federal law, regardless of geography.',
        rationale:
          'The passage focuses on natural environment and resources as the main shapers of regional economic patterns, not federal law.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'hard',
    topic: 'Geography',
    contentArea: 'geography',
    passage:
      'This passage describes the Dust Bowl of the 1930s.\n\nDuring the 1920s, farmers across the southern Great Plains plowed millions of acres of native grassland to plant wheat. Wheat prices were high and rainfall during that decade was unusually generous. The deep-rooted prairie grasses that had held the soil in place for thousands of years were replaced with shallow-rooted crops.\n\nIn the 1930s, severe drought returned to the region. With no protective grass cover, the dry topsoil was lifted by powerful winds into massive dust storms — the largest of which, in April 1935, darkened skies as far east as Washington, D.C. Crops failed, livestock died, and large numbers of farm families abandoned their land. Many migrated west, especially to California, in search of work. In response, the federal government created the Soil Conservation Service to promote contour plowing, crop rotation, windbreaks, and other practices designed to protect soil from future erosion.',
    question:
      'Which generalization about human-environment interaction is best supported by the passage?',
    answerOptions: [
      {
        text: 'Land-use changes that ignore underlying environmental conditions can produce severe ecological and social consequences when conditions change.',
        rationale:
          'Correct. The passage shows that replacing deep-rooted native grasses with wheat worked only while rainfall was generous. When drought returned, the lack of protective vegetation interacted with strong winds to produce the Dust Bowl, leading to crop failure, migration, and federal conservation reforms.',
        isCorrect: true,
      },
      {
        text: 'Modern farming methods are always more sustainable than traditional land use.',
        rationale:
          'The passage describes a modern land-use change (plowing native grassland for wheat) that was less sustainable than the prior natural cover, contradicting this generalization.',
        isCorrect: false,
      },
      {
        text: 'Drought is the only factor that caused the Dust Bowl.',
        rationale:
          'The passage clearly states the Dust Bowl resulted from the combination of drought and the prior removal of deep-rooted native grasses by intensive plowing — not drought alone.',
        isCorrect: false,
      },
      {
        text: 'The federal government had no role in responding to the crisis.',
        rationale:
          'The passage explicitly describes the federal government creating the Soil Conservation Service to promote contour plowing, crop rotation, and windbreaks.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'text',
    difficulty: 'medium',
    topic: 'Geography',
    contentArea: 'geography',
    passage:
      "This scenario describes a coastal community.\n\nA small coastal town of about 8,000 people sits at the mouth of a river on the Atlantic seaboard. Most residents work in fishing, tourism, or shipbuilding. In recent decades, sea levels have risen and stronger storms have battered the coast more frequently. The town's mayor is considering three policy options:\n\n1. <strong>Hardening:</strong> Build sea walls and reinforce existing buildings.\n2. <strong>Accommodation:</strong> Raise houses on stilts and require flood-resistant construction in new buildings.\n3. <strong>Managed retreat:</strong> Help residents in the lowest-lying neighborhoods relocate inland over time.",
    question:
      'Which statement best describes the geographic trade-off the mayor faces in choosing among these options?',
    answerOptions: [
      {
        text: 'Each option balances the cost and feasibility of staying in place against the long-term risk of repeated flooding.',
        rationale:
          'Correct. Hardening and accommodation try to keep people where they are at a higher infrastructure cost but with continuing flood risk; managed retreat reduces long-term flood risk but moves people away from current jobs and community, making this a classic geographic trade-off between cost, place, and risk.',
        isCorrect: true,
      },
      {
        text: 'All three options have identical economic and environmental effects.',
        rationale:
          'The three options differ substantially in cost, who is displaced, and how much long-term flood risk remains, so they are not equivalent.',
        isCorrect: false,
      },
      {
        text: 'Only managed retreat would protect any property in the town.',
        rationale:
          'Hardening and accommodation are explicitly designed to protect property in place. Managed retreat is one of three valid options, not the only one that protects anything.',
        isCorrect: false,
      },
      {
        text: "The mayor's decision has nothing to do with geography because climate change is a global issue.",
        rationale:
          'The local geography (coast, river mouth, low-lying neighborhoods) is exactly what determines how each option would affect the town, so geography is central to the decision.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'text',
    difficulty: 'easy',
    topic: 'Geography',
    contentArea: 'geography',
    passage:
      "This passage describes how maps use scale.\n\nA map's <strong>scale</strong> shows the relationship between distance on the map and distance on the ground. A <strong>large-scale</strong> map covers a small area in great detail — for example, a city street map. A <strong>small-scale</strong> map covers a large area with less detail — for example, a map of an entire continent. Choosing the right scale depends on the question being asked. A delivery driver navigating a single neighborhood needs a large-scale map; an airline planner studying global flight routes needs a small-scale world map.",
    question:
      'A geographer wants to compare growing seasons across all of North America. Which type of map would be most appropriate?',
    answerOptions: [
      {
        text: 'A small-scale map showing the entire continent and broad climate zones.',
        rationale:
          'Correct. The passage explains that small-scale maps cover large areas with less detail, which fits the need to compare conditions across an entire continent.',
        isCorrect: true,
      },
      {
        text: 'A large-scale map of one city block.',
        rationale:
          'A single block is far too small an area to show variation in growing seasons across an entire continent.',
        isCorrect: false,
      },
      {
        text: 'A large-scale map of one county within the United States.',
        rationale:
          'A single county is still much smaller than North America. A large-scale county map would cover only a tiny part of the area in question.',
        isCorrect: false,
      },
      {
        text: 'A floor plan of a research laboratory.',
        rationale:
          'A floor plan shows the inside of a building, not geographic variation across a continent.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'text',
    difficulty: 'medium',
    topic: 'Geography',
    contentArea: 'geography',
    passage:
      'This passage describes globalization and its effects on places.\n\n<strong>Globalization</strong> refers to the increasing interconnection of economies, cultures, and populations across the world. Faster shipping, cheaper communication, and lower trade barriers have made it easier for businesses to move materials, products, and information across borders. As a result, a single product — such as a smartphone — may be designed in California, manufactured from parts produced in Japan, South Korea, and Germany, and assembled in China before being sold worldwide.\n\nGlobalization can lower prices for consumers and create new opportunities, but it can also disrupt local economies. Communities that once depended on a single industry — such as steel towns in Pennsylvania or textile towns in North Carolina — have sometimes lost large numbers of jobs when factories moved overseas in search of lower labor costs.',
    question:
      'Which conclusion about globalization is most strongly supported by the passage?',
    answerOptions: [
      {
        text: 'Globalization only affects countries with low labor costs.',
        rationale:
          'The passage describes effects on countries on both sides of the trade — California, Japan, South Korea, Germany, China, and U.S. towns that lost factories — so its effects are clearly broader.',
        isCorrect: false,
      },
      {
        text: 'Globalization creates winners and losers: it can lower prices and open opportunities while also disrupting communities tied to a single industry.',
        rationale:
          'Correct. The passage describes both benefits ("lower prices for consumers and create new opportunities") and disruption (single-industry steel and textile towns losing jobs when factories moved overseas), supporting a winners-and-losers conclusion.',
        isCorrect: true,
      },
      {
        text: 'Globalization has had no measurable effect on U.S. communities.',
        rationale:
          'The passage explicitly cites steel towns in Pennsylvania and textile towns in North Carolina as communities that lost large numbers of jobs because of globalization.',
        isCorrect: false,
      },
      {
        text: 'Modern smartphones are made entirely in a single country.',
        rationale:
          "The passage describes a smartphone's parts coming from Japan, South Korea, Germany, and China, with design in California — explicitly a multi-country supply chain.",
        isCorrect: false,
      },
    ],
  },
];
