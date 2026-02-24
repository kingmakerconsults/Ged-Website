/**
 * The American Revolution: Quiz 2
 * Topics: Key Battles, Military Strategy, Foreign Alliances, Turning Points of the War
 */

module.exports = [
  {
    questionNumber: 1,
    type: 'text',
    passage:
      'The Battles of Lexington and Concord on April 19, 1775, marked the beginning of armed conflict between Britain and the American colonies. British General Thomas Gage ordered 700 soldiers to march from Boston to Concord to seize colonial weapons stores. Warned by riders including Paul Revere and William Dawes, approximately 70 militiamen assembled on Lexington Green. A shot was fired\u2014the famous "shot heard round the world"\u2014and in the brief skirmish that followed, eight colonists were killed. The British continued to Concord but found most of the supplies already moved. On their return march to Boston, colonial minutemen fired on them from behind stone walls and trees, inflicting over 250 British casualties.',
    question: 'What does the phrase "shot heard round the world" suggest about the significance of the Battles of Lexington and Concord?',
    answerOptions: [
      {
        text: 'The battles had consequences that extended far beyond the local conflict, inspiring revolutionary movements worldwide.',
        isCorrect: true,
        rationale:
          'The phrase suggests these first shots of the American Revolution had global significance, as the ideas of self-governance and resistance to tyranny influenced revolutions in France and elsewhere.',
      },
      {
        text: 'The musket fire was so loud it could literally be heard across the Atlantic Ocean.',
        isCorrect: false,
        rationale:
          'The phrase is metaphorical, referring to the historical impact of the event, not the physical sound of gunfire.',
      },
      {
        text: 'The British used a new type of weapon that produced an unusually loud sound.',
        isCorrect: false,
        rationale:
          'Standard weapons were used; the phrase describes historical significance, not weapon technology.',
      },
      {
        text: 'News of the battle was deliberately suppressed and never reached other countries.',
        isCorrect: false,
        rationale:
          'The phrase implies the opposite\u2014the event resonated globally and inspired other movements for self-governance.',
      },
    ],
    challenge_tags: ['social-1', 'social-3', 'rla-5'],
  },
  {
    questionNumber: 2,
    type: 'text',
    passage:
      'George Washington faced enormous challenges as Commander-in-Chief of the Continental Army. His forces were largely untrained militia who signed short-term enlistments, often returning home after a few months. The army chronically lacked supplies\u2014soldiers frequently went without adequate food, clothing, and ammunition. Washington\u2019s strategic approach relied on avoiding major pitched battles where the British army\u2019s superior training and numbers would be decisive. Instead, he focused on keeping his army intact, making strategic retreats when necessary, and striking when conditions favored the Americans.',
    question: 'Why did Washington adopt a strategy of avoiding major pitched battles?',
    answerOptions: [
      {
        text: 'The British army\u2019s superior training and numbers gave them an advantage in large-scale conventional engagements.',
        isCorrect: true,
        rationale:
          'The passage states Washington avoided battles "where the British army\u2019s superior training and numbers would be decisive," making guerrilla-style tactics more practical.',
      },
      {
        text: 'Washington personally opposed violence and preferred to negotiate peace.',
        isCorrect: false,
        rationale:
          'Washington did engage in combat when conditions were favorable; his strategy was about military pragmatism, not pacifism.',
      },
      {
        text: 'The Continental Congress had forbidden the army from engaging in offensive operations.',
        isCorrect: false,
        rationale:
          'The passage attributes the strategy to practical military disadvantages, not congressional restrictions.',
      },
      {
        text: 'American soldiers were better trained and preferred fighting in small units.',
        isCorrect: false,
        rationale:
          'The passage describes American soldiers as "largely untrained militia," which was precisely why large battles were avoided.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 3,
    type: 'text',
    passage:
      'On Christmas night 1776, Washington led 2,400 soldiers across the ice-choked Delaware River in a surprise attack on the Hessian garrison at Trenton, New Jersey. The Hessians\u2014German mercenaries hired by the British\u2014were unprepared for the pre-dawn assault. The Americans captured approximately 900 prisoners and seized much-needed weapons and supplies with minimal casualties. Coming after a string of devastating defeats in New York, the victory at Trenton was a critical morale boost. It convinced many soldiers whose enlistments were expiring to continue serving and demonstrated that the Continental Army could achieve decisive victories.',
    question: 'Why was the Battle of Trenton significant beyond its immediate military results?',
    answerOptions: [
      {
        text: 'It restored morale after devastating defeats and persuaded soldiers to continue serving.',
        isCorrect: true,
        rationale:
          'The passage states the victory was "a critical morale boost" that "convinced many soldiers whose enlistments were expiring to continue serving."',
      },
      {
        text: 'It was the largest battle of the entire Revolutionary War.',
        isCorrect: false,
        rationale:
          'Trenton was a relatively small engagement (2,400 Americans vs. a Hessian garrison); its importance was psychological, not scale.',
      },
      {
        text: 'It convinced Britain to immediately negotiate a peace treaty.',
        isCorrect: false,
        rationale:
          'The war continued for seven more years after Trenton; Britain did not seek peace after this battle.',
      },
      {
        text: 'It was the first time American soldiers encountered Hessian mercenaries.',
        isCorrect: false,
        rationale:
          'Americans had already encountered Hessians in the New York campaign; Trenton\u2019s significance was its morale impact.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 4,
    type: 'text',
    passage:
      'The Battle of Saratoga in October 1777 is widely considered the turning point of the American Revolution. British General John Burgoyne led an army south from Canada with the goal of cutting off New England from the other colonies by controlling the Hudson River valley. However, Burgoyne\u2019s army became overextended, supply lines were disrupted, and reinforcements from New York never arrived. Surrounded by a growing American force under General Horatio Gates, Burgoyne surrendered his entire army of approximately 6,000 men. The victory proved that the Americans could defeat a major British force in the field.',
    question: 'Why is the Battle of Saratoga considered the turning point of the Revolutionary War?',
    answerOptions: [
      {
        text: 'It demonstrated that the American army could defeat a major British force and led directly to the French alliance.',
        isCorrect: true,
        rationale:
          'The passage states the victory "proved that the Americans could defeat a major British force," and historically this success convinced France to enter the war as an American ally.',
      },
      {
        text: 'It was the final battle of the war, ending British military operations.',
        isCorrect: false,
        rationale:
          'Saratoga occurred in 1777; the war continued until Yorktown in 1781. It was a turning point, not the conclusion.',
      },
      {
        text: 'General Washington personally commanded the American forces at Saratoga.',
        isCorrect: false,
        rationale:
          'The passage identifies General Horatio Gates as the American commander at Saratoga, not Washington.',
      },
      {
        text: 'The British voluntarily withdrew to demonstrate their desire for peace.',
        isCorrect: false,
        rationale:
          'Burgoyne surrendered his entire army after being surrounded\u2014a forced capitulation, not a voluntary withdrawal.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 5,
    type: 'text',
    passage:
      'The winter of 1777\u20131778 at Valley Forge, Pennsylvania, tested the Continental Army\u2019s endurance as never before. Approximately 12,000 soldiers encamped in crude log huts with inadequate food, clothing, and blankets. Disease, including typhus, dysentery, and smallpox, swept through the camp, killing an estimated 2,000 men. Despite these terrible conditions, the army emerged stronger in the spring. Baron Friedrich von Steuben, a Prussian military officer, drilled the soldiers in European military tactics, transforming them from a loosely organized militia into a disciplined fighting force capable of standing against British regulars in open battle.',
    question: 'How did the experience at Valley Forge ultimately strengthen the Continental Army?',
    answerOptions: [
      {
        text: 'Von Steuben\u2019s training transformed the soldiers into a disciplined force capable of facing British regulars.',
        isCorrect: true,
        rationale:
          'The passage states Von Steuben "drilled the soldiers in European military tactics, transforming them from a loosely organized militia into a disciplined fighting force."',
      },
      {
        text: 'The harsh winter eliminated all soldiers who were not committed to the cause, leaving only the strongest.',
        isCorrect: false,
        rationale:
          'While some soldiers deserted, the passage focuses on Von Steuben\u2019s training as the transformative factor, not a process of natural selection.',
      },
      {
        text: 'The soldiers received massive shipments of supplies from France that winter.',
        isCorrect: false,
        rationale:
          'The passage describes "inadequate food, clothing, and blankets"\u2014the conditions were marked by severe shortages, not abundant supplies.',
      },
      {
        text: 'Washington negotiated a temporary ceasefire with the British during the encampment.',
        isCorrect: false,
        rationale:
          'No ceasefire is mentioned; the army endured the winter while preparing for continued fighting.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 6,
    type: 'text',
    passage:
      'France\u2019s alliance with the United States, formalized by the Treaty of Alliance in February 1778, transformed the Revolutionary War from a colonial rebellion into a global conflict. France provided the Americans with crucial military supplies, trained officers, naval forces, and direct financial aid. The Marquis de Lafayette, a young French aristocrat, had already been serving as a volunteer in Washington\u2019s army and became one of his most trusted generals. France\u2019s entry forced Britain to divert military resources to defend its interests in the Caribbean, India, and Europe, significantly reducing the forces available for the American theater.',
    question: 'How did the French alliance change the strategic situation of the Revolutionary War?',
    answerOptions: [
      {
        text: 'It forced Britain to divert military resources globally, weakening the forces available to fight in America.',
        isCorrect: true,
        rationale:
          'The passage states France\u2019s entry "forced Britain to divert military resources to defend its interests in the Caribbean, India, and Europe, significantly reducing the forces available for the American theater."',
      },
      {
        text: 'France replaced the Continental Army with French soldiers who fought the war independently.',
        isCorrect: false,
        rationale:
          'France supplemented American forces with supplies, officers, and naval power but did not replace the Continental Army.',
      },
      {
        text: 'The alliance convinced Britain to immediately grant independence to the colonies.',
        isCorrect: false,
        rationale:
          'The war continued for several more years; the alliance strengthened America\u2019s position but did not end the conflict immediately.',
      },
      {
        text: 'France and America agreed to divide the British colonies equally after the war.',
        isCorrect: false,
        rationale:
          'The alliance aimed to secure American independence, not to carve up British territories.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 7,
    type: 'text',
    passage:
      'After 1778, the British shifted their military strategy southward, believing that large numbers of Loyalists in the Southern colonies would rally to support British forces. Initially, the strategy appeared successful: the British captured Savannah in December 1778 and Charleston in May 1780, taking over 5,000 American prisoners\u2014the largest American surrender until the Civil War. However, the expected Loyalist support proved inconsistent, and brutal tactics by British commanders like Banastre Tarleton alienated many previously neutral Southerners, pushing them toward the Patriot cause.',
    question: 'Why did the British Southern strategy ultimately fail despite early successes?',
    answerOptions: [
      {
        text: 'Loyalist support was inconsistent, and British brutality alienated neutral Southerners, driving them to the Patriot side.',
        isCorrect: true,
        rationale:
          'The passage states "the expected Loyalist support proved inconsistent" and brutal tactics "alienated many previously neutral Southerners, pushing them toward the Patriot cause."',
      },
      {
        text: 'The Southern colonies had no strategic importance to Britain.',
        isCorrect: false,
        rationale:
          'Britain targeted the South precisely because of its perceived strategic value, including expected Loyalist support.',
      },
      {
        text: 'American forces outnumbered the British in every Southern engagement.',
        isCorrect: false,
        rationale:
          'The British achieved significant early victories, including capturing 5,000 prisoners at Charleston, indicating they were not consistently outnumbered.',
      },
      {
        text: 'France sent its entire navy to blockade all Southern ports.',
        isCorrect: false,
        rationale:
          'The passage attributes the failure to political factors (lack of Loyalist support and alienation of neutrals), not a French naval blockade.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 8,
    type: 'text',
    passage:
      'The Battle of Yorktown in October 1781 was the decisive final engagement of the Revolutionary War. British General Charles Cornwallis had moved his army to Yorktown, Virginia, expecting reinforcement by sea. Washington, coordinating with French General Rochambeau, marched his combined American and French forces south from New York in a bold strategic gamble. Simultaneously, a French fleet under Admiral de Grasse defeated the British navy at the Battle of the Chesapeake, cutting off Cornwallis\u2019s escape by sea. Surrounded by 17,000 American and French troops on land and blockaded by the French navy, Cornwallis surrendered his 8,000-man army on October 19, 1781.',
    question: 'What role did coordination between American and French forces play in the victory at Yorktown?',
    answerOptions: [
      {
        text: 'The combined land and naval coordination trapped Cornwallis, cutting off both reinforcement and escape.',
        isCorrect: true,
        rationale:
          'The passage describes a coordinated effort: Washington and Rochambeau surrounded Yorktown by land while de Grasse\u2019s fleet cut off the sea, making the British position untenable.',
      },
      {
        text: 'The French provided only financial support while Americans handled all military operations.',
        isCorrect: false,
        rationale:
          'French forces participated directly: Rochambeau led ground troops and de Grasse commanded the fleet that defeated the British navy.',
      },
      {
        text: 'Cornwallis voluntarily surrendered before any fighting took place.',
        isCorrect: false,
        rationale:
          'The surrender came after a siege and the naval Battle of the Chesapeake; it was not voluntary.',
      },
      {
        text: 'Washington attacked alone while French forces remained in New York.',
        isCorrect: false,
        rationale:
          'The passage explicitly states Washington marched south "coordinating with French General Rochambeau" and the French fleet was critical to the victory.',
      },
    ],
    challenge_tags: ['social-1', 'social-4'],
  },
  {
    questionNumber: 9,
    type: 'text',
    passage:
      'The Treaty of Paris, signed on September 3, 1783, formally ended the American Revolutionary War. Under its terms, Britain recognized the independence and sovereignty of the United States with boundaries extending from the Atlantic Ocean to the Mississippi River, and from Canada to Spanish Florida. Britain agreed to withdraw all troops from American territory and granted Americans fishing rights off the coast of Newfoundland. In return, Congress agreed to recommend that states restore property confiscated from Loyalists and that private debts owed to British creditors would be honored.',
    question: 'How did the Treaty of Paris reshape the territorial boundaries of the new United States?',
    answerOptions: [
      {
        text: 'It extended American territory from the Atlantic Ocean to the Mississippi River, greatly exceeding the original thirteen colonies.',
        isCorrect: true,
        rationale:
          'The passage states boundaries extended "from the Atlantic Ocean to the Mississippi River," roughly doubling the territory controlled by the original colonies.',
      },
      {
        text: 'The United States received only the land occupied by the original thirteen colonies along the coast.',
        isCorrect: false,
        rationale:
          'The treaty granted territory well beyond the thirteen colonies, extending to the Mississippi River.',
      },
      {
        text: 'Britain retained control of all territories west of the Appalachian Mountains.',
        isCorrect: false,
        rationale:
          'Britain ceded all territory to the Mississippi River; the Proclamation Line of 1763 was no longer applicable.',
      },
      {
        text: 'France received the western territories as compensation for its military support.',
        isCorrect: false,
        rationale:
          'The western territories went to the United States, not France, under the terms of the treaty.',
      },
    ],
    challenge_tags: ['social-1', 'social-3'],
  },
  {
    questionNumber: 10,
    type: 'knowledge',
    question: 'Which of the following individuals served as a foreign volunteer who helped train the Continental Army during the winter at Valley Forge?',
    answerOptions: [
      {
        text: 'Baron Friedrich von Steuben',
        isCorrect: true,
        rationale:
          'Von Steuben, a Prussian military officer, volunteered to train the Continental Army at Valley Forge, transforming it into a more professional fighting force.',
      },
      {
        text: 'Benedict Arnold',
        isCorrect: false,
        rationale:
          'Arnold was an American general who later defected to the British side; he was not a foreign volunteer.',
      },
      {
        text: 'King Louis XVI',
        isCorrect: false,
        rationale:
          'Louis XVI authorized French support for the Revolution but did not personally serve in the American army.',
      },
      {
        text: 'General William Howe',
        isCorrect: false,
        rationale:
          'Howe was the British commander-in-chief, not a foreign volunteer aiding the Americans.',
      },
    ],
    challenge_tags: ['social-1'],
  },
];
