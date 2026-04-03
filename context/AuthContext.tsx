import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);
const USER_STORAGE_KEY = 'icqa_user';
const LEGACY_USER_STORAGE_KEY = 'kcqa_user';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY) ?? localStorage.getItem(LEGACY_USER_STORAGE_KEY);
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        const { password, ...safeUser } = parsedUser;
        return safeUser;
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (email: string, pass: string) => {
    const foundMock = MOCK_USERS.find(u => u.email === email && u.password === pass);
    const stored = localStorage.getItem(USER_STORAGE_KEY) ?? localStorage.getItem(LEGACY_USER_STORAGE_KEY);
    let foundStored = null;

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email && parsed.password === pass) {
        foundStored = parsed;
      }
    }

    const found = foundStored || foundMock;
    if (found) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(found));
      localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
      const { password, ...safeUser } = found;
      setUser(safeUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    const stored = localStorage.getItem(USER_STORAGE_KEY) ?? localStorage.getItem(LEGACY_USER_STORAGE_KEY);
    if (stored && user) {
      const currentFullUser = JSON.parse(stored);
      const updatedFullUser = { ...currentFullUser, ...updates };
      setUser({ ...user, ...updates });
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedFullUser));
      localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
    }
  };

  const changePassword = (currentPass: string, newPass: string): boolean => {
    const stored = localStorage.getItem(USER_STORAGE_KEY) ?? localStorage.getItem(LEGACY_USER_STORAGE_KEY);
    if (!stored) return false;

    const currentFullUser = JSON.parse(stored);
    if (currentFullUser.password !== currentPass) {
      return false;
    }

    const updatedFullUser = { ...currentFullUser, password: newPass };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedFullUser));
    localStorage.removeItem(LEGACY_USER_STORAGE_KEY);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
