/**
 * GED Ready-Style U.S. History — Passage-Based Questions (Set 2)
 * Modeled after GED Ready® Social Studies exam format:
 *   - Primary source passages (150-300 words)
 *   - Civil War & Reconstruction, Industrialization/Gilded Age,
 *     WWII home front, Cold War / second-wave Civil Rights
 *   - Higher-order thinking: inference, cause/effect, author's purpose
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This passage describes the Emancipation Proclamation issued by President Abraham Lincoln on January 1, 1863.\n\nThe Emancipation Proclamation declared that "all persons held as slaves" within the rebellious Confederate states "are, and henceforward shall be free." However, the proclamation had important limits. It did not apply to the four slave-holding border states that had remained loyal to the Union (Delaware, Kentucky, Maryland, and Missouri), nor to areas of the Confederacy already under Union military control. As a wartime measure, Lincoln issued it under his authority as commander in chief, arguing that freeing enslaved people in rebel territory weakened the Confederate war effort.\n\nThe proclamation also opened the door for African American men to enlist in the Union Army and Navy. By the end of the Civil War, nearly 200,000 Black soldiers and sailors had served in Union forces. Permanent abolition of slavery throughout the United States required the Thirteenth Amendment, which was ratified in December 1865, eight months after the war ended.',
    question:
      'Based on the passage, why did the Emancipation Proclamation NOT immediately end slavery in the United States?',
    answerOptions: [
      {
        text: 'Most enslaved people in the Confederacy refused to leave the plantations.',
        rationale:
          'The passage does not discuss the choices of enslaved people. It explains the legal limits of the proclamation itself.',
        isCorrect: false,
      },
      {
        text: 'The proclamation did not apply to loyal border states or Union-controlled areas, and full abolition required the Thirteenth Amendment.',
        rationale:
          'Correct. The passage explicitly states the proclamation excluded the four loyal border states and Confederate areas already under Union control, and that permanent abolition required ratification of the Thirteenth Amendment in 1865.',
        isCorrect: true,
      },
      {
        text: 'Congress voted to delay the proclamation until after the war ended.',
        rationale:
          'The passage gives no evidence of a congressional delay. Lincoln issued the proclamation as a wartime executive measure on January 1, 1863.',
        isCorrect: false,
      },
      {
        text: 'The Supreme Court ruled the proclamation unconstitutional in 1863.',
        rationale:
          'The passage does not mention any Supreme Court ruling. There was no such case overturning the proclamation.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 2,
    type: 'text',
    difficulty: 'hard',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This excerpt is adapted from the Reconstruction Acts of 1867, passed by Congress over the veto of President Andrew Johnson.\n\nWhereas no legal State governments or adequate protection for life or property now exist in the rebel States . . . and whereas it is necessary that peace and good order should be enforced in said States until loyal and republican State governments can be legally established: . . .\n\nSaid rebel States shall be divided into military districts and made subject to the military authority of the United States. . . . When the people of any one of said rebel States shall have formed a constitution of government in conformity with the Constitution of the United States in all respects, framed by a convention of delegates elected by the male citizens of said State twenty-one years old and upward, of whatever race, color, or previous condition . . . and when such State, by a vote of its legislature elected under said constitution, shall have adopted the [Fourteenth] amendment . . . said State shall be declared entitled to representation in Congress.',
    question:
      'Which conclusion about Congressional Reconstruction is best supported by this passage?',
    answerOptions: [
      {
        text: 'Congress wanted former Confederate states to be readmitted as quickly as possible without conditions.',
        rationale:
          'The passage lists multiple conditions (military districts, new constitutions, ratifying the Fourteenth Amendment) that contradict an unconditional readmission policy.',
        isCorrect: false,
      },
      {
        text: 'Congress required former Confederate states to extend voting rights to Black men and to ratify the Fourteenth Amendment before being readmitted.',
        rationale:
          'Correct. The passage requires constitutions framed by male citizens "of whatever race, color, or previous condition" and ratification of the Fourteenth Amendment as conditions for readmission to Congress.',
        isCorrect: true,
      },
      {
        text: 'The Reconstruction Acts placed civilian state governors in charge of all former Confederate states.',
        rationale:
          'The passage explicitly places the rebel states under "military authority," not civilian governors.',
        isCorrect: false,
      },
      {
        text: 'President Johnson worked closely with Congress to design these acts.',
        rationale:
          "The introduction notes the acts were passed over Johnson's veto, indicating sharp conflict, not cooperation.",
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 3,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      "This passage describes industrial growth in the United States during the late 1800s, an era often called the Gilded Age.\n\nBetween 1865 and 1900, the United States transformed from a largely agricultural nation into the world's leading industrial power. Railroads expanded from about 35,000 miles of track in 1865 to nearly 200,000 miles by 1900, knitting together a national market. Steel production, led by industrialists such as Andrew Carnegie, made possible the construction of skyscrapers, bridges, and rail networks. John D. Rockefeller built Standard Oil into a near-monopoly that controlled roughly 90 percent of U.S. oil refining at its peak.\n\nThis explosive growth produced enormous private fortunes but also harsh conditions for many workers. Factory hours were typically 10 to 12 per day, six days a week. Wages were low, child labor was common, and workplace injuries went largely uncompensated. Cities such as New York, Chicago, and Pittsburgh swelled with immigrants who lived in crowded tenements. Reformers, journalists, and labor unions began to call for limits on corporate power and for government regulation — pressure that would shape the Progressive Era reforms of the early 1900s.",
    question:
      'Which cause-and-effect relationship is best supported by the passage?',
    answerOptions: [
      {
        text: 'Rapid industrial growth produced both great wealth and worker hardship, prompting calls for reform.',
        rationale:
          'Correct. The passage links industrial expansion (railroads, steel, oil) to large fortunes and to harsh working conditions, then states that reformers and unions began to demand changes that "would shape the Progressive Era reforms."',
        isCorrect: true,
      },
      {
        text: 'Government regulation of business caused industries such as steel and oil to decline by 1900.',
        rationale:
          'The passage describes industrial expansion through 1900 and notes regulation came later, during the Progressive Era. There is no evidence regulation caused industrial decline.',
        isCorrect: false,
      },
      {
        text: 'Labor unions successfully ended child labor and the 12-hour workday by 1900.',
        rationale:
          'The passage states reformers "began to call for" change but does not claim those reforms had succeeded by 1900.',
        isCorrect: false,
      },
      {
        text: 'Most U.S. workers in 1900 enjoyed shorter hours and higher pay than European workers.',
        rationale:
          'The passage describes long hours, low wages, and tenement living, not favorable conditions, and makes no comparison to European workers.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 4,
    type: 'text',
    difficulty: 'hard',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This excerpt is from Theodore Roosevelt\'s 1901 first annual message to Congress, which laid the groundwork for the Progressive Era.\n\nThe tremendous and highly complex industrial development which went on with ever accelerated rapidity during the latter half of the nineteenth century brings us face to face, at the beginning of the twentieth, with very serious social problems. The old laws, and the old customs which had almost the binding force of law, were once quite sufficient to regulate the accumulation and distribution of wealth. Since the industrial changes which have so enormously increased the productive power of mankind, they are no longer sufficient. . . .\n\nThe mechanism of modern business is so delicate that extreme care must be taken not to interfere with it in a spirit of rashness or ignorance. Many of those who have made it their vocation to denounce the great industrial combinations which are popularly, although with technical inaccuracy, known as "trusts," appeal especially to the . . . envy of those who are well off. . . . Yet the actual evils, even though they have been greatly exaggerated, exist; and there should be created instruments by which to find out how much is fact and how much fiction.',
    question:
      "Which statement best summarizes Roosevelt's position in this excerpt?",
    answerOptions: [
      {
        text: 'Trusts and large industrial combinations should be broken up immediately by federal action.',
        rationale:
          'Roosevelt warns against "rashness," explicitly cautioning against immediate aggressive intervention. He calls for investigation rather than instant breakup.',
        isCorrect: false,
      },
      {
        text: 'Existing laws are adequate, and government should leave business untouched.',
        rationale:
          'Roosevelt explicitly states that the old laws "are no longer sufficient," contradicting this view.',
        isCorrect: false,
      },
      {
        text: 'New tools are needed to investigate industrial problems, but reform must be careful and based on facts rather than envy.',
        rationale:
          'Correct. Roosevelt acknowledges new social problems require new responses, urges careful action ("not to interfere . . . in a spirit of rashness or ignorance"), and calls for instruments "to find out how much is fact and how much fiction" — a measured, fact-based reform stance.',
        isCorrect: true,
      },
      {
        text: 'Critics of the trusts are entirely correct and should lead the reform movement.',
        rationale:
          'Roosevelt says critics appeal to "envy" and that evils have been "greatly exaggerated" — he is skeptical of giving them leadership.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 5,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This passage describes the U.S. home front during World War II.\n\nWhen the United States entered World War II in December 1941, the federal government quickly mobilized the entire economy. Auto factories converted to building tanks, aircraft, and trucks. The War Production Board directed raw materials toward military needs, and rationing limited civilian access to goods such as gasoline, sugar, meat, rubber, and shoes. Posters urged Americans to buy war bonds, plant "victory gardens," and conserve scrap metal.\n\nThe demand for labor pulled millions of women into wartime industries, often in jobs previously closed to them. About 6 million women joined the paid workforce during the war, many working in factories building ships, planes, and munitions; the figure of "Rosie the Riveter" became a wartime icon. African Americans migrated in large numbers from the rural South to industrial cities in the North and West for war jobs, accelerating what historians call the Second Great Migration. At the same time, more than 110,000 Japanese Americans on the West Coast — most of them U.S. citizens — were forcibly removed from their homes and confined in internment camps under Executive Order 9066.',
    question:
      'Based on the passage, which generalization about the U.S. home front during World War II is best supported?',
    answerOptions: [
      {
        text: 'The war effort expanded economic opportunities for some Americans while denying basic rights to others.',
        rationale:
          'Correct. The passage describes new factory jobs for women and African Americans (expanded opportunities) alongside the forced removal and internment of Japanese Americans (denial of rights), supporting a both/and generalization.',
        isCorrect: true,
      },
      {
        text: 'Civilian life was largely unaffected by the war.',
        rationale:
          'The passage details rationing, victory gardens, and major shifts in employment — all clear effects on civilian life.',
        isCorrect: false,
      },
      {
        text: 'Government wartime policy treated all U.S. citizens equally.',
        rationale:
          'The internment of Japanese American citizens directly contradicts equal treatment.',
        isCorrect: false,
      },
      {
        text: 'Women returned to their pre-war roles immediately after Pearl Harbor.',
        rationale:
          'The passage states 6 million women joined the paid workforce during the war, the opposite of returning to pre-war roles.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 6,
    type: 'text',
    difficulty: 'hard',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      "This excerpt is from President Dwight D. Eisenhower's farewell address, delivered on January 17, 1961.\n\nUntil the latest of our world conflicts, the United States had no armaments industry. American makers of plowshares could, with time and as required, make swords as well. But now we can no longer risk emergency improvisation of national defense; we have been compelled to create a permanent armaments industry of vast proportions. Added to this, three and a half million men and women are directly engaged in the defense establishment. . . .\n\nIn the councils of government, we must guard against the acquisition of unwarranted influence, whether sought or unsought, by the military-industrial complex. The potential for the disastrous rise of misplaced power exists, and will persist. We must never let the weight of this combination endanger our liberties or democratic processes. We should take nothing for granted. Only an alert and knowledgeable citizenry can compel the proper meshing of the huge industrial and military machinery of defense with our peaceful methods and goals, so that security and liberty may prosper together.",
    question: 'What is the main warning Eisenhower expresses in this excerpt?',
    answerOptions: [
      {
        text: 'The Soviet Union may launch a surprise nuclear attack on the United States.',
        rationale:
          'Eisenhower does not warn about a Soviet attack here. His warning is about an internal danger to U.S. democracy.',
        isCorrect: false,
      },
      {
        text: 'A permanent alliance between the military and defense industries could gain "unwarranted influence" over American democracy.',
        rationale:
          'Correct. Eisenhower introduces the term "military-industrial complex" and warns the public to guard against its acquiring "unwarranted influence" that could "endanger our liberties or democratic processes."',
        isCorrect: true,
      },
      {
        text: 'The United States should immediately disband its standing army.',
        rationale:
          'Eisenhower acknowledges that a permanent defense establishment is necessary and says the country can "no longer risk emergency improvisation." He does not call for disbanding it.',
        isCorrect: false,
      },
      {
        text: 'Congress should grant the president unlimited authority over defense spending.',
        rationale:
          'The opposite is true: Eisenhower calls on an "alert and knowledgeable citizenry" to check the power of the military-industrial complex, implying broader oversight, not concentrated executive power.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 7,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This excerpt is from the Civil Rights Act of 1964, signed into law by President Lyndon B. Johnson.\n\nTitle II — Injunctive Relief Against Discrimination in Places of Public Accommodation\n\nSec. 201. (a) All persons shall be entitled to the full and equal enjoyment of the goods, services, facilities, privileges, advantages, and accommodations of any place of public accommodation, as defined in this section, without discrimination or segregation on the ground of race, color, religion, or national origin.\n\n(b) Each of the following establishments which serves the public is a place of public accommodation within the meaning of this title if its operations affect commerce . . . :\n(1) any inn, hotel, motel, or other establishment which provides lodging to transient guests . . . ;\n(2) any restaurant, cafeteria, lunchroom, lunch counter, soda fountain, or other facility principally engaged in selling food for consumption on the premises . . . ;\n(3) any motion picture house, theater, concert hall, sports arena, stadium or other place of exhibition or entertainment.',
    question:
      'Which type of discrimination did Title II of the Civil Rights Act of 1964 most directly address?',
    answerOptions: [
      {
        text: 'Discrimination by federal agencies in hiring practices.',
        rationale:
          'Title II focuses on places of public accommodation, not federal employment. (Federal employment discrimination is addressed by other titles and earlier executive orders.)',
        isCorrect: false,
      },
      {
        text: 'Segregation in public schools and universities.',
        rationale:
          'School desegregation is addressed by Brown v. Board of Education (1954) and other titles of the Act, not Title II.',
        isCorrect: false,
      },
      {
        text: 'Segregation and exclusion at hotels, restaurants, theaters, and similar businesses serving the public.',
        rationale:
          'Correct. Title II explicitly lists hotels, restaurants/lunch counters, and theaters/stadiums as places of public accommodation that must serve all persons "without discrimination or segregation on the ground of race, color, religion, or national origin."',
        isCorrect: true,
      },
      {
        text: 'Discrimination in private membership clubs that do not serve the general public.',
        rationale:
          'Title II repeatedly references establishments that "serve the public." Private clubs not open to the public were not the primary focus of this title.',
        isCorrect: false,
      },
    ],
  },
  {
    questionNumber: 8,
    type: 'text',
    difficulty: 'medium',
    topic: 'U.S. History',
    contentArea: 'us_history',
    passage:
      'This passage describes the Voting Rights Act of 1965 and its impact.\n\nDespite the Fifteenth Amendment\'s 1870 guarantee that voting rights "shall not be denied or abridged . . . on account of race, color, or previous condition of servitude," many Southern states had used literacy tests, poll taxes, "grandfather clauses," and outright intimidation to prevent African Americans from registering to vote. In Selma, Alabama, in early 1965, only about 2 percent of voting-age Black residents were registered, even though they made up more than half the city\'s population.\n\nFollowing the violence against peaceful marchers on the Edmund Pettus Bridge ("Bloody Sunday," March 7, 1965), public pressure pushed Congress to act. The Voting Rights Act of 1965 banned literacy tests in jurisdictions with a history of low minority registration and authorized federal officials to oversee voter registration in those areas. Within five years, Black voter registration in the Deep South more than doubled, and the number of Black elected officials at all levels of government began to rise sharply.',
    question:
      'Which statement is best supported by both the passage and the historical context it describes?',
    answerOptions: [
      {
        text: 'The Fifteenth Amendment, by itself, was sufficient to guarantee equal voting rights for African Americans.',
        rationale:
          'The passage shows the opposite: nearly a century after the Fifteenth Amendment, Black registration in places like Selma was about 2 percent, demonstrating the amendment alone was not sufficient.',
        isCorrect: false,
      },
      {
        text: 'Federal action in 1965 was needed to enforce voting rights that the Fifteenth Amendment had promised in 1870.',
        rationale:
          "Correct. The passage explains that the 1870 amendment's guarantee was undermined for decades by literacy tests, poll taxes, and intimidation, and that the 1965 Act's federal enforcement mechanisms (banning literacy tests, federal oversight) finally produced major increases in Black registration.",
        isCorrect: true,
      },
      {
        text: 'The Voting Rights Act of 1965 had little effect on Black voter registration in the South.',
        rationale:
          'The passage states Black voter registration in the Deep South "more than doubled" within five years — a clear, large effect.',
        isCorrect: false,
      },
      {
        text: 'Most Southern states voluntarily ended literacy tests before 1965.',
        rationale:
          'The passage indicates Congress had to ban literacy tests in the 1965 Act precisely because states had not removed them voluntarily.',
        isCorrect: false,
      },
    ],
  },
];
