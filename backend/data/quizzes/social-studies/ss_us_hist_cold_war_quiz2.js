/**
 * The Cold War: Quiz 2
 * Extracted from frontend app.jsx
 * Fixed to backend format: array of questions
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      "The 'domino theory' was a Cold War policy idea that suggested a communist government in one nation would quickly lead to communist takeovers in neighboring states, each falling like a row of perfectly aligned dominoes. This theory was used by successive U.S. administrations to justify American intervention in conflicts around the world, most notably in the Korean War and the Vietnam War.",
    question: "What did the 'domino theory' suggest?",
    answerOptions: [
      {
        text: 'That economic instability in one country would cause a global depression.',
        isCorrect: false,
        rationale: "Incorrect. The domino theory was a political/military analogy about communist takeovers, not an economic theory about depressions or financial contagion.",
      },
      {
        text: 'That if one country fell to communism, its neighbors would likely follow.',
        isCorrect: true,
        rationale: "Correct. As the passage explains, the domino theory predicted that a communist victory in one country would topple neighboring states one after another, a rationale used to justify U.S. interventions like the Vietnam War.",
      },
      {
        text: 'That a nuclear war would cause a chain reaction of destruction.',
        isCorrect: false,
        rationale: "Incorrect. That idea is closer to \"mutually assured destruction\" or \"nuclear winter\"; the domino theory specifically concerned the political spread of communism, not nuclear effects.",
      },
      {
        text: 'That all communist countries would eventually collapse like dominoes.',
        isCorrect: false,
        rationale: "Incorrect. The theory predicted communism's spread, not its collapse. The actual collapse of communist regimes in 1989–1991 was sometimes described as a 'reverse domino effect' decades later.",
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 2,
    type: 'knowledge',
    question: 'The Korean War (1950-1953) began when:',
    answerOptions: [
      {
        text: 'the Soviet Union invaded South Korea.',
        isCorrect: false,
        rationale:
          '"the Soviet Union invaded South Korea." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'communist North Korea invaded non-communist South Korea.',
        isCorrect: true,
        rationale: 'communist North Korea invaded non-communist South Korea.',
      },
      {
        text: 'China attacked United Nations forces.',
        isCorrect: false,
        rationale:
          '"China attacked United Nations forces." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'the United States declared war on North Korea.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'The Cuban Missile Crisis of 1962 was a 13-day confrontation between the United States and the Soviet Union, initiated by the American discovery of Soviet ballistic missile deployment in Cuba. It is widely regarded as the moment when the Cold War came closest to escalating into a full-scale nuclear war. The crisis was resolved when the Soviets agreed to remove the missiles in exchange for a U.S. pledge not to invade Cuba and a secret agreement to remove U.S. missiles from Turkey.',
    question: 'What was the central issue of the Cuban Missile Crisis?',
    answerOptions: [
      {
        text: 'A dispute over the political leadership of Cuba.',
        isCorrect: false,
        rationale: "Incorrect. The U.S. opposed Castro's regime, but the 13-day crisis was triggered specifically by U-2 photos of Soviet medium-range nuclear missiles being assembled in Cuba, not by a leadership dispute.",
      },
      {
        text: 'The presence of Soviet nuclear missiles in Cuba, posing a direct threat to the U.S.',
        isCorrect: true,
        rationale: "Correct. American reconnaissance discovered Soviet ballistic missiles in Cuba within striking distance of the U.S. mainland; the resulting standoff brought the superpowers closer to nuclear war than at any other point in the Cold War.",
      },
      {
        text: 'A U.S. naval blockade of the Soviet Union.',
        isCorrect: false,
        rationale: "Incorrect. The U.S. imposed a naval 'quarantine' around Cuba (not the Soviet Union itself) to halt further missile shipments; the blockade was a U.S. response to the crisis, not its underlying cause.",
      },
      {
        text: 'A disagreement over the price of sugar imports from Cuba.',
        isCorrect: false,
        rationale: "Incorrect. U.S.–Cuban sugar trade had already collapsed after the U.S. cut Cuba's sugar quota in 1960; the 1962 crisis was a nuclear standoff, not a commodity dispute.",
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 5,
    challenge_tags: ['social-3'],
    type: 'knowledge',
    question:
      'The launch of the satellite Sputnik by the Soviet Union in 1957 was a major event in the Cold War. What was its most immediate effect in the United States?',
    answerOptions: [
      {
        text: 'It led to a decrease in military spending.',
        isCorrect: false,
        rationale:
          '"It led to a decrease in military spending." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: "It sparked the 'Space Race' and led to increased U.S. funding for science and math education.",
        isCorrect: true,
        rationale:
          "It sparked the 'Space Race' and led to increased U.S. funding for science and math education.",
      },
      {
        text: 'It caused the U.S. to withdraw from NATO.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'It led to the signing of a peace treaty with the Soviet Union.',
        isCorrect: false,
        rationale:
          '"It led to the signing of a peace treaty with the Soviet Union." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
    ],
  },
  {
    questionNumber: 6,
    challenge_tags: ['social-3', 'social-1'],
    type: 'text',
    passage:
      "The Cold War was a period of geopolitical tension between the United States and the Soviet Union and their respective allies, the Western Bloc and the Eastern Bloc. It is called a 'cold' war because there was no large-scale direct fighting between the two superpowers. The conflict was instead expressed through military buildups, proxy wars in other nations, and a race for technological, economic, and ideological supremacy.",
    question:
      "Why is the conflict between the U.S. and the Soviet Union referred to as the 'Cold War'?",
    answerOptions: [
      {
        text: 'Because most of the conflicts occurred in cold, northern climates.',
        isCorrect: false,
        rationale: "Incorrect. The conflict took place in many climates worldwide (Korea, Vietnam, Cuba, the Middle East, Africa). The \"cold\" in Cold War refers to the absence of direct fighting, not to weather.",
      },
      {
        text: 'Because there was no direct, large-scale military conflict between the two superpowers.',
        isCorrect: true,
        rationale: "Correct. The U.S. and USSR never fought one another directly with conventional armies. The rivalry instead played out through proxy wars, espionage, propaganda, an arms race, and economic competition.",
      },
      {
        text: 'Because it was fought primarily over access to arctic resources.',
        isCorrect: false,
        rationale: "Incorrect. Although the Arctic was strategically important for missile and submarine routes, the Cold War was a global ideological struggle between capitalism and communism, not a fight over Arctic resources.",
      },
      {
        text: 'Because it ended in a stalemate with no clear winner.',
        isCorrect: false,
        rationale: "Incorrect. The Cold War actually ended with the collapse of the Soviet Union in 1991, generally regarded as a decisive Western victory. The \"cold\" label refers to its character during the conflict, not its outcome.",
      },
    ],
  },
  {
    questionNumber: 7,
    challenge_tags: ['social-3'],
    type: 'knowledge',
    question:
      "What was the primary goal of the U.S. foreign policy of 'containment' during the Cold War?",
    answerOptions: [
      {
        text: 'To defeat the Soviet Union in a direct military conflict.',
        isCorrect: false,
        rationale: "Incorrect. Containment, articulated by George Kennan, deliberately avoided direct war; it sought to prevent communism's geographic spread through diplomacy, alliances, and limited interventions.",
      },
      {
        text: 'To prevent the spread of communism to other countries.',
        isCorrect: true,
        rationale: "Correct. Containment was the doctrine, formalized in the 1947 Truman Doctrine, of using political, economic, and military pressure to keep Soviet communism from expanding beyond the areas it already controlled.",
      },
      {
        text: 'To establish communist governments in Western Europe.',
        isCorrect: false,
        rationale: "Incorrect. The U.S. opposed the spread of communism to Western Europe and used the Marshall Plan and NATO precisely to prevent communist takeovers there.",
      },
      {
        text: 'To create a single global government through the United Nations.',
        isCorrect: false,
        rationale: "Incorrect. The United States supported the U.N. as a forum for international cooperation, not as a world government; containment was about checking Soviet expansion, not building a global state.",
      },
    ],
  },
  {
    questionNumber: 8,
    challenge_tags: ['social-3'],
    type: 'text',
    passage:
      'The Marshall Plan, officially the European Recovery Program, was a U.S. initiative to aid Western Europe after World War II. The U.S. gave over $13 billion in economic assistance to help rebuild Western European economies. The plan was intended to stabilize the region, promote democratic institutions, and prevent the spread of communism by alleviating poverty and desperation.',
    question: 'What was a key objective of the Marshall Plan?',
    answerOptions: [
      {
        text: 'To provide military aid to Eastern European countries.',
        isCorrect: false,
        rationale: "Incorrect. The Marshall Plan was economic aid for Western Europe; the Soviet Union pressured Eastern European states to refuse it, fearing American influence.",
      },
      {
        text: 'To rebuild Western European economies to make them less susceptible to communism.',
        isCorrect: true,
        rationale: "Correct. By providing more than $13 billion in aid, the Marshall Plan stabilized war-shattered Western European economies, strengthened democratic governments, and made communist political appeals less attractive.",
      },
      {
        text: 'To punish Germany for its role in World War II.',
        isCorrect: false,
        rationale: "Incorrect. Although the plan came after WWII, its purpose was reconstruction — West Germany was actually a major Marshall Plan recipient and was rebuilt rather than punished.",
      },
      {
        text: 'To create a free trade zone between the U.S. and the Soviet Union.',
        isCorrect: false,
        rationale: "Incorrect. The plan deliberately excluded the Soviet Union, which rejected participation; it was designed to bind Western Europe to the United States, not to integrate trade with the USSR.",
      },
    ],
  },
  {
    questionNumber: 10,
    challenge_tags: ['rla-6'],
    type: 'knowledge',
    question:
      'The North Atlantic Treaty Organization (NATO) was a military alliance formed in 1949. What was its primary purpose?',
    answerOptions: [
      {
        text: 'To promote economic cooperation between member nations.',
        isCorrect: false,
        rationale: "Incorrect. Economic cooperation in postwar Europe was the role of the OEEC (later OECD) and the European Economic Community; NATO was specifically a military alliance.",
      },
      {
        text: 'To provide collective security against a potential attack by the Soviet Union.',
        isCorrect: true,
        rationale: "Correct. NATO's 1949 charter (Article 5) declared that an armed attack on any member would be treated as an attack on all, deterring Soviet aggression by guaranteeing a unified Western military response.",
      },
      {
        text: 'To coordinate the exploration of space.',
        isCorrect: false,
        rationale: "Incorrect. Space exploration was conducted by national agencies (NASA in the U.S., the Soviet space program in the USSR), not by NATO.",
      },
      {
        text: 'To enforce the terms of the Treaty of Versailles.',
        isCorrect: false,
        rationale: "Incorrect. The Treaty of Versailles ended World War I in 1919; NATO was founded thirty years later to address Cold War security threats, not to enforce a long-defunct WWI treaty.",
      },
    ],
  },
  {
    questionNumber: 11,
    type: 'knowledge',
    question:
      'The landmark Supreme Court case Brown v. Board of Education of Topeka (1954) declared that:',
    answerOptions: [
      {
        text: "the 'separate but equal' doctrine was constitutional.",
        isCorrect: false,
        rationale: "Incorrect. Brown overturned 'separate but equal' as it applied to public schools; the Court held that segregated educational facilities are inherently unequal.",
      },
      {
        text: 'state-sponsored segregation in public schools was unconstitutional.',
        isCorrect: true,
        rationale: "Correct. The unanimous 1954 ruling held that racially segregated public schools violate the Fourteenth Amendment's Equal Protection Clause, overturning Plessy v. Ferguson's 'separate but equal' doctrine in education.",
      },
      {
        text: 'poll taxes were illegal.',
        isCorrect: false,
        rationale: "Incorrect. Poll taxes in federal elections were banned by the Twenty-Fourth Amendment (1964) and in state elections by Harper v. Virginia Board of Elections (1966), not by Brown v. Board.",
      },
      {
        text: 'women had the right to vote.',
        isCorrect: false,
        rationale: "Incorrect. Women's voting rights were secured by the Nineteenth Amendment in 1920; Brown v. Board (1954) addressed racial segregation in public schools.",
      },
    ],
    challenge_tags: ['social-1'],
  },
  {
    questionNumber: 12,
    challenge_tags: ['social-1'],
    type: 'text',
    passage:
      "The Civil Rights Act of 1964 was a landmark piece of legislation that outlawed discrimination based on race, color, religion, sex, or national origin. It ended unequal application of voter registration requirements and racial segregation in schools, at the workplace, and by facilities that served the general public (known as 'public accommodations').",
    question: 'What was a major provision of the Civil Rights Act of 1964?',
    answerOptions: [
      {
        text: 'It guaranteed a minimum wage for all workers.',
        isCorrect: false,
        rationale:
          '"It guaranteed a minimum wage for all workers." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
      {
        text: 'It outlawed discrimination in public accommodations, such as restaurants and hotels.',
        isCorrect: true,
        rationale:
          'It outlawed discrimination in public accommodations, such as restaurants and hotels.',
      },
      {
        text: 'It provided federal funding for the arts.',
        isCorrect: false,
        rationale:
          'This is not the correct answer based on the information provided.',
      },
      {
        text: 'It abolished the Electoral College.',
        isCorrect: false,
        rationale:
          '"It abolished the Electoral College." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
      },
    ],
  },
];
