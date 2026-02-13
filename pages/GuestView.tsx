import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CertificateService } from '../services/dataService';
import { Certificate } from '../types';
import { CertificateRender } from '../components/CertificateRender';
import { Printer, CheckCircle, ArrowLeft } from 'lucide-react';

export const GuestView: React.FC = () => {
  const { id } = useParams();
  const [cert, setCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const fetchCert = async () => {
      if (id) {
        try {
          const found = await CertificateService.getById(id);
          setCert(found || null);
        } catch (err) {
          console.error(err);
          setCert(null);
        }
      }
    };
    fetchCert();
  }, [id]);

  if (!cert) {
    return <div className="p-8 text-center">Loading or not found...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header - No Print */}
      <div className="bg-white shadow border-b border-gray-200 no-print">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/guest" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Valid Certificate
              </h1>
              <p className="text-xs text-gray-500">Verified by International Civil Qualification Association</p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 flex justify-center no-print overflow-auto">
        {/* Scale down slightly for viewability on common screens, or scroll */}
        <div className="shadow-2xl origin-top transform scale-50 md:scale-75 lg:scale-100">
          <CertificateRender data={cert} />
        </div>
      </div>

      {/* Print View */}
      <div className="hidden print-only fixed top-0 left-0 w-full h-full bg-white z-[9999]">
        <div className="print-fit-a4">
          <CertificateRender data={cert} />
        </div>
      </div>
    </div>
  );
};