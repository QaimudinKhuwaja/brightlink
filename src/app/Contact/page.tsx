// 'use client';

// import MotionDiv from '../component/MotionDivWrapper';
// import { Mail, Phone, MapPin } from 'lucide-react';

// export default function ContactPage() {
//   return (
//     <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
//       {/* Heading */}
//       <MotionDiv
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-red-900 mb-4">Contact Us</h1>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Bright Link School se raabta k liye neeche diye gaye details aur form ka use karein.
//         </p>
//       </MotionDiv>

//       {/* Contact Grid */}
//       <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
//         {/* Contact Info */}
//         <MotionDiv
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="bg-white shadow-lg rounded-2xl p-8"
//         >
//           <h2 className="text-2xl font-semibold text-blue-700 mb-6">School Information</h2>
//           <div className="space-y-6">
//             <div className="flex items-center gap-4">
//               <MapPin className="text-red-900 w-6 h-6" />
//               <p className="text-gray-700">Bright Link School, Khuhra City</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <Phone className="text-red-900 w-6 h-6" />
//               <p className="text-gray-700">+92 300 1234567</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <Mail className="text-red-900 w-6 h-6" />
//               <p className="text-gray-700">info@brightlinkschool.com</p>
//             </div>
//           </div>
//         </MotionDiv>

//         {/* Contact Form */}
//         <MotionDiv
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="bg-white shadow-lg rounded-2xl p-8"
//         >
//           <h2 className="text-2xl font-semibold text-blue-700 mb-6">Send Us a Message</h2>
//           <form className="space-y-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Your Name</label>
//               <input
//                 type="text"
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Your Email</label>
//               <input
//                 type="email"
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Message</label>
//               <textarea
//                 rows={4}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
//                 placeholder="Write your message..."
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-red-900 text-white py-3 rounded-lg hover:bg-red-800 transition-colors"
//             >
//               Send Message
//             </button>
//           </form>
//         </MotionDiv>
//       </div>

//       {/* Map Placeholder */}
//       <MotionDiv
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="mt-16 max-w-6xl mx-auto"
//       >
//         <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
//           <p className="text-gray-500">[Google Map Placeholder]</p>
//         </div>
//       </MotionDiv>
//     </section>
//   );
// }
'use client';

import MotionDiv from '../component/MotionDivWrapper';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Bright Link School se raabta k liye details aur form use karein.
        </p>
      </MotionDiv>

      {/* Contact Info + Form */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Info */}
        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">School Information</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="text-red-900 w-6 h-6" />
              <p className="text-gray-700">Bright Link School, Khuhra, Tehsil Gambat, Khairpur, Sindh</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-red-900 w-6 h-6" />
              <p className="text-gray-700">+92 300 1234567</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-red-900 w-6 h-6" />
              <p className="text-gray-700">info@brightlinkschool.com</p>
            </div>
          </div>
        </MotionDiv>

        {/* Form */}
        <MotionDiv
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-900 text-white py-3 rounded-lg hover:bg-red-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </MotionDiv>
      </div>

      {/* Map Embed */}
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-16 max-w-6xl mx-auto"
      >
        <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31639.123456!2d68.518753!3d27.357073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v169xxx" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </MotionDiv>
    </section>
  );
}
