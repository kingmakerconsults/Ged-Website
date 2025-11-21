/**
 * SettingsViewWrapper.jsx
 * Wrapper for the settings management view
 */

export default function SettingsViewWrapper(props) {
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
