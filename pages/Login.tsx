import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try admin@icqa.org / password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-blue-900">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <ShieldCheck className="w-10 h-10 text-blue-900" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ICQA Certificate Manager</h1>
          <p className="text-gray-500 mt-2">Internal System Access</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@icqa.org"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-200">
          <p className="font-bold mb-2 text-gray-700">Demo Credentials:</p>
          <div className="space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Admin:</span>
              <span>admin@icqa.org / password</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Staff:</span>
              <span>staff@icqa.org / password</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-4">Public Verification?</p>
          <Link
            to="/guest"
            className="inline-block px-6 py-2 bg-white text-blue-900 border border-blue-900 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            Guest Access
          </Link>
        </div>
      </div>
    </div>
  );
};