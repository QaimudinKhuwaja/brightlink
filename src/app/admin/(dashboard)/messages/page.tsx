'use client';

import { useEffect, useState } from 'react';
import { Search, Mail, MailOpen, Trash2, Eye } from 'lucide-react';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter) params.append('filter', filter);

      const response = await fetch(`/api/admin/messages?${params}`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: !isRead }),
      });

      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/messages?id=${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMessages();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      await handleMarkAsRead(message.id, message.isRead);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      msg.name.toLowerCase().includes(searchLower) ||
      msg.email.toLowerCase().includes(searchLower) ||
      msg.subject.toLowerCase().includes(searchLower) ||
      msg.message.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-foreground-secondary mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-card-border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search messages by name, email, subject, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              />
            </div>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
          >
            <option value="">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      {isLoading ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <div className="animate-spin rounded-pill h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-foreground-secondary">Loading messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-card rounded-xl border border-card-border p-12 text-center">
          <Mail className="w-16 h-16 text-foreground-secondary mx-auto mb-4" />
          <p className="text-foreground-secondary">No messages found</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-card-border overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-background-secondary transition-colors ${
                  !message.isRead ? 'bg-accent-blue/5/50' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {!message.isRead ? (
                        <Mail className="w-5 h-5 text-accent-blue flex-shrink-0" />
                      ) : (
                        <MailOpen className="w-5 h-5 text-foreground-secondary flex-shrink-0" />
                      )}
                      <h3 className="font-semibold text-foreground truncate">
                        {message.name}
                      </h3>
                      {!message.isRead && (
                        <span className="inline-block w-2 h-2 bg-accent-blue rounded-pill flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-sm text-foreground-secondary mb-1">{message.email}</p>
                    <p className="text-sm font-medium text-foreground mb-2">{message.subject}</p>
                    <p className="text-sm text-foreground-secondary line-clamp-2">{message.message}</p>
                    <p className="text-xs text-foreground-secondary mt-2">{formatDate(message.createdAt)}</p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleViewMessage(message)}
                      className="p-2 text-accent-blue hover:bg-accent-blue/5 rounded-lg transition-colors"
                      title="View Message"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleMarkAsRead(message.id, message.isRead)}
                      className="p-2 text-foreground-secondary hover:bg-accent/5 rounded-lg transition-colors"
                      title={message.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      {message.isRead ? <Mail size={18} /> : <MailOpen size={18} />}
                    </button>
                    <button
                      onClick={() => setDeleteId(message.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Message Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title="Message Details"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground-secondary">From</p>
              <p className="text-base font-medium text-foreground">{selectedMessage.name}</p>
            </div>

            <div>
              <p className="text-sm text-foreground-secondary">Email</p>
              <p className="text-base text-foreground">{selectedMessage.email}</p>
            </div>

            {selectedMessage.phone && (
              <div>
                <p className="text-sm text-foreground-secondary">Phone</p>
                <p className="text-base text-foreground">{selectedMessage.phone}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-foreground-secondary">Subject</p>
              <p className="text-base font-medium text-foreground">{selectedMessage.subject}</p>
            </div>

            <div>
              <p className="text-sm text-foreground-secondary">Message</p>
              <p className="text-base text-foreground mt-1 whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div>
              <p className="text-sm text-foreground-secondary">Received</p>
              <p className="text-base text-foreground">{formatDate(selectedMessage.createdAt)}</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-card-border">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="flex-1 px-4 py-2 bg-accent-blue text-white text-center rounded-lg hover:bg-accent-blue/90 transition-colors"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
