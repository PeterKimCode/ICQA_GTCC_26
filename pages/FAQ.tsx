import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { PublicHeader } from '../components/PublicHeader';
import { FAQService } from '../services/dataService';

export const FAQ: React.FC = () => {
  const isDarkMode = (localStorage.getItem('icqa_theme') ?? localStorage.getItem('kcqa_theme')) !== 'light';
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await FAQService.getAll();
        setFaqs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const themeClasses = isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-900';

  return (
    <div className={`min-h-screen font-sans pt-20 ${themeClasses}`}>
      <PublicHeader isDarkMode={isDarkMode} />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className={`text-4xl lg:text-5xl font-black mb-4 font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h1>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
            Answers to common questions about ICQA credential verification, digital certificates, and public record access.
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="p-12 text-center text-slate-500 font-bold border rounded-2xl border-slate-200 bg-slate-50">Loading FAQs...</div>
          ) : faqs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-bold border rounded-2xl border-slate-200 bg-slate-50">No FAQs are available yet.</div>
          ) : faqs.map((faq, index) => (
            <div key={faq.id} className={`rounded-2xl border transition-all ${isDarkMode ? 'border-white/10 bg-slate-900/50 hover:bg-slate-900' : 'border-slate-200 bg-slate-50 hover:bg-white'} overflow-hidden`}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full text-left px-6 py-5 flex justify-between items-center group transition-colors focus:outline-none">
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
                <div className={`px-6 pb-6 pt-2 text-base leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
