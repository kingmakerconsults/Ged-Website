/**
 * DashboardView.jsx
 * Wrapper for the main dashboard/start screen
 * Updated: Refactored view structure for better organization
 */

function DashboardView(props) {
  // StartScreen is already defined in app.jsx - use it via window global
  const StartScreen = window.StartScreen;

  if (!StartScreen) {
    return (
      <div className="text-center p-8">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return <StartScreen {...props} />;
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.DashboardView = DashboardView;
}
