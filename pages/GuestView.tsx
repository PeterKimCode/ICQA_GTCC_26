import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CertificateService } from '../services/dataService';
import { Certificate } from '../types';
import { CertificateRender } from '../components/CertificateRender';
import { Printer, CheckCircle, ArrowLeft } from 'lucide-react';

export const GuestView: React.FC = () => {
  const { id } = useParams();
  const [cert, setCert] = useState<Certificate | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        const targetWidth = availableWidth - 32; // 16px padding each side
        const newScale = Math.max(Math.min(targetWidth / 2480, 1), 0.1);
        setScale(newScale);
      }
    };

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 50);

    return () => window.removeEventListener('resize', handleResize);
  }, [cert]);

  useEffect(() => {
    const fetchCert = async () => {
      if (id) {
        try {
          const found = await CertificateService.getById(id);
          if (found && found.status !== 'PENDING') {
            setCert(found);
          } else {
            setCert(null);
          }
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
              <p className="text-xs text-gray-500">Verified by Korea Civil Qualification Association</p>
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
      <div 
        className="py-8 flex justify-center no-print overflow-hidden w-full px-4" 
        ref={containerRef}
      >
        <div 
          className="shadow-2xl relative bg-white" 
          style={{ 
            width: `${2480 * scale}px`, 
            height: `${1748 * scale}px` 
          }}
        >
          <div 
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: 'top left',
              width: '2480px',
              height: '1748px'
            }}
          >
            <CertificateRender data={cert} />
          </div>
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