'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import logo from '@/../public/brightLogo.png';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Admission', path: '/admission' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={logo}
              alt="Bright Link School"
              className="h-10 w-10 md:h-12 md:w-12 rounded-lg transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Bright Link
              </h1>
              <p className="text-xs text-foreground-secondary -mt-1">Public High School</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-accent-blue bg-accent/10'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-accent/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-accent/5 transition-all duration-200 flex items-center gap-1">
                More
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-card rounded-xl shadow-lg border border-card-border p-2">
                  {navLinks.slice(6).map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? 'text-accent-blue bg-accent/10'
                          : 'text-foreground-secondary hover:text-foreground hover:bg-accent/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground-secondary hover:text-foreground px-4 py-2 rounded-pill hover:bg-accent/5 transition-all"
            >
              Get in touch
            </Link>
            <Link
              href="/admission"
              className="btn-primary px-6 py-2 text-sm"
            >
              Book a demo
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-accent/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-border">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-accent-blue bg-accent/10'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-accent/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border mt-2 space-y-2">
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-accent/5 rounded-lg transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-center rounded-pill border-2 border-primary/20 text-foreground hover:bg-primary/5 transition-all"
                >
                  Get in touch
                </Link>
                <Link
                  href="/admission"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-center btn-primary"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
