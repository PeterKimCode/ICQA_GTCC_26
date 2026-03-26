import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft } from 'lucide-react';

export const Notice: React.FC = () => {
    const isDarkMode = localStorage.getItem('kcqa_theme') !== 'light';
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const notices = [
        {
            title: "2026년도 민간자격 검정 일정 안내",
            date: "2026-03-25",
            content: "2026년도 상반기 민간자격 등록 및 검정 일정이 확정되었습니다. 자세한 사항은 추후 홈페이지를 통해 공별 안내될 예정입니다."
        },
        {
            title: "자격증 재발급 신청 절차 변경 안내",
            date: "2026-02-15",
            content: "기존 우편 신청으로 진행되던 자격증 재발급이 전면 온라인화 되었습니다. '자격증 확인' 메뉴에서 로그인 후 재발급 신청을 이용해 주시기 바랍니다."
        },
        {
            title: "시스템 점검에 따른 서비스 일시중단 안내",
            date: "2026-01-10",
            content: "보다 안정적인 서비스 제공을 위한 서버 점검이 진행될 예정입니다. 점검 시간 동안에는 자격증 조회 서비스가 제한될 수 있으니 양해 부탁드립니다. (일시: 2026년 1월 12일 02:00 ~ 04:00)"
        }
    ];

    const themeClasses = isDarkMode ? "bg-slate-950 text-slate-200" : "bg-white text-slate-900";

    return (
        <div className={`min-h-screen font-sans pt-20 ${themeClasses}`}>
            {/* Nav */}
            <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md ${isDarkMode ? 'bg-slate-950/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center gap-3">
                            <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
                            <span className={`text-xl font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>뒤로가기</span>
                        </Link>
                        <span className={`text-xl font-bold tracking-tight font-display ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>KCQA 공지사항</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-16">
                <h1 className={`text-4xl font-black mb-10 font-display text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>공지사항</h1>
                
                <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                    {notices.map((notice, index) => (
                        <div key={index} className={`border-b last:border-0 ${isDarkMode ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-white'}`}>
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
                                <div className={`px-6 pb-6 text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
