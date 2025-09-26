// server.js (Updated Version)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
// IMPROVEMENT: Use the port provided by Render's environment, falling back to 3001 for local use.
const port = process.env.PORT || 3001;

const corsOptions = {
  // You can list multiple trusted origins here if needed in the future
  origin: 'https://ezged.netlify.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// handle preflight requests
app.options('*', cors(corsOptions)); // Use '*' to handle preflights for all routes
app.use(express.json());

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
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
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
  const { subject, topic } = req.body;

  if (!subject || !topic) {
    return res.status(400).json({ error: 'Subject and topic are required.' });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    // IMPROVEMENT: Log the error on the server for easier debugging.
    console.error('API key not configured on the server. Please check the .env file.');
    // Send a more generic error to the user for security.
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  let prompt = `Generate a 15-question, GED-style multiple-choice quiz on the topic of "${topic}". The quiz should be challenging and suitable for high school equivalency preparation. Please return a JSON object with a "questions" array. Each object in the array should represent a question and have the following fields: "questionNumber" (number), "question" (string), "passage" (string, if applicable), and "answerOptions" (an array of 4 objects). Each answer option object must have "text" (string), "isCorrect" (boolean), and "rationale" (string). Ensure one option is marked as correct for each question.`;

  if (subject === "Social Studies") {
    prompt += ` The questions must be text-analysis or quote-analysis based. Each question must include a short 'passage' (a paragraph or two of historical text, or a historical quote) for the student to analyze. Do not generate simple knowledge-based questions without a passage.`;
  }

  const schema = {
      type: "OBJECT",
      properties: {
          id: { type: "STRING" },
          title: { type: "STRING" },
          questions: {
              type: "ARRAY",
              items: {
                  type: "OBJECT",
                  properties: {
                      questionNumber: { type: "NUMBER" },
                      question: { type: "STRING" },
                      passage: { type: "STRING" },
                      answerOptions: {
                          type: "ARRAY",
                          items: {
                              type: "OBJECT",
                              properties: {
                                  text: { type: "STRING" },
                                  isCorrect: { type: "BOOLEAN" },
                                  rationale: { type: "STRING" }
                              },
                               "required": ["text", "isCorrect", "rationale"]
                          }
                      }
                  },
                   "required": ["questionNumber", "question", "answerOptions"]
              }
          }
      },
       "required": ["id", "title", "questions"]
  };

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
      };

  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(apiUrl, payload);
    // Extract the raw text from the response
    let jsonText = response.data.candidates[0].content.parts[0].text;

    // Clean the response to remove markdown formatting
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.substring(7, jsonText.length - 3).trim();
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.substring(3, jsonText.length - 3).trim();
    }

    // Parse the cleaned JSON string into an object
    const quizData = JSON.parse(jsonText);
    // Send the parsed object to the client
    res.json(quizData);
  } catch (error) {
    console.error('Error calling Google AI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate quiz from AI service.' });
  }
});

// The '0.0.0.0' is important for containerized environments like Render.
app.listen(port, '0.0.0.0', () => {
  console.log(`Your service is live 🚀`);
  console.log(`Server listening on port ${port}`);
});