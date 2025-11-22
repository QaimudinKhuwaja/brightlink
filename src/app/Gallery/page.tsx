'use client';

import Image from 'next/image';
import MotionDiv from '../component/MotionDivWrapper';
import Children from '@/../public/child.jpg';

export default function GalleryPage() {
  // abhi array me ek imported image aur baaki string images mix kar raha hu
  const images = [
    Children, 
    Children, 
    Children, 
    Children, 
    Children, 
    Children, 
    Children, 
    Children, 
    Children, 
    
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
          Bright Link School ki yaadein aur highlights, students aur events ke
          zariye captured moments.
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

