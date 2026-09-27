'use client';

import MotionDiv from '@/components/ui/MotionDiv';
import { Target, Heart, Users, Award, BookOpen, Lightbulb, Shield, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Academic Excellence',
      description: 'Committed to providing quality education that prepares students for board exams and beyond',
      color: 'blue',
    },
    {
      icon: Heart,
      title: 'Character Building',
      description: 'Instilling moral values, discipline, and good citizenship alongside academic knowledge',
      color: 'red',
    },
    {
      icon: Users,
      title: 'Inclusive Environment',
      description: 'Welcoming students from all backgrounds and providing equal opportunities for all',
      color: 'green',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Consistent track record of excellent board exam results and student achievements',
      color: 'purple',
    },
  ];

  const mission = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'To provide modern, quality education from Nursery to Class 10 that meets national curriculum standards while fostering critical thinking and creativity.',
    },
    {
      icon: Lightbulb,
      title: 'Holistic Development',
      description: 'To develop well-rounded individuals by nurturing academic, physical, social, and moral growth in every student.',
    },
    {
      icon: Shield,
      title: 'Safe Learning Environment',
      description: 'To maintain a safe, supportive, and respectful environment where every student feels valued and encouraged to learn.',
    },
    {
      icon: Sparkles,
      title: 'Future Ready',
      description: 'To prepare students with the knowledge, skills, and confidence needed to succeed in higher education and life beyond school.',
    },
  ];

  const achievements = [
    { number: '500+', label: 'Active Students', color: 'blue' },
    { number: '20+', label: 'Qualified Teachers', color: 'purple' },
    { number: '95%', label: 'Board Success Rate', color: 'green' },
    { number: '100%', label: 'Parent Satisfaction', color: 'orange' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400' },
      red: { bg: 'bg-red-500/10 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-400' },
      green: { bg: 'bg-green-500/10 dark:bg-green-500/20', text: 'text-green-600 dark:text-green-400' },
      purple: { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-600 dark:text-purple-400' },
      orange: { bg: 'bg-orange-500/10 dark:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="glow-blob-blue w-96 h-96 -top-48 -left-48 opacity-30" />
        <div className="glow-blob-blue w-80 h-80 bottom-0 right-20 opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="italic">Bright Link School</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Delivering quality education that shapes tomorrow&apos;s leaders.
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Introduction */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-blob-blue w-96 h-96 top-20 -right-48" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading">
              Who <span className="heading-emphasis">We Are</span>
            </h2>
            <div className="saas-card p-8 space-y-6">
              <p className="text-foreground-secondary leading-relaxed">
                Bright Link School is a well-established educational institution located in Khuhra, Tehsil Gambat, Khairpur District, Sindh. We are dedicated to provide quality education to children from Nursery through Class 10 (SSC).
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                Our school serves as a beacon of learning in the community, offering a modern curriculum that balances academic rigor with character development. We believe that education goes beyond textbooks—it&apos;s about shaping responsible, confident, and capable individuals who can contribute positively to society.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                With a team of dedicated and experienced teachers, state-of-the-art facilities, and a supportive learning environment, Bright Link School has become a trusted choice for parents seeking quality education for their children in the region.
              </p>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-background-secondary relative overflow-hidden">
        <div className="glow-blob-blue w-80 h-80 bottom-20 left-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading">
              Our <span className="heading-emphasis">Achievements</span>
            </h2>
            <p className="section-subheading">
              Numbers that reflect our commitment to excellence
            </p>
          </MotionDiv>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => {
              const colors = getColorClasses(achievement.color);
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="saas-card p-6 text-center"
                >
                  <div className="stat-dot mx-auto mb-3" />
                  <div className="stat-value text-3xl">{achievement.number}</div>
                  <div className="stat-label">{achievement.label}</div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading">
              Our Core <span className="heading-emphasis">Values</span>
            </h2>
            <p className="section-subheading">
              The principles that guide everything we do
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const colors = getColorClasses(value.color);
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="saas-card p-6"
                >
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <value.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-foreground-secondary">{value.description}</p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background-secondary relative overflow-hidden">
        <div className="glow-blob-blue w-96 h-96 top-20 -left-48" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-heading">
              Our Mission & <span className="heading-emphasis">Vision</span>
            </h2>
            <p className="section-subheading">
              What drives us forward every day
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {mission.map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="saas-card p-6"
              >
                <div className="w-12 h-12 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading">
              Why Choose <span className="heading-emphasis">Bright Link?</span>
            </h2>
            <div className="saas-card p-8 space-y-4">
              <p className="text-foreground-secondary leading-relaxed">
                <strong className="text-foreground">Experienced Faculty:</strong> Our teachers are not just educators—they are mentors who genuinely care about each student&apos;s success and well-being.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                <strong className="text-foreground">Modern Facilities:</strong> We provide a conducive learning environment with well-equipped classrooms, a library, science lab, and sports facilities.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                <strong className="text-foreground">Affordable Education:</strong> Quality education should be accessible to all. We maintain reasonable fee structures to serve families from diverse economic backgrounds.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                <strong className="text-foreground">Community Trust:</strong> Over the years, we have earned the trust and respect of the community through consistent results and genuine care for our students.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                <strong className="text-foreground">Holistic Approach:</strong> Beyond academics, we emphasize sports, arts, moral education, and extracurricular activities to develop well-rounded individuals.
              </p>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
