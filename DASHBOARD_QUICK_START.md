# Student Dashboard Quick Start Guide

## 🚀 Accessing the Dashboard

### Option 1: Direct Navigation (Frontend)

```javascript
// In app.jsx, set activeView to 'homeroom'
setActiveView('homeroom');
```

### Option 2: Add Navigation Link

Add a button/link in your existing navigation:

```javascript
<button onClick={() => setActiveView('homeroom')}>📊 My Dashboard</button>
```

### Option 3: URL Route (Future Enhancement)

Once integrated with your routing system:

```
/dashboard
```

---

## 📊 Available Data

### 1. Next Task

- Shows today's Coach Smith recommendation
- Displays progress (minutes completed/expected)
- Button to start task immediately

### 2. Mastery Levels

- **RLA:** Reading, Argument, Grammar, Writing
- **Math:** Algebra, Quantitative, Geometry, Statistics
- **Science:** Life, Physical, Earth, Data
- **Social Studies:** Civics, Economics, History, Geography

### 3. Study Time

- Current week hours
- Current month hours
- All-time hours
- By-subject breakdown

### 4. Badges

- 4 subject badges (RLA, Math, Science, Social Studies)
- Earned when score ≥ 145 or subject marked passed
- Shows earn date or score

### 5. Score History

- Last 20 comprehensive exam attempts
- Highest score per subject
- Pass/fail status

### 6. Study Estimate

- Intelligent time-to-pass calculation
- Based on last 3 scores
- Shows improvement rate

### 7. Career Recommendations

- Top 2 careers based on strengths
- Salary ranges
- Link to Workforce Explorer

---

## 🎨 Testing the Dashboard

### 1. Backend Test

```bash
# In backend directory
npm start
```

Test endpoints with curl:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3002/api/student/next-task
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3002/api/student/mastery
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3002/api/student/study-time
```

### 2. Frontend Test

1. Open browser to your app
2. Login as a student
3. Navigate to dashboard (use navigation method above)
4. Verify all cards load
5. Test interactions (Improve button, View History, etc.)

### 3. Mobile Test

- Open in Chrome DevTools mobile view
- Check responsive layout (2-column becomes 1-column)
- Verify touch interactions work
- Check Career Panel moves to bottom on mobile

---

## 🔧 Customization

### Change Subject Colors

Edit `LearningPlanCard.jsx`:

```javascript
const subjectColors = {
  Math: 'from-blue-500 to-blue-700',
  Science: 'from-red-500 to-red-700',
  // Add your colors here
};
```

### Add New Mastery Domains

Edit `MasteryPanel.jsx`:

```javascript
const domainDefinitions = {
  rla: [
    { label: 'Your Domain', skill: 'keyword' },
    // Add more...
  ],
};
```

### Modify Study Estimate Algorithm

Edit backend `server.js` at `/api/student/study-estimate`:

```javascript
// Change the 1.5 hours per attempt multiplier
const hoursRemaining = attemptsNeeded * 1.5;
```

---

## 🐛 Common Issues

### Issue: "Dashboard shows no data"

**Solution:** User needs quiz_attempts records. Have them take a practice quiz first.

### Issue: "Next task is null"

**Solution:** Create coach_daily_progress entries for the user:

```sql
INSERT INTO coach_daily_progress (user_id, subject, plan_date, expected_minutes)
VALUES (1, 'Math', CURRENT_DATE, 45);
```

### Issue: "Badges not showing"

**Solution:** User needs either:

- A scaled_score ≥ 145 in quiz_attempts, OR
- user_subject_status.passed = true

### Issue: "Career recommendations are generic"

**Solution:** Expected behavior - customization improves with more quiz attempts.

---

## 📱 Navigation Integration

Add dashboard link to your main navigation:

```javascript
// Example: In your header/sidebar
<nav>
  <button onClick={() => setActiveView('dashboard')}>Home</button>
  <button onClick={() => setActiveView('homeroom')}>My Dashboard</button>
  <button onClick={() => setActiveView('progress')}>Progress</button>
  <button onClick={() => setActiveView('profile')}>Profile</button>
</nav>
```

---

## ✅ Launch Checklist

Before enabling for students:

- [ ] Backend server is running
- [ ] All 7 API endpoints return data
- [ ] JWT authentication is working
- [ ] Database tables have sample data:
  - [ ] coach_daily_progress (at least 1 row)
  - [ ] quiz_attempts (at least 3 rows)
  - [ ] user_subject_status (optional)
- [ ] Frontend loads without console errors
- [ ] Navigation to/from dashboard works
- [ ] Mobile layout is responsive
- [ ] Dark/light themes both work

---

## 🎯 Next Steps

1. **Test with Real Users:**

   - Gather feedback on layout
   - Check load times
   - Monitor for errors

2. **Add Tutorial:**

   - Create walkthrough for first-time users
   - Highlight key features
   - Show how to improve skills

3. **Analytics:**

   - Track which features are used most
   - Monitor API response times
   - Log user navigation patterns

4. **Iterate:**
   - Add requested features
   - Improve recommendations
   - Enhance visualizations

---

## 📞 Support

For issues or questions:

- Check `STUDENT_DASHBOARD_IMPLEMENTATION.md` for full details
- Review browser console for error messages
- Test API endpoints individually
- Verify database records exist

---

**Dashboard Status:** ✅ Ready for Testing
**Last Updated:** November 18, 2025
**Version:** 1.0.0
