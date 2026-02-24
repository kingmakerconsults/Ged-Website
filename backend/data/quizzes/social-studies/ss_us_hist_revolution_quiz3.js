/**
 * The American Revolution: Quiz 3
 * Topics: Enlightenment Foundations, Impact on Diverse Groups, State Constitutions, Revolutionary Legacy
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      'Enlightenment thinkers profoundly influenced the intellectual foundations of the American Revolution. John Locke argued in his "Two Treatises of Government" (1689) that all people possess natural rights to life, liberty, and property, and that government exists through a social contract with the governed. If a government violates these rights, the people have the right to overthrow it. Jean-Jacques Rousseau expanded on the social contract theory, emphasizing that sovereignty resides in the people as a whole. These ideas provided the philosophical justification for colonial leaders who argued that Britain had broken its social contract with the colonies.',
    question: 'How did John Locke\u2019s philosophy provide justification for the American Revolution?',
    answerOptions: [
      {
        text: 'His theory that people may overthrow a government that violates their natural rights justified colonial resistance to Britain.',
        isCorrect: true,
        rationale:
          'The passage states Locke argued "if a government violates these rights, the people have the right to overthrow it," directly justifying the colonists\u2019 rebellion.',
      },
      {
        text: 'Locke argued that monarchies were the most effective form of government for large nations.',
        isCorrect: false,
        rationale:
          'Locke\u2019s social contract theory challenged absolute monarchy by asserting government requires the consent of the governed.',
      },
      {
        text: 'Locke believed that governments should never be changed under any circumstances.',
        isCorrect: false,
        rationale:
          'The passage explicitly states the opposite: Locke argued people have "the right to overthrow" a government that violates their rights.',
      },
      {
        text: 'Locke wrote the Declaration of Independence for the American colonies.',
        isCorrect: false,
        rationale:
          'Locke died in 1704, decades before the Revolution; Jefferson drew on Locke\u2019s ideas but wrote the Declaration himself.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 2,
    type: 'text',
    passage:
      'While the Declaration of Independence proclaimed that "all men are created equal," the reality of the Revolution was far more complex for enslaved African Americans. Approximately 5,000 Black soldiers served in the Continental Army, with some earning their freedom through military service. However, the British also offered freedom to enslaved people who escaped from Patriot owners and joined the British side, through Lord Dunmore\u2019s Proclamation of 1775. An estimated 20,000 enslaved people fled to British lines during the war. After the conflict, Northern states began gradual emancipation, but slavery was preserved and even strengthened in the South.',
    question: 'What does the passage reveal about the contradiction between Revolutionary ideals and the experience of enslaved people?',
    answerOptions: [
      {
        text: 'While the Revolution proclaimed equality, it did not extend those ideals to most enslaved people, and slavery persisted in the South.',
        isCorrect: true,
        rationale:
          'The passage contrasts the Declaration\u2019s equality language with the reality that "slavery was preserved and even strengthened in the South" despite some Northern emancipation.',
      },
      {
        text: 'The Revolution immediately freed all enslaved people in every state.',
        isCorrect: false,
        rationale:
          'The passage states only Northern states began "gradual emancipation" while slavery continued in the South.',
      },
      {
        text: 'Enslaved people were not involved in the Revolutionary War in any capacity.',
        isCorrect: false,
        rationale:
          'The passage notes approximately 5,000 Black soldiers served in the Continental Army and 20,000 fled to British lines.',
      },
      {
        text: 'Both the British and Americans refused to allow enslaved people to participate in the war.',
        isCorrect: false,
        rationale:
          'Both sides recruited or accepted enslaved people: Americans had Black soldiers, and Britain offered freedom through Lord Dunmore\u2019s Proclamation.',
      },
    ],
    challenge_tags: ['social-1', 'social-4', 'rla-5'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'Women played essential roles during the American Revolution despite being excluded from formal political participation. They managed farms and businesses while men were away at war, organized boycotts of British goods, and raised funds for the Continental Army. Some women, like Deborah Sampson, disguised themselves as men to fight. Others, like Mercy Otis Warren, used their writing to advance the Patriot cause. Abigail Adams famously wrote to her husband John Adams in 1776, urging him to "remember the ladies" when drafting new laws. Despite their contributions, women gained no new political rights from the Revolution and remained legally subordinate to their husbands under the doctrine of coverture.',
    question: 'What can be inferred about the impact of the Revolution on women\u2019s political status?',
    answerOptions: [
      {
        text: 'Despite significant contributions to the war effort, women gained no new political rights from the Revolution.',
        isCorrect: true,
        rationale:
          'The passage states that "despite their contributions, women gained no new political rights" and remained under the legal doctrine of coverture.',
      },
      {
        text: 'Women were granted full voting rights as a reward for their wartime contributions.',
        isCorrect: false,
        rationale:
          'The passage explicitly states women "gained no new political rights from the Revolution."',
      },
      {
        text: 'Women were prohibited from participating in any activities related to the war.',
        isCorrect: false,
        rationale:
          'The passage describes numerous wartime roles including managing farms, organizing boycotts, fundraising, fighting, and writing political works.',
      },
      {
        text: 'The Revolution eliminated the doctrine of coverture in all states.',
        isCorrect: false,
        rationale:
          'The passage states women "remained legally subordinate to their husbands under the doctrine of coverture" after the Revolution.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      'The American Revolution devastated many Native American nations, particularly those who had allied with the British. The Iroquois Confederacy, one of the most powerful Native alliances in North America, was torn apart when some nations (Mohawk, Seneca, Cayuga, and Onondaga) sided with Britain while others (Oneida and Tuscarora) supported the Americans. In 1779, Washington ordered the Sullivan-Clinton Campaign, which destroyed over 40 Iroquois villages and their food supplies. After the Treaty of Paris, Britain ceded Native lands to the United States without consulting or compensating their Native allies, leaving them to face American expansion unprotected.',
    question: 'How did the Treaty of Paris affect Native American nations that had allied with Britain?',
    answerOptions: [
      {
        text: 'Britain ceded their lands to the United States without consulting or compensating them, leaving them unprotected.',
        isCorrect: true,
        rationale:
          'The passage states Britain "ceded Native lands to the United States without consulting or compensating their Native allies, leaving them to face American expansion unprotected."',
      },
      {
        text: 'The treaty included specific provisions protecting Native American territorial rights.',
        isCorrect: false,
        rationale:
          'The passage explicitly states Native allies were not consulted, and the treaty provided no protections for their lands.',
      },
      {
        text: 'Native American nations were invited to participate in the peace negotiations.',
        isCorrect: false,
        rationale:
          'The passage indicates Britain acted "without consulting" its Native allies during the treaty process.',
      },
      {
        text: 'All Iroquois nations unified to support the American side after the war.',
        isCorrect: false,
        rationale:
          'The passage describes how the Iroquois Confederacy was "torn apart" by divided loyalties during the war.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 5,
    type: 'text',
    passage:
      'After declaring independence, each of the thirteen former colonies needed to create new state governments to replace British colonial authority. Most states drafted written constitutions between 1776 and 1780. These documents generally included declarations of rights, established elected legislatures with broad powers, and created weak executive branches\u2014reflecting colonial distrust of governors who had represented the Crown. Pennsylvania\u2019s 1776 constitution was the most democratic, featuring a unicameral legislature, no governor, and broad suffrage for all taxpaying men. In contrast, states like South Carolina maintained property requirements that limited political participation to wealthy landowners.',
    question: 'Why did most early state constitutions establish weak executive branches?',
    answerOptions: [
      {
        text: 'Colonists distrusted strong executives because colonial governors had represented and enforced British authority.',
        isCorrect: true,
        rationale:
          'The passage states the weak executives reflected "colonial distrust of governors who had represented the Crown."',
      },
      {
        text: 'The Articles of Confederation required all states to have weak governors.',
        isCorrect: false,
        rationale:
          'Most state constitutions were written before the Articles of Confederation were ratified; the decision was driven by colonial experience, not federal mandate.',
      },
      {
        text: 'George Washington recommended that states avoid having governors.',
        isCorrect: false,
        rationale:
          'The passage attributes the design choice to colonial distrust of royal governors, not to Washington\u2019s recommendation.',
      },
      {
        text: 'European governments at the time universally used weak executive branches.',
        isCorrect: false,
        rationale:
          'European monarchies had powerful executives; the weak executive model was a distinctly American reaction to colonial experience.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 6,
    type: 'text',
    passage:
      'The Northwest Ordinance of 1787 was one of the most significant achievements of the Congress under the Articles of Confederation. It established the process for organizing and admitting new states from the territory north of the Ohio River (present-day Ohio, Indiana, Illinois, Michigan, and Wisconsin). The ordinance guaranteed certain rights to settlers, including freedom of religion, trial by jury, and due process. Crucially, it prohibited slavery in the Northwest Territory, establishing the principle that newly created states would not necessarily follow the practices of the original thirteen. The ordinance required a territory to have 60,000 free inhabitants before it could apply for statehood.',
    question: 'Why is the Northwest Ordinance considered a landmark piece of legislation?',
    answerOptions: [
      {
        text: 'It established the process for creating new states and prohibited slavery in the Northwest Territory.',
        isCorrect: true,
        rationale:
          'The passage identifies both the statehood process and the slavery prohibition as key achievements, noting the ordinance set a precedent that new states could differ from the original thirteen.',
      },
      {
        text: 'It granted immediate statehood to all territories west of the Appalachian Mountains.',
        isCorrect: false,
        rationale:
          'The ordinance required 60,000 free inhabitants before statehood could be applied for; it was not an immediate grant.',
      },
      {
        text: 'It abolished slavery throughout all existing states.',
        isCorrect: false,
        rationale:
          'The prohibition applied only to the Northwest Territory, not to the existing states.',
      },
      {
        text: 'It was the first law passed under the new Constitution.',
        isCorrect: false,
        rationale:
          'The ordinance was passed under the Articles of Confederation in 1787, before the Constitution took effect.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 7,
    type: 'text',
    passage:
      'The American Revolution inspired revolutionary movements across the globe. The French Revolution (1789) drew directly on American ideals, with the Marquis de Lafayette\u2014a veteran of the American conflict\u2014helping draft the French Declaration of the Rights of Man and of the Citizen. In Latin America, leaders like Sim\u00f3n Bol\u00edvar and Jos\u00e9 de San Mart\u00edn explicitly cited the American example as they led independence movements against Spanish colonial rule in the early 19th century. The principles articulated in the Declaration of Independence\u2014natural rights, consent of the governed, and the right of revolution\u2014became touchstones for movements seeking self-governance worldwide.',
    question: 'How did the American Revolution influence political movements beyond the United States?',
    answerOptions: [
      {
        text: 'Its principles of natural rights and self-governance inspired revolutions in France, Latin America, and elsewhere.',
        isCorrect: true,
        rationale:
          'The passage describes direct influence on the French Revolution (Lafayette, Declaration of Rights of Man) and Latin American independence movements (Bol\u00edvar, San Mart\u00edn).',
      },
      {
        text: 'Other nations were inspired to strengthen their monarchies after seeing the chaos of revolution.',
        isCorrect: false,
        rationale:
          'The passage describes revolutions against established authority, not efforts to strengthen monarchies.',
      },
      {
        text: 'The American Revolution had no impact outside of North America.',
        isCorrect: false,
        rationale:
          'The passage provides specific examples of influence in France and Latin America.',
      },
      {
        text: 'The United States sent its army to help overthrow governments in France and Latin America.',
        isCorrect: false,
        rationale:
          'The influence was ideological, not military; foreign leaders drew on American principles independently.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      'The economic consequences of the Revolutionary War were severe. The Continental Congress had financed the war largely through printing paper money (Continentals) and borrowing from foreign governments, primarily France and the Netherlands. By the war\u2019s end, the Continental currency had depreciated so dramatically that the phrase "not worth a Continental" became a common expression for worthlessness. The states and the national government collectively owed approximately  million in debts. Individual soldiers, many of whom had not been paid for years, returned home to farms burdened by taxes and debts, contributing to unrest like Shays\u2019s Rebellion in 1786.',
    question: 'What economic problem is illustrated by the phrase "not worth a Continental"?',
    answerOptions: [
      {
        text: 'The severe depreciation of the Continental currency, which had lost nearly all its value by the war\u2019s end.',
        isCorrect: true,
        rationale:
          'The passage states the currency "had depreciated so dramatically" that the phrase became synonymous with worthlessness.',
      },
      {
        text: 'The high value of Continental currency compared to British pounds.',
        isCorrect: false,
        rationale:
          'The phrase indicated worthlessness, not high value; the currency had lost its purchasing power.',
      },
      {
        text: 'The decision by Congress to mint gold coins for all soldiers.',
        isCorrect: false,
        rationale:
          'Congress printed paper money, not gold coins, and soldiers often went unpaid for years.',
      },
      {
        text: 'Britain\u2019s refusal to accept American currency in trade negotiations.',
        isCorrect: false,
        rationale:
          'The phrase referred to domestic depreciation of the currency, not its acceptance in international trade.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 9,
    type: 'text',
    passage:
      'The concept of republicanism\u2014the belief that government should be based on the consent of the people and that citizens have a civic duty to participate in governance\u2014was central to the revolutionary generation\u2019s political philosophy. Unlike a direct democracy, where citizens vote on every issue, a republic delegates decision-making to elected representatives. The founders believed that a functioning republic required "civic virtue": citizens willing to sacrifice personal interests for the common good. This emphasis on civic virtue shaped early American culture, from educational philosophy (schools should produce informed citizens) to social expectations (public service was the highest calling).',
    question: 'How did the concept of "civic virtue" relate to early American republicanism?',
    answerOptions: [
      {
        text: 'The founders believed a republic required citizens willing to prioritize the common good over personal interests.',
        isCorrect: true,
        rationale:
          'The passage defines civic virtue as "citizens willing to sacrifice personal interests for the common good" and identifies it as essential to a functioning republic.',
      },
      {
        text: 'Civic virtue meant that only the wealthiest citizens should participate in government.',
        isCorrect: false,
        rationale:
          'Civic virtue was about willingness to serve the common good, not about wealth as a qualification for participation.',
      },
      {
        text: 'The founders rejected civic virtue as a European concept incompatible with American values.',
        isCorrect: false,
        rationale:
          'The passage describes civic virtue as "central to the revolutionary generation\u2019s political philosophy," not a rejected concept.',
      },
      {
        text: 'Civic virtue required that all citizens serve in the military for at least two years.',
        isCorrect: false,
        rationale:
          'The passage defines civic virtue broadly as prioritizing the common good, not as a military service requirement.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 10,
    type: 'text',
    passage:
      'The Revolutionary War fundamentally altered land ownership patterns in America. The seizure and redistribution of Loyalist estates broke up large concentrations of land that had existed under colonial rule. States also abolished primogeniture\u2014the practice of leaving all land to the eldest son\u2014and entail\u2014the restriction preventing heirs from selling inherited land. These legal changes promoted wider distribution of property and economic opportunity. Combined with access to western lands ceded by Britain in the Treaty of Paris, the Revolution opened possibilities for land ownership to a broader segment of white male society, though women, Native Americans, and enslaved people were largely excluded from these gains.',
    question: 'How did the abolition of primogeniture and entail change American society after the Revolution?',
    answerOptions: [
      {
        text: 'It promoted wider distribution of property by allowing land to be divided among heirs and sold freely.',
        isCorrect: true,
        rationale:
          'The passage explains that ending primogeniture (all land to eldest son) and entail (restriction on selling) "promoted wider distribution of property and economic opportunity."',
      },
      {
        text: 'It concentrated land ownership among fewer families than before the Revolution.',
        isCorrect: false,
        rationale:
          'The passage describes the opposite effect: these changes distributed property more widely.',
      },
      {
        text: 'It granted equal land rights to women, Native Americans, and enslaved people.',
        isCorrect: false,
        rationale:
          'The passage explicitly states these groups "were largely excluded from these gains."',
      },
      {
        text: 'It required all Americans to return their land to the British Crown.',
        isCorrect: false,
        rationale:
          'After independence, there was no obligation to the Crown; the changes expanded American land ownership.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
];
