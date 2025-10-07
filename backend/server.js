// server.js (Updated Version)

require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
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
const imageRepositoryPath = path.join(__dirname, 'image_metadata_final.json');

try {
    const imageData = fs.readFileSync(imageRepositoryPath, 'utf8');
    curatedImages = JSON.parse(imageData);
    console.log(`Successfully loaded and parsed ${curatedImages.length} images from the local repository.`);
} catch (error) {
    console.error('Failed to load or parse image_metadata.json:', error);
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
    part1: `Generate the Reading Comprehension section of a GED RLA exam. Create exactly 4 long passages, each 4-5 paragraphs long, and each passage MUST have a concise, engaging title wrapped in <strong> tags. The passages must be formatted with <p> tags for each paragraph. The passage breakdown must be 3 informational texts and 1 literary text. For EACH of the 4 passages, generate exactly 5 reading comprehension questions. The final output must be a total of 20 questions.`,
    part2: `Generate one GED-style Extended Response (essay) prompt. The prompt must be based on two short, opposing passages that you create. The passages should be 3-4 paragraphs each and formatted with <p> tags. Each of the two passages MUST have its own title. The output should be a JSON object with two keys: "passages" (an array of two objects, each with a "title" and "content") and "prompt" (the essay question).`,
    part3: `Generate the Language and Grammar section of a GED RLA exam. Create 7 short passages (1-2 paragraphs each) formatted with <p> tags. The passages should contain a mix of grammatical errors, awkward phrasing, and organizational issues. For EACH of the 7 passages, generate 3-4 questions focused on correcting sentences, improving word choice, and identifying errors. This should total 25 questions.`
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

const finalQuestionSchema = {
    type: "OBJECT",
    properties: {
        questionNumber: { type: "NUMBER" },
        type: { type: "STRING" },
        passage: { type: "STRING" },
        imageUrl: { type: "STRING" },
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
};

const quizSchema = {
    type: "OBJECT",
    properties: {
        id: { type: "STRING" },
        title: { type: "STRING" },
        subject: { type: "STRING" },
        questions: {
            type: "ARRAY",
            items: finalQuestionSchema
        }
    },
    required: ["id", "title", "subject", "questions"]
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

// Helper functions for generating different types of quiz content

const generatePassageSet = async (topic, subject, numQuestions) => {
    const prompt = `You are a GED exam creator. Generate a short, GED-style reading passage (150-250 words) on the topic of '${topic}'. The content MUST be strictly related to the subject of '${subject}'.
    Then, based ONLY on the passage, generate ${numQuestions} unique multiple-choice questions. VARY THE QUESTION TYPE: ask about main idea, details, vocabulary, or inferences. The question text MUST NOT repeat the passage.
    Output a single valid JSON object with keys "passage" and "questions".`;

    const questionSchema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };

    const schema = {
        type: "OBJECT",
        properties: {
            passage: { type: "STRING" },
            questions: { type: "ARRAY", items: questionSchema }
        },
        required: ["passage", "questions"]
    };

    const result = await callAI(prompt, schema);
    return result.questions.map(q => ({
        ...q,
        passage: result.passage,
        type: 'passage'
    }));
};

const generateChartSet = async (topic, subject, numQuestions) => {
    const prompt = `You are a GED exam creator. Generate a data-based stimulus set specifically for a bar graph, related to the topic '${topic}' and subject '${subject}'. You MUST generate a data table that compares distinct categories. Do NOT generate data showing a continuous trend. The table MUST be a valid HTML '<table>' string.
    Then, based ONLY on the table, generate ${numQuestions} unique questions requiring data interpretation.
    Output a single valid JSON object with keys "passage" (the HTML table string) and "questions".`;

    const questionSchema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };

    const schema = {
        type: "OBJECT",
        properties: {
            passage: { type: "STRING" },
            questions: { type: "ARRAY", items: questionSchema }
        },
        required: ["passage", "questions"]
    };

    const result = await callAI(prompt, schema);
    return result.questions.map(q => ({
        ...q,
        passage: result.passage,
        chartType: 'bar', // As requested in prompt
        type: 'chart'
    }));
};

const generateImageQuestion = async (topic, subject, imagePool, numQuestions) => {
    // Filter by subject AND the specific topic (category)
    let relevantImages = imagePool.filter(img => img.subject === subject && img.category === topic);
    let selectedImage;

    if (relevantImages.length > 0) {
        selectedImage = relevantImages[Math.floor(Math.random() * relevantImages.length)];
    } else {
        // Fallback to just subject if no images match the specific topic
        const subjectImages = imagePool.filter(img => img.subject === subject);
        if (subjectImages.length === 0) return null; // No images for this subject at all
        selectedImage = subjectImages[Math.floor(Math.random() * subjectImages.length)];
    }

    if (!selectedImage) return null;

    const imagePrompt = `You are a GED exam creator. This stimulus is for an IMAGE from the topic '${topic}'.
Based on the following image context, generate a set of ${numQuestions} unique questions that require visual interpretation, asking about the main idea, symbolism, or specific details.

**Image Context:**
- **Description:** ${selectedImage.detailedDescription}
- **Usage Directives:** ${selectedImage.usageDirectives || 'N/A'}

Output a JSON array of the question objects, each including an 'imagePath' key with the value '${selectedImage.filePath}'.`;

    const imageQuestionSchema = {
        type: "ARRAY",
        items: {
            type: "OBJECT",
            properties: {
                questionText: { type: "STRING" },
                answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } },
                imagePath: { type: "STRING" }
            },
            required: ["questionText", "answerOptions", "imagePath"]
        }
    };

    try {
        const questions = await callAI(imagePrompt, imageQuestionSchema);
        // Map imagePath to imageUrl and add type
        return questions.map(q => ({
            ...q,
            imageUrl: q.imagePath.replace(/^\/frontend/, ''), // Keep this transformation
            type: 'image'
        }));
    } catch (error) {
        console.error(`Error generating image question for topic ${topic}:`, error);
        return null; // Return null or empty array on error to not break Promise.all
    }
};

