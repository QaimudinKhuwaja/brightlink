'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MotionDiv from '@/components/ui/MotionDiv';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Glow Blob Effects */}
      <div className="glow-blob-blue w-96 h-96 -top-48 -left-48" />
      <div className="glow-blob-blue w-64 h-64 top-1/3 right-0" />
      <div className="glow-blob-blue w-80 h-80 bottom-0 left-1/4" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="badge-pill">
              <Sparkles className="w-4 h-4 text-accent-blue" />
              <span className="text-foreground-secondary">
                Admissions Open for 2026-27
              </span>
              <ArrowRight className="w-4 h-4 text-foreground-secondary" />
            </div>
          </MotionDiv>

          {/* Main Heading - Mixed Normal & Italic */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-7xl md:text-6xl lg:text-8xl font-extrabold leading-tight">
              <span className="block text-foreground">
                Quality Education,
              </span>
              <span className="block heading-emphasis mt-2">
                for Brighter <br/> Futures
              </span>
            </h1>
          </MotionDiv>

          {/* Subtext */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
          Great futures begin with great beginnings. We nurture every child from Nursery to Class 10 with care and excellence.
            </p>
          </MotionDiv>

          {/* Search/Input Bar */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto mb-12 px-4 sm:px-0"
          >
            <div className="bg-card rounded-pill border border-card-border shadow-lg p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-4 flex-1 min-w-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent-blue flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Give your child the best start. Admissions are now open..."
                  className="flex-1 min-w-0 bg-transparent border-none outline-none text-foreground placeholder:text-foreground-secondary text-xs sm:text-sm md:text-base py-1.5 sm:py-2 truncate"
                />
              </div>
              <Link
                href="/admission"
                className="btn-primary px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 flex-shrink-0"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </MotionDiv>

          {/* Bottom CTA */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-secondary/50 hover:bg-secondary text-foreground font-medium transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-accent-blue" />
              Discover our platform
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MotionDiv>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground-secondary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-foreground-secondary/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
