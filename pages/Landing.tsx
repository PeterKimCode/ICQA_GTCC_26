import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    ChevronRight,
    Users,
    Briefcase,
    Wrench,
    Microscope,
    Heart,
    Shield,
    BookOpen,
    Globe,
    LogIn,
    Menu,
    X,
    Sun,
    Moon,
    AlertCircle
} from 'lucide-react';
import { CertificateService } from '../services/dataService';
import { isExpired } from '../utils';
import { Certificate } from '../types';
import { ICQA_NAME } from '../constants';

export const Landing: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchNumber, setSearchNumber] = useState('');
    const [searchError, setSearchError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [foundCert, setFoundCert] = useState<Certificate | null>(null);
    const navigate = useNavigate();

    // Handle theme persistence
    useEffect(() => {
        const savedTheme = localStorage.getItem('icqa_theme');
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

        if (!searchName || !searchNumber) {
            setSearchError('Please enter both Name and Certificate Number.');
            return;
        }

        try {
            const cert = await CertificateService.getByNumberAndName(searchNumber, searchName);

            if (!cert) {
                setSearchError('Certificate not found. Please check your details.');
                return;
            }

            if (isExpired(cert.expirationDate) || cert.status === 'REVOKED' || cert.status === 'EXPIRED') {
                setSearchError('This certificate has expired or is invalid.');
                return;
            }

            setFoundCert(cert);
            setShowModal(true);
        } catch (err: any) {
            setSearchError('An error occurred. Please try again later.');
            console.error(err);
        }
    };

    const services = [
        { title: 'Counseling', icon: <Users className="w-8 h-8" />, desc: 'Expert guidance for your certification journey.', bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-50' },
        { title: 'Management', icon: <Briefcase className="w-8 h-8" />, desc: 'Systematic oversight of qualification standards.', bg: isDarkMode ? 'bg-emerald-900/40' : 'bg-emerald-50' },
        { title: 'Specialization', icon: <Wrench className="w-8 h-8" />, desc: 'Focused training in high-demand technical fields.', bg: isDarkMode ? 'bg-indigo-900/40' : 'bg-indigo-50' },
        { title: 'Research', icon: <Microscope className="w-8 h-8" />, desc: 'Advancing the science of professional competency.', bg: isDarkMode ? 'bg-cyan-900/40' : 'bg-cyan-50' },
        { title: 'Welfare', icon: <Heart className="w-8 h-8" />, desc: 'Supporting the growth and well-being of our members.', bg: isDarkMode ? 'bg-rose-900/40' : 'bg-rose-50' },
        { title: 'Administration', icon: <Shield className="w-8 h-8" />, desc: 'Robust infrastructure for credential verification.', bg: isDarkMode ? 'bg-slate-800/40' : 'bg-slate-50' },
        { title: 'Education', icon: <BookOpen className="w-8 h-8" />, desc: 'World-class curricula for the modern workforce.', bg: isDarkMode ? 'bg-teal-900/40' : 'bg-teal-50' },
        { title: 'Foreign Language', icon: <Globe className="w-8 h-8" />, desc: 'Breaking barriers with international communication.', bg: isDarkMode ? 'bg-violet-900/40' : 'bg-violet-50' },
    ];

    const themeClasses = isDarkMode
        ? "bg-slate-950 text-slate-200 selection:bg-emerald-500/30"
        : "bg-white text-slate-900 selection:bg-emerald-500/20";

    return (
        <div className={`min-h-screen transition-colors duration-500 font-sans ${themeClasses}`}>

            {/* Theme Toggle Button (Side) */}
            <button
                onClick={toggleTheme}
                className={`fixed right-6 bottom-10 z-[100] p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-white text-slate-950' : 'bg-slate-900 text-white'
                    }`}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-slate-950/80 border-white/10' : 'bg-white/80 border-slate-200'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="ICQA Logo" className="w-12 h-12 object-contain" />
                            <span className={`text-lg sm:text-xl font-bold tracking-tight font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>ICQA</span>
                        </div>

                        <div className="flex-1 flex justify-center px-2">
                            <div id="google_translate_element" className="flex items-center scale-90 sm:scale-100 origin-center"></div>
                        </div>

                        <div className={`hidden md:flex items-center gap-6 border-l pl-8 ml-8 ${isDarkMode ? 'border-white/10' : 'border-slate-200'
                            }`}>
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/20 text-sm font-semibold tracking-wide"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>INTERNAL ACCESS</span>
                            </Link>
                        </div>

                        <button className={`p-2 shrink-0 ${isDarkMode ? 'text-white' : 'text-slate-950'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={`md:hidden p-4 space-y-4 border-b animate-in slide-in-from-top duration-300 ${isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-100'
                        }`}>
                        <Link to="/login" className="block py-4 px-4 bg-emerald-600 text-white rounded-xl text-center font-bold">
                            INTERNAL ACCESS
                        </Link>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-full -z-10 transition-opacity duration-1000 ${isDarkMode ? 'opacity-60' : 'opacity-10'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-slate-950 via-slate-950/40 to-emerald-950/20' : 'from-emerald-50 to-white'}`}></div>
                    <img
                        src="/landing_hero.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <div className={`inline-block px-4 py-1.5 mb-8 rounded-full border text-sm font-bold tracking-widest animate-fade-in ${isDarkMode ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                        }`}>
                        GLOBAL STANDARDS OF EXCELLENCE
                    </div>
                    <h1 className={`text-5xl lg:text-8xl font-black mb-8 font-display tracking-tight leading-[1.1] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                        International Civil <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-cyan-600">
                            Qualification Association
                        </span>
                    </h1>
                    <p className={`max-w-3xl mx-auto text-xl mb-12 leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        We bridge the gap between talent and verification through rigorous,
                        industry-recognized standards for professional certification.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a href="#checker" className={`group px-10 py-5 rounded-full font-black transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 ${isDarkMode ? 'bg-white text-slate-950 hover:bg-emerald-400 shadow-white/5' : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-200'
                            }`}>
                            VERIFY CERTIFICATION
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <button className={`px-10 py-5 border rounded-full font-black transition-all ${isDarkMode ? 'bg-slate-800/40 border-white/10 text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
                            }`}>
                            EXPLORE MISSION
                        </button>
                    </div>
                </div>
            </section>

            {/* Qualification Checker Section */}
            <section id="checker" className={`py-24 relative transition-colors ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                <div className="max-w-5xl mx-auto px-4">
                    <div className={`border rounded-[2.5rem] p-8 lg:p-16 shadow-2xl relative overflow-hidden group transition-all ${isDarkMode ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-200'
                        }`}>
                        <div className={`absolute -top-24 -right-24 p-4 opacity-5 group-hover:opacity-10 transition-all duration-700 pointer-events-none ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                            <Shield className="w-96 h-96 rotate-12" />
                        </div>

                        <div className="text-center mb-12">
                            <h2 className={`text-4xl font-black mb-4 font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>QUALIFICATION SEARCH</h2>
                            <p className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>Instantly verify any ICQA professional credential.</p>
                        </div>

                        {searchError && (
                            <div className="mb-8 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl animate-shake">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="font-bold text-sm">{searchError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-6">
                            <div className="md:col-span-3 space-y-2.5">
                                <label className={`text-xs font-black tracking-widest uppercase ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Full Name</label>
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    placeholder="e.g. AN CHANG NAM"
                                    className={`w-full border rounded-2xl px-6 py-4.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-950 placeholder:text-slate-300'
                                        }`}
                                />
                            </div>
                            <div className="md:col-span-3 space-y-2.5">
                                <label className={`text-xs font-black tracking-widest uppercase ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ICQA Number</label>
                                <input
                                    type="text"
                                    value={searchNumber}
                                    onChange={(e) => setSearchNumber(e.target.value)}
                                    placeholder="e.g. GC01-24"
                                    className={`w-full border rounded-2xl px-6 py-4.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${isDarkMode ? 'bg-slate-900/50 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-950 placeholder:text-slate-300'
                                        }`}
                                />
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                <button
                                    type="submit"
                                    className="w-full h-[62px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-600/20"
                                >
                                    <Search className="w-6 h-6" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-20 items-center">
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-4" id="about-detail">
                            <h4 className="text-emerald-600 font-black tracking-[0.2em] text-sm">AUTHENTICITY & INTEGRITY</h4>
                            <h2 className={`text-5xl lg:text-6xl font-black font-display leading-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                                Global Impact. <br />
                                Local Excellence.
                            </h2>
                        </div>

                        <p className={`text-xl leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            The ICQA serves as a foundational pillar for professional growth, providing
                            a standardized framework for assessing and certifying skillsets worldwide.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className={`p-8 rounded-3xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/30' : 'bg-slate-50 border-slate-200 hover:border-emerald-500/30'
                                }`}>
                                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Verified Authority</h3>
                                <p className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>Regulated standards ensuring absolute trust in every credential.</p>
                            </div>
                            <div className={`p-8 rounded-3xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/30' : 'bg-slate-50 border-slate-200 hover:border-emerald-500/30'
                                }`}>
                                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Global Recognition</h3>
                                <p className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>Credentials that carry weight across borders and industries.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className={`aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-all duration-700 ${isDarkMode ? 'grayscale' : ''} hover:grayscale-0`}>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                                alt="Professional Expertise"
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-slate-950/80' : 'from-slate-950/20'} to-transparent`}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className={`py-32 transition-colors ${isDarkMode ? 'bg-slate-900/20' : 'bg-slate-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
                        <div className="space-y-4 max-w-2xl" id="services-detail">
                            <h4 className="text-emerald-600 font-bold tracking-widest text-sm">EIGHT PILLARS</h4>
                            <h2 className={`text-4xl lg:text-5xl font-black font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Our Specialized Domains</h2>
                        </div>
                        <p className={`max-w-md text-lg font-medium lg:text-right ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                            Explore our core areas where we set the benchmark for professional standards.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className={`group p-10 rounded-[2.5rem] border backdrop-blur-md transition-all duration-500 cursor-pointer ${isDarkMode
                                    ? 'hover:border-emerald-500/50 hover:bg-emerald-500/5 border-white/5 ' + service.bg
                                    : 'hover:border-emerald-500 bg-white border-slate-200'
                                    }`}
                            >
                                <div className="mb-8 text-emerald-600 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    {service.icon}
                                </div>
                                <h3 className={`text-xl font-black mb-4 font-display tracking-wider uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{service.title}</h3>
                                <p className={`leading-relaxed font-bold transition-colors ${isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}>{service.desc}</p>
                                <div className="mt-8 flex items-center gap-2 text-emerald-600 text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity">
                                    READ MORE <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form CTA */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[3.5rem] p-1 shadow-2xl shadow-emerald-600/20">
                    <div className={`rounded-[3.4rem] p-8 lg:p-20 grid lg:grid-cols-2 gap-16 items-center ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
                        <div className="space-y-8">
                            <h2 className={`text-4xl lg:text-5xl font-black font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Ready to verify <br />your future?</h2>
                            <p className={`text-xl leading-relaxed font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Join thousands who have validated their skills through our association.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="px-10 py-5 bg-emerald-600 text-white rounded-full font-black hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20">GET STARTED</button>
                                <button className={`px-10 py-5 border rounded-full font-black transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-950 hover:bg-slate-100'
                                    }`}>TALK TO AN EXPERT</button>
                            </div>
                        </div>
                        <div className={`border p-8 rounded-[2rem] space-y-4 shadow-sm ${isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                            <input type="text" placeholder="Your Name" className={`w-full border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-950 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-950'
                                }`} />
                            <input type="email" placeholder="Your Email" className={`w-full border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-950 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-950'
                                }`} />
                            <textarea placeholder="Your Message" rows={4} className={`w-full border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none ${isDarkMode ? 'bg-slate-950 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-950'
                                }`}></textarea>
                            <button className={`w-full py-4 rounded-xl font-black transition-all ${isDarkMode ? 'bg-white text-slate-950 hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-emerald-600'
                                }`}>SEND MESSAGE</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-24 border-t transition-colors ${isDarkMode ? 'bg-slate-950 border-white/5' : 'bg-white border-slate-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="ICQA Logo" className="w-12 h-12 object-contain" />
                                <span className={`text-3xl font-black font-display tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>ICQA</span>
                            </div>
                            <p className={`text-lg max-w-sm leading-relaxed font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                Designing the future of professional qualification through innovation and
                                global standard-setting.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h4 className={`text-sm font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-400'}`}>Navigation</h4>
                            <ul className={`space-y-4 font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                <li><a href="#" className="hover:text-emerald-600 transition-colors">HOME</a></li>
                                <li><Link to="/login" className="hover:text-emerald-600 transition-colors underline decoration-emerald-500/50 underline-offset-8 uppercase">SYSTEM LOGIN</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className={`text-sm font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-400'}`}>Contact</h4>
                            <ul className={`space-y-4 font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                <li>contact@icqa.org</li>
                                <li>+1 (877) 287-5034</li>
                                <li>580 Global Plaza, Suite 400 <br />San Francisco, CA 94105</li>
                            </ul>
                        </div>
                    </div>

                    <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-black tracking-widest uppercase ${isDarkMode ? 'border-white/5 text-slate-600' : 'border-slate-100 text-slate-400'
                        }`}>
                        <p>© 2025 INTERNATIONAL CIVIL QUALIFICATION ASSOCIATION</p>
                        <div className="flex gap-12">
                            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Data Protection/Personal Info Modal */}
            {showModal && foundCert && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
                    <div className={`relative w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden rounded-3xl shadow-2xl transition-all transform animate-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'}`}>
                        <div className={`shrink-0 h-2 ${isDarkMode ? 'bg-emerald-500' : 'bg-blue-600'}`}></div>
                        <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
                            <div className="shrink-0 flex justify-between items-start mb-6">
                                <div>
                                    <h3 className={`text-2xl font-black font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Verification</h3>
                                    <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Candidate Profile Found</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-500' : 'hover:bg-slate-100 text-slate-400'}`}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
                                <div className="flex flex-col items-center">
                                    <div className={`w-52 h-64 md:w-64 md:h-72 rounded-2xl overflow-hidden mb-4 shadow-xl border-4 ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
                                        {foundCert.photoUrl ? (
                                            <img src={foundCert.photoUrl} alt={foundCert.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                                <Users className={`w-24 h-24 ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`} />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className={`text-xl font-black uppercase text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{foundCert.name}</h4>
                                </div>

                                <div className="space-y-3 pb-4">
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>ICQA Number</p>
                                        <p className={`text-base font-black font-mono ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`}>{foundCert.icqaNumber}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Civil Qualification Number</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{foundCert.ncqaNumber}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Qualification Type</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{foundCert.qualificationType}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Date Issue</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{foundCert.issueDate}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Education Department</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{foundCert.eduDept}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Issuing Office</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{foundCert.issuingOffice}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Issuing Country</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{foundCert.issuingCountry}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Expiration Date</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{foundCert.expirationDate || 'N/A'}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-950/50 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className={`text-[10px] uppercase font-black mb-0.5 cursor-default ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Verified Body</p>
                                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{ICQA_NAME}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 pt-6">
                                <button
                                    onClick={() => navigate(`/guest/view/${foundCert.id}`)}
                                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl ${isDarkMode
                                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                                        }`}
                                >
                                    Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
