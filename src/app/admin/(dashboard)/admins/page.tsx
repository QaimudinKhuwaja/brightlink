'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Key, Shield, User } from 'lucide-react';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createAdminSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type CreateAdminFormData = z.infer<typeof createAdminSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [resetPasswordAdmin, setResetPasswordAdmin] = useState<Admin | null>(null);
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate },
  } = useForm<CreateAdminFormData>({
    resolver: zodResolver(createAdminSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/admins');
      const data = await response.json();

      if (data.success) {
        setAdmins(data.data);
      } else if (response.status === 403) {
        alert('Access denied. Super Admin privileges required.');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: CreateAdminFormData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsCreateModalOpen(false);
        resetCreate();
        fetchAdmins();
      } else {
        alert(result.message || 'Failed to create admin');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create admin');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (!resetPasswordAdmin) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/admins/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resetPasswordAdmin.id,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setResetPasswordAdmin(null);
        resetPassword();
        alert('Password reset successfully');
      } else {
        alert(result.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch('/api/admin/admins', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !isActive }),
      });

      fetchAdmins();
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/admins?id=${deleteId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        fetchAdmins();
        setDeleteId(null);
      } else {
        alert(result.message || 'Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    } finally {
      setIsDeleting(false);
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Management</h1>
          <p className="text-foreground-secondary mt-1">Manage admin users and permissions</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
        >
          <Plus size={20} />
          Add Admin
        </button>
      </div>

      {/* Admins Grid */}
      {isLoading ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <div className="animate-spin rounded-pill h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-foreground-secondary">Loading admins...</p>
        </div>
      ) : admins.length === 0 ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <User className="w-16 h-16 text-foreground-secondary mx-auto mb-4" />
          <p className="text-foreground-secondary mb-4">No admins found</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
          >
            Add First Admin
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className={`bg-card rounded-xl border border-card-border p-6 hover:shadow-lg transition-shadow ${
                !admin.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-pill ${admin.role === 'SUPER_ADMIN' ? 'bg-purple-100' : 'bg-accent-blue/10'}`}>
                    {admin.role === 'SUPER_ADMIN' ? (
                      <Shield className="w-6 h-6 text-purple-600" />
                    ) : (
                      <User className="w-6 h-6 text-accent-blue" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{admin.username}</h3>
                    <p className="text-xs text-foreground-secondary">{admin.role.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-foreground-secondary">{admin.email}</p>
                <p className="text-xs text-foreground-secondary">Joined {formatDate(admin.createdAt)}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-card-border">
                <button
                  onClick={() => setResetPasswordAdmin(admin)}
                  className="flex-1 px-3 py-2 text-sm bg-background-secondary text-foreground rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Key size={16} />
                  Reset Password
                </button>
                <button
                  onClick={() => handleToggleActive(admin.id, admin.isActive)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    admin.isActive
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-background-secondary text-foreground-secondary hover:bg-gray-200'
                  }`}
                >
                  {admin.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => setDeleteId(admin.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Admin Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetCreate();
        }}
        title="Create New Admin"
        size="md"
      >
        <form onSubmit={handleSubmitCreate(handleCreate)} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...registerCreate('username')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="Enter username"
            />
            {errorsCreate.username && (
              <p className="mt-1 text-sm text-red-600">{errorsCreate.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...registerCreate('email')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="admin@example.com"
            />
            {errorsCreate.email && (
              <p className="mt-1 text-sm text-red-600">{errorsCreate.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...registerCreate('password')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="Enter password (min 8 characters)"
            />
            {errorsCreate.password && (
              <p className="mt-1 text-sm text-red-600">{errorsCreate.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              {...registerCreate('role')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
            >
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetCreate();
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
              {isSaving ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Reset Password Modal */}
      {resetPasswordAdmin && (
        <Modal
          isOpen={!!resetPasswordAdmin}
          onClose={() => {
            setResetPasswordAdmin(null);
            resetPassword();
          }}
          title={`Reset Password - ${resetPasswordAdmin.username}`}
          size="md"
        >
          <form onSubmit={handleSubmitPassword(handleResetPassword)} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...registerPassword('password')}
                className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
                placeholder="Enter new password (min 8 characters)"
              />
              {errorsPassword.password && (
                <p className="mt-1 text-sm text-red-600">{errorsPassword.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...registerPassword('confirmPassword')}
                className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
                placeholder="Confirm new password"
              />
              {errorsPassword.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errorsPassword.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setResetPasswordAdmin(null);
                  resetPassword();
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
                {isSaving ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Admin"
        message="Are you sure you want to delete this admin? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
