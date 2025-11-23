/**
 * SettingsViewWrapper.jsx
 * Wrapper for the settings management view
 */

function SettingsViewWrapper(props) {
  // SettingsView is already defined in app.jsx - use it via window global
  const SettingsView = window.SettingsView;

  if (!SettingsView) {
    return (
      <div className="text-center p-8">
        <p>Loading settings...</p>
      </div>
    );
  }

  return <SettingsView {...props} />;
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.SettingsViewWrapper = SettingsViewWrapper;
}
