// server.js (Updated Version)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
// IMPROVEMENT: Use the port provided by Render's environment, falling back to 3001 for local use.
const port = process.env.PORT || 3001;

const allowedOrigins = ['https://ezged.netlify.app'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// handle preflight requests
app.options('*', cors(corsOptions)); // Use '*' to handle preflights for all routes
app.use(express.json());

let curatedImages = [];
// Load the new, structured image repository from the local file system.
const imageRepositoryPath = path.join(__dirname, '..', 'image_links.json');

try {
    const imageData = fs.readFileSync(imageRepositoryPath, 'utf8');
    curatedImages = JSON.parse(imageData);
    console.log(`Successfully loaded and parsed ${curatedImages.length} images from the local repository.`);
} catch (error) {
    console.error('Failed to load or parse image_links.json:', error);
}

// This is the new, comprehensive library for server.js

const subTopicLibrary = {
    // --- Social Studies Sub-Topics ---
    "Foundations (1491-1763)": ["the Columbian Exchange's impact", "the economic theory of Mercantilism", "differences between New England and Southern colonies", "the consequences of the French and Indian War", "the structure of the Triangular Trade"],
    "The American Revolution (1763-1783)": ["the Stamp Act and 'taxation without representation'", "the philosophical ideas in the Declaration of Independence", "the strategic importance of the Battle of Saratoga", "a comparison of British vs. Continental army strengths", "the outcomes of the Treaty of Paris"],
    "A New Nation (1783-1824)": ["the weaknesses of the Articles of Confederation", "the Great Compromise at the Constitutional Convention", "the principles of the Bill of Rights", "the impact of the Louisiana Purchase on U.S. size", "the establishment of judicial review in Marbury v. Madison"],
    "A Nation Divided (1824-1877)": ["economic sectionalism between the North and South", "the Missouri Compromise of 1820", "the concept of Manifest Destiny", "the election of Abraham Lincoln as a trigger for secession", "the purpose of the 13th, 14th, and 15th Amendments"],
    "Industrial America (1877-1914)": ["the impact of the Bessemer process on industry", "a comparison of 'New' vs. 'Old' immigrants", "the problems of urbanization and tenements", "the function of political machines like Tammany Hall", "the goals of Progressive Era muckrakers"],
    "Global Conflicts (1914-1945)": ["a comparison of casualties in WWI vs. WWII", "the economic impact of the Great Depression on unemployment rates", "the alliance systems of World War I", "the consequences of the Treaty of Versailles", "the U.S. home front during World War II (e.g., rationing, war bonds)"],
    "The Modern Era (1945-Present)": ["the Cold War policy of containment", "the Cuban Missile Crisis", "the significance of the Brown v. Board of Education decision", "the key provisions of the Civil Rights Act of 1964", "the fall of the Berlin Wall and the end of the Cold War"],
    "The Constitution": ["the principle of Popular Sovereignty", "the Separation of Powers among the three branches", "the system of Checks and Balances", "the process for amending the Constitution", "the concept of Federalism and the Supremacy Clause"],
    "The Legislative Branch": ["the process of how a bill becomes a law", "the enumerated powers of Congress", "the differences between the House and the Senate", "the purpose of the filibuster", "Congress's 'power of the purse'"],
    "The Executive Branch": ["the powers of the President (e.g., Veto, Commander in Chief)", "the role of the President's Cabinet", "the line of presidential succession", "the use of Executive Orders", "the two-term limit set by the 22nd Amendment"],
    "The Judicial Branch": ["the principle of judicial review", "the structure of the federal court system", "the Supreme Court's 'rule of four'", "the precedent set by a landmark case like Gideon v. Wainwright", "the lifetime appointments of federal judges"],
    "Federalism & Elections": ["a comparison of federal vs. state powers", "how the Electoral College works", "the role and function of political parties", "the difference between primary and general elections", "the practice of gerrymandering"],
    "Foundational Concepts": ["the concept of Scarcity and Opportunity Cost", "the Law of Supply and Demand", "market equilibrium price and quantity", "the four factors of production", "substitute vs. complementary goods"],
    "The U.S. Economy": ["the principles of a mixed economy", "the government's role in regulation (e.g., FDA, OSHA)", "a comparison of fiscal vs. monetary policy", "the phases of the business cycle", "the pros and cons of globalization"],
    "Map & Data Skills": ["interpreting a political map's boundaries", "using a map scale to determine distance", "comparing data in a bar graph", "analyzing trends in a line graph", "calculating percentages from a pie chart"],

    // --- Science Sub-Topics ---
    "Life Science Basics": ["the differences between plant and animal cells", "the inputs and outputs of photosynthesis", "the relationship between DNA, genes, and chromosomes", "the concept of homeostasis", "predicting traits with a Punnett square"],
    "Ecosystems & Environment": ["biotic vs. abiotic factors in an ecosystem", "the flow of energy in a food web", "the stages of the water cycle", "the principles of natural selection", "the impact of an invasive species"],
    "Chemistry Fundamentals": ["the roles of protons, neutrons, and electrons", "how to read an element on the periodic table", "a comparison of physical vs. chemical changes", "the pH scale (acids and bases)", "the difference between ionic and covalent bonds"],
    "Physics in Motion": ["Newton's First Law of Motion (Inertia)", "Newton's Second Law (F=ma)", "Newton's Third Law (Action-Reaction)", "the conversion of potential to kinetic energy", "Ohm's Law (V=IR) in a circuit"],
    "Earth & Space Systems": ["the theory of plate tectonics", "the stages of the rock cycle", "a comparison of weathering vs. erosion", "the order of the planets in the solar system", "the cause of the seasons on Earth"],

    // --- RLA & Math Sub-Topics (for future use, as they currently default to text-only) ---
    "Main Idea & Details": ["identifying the central idea of a passage", "locating specific supporting details", "summarizing a paragraph's key points", "determining the author's primary purpose", "distinguishing between fact and opinion"],
    "Sentence Structure": ["correcting sentence fragments", "fixing run-on sentences and comma splices", "properly using dependent and independent clauses", "maintaining parallel structure in a list", "combining sentences effectively"],
    "Punctuation & Mechanics": ["comma usage in a series and with introductory phrases", "the difference between possessive and plural apostrophes", "capitalization of proper nouns and titles", "using a semicolon to join related clauses", "correctly punctuating dialogue"],
    "Grammar & Usage": ["subject-verb agreement with singular and plural subjects", "pronoun-antecedent agreement (e.g., 'a student... he or she')", "correct word choice (e.g., affect/effect, farther/further)", "pronoun case (e.g., I/me, who/whom)", "identifying and correcting misplaced modifiers"],
    "Geometry Basics": ["calculating the area and perimeter of a rectangle", "finding the area of a triangle", "calculating the circumference and area of a circle", "using the Pythagorean theorem in a right triangle", "finding the volume of a rectangular prism"],
    "Algebraic Expressions & Equations": ["solving a linear equation for a variable", "simplifying an algebraic expression", "evaluating an expression by substituting values", "solving a simple inequality", "identifying the slope and y-intercept from an equation"]
};

app.get('/', (req, res) => {
  res.send('Learning Canvas Backend is running!');
});

// NEW FEATURE: Endpoint to define a word, as used in your index.html
app.post('/define-word', async (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).json({ error: 'A word is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
     if (!apiKey) {
        console.error('API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Provide a concise, GED-level definition for the word: "${word}".`;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await axios.post(apiUrl, payload);
        const definition = response.data.candidates[0].content.parts[0].text;
        res.json({ definition });
    } catch (error) {
        console.error('Error calling Google AI API for definition:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get definition from AI service.' });
    }
});


// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// This is the final and most prescriptive version for server.js

// This is the final and most advanced version for server.js

app.post('/generate-quiz', async (req, res) => {
    console.log('--- Received a request to /generate-quiz (Quiz Assembler v11 - Multi-Call) ---');
    const { subject, topic, comprehensive } = req.body;
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    try {
        const totalQuestions = 15;
        let recipe = [];

        const relevantImages = shuffleArray(curatedImages.filter(img => img.subject === subject && (comprehensive || (img.topics && img.topics.some(t => topic.toLowerCase().includes(t.toLowerCase().replace(/_/g, ' ')))))));

        if (subject === "Social Studies") {
            const numImageQuestions = Math.min(relevantImages.length, 3);
            let baseRecipe = ['bar_chart', 'line_graph', 'pie_chart', 'quote', 'quote', 'quote', 'quote'];
            let imageSlots = Array(numImageQuestions).fill('image');
            let textSlots = Array(totalQuestions - baseRecipe.length - imageSlots.length).fill('text');
            recipe = shuffleArray([...baseRecipe, ...imageSlots, ...textSlots]);
        } else {
            recipe = Array(totalQuestions).fill('text'); // Fallback for other subjects
        }

        const singleQuestionSchema = {
            type: "OBJECT",
            properties: {
              type: { type: "STRING" },
              passage: { type: "STRING" },
              chartDescription: { type: "STRING" },
              questionText: { type: "STRING" },
              answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
            },
            required: ["type", "questionText", "answerOptions"]
        };
        const multiQuestionSchema = { type: "OBJECT", properties: { questions: { type: "ARRAY", items: singleQuestionSchema } }, required: ["questions"] };
        let subTopics = subTopicLibrary[topic] ? shuffleArray([...subTopicLibrary[topic]]) : [topic];

        const callAI = async (prompt) => {
            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json", responseSchema: multiQuestionSchema },
            };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const response = await axios.post(apiUrl, payload);
            return JSON.parse(response.data.candidates[0].content.parts[0].text);
        };

        const chartTasks = recipe.filter(r => r.includes('_chart'));
        const stimulusTasks = recipe.filter(r => r === 'image' || r === 'quote');
        const textTasks = recipe.filter(r => r === 'text');
        const apiCalls = [];

        if (chartTasks.length > 0) {
            const chartSubTopics = chartTasks.map((_, i) => subTopics[i % subTopics.length]);
            const chartPrompt = `Generate ${chartTasks.length} GED-style chart questions for a Social Studies quiz about "${topic}". Create one question for each of the following chart types and sub-topics:
            ${chartTasks.map((type, i) => `- A ${type.replace('_', ' ')} about "${chartSubTopics[i]}"`).join('\n')}
            RULES: For each question, provide a 'chartDescription', format the data as an HTML <table>, and ensure the 'passage' contains ONLY the table. The 'questionText' must be a single question about the chart.`;
            apiCalls.push(callAI(chartPrompt));
        }

        if (stimulusTasks.length > 0) {
            const imageTasks = stimulusTasks.filter(t => t === 'image');
            const quoteTasks = stimulusTasks.filter(t => t === 'quote');
            const availableImageDescriptions = relevantImages.slice(0, imageTasks.length).map(img => `"${img.description}"`);
            const stimulusSubTopics = stimulusTasks.map((_, i) => subTopics[(chartTasks.length + i) % subTopics.length]);
            const stimulusPrompt = `Generate ${stimulusTasks.length} GED-style questions for a Social Studies quiz about "${topic}". Generate ${quoteTasks.length} questions based on historical quotes/letters, and ${imageTasks.length} questions based on the provided Image Descriptions.
            Sub-topics to cover: ${stimulusSubTopics.join(', ')}.
            Available Image Descriptions: [${availableImageDescriptions.join(', ')}].
            RULES: For image questions, the 'passage' field MUST contain the exact Image Description used as the stimulus for the question. The 'questionText' must be a single question about that image. For quote questions, the 'passage' field MUST contain the quote.`;
            apiCalls.push(callAI(stimulusPrompt));
        }

        if (textTasks.length > 0) {
            const textSubTopics = textTasks.map((_, i) => subTopics[(chartTasks.length + stimulusTasks.length + i) % subTopics.length]);
            const textPrompt = `Generate ${textTasks.length} GED-style text-passage questions for a Social Studies quiz about "${topic}". Create one question for each sub-topic:
            ${textSubTopics.map(st => `- A question about "${st}"`).join('\n')}
            RULES: The 'passage' should be a short text passage. The 'questionText' must be a single question about that passage. 'passage' and 'questionText' must not be the same.`;
            apiCalls.push(callAI(textPrompt));
        }

        const results = await Promise.all(apiCalls);
        let combinedQuestions = results.flatMap(result => result.questions);

        combinedQuestions.forEach(q => {
            // NEW LOGIC: For image questions, find the matching image URL from our repository
            // based on the description the AI placed in the 'passage' field.
            if (q.type === 'image' && q.passage && q.passage.length > 0) {
                // Find the image in our repository whose description exactly matches the passage
                const matchedImage = curatedImages.find(img => img.description.trim() === q.passage.trim());
                if (matchedImage) {
                    // Set the imageURL to the relative path for the frontend (e.g., "Images/foo.jpg")
                    q.imageURL = matchedImage.url.replace('frontend/', '');
                    // Clear the passage field as it's now been used and is no longer needed
                    q.passage = '';
                } else {
                    // If no match is found, we should probably nullify the image type
                    // to avoid showing a broken image link.
                    q.type = 'text'; // Fallback to a text question
                    q.passage = `Error: The AI returned an image description that was not found in the repository: "${q.passage}"`;
                }
            }
        });

        const shuffledQuiz = shuffleArray(combinedQuestions).map((q, index) => ({ ...q, questionNumber: index + 1 }));
        res.json({ questions: shuffledQuiz });

    } catch (error) {
        console.error('Error in Quiz Assembler v11:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate quiz from AI service.' });
    }
});

