'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  Image,
  Users,
  Calendar,
  MessageSquare,
  Mail,
  UserCog,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface SidebarProps {
  admin: {
    username: string;
    email: string;
    role: string;
  };
}

export function Sidebar({ admin }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/admissions', icon: GraduationCap, label: 'Admissions' },
    { href: '/admin/gallery', icon: Image, label: 'Gallery' },
    { href: '/admin/faculty', icon: Users, label: 'Faculty' },
    { href: '/admin/events', icon: Calendar, label: 'Events' },
    { href: '/admin/feedback', icon: MessageSquare, label: 'Feedback' },
    { href: '/admin/messages', icon: Mail, label: 'Messages' },
  ];

  if (admin.role === 'SUPER_ADMIN') {
    menuItems.push({ href: '/admin/admins', icon: UserCog, label: 'Admins' });
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card border-r border-border theme-transition">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Bright Link</h1>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-foreground-secondary hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-xs text-foreground-secondary">Admin Dashboard</p>
      </div>

      {/* Admin Info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-pill flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-accent-blue">
              {admin.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{admin.username}</p>
            <p className="text-xs text-foreground-secondary truncate">{admin.email}</p>
          </div>
        </div>
        {admin.role === 'SUPER_ADMIN' && (
          <div className="mt-3">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-accent-blue/10 dark:bg-accent-blue/20 text-accent-blue rounded-pill">
              Super Admin
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-blue text-white shadow-sm'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm text-foreground-secondary">Theme</span>
          <ThemeToggle />
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all duration-200"
        >
          <LogOut size={20} />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between theme-transition">
        <h1 className="text-lg font-bold text-foreground">Bright Link Admin</h1>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-foreground-secondary hover:text-foreground transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Sidebar */}
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
