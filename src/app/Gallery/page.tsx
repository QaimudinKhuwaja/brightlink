'use client';

import Image from 'next/image';
import MotionDiv from '../component/MotionDivWrapper';
import image1 from '@/../public/img1.jpg'
import image2 from '@/../public/img2.jpg'
import image3 from '@/../public/img3.jpg'
import image4 from '@/../public/img4.jpg'
import image5 from '@/../public/img5.jpg'
import image6 from '@/../public/img6.jpg'
import image7 from '@/../public/img7.jpg'
import image8 from '@/../public/img8.jpg'
import image9 from '@/../public/img9.jpg'
import image10 from '@/../public/img10.jpg'
import image11 from '@/../public/img11.jpg'



export default function GalleryPage() {
  const images = [
    image1, 
    image10, 
    image9, 
    image4, 
    image5,
    image6, 
    image7, 
    image8, 
    image3, 
    image2,
    image11,
    
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">School Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Memories and highlights of Bright Link School, captured through students and events.
        </p>
      </MotionDiv>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((src, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full h-64">
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority={index === 0} // pehli image fast load hogi
              />
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}

