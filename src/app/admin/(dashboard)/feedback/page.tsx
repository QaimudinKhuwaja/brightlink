'use client';

import { useEffect, useState } from 'react';
import { Search, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

interface Feedback {
  id: string;
  name: string;
  email: string | null;
  childClass: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  isPublished: boolean;
  createdAt: string;
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/feedback');
      const data = await response.json();

      if (data.success) {
        setFeedback(data.data);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string, isApproved: boolean) => {
    try {
      await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: !isApproved }),
      });

      fetchFeedback();
    } catch (error) {
      console.error('Error approving feedback:', error);
    }
  };

  const handlePublish = async (id: string, isPublished: boolean) => {
    try {
      await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPublished: !isPublished }),
      });

      fetchFeedback();
    } catch (error) {
      console.error('Error publishing feedback:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/feedback?id=${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchFeedback();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'published') return matchesSearch && item.isPublished;
    if (statusFilter === 'unpublished') return matchesSearch && !item.isPublished;
    if (statusFilter === 'approved') return matchesSearch && item.isApproved;
    if (statusFilter === 'pending') return matchesSearch && !item.isApproved;

    return matchesSearch;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Feedback Management</h1>
        <p className="text-foreground-secondary mt-1">View, approve, and manage parent feedback</p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-card-border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search by name or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
          >
            <option value="">All Feedback</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>
        </div>
      </div>

      {/* Feedback Grid */}
      {isLoading ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <div className="animate-spin rounded-pill h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-foreground-secondary">Loading feedback...</p>
        </div>
      ) : filteredFeedback.length === 0 ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <p className="text-foreground-secondary">No feedback found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedback.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl border border-card-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-foreground-secondary">Parent of {item.childClass} student</p>
                </div>
                <button
                  onClick={() => setSelectedFeedback(item)}
                  className="p-2 text-accent-blue hover:bg-accent-blue/5 rounded-lg transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>

              <div className="mb-3">
                {renderStars(item.rating)}
              </div>

              <p className="text-sm text-foreground mb-4 line-clamp-3">{item.comment}</p>

              <div className="flex items-center justify-between mb-4 text-xs text-foreground-secondary">
                <span>{formatDate(item.createdAt)}</span>
                <div className="flex gap-2">
                  {item.isApproved && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-pill">
                      Approved
                    </span>
                  )}
                  {item.isPublished && (
                    <span className="px-2 py-1 bg-accent-blue/10 text-accent-blue rounded-pill">
                      Published
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {!item.isApproved && (
                  <button
                    onClick={() => handleApprove(item.id, item.isApproved)}
                    className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                )}
                {item.isApproved && (
                  <button
                    onClick={() => handlePublish(item.id, item.isPublished)}
                    className="flex-1 px-3 py-2 text-sm bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
                  >
                    {item.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                )}
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Details Modal */}
      {selectedFeedback && (
        <Modal
          isOpen={!!selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
          title="Feedback Details"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground-secondary">Parent Name</p>
              <p className="text-base font-medium text-foreground">{selectedFeedback.name}</p>
            </div>

            {selectedFeedback.email && (
              <div>
                <p className="text-sm text-foreground-secondary">Email</p>
                <p className="text-base font-medium text-foreground">{selectedFeedback.email}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-foreground-secondary">Child&apos;s Class</p>
              <p className="text-base font-medium text-foreground">{selectedFeedback.childClass}</p>
            </div>

            <div>
              <p className="text-sm text-foreground-secondary mb-2">Rating</p>
              {renderStars(selectedFeedback.rating)}
            </div>

            <div>
              <p className="text-sm text-foreground-secondary">Comment</p>
              <p className="text-base text-foreground mt-1">{selectedFeedback.comment}</p>
            </div>

            <div>
              <p className="text-sm text-foreground-secondary">Submitted</p>
              <p className="text-base text-foreground">{formatDate(selectedFeedback.createdAt)}</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-card-border">
              {!selectedFeedback.isApproved && (
                <button
                  onClick={() => {
                    handleApprove(selectedFeedback.id, selectedFeedback.isApproved);
                    setSelectedFeedback(null);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              )}
              {selectedFeedback.isApproved && (
                <button
                  onClick={() => {
                    handlePublish(selectedFeedback.id, selectedFeedback.isPublished);
                    setSelectedFeedback(null);
                  }}
                  className="flex-1 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
                >
                  {selectedFeedback.isPublished ? 'Unpublish' : 'Publish'}
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
