import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SmallNavbar() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2.5 text-sm">
          <p className="text-center font-medium">
            🎓 Admissions Open 2026-27 — Secure Your Child&apos;s Future Today!
          </p>
          <Link
            href="/admission"
            className="ml-4 hidden sm:inline-flex items-center gap-1 bg-white text-blue-600 font-semibold px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Apply Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
