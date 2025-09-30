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


app.post('/generate-quiz', async (req, res) => {
    console.log('--- Received a request to /generate-quiz ---'); // <-- ADD THIS EXACT LINE

    const { subject, topic, comprehensive } = req.body;
    let prompt;
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        console.error('API key not configured on the server. Please check the .env file.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    if (comprehensive) {
        if (!subject) {
            return res.status(400).json({ error: 'Subject is required for a comprehensive exam.' });
        }
        const comprehensivePrompts = {
            "Social Studies": `Generate a 35-question comprehensive GED Social Studies exam.
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
Adhere to this content distribution: 50% Civics & Government, 20% U.S. History, 15% Economics, and 15% Geography & the World. All questions must be stimulus-based.`,
            "Science": `Generate a 38-question comprehensive GED Science exam.
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
Adhere to this content distribution: 40% Life Science, 40% Physical Science, and 20% Earth & Space Science. Questions must test scientific practices. Include two 'short-answer' questions.`,
            "Mathematical Reasoning": `Generate a 46-question comprehensive GED Mathematical Reasoning exam in two parts.
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
Part 1 (No Calculator): Generate the first 5 questions testing number sense, estimation, and basic operations that must be solved without a calculator.
Part 2 (Calculator Allowed): Generate the remaining 41 questions.
Adhere to this content distribution: 55% algebraic problems and 45% quantitative problems.`,
            "Reasoning Through Language Arts (RLA)": `Generate a comprehensive, 45-question GED RLA exam.
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
The passages must be 75% informational text and 25% literary text. The final question must be an Extended Response (essay) task. The essay task must present two opposing passages on a contemporary issue and prompt the user to write an essay analyzing the arguments and determining which is better supported, using evidence from the text. This essay portion has a 45-minute time limit.`
        };
        prompt = comprehensivePrompts[subject];
        if (!prompt) {
            return res.status(400).json({ error: 'Invalid subject for comprehensive exam.' });
        }
    } else {
        if (!subject || !topic) {
            return res.status(400).json({ error: 'Subject and topic are required.' });
        }
        const topicSpecificPrompts = {
            "Social Studies": `Generate a 15-question GED-style Social Studies quiz on "${topic}".
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
Every question must be based on a stimulus. Focus on questions that test analysis and interpretation, not just fact recall. Ensure at least 7 questions relate to Civics & Government.`,
            "Science": `Generate a 15-question GED-style Science quiz on "${topic}".
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
Every question must be based on a stimulus. Focus on questions testing scientific reasoning, hypothesis evaluation, and data interpretation. Include one 'short-answer' question that requires a 2-3 sentence explanation.`,
            "Mathematical Reasoning": `Generate a 15-question GED-style Mathematical Reasoning quiz on "${topic}".
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
Assume the user has a calculator and a formula sheet. Problems should be multi-step and test application of concepts. 55% of the questions must be algebraic, and 45% must be quantitative (e.g., geometry, data analysis).`,
            "Reasoning Through Language Arts (RLA)": `Generate a 15-question GED-style RLA quiz on "${topic}".
IMPORTANT RULES:
1. The 'passage' field must contain ONLY the stimulus material (e.g., a text passage or a data table).
2. The 'questionText' field must contain ONLY the question about that stimulus.
3. The 'passage' and 'questionText' fields MUST NOT contain the same text.
4. Any data table MUST be formatted as a simple HTML <table>.
5. Under NO circumstances should you describe a visual stimulus like a map, image, or political cartoon.

CONTENT REQUIREMENTS:
The stimulus passages must be 75% informational texts (non-fiction, workplace documents) and 25% literary texts. Questions must test reading comprehension, argument analysis, and identifying grammatical errors in context. Include two 'dropdown' or 'drag-and-drop' style questions related to editing sentences.`
        };
        prompt = topicSpecificPrompts[subject];
         if (!prompt) {
            return res.status(400).json({ error: 'Invalid subject for topic-specific quiz.' });
        }
    }

// REPLACE the old schema with this one in server.js

const schema = {
  type: "OBJECT",
  properties: {
      questions: {
          type: "ARRAY",
          items: {
              type: "OBJECT",
              properties: {
                  questionNumber: { type: "NUMBER" },
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
              required: ["questionNumber", "type", "questionText", "answerOptions"]
          }
      }
  },
  required: ["questions"]
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
    // Send the whole response data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Google AI API:', error.response ? error.response.data : error.message);
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