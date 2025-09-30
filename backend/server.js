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

app.post('/generate-quiz', async (req, res) => {
    console.log('--- Received a request to /generate-quiz (Quiz Assembler v10 - Final Recipe) ---');
    const { subject, topic, comprehensive } = req.body;
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    try {
        const totalQuestions = 15; // Hard-code to 15 for this specific logic
        let recipe = [];

        const relevantImages = shuffleArray(curatedImages.filter(img => {
            if (img.subject !== subject) return false;
            if (comprehensive) return true;
            return img.topics && img.topics.some(t => topic.toLowerCase().includes(t.toLowerCase().replace(/_/g, ' ')));
        }));

        // --- Build the Prescriptive Recipe for Social Studies ---
        if (subject === "Social Studies") {
            const numImageQuestions = Math.min(relevantImages.length, 3);

            let baseRecipe = [
                'bar_chart', 'line_graph', 'pie_chart',
                'quote', 'quote', 'quote', 'quote'
            ];

            let imageSlots = Array(numImageQuestions).fill('image');
            let textSlots = Array(totalQuestions - baseRecipe.length - imageSlots.length).fill('text');

            recipe = shuffleArray([...baseRecipe, ...imageSlots, ...textSlots]);
        } else {
            // Fallback for other subjects
            recipe = Array(totalQuestions).fill('text');
        }

        const finalQuizQuestions = [];
        // NEW: Updated schema to include an optional chartDescription
        const singleQuestionSchema = {
            type: "OBJECT",
            properties: {
              type: { type: "STRING" },
              passage: { type: "STRING" },
              chartDescription: { type: "STRING" }, // <-- NEW FIELD
              questionText: { type: "STRING" },
              answerOptions: { /* ... same as before ... */ }
            },
            required: ["type", "questionText", "answerOptions"]
        };

        let subTopics = subTopicLibrary[topic] ? shuffleArray([...subTopicLibrary[topic]]) : [topic];

        for (let i = 0; i < totalQuestions; i++) {
            const questionType = recipe[i];
            const currentSubTopic = subTopics[i % subTopics.length];
            let prompt = '';
            let imageUrlForQuestion = null;

            switch (questionType) {
                case 'image':
                    const image = relevantImages.pop();
                    imageUrlForQuestion = image.url;
                    prompt = `You are a GED question writer. Write a single GED-style question based on this image description: "${image.description}".`;
                    break;

                case 'bar_chart':
                    prompt = `You are a GED question writer. For a ${subject} quiz about "${currentSubTopic}", create a stimulus containing a bar chart comparing at least 3 categories. Provide a brief, one-sentence "chartDescription" to give context. The bar chart data MUST be formatted as an HTML <table>.`;
                    break;

                case 'line_graph':
                    prompt = `You are a GED question writer. For a ${subject} quiz about "${currentSubTopic}", create a stimulus containing a line graph showing a trend over at least 4 time periods. Provide a brief, one-sentence "chartDescription" to give context. The line graph data MUST be formatted as an HTML <table> with a 'Year' or 'Date' column.`;
                    break;

                case 'pie_chart':
                    prompt = `You are a GED question writer. For a ${subject} quiz about "${currentSubTopic}", create a stimulus containing a pie chart showing percentage breakdowns. Provide a brief, one-sentence "chartDescription" to give context. The pie chart data MUST be formatted as an HTML <table> with 'Category' and 'Percentage' columns where percentages sum to 100%.`;
                    break;

                case 'quote':
                    prompt = `You are a GED question writer. For a ${subject} quiz about "${currentSubTopic}", the stimulus MUST be a short (2-4 sentences), historically significant quote or an excerpt from a letter. The "passage" field should contain ONLY this quote/excerpt and its attribution.`;
                    break;

                default: // 'text'
                    prompt = `You are a GED question writer. For a ${subject} quiz about "${currentSubTopic}", the stimulus MUST be a text passage.`;
                    break;
            }

            const rules = `
                YOU MUST FOLLOW THESE RULES:
                1. The 'questionText' must be a single, concise question about the stimulus.
                2. If the question is image-based, the 'passage' and 'chartDescription' fields MUST be empty strings.
                3. The 'passage' and 'questionText' fields MUST NOT be the same.`;

            prompt += rules;

            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: singleQuestionSchema,
                },
            };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

            const response = await axios.post(apiUrl, payload);
            let generatedQuestion = JSON.parse(response.data.candidates[0].content.parts[0].text);

            if (imageUrlForQuestion) {
                generatedQuestion.imageURL = imageUrlForQuestion;
            }
            finalQuizQuestions.push(generatedQuestion);
        }

        const shuffledQuiz = shuffleArray(finalQuizQuestions).map((q, index) => ({ ...q, questionNumber: index + 1 }));
        res.json({ questions: shuffledQuiz });

    } catch (error) {
        console.error('Error in Quiz Assembler v10:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate quiz from AI service.' });
    }
});

app.post('/score-essay', async (req, res) => {
    const { essayText } = req.body;
    if (!essayText) {
        return res.status(400).json({ error: 'Essay text is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Act as a GED Reasoning Through Language Arts (RLA) essay evaluator. Your task is to score the following student's essay based on the official three-trait rubric. The essay is an analysis of two opposing passages.

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