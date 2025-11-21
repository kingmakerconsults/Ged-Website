/**
 * WorkforceView.jsx
 * Top-level view for Workforce Hub and workforce tools
 */

export default function WorkforceView({ onBack }) {
  // WorkforceHub is already defined in app.jsx - use it via window global
  const WorkforceHub = window.WorkforceHub;

  if (!WorkforceHub) {
    return (
      <div className="text-center p-8">
        <p>Loading workforce tools...</p>
      </div>
    );
  }

  return <WorkforceHub onBack={onBack} />;
}
