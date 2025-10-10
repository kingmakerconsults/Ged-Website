// Minimal AppData module: exports AppData.

export const AppData = {
	"Science": {
		icon: "BeakerIcon",
		categories: {
			"Life Science": {
				description: "Cell biology, ecology, and genetics.",
				topics: [
					{ id: "sci_life_science_basics", title: "Life Science Basics", quizzes: [] }
				]
			},
			"Physical Science": {
				description: "Chemistry & Physics fundamentals.",
				topics: [
					{ id: "sci_chem_fundamentals", title: "Chemistry Fundamentals", quizzes: [] }
				]
			}
		}
	},
	"Math": {
		icon: "CalculatorIcon",
		categories: {
			"Quantitative Problem Solving": {
				description: "Arithmetic and data interpretation.",
				topics: [
					{ id: "math_quant_basics", title: "Whole Numbers & Fractions", quizzes: [] }
				]
			},
			"Algebraic Problem Solving": {
				description: "Expressions, equations, graphing.",
				topics: [
					{ id: "math_alg_expressions", title: "Expressions & Polynomials", quizzes: [] }
				]
			}
		}
	},
	"Social Studies": {
		icon: "GlobeIcon",
		categories: {
			"U.S. History": {
				description: "Key events and documents.",
				topics: [
					{ id: "ss_us_history", title: "U.S. History", quizzes: [] }
				]
			},
			"Civics & Government": {
				description: "How government works.",
				topics: [
					{ id: "ss_civics", title: "Civics", quizzes: [] }
				]
			}
		}
	},
	"Reasoning Through Language Arts (RLA)": {
		icon: "BookOpenIcon",
		categories: {
			"Reading Comprehension": {
				description: "Practice reading and evidence.",
				topics: [
					{ id: "rla_reading", title: "Reading Practice", quizzes: [] }
				]
			},
			"Language & Grammar": {
				description: "Conventions and usage.",
				topics: [
					{ id: "rla_grammar", title: "Grammar Practice", quizzes: [] }
				]
			}
		}
	}
};

// Also populate global for any legacy code that expects window.AppData
if (typeof window !== 'undefined') {
    window.AppData = window.AppData || {};
    Object.assign(window.AppData, AppData);
}

