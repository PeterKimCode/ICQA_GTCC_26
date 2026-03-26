import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
    const isDarkMode = localStorage.getItem('kcqa_theme') !== 'light';
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "자격증 조회는 어떻게 하나요?",
            answer: "메인 홈페이지(Landing) 화면의 '민간자격확인' 섹션에서 성명과 자격증에 등록된 전화번호를 입력하면 현재 유효한 자격증 목록을 쉽게 확인할 수 있습니다."
        },
        {
            question: "비밀번호를 분실했습니다. 어떻게 찾아야 하나요?",
            answer: "현재 관리자 및 스태프 패스워드는 조직 내 관리자(Admin)에게 문의하여 초기화 및 재설정을 요청해아 합니다. 보안상의 이유로 외부에서는 초기화할 수 없습니다."
        },
        {
            question: "등록된 내 자격증 정보가 틀린 것 같습니다.",
            answer: "성명 표기나 생년월일, 자격 종목 등이 잘못 기재되어 있는 경우, 자격증을 발급받은 교육기관 또는 KCQA 관리자 이메일(yjisc@naver.com)로 수정 요청을 보내주시면 확인 후 정정해 드립니다."
        },
        {
            question: "해외(기관)에서도 이 자격증을 우대해 주나요?",
            answer: "KCQA 민간자격은 정식 규정에 따라 관리되며 일부 국외 협력기관으로부터 기술 인증이나 우대를 받을 수 있습니다. 진출하시려는 특정 단체 및 국가의 내부 규정을 함께 참조하시기 바랍니다."
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
                        <span className={`text-xl font-bold tracking-tight font-display flex items-center gap-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            <HelpCircle className="w-5 h-5" /> FAQ
                        </span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className={`text-4xl lg:text-5xl font-black mb-4 font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>자주 묻는 질문</h1>
                    <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>KCQA 민간자격 정보서비스 이용에 관한 궁금증을 해결해 드립니다.</p>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`rounded-2xl border transition-all ${isDarkMode ? 'border-white/10 bg-slate-900/50 hover:bg-slate-900' : 'border-slate-200 bg-slate-50 hover:bg-white'} overflow-hidden`}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left px-6 py-5 flex justify-between items-center group transition-colors focus:outline-none"
                            >
                                <div className="pr-8">
                                    <h3 className={`text-lg font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'}`}>
                                        <span className={`mr-3 font-black ${isDarkMode ? 'text-emerald-600' : 'text-emerald-500'}`}>Q.</span>
                                        {faq.question}
                                    </h3>
                                </div>
                                <div className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-400 group-hover:text-white' : 'bg-white text-slate-500 shadow-sm group-hover:text-slate-900'}`}>
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                                </div>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className={`px-6 pb-6 pt-2 text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    <span className={`mr-3 font-black text-lg align-top inline-block ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>A.</span>
                                    <span className="inline-block" style={{ width: 'calc(100% - 2.5rem)' }}>{faq.answer}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
