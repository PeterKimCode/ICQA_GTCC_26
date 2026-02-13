import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CertificateEditor } from './pages/CertificateEditor';
import { GuestSearch } from './pages/GuestSearch';
import { GuestView } from './pages/GuestView';
import { Profile } from './pages/Profile';
import { Landing } from './pages/Landing';
import { User, UserRole } from './types';
import { MOCK_USERS } from './constants';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for session persistence logic
    const stored = localStorage.getItem('icqa_user');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      // Strip password from state just in case, though we store it in LS for this demo
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = parsedUser;
      setUser(safeUser);
    }
  }, []);

  const login = (email: string, pass: string) => {
    // 1. Check Mock Users
    const foundMock = MOCK_USERS.find(u => u.email === email && u.password === pass);

    // 2. Check LocalStorage (if user changed password previously in this browser session)
    const stored = localStorage.getItem('icqa_user');
    let foundStored = null;
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email && parsed.password === pass) {
        foundStored = parsed;
      }
    }

    const found = foundStored || foundMock;

    if (found) {
      // Store the FULL object (including password) in LS so we can verify "Current Password" later
      localStorage.setItem('icqa_user', JSON.stringify(found));

      // Remove password from React State for security
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = found;
      setUser(safeUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('icqa_user');
  };

  const updateUser = (updates: Partial<User>) => {
    const stored = localStorage.getItem('icqa_user');
    if (stored && user) {
      const currentFullUser = JSON.parse(stored);
      const updatedFullUser = { ...currentFullUser, ...updates };

      // Update State
      setUser({ ...user, ...updates });
      // Update Storage
      localStorage.setItem('icqa_user', JSON.stringify(updatedFullUser));
    }
  };

  const changePassword = (currentPass: string, newPass: string): boolean => {
    const stored = localStorage.getItem('icqa_user');
    if (!stored) return false;

    const currentFullUser = JSON.parse(stored);

    // Verify old password
    if (currentFullUser.password !== currentPass) {
      return false;
    }

    // Update password
    const updatedFullUser = { ...currentFullUser, password: newPass };
    localStorage.setItem('icqa_user', JSON.stringify(updatedFullUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Protected Route ---
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// --- Main App ---
const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guest" element={<GuestSearch />} />
          <Route path="/guest/view/:id" element={<GuestView />} />

          {/* Protected Routes (Staff/Admin) */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/certificate/new" element={<CertificateEditor />} />
            <Route path="/certificate/edit/:id" element={<CertificateEditor />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;