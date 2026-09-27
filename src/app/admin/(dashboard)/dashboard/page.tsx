'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Image,
  Users,
  Calendar,
  MessageSquare,
  Mail,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import { CardSkeleton } from '@/components/admin/Skeletons';

interface DashboardStats {
  admissions: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  gallery: number;
  faculty: number;
  events: number;
  feedback: number;
  unreadMessages: number;
}

interface RecentItem {
  id: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data.stats);
        setRecentAdmissions(data.data.recent.admissions);
        setRecentMessages(data.data.recent.messages);
        setRecentFeedback(data.data.recent.feedback);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Admissions',
      value: stats?.admissions.total || 0,
      icon: GraduationCap,
      color: 'bg-accent-blue/50/10 dark:bg-accent-blue/50/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      link: '/admin/admissions',
    },
    {
      title: 'Pending Admissions',
      value: stats?.admissions.pending || 0,
      icon: Clock,
      color: 'bg-yellow-500/10 dark:bg-yellow-500/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      link: '/admin/admissions?status=pending',
    },
    {
      title: 'Gallery Images',
      value: stats?.gallery || 0,
      icon: Image,
      color: 'bg-purple-500/10 dark:bg-purple-500/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      link: '/admin/gallery',
    },
    {
      title: 'Faculty Members',
      value: stats?.faculty || 0,
      icon: Users,
      color: 'bg-green-500/10 dark:bg-green-500/20',
      iconColor: 'text-green-600 dark:text-green-400',
      link: '/admin/faculty',
    },
    {
      title: 'Events',
      value: stats?.events || 0,
      icon: Calendar,
      color: 'bg-orange-500/10 dark:bg-orange-500/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      link: '/admin/events',
    },
    {
      title: 'Feedback',
      value: stats?.feedback || 0,
      icon: MessageSquare,
      color: 'bg-pink-500/10 dark:bg-pink-500/20',
      iconColor: 'text-pink-600 dark:text-pink-400',
      link: '/admin/feedback',
    },
    {
      title: 'Unread Messages',
      value: stats?.unreadMessages || 0,
      icon: Mail,
      color: 'bg-red-500/10 dark:bg-red-500/20',
      iconColor: 'text-red-600 dark:text-red-400',
      link: '/admin/messages',
    },
    {
      title: 'Approved Admissions',
      value: stats?.admissions.approved || 0,
      icon: CheckCircle,
      color: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      link: '/admin/admissions?status=approved',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-foreground-secondary">Welcome back! Here&apos;s an overview of your school.</p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="saas-card p-6 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-foreground-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="stat-card flex-col items-start">
                <div className="stat-dot mb-2" />
                <div className="stat-value text-2xl mb-1">{card.value}</div>
                <div className="stat-label">{card.title}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Admission Status */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="saas-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-foreground-secondary text-sm">Approved</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.admissions.approved}</p>
          </div>

          <div className="saas-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-foreground-secondary text-sm">Pending</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.admissions.pending}</p>
          </div>

          <div className="saas-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-foreground-secondary text-sm">Rejected</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.admissions.rejected}</p>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Recent Admissions</h2>
            <Link
              href="/admin/admissions"
              className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              View All
            </Link>
          </div>

          {recentAdmissions.length === 0 ? (
            <p className="text-sm text-foreground-secondary text-center py-8">No recent admissions</p>
          ) : (
            <div className="space-y-3">
              {recentAdmissions.slice(0, 5).map((admission: any) => (
                <div
                  key={admission.id}
                  className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {admission.studentName}
                    </p>
                    <p className="text-xs text-foreground-secondary">
                      {admission.applyingClass} • {new Date(admission.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-pill ${
                      admission.status === 'PENDING'
                        ? 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400'
                        : admission.status === 'APPROVED'
                        ? 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                        : 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                    }`}
                  >
                    {admission.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              View All
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-sm text-foreground-secondary text-center py-8">No recent messages</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.slice(0, 5).map((message: any) => (
                <div
                  key={message.id}
                  className="flex items-start gap-3 p-3 bg-background-secondary rounded-lg"
                >
                  <Mail className="w-4 h-4 text-foreground-secondary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{message.name}</p>
                    <p className="text-xs text-foreground-secondary truncate">{message.subject}</p>
                    <p className="text-xs text-foreground-secondary mt-1">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
