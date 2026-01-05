export const RLA_QUESTIONS = {
  'Reasoning Through Language Arts (RLA)': {
    icon: 'BookOpenIcon',
    categories: {
      'Reading Comprehension: Informational Texts': {
        description:
          'Practice analyzing non-fiction texts to find main ideas, evaluate arguments, and interpret graphics.',
        topics: [
          {
            id: 'rla_info_main_idea',
            title: 'Main Idea & Details',
            description:
              'Finding the central idea and supporting evidence in non-fiction.',
            quizzes: [
              {
                id: 'rla_info_main_idea_set1',
                label: 'Main Idea & Supporting Details',
                questionSourceTopicId: 'rla_info_main_idea',
              },
              {
                id: 'rla_informational_texts_informational_texts_quiz2',
                label: "Author's Purpose & Point of View",
              },
              {
                id: 'rla_informational_texts_informational_texts_quiz3',
                label: 'Making Inferences from Context',
              },
            ],
            article: {
              title:
                'Community Makerspaces: Shared Workshops for a New Economy',
              genre: 'Informational Article',
              text: [
                'Across the country, community makerspaces have become a practical response to the skills gap created by rapid automation. These shared workshops combine digital design labs with traditional tools, giving residents a place to experiment with laser cutters, 3D printers, and sewing machines without having to invest in costly equipment. Coordinators describe the spaces as a bridge between the curiosity people feel when they see new technology online and the confidence they need to use it on the job.',
                'Unlike a traditional classroom, a makerspace operates on an open lab model. Members can attend scheduled trainings, but they are also free to work alongside mentors, retirees, and nascent entrepreneurs who are already building prototypes. The mix of self-directed tinkering and guided instruction means that a participant might learn how to repair a bicycle in the same evening that someone else debuts a design for a medical device attachment.',
                'The economic ripple effects are becoming measurable. A 2023 survey of six regional makerspaces found that 62% of regular members completed a prototype that later informed a promotion, contract, or small business launch. Local workforce boards cite the statistic frequently when pitching employers on tuition sponsorships, arguing that the spaces accelerate reskilling far faster than a standard semester-long course.',
                'Critics contend that membership fees or specialized equipment still keep marginalized residents on the sidelines. In response, most makerspaces have created sliding-scale pricing, partnered with public libraries to cover evening access, and offered weekend open houses specifically for shift workers and families. One robotics instructor noted that these changes have doubled the number of teenage participants in less than a year.',
                'As municipalities prepare their next decade of economic development plans, makerspaces are increasingly listed alongside broadband and transit projects. City planners argue that reserving funding for tool libraries, instructor stipends, and small-business incubators will ensure that the spaces remain community assets rather than short-lived trends.',
              ],
            },
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['science-4', 'social-5'],
                question:
                  'Which statement best expresses the central idea of the article?',
                answerOptions: [
                  {
                    text: 'Community makerspaces are a temporary fad with little long-term impact.',
                    rationale:
                      'The article presents makerspaces as lasting investments, not fleeting trends.',
                    isCorrect: false,
                  },
                  {
                    text: 'Community makerspaces help residents gain affordable access to modern tools and skills that support career growth.',
                    rationale:
                      'Correct. Every paragraph explains how makerspaces expand access, deliver training, and create economic opportunities.',
                    isCorrect: true,
                  },
                  {
                    text: 'Traditional classrooms are no longer useful for any type of technical training.',
                    rationale:
                      'The author contrasts makerspaces with classrooms but never dismisses classrooms entirely.',
                    isCorrect: false,
                  },
                  {
                    text: 'Municipal budgets should focus exclusively on transit projects instead of technology hubs.',
                    rationale:
                      'Transit is mentioned only as something planners consider alongside makerspaces, not instead of them.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['rla-1', 'rla-7'],
                question:
                  'Which detail best supports the claim that makerspaces widen access to technology?',
                answerOptions: [
                  {
                    text: 'Members can work alongside retirees and entrepreneurs in the open lab.',
                    rationale:
                      'This shows the collaborative setting but not specifically increased access for residents who could not otherwise use technology.',
                    isCorrect: false,
                  },
                  {
                    text: 'A 2023 survey reported that 62% of members completed a prototype that advanced their careers.',
                    rationale:
                      'This statistic focuses on economic outcomes rather than access to technology.',
                    isCorrect: false,
                  },
                  {
                    text: 'Most makerspaces partner with public libraries to cover evening access and offer sliding-scale pricing.',
                    rationale:
                      'Correct. These strategies directly address the barriers that critics say prevent people from using the technology.',
                    isCorrect: true,
                  },
                  {
                    text: 'City planners include makerspaces in long-term development plans.',
                    rationale:
                      'This highlights future investment, not the immediate issue of access.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                challenge_tags: ['rla-1', 'rla-3'],
                question:
                  'According to the third paragraph, what outcome do workforce boards emphasize when promoting makerspaces to employers?',
                answerOptions: [
                  {
                    text: 'The number of weekend open houses held each quarter.',
                    rationale:
                      'Weekend events are mentioned later as a response to critics, not as the main statistic shared with employers.',
                    isCorrect: false,
                  },
                  {
                    text: 'The percentage of members who completed prototypes that led to promotions or business launches.',
                    rationale:
                      'Correct. Workforce boards cite the 62% success rate to convince employers to fund memberships.',
                    isCorrect: true,
                  },
                  {
                    text: 'The amount of grant money city planners allocate for transit projects.',
                    rationale:
                      'Transit funding appears only in the final paragraph, unrelated to employer pitches.',
                    isCorrect: false,
                  },
                  {
                    text: 'The increase in teenage participation during the first year of operation.',
                    rationale:
                      'Teen participation is discussed in paragraph four, not in the context of employer outreach.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['rla-6'],
                question:
                  "As it is used in paragraph two, the word 'nascent' most nearly means:",
                answerOptions: [
                  {
                    text: 'inexperienced or just beginning.',
                    rationale:
                      "Correct. 'Nascent entrepreneurs' are individuals who are just starting to build their businesses.",
                    isCorrect: true,
                  },
                  {
                    text: 'highly profitable.',
                    rationale:
                      'Nothing in the paragraph suggests that the entrepreneurs are already profitable.',
                    isCorrect: false,
                  },
                  {
                    text: 'reluctant to collaborate.',
                    rationale:
                      'The paragraph emphasizes collaboration, not reluctance.',
                    isCorrect: false,
                  },
                  {
                    text: 'fully certified.',
                    rationale:
                      'Certification is not mentioned in the description of the entrepreneurs.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 5,
                question:
                  "Which sentence best captures the author's tone toward makerspaces?",
                answerOptions: [
                  {
                    text: 'They are worthwhile investments that require thoughtful planning to remain accessible.',
                    rationale:
                      'Correct. The author acknowledges challenges but ultimately views makerspaces as beneficial when supported.',
                    isCorrect: true,
                  },
                  {
                    text: 'They are risky experiments that should be paused until more research exists.',
                    rationale:
                      'The author never recommends halting makerspace programs.',
                    isCorrect: false,
                  },
                  {
                    text: 'They benefit hobbyists but offer little value to local economies.',
                    rationale:
                      'The article repeatedly references economic gains and workforce development.',
                    isCorrect: false,
                  },
                  {
                    text: 'They should replace all existing workforce programs immediately.',
                    rationale:
                      'The author presents makerspaces as complementary, not as replacements for every program.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 6,
                question:
                  "Why does the author include the robotics instructor's observation in paragraph four?",
                answerOptions: [
                  {
                    text: 'To prove that weekend open houses are unnecessary.',
                    rationale:
                      'The instructor notes that the outreach doubled teenage participation, showing the events are effective, not unnecessary.',
                    isCorrect: false,
                  },
                  {
                    text: 'To illustrate the concrete results of the accessibility changes makerspaces implemented.',
                    rationale:
                      'Correct. The quote demonstrates how policy changes led to measurable growth among teens.',
                    isCorrect: true,
                  },
                  {
                    text: 'To argue that only teenagers benefit from makerspaces.',
                    rationale:
                      'Teens are one example; other groups are discussed throughout the article.',
                    isCorrect: false,
                  },
                  {
                    text: 'To criticize public libraries for charging fees.',
                    rationale:
                      'Libraries are described as partners that expand access, not as obstacles.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                challenge_tags: ['science-4'],
                question: 'Which concern do critics raise about makerspaces?',
                answerOptions: [
                  {
                    text: 'They lack the advanced tools needed to build prototypes.',
                    rationale:
                      'The article states the opposite: makerspaces offer access to expensive equipment.',
                    isCorrect: false,
                  },
                  {
                    text: 'Membership costs and specialized tools may still exclude marginalized residents.',
                    rationale:
                      'Correct. Paragraph four summarizes this criticism before explaining how spaces responded.',
                    isCorrect: true,
                  },
                  {
                    text: 'They rely entirely on volunteer instructors with no professional experience.',
                    rationale:
                      'Mentors are mentioned, but there is no criticism about expertise.',
                    isCorrect: false,
                  },
                  {
                    text: 'They focus on art projects instead of job training.',
                    rationale:
                      'The article emphasizes workforce and entrepreneurship benefits, not a lack of job focus.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 8,
                question:
                  'Based on the article, which group are weekend open houses designed to serve?',
                answerOptions: [
                  {
                    text: 'Shift workers and families who cannot attend evening classes.',
                    rationale:
                      'Correct. The article explicitly says weekend events are meant to include these groups.',
                    isCorrect: true,
                  },
                  {
                    text: 'Retirees looking for advanced certification programs.',
                    rationale:
                      'Retirees are mentioned as mentors, not as the target audience for weekend programming.',
                    isCorrect: false,
                  },
                  {
                    text: 'Out-of-state entrepreneurs scouting locations.',
                    rationale:
                      'No evidence suggests the events are aimed at visiting entrepreneurs.',
                    isCorrect: false,
                  },
                  {
                    text: 'City planners drafting transit budgets.',
                    rationale:
                      'Transit planning appears later and is unrelated to open houses.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['rla-6'],
                question:
                  'What inference can be made from the final paragraph about the future of makerspaces?',
                answerOptions: [
                  {
                    text: 'They will likely disappear once the current funding cycle ends.',
                    rationale:
                      'City planners are integrating makerspaces into long-term plans, suggesting continuity rather than disappearance.',
                    isCorrect: false,
                  },
                  {
                    text: 'Their success depends on being viewed as part of broader infrastructure investments.',
                    rationale:
                      'Correct. The paragraph notes that planners place makerspaces alongside broadband and transit to secure sustained funding.',
                    isCorrect: true,
                  },
                  {
                    text: 'They will replace the need for broadband or transportation improvements.',
                    rationale:
                      'The author says makerspaces are listed alongside these projects, not as replacements.',
                    isCorrect: false,
                  },
                  {
                    text: 'They will no longer require instructor stipends to operate effectively.',
                    rationale:
                      'The paragraph explicitly recommends funding instructor stipends to keep spaces viable.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 10,
                challenge_tags: ['social-5', 'science-4'],
                question:
                  'Which sentence from the article best supports the idea that makerspaces boost the local economy?',
                answerOptions: [
                  {
                    text: 'Coordinators describe the spaces as a bridge between curiosity and confidence.',
                    rationale:
                      'This sentence speaks to motivation, not economic impact.',
                    isCorrect: false,
                  },
                  {
                    text: 'Members can attend scheduled trainings but are also free to work alongside mentors.',
                    rationale:
                      'This detail explains the format of the makerspace, not its economic effect.',
                    isCorrect: false,
                  },
                  {
                    text: 'A 2023 survey of six regional makerspaces found that 62% of regular members completed a prototype that later informed a promotion, contract, or small business launch.',
                    rationale:
                      'Correct. The statistic directly links makerspace participation to promotions and new businesses.',
                    isCorrect: true,
                  },
                  {
                    text: 'One robotics instructor noted that outreach changes doubled teenage participation in less than a year.',
                    rationale:
                      'This sentence describes access for teens, not economic growth.',
                    isCorrect: false,
                  },
                ],
              },
            ],
            type: 'reading',
          },
          {
            id: 'rla_info_structure_purpose',
            title: 'Structure & Purpose',
            description:
              "Analyzing text structure and an author's reason for writing.",
            quizzes: [
              {
                id: 'rla_informational_texts_structure_purpose_quiz1',
                label: 'Text Structure & Organization',
              },
              {
                id: 'rla_informational_texts_structure_purpose_quiz2',
                label: 'Argumentative Claims & Evidence',
              },
              {
                id: 'rla_informational_texts_structure_purpose_quiz3',
                label: 'Comparing Multiple Texts',
              },
            ],
            type: 'reading',
            article: {
              title:
                'The Rise of Renewable Energy: Powering a Sustainable Future',
              genre: 'Informational Text (Expository Essay)',
              text: [
                'For over a century, human civilization has been powered predominantly by fossil fuelsâ€”coal, oil, and natural gas. While these energy sources fueled industrial revolutions and unprecedented economic growth, their use has come at a significant environmental cost, most notably climate change driven by greenhouse gas emissions. In response to this mounting crisis, a global energy transition is underway, shifting focus toward renewable sources. These sources, which include solar, wind, hydropower, and geothermal energy, are naturally replenished and produce minimal to no carbon emissions. This transition is not merely an environmental imperative but also a technological and economic evolution, promising a more sustainable and resilient energy future.',
                'At the forefront of this revolution is solar power, which harnesses the immense energy of the sun. The most common method involves photovoltaic (PV) cells, which directly convert sunlight into electricity. Another approach, concentrated solar power (CSP), uses mirrors to focus sunlight to heat a fluid, which then creates steam to power a turbine. The primary advantages of solar energy are its abundance and its clean nature. However, its main drawback is intermittencyit only generates power when the sun is shining. This necessitates the development of large-scale energy storage solutions, such as advanced batteries, to provide reliable power around the clock. Furthermore, large solar farms require significant land area, which can raise concerns about land use and ecosystem impact.',
                'Wind power offers another powerful alternative. Giant turbines, often grouped together in wind farms on land or offshore, capture kinetic energy from the wind and convert it into electricity. Like solar power, wind is a clean energy source, but it shares the same challenge of intermittency, as it is dependent on weather patterns. The visual impact of turbines on landscapes and potential harm to avian wildlife, such as birds and bats, are also significant concerns that require careful planning and mitigation.',
                "Hydropower and geothermal energy provide more consistent, or baseload, power. Hydropower, generated by the force of flowing water turning turbines in dams, is one of the oldest and most established forms of renewable energy. It is highly reliable and can be dispatched on demand. The main limitation is its environmental impact; large dams can alter river ecosystems, disrupt fish migration, and displace communities. Geothermal energy taps into the Earth's internal heat, using steam from underground reservoirs to generate electricity. It is a highly reliable and clean source of energy with a small physical footprint. Its primary constraint is geographical, as it is only economically viable in regions with accessible geothermal activity, such as volcanic zones or areas with tectonic plate boundaries.",
                "The complete transition to a renewable energy system presents formidable but surmountable challenges. Beyond the intermittency of solar and wind, modernizing the electrical grid to handle decentralized energy sources is a major hurdle. Smart grids, which use digital technology to manage electricity distribution more efficiently, are essential. Advances in battery technology are critical for storing excess energy for when the sun isn't shining or the wind isn't blowing. Furthermore, supportive government policies, such as carbon pricing and tax incentives for renewable installations, play a crucial role in accelerating this transition. While the path is complex, the collective push toward a renewable-powered world represents a fundamental rethinking of our relationship with energy, aiming for a future that is not only prosperous but also environmentally sustainable for generations to come.",
              ],
            },
            questions: [
              {
                questionNumber: 1,
                question:
                  'Which of the following statements best expresses the main idea of the passage?',
                answerOptions: [
                  {
                    text: 'Hydropower is the most reliable and established form of renewable energy available today.',
                    isCorrect: false,
                  },
                  {
                    text: 'The global shift to renewable energy is a multifaceted response to the environmental impact of fossil fuels, driven by technology and policy.',
                    isCorrect: true,
                  },
                  {
                    text: 'The primary challenge of renewable energy is overcoming the high cost of solar panels and wind turbines.',
                    isCorrect: false,
                  },
                  {
                    text: 'Fossil fuels, despite their environmental drawbacks, remain the only viable option for large-scale energy production.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "In paragraphs 2 and 3, the word 'intermittency' is used to describe a key challenge for solar and wind power. This term most nearly means:",
                answerOptions: [
                  { text: 'The high cost of installation.', isCorrect: false },
                  {
                    text: 'The state of being inconsistent or not continuous.',
                    isCorrect: true,
                  },
                  {
                    text: 'The potential harm to local wildlife.',
                    isCorrect: false,
                  },
                  {
                    text: 'The requirement for large areas of land.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'According to the passage, what is the primary environmental motivation for transitioning to renewable energy?',
                answerOptions: [
                  {
                    text: 'To reduce the visual impact of power plants on landscapes.',
                    isCorrect: false,
                  },
                  {
                    text: 'To mitigate climate change caused by greenhouse gas emissions from fossil fuels.',
                    isCorrect: true,
                  },
                  {
                    text: 'To prevent the disruption of fish migration caused by large dams.',
                    isCorrect: false,
                  },
                  {
                    text: 'To decrease reliance on foreign energy sources.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'The passage suggests that a key difference between hydropower/geothermal energy and solar/wind energy is:',
                answerOptions: [
                  { text: 'their cost-effectiveness.', isCorrect: false },
                  { text: 'their geographical limitations.', isCorrect: false },
                  {
                    text: 'their level of reliability and consistency.',
                    isCorrect: true,
                  },
                  { text: 'their impact on avian wildlife.', isCorrect: false },
                ],
              },
              {
                question:
                  'According to paragraph 5, what is the primary purpose of developing smart grids?',
                answerOptions: [
                  {
                    text: 'To lower the cost of electricity for consumers by reducing waste.',
                    isCorrect: false,
                  },
                  {
                    text: 'To generate more power from existing solar and wind farms.',
                    isCorrect: false,
                  },
                  {
                    text: 'To better manage electricity distribution from varied and decentralized sources.',
                    isCorrect: true,
                  },
                  {
                    text: 'To provide tax incentives for homeowners to install their own solar panels.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'The passage mentions all of the following as challenges to the widespread adoption of renewable energy EXCEPT:',
                answerOptions: [
                  {
                    text: 'the need for effective energy storage.',
                    isCorrect: false,
                  },
                  {
                    text: 'the geographical limitations of certain sources.',
                    isCorrect: false,
                  },
                  {
                    text: 'the lack of any viable renewable technology.',
                    isCorrect: true,
                  },
                  {
                    text: 'the necessity of modernizing electrical grids.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'How does the author structure the main body of the text (paragraphs 2-4)?',
                answerOptions: [
                  {
                    text: 'By chronologically detailing the invention of each renewable technology.',
                    isCorrect: false,
                  },
                  {
                    text: 'By comparing and contrasting the economic cost of each energy source.',
                    isCorrect: false,
                  },
                  {
                    text: 'By dedicating separate paragraphs to different types of renewable energy, outlining their pros and cons.',
                    isCorrect: true,
                  },
                  {
                    text: 'By presenting a problem and then immediately offering a single, definitive solution.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "In paragraph 5, the word 'formidable' most nearly means:",
                answerOptions: [
                  { text: 'Simple and easy.', isCorrect: false },
                  {
                    text: 'Inspiring fear or respect through being impressively large or powerful.',
                    isCorrect: true,
                  },
                  { text: 'Unimportant and trivial.', isCorrect: false },
                  { text: 'Related to government policy.', isCorrect: false },
                ],
              },
              {
                question:
                  'Based on the passage, a government wishing to accelerate the transition to renewable energy would most likely:',
                answerOptions: [
                  {
                    text: 'Increase subsidies for fossil fuel companies.',
                    isCorrect: false,
                  },
                  {
                    text: 'Ban the construction of new dams for hydropower.',
                    isCorrect: false,
                  },
                  {
                    text: 'Invest in battery technology and offer tax incentives for solar installations.',
                    isCorrect: true,
                  },
                  {
                    text: 'Focus exclusively on geothermal energy regardless of geographic location.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'The text identifies photovoltaic cells as a technology used in:',
                answerOptions: [
                  { text: 'Wind power generation.', isCorrect: false },
                  { text: 'Geothermal energy extraction.', isCorrect: false },
                  { text: 'Hydropower dams.', isCorrect: false },
                  { text: 'Solar power generation.', isCorrect: true },
                ],
              },
              {
                question:
                  'What can be inferred about the economic aspect of the energy transition?',
                answerOptions: [
                  {
                    text: 'The transition is primarily an economic burden with no financial benefits.',
                    isCorrect: false,
                  },
                  {
                    text: 'It involves significant technological and economic evolution.',
                    isCorrect: true,
                  },
                  {
                    text: 'All renewable technologies are still significantly more expensive than coal or natural gas.',
                    isCorrect: false,
                  },
                  {
                    text: 'The only economic driver for renewables is government mandates.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "In paragraph 4, the term 'baseload' power implies that the energy source is:",
                answerOptions: [
                  {
                    text: 'Available only during peak demand hours.',
                    isCorrect: false,
                  },
                  { text: 'The cheapest available option.', isCorrect: false },
                  { text: 'Geographically restricted.', isCorrect: false },
                  {
                    text: 'Constantly and reliably available.',
                    isCorrect: true,
                  },
                ],
              },
              {
                question:
                  'The author presents the environmental impact of large hydropower dams as:',
                answerOptions: [
                  {
                    text: 'a negligible issue that has been resolved by modern technology.',
                    isCorrect: false,
                  },
                  {
                    text: 'a significant limitation that can alter ecosystems and displace people.',
                    isCorrect: true,
                  },
                  {
                    text: 'a positive effect that creates new habitats for aquatic life.',
                    isCorrect: false,
                  },
                  {
                    text: 'an unproven theory without sufficient evidence.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'What can be inferred from the passage about the future relationship between different renewable energy sources?',
                answerOptions: [
                  {
                    text: 'One single source, like solar, will eventually replace all others.',
                    isCorrect: false,
                  },
                  {
                    text: 'A diverse mix of sources will likely be needed to create a stable and resilient energy system.',
                    isCorrect: true,
                  },
                  {
                    text: 'Fossil fuels will always be required to supplement the intermittency of renewables.',
                    isCorrect: false,
                  },
                  {
                    text: 'International conflict will arise over access to the best locations for wind and solar farms.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'The overall tone of the passage can best be described as:',
                answerOptions: [
                  { text: 'Pessimistic and critical.', isCorrect: false },
                  { text: 'Overly simplistic and biased.', isCorrect: false },
                  {
                    text: 'Informative and cautiously optimistic.',
                    isCorrect: true,
                  },
                  { text: 'Sarcastic and dismissive.', isCorrect: false },
                ],
              },
            ],
          },
          {
            id: 'rla_info_pov',
            title: 'Point of View & Purpose',
            description:
              "Analyzing an author's perspective, bias, and reason for writing.",
            type: 'reading',
            article: {
              title: 'The Case for Year-Round Schooling',
              genre: 'Persuasive Essay',
              text: [
                "The traditional ten-month school calendar, with its long summer break, is an outdated relic of an agrarian past that no longer serves the needs of modern students. It is time for a fundamental shift to a year-round schooling model. A balanced calendar, with shorter, more frequent breaks distributed throughout the year, offers a powerful solution to combat the well-documented 'summer slide'â€”the significant learning loss that occurs over the long summer vacation. This loss is particularly detrimental to students from low-income families, who often lack access to enriching summer activities, thus widening the achievement gap.",
                "Opponents of year-round schooling often raise concerns about disrupting family traditions and the summer tourism industry. While these are valid considerations, they pale in comparison to the profound educational benefits. Shorter breaks mean that teachers spend less time re-teaching old material in the fall, allowing them to cover more ground and delve deeper into complex topics. Furthermore, a balanced calendar can reduce teacher and student burnout by providing more frequent opportunities for rest and rejuvenation. The argument that 'kids need a break' misunderstands the nature of modern learning; the goal is not to eliminate breaks, but to distribute them more effectively to create a continuous and more engaging learning environment.",
                "Ultimately, the transition to year-round schooling is not merely a logistical change; it is an investment in our children's future. It is a commitment to closing the achievement gap, improving academic retention, and creating a more efficient and effective educational system. Clinging to a calendar designed for a bygone era is a disservice to our students. We must have the courage to embrace a model that is better suited to the demands of the 21st century.",
              ],
            },
            questions: [
              {
                questionNumber: 1,
                question:
                  "What is the author's primary purpose in writing this passage?",
                answerOptions: [
                  {
                    text: 'To provide a balanced, neutral overview of different school calendars.',
                    isCorrect: false,
                  },
                  {
                    text: 'To persuade the reader that year-round schooling is superior to the traditional calendar.',
                    isCorrect: true,
                  },
                  {
                    text: 'To criticize the summer tourism industry.',
                    isCorrect: false,
                  },
                  {
                    text: 'To analyze the history of the agrarian school calendar.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "Which statement best describes the author's point of view regarding the traditional school calendar?",
                answerOptions: [
                  {
                    text: 'It is a cherished tradition that should be preserved.',
                    isCorrect: false,
                  },
                  {
                    text: 'It is an effective model for all students, regardless of background.',
                    isCorrect: false,
                  },
                  {
                    text: 'It is an outdated system that hinders student learning.',
                    isCorrect: true,
                  },
                  {
                    text: 'It is a minor issue that does not require significant change.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author uses the phrase 'outdated relic of an agrarian past' in the first paragraph to create a sense of:",
                answerOptions: [
                  {
                    text: 'nostalgia and respect for tradition.',
                    isCorrect: false,
                  },
                  {
                    text: 'the calendar being old-fashioned and no longer useful.',
                    isCorrect: true,
                  },
                  {
                    text: 'the calendar being beneficial for farming communities.',
                    isCorrect: false,
                  },
                  {
                    text: 'the calendar being a complex historical artifact.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'How does the author address the opposing viewpoint that year-round schooling disrupts family traditions?',
                answerOptions: [
                  {
                    text: 'By dismissing it as completely invalid and irrelevant.',
                    isCorrect: false,
                  },
                  {
                    text: 'By acknowledging it as a valid concern but arguing that the educational benefits are more important.',
                    isCorrect: true,
                  },
                  {
                    text: 'By providing evidence that year-round schooling does not disrupt family traditions.',
                    isCorrect: false,
                  },
                  {
                    text: 'By ignoring the opposing viewpoint entirely.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question: "The author's tone can best be described as:",
                answerOptions: [
                  { text: 'uncertain and questioning.', isCorrect: false },
                  { text: 'humorous and lighthearted.', isCorrect: false },
                  { text: 'objective and detached.', isCorrect: false },
                  { text: 'passionate and urgent.', isCorrect: true },
                ],
              },
              {
                question: 'What bias does the author display in the passage?',
                answerOptions: [
                  {
                    text: 'A bias against students from low-income families.',
                    isCorrect: false,
                  },
                  {
                    text: 'A strong bias in favor of year-round schooling.',
                    isCorrect: true,
                  },
                  {
                    text: 'A bias against teachers and school administrators.',
                    isCorrect: false,
                  },
                  {
                    text: 'A neutral and unbiased perspective.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author claims that the 'summer slide' is 'particularly detrimental to students from low-income families.' What is the likely purpose of including this detail?",
                answerOptions: [
                  {
                    text: 'To suggest that only low-income students would benefit from year-round school.',
                    isCorrect: false,
                  },
                  {
                    text: "To appeal to the reader's sense of fairness and social justice.",
                    isCorrect: true,
                  },
                  {
                    text: 'To prove that all summer activities are expensive.',
                    isCorrect: false,
                  },
                  {
                    text: 'To criticize the parents of low-income students.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "In paragraph 2, the author states that concerns about family traditions 'pale in comparison to the profound educational benefits.' The phrase 'pale in comparison' is used to:",
                answerOptions: [
                  {
                    text: 'suggest the two issues are equally important.',
                    isCorrect: false,
                  },
                  {
                    text: 'minimize the importance of the opposing argument.',
                    isCorrect: true,
                  },
                  {
                    text: 'show that the author is changing their mind.',
                    isCorrect: false,
                  },
                  {
                    text: 'indicate that the opposing argument is too complex to discuss.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "What is the author's likely purpose for using strong, emotional language like 'commitment,' 'courage,' and 'disservice' in the final paragraph?",
                answerOptions: [
                  {
                    text: 'To provide statistical evidence.',
                    isCorrect: false,
                  },
                  { text: 'To present a counterargument.', isCorrect: false },
                  {
                    text: 'To create a sense of shared responsibility and inspire action.',
                    isCorrect: true,
                  },
                  {
                    text: 'To maintain a neutral and objective tone.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author's main argument is that year-round schooling should be adopted because:",
                answerOptions: [
                  { text: 'it is a new and modern idea.', isCorrect: false },
                  {
                    text: 'it would save schools money on air conditioning.',
                    isCorrect: false,
                  },
                  {
                    text: 'it provides significant educational advantages, such as reducing learning loss.',
                    isCorrect: true,
                  },
                  {
                    text: 'it is easier for parents to schedule vacations.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "Which of the following best describes the author's perspective on teachers?",
                answerOptions: [
                  {
                    text: 'The author believes teachers are overworked and would benefit from the more frequent breaks in a year-round model.',
                    isCorrect: true,
                  },
                  {
                    text: 'The author believes teachers are the main opponents of year-round schooling.',
                    isCorrect: false,
                  },
                  {
                    text: 'The author believes teachers are not affected by the school calendar.',
                    isCorrect: false,
                  },
                  {
                    text: "The author believes teachers are responsible for the 'summer slide.'",
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'The intended audience for this passage is most likely:',
                answerOptions: [
                  {
                    text: 'students who dislike summer vacation.',
                    isCorrect: false,
                  },
                  {
                    text: 'historians studying agrarian societies.',
                    isCorrect: false,
                  },
                  {
                    text: 'parents, educators, and community members involved in education policy.',
                    isCorrect: true,
                  },
                  {
                    text: 'owners of summer camps and tourist attractions.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question: 'How does the author attempt to build credibility?',
                answerOptions: [
                  {
                    text: 'By citing numerous scientific studies and statistics.',
                    isCorrect: false,
                  },
                  {
                    text: 'By using formal language and presenting a logical argument, while also acknowledging counterarguments.',
                    isCorrect: true,
                  },
                  {
                    text: 'By sharing personal anecdotes about their own school experiences.',
                    isCorrect: false,
                  },
                  {
                    text: 'By claiming to be the sole expert on the topic.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author's use of the word 'clinging' in the final paragraph suggests that adherence to the traditional calendar is:",
                answerOptions: [
                  {
                    text: 'a thoughtful and considered choice.',
                    isCorrect: false,
                  },
                  {
                    text: 'a stubborn and irrational refusal to change.',
                    isCorrect: true,
                  },
                  {
                    text: 'a temporary and flexible arrangement.',
                    isCorrect: false,
                  },
                  { text: 'a popular and modern trend.', isCorrect: false },
                ],
              },
              {
                question:
                  'If this passage were to continue, what would the author most likely discuss next?',
                answerOptions: [
                  {
                    text: 'A detailed history of summer vacation traditions.',
                    isCorrect: false,
                  },
                  {
                    text: 'Specific examples or case studies of schools that have successfully implemented a year-round model.',
                    isCorrect: true,
                  },
                  {
                    text: 'A list of fun activities for students to do during shorter breaks.',
                    isCorrect: false,
                  },
                  {
                    text: 'An argument in favor of homeschooling.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'rla_info_arguments',
            title: 'Analyzing Arguments',
            description:
              'Evaluating claims, evidence, and logical reasoning in persuasive texts.',
            type: 'reading',
            article: {
              title: 'The Necessity of Urban Green Spaces',
              genre: 'Argumentative Article',
              text: [
                'In the concrete jungles of our rapidly growing cities, green spaces are not a luxury; they are a vital necessity. Parks, community gardens, and even small green rooftops are essential infrastructure for a healthy, resilient, and equitable urban future. The argument against dedicating valuable urban real estate to non-commercial use is shortsighted, ignoring the immense economic, environmental, and social returns that green spaces provide. It is imperative that city planners and policymakers prioritize the creation and preservation of these natural oases.',
                'The environmental benefits are the most obvious. Trees and vegetation absorb carbon dioxide, filter air pollutants, and mitigate the urban heat island effect, where dense concentrations of pavement and buildings absorb and retain heat, making cities significantly hotter than surrounding rural areas. A single large tree can provide the cooling effect of ten room-sized air conditioners. Furthermore, green spaces with permeable surfaces can absorb stormwater, reducing runoff and preventing flooding, which saves millions in infrastructure costs.',
                'Beyond the environmental impact, the social and health benefits are profound. Access to green space is directly linked to improved physical and mental health. Studies have consistently shown that time spent in nature reduces stress, lowers blood pressure, and improves overall well-being. Parks and community gardens also serve as crucial social hubs, fostering community cohesion and providing safe places for children to play and for neighbors to interact. In many underserved neighborhoods, a local park is the only available space for recreation and social gathering.',
                "Some may argue that cities facing housing shortages cannot afford to 'waste' land on parks. This is a false dichotomy. Well-designed cities can and must incorporate both affordable housing and accessible green space. In fact, the presence of parks can increase the value of nearby residential properties, creating a more desirable and stable community. The choice is not between housing and parks; it is between short-term, profit-driven development and long-term, sustainable urban planning that values the health and happiness of its citizens.",
              ],
            },
            questions: [
              {
                questionNumber: 1,
                question: "What is the author's main claim in the passage?",
                answerOptions: [
                  {
                    text: 'Cities should focus exclusively on building more affordable housing.',
                    isCorrect: false,
                  },
                  {
                    text: 'Urban green spaces are a critical and necessary component of a healthy city.',
                    isCorrect: true,
                  },
                  {
                    text: 'The environmental benefits of parks outweigh the social benefits.',
                    isCorrect: false,
                  },
                  {
                    text: 'City planners are not doing enough to combat the urban heat island effect.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'Which piece of evidence does the author use to support the claim about environmental benefits?',
                answerOptions: [
                  {
                    text: 'The assertion that parks increase the value of nearby properties.',
                    isCorrect: false,
                  },
                  {
                    text: 'The statement that a single tree can provide the cooling effect of ten air conditioners.',
                    isCorrect: true,
                  },
                  {
                    text: 'The argument that parks foster community cohesion.',
                    isCorrect: false,
                  },
                  {
                    text: 'The claim that time spent in nature reduces stress.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'In paragraph 4, the author addresses the counterargument that cities need land for housing, not parks. How does the author rebut this point?',
                answerOptions: [
                  {
                    text: 'By arguing that housing is not as important as parks.',
                    isCorrect: false,
                  },
                  {
                    text: 'By agreeing that parks should only be built if there is no housing shortage.',
                    isCorrect: false,
                  },
                  {
                    text: "By stating that the choice between housing and parks is a 'false dichotomy' and that both are possible.",
                    isCorrect: true,
                  },
                  {
                    text: 'By providing statistics on how many new parks have been built recently.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author's claim that 'studies have consistently shown' that nature reduces stress is an appeal to what?",
                answerOptions: [
                  { text: 'Emotion', isCorrect: false },
                  { text: 'Tradition', isCorrect: false },
                  { text: 'Authority or expert evidence', isCorrect: true },
                  { text: 'Anecdotal evidence', isCorrect: false },
                ],
              },
              {
                question:
                  "What is the logical flaw in the argument that cities 'cannot afford to 'waste' land on parks,' as described by the author?",
                answerOptions: [
                  {
                    text: 'It is an ad hominem attack on city planners.',
                    isCorrect: false,
                  },
                  {
                    text: 'It is a slippery slope argument that assumes parks will lead to bankruptcy.',
                    isCorrect: false,
                  },
                  {
                    text: 'It presents a false dichotomy by suggesting the only choice is between parks and housing.',
                    isCorrect: true,
                  },
                  {
                    text: 'It is a circular argument that repeats the claim without evidence.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'Which of the following statements is presented as a fact rather than an opinion in the passage?',
                answerOptions: [
                  {
                    text: 'Green spaces are not a luxury, but a vital necessity.',
                    isCorrect: false,
                  },
                  {
                    text: 'The argument against green spaces is shortsighted.',
                    isCorrect: false,
                  },
                  {
                    text: 'Trees and vegetation absorb carbon dioxide.',
                    isCorrect: true,
                  },
                  {
                    text: 'The choice is between short-term profit and long-term sustainability.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author's argument would be most weakened by which of the following findings?",
                answerOptions: [
                  {
                    text: 'A new study showing that the cooling effect of trees is less than previously thought.',
                    isCorrect: true,
                  },
                  {
                    text: 'A report that community gardens are growing in popularity.',
                    isCorrect: false,
                  },
                  {
                    text: 'Evidence that most city residents prefer indoor recreation.',
                    isCorrect: false,
                  },
                  {
                    text: 'A survey showing that people feel happier after visiting a park.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author's argument would be most strengthened by including:",
                answerOptions: [
                  {
                    text: 'more emotional language about the beauty of nature.',
                    isCorrect: false,
                  },
                  {
                    text: "a personal story about the author's favorite park.",
                    isCorrect: false,
                  },
                  {
                    text: 'specific data from a city where adding parks led to measurable economic and health benefits.',
                    isCorrect: true,
                  },
                  {
                    text: 'a longer discussion of the history of urban development.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'What unstated assumption does the author make about their audience?',
                answerOptions: [
                  {
                    text: 'The audience is primarily made up of real estate developers.',
                    isCorrect: false,
                  },
                  {
                    text: 'The audience values scientific evidence and the well-being of citizens.',
                    isCorrect: true,
                  },
                  {
                    text: 'The audience is opposed to any form of government spending.',
                    isCorrect: false,
                  },
                  {
                    text: 'The audience has little interest in environmental issues.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "By stating that the argument against green spaces is 'shortsighted,' the author implies that opponents are:",
                answerOptions: [
                  {
                    text: 'focusing on immediate costs without considering long-term benefits.',
                    isCorrect: true,
                  },
                  {
                    text: 'maliciously trying to harm the environment.',
                    isCorrect: false,
                  },
                  {
                    text: 'unaware of the current housing shortage.',
                    isCorrect: false,
                  },
                  {
                    text: 'proposing a better long-term solution.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "Is the author's claim that green spaces can 'save millions in infrastructure costs' a valid conclusion based on the evidence provided?",
                answerOptions: [
                  {
                    text: 'No, because the author provides no evidence to support this specific financial claim.',
                    isCorrect: false,
                  },
                  {
                    text: 'Yes, because the author logically connects permeable surfaces to reduced stormwater runoff and flooding.',
                    isCorrect: true,
                  },
                  {
                    text: 'No, because building parks is always more expensive than building flood barriers.',
                    isCorrect: false,
                  },
                  {
                    text: 'Yes, because all green spaces are known to generate revenue for cities.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author's argument that green spaces are 'essential infrastructure' is an attempt to:",
                answerOptions: [
                  {
                    text: "frame parks as being as critical to a city's function as roads and bridges.",
                    isCorrect: true,
                  },
                  {
                    text: 'suggest that parks should be funded through taxes on gasoline.',
                    isCorrect: false,
                  },
                  {
                    text: 'argue that all green spaces should be built with concrete and steel.',
                    isCorrect: false,
                  },
                  {
                    text: 'prove that green spaces are a new and untested idea.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "How does the author use the example of 'underserved neighborhoods' in paragraph 3 to support the main argument?",
                answerOptions: [
                  {
                    text: 'To suggest that only poor neighborhoods need parks.',
                    isCorrect: false,
                  },
                  {
                    text: 'To highlight the equity and social justice dimension of providing green spaces.',
                    isCorrect: true,
                  },
                  {
                    text: 'To argue that parks in wealthy neighborhoods are a waste of money.',
                    isCorrect: false,
                  },
                  {
                    text: 'To prove that all social gatherings happen in parks.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'Which of the following claims made by the author is LEAST supported by specific evidence in the text?',
                answerOptions: [
                  {
                    text: 'Green spaces mitigate the urban heat island effect.',
                    isCorrect: false,
                  },
                  {
                    text: 'Access to green space is linked to improved health.',
                    isCorrect: false,
                  },
                  {
                    text: 'The presence of parks can increase the value of nearby residential properties.',
                    isCorrect: true,
                  },
                  {
                    text: 'Green spaces can help manage stormwater.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "Overall, is the author's argument that green spaces are a 'vital necessity' convincing?",
                answerOptions: [
                  {
                    text: 'No, because the author fails to address any counterarguments.',
                    isCorrect: false,
                  },
                  {
                    text: 'No, because the author relies solely on emotional appeals without any factual evidence.',
                    isCorrect: false,
                  },
                  {
                    text: 'Yes, because the author presents a variety of environmental, social, and health benefits and refutes a key counterargument.',
                    isCorrect: true,
                  },
                  {
                    text: 'Yes, but only for cities that do not have a housing shortage.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'rla_info_graphics',
            title: 'Interpreting Graphics',
            description:
              'Reading charts, graphs, and tables that accompany articles.',
            type: 'reading',
            article: {
              title: 'Trends in Global Energy Consumption',
              genre: 'Informational Report with Graphics',
              text: [
                'Global energy consumption has seen dramatic shifts over the past fifty years. As developing nations industrialize and global population grows, the demand for energy continues to rise. While fossil fuels have long dominated the energy landscape, the mix of sources is beginning to change. The accompanying graphics illustrate these trends, providing a snapshot of where our energy comes from and which sectors are the largest consumers.',
                "The pie chart below shows the breakdown of global energy consumption by source for the most recent year. As is evident, fossil fuels (coal, oil, and natural gas combined) still account for the vast majority of the world's energy supply. However, the share of renewables, including hydropower, solar, and wind, is steadily growing, driven by environmental concerns and decreasing costs. Nuclear energy remains a small but consistent contributor.",
                'The bar chart further details the primary uses of electricity. The industrial sector is the largest consumer, powering factories and manufacturing processes. This is followed closely by the residential sector (for lighting, heating, and appliances) and the commercial sector (for businesses and offices). Transportation currently represents a smaller portion of electricity use, but this is expected to grow significantly with the adoption of electric vehicles.',
              ],
            },
            questions: [
              {
                questionNumber: 1,
                challenge_tags: ['rla-7'],
                type: 'chart',
                passage: `<div class="passage-text"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src="/images/Social Studies/worldwarii_militarydeaths_allies_piechart_0001.png" alt="A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 48%, China: 22%, United States: 5%, United Kingdom: 5%, Other Allies: 20%." class="bg-white p-2 rounded"></div>`,
                question:
                  'According to the pie chart, which two Allied nations suffered the highest number of military deaths in World War II?',
                answerOptions: [
                  {
                    text: 'The Soviet Union and China',
                    rationale:
                      'Correct. The chart shows the Soviet Union and China with the two largest percentages of military deaths among the Allies.',
                    isCorrect: true,
                  },
                  {
                    text: 'The United States and the United Kingdom',
                    rationale:
                      'The chart shows the U.S. and U.K. with relatively small percentages compared to the Soviet Union and China.',
                    isCorrect: false,
                  },
                  {
                    text: 'China and the United States',
                    rationale:
                      "While China's losses were very high, the U.S. losses were significantly smaller.",
                    isCorrect: false,
                  },
                  {
                    text: 'The Soviet Union and the United Kingdom',
                    rationale:
                      "While the Soviet Union's losses were the highest, the U.K.'s were much smaller.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 2,
                challenge_tags: ['math-1'],
                type: 'chart',
                passage: `<div class="passage-text"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src="/images/Social Studies/worldwarii_militarydeaths_allies_piechart_0001.png" alt="A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 48%, China: 22%, United States: 5%, United Kingdom: 5%, Other Allies: 20%." class="bg-white p-2 rounded"></div>`,
                question:
                  'The combined military deaths of the United States and the United Kingdom make up approximately what percentage of the total Allied deaths shown?',
                answerOptions: [
                  {
                    text: '5%',
                    rationale:
                      'This is the approximate percentage for each country individually, not combined.',
                    isCorrect: false,
                  },
                  {
                    text: '10%',
                    rationale:
                      'Correct. The chart shows the U.S. at 5% and the U.K. at 5%, for a combined total of 10%.',
                    isCorrect: true,
                  },
                  {
                    text: '22%',
                    rationale:
                      'This is the approximate percentage for China alone.',
                    isCorrect: false,
                  },
                  {
                    text: '48%',
                    rationale:
                      'This is the approximate percentage for the Soviet Union alone.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 3,
                type: 'chart',
                passage: `<div class="passage-text"><b>Allied Military Deaths in World War II (Approximate)</b><br><img src="/images/Social Studies/worldwarii_militarydeaths_allies_piechart_0001.png" alt="A pie chart showing approximate Allied military deaths in WWII. Soviet Union: 48%, China: 22%, United States: 5%, United Kingdom: 5%, Other Allies: 20%." class="bg-white p-2 rounded"></div>`,
                question:
                  'What can be inferred from the pie chart about the human cost of World War II for the Soviet Union?',
                answerOptions: [
                  {
                    text: 'It was minimal compared to other Allies.',
                    rationale:
                      'The chart shows the Soviet Union had the highest proportion of deaths by a large margin.',
                    isCorrect: false,
                  },
                  {
                    text: 'It was immense, accounting for nearly half of all Allied military deaths shown.',
                    rationale:
                      "Correct. The Soviet Union's slice of the pie is 48%, which is almost half, indicating a staggering human cost.",
                    isCorrect: true,
                  },
                  {
                    text: 'It was less than the combined losses of the United States and the United Kingdom.',
                    rationale:
                      'It was significantly greater than the combined losses of the U.S. and U.K.',
                    isCorrect: false,
                  },
                  {
                    text: 'It was roughly equal to the losses of China.',
                    rationale:
                      "The chart shows the Soviet Union's losses were more than double those of China.",
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 4,
                challenge_tags: ['rla-7'],
                type: 'chart',
                passage: `<div class="passage-text"><b>Electricity Consumption by Sector</b><br><img src="/images/Social Studies/ged_grsph_1_0001.png" alt="A bar chart showing electricity consumption. Industrial: 40%, Residential: 35%, Commercial: 24%, Transportation: 1%." class="bg-white p-2 rounded"></div>`,
                question:
                  'Which sector is the largest consumer of electricity according to the bar chart?',
                answerOptions: [
                  { text: 'Residential', isCorrect: false },
                  { text: 'Commercial', isCorrect: false },
                  { text: 'Transportation', isCorrect: false },
                  { text: 'Industrial', isCorrect: true },
                ],
              },
              {
                questionNumber: 5,
                type: 'chart',
                passage: `<div class="passage-text"><b>Electricity Consumption by Sector</b><br><img src="/images/Social Studies/ged_grsph_1_0001.png" alt="A bar chart showing electricity consumption. Industrial: 40%, Residential: 35%, Commercial: 24%, Transportation: 1%." class="bg-white p-2 rounded"></div>`,
                question:
                  'What is the combined percentage of electricity consumed by the Residential and Commercial sectors?',
                answerOptions: [
                  { text: '40%', isCorrect: false },
                  { text: '59%', isCorrect: true },
                  { text: '75%', isCorrect: false },
                  { text: '99%', isCorrect: false },
                ],
              },
              {
                questionNumber: 6,
                challenge_tags: ['rla-3'],
                type: 'multi-source',
                passage: `<div class="passage-text">Refer to both the article text and the "Electricity Consumption by Sector" bar chart.</div><img src="/images/Social Studies/ged_grsph_1_0001.png" alt="A bar chart showing electricity consumption. Industrial: 40%, Residential: 35%, Commercial: 24%, Transportation: 1%." class="bg-white p-2 rounded">`,
                question:
                  'The article states that electricity use for transportation is expected to grow. Based on the chart, why would this growth be significant?',
                answerOptions: [
                  {
                    text: 'Because transportation already uses the most electricity.',
                    isCorrect: false,
                  },
                  {
                    text: 'Because transportation currently represents a very small fraction of electricity use, so any growth will be a large relative change.',
                    isCorrect: true,
                  },
                  {
                    text: "Because the industrial sector's electricity use is declining rapidly.",
                    isCorrect: false,
                  },
                  {
                    text: 'Because transportation is the only sector where electricity use is measured.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 7,
                type: 'chart',
                passage: `<div class="passage-text"><b>Average Test Scores by Subject</b><br><table class="w-full text-left mt-2"><thead><tr><th class="p-2 border-b">Subject</th><th class="p-2 border-b">Score</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Math</td><td class="p-2">82</td></tr><tr class="border-b"><td class="p-2">Reading</td><td class="p-2">88</td></tr><tr class="border-b"><td class="p-2">Science</td><td class="p-2">85</td></tr><tr class="border-b"><td class="p-2">Social Studies</td><td class="p-2">83</td></tr></tbody></table></div>`,
                question: 'Which subject has the highest average test score?',
                answerOptions: [
                  { text: 'Math', isCorrect: false },
                  { text: 'Reading', isCorrect: true },
                  { text: 'Science', isCorrect: false },
                  { text: 'Social Studies', isCorrect: false },
                ],
              },
              {
                questionNumber: 8,
                type: 'chart',
                passage: `<div class="passage-text"><b>Average Test Scores by Subject</b><br><table class="w-full text-left mt-2"><thead><tr><th class="p-2 border-b">Subject</th><th class="p-2 border-b">Score</th></tr></thead><tbody><tr class="border-b"><td class="p-2">Math</td><td class="p-2">82</td></tr><tr class="border-b"><td class="p-2">Reading</td><td class="p-2">88</td></tr><tr class="border-b"><td class="p-2">Science</td><td class="p-2">85</td></tr><tr class="border-b"><td class="p-2">Social Studies</td><td class="p-2">83</td></tr></tbody></table></div>`,
                question: 'What is the range of the average test scores?',
                answerOptions: [
                  { text: '6', isCorrect: true },
                  { text: '82', isCorrect: false },
                  { text: '84.5', isCorrect: false },
                  { text: '88', isCorrect: false },
                ],
              },
              {
                questionNumber: 9,
                challenge_tags: ['social-3'],
                type: 'chart',
                passage: `<div class="passage-text"><b>Projected Population Growth of City X</b><br><img src="Images/Social Studies/Questions-are-based-on-the-following-graph.-7.png" alt="A line graph showing population over time. 2020: 100k, 2025: 110k, 2030: 125k, 2035: 145k, 2040: 170k." class="bg-white p-2 rounded"></div>`,
                question:
                  'During which 5-year period is the population of City X projected to grow the most?',
                answerOptions: [
                  { text: '2020-2025', isCorrect: false },
                  { text: '2025-2030', isCorrect: false },
                  { text: '2030-2035', isCorrect: false },
                  { text: '2035-2040', isCorrect: true },
                ],
              },
              {
                questionNumber: 10,
                type: 'chart',
                passage: `<div class="passage-text"><b>Projected Population Growth of City X</b><br><img src="Images/Social Studies/Questions-are-based-on-the-following-graph.-7.png" alt="A line graph showing population over time. 2020: 100k, 2025: 110k, 2030: 125k, 2035: 145k, 2040: 170k." class="bg-white p-2 rounded"></div>`,
                question: 'What is the overall trend shown in the graph?',
                answerOptions: [
                  {
                    text: 'The population is projected to decrease over time.',
                    isCorrect: false,
                  },
                  {
                    text: 'The population is projected to grow at a steady, constant rate.',
                    isCorrect: false,
                  },
                  {
                    text: 'The population is projected to grow at an accelerating rate.',
                    isCorrect: true,
                  },
                  {
                    text: 'The population is projected to remain stable after 2030.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 11,
                type: 'knowledge',
                question: 'What is the primary purpose of a map key or legend?',
                answerOptions: [
                  { text: 'To show the title of the map.', isCorrect: false },
                  {
                    text: 'To explain the meaning of the symbols and colors used on the map.',
                    isCorrect: true,
                  },
                  {
                    text: 'To indicate the scale or distance.',
                    isCorrect: false,
                  },
                  { text: 'To show the direction of North.', isCorrect: false },
                ],
              },
              {
                questionNumber: 12,
                challenge_tags: ['social-1'],
                type: 'knowledge',
                question:
                  'A political map is a type of map that primarily shows:',
                answerOptions: [
                  {
                    text: 'Physical features like mountains and rivers.',
                    isCorrect: false,
                  },
                  { text: 'Climate zones and vegetation.', isCorrect: false },
                  {
                    text: 'The boundaries of countries, states, and cities.',
                    isCorrect: true,
                  },
                  { text: 'Population density.', isCorrect: false },
                ],
              },
              {
                questionNumber: 13,
                type: 'knowledge',
                question:
                  "On a map, what does the scale '1 inch = 100 miles' mean?",
                answerOptions: [
                  { text: 'The map is 100 miles wide.', isCorrect: false },
                  {
                    text: 'Every inch on the map represents 100 miles in the real world.',
                    isCorrect: true,
                  },
                  { text: 'The map is not accurate.', isCorrect: false },
                  {
                    text: 'Every 100 inches on the map represents 1 mile in the real world.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 14,
                type: 'knowledge',
                question: 'A bar chart is most effective for:',
                answerOptions: [
                  {
                    text: 'Showing a trend over a continuous period of time.',
                    isCorrect: false,
                  },
                  {
                    text: 'Comparing distinct categories or groups.',
                    isCorrect: true,
                  },
                  {
                    text: 'Showing the parts of a whole or percentages.',
                    isCorrect: false,
                  },
                  {
                    text: 'Displaying the exact location of geographical features.',
                    isCorrect: false,
                  },
                ],
              },
              {
                questionNumber: 15,
                type: 'knowledge',
                question: 'A pie chart is most effective for:',
                answerOptions: [
                  {
                    text: 'Showing a trend over a continuous period of time.',
                    isCorrect: false,
                  },
                  {
                    text: 'Comparing distinct categories or groups.',
                    isCorrect: false,
                  },
                  {
                    text: 'Showing the parts of a whole or percentages.',
                    isCorrect: true,
                  },
                  {
                    text: 'Displaying the exact location of geographical features.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      'Reading Comprehension: Literary Texts': {
        description:
          'Learn to analyze plot, character, theme, and figurative language in fiction.',
        topics: [
          {
            id: 'rla_lit_plot_character',
            title: 'Plot & Character',
            description: 'Analyzing story structure and character development.',
            quizzes: [
              {
                id: 'rla_lit_plot_character_quiz1',
                label: 'Set 1',
                questionSourceTopicId: 'rla_lit_plot_character',
              },
              { id: 'rla_lit_plot_character_quiz2', label: 'Set 2' },
              { id: 'rla_lit_plot_character_quiz3', label: 'Set 3' },
            ],
            type: 'reading',
            article: {
              title: "An Excerpt from 'The Gift of the Magi' by O. Henry",
              genre: 'Short Story',
              text: [
                "One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one's cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.",
                'There was clearly nothing to do but flop down on the shabby little couch and howl. So Della did it. Which instigates the moral reflection that life is made up of sobs, sniffles, and smiles, with sniffles predominating.',
                "Della finished her cry and attended to her cheeks with the powder rag. She stood by the window and looked out dully at a gray cat walking a gray fence in a gray backyard. Tomorrow would be Christmas Day, and she had only $1.87 with which to buy Jim a present. Her Jim. Many a happy hour she had spent planning for something nice for him. Something fine and rare and sterlingâ€”'something just a little bit near to being worthy of the honor of being owned by Jim.",
                "Suddenly she whirled from the window and stood before the glass. Her eyes were shining brilliantly, but her face had lost its color within twenty seconds. Rapidly she pulled down her hair and let it fall to its full length. Now, there were two possessions of the James Dillingham Youngs in which they both took a mighty pride. One was Jim\\'s gold watch that had been his father\\'s and his grandfather\\'s. The other was Della\\'s hair. Had the queen of Sheba lived in the flat across the airshaft, Della would have let her hair hang out the window some day to dry just to depreciate Her Majesty\\'s jewels and gifts. Had King Solomon been the janitor, with all his treasures piled up in the basement, Jim would have pulled out his watch every time he passed, just to see him pluck at his beard from envy.",
                "So now Della's beautiful hair fell about her, rippling and shining like a cascade of brown waters. It reached below her knee and made itself almost a garment for her. And then she did it up again nervously and quickly. Once she faltered for a minute and stood still while a tear or two splashed on the worn red carpet. On went her old brown jacket; on went her old brown hat. With a whirl of skirts and with the brilliant sparkle still in her eyes, she fluttered out the door and down the stairs to the street.",
              ],
            },
            questions: [
              {
                questionNumber: 1,
                question:
                  'What is the central conflict that Della faces at the beginning of the passage?',
                answerOptions: [
                  {
                    text: 'She is unhappy with her apartment.',
                    isCorrect: false,
                  },
                  {
                    text: 'She does not have enough money to buy a worthy Christmas present for her husband.',
                    isCorrect: true,
                  },
                  {
                    text: 'She is in a disagreement with the local grocer.',
                    isCorrect: false,
                  },
                  {
                    text: 'She is worried about her hair losing its color.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'Which of the following character traits best describes Della in the first three paragraphs?',
                answerOptions: [
                  { text: 'Careless and extravagant', isCorrect: false },
                  { text: 'Angry and resentful', isCorrect: false },
                  {
                    text: 'Loving and resourceful, but distressed',
                    isCorrect: true,
                  },
                  { text: 'Calm and indifferent', isCorrect: false },
                ],
              },
              {
                question:
                  "The description of the 'gray cat walking a gray fence in a gray backyard' in paragraph 3 serves primarily to:",
                answerOptions: [
                  { text: 'suggest that Della wants a pet.', isCorrect: false },
                  {
                    text: "reflect Della's dull and hopeless mood at that moment.",
                    isCorrect: true,
                  },
                  {
                    text: 'introduce a new character to the story.',
                    isCorrect: false,
                  },
                  {
                    text: 'show that the story takes place in the city.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "What happens in the plot that marks a turning point for Della's emotional state?",
                answerOptions: [
                  {
                    text: 'She counts her money for the third time.',
                    isCorrect: false,
                  },
                  {
                    text: 'She looks out the window at the gray cat.',
                    isCorrect: false,
                  },
                  {
                    text: 'She suddenly has an idea while looking in the mirror.',
                    isCorrect: true,
                  },
                  {
                    text: 'She puts on her old brown jacket and hat.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author states that Della's hair and Jim's watch are possessions in which they 'took a mighty pride.' What is the purpose of highlighting these two items?",
                answerOptions: [
                  {
                    text: 'To show that Della and Jim are wealthy and materialistic.',
                    isCorrect: false,
                  },
                  {
                    text: 'To establish these items as the most valuable things they own, foreshadowing their importance to the plot.',
                    isCorrect: true,
                  },
                  {
                    text: 'To suggest that they should sell both items to improve their living situation.',
                    isCorrect: false,
                  },
                  {
                    text: 'To describe the history of the James Dillingham Young family.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "How does Della's character evolve from the beginning of the passage to the end?",
                answerOptions: [
                  {
                    text: 'She goes from being happy to being sad.',
                    isCorrect: false,
                  },
                  {
                    text: 'She goes from a state of despair to one of determined action.',
                    isCorrect: true,
                  },
                  {
                    text: 'She becomes more concerned with her own appearance.',
                    isCorrect: false,
                  },
                  {
                    text: 'She decides that buying a gift is not important.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The phrase 'silent imputation of parsimony' in the first paragraph means that Della felt:",
                answerOptions: [
                  {
                    text: 'proud of her ability to save money.',
                    isCorrect: false,
                  },
                  {
                    text: 'the shopkeepers were silently accusing her of being overly cheap.',
                    isCorrect: true,
                  },
                  {
                    text: 'the shopkeepers admired her for her bargaining skills.',
                    isCorrect: false,
                  },
                  {
                    text: 'that she was not paying enough for the groceries.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question: 'What is the climax of this particular excerpt?',
                answerOptions: [
                  { text: 'Della counting her money.', isCorrect: false },
                  { text: 'Della looking out the window.', isCorrect: false },
                  {
                    text: 'Della realizing what she can do and then quickly leaving the apartment.',
                    isCorrect: true,
                  },
                  {
                    text: "The author's moral reflection on life.",
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author's comparison of Della's hair to the Queen of Sheba's jewels and Jim's watch to King Solomon's treasures is an example of what literary device?",
                answerOptions: [
                  { text: 'Metaphor', isCorrect: false },
                  { text: 'Personification', isCorrect: false },
                  { text: 'Allusion', isCorrect: true },
                  { text: 'Onomatopoeia', isCorrect: false },
                ],
              },
              {
                question:
                  "What primary motivation drives Della's actions throughout the passage?",
                answerOptions: [
                  { text: 'Her desire to be wealthy.', isCorrect: false },
                  {
                    text: 'Her deep love for her husband, Jim.',
                    isCorrect: true,
                  },
                  {
                    text: 'Her frustration with her living conditions.',
                    isCorrect: false,
                  },
                  {
                    text: 'Her wish to compete with royalty.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The author writes, 'Once she faltered for a minute and stood still while a tear or two splashed on the worn red carpet.' This moment in the plot reveals that Della's decision:",
                answerOptions: [
                  {
                    text: 'was easy and made without any emotion.',
                    isCorrect: false,
                  },
                  {
                    text: 'was difficult and caused her a moment of sadness or hesitation.',
                    isCorrect: true,
                  },
                  {
                    text: 'was something she had planned for a long time.',
                    isCorrect: false,
                  },
                  { text: 'was an accident.', isCorrect: false },
                ],
              },
              {
                question:
                  'Which of the following is part of the exposition of the story, as presented in the excerpt?',
                answerOptions: [
                  {
                    text: "Della's decision to leave the apartment.",
                    isCorrect: false,
                  },
                  {
                    text: 'The introduction of the setting, the main character (Della), and her central problem.',
                    isCorrect: true,
                  },
                  {
                    text: "The comparison of Della's hair to a cascade of brown waters.",
                    isCorrect: false,
                  },
                  {
                    text: "The 'brilliant sparkle' in Della's eyes.",
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The description of Della putting on her 'old brown jacket' and 'old brown hat' contributes to the characterization by emphasizing her:",
                answerOptions: [
                  { text: 'lack of style.', isCorrect: false },
                  { text: 'love for the color brown.', isCorrect: false },
                  { text: 'modest financial means.', isCorrect: true },
                  { text: 'desire to be unnoticed.', isCorrect: false },
                ],
              },
              {
                question:
                  "What does the 'brilliant sparkle' in Della's eyes at the end of the passage symbolize?",
                answerOptions: [
                  {
                    text: 'Her lingering sadness and despair.',
                    isCorrect: false,
                  },
                  {
                    text: 'Her newfound hope, determination, and love.',
                    isCorrect: true,
                  },
                  { text: 'Her anger at her situation.', isCorrect: false },
                  {
                    text: 'Her fear of what Jim will think.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question: 'The rising action of this excerpt begins when:',
                answerOptions: [
                  { text: 'Della counts her money.', isCorrect: false },
                  { text: 'Della looks out the window.', isCorrect: false },
                  {
                    text: 'Della suddenly whirls from the window with an idea.',
                    isCorrect: true,
                  },
                  {
                    text: 'The author makes a moral reflection about life.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'rla_lit_theme_figurative_language',
            title: 'Poetry & Figurative Language',
            description:
              'Analyze poems for theme, tone, and figurative language techniques.',
            quizzes: [
              {
                id: 'rla_lit_theme_figurative_language_quiz1',
                label: 'Theme & Central Message',
                questionSourceTopicId: 'rla_lit_theme_figurative_language',
              },
              {
                id: 'rla_lit_theme_figurative_language_quiz2',
                label: 'Figurative Language & Literary Devices',
              },
              {
                id: 'rla_lit_theme_figurative_language_quiz3',
                label: 'Symbolism & Deeper Meaning',
              },
            ],
            type: 'reading',
            article: {
              title: 'The Road Not Taken',
              genre: 'Poem by Robert Frost',
              text: [
                'Two roads diverged in a yellow wood,',
                'And sorry I could not travel both',
                'And be one traveler, long I stood',
                'And looked down one as far as I could',
                'To where it bent in the undergrowth;',
                '<br/>',
                'Then took the other, as just as fair,',
                'And having perhaps the better claim,',
                'Because it was grassy and wanted wear;',
                'Though as for that the passing there',
                'Had worn them really about the same,',
                '<br/>',
                'And both that morning equally lay',
                'In leaves no step had trodden black.',
                'Oh, I kept the first for another day!',
                'Yet knowing how way leads on to way,',
                'I doubted if I should ever come back.',
                '<br/>',
                'I shall be telling this with a sigh',
                'Somewhere ages and ages hence:',
                'Two roads diverged in a wood, and I',
                'I took the one less traveled by,',
                'And that has made all the difference.',
              ],
            },
            questions: [
              {
                questionNumber: 1,
                question:
                  "The 'two roads' in the poem are a metaphor for what?",
                answerOptions: [
                  { text: 'An actual forest path.', isCorrect: false },
                  { text: 'Choices one must make in life.', isCorrect: true },
                  { text: 'The past and the future.', isCorrect: false },
                  { text: 'Friendships.', isCorrect: false },
                ],
              },
              {
                question: 'What is the central theme of the poem?',
                answerOptions: [
                  { text: 'The beauty of nature in autumn.', isCorrect: false },
                  {
                    text: 'The importance of following the crowd.',
                    isCorrect: false,
                  },
                  {
                    text: "The idea that individual choices shape one's life and identity.",
                    isCorrect: true,
                  },
                  {
                    text: 'The regret that comes from making a wrong decision.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "In the first stanza, what does the 'yellow wood' symbolize?",
                answerOptions: [
                  {
                    text: "A time of decision or a crossroads in the speaker's life.",
                    isCorrect: true,
                  },
                  {
                    text: "The speaker's fear and uncertainty.",
                    isCorrect: false,
                  },
                  { text: 'A place of danger.', isCorrect: false },
                  { text: "The speaker's happy memories.", isCorrect: false },
                ],
              },
              {
                question:
                  "In the second stanza, the speaker notes that the second road 'was grassy and wanted wear.' What does this figurative language suggest?",
                answerOptions: [
                  { text: 'The road was poorly maintained.', isCorrect: false },
                  {
                    text: 'The road was more beautiful than the first.',
                    isCorrect: false,
                  },
                  {
                    text: 'The road appeared to be less traveled or less conventional.',
                    isCorrect: true,
                  },
                  {
                    text: 'The road was dangerous and overgrown.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'How does the speaker contradict his own description of the two roads in the second stanza?',
                answerOptions: [
                  {
                    text: 'By saying one was much more difficult.',
                    isCorrect: false,
                  },
                  {
                    text: "By admitting that 'the passing there / Had worn them really about the same.'",
                    isCorrect: true,
                  },
                  {
                    text: 'By claiming that one road was made of stone.',
                    isCorrect: false,
                  },
                  {
                    text: 'By stating that he had traveled both roads before.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "What does the line 'And both that morning equally lay / In leaves no step had trodden black' imply?",
                answerOptions: [
                  {
                    text: 'That the speaker was the first person there that day, and the choice was truly his own.',
                    isCorrect: true,
                  },
                  {
                    text: 'That it was too dark to see the paths clearly.',
                    isCorrect: false,
                  },
                  { text: 'That both paths were unpopular.', isCorrect: false },
                  { text: 'That the speaker was lost.', isCorrect: false },
                ],
              },
              {
                question:
                  "The 'sigh' mentioned in the final stanza ('I shall be telling this with a sigh') is best interpreted as a sigh of:",
                answerOptions: [
                  {
                    text: 'simple regret for the path not taken.',
                    isCorrect: false,
                  },
                  {
                    text: 'satisfaction and contentment with the choice made.',
                    isCorrect: false,
                  },
                  {
                    text: 'complex reflection, blending nostalgia, satisfaction, and a sense of the weight of the decision.',
                    isCorrect: true,
                  },
                  {
                    text: 'deep sadness and disappointment.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The phrase 'way leads on to way' in the third stanza suggests that:",
                answerOptions: [
                  {
                    text: 'all paths eventually lead to the same destination.',
                    isCorrect: false,
                  },
                  {
                    text: 'it is easy to get lost in the woods.',
                    isCorrect: false,
                  },
                  {
                    text: 'one choice in life inevitably leads to another, making it difficult to go back and change the past.',
                    isCorrect: true,
                  },
                  {
                    text: 'the speaker plans to explore all possible paths.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The final lines, 'I took the one less traveled by, / And that has made all the difference,' are often interpreted as a celebration of individualism. However, considering the poem's earlier statement that the roads were 'really about the same,' what is another possible interpretation of the theme?",
                answerOptions: [
                  {
                    text: 'The speaker made a terrible mistake.',
                    isCorrect: false,
                  },
                  {
                    text: 'The poem is about how we create meaning and significance for our choices after we make them.',
                    isCorrect: true,
                  },
                  {
                    text: 'The speaker is lying about which road he took.',
                    isCorrect: false,
                  },
                  {
                    text: 'The poem is a warning against taking any risks.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The repetition of the word 'And' at the beginning of lines 2, 3, and 4 is a literary device called anaphora. What is its effect?",
                answerOptions: [
                  {
                    text: 'It makes the poem sound confusing.',
                    isCorrect: false,
                  },
                  {
                    text: 'It creates a sense of hesitation and thoughtful deliberation as the speaker weighs his options.',
                    isCorrect: true,
                  },
                  {
                    text: 'It shows that the speaker is in a hurry.',
                    isCorrect: false,
                  },
                  {
                    text: 'It suggests the speaker is not telling the truth.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  "The 'undergrowth' where the path bends can be seen as a symbol for:",
                answerOptions: [
                  { text: 'a beautiful garden.', isCorrect: false },
                  {
                    text: 'the future, which cannot be fully seen or understood from the present.',
                    isCorrect: true,
                  },
                  { text: "the speaker's past mistakes.", isCorrect: false },
                  { text: 'a place of safety and comfort.', isCorrect: false },
                ],
              },
              {
                question:
                  "The poem's rhyme scheme is ABAAB. What effect does this consistent structure have?",
                answerOptions: [
                  {
                    text: 'It makes the poem feel chaotic and unpredictable.',
                    isCorrect: false,
                  },
                  {
                    text: 'It gives the poem a thoughtful, musical quality that reinforces its contemplative mood.',
                    isCorrect: true,
                  },
                  {
                    text: 'It makes the poem difficult to understand.',
                    isCorrect: false,
                  },
                  {
                    text: 'It signals that the poem should be read as a joke.',
                    isCorrect: false,
                  },
                ],
              },
              {
                question:
                  'Which of the following words best describes the overall mood of the poem?',
                answerOptions: [
                  { text: 'Joyful and carefree', isCorrect: false },
                  { text: 'Angry and bitter', isCorrect: false },
                  { text: 'Reflective and contemplative', isCorrect: true },
                  { text: 'Frightened and anxious', isCorrect: false },
                ],
              },
              {
                question:
                  "The title 'The Road Not Taken' is significant because the poem focuses heavily on:",
                answerOptions: [
                  {
                    text: 'the road the speaker chose to travel.',
                    isCorrect: false,
                  },
                  {
                    text: 'the memory and imagined possibilities of the road the speaker did not choose.',
                    isCorrect: true,
                  },
                  {
                    text: 'the physical characteristics of both roads.',
                    isCorrect: false,
                  },
                  { text: "the speaker's hiking ability.", isCorrect: false },
                ],
              },
              {
                question:
                  "The poem uses the past tense until the final stanza. Why does the poet switch to the future tense ('I shall be telling this...')?",
                answerOptions: [
                  {
                    text: 'To show that the speaker has forgotten what happened.',
                    isCorrect: false,
                  },
                  {
                    text: 'To emphasize how the speaker will reflect on this moment and assign it meaning in the distant future.',
                    isCorrect: true,
                  },
                  {
                    text: 'To suggest that the events of the poem have not actually happened yet.',
                    isCorrect: false,
                  },
                  {
                    text: 'To confuse the reader about the timeline of the story.',
                    isCorrect: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      'Language & Grammar': {
        description:
          'Master the rules of standard English grammar, punctuation, and sentence structure.',
        topics: [
          {
            id: 'rla_grammar_conventions',
            title: 'Standard English Conventions',
            description:
              'Standard English conventions including sentence structure, usage, and mechanics.',
            quizzes: [
              {
                id: 'rla_lang_conventions_quiz1',
                label: 'Capitalization, Punctuation & Spelling',
              },
              {
                id: 'rla_lang_conventions_quiz2',
                label: 'Subject-Verb Agreement & Verb Tenses',
              },
              {
                id: 'rla_lang_conventions_quiz3',
                label: 'Sentence Structure & Fragments',
              },
            ],
          },
          {
            id: 'rla_grammar_usage',
            title: 'Grammar & Usage',
            description:
              'Subject-verb agreement, pronoun usage, and correct word choice.',
            quizzes: [
              {
                id: 'rla_lang_usage_quiz1',
                label: 'Pronoun Usage & Agreement',
              },
              {
                id: 'rla_lang_usage_quiz2',
                label: 'Modifier Placement & Clarity',
              },
              {
                id: 'rla_lang_usage_quiz3',
                label: 'Parallel Structure & Consistency',
              },
            ],
          },
          {
            id: 'rla_extended_response',
            title: 'Extended Response',
            description:
              'Practice constructing a well-supported argumentative essay.',
            quizzes: [
              {
                id: 'rla_extended_response_quiz1',
                label: 'Essay Planning & Organization',
              },
              {
                id: 'rla_extended_response_quiz2',
                label: 'Evidence-Based Arguments',
              },
              {
                id: 'rla_extended_response_quiz3',
                label: 'Revising & Editing Strategies',
              },
            ],
          },
        ],
      },
    },
  },
  Workforce: {
    icon: 'BriefcaseIcon',
    categories: {
      'Career Readiness': {
        description:
          'Explore workforce readiness tools, career prep, and skill-building modules',
        topics: [
          {
            id: 'resume_builder',
            title: 'Resume Builder',
            description:
              'Create and customize professional resumes for job applications.',
            type: 'tool',
          },
          {
            id: 'interview_prep',
            title: 'Interview Simulations',
            description: 'Practice common interview questions and scenarios.',
            type: 'simulation',
          },
          {
            id: 'job_readiness',
            title: 'Job Readiness Assessment',
            description:
              'Evaluate your workplace skills and identify areas for growth.',
            type: 'assessment',
          },
        ],
      },
    },
  },
};


// Legacy window attachment
if (typeof window !== 'undefined') { window.RLA_QUESTIONS = RLA_QUESTIONS; }

// Legacy window attachment
if (typeof window !== 'undefined') { window.RLA_QUESTIONS = RLA_QUESTIONS; }