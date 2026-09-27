'use client';

import { useEffect, useState } from 'react';
import Hero from './component/Hero';
import MotionDiv from './components/ui/MotionDiv';
import { ArrowRight, BookOpen, Users, Award, Calendar, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  color: string;
  icon: string;
}

interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
}

interface Testimonial {
  id: string;
  name: string;
  childClass: string;
  rating: number;
  comment: string;
}

export default function Home() {
  const [latestEvents, setLatestEvents] = useState<Event[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [eventsRes, galleryRes, feedbackRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/gallery'),
        fetch('/api/feedback'),
      ]);

      const [eventsData, galleryData, feedbackData] = await Promise.all([
        eventsRes.json(),
        galleryRes.json(),
        feedbackRes.json(),
      ]);

      if (eventsData.success) {
        setLatestEvents(eventsData.data.slice(0, 3));
      }

      if (galleryData.success) {
        setGalleryImages(galleryData.data.slice(0, 6));
      }

      if (feedbackData.success) {
        setTestimonials(feedbackData.data.slice(0, 2));
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    }
  };

  const features = [
    { icon: BookOpen, title: 'Quality Education', desc: 'Modern curriculum from Nursery to Class 10', color: 'blue' },
    { icon: Users, title: 'Expert Faculty', desc: '20+ experienced and dedicated teachers', color: 'purple' },
    { icon: Award, title: 'Proven Results', desc: '95% success rate in board exams', color: 'green' },
    { icon: Calendar, title: 'Rich Events', desc: 'Sports, cultural festivals & exhibitions', color: 'orange' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400' },
      purple: { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-600 dark:text-purple-400' },
      green: { bg: 'bg-green-500/10 dark:bg-green-500/20', text: 'text-green-600 dark:text-green-400' },
      orange: { bg: 'bg-orange-500/10 dark:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-blob-blue w-64 h-64 top-20 right-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading">
              Why Choose <span className="heading-emphasis">Bright Link?</span>
            </h2>
            <p className="section-subheading">
              We provide a nurturing environment where every student can excel
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const colors = getColorClasses(feature.color);
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="saas-card p-6"
                >
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground-secondary">{feature.desc}</p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background-secondary relative overflow-hidden">
        <div className="glow-blob-blue w-96 h-96 -bottom-48 -left-48" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block badge-pill text-accent-blue mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Shaping Futures, <span className="heading-emphasis">Building Character</span>
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Bright Link School is a well-known educational institution in Khuhra City, offering complete schooling from early grades up to Class 10. Our mission is to provide students with a bright future through modern, high-quality education.
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-8">
                Along with education, we give equal importance to character building and skill development so that students can succeed in every field of life.
              </p>
              <Link href="/about" className="btn-primary px-6 py-3 inline-flex items-center gap-2">
                Learn More About Us
                <ArrowRight size={18} />
              </Link>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: 'Small Steps' },
                { value: 'Big Dreams'  },
                { value: 'Growing Minds' },
                { value: 'Growing Dreams' },
              ].map((stat, index) => (
                <div key={index} className="saas-card p-6 text-center">
                  <div className="stat-dot mx-auto mb-3" />
                  <div className="stat-value text-2xl">{stat.value}</div>
                  
                </div>
              ))}
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Latest Events */}
      {latestEvents.length > 0 && (
        <section className="section-padding relative overflow-hidden">
          <div className="glow-blob-blue w-80 h-80 top-10 right-20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="section-heading">
                Upcoming <span className="heading-emphasis">Events</span>
              </h2>
              <p className="section-subheading">Stay updated with our latest activities</p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {latestEvents.map((event, index) => (
                <MotionDiv
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="saas-card p-6"
                >
                  <div className="inline-block px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs font-medium rounded-pill mb-3">
                    {event.category}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                  <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">{event.description}</p>
                  <p className="text-xs text-foreground-secondary">{event.date}</p>
                </MotionDiv>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 font-semibold transition-colors"
              >
                View All Events
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-background-secondary relative overflow-hidden">
          <div className="glow-blob-blue w-64 h-64 bottom-20 left-10" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="section-heading">
                What <span className="heading-emphasis">Parents Say</span>
              </h2>
              <p className="section-subheading">
                Trusted by hundreds of families in our community
              </p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <MotionDiv
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="saas-card p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-4">&ldquo;{testimonial.comment}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground-secondary">Parent of {testimonial.childClass} student</p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/feedback"
                className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 font-semibold transition-colors"
              >
                Read More Reviews
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="glow-blob-blue w-96 h-96 -top-48 -right-48 opacity-30" />
        <div className="glow-blob-blue w-80 h-80 -bottom-40 -left-40 opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to Join <span className="italic">Bright Link?</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Admissions are open for the upcoming academic year. Don&apos;t miss this opportunity!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-4 px-8 rounded-pill shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                Apply Now
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-pill transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
