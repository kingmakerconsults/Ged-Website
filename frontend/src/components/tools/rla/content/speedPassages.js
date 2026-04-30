// Each passage: ~120-220 words plus 1-2 comprehension MCQs.
export const SPEED_PASSAGES = [
  {
    id: 's1',
    title: 'Community Solar in Small Towns',
    text: `When a small town in Iowa wired its first community solar array to the local grid, residents who could not afford rooftop panels suddenly had a way to lower their power bills. Subscribers paid a monthly fee in exchange for credits on their electric statements, and the town's utility used the income to maintain the array and expand its capacity. Within two years, more than half the households in the area had signed up.

Critics worried that the program would shift costs onto non-subscribers, but a state regulator's audit found that bills for non-subscribers actually fell slightly because the utility avoided several expensive transmission upgrades. Supporters now point to the project as proof that clean energy can be both equitable and financially sound when local governments treat it as shared infrastructure rather than a private benefit.`,
    questions: [
      {
        prompt:
          'Why did the audit find non-subscribers\u2019 bills fell slightly?',
        options: [
          {
            text: 'They received credits without subscribing.',
            correct: false,
            rationale: 'Only subscribers received credits.',
          },
          {
            text: 'The utility avoided expensive transmission upgrades.',
            correct: true,
            rationale: 'Correct — the avoided upgrades reduced overall costs.',
          },
          {
            text: 'The state forced rates lower for fairness.',
            correct: false,
            rationale: 'No state rate cut is mentioned.',
          },
          {
            text: 'Energy demand dropped dramatically.',
            correct: false,
            rationale: 'Demand is not discussed.',
          },
        ],
      },
    ],
  },
  {
    id: 's2',
    title: 'Why Sleep Matters for Memory',
    text: `Researchers studying memory have long observed that students who pull all-night study sessions often perform worse on the next day's exam than peers who get a full night's sleep. Brain-imaging studies suggest a reason. While people sleep, the brain consolidates new information by replaying patterns of activity formed during the day, gradually moving them from short-term storage in the hippocampus to more permanent storage in the cortex.

This consolidation does not happen evenly across the night. Deep, slow-wave sleep that occurs in the early hours seems most important for facts and skills, while later REM sleep supports more creative or emotional memories. Skipping either stage can leave new material poorly anchored, which is why scientists recommend spacing study sessions out and protecting both ends of the night's rest.`,
    questions: [
      {
        prompt:
          'According to the passage, what role does deep slow-wave sleep play?',
        options: [
          {
            text: 'It produces vivid dreams.',
            correct: false,
            rationale: 'That is more closely tied to REM sleep.',
          },
          {
            text: 'It is most important for consolidating facts and skills.',
            correct: true,
            rationale: 'Correct — paragraph two states this directly.',
          },
          {
            text: 'It happens mostly in the morning.',
            correct: false,
            rationale: 'It occurs in the early hours of the night.',
          },
          {
            text: 'It replaces the need for studying.',
            correct: false,
            rationale: 'Sleep supports learning but does not replace study.',
          },
        ],
      },
    ],
  },
  {
    id: 's3',
    title: 'Public Libraries Beyond Books',
    text: `Public libraries in many U.S. cities have quietly expanded into civic centers that lend far more than books. A typical branch may now circulate sewing machines, hotspots for home internet, telescopes, and even cake pans. Librarians explain that lending these items lowers the cost of trying something new, whether that means starting a small business or completing a school science project.

The shift is partly a response to the digital divide. Households without reliable internet cannot apply for jobs, complete homework, or schedule medical appointments easily, so libraries fill the gap with after-hours Wi-Fi access and laptop loans. Critics ask whether libraries should focus on books, but data from several cities shows that branches with these services see higher overall foot traffic, more programs attended, and increased book circulation as well.`,
    questions: [
      {
        prompt:
          'The author cites foot traffic and book circulation data mainly to:',
        options: [
          {
            text: 'argue libraries should stop lending non-book items.',
            correct: false,
            rationale:
              'Opposite — the data supports the broader lending model.',
          },
          {
            text: 'show that expanded services strengthen rather than weaken the library.',
            correct: true,
            rationale: 'Correct — the data answers the critics.',
          },
          {
            text: 'prove that book circulation is declining nationwide.',
            correct: false,
            rationale: 'The passage says circulation rose in those cities.',
          },
          {
            text: 'demonstrate that telescopes are the most popular item.',
            correct: false,
            rationale: 'No popularity ranking is given.',
          },
        ],
      },
    ],
  },
  {
    id: 's4',
    title: 'The Quiet Power of Walking',
    text: `Doctors have spent decades urging patients to add aerobic exercise to their routines, but recent research suggests that even moderate walking carries powerful health benefits. A study tracking more than 78,000 adults found that those who took at least 8,000 steps per day had a notably lower risk of premature death than those who took fewer than 4,000.

The benefits did not stop with longevity. Participants who walked regularly reported better sleep, lower stress, and steadier blood sugar after meals. The researchers noted that walking is unusual among interventions because it requires no equipment, no gym membership, and no specialized training. For most adults, simply choosing the longer route to the bus stop or the stairs over the elevator is enough to begin moving the dial.`,
    questions: [
      {
        prompt: 'Which sentence best summarizes the main idea?',
        options: [
          {
            text: 'Walking 8,000 steps a day is the only way to stay healthy.',
            correct: false,
            rationale:
              'The passage doesn\u2019t claim walking is the only way.',
          },
          {
            text: 'Moderate walking provides broad health benefits with low barriers to entry.',
            correct: true,
            rationale: 'Correct — captures the central argument.',
          },
          {
            text: 'Walking is more effective than running for athletic performance.',
            correct: false,
            rationale: 'No comparison to running is made.',
          },
          {
            text: 'Most adults should avoid stairs to prevent injury.',
            correct: false,
            rationale: 'Opposite of the recommendation.',
          },
        ],
      },
    ],
  },
  {
    id: 's5',
    title: 'How Cities Cool Themselves',
    text: `As summers grow hotter, city planners have begun treating shade and reflective surfaces as critical infrastructure. Painting roofs white can drop indoor temperatures by several degrees, while planting street trees lowers nearby surface temperatures by as much as twenty degrees Fahrenheit on the hottest afternoons. Cities that combine these approaches see lower air-conditioning bills and fewer heat-related hospital visits.

Implementation is not always straightforward. Tree-planting programs require long-term watering plans, and reflective coatings are sometimes blocked by historic-district rules. Yet planners argue that the cost of inaction is far higher: a 2023 federal report estimated that extreme heat already causes more weather-related deaths in the United States than hurricanes and floods combined.`,
    questions: [
      {
        prompt: 'Why does the author cite the 2023 federal report?',
        options: [
          {
            text: 'To downplay the severity of summer heat.',
            correct: false,
            rationale: 'It does the opposite.',
          },
          {
            text: 'To stress the urgency of cooling investments.',
            correct: true,
            rationale:
              'Correct — extreme heat outpacing hurricanes and floods motivates the investment.',
          },
          {
            text: 'To argue that hurricanes are no longer a threat.',
            correct: false,
            rationale: 'No such argument is made.',
          },
          {
            text: 'To show that reflective coatings are unaffordable.',
            correct: false,
            rationale:
              'Cost of inaction is what is highlighted, not coating costs.',
          },
        ],
      },
    ],
  },
];
