'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function FacultyPage() {
  return (
   <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-10"> 
  {/* Heading */}
  <MotionDiv
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-12" // mb-16 → mb-12
  >
    <h1 className="text-4xl font-bold text-red-900 mb-4">Our Faculty</h1>
    <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
      At BrightLink School, our faculty is more than a team of teachers. They are a dedicated group of professionals committed to inspiring every student and guiding them toward a bright future. Each teacher brings passion, expertise, and care to help students grow academically and personally.
    </p>
  </MotionDiv>

  {/* Motivational Quote */}
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="max-w-3xl mx-auto text-center mt-8" // mt-12 → mt-8
  >
    <p className="text-xl text-gray-700 italic">
      “A good teacher can inspire hope, ignite the imagination, and instill a love of learning.”
      <span className="block mt-2 font-semibold text-red-800"> Brad Henry</span>
    </p>
  </MotionDiv>
</section>

   
  );
}
