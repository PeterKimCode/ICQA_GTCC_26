import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { Save, User, Mail, Shield, CheckCircle, Lock, AlertCircle } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateUser, changePassword } = useAuth();
  
  // Profile Info State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  // Password Change State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [passError, setPassError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setInfoMessage('Profile updated successfully.');
    setTimeout(() => setInfoMessage(''), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassMessage('');

    if (newPass !== confirmPass) {
      setPassError('New passwords do not match.');
      return;
    }

    if (newPass.length < 4) {
      setPassError('Password must be at least 4 characters.');
      return;
    }

    const success = changePassword(currentPass, newPass);
    if (success) {
      setPassMessage('Password changed successfully.');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setPassMessage(''), 3000);
    } else {
      setPassError('Current password is incorrect.');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Manage your account settings</p>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-gray-200 flex items-center gap-4">
          <div className="h-16 w-16 bg-blue-900 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>{user.role}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleInfoSubmit} className="p-6 space-y-6">
          {infoMessage && (
            <div className="p-3 bg-green-50 text-green-700 text-sm rounded border border-green-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> {infoMessage}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Information
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-500" /> Security
          </h3>
        </div>

        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
           {passMessage && (
            <div className="p-3 bg-green-50 text-green-700 text-sm rounded border border-green-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> {passMessage}
            </div>
          )}
          
          {passError && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {passError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                minLength={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Lock className="w-4 h-4" /> Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};