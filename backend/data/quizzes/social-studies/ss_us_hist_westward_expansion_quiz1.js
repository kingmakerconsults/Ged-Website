/**
 * Westward Expansion: Quiz 1
 * Topics: Louisiana Purchase, Lewis & Clark Expedition, Manifest Destiny, Oregon Trail
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      'In 1803, President Thomas Jefferson purchased the Louisiana Territory from France for approximately $15 million, roughly doubling the size of the United States. The territory stretched from the Mississippi River to the Rocky Mountains and from the Gulf of Mexico to the Canadian border. Jefferson had originally sent diplomats to Paris to negotiate the purchase of New Orleans alone, crucial for western farmers who shipped goods down the Mississippi. However, Napoleon Bonaparte, facing renewed war with Britain and the failure of his Caribbean ambitions due to a slave revolt in Haiti, offered the entire territory. Jefferson faced a dilemma: as a strict constructionist, he believed the Constitution did not explicitly authorize the acquisition of foreign territory.',
    question: 'Why did Jefferson face a constitutional dilemma over the Louisiana Purchase?',
    answerOptions: [
      {
        text: 'As a strict constructionist, he believed the Constitution did not explicitly authorize the President to acquire foreign territory.',
        isCorrect: true,
        rationale:
          'The passage states Jefferson "believed the Constitution did not explicitly authorize the acquisition of foreign territory," creating a conflict with his political philosophy.',
      },
      {
        text: 'Congress had already passed a law prohibiting any territorial expansion.',
        isCorrect: false,
        rationale:
          'The passage does not mention any congressional prohibition; the dilemma was Jefferson\u2019s personal interpretation of constitutional authority.',
      },
      {
        text: 'France refused to sell the territory at any price.',
        isCorrect: false,
        rationale:
          'Napoleon offered the entire territory; the dilemma was about constitutional authority, not French unwillingness to sell.',
      },
      {
        text: 'The territory was already claimed by Spain and could not be legally purchased.',
        isCorrect: false,
        rationale:
          'France had reacquired the territory from Spain; Napoleon had the legal authority to sell it.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 2,
    type: 'text',
    passage:
      'In 1804, Jefferson commissioned Meriwether Lewis and William Clark to lead an expedition through the newly acquired Louisiana Territory and beyond to the Pacific Ocean. The Corps of Discovery, as the expedition was known, departed from St. Louis in May 1804 with approximately 45 men. Their mission was to map the territory, establish trade relationships with Native American nations, document plant and animal species, and find a practical water route connecting the Mississippi River to the Pacific. The expedition relied heavily on the knowledge and assistance of Native peoples, particularly Sacagawea, a Shoshone woman who served as interpreter and guide during the journey through the Rocky Mountains.',
    question: 'What was the primary purpose of the Lewis and Clark Expedition?',
    answerOptions: [
      {
        text: 'To explore and map the Louisiana Territory, establish Native trade relations, and find a route to the Pacific.',
        isCorrect: true,
        rationale:
          'The passage lists the mission objectives: "map the territory, establish trade relationships with Native American nations, document plant and animal species, and find a practical water route" to the Pacific.',
      },
      {
        text: 'To establish permanent military forts throughout the western frontier.',
        isCorrect: false,
        rationale:
          'The expedition\u2019s goals were exploration, documentation, and diplomacy, not the construction of military installations.',
      },
      {
        text: 'To negotiate the purchase of additional territory from Native American nations.',
        isCorrect: false,
        rationale:
          'The mission involved establishing trade relationships, not purchasing Native lands.',
      },
      {
        text: 'To relocate eastern settlers to farming communities along the Pacific coast.',
        isCorrect: false,
        rationale:
          'The expedition was a small exploratory party, not a settler relocation effort.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'The concept of "Manifest Destiny," a phrase coined by journalist John O\u2019Sullivan in 1845, expressed the belief that the United States was divinely ordained to expand across the North American continent. O\u2019Sullivan wrote that it was America\u2019s "manifest destiny to overspread the continent allotted by Providence for the free development of our yearly multiplying millions." This ideology combined nationalism, expansionism, and a sense of cultural superiority, justifying the displacement of Native peoples and the acquisition of territories claimed by Mexico and Britain. Critics, including many abolitionists, argued that westward expansion was primarily driven by the desire to extend slavery into new territories.',
    question: 'How did the concept of Manifest Destiny justify territorial expansion?',
    answerOptions: [
      {
        text: 'It framed expansion as divinely ordained and culturally necessary for American growth across the continent.',
        isCorrect: true,
        rationale:
          'The passage describes Manifest Destiny as the belief that the U.S. was "divinely ordained to expand" and that it combined "nationalism, expansionism, and a sense of cultural superiority."',
      },
      {
        text: 'It argued that Native Americans had voluntarily invited American settlers to occupy their lands.',
        isCorrect: false,
        rationale:
          'The passage describes the "displacement of Native peoples," not voluntary invitation.',
      },
      {
        text: 'It was a legal doctrine established by the Supreme Court authorizing expansion.',
        isCorrect: false,
        rationale:
          'Manifest Destiny was a cultural and political ideology, not a legal doctrine or court ruling.',
      },
      {
        text: 'It was universally supported by all Americans regardless of political affiliation.',
        isCorrect: false,
        rationale:
          'The passage notes that "critics, including many abolitionists," opposed expansion, particularly its connection to slavery.',
      },
    ],
    challenge_tags: ['social-1', 'social-3', 'rla-5'],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      'The Oregon Trail, stretching approximately 2,000 miles from Independence, Missouri, to Oregon\u2019s Willamette Valley, became the primary overland route for westward migration in the 1840s and 1850s. An estimated 400,000 settlers made the grueling journey, which typically took four to six months by covered wagon. Travelers faced numerous dangers: river crossings, mountain passes, extreme weather, and disease\u2014particularly cholera, which killed thousands along the route. Contrary to popular myth, conflicts with Native Americans were relatively rare during the early years; most encounters involved trade and mutual assistance. However, as the volume of migration increased, tensions grew over resource competition and disruption of Native hunting grounds.',
    question: 'According to the passage, what was the most common danger faced by Oregon Trail migrants?',
    answerOptions: [
      {
        text: 'Disease, particularly cholera, which killed thousands along the route.',
        isCorrect: true,
        rationale:
          'The passage identifies "disease\u2014particularly cholera, which killed thousands along the route" as a major danger, and notes that conflicts with Native Americans were "relatively rare" early on.',
      },
      {
        text: 'Constant armed conflict with Native American nations throughout the journey.',
        isCorrect: false,
        rationale:
          'The passage explicitly states that "conflicts with Native Americans were relatively rare during the early years."',
      },
      {
        text: 'Attacks by wild animals such as bears and wolves.',
        isCorrect: false,
        rationale:
          'The passage lists river crossings, mountain passes, weather, and disease as dangers but does not mention animal attacks.',
      },
      {
        text: 'Navigating through dense tropical forests along the route.',
        isCorrect: false,
        rationale:
          'The Oregon Trail crossed prairies, deserts, and mountains, not tropical forests.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 5,
    type: 'text',
    passage:
      'The Indian Removal Act of 1830, signed by President Andrew Jackson, authorized the federal government to negotiate treaties that would exchange Native American lands in the southeastern United States for territory west of the Mississippi River. Although the law stated that removal should be voluntary and that the government should compensate Native nations fairly, in practice removal was often coerced and the terms were grossly unfair. The most devastating example was the forced relocation of the Cherokee Nation in 1838\u20131839, known as the Trail of Tears, during which approximately 4,000 of the 15,000 Cherokee who were forced to march died from exposure, disease, and starvation.',
    question: 'How did the actual implementation of the Indian Removal Act differ from its stated terms?',
    answerOptions: [
      {
        text: 'The law called for voluntary removal and fair compensation, but removal was often coerced and terms were grossly unfair.',
        isCorrect: true,
        rationale:
          'The passage contrasts the law\u2019s stated terms ("voluntary" and "compensate fairly") with the reality ("often coerced" and "grossly unfair").',
      },
      {
        text: 'The law explicitly authorized military force, which was applied exactly as written.',
        isCorrect: false,
        rationale:
          'The law stated removal should be "voluntary"; the discrepancy was between the law\u2019s language and its enforcement.',
      },
      {
        text: 'Native Americans eagerly accepted the terms because the western lands were more desirable.',
        isCorrect: false,
        rationale:
          'The passage describes removal as "coerced" and the Trail of Tears resulted in thousands of deaths, indicating the opposite of willing acceptance.',
      },
      {
        text: 'The Act was never enforced because the Supreme Court ruled it unconstitutional.',
        isCorrect: false,
        rationale:
          'The Act was enforced; the passage describes the Cherokee removal of 1838\u20131839 as a direct result of the law.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 6,
    type: 'text',
    passage:
      'In Worcester v. Georgia (1832), the Supreme Court ruled that the Cherokee Nation was a distinct political community with sovereignty over its territory, and that Georgia\u2019s laws had no force within Cherokee lands. Chief Justice John Marshall declared that only the federal government, not individual states, had authority to deal with Native nations. President Andrew Jackson reportedly defied the ruling, allegedly declaring, "John Marshall has made his decision; now let him enforce it." The federal government\u2019s refusal to enforce the Court\u2019s decision ultimately led to the forced removal of the Cherokee despite their legal victory.',
    question: 'What does the aftermath of Worcester v. Georgia reveal about the limits of judicial power?',
    answerOptions: [
      {
        text: 'The Supreme Court could declare legal principles but lacked the power to enforce them without executive cooperation.',
        isCorrect: true,
        rationale:
          'The case demonstrates that the Court\u2019s ruling was meaningless without executive enforcement: Jackson refused to uphold it, leading to Cherokee removal despite the legal victory.',
      },
      {
        text: 'The Supreme Court successfully prevented the removal of the Cherokee from their lands.',
        isCorrect: false,
        rationale:
          'The passage describes the "forced removal of the Cherokee despite their legal victory," indicating the Court\u2019s ruling was not enforced.',
      },
      {
        text: 'The executive branch always follows Supreme Court decisions without exception.',
        isCorrect: false,
        rationale:
          'Jackson\u2019s defiance of the ruling directly contradicts this statement.',
      },
      {
        text: 'Georgia voluntarily returned all Cherokee lands after the Supreme Court ruling.',
        isCorrect: false,
        rationale:
          'Georgia did not comply; the Cherokee were ultimately removed from their lands.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 7,
    type: 'text',
    passage:
      'The Mormon migration to Utah in 1846\u20131847, led by Brigham Young, represents one of the most organized westward movements in American history. Facing religious persecution in Illinois after the murder of their founder Joseph Smith, approximately 70,000 members of the Church of Jesus Christ of Latter-day Saints undertook a 1,300-mile journey to the Great Salt Lake Valley. Young chose this remote, arid location precisely because it was outside the United States at the time (it was Mexican territory) and far from other settlements. The Mormons transformed the desert through an elaborate irrigation system, establishing a thriving community that became the Territory of Utah when the land was acquired after the Mexican-American War.',
    question: 'Why did Brigham Young choose the remote Great Salt Lake Valley as the Mormon destination?',
    answerOptions: [
      {
        text: 'The isolated location was outside U.S. territory and far from the persecution they faced elsewhere.',
        isCorrect: true,
        rationale:
          'The passage states Young chose the location "precisely because it was outside the United States at the time and far from other settlements" to escape religious persecution.',
      },
      {
        text: 'The valley had abundant water and fertile farmland ready for immediate cultivation.',
        isCorrect: false,
        rationale:
          'The passage describes the area as "remote, arid" and notes the Mormons had to "transform the desert through an elaborate irrigation system."',
      },
      {
        text: 'The federal government had offered the Mormons free land in the Utah territory.',
        isCorrect: false,
        rationale:
          'The area was Mexican territory at the time; the Mormons chose it independently to escape persecution.',
      },
      {
        text: 'Gold had recently been discovered in the Salt Lake Valley.',
        isCorrect: false,
        rationale:
          'The passage does not mention gold; the choice was motivated by the desire for isolation and religious freedom.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      'The Homestead Act of 1862 offered 160 acres of public land to any citizen (or intended citizen) who was the head of a household or at least 21 years old. To receive full ownership, homesteaders had to live on the land for five years, build a dwelling, and cultivate the soil. Alternatively, they could purchase the land after six months at $1.25 per acre. The Act attracted hundreds of thousands of settlers, including immigrants from Europe, formerly enslaved African Americans (known as Exodusters), and single women. However, the 160-acre allotment proved insufficient for farming in the arid Great Plains, where rainfall was too scarce for traditional agriculture, and many homesteaders eventually failed.',
    question: 'Why did many homesteaders on the Great Plains ultimately fail despite receiving free land?',
    answerOptions: [
      {
        text: 'The 160-acre allotment was too small for viable farming in the arid plains, where rainfall was insufficient for traditional agriculture.',
        isCorrect: true,
        rationale:
          'The passage states "the 160-acre allotment proved insufficient for farming in the arid Great Plains, where rainfall was too scarce for traditional agriculture."',
      },
      {
        text: 'The government revoked the Homestead Act before most settlers could complete the five-year requirement.',
        isCorrect: false,
        rationale:
          'The passage does not mention the Act being revoked; the problem was the land\u2019s aridity, not government policy changes.',
      },
      {
        text: 'Homesteaders were required to return the land after five years of use.',
        isCorrect: false,
        rationale:
          'After five years, homesteaders received full ownership; they did not have to return the land.',
      },
      {
        text: 'Only wealthy landowners could afford the required farming equipment.',
        isCorrect: false,
        rationale:
          'The passage identifies aridity and insufficient acreage, not equipment costs, as the primary reasons for failure.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 9,
    type: 'text',
    passage:
      'The concept of "Fifty-Four Forty or Fight!" was a popular slogan during the 1844 presidential election, referring to the northern boundary of the Oregon Territory at latitude 54\u00b040\u2032. Democrat James K. Polk campaigned on the promise of claiming the entire Oregon Territory, which extended from the northern border of California to the southern boundary of Russian Alaska. Britain also claimed the region, and tensions rose as American settlers flooded into the Willamette Valley. Rather than risk war with Britain while simultaneously pursuing conflict with Mexico, Polk negotiated the Oregon Treaty of 1846, which divided the territory at the 49th parallel\u2014the boundary that still separates the United States and Canada in the Pacific Northwest.',
    question: 'Why did President Polk ultimately negotiate the Oregon boundary at the 49th parallel instead of demanding "Fifty-Four Forty"?',
    answerOptions: [
      {
        text: 'He did not want to risk war with Britain while simultaneously pursuing conflict with Mexico.',
        isCorrect: true,
        rationale:
          'The passage states Polk negotiated "rather than risk war with Britain while simultaneously pursuing conflict with Mexico."',
      },
      {
        text: 'Britain had already withdrawn all claims to territory south of the 54th parallel.',
        isCorrect: false,
        rationale:
          'Britain also claimed the Oregon Territory; the 49th parallel was a compromise, not a reflection of British withdrawal.',
      },
      {
        text: 'American settlers had no interest in the territory north of the 49th parallel.',
        isCorrect: false,
        rationale:
          'The slogan "Fifty-Four Forty or Fight!" indicated strong public desire for the full territory, not disinterest.',
      },
      {
        text: 'The Constitution prohibited the President from negotiating territorial treaties.',
        isCorrect: false,
        rationale:
          'The President has treaty-making authority under the Constitution; Polk exercised it in negotiating the Oregon Treaty.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 10,
    type: 'knowledge',
    question: 'Which of the following best describes the significance of the Louisiana Purchase in 1803?',
    answerOptions: [
      {
        text: 'It approximately doubled the size of the United States and opened vast western territories for exploration and settlement.',
        isCorrect: true,
        rationale:
          'The Louisiana Purchase added approximately 828,000 square miles of territory, roughly doubling the nation\u2019s size and providing land that would eventually become all or part of 15 states.',
      },
      {
        text: 'It acquired only the city of New Orleans and a small surrounding area.',
        isCorrect: false,
        rationale:
          'Although New Orleans was the original target, Napoleon offered the entire Louisiana Territory, stretching from the Mississippi to the Rockies.',
      },
      {
        text: 'It was a military conquest that required a lengthy war with France.',
        isCorrect: false,
        rationale:
          'The territory was acquired through diplomatic purchase for approximately $15 million, not military conquest.',
      },
      {
        text: 'It gave the United States control of territory from the Atlantic to the Pacific Ocean.',
        isCorrect: false,
        rationale:
          'The Louisiana Territory extended to the Rocky Mountains, not the Pacific; the West Coast was acquired later through other means.',
      },
    ],
    challenge_tags: ['social-1'],
  },
];
