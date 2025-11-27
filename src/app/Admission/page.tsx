'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function AdmissionPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ">
      {/* Hero Header */}
      <div className="relative bg-red-900 text-white py-24 px-6 md:px-16 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Admission at BrightLink School
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Our admission process is simple and transparent. Education is every childs right, and we promise to provide quality education to every student.
          </p>
        </MotionDiv>
      </div>

      {/* Procedure Timeline */}
      <div className="max-w-5xl mx-auto py-20 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-red-900 mb-12">
          Admission Procedure
        </h2>
        <div className="space-y-8 relative border-l-4 border-red-900 pl-6">
          {[
            'Obtain the admission form from the school office.',
            'Submit the completed form along with the required documents.',
            'Selection is done through an admission test.',
            'After the final merit list, admission is confirmed.',
          ].map((step, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white shadow-md rounded-xl p-6 relative"
            >
              <span className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-red-900 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                {index + 1}
              </span>
              <p className="text-gray-700">{step}</p>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Required Documents Cards */}
      <div className="bg-white py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-red-900 mb-12">
          Required Documents
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'B-Form / Birth Certificate', desc: 'Copy of child’s birth proof' },
            { title: '2 Photographs', desc: 'Recent passport-size photos' },
            { title: 'School Leaving Certificate', desc: 'If transferring from another school' },
            { title: 'Parent CNIC Copy', desc: 'Father/Mother/Guardian ID card' },
          ].map((doc, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {doc.title}
              </h3>
              <p className="text-gray-600">{doc.desc}</p>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Apply CTA */}
      <div className="bg-gradient-to-r from-red-800 to-red-950 text-white py-20 px-6 md:px-16 text-center">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Apply Now for Admission
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-200">
            Join Bright Link School to give your child a bright future. Submitting the admission form is just one click away!
          </p>
         <a
  href="https://wa.me/923000811056"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300"
>
  Contact Us
</a>

        </MotionDiv>
      </div>
    </section>
  );
}
