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
          About Bright Link Public Elementary School
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Bright Link School, Khuhra City ka ek mashhoor taleemi idara hai jo
          8th class tak ki taleem faraham karta hai. Hamara mission bacho ko
          modern aur behtareen taleem ke zariye roshan mustaqbil dena hai.
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
            Hamara vision hai ke hum bacho ko aise leaders banaye jo taleem,
            ikhlaq aur maashray ki khidmat me misaal ban sakein.
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
            Taleem ke sath character building aur skills development par barabar
            tawajjo dete hain taake students har field me kamiyab ho saken.
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
        <h2 className="text-3xl font-bold mb-4">Principals Message</h2>
        <p className="text-lg mb-6 leading-relaxed">
          Bright Link School sirf ek taleemi idara nahi balki aik family hai jo
          har student ko unki behtareen salahiyaton tak pohchane ka waada karti
          hai. Hamare teachers ki mehnat aur students ki lagan mil kar ek roshan
          mustaqbil banate hain.
        </p>
        <p className="font-semibold text-xl">- Adnan Ahmed</p>
        <p className="italic">Principal</p>
      </MotionDiv>
    </section>
  );
}
