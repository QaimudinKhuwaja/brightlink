'use client';

import { useEffect, useState } from 'react';
import { Search, Eye, Trash2, CheckCircle, XCircle, Clock, FileText, Image as ImageIcon, FileDown } from 'lucide-react';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { TableSkeleton } from '@/components/admin/Skeletons';

interface Admission {
  id: string;
  studentName: string;
  fatherName: string;
  gender: string;
  dateOfBirth: string;
  bFormNumber: string;
  previousSchool: string | null;
  parentName: string;
  phone: string;
  whatsapp: string;
  email: string | null;
  city: string;
  area: string;
  completeAddress: string;
  applyingClass: string;
  session: string;
  admissionDate: string;
  studentPhotoUrl: string;
  birthCertificateUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAdmissions();
  }, [page, statusFilter]);

  const fetchAdmissions = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      if (statusFilter) params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/admissions?${params}`);
      const data = await response.json();

      if (data.success) {
        setAdmissions(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchAdmissions();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/admissions/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        fetchAdmissions();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/admissions?id=${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchAdmissions();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting admission:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDING: { class: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20', icon: Clock },
      APPROVED: { class: 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20', icon: CheckCircle },
      REJECTED: { class: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20', icon: XCircle },
    };
    const badge = badges[status as keyof typeof badges] || badges.PENDING;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-pill ${badge.class}`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDownloadPDF = async (admission: Admission) => {
    try {
      const response = await fetch(`/api/admin/admissions/pdf?id=${admission.id}`);

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `admission-form-${admission.studentName.replace(/\s+/g, '-')}-${admission.id.slice(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleDownloadFile = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const handleDownloadPhoto = (admission: Admission) => {
    const fileName = `${admission.studentName.replace(/\s+/g, '-')}-photo.jpg`;
    handleDownloadFile(admission.studentPhotoUrl, fileName);
  };

  const handleDownloadCertificate = (admission: Admission) => {
    const fileName = `${admission.studentName.replace(/\s+/g, '-')}-birth-certificate.jpg`;
    handleDownloadFile(admission.birthCertificateUrl, fileName);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admissions Management</h1>
          <p className="text-foreground-secondary mt-1">Manage student admission applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="saas-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search by student name, father name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground placeholder:text-foreground-secondary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <button
              onClick={handleSearch}
              className="btn-primary px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={10} />
      ) : admissions.length === 0 ? (
        <div className="saas-card p-12 text-center">
          <p className="text-foreground-secondary">No admissions found</p>
        </div>
      ) : (
        <div className="saas-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-secondary border-b border-card-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {admissions.map((admission) => (
                  <tr key={admission.id} className="hover:bg-accent/5">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{admission.studentName}</p>
                        <p className="text-xs text-foreground-secondary">{admission.fatherName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{admission.applyingClass}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{admission.phone}</td>
                    <td className="px-6 py-4">{getStatusBadge(admission.status)}</td>
                    <td className="px-6 py-4 text-sm text-foreground-secondary">{formatDate(admission.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedAdmission(admission)}
                          className="p-2 text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(admission)}
                          className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                          title="Download Form PDF"
                        >
                          <FileText size={18} />
                        </button>
                        {admission.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(admission.id, 'APPROVED')}
                              className="p-2 text-green-600 dark:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(admission.id, 'REJECTED')}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setDeleteId(admission.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-card-border">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-foreground-secondary">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* View Details Modal */}
      {selectedAdmission && (
        <Modal
          isOpen={!!selectedAdmission}
          onClose={() => setSelectedAdmission(null)}
          title="Admission Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Student Information */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">Student Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-secondary">Full Name</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Father Name</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Gender</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Date of Birth</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(selectedAdmission.dateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">B-Form Number</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.bFormNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Previous School</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.previousSchool || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">Parent Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-secondary">Parent Name</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Phone</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">WhatsApp</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.whatsapp}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Email</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.email || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-secondary">City</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.city}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Area</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.area}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-foreground-secondary">Complete Address</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.completeAddress}</p>
                </div>
              </div>
            </div>

            {/* Admission Details */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">Admission Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-secondary">Applying Class</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.applyingClass}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Session</p>
                  <p className="text-sm font-medium text-foreground">{selectedAdmission.session}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Status</p>
                  <div>{getStatusBadge(selectedAdmission.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">Applied On</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(selectedAdmission.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">Documents</h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={selectedAdmission.studentPhotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2 text-sm flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View Student Photo
                </a>
                <button
                  onClick={() => handleDownloadPhoto(selectedAdmission)}
                  className="btn-primary px-4 py-2 text-sm flex items-center justify-center gap-2"
                >
                  <ImageIcon size={16} />
                  Download Photo
                </button>
                <a
                  href={selectedAdmission.birthCertificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2 text-sm flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View Birth Certificate
                </a>
                <button
                  onClick={() => handleDownloadCertificate(selectedAdmission)}
                  className="btn-primary px-4 py-2 text-sm flex items-center justify-center gap-2"
                >
                  <FileDown size={16} />
                  Download Certificate
                </button>
              </div>
            </div>

            {/* Download Full Admission Form */}
            <div className="pt-4 border-t border-card-border">
              <button
                onClick={() => handleDownloadPDF(selectedAdmission)}
                className="w-full btn-primary px-4 py-3 text-sm flex items-center justify-center gap-2 font-semibold"
              >
                <FileText size={18} />
                Download Complete Admission Form (PDF)
              </button>
            </div>

            {/* Status Actions */}
            {selectedAdmission.status === 'PENDING' && (
              <div className="flex gap-3 pt-4 border-t border-card-border">
                <button
                  onClick={() => {
                    handleStatusChange(selectedAdmission.id, 'APPROVED');
                    setSelectedAdmission(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedAdmission.id, 'REJECTED');
                    setSelectedAdmission(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Admission"
        message="Are you sure you want to delete this admission? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
