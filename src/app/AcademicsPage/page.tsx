'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function AcademicsPage() {
  const classes = [
    { name: 'Nursery', desc: 'Basic learning, alphabets, numbers, rhymes, and fun activities.' },
    { name: 'KG', desc: 'Introduction to reading, writing, and simple math concepts.' },
    { name: 'Class 1', desc: 'Building strong foundations in language and numbers.' },
    { name: 'Class 2', desc: 'Enhancing skills in reading, math, and basic science.' },
    { name: 'Class 3', desc: 'Developing problem-solving and creativity through activities.' },
    { name: 'Class 4', desc: 'Strengthening academic concepts with interactive learning.' },
    { name: 'Class 5', desc: 'Preparing students for middle-level academics.' },
    { name: 'Class 6', desc: 'Introduction to higher concepts in science, math, and social studies.' },
    { name: 'Class 7', desc: 'Balanced academics with critical thinking and co-curriculars.' },
    { name: 'Class 8', desc: 'Final step of Bright Link journey — preparing for higher studies.' },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-6 md:px-16">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">Academics</h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          Bright Link School ka curriculum nursery se 8th class tak design kiya gaya hai 
          jahan students ko modern education ke sath-sath moral values aur discipline 
          bhi sikhaye jate hain. Har class students ko aglay stage ke liye tayar karti hai.
        </p>
      </MotionDiv>

      {/* Class Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {classes.map((cls, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6"
          >
            <h3 className="text-2xl font-semibold text-red-800 mb-3">{cls.name}</h3>
            <p className="text-gray-600 text-base">{cls.desc}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
