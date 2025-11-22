'use client';

import Link from 'next/link';

const SmallNavbar = () => {
  return (
    <div className="bg-green-500 text-white py-2 text-center flex justify-center items-center px-4">
      <p className="text-sm md:text-base font-medium">Admissions Open - Apply Now!</p>
      <Link href="/admission">
        <button className="ml-4 bg-white text-blue-600 font-semibold py-1 px-3 md:px-4 rounded-lg text-sm md:text-base shadow-md hover:bg-gray-200 transition">
          Apply Now
        </button>
      </Link>
    </div>
  );
};

export default SmallNavbar;
