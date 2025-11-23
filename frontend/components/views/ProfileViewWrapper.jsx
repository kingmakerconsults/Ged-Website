/**
 * ProfileViewWrapper.jsx
 * Wrapper for the profile management view
 */

function ProfileViewWrapper(props) {
  // ProfileView is already defined in app.jsx - use it via window global
  const ProfileView = window.ProfileView;

  if (!ProfileView) {
    return (
      <div className="text-center p-8">
        <p>Loading profile...</p>
      </div>
    );
  }

  return <ProfileView {...props} />;
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.ProfileViewWrapper = ProfileViewWrapper;
}
