import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CertificateService } from '../services/dataService';
import { Certificate, CertificateStatus } from '../types';
import { formatDateForDisplay, isExpired } from '../utils';
import { Search, Plus, Filter, AlertTriangle, CheckCircle, FileText, Clock, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CertificateStatus | 'ALL'>('ALL');
  const { user } = useAuth();

  const refreshData = async () => {
    try {
      const applyStatus = user?.role === 'STAFF' ? CertificateStatus.PENDING : statusFilter;
      const data = await CertificateService.getAll({ query, status: applyStatus });
      setCerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, statusFilter]);

  const handleApprove = async (id: string) => {
    if (!window.confirm("Approve this certificate?")) return;
    try {
      await CertificateService.update(id, { status: CertificateStatus.ACTIVE });
      refreshData();
    } catch (err) {
      console.error(err);
      alert("Failed to approve certificate.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificate Dashboard</h1>
          <p className="text-gray-500">Manage issued qualifications</p>
        </div>
        <Link
          to="/certificate/new"
          className="flex items-center justify-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Issue New Certificate
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, KCQA No, or Type..."
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {user?.role !== 'STAFF' && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none w-full md:w-48 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="ALL">All Status</option>
              <option value={CertificateStatus.ACTIVE}>Active</option>
              <option value={CertificateStatus.PENDING}>Pending</option>
              <option value={CertificateStatus.EXPIRED}>Expired</option>
              <option value={CertificateStatus.REVOKED}>Revoked</option>
            </select>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KCQA No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No certificates found matching your criteria.
                  </td>
                </tr>
              ) : (
                certs.map((cert) => {
                  const expired = isExpired(cert.expirationDate);
                  return (
                    <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-kcqa-red">
                        {cert.kcqaNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {cert.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {cert.qualificationType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cert.issueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cert.expirationDate || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${expired || cert.status === CertificateStatus.EXPIRED ? 'bg-red-100 text-red-800' :
                            cert.status === CertificateStatus.PENDING ? 'bg-yellow-100 text-yellow-800' :
                            cert.status === CertificateStatus.ACTIVE ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {expired || cert.status === CertificateStatus.EXPIRED ? (
                            <><AlertTriangle className="w-3 h-3" /> Expired</>
                          ) : cert.status === CertificateStatus.PENDING ? (
                            <><Clock className="w-3 h-3" /> Pending</>
                          ) : (
                            <><CheckCircle className="w-3 h-3" /> Active</>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          {cert.status === CertificateStatus.PENDING && user?.role === 'ADMIN' && (
                            <button
                              onClick={() => handleApprove(cert.id)}
                              className="text-green-600 hover:text-green-900 flex items-center gap-1 transition-colors"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </button>
                          )}
                          <Link to={`/certificate/edit/${cert.id}`} className="text-blue-600 hover:text-blue-900 flex items-center justify-end gap-1">
                            <FileText className="w-4 h-4" /> Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};