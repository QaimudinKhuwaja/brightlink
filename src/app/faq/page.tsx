'use client';

import { useState } from 'react';
import MotionDiv from '@/app/components/ui/MotionDiv';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs: FAQItem[] = [
    {
      category: 'Admissions',
      question: 'What is the admission process at Bright Link School?',
      answer: 'The admission process is simple. Fill out the online admission form on our website, upload required documents (student photo, birth certificate, previous school records if applicable), and submit. Our team will review your application and contact you within 2-3 business days for the next steps.',
    },
    {
      category: 'Admissions',
      question: 'What is the age requirement for admission?',
      answer: 'For Nursery, the minimum age is 4 years. For KG, it is 5 years. For Class 1, students should be at least 7 years old as of the admission date. Age requirements for higher classes should be appropriate for the grade level.',
    },
    {
      category: 'Admissions',
      question: 'When do admissions open?',
      answer: 'Admissions typically open in February-March for the upcoming academic session starting in April. However, we accept applications throughout the year subject to seat availability. Contact us to check current availability.',
    },
    {
      category: 'Admissions',
      question: 'What documents are required for admission?',
      answer: 'You need a passport-size photograph, birth certificate or B-Form, parent/guardian CNIC, and previous school certificate with transfer/leaving certificate (for Classes 2-10). All documents should be clear and legible.',
    },
    {
      category: 'Academics',
      question: 'Which curriculum does Bright Link School follow?',
      answer: 'We follow the Sindh Board curriculum for all classes from Nursery to Class 10. Our teaching methods combine traditional values with modern educational techniques to ensure comprehensive learning.',
    },
 
    {
      category: 'Academics',
      question: 'How are students assessed and evaluated?',
      answer: 'We conduct monthly tests, quarterly examinations, and annual examinations. Students in Class 8 and Class 10 appear for Sindh Board examinations. Regular assessment helps us monitor progress and provide timely support where needed.',
    },

    {
      category: 'Fees & Payments',
      question: 'What is the fee structure?',
      answer: 'Our fee structure is designed to be affordable while maintaining quality education. Fees vary by class level. For detailed information, please contact our administration office at +92 300 0811056 or visit the school.',
    },

    {
      category: 'School Operations',
      question: 'Is there a uniform requirement?',
      answer:'Yes, all students are required to wear the school uniform. Boys wear a white shirt with a maroon tie and maroon paint, and girls wear a full white uniform with a maroon scarf/dupatta. Uniforms can be purchased from local tailors as per the prescribed design. Proper uniform promotes discipline and equality.',
    },

    {
      category: 'Parents',
      question: 'How can parents communicate with teachers?',
      answer: 'Parents can visit the school during office hours to meet teachers. We also hold parent-teacher meetings each term to discuss student progress. For urgent matters, parents can contact the school office, and we will arrange a meeting with the relevant teacher.',
    },
    {
      category: 'Parents',
      question: 'How will I be informed about my child\'s progress?',
      answer: 'We provide regular report cards after each examination period. Parents also receive feedback during parent-teacher meetings. If there are any concerns about your child\'s academic performance or behavior, teachers will contact you directly.',
    },
    {
      category: 'Parents',
      question: 'Can parents visit the school?',
      answer: 'Yes, parents are welcome to visit the school. For classroom visits or meetings with teachers, please schedule an appointment through the office to avoid disrupting classes. We value parent involvement in their child\'s education.',
    },

    {
      category: 'General',
      question: 'Do you organize extracurricular activities?',
      answer: 'Yes, we organize sports activities, cultural programs on national days, annual sports day, and other events throughout the year. These activities help students develop teamwork, confidence, and social skills beyond academics.',
    },
    {
      category: 'General',
      question: 'How can I get more information about the school?',
      answer: 'You can visit our website for detailed information, call us at +92 300 0811056, visit the school in person at Khuhra, Tehsil Gambat, District Khairpur, or contact us via WhatsApp. We are always happy to answer your questions and show you around the school.',
    },
  ];

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-accent-blue" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Frequently Asked <span className="heading-emphasis">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
              Find answers to common questions about Bright Link School
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Search Bar */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card border-2 border-card-border rounded-pill focus:border-accent-blue focus:outline-none transition-colors text-foreground placeholder:text-foreground-secondary"
              />
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="inline-block px-4 py-2 bg-accent-blue/10 text-accent-blue font-medium rounded-pill text-sm border border-accent-blue/20">
                  {category}
                </span>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground-secondary text-lg">
                  No questions found matching your search. Try different keywords.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="saas-card overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 bg-accent-blue/10 text-accent-blue text-xs font-medium rounded mb-2">
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openIndex === index ? (
                          <ChevronUp className="w-5 h-5 text-accent-blue" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-foreground-secondary" />
                        )}
                      </div>
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-5">
                        <p className="text-foreground-secondary leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </MotionDiv>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-accent-blue/10 dark:bg-accent-blue/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Still Have <span className="heading-emphasis">Questions?</span>
            </h2>
            <p className="text-foreground-secondary mb-8">
              We&apos;re here to help! Contact us directly and we&apos;ll be happy to answer any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary px-8 py-3"
              >
                Contact Us
              </a>
              <a
                href="tel:+923000811056"
                className="btn-secondary px-8 py-3"
              >
                Call Now
              </a>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
