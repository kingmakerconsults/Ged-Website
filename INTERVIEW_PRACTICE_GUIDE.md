# 🎤 AI Interview Practice - Testing Guide

## ✅ Implementation Complete

The AI Interview Practice system is now fully integrated into the Workforce Hub with:

- **Google AI (Gemini)** as primary interview engine
- **ChatGPT (OpenAI)** as automatic fallback
- **Voice input** (Speech-to-Text) via browser API
- **Voice output** (Text-to-Speech) for AI responses
- **Career-aware** questions using `careerPathsNYC.json`
- **Structured JSON** responses with feedback
- **Session summaries** with scoring

---

## 🧪 Testing Steps

### 1. **Start the Application**

Make sure both backend and frontend are running:

```powershell
# Backend (in terminal 1)
npm --prefix backend start

# Frontend (in terminal 2) - if using separate frontend server
# Or just open index.html if using static files
```

### 2. **Navigate to Interview Practice**

1. Open the app in your browser
2. Click on **Workforce Hub**
3. Select **Interview Practice**

### 3. **Configure Your Session**

- **Select Role**: Choose from careers like CNA, Warehouse Worker, Retail Associate, etc.
- **Experience Level**: Entry Level, Some Experience, or Experienced
- **Interview Style**: General, Behavioral, Customer Service, or Technical
- **Session Mode**: Quick (5 questions) or Full (10 questions)

### 4. **Start Interview**

Click **"Start Interview Practice"** to begin.

### 5. **Test Voice Features**

#### Text-to-Speech (TTS)

- Click the **🔊** button next to any AI message to hear it read aloud

#### Speech-to-Text (STT)

- Click the **🎙️** button to start voice input
- Speak your answer
- The text will appear in the input box
- Click **🎙️** again to stop recording (or it stops automatically)
- Click **Send** to submit

### 6. **Complete the Session**

- Answer all questions
- Review your **Session Summary** at the end:
  - Overall score (out of 10)
  - Your strengths
  - Areas for growth
  - Recommended practice topics

---

## 🔍 What to Verify

### ✅ Backend Functionality

- [ ] Google AI responds with structured JSON
- [ ] If Google AI fails, OpenAI takes over automatically
- [ ] Career-specific questions based on selected role
- [ ] Questions match the selected interview style
- [ ] Session wraps up after target question count

### ✅ Frontend Functionality

- [ ] Role dropdown loads from `careerPathsNYC.json`
- [ ] Settings persist when starting session
- [ ] Messages display in chat format
- [ ] User messages appear on the right (blue)
- [ ] AI messages appear on the left (gray)
- [ ] Loading indicator shows while waiting
- [ ] Progress counter updates (e.g., "Question 3 of 5")

### ✅ Voice Features

- [ ] 🔊 button reads AI messages aloud
- [ ] 🎙️ button activates microphone
- [ ] Speech converts to text in input box
- [ ] Can send voice-transcribed answers

### ✅ Session Summary

- [ ] Appears after final question
- [ ] Shows overall score
- [ ] Lists strengths
- [ ] Lists areas for growth
- [ ] Provides practice recommendations

---

## 🐛 Troubleshooting

### **"Interview service unavailable"**

**Possible causes:**

1. Google AI API key not set in `.env`
2. OpenAI API key not set (fallback won't work)
3. Both APIs are down or rate-limited

**Fix:**

```bash
# In backend/.env
GOOGLE_AI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

### **Voice input not working**

**Cause:** Browser doesn't support Speech Recognition API

**Browsers that support it:**

- Chrome/Edge (best support)
- Safari (partial)
- Firefox (limited)

### **No career roles showing**

**Cause:** `careerPathsNYC.json` not found

**Fix:** Ensure file exists at `/data/careerPathsNYC.json`

### **JSON parsing errors**

**Cause:** AI returned malformed JSON

**Solution:** The code has automatic repair logic. If this persists:

1. Check backend logs
2. Verify API keys are valid
3. Try restarting the backend

---

## 📋 Example Test Flow

1. **Select:** CNA (Certified Nursing Assistant)
2. **Set:** Entry Level, Behavioral, Quick Mode
3. **Start Session**
4. **AI asks:** "Tell me about a time you helped someone in need."
5. **You answer:** (type or speak) "I volunteered at a food bank..."
6. **AI follows up** with feedback and next question
7. **Complete** 5 questions
8. **Review** your summary and scores

---

## 🎯 Key Features to Highlight

### **Smart Career Context**

The AI knows about the role you selected and asks relevant questions. For example:

- **CNA** → patient care scenarios
- **Warehouse** → safety and physical work
- **Retail** → customer service situations

### **Adaptive Feedback**

After each answer, the AI evaluates:

- **Content**: How complete was your answer?
- **Structure**: Did you organize it well (e.g., STAR method)?
- **Tone**: Was it professional and appropriate?

### **Real-Time Voice**

Practice like a real interview:

- Hear questions read aloud
- Speak your answers naturally
- Get instant transcription

---

## 🚀 Next Steps

After testing, you can:

1. **Add more careers** to `careerPathsNYC.json`
2. **Customize system prompt** in `server.js` for different coaching styles
3. **Save session history** to database (currently uses in-memory state)
4. **Add analytics** to track user progress over time

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console for frontend errors
2. Check backend terminal for API errors
3. Verify `.env` file has both API keys
4. Ensure backend is running on correct port

---

**Enjoy practicing your interview skills!** 🎉
