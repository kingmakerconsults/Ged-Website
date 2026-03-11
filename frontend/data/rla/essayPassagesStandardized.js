/**
 * Standardized RLA Essay Practice Passages
 *
 * Each passage pair follows GED standards:
 * - Length: 230-270 words per article
 * - Structure: Paired articles (strong vs weak evidence)
 * - Author: Clean name attribution
 * - Evidence: 2-3 marked pieces per article
 * - Topics: GED-relevant themes
 *
 * Data Structure:
 * {
 *   id: "rla_arg_###",
 *   topic: "Clear question format",
 *   prompt: "Essay prompt instructions",
 *   articles: [
 *     {
 *       label: "Article A",
 *       strength: "strong" | "weak",
 *       title: "Article Title",
 *       author: "First Last",
 *       text: "~250 words with evidence markers"
 *     },
 *     { ...Article B... }
 *   ]
 * }
 */

export const essayPassages = [
  {
    id: 'rla_arg_001',
    topic: 'Should the Voting Age Be Lowered to 16?',
    prompt:
      'After reading both passages about lowering the voting age to 16, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Empowering Young Citizens Through Earlier Voting Rights',
        author: 'Alisa Klein',
        text: `<p><strong>Empowering Young Citizens Through Earlier Voting Rights</strong> — Alisa Klein</p>
      <p>In Takoma Park, Maryland, sixteen-year-olds have been casting ballots in municipal elections since 2013, and the results have challenged long-held assumptions about age and civic readiness. Their turnout has consistently outpaced that of older first-time voters, prompting a growing number of cities to consider similar measures. This track record offers a practical foundation for reconsidering voting-age requirements more broadly.</p>
      <p>Lowering the voting age to 16 strengthens democracy by including citizens who already contribute to society. At 16, many young people work, pay taxes, and follow the same laws as adults. The principle of "no taxation without representation" demands they have a voice in policies affecting education, climate, and economic opportunity.</p>
<p><span class="good-evidence">Research demonstrates that voting becomes habitual when started early. A 2020 Tufts University study found that cities allowing 16-year-olds to vote in local elections saw significantly higher youth turnout in subsequent national elections.</span> When young people vote while still in stable homes and civics classrooms, they develop lasting democratic participation habits.</p>
<p><span class="good-evidence">Political scientist Dr. Mark Franklin notes that earlier first-time voting correlates strongly with lifelong civic engagement.</span> Sixteen-year-olds demonstrate civic competence through community service, school governance, and informed classroom discussions. <span class="good-evidence">Countries like Austria and Scotland report positive experiences with 16-year-old voters showing engagement levels matching or exceeding older first-time voters.</span> This evidence supports lowering the age as a practical step toward stronger democracy.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why 16 Is Too Young for Voting Responsibility',
        author: 'Marcus Wright',
        text: `<p><strong>Why 16 Is Too Young for Voting Responsibility</strong> — Marcus Wright</p>
      <p>Every election cycle, proposals to lower the voting age resurface, yet the legal framework has long treated eighteen as the threshold for adult decision-making. Driver's licenses, contracts, and military enlistment all recognize that milestone, linking it to the judgment that comes with real-world experience. Changing the voting age would break from that established standard without clear justification.</p>
      <p>Lowering the voting age sounds idealistic but ignores developmental realities. The adolescent brain continues maturing into the mid-twenties, particularly in areas governing long-term planning and impulse control. Political decisions require experience and judgment that most 16-year-olds lack.</p>
<p>Voting carries profound responsibility. Extending this right to teenagers risks trivializing democratic participation. <span class="bad-evidence">When I was 16, my friends and I worried more about getting driver's licenses than understanding monetary policy or foreign relations.</span> Teenage priorities naturally focus on immediate concerns rather than complex governance issues. Most sixteen-year-olds have limited exposure to tax policy, healthcare systems, or municipal budgets—the very issues that elected officials manage.</p>
<p>The current age of 18 creates a clear threshold for legal adulthood with its associated rights and responsibilities. <span class="bad-evidence">Everyone knows teenagers make impulsive choices—that's just common sense.</span> Lowering the voting age would also create pressure to lower other legal thresholds, opening questions about contracts, jury duty, and criminal liability. Rather than experimenting with our democratic foundation, we should maintain the proven standard that has served us well for generations.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_002',
    topic: 'Is Universal Basic Income a Viable Solution to Poverty?',
    prompt:
      'After reading both passages about Universal Basic Income, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'weak',
        title: 'Universal Basic Income: A Foundation for Economic Security',
        author: 'Robert Doar',
        text: `<p><strong>Universal Basic Income: A Foundation for Economic Security</strong> — Robert Doar</p>
      <p>Millions of workers face unpredictable schedules, stagnant wages, and the reality that a single medical bill or car repair could push them into debt. Traditional safety-net programs often come with complicated eligibility rules that leave gaps in coverage precisely when people need help most. A single monthly payment to every adult would cut through that complexity and provide a basic measure of economic security.</p>
      <p>Universal Basic Income offers a revolutionary approach to poverty by providing everyone with a guaranteed minimum income. This security allows people to invest in education, search for better jobs, or start businesses without fearing immediate destitution. UBI creates conditions for genuine economic mobility.</p>
<p><span class="bad-evidence">It's obvious that when people aren't worried about next month's rent, they make smarter long-term decisions.</span> This financial cushion would unleash entrepreneurship and creativity currently suppressed by economic anxiety. People could take calculated risks—enrolling in evening classes, launching a small business, or moving to a city with better job prospects—knowing they have a safety net beneath them.</p>
<p>Critics claim UBI would discourage work, but this reflects cynical assumptions about human nature. <span class="bad-evidence">Most people want to work and contribute to society—that's just human psychology.</span> UBI wouldn't replace work but would provide freedom to pursue meaningful employment rather than accepting any available job out of desperation.</p>`,
      },
      {
        label: 'Article B',
        strength: 'strong',
        title: 'Why Universal Basic Income Fails as Poverty Policy',
        author: 'Anna Coote',
        text: `<p><strong>Why Universal Basic Income Fails as Poverty Policy</strong> — Anna Coote</p>
      <p>Supporters of Universal Basic Income frame it as a simple fix for complex problems, but simplicity is not the same as effectiveness. A flat payment to every citizen, regardless of need, spreads limited public funds across the entire population rather than concentrating them where they matter most. Understanding why that trade-off weakens poverty policy requires a closer look at the numbers.</p>
      <p>Universal Basic Income, despite good intentions, represents an inefficient poverty-reduction tool. By distributing funds universally rather than targeting those most in need, UBI dilutes its impact precisely where support matters most. <span class="good-evidence">A 2018 Center on Budget and Policy Priorities analysis found that replacing targeted aid programs with modest UBI would actually increase poverty rates.</span></p>
<p>Existing programs like SNAP and Medicaid address specific hardships—food insecurity, healthcare access—with proven effectiveness. UBI risks dismantling this targeted infrastructure. <span class="good-evidence">Economic research indicates that guaranteed income floors may inadvertently subsidize low-wage employers, reducing pressure to offer competitive salaries and benefits.</span> This could normalize precarious work rather than addressing its root causes.</p>
<p>Rather than expensive universal programs, policymakers should strengthen existing safety nets and promote policies encouraging higher wages and job quality. <span class="good-evidence">Targeted assistance delivers measurably better outcomes per dollar spent, according to comparative welfare policy studies.</span> Expanding programs like the Earned Income Tax Credit, which rewards employment while lifting incomes, accomplishes what UBI promises without the fiscal risk of paying benefits to people who do not need them.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_003',
    topic: 'Should Governments Aggressively Subsidize Renewable Energy?',
    prompt:
      'After reading both passages about renewable energy subsidies, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title:
          'The Economic and Environmental Case for Renewable Energy Subsidies',
        author: 'Elena Rodriguez',
        text: `<p><strong>The Economic and Environmental Case for Renewable Energy Subsidies</strong> — Elena Rodriguez</p>
      <p>Fossil fuels have received federal tax breaks and direct subsidies since the early 1900s, totaling an estimated $5.9 trillion globally in 2020 according to International Monetary Fund calculations. Against that backdrop, directing public investment toward solar and wind power is less a departure from market principles than a correction of longstanding imbalance. The question is not whether government should invest in energy but which energy deserves that investment.</p>
      <p>Government subsidies accelerate the critical transition to renewable energy, delivering both environmental and economic benefits. Solar and wind power produce minimal greenhouse gases, directly combating climate change while improving public health. <span class="good-evidence">The National Renewable Energy Laboratory concluded that achieving 80% renewable electricity by 2050 could reduce economy-wide carbon emissions by 81%.</span></p>
<p>Though initial costs run high, subsidies make renewables competitive with fossil fuels that have received government support for decades. This investment creates jobs in growing sectors while fostering energy independence. <span class="good-evidence">The Bureau of Labor Statistics identifies solar panel installer and wind turbine technician among the nation's fastest-growing occupations.</span></p>
<p>Long-term, renewable support delivers strategic economic advantage through stable, predictable energy costs immune to global oil market volatility. <span class="good-evidence">Germany's renewable investment has created over 300,000 jobs while reducing energy import dependence by 35%, according to the German Renewable Energy Federation.</span> This represents smart policy combining environmental responsibility with economic security.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Renewable Energy Subsidies Burden Taxpayers',
        author: 'David Chen',
        text: `<p><strong>Why Renewable Energy Subsidies Burden Taxpayers</strong> — David Chen</p>
      <p>Government-funded energy projects have a mixed track record, from the Solyndra loan guarantee collapse in 2011 to cost overruns at subsidized biofuel refineries. Taxpayers bore those losses while the technologies failed to deliver on their promise. Before committing additional billions to renewables, policymakers should weigh whether the pattern of overpromising and underdelivering is likely to repeat.</p>
      <p>While renewable energy sounds appealing, aggressive government subsidies create serious problems. Solar panels and wind turbines carry high upfront costs that taxpayers ultimately fund, creating massive financial burdens. These technologies work only in locations with consistent sun or wind, limiting their practical application.</p>
<p>Renewable energy production remains intermittent, requiring expensive battery storage technology that hasn't matured sufficiently. <span class="bad-evidence">Imagine families losing power on calm, cloudy days—that's the reliability problem we're talking about.</span> Without fossil fuel backup, renewables can't power modern economies, defeating their entire purpose.</p>
<p><span class="bad-evidence">Common sense says we shouldn't let government bureaucrats pick energy winners and losers with our tax dollars.</span> Market-driven approaches would allow the most efficient technologies to emerge naturally through innovation and competition, not political favoritism. Private companies have every incentive to develop affordable clean energy when they can profit from it, and they do so without saddling taxpayers with the risk of failed ventures. The more government spends on subsidies, the less capital remains for infrastructure, schools, and other public priorities.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_004',
    topic: 'Does Social Media Do More Harm Than Good for Teen Mental Health?',
    prompt:
      "After reading both passages about social media's impact on teen mental health, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.",
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'The Mental Health Risks of Social Media for Adolescents',
        author: 'Vivek Murthy',
        text: `<p><strong>The Mental Health Risks of Social Media for Adolescents</strong> — Vivek Murthy</p>
      <p>Emergency room visits for self-harm among adolescent girls rose sharply between 2010 and 2020, a period that also saw smartphone ownership among teens climb past ninety percent. Correlation alone does not prove a direct link, yet the volume of clinical evidence connecting heavy social media use to anxiety and depression has grown large enough to warrant serious public health attention.</p>
      <p>Social media platforms pose significant risks to adolescent mental health and wellbeing. These platforms are designed to maximize engagement, often disrupting sleep patterns and exposing young users to harmful content during critical developmental periods. <span class="good-evidence">A 2022 Journal of the American Medical Association study found that teens spending over three hours daily on social media face double the risk of depression and anxiety symptoms.</span></p>
<p>Adolescent brains remain highly susceptible to social comparison and peer pressure. Social media creates distorted realities where teens constantly compare their lives to curated, idealized posts. <span class="good-evidence">The American Psychological Association directly links this comparison behavior to lower self-esteem and poor body image, particularly affecting adolescent girls.</span></p>
<p>Platform algorithms deliberately amplify engaging content, regardless of its psychological impact. <span class="good-evidence">Internal Meta research, revealed in whistleblower documents, showed Instagram worsened body image issues for one in three teen girls.</span> Parents and educators need greater awareness of these documented dangers to protect young users' developing minds from platform-driven harm.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: "Social Media's Positive Role in Teen Connection",
        author: 'Jennifer Park',
        text: `<p><strong>Social Media's Positive Role in Teen Connection</strong> — Jennifer Park</p>
      <p>Discussions about social media and teens often focus narrowly on risk while ignoring how these platforms function in young people's everyday lives. For many students, group chats, fan communities, and creative forums provide genuine friendship and emotional support. Acknowledging those benefits is essential, especially when broad policy proposals could cut teens off from connections they depend on.</p>
      <p>While social media carries risks, it provides essential benefits for teenagers. Many teens report that platforms help them feel more accepted and connected to friends. These online connections prove especially crucial for marginalized youth, including LGBTQ teens who may find supportive communities unavailable in their immediate physical environments.</p>
<p><span class="bad-evidence">My own daughter struggled making friends locally, but online she found wonderful people sharing her passion for art. It completely transformed her confidence and happiness.</span> This demonstrates how vital these digital connections can become for young people seeking acceptance and community. For students in rural areas or small towns, online friendships may be the primary way they connect with peers who share niche interests or identities.</p>
<p>Social media platforms foster belonging and enable creative self-expression through various media formats. They also provide teens access to mental health information and resources, potentially promoting help-seeking behaviors. <span class="bad-evidence">It's obvious that focusing only on negatives ignores the powerful support role social media plays for countless teenagers.</span> Balance matters more than blanket condemnation.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_005',
    topic: 'Is a Four-Year College Degree the Best Path to Career Success?',
    prompt:
      'After reading both passages about college degrees versus vocational training, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Vocational Training: A Practical Path to the Middle Class',
        author: 'Marco Diaz',
        text: `<p><strong>Vocational Training: A Practical Path to the Middle Class</strong> — Marco Diaz</p>
      <p>A licensed electrician in Phoenix can earn over sixty thousand dollars a year with zero student debt, while the average four-year graduate begins a career owing more than thirty thousand. That gap shapes financial stability for decades, yet high school guidance offices still steer most students toward bachelor's programs. A closer look at earnings, debt loads, and job demand reveals a practical alternative that deserves equal respect.</p>
      <p>The "college-for-all" mentality has left millions of young Americans burdened with crippling student debt while viable alternatives exist. Vocational training offers a direct, affordable path to stable careers with strong earning potential. <span class="good-evidence">Bureau of Labor Statistics data shows many skilled trades—electricians, plumbers, HVAC technicians—offer median salaries comparable to or exceeding those of many bachelor's degree holders, without massive upfront costs.</span></p>
<p>Vocational programs provide immediately applicable hands-on skills. Many students enter paid apprenticeships, earning while learning. This model avoids four-year degree debt while allowing young adults to build financial independence years earlier. <span class="good-evidence">The National Center for Education Statistics reports average bachelor's degree student loan debt exceeds $30,000, while vocational graduates typically carry minimal or zero educational debt.</span></p>
<p>Society must stop stigmatizing skilled labor. <span class="good-evidence">The U.S. faces critical skilled trades shortages, with over 600,000 unfilled positions, according to the Associated General Contractors of America.</span> Promoting vocational education as a respectable alternative builds stronger workforces while offering debt-free middle-class pathways.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Four-Year Degrees Remain Essential',
        author: 'Anya Sharma',
        text: `<p><strong>Why Four-Year Degrees Remain Essential</strong> — Anya Sharma</p>
      <p>For over a century, the bachelor's degree has served as a gateway to professional careers in law, medicine, engineering, and management. Employers routinely list it as a minimum qualification, and earnings data consistently show a premium for degree holders over their working lives. Questioning the value of that credential risks steering students away from proven paths to upward mobility.</p>
      <p>A four-year college degree remains the most reliable pathway to long-term career success and economic mobility. While vocational training serves certain purposes, bachelor's degrees provide something far more valuable—foundations in critical thinking, complex problem-solving, and communication. These aren't merely job skills but life skills enabling graduates to adapt to rapidly changing economies.</p>
<p>Statistically, college graduates consistently earn significantly more over their lifetimes than those without degrees. <span class="bad-evidence">Everyone knows successful people who earned college degrees—it's the proven pathway.</span> This “degree premium” isn't just about initial employment but the upward trajectory broad-based education enables throughout entire careers. Employers increasingly seek candidates who can write clearly, analyze data, and communicate across disciplines—skills developed through liberal arts coursework, not narrow technical training.</p>
<p>The college experience itself fosters personal growth and exposure to diverse perspectives. <span class="bad-evidence">Obviously, narrow job-specific training programs can't compare to real higher education's fundamental purpose.</span> Universities create informed, adaptable citizens—not just workers—preparing graduates for leadership roles in complex modern societies.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_006',
    topic: 'Should Schools Ban Smartphones in the Classroom?',
    prompt:
      'After reading both passages about smartphone bans in schools, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Why Classroom Smartphone Bans Improve Student Achievement',
        author: 'Sarah Thompson',
        text: `<p><strong>Why Classroom Smartphone Bans Improve Student Achievement</strong> — Sarah Thompson</p>
      <p>When a phone buzzes during a lesson, it does not just distract the student who owns it—nearby classmates glance over, too. Teachers report losing several minutes of instructional time per interruption, and notifications arrive dozens of times per day. Schools that have moved from case-by-case policies to firm bans are discovering measurable gains in student focus and test performance.</p>
      <p>Smartphones have become the primary source of classroom distraction, undermining the fundamental purpose of education. These devices fragment student attention and disrupt learning environments. Clear, consistent bans are necessary to restore academic focus and improve educational outcomes for all students.</p>
<p><span class="good-evidence">A London School of Economics study analyzing schools across four English cities found that phone bans improved average test scores by 6.4%, with even larger gains for lower-achieving students.</span> This empirical evidence demonstrates that removing phones directly enhances academic performance while potentially narrowing achievement gaps.</p>
<p>Beyond test scores, smartphone bans help students develop sustained attention skills that are eroding in the digital age. <span class="good-evidence">Research from the University of Texas found that even having smartphones present—not in use—reduces available cognitive capacity for learning tasks.</span> Firm bans send clear messages about academic priorities. <span class="good-evidence">Schools implementing comprehensive bans report improved classroom engagement and reduced behavioral disruptions, according to a 2023 Common Sense Media survey.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Teaching Responsible Technology Use Instead of Bans',
        author: 'Helen Tran',
        text: `<p><strong>Teaching Responsible Technology Use Instead of Bans</strong> — Helen Tran</p>
      <p>Students will use smartphones for the rest of their professional lives, yet some schools respond to distraction problems by removing the devices entirely. That approach teaches avoidance rather than self-regulation. Educators who integrate phones into research assignments and collaborative projects see an opportunity that outright bans discard.</p>
      <p>Banning smartphones represents a backward response to modern reality. Rather than prohibiting these powerful tools, schools should teach students responsible usage. Smartphones provide instant information access, functioning as research tools and collaborative devices. Denying students access cripples them with outdated educational models.</p>
<p><span class="bad-evidence">The people pushing these bans are just old-fashioned and afraid of technology they don't understand.</span> This argument ignores that modern workplaces require digital literacy. Schools have responsibilities to prepare students for actual future work environments saturated with technology, not imaginary tech-free worlds.</p>
<p>The challenge isn't the device but teaching methodology. Teachers need training to leverage smartphones for learning, not avoid them. Students already use phones to look up vocabulary words, photograph whiteboard notes, and collaborate on group projects through shared documents. <span class="bad-evidence">It's just common sense—you can't prepare kids for the future by confiscating future tools.</span> Smart integration beats fearful prohibition, and students who learn to self-regulate screen time in a structured classroom carry that discipline into their adult lives.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_007',
    topic: 'Should Fast-Food Restaurants Display Calorie Counts?',
    prompt:
      'After reading both passages about calorie labeling requirements, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Calorie Transparency Empowers Healthier Choices',
        author: 'Rachel Chen',
        text: `<p><strong>Calorie Transparency Empowers Healthier Choices</strong> — Rachel Chen</p>
      <p>A single fast-food combo meal can exceed half an adult's recommended daily calorie intake, yet most customers order without knowing that figure. Menu labeling laws address this gap by placing calorie information where purchasing decisions happen. The policy follows the same transparency principle behind nutrition facts panels on packaged foods, which have been standard since 1994.</p>
      <p>Requiring fast-food chains to display calorie counts represents a commonsense public health policy that empowers consumers to make informed choices. In addressing the obesity epidemic, transparent nutritional information serves as a powerful tool. People have fundamental rights to know what's in food they're purchasing.</p>
<p><span class="good-evidence">Research published in the American Journal of Public Health found that after New York City implemented menu labeling, consumers at fast-food chains purchased an average of 25 fewer calories per transaction.</span> While this may seem modest, these small changes compound over time, producing significant population-level health improvements.</p>
<p>This policy doesn't ban choices—it enables informed ones. <span class="good-evidence">Just as FDA regulations require nutrition labels on packaged foods, point-of-purchase information follows the same transparency principle.</span> Multiple cities and states implementing calorie labeling report no significant cost burdens on restaurants. <span class="good-evidence">A 2017 FDA impact analysis found restaurant compliance costs averaged less than $4,700 per location for initial implementation—minimal compared to public health benefits.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Calorie Mandates Burden Businesses Without Results',
        author: 'Tom Bradley',
        text: `<p><strong>Calorie Mandates Burden Businesses Without Results</strong> — Tom Bradley</p>
      <p>Restaurant owners already navigate health inspections, food-safety certifications, and local permit requirements. Adding mandated calorie analysis for every menu item layers another compliance burden on businesses operating with thin profit margins. The cost falls especially hard on smaller franchise operators who adjust recipes and run limited-time specials frequently.</p>
      <p>Mandatory calorie labeling for fast-food restaurants represents costly, ineffective government overreach. The financial burden of analyzing every menu item and reprinting menu boards weighs especially heavily on smaller franchise owners. This exemplifies government imposing one-size-fits-all solutions that hurt small businesses.</p>
<p><span class="bad-evidence">I personally know plenty of people who see high calorie counts and order the items anyway, proving it doesn't actually work.</span> People patronize fast-food restaurants for convenience and taste, not health improvement. Consumer behavior stems from many factors—income, time constraints, family preferences—and single numbers on menu boards rarely prove decisive. Customers who do care about nutrition already have access to information through apps and company websites, making government mandates redundant for health-conscious individuals.</p>
<p>This policy assumes information lack causes poor dietary choices, but factors like food availability, income, and time constraints matter far more. <span class="bad-evidence">Everyone already knows burgers and fries aren't health foods—that's obvious.</span> The focus should emphasize personal responsibility and education rather than government regulations that burden businesses while failing to meaningfully change eating habits at the population level.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_008',
    topic: 'Should National Parks Use Lottery Systems to Manage Overcrowding?',
    prompt:
      'After reading both passages about national park lottery systems, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Protecting National Parks Through Managed Access',
        author: 'David Chen',
        text: `<p><strong>Protecting National Parks Through Managed Access</strong> — David Chen</p>
      <p>Arches National Park in Utah recorded over 1.8 million visitors in a recent peak year, more than triple its levels from two decades earlier. Popular trailheads now see bumper-to-bumper traffic and hour-long waits before sunrise. Managing access through timed-entry permits or reservation lotteries has moved from a theoretical idea to an operational necessity at the most-visited parks.</p>
      <p>America's most beloved national parks face an existential threat—being "loved to death." Surging visitor numbers cause traffic gridlock, trail erosion, and ecosystem damage. To protect these natural treasures for future generations, more restrictive access systems are necessary, with lotteries providing the fairest implementation method.</p>
<p><span class="good-evidence">National Park Service data shows that in parks like Zion and Arches, unmanaged visitor numbers have caused significant soil compaction and vegetation loss along popular trails.</span> Lottery systems directly mitigate environmental damage by controlling daily visitor numbers. This represents necessary management fulfilling the Park Service's dual mandate: preserving natural resources while providing public access in a way that keeps those resources intact for future visitors.</p>
<p><span class="good-evidence">A 2021 Yosemite study concluded that overcrowding significantly diminishes visitor experience quality, leading to lower satisfaction scores.</span> Reservation systems provide certainty, allowing effective trip planning while ensuring better experiences for those who attend. <span class="good-evidence">Pilot programs at Arches National Park showed that timed entry reduced wait times by 90% while improving visitor satisfaction by 35%.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'National Parks Belong to All Americans, Not Lottery Winners',
        author: 'Brenda Walsh',
        text: `<p><strong>National Parks Belong to All Americans, Not Lottery Winners</strong> — Brenda Walsh</p>
      <p>National parks were set aside by Congress for the benefit and enjoyment of all Americans, not for those lucky enough to win a permit lottery months in advance. Reservation systems favor travelers with flexible schedules and reliable internet access, disadvantaging working families who plan trips on shorter notice. The growing reliance on digital booking transforms a public birthright into a managed commodity.</p>
      <p>National parks were created for all Americans' access, not just lucky lottery winners. Implementing reservation systems fundamentally transforms public lands from shared national birthright into exclusive commodity. It creates barriers disproportionately affecting families unable to plan vacations months in advance.</p>
<p><span class="bad-evidence">My family has always taken spontaneous park trips, and lottery systems would destroy that cherished tradition entirely.</span> This would devastate local gateway communities whose economies depend on steady tourist flows, not predetermined, limited visitor numbers. Hotels, restaurants, and outfitters near park entrances rely on walk-in visitors who decide to explore on short notice, and a lottery system cuts off that spontaneous demand.</p>
<p>Turning parks into exclusive clubs betrays the very idea of "America's Best Idea." <span class="bad-evidence">Anyone with common sense can see that locking people out isn't the answer.</span> We must focus on smart solutions like expanded shuttle services and infrastructure improvements rather than simply excluding Americans from their own natural heritage through artificial scarcity.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_009',
    topic:
      'Should Standardized Tests Be Primary Factors in College Admissions?',
    prompt:
      'After reading both passages about standardized testing in admissions, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Moving Beyond Standardized Tests Toward Equitable Admissions',
        author: 'Richard Evans',
        text: `<p><strong>Moving Beyond Standardized Tests Toward Equitable Admissions</strong> — Richard Evans</p>
      <p>When the pandemic forced hundreds of colleges to drop SAT and ACT requirements, many discovered that incoming classes performed just as well academically—and were more diverse. That natural experiment, involving millions of applicants, challenged the assumption that standardized scores are essential gatekeepers. The data now available raises a pointed question: should test-optional policies become permanent?</p>
      <p>Heavy reliance on standardized test scores like the SAT and ACT in college admissions perpetuates inequitable practices. These tests don't measure pure merit—they correlate strongly with family income and resource access. Students from affluent families afford expensive test preparation courses, creating unfair advantages.</p>
<p><span class="good-evidence">A landmark study of over 123,000 students at 33 test-optional colleges found virtually no difference in college GPA or graduation rates between students who submitted scores and those who didn't.</span> This proves high school grades better predict college success. Four-year academic performance provides more holistic, accurate measures of student ability and work ethic than single high-stakes exams.</p>
<p>Test-optional systems allow colleges to assess applicants more equitably, considering academic records, essays, and activities. <span class="good-evidence">Research from the National Association for College Admission Counseling shows test-optional policies increase applications from underrepresented minority students by an average of 10%.</span> This builds more diverse, capable student bodies while rewarding long-term diligence over test-taking ability.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Standardized Tests Remain Essential Admission Tools',
        author: 'Susan Gerson',
        text: `<p><strong>Why Standardized Tests Remain Essential Admission Tools</strong> — Susan Gerson</p>
      <p>High schools across the country grade on wildly different scales: an A at one school may reflect less rigorous coursework than a B at another. Admissions officers reviewing thousands of transcripts from unfamiliar districts need a common benchmark to make fair comparisons. Standardized tests, for all their imperfections, serve that leveling function.</p>
      <p>While standardized tests aren't perfect, they remain our most objective, reliable tool for comparing students from tens of thousands of different high schools. Grade inflation runs rampant—an 'A' in one school doesn't equal an 'A' in another. SAT and ACT tests provide common yardsticks measuring core academic skills.</p>
<p><span class="bad-evidence">Without tests, admissions would just become subjective guessing games about who wrote the prettiest essay—complete chaos.</span> These tests can identify promising students from less-known high schools whose grades might otherwise be overlooked. A strong SAT score from a rural school instantly signals academic ability to colleges that may never have heard of that district. Ignoring test scores means ignoring valuable data points that help talented students from underrepresented schools rise to the surface.</p>
<p>Rather than eliminating tests, we should ensure all students access free, high-quality test preparation resources. Expanding tutoring programs and practice materials addresses equity concerns without discarding the measurement itself. <span class="bad-evidence">Fixing access problems makes more sense than throwing away our only objective measurement tool—that's just logical.</span> Standardized testing has served admissions for decades, and removing it creates more problems than it solves.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_010',
    topic: 'Is Remote Work More Beneficial Than Traditional Office Work?',
    prompt:
      'After reading both passages about remote versus in-office work models, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'The Proven Benefits of Remote Work Models',
        author: 'Jennifer Lee',
        text: `<p><strong>The Proven Benefits of Remote Work Models</strong> — Jennifer Lee</p>
      <p>Before 2020, fewer than six percent of American workers performed their jobs entirely from home. Within weeks of the first pandemic lockdowns, that figure surged past thirty-five percent, and many companies reported no drop in output. Three years later, the data is substantial enough to evaluate remote work on its merits rather than as an emergency measure.</p>
      <p>The shift to remote work has proven remarkably successful, offering significant financial and operational benefits to both companies and employees. By reducing needs for large, expensive office spaces, companies drastically cut overhead costs related to rent, utilities, and facilities. These savings can be reinvested into growth and innovation.</p>
<p>From human resources perspectives, benefits prove even more compelling. Offering remote work allows companies to recruit from global talent pools, not just single cities. <span class="good-evidence">A Stanford University survey of 16,000 workers over nine months found that remote work increased employee satisfaction while boosting productivity by 13%.</span> Happier, more autonomous employees consistently demonstrate higher productivity.</p>
<p>Remote work improves employee retention and wellbeing significantly. <span class="good-evidence">A Gallup poll found that a majority of remote-capable employees forced to return to full-time office work are actively seeking new employment.</span> Flexible, remote-first models aren't temporary trends—they represent the future of more efficient, humane business practices. <span class="good-evidence">Companies offering permanent remote options report 25% lower turnover rates, according to 2023 FlexJobs research.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why In-Office Work Remains Essential for Success',
        author: 'Robert Chen',
        text: `<p><strong>Why In-Office Work Remains Essential for Success</strong> — Robert Chen</p>
      <p>Productivity dashboards may show tasks completed on schedule, but they cannot measure the ideas that never formed because colleagues were not in the same room. Innovation often starts with unplanned conversations in hallways, near whiteboards, or over lunch—interactions that video calls cannot replicate. The less visible costs of remote work are becoming harder to ignore as companies assess long-term performance.</p>
      <p>Alleged remote work benefits are largely illusory and ignore long-term damage to company culture. Offices serve as hubs for spontaneous collaboration and mentorship that cannot be replicated over scheduled video calls. The informal "water cooler" conversations sparking new ideas are lost forever in remote arrangements.</p>
<p><span class="bad-evidence">It's just common sense that people will be less productive at home with all the distractions of laundry, television, and personal errands.</span> While some companies may see short-term gains in routine tasks, long-term costs in lost innovation and team cohesion will prove immense and irreversible. Managers also lose the ability to observe work habits, provide immediate feedback, and address performance concerns before they become serious problems.</p>
<p>Junior employees particularly suffer from lack of mentorship and observational learning critical for career development. <span class="bad-evidence">Everyone knows that real learning happens in person, not through computer screens.</span> Vibrant, in-person workplaces remain the most powerful engines for collaborative success, and we're losing that for lonely, disconnected workforces.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_011',
    topic: 'Should High School Homework Be Limited to One Hour Per Night?',
    prompt:
      'After reading both passages about homework limits, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title:
          'Supporting Student Wellbeing Through Reasonable Homework Limits',
        author: 'Patricia Morrison',
        text: `<p><strong>Supporting Student Wellbeing Through Reasonable Homework Limits</strong> — Patricia Morrison</p>
      <p>A typical high school student juggles six or seven classes, each assigning independent work, and the nightly total can exceed three hours. Add part-time jobs, athletics, and family responsibilities, and sleep often becomes the first casualty. Research on learning and memory suggests that diminishing returns set in well before the workload many students currently face.</p>
      <p>Limiting homework to one hour per night in high schools supports learning without sacrificing student wellbeing. Excessive homework contributes to sleep deprivation, chronic stress, and disengagement—all of which ultimately undermine academic performance rather than enhance it.</p>
<p><span class="good-evidence">A 2013 Stanford study of students in high-achieving communities found that those spending over two hours on homework experienced higher stress levels, physical health problems, and lack of life balance.</span> Quality matters far more than quantity. Structured practice aligned with clear objectives within a one-hour cap encourages focus while allowing time for reading, extracurriculars, and family responsibilities.</p>
<p><span class="good-evidence">Sleep researchers consistently tie adequate sleep to improved memory consolidation and problem-solving abilities—both critical for learning.</span> Sensible homework caps promote equitable access for students who work part-time or care for siblings after school. <span class="good-evidence">The National Education Association recommends the “10-minute rule”—approximately 10 minutes per grade level per night—which for high schoolers suggests 1-1.5 hours maximum.</span> Aligning policy with this guideline protects student health without eliminating homework entirely.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Homework Limits Undermine Academic Rigor',
        author: 'William Henderson',
        text: `<p><strong>Why Homework Limits Undermine Academic Rigor</strong> — William Henderson</p>
      <p>Advanced Placement courses, honors-level science labs, and competitive college applications all demand serious time outside the classroom. Capping homework at sixty minutes forces teachers of rigorous courses to cut material or lower expectations. Students pursuing demanding academic paths need the flexibility to invest more time, not less.</p>
      <p>Hard work builds character, and limiting homework to one hour risks coddling students. Advanced courses require more time for mastery—students should simply learn better schedule management. Time caps send wrong messages about academic rigor and dedication required for success.</p>
<p><span class="bad-evidence">When I was in school, we had loads of homework and we all turned out fine—kids today just need to work harder.</span> Limiting homework tells students they don't need to push through challenges or develop perseverance. Colleges assign heavy reading loads and expect independent study without time restrictions, and students who never learned to manage a demanding workload in high school arrive unprepared for that reality.</p>
<p>Students must learn to handle pressure and meet high expectations without artificial accommodations. <span class="bad-evidence">Universal limits are unnecessary—good students can handle more work, and they shouldn't be held back by arbitrary rules.</span> Teacher autonomy matters more than one-size-fits-all restrictions that lower standards for everyone. Educators understand their subjects and know how much practice students need for mastery; micromanaging assignment length undermines their professional judgment.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_012',
    topic: 'Should Public Transit Be Free in Major Cities?',
    prompt:
      'After reading both passages about fare-free public transit, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'The Case for Fare-Free Public Transportation',
        author: 'Marcus Williams',
        text: `<p><strong>The Case for Fare-Free Public Transportation</strong> — Marcus Williams</p>
      <p>Collecting fares costs money. Fare machines, card readers, enforcement officers, and back-office processing consume a significant share of many transit agencies' operating budgets. When a city eliminates fares, it removes that overhead while also removing the financial barrier that keeps some residents from reaching jobs, medical appointments, and schools.</p>
      <p>Fare-free transit increases ridership, reduces traffic congestion, and improves air quality while dramatically expanding access to jobs and education for lower-income residents. Eliminating fares speeds boarding, simplifies operations, and reduces fare enforcement costs—streamlining the entire transit system.</p>
<p><span class="good-evidence">Kansas City, Missouri saw significant ridership increases and improved job access after adopting zero-fare buses, according to city transportation reports.</span> Funding can be rebalanced through congestion fees, dedicated sales taxes, and reallocation of parking-related revenues. Free transit functions as a public good benefiting the entire urban ecosystem, similar to roads, sidewalks, or public libraries that charge no admission fee.</p>
<p><span class="good-evidence">A 2022 American Public Transportation Association analysis estimates that every dollar invested in public transit yields approximately four dollars in local economic returns.</span> Free systems reduce barriers for vulnerable populations while encouraging car owners to shift to sustainable transportation. <span class="good-evidence">Tallinn, Estonia's fare-free system increased ridership by 14% while reducing traffic by 15%, according to city mobility data.</span> These results demonstrate that eliminating fares produces concrete, measurable benefits for cities willing to invest.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Free Transit Invites Waste and Abuse',
        author: 'Gregory Paulson',
        text: `<p><strong>Why Free Transit Invites Waste and Abuse</strong> — Gregory Paulson</p>
      <p>Public transit systems across the country already operate at steep deficits, with fares covering only a fraction of operating costs in most cities. Eliminating even that revenue stream means the gap must be filled entirely by taxpayers, many of whom never ride the system. The question is whether the promised ridership gains justify shifting the full financial burden to the public.</p>
      <p>Making transit free sounds nice but invites waste and inappropriate usage. People will ride for entertainment rather than necessity, crowding buses and trains with non-commuters. Free services remove accountability—when people don't pay, they don't value what they're using.</p>
<p><span class="bad-evidence">If you don't charge fares, people will just circle the city all day taking joy rides and treating buses like homeless shelters.</span> This burdens taxpayers who must cover costs that riders should bear. Fares create accountability and ensure those benefiting most contribute to system costs. Without that revenue, agencies must either raise taxes or cut service frequency, leaving regular commuters with longer wait times.</p>
<p>Rather than eliminating fares, cities should enforce existing fare policies more strictly and cut operational waste. <span class="bad-evidence">Those who genuinely need help can already get discounted passes—most riders can afford to pay something.</span> Free programs sound compassionate but historically prove unsustainable. When budgets tighten, the first cuts fall on service quality—fewer buses, deferred maintenance, and reduced late-night routes—leaving riders worse off than before.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_013',
    topic: 'Should Schools Adopt Year-Round Academic Calendars?',
    prompt:
      'After reading both passages about year-round school calendars, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'How Year-Round Calendars Support Student Achievement',
        author: 'Michael Torres',
        text: `<p><strong>How Year-Round Calendars Support Student Achievement</strong> — Michael Torres</p>
      <p>The traditional school calendar dates to an era when children were needed for summer farmwork—a rationale that has long since disappeared. Today a ten-week summer break produces a well-documented pattern of skill loss, particularly in math and reading, that teachers spend the first weeks of fall reversing. Year-round calendars address this problem by distributing breaks more evenly across the year.</p>
      <p>Year-round calendars with shorter, more frequent breaks reduce summer learning loss while allowing targeted intersession support for struggling students. This balanced approach maintains educational momentum throughout the year, preventing the significant regression that occurs during traditional long summer breaks.</p>
<p><span class="good-evidence">Meta-analyses show that low-income students lose significant math and reading skills over long summers, with some losing two to three months of academic progress.</span> Staggered breaks mitigate this regression while providing regular rest periods that lower burnout for both students and staff. Distributed breaks also allow for timely intervention and enrichment programs.</p>
<p>Facilities are used more efficiently, potentially easing overcrowding through multi-track options. <span class="good-evidence">Schools using year-round calendars report 20-30% increases in building capacity through staggered scheduling, according to the National Association for Year-Round Education.</span> Families gain predictable schedules for both remediation and enrichment. <span class="good-evidence">Research from North Carolina's year-round schools shows improved test scores, particularly for disadvantaged students.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Preserving the Traditional Summer Break',
        author: 'Linda Harrison',
        text: `<p><strong>Preserving the Traditional Summer Break</strong> — Linda Harrison</p>
      <p>Summer camps, family road trips, and teenage jobs at pools and parks are woven into the fabric of American childhood. Restructuring the school calendar disrupts those activities along with the industries, childcare arrangements, and community programs built around a summer break that families count on. The costs of that disruption deserve as much scrutiny as the academic benefits proponents promise.</p>
      <p>Summer represents a cherished American tradition providing time for camps, family vacations, and teen summer jobs. Year-round school disrupts these valuable experiences, tourism industries, and family routines that have worked successfully for generations. If traditional calendars aren't broken, why fix them?</p>
<p><span class="bad-evidence">Kids need long summers to just be kids—everyone knows that childhood summers create the best memories.</span> Year-round schedules complicate childcare for families with siblings on different tracks. Parents would face constant scheduling chaos trying to coordinate multiple children's varied break periods. Daycare providers, summer camps, and youth sports leagues would need to overhaul programming to accommodate rolling schedules rather than one consistent break.</p>
<p>There's no compelling need to change what has worked for decades. <span class="bad-evidence">Common sense says schools should improve teaching quality during the regular year instead of forcing everyone onto confusing new calendars.</span> Traditional summers provide essential downtime that refreshes students and teachers, preparing everyone for successful new school years.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_014',
    topic: 'Should Cities Ban Single-Use Plastic Bags?',
    prompt:
      'After reading both passages about plastic bag bans, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Environmental Benefits of Plastic Bag Bans',
        author: 'Christina Lopez',
        text: `<p><strong>Environmental Benefits of Plastic Bag Bans</strong> — Christina Lopez</p>
      <p>An estimated 100 billion single-use plastic bags are discarded in the United States each year, and fewer than five percent are recycled. The rest end up in landfills, waterways, and public spaces, where they persist for centuries and break into microplastics. Cities that have banned these bags offer measurable evidence of what happens when the default shifts to reusable alternatives.</p>
      <p>Plastic bag bans reduce litter, protect waterways and wildlife, and cut municipal cleanup costs while shifting consumer behavior toward sustainable habits. These lightweight bags create disproportionate environmental damage—clogging storm drains, entangling wildlife, and persisting in ecosystems for hundreds of years.</p>
<p><span class="good-evidence">California's statewide plastic bag ban led to substantial declines in plastic bag litter along coastlines, according to California Coastal Commission data.</span> Reusable and paper alternatives prove viable for most purchases. Cities implementing bans report significant reductions in plastic waste entering recycling streams where bags jam sorting equipment, costing facilities thousands in repairs and downtime.</p>
<p>Pairing bans with education and exemptions for sanitation-sensitive items addresses edge cases effectively. <span class="good-evidence">San Jose's bag ban reduced plastic bag litter in storm drains by 89% within two years, according to city environmental reports.</span> Consumer adaptation occurs quickly. <span class="good-evidence">Studies show that after brief adjustment periods, most shoppers successfully transition to reusable bags, with compliance rates exceeding 85%.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Plastic Bag Bans Burden Consumers',
        author: 'Daniel Foster',
        text: `<p><strong>Why Plastic Bag Bans Burden Consumers</strong> — Daniel Foster</p>
      <p>Reusable bags must be used dozens of times to offset their higher production footprint, and cotton totes require even more uses than that. Paper bags, the most common substitute, demand more energy and water to manufacture and are heavier to transport. The environmental math behind bag bans is less straightforward than supporters suggest.</p>
      <p>Plastic bag bans inconvenience shoppers and unfairly penalize small stores trying to serve customers efficiently. Paper bags have their own environmental costs—they require more energy to produce and transport. Bans represent feel-good policies that don't address real environmental priorities.</p>
<p><span class="bad-evidence">People will just forget their reusable bags and get angry at store clerks—I've seen it happen constantly.</span> This creates unnecessary friction between businesses and customers, particularly at smaller neighborhood stores where checkout speed matters. Shoppers making quick stops on the way home from work rarely carry reusable bags, and forcing them to purchase new ones each time defeats the environmental purpose while adding costs.</p>
<p>Bans are also ineffective because many consumers simply request multiple paper bags instead, potentially creating worse environmental impacts per trip. Small merchants face restocking costs and customer complaints that larger chains absorb more easily. <span class="bad-evidence">Anyone with common sense knows the real problem is large-scale industrial waste and overseas dumping, not grocery bags.</span> We need practical solutions focused on actual pollution sources, not symbolic gestures that burden small businesses and working families.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_015',
    topic: 'Should Public Colleges Be Tuition-Free?',
    prompt:
      'After reading both passages about tuition-free public college, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Tuition-Free College as Economic Investment',
        author: 'Elizabeth Warren',
        text: `<p><strong>Tuition-Free College as Economic Investment</strong> — Elizabeth Warren</p>
      <p>Average tuition at public four-year colleges has more than tripled in inflation-adjusted dollars since 1990, and total student loan debt in the United States now exceeds $1.7 trillion. That burden delays home purchases, business formation, and family planning for an entire generation. Eliminating tuition at public institutions would directly reverse this trend by funding higher education as a shared public investment.</p>
      <p>Tuition-free public college expands opportunity and strengthens the economy by developing human capital without burdening students with crippling debt. This investment pays long-term dividends through an educated workforce better equipped to meet complex modern economic challenges while fostering social mobility.</p>
<p><span class="good-evidence">Countries with low or no tuition, including Germany and Norway, maintain strong college completion rates when funding is paired with comprehensive student support services.</span> Removing tuition barriers reduces debt burdens dramatically, allowing graduates to start businesses, buy homes, and contribute to the economy sooner rather than spending decades repaying loans.</p>
<p>Targeted taxes on high earners and financial transactions can sustainably finance the system. <span class="good-evidence">The College for All Act proposes a 0.1% tax on financial transactions that would generate $220 billion annually, more than covering tuition costs, according to Congressional Budget Office estimates.</span> Free public college addresses systemic inequality. <span class="good-evidence">Research shows that high college costs deter qualified low-income students from enrolling at rates 20% higher than their high-income peers.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'The Problems with Free College Proposals',
        author: 'Andrew Mitchell',
        text: `<p><strong>The Problems with Free College Proposals</strong> — Andrew Mitchell</p>
      <p>Federal and state governments already spend hundreds of billions on higher education through grants, tax credits, and subsidized loans. Making tuition universally free would add substantially to that total while directing benefits to families across the income spectrum, including those who can already afford to pay. Targeting aid to students with the greatest financial need offers a more cost-effective approach.</p>
      <p>Nothing is truly "free"—taxpayers foot the bill for these programs. Free college sounds compassionate but creates serious practical problems. Universal programs benefit wealthy families who can already afford college rather than targeting those who genuinely need help with costs.</p>
<p><span class="bad-evidence">If college becomes free, everyone will just enroll for fun and campuses will become chaotic and overcrowded.</span> This approach subsidizes degrees people may never use productively. Many graduates already struggle finding jobs matching their degrees—adding more graduates won't solve employment mismatches. Classrooms, dormitories, and campus services are already stretched thin at many state universities without absorbing a wave of new enrollment.</p>
<p>Financial aid should remain merit-based and limited to those demonstrating need, not universal entitlements. <span class="bad-evidence">Common sense says we can't just give away college degrees—people need skin in the game to take education seriously.</span> Free programs would devalue degrees while burdening taxpayers with massive new costs we cannot sustain long-term.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_016',
    topic: 'Should Voting Be Compulsory in National Elections?',
    prompt:
      'After reading both passages about compulsory voting, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Compulsory Voting Strengthens Democratic Representation',
        author: 'Alexandra Kim',
        text: `<p><strong>Compulsory Voting Strengthens Democratic Representation</strong> — Alexandra Kim</p>
      <p>In the 2022 U.S. midterm elections, turnout among eligible voters barely exceeded forty percent, meaning a minority of citizens chose the representatives governing the majority. Low and uneven participation gives outsized influence to highly motivated ideological groups while underrepresenting moderates, young voters, and lower-income communities. Compulsory voting directly addresses that imbalance.</p>
      <p>Compulsory voting increases turnout, reduces polarization, and ensures elected officials reflect the entire populace rather than just motivated partisan bases. This system strengthens democratic legitimacy while reducing the influence of extreme voices that dominate low-turnout elections.</p>
<p><span class="good-evidence">Australia's compulsory voting system yields turnout consistently above 90% and produces broad partisan moderation, according to Australian Electoral Commission data.</span> Modest fines or easy opt-out provisions protect civil liberties while establishing civic duty norms. The symbolic message matters—democracy works best when everyone participates, just as jury duty functions best when the pool draws from the full population rather than only the willing.</p>
<p>Compulsory systems reduce the enormous resources spent on mobilization efforts, redirecting campaign focus toward persuasion and policy substance rather than simply getting voters to show up. <span class="good-evidence">Research comparing compulsory and voluntary systems shows that mandatory voting reduces turnout gaps between wealthy and poor citizens by 70-90%, according to comparative political science studies.</span> This creates more economically representative governments. <span class="good-evidence">Countries with compulsory voting show lower income inequality, suggesting policy benefits from broader electoral participation.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Mandatory Voting Violates Freedom',
        author: 'Thomas Jefferson Foundation',
        text: `<p><strong>Why Mandatory Voting Violates Freedom</strong> — Thomas Jefferson Foundation</p>
      <p>The First Amendment protects not only the right to speak but also the right to remain silent, and many legal scholars argue that compelled political participation conflicts with that principle. Jury duty, often cited as a parallel, serves a judicial function with no partisan dimension, while voting involves choosing among candidates and policies. Forcing that choice raises distinct constitutional concerns.</p>
      <p>Forcing people to vote violates fundamental freedom principles. Democracy means having the choice to participate or abstain. Compelling political participation through government mandate represents the opposite of liberty—it's authoritarian control dressed as civic responsibility.</p>
<p><span class="bad-evidence">Making apathetic, uninformed people vote just adds random noise and stupid choices to elections.</span> Low-information ballots degrade democracy rather than strengthen it. A voter who randomly fills in a ballot simply to avoid a fine contributes nothing to representative governance. People who don't care about politics shouldn't be compelled to make decisions affecting everyone else's futures when better-informed citizens already participate voluntarily.</p>
<p>Voluntary participation represents a cornerstone of liberty, not something to be coerced through financial penalties. Resources spent on enforcement, fine collection, and exemption processing could instead fund voter education campaigns and improved ballot access. <span class="bad-evidence">It's obvious that forced voting is what authoritarian regimes practice—real free societies let people choose.</span> We should encourage participation through civic education and outreach, not government compulsion that treats citizens like children requiring mandatory activities.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_017',
    topic: 'Should School Cafeterias Adopt Plant-Forward Menus?',
    prompt:
      'After reading both passages about plant-forward school menus, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title:
          'Health and Environmental Benefits of Plant-Forward School Meals',
        author: 'Monica Patel',
        text: `<p><strong>Health and Environmental Benefits of Plant-Forward School Meals</strong> — Monica Patel</p>
      <p>The National School Lunch Program feeds roughly 30 million students each day, making cafeteria menus one of the most direct tools for shaping childhood nutrition at scale. Shifting those menus toward more vegetables, legumes, and whole grains—while still including some animal-based options—can reduce chronic disease risk and lower the environmental footprint of institutional food purchasing.</p>
      <p>Plant-forward menus improve student health while reducing the carbon footprint of school meal programs significantly. These menus don't eliminate animal products but emphasize vegetables, fruits, whole grains, and legumes—an approach aligned with dietary guidelines for disease prevention.</p>
<p><span class="good-evidence">Numerous cohort studies link higher plant-based food intake to reduced chronic disease risk, including lower rates of obesity, type 2 diabetes, and heart disease.</span> Properly planned menus meet protein and nutrient needs while exposing students to diverse foods and flavors. School meals shape lifelong eating patterns during critical developmental periods.</p>
<p>Environmental benefits prove substantial. <span class="good-evidence">Research shows that replacing beef with beans in school meals just once per week would reduce greenhouse gas emissions equivalent to taking 150,000 cars off the road, according to environmental nutrition studies.</span> Districts can phase in options gradually while providing culinary training, ensuring meals remain appealing and culturally responsive. <span class="good-evidence">Oakland Unified School District's plant-forward initiative improved meal participation rates by 8% while reducing food costs by 14%.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Traditional School Meals Should Remain Unchanged',
        author: 'Barbara Newman',
        text: `<p><strong>Why Traditional School Meals Should Remain Unchanged</strong> — Barbara Newman</p>
      <p>School meal programs succeed only when students actually eat what is served. Plate-waste studies consistently show that unfamiliar items end up in the trash at higher rates, and younger children are especially resistant to new flavors and textures. Redesigning menus around adult nutritional ideals risks increasing waste while leaving students hungry and less able to concentrate in afternoon classes.</p>
      <p>Kids won't eat vegetables, so plant-forward menus will just lead to massive food waste. Children need familiar foods they'll actually consume, not experimental cafeteria concepts based on adult environmental concerns. Meat provides essential protein and nutrients children need for growth and development.</p>
<p><span class="bad-evidence">My son only eats chicken nuggets and would literally starve if forced to eat beans and vegetables every day.</span> Changing menus meddles with family food preferences and cultural traditions. Parents, not school administrators, should decide what children eat and when. Families who want plant-based meals can prepare them at home; imposing those choices through the cafeteria overrides parental authority and cultural food practices.</p>
<p>Meat is necessary at every meal for proper nutrition—that's just basic biology. <span class="bad-evidence">Plant-based diets are fine for adults making choices, but growing kids need real protein, not tofu and quinoa experiments.</span> Focus should stay on education, not turning cafeterias into platforms for environmental activism that leaves children hungry and families frustrated.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_018',
    topic: 'Should Cities Implement Congestion Pricing for Downtown Driving?',
    prompt:
      'After reading both passages about congestion pricing, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Congestion Pricing Reduces Traffic and Funds Transit',
        author: 'James Cooper',
        text: `<p><strong>Congestion Pricing Reduces Traffic and Funds Transit</strong> — James Cooper</p>
      <p>Road space in major city centers is a finite resource, yet most American cities give it away for free during the busiest hours. The result is predictable: gridlock that wastes fuel, delays buses, and costs the national economy an estimated $87 billion in lost productivity each year. Congestion pricing applies a straightforward economic principle—charging more when demand is highest—to manage that limited space.</p>
      <p>Congestion pricing reduces traffic, speeds up public transit, and improves air quality while funding transportation improvements that benefit entire urban regions. This market-based approach to managing limited road capacity addresses problems that infrastructure expansion alone cannot solve.</p>
<p><span class="good-evidence">London and Stockholm experienced sustained traffic reductions of 20-30% and dramatically improved travel-time reliability after implementing congestion pricing, according to city transportation data.</span> Revenues fund transit expansions that provide alternatives to driving. The policy creates positive feedback loops—better transit attracts more riders, further reducing congestion.</p>
<p>Equity concerns can be addressed through exemptions, rebates for low-income drivers, and investment of revenues in underserved communities' transit. <span class="good-evidence">Singapore's longstanding congestion pricing system has maintained consistently low traffic levels while funding world-class public transportation serving all income levels.</span> Air quality improvements benefit vulnerable populations most. <span class="good-evidence">London's congestion charge zone saw particulate matter pollution decrease by 15%, with health benefits valued at approximately $100 million annually.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Congestion Fees Unfairly Tax Working People',
        author: 'Richard Stone',
        text: `<p><strong>Congestion Fees Unfairly Tax Working People</strong> — Richard Stone</p>
      <p>Not every commuter has a subway stop nearby or a bus route that runs during the early-morning and late-night shifts common in healthcare, retail, and food service. For workers in those jobs, driving is often the only practical option, and a daily congestion fee adds a cost they cannot avoid. Pricing proposals rarely account for the commuting realities of lower-wage shift workers.</p>
      <p>Congestion pricing represents just another tax on working people who have no choice but to drive to their jobs. Drivers already pay registration fees, gas taxes, and parking costs—pricing zones pile on additional burdens to people who can least afford them while wealthy drivers barely notice.</p>
<p><span class="bad-evidence">These fees are obviously just money grabs by city governments looking to fund pet projects and bureaucratic bloat.</span> Commuters who live in areas with poor transit connections face impossible choices—pay extortionate fees or lose their jobs because they can't get to work on time. Outer neighborhoods, which tend to have lower incomes and fewer transit options, bear the heaviest impact.</p>
<p>Pricing punishes essential workers—nurses, teachers, service employees—who work shifts incompatible with limited transit schedules. A hospital nurse finishing a twelve-hour overnight shift has no viable bus option at three in the morning. <span class="bad-evidence">It's common sense that people who have to drive shouldn't be penalized—that's just basic fairness.</span> Cities should build more roads and expand transit service instead of making driving artificially expensive through schemes that hurt working families most.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_019',
    topic: 'Should Public Schools Enforce Strict Student Dress Codes?',
    prompt:
      'After reading both passages about school dress codes, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Why Rigid Dress Codes Distract from Learning',
        author: 'Karen Stevenson',
        text: `<p><strong>Why Rigid Dress Codes Distract from Learning</strong> — Karen Stevenson</p>
      <p>In 2022, a Virginia school district made national headlines when a student was sent home for wearing athletic shorts deemed too short by a dress code enforced almost exclusively against girls. Cases like that one have fueled growing criticism that strict codes penalize certain students more than others and consume administrative time that could be spent on instruction.</p>
      <p>Strict dress codes can disproportionately target girls and marginalized students while distracting from actual educational priorities. Enforcement often reflects subjective judgments about appropriateness that vary by administrator, creating inconsistent and sometimes discriminatory applications that undermine fairness and student trust.</p>
<p><span class="good-evidence">Research on school climate links punitive dress code enforcement to increased suspensions without corresponding academic gains, according to studies from the National Women's Law Center.</span> Time spent policing clothing details detracts from instruction. Students removed from class for dress code violations miss valuable learning time for minor infractions.</p>
<p>Clear, gender-neutral guidelines focused on basic safety requirements prove preferable to detailed subjective rules. <span class="good-evidence">Schools replacing strict codes with simpler safety-based policies report fewer disciplinary referrals and improved school climate, according to educational policy research.</span> Preparing students for diverse workplaces means teaching context-appropriate choices, not enforcing uniform conformity. <span class="good-evidence">Studies show no correlation between strict dress codes and improved academic performance, test scores, or school safety.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Schools Need Firm Dress Code Standards',
        author: 'Donald Pierce',
        text: `<p><strong>Why Schools Need Firm Dress Code Standards</strong> — Donald Pierce</p>
      <p>Walk into any professional workplace—a law firm, a hospital, a corporate office—and you will find appearance standards employees are expected to meet. Schools that enforce clear dress expectations prepare students for that reality. Setting rules about clothing establishes a baseline of order so that attention stays on learning rather than on what someone is wearing.</p>
      <p>Uniforms and strict dress codes promote respect and eliminate distractions in learning environments. When everyone dresses similarly, classroom focus shifts from fashion competition to academic achievement. Clear rules teach professionalism and prepare students for workplace expectations where appearance standards matter.</p>
<p><span class="bad-evidence">If students look sharp and professional, they'll naturally act more seriously about their education—that's just human psychology.</span> Strict codes eliminate distractions from inappropriate or revealing clothing that disrupts other students' ability to concentrate on lessons. Morning routines become simpler when students know exactly what to wear, reducing tardiness and daily decision fatigue before the school day even starts.</p>
<p>Detailed dress codes should be enforced consistently to maintain order and discipline across the building. <span class="bad-evidence">Everyone knows that when you let kids wear whatever they want, chaos follows—schools become fashion shows instead of serious learning institutions.</span> Parents consistently support clear standards that eliminate daily arguments about appropriate school clothing. When expectations are uniform, socioeconomic differences in wardrobe become less visible, reducing peer pressure and bullying tied to brand-name clothing and designer trends.</p>`,
      },
    ],
  },

  {
    id: 'rla_arg_020',
    topic:
      'Should High Schools Require Financial Literacy Courses for Graduation?',
    prompt:
      'After reading both passages about financial literacy requirements, write an essay explaining which author presents the more convincing argument. Support your response with evidence from both passages and explain why the evidence you cite supports your evaluation.',
    articles: [
      {
        label: 'Article A',
        strength: 'strong',
        title: 'Financial Literacy as Essential Life Skills Education',
        author: 'Rebecca Martinez',
        text: `<p><strong>Financial Literacy as Essential Life Skills Education</strong> — Rebecca Martinez</p>
      <p>Nearly half of American adults cannot cover an unexpected $400 expense without borrowing, and credit card debt among people under thirty has reached record levels. These outcomes reflect, in part, a gap in public education: most states do not require students to learn about budgeting, interest rates, or debt management before graduation. A dedicated financial literacy course addresses that gap directly.</p>
      <p>Requiring standalone financial literacy courses equips students with essential life skills in budgeting, credit management, investing, and avoiding predatory lending. These practical competencies directly impact students' economic wellbeing and long-term financial security, making them as fundamental as traditional academic subjects.</p>
<p><span class="good-evidence">States implementing financial literacy requirements report improved credit outcomes among young adults and reduced delinquency rates, according to research from the Council on Economic Education.</span> Dedicated courses prevent the topic from being marginalized or skipped when integrated into other classes where teachers may lack expertise or time.</p>
<p>Financial decisions affect everyone regardless of career path. <span class="good-evidence">A 2022 FINRA study found that young adults who took dedicated financial education courses were 40% more likely to save regularly and 35% less likely to carry excessive credit card debt.</span> Course requirements ensure equity—all students gain foundational knowledge, not just those whose families provide this education at home. <span class="good-evidence">Research from the Jump$tart Coalition shows that financial education is most effective when delivered in dedicated courses rather than brief unit integrations.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Financial Literacy Mandates Are Unnecessary',
        author: 'Howard Phillips',
        text: `<p><strong>Why Financial Literacy Mandates Are Unnecessary</strong> — Howard Phillips</p>
      <p>High school graduation requirements already include four years of English, three or four of math, and mandated courses in science, history, and health. Adding another required course means something else gets dropped—often an elective students are passionate about or an advanced class that strengthens college applications. The schedule trade-off deserves serious consideration before piling on new mandates.</p>
      <p>High school schedules are already overcrowded with required courses. Adding mandatory financial literacy creates additional bureaucratic requirements without clear benefits. Students can learn money management skills from parents, online resources, or optional workshops without consuming limited classroom time.</p>
<p><span class="bad-evidence">Kids will just learn personal finance from their parents like everyone has for generations—schools don't need to teach everything.</span> Most financial concepts are common sense that students will understand naturally when they need them. Budgeting, saving, and avoiding debt are skills picked up through life experience, not classroom lectures about compound interest. Requiring entire courses seems like overkill for topics that could be covered in brief units within existing math or economics classes.</p>
<p>Optional after-school programs or online modules provide sufficient access without mandatory course requirements. <span class="bad-evidence">It's obvious that motivated students will seek out this information when they need it, and unmotivated students won't pay attention anyway.</span> Schools should focus on core academics rather than expanding graduation requirements that delay students' progress toward diplomas and careers.</p>`,
      },
    ],
  },
];

export default essayPassages;
