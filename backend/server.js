// server.js (Updated Version)

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

const corsOptions = {
  // You can list multiple trusted origins here if needed in the future
  origin: 'https://ezged.netlify.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// handle preflight requests
app.options('*', cors(corsOptions)); // Use '*' to handle preflights for all routes
app.use(express.json());

let curatedImages = [];
// Load the new, structured image repository from the local file system.
const imageRepositoryPath = path.join(__dirname, '..', 'image_repository.json');

try {
    const imageData = fs.readFileSync(imageRepositoryPath, 'utf8');
    curatedImages = JSON.parse(imageData);
    console.log(`Successfully loaded and parsed ${curatedImages.length} images from the local repository.`);
} catch (error) {
    console.error('Failed to load or parse image_repository.json:', error);
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

    // Enhanced image filtering using the new structured data.
    const relevantImages = curatedImages.filter(image => {
        const lowerCaseTopic = topic.toLowerCase();
        const topicMatch = image.topics.some(t => lowerCaseTopic.includes(t.toLowerCase()));
        const subjectMatch = image.subject.toLowerCase() === subject.toLowerCase() || image.subject === 'General';
        return topicMatch && subjectMatch;
    });

    // Convert the filtered list into a structured string for the prompt.
    const imageRepositoryText = relevantImages.length > 0
        ? relevantImages.map(img =>
            `{ "url": "${img.url}", "description": "${img.description}", "type": "${img.type}", "subject": "${img.subject}", "era": "${img.era}", "topics": ["${img.topics.join('", "')}"] }`
          ).join('\n')
        : "No relevant images were found in the repository for this specific topic.";


    let prompt = `Generate a 15-question, GED-style multiple-choice quiz on the topic of "${topic}". The quiz must contain a mix of passage-based questions and image-based questions.

    When you create an image-based question, you MUST follow this two-step process:
    1.  **First, select a specific URL and its description from the 'Pre-approved Image List' provided below.**
    2.  **Second, write a question that is DIRECTLY and EXCLUSIVELY about the content of THAT SPECIFIC IMAGE.** The text of the question must clearly reference the image you chose (e.g., "This map shows...", "The political cartoon criticizes...").

    **Crucially, DO NOT generate a question about one topic and then use an unrelated image. The question text and the chosen image must be perfectly matched.**

    If you cannot find a suitable image in the pre-approved list for a question you want to ask, you are permitted to search for another publicly accessible and relevant image, but you must still ensure the question is about that specific image.

    **Pre-approved Image List:**
    ${imageRepositoryText}

    For all other questions, provide a text 'passage'. Ensure the output is a valid JSON object following the specified schema.`;

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
                      imageUrl: { type: "STRING" },
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

const { AppData } = require('./premade-questions.js');

// Helper function to shuffle arrays
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

app.post('/generate-comprehensive-exam', async (req, res) => {
    const { subject } = req.body;
    if (!subject || !AppData[subject]) {
        return res.status(400).json({ error: 'Invalid subject provided.' });
    }

    try {
        let finalQuestions = [];
        const subjectData = AppData[subject];
        let premadeQuestions = [];
        Object.values(subjectData.categories).forEach(category => {
            category.topics.forEach(topic => {
                if (topic.questions) {
                    premadeQuestions.push(...topic.questions);
                }
            });
        });

        const apiKey = process.env.GOOGLE_AI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        if (subject === 'Reasoning Through Language Arts (RLA)') {
            // 1. Get pre-made questions
            const grammarQs = premadeQuestions.filter(q => q.passage === null || q.passage === undefined);
            finalQuestions.push(...shuffle(grammarQs).slice(0, 10)); // 10 pre-made grammar

            // 2. Generate new AI questions (20 total for RLA)
            const rlaPrompt = `Generate a JSON object with two arrays: "grammar_questions" and "reading_questions".
            - "grammar_questions": Create 10 new, unique GED-style grammar and conventions questions.
            - "reading_questions": Create 10 new, unique GED-style reading comprehension questions, each based on its own short passage.
            All questions must follow the required JSON schema with question, answerOptions, and rationale.`;
            const rlaSchema = {
                type: "OBJECT",
                properties: {
                    grammar_questions: {
                        type: "ARRAY",
                        items: {
                           type: "OBJECT",
                           properties: {
                                question: { type: "STRING" },
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
                           required: ["question", "answerOptions"]
                        }
                    },
                    reading_questions: {
                        type: "ARRAY",
                        items: {
                           type: "OBJECT",
                           properties: {
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
                                        required: ["text", "isCorrect", "rationale"]
                                    }
                                }
                           },
                           required: ["question", "passage", "answerOptions"]
                        }
                    }
                },
                required: ["grammar_questions", "reading_questions"]
            };
            const rlaPayload = { contents: [{ parts: [{ text: rlaPrompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: rlaSchema } };
            const rlaResponse = await axios.post(apiUrl, rlaPayload);
            const rlaContent = JSON.parse(rlaResponse.data.candidates[0].content.parts[0].text);
            if (rlaContent.grammar_questions) finalQuestions.push(...rlaContent.grammar_questions);
            if (rlaContent.reading_questions) finalQuestions.push(...rlaContent.reading_questions);

            // 3. Generate essay passages
            const essayPrompt = `Generate two short, opposing argumentative passages on a debatable topic suitable for a GED RLA essay. Return a JSON object with keys "passageA" and "passageB", where each contains a "title" and "content" string.`;
            const essaySchema = {
                type: "OBJECT",
                properties: {
                    passageA: {
                        type: "OBJECT",
                        properties: {
                            title: { type: "STRING" },
                            content: { type: "STRING" }
                        },
                        required: ["title", "content"]
                    },
                    passageB: {
                        type: "OBJECT",
                        properties: {
                            title: { type: "STRING" },
                            content: { type: "STRING" }
                        },
                        required: ["title", "content"]
                    }
                },
                required: ["passageA", "passageB"]
            };
            const essayPayload = { contents: [{ parts: [{ text: essayPrompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: essaySchema } };
            const essayResponse = await axios.post(apiUrl, essayPayload);
            const essayPassages = JSON.parse(essayResponse.data.candidates[0].content.parts[0].text);

            const exam = {
                id: `comp-rla-${Date.now()}`, title: `Comprehensive RLA Exam`,
                questions: shuffle(finalQuestions).map((q, i) => ({ ...q, questionNumber: i + 1 })),
                essayPassages: [essayPassages.passageA, essayPassages.passageB],
                essayPrompt: "Analyze the arguments presented in the two passages. In your response, develop an argument in which you explain how one position is better supported than the other. Incorporate relevant and specific evidence from both sources to support your argument.",
                timeLimit: 90 * 60, type: 'quiz'
            };
            return res.json(exam);

        } else { // For Math, Science, Social Studies
            finalQuestions.push(...shuffle(premadeQuestions).slice(0, 15)); // 15 pre-made questions

            // Generate 10 new questions
            const aiPrompt = `Generate 10 new, unique GED-style multiple-choice questions for the subject "${subject}". Topics should be varied. All questions must follow the required JSON schema with question, answerOptions, and rationale.`;
            const questionsSchema = {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        question: { type: "STRING" },
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
                    required: ["question", "answerOptions"]
                }
             };
            const aiPayload = { contents: [{ parts: [{ text: aiPrompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: questionsSchema } };
            const aiResponse = await axios.post(apiUrl, aiPayload);
            const generatedQs = JSON.parse(aiResponse.data.candidates[0].content.parts[0].text);
            if(Array.isArray(generatedQs)) {
                finalQuestions.push(...generatedQs);
            }

            const exam = {
                id: `comp-${subject.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`,
                title: `Comprehensive ${subject} Exam`,
                questions: shuffle(finalQuestions).map((q, i) => ({ ...q, questionNumber: i + 1 })),
                timeLimit: 45 * 60, type: 'quiz'
            };
            return res.json(exam);
        }
    } catch (error) {
        console.error("Error in comprehensive exam generation:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to create comprehensive exam." });
    }
});

// The '0.0.0.0' is important for containerized environments like Render.
app.listen(port, '0.0.0.0', () => {
  console.log(`Your service is live 🚀`);
  console.log(`Server listening on port ${port}`);
});