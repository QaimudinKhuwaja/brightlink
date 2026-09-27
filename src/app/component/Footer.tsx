import Link from 'next/link';
import Image from 'next/image';
import SchoolLogo from '@/../public/brightLogo.png';
import { MapPin, Phone, Mail, Facebook, Youtube, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admission' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/923000811056',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'hover:text-green-500 dark:hover:text-green-400',
    },

    {
      name: 'YouTube',
      href: 'https://youtube.com/@brightlinkpublichighschool',
      icon: <Youtube className="w-5 h-5" />,
      color: 'hover:text-red-600 dark:hover:text-red-400',
    },
  ];

  return (
    <footer className="bg-card border-t border-border theme-transition">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={SchoolLogo}
                alt="Bright Link School"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-foreground font-bold text-lg">Bright Link</h3>
                <p className="text-xs text-foreground-secondary">Public High School</p>
              </div>
            </div>
            <p className="text-sm text-foreground-secondary mb-6">
              Empowering students with quality education, modern values, and the skills to succeed in tomorrow&apos;s world.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-secondary/50 rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li>Primary Education (Nursery-5)</li>
              <li>Middle School (6-8)</li>
              <li>Secondary School (9-10)</li>
              <li>Co-Curricular Activities</li>
              <li>Digital Learning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground-secondary">
                  Khuhra, Tehsil Gambat, District Khairpur, Sindh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-blue flex-shrink-0" />
                <a href="tel:+923000811056" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
                  +92 300 0811056
                </a>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground-secondary">
            <p>© {currentYear} Bright Link Public High School. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
