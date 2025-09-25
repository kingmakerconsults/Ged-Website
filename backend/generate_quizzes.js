require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const generateQuiz = async (topic) => {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    console.error('API key not configured. Please check the .env file.');
    return;
  }

  let prompt = `Generate a 15-question, GED-style multiple-choice quiz on the topic of "${topic}". The quiz should be challenging and suitable for high school equivalency preparation. For each question, provide four answer options. One, and only one, of these options must be correct. For the correct answer, provide a brief rationale explaining why it is correct. For incorrect answers, the rationale should be a brief explanation of why it is incorrect. Ensure the output is a valid JSON object following the specified schema. The questions must be text-analysis or quote-analysis based. Each question must include a short 'passage' (a paragraph or two of historical text, or a historical quote) for the student to analyze. Do not generate simple knowledge-based questions without a passage.`;

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
    console.log(`Generating quiz for topic: ${topic}`);
    const response = await axios.post(apiUrl, payload);
    const quizData = response.data.candidates[0].content.parts[0].text;
    const filename = `${topic.toLowerCase().replace(/\s+/g, '_')}.json`;
    fs.writeFileSync(filename, quizData);
    console.log(`Quiz saved to ${filename}`);
  } catch (error) {
    console.error(`Error generating quiz for ${topic}:`, error.response ? error.response.data : error.message);
  }
};

const topics = ["Westward Expansion", "The Civil War & Reconstruction"];

const run = async () => {
  for (const topic of topics) {
    await generateQuiz(topic);
  }
};

run();