import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CertificateEditor } from './pages/CertificateEditor';
import { GuestSearch } from './pages/GuestSearch';
import { GuestView } from './pages/GuestView';
import { Profile } from './pages/Profile';
import { Landing } from './pages/Landing';
import { Notice } from './pages/Notice';
import { FAQ } from './pages/FAQ';
import { AuthProvider, useAuth } from './context/AuthContext';

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
          <Route path="/notice" element={<Notice />} />
          <Route path="/faq" element={<FAQ />} />
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