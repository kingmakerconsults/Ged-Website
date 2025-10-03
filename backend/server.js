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

const allowedOrigins = [
    'https://ezged.netlify.app',
    'https://quiz.ez-ged.com',
    'http://localhost:8000' // For local testing
];

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

// Add this new prompt library to server.js

const promptLibrary = {
    "Social Studies": {
        topic: (topic) => `Generate a 15-question GED-style Social Studies quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages AS CLOSELY AS POSSIBLE: 50% Civics & Government, 20% U.S. History, 15% Economics, 15% Geography & the World.
        STRICT STIMULUS REQUIREMENTS: A variety of stimuli MUST be used. Include at least 2 questions based on a chart/graph, 2 questions based on a historical quote, and 2 questions based on an image from the provided descriptions. The rest should be text passages.`,
        comprehensive: `Generate a 35-question comprehensive GED Social Studies exam.
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 50% Civics & Government, 20% U.S. History, 15% Economics, and 15% Geography & the World.
        STRICT STIMULUS REQUIREMENTS: The quiz must include a diverse mix of stimuli, including text passages, historical quotes, charts, graphs, and images from the provided descriptions.`
    },
    "Science": {
        topic: (topic) => `Generate a 15-question GED-style Science quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages AS CLOSELY AS POSSIBLE: 40% Life Science, 40% Physical Science, 20% Earth and Space Science.
        STRICT STIMULUS REQUIREMENTS: Ensure a mix of stimuli, including text passages, data tables/graphs, and diagrams from the provided descriptions. Questions should test reading comprehension of scientific texts and scientific reasoning.`,
        comprehensive: `Generate a 38-question comprehensive GED Science exam.
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 40% Life Science, 40% Physical Science, 20% Earth and Space Science.
        STRICT STIMULUS REQUIREMENTS: The quiz must include a diverse mix of stimuli, including text passages, data tables formatted as HTML, charts, and scientific diagrams from the provided descriptions.`
    },
"Reasoning Through Language Arts (RLA)": {
    topic: (topic) => `Generate a 15-question GED-style RLA quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: The quiz must be 75% Informational Text (non-fiction, workplace documents) and 25% Literary Text. It must include a mix of reading comprehension questions and language/grammar questions. DO NOT generate Social Studies questions; generate RLA questions using passages ABOUT "${topic}".`,
    comprehensive: {
        part1: `Generate the Reading Comprehension section of a GED RLA exam. Create exactly 4 long passages (4-5 paragraphs each), with 75% being informational text and 25% literary text. For EACH of the 4 passages, generate exactly 5 reading comprehension questions that test for main idea, inference, and analysis of arguments. The final output must be a total of 20 questions.`,
        part2: `Generate one GED-style Extended Response (essay) prompt. The prompt must be based on two short, opposing passages that you create. The output should be a JSON object with two keys: "passages" (an array of two objects, each with a "title" and "content") and "prompt" (the essay question).`,
        part3: `Generate the Language and Grammar section of a GED RLA exam. Create 7 short passages (1-2 paragraphs each) that may contain grammatical errors, awkward phrasing, or organizational issues. For EACH of the 7 passages, generate 3-4 questions focused on correcting sentence structure, improving word choice, and identifying errors in mechanics. This should total 25 questions. The stimulus for these questions is the passage with errors.`
    }
},
    "Mathematical Reasoning": {
        topic: (topic) => `Generate a 15-question GED-style Math quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: The questions must be approximately 45% Quantitative Problems (number sense, data analysis) and 55% Algebraic Problems (expressions, equations).`,
        comprehensive: `Generate a 46-question comprehensive GED Mathematical Reasoning exam.
        STRICT CONTENT REQUIREMENTS: The quiz must be EXACTLY 45% Quantitative Problems and 55% Algebraic Problems. Include word problems and questions based on data charts.`
    }
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

const singleQuestionSchema = {
    type: "OBJECT",
    properties: {
      type: { type: "STRING" },
      passage: { type: "STRING" },
      chartDescription: { type: "STRING" },
      questionText: { type: "STRING" },
      imageDescriptionForMatch: { type: "STRING" }, // For matching URLs
      answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
    },
    required: ["type", "questionText", "answerOptions"]
};

const callAI = async (prompt, schema) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        throw new Error('Server configuration error: GOOGLE_AI_API_KEY is not set.');
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    };
    try {
        const response = await axios.post(apiUrl, payload);
        const jsonText = response.data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error('Error calling Google AI API in callAI:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// This new function handles the special RLA case

app.post('/generate-quiz', async (req, res) => {
    console.log('--- Received a request to /generate-quiz (Multi-Part RLA) ---');
    const { subject, topic, comprehensive } = req.body;
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    try {
        if (comprehensive && subject === "Reasoning Through Language Arts (RLA)") {
            // --- SPECIAL: Multi-call logic for RLA Comprehensive Exam ---
            const rlaPrompts = promptLibrary[subject].comprehensive;
            const schemaPart1And3 = { type: "OBJECT", properties: { questions: { type: "ARRAY", items: singleQuestionSchema } }, required: ["questions"] };
            const schemaPart2 = { type: "OBJECT", properties: { passages: { type: "ARRAY", items: {type: "OBJECT", properties: {title: {type: "STRING"}, content: {type: "STRING"}}, required: ["title", "content"]}}, prompt: {type: "STRING"}}, required: ["passages", "prompt"]};

            const [part1Result, part2Result, part3Result] = await Promise.all([
                callAI(rlaPrompts.part1, schemaPart1And3),
                callAI(rlaPrompts.part2, schemaPart2),
                callAI(rlaPrompts.part3, schemaPart1And3)
            ]);

            const fullExamData = {
                subject: "Reasoning Through Language Arts (RLA)",
                title: "Comprehensive RLA Exam",
                type: "multi-part-rla", // A new type for the frontend to recognize
                totalTime: 150 * 60,
                part1_reading: part1Result.questions,
                part2_essay: part2Result,
                part3_language: part3Result.questions
            };
            return res.json(fullExamData);
        }

        // --- Standard logic for all other quizzes ---
        let basePrompt;
        if (comprehensive) {
            basePrompt = promptLibrary[subject]?.comprehensive;
        } else {
            basePrompt = promptLibrary[subject]?.topic(topic);
        }
        if (!basePrompt) return res.status(400).json({ error: 'Invalid subject or quiz type.' });

        const relevantImages = shuffleArray(curatedImages.filter(img => img.subject === subject));
        const availableImageDescriptions = relevantImages.slice(0, 5).map(img => `"${img.description}"`);
        const imageContext = `\n\nAVAILABLE IMAGE DESCRIPTIONS (Use for image-based questions): [${availableImageDescriptions.join(', ')}]`;
        const finalPrompt = basePrompt + imageContext;

        const finalSchema = {
            type: "OBJECT",
            properties: {
                questions: {
                    type: "ARRAY",
                    items: singleQuestionSchema
                }
            },
            required: ["questions"]
        };

        let generatedQuiz = await callAI(finalPrompt, finalSchema);

        generatedQuiz.questions.forEach(q => {
            if (q.type === 'image' && q.imageDescriptionForMatch) {
                const matchedImage = relevantImages.find(img => img.description === q.imageDescriptionForMatch);
                if (matchedImage) {
                    q.imageURL = matchedImage.url;
                }
            }
            delete q.imageDescriptionForMatch;
        });

        const finalQuiz = shuffleArray(generatedQuiz.questions).map((q, index) => ({
            ...q,
            questionNumber: index + 1
        }));

        res.json({ questions: finalQuiz });

    } catch (error) {
        console.error('Error in Quiz Assembler:', error.response ? error.response.data : error.message);
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