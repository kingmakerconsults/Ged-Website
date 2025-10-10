import React, { useState, useEffect, useRef } from 'react';

export default function EssayGuide({ onExit = () => {} }) {
	const [timer, setTimer] = useState(45 * 60);
	const [timerActive, setTimerActive] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState(0);
	const [activeTab, setActiveTab] = useState('passages');
	const [essayText, setEssayText] = useState({ intro: '', body1: '', body2: '', body3: '', conclusion: '' });
	const [isScoring, setIsScoring] = useState(false);
	const [scoreResult, setScoreResult] = useState(null);
	const intervalRef = useRef(null);

	const passagesData = [
		{
			"topic": "The Causes and Effects of Climate Change",
			"content": "<p>Climate change is primarily caused by the increase of greenhouse gases in the Earth's atmosphere, which trap heat and cause the planet's average temperatures to rise. This phenomenon, known as the greenhouse effect, is largely driven by human activities, especially the burning of fossil fuels such as coal, oil, and natural gas. Deforestation, industrial processes, and agricultural practices also contribute significantly to greenhouse gas emissions.</p><p>The impacts of climate change are widespread and far-reaching, affecting natural ecosystems, weather patterns, sea levels, and biodiversity. One of the most significant effects is the increase in global temperatures, leading to more frequent and severe heatwaves, droughts, and wildfires. Additionally, climate change causes the polar ice caps and glaciers to melt, resulting in rising sea levels that threaten coastal communities and ecosystems.</p><p>Climate change also disrupts the delicate balance of ecosystems, leading to shifts in wildlife populations and habitats. Some species may face extinction if they cannot adapt quickly enough to the changing conditions. Furthermore, the increased frequency of extreme weather events, such as hurricanes and floods, poses direct threats to human life, infrastructure, and food security.</p>",
			"keywords": ["climate change", "greenhouse gases", "global warming", "deforestation", "fossil fuels"],
			"questions": [
				"What are the primary causes of climate change?",
				"How does climate change impact sea levels?",
				"What are the effects of climate change on biodiversity?",
				"How can we mitigate the impacts of climate change?",
				"What role do forests play in addressing climate change?"
			]
		},
		{
			"topic": "The Importance of Renewable Energy",
			"content": "<p>Renewable energy is crucial for a sustainable future as it provides an alternative to the conventional fossil fuels that are depleting rapidly and contributing to environmental degradation. Renewable energy sources, such as solar, wind, hydro, and geothermal, are abundant and can be replenished naturally. The use of renewable energy reduces greenhouse gas emissions, decreases air pollution, and helps combat climate change.</p><p>Solar energy, harnessed through photovoltaic cells or solar thermal systems, is a plentiful and clean source of energy that can be used for electricity generation, heating, and even transportation. Wind energy, captured through wind turbines, is another rapidly growing renewable energy source that can generate electricity with a minimal environmental footprint.</p><p>Hydropower, utilizing the energy of flowing or falling water, has been used for centuries and remains a significant source of renewable energy, especially in regions with abundant water resources. Geothermal energy exploits the Earth's internal heat for electricity generation and direct heating applications, offering a reliable and constant energy source.</p><p>Transitioning to renewable energy not only helps protect the environment but also enhances energy security, creates jobs, and stimulates economic growth. However, the shift towards renewable energy requires supportive policies, technological advancements, and significant investments in infrastructure and research and development.</p>",
			"keywords": ["renewable energy", "solar energy", "wind energy", "hydropower", "geothermal energy"],
			"questions": [
				"What are the benefits of renewable energy?",
				"How does solar energy work?",
				"What is the potential of wind energy?",
				"How can hydropower be harnessed?",
				"What are the challenges of transitioning to renewable energy?"
			]
		},
		{
			"topic": "The Dangers of Single-Use Plastics",
			"content": "<p>Single-use plastics, also known as disposable plastics, are designed to be used once and discarded. They include items like plastic bags, straws, utensils, and food containers. The convenience of single-use plastics has led to their widespread use, but they pose significant environmental hazards as they contribute to pollution and litter, particularly in oceans and waterways.</p><p>One of the main dangers of single-use plastics is that they are often not disposed of properly and can take hundreds of years to decompose in the environment. During this time, they break down into smaller microplastics that can be ingested by marine life and enter the food chain, potentially causing harm to wildlife and humans alike.</p><p>Moreover, the production and incineration of single-use plastics contribute to greenhouse gas emissions, exacerbating climate change. The convenience of these plastics comes at a high environmental cost, making it essential to reduce their usage and improve waste management practices.</p><p>Alternatives to single-use plastics include reusable bags, containers, and utensils, which can significantly reduce plastic waste. Many countries and cities are implementing bans or restrictions on single-use plastics and promoting recycling and sustainable waste management practices.</p>",
			"keywords": ["single-use plastics", "plastic pollution", "microplastics", "sustainable alternatives", "waste management"],
			"questions": [
				"What are single-use plastics?",
				"Why are single-use plastics harmful to the environment?",
				"How do single-use plastics contribute to pollution?",
				"What are the alternatives to single-use plastics?",
				"How can we reduce the impact of single-use plastics?"
			]
		},
		{
			"topic": "The Benefits of a Plant-Based Diet",
			"content": "<p>A plant-based diet, which emphasizes consuming whole, unprocessed plant foods, offers numerous health and environmental benefits. This diet includes fruits, vegetables, whole grains, nuts, and seeds, and excludes or minimizes animal products. Research has shown that a plant-based diet can reduce the risk of chronic diseases, such as heart disease, diabetes, and cancer.</p><p>One of the primary benefits of a plant-based diet is its positive impact on heart health. Diets rich in fruits, vegetables, and whole grains are high in fiber, vitamins, and minerals, and low in saturated fat and cholesterol, which can help reduce the risk of heart disease and stroke.</p><p>Plant-based diets are also associated with a lower risk of type 2 diabetes, as they can improve insulin sensitivity and reduce inflammation. Additionally, these diets may help with weight management and obesity prevention, as plant foods are generally lower in calories and fat than animal products.</p><p>From an environmental perspective, adopting a plant-based diet can significantly reduce an individual's carbon footprint, as the production of plant-based foods typically requires less energy, land, and water than animal-based foods. Moreover, plant-based diets contribute to the conservation of biodiversity and the reduction of pollution and deforestation associated with animal agriculture.</p>",
			"keywords": ["plant-based diet", "health benefits", "environmental impact", "sustainability", "nutrition"],
			"questions": [
				"What is a plant-based diet?",
				"What are the health benefits of a plant-based diet?",
				"How does a plant-based diet impact the environment?",
				"What nutrients are important in a plant-based diet?",
				"How can one transition to a plant-based diet?"
			]
		},
		{
			"topic": "The Role of Technology in Education",
			"content": "<p>Technology plays a crucial role in modern education by enhancing teaching and learning experiences, improving access to information, and facilitating communication and collaboration. The integration of technology in education includes the use of digital tools, resources, and platforms to support and enrich the learning process.</p><p>One of the significant benefits of technology in education is the accessibility of information. The internet provides a vast repository of knowledge and resources that can be accessed by students and teachers anytime and anywhere. This has transformed the traditional classroom into a more dynamic and interactive learning environment.</p><p>Moreover, technology enables personalized learning, where students can learn at their own pace and according to their individual needs and preferences. Adaptive learning technologies can adjust the difficulty level and type of content based on the learner's progress, ensuring a more tailored and effective learning experience.</p><p>Technology also facilitates collaboration and communication among students, teachers, and parents, fostering a more inclusive and supportive learning community. However, the effective integration of technology in education requires careful planning, training, and ongoing support for educators and learners.</p>",
			"keywords": ["technology in education", "digital learning", "online resources", "educational technology", "personalized learning"],
			"questions": [
				"How has technology changed the field of education?",
				"What are the benefits of using technology in the classroom?",
				"How does technology facilitate personalized learning?",
				"What role does the internet play in modern education?",
				"How can teachers effectively integrate technology into their teaching?"
			]
		}
	];

	useEffect(() => {
		if (timerActive && timer > 0) {
			intervalRef.current = setInterval(() => {
				setTimer(t => t - 1);
			}, 1000);
		} else if (timer <= 0) {
			clearInterval(intervalRef.current);
			setTimerActive(false);
			finishPractice();
		}
		return () => clearInterval(intervalRef.current);
	}, [timerActive, timer]);

	const finishPractice = () => {
		setTimerActive(false);
		clearInterval(intervalRef.current);
		setShowModal(true);
	};

	const handleTextChange = (e) => {
		const { name, value } = e.target;
		setEssayText(prev => ({ ...prev, [name]: value }));
	};

	const handleGetScore = async () => {
		setIsScoring(true);
		setScoreResult(null);
		const fullEssay = Object.values(essayText).join("\n\n").trim();
		const completionCount = Object.values(essayText).filter(text => text.trim() !== '').length;

		try {
			const response = await fetch('https://ged-website.onrender.com/score-essay', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					essayText: fullEssay,
					completion: `${completionCount}/5`
				})
			});
			if (!response.ok) throw new Error('Failed to get score from the server.');

			const result = await response.json();
			let jsonText = result.candidates[0].content.parts[0].text;
			jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
			const parsedScore = JSON.parse(jsonText);
			setScoreResult(parsedScore);

		} catch (error) {
			console.error("Error scoring essay:", error);
			setScoreResult({ error: "Sorry, we couldn't score your essay at this time." });
		} finally {
			setIsScoring(false);
		}
	};

	const selectedPassage = passagesData[selectedTopic];

	const renderTabs = () => (
		<nav className="flex flex-wrap justify-center border-b-2 border-gray-300 mb-8">
			{['passages', 'structure', 'strengths', 'weaknesses'].map(tab => (
				<button
					key={tab}
					onClick={() => setActiveTab(tab)}
					className={`tab-button text-lg font-semibold py-4 px-6 text-gray-600 capitalize ${activeTab === tab ? 'active' : ''}`}
				>
					{tab.replace('_', ' ')}
				</button>
			))}
		</nav>
	);

	const renderContent = () => {
		switch(activeTab) {
			case 'passages':
				return (
					<div>
						<div className="mb-6 bg-white p-4 rounded-lg shadow-md">
							<select value={selectedTopic} onChange={(e) => setSelectedTopic(Number(e.target.value))} className="p-2 border rounded">
								{passagesData.map((p, i) => <option key={i} value={i}>{p.topic}</option>)}
							</select>
						</div>
						<div className="grid lg:grid-cols-2 gap-8">
							<div className="prose max-w-none lg:col-span-2">
								<h3 className="font-bold text-xl mb-4">{selectedPassage.topic}</h3>
								<div dangerouslySetInnerHTML={{ __html: selectedPassage.content }} />
							</div>
							<div className="bg-white p-4 rounded-lg shadow-md">
								<h4 className="font-semibold text-lg mb-2">Key Vocabulary</h4>
								<ul className="list-disc list-inside mb-4">
									{selectedPassage.keywords.map((keyword, i) => (
										<li key={i} className="text-gray-700">{keyword}</li>
									))}
								</ul>
								<h4 className="font-semibold text-lg mb-2">Discussion Questions</h4>
								<ol className="list-decimal list-inside">
									{selectedPassage.questions.map((question, i) => (
										<li key={i} className="text-gray-700">{question}</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				);
			case 'structure':
				 return (
					<div className="space-y-6">
						<div className="practice-section bg-white p-6 rounded-lg shadow-md">
							<textarea name="intro" onPaste={(e) => e.preventDefault()} value={essayText.intro} onChange={handleTextChange} disabled={!timerActive} className="practice-textarea w-full h-48 p-3 border-gray-300 rounded-md" placeholder="Type your introduction here..."></textarea>
						</div>
						<div className="practice-section bg-white p-6 rounded-lg shadow-md">
							<textarea name="body1" onPaste={(e) => e.preventDefault()} value={essayText.body1} onChange={handleTextChange} disabled={!timerActive} className="practice-textarea w-full h-48 p-3 border-gray-300 rounded-md" placeholder="Type body paragraph 1..."></textarea>
						</div>
						<div className="practice-section bg-white p-6 rounded-lg shadow-md">
							<textarea name="body2" onPaste={(e) => e.preventDefault()} value={essayText.body2} onChange={handleTextChange} disabled={!timerActive} className="practice-textarea w-full h-48 p-3 border-gray-300 rounded-md" placeholder="Type body paragraph 2..."></textarea>
						</div>
						<div className="practice-section bg-white p-6 rounded-lg shadow-md">
							<textarea name="conclusion" onPaste={(e) => e.preventDefault()} value={essayText.conclusion} onChange={handleTextChange} disabled={!timerActive} className="practice-textarea w-full h-48 p-3 border-gray-300 rounded-md" placeholder="Type your conclusion here..."></textarea>
						</div>
					</div>
				 );
			case 'strengths':
				return (
					<div className="grid md:grid-cols-2 gap-6">
						<div className="p-6 rounded-lg bg-green-50 border border-green-200">
							<h4 className="font-semibold text-lg mb-2">Strengths of the Essay</h4>
							<ul className="list-disc list-inside">
								<li className="text-gray-700">Clear and concise thesis statement.</li>
								<li className="text-gray-700">Well-organized structure with clear headings.</li>
								<li className="text-gray-700">Strong evidence and examples supporting the arguments.</li>
								<li className="text-gray-700">Effective use of transitions between paragraphs.</li>
								<li className="text-gray-700">Compelling conclusion that summarizes the main points.</li>
							</ul>
						</div>
					</div>
				);
			case 'weaknesses':
				return (
					<div className="grid md:grid-cols-2 gap-6">
						 <div className="p-6 rounded-lg bg-red-50 border border-red-200">
							<h4 className="font-semibold text-lg mb-2">Weaknesses of the Essay</h4>
							<ul className="list-disc list-inside">
								<li className="text-gray-700">Lack of counterarguments or consideration of opposing views.</li>
								<li className="text-gray-700">Some factual inaccuracies or unsupported claims.</li>
								<li className="text-gray-700">Repetitive or unclear phrasing in some sections.</li>
								<li className="text-gray-700">Weak or missing conclusion that does not effectively summarize the essay.</li>
							</ul>
						</div>
					</div>
				);
			default: return null;
		}
	};

	const renderModalContent = () => {
		const fullEssay = Object.values(essayText).join("\n\n").trim();
		return (
			<>
				<div className="p-8 prose max-w-none">
					{fullEssay ? <div dangerouslySetInnerHTML={{ __html: fullEssay.replace(/\n/g, '<br/>') }} /> : <p><em>You did not write anything in the practice area.</em></p>}
				</div>
				<div className="p-6 border-t bg-gray-50 space-y-4">
					<button onClick={handleGetScore} disabled={isScoring || !fullEssay} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
						{isScoring ? 'Scoring...' : 'Get AI Score & Feedback'}
					</button>
					{scoreResult && (
						<div className="mt-4 p-4 bg-indigo-50 rounded-lg text-left">
							<pre>{JSON.stringify(scoreResult, null, 2)}</pre>
						</div>
					)}
				</div>
			</>
		);
	};

	return (
		<div className="fade-in">
			<header className="flex justify-between items-center pb-4 mb-4 border-b">
				 <button onClick={onExit} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold">Back</button>
				 <h2 className="text-xl font-bold text-center text-slate-800">Interactive Essay Guide</h2>
				 <div></div>
			</header>

			{renderTabs()}
			<main>{renderContent()}</main>

			{showModal && (
				<div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
						<div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
							<h3 className="font-bold">Your Practice Submission</h3>
							<button onClick={() => setShowModal(false)} className="text-xl">&times;</button>
						</div>
						{renderModalContent()}
					</div>
				</div>
			)}
		</div>
	);
}
			{showModal && (
				<div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-white rounded-lg shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
						<div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
							<h3 className="font-bold">Your Practice Submission</h3>
							<button onClick={() => setShowModal(false)} className="text-xl">&times;</button>
						</div>
						{renderModalContent()}
					</div>
				</div>
			)}

