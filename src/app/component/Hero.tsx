// 'use client'; // Add this line to mark the file as a Client Component

// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import MotionDiv from './MotionDivWrapper'; 
// import Children from '@/../public/child.jpg';
// import Schoolbg from '@/../public/image.png';

// const Hero = () => {
//   return (
//     <>
//       <section 
//         className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 pt-24 relative"
//         style={{
//           backgroundImage: `url(${Schoolbg.src})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           opacity: 1, 
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div>

//         <MotionDiv
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="md:w-1/2 text-center md:text-left relative z-10"
//         >
//           <h1 className="lg:text-5xl font-bold text-white mb-4 md:text-5xl sm:text-4xl text-3xl">
//             Welcome to <br />
//             <span className='text-red-900 font-[900] underline typewriter'> Bright Link</span> Public <br /> Elementary School Khuhra
//           </h1>
//           <p className="text-lg text-gray-300 mb-6">
//             Providing quality education to empower future leaders. Join us to experience world-class learning and growth opportunities.
//           </p>
//          <Link href="https://full-stack-form-phi.vercel.app/">
//          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 mb-4 animate-pulse">
//             Apply Now
//            </button>
//          </Link>
          
          
//         </MotionDiv>

//         <MotionDiv
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="md:w-1/2 flex justify-center relative z-10"
//         >
//           <Image src={Children} alt="Students" className="w-full max-w-lg rounded-lg shadow-lg" />
//         </MotionDiv>
//       </section>

//        {/* Content Sections */}
//        <section className="py-16 px-6 md:px-16">
//         <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">Why Choose Us?</h2>
//         <div className="grid md:grid-cols-3 gap-6 text-center">
//           <div className="p-6 bg-white shadow-md rounded-xl">
//             <h3 className="text-xl font-semibold mb-2">Experienced Faculty</h3>
//             <p className="text-gray-700">Highly qualified teachers ensuring top-notch education.</p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-xl">
//             <h3 className="text-xl font-semibold mb-2">Modern Infrastructure</h3>
//             <p className="text-gray-700">Smart classrooms, labs, and libraries for effective learning.</p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-xl">
//             <h3 className="text-xl font-semibold mb-2">Co-curricular Activities</h3>
//             <p className="text-gray-700">Sports, music, and arts programs to enhance skills.</p>
//           </div>
//         </div>
//       </section>

//       <div className="coming-soon-container text-center mt-4 mb-5">
//         <h1 className="coming-soon-text text-4xl font-bold text-white ">
//         Coming Soon
//         </h1>

// </div>

//       <style jsx>{`
//   .typewriter {
//     display: inline-block;
//     white-space: nowrap;
//     overflow: hidden;
//     border-right: 2px solid white;
//     animation: typing 3s steps(20, end) infinite alternate, blink 0.75s step-end infinite;
//   }

//   @keyframes typing {
//     from { width: 0; }
//     to { width: 60%; }
//   }

//   @keyframes blink {
//     50% { border-color: transparent; }
//   }


//    @keyframes pulse {
//     0% {
//       transform: scale(1);
//       box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
//     }
//     70% {
//       transform: scale(1.05);
//       box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0);
//     }
//     100% {
//       transform: scale(1);
//       box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
//     }
//   }

//   .animate-pulse {
//     animation: pulse 2s infinite;
//   }



// .coming-soon-text {
//       color: #fff;
//       text-shadow: 0 0 5px #fff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 80px #ff00ff;
//       animation: flicker 1.5s infinite alternate;
//     }

//     @keyframes flicker {
//       0% {
//         opacity: 1;
//         text-shadow: 0 0 5px #fff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 80px #ff00ff;
//       }
//       50% {
//         opacity: 0.8;
//         text-shadow: 0 0 3px #fff, 0 0 8px #ff00ff, 0 0 16px #ff00ff, 0 0 32px #ff00ff, 0 0 64px #ff00ff;
//       }
//       100% {
//         opacity: 1;
//         text-shadow: 0 0 5px #fff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 80px #ff00ff;
//       }
//     }

// `}</style>






//     </>
//   );
// };

// export default Hero;




'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MotionDiv from './MotionDivWrapper'; 
import Children from '@/../public/child.jpg';
import Schoolbg from '@/../public/image.png';

const Hero = () => {
  return (
    <>
      <section 
        className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 pt-24 relative"
        style={{
          backgroundImage: `url(${Schoolbg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1, 
        }}
      >
        {/* background overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* left side text */}
        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 text-center md:text-left relative z-10"
        >
          <h1 className="lg:text-5xl font-bold text-white mb-4 md:text-5xl sm:text-4xl text-3xl">
            Welcome to <br />
            <span className='text-red-900 font-[900] underline typewriter'>
              Bright Link
            </span> Public <br /> Elementary School Khuhra
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Providing quality education to empower future leaders. Join us to
            experience world-class learning and growth opportunities.
          </p>
          <Link href="https://full-stack-form-phi.vercel.app/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 mb-4 animate-pulse">
              Apply Now
            </button>
          </Link>
        </MotionDiv>

        {/* right side image */}
        <MotionDiv
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex justify-center relative z-10"
        >
          <Image
            src={Children}
            alt="Students"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </MotionDiv>
      </section>

      {/* animations ke liye style */}
      <style jsx>{`
        .typewriter {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          border-right: 2px solid white;
          animation: typing 3s steps(20, end) infinite alternate,
            blink 0.75s step-end infinite;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 60%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </>
  );
};

export default Hero;
