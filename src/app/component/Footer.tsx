'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-red-900 text-white pt-12 pb-6 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* School Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Bright Link School</h2>
          <p className="text-gray-200">
            Khuhra City ka ek taleemi markaz jo 8th class tak ki taleem aur 
            behtareen environment provide karta hai.
          </p>
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
              <Link href="/admission" className="hover:text-yellow-300 transition-colors">
                Admissions
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
          <p className="text-gray-200">📞 +92 300 1234567</p>
          <p className="text-gray-200">✉️ info@brightlinkschool.com</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-500 mt-10 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Bright Link School. All Rights Reserved.
      </div>
    </footer>
  );
}
