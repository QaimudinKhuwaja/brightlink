'use client';

import MotionDiv from '../component/MotionDivWrapper';
import { MapPin, Facebook, Youtube, MessageSquare } from 'lucide-react'
import tiktokLogo from '@/../public/tiktok.png'
import Image from 'next/image'
export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16 flex flex-col items-center">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get in touch with Bright Link School through the details below.
        </p>

      </MotionDiv>

      {/* Centered Contact Box */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-3xl p-10 max-w-xl w-full flex flex-col gap-6 text-center"
      >
        <h2 className="text-2xl font-semibold text-red-900 mb-6">School Information</h2>

        <div className="flex items-center gap-4 justify-center">
          <MapPin className="w-6 h-6 text-red-900" />
          <p className="text-gray-700">Bright Link School, Khuhra, Tehsil Gambat, Khairpur, Sindh</p>
        </div>
<div className="flex items-center gap-6 justify-center mt-4">
  <a href="https://wa.me/923000811056" target="_blank" rel="noopener noreferrer">
    <MessageSquare className="w-8 h-8 text-green-600 hover:text-green-800 transition" />
  </a>
  <a href="" target="_blank" rel="noopener noreferrer">
    <Facebook className="w-8 h-8 text-blue-600 hover:text-blue-800 transition" />
  </a>
  <a href="https://youtube.com/@brightlinkpublichighschool?si=7Ae-4IiAFtEvzf7t" target="_blank" rel="noopener noreferrer">
    <Youtube className="w-8 h-8 text-red-600 hover:text-red-800 transition" />
  </a>
  {/* TikTok Logo */}
  <a href="https://www.tiktok.com/@brightlinkschool" target="_blank" rel="noopener noreferrer" className="w-8 h-8">
    <Image src={tiktokLogo} alt="TikTok" width={32} height={32} className="object-contain" />
  </a>
</div>

      </MotionDiv>

      {/* Map Embed */}
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-16 w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31639.123456!2d68.518753!3d27.357073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v169xxx"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </MotionDiv>
    </section>
  );
}
