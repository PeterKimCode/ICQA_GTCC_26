import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CertificateService } from '../services/dataService';
import { Search, Shield, X, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Certificate } from '../types';
import { ICQA_NAME } from '../constants';

export const GuestSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [foundCerts, setFoundCerts] = useState<Certificate[]>([]);
  const [certIndex, setCertIndex] = useState(0);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const certs = await CertificateService.getByNameAndPhone(name, phone);

      if (!certs || certs.length === 0) {
        setError('No qualification record was found. Please check the full name and phone number.');
        return;
      }

      setFoundCerts(certs);
      setCertIndex(0);
      setShowModal(true);
    } catch (err: any) {
      setError('Verification could not be completed right now. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Shield className="w-8 h-8 text-blue-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Qualification Verification</h1>
            <p className="text-sm text-gray-500">{ICQA_NAME}</p>
          </div>
        </div>

        <div className="p-8">
          <p className="mb-6 text-gray-600 text-sm">
            Enter the certificate holder&apos;s full name and registered phone number to verify authenticity and view credential details.
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-sm">
              <p className="font-bold">Verification Failed</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., AN CHANG NAM"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="e.g., 01012345678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Verify Credential <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-200">
            <p className="font-bold mb-2 text-gray-700">Demo records</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-gray-200 pb-1">
                <span className="font-semibold text-green-700">Active</span>
                <span className="font-mono text-gray-800">AN CHANG NAM / 01012345678</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-red-700">Expired</span>
                <span className="font-mono text-gray-800">JANE DOE / 02098765432</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
          <a href="/" className="text-sm text-blue-600 hover:underline">Back to Home</a>
        </div>
      </div>

      {showModal && foundCerts.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden transition-all transform animate-in zoom-in-95 duration-300">
            <div className="shrink-0 h-2 bg-blue-600"></div>
            <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
              <div className="shrink-0 flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Verification Result</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 font-medium">Matching credential profile found</p>
                    {foundCerts.length > 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                        {certIndex + 1}/{foundCerts.length}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
                <div className="flex flex-col items-center relative">
                  {foundCerts.length > 1 && (
                    <>
                      <button onClick={() => setCertIndex(prev => (prev - 1 + foundCerts.length) % foundCerts.length)} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 bg-white hover:bg-gray-100 text-gray-900 shadow-md border border-gray-100">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={() => setCertIndex(prev => (prev + 1) % foundCerts.length)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 bg-white hover:bg-gray-100 text-gray-900 shadow-md border border-gray-100">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className="w-52 h-64 md:w-60 md:h-72 rounded-2xl overflow-hidden mb-4 shadow-lg border-4 border-white">
                    {foundCerts[certIndex].photoUrl ? (
                      <img src={foundCerts[certIndex].photoUrl} alt={foundCerts[certIndex].name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-24 h-24 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl font-bold uppercase text-gray-900 tracking-tight">{foundCerts[certIndex].name}</h4>
                </div>

                <div className="space-y-3 pb-4">
                  <InfoCard label="ICQA Number" value={foundCerts[certIndex].kcqaNumber} highlight />
                  <InfoCard label="Qualification Registry Number" value={foundCerts[certIndex].ncqaNumber} />
                  <InfoCard label="Qualification Type" value={foundCerts[certIndex].qualificationType} />
                  <InfoCard label="Issue Date" value={foundCerts[certIndex].issueDate} />
                  <InfoCard label="Education Provider" value={foundCerts[certIndex].eduDept} />
                  <InfoCard label="Issuing Office" value={foundCerts[certIndex].issuingOffice} />
                  <InfoCard label="Issuing Country" value={foundCerts[certIndex].issuingCountry} />
                  <InfoCard label="Expiration Date" value={foundCerts[certIndex].expirationDate || 'N/A'} />
                  <InfoCard label="Verified By" value={ICQA_NAME} />
                </div>
              </div>

              <div className="shrink-0 pt-6">
                <button onClick={() => navigate(`/guest/view/${foundCerts[certIndex].id}`)} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transform transition active:scale-95">
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight = false }) => (
  <div className={`p-3 rounded-xl border ${highlight ? 'bg-blue-50/50 border-blue-100/50' : 'bg-gray-50 border-gray-100'}`}>
    <p className={`text-[10px] uppercase font-bold mb-0.5 ${highlight ? 'text-blue-600' : 'text-gray-400'}`}>{label}</p>
    <p className="text-sm font-bold text-gray-800">{value}</p>
  </div>
);
