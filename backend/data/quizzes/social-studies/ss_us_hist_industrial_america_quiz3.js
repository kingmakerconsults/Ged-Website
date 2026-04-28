/**
 * Industrial America: Quiz 3
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      "President Theodore Roosevelt was known as a 'trust buster' for his efforts to use the Sherman Antitrust Act to break up large corporate monopolies that were harmful to the public interest. He believed that the government should distinguish between 'good trusts,' which were efficient and fair, and 'bad trusts,' which used their power to exploit consumers and stifle competition.",
    question:
      "What was President Theodore Roosevelt's approach to dealing with trusts (monopolies)?",
    answerOptions: [
      {
        text: 'He believed all trusts were beneficial and should be left unregulated.',
        isCorrect: false,
        rationale:
          "Incorrect. The passage states Roosevelt distinguished 'good' from 'bad' trusts; he was famous as a 'trust buster,' not a defender of unregulated monopolies.",
      },
      {
        text: 'He sought to break up all large corporations, regardless of their practices.',
        isCorrect: false,
        rationale:
          "Incorrect. Roosevelt's 'good vs. bad' trust distinction meant he targeted only those monopolies he believed harmed the public, not every large corporation.",
      },
      {
        text: 'He used government power to regulate or break up trusts that he believed acted against the public interest.',
        isCorrect: true,
        rationale:
          'Correct. Roosevelt enforced the Sherman Antitrust Act selectively — famously dissolving Northern Securities — while letting trusts he viewed as efficient and fair operate, balancing regulation with growth.',
      },
      {
        text: 'He believed only state governments, not the federal government, had the power to regulate trusts.',
        isCorrect: false,
        rationale:
          'Incorrect. Roosevelt expanded federal regulatory power, using federal antitrust law against interstate corporations — the opposite of leaving the matter to states.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 2,
    challenge_tags: ['social-1'],
    type: 'knowledge',
    question:
      "The movement to protect America's natural resources, which gained national prominence under President Theodore Roosevelt, is known as:",
    answerOptions: [
      {
        text: 'Urbanization',
        isCorrect: false,
        rationale:
          "Incorrect. Urbanization is the growth of cities, not the protection of natural resources; Roosevelt's national-park and forest policies are the conservation movement.",
      },
      {
        text: 'Conservation',
        isCorrect: true,
        rationale:
          'Correct. The conservation movement, championed by Theodore Roosevelt and Gifford Pinchot, sought to protect forests, water, and wildlife and led to the U.S. Forest Service and many national parks and monuments.',
      },
      {
        text: 'Industrialization',
        isCorrect: false,
        rationale:
          'Incorrect. Industrialization is the rise of large-scale manufacturing; the conservation movement actually arose in part to counter the environmental damage industrialization caused.',
      },
      {
        text: 'Populism',
        isCorrect: false,
        rationale:
          'Incorrect. Populism was a 1890s farmer-led political movement focused on banking and currency reform; it is distinct from the conservation movement that protected natural resources.',
      },
    ],
  },
  {
    questionNumber: 3,
    challenge_tags: ['social-1'],
    type: 'knowledge',
    question: "What was the primary goal of the women's suffrage movement?",
    answerOptions: [
      {
        text: 'To secure better working conditions for women in factories.',
        isCorrect: false,
        rationale:
          'Incorrect. Workplace reforms for women were the goal of the labor and Progressive movements; the suffrage movement focused specifically on securing voting rights.',
      },
      {
        text: 'To gain women the right to vote.',
        isCorrect: true,
        rationale:
          "Correct. The women's suffrage movement — led by figures like Susan B. Anthony, Elizabeth Cady Stanton, and later Alice Paul — sought constitutional voting rights for women, finally won with the Nineteenth Amendment in 1920.",
      },
      {
        text: 'To prohibit the sale of alcoholic beverages.',
        isCorrect: false,
        rationale:
          "Incorrect. That was the goal of the temperance movement (which led to Prohibition and the Eighteenth Amendment); although many suffragists supported temperance, the suffrage movement's defining aim was the vote.",
      },
      {
        text: 'To improve public education for girls.',
        isCorrect: false,
        rationale:
          "Incorrect. Some suffragists supported educational reform, but the movement's defining objective was political: securing women's right to vote, not reforming schools.",
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      "The Plessy v. Ferguson Supreme Court case in 1896 was a major setback for civil rights. The Court ruled that racially segregated public facilities were legal, as long as the facilities for blacks and whites were 'separate but equal.' This doctrine of 'separate but equal' legalized segregation and stood as law until it was overturned decades later.",
    question:
      "What legal doctrine was established by the Supreme Court's ruling in Plessy v. Ferguson?",
    answerOptions: [
      {
        text: 'Judicial Review',
        isCorrect: false,
        rationale:
          "Incorrect. Judicial review was established in Marbury v. Madison (1803); Plessy v. Ferguson (1896) addressed racial segregation, not the courts' power to strike down laws.",
      },
      {
        text: 'Separate but equal',
        isCorrect: true,
        rationale:
          "Correct. In Plessy v. Ferguson the Court ruled that racially separate public facilities were constitutional as long as they were 'equal,' giving legal cover to Jim Crow segregation until Brown v. Board of Education overturned it in 1954.",
      },
      {
        text: 'Equal protection under the law',
        isCorrect: false,
        rationale:
          "Incorrect. The Equal Protection Clause comes from the Fourteenth Amendment (1868). Plessy actually allowed states to undermine equal protection by sanctioning 'separate but equal' segregation.",
      },
      {
        text: 'Innocent until proven guilty',
        isCorrect: false,
        rationale:
          'Incorrect. The presumption of innocence is a criminal-procedure principle from common law and the Fifth/Sixth Amendments; Plessy v. Ferguson dealt with racial segregation in public accommodations.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 5,
    challenge_tags: ['social-1'],
    type: 'knowledge',
    question:
      'Which constitutional amendment, ratified in 1920, granted women the right to vote?',
    answerOptions: [
      {
        text: 'The 17th Amendment',
        isCorrect: false,
        rationale:
          '"The 17th Amendment" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'The 18th Amendment',
        isCorrect: false,
        rationale:
          '"The 18th Amendment" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'The 19th Amendment',
        isCorrect: true,
        rationale:
          'Correct because the 19th Amendment to the U.S. Constitution, ratified in 1920, prohibited the federal and state governments from denying the right to vote on the basis of sex and granted women suffrage nationwide.',
      },
      {
        text: 'The 21st Amendment',
        isCorrect: false,
        rationale:
          '"The 21st Amendment" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
    ],
  },
  {
    questionNumber: 6,
    challenge_tags: ['rla-7'],
    type: 'text',
    passage:
      'The late 19th century was a period of rapid industrialization in the United States. Key to this was the development of new technologies. The Bessemer process, for example, made the production of steel cheap and efficient. This led to a boom in railroad construction, the building of skyscrapers, and the growth of heavy industry. Innovations like the telephone, invented by Alexander Graham Bell, and the electric light bulb, perfected by Thomas Edison, revolutionized communication and daily life.',
    question:
      'According to the passage, how did the Bessemer process contribute to industrialization?',
    answerOptions: [
      {
        text: 'It improved communication between cities.',
        isCorrect: false,
        rationale:
          'Incorrect. The Bessemer process refined steel production; long-distance communication improvements came from inventions like the telegraph and telephone, not from steelmaking.',
      },
      {
        text: 'By making steel production more affordable, it enabled the growth of railroads and construction.',
        isCorrect: true,
        rationale:
          'Correct. The passage explains the Bessemer process made steel cheap and efficient, which fueled the boom in railroad expansion, skyscraper construction, and other steel-dependent industries.',
      },
      {
        text: 'It created a new source of electrical power for factories.',
        isCorrect: false,
        rationale:
          "Incorrect. The Bessemer process is a steelmaking technique; it produced no electricity. Factory electrification came later, with Edison's and Westinghouse's power systems.",
      },
      {
        text: 'It led to a decrease in the number of factories.',
        isCorrect: false,
        rationale:
          'Incorrect. Cheaper steel actually accelerated industrial expansion and the growth of factories — the opposite of what this option claims.',
      },
    ],
  },
  {
    questionNumber: 7,
    challenge_tags: ['social-1'],
    type: 'image',
    imageUrl: '/images/Social Studies/industrial_america_0003.jpg',
    question:
      "This political cartoon, titled 'The Protectors of Our Industries,' satirizes the powerful industrialists of the Gilded Age. What term was often used to criticize business leaders like the ones depicted, who used ruthless tactics to amass great wealth?",
    answerOptions: [
      {
        text: 'Muckrakers',
        isCorrect: false,
        rationale:
          'Incorrect. Muckrakers were investigative journalists like Ida Tarbell and Upton Sinclair who exposed corruption — they were the critics, not the industrialists being criticized.',
      },
      {
        text: 'Progressives',
        isCorrect: false,
        rationale:
          'Incorrect. Progressives were reformers who pushed for regulation of big business; the cartoon mocks the industrialists themselves, not their reform-minded opponents.',
      },
      {
        text: 'Robber Barons',
        isCorrect: true,
        rationale:
          'Correct. Critics labeled industrialists like Rockefeller, Carnegie, and Vanderbilt "Robber Barons" because they amassed enormous wealth through what reformers viewed as exploitative or monopolistic practices.',
      },
      {
        text: 'Philanthropists',
        isCorrect: false,
        rationale:
          'Incorrect. Although several Gilded Age tycoons later donated to charity, "philanthropist" was a complimentary term, not the critical label the cartoon implies.',
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      "During the late 19th century, a new wave of immigrants arrived in the United States, primarily from Southern and Eastern Europe. These 'new immigrants' came from countries like Italy, Poland, and Russia. They were often culturally different from earlier immigrants, who had mostly come from Northern and Western Europe. Many 'new immigrants' were Catholic or Jewish, spoke little English, and settled in crowded ethnic neighborhoods in large cities.",
    question:
      "What was a key difference between the 'new immigrants' of the late 19th century and earlier immigrants?",
    answerOptions: [
      {
        text: "Earlier immigrants primarily settled in cities, while 'new immigrants' moved to farms.",
        isCorrect: false,
        rationale:
          "Incorrect. Both groups had urban and rural members, but the 'new immigrants' (1880s–1920s) were heavily concentrated in industrial cities, not on farms.",
      },
      {
        text: "'New immigrants' were primarily from Southern and Eastern Europe, unlike earlier immigrants from Northern and Western Europe.",
        isCorrect: true,
        rationale:
          "Correct. As the passage notes, the 'new immigrants' (Italians, Poles, Russians, etc.) came from Southern and Eastern Europe and differed culturally and linguistically from the earlier waves drawn from Northern and Western Europe.",
      },
      {
        text: "'New immigrants' were fluent in English, while earlier immigrants were not.",
        isCorrect: false,
        rationale:
          "Incorrect. Many 'new immigrants' arrived speaking little or no English, which actually fueled nativist hostility against them. Earlier waves from the British Isles were more likely to be English-speaking.",
      },
      {
        text: "'New immigrants' were almost all Protestant, like earlier immigrant groups.",
        isCorrect: false,
        rationale:
          "Incorrect. The 'new immigrants' were largely Catholic, Jewish, or Eastern Orthodox, in contrast to the predominantly Protestant earlier waves — a key reason they faced religious discrimination.",
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 9,
    type: 'image',
    imageUrl: '/images/Social Studies/unclassified_0094.png',
    question:
      'According to the bar graph, during which decade did the United States receive the highest number of immigrants?',
    answerOptions: [
      {
        text: 'the 1930s',
        isCorrect: false,
        rationale:
          'Incorrect. Immigration plummeted in the 1930s due to the Great Depression and the restrictive 1924 quotas; the 1930s bar is one of the shortest on the graph.',
      },
      {
        text: 'the 1970s',
        isCorrect: false,
        rationale:
          "Incorrect. Although immigration rose in the 1970s after the 1965 Immigration Act, the chart's tallest bar comes later in the century, not in the 1970s.",
      },
      {
        text: 'the 1990s',
        isCorrect: true,
        rationale:
          'Correct. The 1990s bar towers above the others on the graph; this decade saw record-high immigration totals driven by family reunification and economic migration.',
      },
      {
        text: 'the 1950s',
        isCorrect: false,
        rationale:
          'Incorrect. The 1950s bar is well below the chart’s peak; postwar immigration recovered modestly but stayed capped by the 1924 national-origins quotas until 1965.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 10,
    type: 'image',
    imageUrl: '/images/Social Studies/unclassified_0077.png',
    passage:
      '| Year | % Urban Population |\n| --- | --- |\n| 1860 | 20% |\n| 1880 | 28% |\n| 1900 | 40% |\n| 1920 | 51% |',
    question:
      'This table shows that the percentage of Americans living in urban areas rose dramatically over time. What was a major social problem that arose from the rapid growth of cities in the late 19th and early 20th centuries?',
    answerOptions: [
      {
        text: 'A shortage of factory jobs.',
        isCorrect: false,
        rationale:
          'Incorrect. Cities grew precisely because factories created abundant work; the rapid urbanization shown reflects job availability, not a shortage.',
      },
      {
        text: 'Poor living conditions and the spread of disease in tenements.',
        isCorrect: true,
        rationale:
          'Correct. The huge urban influx shown in the table outpaced housing and sanitation. Crowded tenements with limited ventilation and plumbing fueled outbreaks of cholera, tuberculosis, and other diseases.',
      },
      {
        text: 'A lack of cultural diversity in cities.',
        isCorrect: false,
        rationale:
          'Incorrect. The same urbanization wave brought millions of immigrants from many countries, increasing cultural diversity in cities rather than reducing it.',
      },
      {
        text: 'A decrease in the overall U.S. population.',
        isCorrect: false,
        rationale:
          'Incorrect. The total U.S. population grew rapidly during this period; the table shows the share living in cities rising, not a national population decline.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 11,
    challenge_tags: ['social-1', 'social-5', 'social-3'],
    type: 'image',
    imageUrl: '/images/Social Studies/industrial_america_0001.jpg',
    question:
      "This political cartoon, 'The Bosses of the Senate,' criticizes the immense power of corporate monopolies during the Gilded Age. How did political machines, which also held great power at the time, maintain their influence?",
    answerOptions: [
      {
        text: 'By winning the support of wealthy business owners through fair practices.',
        isCorrect: false,
        rationale:
          'Incorrect. Political machines did partner with businesses, but typically through bribery and contract favoritism, not through "fair practices"; their power base came from poor immigrant voters.',
      },
      {
        text: 'By providing essential services and assistance to poor and immigrant communities in exchange for their votes.',
        isCorrect: true,
        rationale:
          "Correct. Machines like New York's Tammany Hall offered jobs, housing help, food, and citizenship aid to immigrants and the poor, building loyal voting blocs that kept machine bosses in power.",
      },
      {
        text: 'By running honest and transparent city governments.',
        isCorrect: false,
        rationale:
          'Incorrect. Political machines were notorious for graft, kickbacks, and patronage — the very corruption Progressive reformers later targeted.',
      },
      {
        text: 'By strictly enforcing laws against corruption and graft.',
        isCorrect: false,
        rationale:
          'Incorrect. The opposite was true: machines depended on graft, padded contracts, and selective law enforcement to reward supporters and punish opponents.',
      },
    ],
  },
  {
    questionNumber: 12,
    challenge_tags: ['social-1', 'social-5', 'social-3'],
    type: 'text',
    passage:
      'The Progressive Era (roughly 1890-1920) was a period of widespread social activism and political reform. Progressives sought to address the problems caused by industrialization, urbanization, and political corruption. They believed that the government should take a more active role in regulating the economy and protecting the welfare of its citizens.',
    question: 'What was a core belief of the Progressive movement?',
    answerOptions: [
      {
        text: 'That government should be smaller and have less influence (laissez-faire).',
        isCorrect: false,
        rationale:
          'Incorrect. Laissez-faire was the late-19th-century ideology Progressives rejected; they argued government should grow more active to address industrial-era problems.',
      },
      {
        text: 'That the government should actively intervene to address social and economic problems.',
        isCorrect: true,
        rationale:
          'Correct. Progressives believed government — at all levels — should regulate corporations, improve labor conditions, and combat political corruption to fix the social ills industrialization had created.',
      },
      {
        text: 'That political machines were the most efficient way to run city governments.',
        isCorrect: false,
        rationale:
          'Incorrect. Dismantling machine politics through reforms like civil-service rules, secret ballots, and direct primaries was a core Progressive goal, not something they endorsed.',
      },
      {
        text: 'That the United States should return to an agrarian economy.',
        isCorrect: false,
        rationale:
          'Incorrect. Progressives accepted the industrial economy and sought to regulate it; the agrarian-revival view belonged to earlier movements like the Populists, not the Progressives.',
      },
    ],
  },
];