export default AppData;
// Check for misplaced else or missing if/else blocks.
			else if(t===2){ const b=(i+seedOffset)%30+5, ht=(i*3+seedOffset)%20+4; questions.push({ questionNumber:i, type:'knowledge', question:`Area of triangle base=${b}, height=${ht}`, answerOptions: mkOptions(String(0.5*b*ht), [String(b*ht), String(b+ht), String(Math.round(0.25*b*ht))]) }); }
			else if(t===3){ const l=(i+seedOffset)%10+3, w=(i*2+seedOffset)%8+2, h=(i*3+seedOffset)%6+2; questions.push({ questionNumber:i, type:'knowledge', question:`Volume of rectangular prism l=${l}, w=${w}, h=${h}`, answerOptions: mkOptions(String(l*w*h), [String(l*w + h), String(l+w+h), String(Math.round((l*w*h)/2))]) }); }
			else { const r=(i+seedOffset)%7+2, h=(i*2+seedOffset)%10+3; questions.push({ questionNumber:i, type:'knowledge', question:`Volume of cylinder radius=${r}, height=${h} (π≈3.14)`, answerOptions: mkOptions(String(Math.round(3.14*r*r*h*100)/100), ['0','1','100']) }); }
		}
		questions.forEach((q,idx)=>q.questionNumber=idx+1);
		return { id:idPrefix, title:titlePrefix, questions };
	}

	// --- Science (kept simple collection) ---
	window.AppData = window.AppData || {};
	window.AppData["Science"] = {
		icon: "BeakerIcon",
		categories: {
			"Life Science": {
				description: "Explore the fundamental principles of living organisms.",
				topics: [
					{ id:"sci_life_science_basics", title:"Life Science Basics", description:"Cell structure, photosynthesis, genetics.", quizzes: [
						{ id:"sci_life_science_basics_quizA", title:"Life Science Basics — Quiz A", questions: [] },
						{ id:"sci_life_science_basics_quizB", title:"Life Science Basics — Quiz B", questions: [] }
					] }
				]
			},
			"Physical Science": { description: "Chemistry & Physics fundamentals.", topics: [ { id:"sci_chem_fundamentals", title:"Chemistry Fundamentals", quizzes: [] } ] },
			"Earth & Space Science": { description: "Planetary and Earth systems.", topics: [ { id:"sci_earth_space", title:"Earth & Space Systems", quizzes: [] } ] }
		}
	};

	// --- Math structure (programmatic quizzes attached) ---
	window.AppData["Math"] = {
		icon: "CalculatorIcon",
		categories: {
			"Quantitative Problem Solving": {
				description: "Solve problems using numbers, data, and statistics.",
				icon: "ChartBarIcon",
				topics: [
					{ id:"math_quant_basics", title:"Whole Numbers, Fractions & Decimals", description:"Operations with integers, fractions, and decimals.", type:"quiz", quizzes: [ generateArithmeticQuiz("math_quant_basics_quizA","Whole Numbers, Fractions & Decimals — Quiz A",0), generateArithmeticQuiz("math_quant_basics_quizB","Whole Numbers, Fractions & Decimals — Quiz B",7) ] },
					{ id:"math_quant_ratios_percents", title:"Ratios, Proportions & Percents", description:"Solving real-world problems with ratios and percentages.", type:"quiz", quizzes:[ generateRatioPercentQuiz("math_quant_ratios_quizA","Ratios, Proportions & Percents — Quiz A",1), generateRatioPercentQuiz("math_quant_ratios_quizB","Ratios, Proportions & Percents — Quiz B",9) ] },
					{ id:"math_quant_stats_probability", title:"Statistics & Probability", description:"Mean, median, mode and basic probability.", type:"quiz", quizzes:[ generateStatsQuiz("math_quant_stats_quizA","Statistics & Probability — Quiz A",2), generateStatsQuiz("math_quant_stats_quizB","Statistics & Probability — Quiz B",11) ] }
				]
			},
			"Algebraic Problem Solving": {
				description: "Expressions, equations, graphing, and functions.",
				icon: "VariableIcon",
				topics: [
					{ id:"math_alg_expressions", title:"Expressions & Polynomials", type:"quiz", quizzes:[ generateAlgebraExpressions("math_alg_expressions_quizA","Expressions & Polynomials — Quiz A",3), generateAlgebraExpressions("math_alg_expressions_quizB","Expressions & Polynomials — Quiz B",13) ] },
					{ id:"math_alg_equations_inequalities", title:"Equations & Inequalities", type:"quiz", quizzes:[ generateAlgebraEquations("math_alg_equations_quizA","Equations & Inequalities — Quiz A",4), generateAlgebraEquations("math_alg_equations_quizB","Equations & Inequalities — Quiz B",14) ] },
					{ id:"math_alg_graphing_functions", title:"Graphing & Functions", type:"quiz", quizzes:[ generateAlgebraGraphing("math_alg_graphing_quizA","Graphing & Functions — Quiz A",5), generateAlgebraGraphing("math_alg_graphing_quizB","Graphing & Functions — Quiz B",15) ] },
					{ id:"sim_graphing_tool", title:"Interactive Graphing Tool", type:"graphing_tool" }
				]
			},
			"Geometry": {
				description: "Calculate area, perimeter, volume, and apply geometric theorems.",
				icon: "ShapesIcon",
				topics: [
					{ id:"math_geom_basics", title:"Geometry Basics", description:"Calculating area, perimeter, volume, and surface area.", type:"quiz", quizzes:[ generateGeometryQuiz("math_geom_basics_quizA","Geometry Basics — Quiz A",6), generateGeometryQuiz("math_geom_basics_quizB","Geometry Basics — Quiz B",17) ] },
					{ id:"sim_geometry_generator", title:"Geometry Practice Tool", description:"Generate and solve infinite practice problems for various geometric shapes.", type:"geometry_practice_tool" }
				]
			}
		}
	};

	// --- Enhanced Social Studies + Programmatic RLA ---
	// Social Studies: mixed question types, rationales, small inline SVG assets.
	(function(){
		const svgCapitol = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#fff"/><g stroke="#111" stroke-width="2" fill="none"><path d="M40 140 L280 140 L160 40 Z"/><rect x="90" y="100" width="140" height="40"/></g><text x="160" y="30" font-size="14" text-anchor="middle" fill="#111">Capitol Building (schematic)</text></svg>');
		const svgMap = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#fff"/><g fill="#cfe"><rect x="20" y="20" width="120" height="60" stroke="#2a2"/><rect x="180" y="60" width="100" height="80" stroke="#22a"/></g><text x="160" y="170" font-size="12" text-anchor="middle" fill="#111">Simplified regional map</text></svg>');

		// small pools per topic
		const usHistoryPool = [
			{ type:'knowledge', question: "Which document declared the American colonies independent from Britain (1776)?", correct:{text:"Declaration of Independence", rationale:"Formally announced separation from Britain."}, decoys:[{text:"Constitution", rationale:"Adopted later (1787)."}, {text:"Bill of Rights", rationale:"First 10 amendments (1791)."}, {text:"Mayflower Compact", rationale:"1620 compact, not a declaration."}]},
			{ type:'passage', passage: "<p><strong>Excerpt:</strong> The Stamp Act of 1765 imposed direct taxes on the colonies; colonists organized boycotts in protest.</p>", questions:[ { question:"What was a common colonial response to the Stamp Act?", correct:{text:"Boycotts of British goods", rationale:"Non-importation was widely used."}, decoys:[{text:"Immediate declaration of independence", rationale:"Too early for that."},{text:"Widespread acceptance", rationale:"Colonists opposed the tax."}] } ] },
			{ type:'image', imageUrl: svgCapitol, question:"The schematic above represents a capitol-style building. Which branch works here?", correct:{text:"Legislative branch", rationale:"Capitols usually house legislatures."}, decoys:[{text:"Judicial branch", rationale:"Courthouses house judiciary."},{text:"Executive branch", rationale:"Executive offices differ."} ] }
		];

		const civicsPool = [
			{ type:'knowledge', question:"How many branches are in the U.S. federal government?", correct:{text:"Three", rationale:"Legislative, Executive, Judicial."}, decoys:[{text:"Two", rationale:"Incorrect."},{text:"Four", rationale:"Incorrect."}]},
			{ type:'passage', passage:"<p>The Constitution divides power among three branches to prevent concentration of power.</p>", questions:[ { question:"What is the purpose of checks and balances?", correct:{text:"Prevent concentration of power", rationale:"Designed to limit abuses by any one branch."}, decoys:[{text:"Speed up lawmaking", rationale:"Often slows decisions."},{text:"Eliminate the judiciary", rationale:"Opposite of intent."}] } ] },
			{ type:'image', imageUrl: svgMap, question:"The map shows regions with different policies. Which concept is illustrated?", correct:{text:"Federalism", rationale:"Division of power between national and state governments."}, decoys:[{text:"Unicameralism", rationale:"Single chamber legislature."},{text:"Judicial review", rationale:"Courts interpret laws."}] }
		];

		const economicsPool = [
			{ type:'knowledge', question:"What does GDP measure?", correct:{text:"Total value of goods and services produced", rationale:"GDP sums production in an economy."}, decoys:[{text:"Unemployment rate", rationale:"Different indicator."},{text:"Inflation only", rationale:"Different concept."}] },
			{ type:'passage', passage:"<p>Inflation is a rise in general price levels; central banks may raise interest rates to cool the economy.</p>", questions:[ { question:"What tool might a central bank use to reduce inflation?", correct:{text:"Raise interest rates", rationale:"Higher rates reduce borrowing/spending."}, decoys:[{text:"Lower reserve requirements", rationale:"Would increase money supply."},{text:"Cut taxes", rationale:"Fiscal, often increases demand."}] } ] }
		];

		const geographyPool = [
			{ type:'knowledge', question:"Which line divides Earth into Northern and Southern Hemispheres?", correct:{text:"Equator", rationale:"Equator is 0° latitude."}, decoys:[{text:"Prime Meridian", rationale:"Divides east/west."},{text:"Tropic of Cancer", rationale:"Parallel north of equator."}] },
			{ type:'image', imageUrl: svgMap, question:"Using the map above: which label best marks a coastal region important for trade?", correct:{text:"Port / coastal area", rationale:"Ports facilitate maritime trade."}, decoys:[{text:"Inland plateau", rationale:"Not for maritime trade."},{text:"Mountain pass", rationale:"Not associated with ports."}] },
			{ type:'passage', passage:"<p>Time zones follow longitude lines roughly every 15 degrees.</p>", questions:[ { question:"What determines primary divisions of time zones?", correct:{text:"Longitude", rationale:"Longitude determines east/west position."}, decoys:[{text:"Latitude", rationale:"North/south measure."},{text:"Elevation", rationale:"Not relevant."}] } ] }
		];

		function buildQuizFromPool(id, title, pool, offset=0){ return generateQuizFromPool(id,title,pool,offset); }

		const usHistoryA = buildQuizFromPool("ss_us_history_quizA","U.S. History — Quiz A",usHistoryPool,0);
		const usHistoryB = buildQuizFromPool("ss_us_history_quizB","U.S. History — Quiz B",usHistoryPool,3);
		const civicsA = buildQuizFromPool("ss_civics_quizA","Civics & Government — Quiz A",civicsPool,0);
		const civicsB = buildQuizFromPool("ss_civics_quizB","Civics & Government — Quiz B",civicsPool,2);
		const econA = buildQuizFromPool("ss_economics_quizA","Economics — Quiz A",economicsPool,0);
		const econB = buildQuizFromPool("ss_economics_quizB","Economics — Quiz B",economicsPool,4);
		const geoA = buildQuizFromPool("ss_geography_quizA","Geography — Quiz A",geographyPool,0);
		const geoB = buildQuizFromPool("ss_geography_quizB","Geography — Quiz B",geographyPool,5);

		window.AppData = window.AppData || {};
		window.AppData["Social Studies"] = {
			icon: "GlobeIcon",
			categories: {
				"U.S. History": {
					description: "History of the United States from colonization to modern times.",
					topics: [{ id:"ss_us_history", title:"U.S. History", description:"Key events and documents.", quizzes:[usHistoryA, usHistoryB] }]
				},
				"Civics & Government": {
					description: "How government works and civic responsibilities.",
					topics: [{ id:"ss_civics_government", title:"Civics & Government", description:"Structure of government and citizen roles.", quizzes:[civicsA, civicsB] }]
				},
				"Economics": {
					description: "Basic economic principles and real-world application.",
					topics: [{ id:"ss_economics", title:"Economics", description:"Micro and macro concepts.", quizzes:[econA, econB] }]
				},
				"Geography and the World": {
					description: "Maps, regions, and spatial thinking.",
					topics: [{ id:"ss_geography_world", title:"Geography & the World", description:"Maps, regions, and spatial thinking.", quizzes:[geoA, geoB] }]
				}
			}
		};
	})();

	// --- Programmatic RLA (Reasoning Through Language Arts) ---
	(function(){
		function mkOptionsR(correct, decoys){ return mkOptions(correct, decoys); }

		const passages = [
			{ title:"Urban Garden Initiative", text:"<p>Community gardens transform vacant lots into sources of fresh produce, provide green space, and strengthen neighborhood ties. Volunteers report improved well-being and local food access.</p>", questions:[
				{ question:"What is a primary benefit of community gardens mentioned in the passage?", correct:{text:"Improved local food access", rationale:"Passage explicitly mentions fresh produce access."}, decoys:[{text:"Increased property taxes", rationale:"Not mentioned."},{text:"Commercial farm profits", rationale:"Not discussed."}] },
				{ question:"Which detail supports that gardens strengthen communities?", correct:{text:"Volunteers report improved well-being", rationale:"Volunteer experience supports social benefit."}, decoys:[{text:"They are profitable businesses", rationale:"Profitability not stated."},{text:"They remove all vacant lots", rationale:"Not claimed."}] }
			]},
			{ title:"Automated Checkouts", text:"<p>Self-checkout lanes bring convenience but also raise questions about job displacement and customer error. Stores balance efficiency with support staff to assist customers.</p>", questions:[
				{ question:"What concern does the passage raise about self-checkout lanes?", correct:{text:"Job displacement", rationale:"Passage cites jobs as a concern."}, decoys:[{text:"Higher manual labor", rationale:"Opposite effect."},{text:"Better food quality", rationale:"Not discussed."}] },
				{ question:"Which solution balances efficiency and errors?", correct:{text:"Support staff to assist customers", rationale:"Support staff are mentioned."}, decoys:[{text:"Remove all staff", rationale:"Worsens the issue."},{text:"Charge fees for errors", rationale:"Not mentioned."}] }
			]}
		];

		const grammarPool = [
			{ question:"Choose the sentence that uses commas correctly.", correct:{text:"After dinner, we went for a walk.", rationale:"Introductory phrase followed by comma."}, decoys:[{text:"After dinner we went, for a walk.", rationale:"Comma misplaced."},{text:"After dinner we, went for a walk.", rationale:"Comma splits subject and verb."}] },
			{ question:"Which word completes: She has ____ to the store.", correct:{text:"gone", rationale:"'has gone' is present perfect."}, decoys:[{text:"went", rationale:"Simple past; doesn't pair with 'has'."},{text:"goneing", rationale:"Not a word."}] },
			{ question:"Select the sentence with correct subject-verb agreement.", correct:{text:"The team is practicing today.", rationale:"Collective noun treated as singular."}, decoys:[{text:"The team are practicing today.", rationale:"British variant but not typical here."},{text:"The teams is practicing today.", rationale:"Subject-verb mismatch."}] }
		];

		function buildPart1(){
			const qList=[];
			let idx=0;
			while(qList.length<15){
				const p = passages[idx % passages.length];
				const subq = p.questions[qList.length % p.questions.length];
				qList.push({ questionNumber:qList.length+1, type:'text', passage:`<h4>${p.title}</h4>`+p.text, question:subq.question, answerOptions: mkOptionsR(subq.correct, subq.decoys) });
				idx++;
			}
			return qList;
		}
		function buildPart3(){
			return Array.from({length:15}).map((_,i)=>({ questionNumber:i+1, type:'knowledge', question:grammarPool[i%grammarPool.length].question, answerOptions: mkOptionsR(grammarPool[i%grammarPool.length].correct, grammarPool[i%grammarPool.length].decoys) }));
		}

		const essayPrompt = "Write an argumentative essay: Should local governments prioritize funding for community green spaces (parks, gardens) over new commercial development? Use evidence from the passages to support your position.";
		const essayPassages = [{ title:"Benefits of Green Space", content:"Parks and gardens reduce heat islands, improve air quality, and provide recreation." }, { title:"Economic Arguments", content:"Commercial development increases tax revenue and jobs." }];

		const rlaQuiz = { id:'rla_programmatic_'+Date.now(), title:'RLA — Programmatic Multi-Part Exam', type:'multi-part-rla', subject:'Reasoning Through Language Arts (RLA)', part1_reading: buildPart1(), essayPrompt, essayPassages, part3_language: buildPart3() };

		window.AppData = window.AppData || {};
		window.AppData["Reasoning Through Language Arts (RLA)"] = {
			icon: "BookOpenIcon",
			categories: {
				"Reading Comprehension: Informational Texts": { description:"Practice with passages and evidence.", topics:[ { id:"rla_info_comprehensive", title:"Comprehensive RLA Practice", description:"Multi-part practice exam", type:'multi-part-rla', quizzes:[ rlaQuiz ] } ] },
				"Language & Grammar": { description:"Standard English conventions.", topics:[ { id:"rla_grammar_core", title:"Grammar & Usage Essentials", description:"Sentence structure and punctuation.", quizzes:[ { id:'rla_grammar_quizA', title:'Grammar Essentials — Quiz A', questions: buildPart3() }, { id:'rla_grammar_quizB', title:'Grammar Essentials — Quiz B', questions: buildPart3() } ] } ] }
			}
		};
	})();

	// final: ensure AppData global exists
	window.AppData = window.AppData || {};
})();

