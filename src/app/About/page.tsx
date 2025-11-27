'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">
          About Bright Link Public High School
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
        Bright Link School is a well-known educational institution in Khuhra City, offering complete schooling from early grades up to the HSC level. Our mission is to provide students with a bright future through modern, high-quality, and meaningful education.
        </p>
      </MotionDiv>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        <MotionDiv
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-md rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision</h2>
          <p className="text-gray-700">
          Our vision is to shape children into leaders who excel in education, character, and service to the community.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-md rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
          <p className="text-gray-700">
          Along with education, we give equal importance to character building and skill development so that students can succeed in every field.
          </p>
        </MotionDiv>
      </div>

      {/* Principal's Note */}
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-red-900 text-white rounded-2xl shadow-lg max-w-4xl mx-auto p-10"
      >
        <h2 className="text-3xl font-bold mb-4">Principal’s Message</h2>
        <p className="text-lg mb-6 leading-relaxed">
        At Bright Link School, we see education as a journey of growth, character, and inspiration. 
        Our school is a caring family where every child is valued, supported, and encouraged to reach their true potential.
        With dedicated teachers and a nurturing environment, we help students discover their talents, build confidence,
        and prepare for a bright, successful future. It is my honor to lead this wonderful community, and I warmly welcome
        every child to join us on this beautiful path of learning and possibility.
        </p>
        <p className="font-semibold text-xl">- Adnan Ahmed</p>
        <p className="italic">Principal</p>
      </MotionDiv>
    </section>
  );
}
