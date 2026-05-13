import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { ORGANIZATION_SHORT_NAME } from '../constants';

interface PublicHeaderProps {
  isDarkMode: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-slate-950/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt={`${ORGANIZATION_SHORT_NAME} logo`} className="w-12 h-12 object-contain" />
            <span className={`text-lg sm:text-xl font-bold tracking-tight font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              {ORGANIZATION_SHORT_NAME}
            </span>
          </Link>

          <div className="flex-1 flex justify-center px-2">
            <div id="google_translate_element" className="flex items-center scale-90 sm:scale-100 origin-center"></div>
          </div>

          <div className={`hidden md:flex items-center gap-6 border-l pl-8 ml-8 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/20 text-sm font-semibold tracking-wide"
            >
              <LogIn className="w-4 h-4" />
              <span>icqaadmin</span>
            </Link>
          </div>

          <div className="relative ml-4">
            <button className={`p-2 shrink-0 ${isDarkMode ? 'text-white' : 'text-slate-950'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-transparent z-[100] animate-in slide-in-from-top-2 duration-300">
                <div className={`p-4 rounded-3xl shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-white/10 shadow-slate-950/50' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
                  <div className="flex flex-col space-y-1">
                    <Link to="/notice" className={`px-4 py-3 rounded-xl transition-colors font-bold ${isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'}`}>
                      Notices
                    </Link>
                    <Link to="/faq" className={`px-4 py-3 rounded-xl transition-colors font-bold ${isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'}`}>
                      FAQs
                    </Link>
                    <div className={`my-2 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}></div>
                    <Link to="/login" className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-center font-bold shadow-lg shadow-emerald-600/20 transition-all">
                      <LogIn className="w-4 h-4" /> icqaadmin login
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
