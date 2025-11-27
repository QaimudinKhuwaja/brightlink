'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function AcademicsPage() {
  const classes = [
    { name: 'Nursery', desc: 'Learning letters, numbers, rhymes, and fun activities to start the journey of learning.' },
    { name: 'KG', desc: 'Introduction to reading, writing, simple math, and social skills through play.' },
    { name: 'Class 1', desc: 'Building basics in language and numbers with fun activities.' },
    { name: 'Class 2', desc: 'Improving reading, math, and understanding the world around us.' },
    { name: 'Class 3', desc: 'Encouraging creativity, problem-solving, and teamwork.' },
    { name: 'Class 4', desc: 'Strengthening knowledge with hands-on learning and simple experiments.' },
    { name: 'Class 5', desc: 'Preparing students for middle school with strong foundations.' },
    { name: 'Class 6', desc: 'Introducing higher concepts in science, math, and social studies.' },
    { name: 'Class 7', desc: 'Balanced learning with thinking skills and co-curricular activities.' },
    { name: 'Class 8', desc: 'Getting ready for secondary school with confidence and knowledge.' },
    { name: 'Class 9', desc: 'Learning important concepts in science, math, and languages for HSC.' },
    { name: 'Class 10', desc: 'Reviewing and preparing for exams while building confidence for future studies.' },
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
        <h1 className="text-4xl font-bold text-red-900 mb-4">Our Academics</h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          From Nursery to HSC, we teach modern education along with good values and discipline. Every class prepares students for the next step in their learning journey.
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
