/**
 * ProfileViewWrapper.jsx
 * Wrapper for the profile management view
 */

export default function ProfileViewWrapper(props) {
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
