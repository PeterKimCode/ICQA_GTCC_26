import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { PublicHeader } from '../components/PublicHeader';
import { NoticeService } from '../services/dataService';

export const Notice: React.FC = () => {
    const isDarkMode = localStorage.getItem('kcqa_theme') !== 'light';
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const data = await NoticeService.getAll();
                setNotices(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const themeClasses = isDarkMode ? "bg-slate-950 text-slate-200" : "bg-white text-slate-900";

    return (
        <div className={`min-h-screen font-sans pt-20 ${themeClasses}`}>
            <PublicHeader isDarkMode={isDarkMode} />

            <main className="max-w-4xl mx-auto px-4 py-16">
                <h1 className={`text-4xl font-black mb-10 font-display text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>공지사항</h1>
                
                <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                    {loading ? (
                        <div className="p-12 text-center text-slate-500 font-bold">공지사항을 불러오는 중입니다...</div>
                    ) : notices.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 font-bold">등록된 공지사항이 없습니다.</div>
                    ) : notices.map((notice, index) => (
                        <div key={notice.id} className={`border-b last:border-0 ${isDarkMode ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left px-6 py-6 flex justify-between items-center group transition-colors focus:outline-none"
                            >
                                <div>
                                    <h3 className={`text-lg font-bold mb-2 transition-colors ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'}`}>
                                        {notice.title}
                                    </h3>
                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{notice.date}</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''} ${isDarkMode ? 'text-slate-600 group-hover:text-emerald-400' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                            </button>
                            
                            {openIndex === index && (
                                <div className={`px-6 pb-6 text-base leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {notice.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
