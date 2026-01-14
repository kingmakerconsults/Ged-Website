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
        text: `<p>Lowering the voting age to 16 strengthens democracy by including citizens who already contribute to society. At 16, many young people work, pay taxes, and follow the same laws as adults. The principle of "no taxation without representation" demands they have a voice in policies affecting education, climate, and economic opportunity.</p>
<p><span class="good-evidence">Research demonstrates that voting becomes habitual when started early. A 2020 Tufts University study found that cities allowing 16-year-olds to vote in local elections saw significantly higher youth turnout in subsequent national elections.</span> When young people vote while still in stable homes and civics classrooms, they develop lasting democratic participation habits.</p>
<p><span class="good-evidence">Political scientist Dr. Mark Franklin notes that earlier first-time voting correlates strongly with lifelong civic engagement.</span> Sixteen-year-olds demonstrate civic competence through community service, school governance, and informed classroom discussions. <span class="good-evidence">Countries like Austria and Scotland report positive experiences with 16-year-old voters showing engagement levels matching or exceeding older first-time voters.</span> This evidence supports lowering the age as a practical step toward stronger democracy.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why 16 Is Too Young for Voting Responsibility',
        author: 'Marcus Wright',
        text: `<p>Lowering the voting age sounds idealistic but ignores developmental realities. The adolescent brain continues maturing into the mid-twenties, particularly in areas governing long-term planning and impulse control. Political decisions require experience and judgment that most 16-year-olds lack.</p>
