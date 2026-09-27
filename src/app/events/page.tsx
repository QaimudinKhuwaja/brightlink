'use client';

import { useState, useEffect } from 'react';
import MotionDiv from '@/app/components/ui/MotionDiv';
import { Trophy, FlaskConical, Users, Palette, Flag, Heart, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  color: string;
  icon: string;
  imageUrl: string | null;
}

// Map icon names to components
const iconMap: Record<string, any> = {
  Trophy,
  FlaskConical,
  Users,
  Palette,
  Flag,
  Heart,
  Calendar,
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
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

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; badge: string }> = {
      orange: {
        bg: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700',
        icon: 'text-orange-600 dark:text-orange-400',
        badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      },
      blue: {
        bg: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
        icon: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      },
      purple: {
        bg: 'from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
        icon: 'text-purple-600 dark:text-purple-400',
        badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      },
      pink: {
        bg: 'from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700',
        icon: 'text-pink-600 dark:text-pink-400',
        badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
      },
      green: {
        bg: 'from-green-500 to-green-600 dark:from-green-600 dark:to-green-700',
        icon: 'text-green-600 dark:text-green-400',
        badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      },
      red: {
        bg: 'from-red-500 to-red-600 dark:from-red-600 dark:to-red-700',
        icon: 'text-red-600 dark:text-red-400',
        badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-rose-600 to-pink-700 dark:from-rose-700 dark:to-pink-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="glow-blob-blue w-96 h-96 -top-48 -left-48 opacity-30" />
        <div className="glow-blob-blue w-80 h-80 bottom-0 right-20 opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Events & <span className="italic">Celebrations</span>
            </h1>
            <p className="text-lg md:text-xl text-rose-100 leading-relaxed">
              Where students shine academically and creatively throughout the year with memorable
              experiences.
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Events Grid */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-blob-blue w-96 h-96 top-20 -right-48" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground-secondary text-lg">No events available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {events.map((event, index) => {
                const colors = getColorClasses(event.color);
                const IconComponent = iconMap[event.icon] || Calendar;

                return (
                  <MotionDiv
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="saas-card overflow-hidden group"
                  >
                    <div className={`bg-gradient-to-br ${colors.bg} p-6 text-white`}>
                      <IconComponent className="w-12 h-12 mb-4 opacity-90" />
                      <span className="inline-block px-3 py-1 rounded-pill text-xs font-medium bg-white/20 backdrop-blur-sm">
                        {event.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent-blue transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-3 py-1 rounded-pill ${colors.badge} font-medium`}>
                          {event.date}
                        </span>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