// Ensure the file still populates window.AppData as before, then export it for module consumers.
export const AppData = window.AppData || {};
		}
		// ensure questionNumbers sequential
		questions.forEach((q, idx) => q.questionNumber = idx+1);
		return { id: idPrefix, title: `${titlePrefix}`, questions };
	}

	// --- Enhanced Social Studies generators + Programmatic RLA (Reasoning Through Language Arts) ---
	// Replace previous simple Social Studies block with this enhanced pair of IIFEs.
	// - Social Studies: mixed question types, per-option rationales, images (inline SVG data URIs), two 15-question quizzes per topic.
	// - RLA: programmatic multi-part RLA quiz (part1 reading questions, essay prompt + passages, part3 grammar questions).
	(function(){
		// small helpers
		function shuffle(arr){ const a = arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
		function mkOptionsDetailed(correct, decoys){
			const opts = [{ text: String(correct.text || correct), rationale: correct.rationale || '', isCorrect: true }]
				.concat((decoys||[]).map(d=>({ text: String(d.text), rationale: d.rationale || '', isCorrect: false })));
			return shuffle(opts);
		}
		function mkOptionsSimple(correct, decoys){
			const opts = [{ text: String(correct.text || correct), rationale: correct.rationale || '', isCorrect: true }]
				.concat((decoys||[]).map(d=>({ text: String(d.text || d), rationale: d.rationale || '', isCorrect: false })));
			return shuffle(opts);
		}

		// small inline SVG assets (safe, small)
		const svgCapitol = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#fff"/><g stroke="#111" stroke-width="2" fill="none"><path d="M40 140 L280 140 L160 40 Z"/><rect x="90" y="100" width="140" height="40"/></g><text x="160" y="30" font-size="14" text-anchor="middle" fill="#111">Capitol Building (schematic)</text></svg>');
		const svgMap = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#fff"/><g fill="#cfe"><rect x="20" y="20" width="120" height="60" stroke="#2a2"/><rect x="180" y="60" width="100" height="80" stroke="#22a"/></g><text x="160" y="170" font-size="12" text-anchor="middle" fill="#111">Simplified regional map</text></svg>');

		// Generic quiz builder for 15-item quizzes from pools that may include 'knowledge', 'passage', 'image'
		function generateQuizFromPool(idPrefix, titlePrefix, pool, seedOffset=0){
			const questions = [];
			for(let i=0;i<15;i++){
				const item = pool[(i+seedOffset) % pool.length];
				const qNum = i+1;
				if(item.type === 'passage'){
					const qObj = {
						questionNumber: qNum,
						type: 'text',
						passage: item.passage,
						question: item.questions[(i+seedOffset) % item.questions.length].question,
						answerOptions: mkOptionsDetailed(item.questions[(i+seedOffset) % item.questions.length].correct, item.questions[(i+seedOffset) % item.questions.length].decoys)
					};
					questions.push(qObj);
				} else if(item.type === 'image'){
					questions.push({
						questionNumber: qNum,
						type: 'image',
						imageUrl: item.imageUrl,
						question: item.question,
						answerOptions: mkOptionsDetailed(item.correct, item.decoys)
					});
				} else {
					questions.push({
						questionNumber: qNum,
						type: 'knowledge',
						question: item.question,
						answerOptions: mkOptionsDetailed(item.correct, item.decoys)
					});
				}
			}
			return { id: idPrefix, title: titlePrefix, questions };
		}

		// Pools (concise, each entry contains rationales)
		const usHistoryPool = [
			{ type:'knowledge', question: "Which document declared the American colonies independent from Britain (1776)?", correct: { text: "Declaration of Independence", rationale: "Formally announced separation from Britain." }, decoys: [ { text: "Constitution", rationale: "Adopted later (1787) to create the federal government." }, { text: "Bill of Rights", rationale: "The first 10 amendments, ratified 1791." }, { text: "Mayflower Compact", rationale: "An early colonial social contract (1620), not a declaration of independence." } ] },
			{ type:'passage', passage: "<p><strong>Excerpt:</strong> The Stamp Act of 1765 imposed direct taxes on the colonies to raise revenue for Britain. Colonists objected to taxation without representation and organized boycotts of British goods.</p>", questions: [
				{ question: "What was a primary colonial reaction to the Stamp Act?", correct: { text: "Boycotts of British goods", rationale: "Nonimportation and boycott were common protest methods." }, decoys: [ { text: "Immediate declaration of independence", rationale: "Independence movement developed later." }, { text: "Acceptance without protest", rationale: "Colonists protested the tax." } ] }
			] },
			{ type:'image', imageUrl: svgCapitol, question: "The schematic above represents a capitol-style building. Which branch of government primarily works in this kind of building?", correct: { text: "Legislative branch", rationale: "Capitol buildings typically house legislative bodies (e.g., Congress)." }, decoys: [ { text: "Judicial branch", rationale: "Courthouses house the judiciary." }, { text: "Executive branch", rationale: "Executive offices (White House) differ." } ] },
			{ type:'knowledge', question: "Which purchase doubled the size of the U.S. in 1803?", correct: { text: "Louisiana Purchase", rationale: "Acquired from France; greatly expanded territory." }, decoys: [ { text: "Alaska Purchase", rationale: "Purchased in 1867." }, { text: "Gadsden Purchase", rationale: "1853 purchase for a southern railroad." } ] },
			{ type:'knowledge', question: "Which amendment abolished slavery in the United States?", correct: { text: "13th Amendment", rationale: "Ended slavery after the Civil War." }, decoys: [ { text: "14th Amendment", rationale: "Addresses citizenship and equal protection." }, { text: "15th Amendment", rationale: "Addresses voting rights regardless of race." } ] }
		];

		const civicsPool = [
			{ type:'knowledge', question: "How many branches are in the U.S. federal government?", correct: { text: "Three", rationale: "Legislative, Executive, Judicial." }, decoys: [ { text: "Two", rationale: "Confuses separation of powers." }, { text: "Four", rationale: "Not part of U.S. federal structure." } ] },
			{ type:'passage', passage: "<p><strong>Passage:</strong> The Constitution divides power among the three branches to prevent any one branch from becoming too powerful. This creates a system of checks and balances where each branch can limit the others.</p>", questions: [
				{ question: "What is the main purpose of checks and balances?", correct: { text: "Prevent concentration of power", rationale: "Designed to limit abuses by any single branch." }, decoys: [ { text: "Speed up lawmaking", rationale: "Checks and balances can slow decisions." }, { text: "Eliminate the judiciary", rationale: "Opposite of system intent." } ] }
			] },
			{ type:'image', imageUrl: svgMap, question: "The simplified regional map above shows two shaded areas. Which concept is best illustrated by different regions having different policies and laws?", correct: { text: "Federalism", rationale: "Federalism divides power between national and state governments." }, decoys: [ { text: "Unicameralism", rationale: "Refers to single legislative chamber." }, { text: "Judicial review", rationale: "Courts interpret laws, not regional policy differences." } ] },
			{ type:'knowledge', question: "Which amendment guarantees freedom of speech?", correct: { text: "First Amendment", rationale: "Protects speech, religion, press, assembly, petition." }, decoys: [ { text: "Second Amendment", rationale: "Right to bear arms." }, { text: "Fifth Amendment", rationale: "Rights in criminal cases." } ] },
			{ type:'knowledge', question: "Who has the power to veto a bill?", correct: { text: "President", rationale: "Executive vetoes legislation passed by Congress." }, decoys: [ { text: "Supreme Court", rationale: "Can rule laws unconstitutional, not veto bills." }, { text: "Speaker of the House", rationale: "Leads chamber but cannot veto." } ] }
		];

		const economicsPool = [
			{ type:'knowledge', question: "What is GDP a measure of in an economy?", correct: { text: "Total value of goods and services produced", rationale: "GDP sums production within an economy over a period." }, decoys: [ { text: "Unemployment rate", rationale: "Different economic indicator." }, { text: "Inflation only", rationale: "Inflation measures price change, not total production." } ] },
			{ type:'passage', passage: "<p><strong>Excerpt:</strong> Inflation occurs when the overall price level rises and purchasing power falls. Central banks monitor inflation and may raise interest rates to cool the economy.</p>", questions: [
				{ question: "What tool might a central bank use to reduce inflation?", correct: { text: "Raise interest rates", rationale: "Higher rates typically reduce borrowing and spending." }, decoys: [ { text: "Lower reserve requirements", rationale: "Would generally increase money supply." }, { text: "Cut taxes", rationale: "Fiscal move that may increase demand." } ] }
			] },
			{ type:'knowledge', question: "When prices rise across the economy, this is called:", correct: { text: "Inflation", rationale: "General increase in price levels." }, decoys: [ { text: "Deflation", rationale: "General decrease in price levels." }, { text: "Recession", rationale: "A decline in economic activity, not the price trend." } ] },
			{ type:'knowledge', question: "A market with many buyers and many sellers and free entry is called:", correct: { text: "Perfect competition", rationale: "Theoretical market with many firms, no barriers." }, decoys: [ { text: "Monopoly", rationale: "Single seller dominates market." }, { text: "Oligopoly", rationale: "Few firms dominate market." } ] },
			{ type:'knowledge', question: "When the central bank lowers interest rates, it usually aims to:", correct: { text: "Stimulate borrowing and spending", rationale: "Lower rates encourage loans and investment." }, decoys: [ { text: "Reduce borrowing", rationale: "Opposite effect." }, { text: "Increase unemployment", rationale: "Generally not the objective." } ] }
		];

		const geographyPool = [
			{ type:'knowledge', question: "Which line divides Earth into Northern and Southern Hemispheres?", correct: { text: "Equator", rationale: "Equator is 0° latitude." }, decoys: [ { text: "Prime Meridian", rationale: "Divides east/west hemispheres (0° longitude)." }, { text: "Tropic of Cancer", rationale: "Parallel north of equator." } ] },
			{ type:'image', imageUrl: svgMap, question: "Using the simplified map above: which label would best mark a coastal region important for trade?", correct: { text: "Port / coastal area", rationale: "Ports are key for trade; the shaded coastal area indicates that." }, decoys: [ { text: "Inland plateau", rationale: "Not suited for maritime trade." }, { text: "High mountain pass", rationale: "Not typically associated with trade ports." } ] },
			{ type:'passage', passage: "<p><strong>Passage:</strong> Time zones follow longitude lines roughly every 15 degrees; local solar time differs as one moves east or west.</p>", questions: [
				{ question: "What determines the primary divisions of time zones?", correct: { text: "Longitude", rationale: "Longitude determines position east/west; time zones tied to longitude." }, decoys: [ { text: "Latitude", rationale: "Latitude measures north/south, not time zones." }, { text: "Elevation", rationale: "Elevation affects climate, not timekeeping." } ] }
			] },
			{ type:'knowledge', question: "A region with similar climate, landforms, and vegetation is called a:", correct: { text: "Biome", rationale: "Biomes are large ecological areas with similar conditions." }, decoys: [ { text: "Country", rationale: "Political unit, not ecological." }, { text: "Watershed", rationale: "Area draining to a watercourse, different concept." } ] },
			{ type:'knowledge', question: "Which term describes movement of people into a country to live?", correct: { text: "Immigration", rationale: "Immigration = into a country; emigration = out." }, decoys: [ { text: "Emigration", rationale: "Leaving one's country." }, { text: "Nomadism", rationale: "Lifestyle of moving frequently, not permanent entry." } ] }
		];

		// build quizzes
		const usHistoryA = generateQuizFromPool("ss_us_history_quizA","U.S. History — Quiz A", usHistoryPool, 0);
		const usHistoryB = generateQuizFromPool("ss_us_history_quizB","U.S. History — Quiz B", usHistoryPool, 4);
		const civicsA = generateQuizFromPool("ss_civics_quizA","Civics & Government — Quiz A", civicsPool, 0);
		const civicsB = generateQuizFromPool("ss_civics_quizB","Civics & Government — Quiz B", civicsPool, 3);
		const econA = generateQuizFromPool("ss_economics_quizA","Economics — Quiz A", economicsPool, 0);
		const econB = generateQuizFromPool("ss_economics_quizB","Economics — Quiz B", economicsPool, 5);
		const geoA = generateQuizFromPool("ss_geography_quizA","Geography — Quiz A", geographyPool, 0);
		const geoB = generateQuizFromPool("ss_geography_quizB","Geography — Quiz B", geographyPool, 6);

		// attach Social Studies
		window.AppData = window.AppData || {};
		window.AppData["Social Studies"] = {
			icon: "GlobeIcon",
			categories: {
				"U.S. History": {
					description: "History of the United States from colonization to modern times.",
					topics: [{ id:"ss_us_history", title:"U.S. History", description:"Key events, documents, and people.", quizzes:[usHistoryA, usHistoryB] }]
				},
				"Civics & Government": {
					description: "How government works, rights, and civic responsibilities.",
					topics: [{ id:"ss_civics_government", title:"Civics & Government", description:"Structure of government and citizen roles.", quizzes:[civicsA, civicsB] }]
				},
				"Economics": {
					description: "Basic economic principles and the U.S. economy.",
					topics: [{ id:"ss_economics", title:"Economics", description:"Micro and macro concepts.", quizzes:[econA, econB] }]
				},
				"Geography and the World": {
					description: "Physical and human geography, maps, and spatial thinking.",
					topics: [{ id:"ss_geography_world", title:"Geography & the World", description:"Maps, regions, and spatial thinking.", quizzes:[geoA, geoB] }]
				}
			}
		};
	})();

	// Programmatic RLA (multi-part) — Part 1 reading, Part 2 essay prompt + passages, Part 3 grammar
	(function(){
		function shuffle(arr){ const a = arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
		function mkOptions(correct, decoys){
			return shuffle([{ text: String(correct.text || correct), isCorrect: true, rationale: correct.rationale || '' }].concat((decoys||[]).map(d=>({ text: String(d.text), isCorrect: false, rationale: d.rationale || '' }))));
		}

		const passages = [
			{
				title: "Urban Garden Initiative",
				text: "<p>Community gardens transform vacant lots into sources of fresh produce, provide green space, and strengthen neighborhood ties. Volunteers report improved well-being and local food access.</p>",
				questions: [
					{ question: "What is a primary benefit of community gardens mentioned in the passage?", correct: { text: "Improved local food access", rationale: "The passage explicitly names access to fresh produce." }, decoys: [ { text: "Increase in property taxes", rationale: "Not mentioned." }, { text: "Commercial farming profits", rationale: "Passage focuses on community benefits." } ] },
					{ question: "Which detail best supports the idea that gardens strengthen communities?", correct: { text: "Volunteers report improved well-being", rationale: "Volunteer experiences indicate social/health benefits." }, decoys: [ { text: "They are profitable businesses", rationale: "Profitability not discussed." }, { text: "They eliminate all vacant lots", rationale: "Passage doesn't claim elimination." } ] }
				]
			},
			{
				title: "Automated Checkouts",
				text: "<p>Self-checkout lanes bring convenience but also raise questions about job displacement and customer error. Stores balance efficiency with support staff to assist customers.</p>",
				questions: [
					{ question: "What concern does the passage raise about self-checkout lanes?", correct: { text: "Job displacement", rationale: "The passage mentions jobs as a concern." }, decoys: [ { text: "Increased manual labor", rationale: "Opposite effect." }, { text: "Higher product quality", rationale: "Not discussed." } ] },
					{ question: "Which solution is noted to balance efficiency and errors?", correct: { text: "Support staff to assist customers", rationale: "Support staff are mentioned as a balancing measure." }, decoys: [ { text: "Complete removal of staff", rationale: "Would worsen the issue." }, { text: "Charging extra fees for errors", rationale: "Not mentioned." } ] }
				]
			}
		];

		const grammarPool = [
			{ question: "Choose the sentence that uses commas correctly.", correct: { text: "After dinner, we went for a walk.", rationale: "Introductory phrase correctly followed by comma." }, decoys: [ { text: "After dinner we went, for a walk.", rationale: "Comma is misplaced." }, { text: "After dinner we, went for a walk.", rationale: "Comma incorrectly splits subject/verb." } ] },
			{ question: "Which word correctly completes the sentence: She has ____ to the store.", correct: { text: "gone", rationale: "'Has gone' is present perfect for movement to a place." }, decoys: [ { text: "went", rationale: "'Went' is simple past and doesn't pair with 'has'." }, { text: "goneing", rationale: "Not a word." } ] },
			{ question: "Select the sentence with correct subject-verb agreement.", correct: { text: "The team is practicing today.", rationale: "Collective noun 'team' treated as singular here." }, decoys: [ { text: "The team are practicing today.", rationale: "Plural verb sometimes used in British English but not typical here." }, { text: "The teams is practicing today.", rationale: "Mismatch between plural subject and singular verb." } ] }
		];

		function buildPart1(){
			const qList = [];
			let idx = 0;
			while(qList.length < 15){
				const p = passages[idx % passages.length];
				const subq = p.questions[qList.length % p.questions.length];
				qList.push({
					questionNumber: qList.length + 1,
					type: 'text',
					passage: `<h4>${p.title}</h4>` + p.text,
					question: subq.question,
					answerOptions: mkOptions(subq.correct, subq.decoys)
				});
				idx++;
			}
			return qList;
		}

		function buildPart3(){
			const arr = [];
			for(let i=0;i<15;i++){
				const g = grammarPool[i % grammarPool.length];
				arr.push({
					questionNumber: i+1,
					type: 'knowledge',
					question: g.question,
					answerOptions: mkOptions(g.correct, g.decoys)
				});
			}
			return arr;
		}

		const essayPrompt = "Write an argumentative essay: Should local governments prioritize funding for community green spaces (parks, gardens) over new commercial development? Use evidence from the passages to support your position.";
		const essayPassages = [
			{ title: "Benefits of Green Space", content: "Parks and gardens reduce heat islands, improve air quality, and provide recreation. Studies show mental health benefits from regular access to green space." },
			{ title: "Economic Arguments", content: "Commercial development increases tax revenue and jobs. Some argue that economic growth funds public services, including parks." }
		];

		const rlaQuiz = {
			id: 'rla_comprehensive_generated_' + Date.now(),
			title: 'RLA — Programmatic Multi-Part Exam',
			type: 'multi-part-rla',
			subject: 'Reasoning Through Language Arts (RLA)',
			part1_reading: buildPart1(),
			essayPrompt: essayPrompt,
			essayPassages: essayPassages,
			part3_language: buildPart3()
		};

		window.AppData = window.AppData || {};
		window.AppData["Reasoning Through Language Arts (RLA)"] = {
			icon: "BookOpenIcon",
			categories: {
				"Reading Comprehension: Informational Texts": {
					description: "Practice with passages, evidence, and argument analysis.",
					topics: [
						{
							id: "rla_info_comprehensive",
							title: "Comprehensive RLA Practice",
							description: "Multi-part practice exam (Reading, Essay, Language).",
							type: 'multi-part-rla',
							quizzes: [ rlaQuiz ]
						}
					]
				},
				"Language & Grammar": {
					description: "Standard English conventions and usage.",
					topics: [
						{
							id: "rla_grammar_core",
							title: "Grammar & Usage Essentials",
							description: "Sentence structure, punctuation, and agreement.",
							quizzes: [
								{ id: 'rla_grammar_quizA', title: 'Grammar Essentials — Quiz A', questions: buildPart3Language() },
								{ id: 'rla_grammar_quizB', title: 'Grammar Essentials — Quiz B', questions: buildPart3Language() }
							]
						}
					]
				}
			}
		};
	})();

})();
							quizzes: [ rlaQuiz ]
						}
					]
				},
				"Language & Grammar": {
					description: "Standard English conventions and usage.",
					topics: [
						{
							id: "rla_grammar_core",
							title: "Grammar & Usage Essentials",
							description: "Sentence structure, punctuation, and agreement.",
							quizzes: [
								{ id: 'rla_grammar_quizA', title: 'Grammar Essentials — Quiz A', questions: buildPart3Language() },
								{ id: 'rla_grammar_quizB', title: 'Grammar Essentials — Quiz B', questions: buildPart3Language() }
							]
						}
					]
				}
			}
		};
	})();

})();
						]
					},
					{
						id: "math_alg_graphing_functions",
						title: "Graphing & Functions",
						description: "Understanding slope, graphing lines, and function notation.",
						type: "quiz",
						quizzes: [
							generateAlgebraGraphing("math_alg_graphing_quizA", "Graphing & Functions — Quiz A", 5),
							generateAlgebraGraphing("math_alg_graphing_quizB", "Graphing & Functions — Quiz B", 15)
						]
					},
					{
						id: "sim_graphing_tool",
						title: "Interactive Graphing Tool",
						description: "Plot linear equations and explore the coordinate plane.",
						type: "graphing_tool"
					}
				]
			},
			"Geometry": {
				description: "Calculate area, perimeter, volume, and apply geometric theorems.",
				icon: "ShapesIcon",
				topics: [
					{
						id: "math_geom_basics",
						title: "Geometry Basics",
						description: "Calculating area, perimeter, volume, and surface area.",
						type: "quiz",
						quizzes: [
							generateGeometryQuiz("math_geom_basics_quizA", "Geometry Basics — Quiz A", 6),
							generateGeometryQuiz("math_geom_basics_quizB", "Geometry Basics — Quiz B", 17)
						]
					},
					{
						id: "sim_geometry_generator",
						title: "Geometry Practice Tool",
						description: "Generate and solve infinite practice problems for various geometric shapes.",
						type: "geometry_practice_tool"
					}
				]
			}
		}
	};
})();
