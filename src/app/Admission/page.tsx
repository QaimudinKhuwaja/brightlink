'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function AdmissionPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Header */}
      <div className="relative bg-red-900 text-white py-24 px-6 md:px-16 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Admission at Bright Link School
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Hamara admission process simple aur transparent hai. Taleem sab ka
            haq hai aur hum har student ko quality education provide karne ka
            wada karte hain.
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
            'Admission form school office se hasil karein.',
            'Form ko required documents ke sath submit karein.',
            'Admission test aur interview ke zariye selection hoti hai.',
            'Final merit list ke baad admission confirm hota hai.',
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
            { title: 'B-Form / Birth Certificate', desc: 'Copy of child birth proof' },
            { title: '2 Photographs', desc: 'Recent passport size photos' },
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
            Apne bachon ka mustaqbil roshan banane ke liye Bright Link School ka
            hissa banein. Form submit karna sirf ek click door hai!
          </p>
          <a
            href="https://full-stack-form-phi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300"
          >
            Admission Form
          </a>
        </MotionDiv>
      </div>
    </section>
  );
}
