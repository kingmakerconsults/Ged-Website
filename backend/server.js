require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Learning Canvas Backend is running!');
});

app.post('/generate-quiz', async (req, res) => {
  const { subject, topic } = req.body;

  if (!subject || !topic) {
    return res.status(400).json({ error: 'Subject and topic are required.' });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    return res.status(500).json({ error: 'API key not configured on the server. Please check the .env file.' });
  }

  let prompt = `Generate a 15-question, GED-style multiple-choice quiz on the topic of "${topic}". The quiz should be challenging and suitable for high school equivalency preparation. For each question, provide four answer options. One, and only one, of these options must be correct. For the correct answer, provide a brief rationale explaining why it is correct. For incorrect answers, the rationale should be a brief explanation of why it is incorrect. Ensure the output is a valid JSON object following the specified schema.`;
        
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
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(apiUrl, payload);
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Google AI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate quiz from AI service.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`);
});
