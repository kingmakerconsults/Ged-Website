// frontend/src/data/essayPassages.js
// Raw essay passages (Passage A & Passage B) keyed by topic title.
// Mirrors the in-component `passagesData` array used by the legacy Essay
// Practice Tool so collab/essay views can render the same prose inline
// without iframing the legacy app. Keep in sync with `passagesData` in
// frontend/src/legacy/LegacyRootApp.jsx.
//
// HTML uses two highlight spans: <span class='good-evidence'> and
// <span class='bad-evidence'>. Consumers may render with
// dangerouslySetInnerHTML and apply matching CSS.

const PASSAGES = [
  {
    topic: 'Should the Voting Age Be Lowered to 16?',
    passage1: {
      title: 'Dr. Alisa Klein, Sociologist (Stronger Argument)',
      content:
        "<p>Lowering the voting age to 16 is a crucial step for a healthier democracy. At 16, many young people are employed, pay taxes on their earnings, and are subject to the laws of the land. It is a fundamental principle of democracy&mdash;no taxation without representation&mdash;that they should have a voice in shaping policies that directly affect them, from education funding to climate change.</p><p><span class='good-evidence'>Furthermore, research shows that voting is a habit; a 2020 study from Tufts University found that cities that allow 16-year-olds to vote in local elections see significantly higher youth turnout in subsequent national elections.</span> Enabling citizens to vote at an age when they are still living in a stable home and learning about civics in school increases the likelihood they will become lifelong voters.</p><p><span class='good-evidence'>As political scientist Dr. Mark Franklin notes, &lsquo;The earlier a citizen casts their first ballot, the more likely they are to become a consistent participant in our democracy.&rsquo;</span> It is a vital step toward strengthening civic engagement for generations to come.</p>",
    },
    passage2: {
      title: 'Marcus Reed, Political Analyst (Weaker Argument)',
      content:
        "<p>While the idealism behind lowering the voting age is appealing, the practical realities suggest it would be a mistake. <span class='bad-evidence'>The adolescent brain is still undergoing significant development, particularly in areas related to long-term decision-making and impulse control.</span> The political landscape is complex, requiring a level of experience and cognitive maturity that most 16-year-olds have not yet developed.</p><p>We risk trivializing the profound responsibility of voting by extending it to a demographic that is, by and large, not yet equipped to handle it. <span class='bad-evidence'>I remember being 16, and my friends and I were far more concerned with prom dates and getting a driver's license than with monetary policy.</span> Their priorities are simply not aligned with the serious nature of national governance.</p><p>The current age of 18 strikes a reasonable balance, marking a clear transition into legal adulthood and the full spectrum of responsibilities that come with it. <span class='bad-evidence'>To change this is to experiment with the foundation of our republic for no clear gain.</span></p>",
    },
  },
  {
    topic: 'Is Universal Basic Income (UBI) a Viable Solution to Poverty?',
    passage1: {
      title: 'Anna Coote, Economist (Stronger Argument)',
      content:
        "<p>A Universal Basic Income, while well-intentioned, is an inefficient and expensive tool for poverty reduction. It fails to target the individuals who need support the most, instead distributing funds to everyone, which ultimately dilutes its impact. <span class='good-evidence'>According to a 2018 analysis by the Center on Budget and Policy Priorities, replacing existing targeted aid programs with a modest UBI would actually increase the poverty rate.</span></p><p>Existing programs like SNAP (food stamps) and Medicaid are designed to address the specific, varied hardships of poverty. UBI risks dismantling this targeted support system. Furthermore, there is a significant danger of UBI entrenching low pay and precarious work, as it could effectively subsidize employers who pay poverty wages, normalizing economic instability rather than solving its root causes.</p><p><span class='good-evidence'>This is a logical consequence, as a guaranteed income floor reduces the pressure on companies to offer competitive wages and benefits to attract workers for undesirable jobs.</span> The focus should be on strengthening our existing, targeted safety nets and promoting policies that lead to higher wages and better job quality.</p>",
    },
    passage2: {
      title: 'Robert Doar, Poverty Studies Fellow (Weaker Argument)',
      content:
        "<p>The concept of a guaranteed income has merit as a powerful tool to provide stability in an unstable world. A regular, predictable income floor would act as a safety net, allowing individuals to invest in new skills or find more suitable jobs without the constant threat of destitution. It provides the foundation upon which individuals can build more productive and independent lives.</p><p><span class='bad-evidence'>Everyone knows that if you're not worried about next month's rent, you can make better long-term decisions.</span> It just makes sense that this freedom would lead to a boom in entrepreneurship and creativity, unleashing human potential that is currently suppressed by economic anxiety.</p><p>The goal is not to give up on work, but to provide a cushion that allows for smarter work. Opponents worry that people will stop working, but this is a cynical view of human nature. Most people want to contribute and improve their lives; UBI simply gives them the security to do so more effectively.</p>",
    },
  },
  {
    topic: 'Should Governments Aggressively Subsidize Renewable Energy?',
    passage1: {
      title: 'Energy Policy Journal (Stronger Argument)',
      content:
        "<p>Government subsidies are essential for accelerating the transition to renewable energy sources like solar and wind. The primary benefit is environmental; renewables produce little to no greenhouse gases, combating climate change and improving public health. <span class='good-evidence'>A report from the National Renewable Energy Laboratory (NREL) concluded that achieving 80% renewable electricity by 2050 could reduce economy-wide carbon emissions by 81%.</span></p><p>While the initial costs can be high, subsidies make them accessible and competitive with established fossil fuels, which have themselves been subsidized for decades. This investment creates jobs in a growing clean energy sector and fosters energy independence. <span class='good-evidence'>According to the U.S. Bureau of Labor Statistics, solar panel installer and wind turbine technician are two of the fastest-growing jobs in the country.</span></p><p>In the long run, supporting renewables is not just an environmental decision, but a strategic economic one. It leads to stable, predictable energy costs free from the price volatility of the global oil market. It is a necessary investment in a cleaner and more economically secure future.</p>",
    },
    passage2: {
      title: 'Institute for Energy Research (Weaker Argument)',
      content:
        "<p>While renewable energy is a worthy goal, aggressive government subsidies create significant problems. The high upfront cost of technologies like solar panels and wind turbines are passed on to taxpayers, creating a massive financial burden. These systems also have geographic limitations&mdash;they are only effective in specific locations with consistent sun or wind.</p><p>Furthermore, energy production is often intermittent, requiring expensive battery storage solutions that are not yet advanced enough. <span class='bad-evidence'>Think of the poor families who will have their lights go out on a calm, cloudy day.</span> It's simply not reliable enough to power a modern economy without fossil fuel backup, which defeats the entire purpose.</p><p>A market-driven approach, rather than government intervention, would allow the most efficient and affordable technologies to emerge naturally. We shouldn't let the government pick winners and losers with taxpayer money; we should let innovation and competition determine the best path forward.</p>",
    },
  },
  {
    topic: 'Does Social Media Do More Harm Than Good for Teen Mental Health?',
    passage1: {
      title: "U.S. Surgeon General's Advisory (Stronger Argument)",
      content:
        "<p>There is a profound risk of harm to the mental health and well-being of children and adolescents from social media. <span class='good-evidence'>A 2022 study published in the Journal of the American Medical Association (JAMA) showed that teens who spend more than three hours a day on social media face double the risk of experiencing depression and anxiety symptoms.</span> These platforms are often designed to maximize user engagement, which can disrupt sleep and expose young users to harmful content.</p><p>The adolescent brain is highly susceptible to social comparison and peer pressure. Social media platforms can create a distorted reality, where teens are constantly comparing their own lives to the curated, idealized posts of others. <span class='good-evidence'>This has been directly linked to lower self-esteem and poor body image, particularly among adolescent girls, as noted by the American Psychological Association.</span></p><p><span class='bad-evidence'>It feels like every teenager I meet is more anxious than the last, and they are all glued to their phones.</span> The connection is obvious. We need better safeguards, and parents need to be more aware of the very real dangers these platforms pose to their children's developing minds.</p>",
    },
    passage2: {
      title: 'Youth Mental Health Council (Weaker Argument)',
      content:
        "<p>While risks exist, social media often provides essential benefits for teens. Many report that it helps them feel more accepted and connected to their friends. These online connections are especially crucial for marginalized youth, such as LGBTQ teens, who may find a supportive community online that is unavailable to them in their immediate environment.</p><p><span class='bad-evidence'>My own daughter was struggling to make friends, but she found a wonderful group of people online who share her passion for art. It completely turned her life around.</span> This just goes to show how vital these connections can be for a young person's happiness.</p><p>Social media platforms can foster a sense of belonging and provide a place for creative self-expression. They also help teens access information and resources about mental health, which can promote help-seeking behaviors. To focus only on the negatives is to ignore the powerful role social media can play in supporting youth well-being.</p>",
    },
  },
  {
    topic: 'Is a Four-Year College Degree the Best Path to a Successful Career?',
    passage1: {
      title: 'Dr. Anya Sharma, Education Policy Analyst (Weaker Argument)',
      content:
        "<p>A four-year college degree remains the most reliable pathway to long-term career success and economic mobility. While vocational training has its place, a bachelor's degree provides something far more valuable: a foundation in critical thinking, complex problem-solving, and communication. These are not just job skills; they are life skills that allow graduates to adapt to a rapidly changing economy.</p><p>Statistically, the evidence is overwhelming. College graduates consistently earn significantly more over their lifetimes than those without a degree. <span class='bad-evidence'>Everyone knows someone who got a degree and became successful.</span> This 'degree premium' is not just about the first job out of college, but about the upward trajectory that a broad-based education enables.</p><p>Furthermore, the college experience itself fosters personal growth and exposure to diverse perspectives. To suggest that a narrow, job-specific training program is equivalent is to ignore the fundamental purpose of higher education: to create not just workers, but informed and adaptable citizens.</p>",
    },
    passage2: {
      title: 'Marco Diaz, Skilled Trades Advocate (Stronger Argument)',
      content:
        "<p>For too long, we have pushed a 'college-for-all' mentality that has left millions of young people with crippling student loan debt. It is time we recognize that vocational training offers a more direct and affordable path to a stable career. <span class='good-evidence'>According to the Bureau of Labor Statistics, many skilled trades, such as electricians and plumbers, have median salaries comparable to or exceeding those of many bachelor's degree holders, without the upfront cost.</span></p><p>Vocational programs provide hands-on skills that are immediately applicable. Students often enter paid apprenticeship programs where they earn while they learn. This model avoids the massive debt associated with a four-year degree and allows young adults to begin building financial independence years earlier. <span class='good-evidence'>A 2021 report from the National Center for Education Statistics highlights that the average student loan debt for a bachelor's degree is over $30,000.</span></p><p>We must stop stigmatizing skilled labor. By promoting vocational education as a respectable and intelligent alternative, we can build a stronger, more practical workforce and offer a debt-free path to the middle class for millions of Americans.</p>",
    },
  },
  {
    topic: 'Should Schools Ban the Use of Smartphones in the Classroom?',
    passage1: {
      title: 'Principal Thompson, Educator (Stronger Argument)',
      content:
        "<p>Smartphones have become the single greatest source of distraction in the modern classroom, and it is time for a clear and consistent ban. These devices fragment student attention and disrupt the learning environment. The primary purpose of a classroom is education, and anything that fundamentally undermines that purpose must be removed.</p><p><span class='good-evidence'>A comprehensive study by the London School of Economics analyzed schools in four English cities and found that after phones were banned, student test scores improved by an average of 6.4%.</span> This effect was even more pronounced for lower-achieving students, suggesting a ban can help close the achievement gap. This data provides clear, empirical evidence that removing phones leads to better academic outcomes.</p><p>A firm ban sends an unambiguous message about our academic priorities and helps students develop the crucial skill of focused, sustained attention, a skill that is eroding in the digital age.</p>",
    },
    passage2: {
      title: 'Dr. Helen Tran, Digital Learning Expert (Weaker Argument)',
      content:
        "<p>Banning smartphones in schools is a Luddite response to a modern reality. Instead of banning these powerful tools, we should be teaching students how to use them responsibly. Smartphones provide instant access to a world of information, acting as research tools and collaborative devices. To deny students access is to cripple them with an outdated model of education.</p><p><span class='bad-evidence'>The people who want to ban phones are just old-fashioned and afraid of technology.</span> This argument ignores the fact that the modern workplace requires digital literacy. Schools have a responsibility to prepare students for the world they will actually live and work in, and that world is saturated with technology.</p><p>The challenge is not the device, but the pedagogy. We need to train teachers to leverage these tools for learning, not run from them. <span class='bad-evidence'>It's just common sense that you can't prepare kids for the future by taking away future tools.</span></p>",
    },
  },
  {
    topic: 'Should Fast-Food Restaurants Be Required to Display Calorie Counts?',
    passage1: {
      title: 'Center for Public Health (Stronger Argument)',
      content:
        "<p>In the fight against the obesity epidemic, information is one of our most powerful weapons. Requiring fast-food chains to prominently display calorie counts on their menus is a common-sense policy that empowers consumers to make healthier choices. It is a simple matter of transparency; people have a right to know what is in the food they are purchasing.</p><p><span class='good-evidence'>A study published in the American Journal of Public Health found that after New York City implemented menu labeling, consumers at fast-food chains purchased, on average, 25 fewer calories per transaction.</span> While this may seem small, these small changes, compounded over time, can lead to significant positive health outcomes for the population.</p><p>This isn't about banning choices; it's about enabling informed ones. Just as the FDA requires nutrition labels on packaged foods, providing clear, accessible information at the point of purchase is a minimal and effective step to help people take better control of their own health.</p>",
    },
    passage2: {
      title: 'Restaurant Industry Association (Weaker Argument)',
      content:
        "<p>Mandatory calorie labeling for fast-food restaurants is a costly and ineffective government overreach. The financial burden of analyzing every menu item and reprinting menu boards is significant, especially for smaller franchise owners. This is a classic case of the government imposing a one-size-fits-all solution that hurts small businesses.</p><p><span class='bad-evidence'>I know plenty of people who see a high calorie count and just order the item anyway, so it clearly doesn't work.</span> People go to fast-food restaurants for convenience and taste, not for a health experience. Consumer behavior is driven by many factors, and a single number on a menu board is unlikely to be the deciding one.</p><p>Ultimately, this policy is based on the flawed assumption that a lack of information is the cause of poor dietary choices. <span class='bad-evidence'>Everyone already knows that a burger and fries isn't a health food.</span> The focus should be on personal responsibility, not on more government regulations.</p>",
    },
  },
  {
    topic: 'Should National Parks Implement a Lottery System to Manage Overcrowding?',
    passage1: {
      title: 'Dr. David Chen, Conservation Biologist (Stronger Argument)',
      content:
        "<p>Our most beloved national parks are being loved to death. The surge in visitor numbers has led to traffic gridlock, trail erosion, and damage to fragile ecosystems. To protect these natural treasures for future generations, we must implement more restrictive access systems, and a lottery is the fairest way to do so.</p><p><span class='good-evidence'>The National Park Service's own data shows that in parks like Zion and Arches, unmanaged visitor numbers have led to significant soil compaction and vegetation loss along popular trails.</span> A lottery system would directly mitigate this environmental damage by controlling the number of people on the trails each day. This is a necessary management tool to fulfill the Park Service's core mission of preservation.</p><p><span class='good-evidence'>Furthermore, a 2021 study on visitor experiences in Yosemite concluded that overcrowding significantly diminishes the quality of the visitor experience, leading to lower satisfaction.</span> A reservation system provides certainty and allows visitors to plan their trips effectively, ensuring a better experience for those who do attend.</p>",
    },
    passage2: {
      title: 'Brenda Walsh, Public Lands Advocate (Weaker Argument)',
      content:
        "<p>National parks were created to be accessible to all Americans, not just the lucky few who win a lottery. Implementing a reservation system fundamentally changes the nature of these public lands from a shared national birthright into an exclusive commodity. It creates a barrier that will disproportionately affect families who cannot plan their vacations months in advance.</p><p><span class='bad-evidence'>My family has always taken spontaneous trips to the parks, and a lottery system would destroy that tradition.</span> This would harm the local gateway communities whose economies depend on a steady flow of tourists, not just a pre-determined, limited number.</p><p><span class='bad-evidence'>Turning our parks into an exclusive club is a betrayal of the very idea of 'America's Best Idea.'</span> We must focus on smart solutions like more shuttle buses, rather than simply locking people out.</p>",
    },
  },
  {
    topic: 'Should Standardized Test Scores Be a Primary Factor in College Admissions?',
    passage1: {
      title: 'Dr. Richard Evans, Admissions Counselor (Stronger Argument)',
      content:
        "<p>Relying heavily on standardized test scores like the SAT and ACT in college admissions is an outdated and inequitable practice. These tests are not a pure measure of merit; they are strongly correlated with a student's family income and access to resources. Students from affluent families can afford expensive test prep courses, giving them an unfair advantage.</p><p><span class='good-evidence'>A landmark study of over 123,000 students at 33 test-optional colleges found that there was virtually no difference in college GPA or graduation rates between students who submitted scores and those who did not.</span> This proves that high school grades are a far better predictor of college success. A student's performance over four years is a much more holistic and accurate measure of their ability and work ethic.</p><p>By moving to a test-optional system, colleges can assess applicants more equitably, considering their academic record, essays, and activities. This allows them to build a more diverse and capable student body, rewarding long-term diligence over the ability to perform well on a single, high-stakes exam.</p>",
    },
    passage2: {
      title: 'Dr. Susan Gerson, Education Measurement Specialist (Weaker Argument)',
      content:
        "<p>While standardized tests are not perfect, they are the most objective and reliable tool we have for comparing students from tens of thousands of different high schools. Grade inflation is rampant, and an 'A' in one school is not equivalent to an 'A' in another. The SAT and ACT provide a common yardstick to measure core academic skills.</p><p><span class='bad-evidence'>Without tests, admissions would just become a subjective guessing game about who wrote the prettiest essay.</span> It would be chaos. These tests can help identify promising students from less well-known high schools whose grades might otherwise be overlooked. To ignore test scores is to ignore a valuable piece of data.</p><p>Rather than eliminating these tests, we should focus on ensuring all students have access to free, high-quality test preparation resources. Fixing the access problem is a better solution than throwing away our only objective measurement tool.</p>",
    },
  },
  {
    topic: 'Is a Remote Work Model More Beneficial Than a Traditional In-Office Model?',
    passage1: {
      title: 'Jennifer Lee, Chief Financial Officer (Stronger Argument)',
      content:
        "<p>The shift to remote work has proven to be a resounding success, offering significant financial and operational benefits. By reducing the need for large, expensive office spaces, companies can drastically cut overhead costs related to rent and utilities. These savings can be reinvested into growth and innovation.</p><p>From a human resources perspective, the benefits are even more compelling. Offering remote work allows a company to recruit from a global talent pool, not just a single city. <span class='good-evidence'>A 2021 survey by Stanford University of 16,000 workers over 9 months found that remote work not only increased employee satisfaction but also boosted productivity by 13%.</span> Happier, more autonomous employees are more productive employees.</p><p>Furthermore, remote work improves employee retention and well-being. <span class='good-evidence'>According to a Gallup poll, a majority of remote-capable employees who are forced to return to the office full-time are actively seeking new employment.</span> A flexible, remote-first model is not just a trend; it is the future of a more efficient and humane way of doing business.</p>",
    },
    passage2: {
      title: 'Robert Chen, Management Consultant (Weaker Argument)',
      content:
        "<p>The alleged benefits of remote work are largely illusory and ignore the long-term damage it does to a company's culture. The office is a hub for spontaneous collaboration and mentorship that simply cannot be replicated over scheduled Zoom calls. The informal 'water cooler' conversations that spark new ideas are lost forever.</p><p><span class='bad-evidence'>It's just common sense that people are going to be less productive at home with all the distractions of laundry and television.</span> While some companies may see short-term gains in routine tasks, the long-term cost in terms of lost innovation and team cohesion will be immense.</p><p>Junior employees, in particular, suffer from a lack of mentorship and observational learning that is critical for their career development. A vibrant, in-person workplace remains the most powerful engine for collaborative success, and we are losing that in favor of a lonely, disconnected workforce.</p>",
    },
  },
  {
    topic: 'Should Homework in High School Be Limited to One Hour per Night?',
    passage1: {
      title: 'National Education Association Brief (Stronger Argument)',
      content:
        "<p>Limiting homework to one hour per night in high school supports learning without sacrificing student well-being. Excessive homework contributes to sleep deprivation, stress, and disengagement, which undermines academic performance. <span class='good-evidence'>A 2013 Stanford study found that students in high-achieving communities who spend more than two hours on homework experience higher stress, physical health problems, and lack of balance in their lives.</span></p><p>Quality matters more than quantity. Structured practice aligned to clear objectives within a one-hour cap encourages focus and allows time for reading, extracurriculars, and family responsibilities. <span class='good-evidence'>Sleep researchers consistently tie adequate sleep to improved memory consolidation and problem-solving, critical for learning.</span> A sensible cap promotes equitable access for students who work part-time or care for siblings after school.</p>",
    },
    passage2: {
      title: 'Traditionalist Teachers Coalition (Weaker Argument)',
      content:
        "<p>Hard work builds character, and limiting homework to one hour risks coddling students. Advanced courses require more time; students should simply manage their schedules better. <span class='bad-evidence'>When I was in school, we had loads of homework and we turned out fine.</span> Limiting homework sends the wrong message about academic rigor.</p><p>Real life doesn't come with time caps. Students must learn to push through fatigue to meet expectations. A universal limit is unnecessary and undermines teacher autonomy.</p>",
    },
  },
  {
    topic: 'Should Public Transit Be Free in Major Cities?',
    passage1: {
      title: 'Urban Institute Transportation Report (Stronger Argument)',
      content:
        "<p>Fare-free transit increases ridership, reduces traffic congestion, and improves air quality while expanding access to jobs and education. <span class='good-evidence'>Kansas City, Missouri, saw ridership increases and improved job access after adopting zero-fare buses, according to city reports.</span> Eliminating fares speeds boarding and simplifies operations.</p><p>Funding can be rebalanced through congestion fees and dedicated sales taxes. <span class='good-evidence'>A 2022 APTA analysis estimates that every dollar invested in transit yields multiple dollars in local economic returns.</span> Free transit is a public good that benefits the entire urban ecosystem.</p>",
    },
    passage2: {
      title: 'Taxpayers for Efficient Spending (Weaker Argument)',
      content:
        "<p>Making transit free sounds nice but invites waste. People will ride for fun, not necessity, crowding buses and trains. <span class='bad-evidence'>If you don't charge, people will just circle the city all day.</span> Fares create accountability, and removing them burdens taxpayers.</p><p>Rather than free rides, cities should focus on enforcing fares and cutting costs. Those who need help can already get discounted passes.</p>",
    },
  },
  {
    topic: 'Should Schools Adopt Year-Round Academic Calendars?',
    passage1: {
      title: 'Education Policy Consortium (Stronger Argument)',
      content:
        "<p>Year-round calendars with shorter, more frequent breaks reduce summer learning loss and allow targeted intersession support. <span class='good-evidence'>Meta-analyses show that low-income students lose significant math and reading skills over long summers; staggered breaks mitigate this regression.</span> Distributed rest periods also lower burnout for students and staff.</p><p>Facilities are used more efficiently, easing overcrowding with multi-track options. Families gain predictable schedules for remediation and enrichment.</p>",
    },
    passage2: {
      title: 'Community Traditions Alliance (Weaker Argument)',
      content:
        "<p>Summer is a cherished American tradition for camps, vacations, and teen jobs. <span class='bad-evidence'>Kids need a long summer to be kids.</span> Year-round school disrupts tourism and family routines and complicates childcare for siblings on different tracks.</p><p>There's no need to change what has worked for decades; schools should improve teaching during the year instead.</p>",
    },
  },
  {
    topic: 'Should Cities Ban Single-Use Plastic Bags?',
    passage1: {
      title: 'Environmental Protection Network (Stronger Argument)',
      content:
        "<p>Plastic bag bans reduce litter, protect waterways and wildlife, and cut municipal cleanup costs. <span class='good-evidence'>California's statewide policy led to substantial declines in plastic bag litter along coastlines, according to the Coastal Commission.</span> Reusable and paper alternatives are viable for most purchases.</p><p>Pairing bans with education and exemptions for sanitation-sensitive items addresses edge cases while shifting consumer behavior toward sustainable habits.</p>",
    },
    passage2: {
      title: 'Retail Freedom Association (Weaker Argument)',
      content:
        "<p>Bans inconvenience shoppers and unfairly penalize small stores. <span class='bad-evidence'>People will just forget their bags and get angry at clerks.</span> Paper bags have environmental costs too, so bans are pointless. Let the market decide; customers who care can bring their own bags.</p>",
    },
  },
  {
    topic: 'Should Public Colleges Be Tuition-Free?',
    passage1: {
      title: 'Center for Higher Education Access (Stronger Argument)',
      content:
        "<p>Tuition-free public college expands opportunity and strengthens the economy by developing human capital. <span class='good-evidence'>Countries with low or no tuition maintain strong completion rates when funding is paired with student support services.</span> Removing tuition reduces debt burdens, allowing graduates to start businesses and buy homes sooner.</p><p>Targeted taxes and income-driven contributions from high earners can sustainably finance the system while preserving quality.</p>",
    },
    passage2: {
      title: 'Fiscal Prudence Council (Weaker Argument)',
      content:
        "<p>Nothing is truly free&mdash;taxpayers foot the bill. <span class='bad-evidence'>If college is free, everyone will enroll and campuses will be chaotic.</span> Subsidizing degrees people may not use wastes money. Aid should remain merit-based and limited, not universal.</p>",
    },
  },
  {
    topic: 'Should Voting Be Compulsory in National Elections?',
    passage1: {
      title: 'Democratic Participation Lab (Stronger Argument)',
      content:
        "<p>Compulsory voting increases turnout, reduces polarization, and ensures elected officials reflect the whole populace. <span class='good-evidence'>Australia's compulsory system yields turnout consistently above 90% and broad partisan moderation.</span> Modest fines or easy opt-outs protect civil liberties while establishing civic duty.</p>",
    },
    passage2: {
      title: 'Liberty First Foundation (Weaker Argument)',
      content:
        "<p>Forcing people to vote violates freedom. <span class='bad-evidence'>Making apathetic people vote just adds random noise.</span> Low-information ballots degrade democracy. Voluntary participation is a cornerstone of liberty, not something to be coerced.</p>",
    },
  },
  {
    topic: 'Should School Cafeterias Adopt Plant-Forward Menus?',
    passage1: {
      title: 'Public Health Nutrition Society (Stronger Argument)',
      content:
        "<p>Plant-forward menus improve student health and reduce the carbon footprint of school meals. <span class='good-evidence'>Dietary guidelines and numerous cohort studies link higher plant intake to reduced chronic disease risk.</span> Properly planned menus meet protein needs and expose students to diverse foods.</p><p>Districts can phase in options and provide culinary training so meals remain appealing and culturally responsive.</p>",
    },
    passage2: {
      title: 'Parents for Traditional Lunches (Weaker Argument)',
      content:
        "<p>Kids won't eat vegetables, so plant-forward menus will just lead to waste. <span class='bad-evidence'>My son only eats chicken nuggets and would starve otherwise.</span> Meat is necessary at every meal; changing menus meddles with family preferences.</p>",
    },
  },
  {
    topic: 'Should Cities Implement Congestion Pricing for Downtown Driving?',
    passage1: {
      title: 'Urban Mobility Council (Stronger Argument)',
      content:
        "<p>Congestion pricing reduces traffic, speeds up buses, and improves air quality while funding transit improvements. <span class='good-evidence'>London and Stockholm saw sustained traffic reductions and travel-time reliability after implementation.</span> Equity issues can be addressed with exemptions and rebates for low-income drivers.</p>",
    },
    passage2: {
      title: "Drivers' Rights Alliance (Weaker Argument)",
      content:
        "<p>Congestion fees are just another tax on working people. <span class='bad-evidence'>It's a money grab by city hall.</span> Drivers already pay registration and gas taxes; pricing zones punish commuters who have no choice but to drive.</p>",
    },
  },
  {
    topic: 'Should Public Schools Enforce Strict Student Dress Codes?',
    passage1: {
      title: 'School Climate Research Network (Stronger Argument)',
      content:
        "<p>Strict dress codes can disproportionately target girls and marginalized students and distract from learning. <span class='good-evidence'>Studies on school climate link punitive dress enforcement to increased suspensions without academic gains.</span> Clear, gender-neutral guidelines focused on safety are preferable to subjective rules.</p>",
    },
    passage2: {
      title: 'Order and Discipline Association (Weaker Argument)',
      content:
        "<p>Uniformity promotes respect. <span class='bad-evidence'>If students look sharp, they'll act right.</span> Strict rules eliminate distractions and teach professionalism, so detailed dress codes should be enforced.</p>",
    },
  },
  {
    topic: 'Should High Schools Require a Financial Literacy Course for Graduation?',
    passage1: {
      title: 'Council on Economic Education (Stronger Argument)',
      content:
        "<p>Requiring a stand-alone financial literacy course equips students with essential life skills in budgeting, credit, and investing. <span class='good-evidence'>States that implemented requirements report improved credit outcomes among young adults and reduced delinquency.</span> A dedicated course prevents the topic from being sidelined in other classes.</p>",
    },
    passage2: {
      title: 'Curriculum Streamlining Committee (Weaker Argument)',
      content:
        "<p>The schedule is already crowded. <span class='bad-evidence'>Students can just learn money skills from their parents.</span> Requiring another course adds bureaucracy; optional workshops are sufficient.</p>",
    },
  },
];

export const ESSAY_PASSAGES = PASSAGES;

const TOPIC_INDEX = PASSAGES.reduce((acc, p) => {
  acc[p.topic] = p;
  return acc;
}, {});

export function getEssayPassagesForTopic(topic) {
  if (!topic) return null;
  return TOPIC_INDEX[topic] || null;
}