const generateStandaloneQuestion = async (subject, topic) => {
    const prompt = `Generate a single, standalone, GED-style multiple-choice question for the subject "${subject}" on the topic of "${topic}".
The question should not require any external passage, chart, or image.
Output a single valid JSON object for the question, including "questionText", and "answerOptions" (an array of objects with "text", "isCorrect", and "rationale").`;

    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };

    const question = await callAI(prompt, schema);
    question.type = 'standalone';
    return question;
};

async function reviewAndCorrectQuiz(draftQuiz) {
    const prompt = `You are a meticulous GED exam editor. Review the provided JSON for a ${draftQuiz.questions.length}-question ${draftQuiz.subject} exam. Your task is to review and improve it based on these rules:
    1.  **IMPROVE QUESTION VARIETY:** The top priority. If you see repetitive question phrasing, rewrite some questions to ask about specific details, inferences, or data points.
    2.  **ENSURE CLARITY:** Fix any grammatical errors or awkward phrasing.
    3.  **MAINTAIN JSON STRUCTURE:** The final output MUST be a perfectly valid JSON object that strictly adheres to the original schema. Do not change any field names.

    Here is the draft quiz JSON:
    ---
    ${JSON.stringify(draftQuiz, null, 2)}
    ---
    Return the corrected and improved quiz as a single, valid JSON object.`;
        const correctedQuiz = await callAI(prompt, quizSchema);
        return correctedQuiz;
    }


