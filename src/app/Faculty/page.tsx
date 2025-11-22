'use client';

import Image from 'next/image';
import MotionDiv from '../component/MotionDivWrapper';
import Schoolbg from '@/../public/image.png';

export default function FacultyPage() {
  const faculty = [
    {
      name: 'Adnan Ahmed',
      role: 'Principal',
      subject: 'Leadership & Management',
      image: Schoolbg,
    },
    {
      name: 'Taifoor Mustafa',
      role: 'Vice Principal',
      subject: 'English & Literature',
      image: Schoolbg,
    },
    {
      name: 'Ali Raza',
      role: 'Senior Teacher',
      subject: 'Mathematics',
      image: Schoolbg,
    },
    {
      name: 'Sara Ahmed',
      role: 'Teacher',
      subject: 'Science',
      image: Schoolbg,
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">Our Faculty</h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          Bright Link School ki faculty sirf teachers ka group nahi, balke ek 
          dedicated team hai jo har student ke liye roshan mustaqbil banane ki koshish karti hai.  
          Har teacher apni expertise ke zariye students ko inspire karta hai.
        </p>
      </MotionDiv>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {faculty.map((member, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-red-800">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
            <p className="text-sm text-gray-500 italic mt-2">{member.subject}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
