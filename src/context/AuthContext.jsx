import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 'usr_guest_demo',
  name: 'Institutional Guest',
  email: 'investor@bullrix.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Research Tier',
  verified: false,
  isLoggedIn: false,
  preferences: {
    theme: 'dark',
    defaultMarket: 'India',
    currency: 'INR',
    autoRefreshSec: 30,
    notificationDigest: 'daily'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bullrix_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse user session:', e);
    }
    return DEFAULT_USER;
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Initialize Google Identity Services if client ID is available
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('your_google_client_id')) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      try {
        if (script.parentNode) script.parentNode.removeChild(script);
      } catch (err) {}
    };
  }, []);

  const handleGoogleCredentialResponse = (response) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      // Decode JWT payload without external library
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);

      const authedUser = {
        id: decoded.sub || 'usr_' + Date.now(),
        name: decoded.name || decoded.email.split('@')[0],
        email: decoded.email,
        avatar: decoded.picture || DEFAULT_USER.avatar,
        role: 'Pro Investor',
        verified: decoded.email_verified || true,
        isLoggedIn: true,
        authProvider: 'google',
        preferences: user.preferences
      };

      setUser(authedUser);
      localStorage.setItem('bullrix_user_session', JSON.stringify(authedUser));
    } catch (err) {
      console.error('Google Sign-In decode error:', err);
      setAuthError('Failed to parse Google authentication token.');
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithDemo = (customName = 'Agrim Jain', customEmail = 'agrim.jain@bullrix.ai') => {
    const demoUser = {
      id: 'usr_demo_pro',
      name: customName,
      email: customEmail,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Principal Quantitative Analyst',
      verified: true,
      isLoggedIn: true,
      authProvider: 'demo',
      preferences: user.preferences
    };
    setUser(demoUser);
    localStorage.setItem('bullrix_user_session', JSON.stringify(demoUser));
    setAuthError(null);
  };

  const logout = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem('bullrix_user_session');
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const updatePreferences = (newPrefs) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        preferences: { ...prev.preferences, ...newPrefs }
      };
      localStorage.setItem('bullrix_user_session', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authError,
        loginWithDemo,
        logout,
        updatePreferences,
        handleGoogleCredentialResponse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
