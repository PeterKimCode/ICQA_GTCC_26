import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LogOut, Home, PlusCircle, Settings, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100 font-sans print:bg-white">
      <aside className="w-64 bg-slate-900 text-white flex-col hidden md:flex no-print">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ICQA logo" className="w-10 h-10 object-contain" />
            <span className="font-bold text-xl tracking-tight">ICQA Manager</span>
          </div>
          <div className="mt-4 text-xs text-slate-400">
            Logged in as:
            <br />
            <span className="font-medium text-white">{user.name}</span> ({user.role})
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <Home className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink to="/certificate/new" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <PlusCircle className="w-5 h-5" />
            Issue Certificate
          </NavLink>

          <div className="pt-4 mt-2 border-t border-slate-800">
            <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Settings className="w-5 h-5" />
              My Profile
            </NavLink>
          </div>

          {user.role === UserRole.ADMIN && (
            <div className="pt-4 mt-2 border-t border-slate-800">
              <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Admin</div>
              <NavLink to="/admin/notices" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                <Bell className="w-5 h-5" />
                Manage Notices
              </NavLink>
              <NavLink to="/admin/faqs" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                <HelpCircle className="w-5 h-5" />
                Manage FAQs
              </NavLink>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors w-full px-4 py-2">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative">
        <div className="no-print p-6 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
