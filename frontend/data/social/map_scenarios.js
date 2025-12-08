/**
 * map_scenarios.js - Map Explorer data
 * Geography and map-reading scenarios for GED Social Studies
 */

export const MAP_SCENARIOS = [
  {
    id: 'us_regions_midwest',
    difficulty: 'easy',
    tags: ['us', 'regions', 'geography'],
    title: 'U.S. Regions – The Midwest',
    prompt: 'On this map, which region is best known as the Midwest?',
    choices: [
      { id: 'A', label: 'Region A (Pacific Coast)', isCorrect: false },
      { id: 'B', label: 'Region B (Central United States)', isCorrect: true },
      { id: 'C', label: 'Region C (Southern States)', isCorrect: false },
      { id: 'D', label: 'Region D (Northeast)', isCorrect: false },
    ],
    explanation:
      'The Midwest is the central-northern region including states like Ohio, Indiana, Illinois, and Iowa. It is characterized by agricultural production and industrial cities.',
    imageKey: 'us_regions_basic',
  },
  {
    id: 'us_regions_south',
    difficulty: 'easy',
    tags: ['us', 'regions', 'climate'],
    title: 'U.S. Regions – The South',
    prompt: 'Which region on the map represents the Southern United States?',
    choices: [
      { id: 'A', label: 'Region A', isCorrect: false },
      { id: 'B', label: 'Region B', isCorrect: false },
      {
        id: 'C',
        label: 'Region C (states below the Mason-Dixon line)',
        isCorrect: true,
      },
      { id: 'D', label: 'Region D', isCorrect: false },
    ],
    explanation:
      'The South includes states like Texas, Florida, Georgia, and the Carolinas. This region has a warm climate and rich historical significance.',
    imageKey: 'us_regions_basic',
  },
  {
    id: 'world_continents_africa',
    difficulty: 'easy',
    tags: ['world', 'continents', 'geography'],
    title: 'World Continents – Africa',
    prompt: 'Which continent on this world map is Africa?',
    choices: [
      { id: 'A', label: 'Continent A', isCorrect: false },
      {
        id: 'B',
        label: 'Continent B (south of Europe, east of Atlantic)',
        isCorrect: true,
      },
      { id: 'C', label: 'Continent C', isCorrect: false },
      { id: 'D', label: 'Continent D', isCorrect: false },
    ],
    explanation:
      'Africa is the second-largest continent, located south of Europe and spanning from the Mediterranean Sea to the Indian Ocean. It is home to 54 recognized countries.',
    imageKey: 'world_continents',
  },
  {
    id: 'us_major_rivers_mississippi',
    difficulty: 'medium',
    tags: ['us', 'geography', 'rivers'],
    title: 'Major U.S. Rivers – The Mississippi',
    prompt: 'Which river on this map represents the Mississippi River?',
    choices: [
      { id: 'A', label: 'River A (Pacific side)', isCorrect: false },
      {
        id: 'B',
        label: 'River B (flows north-south through central US)',
        isCorrect: true,
      },
      { id: 'C', label: 'River C (northeastern river)', isCorrect: false },
      { id: 'D', label: 'River D (Texas region)', isCorrect: false },
    ],
    explanation:
      'The Mississippi River is the second-longest river in North America. It flows from Minnesota southward through the central United States to the Gulf of Mexico and was crucial to American commerce and settlement.',
    imageKey: 'us_rivers',
  },
  {
    id: 'trade_routes_triangular',
    difficulty: 'medium',
    tags: ['history', 'trade', 'geography'],
    title: 'Historical Trade Routes – Triangular Trade',
    prompt:
      'Based on this map of trade routes, which arrow represents cargo traveling from Africa to the Americas?',
    choices: [
      { id: 'A', label: 'Route A (Europe to Americas)', isCorrect: false },
      { id: 'B', label: 'Route B (Africa to Americas)', isCorrect: true },
      { id: 'C', label: 'Route C (Americas to Europe)', isCorrect: false },
      { id: 'D', label: 'Route D (local coastal trade)', isCorrect: false },
    ],
    explanation:
      'The Triangular Trade involved the transport of enslaved people from Africa to the Americas. This tragic trade route was a significant part of the colonial Atlantic economy.',
    imageKey: 'triangular_trade_routes',
  },
  {
    id: 'asia_geography_major_cities',
    difficulty: 'medium',
    tags: ['world', 'geography', 'cities'],
    title: 'Asian Geography – Population Centers',
    prompt:
      'Which region on this map shows East Asia with high population density?',
    choices: [
      { id: 'A', label: 'Region A (sparse western areas)', isCorrect: false },
      {
        id: 'B',
        label: 'Region B (eastern coastal and central areas)',
        isCorrect: true,
      },
      {
        id: 'C',
        label: 'Region C (southern island nations)',
        isCorrect: false,
      },
      { id: 'D', label: 'Region D (northern regions)', isCorrect: false },
    ],
    explanation:
      "East Asia, particularly eastern China, Japan, and South Korea, contains some of the world's highest population densities. These areas are economic powerhouses in the global economy.",
    imageKey: 'asia_map',
  },
  {
    id: 'colonial_america_thirteen_colonies',
    difficulty: 'medium',
    tags: ['us_history', 'geography', 'colonial'],
    title: 'Colonial America – The Thirteen Colonies',
    prompt:
      'Based on this map, which region represents the Thirteen Original Colonies?',
    choices: [
      { id: 'A', label: 'Western territories', isCorrect: false },
      {
        id: 'B',
        label: 'Eastern seaboard from Massachusetts to Georgia',
        isCorrect: true,
      },
      { id: 'C', label: 'Great Lakes region', isCorrect: false },
      { id: 'D', label: 'Southern interior plains', isCorrect: false },
    ],
    explanation:
      'The Thirteen Original Colonies stretched along the Atlantic seaboard from present-day New Hampshire to Georgia. These British colonies eventually declared independence and formed the United States.',
    imageKey: 'colonial_america',
  },
  {
    id: 'time_zone_distribution',
    difficulty: 'hard',
    tags: ['geography', 'time_zones', 'global'],
    title: 'Time Zones – Continental U.S. Time Zones',
    prompt:
      'How many standard time zones are used in the continental United States?',
    choices: [
      { id: 'A', label: '2', isCorrect: false },
      { id: 'B', label: '3', isCorrect: false },
      { id: 'C', label: '4', isCorrect: true },
      { id: 'D', label: '5', isCorrect: false },
    ],
    explanation:
      'The continental United States spans four standard time zones: Pacific, Mountain, Central, and Eastern. This division allows for consistent timekeeping across different regions.',
    imageKey: 'us_time_zones',
  },
];
