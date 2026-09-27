'use client';

import { useState, useEffect } from 'react';
import MotionDiv from '@/app/components/ui/MotionDiv';
import { Image as ImageIcon, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  category: string;
  imageUrl: string;
  uploadDate: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      if (data.success) {
        setImages(data.data);

        // Extract unique categories
        const categorySet = new Set<string>(data.data.map((img: GalleryImage) => img.category));
        const uniqueCategories = ['All', ...Array.from(categorySet)];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-pink-600 to-rose-700 dark:from-pink-700 dark:to-rose-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="glow-blob-blue w-96 h-96 -top-48 -right-48 opacity-30" />
        <div className="glow-blob-blue w-80 h-80 bottom-0 left-20 opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Photo <span className="italic">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-pink-100 leading-relaxed">
              Capturing memorable moments from our school life, events, and achievements
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-pill font-medium text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent-blue text-white shadow-md'
                      : 'bg-secondary/50 text-foreground-secondary hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </MotionDiv>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="section-padding bg-background-secondary relative overflow-hidden">
        <div className="glow-blob-blue w-96 h-96 top-20 -left-48" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
            </div>
          ) : filteredImages.length === 0 ? (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="saas-card p-12 max-w-md mx-auto">
                <ImageIcon className="w-16 h-16 text-foreground-secondary/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Images Yet</h3>
                <p className="text-foreground-secondary">
                  {selectedCategory === 'All'
                    ? 'Gallery images will appear here soon. Check back later!'
                    : `No images found in "${selectedCategory}" category.`}
                </p>
              </div>
            </MotionDiv>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <MotionDiv
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="saas-card overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-secondary overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-accent-blue transition-colors">
                      {image.title}
                    </h3>

                    {image.description && (
                      <p className="text-sm text-foreground-secondary mb-3 line-clamp-2">
                        {image.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-foreground-secondary">
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>{image.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Info Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading">
              Life at <span className="heading-emphasis">Bright Link</span>
            </h2>
            <div className="saas-card p-8">
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Our gallery showcases the vibrant life at Bright Link School. From academic achievements and sports events to cultural programs and daily classroom activities, these images capture the energy, enthusiasm, and spirit of our school community.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Every photograph tells a story of learning, growth, and memorable experiences that our students, teachers, and staff create together. We regularly update our gallery with new images from recent events and activities, so be sure to visit often to see what&apos;s happening at our school.
              </p>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
