import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

function ensureUserProfile(user) {
  if (!user || typeof user !== 'object') {
    return null;
  }
  const email = typeof user.email === 'string' ? user.email : '';
  const baseName =
    user.name && typeof user.name === 'string' && user.name.trim()
      ? user.name.trim()
      : email.includes('@')
      ? email.split('@')[0]
      : email || 'Learner';
  const picture =
    user.picture && typeof user.picture === 'string' && user.picture.trim()
      ? user.picture.trim()
      : `https://ui-avatars.com/api/?background=0ea5e9&color=fff&name=${encodeURIComponent(
          baseName
        )}`;
  const role = typeof user.role === 'string' ? user.role : 'student';
  const organizationId = user.organization_id ?? null;
  const organizationName = user.organization_name ?? null;

  return {
    ...user,
    name: baseName,
    picture,
    role,
    organization_id: organizationId,
    organization_name: organizationName,
  };
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage?.getItem('appToken') || null;
    } catch (error) {
      console.warn('Unable to restore stored auth token:', error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const currentUserRef = useRef(null);

  // Restore user from localStorage on mount
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = localStorage.getItem('appUser');
        const storedToken = localStorage.getItem('appToken');

        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          const profile = ensureUserProfile(user);
          if (profile) {
            currentUserRef.current = profile;
            setCurrentUser(profile);
            setAuthToken(storedToken);
          }
        }
      } catch (error) {
        console.error('Failed to restore stored user:', error);
        localStorage.removeItem('appUser');
        localStorage.removeItem('appToken');
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = useCallback((user, token) => {
    if (!token) {
      console.error('Login response did not include a token.');
      return false;
    }

    const profile = ensureUserProfile(user);
    if (!profile) {
      console.error('Login response did not include a valid user profile.');
      return false;
    }

    try {
      localStorage.setItem('appUser', JSON.stringify(profile));
      localStorage.setItem('appToken', token);
    } catch (error) {
      console.warn('Unable to persist login locally:', error);
    }

    setAuthToken(token);
    currentUserRef.current = profile;
    setCurrentUser(profile);

    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('appUser');
    localStorage.removeItem('appToken');
    setCurrentUser(null);
    setAuthToken(null);
    currentUserRef.current = null;
  }, []);

  const updateUser = useCallback((updates) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('appUser', JSON.stringify(updated));
      } catch (error) {
        console.warn('Unable to persist user update:', error);
      }
      currentUserRef.current = updated;
      return updated;
    });
  }, []);

  const getToken = useCallback(() => {
    return authToken || localStorage.getItem('appToken');
  }, [authToken]);

  const isAuthenticated = !!currentUser;
  const isAdmin =
    currentUser &&
    [
      'superAdmin',
      'super_admin',
      'orgAdmin',
      'org_admin',
      'instructor',
    ].includes(currentUser.role);

  const value = {
    currentUser,
    authToken,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    updateUser,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
