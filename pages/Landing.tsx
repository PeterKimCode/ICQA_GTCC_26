import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Shield,
  Globe,
  BookOpen,
  Briefcase,
  Users,
  Sun,
  Moon,
  AlertCircle,
  User,
  Phone,
  X
} from 'lucide-react';
import { PublicHeader } from '../components/PublicHeader';
import { CertificateService } from '../services/dataService';
import { Certificate } from '../types';
import { ICQA_NAME, ORGANIZATION_SHORT_NAME } from '../constants';

export const Landing: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchError, setSearchError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [foundCerts, setFoundCerts] = useState<Certificate[]>([]);
  const [certIndex, setCertIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('icqa_theme') ?? localStorage.getItem('kcqa_theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('icqa_theme', newTheme ? 'dark' : 'light');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');

    if (!searchName || !searchPhone) {
      setSearchError('Please enter both the certificate holder name and registered phone number.');
      return;
    }

    try {
      const certs = await CertificateService.getByNameAndPhone(searchName, searchPhone);
      if (!certs || certs.length === 0) {
        setSearchError('No matching qualification record was found. Please review the entered details.');
        return;
      }
      setFoundCerts(certs);
      setCertIndex(0);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setSearchError('Verification is temporarily unavailable. Please try again shortly.');
    }
  };

  const sectors = [
    { title: 'Professional Counseling', desc: 'International counseling and human development credentials for modern practice.', icon: <Users className="w-8 h-8" /> },
    { title: 'Workforce Development', desc: 'Applied credentials for trainers, supervisors, and organizational leaders.', icon: <Briefcase className="w-8 h-8" /> },
    { title: 'Public Safety', desc: 'Practical standards for safety, compliance, and operational readiness.', icon: <Shield className="w-8 h-8" /> },
    { title: 'Global Education', desc: 'Programs that support educators, lifelong learning providers, and institutions.', icon: <BookOpen className="w-8 h-8" /> },
  ];

  const themeClasses = isDarkMode
    ? 'bg-slate-950 text-slate-200 selection:bg-emerald-500/30'
    : 'bg-white text-slate-900 selection:bg-emerald-500/20';

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${themeClasses}`}>
      <button
        onClick={toggleTheme}
        className={`fixed right-6 bottom-10 z-[100] p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-white text-slate-950' : 'bg-slate-900 text-white'}`}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <PublicHeader isDarkMode={isDarkMode} />

      <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full -z-10 transition-opacity duration-1000 ${isDarkMode ? 'opacity-60' : 'opacity-15'}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-slate-950 via-slate-950/50 to-emerald-950/20' : 'from-emerald-50 via-white to-sky-50'}`}></div>
          <img src="/landing_hero.png" alt="Global qualification network" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className={`inline-block px-4 py-1.5 mb-8 rounded-full border text-sm font-bold tracking-widest ${isDarkMode ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
            ENGLISH-FIRST GLOBAL QUALIFICATION PLATFORM
          </div>
          <h1 className={`text-5xl lg:text-7xl font-black mb-8 font-display tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            International Civil
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-cyan-600">
              Qualification Association
            </span>
          </h1>
          <p className={`max-w-3xl mx-auto text-xl mb-12 leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            ICQA provides an international qualification verification environment for institutions, training providers, and certified professionals who need trusted records, clear governance, and accessible digital certificates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="#checker" className={`group px-10 py-5 rounded-full font-black transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
              Verify a Qualification
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className={`px-10 py-5 border rounded-full font-black transition-all ${isDarkMode ? 'bg-slate-800/40 border-white/10 text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
              About ICQA
            </a>
          </div>
        </div>
      </section>

      <section id="checker" className={`py-24 relative transition-colors ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className={`border rounded-[2.5rem] p-8 lg:p-16 shadow-2xl relative overflow-hidden group transition-all ${isDarkMode ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className={`absolute -top-24 -right-24 p-4 opacity-5 group-hover:opacity-10 transition-all duration-700 pointer-events-none ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              <Shield className="w-96 h-96 rotate-12" />
            </div>

            <div className="text-center mb-12">
              <h2 className={`text-4xl font-black mb-4 font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Verify an ICQA Credential</h2>
              <p className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>Search by full name and registered phone number to confirm the credential status and view certificate details.</p>
            </div>

            {searchError && (
              <div className="mb-8 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-bold text-sm">{searchError}</p>
              </div>
            )}

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-6">
              <div className="md:col-span-3">
                <label className={`block text-xs font-bold uppercase tracking-wide mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter the certificate holder name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:outline-none transition-all border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-emerald-500 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-500 placeholder-slate-400'}`}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <label className={`block text-xs font-bold uppercase tracking-wide mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Enter the registered phone number"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:outline-none transition-all border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-emerald-500 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-500 placeholder-slate-400'}`}
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Phone className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 flex items-end">
                <button type="submit" className="w-full h-[62px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-600/20">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h4 className="text-emerald-600 font-black tracking-[0.2em] text-sm">TRUSTED INTERNATIONAL RECOGNITION</h4>
              <h2 className={`text-5xl lg:text-6xl font-black font-display leading-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                Built for global
                <br />
                qualification credibility.
              </h2>
            </div>

            <p className={`text-xl leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              ICQA supports cross-border professional qualification management with transparent recordkeeping, digital certificate verification, and a governance-ready workflow for issuing organizations.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <FeatureCard
                isDarkMode={isDarkMode}
                icon={<Shield className="w-6 h-6" />}
                title="Trusted Verification"
                description="Credential data is presented in a clear and consistent format for institutions, employers, and learners."
              />
              <FeatureCard
                isDarkMode={isDarkMode}
                icon={<Globe className="w-6 h-6" />}
                title="International Reach"
                description="The platform is positioned for multinational training providers and globally mobile professionals."
              />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className={`aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-all duration-700 ${isDarkMode ? 'grayscale' : ''} hover:grayscale-0`}>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" alt="International professionals" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-slate-950/80' : 'from-slate-950/20'} to-transparent`}></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={`py-32 transition-colors ${isDarkMode ? 'bg-slate-900/20' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="space-y-4 max-w-2xl">
              <h4 className="text-emerald-600 font-bold tracking-widest text-sm">FOCUS AREAS</h4>
              <h2 className={`text-4xl lg:text-5xl font-black font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>International qualification sectors</h2>
            </div>
            <p className={`max-w-md text-lg font-medium lg:text-right ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              ICQA can support role-based qualification frameworks across applied services, education, and institutional development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector) => (
              <div key={sector.title} className={`group p-10 rounded-[2.5rem] border backdrop-blur-md transition-all duration-500 ${isDarkMode ? 'hover:border-emerald-500/50 hover:bg-emerald-500/5 border-white/5 bg-slate-900/50' : 'hover:border-emerald-500/50 hover:bg-white border-slate-200 bg-white/80'}`}>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/15 text-emerald-600 flex items-center justify-center mb-6">
                  {sector.icon}
                </div>
                <h3 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{sector.title}</h3>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} font-medium leading-relaxed`}>{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[3.5rem] p-1 shadow-2xl shadow-emerald-600/20">
          <div className={`rounded-[3.4rem] p-8 lg:p-20 grid lg:grid-cols-2 gap-16 items-center ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
            <div className="space-y-8">
              <h2 className={`text-4xl lg:text-5xl font-black font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                Need a modern home
                <br />
                for international credentials?
              </h2>
              <p className={`text-xl leading-relaxed font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                ICQA is positioned for organizations that need dependable English-first qualification presentation, searchable records, and certificate-ready output.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="px-10 py-5 bg-emerald-600 text-white rounded-full font-black hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 text-center">
                  Open Admin Portal
                </Link>
                <Link to="/guest" className={`px-10 py-5 border rounded-full font-black transition-all text-center ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'}`}>
                  Public Verification
                </Link>
              </div>
            </div>

            <div className={`border p-8 rounded-[2rem] space-y-4 shadow-sm ${isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <div className="grid gap-4">
                <input type="text" placeholder="Organization name" className={`w-full border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-950 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-950'}`} />
                <input type="email" placeholder="Business email" className={`w-full border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-950 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-950'}`} />
                <textarea placeholder="Tell us what kind of qualifications you manage" rows={4} className={`w-full border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none ${isDarkMode ? 'bg-slate-950 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-950'}`}></textarea>
                <button className={`w-full py-4 rounded-xl font-black transition-all ${isDarkMode ? 'bg-white text-slate-950 hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}>
                  Contact ICQA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`py-24 border-t transition-colors ${isDarkMode ? 'bg-slate-950 border-white/5' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="ICQA logo" className="w-12 h-12 object-contain" />
                <span className={`text-3xl font-black font-display tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{ORGANIZATION_SHORT_NAME}</span>
              </div>
              <p className={`text-lg max-w-sm leading-relaxed font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {ICQA_NAME}
              </p>
            </div>

            <div className="space-y-8">
              <h4 className={`text-sm font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-400'}`}>Navigate</h4>
              <ul className={`space-y-4 font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                <li><a href="#checker" className="hover:text-emerald-600 transition-colors">Verification</a></li>
                <li><Link to="/login" className="hover:text-emerald-600 transition-colors">Admin Login</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className={`text-sm font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-400'}`}>Contact</h4>
              <ul className={`space-y-4 font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                <li>hello@icqa.org</li>
                <li>+65 8000 2600</li>
                <li>Global Secretariat
                  <br />
                  Marina Bay, Singapore
                </li>
              </ul>
            </div>
          </div>

          <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-black tracking-widest uppercase ${isDarkMode ? 'border-white/5 text-slate-600' : 'border-slate-100 text-slate-400'}`}>
            <p>© 2026 {ICQA_NAME}</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {showModal && foundCerts.length > 0 && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className={`relative w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden rounded-3xl shadow-2xl ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'}`}>
            <div className={`shrink-0 h-2 ${isDarkMode ? 'bg-emerald-500' : 'bg-blue-600'}`}></div>
            <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
              <div className="shrink-0 flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-2xl font-black font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Verification Result</h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Matching ICQA records found</p>
                    {foundCerts.length > 1 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isDarkMode ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-blue-600'}`}>
                        {certIndex + 1}/{foundCerts.length}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-500' : 'hover:bg-slate-100 text-slate-400'}`}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
                <div className="flex flex-col items-center relative">
                  {foundCerts.length > 1 && (
                    <>
                      <button onClick={() => setCertIndex(prev => (prev - 1 + foundCerts.length) % foundCerts.length)} className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-gray-100 text-slate-900 shadow-lg'}`}>
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={() => setCertIndex(prev => (prev + 1) % foundCerts.length)} className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-gray-100 text-slate-900 shadow-lg'}`}>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className={`w-52 h-64 md:w-64 md:h-72 rounded-2xl overflow-hidden mb-4 shadow-xl border-4 ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
                    {foundCerts[certIndex].photoUrl ? (
                      <img src={foundCerts[certIndex].photoUrl} alt={foundCerts[certIndex].name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <Users className={`w-24 h-24 ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`} />
                      </div>
                    )}
                  </div>
                  <h4 className={`text-xl font-black uppercase text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{foundCerts[certIndex].name}</h4>
                </div>

                <div className="space-y-3 pb-4">
                  <ModalInfo isDarkMode={isDarkMode} label="ICQA Number" value={foundCerts[certIndex].kcqaNumber} />
                  <ModalInfo isDarkMode={isDarkMode} label="Qualification Registry Number" value={foundCerts[certIndex].ncqaNumber} />
                  <ModalInfo isDarkMode={isDarkMode} label="Qualification Type" value={foundCerts[certIndex].qualificationType} />
                  <ModalInfo isDarkMode={isDarkMode} label="Issue Date" value={foundCerts[certIndex].issueDate} />
                  <ModalInfo isDarkMode={isDarkMode} label="Education Provider" value={foundCerts[certIndex].eduDept} />
                  <ModalInfo isDarkMode={isDarkMode} label="Issuing Office" value={foundCerts[certIndex].issuingOffice} />
                  <ModalInfo isDarkMode={isDarkMode} label="Issuing Country" value={foundCerts[certIndex].issuingCountry} />
                  <ModalInfo isDarkMode={isDarkMode} label="Expiration Date" value={foundCerts[certIndex].expirationDate || 'N/A'} />
                  <ModalInfo isDarkMode={isDarkMode} label="Verified By" value={ICQA_NAME} />
                </div>
              </div>

              <div className="shrink-0 pt-6">
                <button onClick={() => navigate(`/guest/view/${foundCerts[certIndex].id}`)} className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl ${isDarkMode ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'}`}>
                  Open Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard: React.FC<{ isDarkMode: boolean; icon: React.ReactNode; title: string; description: string }> = ({ isDarkMode, icon, title, description }) => (
  <div className={`p-8 rounded-3xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/30' : 'bg-slate-50 border-slate-200 hover:border-emerald-500/30'}`}>
    <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
      {icon}
    </div>
    <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{title}</h3>
    <p className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>{description}</p>
  </div>
);

const ModalInfo: React.FC<{ isDarkMode: boolean; label: string; value: string }> = ({ isDarkMode, label, value }) => (
  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
    <p className={`text-[10px] uppercase font-black mb-0.5 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>{label}</p>
    <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{value}</p>
  </div>
);
