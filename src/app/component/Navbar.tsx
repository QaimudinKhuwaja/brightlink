// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react';
// import Image from 'next/image';
// import logo from '@/../public/brightLogo.png';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-red-950 text-white py-4 px-6 shadow-md fixed w-full z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* School Logo */}
//         <Link href="/">
//           <Image src={logo} alt="School Logo" className="h-12 w-12 rounded" />
//         </Link>


//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <Link href="/" className="hover:text-gray-300">Home</Link>
//           <Link href="/" className="hover:text-gray-300">Admission</Link>
//           <Link href="/" className="hover:text-gray-300">Contact</Link>
//           <Link href="/" className="hover:text-gray-300">Gallery</Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-red-950 p-4 flex flex-col space-y-4">
//           <Link href="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
//           <Link href="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Admission</Link>
//           <Link href="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact</Link>
//           <Link href="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Gallery</Link>
//         </div>
//       )}
//     </nav>
//   );
// }

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
    { name: 'Faculty', path: '/Faculty' },
    { name: 'Facilities', path: '/Facilities' },
    { name: 'Admission', path: '/Admission' },
    { name: 'Events & News', path: '/EventsAndNewsPage' },
    { name: 'Gallery', path: '/Gallery' },
    { name: 'Parents Feedback', path: '/ParentsFeedBack' },
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
















