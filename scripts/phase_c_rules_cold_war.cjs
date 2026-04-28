const { buildRule } = require('./propagate_rationale_rewrites.cjs');

module.exports = [
  // Why "Cold War"
  buildRule(
    'Because most of the conflicts occurred in cold, northern climates.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The conflict took place in many climates worldwide (Korea, Vietnam, Cuba, the Middle East, Africa). The "cold" in Cold War refers to the absence of direct fighting, not to weather.'
  ),
  buildRule(
    'Because there was no direct, large-scale military conflict between the two superpowers.',
    'Because there was no direct, large-scale military conflict between the two superpowers.',
    'Correct. The U.S. and USSR never fought one another directly with conventional armies. The rivalry instead played out through proxy wars, espionage, propaganda, an arms race, and economic competition.'
  ),
  buildRule(
    'Because it was fought primarily over access to arctic resources.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. Although the Arctic was strategically important for missile and submarine routes, the Cold War was a global ideological struggle between capitalism and communism, not a fight over Arctic resources.'
  ),
  buildRule(
    'Because it ended in a stalemate with no clear winner.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The Cold War actually ended with the collapse of the Soviet Union in 1991, generally regarded as a decisive Western victory. The "cold" label refers to its character during the conflict, not its outcome.'
  ),

  // Containment
  buildRule(
    'To defeat the Soviet Union in a direct military conflict.',
    'This option does not accurately reflect the passage or question context.',
    "Incorrect. Containment, articulated by George Kennan, deliberately avoided direct war; it sought to prevent communism's geographic spread through diplomacy, alliances, and limited interventions."
  ),
  buildRule(
    'To prevent the spread of communism to other countries.',
    'To prevent the spread of communism to other countries.',
    'Correct. Containment was the doctrine, formalized in the 1947 Truman Doctrine, of using political, economic, and military pressure to keep Soviet communism from expanding beyond the areas it already controlled.'
  ),
  buildRule(
    'To establish communist governments in Western Europe.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The U.S. opposed the spread of communism to Western Europe and used the Marshall Plan and NATO precisely to prevent communist takeovers there.'
  ),
  buildRule(
    'To create a single global government through the United Nations.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The United States supported the U.N. as a forum for international cooperation, not as a world government; containment was about checking Soviet expansion, not building a global state.'
  ),

  // Marshall Plan
  buildRule(
    'To provide military aid to Eastern European countries.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The Marshall Plan was economic aid for Western Europe; the Soviet Union pressured Eastern European states to refuse it, fearing American influence.'
  ),
  buildRule(
    'To rebuild Western European economies to make them less susceptible to communism.',
    'To rebuild Western European economies to make them less susceptible to communism.',
    'Correct. By providing more than $13 billion in aid, the Marshall Plan stabilized war-shattered Western European economies, strengthened democratic governments, and made communist political appeals less attractive.'
  ),
  buildRule(
    'To punish Germany for its role in World War II.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Although the plan came after WWII, its purpose was reconstruction \u2014 West Germany was actually a major Marshall Plan recipient and was rebuilt rather than punished.'
  ),
  buildRule(
    'To create a free trade zone between the U.S. and the Soviet Union.',
    'This is not the correct answer based on the information provided.',
    'Incorrect. The plan deliberately excluded the Soviet Union, which rejected participation; it was designed to bind Western Europe to the United States, not to integrate trade with the USSR.'
  ),

  // NATO
  buildRule(
    'To promote economic cooperation between member nations.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    'Incorrect. Economic cooperation in postwar Europe was the role of the OEEC (later OECD) and the European Economic Community; NATO was specifically a military alliance.'
  ),
  buildRule(
    'To provide collective security against a potential attack by the Soviet Union.',
    'To provide collective security against a potential attack by the Soviet Union.',
    "Correct. NATO's 1949 charter (Article 5) declared that an armed attack on any member would be treated as an attack on all, deterring Soviet aggression by guaranteeing a unified Western military response."
  ),
  buildRule(
    'To coordinate the exploration of space.',
    '"To coordinate the exploration of space." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Space exploration was conducted by national agencies (NASA in the U.S., the Soviet space program in the USSR), not by NATO.'
  ),
  buildRule(
    'To enforce the terms of the Treaty of Versailles.',
    '"To enforce the terms of the Treaty of Versailles." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The Treaty of Versailles ended World War I in 1919; NATO was founded thirty years later to address Cold War security threats, not to enforce a long-defunct WWI treaty.'
  ),

  // Voting Rights Act 1965
  buildRule(
    'It lowered the voting age to 18.',
    'This option does not accurately reflect the passage or question context.',
    'Incorrect. Lowering the voting age to 18 came from the Twenty-Sixth Amendment in 1971; the Voting Rights Act of 1965 focused on dismantling barriers used to disenfranchise African Americans.'
  ),
  buildRule(
    'It banned the use of literacy tests as a requirement for voting.',
    'It banned the use of literacy tests as a requirement for voting.',
    'Correct. Section 4 suspended literacy tests, and federal examiners were authorized to register voters in jurisdictions with histories of discrimination, dramatically expanding African American voter registration in the South.'
  ),
  buildRule(
    'It granted women the right to vote.',
    'This answer is incorrect. Review the passage carefully to find the correct information.',
    "Incorrect. Women's suffrage was secured by the Nineteenth Amendment in 1920; the 1965 Voting Rights Act addressed racial discrimination in voting, not gender."
  ),
  buildRule(
    'It established a national popular vote for president.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The Electoral College system has not been replaced; the 1965 Voting Rights Act focused on protecting individual voter access, especially for African Americans, not on changing how presidents are elected.'
  ),

  // Domino theory
  buildRule(
    'That economic instability in one country would cause a global depression.',
    '"That economic instability in one country would cause a global depression." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. The domino theory was a political/military analogy about communist takeovers, not an economic theory about depressions or financial contagion.'
  ),
  buildRule(
    'That if one country fell to communism, its neighbors would likely follow.',
    'That if one country fell to communism, its neighbors would likely follow.',
    'Correct. As the passage explains, the domino theory predicted that a communist victory in one country would topple neighboring states one after another, a rationale used to justify U.S. interventions like the Vietnam War.'
  ),
  buildRule(
    'That a nuclear war would cause a chain reaction of destruction.',
    '"That a nuclear war would cause a chain reaction of destruction." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. That idea is closer to "mutually assured destruction" or "nuclear winter"; the domino theory specifically concerned the political spread of communism, not nuclear effects.'
  ),
  buildRule(
    'That all communist countries would eventually collapse like dominoes.',
    'This answer is incorrect. Consider the key details in the question.',
    "Incorrect. The theory predicted communism's spread, not its collapse. The actual collapse of communist regimes in 1989\u20131991 was sometimes described as a 'reverse domino effect' decades later."
  ),

  // Cuban Missile Crisis
  buildRule(
    'A dispute over the political leadership of Cuba.',
    'While this might seem plausible, it is not supported by the information given.',
    "Incorrect. The U.S. opposed Castro's regime, but the 13-day crisis was triggered specifically by U-2 photos of Soviet medium-range nuclear missiles being assembled in Cuba, not by a leadership dispute."
  ),
  buildRule(
    'The presence of Soviet nuclear missiles in Cuba, posing a direct threat to the U.S.',
    'The presence of Soviet nuclear missiles in Cuba, posing a direct threat to the U.S.',
    'Correct. American reconnaissance discovered Soviet ballistic missiles in Cuba within striking distance of the U.S. mainland; the resulting standoff brought the superpowers closer to nuclear war than at any other point in the Cold War.'
  ),
  buildRule(
    'A U.S. naval blockade of the Soviet Union.',
    '"A U.S. naval blockade of the Soviet Union." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. The U.S. imposed a naval 'quarantine' around Cuba (not the Soviet Union itself) to halt further missile shipments; the blockade was a U.S. response to the crisis, not its underlying cause."
  ),
  buildRule(
    'A disagreement over the price of sugar imports from Cuba.',
    '"A disagreement over the price of sugar imports from Cuba." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. U.S.\u2013Cuban sugar trade had already collapsed after the U.S. cut Cuba's sugar quota in 1960; the 1962 crisis was a nuclear standoff, not a commodity dispute."
  ),

  // Brown v. Board
  buildRule(
    "the 'separate but equal' doctrine was constitutional.",
    '"the \'separate but equal\' doctrine was constitutional." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. Brown overturned 'separate but equal' as it applied to public schools; the Court held that segregated educational facilities are inherently unequal."
  ),
  buildRule(
    'state-sponsored segregation in public schools was unconstitutional.',
    'state-sponsored segregation in public schools was unconstitutional.',
    "Correct. The unanimous 1954 ruling held that racially segregated public schools violate the Fourteenth Amendment's Equal Protection Clause, overturning Plessy v. Ferguson's 'separate but equal' doctrine in education."
  ),
  buildRule(
    'poll taxes were illegal.',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. Poll taxes in federal elections were banned by the Twenty-Fourth Amendment (1964) and in state elections by Harper v. Virginia Board of Elections (1966), not by Brown v. Board.'
  ),
  buildRule(
    'women had the right to vote.',
    '"women had the right to vote." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    "Incorrect. Women's voting rights were secured by the Nineteenth Amendment in 1920; Brown v. Board (1954) addressed racial segregation in public schools."
  ),

  // March on Washington 1963
  buildRule(
    'To protest U.S. involvement in the Vietnam War.',
    '"To protest U.S. involvement in the Vietnam War." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Major Vietnam War protests came later in the 1960s; the 1963 March on Washington focused on civil rights and economic justice for African Americans.'
  ),
  buildRule(
    'To advocate for the passage of a comprehensive civil rights bill.',
    'To advocate for the passage of a comprehensive civil rights bill.',
    'Correct. Organizers pressed Congress to pass strong federal civil-rights legislation \u2014 along with fair employment and decent wages \u2014 a campaign that helped lead to the Civil Rights Act of 1964.'
  ),
  buildRule(
    'To celebrate the end of segregation in the United States.',
    '"To celebrate the end of segregation in the United States." is not supported by the passage or data; the correct option is the one whose claim is directly supported.',
    'Incorrect. Legal segregation had not yet ended in 1963; the march was a protest demanding civil-rights legislation, not a celebration of an accomplishment that had not yet occurred.'
  ),
  buildRule(
    'To demand the impeachment of the president.',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The march pressed President Kennedy and Congress to act on civil rights; it was not a call to remove a president from office.'
  ),

  // End of Cold War
  buildRule(
    'The Cuban Missile Crisis',
    'This answer is incorrect. Consider the key details in the question.',
    'Incorrect. The Cuban Missile Crisis (1962) occurred near the middle of the Cold War, not at its end; the conflict continued for nearly three more decades after the crisis was defused.'
  ),
  buildRule(
    'The start of the Vietnam War',
    'While this might seem plausible, it is not supported by the information given.',
    'Incorrect. The Vietnam War was a Cold War-era proxy conflict that escalated in the 1960s and ended in 1975 \u2014 well before the events that ended the Cold War itself.'
  ),
  buildRule(
    'The fall of the Berlin Wall and the dissolution of the Soviet Union',
    'The fall of the Berlin Wall and the dissolution of the Soviet Union',
    'Correct. The fall of the Berlin Wall in 1989 symbolized the collapse of communist control in Eastern Europe, followed by German reunification in 1990 and the formal dissolution of the Soviet Union in 1991, ending the Cold War.'
  ),
  buildRule(
    'The formation of NATO',
    'This is not the correct answer based on the information provided.',
    'Incorrect. NATO was formed in 1949 at the start of the Cold War as a Western military alliance; its founding marked the beginning of the bloc system, not the end of the conflict.'
  ),
];
