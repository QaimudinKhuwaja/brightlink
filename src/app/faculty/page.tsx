'use client';

import { useState, useEffect } from 'react';
import MotionDiv from '@/app/components/ui/MotionDiv';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  emoji: string;
  photoUrl: string | null;
  bio: string | null;
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await fetch('/api/faculty');
      const data = await response.json();
      if (data.success) {
        // Remove duplicates by taking unique names, keeping the latest entry
        const uniqueFaculty = data.data.reduce((acc: Faculty[], current: Faculty) => {
          const existing = acc.find(item => item.name === current.name);
          if (!existing) {
            acc.push(current);
          }
          return acc;
        }, []);

        // Sort by order field
        uniqueFaculty.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setFaculty(uniqueFaculty);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-700 dark:dark:to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
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
              Our <span className="italic">Expert Faculty</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
              Dedicated educators committed to nurturing young minds and building bright futures
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Faculty Introduction */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
              At Bright Link School, our teachers are the heart of our educational excellence. Each member of our faculty brings years of experience, genuine passion for teaching, and deep commitment to student success. They don&apos;t just teach subjects—they inspire curiosity, build confidence, and guide students toward their full potential.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="saas-card p-6">
                <GraduationCap className="w-10 h-10 text-accent-blue mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Qualified Experts</h3>
                <p className="text-sm text-foreground-secondary">All teachers hold relevant degrees and teaching certifications</p>
              </div>

              <div className="saas-card p-6">
                <Award className="w-10 h-10 text-accent-blue mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Experienced Educators</h3>
                <p className="text-sm text-foreground-secondary">Years of practical teaching experience in their subjects</p>
              </div>

              <div className="saas-card p-6">
                <BookOpen className="w-10 h-10 text-accent-blue mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Modern Teaching</h3>
                <p className="text-sm text-foreground-secondary">Using contemporary methods to make learning engaging</p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Faculty Members Grid */}
      <section className="section-padding bg-background-secondary relative overflow-hidden">
        <div className="glow-blob-blue w-96 h-96 top-20 -right-48" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading">
              Meet Our <span className="heading-emphasis">Teachers</span>
            </h2>
            <p className="section-subheading">
              The dedicated professionals shaping tomorrow&apos;s leaders
            </p>
          </MotionDiv>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
            </div>
          ) : faculty.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground-secondary text-lg">No faculty information available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {faculty.map((member, index) => (
                <MotionDiv
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="saas-card overflow-hidden group"
                >
                  {/* Photo or Emoji */}
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 h-48 flex items-center justify-center">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-8xl">{member.emoji}</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent-blue transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-accent-blue font-medium text-sm mb-4">{member.role}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-foreground-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground-secondary">{member.qualification}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-foreground-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground-secondary">{member.experience}</span>
                      </div>
                      {member.bio && (
                        <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border">
                          <BookOpen className="w-4 h-4 text-foreground-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground-secondary">{member.bio}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Our Faculty Stands Out */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading">
              What Makes Our Teachers <span className="heading-emphasis">Special</span>
            </h2>

            <div className="space-y-6 mt-12">
              <div className="saas-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Student-Centered Approach</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Our teachers understand that every student learns differently. They adapt their teaching methods to meet individual needs, ensuring no student is left behind. Whether a child needs extra support or additional challenges, our faculty provides personalized attention.
                </p>
              </div>

              <div className="saas-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Beyond Academics</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Our faculty members are mentors, role models, and guides who care about students&apos; overall development. They teach values like honesty, respect, and hard work alongside academic subjects, helping students become responsible citizens.
                </p>
              </div>

              <div className="saas-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Continuous Improvement</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Our teachers regularly update their skills and knowledge to provide the best education possible. They attend training sessions, share best practices with colleagues, and stay current with modern teaching techniques.
                </p>
              </div>

              <div className="saas-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Open Communication</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Parents can always reach out to teachers to discuss their child&apos;s progress. Our faculty believes in partnership with families, working together to ensure each student achieves their best.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
