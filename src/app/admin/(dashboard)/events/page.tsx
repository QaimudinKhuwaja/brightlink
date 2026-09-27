'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  category: z.enum(['SPORTS', 'ACADEMIC', 'CULTURAL', 'NATIONAL', 'CELEBRATION', 'OTHER']),
  color: z.string().optional(),
  icon: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  color: string;
  icon: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const categories = [
    { value: 'SPORTS', label: 'Sports', color: 'orange', icon: 'Trophy' },
    { value: 'ACADEMIC', label: 'Academic', color: 'blue', icon: 'FlaskConical' },
    { value: 'CULTURAL', label: 'Cultural', color: 'pink', icon: 'Palette' },
    { value: 'NATIONAL', label: 'National', color: 'green', icon: 'Flag' },
    { value: 'CELEBRATION', label: 'Celebration', color: 'red', icon: 'Heart' },
    { value: 'OTHER', label: 'Other', color: 'purple', icon: 'Calendar' },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/events');
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: EventFormData) => {
    setIsSaving(true);
    try {
      const category = categories.find((c) => c.value === data.category);
      const eventData = {
        ...data,
        color: category?.color || 'blue',
        icon: category?.icon || 'Calendar',
      };

      const url = '/api/admin/events';
      const method = editEvent ? 'PATCH' : 'POST';
      const body = editEvent ? { id: editEvent.id, ...eventData } : eventData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditEvent(null);
        reset();
        fetchEvents();
      }
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/events?id=${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEvents();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch('/api/admin/events', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !isActive }),
      });

      fetchEvents();
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  const openAddModal = () => {
    setEditEvent(null);
    reset({
      title: '',
      description: '',
      date: '',
      category: 'ACADEMIC',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event: Event) => {
    setEditEvent(event);
    reset({
      title: event.title,
      description: event.description,
      date: event.date,
      category: event.category as any,
    });
    setIsModalOpen(true);
  };

  const getCategoryBadge = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    if (!cat) return <span className="px-2 py-1 text-xs font-medium rounded-pill bg-background-secondary text-foreground">{category}</span>;

    const colorClasses = {
      orange: 'bg-orange-100 text-orange-800',
      blue: 'bg-accent-blue/10 text-accent-blue',
      pink: 'bg-pink-100 text-pink-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      purple: 'bg-purple-100 text-purple-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-pill ${colorClasses[cat.color as keyof typeof colorClasses]}`}>
        {cat.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events Management</h1>
          <p className="text-foreground-secondary mt-1">Manage school events and activities</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <div className="animate-spin rounded-pill h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-foreground-secondary">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <Calendar className="w-16 h-16 text-foreground-secondary mx-auto mb-4" />
          <p className="text-foreground-secondary mb-4">No events found</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
          >
            Add First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-card rounded-xl border border-card-border overflow-hidden hover:shadow-lg transition-shadow ${
                !event.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className={`bg-gradient-to-br from-${event.color}-500 to-${event.color}-600 p-6 text-white`}>
                <Calendar className="w-10 h-10 mb-3 opacity-90" />
                {getCategoryBadge(event.category)}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground flex-1">{event.title}</h3>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-2 text-accent-blue hover:bg-accent-blue/5 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteId(event.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-foreground-secondary mb-4 line-clamp-3">{event.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-card-border">
                  <span className="text-xs text-foreground-secondary">{event.date}</span>
                  <button
                    onClick={() => handleToggleActive(event.id, event.isActive)}
                    className={`text-xs px-3 py-1 rounded-pill font-medium ${
                      event.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-background-secondary text-foreground-secondary'
                    }`}
                  >
                    {event.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
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
          setEditEvent(null);
          reset();
        }}
        title={editEvent ? 'Edit Event' : 'Add Event'}
        size="md"
      >
        <form onSubmit={handleSubmit(handleSave)} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="Enter event description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('date')}
              className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              placeholder="e.g., March 2024, 14 August, Monthly"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditEvent(null);
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
              {isSaving ? 'Saving...' : editEvent ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