<p>Voting carries profound responsibility. Extending this right to teenagers risks trivializing democratic participation. <span class="bad-evidence">When I was 16, my friends and I worried more about getting driver's licenses than understanding monetary policy or foreign relations.</span> Teenage priorities naturally focus on immediate concerns rather than complex governance issues.</p>
<p>The current age of 18 creates a clear threshold for legal adulthood with its associated rights and responsibilities. <span class="bad-evidence">Everyone knows teenagers make impulsive choices—that's just common sense.</span> Rather than experimenting with our democratic foundation, we should maintain the proven standard that has served us well for generations.</p>`,
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
        text: `<p>Universal Basic Income offers a revolutionary approach to poverty by providing everyone with a guaranteed minimum income. This security allows people to invest in education, search for better jobs, or start businesses without fearing immediate destitution. UBI creates conditions for genuine economic mobility.</p>
<p><span class="bad-evidence">It's obvious that when people aren't worried about next month's rent, they make smarter long-term decisions.</span> This financial cushion would unleash entrepreneurship and creativity currently suppressed by economic anxiety. People could take calculated risks knowing they have a safety net.</p>
<p>Critics claim UBI would discourage work, but this reflects cynical assumptions about human nature. <span class="bad-evidence">Most people want to work and contribute to society—that's just human psychology.</span> UBI wouldn't replace work but would provide freedom to pursue meaningful employment rather than accepting any available job out of desperation.</p>`,
      },
      {
        label: 'Article B',
        strength: 'strong',
        title: 'Why Universal Basic Income Fails as Poverty Policy',
        author: 'Anna Coote',
        text: `<p>Universal Basic Income, despite good intentions, represents an inefficient poverty-reduction tool. By distributing funds universally rather than targeting those most in need, UBI dilutes its impact precisely where support matters most. <span class="good-evidence">A 2018 Center on Budget and Policy Priorities analysis found that replacing targeted aid programs with modest UBI would actually increase poverty rates.</span></p>
<p>Existing programs like SNAP and Medicaid address specific hardships—food insecurity, healthcare access—with proven effectiveness. UBI risks dismantling this targeted infrastructure. <span class="good-evidence">Economic research indicates that guaranteed income floors may inadvertently subsidize low-wage employers, reducing pressure to offer competitive salaries and benefits.</span> This could normalize precarious work rather than addressing its root causes.</p>
<p>Rather than expensive universal programs, policymakers should strengthen existing safety nets and promote policies encouraging higher wages and job quality. <span class="good-evidence">Targeted assistance delivers measurably better outcomes per dollar spent, according to comparative welfare policy studies.</span></p>`,
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
        text: `<p>Government subsidies accelerate the critical transition to renewable energy, delivering both environmental and economic benefits. Solar and wind power produce minimal greenhouse gases, directly combating climate change while improving public health. <span class="good-evidence">The National Renewable Energy Laboratory concluded that achieving 80% renewable electricity by 2050 could reduce economy-wide carbon emissions by 81%.</span></p>
<p>Though initial costs run high, subsidies make renewables competitive with fossil fuels that have received government support for decades. This investment creates jobs in growing sectors while fostering energy independence. <span class="good-evidence">The Bureau of Labor Statistics identifies solar panel installer and wind turbine technician among the nation's fastest-growing occupations.</span></p>
<p>Long-term, renewable support delivers strategic economic advantage through stable, predictable energy costs immune to global oil market volatility. <span class="good-evidence">Germany's renewable investment has created over 300,000 jobs while reducing energy import dependence by 35%, according to the German Renewable Energy Federation.</span> This represents smart policy combining environmental responsibility with economic security.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Renewable Energy Subsidies Burden Taxpayers',
        author: 'David Chen',
        text: `<p>While renewable energy sounds appealing, aggressive government subsidies create serious problems. Solar panels and wind turbines carry high upfront costs that taxpayers ultimately fund, creating massive financial burdens. These technologies work only in locations with consistent sun or wind, limiting their practical application.</p>
<p>Renewable energy production remains intermittent, requiring expensive battery storage technology that hasn't matured sufficiently. <span class="bad-evidence">Imagine families losing power on calm, cloudy days—that's the reliability problem we're talking about.</span> Without fossil fuel backup, renewables can't power modern economies, defeating their entire purpose.</p>
<p><span class="bad-evidence">Common sense says we shouldn't let government bureaucrats pick energy winners and losers with our tax dollars.</span> Market-driven approaches would allow the most efficient technologies to emerge naturally through innovation and competition, not political favoritism.</p>`,
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
        text: `<p>Social media platforms pose significant risks to adolescent mental health and wellbeing. These platforms are designed to maximize engagement, often disrupting sleep patterns and exposing young users to harmful content during critical developmental periods. <span class="good-evidence">A 2022 Journal of the American Medical Association study found that teens spending over three hours daily on social media face double the risk of depression and anxiety symptoms.</span></p>
<p>Adolescent brains remain highly susceptible to social comparison and peer pressure. Social media creates distorted realities where teens constantly compare their lives to curated, idealized posts. <span class="good-evidence">The American Psychological Association directly links this comparison behavior to lower self-esteem and poor body image, particularly affecting adolescent girls.</span></p>
<p>Platform algorithms deliberately amplify engaging content, regardless of its psychological impact. <span class="good-evidence">Internal Meta research, revealed in whistleblower documents, showed Instagram worsened body image issues for one in three teen girls.</span> Parents and educators need greater awareness of these documented dangers to protect young users' developing minds from platform-driven harm.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: "Social Media's Positive Role in Teen Connection",
        author: 'Jennifer Park',
        text: `<p>While social media carries risks, it provides essential benefits for teenagers. Many teens report that platforms help them feel more accepted and connected to friends. These online connections prove especially crucial for marginalized youth, including LGBTQ teens who may find supportive communities unavailable in their immediate physical environments.</p>
<p><span class="bad-evidence">My own daughter struggled making friends locally, but online she found wonderful people sharing her passion for art. It completely transformed her confidence and happiness.</span> This demonstrates how vital these digital connections can become for young people seeking acceptance and community.</p>
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
        text: `<p>The "college-for-all" mentality has left millions of young Americans burdened with crippling student debt while viable alternatives exist. Vocational training offers a direct, affordable path to stable careers with strong earning potential. <span class="good-evidence">Bureau of Labor Statistics data shows many skilled trades—electricians, plumbers, HVAC technicians—offer median salaries comparable to or exceeding those of many bachelor's degree holders, without massive upfront costs.</span></p>
<p>Vocational programs provide immediately applicable hands-on skills. Many students enter paid apprenticeships, earning while learning. This model avoids four-year degree debt while allowing young adults to build financial independence years earlier. <span class="good-evidence">The National Center for Education Statistics reports average bachelor's degree student loan debt exceeds $30,000, while vocational graduates typically carry minimal or zero educational debt.</span></p>
<p>Society must stop stigmatizing skilled labor. <span class="good-evidence">The U.S. faces critical skilled trades shortages, with over 600,000 unfilled positions, according to the Associated General Contractors of America.</span> Promoting vocational education as a respectable alternative builds stronger workforces while offering debt-free middle-class pathways.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Four-Year Degrees Remain Essential',
        author: 'Anya Sharma',
        text: `<p>A four-year college degree remains the most reliable pathway to long-term career success and economic mobility. While vocational training serves certain purposes, bachelor's degrees provide something far more valuable—foundations in critical thinking, complex problem-solving, and communication. These aren't merely job skills but life skills enabling graduates to adapt to rapidly changing economies.</p>
<p>Statistically, college graduates consistently earn significantly more over their lifetimes than those without degrees. <span class="bad-evidence">Everyone knows successful people who earned college degrees—it's the proven pathway.</span> This "degree premium" isn't just about initial employment but the upward trajectory broad-based education enables throughout entire careers.</p>
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
        text: `<p>Smartphones have become the primary source of classroom distraction, undermining the fundamental purpose of education. These devices fragment student attention and disrupt learning environments. Clear, consistent bans are necessary to restore academic focus and improve educational outcomes for all students.</p>
<p><span class="good-evidence">A London School of Economics study analyzing schools across four English cities found that phone bans improved average test scores by 6.4%, with even larger gains for lower-achieving students.</span> This empirical evidence demonstrates that removing phones directly enhances academic performance while potentially narrowing achievement gaps.</p>
<p>Beyond test scores, smartphone bans help students develop sustained attention skills that are eroding in the digital age. <span class="good-evidence">Research from the University of Texas found that even having smartphones present—not in use—reduces available cognitive capacity for learning tasks.</span> Firm bans send clear messages about academic priorities. <span class="good-evidence">Schools implementing comprehensive bans report improved classroom engagement and reduced behavioral disruptions, according to a 2023 Common Sense Media survey.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Teaching Responsible Technology Use Instead of Bans',
        author: 'Helen Tran',
        text: `<p>Banning smartphones represents a backward response to modern reality. Rather than prohibiting these powerful tools, schools should teach students responsible usage. Smartphones provide instant information access, functioning as research tools and collaborative devices. Denying students access cripples them with outdated educational models.</p>
<p><span class="bad-evidence">The people pushing these bans are just old-fashioned and afraid of technology they don't understand.</span> This argument ignores that modern workplaces require digital literacy. Schools have responsibilities to prepare students for actual future work environments saturated with technology, not imaginary tech-free worlds.</p>
<p>The challenge isn't the device but teaching methodology. Teachers need training to leverage smartphones for learning, not avoid them. <span class="bad-evidence">It's just common sense—you can't prepare kids for the future by confiscating future tools.</span> Smart integration beats fearful prohibition every time.</p>`,
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
        text: `<p>Requiring fast-food chains to display calorie counts represents a commonsense public health policy that empowers consumers to make informed choices. In addressing the obesity epidemic, transparent nutritional information serves as a powerful tool. People have fundamental rights to know what's in food they're purchasing.</p>
<p><span class="good-evidence">Research published in the American Journal of Public Health found that after New York City implemented menu labeling, consumers at fast-food chains purchased an average of 25 fewer calories per transaction.</span> While this may seem modest, these small changes compound over time, producing significant population-level health improvements.</p>
<p>This policy doesn't ban choices—it enables informed ones. <span class="good-evidence">Just as FDA regulations require nutrition labels on packaged foods, point-of-purchase information follows the same transparency principle.</span> Multiple cities and states implementing calorie labeling report no significant cost burdens on restaurants. <span class="good-evidence">A 2017 FDA impact analysis found restaurant compliance costs averaged less than $4,700 per location for initial implementation—minimal compared to public health benefits.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Calorie Mandates Burden Businesses Without Results',
        author: 'Tom Bradley',
        text: `<p>Mandatory calorie labeling for fast-food restaurants represents costly, ineffective government overreach. The financial burden of analyzing every menu item and reprinting menu boards weighs especially heavily on smaller franchise owners. This exemplifies government imposing one-size-fits-all solutions that hurt small businesses.</p>
<p><span class="bad-evidence">I personally know plenty of people who see high calorie counts and order the items anyway, proving it doesn't actually work.</span> People patronize fast-food restaurants for convenience and taste, not health experiences. Consumer behavior stems from many factors—single numbers on menu boards rarely prove decisive.</p>
<p>This policy assumes information lack causes poor dietary choices. <span class="bad-evidence">Everyone already knows burgers and fries aren't health foods—that's obvious.</span> The focus should emphasize personal responsibility rather than more government regulations that burden businesses while failing to meaningfully change behavior.</p>`,
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
        text: `<p>America's most beloved national parks face an existential threat—being "loved to death." Surging visitor numbers cause traffic gridlock, trail erosion, and ecosystem damage. To protect these natural treasures for future generations, more restrictive access systems are necessary, with lotteries providing the fairest implementation method.</p>
<p><span class="good-evidence">National Park Service data shows that in parks like Zion and Arches, unmanaged visitor numbers have caused significant soil compaction and vegetation loss along popular trails.</span> Lottery systems directly mitigate environmental damage by controlling daily visitor numbers. This represents necessary management fulfilling the Park Service's core preservation mission.</p>
<p><span class="good-evidence">A 2021 Yosemite study concluded that overcrowding significantly diminishes visitor experience quality, leading to lower satisfaction scores.</span> Reservation systems provide certainty, allowing effective trip planning while ensuring better experiences for those who attend. <span class="good-evidence">Pilot programs at Arches National Park showed that timed entry reduced wait times by 90% while improving visitor satisfaction by 35%.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'National Parks Belong to All Americans, Not Lottery Winners',
        author: 'Brenda Walsh',
        text: `<p>National parks were created for all Americans' access, not just lucky lottery winners. Implementing reservation systems fundamentally transforms public lands from shared national birthright into exclusive commodity. It creates barriers disproportionately affecting families unable to plan vacations months in advance.</p>
<p><span class="bad-evidence">My family has always taken spontaneous park trips, and lottery systems would destroy that cherished tradition entirely.</span> This would devastate local gateway communities whose economies depend on steady tourist flows, not predetermined, limited visitor numbers.</p>
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
        text: `<p>Heavy reliance on standardized test scores like the SAT and ACT in college admissions perpetuates inequitable practices. These tests don't measure pure merit—they correlate strongly with family income and resource access. Students from affluent families afford expensive test preparation courses, creating unfair advantages.</p>
<p><span class="good-evidence">A landmark study of over 123,000 students at 33 test-optional colleges found virtually no difference in college GPA or graduation rates between students who submitted scores and those who didn't.</span> This proves high school grades better predict college success. Four-year academic performance provides more holistic, accurate measures of student ability and work ethic than single high-stakes exams.</p>
<p>Test-optional systems allow colleges to assess applicants more equitably, considering academic records, essays, and activities. <span class="good-evidence">Research from the National Association for College Admission Counseling shows test-optional policies increase applications from underrepresented minority students by an average of 10%.</span> This builds more diverse, capable student bodies while rewarding long-term diligence over test-taking ability.</p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Standardized Tests Remain Essential Admission Tools',
        author: 'Susan Gerson',
        text: `<p>While standardized tests aren't perfect, they remain our most objective, reliable tool for comparing students from tens of thousands of different high schools. Grade inflation runs rampant—an 'A' in one school doesn't equal an 'A' in another. SAT and ACT tests provide common yardsticks measuring core academic skills.</p>
<p><span class="bad-evidence">Without tests, admissions would just become subjective guessing games about who wrote the prettiest essay—complete chaos.</span> These tests can identify promising students from less-known high schools whose grades might otherwise be overlooked. Ignoring test scores means ignoring valuable data points.</p>
<p>Rather than eliminating tests, we should ensure all students access free, high-quality test preparation resources. <span class="bad-evidence">Fixing access problems makes more sense than throwing away our only objective measurement tool—that's just logical.</span></p>`,
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
        text: `<p>The shift to remote work has proven remarkably successful, offering significant financial and operational benefits to both companies and employees. By reducing needs for large, expensive office spaces, companies drastically cut overhead costs related to rent, utilities, and facilities. These savings can be reinvested into growth and innovation.</p>
<p>From human resources perspectives, benefits prove even more compelling. Offering remote work allows companies to recruit from global talent pools, not just single cities. <span class="good-evidence">A Stanford University survey of 16,000 workers over nine months found that remote work increased employee satisfaction while boosting productivity by 13%.</span> Happier, more autonomous employees consistently demonstrate higher productivity.</p>
<p>Remote work improves employee retention and wellbeing significantly. <span class="good-evidence">A Gallup poll found that a majority of remote-capable employees forced to return to full-time office work are actively seeking new employment.</span> Flexible, remote-first models aren't temporary trends—they represent the future of more efficient, humane business practices. <span class="good-evidence">Companies offering permanent remote options report 25% lower turnover rates, according to 2023 FlexJobs research.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why In-Office Work Remains Essential for Success',
        author: 'Robert Chen',
        text: `<p>Alleged remote work benefits are largely illusory and ignore long-term damage to company culture. Offices serve as hubs for spontaneous collaboration and mentorship that cannot be replicated over scheduled video calls. The informal "water cooler" conversations sparking new ideas are lost forever in remote arrangements.</p>
<p><span class="bad-evidence">It's just common sense that people will be less productive at home with all the distractions of laundry, television, and personal errands.</span> While some companies may see short-term gains in routine tasks, long-term costs in lost innovation and team cohesion will prove immense and irreversible.</p>
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
        text: `<p>Limiting homework to one hour per night in high schools supports learning without sacrificing student wellbeing. Excessive homework contributes to sleep deprivation, chronic stress, and disengagement—all of which ultimately undermine academic performance rather than enhance it.</p>
<p><span class="good-evidence">A 2013 Stanford study of students in high-achieving communities found that those spending over two hours on homework experienced higher stress levels, physical health problems, and lack of life balance.</span> Quality matters far more than quantity. Structured practice aligned with clear objectives within a one-hour cap encourages focus while allowing time for reading, extracurriculars, and family responsibilities.</p>
<p><span class="good-evidence">Sleep researchers consistently tie adequate sleep to improved memory consolidation and problem-solving abilities—both critical for learning.</span> Sensible homework caps promote equitable access for students who work part-time or care for siblings after school. <span class="good-evidence">The National Education Association recommends the "10-minute rule"—approximately 10 minutes per grade level per night—which for high schoolers suggests 1-1.5 hours maximum.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Homework Limits Undermine Academic Rigor',
        author: 'William Henderson',
        text: `<p>Hard work builds character, and limiting homework to one hour risks coddling students. Advanced courses require more time for mastery—students should simply learn better schedule management. Time caps send wrong messages about academic rigor and dedication required for success.</p>
<p><span class="bad-evidence">When I was in school, we had loads of homework and we all turned out fine—kids today just need to work harder.</span> Limiting homework tells students they don't need to push through challenges or develop perseverance. Real life doesn't come with time caps and convenience limits.</p>
<p>Students must learn to handle pressure and meet high expectations without accommodations. <span class="bad-evidence">Universal limits are unnecessary—good students can handle more work, and they shouldn't be held back by arbitrary rules.</span> Teacher autonomy matters more than one-size-fits-all restrictions that lower standards for everyone.</p>`,
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
        text: `<p>Fare-free transit increases ridership, reduces traffic congestion, and improves air quality while dramatically expanding access to jobs and education for lower-income residents. Eliminating fares speeds boarding, simplifies operations, and reduces fare enforcement costs—streamlining the entire transit system.</p>
<p><span class="good-evidence">Kansas City, Missouri saw significant ridership increases and improved job access after adopting zero-fare buses, according to city transportation reports.</span> Funding can be rebalanced through congestion fees, dedicated sales taxes, and reallocation of parking-related revenues. Free transit functions as a public good benefiting the entire urban ecosystem, similar to roads or libraries.</p>
<p><span class="good-evidence">A 2022 American Public Transportation Association analysis estimates that every dollar invested in public transit yields approximately four dollars in local economic returns.</span> Free systems reduce barriers for vulnerable populations while encouraging car owners to shift to sustainable transportation. <span class="good-evidence">Tallinn, Estonia's fare-free system increased ridership by 14% while reducing traffic by 15%, according to city mobility data.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Free Transit Invites Waste and Abuse',
        author: 'Gregory Paulson',
        text: `<p>Making transit free sounds nice but invites waste and inappropriate usage. People will ride for entertainment rather than necessity, crowding buses and trains with non-commuters. Free services remove accountability—when people don't pay, they don't value what they're using.</p>
<p><span class="bad-evidence">If you don't charge fares, people will just circle the city all day taking joy rides and treating buses like homeless shelters.</span> This burdens taxpayers who must cover costs that riders should bear. Fares create accountability and ensure those benefiting most contribute to system costs.</p>
<p>Rather than eliminating fares, cities should enforce existing fare policies more strictly and cut operational waste. <span class="bad-evidence">Those who genuinely need help can already get discounted passes—most riders can afford to pay something.</span> Free programs sound compassionate but ultimately prove unsustainable and unfair to taxpayers.</p>`,
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
        text: `<p>Year-round calendars with shorter, more frequent breaks reduce summer learning loss while allowing targeted intersession support for struggling students. This balanced approach maintains educational momentum throughout the year, preventing the significant regression that occurs during traditional long summer breaks.</p>
<p><span class="good-evidence">Meta-analyses show that low-income students lose significant math and reading skills over long summers, with some losing two to three months of academic progress.</span> Staggered breaks mitigate this regression while providing regular rest periods that lower burnout for both students and staff. Distributed breaks also allow for timely intervention and enrichment programs.</p>
<p>Facilities are used more efficiently, potentially easing overcrowding through multi-track options. <span class="good-evidence">Schools using year-round calendars report 20-30% increases in building capacity through staggered scheduling, according to the National Association for Year-Round Education.</span> Families gain predictable schedules for both remediation and enrichment. <span class="good-evidence">Research from North Carolina's year-round schools shows improved test scores, particularly for disadvantaged students.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Preserving the Traditional Summer Break',
        author: 'Linda Harrison',
        text: `<p>Summer represents a cherished American tradition providing time for camps, family vacations, and teen summer jobs. Year-round school disrupts these valuable experiences, tourism industries, and family routines that have worked successfully for generations. If traditional calendars aren't broken, why fix them?</p>
<p><span class="bad-evidence">Kids need long summers to just be kids—everyone knows that childhood summers create the best memories.</span> Year-round schedules complicate childcare for families with siblings on different tracks. Parents would face constant scheduling chaos trying to coordinate multiple children's varied break periods.</p>
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
        text: `<p>Plastic bag bans reduce litter, protect waterways and wildlife, and cut municipal cleanup costs while shifting consumer behavior toward sustainable habits. These lightweight bags create disproportionate environmental damage—clogging storm drains, entangling wildlife, and persisting in ecosystems for hundreds of years.</p>
<p><span class="good-evidence">California's statewide plastic bag ban led to substantial declines in plastic bag litter along coastlines, according to California Coastal Commission data.</span> Reusable and paper alternatives prove viable for most purchases. Cities implementing bans report significant reductions in plastic waste entering recycling streams where bags jam equipment.</p>
<p>Pairing bans with education and exemptions for sanitation-sensitive items addresses edge cases effectively. <span class="good-evidence">San Jose's bag ban reduced plastic bag litter in storm drains by 89% within two years, according to city environmental reports.</span> Consumer adaptation occurs quickly. <span class="good-evidence">Studies show that after brief adjustment periods, most shoppers successfully transition to reusable bags, with compliance rates exceeding 85%.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Plastic Bag Bans Burden Consumers',
        author: 'Daniel Foster',
        text: `<p>Plastic bag bans inconvenience shoppers and unfairly penalize small stores trying to serve customers efficiently. Paper bags have their own environmental costs—they require more energy to produce and transport. Bans represent feel-good policies that don't address real environmental priorities.</p>
<p><span class="bad-evidence">People will just forget their reusable bags and get angry at store clerks—I've seen it happen constantly.</span> This creates unnecessary friction between businesses and customers. Let the market decide—customers who care about the environment can bring their own bags without government mandates.</p>
<p>Bans are pointless because determined consumers will simply request multiple paper bags instead, potentially creating worse environmental impacts. <span class="bad-evidence">Anyone with common sense knows the real problem is China and big corporations, not grocery bags.</span> We need practical solutions, not symbolic gestures that burden small businesses and working families.</p>`,
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
        text: `<p>Tuition-free public college expands opportunity and strengthens the economy by developing human capital without burdening students with crippling debt. This investment pays long-term dividends through an educated workforce better equipped to meet complex modern economic challenges while fostering social mobility.</p>
<p><span class="good-evidence">Countries with low or no tuition, including Germany and Norway, maintain strong college completion rates when funding is paired with comprehensive student support services.</span> Removing tuition barriers reduces debt burdens dramatically, allowing graduates to start businesses, buy homes, and contribute to the economy sooner rather than spending decades repaying loans.</p>
<p>Targeted taxes on high earners and financial transactions can sustainably finance the system. <span class="good-evidence">The College for All Act proposes a 0.1% tax on financial transactions that would generate $220 billion annually, more than covering tuition costs, according to Congressional Budget Office estimates.</span> Free public college addresses systemic inequality. <span class="good-evidence">Research shows that high college costs deter qualified low-income students from enrolling at rates 20% higher than their high-income peers.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'The Problems with Free College Proposals',
        author: 'Andrew Mitchell',
        text: `<p>Nothing is truly "free"—taxpayers foot the bill for these programs. Free college sounds compassionate but creates serious practical problems. Universal programs benefit wealthy families who can already afford college rather than targeting those who genuinely need help with costs.</p>
<p><span class="bad-evidence">If college becomes free, everyone will just enroll for fun and campuses will become chaotic and overcrowded.</span> This approach subsidizes degrees people may never use productively. Many graduates already struggle finding jobs matching their degrees—adding more graduates won't solve employment mismatches.</p>
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
        text: `<p>Compulsory voting increases turnout, reduces polarization, and ensures elected officials reflect the entire populace rather than just motivated partisan bases. This system strengthens democratic legitimacy while reducing the influence of extreme voices that dominate low-turnout elections.</p>
<p><span class="good-evidence">Australia's compulsory voting system yields turnout consistently above 90% and produces broad partisan moderation, according to Australian Electoral Commission data.</span> Modest fines or easy opt-out provisions protect civil liberties while establishing civic duty norms. The symbolic message matters—democracy works best when everyone participates.</p>
<p>Compulsory systems reduce the enormous resources spent on mobilization efforts, redirecting campaign focus toward persuasion and policy. <span class="good-evidence">Research comparing compulsory and voluntary systems shows that mandatory voting reduces turnout gaps between wealthy and poor citizens by 70-90%, according to comparative political science studies.</span> This creates more economically representative governments. <span class="good-evidence">Countries with compulsory voting show lower income inequality, suggesting policy benefits from broader electoral participation.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Mandatory Voting Violates Freedom',
        author: 'Thomas Jefferson Foundation',
        text: `<p>Forcing people to vote violates fundamental freedom principles. Democracy means having the choice to participate or abstain. Compelling political participation through government mandate represents the opposite of liberty—it's authoritarian control dressed as civic responsibility.</p>
<p><span class="bad-evidence">Making apathetic, uninformed people vote just adds random noise and stupid choices to elections.</span> Low-information ballots degrade democracy rather than strengthen it. People who don't care about politics shouldn't be forced to make decisions affecting everyone else's futures.</p>
<p>Voluntary participation represents a cornerstone of liberty, not something to be coerced through penalties. <span class="bad-evidence">It's obvious that forced voting is what communist countries do—real free societies let people choose.</span> We should encourage participation through better education and engagement, not government compulsion that treats citizens like children requiring mandatory activities.</p>`,
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
        text: `<p>Plant-forward menus improve student health while reducing the carbon footprint of school meal programs significantly. These menus don't eliminate animal products but emphasize vegetables, fruits, whole grains, and legumes—an approach aligned with dietary guidelines for disease prevention.</p>
<p><span class="good-evidence">Numerous cohort studies link higher plant-based food intake to reduced chronic disease risk, including lower rates of obesity, type 2 diabetes, and heart disease.</span> Properly planned menus meet protein and nutrient needs while exposing students to diverse foods and flavors. School meals shape lifelong eating patterns during critical developmental periods.</p>
<p>Environmental benefits prove substantial. <span class="good-evidence">Research shows that replacing beef with beans in school meals just once per week would reduce greenhouse gas emissions equivalent to taking 150,000 cars off the road, according to environmental nutrition studies.</span> Districts can phase in options gradually while providing culinary training, ensuring meals remain appealing and culturally responsive. <span class="good-evidence">Oakland Unified School District's plant-forward initiative improved meal participation rates by 8% while reducing food costs by 14%.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Traditional School Meals Should Remain Unchanged',
        author: 'Barbara Newman',
        text: `<p>Kids won't eat vegetables, so plant-forward menus will just lead to massive food waste. Children need familiar foods they'll actually consume, not experimental cafeteria concepts based on adult environmental concerns. Meat provides essential protein and nutrients children need for growth and development.</p>
<p><span class="bad-evidence">My son only eats chicken nuggets and would literally starve if forced to eat beans and vegetables every day.</span> Changing menus meddles with family food preferences and cultural traditions. Parents, not school administrators, should decide what children eat and when.</p>
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
        text: `<p>Congestion pricing reduces traffic, speeds up public transit, and improves air quality while funding transportation improvements that benefit entire urban regions. This market-based approach to managing limited road capacity addresses problems that infrastructure expansion alone cannot solve.</p>
<p><span class="good-evidence">London and Stockholm experienced sustained traffic reductions of 20-30% and dramatically improved travel-time reliability after implementing congestion pricing, according to city transportation data.</span> Revenues fund transit expansions that provide alternatives to driving. The policy creates positive feedback loops—better transit attracts more riders, further reducing congestion.</p>
<p>Equity concerns can be addressed through exemptions, rebates for low-income drivers, and investment of revenues in underserved communities' transit. <span class="good-evidence">Singapore's longstanding congestion pricing system has maintained consistently low traffic levels while funding world-class public transportation serving all income levels.</span> Air quality improvements benefit vulnerable populations most. <span class="good-evidence">London's congestion charge zone saw particulate matter pollution decrease by 15%, with health benefits valued at approximately $100 million annually.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Congestion Fees Unfairly Tax Working People',
        author: 'Richard Stone',
        text: `<p>Congestion pricing represents just another tax on working people who have no choice but to drive to their jobs. Drivers already pay registration fees, gas taxes, and parking costs—pricing zones pile on additional burdens to people who can least afford them while wealthy drivers barely notice.</p>
<p><span class="bad-evidence">These fees are obviously just money grabs by city governments looking to fund pet projects and bureaucratic bloat.</span> Commuters who live in areas with poor transit connections face impossible choices—pay extortionate fees or lose their jobs because they can't get to work on time.</p>
<p>Pricing punishes essential workers—nurses, teachers, service employees—who work shifts incompatible with limited transit schedules. <span class="bad-evidence">It's common sense that people who have to drive shouldn't be penalized—that's just basic fairness.</span> Cities should build more roads and parking instead of making driving artificially expensive through schemes that hurt working families most.</p>`,
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
        text: `<p>Strict dress codes can disproportionately target girls and marginalized students while distracting from actual educational priorities. Enforcement often reflects subjective judgments about appropriateness that vary by administrator, creating inconsistent and sometimes discriminatory applications that undermine fairness and student trust.</p>
<p><span class="good-evidence">Research on school climate links punitive dress code enforcement to increased suspensions without corresponding academic gains, according to studies from the National Women's Law Center.</span> Time spent policing clothing details detracts from instruction. Students removed from class for dress code violations miss valuable learning time for minor infractions.</p>
<p>Clear, gender-neutral guidelines focused on basic safety requirements prove preferable to detailed subjective rules. <span class="good-evidence">Schools replacing strict codes with simpler safety-based policies report fewer disciplinary referrals and improved school climate, according to educational policy research.</span> Preparing students for diverse workplaces means teaching context-appropriate choices, not enforcing uniform conformity. <span class="good-evidence">Studies show no correlation between strict dress codes and improved academic performance, test scores, or school safety.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Schools Need Firm Dress Code Standards',
        author: 'Donald Pierce',
        text: `<p>Uniforms and strict dress codes promote respect and eliminate distractions in learning environments. When everyone dresses similarly, classroom focus shifts from fashion competition to academic achievement. Clear rules teach professionalism and prepare students for workplace expectations where appearance standards matter.</p>
<p><span class="bad-evidence">If students look sharp and professional, they'll naturally act more seriously about their education—that's just human psychology.</span> Strict codes eliminate distractions from inappropriate or revealing clothing that disrupts other students' ability to concentrate on lessons.</p>
<p>Detailed dress codes should be enforced consistently to maintain order and discipline. <span class="bad-evidence">Everyone knows that when you let kids wear whatever they want, chaos follows—schools become fashion shows instead of serious learning institutions.</span> Parents support clear standards eliminating daily arguments about appropriate school clothing while ensuring all students arrive ready to learn.</p>`,
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
        text: `<p>Requiring standalone financial literacy courses equips students with essential life skills in budgeting, credit management, investing, and avoiding predatory lending. These practical competencies directly impact students' economic wellbeing and long-term financial security, making them as fundamental as traditional academic subjects.</p>
<p><span class="good-evidence">States implementing financial literacy requirements report improved credit outcomes among young adults and reduced delinquency rates, according to research from the Council on Economic Education.</span> Dedicated courses prevent the topic from being marginalized or skipped when integrated into other classes where teachers may lack expertise or time.</p>
<p>Financial decisions affect everyone regardless of career path. <span class="good-evidence">A 2022 FINRA study found that young adults who took dedicated financial education courses were 40% more likely to save regularly and 35% less likely to carry excessive credit card debt.</span> Course requirements ensure equity—all students gain foundational knowledge, not just those whose families provide this education at home. <span class="good-evidence">Research from the Jump$tart Coalition shows that financial education is most effective when delivered in dedicated courses rather than brief unit integrations.</span></p>`,
      },
      {
        label: 'Article B',
        strength: 'weak',
        title: 'Why Financial Literacy Mandates Are Unnecessary',
        author: 'Howard Phillips',
        text: `<p>High school schedules are already overcrowded with required courses. Adding mandatory financial literacy creates additional bureaucratic requirements without clear benefits. Students can learn money management skills from parents, online resources, or optional workshops without consuming limited classroom time.</p>
<p><span class="bad-evidence">Kids will just learn personal finance from their parents like everyone has for generations—schools don't need to teach everything.</span> Most financial concepts are common sense that students will understand naturally when they need them. Requiring entire courses seems like overkill for topics that could be covered in brief units.</p>
<p>Optional after-school programs or online modules provide sufficient access without mandatory course requirements. <span class="bad-evidence">It's obvious that motivated students will seek out this information when they need it, and unmotivated students won't pay attention anyway.</span> Schools should focus on core academics rather than expanding graduation requirements that delay students' progress toward diplomas and careers.</p>`,
      },
    ],
  },
];

export default essayPassages;
