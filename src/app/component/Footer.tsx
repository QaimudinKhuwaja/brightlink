'use client';

import Link from 'next/link';
import Image from 'next/image';
import SchoolLogo from '@/../public/brightLogo.png'

export default function Footer() {
  return (
    <footer className="bg-red-900 text-white pt-12 pb-6 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* School Info */}
        <div className="flex flex-col items-start md:items-start">
          <h2 className="text-2xl font-bold mb-4">BrightLink Public High School</h2>
          <div className="mb-4">
            <Image
              src={SchoolLogo}
              alt="Bright Link School Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
         
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-yellow-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-300 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-yellow-300 transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-300 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-200">📍 Khuhra, Tehsil Gambat, District Khairpur</p>
          <p className="text-gray-200">📞 +92 300 0811056</p>
          <p className="text-gray-200">✉️ email</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-500 mt-10 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Bright Link School. All Rights Reserved.
      </div>
    </footer>
  );
}
