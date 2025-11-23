/**
 * HomeroomView.jsx
 * Wrapper for the student homeroom view
 */

function HomeroomView(props) {
  // StudentHomeRoom is already defined in app.jsx - use it via window global
  const StudentHomeRoom = window.StudentHomeRoom;

  if (!StudentHomeRoom) {
    return (
      <div className="text-center p-8">
        <p>Loading homeroom...</p>
      </div>
    );
  }

  return <StudentHomeRoom {...props} />;
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.HomeroomView = HomeroomView;
}