app.post('/score-essay', async (req, res) => {
    const { essayText, completion } = req.body; // Get completion data
    if (!essayText) {
        return res.status(400).json({ error: 'Essay text is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Act as a GED RLA essay evaluator. The student was asked to write a 5-paragraph essay.

        IMPORTANT CONTEXT: The student's level of completion for this draft was ${completion} sections. Factor this completion level into your feedback and scores, especially for Trait 3. An incomplete essay cannot score a 2 on Trait 3.

        Here is the student's essay:
        ---
        ${essayText}
        ---

        Please provide your evaluation in a valid JSON object format with keys "trait1", "trait2", "trait3", "overallScore", and "overallFeedback". For each trait, provide a "score" from 0 to 2 and "feedback" explaining the score. The "overallScore" is the sum of the trait scores. "overallFeedback" should be a summary.`;

    const schema = {
        type: "OBJECT",
        properties: {
            trait1: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            trait2: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            trait3: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            overallScore: { type: "NUMBER" },
            overallFeedback: { type: "STRING" }
        },
        required: ["trait1", "trait2", "trait3", "overallScore", "overallFeedback"]
    };

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await axios.post(apiUrl, payload);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Google AI API for essay scoring:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to score essay from AI service.' });
    }
});

const { ALL_QUIZZES } = require('./premade-questions.js');

// Helper function to get random questions from the premade data
const getPremadeQuestions = (subject, count) => {
    const allQuestions = [];
    if (ALL_QUIZZES[subject] && ALL_QUIZZES[subject].categories) {
        Object.values(ALL_QUIZZES[subject].categories).forEach(category => {
            if (category.topics) {
                category.topics.forEach(topic => {
                    if (topic.questions) {
                        allQuestions.push(...topic.questions);
                    }
                });
            }
        });
    }
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Helper function to generate AI questions
const generateAIContent = async (prompt, schema) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    };
    const response = await axios.post(apiUrl, payload);
    const jsonText = response.data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonText);
};



// The '0.0.0.0' is important for containerized environments like Render.
app.listen(port, '0.0.0.0', () => {
  console.log(`Your service is live 🚀`);
  console.log(`Server listening on port ${port}`);
});