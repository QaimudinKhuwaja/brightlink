'use client';

import Image from 'next/image';
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
            </span> Public <br /> High School Khuhra
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Providing quality education to empower future leaders. Join us to
            experience world-class learning and growth opportunities.
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
