import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { CertificateService } from '../services/dataService';
import { Certificate, CertificateStatus } from '../types';
import { formatDateForDisplay, parseDateForInput } from '../utils';
import { CertificateRender } from '../components/CertificateRender';
import { Save, Printer, ArrowLeft, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const INITIAL_FORM: Certificate = {
  id: '',
  kcqaNumber: '',
  name: '',
  dob: '',
  ncqaNumber: '',
  qualificationType: '',
  issueDate: '',
  eduDept: 'International Lifelong Education Center',
  issuingOffice: 'International Lifelong Education Center',
  issuingCountry: 'Korea',
  expirationDate: '',
  photoUrl: '',
  status: CertificateStatus.ACTIVE,
  createdAt: '',
  updatedAt: ''
};

export const CertificateEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<Certificate>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Date input states (YYYY-MM-DD) for HTML5 input
  const [dates, setDates] = useState({
    issue: '',
    expire: ''
  });

  useEffect(() => {
    const fetchCert = async () => {
      if (id) {
        try {
          const cert = await CertificateService.getById(id);
          if (cert) {
            setFormData(cert);
            setPhotoPreview(cert.photoUrl);
            setDates({
              issue: parseDateForInput(cert.issueDate),
              expire: parseDateForInput(cert.expirationDate)
            });
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchCert();
  }, [id]);

  // Sync date inputs to display format in formData
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      issueDate: formatDateForDisplay(dates.issue),
      expirationDate: formatDateForDisplay(dates.expire)
    }));
  }, [dates]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Force uppercase for specific fields
    if (name === 'name' || name === 'kcqaNumber' || name === 'ncqaNumber') {
      finalValue = value.toUpperCase();
    }

    // Only allow numbers for phone number
    if (name === 'holderPhone') {
      finalValue = value.replace(/[^0-9]/g, '');
    }

    // Auto format Date of Birth to YYYY-MM-DD
    if (name === 'dob') {
      const nums = value.replace(/[^0-9]/g, '');
      if (nums.length <= 4) {
        finalValue = nums;
      } else if (nums.length <= 6) {
        finalValue = `${nums.slice(0, 4)}-${nums.slice(4)}`;
      } else {
        finalValue = `${nums.slice(0, 4)}-${nums.slice(4, 6)}-${nums.slice(6, 8)}`;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDates(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData(prev => ({ ...prev, photoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!formData.kcqaNumber || !formData.name || !formData.dob || !formData.holderPhone) {
      alert("Please fill in all required fields (Name, DOB, Phone Number, KCQA Number)");
      setLoading(false);
      return;
    }

    try {
      if (id) {
        await CertificateService.update(id, formData);
      } else {
        const createData = {
          ...formData,
          status: user?.role === UserRole.STAFF ? CertificateStatus.PENDING : CertificateStatus.ACTIVE
        };
        await CertificateService.create(createData);
      }
      navigate('/dashboard');
    } catch (err: any) {
      alert("Failed to save data: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Common input style with forced light mode background/text
  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-gray-900";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* Form Section */}
      <div className="lg:col-span-4 space-y-6 no-print">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">{id ? 'Edit' : 'Issue'} Certificate</h2>
        </div>

        <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-4">

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">KCQA Number (Red)</label>
            <input name="kcqaNumber" value={formData.kcqaNumber} onChange={handleInputChange} required className={inputClassName} placeholder="GC01-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Name (Blue)</label>
              <input name="name" value={formData.name} onChange={handleInputChange} required className={`${inputClassName} uppercase`} placeholder="FULL NAME" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Date of Birth</label>
              <input name="dob" value={formData.dob} onChange={handleInputChange} required maxLength={10} className={inputClassName} placeholder="YYYY-MM-DD" />
              <p className="text-[10px] text-gray-500 mt-1">Required for linking to user profile</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number (Required)</label>
            <input type="tel" name="holderPhone" value={formData.holderPhone || ''} onChange={handleInputChange} required className={inputClassName} placeholder="Ex: 01012345678" />
            <p className="text-[10px] text-gray-500 mt-1">Required for user identification and search</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Civil Qualification Number</label>
              <input name="ncqaNumber" value={formData.ncqaNumber} onChange={handleInputChange} className={inputClassName} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Qualification Type (Blue)</label>
            <input name="qualificationType" value={formData.qualificationType} onChange={handleInputChange} required className={inputClassName} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Issue Date</label>
              <input type="date" name="issue" value={dates.issue} onChange={handleDateChange} required className={inputClassName} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Expiration Date</label>
              <input type="date" name="expire" value={dates.expire} onChange={handleDateChange} className={inputClassName} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Education Department</label>
            <input name="eduDept" value={formData.eduDept} onChange={handleInputChange} className={inputClassName} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Issuing Office</label>
            <input name="issuingOffice" value={formData.issuingOffice} onChange={handleInputChange} className={inputClassName} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Issuing Country</label>
            <input name="issuingCountry" value={formData.issuingCountry} onChange={handleInputChange} className={inputClassName} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Photo</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 flex items-center gap-2 text-sm text-gray-900">
                <Upload className="w-4 h-4" /> Upload
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
              {photoPreview && <span className="text-xs text-green-600 font-medium">Photo selected</span>}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Data'}
            </button>
            <button type="button" onClick={handlePrint} className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" /> Print PDF
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section - Adjusted for 2480px width */}
      <div className="lg:col-span-8 bg-gray-200 rounded-xl p-8 flex flex-col items-center justify-center min-h-[600px] overflow-auto no-print">
        <div className="mb-4 text-gray-500 font-medium flex items-center gap-2">
          Live Preview (Scaled)
        </div>
        {/* We use scale(0.3) because 2480 * 0.3 = 744px, which fits in the column */}
        <div className="relative" style={{ width: '2480px', height: '1748px', transform: 'scale(0.3)', transformOrigin: 'top center' }}>
          <CertificateRender data={formData} isPreview={false} />
        </div>
      </div>

      {/* Hidden Print Section - Injected via Portal to escape Layout's no-print wrapper */}
      {createPortal(
        <div className="hidden print-only fixed top-0 left-0 w-full h-full z-[9999] bg-white">
          <div className="print-fit-a4">
            <CertificateRender data={formData} />
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};