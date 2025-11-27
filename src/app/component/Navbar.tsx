'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/../public/brightLogo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/About' },
    { name: 'Academics', path: '/AcademicsPage' },
    { name: 'Facilities', path: '/Facilities' },
    { name: 'Faculty', path: '/Faculty' },
    { name: 'Admission', path: '/Admission' },
    { name: 'Events & Celebrations', path: '/EventsAndNewsPage' },
    { name: 'Gallery', path: '/Gallery' },
    { name: 'Contact', path: '/Contact' },
  ];

  return (
    <nav className="bg-red-950 text-white py-4 px-6 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* School Logo */}
        <Link href="/">
          <Image src={logo} alt="School Logo" className="h-12 w-12 rounded" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="hover:text-gray-300 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-950 p-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
















