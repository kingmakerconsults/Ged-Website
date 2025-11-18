// Test Script for Enhanced Question Types
// Copy and paste this into the browser console when on the GED Website

(async function testEnhancedQuestions() {
  console.log('🧪 Testing Enhanced Question Types...');

  try {
    // Load the test exam from the JSON file
    const response = await fetch('/test-exam-enhancements.json');
    const testExam = await response.json();

    console.log('✅ Loaded test exam:', testExam.title);
    console.log('📝 Questions:', testExam.questions.length);

    // Check if startQuiz function is available
    if (typeof window.__GED_START_QUIZ__ === 'function') {
      console.log('🚀 Starting test exam...');
      window.__GED_START_QUIZ__(testExam, testExam.subject);

      console.log('\n📋 Test Checklist:');
      console.log(
        '1. ✓ Question 1: Multiple-select with 3 correct answers (2, 7, 11)'
      );
      console.log('2. ✓ Question 2: Numeric entry (exact answer: 16.5)');
      console.log(
        '3. ✓ Question 3: Numeric entry with tolerance (answer: 1.125 ± 0.01)'
      );
      console.log(
        '4. ✓ Question 4-5: Passage linking (same passage, different questions)'
      );
      console.log('5. ✓ Question 6: Standard single-select (control test)');
      console.log('\n🔍 Verify:');
      console.log(
        '  - Multiple-select shows "(Select ALL that apply)" and checkboxes'
      );
      console.log('  - Numeric entry shows decimal keyboard hint');
      console.log('  - Passage appears above questions 4 and 5');
      console.log('  - Scoring correctly validates all question types');
    } else {
      console.error(
        '❌ startQuiz function not found. Make sure you are logged in and on the main app page.'
      );
    }
  } catch (error) {
    console.error('❌ Error loading test exam:', error);
    console.log(
      '💡 Make sure test-exam-enhancements.json is in the root directory'
    );
  }
})();
