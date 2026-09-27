'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const facultySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  role: z.string().min(2, 'Role is required'),
  qualification: z.string().min(2, 'Qualification is required'),
  experience: z.string().optional(),
  emoji: z.string().optional(),
  bio: z.string().optional(),
  order: z.number().min(0).optional(),
});

type FacultyFormData = z.infer<typeof facultySchema>;

interface Faculty {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  emoji: string;
  photoUrl: string | null;
  bio: string | null;
  isActive: boolean;
  order: number;
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFaculty, setEditFaculty] = useState<Faculty | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/faculty');
      const data = await response.json();

      if (data.success) {
        setFaculty(data.data);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: FacultyFormData) => {
    setIsSaving(true);
    try {
      const url = '/api/admin/faculty';
      const method = editFaculty ? 'PATCH' : 'POST';
      const body = editFaculty ? { id: editFaculty.id, ...data } : data;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditFaculty(null);
        reset();
        fetchFaculty();
      }
    } catch (error) {
      console.error('Error saving faculty:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/faculty?id=${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchFaculty();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting faculty:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch('/api/admin/faculty', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !isActive }),
      });

      fetchFaculty();
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  const openAddModal = () => {
    setEditFaculty(null);
    reset({
      name: '',
      role: '',
      qualification: '',
      experience: '',
      emoji: '👨‍🏫',
      bio: '',
      order: faculty.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: Faculty) => {
    setEditFaculty(member);
    reset({
      name: member.name,
      role: member.role,
      qualification: member.qualification,
      experience: member.experience,
      emoji: member.emoji,
      bio: member.bio || '',
      order: member.order,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Faculty Management</h1>
          <p className="text-foreground-secondary mt-1">Manage school faculty members</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
        >
          <Plus size={20} />
          Add Faculty
        </button>
      </div>

      {/* Faculty Grid */}
      {isLoading ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <div className="animate-spin rounded-pill h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-foreground-secondary">Loading faculty...</p>
        </div>
      ) : faculty.length === 0 ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <p className="text-foreground-secondary mb-4">No faculty members found</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
          >
            Add First Faculty Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => (
            <div
              key={member.id}
              className={`bg-card rounded-xl border border-card-border p-6 hover:shadow-lg transition-shadow ${
                !member.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{member.emoji}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 text-accent-blue hover:bg-accent-blue/5 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(member.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-accent-blue font-medium mb-2">{member.role}</p>
              <p className="text-sm text-foreground-secondary mb-3">{member.qualification}</p>
              {member.experience && (
                <p className="text-xs text-foreground-secondary mb-3">{member.experience}</p>
              )}
              {member.bio && (
                <p className="text-sm text-foreground mb-3 line-clamp-2">{member.bio}</p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-card-border">
                <span className="text-xs text-foreground-secondary">Order: {member.order}</span>
                <button
                  onClick={() => handleToggleActive(member.id, member.isActive)}
                  className={`text-xs px-3 py-1 rounded-pill font-medium ${
                    member.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-background-secondary text-foreground-secondary'
                  }`}
                >
                  {member.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditFaculty(null);
          reset();
        }}
        title={editFaculty ? 'Edit Faculty Member' : 'Add Faculty Member'}
        size="md"
      >
        <form onSubmit={handleSubmit(handleSave)} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="Enter faculty name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Role/Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('role')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="e.g., Principal, Mathematics Teacher"
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Qualification <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('qualification')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="e.g., M.Ed, 15 years experience"
            />
            {errors.qualification && (
              <p className="mt-1 text-sm text-red-600">{errors.qualification.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Experience
            </label>
            <input
              type="text"
              {...register('experience')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="e.g., 10 years experience"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Emoji
            </label>
            <input
              type="text"
              {...register('emoji')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="👨‍🏫"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              {...register('bio')}
              rows={3}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="Brief bio about the faculty member"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Display Order
            </label>
            <input
              type="number"
              {...register('order', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              min="0"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditFaculty(null);
                reset();
              }}
              className="flex-1 px-4 py-2 border border-card-border text-foreground rounded-lg hover:bg-background-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : editFaculty ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Faculty Member"
        message="Are you sure you want to delete this faculty member? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
