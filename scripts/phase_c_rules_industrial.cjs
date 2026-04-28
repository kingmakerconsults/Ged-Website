const { buildRule } = require('./propagate_rationale_rewrites.cjs');

module.exports = [
  // Bessemer process
  buildRule(
    'It improved communication between cities.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The Bessemer process refined steel production; long-distance communication improvements came from inventions like the telegraph and telephone, not from steelmaking.'
  ),
  buildRule(
    'By making steel production more affordable, it enabled the growth of railroads and construction.',
    'By making steel production more affordable, it enabled the growth of railroads and construction.',
    'Correct. The passage explains the Bessemer process made steel cheap and efficient, which fueled the boom in railroad expansion, skyscraper construction, and other steel-dependent industries.'
  ),
  buildRule(
    'It created a new source of electrical power for factories.',
    '"It created a new source of electrical power for factories." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. The Bessemer process is a steelmaking technique; it produced no electricity. Factory electrification came later, with Edison's and Westinghouse's power systems."
  ),
  buildRule(
    'It led to a decrease in the number of factories.',
    '"It led to a decrease in the number of factories." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Cheaper steel actually accelerated industrial expansion and the growth of factories — the opposite of what this option claims.'
  ),

  // Robber Barons cartoon
  buildRule(
    'Muckrakers',
    '"Muckrakers" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Muckrakers were investigative journalists like Ida Tarbell and Upton Sinclair who exposed corruption — they were the critics, not the industrialists being criticized.'
  ),
  buildRule(
    'Progressives',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Progressives were reformers who pushed for regulation of big business; the cartoon mocks the industrialists themselves, not their reform-minded opponents.'
  ),
  buildRule(
    'Robber Barons',
    'Robber Barons',
    'Correct. Critics labeled industrialists like Rockefeller, Carnegie, and Vanderbilt "Robber Barons" because they amassed enormous wealth through what reformers viewed as exploitative or monopolistic practices.'
  ),
  buildRule(
    'Philanthropists',
    '"Philanthropists" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Although several Gilded Age tycoons later donated to charity, "philanthropist" was a complimentary term, not the critical label the cartoon implies.'
  ),

  // New immigrants
  buildRule(
    "Earlier immigrants primarily settled in cities, while 'new immigrants' moved to farms.",
    'This is not the correct answer based on the information provided.',
    "Incorrect. Both groups had urban and rural members, but the 'new immigrants' (1880s\u20131920s) were heavily concentrated in industrial cities, not on farms."
  ),
  buildRule(
    "'New immigrants' were primarily from Southern and Eastern Europe, unlike earlier immigrants from Northern and Western Europe.",
    "'New immigrants' were primarily from Southern and Eastern Europe, unlike earlier immigrants from Northern and Western Europe.",
    "Correct. As the passage notes, the 'new immigrants' (Italians, Poles, Russians, etc.) came from Southern and Eastern Europe and differed culturally and linguistically from the earlier waves drawn from Northern and Western Europe."
  ),
  buildRule(
    "'New immigrants' were fluent in English, while earlier immigrants were not.",
    '"\'New immigrants\' were fluent in English, while earlier immigrants were not." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. Many 'new immigrants' arrived speaking little or no English, which actually fueled nativist hostility against them. Earlier waves from the British Isles were more likely to be English-speaking."
  ),
  buildRule(
    "'New immigrants' were almost all Protestant, like earlier immigrant groups.",
    '"\'New immigrants\' were almost all Protestant, like earlier immigrant groups." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. The 'new immigrants' were largely Catholic, Jewish, or Eastern Orthodox, in contrast to the predominantly Protestant earlier waves \u2014 a key reason they faced religious discrimination."
  ),

  // Urbanization table
  buildRule(
    'A shortage of factory jobs.',
    '"A shortage of factory jobs." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Cities grew precisely because factories created abundant work; the rapid urbanization shown reflects job availability, not a shortage.'
  ),
  buildRule(
    'Poor living conditions and the spread of disease in tenements.',
    'Poor living conditions and the spread of disease in tenements.',
    'Correct. The huge urban influx shown in the table outpaced housing and sanitation. Crowded tenements with limited ventilation and plumbing fueled outbreaks of cholera, tuberculosis, and other diseases.'
  ),
  buildRule(
    'A lack of cultural diversity in cities.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The same urbanization wave brought millions of immigrants from many countries, increasing cultural diversity in cities rather than reducing it.'
  ),
  buildRule(
    'A decrease in the overall U.S. population.',
    '"A decrease in the overall U.S. population." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The total U.S. population grew rapidly during this period; the table shows the share living in cities rising, not a national population decline.'
  ),

  // Bar graph immigration decade
  buildRule(
    'the 1930s',
    'The 1930s bar is much lower than the tallest bar on the graph.',
    'Incorrect. Immigration plummeted in the 1930s due to the Great Depression and the restrictive 1924 quotas; the 1930s bar is one of the shortest on the graph.'
  ),
  buildRule(
    'the 1970s',
    'Immigration rises in the 1970s, but the graph shows a higher peak later.',
    "Incorrect. Although immigration rose in the 1970s after the 1965 Immigration Act, the chart's tallest bar comes later in the century, not in the 1970s."
  ),
  buildRule(
    'the 1990s',
    'Correct. The tallest bar appears in the 1990s, indicating the highest immigration total shown.',
    'Correct. The 1990s bar towers above the others on the graph; this decade saw record-high immigration totals driven by family reunification and economic migration.'
  ),
  buildRule(
    'the 1950s',
    "The 1950s bar is well below the graph's peak decade.",
    'Incorrect. The 1950s bar is well below the chart\u2019s peak; postwar immigration recovered modestly but stayed capped by the 1924 national-origins quotas until 1965.'
  ),

  // Political machines
  buildRule(
    'By winning the support of wealthy business owners through fair practices.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. Political machines did partner with businesses, but typically through bribery and contract favoritism, not through "fair practices"; their power base came from poor immigrant voters.'
  ),
  buildRule(
    'By providing essential services and assistance to poor and immigrant communities in exchange for their votes.',
    'By providing essential services and assistance to poor and immigrant communities in exchange for their votes.',
    "Correct. Machines like New York's Tammany Hall offered jobs, housing help, food, and citizenship aid to immigrants and the poor, building loyal voting blocs that kept machine bosses in power."
  ),
  buildRule(
    'By running honest and transparent city governments.',
    '"By running honest and transparent city governments." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Political machines were notorious for graft, kickbacks, and patronage \u2014 the very corruption Progressive reformers later targeted.'
  ),
  buildRule(
    'By strictly enforcing laws against corruption and graft.',
    '"By strictly enforcing laws against corruption and graft." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The opposite was true: machines depended on graft, padded contracts, and selective law enforcement to reward supporters and punish opponents.'
  ),

  // Progressive movement
  buildRule(
    'That government should be smaller and have less influence (laissez-faire).',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. Laissez-faire was the late-19th-century ideology Progressives rejected; they argued government should grow more active to address industrial-era problems.'
  ),
  buildRule(
    'That the government should actively intervene to address social and economic problems.',
    'That the government should actively intervene to address social and economic problems.',
    'Correct. Progressives believed government \u2014 at all levels \u2014 should regulate corporations, improve labor conditions, and combat political corruption to fix the social ills industrialization had created.'
  ),
  buildRule(
    'That political machines were the most efficient way to run city governments.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. Dismantling machine politics through reforms like civil-service rules, secret ballots, and direct primaries was a core Progressive goal, not something they endorsed.'
  ),
  buildRule(
    'That the United States should return to an agrarian economy.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. Progressives accepted the industrial economy and sought to regulate it; the agrarian-revival view belonged to earlier movements like the Populists, not the Progressives.'
  ),

  // Initiative/referendum/recall
  buildRule(
    'increase the power of political bosses and party leaders.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. These reforms were intended to weaken bosses and party leaders by letting voters bypass them on legislation and recall corrupt officials directly.'
  ),
  buildRule(
    'make the government more responsive and accountable to the people.',
    'make the government more responsive and accountable to the people.',
    'Correct. The initiative (citizen-proposed laws), referendum (popular vote on legislation), and recall (removal of officials by vote) were all designed to give ordinary citizens more direct control over government.'
  ),
  buildRule(
    'strengthen the power of large corporations.',
    '"strengthen the power of large corporations." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Progressive reforms sought to curb corporate influence in politics, not enlarge it; trust-busting and antitrust enforcement were parallel goals.'
  ),
  buildRule(
    'limit the voting rights of immigrants.',
    '"limit the voting rights of immigrants." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The initiative, referendum, and recall expanded voter power generally; restrictions on immigrant voting (where they existed) came from separate, often nativist, measures.'
  ),

  // Trust-busting Roosevelt
  buildRule(
    'He believed all trusts were beneficial and should be left unregulated.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    "Incorrect. The passage states Roosevelt distinguished 'good' from 'bad' trusts; he was famous as a 'trust buster,' not a defender of unregulated monopolies."
  ),
  buildRule(
    'He sought to break up all large corporations, regardless of their practices.',
    'This is not the correct answer based on the information provided.',
    "Incorrect. Roosevelt's 'good vs. bad' trust distinction meant he targeted only those monopolies he believed harmed the public, not every large corporation."
  ),
  buildRule(
    'He used government power to regulate or break up trusts that he believed acted against the public interest.',
    'He used government power to regulate or break up trusts that he believed acted against the public interest.',
    'Correct. Roosevelt enforced the Sherman Antitrust Act selectively \u2014 famously dissolving Northern Securities \u2014 while letting trusts he viewed as efficient and fair operate, balancing regulation with growth.'
  ),
  buildRule(
    'He believed only state governments, not the federal government, had the power to regulate trusts.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Roosevelt expanded federal regulatory power, using federal antitrust law against interstate corporations \u2014 the opposite of leaving the matter to states.'
  ),

  // Conservation
  buildRule(
    'Urbanization',
    '"Urbanization" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. Urbanization is the growth of cities, not the protection of natural resources; Roosevelt's national-park and forest policies are the conservation movement."
  ),
  buildRule(
    'Conservation',
    'Conservation',
    'Correct. The conservation movement, championed by Theodore Roosevelt and Gifford Pinchot, sought to protect forests, water, and wildlife and led to the U.S. Forest Service and many national parks and monuments.'
  ),
  buildRule(
    'Industrialization',
    '"Industrialization" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Industrialization is the rise of large-scale manufacturing; the conservation movement actually arose in part to counter the environmental damage industrialization caused.'
  ),
  buildRule(
    'Populism',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. Populism was a 1890s farmer-led political movement focused on banking and currency reform; it is distinct from the conservation movement that protected natural resources.'
  ),

  // Women's suffrage
  buildRule(
    'To secure better working conditions for women in factories.',
    '"To secure better working conditions for women in factories." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Workplace reforms for women were the goal of the labor and Progressive movements; the suffrage movement focused specifically on securing voting rights.'
  ),
  buildRule(
    'To gain women the right to vote.',
    'To gain women the right to vote.',
    "Correct. The women's suffrage movement \u2014 led by figures like Susan B. Anthony, Elizabeth Cady Stanton, and later Alice Paul \u2014 sought constitutional voting rights for women, finally won with the Nineteenth Amendment in 1920."
  ),
  buildRule(
    'To prohibit the sale of alcoholic beverages.',
    '"To prohibit the sale of alcoholic beverages." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. That was the goal of the temperance movement (which led to Prohibition and the Eighteenth Amendment); although many suffragists supported temperance, the suffrage movement's defining aim was the vote."
  ),
  buildRule(
    'To improve public education for girls.',
    'While this might seem plausible, it is not supported by the information given.',
    "Incorrect. Some suffragists supported educational reform, but the movement's defining objective was political: securing women's right to vote, not reforming schools."
  ),

  // Plessy v. Ferguson
  buildRule(
    'Judicial Review',
    '"Judicial Review" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. Judicial review was established in Marbury v. Madison (1803); Plessy v. Ferguson (1896) addressed racial segregation, not the courts' power to strike down laws."
  ),
  buildRule(
    'Separate but equal',
    'Separate but equal',
    "Correct. In Plessy v. Ferguson the Court ruled that racially separate public facilities were constitutional as long as they were 'equal,' giving legal cover to Jim Crow segregation until Brown v. Board of Education overturned it in 1954."
  ),
  buildRule(
    'Equal protection under the law',
    '"Equal protection under the law" is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. The Equal Protection Clause comes from the Fourteenth Amendment (1868). Plessy actually allowed states to undermine equal protection by sanctioning 'separate but equal' segregation."
  ),
  buildRule(
    'Innocent until proven guilty',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The presumption of innocence is a criminal-procedure principle from common law and the Fifth/Sixth Amendments; Plessy v. Ferguson dealt with racial segregation in public accommodations.'
  ),
];
