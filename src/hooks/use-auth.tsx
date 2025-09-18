'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type UserRole = 'student' | 'tutor' | 'admin' | null;

interface AuthContextType {
  role: UserRole;
  user: {name: string; email: string; role: UserRole} | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'campuslearn-auth-token';

const MOCK_USERS = {
  student: {
    name: 'Johannes Botha',
    email: 'johannesbotha@campuslearn.co.xy',
    role: 'student' as UserRole,
  },
  tutor: {
    name: 'Prof. Frederick Mbaku',
    email: 'freddiembaku@campuslearn.co.xy',
    role: 'tutor' as UserRole,
  },
  admin: {
    name: 'Mabena Xholisile',
    email: 'mabxho@campuslearn.co.xy',
    role: 'admin' as UserRole,
  },
};

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && token.startsWith('demo-token:')) {
        const savedRole = token.split(':')[1] as UserRole;
        if (['student', 'tutor', 'admin'].includes(savedRole)) {
          setRole(savedRole);
        }
      }
    } catch (error) {
      console.error('Could not access localStorage:', error);
    } finally {
        setIsAuthLoading(false);
    }
  }, []);

  const login = useCallback((newRole: UserRole) => {
    if (newRole) {
      try {
        setIsAuthLoading(true);
        localStorage.setItem(TOKEN_KEY, `demo-token:${newRole}`);
        setRole(newRole);
        setIsAuthLoading(false);
      } catch (error) {
        console.error('Could not access localStorage:', error);
        setIsAuthLoading(false);
      }
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      setRole(null);
    } catch (error) {
      console.error('Could not access localStorage:', error);
    }
  }, []);

  const user = role ? MOCK_USERS[role] : null;

  const value = useMemo(
    () => ({
      role,
      user,
      isAuthenticated: !!role,
      isAuthLoading,
      login,
      logout,
    }),
    [role, user, isAuthLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
