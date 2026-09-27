'use client';

import MotionDiv from '@/app/components/ui/MotionDiv';
import {
  BookOpen,
  Microscope,
  Laptop,
  Users,
  Library,
  Utensils,
  Dumbbell,
  Shield,
  Wifi,
  Bus,
  Heart,
  Lightbulb,
} from 'lucide-react';

export default function FacilitiesPage() {
  const facilities = [
    {
      icon: BookOpen,
      title: 'Modern Classrooms',
      description: 'Well-ventilated, spacious classrooms equipped with whiteboards, proper seating, and adequate lighting to create an optimal learning environment for students.',
      color: 'blue',
      image: '📚',
    },
    {
      icon: Microscope,
      title: 'Science Laboratory',
      description: 'Fully equipped science lab where students conduct practical experiments in Physics, Chemistry, and Biology, bringing textbook concepts to life.',
      color: 'purple',
      image: '🔬',
    },
  
    {
      icon: Dumbbell,
      title: 'Sports Ground',
      description: 'Large playground for cricket, football, and other sports activities. Regular physical education classes promote fitness, teamwork, and sportsmanship.',
      color: 'orange',
      image: '⚽',
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'Secure campus with boundary walls, gated entry, and supervision to ensure student safety. We maintain strict protocols for student protection.',
      color: 'red',
      image: '🛡️',
    },

    {
      icon: Users,
      title: 'Assembly Hall',
      description: 'Spacious hall for morning assemblies, special events, parent meetings, and cultural programs where the entire school community gathers.',
      color: 'pink',
      image: '🎭',
    },

    {
      icon: Heart,
      title: 'First Aid',
      description: 'Basic first aid facilities and trained staff to handle minor injuries or health issues. Emergency contact system for parents in case of need.',
      color: 'rose',
      image: '🏥',
    },
    
  ];

  const highlights = [
    {
      title: 'Clean & Hygienic',
      description: 'All facilities are regularly cleaned and maintained to ensure a healthy environment',
      icon: '✨',
    },
    {
      title: 'Well Maintained',
      description: 'Regular maintenance and upgrades to keep all facilities in excellent condition',
      icon: '🔧',
    },
    {
      title: 'Student Friendly',
      description: 'All spaces designed with student comfort, safety, and accessibility in mind',
      icon: '👥',
    },
    {
      title: 'Continuously Improving',
      description: 'We regularly invest in improving and expanding our facilities',
      icon: '📈',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden py-24 md:py-32">
        <div className="glow-blob-blue w-96 h-96 -top-20 -right-20" />
        <div className="glow-blob-blue w-64 h-64 -bottom-10 -left-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Our <span className="heading-emphasis">Facilities</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
              Modern infrastructure and resources designed to provide the best learning environment for our students
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
              At Bright Link School, we believe that a conducive learning environment is essential for academic success. Our campus is equipped with modern facilities that support both academic excellence and overall student development. From well-equipped classrooms to science labs and sports grounds, we provide everything students need to learn, grow, and thrive.
            </p>

            {/* Highlights */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {highlights.map((highlight, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="saas-card p-6"
                >
                  <div className="text-4xl mb-3">{highlight.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{highlight.title}</h3>
                  <p className="text-sm text-foreground-secondary">{highlight.description}</p>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading text-foreground">
              Complete <span className="heading-emphasis">Campus Facilities</span>
            </h2>
            <p className="section-subheading">
              Everything your child needs for a comprehensive educational experience
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {facilities.map((facility, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="saas-card overflow-hidden group"
              >
                {/* Icon Header */}
                <div className="bg-accent-blue/10 dark:bg-accent-blue/20 p-6 relative overflow-hidden border-b border-card-border">
                  <div className="relative z-10">
                    <facility.icon className="w-12 h-12 mb-2 text-accent-blue" />
                    <div className="text-5xl opacity-20 absolute top-4 right-4">{facility.image}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent-blue transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      
      {/* Sports & Recreation */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading text-foreground">
              Sports & <span className="heading-emphasis">Physical Education</span>
            </h2>
            <div className="saas-card p-8">
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Physical education is an integral part of our curriculum. We believe that sports and games are essential for physical fitness, mental health, and character development. Our sports ground hosts cricket, football, volleyball, and track events.
              </p>
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Regular physical education classes teach students the importance of fitness, teamwork, fair play, and discipline. We organize annual sports day where students showcase their athletic abilities and compete in various events.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Beyond physical fitness, sports activities help students develop important life skills like leadership, perseverance, handling victory and defeat gracefully, and working collaboratively toward common goals.
              </p>
            </div>
          </MotionDiv>
        </div>
      </section>


      {/* Future Developments */}
      <section className="section-padding bg-accent-blue/10 dark:bg-accent-blue/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <span className="heading-emphasis">Continuous</span> Improvement
            </h2>
            <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
              We are committed to continuously improving our facilities to provide the best possible learning environment. Plans for future enhancements include expanding our library, upgrading computer systems, and adding more resources for science education.
            </p>
            <p className="text-foreground-secondary">
              We believe that investing in our facilities means investing in our students&apos; future. Your child&apos;s education deserves the best resources we can provide.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visit Our <span className="heading-emphasis">Campus</span>
            </h2>
            <p className="text-lg text-foreground-secondary mb-8">
              See our facilities firsthand! Schedule a visit to tour our campus and meet our faculty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary px-8 py-3.5"
              >
                Schedule a Visit
              </a>
              <a
                href="/admission"
                className="btn-secondary px-8 py-3.5"
              >
                Apply for Admission
              </a>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
