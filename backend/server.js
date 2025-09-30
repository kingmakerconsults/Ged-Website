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

// Add this new object near the top of server.js

const subTopicLibrary = {
    "Global Conflicts (1914-1945)": [
        "the alliance systems of World War I",
        "the Treaty of Versailles and its consequences",
        "the rise of totalitarianism in Europe",
        "the economic causes of the Great Depression",
        "key battles of World War II (e.g., D-Day, Midway)",
        "the U.S. home front during World War II"
    ],
    "The American Revolution (1763-1783)": [
        "the Stamp Act and 'taxation without representation'",
        "the Declaration of Independence",
        "the role of international allies like France",
        "key battles like Saratoga and Yorktown",
        "the strengths and weaknesses of the British vs. the Continental Army"
    ],
    "A New Nation (1783-1824)": [
        "the weaknesses of the Articles of Confederation",
        "the Great Compromise at the Constitutional Convention",
        "the principles of the Bill of Rights",
        "the Louisiana Purchase",
        "the significance of the Marbury v. Madison case"
    ]
    // ... feel free to add more topics and their sub-topics here ...
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

// This is the final, most advanced version for server.js

app.post('/generate-quiz', async (req, res) => {
    console.log('--- Received a request to /generate-quiz (Quiz Assembler v6 - Sub-Topics) ---');
    const { subject, topic, comprehensive } = req.body;
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    try {
        const totalQuestions = comprehensive ? 35 : 15;
        let recipe = [];

        // --- Correctly filter images ---
        const relevantImages = shuffleArray(curatedImages.filter(img => {
            if (img.subject !== subject) return false;
            if (comprehensive) return true;
            return img.topics && img.topics.some(t => topic.toLowerCase().includes(t.toLowerCase().replace(/_/g, ' ')));
        }));

        // --- Define the quiz "Recipe" ---
        if (subject === "Social Studies") {
            const numImageQuestions = Math.min(relevantImages.length, Math.floor(totalQuestions * 0.20));
            const numChartQuestions = Math.floor(totalQuestions * 0.35);
            const numTextQuestions = totalQuestions - numImageQuestions - numChartQuestions;
            recipe = [...Array(numImageQuestions).fill('image'), ...Array(numChartQuestions).fill('chart'), ...Array(numTextQuestions).fill('text')];
        } else if (subject === "Science") {
            const numImageQuestions = Math.min(relevantImages.length, Math.floor(totalQuestions * 0.25));
            const numChartQuestions = Math.floor(totalQuestions * 0.20);
            const numTextQuestions = totalQuestions - numImageQuestions - numChartQuestions;
            recipe = [...Array(numImageQuestions).fill('image'), ...Array(numChartQuestions).fill('chart'), ...Array(numTextQuestions).fill('text')];
        } else {
            recipe = Array(totalQuestions).fill('text');
        }

        const finalQuizQuestions = [];
        const singleQuestionSchema = {
          type: "OBJECT",
          properties: {
              type: { type: "STRING" },
              passage: { type: "STRING" },
              questionText: { type: "STRING" },
              answerOptions: {
                  type: "ARRAY",
                  items: {
                      type: "OBJECT",
                      properties: {
                          text: { type: "STRING" },
                          isCorrect: { type: "BOOLEAN" },
                          rationale: { type: "STRING" }
                      },
                      required: ["text", "isCorrect", "rationale"]
                  }
              }
          },
          required: ["type", "questionText", "answerOptions"]
        };

        // --- Get Sub-Topics for Variety ---
        let subTopics = subTopicLibrary[topic] ? shuffleArray([...subTopicLibrary[topic]]) : [topic];

        // --- Main Assembly Loop ---
        for (let i = 0; i < totalQuestions; i++) {
            const questionType = recipe[i];
            // Cycle through sub-topics to ensure variety
            const currentSubTopic = subTopics[i % subTopics.length];
            let prompt = '';
            let imageUrlForQuestion = null;

            if (questionType === 'image' && relevantImages.length > 0) {
                const image = relevantImages.pop();
                imageUrlForQuestion = image.url;
                prompt = `You are a GED question writer. Write a single, high-quality, GED-style question based on this image description: "${image.description}". The question should relate to the broader topic of "${topic}". The "type" should be 'image'.`;

            } else if (questionType === 'chart') {
                const chartTypes = ['a bar chart', 'a line graph', 'a pie chart'];
                const randomChartType = chartTypes[Math.floor(Math.random() * chartTypes.length)];
                prompt = `You are a GED question writer. Write a single, high-quality, GED-style question for a ${subject} quiz. The question MUST be about "${currentSubTopic}". The stimulus for the question MUST be ${randomChartType}, formatted as a simple HTML <table>. The "passage" should contain ONLY this HTML table. The "type" should be 'chart'.`;

            } else { // Default to text
                prompt = `You are a GED question writer. Write a single, high-quality, GED-style, text-based question for a ${subject} quiz. The question MUST be about "${currentSubTopic}". The stimulus MUST be a text passage. The "passage" field should contain ONLY this passage. The "type" should be 'text'.`;
            }

            const rules = `
                YOU MUST FOLLOW THESE RULES:
                1. CRUCIAL: Each question generated must cover a DIFFERENT aspect or subject. DO NOT repeat the same specific subject.
                2. The 'questionText' must contain ONLY a single, concise question about the stimulus.
                3. If image-based, the 'passage' MUST be an empty string.
                4. The 'passage' and 'questionText' fields MUST NOT be the same.
                5. Under NO circumstances describe a visual stimulus you cannot see.`;

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

            generatedQuestion.questionNumber = i + 1;
            if (imageUrlForQuestion) {
                generatedQuestion.imageURL = imageUrlForQuestion;
            }
            finalQuizQuestions.push(generatedQuestion);
        }

        res.json({ questions: shuffleArray(finalQuizQuestions) });

    } catch (error) {
        console.error('Error in Quiz Assembler v6:', error.response ? error.response.data : error.message);
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