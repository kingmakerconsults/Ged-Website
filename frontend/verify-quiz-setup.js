// Quick verification script to check if quiz data loads properly
// Run this in browser console after app loads

(function verifyQuizSetup() {
  console.log('=== Quiz Data Verification ===\n');

  // Check global variables
  const checks = [
    { name: 'window.AppData', exists: !!window.AppData },
    { name: 'window.UnifiedQuizCatalog', exists: !!window.UnifiedQuizCatalog },
    { name: 'window.ExpandedQuizData', exists: !!window.ExpandedQuizData },
    {
      name: 'window.MergedExpandedQuizData',
      exists: !!window.MergedExpandedQuizData,
    },
    {
      name: 'window.Data.expandedQuizData',
      exists: !!window.Data?.expandedQuizData,
    },
  ];

  console.log('Global Variables:');
  checks.forEach((check) => {
    console.log(`  ${check.exists ? '✓' : '✗'} ${check.name}`);
  });

  // Check subjects
  const subjects = window.AppData ? Object.keys(window.AppData) : [];
  console.log(`\nSubjects Found (${subjects.length}):`);
  subjects.forEach((subject) => {
    const categories = window.AppData[subject]?.categories || {};
    const categoryCount = Object.keys(categories).length;
    let totalQuestions = 0;

    Object.values(categories).forEach((cat) => {
      if (cat.topics) {
        cat.topics.forEach((topic) => {
          if (topic.questions) {
            totalQuestions += topic.questions.length;
          }
        });
      }
    });

    console.log(
      `  - ${subject}: ${categoryCount} categories, ~${totalQuestions} questions`
    );
  });

  // Check for empty catalogs
  if (subjects.length === 0) {
    console.error('\n❌ ERROR: No subjects found! Quiz data did not load.');
    console.log('Check:');
    console.log('  1. Network tab for failed /quizzes/*.json requests');
    console.log('  2. Console for [quiz-loader] error messages');
    console.log('  3. Backend is running and accessible');
  } else {
    console.log('\n✓ Quiz data loaded successfully!');
  }

  // Check image paths
  console.log('\nImage Assets:');
  const logoExists = document.querySelector(
    'img[src="/images/kingmaker-logo.svg"]'
  );
  console.log(`  ${logoExists ? '✓' : '✗'} Kingmaker logo path correct`);

  return {
    success: subjects.length > 0,
    subjects: subjects,
    totalSubjects: subjects.length,
    checks: checks,
  };
})();