app.post('/generate-quiz', async (req, res) => {
    const { subject, comprehensive } = req.body;

    if (!subject || !comprehensive) {
        return res.status(400).json({ error: 'Subject and comprehensive flag are required.' });
    }

    // --- LOGIC FOR SOCIAL STUDIES COMPREHENSIVE EXAM ---
    if (subject === 'Social Studies') {
        try {
            const blueprint = {
                'Civics & Government':    { passages: 3, images: 2, standalone: 3 },
                'U.S. History':           { passages: 3, images: 2, standalone: 1 },
                'Economics':              { passages: 3, images: 1, standalone: 0 },
                'Geography & the World':  { passages: 3, images: 1, standalone: 0 }
            };
            const TOTAL_QUESTIONS = 35;
            let promises = [];

            for (const [category, counts] of Object.entries(blueprint)) {
                for (let i = 0; i < counts.passages; i++) promises.push(generatePassageSet(category, subject, Math.random() > 0.5 ? 2 : 1));
                for (let i = 0; i < counts.images; i++) promises.push(generateImageQuestion(category, subject, curatedImages, Math.random() > 0.5 ? 2 : 1));
                for (let i = 0; i < counts.standalone; i++) promises.push(generateStandaloneQuestion(subject, category));
            }

            const results = await Promise.all(promises);
            let allQuestions = results.flat().filter(q => q);
            const draftQuestionSet = shuffleArray(allQuestions).slice(0, TOTAL_QUESTIONS);
            draftQuestionSet.forEach((q, index) => { q.questionNumber = index + 1; });

            const draftQuiz = {
                id: `ai_comp_ss_draft_${new Date().getTime()}`,
                title: `Comprehensive Social Studies Exam`,
                subject: subject,
                questions: draftQuestionSet,
            };

            console.log("Social Studies draft complete. Sending for second pass review...");
            const finalQuiz = await reviewAndCorrectQuiz(draftQuiz);
            res.json(finalQuiz);

        } catch (error) {
            console.error('Error generating Social Studies exam:', error);
            res.status(500).json({ error: 'Failed to generate Social Studies exam.' });
        }

    // --- LOGIC FOR SCIENCE COMPREHENSIVE EXAM ---
    } else if (subject === 'Science') {
        try {
            const blueprint = {
                'Life Science': { passages: 3, images: 2, charts: 1, standalone: 6 },
                'Physical Science': { passages: 3, images: 1, charts: 1, standalone: 6 },
                'Earth & Space Science': { passages: 2, images: 1, standalone: 2 }
            };
            const TOTAL_QUESTIONS = 38;
            let promises = [];

            for (const [category, counts] of Object.entries(blueprint)) {
                for (let i = 0; i < counts.passages; i++) promises.push(generatePassageSet(category, subject, Math.random() > 0.5 ? 2 : 1));
                for (let i = 0; i < counts.charts; i++) promises.push(generateChartSet(category, subject, Math.random() > 0.5 ? 2 : 1));
                for (let i = 0; i < counts.images; i++) promises.push(generateImageQuestion(category, subject, curatedImages, Math.random() > 0.5 ? 2 : 1));
                for (let i = 0; i < counts.standalone; i++) promises.push(generateStandaloneQuestion(subject, category));
            }

            const results = await Promise.all(promises);
            let allQuestions = results.flat().filter(q => q);
            const draftQuestionSet = shuffleArray(allQuestions).slice(0, TOTAL_QUESTIONS);
            draftQuestionSet.forEach((q, index) => { q.questionNumber = index + 1; });

            const draftQuiz = {
                id: `ai_comp_sci_draft_${new Date().getTime()}`,
                title: `Comprehensive Science Exam`,
                subject: subject,
                questions: draftQuestionSet,
            };

            console.log("Science draft complete. Sending for second pass review...");
            const finalQuiz = await reviewAndCorrectQuiz(draftQuiz);
            res.json(finalQuiz);

        } catch (error) {
            console.error('Error generating Science exam:', error);
            res.status(500).json({ error: 'Failed to generate Science exam.' });
        }
    } else {
    // --- THIS NEW BLOCK FIXES TOPIC-SPECIFIC QUIZZES ---
    try {
        const { subject, topic } = req.body; // We already know comprehensive is false here
        if (!topic) {
            return res.status(400).json({ error: 'A specific topic is required for this quiz type.' });
        }
        console.log(`Generating topic-specific quiz for Subject: ${subject}, Topic: ${topic}`);

        const promptGenerator = promptLibrary[subject]?.topic;
        if (!promptGenerator) {
            return res.status(400).json({ error: 'Invalid subject for topic-specific quiz.' });
        }

        const prompt = promptGenerator(topic);

        // This uses the old, monolithic prompt logic for a fast response
        const quizData = await callAI(prompt, quizSchema);

        // Add question numbers and format image URLs if any are matched
        quizData.questions.forEach((q, index) => {
            q.questionNumber = index + 1;
            if (q.imageDescriptionForMatch) {
                const matchedImage = curatedImages.find(img => img.detailedDescription.includes(q.imageDescriptionForMatch));
                if (matchedImage) {
                    q.imageUrl = matchedImage.filePath.replace('/frontend', '');
                }
            }
        });

        res.json(quizData);

    } catch (error) {
        console.error(`Error generating topic-specific quiz for ${subject}: ${topic}`, error);
        res.status(500).json({ error: 'Failed to generate topic-specific quiz.' });
    }
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