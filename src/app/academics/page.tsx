'use client';

import MotionDiv from '@/app/components/ui/MotionDiv';
import { BookOpen, GraduationCap, Users, Lightbulb, Target, Award, Clock, CheckCircle } from 'lucide-react';

export default function AcademicsPage() {
  const classes = [
    { name: 'Nursery', desc: 'Building foundations through play, creativity, and exploration in a safe, nurturing environment.', icon: '🎨', age: '3-4 years' },
    { name: 'KG', desc: 'Introduction to reading, writing, basic math, and social skills through interactive activities.', icon: '📚', age: '4-5 years' },
    { name: 'Class 1', desc: 'Starting formal education with focus on Urdu, English, and Mathematics fundamentals.', icon: '✏️', age: '5-6 years' },
    { name: 'Class 2', desc: 'Developing reading fluency, numeracy skills, and understanding the world around us.', icon: '🔢', age: '6-7 years' },
    { name: 'Class 3', desc: 'Building critical thinking through problem-solving activities and creative projects.', icon: '🎯', age: '7-8 years' },
    { name: 'Class 4', desc: 'Introduction to science concepts, social studies, and advanced language skills.', icon: '🔬', age: '8-9 years' },
    { name: 'Class 5', desc: 'Preparing for middle school with comprehensive subject knowledge and study skills.', icon: '📖', age: '9-10 years' },
    { name: 'Class 6', desc: 'Transition to specialized subjects with deeper exploration of science and humanities.', icon: '🌍', age: '10-11 years' },
    { name: 'Class 7', desc: 'Developing analytical skills through practical applications and project-based learning.', icon: '💡', age: '11-12 years' },
    { name: 'Class 8', desc: 'Final middle school year focusing on board exam preparation and career awareness.', icon: '🎓', age: '12-13 years' },
    { name: 'Class 9', desc: 'Beginning SSC preparation with focus on core subjects and board exam patterns.', icon: '📝', age: '13-14 years' },
    { name: 'Class 10', desc: 'Intensive SSC Part-II preparation with comprehensive revision and exam strategies.', icon: '🏆', age: '14-15 years' },
  ];

  const features = [
    { icon: BookOpen, title: 'Modern Curriculum', desc: 'Aligned with Sindh Board requirements with contemporary teaching methods' },
    { icon: GraduationCap, title: 'Expert Faculty', desc: 'Qualified teachers with years of experience and genuine passion for teaching' },
    { icon: Users, title: 'Small Class Sizes', desc: 'Manageable student-teacher ratios ensuring individual attention for every child' },
    { icon: Lightbulb, title: 'Interactive Learning', desc: 'Engaging teaching methods that make learning enjoyable and effective' },
  ];

  const subjects = {
    primary: ['Urdu', 'English', 'Sindhi', 'Mathematics', 'General Knowledge', 'Islamiyat', 'Drawing'],
    middle: ['Urdu', 'English', 'Sindhi', 'Mathematics', 'Science', 'Social Studies', 'Islamiyat', ],
    secondary: ['Urdu', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Islamiyat', 'Pakistan Studies', 'Sindhi'],
  };

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
              Our <span className="heading-emphasis">Academic Programs</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
              Comprehensive education from Nursery to Class 10, preparing students for success at every stage
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Features */}
      <section className="section-padding relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="saas-card p-6"
              >
                <feature.icon className="w-10 h-10 text-accent-blue mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground-secondary">{feature.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Philosophy */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading text-foreground">
              Our <span className="heading-emphasis">Teaching Approach</span>
            </h2>
            <div className="max-w-none text-foreground-secondary leading-relaxed space-y-4 mb-12 text-center">
              <p>
                At Bright Link School, we believe that education should inspire curiosity, build confidence, and develop practical skills. Our teaching approach is designed to make learning meaningful and relevant to students&apos; lives while ensuring they master the curriculum required for board examinations.
              </p>
              <p>
                We follow the Sindh Board curriculum but enhance it with modern teaching techniques, practical examples, and real-world applications. Our goal is not just to help students pass exams, but to develop lifelong learners who can think critically and solve problems independently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="saas-card p-6">
                <Target className="w-10 h-10 text-accent-blue mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Conceptual Understanding</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  We focus on helping students truly understand concepts rather than just memorizing facts. Teachers use examples from daily life to explain difficult topics, making learning relatable and memorable.
                </p>
              </div>

              <div className="saas-card p-6">
                <Users className="w-10 h-10 text-accent-blue mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Individual Attention</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  With manageable class sizes, our teachers can identify each student&apos;s strengths and weaknesses. We provide extra support to students who need it and challenge those who are ready to go further.
                </p>
              </div>

              <div className="saas-card p-6">
                <Clock className="w-10 h-10 text-accent-blue mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Regular Assessment</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  Through monthly tests, term examinations, and continuous assessment, we monitor student progress closely. Parents receive regular feedback about their child&apos;s academic performance and areas for improvement.
                </p>
              </div>

              <div className="saas-card p-6">
                <Award className="w-10 h-10 text-accent-blue mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Exam Preparation</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  For Class 8 and Class 10 students, we provide intensive board exam preparation including past papers, sample questions, and exam techniques to ensure students are fully prepared for their important examinations.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Subjects Offered */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading text-foreground">
              Subjects We <span className="heading-emphasis">Teach</span>
            </h2>

            <div className="space-y-6">
              <div className="saas-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Primary Level (Nursery - Class 5)</h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.primary.map((subject, index) => (
                    <span key={index} className="px-4 py-2 bg-accent-blue/10 text-accent-blue rounded-pill text-sm font-medium border border-accent-blue/20">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="saas-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Middle Level (Class 6 - Class 8)</h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.middle.map((subject, index) => (
                    <span key={index} className="px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-pill text-sm font-medium border border-purple-500/20">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="saas-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Secondary Level (Class 9 - Class 10)</h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.secondary.map((subject, index) => (
                    <span key={index} className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-pill text-sm font-medium border border-green-500/20">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Class Cards */}
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
              <span className="heading-emphasis">Class-wise</span> Overview
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Each class is carefully designed to build upon previous learning and prepare students for the next stage
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {classes.map((cls, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="saas-card p-6 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cls.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{cls.name}</h3>
                <p className="text-xs text-accent-blue font-medium mb-3">{cls.age}</p>
                <p className="text-sm text-foreground-secondary leading-relaxed">{cls.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Academics */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading text-foreground">
              Beyond the <span className="heading-emphasis">Classroom</span>
            </h2>
            <div className="saas-card p-8">
              <p className="text-foreground-secondary leading-relaxed mb-6">
                While academic excellence is our priority, we understand that complete education includes much more than textbooks. We provide opportunities for students to develop other important skills:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground-secondary"><strong className="text-foreground">Sports & Physical Education:</strong> Regular sports activities to promote physical fitness, teamwork, and discipline</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground-secondary"><strong className="text-foreground">Character Development:</strong> Islamic values, moral education, and citizenship training integrated into daily school life</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground-secondary"><strong className="text-foreground">Cultural Activities:</strong> Participation in national days, cultural programs, and community events</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground-secondary"><strong className="text-foreground">Communication Skills:</strong> Speech competitions, presentations, and group discussions to build confidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground-secondary"><strong className="text-foreground">Life Skills:</strong> Problem-solving, time management, and study skills that help students throughout their lives</span>
                </li>
              </ul>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Examination System */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading text-foreground">
              Assessment & <span className="heading-emphasis">Examinations</span>
            </h2>
            <div className="saas-card p-8">
              <div className="space-y-6 text-foreground-secondary leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Regular Assessment</h3>
                  <p>
                    We conduct monthly tests and quarterly examinations to continuously monitor student progress. This helps identify learning gaps early and allows us to provide timely support.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Annual Examinations</h3>
                  <p>
                    End-of-year examinations follow the Sindh Board pattern. Students receive detailed report cards showing their performance in each subject along with teacher comments and recommendations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Board Examinations</h3>
                  <p>
                    Students in Class 8 (Middle) and Class 10 (Matric) appear for Sindh Board examinations. We provide comprehensive preparation including revision classes, practice papers, and exam techniques to ensure maximum success.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Parent Communication</h3>
                  <p>
                    Parents receive regular updates about their child&apos;s academic performance through report cards, parent-teacher meetings, and direct communication with teachers when needed. We believe education is a partnership between school and home.
                  </p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
