/**
 * Westward Expansion: Quiz 2
 * Topics: Texas Annexation, Mexican-American War, California Gold Rush, Transcontinental Railroad
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      'American settlers began moving to Mexican-controlled Texas in the 1820s, invited by the Mexican government to help develop the sparsely populated region. By 1835, Americans outnumbered Mexicans in Texas nearly ten to one. Tensions escalated when Mexican President Antonio L\u00f3pez de Santa Anna centralized power and revoked the Mexican Constitution of 1824, eliminating the autonomy that Texan settlers had enjoyed. In 1836, Texan settlers declared independence, establishing the Republic of Texas. After a devastating defeat at the Alamo and a massacre at Goliad, Texan forces under Sam Houston defeated Santa Anna at the Battle of San Jacinto, securing Texas\u2019s independence.',
    question: 'What event triggered the Texas Revolution against Mexico?',
    answerOptions: [
      {
        text: 'Santa Anna\u2019s centralization of power and revocation of the Mexican Constitution that had protected Texan autonomy.',
        isCorrect: true,
        rationale:
          'The passage states tensions escalated when Santa Anna "centralized power and revoked the Mexican Constitution of 1824, eliminating the autonomy that Texan settlers had enjoyed."',
      },
      {
        text: 'Mexico\u2019s refusal to allow any American settlers into Texas.',
        isCorrect: false,
        rationale:
          'Mexico initially invited American settlers to Texas; the conflict arose from political changes, not exclusion.',
      },
      {
        text: 'The discovery of gold in the Texas territory.',
        isCorrect: false,
        rationale:
          'The passage does not mention gold in Texas; the revolution was prompted by political and constitutional changes.',
      },
      {
        text: 'The United States declared war on Mexico to annex Texas.',
        isCorrect: false,
        rationale:
          'Texas declared its own independence in 1836; U.S. annexation and the Mexican-American War came later.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 2,
    type: 'text',
    passage:
      'The annexation of Texas in 1845 was controversial for several reasons. Northern opponents feared that adding Texas\u2014a slaveholding republic\u2014would upset the balance of power between free and slave states in Congress. Mexico had never recognized Texan independence and warned that annexation would be considered an act of war. Additionally, there was a border dispute: Texas claimed its southern boundary was the Rio Grande, while Mexico insisted it was the Nueces River, roughly 150 miles to the north. President James K. Polk, an ardent expansionist, supported the Texan claim and ordered General Zachary Taylor to position troops along the Rio Grande.',
    question: 'Why was the annexation of Texas controversial in the United States?',
    answerOptions: [
      {
        text: 'It threatened to upset the balance between free and slave states and risked war with Mexico.',
        isCorrect: true,
        rationale:
          'The passage identifies two key controversies: Northern fears about the slave-state balance and Mexico\u2019s warning that annexation "would be considered an act of war."',
      },
      {
        text: 'Texas was too small and economically insignificant to justify the diplomatic risks.',
        isCorrect: false,
        rationale:
          'Texas was a large territory; the controversy was about slavery, the balance of power, and the risk of war with Mexico.',
      },
      {
        text: 'All Americans unanimously supported annexation but disagreed on the timing.',
        isCorrect: false,
        rationale:
          'The passage describes substantive opposition from Northern opponents, not unanimous support.',
      },
      {
        text: 'Britain had already annexed Texas and the U.S. would need to fight Britain to claim it.',
        isCorrect: false,
        rationale:
          'Texas was an independent republic; Britain had not annexed it. The conflict risk was with Mexico.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'The Mexican-American War (1846\u20131848) began when Mexican and American forces clashed in the disputed territory between the Nueces River and the Rio Grande. President Polk declared that Mexico had "shed American blood upon American soil," though critics like Abraham Lincoln challenged this claim, arguing the skirmish occurred on disputed land that could reasonably be considered Mexican territory. The war was deeply divisive: expansionists saw it as fulfillment of Manifest Destiny, while opponents\u2014including Henry David Thoreau, who went to jail rather than pay taxes supporting the war\u2014denounced it as an aggressive land grab designed to extend slavery.',
    question: 'Why did critics like Abraham Lincoln challenge President Polk\u2019s justification for the Mexican-American War?',
    answerOptions: [
      {
        text: 'They argued the initial clash occurred on disputed land that could be considered Mexican territory, not American soil.',
        isCorrect: true,
        rationale:
          'The passage states Lincoln and others argued "the skirmish occurred on disputed land that could reasonably be considered Mexican territory," undermining Polk\u2019s claim.',
      },
      {
        text: 'They believed the United States military was not strong enough to fight Mexico.',
        isCorrect: false,
        rationale:
          'The criticism was about the war\u2019s justification, not military capability.',
      },
      {
        text: 'Mexico had agreed to sell the disputed territory before the fighting began.',
        isCorrect: false,
        rationale:
          'The passage does not mention any Mexican agreement to sell; the debate was about where the fighting occurred.',
      },
      {
        text: 'Congress had already declared war before the border incident took place.',
        isCorrect: false,
        rationale:
          'Polk used the border incident to seek a war declaration; critics questioned whether the incident justified war.',
      },
    ],
    challenge_tags: ['social-1', 'social-3', 'rla-5'],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      'The Treaty of Guadalupe Hidalgo, signed in February 1848, ended the Mexican-American War. Under its terms, Mexico ceded approximately 525,000 square miles of territory to the United States\u2014including present-day California, Nevada, Utah, and parts of Arizona, New Mexico, Colorado, and Wyoming\u2014known as the Mexican Cession. In exchange, the United States paid Mexico $15 million and assumed $3.25 million in debts owed by Mexico to American citizens. The treaty also guaranteed that Mexicans living in the ceded territory could retain their property and become U.S. citizens, though these protections were often violated in practice.',
    question: 'What territory did the United States acquire through the Treaty of Guadalupe Hidalgo?',
    answerOptions: [
      {
        text: 'Approximately 525,000 square miles including present-day California, Nevada, Utah, and parts of several other states.',
        isCorrect: true,
        rationale:
          'The passage describes the Mexican Cession as "approximately 525,000 square miles" including California, Nevada, Utah, and parts of Arizona, New Mexico, Colorado, and Wyoming.',
      },
      {
        text: 'Only the city of Mexico City and the surrounding region.',
        isCorrect: false,
        rationale:
          'The U.S. did not acquire Mexico City; the cession covered the northern regions of Mexico (the American Southwest).',
      },
      {
        text: 'A narrow strip of land along the Rio Grande used to build a railroad.',
        isCorrect: false,
        rationale:
          'That describes the later Gadsden Purchase (1853); the Treaty of Guadalupe Hidalgo involved a much larger territory.',
      },
      {
        text: 'The entire country of Mexico, which became a U.S. territory.',
        isCorrect: false,
        rationale:
          'Mexico retained its sovereignty over the majority of its territory; only the northern regions were ceded.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 5,
    type: 'text',
    passage:
      'The discovery of gold at Sutter\u2019s Mill in Coloma, California, in January 1848 triggered one of the largest mass migrations in American history. News spread rapidly, and by 1849, approximately 300,000 people\u2014known as "Forty-Niners"\u2014had rushed to California from across the United States and around the world, including China, Europe, and Latin America. The gold rush transformed California almost overnight: San Francisco grew from a small settlement to a city of 25,000 in just two years. The sudden population boom accelerated California\u2019s admission as a state in 1850, bypassing the typical territorial phase\u2014a process that intensified the national debate over slavery\u2019s expansion.',
    question: 'How did the California Gold Rush affect the national debate over slavery?',
    answerOptions: [
      {
        text: 'California\u2019s rapid population growth accelerated its application for statehood, forcing Congress to confront whether new states would allow slavery.',
        isCorrect: true,
        rationale:
          'The passage states the population boom "accelerated California\u2019s admission as a state in 1850" and that this "intensified the national debate over slavery\u2019s expansion."',
      },
      {
        text: 'Gold miners unanimously decided to bring enslaved workers to California.',
        isCorrect: false,
        rationale:
          'The passage does not describe miners bringing enslaved workers; California entered the Union as a free state.',
      },
      {
        text: 'Congress decided to postpone California\u2019s admission indefinitely to avoid the slavery question.',
        isCorrect: false,
        rationale:
          'California was admitted as a state in 1850; Congress addressed rather than postponed the issue, though through compromise.',
      },
      {
        text: 'The Gold Rush had no impact on national politics because California was too far from Washington.',
        isCorrect: false,
        rationale:
          'The passage explicitly states the Gold Rush "intensified the national debate over slavery\u2019s expansion."',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 6,
    type: 'text',
    passage:
      'The Compromise of 1850 was a package of five bills designed to resolve the territorial and slavery disputes arising from the Mexican-American War. California was admitted as a free state, satisfying the North. The territories of New Mexico and Utah were organized under popular sovereignty, allowing settlers to decide the slavery question for themselves. The slave trade (but not slavery itself) was abolished in Washington, D.C. Most controversially, the Fugitive Slave Act was strengthened, requiring Northern citizens to assist in the capture and return of escaped enslaved people and denying accused fugitives the right to a jury trial. This provision outraged abolitionists and deepened the divide between North and South.',
    question: 'Why did the Fugitive Slave Act component of the Compromise of 1850 deepen sectional tensions?',
    answerOptions: [
      {
        text: 'It required Northern citizens to help capture escaped enslaved people, outraging abolitionists who morally opposed slavery.',
        isCorrect: true,
        rationale:
          'The passage states the law "requiring Northern citizens to assist in the capture and return of escaped enslaved people" outraged abolitionists "and deepened the divide between North and South."',
      },
      {
        text: 'It freed all enslaved people in the Southern states immediately.',
        isCorrect: false,
        rationale:
          'The Act strengthened the institution of slavery by requiring the return of escaped people; it did not free anyone.',
      },
      {
        text: 'It prevented California from being admitted as a state.',
        isCorrect: false,
        rationale:
          'California was admitted as a free state as part of the same compromise.',
      },
      {
        text: 'Northern states voluntarily adopted the Act and enforced it enthusiastically.',
        isCorrect: false,
        rationale:
          'The passage describes Northern outrage; many Northern states passed personal liberty laws to resist enforcement.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 7,
    type: 'text',
    passage:
      'The Transcontinental Railroad, completed on May 10, 1869, when the Central Pacific and Union Pacific railroads met at Promontory Summit, Utah, connected the eastern rail network to the Pacific coast. The Union Pacific built westward from Omaha, Nebraska, employing primarily Irish immigrants and Civil War veterans. The Central Pacific built eastward from Sacramento, California, relying heavily on Chinese immigrant laborers who performed the most dangerous work, including blasting tunnels through the Sierra Nevada mountains. Despite their essential contribution, Chinese workers were paid less than their white counterparts and faced significant discrimination.',
    question: 'What does the passage reveal about the treatment of Chinese laborers who helped build the Transcontinental Railroad?',
    answerOptions: [
      {
        text: 'They performed the most dangerous work, were paid less than white workers, and faced significant discrimination.',
        isCorrect: true,
        rationale:
          'The passage states Chinese workers "performed the most dangerous work, including blasting tunnels," "were paid less than their white counterparts," and "faced significant discrimination."',
      },
      {
        text: 'They received the highest wages of any workers on the project.',
        isCorrect: false,
        rationale:
          'The passage states the opposite: Chinese workers "were paid less than their white counterparts."',
      },
      {
        text: 'They worked only on the safest sections of the railroad.',
        isCorrect: false,
        rationale:
          'Chinese workers "performed the most dangerous work, including blasting tunnels through the Sierra Nevada mountains."',
      },
      {
        text: 'They were already U.S. citizens with full legal protections.',
        isCorrect: false,
        rationale:
          'The passage identifies them as "Chinese immigrant laborers" who faced "significant discrimination," suggesting they lacked full legal protections.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      'The completion of the Transcontinental Railroad transformed the American economy and society. A journey from the East Coast to California that previously took four to six months by wagon or several weeks by ship around Cape Horn could now be completed in about one week. The railroad facilitated the rapid settlement of the Great Plains and the West, enabled the growth of a national market economy by connecting eastern manufacturers with western consumers, and accelerated the decline of the buffalo herds that Plains Indians depended upon for survival. Railroad companies received enormous land grants from the federal government\u2014approximately 175 million acres\u2014which they sold to settlers and speculators.',
    question: 'How did the Transcontinental Railroad contribute to the decline of Plains Indian cultures?',
    answerOptions: [
      {
        text: 'It facilitated rapid settlement and accelerated the destruction of buffalo herds that Plains Indians depended on.',
        isCorrect: true,
        rationale:
          'The passage states the railroad "facilitated the rapid settlement of the Great Plains" and "accelerated the decline of the buffalo herds that Plains Indians depended upon for survival."',
      },
      {
        text: 'It provided new economic opportunities that attracted Plains Indians to industrial jobs in cities.',
        isCorrect: false,
        rationale:
          'The passage describes the railroad\u2019s destructive impact on Plains Indian life, not new opportunities.',
      },
      {
        text: 'Railroad companies hired Plains Indians to build the western sections of track.',
        isCorrect: false,
        rationale:
          'The passage identifies Irish immigrants, Civil War veterans, and Chinese laborers as the workforce, not Plains Indians.',
      },
      {
        text: 'The railroad had no impact on Native American populations.',
        isCorrect: false,
        rationale:
          'The passage specifically connects the railroad to the decline of buffalo herds essential to Plains Indian survival.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 9,
    type: 'text',
    passage:
      'The concept of popular sovereignty, as applied to the territorial debate over slavery, proposed that settlers in each new territory should decide for themselves whether to permit or prohibit slavery. Senator Stephen Douglas of Illinois championed this approach as a democratic solution to the escalating sectional crisis. The Kansas-Nebraska Act of 1854, which organized the Kansas and Nebraska territories under popular sovereignty, effectively repealed the Missouri Compromise of 1820, which had prohibited slavery north of the 36\u00b030\u2032 line. The result was "Bleeding Kansas," a period of violent conflict between pro-slavery and anti-slavery settlers who flooded into Kansas to influence the vote.',
    question: 'What was the consequence of applying popular sovereignty in the Kansas Territory?',
    answerOptions: [
      {
        text: 'Pro-slavery and anti-slavery settlers flooded into Kansas, leading to violent conflict known as "Bleeding Kansas."',
        isCorrect: true,
        rationale:
          'The passage describes how popular sovereignty led to "Bleeding Kansas, a period of violent conflict between pro-slavery and anti-slavery settlers who flooded into Kansas to influence the vote."',
      },
      {
        text: 'Kansas peacefully voted to become a free state without any controversy.',
        isCorrect: false,
        rationale:
          'The passage describes "Bleeding Kansas" as a period of violent conflict, the opposite of a peaceful resolution.',
      },
      {
        text: 'Congress directly decided the slavery question for Kansas, bypassing the settlers.',
        isCorrect: false,
        rationale:
          'Popular sovereignty specifically left the decision to settlers, which is why competing groups flooded into the territory.',
      },
      {
        text: 'The Missouri Compromise was strengthened and applied to all new territories.',
        isCorrect: false,
        rationale:
          'The Kansas-Nebraska Act "effectively repealed the Missouri Compromise," not strengthened it.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 10,
    type: 'knowledge',
    question: 'The Gadsden Purchase of 1853 acquired a strip of land from Mexico in present-day southern Arizona and New Mexico. What was the primary reason for this acquisition?',
    answerOptions: [
      {
        text: 'To secure a suitable route for a southern transcontinental railroad line.',
        isCorrect: true,
        rationale:
          'The Gadsden Purchase was motivated by the need for a practical railroad route through relatively flat terrain in the southern part of the continent.',
      },
      {
        text: 'To gain access to rich gold deposits discovered along the border.',
        isCorrect: false,
        rationale:
          'The purchase was primarily about railroad routes, not mineral resources.',
      },
      {
        text: 'To provide farmland for settlers displaced by the California Gold Rush.',
        isCorrect: false,
        rationale:
          'The arid land was not sought for farming; the purpose was transportation infrastructure.',
      },
      {
        text: 'To prevent Britain from establishing a colony on the U.S.-Mexico border.',
        isCorrect: false,
        rationale:
          'Britain was not seeking territory along the U.S.-Mexico border; the purchase was about railroad feasibility.',
      },
    ],
    challenge_tags: ['social-1'],
  },
];
